/**
 * @swagger
 * tags:
 *   name: Wishlist
 *   description: Wishlist management endpoints
 */

/**
 * @swagger
 * /api/wishlist/add:
 *   post:
 *     summary: Add an item to wishlist
 *     tags: [Wishlist]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           example:
 *             productId: 60e9c6b8f1d3c24b9c6a5678
 *             price: 799
 *     responses:
 *       201:
 *         description: Item added to wishlist
 */

/**
 * @swagger
 * /api/wishlist/delete/{id}:
 *   delete:
 *     summary: Delete an item from wishlist
 *     tags: [Wishlist]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Item deleted from wishlist
 */

/**
 * @swagger
 * /api/wishlist/fetch:
 *   get:
 *     summary: Fetch all wishlist items
 *     tags: [Wishlist]
 *     responses:
 *       200:
 *         description: List of wishlist items
 */
import { Router } from "express";
import { addToWishlist, deleteWishlistItem, fetchWishlistItems } from "../controllers/wishlistController.js";

const wishlistRouter = Router();

wishlistRouter.post('/add', addToWishlist);
wishlistRouter.delete('/delete/:id', deleteWishlistItem);
wishlistRouter.get('/fetch', fetchWishlistItems);

export default wishlistRouter;
