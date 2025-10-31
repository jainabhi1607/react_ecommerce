/**
 * @swagger
 * tags:
 *   name: Order
 *   description: Order management endpoints
 */

/**
 * @swagger
 * /api/order/create:
 *   post:
 *     summary: Create a new order
 *     tags: [Order]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           example:
 *             userId: 60e9c6b8f1d3c24b9c6a1234
 *             totalAmount: 2000
 *             address: "123 Main Street, City"
 *     responses:
 *       201:
 *         description: Order created successfully
 */

/**
 * @swagger
 * /api/order/fetch:
 *   get:
 *     summary: Get all user orders
 *     tags: [Order]
 *     responses:
 *       200:
 *         description: List of user orders
 */

/**
 * @swagger
 * /api/order/single/{id}:
 *   get:
 *     summary: Get details of a single order
 *     tags: [Order]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Order details fetched successfully
 */

/**
 * @swagger
 * /api/order/update-status/{id}:
 *   put:
 *     summary: Update order status
 *     tags: [Order]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           example:
 *             orderStatus: Shipped
 *     responses:
 *       200:
 *         description: Order status updated successfully
 */
import { Router } from 'express';
import { createOrder, fetchOrders, singleOrder, updateOrderStatus } from '../controllers/orderController.js';

const orderRouter = Router();

orderRouter.post('/create', createOrder);
orderRouter.get('/fetch', fetchOrders);
orderRouter.get('/single/:id', singleOrder);
orderRouter.put('/update-status/:id', updateOrderStatus);

export default orderRouter;
