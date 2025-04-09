import express from "express";
import CheckOut from "../models/CheckOut.js";
import Cart from "../models/Cart.js";
import Order from "../models/Order.js";
import { protect } from "../middleware/authmiddleware.js";

const router = express.Router();

// @route/POST /api/checkout
// @desc Create a new checkout session
// @access Private
router.post("/", protect, async (req, res) => {
  const { checkOutItems, shippingAddress, paymentMethod, totalPrice } =
    req.body;
  if (!checkOutItems || checkOutItems.length === 0) {
    return res.status(400).json({ message: "No items in checkout" });
  }
  try {
    // create a new checkout session
    const newCheckOut = await CheckOut.create({
      user: req.user._id,
      checkOutItems: checkOutItems,
      shippingAddress,
      paymentMethod,
      totalPrice,
      paymentStatus: "Pending",
      isPaid: false,
    });
    console.log(`Checkout create for user ${req.user._id}`);
    res.status(201).json(newCheckOut);
  } catch (error) {
    console.error("Error in creating checkout session", error);

    res.status(500).json({ message: "Server Error" });
  }
});

// @route/PUT /api/checkout/:id/pay
// @update checkout to mark as paid after successful payment
// @access Private
router.put("/:id/pay", protect, async (req, res) => {
  const { paymentStatus, paymentDetails } = req.body;

  try {
    const checkout = await CheckOut.findById(req.params.id);
    console.log(checkout);
    if (!checkout) {
      return res.status(404).json({ message: "Checkout not found" });
    }

    if (paymentStatus === "paid") {
      checkout.isPaid = true;
      checkout.paidAt = Date.now();
      checkout.paymentStatus = paymentStatus;
      checkout.paymentDetails = paymentDetails;
      await checkout.save();

      res.status(200).json(checkout);
    } else {
      res.status(400).json({ message: "Payment failed" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
});

//@route POST /api/checkout/:id/finalize
//@desc finalize checkout and create order after payment confirmation
//@access Private
router.post("/:id/finalize", protect, async (req, res) => {
  try {
    const checkout = await CheckOut.findById(req.params.id);
    if (!checkout) {
      return res.status(404).json({ message: "Checkout not found" });
    }

    if (checkout.isPaid && !checkout.isFinalised) {
      //create final order based on the checkout details
      const finalOrder = await Order.create({
        user: checkout.user,
        orderItems: checkout.checkOutItems,
        shippingAddress: checkout.shippingAddress,
        paymentMethod: checkout.paymentMethod,
        totalPrice: checkout.totalPrice,
        isPaid: true,
        paidAt: checkout.paidAt,
        isDelivered: false,
        paymentStatus: checkout.paymentStatus,
        paymentDetails: checkout.paymentDetails,
      });
      //mark checkout as finalised
      checkout.isFinalised = true;
      checkout.isFinalisedAt = Date.now();
      await checkout.save();

      //delete the cart associate within the user\
      await Cart.findOneAndDelete({ user: checkout.user });
      res.status(201).json(finalOrder);
    } else if (checkout.isFinalised) {
      return res.status(400).json({ message: "Checkout already finalised" });
    } else {
      res.status(400).json({ message: "checkout us not paid" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
});

export default router;
