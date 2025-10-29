import {Router} from 'express';
import {createOrder,fetchOrders,singleOrder,updateOrderStatus} from '../controllers/orderController.js';

const orderRouter = Router();

orderRouter.post('/create',createOrder);
orderRouter.get('/fetch',fetchOrders);
orderRouter.get('/single/:id',singleOrder);
orderRouter.put('/update-status/:id',updateOrderStatus);

export default orderRouter;