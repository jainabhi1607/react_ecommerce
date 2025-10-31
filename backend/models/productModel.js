/**
 * @swagger
 * components:
 *   schemas:
 *     Product:
 *       type: object
 *       properties:
 *         _id:
 *           type: string
 *         name:
 *           type: string
 *         slug:
 *           type: string
 *         category:
 *           type: string
 *         images:
 *           type: string
 *         quantity:
 *           type: number
 *         originalPrice:
 *           type: number
 *         discountedPrice:
 *           type: number
 *         description:
 *           type: string
 *         createdAt:
 *           type: string
 *     User:
 *       type: object
 *       properties:
 *         _id:
 *           type: string
 *         name:
 *           type: string
 *         username:
 *           type: string
 *         email:
 *           type: string
 *         password:
 *           type: string
 *         phone:
 *           type: string
 *         createdAt:
 *           type: string
 *           format: date-time
 *     Cart:
 *       type: object
 *       properties:
 *         _id:
 *           type: string
 *         user:
 *           $ref: '#/components/schemas/User'
 *         product:
 *           type: array
 *           items:
 *             type: object
 *             properties:
 *               productId:
 *                 $ref: '#/components/schemas/Product'
 *               quantity:
 *                 type: number
 *               price:
 *                 type: number
 *         createdAt:
 *           type: string
 *           format: date-time
 *     Wishlist:
 *       type: object
 *       properties:
 *         _id:
 *           type: string
 *         user:
 *           $ref: '#/components/schemas/User'
 *         wishlist:
 *           type: array
 *           items:
 *             type: object
 *             properties:
 *               productId:
 *                 $ref: '#/components/schemas/Product'
 *               price:
 *                 type: number
 *         createdAt:
 *           type: string
 *           format: date-time
 *     Order:
 *       type: object
 *       properties:
 *         _id:
 *           type: string
 *         user:
 *           $ref: '#/components/schemas/User'
 *         totalAmount:
 *           type: string
 *         paymentStatus:
 *           type: string
 *         orderStatus:
 *           type: string
 *         address:
 *           type: string
 *         createdAt:
 *           type: string
 *           format: date-time
 *     OrderProduct:
 *       type: object
 *       properties:
 *         _id:
 *           type: string
 *         orderId:
 *           $ref: '#/components/schemas/Order'
 *         productId:
 *           $ref: '#/components/schemas/Product'
 *         quantity:
 *           type: number
 *         price:
 *           type: number
 *         createdAt:
 *           type: string
 *           format: date-time
 */

import mongoose from "mongoose";
const ProductSchema = new mongoose.Schema({
  name: {
    type: String,
  },
  slug: {
    type: String,
  },
  category: {
    type: String,
  },
  originalPrice: {
    type: Number,
    required: true,
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
},
  { timestamps: true });

export const ProductModel = mongoose.model("product", ProductSchema);

