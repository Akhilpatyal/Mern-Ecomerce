import mongoose, { mongo } from "mongoose";
import bcrypt from "bcryptjs";

// creating a model for ecommerc
const userSchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true },
  email: { 
    type: String,
    required: true,
    trim: true,
    unique: true,
    match: [/.+\@.+\..+/, "Please enter a valid email address"],
  },
  password: { type: String, required: true, minlength: 6, maxlength: 22 },
  role: { type: String, enum: ["customer", "admin"], default: "customer" },
},{timestamps:true});

// password hash middleware

userSchema.pre("save",async function (next){
    if (!this.isModified("password")) {
        return next();
    }
    const salt=await bcrypt.genSalt(10);
    this.password=await bcrypt.hash(this.password,salt);
    next();
});

// match user entered password with hashed password in database
userSchema.methods.matchPassword=async function(enteredPassword){
    return await bcrypt.compare(enteredPassword,this.password);
};
export default mongoose.model("User",userSchema);