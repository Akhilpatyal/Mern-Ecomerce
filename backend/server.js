import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import router from "./routes/UserRoutes.js";
import ProductRouter from "./routes/ProductRoutes.js";
import CartRouter from "./routes/CartRoutes.js";
import CheckOutRouter from "./routes/CheckOutRoutes.js";
import OrderRouter from "./routes/OderRoutes.js";
import UploadRouter from "./routes/UploadRoutes.js";
import SubscribeRouter from "./routes/SubscribedRouter.js";
import adminRouter from "./routes/AdminRouter.js";
import ProductAdmin from "./routes/ProductAdminRouter.js";
import AdminOrders from "./routes/AdminOrderRouter.js";

// Load environment variables
dotenv.config();

// Create Express app
const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(cors()); // Consider configuring CORS for security
app.use(express.json());

// Connect to database
(async () => {
  try {
    await connectDB();
    console.log("Database connected successfully");
  } catch (error) {
    console.error("Database connection failed:", error);
    process.exit(1); // Exit process on failure
  }
})();

// Routes
app.get("/", (req, res) => {
  res.send("Hello World!");
});

// api routes
app.use("/api/users", router);
app.use("/api/products", ProductRouter);
app.use("/api/cart", CartRouter);
app.use("/api/checkout", CheckOutRouter);
app.use("/api/orders", OrderRouter);
app.use("/api/upload", UploadRouter);
app.use("/api", SubscribeRouter);

app.use("/api/admin/users", adminRouter);
app.use("/api/admin/products", ProductAdmin);
app.use("/api/admin/orders", AdminOrders);
// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
