/**
 * @swagger
 * components:
 *   schemas:
 *     Order:
 *       type: object
 *       required:
 *         - userId
 *         - address
 *       properties:
 *         _id:
 *           type: string
 *         userId:
 *           type: string
 *         totalAmount:
 *           type: number
 *         paymentStatus:
 *           type: string
 *           enum: [Pending, Paid, Failed]
 *         orderStatus:
 *           type: string
 *           enum: [Processing, Shipped, Delivered, Cancelled]
 *         address:
 *           type: string
 *         createdAt:
 *           type: string
 *           format: date-time
 *         updatedAt:
 *           type: string
 *           format: date-time
 */
import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
  userId: { type: mongoose.Types.ObjectId, required: true },
  totalAmount: { type: Number },
  paymentStatus: { type: String, enum: ["Pending", "Paid", "Failed"], default: "Pending" },
  orderStatus: { type: String, enum: ["Processing", "Shipped", "Delivered", "Cancelled"], default: "Processing" },
  address: { type: String, required: true },
}, { timestamps: true });

export const OrderModel = mongoose.model("order", orderSchema);
