import { Router } from "express";   
import {addToWishlist, deleteWishlistItem, fetchWishlistItems} from "../controllers/wishlistController.js";

const wishlistRouter = Router();

/**
 * @swagger
 * /wishlist/add:
 *   get:
 *     summary: Add item to wishlist
 *     security:
 *       - cookieAuth: []
 *     responses:
 *       200:
 *         description: Add item to wishlist
 */
wishlistRouter.post('/add',addToWishlist);
/**
 * @swagger
 * /wishlist/delete/:id:
 *   get:
 *     summary: Delete an item from wishlist
 *     security:
 *       - cookieAuth: []
 *     responses:
 *       200:
 *         description: Delete an item from wishlist
 */
wishlistRouter.delete('/delete/:id',deleteWishlistItem);
/**
 * @swagger
 * /wishlist/fetch:
 *   get:
 *     summary: Fetch wishlist items
 *     security:
 *       - cookieAuth: []
 *     responses:
 *       200:
 *         description: Fetch wishlist items
 */
wishlistRouter.get("/fetch",fetchWishlistItems);

export default wishlistRouter;