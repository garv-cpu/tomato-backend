import orderModel from "../models/orderModel.js";
import userModel from "../models/userModel.js";
import { Cashfree, CFEnvironment } from "cashfree-pg";

const cashfree = new Cashfree(
  CFEnvironment.PRODUCTION, // or SANDBOX for testing
  process.env.CASHFREE_CLIENT_ID,
  process.env.CASHFREE_CLIENT_SECRET
);

export const placeOrder = async (req, res) => {
  const { amount, customer_id, customer_name, customer_email, customer_phone } =
    req.body;

  try {
    const orderRequest = {
      order_amount: amount,
      order_currency: "INR",
      customer_details: {
        customer_id,
        customer_name,
        customer_email,
        customer_phone,
      },
      order_meta: {
        return_url: `https://yourwebsite.com/payment-success?order_id={order_id}`,
      },
      order_note: "Mobile booking",
    };

    const response = await cashfree.PGCreateOrder(orderRequest);
    const { order_id, payment_session_id } = response.data;

    res.status(200).json({ success: true, order_id, payment_session_id });
  } catch (error) {
    console.error(error.response?.data || error.message);
    res.status(500).json({ success: false, message: "Order creation failed" });
  }
};
