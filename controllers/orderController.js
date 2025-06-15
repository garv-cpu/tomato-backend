import orderModel from "../models/orderModel.js";
import userModel from "../models/userModel.js";
import { Cashfree, CFEnvironment } from "cashfree-pg";

const cashfree = new Cashfree(
  CFEnvironment.PRODUCTION, // or SANDBOX for testing
  process.env.CASHFREE_CLIENT_ID,
  process.env.CASHFREE_CLIENT_SECRET
);

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

    const orderId = "order_" + Date.now();

    const orderPayload = {
      order_id: orderId,
      order_amount: amount,
      order_currency: "INR",
      customer_details: {
        customer_id,
        customer_phone,
        customer_email,
        customer_name,
      },
      order_meta: {
        return_url: `${process.env.FRONTEND_URL}/payment-success?order_id={order_id}`,
      },
    };

    const response = await cashfree.PGCreateOrder(orderPayload);

    if (response.status === 200) {
      return res.json({
        success: true,
        payment_session_id: response.data.payment_session_id,
      });
    } else {
      console.log("Cashfree error:", response);
      return res
        .status(500)
        .json({ success: false, message: "Failed to create order" });
    }
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
