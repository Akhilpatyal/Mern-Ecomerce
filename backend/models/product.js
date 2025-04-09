// 1> require mongoose
// 2> new mongoose Schema
// 3>mongoose model

import mongoose from "mongoose";
const productSchema = new mongoose.Schema({
  name: {
    type: String,
    trim: true,
    required: true,
  },
  description: {
    type: String,
    require: true,
  },
  price: {
    type: Number,
    require: true,
  },
  discountPrice: {
    type: Number,
  },
  countInStock: {
    type: Number,
    require: true,
    default: 0,
  },
  sku: {
    type: String,
    require: true,
    unique: true,
  },
  category: {
    type: String,
    require: true,
  },
  brand: {
    type: String,
  },
  sizes: {
    type: [String],
    require: true,
  },
  colors: {
    type: [String],
    require: true,
  },
  collections: {
    type: String,
  },
  material: {
    type: String,
  },
  gender: {
    type: String,
    enum: ["Men", "Women", "Unisex"],
  },
  images: [
    {
      url: {
        type: String,
        require: true,
      },
      altText: {
        type: String,
      },
    },
  ],
  isFeatured: {
    type: Boolean,
    default: false,
  },
  isPublished: {
    type: Boolean,
    default: false,
  },
  rating: {
    type: Number,
    default: 0,
  },
  numReviews:{
    type:Number,
    default:0
  },
  tags:[String],
  user:{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    erquire:true,
  },
  metaTitle:{
    type:String
  },
  metaDescription:{
    type:String,
  },
  metaKeywords:{
    type:String
  },
  dimensions:{
    length:Number,
    width:Number,
    height:Number,
  },
  weight:Number,
},{timestamps:true});
export default new mongoose.model('Product', productSchema);