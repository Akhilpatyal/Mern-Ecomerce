import mongoose from "mongoose";
import User from "./models/User.js";
import Cart from "./models/Cart.js"
import connectDB from "./config/db.js";
import product from "./models/product.js";
import Product from "./data/products.js";    //tesing data
import dotenv from "dotenv";

// Load environment variables
dotenv.config();

// mongo connect
connectDB();

// function to seed data
const seedData = async () => {
  try {
    // clear existing data
    await product.deleteMany();
    await User.deleteMany();
    await Cart.deleteMany();

    // create a new default admin user
    const adminUser = await User.create({
      name: "Admin",
      email: "admin@example.com",
      password: "password123",
      role: "admin",
    });

    // assign default data's
    const userId = adminUser._id;
    const sampleProduct = Product.map((product) => {
      return { ...product, user: userId};
    });

    // insert product inside the database
    await product.insertMany(sampleProduct);
    console.log("product added succesfully");
    process.exit();
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};
seedData();
