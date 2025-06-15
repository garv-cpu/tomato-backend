import orderModel from "../models/orderModel.js";
import userModel from "../models/userModel.js";


export const placeOrder = async (req, res) => {
    try {
      const {
        amount,
        customer_id,
        customer_name,
        customer_email,
        customer_phone,
      } = req.body;
  
      if (!amount || !customer_id || !customer_name || !customer_phone) {
        return res
          .status(400)
          .json({ success: false, message: "Missing customer details" });
      }
  
      // Optional: Save order in DB
      const newOrder = new orderModel({
        customer_id,
        customer_name,
        customer_email,
        customer_phone,
        amount,
      });
      await newOrder.save();
  
      // Send email
      const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
          user: process.env.SENDER_EMAIL,
          pass: process.env.SENDER_EMAIL_PASSWORD,
        },
      });
  
      const mailOptions = {
        from: process.env.SENDER_EMAIL,
        to: "your-email@example.com", // Your email where you want to receive bookings
        subject: "New Mobile Booking",
        text: `
          New booking placed:
          Name: ${customer_name}
          Email: ${customer_email}
          Phone: ${customer_phone}
          Amount: ₹${amount}
        `,
      };
  
      await transporter.sendMail(mailOptions);
  
      res.status(200).json({
        success: true,
        message: "Booking placed and email sent.",
      });
    } catch (err) {
      console.log("placeOrder error:", err);
      res.status(500).json({ success: false, message: err.message });
    }
  };

export const listOrders = async (req, res) => {
  try {
    const orders = await orderModel.find({});
    res.json({ success: true, data: orders });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Internal Server Error" });
  }
};
