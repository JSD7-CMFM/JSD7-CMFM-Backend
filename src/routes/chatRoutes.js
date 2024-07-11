import express from "express";
import axios from "axios";
import { Products } from "../models/productsModel.js";

const chatRoute = express.Router();
const openaiApiKey = process.env.OPENAI_API_KEY;

const extractProductInfo = (message) => {
  const typeRegex = /ประเภท\s*([\w\s]+)/i;
  const nameRegex = /ข้อมูล\s*([\w\s]+)\s*ประเภท/i;

  const typeMatch = message.match(typeRegex);
  const nameMatch = message.match(nameRegex);

  const type = typeMatch ? typeMatch[1].trim() : null;
  const name = nameMatch ? nameMatch[1].trim() : message.trim();

  return { name, type };
};

chatRoute.post("/", async (req, res) => {
  try {
    const userMessage = req.body.message;

    // แยกชื่อสินค้าและประเภทจากข้อความคำขอ
    const { name, type } = extractProductInfo(userMessage);

    if (!name) {
      res.json({ reply: "กรุณาระบุชื่อสินค้าอย่างชัดเจน" });
      return;
    }

    // ดึงข้อมูลสินค้าจาก MongoDB โดยรวมสินค้าที่มีชื่อและประเภทตรงกัน
    const query = type
      ? { name: { $regex: name, $options: "i" }, type: { $regex: type, $options: "i" } }
      : { name: { $regex: name, $options: "i" } };

    const products = await Products.find(query);

    if (products.length === 0) {
      res.json({ reply: "ไม่มีสินค้าที่ตรงกับคำค้นหาของคุณ" });
      return;
    }

    let productInfo = "นี่คือข้อมูลสินค้าที่พบ:\n";
    products.forEach((product) => {
      productInfo += `ชื่อ: ${product.name}\n ราคา: ${product.price} บาท\n ประเภท: ${product.type}\n ข้อมูลเพิ่มเติม: ${product.description}\n\n`;
    });

    // ส่งข้อความผู้ใช้และข้อมูลสินค้าไปยัง OpenAI API
    const response = await axios.post(
      "https://api.openai.com/v1/chat/completions",
      {
        model: "gpt-4",
        messages: [
          { role: "system", content: "คุณเป็นผู้ช่วยที่มีประโยชน์." },
          { role: "user", content: `กรุณาให้ข้อมูลสินค้า:\n${productInfo}` },
        ],
        max_tokens: 400, // เพิ่มจำนวน max_tokens
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
