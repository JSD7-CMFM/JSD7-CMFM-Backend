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
//test
const mailController = {
  sendOrderConfirmation: async (req, res) => {
    const orderId = req.params.orderId;
    try {
      const email = await mailService.getEmailUser(orderId);
      const order = await orderService.getOrderById(orderId);
      if (!email) {
        return res.status(404).json({ message: "User not found" });
      }

      const { cart_products, total_price } = order;

      const mailOptions = {
        from: process.env.MAIL_SENDER_ADMIN,
        to: email,
        subject: "Order Confirmation",
        html: `
          <h1>PONY MART : JSD 7</h1>
          <h1>Order Confirmation</h1>
          <div style='padding-bottom: 10px'>Your order with ID ${orderId} has been confirmed.</div>
          <div style='padding-bottom: 10px'>Total price : ${total_price} THB</div>
          <ul>
            ${cart_products
              .map(
                (product) => `
              <li>
                <img src="${product.product_img}" alt="${product.name}" width="200">
                <div style='padding-bottom: 10px'>${product.name}</div>
                <div style='padding-bottom: 10px'>Quantity: ${product.amount}</div>
                <div style='padding-bottom: 10px'>Price per unit: ${product.price}</div>
              </li>
              `
              )
              .join("")}
          </ul>
        `,
      };

      await transporter.sendMail(mailOptions);
      // console.log("Email sent successfully");
      res.status(200).json({ message: "Email sent successfully" });
    } catch (error) {
      console.error("Error sending email:", error);
      res.status(500).json({ message: "Error sending email", error: error.message });
    }
  },
};

export default mailController;
