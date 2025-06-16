import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
  userId: { type: String, required: true },
  customer_name: { type: String, required: true },
  customer_email: { type: String },
  customer_phone: { type: String, required: true },
  amount: { type: Number, required: true },
  address: {
    street: { type: String },
    city: { type: String },
    state: { type: String },
    zipcode: { type: String },
    country: { type: String },
  },
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.model("orders", orderSchema);
