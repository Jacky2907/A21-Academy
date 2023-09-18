const express = require("express");
const {
  newCart, getCartOfUser, deleteCart
} = require("../controllers/cartController");

const router = express.Router();

const { isAuthenticatedUser, authorizeRoles } = require("../middleware/auth");


router.route("/cart")
      .post(isAuthenticatedUser, newCart);

router.route("/cart/:userId")
      .get(isAuthenticatedUser, getCartOfUser)
      .delete(isAuthenticatedUser, deleteCart);


module.exports = router;