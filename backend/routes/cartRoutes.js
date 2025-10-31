import { Router } from "express";
import {addToCart,deleteItemFromCart,fetchCartItems} from "../controllers/cartController.js";

const cartRouter = Router();

/**
 * @swagger
 * /api/cart:
 *   get:
 *     summary: Add item to cart
 *     security:
 *       - cookieAuth: []
 *     parameters:
 *       - in: path
 *         name: productId
 *         required: true
 *         schema:
 *           type: string
 *         description: The product ID to remove
 *     responses:
 *       200:
 *         description: Add item to cart
 */
cartRouter.post('/add',addToCart)
cartRouter.delete('/delete/:id',deleteItemFromCart)

/**
 * @swagger
 * /api/cart:
 *   get:
 *     summary: Get cart items
 *     security:
 *       - cookieAuth: []
 *     responses:
 *       200:
 *         description: List of cart items
 */
cartRouter.get('/fetch',fetchCartItems)
export default cartRouter; 