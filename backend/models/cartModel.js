const mongoose = require("mongoose");

const cartSchema = new mongoose.Schema({
  cartItems : [
    {
      name: {
        type: String,
        required: true,
      },
      price: {
        type: Number,
        required: true,
      },
      quantity: {
        type: Number,
        required: true,
      },
      image: {
        type: String,
        required: true,
      },
      product: {
        type: mongoose.Schema.ObjectId,
        ref: "Product",
        required: true,
      },
      stock: {
        type: Number,
        required: false,
      },
    }
  ],
  userId: {
    type: mongoose.Schema.ObjectId,
    ref: "User",
    required: true,
  }
});

module.exports = mongoose.model("Cart", cartSchema);
