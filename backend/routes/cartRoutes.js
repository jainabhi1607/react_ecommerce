import { Router } from "express";
import {addToCart,deleteItemFromCart,fetchCartItems} from "../controllers/cartController.js";

const cartRouter = Router();

cartRouter.post('/add',addToCart)
cartRouter.delete('/delete/:id',deleteItemFromCart)
cartRouter.get('/fetch',fetchCartItems)
export default cartRouter;