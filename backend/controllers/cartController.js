const User = require("../models/userModel");
const CartModel = require("../models/cartModel");
const Product = require("../models/productModel");
const ErrorHander = require("../utils/errorhander");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");



exports.newCart = catchAsyncErrors(async (req, res, next) => {
  const { cartItems, userId } = req.body;
  const newCartItem = await CartModel.create({
    cartItems,
    userId
  });
  
  res.status(201).json({
    success: true,
    newCartItem,
  });
});

  
// get logged in user   Carts
exports.getCartOfUser = catchAsyncErrors(async (req, res, next) => {
  const cartExist = await CartModel.findOne({ userId: req.params.userId });

  if (!cartExist) {
    res.status(200).json({
      sucess: true, 
      cartItems : []
    });
  } else {
    res.status(200).json({
      success: true,
      cartItems: cartExist.cartItems,
    });
  }
});
  

// delete Cart -- Admin
exports.deleteCart = catchAsyncErrors(async (req, res, next) => {
  const carts = await CartModel.findOne({ userId: req.params.userId });

  if (carts) {
    await CartModel.deleteOne({userId: req.params.userId});
  }

  res.status(200).json({
    success: true,
  });
});