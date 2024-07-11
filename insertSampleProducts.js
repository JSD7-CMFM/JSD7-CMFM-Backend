import "dotenv/config";
import mongoose from "mongoose";
import { Products } from "./src/models/productsModel.js"; // ปรับเส้นทางไฟล์ให้ถูกต้อง

const insertSampleProducts = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    const sampleProducts = [
      {
        productId: 1,
        category: "Electronics",
        name: "Apple iPhone 13",
        description: "Latest model",
        type: "Smartphone",
        price: 999,
        quantity: 10,
        product_img: "url_to_image",
        productinfo: {
          info1: "Info about iPhone",
          info2: "More info about iPhone",
        },
        isActive: true,
      },
      {
        productId: 2,
        category: "Electronics",
        name: "Samsung Galaxy S21",
        description: "Latest model",
        type: "Smartphone",
        price: 799,
        quantity: 15,
        product_img: "url_to_image",
        productinfo: {
          info1: "Info about Galaxy",
          info2: "More info about Galaxy",
        },
        isActive: true,
      },
    ];

    await Products.insertMany(sampleProducts);
    console.log("Sample products inserted");

    mongoose.disconnect();
  } catch (error) {
    console.error("Error inserting sample products:", error);
  }
};

insertSampleProducts();
