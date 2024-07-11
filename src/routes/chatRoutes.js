import express from "express";
import axios from "axios";
import { Products } from "../models/productsModel.js";

const chatRoute = express.Router();
const openaiApiKey = process.env.OPENAI_API_KEY;

// Function to extract product name and type from the user's message
const extractProductInfo = (message) => {
  const typeRegex = /ประเภท\s*([\w\s]+)/i;
  const nameRegex = /ขอข้อมูลของ\s*([\w\s]+)\s*ประเภท/i;

  const typeMatch = message.match(typeRegex);
  const nameMatch = message.match(nameRegex);

  const type = typeMatch ? typeMatch[1].trim() : null;
  const name = nameMatch ? nameMatch[1].trim() : null;

  return { name, type };
};

chatRoute.post("/", async (req, res) => {
  try {
    const userMessage = req.body.message;

    // Extract product name and type from the user's message
    const { name, type } = extractProductInfo(userMessage);

    if (!name || !type) {
      res.json({ reply: "กรุณาระบุชื่อสินค้าและประเภทอย่างชัดเจน" });
      return;
    }

    // Fetch products from MongoDB matching the extracted name and type
    const products = await Products.find({
      name: { $regex: name, $options: "i" },
      type: { $regex: type, $options: "i" },
    });

    if (products.length === 0) {
      res.json({ reply: "ไม่มีสินค้าที่ตรงกับคำค้นหาของคุณ" });
      return;
    }

    let productInfo = "นี่คือข้อมูลสินค้าที่พบ:\n";
    products.forEach((product) => {
      const storage = product.productinfo?.storage ? product.productinfo.storage.join(", ") : "ไม่มีข้อมูล";
      productInfo += `ชื่อ: ${product.name}\n ราคา: ${product.price} บาท\n ประเภท: ${product.type}\n ข้อมูลเพิ่มเติม:\n - ขนาดหน้าจอ: ${product.productinfo?.display || "ไม่มีข้อมูล"}\n - ระบบปฏิบัติการ: ${product.productinfo?.operatingSystem || "ไม่มีข้อมูล"}\n - ซีพียู: ${product.productinfo?.cpu || "ไม่มีข้อมูล"}\n - กล้องหลัง: ${product.productinfo?.rearCamera || "ไม่มีข้อมูล"}\n - กล้องหน้า: ${product.productinfo?.frontCamera || "ไม่มีข้อมูล"}\n - แบตเตอรี่: ${product.productinfo?.battery || "ไม่มีข้อมูล"}\n - ความจุ: ${storage}\n\n`;
    });

    // Send the user's message and product information to the OpenAI API
    const response = await axios.post(
      "https://api.openai.com/v1/chat/completions",
      {
        model: "gpt-4",
        messages: [
          { role: "system", content: "คุณเป็นผู้ช่วยที่มีประโยชน์." },
          { role: "user", content: `กรุณาให้ข้อมูลสินค้า:\n${productInfo}` },
        ],
        max_tokens: 400, // Increase the max_tokens if needed
      },
      {
        headers: {
          Authorization: `Bearer ${openaiApiKey}`,
          "Content-Type": "application/json",
        },
      }
    );

    res.json({ reply: response.data.choices[0].message.content });
  } catch (error) {
    console.error(
      "Error with OpenAI API:",
      error.response ? error.response.data : error.message
    );
    res.status(500).json({ error: "Error with OpenAI API" });
  }
});

export default chatRoute;
