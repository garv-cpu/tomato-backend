import userModel from "../models/userModel.js";

// add items to user cart
export const addToCart = async (req, res) => {
  try {
    let userData = await userModel.findById(req.userId)    //todo: check this if findOne is more good
    let cartData = await userData.cartData;

    if (!cartData[req.body.itemId]) {
      cartData[req.body.itemId] = 1;
    } else {
      cartData[req.body.itemId] += 1;
    }

    await userModel.findByIdAndUpdate(req.body.userId, { cartData });

    res.json({ success: true, message: "Added to cart" });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Internal Server Error" });
  }
};

// remove items from user cart
//todo: check this api out
export const removeFromCart = async (req, res) => {
  try {
    let userData = await userModel.findById(req.userId)
    let cartData = await userData.cartData;

    if (cartData[req.body.itemId] > 0) {
      cartData[req.body.itemId] -= 1;
    }

    await userModel.findByIdAndUpdate(req.body.userId, { cartData });

    res.json({ success: true, message: "Removed from cart" });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Internal Server Error" });
  }
};

// fetch user cart data
export const getCart = async (req, res) => {
  try {
    let userData = await userModel.findById(req.userId)
    let cartData = await userData.cartData;

    res.json({ success: true, cartData });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Internal Server Error" });
  }
};
