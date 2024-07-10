import express from "express";
import axios from "axios";
import { Products } from "../models/productsModel.js";

const chatRoute = express.Router();
const openaiApiKey = process.env.OPENAI_API_KEY;

chatRoute.post("/", async (req, res) => {
  try {
    const userMessage = req.body.message;

    // ดึงข้อมูลสินค้าจาก MongoDB
    const products = await Products.find({
      name: { $regex: userMessage, $options: "i" },
    });

    let productInfo = "I found the following products:\n";
    products.forEach((product) => {
      productInfo += `Name: ${product.name}, Price: ${product.price}\n`;
    });

    // ส่งข้อความผู้ใช้และข้อมูลสินค้าไปยัง OpenAI API
    const response = await axios.post(
      "https://api.openai.com/v1/chat/completions",
      {
        model: "gpt-4",
        messages: [
          { role: "system", content: "You are a helpful assistant." },
          { role: "user", content: `${userMessage}\n${productInfo}` },
        ],
        max_tokens: 150,
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
