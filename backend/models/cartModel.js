/**
 * @swagger
 * components:
 *   schemas:
 *     Cart:
 *       type: object
 *       required:
 *         - userId
 *         - product
 *       properties:
 *         _id:
 *           type: string
 *         userId:
 *           type: string
 *         product:
 *           type: array
 *           items:
 *             type: object
 *             properties:
 *               productId:
 *                 type: string
 *               price:
 *                 type: number
 *               quantity:
 *                 type: number
 *         createdAt:
 *           type: string
 *           format: date-time
 *         updatedAt:
 *           type: string
 *           format: date-time
 */
import mongoose from "mongoose";

const cartProductSchema = new mongoose.Schema({
  productId: { type: mongoose.Types.ObjectId, required: true },
  price: { type: Number, required: false },
  quantity: { type: Number, required: true },
});
const CartSchema = new mongoose.Schema({
  product: [cartProductSchema],
  userId: { type: mongoose.Types.ObjectId, required: true },
}, { timestamps: true });

export const CartModel = mongoose.model("cart", CartSchema);
