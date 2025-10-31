/**
 * @swagger
 * tags:
 *   name: Cart
 *   description: Shopping cart management endpoints
 */

/**
 * @swagger
 * /api/cart/add:
 *   post:
 *     summary: Add an item to the cart
 *     tags: [Cart]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           example:
 *             productId: 60e9c6b8f1d3c24b9c6a1234
 *             price: 500
 *             quantity: 2
 *     responses:
 *       201:
 *         description: Item added to cart successfully
 */

/**
 * @swagger
 * /api/cart/delete/{id}:
 *   delete:
 *     summary: Remove an item from the cart
 *     tags: [Cart]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Item removed from cart successfully
 */

/**
 * @swagger
 * /api/cart/fetch:
 *   get:
 *     summary: Fetch all cart items for a user
 *     tags: [Cart]
 *     responses:
 *       200:
 *         description: List of cart items
 */
import { Router } from "express";
import { addToCart, deleteItemFromCart, fetchCartItems } from "../controllers/cartController.js";

const cartRouter = Router();

cartRouter.post('/add', addToCart);
cartRouter.delete('/delete/:id', deleteItemFromCart);
cartRouter.get('/fetch', fetchCartItems);

export default cartRouter;
