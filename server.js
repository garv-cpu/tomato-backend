import express from "express";
import cors from 'cors';
import dotenv from "dotenv";
import { connectDB } from "./config/db.js";
import mobileRouter from "./routes/mobileRoute.js";
import userRouter from "./routes/userRoute.js";

dotenv.config();

// app config
const app = express();
const PORT = process.env.PORT;

//  middleware
app.use(express.json());
app.use(cors());

// db connection
connectDB();

// api endpoints
app.use("/api/mobile", mobileRouter);
app.use('/images', express.static('uploads'));
app.use('/api/user', userRouter);

app.listen(PORT, () => {
    console.log(`Server running on PORT: ${PORT}`);
})