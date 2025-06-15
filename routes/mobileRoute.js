import express from "express";
import { addMobile, listMobile, removeMobile } from "../controllers/mobileController.js";
import multer from "multer";

const mobileRouter = express.Router();

// Image Storage Engine
const storage = multer.diskStorage({
  destination: "uploads",
  filename: (req, file, cb) => {
    return cb(null, `${Date.now()}${file.originalname}`);
  },
});

const upload = multer({ storage: storage });

// ROutes
mobileRouter.post("/add", upload.single("image"), addMobile);
mobileRouter.post("/remove", removeMobile);
mobileRouter.get("/list", listMobile);

export default mobileRouter;
