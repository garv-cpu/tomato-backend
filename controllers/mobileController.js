import mobileModel from "../models/mobileModel.js";
import fs from "fs";

// add mobile item
export const addMobile = async (req, res) => {
  let image_filename = `${req.file.filename}`;

  const mobile = new mobileModel({
    name: req.body.name,
    description: req.body.description,
    price: req.body.price,
    category: req.body.category,
    image: image_filename,
  });
  try {
    await mobile.save();
    res.json({ success: true, message: "Mobile Added" });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Error" });
  }
};

// remove mobile item
export const removeMobile = async (req, res) => {
  try {
    const mobile = await mobileModel.findById(req.body.id);
    fs.unlink(`uploads/${mobile.image}`, (err) => {
      if (err) {
        console.log(err);
        return res.json({ success: false, message: "Error deleting image" });
      }
    });

    await mobileModel.findByIdAndDelete(req.body.id);

    res.json({ success: true, message: "Mobile Removed" });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Error" });
  }
};

// all mobile list
export const listMobile = async (req, res) => {
  try {
    const mobiles = await mobileModel.find({});
    res.json({ success: true, data: mobiles });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Error" });
  }
};
