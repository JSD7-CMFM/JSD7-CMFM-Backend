import nodemailer from "nodemailer";
import dotenv from "dotenv";
import mailService from "../services/mailsServices.js";
import orderService from "../services/ordersServices.js";

dotenv.config();

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.MAIL_SENDER_ADMIN,
    pass: process.env.MAIL_SECRETKEY,
  },
});

const mailController = {
  sendOrderConfirmation: async (req, res) => {
    const orderId = req.params.orderId; // สมมติว่า orderId ถูกส่งมาทาง URL
    try {
      // หา email ของผู้ใช้จาก orderId
      const email = await mailService.getEmailUser(orderId);
      const { cart_products } = await orderService.getOrderById(orderId);
      console.log(cart_products);
      if (!email) {
        return res.status(404).json({ message: "User not found" });
      }

      // สร้างข้อมูลอีเมล
      const mailOptions = {
        from: process.env.MAIL_SENDER_ADMIN, // ผู้ส่งอีเมล
        to: email, // ผู้รับอีเมล
        subject: "Order Confirmation", // หัวข้ออีเมล
        html: `
          <h1>Order Confirmation</h1>
          <p>Your order with ID ${orderId} has been confirmed.</p>
          <ul>
            ${cart_products.map(
              (product) => `
              <li>
                <img src="${product.product_img}" alt="${product.name}">
                <h3>${product.name}</h3>
                <p>Quantity: ${product.amount}</p>
                <p>Price: ${product.price}</p>
              </li>
            `
            )}
        `,
        // text: `Your order with ID ${orderId} has been confirmed.`, // เนื้อหาอีเมล
      };

      // ส่งอีเมล
        await transporter.sendMail(mailOptions);     
      console.log("Email sent successfully");
      res.status(200).json({ message: "Email sent successfully" });
    } catch (error) {
      console.error("Error sending email:", error);
      res
        .status(500)
        .json({ message: "Error sending email", error: error.message });
    }
  },
};

export default mailController;
