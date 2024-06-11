import { Schema, model } from "mongoose";

const ProductSchema = new Schema(
  {
    title: { type: String, required: true, unique: true },
    desc: { type: String, required: true, },
    img: { type: String, required: true },
    categories: { type: Array },
    price: { type: Number, required: true },
    inStock: {type: Boolean, default: true },
    // category: { type: String },
    video:{ type: String},
    
  },
  { timestamps: true }
);

export default model("Product", ProductSchema);