import express from "express";
import Order from "../models/Order.js";
import { protect, admin } from "../middleware/authmiddleware.js";

const router = express.Router();

// get /api/admin/orders
// access private
router.get("/", protect, admin, async (req, res) => {
  try {
    const orders = await Order.find({}).populate("user", "id name");
    res.status(200).json(orders);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
});

// get /api/admin/orders/:id
// update order status
router.put("/:id", protect, admin, async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);
    if (order) {
      order.status = req.body.status || order.status;
      order.isDelivered =
        req.body.status === "Delivered" ? true : order.isDelivered;
      (order.isDeliveredAt === req.body.status) === "Delivered"
        ? Date.now()
        : order.isDeliveredAt;

      const updateOrder = await order.save();
      res.status(200).json(updateOrder);
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
});


// delete /api/admin/orders/:id
// delete order
router.delete("/:id", protect, admin, async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);
    if (order) {
      await order.deleteOne();
      res.json({ message: "Order removed" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
});
export default router;
