import { Router } from "express";   
import {addToWishlist, deleteWishlistItem, fetchWishlistItems} from "../controllers/wishlistController.js";

const wishlistRouter = Router();

wishlistRouter.post('/add',addToWishlist);
wishlistRouter.delete('/delete/:id',deleteWishlistItem);
wishlistRouter.get("/fetch",fetchWishlistItems);

export default wishlistRouter;