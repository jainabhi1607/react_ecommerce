/**
 * @swagger
 * components:
 *   schemas:
 *     Wishlist:
 *       type: object
 *       required:
 *         - userId
 *         - wishlist
 *       properties:
 *         _id:
 *           type: string
 *         userId:
 *           type: string
 *         wishlist:
 *           type: array
 *           items:
 *             type: object
 *             properties:
 *               productId:
 *                 type: string
 *               price:
 *                 type: number
 *         createdAt:
 *           type: string
 *           format: date-time
 *         updatedAt:
 *           type: string
 *           format: date-time
 */
import mongoose from "mongoose";

const wishlistProductSchema = new mongoose.Schema({
  productId: { type: mongoose.Types.ObjectId, required: true },
  price: { type: Number, required: true },
});

const wishlistSchema = new mongoose.Schema({
  wishlist: [wishlistProductSchema],
  userId: { type: mongoose.Types.ObjectId, required: true },
}, { timestamps: true });

export const WishlistModel = mongoose.model("wishlist", wishlistSchema);
