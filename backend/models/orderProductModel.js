/**
 * @swagger
 * components:
 *   schemas:
 *     OrderProduct:
 *       type: object
 *       required:
 *         - orderId
 *         - productId
 *         - quantity
 *         - price
 *       properties:
 *         _id:
 *           type: string
 *         orderId:
 *           type: string
 *         productId:
 *           type: string
 *         quantity:
 *           type: number
 *         price:
 *           type: number
 */
import mongoose from "mongoose";

const orderProductSchema = new mongoose.Schema({
  orderId: { type: mongoose.Types.ObjectId, ref: "order", required: true },
  productId: { type: mongoose.Types.ObjectId, ref: "product", required: true },
  quantity: { type: Number, required: true },
  price: { type: Number, required: true },
});

export const OrderProductModel = mongoose.model("orderProduct", orderProductSchema);
