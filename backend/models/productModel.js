/**
 * @swagger
 * components:
 *   schemas:
 *     Product:
 *       type: object
 *       required:
 *         - originalPrice
 *         - price
 *       properties:
 *         _id:
 *           type: string
 *         name:
 *           type: string
 *         slug:
 *           type: string
 *         category:
 *           type: string
 *         originalPrice:
 *           type: number
 *         price:
 *           type: number
 *         description:
 *           type: string
 *         image:
 *           type: string
 *         createdAt:
 *           type: string
 *           format: date-time
 *         updatedAt:
 *           type: string
 *           format: date-time
 */
import mongoose from "mongoose";
const ProductSchema = new mongoose.Schema({
  name: { type: String },
  slug: { type: String },
  category: { type: String },
  originalPrice: { type: Number, required: true },
  price: { type: Number, required: true },
  description: { type: String },
  image: { type: String },
}, { timestamps: true });

export const ProductModel = mongoose.model("product", ProductSchema);
