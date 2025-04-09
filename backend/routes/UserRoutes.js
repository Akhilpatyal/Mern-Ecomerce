import express from "express";
import User from "../models/User.js";
import jwt from "jsonwebtoken";
import {protect,admin} from "../middleware/authmiddleware.js";

const router = express.Router();

// routes for user registration
router.post("/register", async (req, res) => {
  const { name, email, password } = req.body;
  try {
    // res.send({name,email,password})
    let user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({ message: "User already exists" });
    }

    user = new User({ name, email, password });
    await user.save();

    //  create jwt payload
    const payload = { user: { id: user._id, role: user.role } };

    // signin and return the token with user data
    jwt.sign(
      payload,
      process.env.JWT_SECRET,
      { expiresIn: "20h" },
      (err, token) => {
        if (err) {
          throw err;
        }

        // send user and token response
        res.status(201).json({
          user: {
            _id: user._id,
            name: user.name,
            email: user.email,
            role: user.role,
          },
          token,
        });
      }
    );
  } catch (error) {
    console.log(error);
    res.status(500).send("server error");
  }
});


// @route post / api/ users / login
//desc authenticate user 
router.post("/login",async(req,res)=>{
  const {email,password}=req.body;
  try {
    let user=await User.findOne({email});
    if (!user) {
      return res.status(400).json({message:"Invalid Credential"});
    }
    const isMatch=await user.matchPassword(password);
    if (!isMatch) {
      return res.status(400).json({message:"Invalid Credential"});
    }

     //  create jwt payload
     const payload = { user: { id: user._id, role: user.role } };

     // signin and return the token with user data
     jwt.sign(
       payload,
       process.env.JWT_SECRET,
       { expiresIn: "20h" },
       (err, token) => {
         if (err) {
           throw err;
         }
 
         // send user and token response
         res.json({
           user: {
             _id: user._id,
             name: user.name,
             email: user.email,
             role: user.role,
           },
           token,
         });
       }
     );
  } catch (error) {
    console.error(error);
     res.status(500).send("server error");
    
  }
})

// get the logged in user's profile (protected route)
// access private
router.get("/profile",protect,async(req,res)=>{
  res.json(req.user);
});
export default router;
