import mongoose from "mongoose";
const ProductSchema = new mongoose.Schema({
  name: {
    type: String,
  },
  code: {
    type: String,
  },
  price: {
    type: Number,
    required: true,
  },
  description: {
    type: String,
  },
  image: {
    type: String,
  },
});

export const ProductModel = mongoose.model("product", ProductSchema);

