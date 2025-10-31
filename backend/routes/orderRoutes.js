import {Router} from 'express';
import {createOrder,fetchOrders,singleOrder,updateOrderStatus} from '../controllers/orderController.js';

const orderRouter = Router();

/**
 * @swagger
 * /order/create:
 *   get:
 *     summary: Create an order
 *     security:
 *       - cookieAuth: []
 *     responses:
 *       200:
 *         description: Create an order
 */
orderRouter.post('/create',createOrder);

/**
 * @swagger
 * /order/fetch:
 *   get:
 *     summary: Fetch orders
 *     security:
 *       - cookieAuth: []
 *     responses:
 *       200:
 *         description: User orders listing
 */

orderRouter.get('/fetch',fetchOrders);

/**
 * @swagger
 * /order/single/{id}:
 *   get:
 *     summary: order details
 *     security:
 *       - cookieAuth: []
 *     responses:
 *       200:
 *         description: Get user order details
 */
orderRouter.get('/single/:id',singleOrder);

/**
 * @swagger
 * /order/update-status/{id}:
 *   get:
 *     summary: Update order status
 *     security:
 *       - cookieAuth: []
 *     responses:
 *       200:
 *         description: Update order status
 */

orderRouter.put('/update-status/:id',updateOrderStatus);

export default orderRouter;