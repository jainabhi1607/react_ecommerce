import mongoose from "mongoose";
import {WishlistModel} from "../models/wishlistModel.js"
import jwt from "jsonwebtoken";

export async function addToWishlist(req, res){
    try{
        const token = req.cookies?.authToken;
        if(!token){
            return res.status(401).json({error:"User is not authenticated"});
        }
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const userId = decoded.id || decoded._id;

        const {productId, price} = req.body;
        const checkUserWishlist = await WishlistModel.findOne({ userId });
        if(checkUserWishlist){
            
            if( checkUserWishlist.wishlist.some( (item) => item.productId.toString() === productId) ){
                return res.status(409).json({message:"Product already in wishlist"});
            }
            else{
                checkUserWishlist.wishlist.push({
                    productId,
                    price
                });
                await checkUserWishlist.save();
                return res.status(201).json({message:"Product added to wishlist", checkUserWishlist});
            }
        }
        else{
            const wishlistItem = new WishlistModel({
                wishlist:[{productId, price}],
                userId:userId
            });
            await wishlistItem.save();
            return res.status(201).json({message:"Product added to wishlist", wishlistItem});   
        }
    }catch(err){
        res.status(400).json({error:err.message});
    }
}

export async function fetchWishlistItems(req, res){
    try{
        const token = req.cookies?.authToken;
        if(!token){
            return res.status(401).json({error:"User is not authenticated"});
        }
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const userId = decoded.id || decoded._id;

        const userWishlistItems = await WishlistModel.findOne({userId})
        res.json(userWishlistItems);
    }catch(err){
        res.status(400).json({error:err.message});
    }
}

export async function deleteWishlistItem(req, res){
    try{
        const token = req.cookies?.authToken;
            if (!token) {
              return res.status(401).json({ error: "User not authenticated" });
            }
        
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            const userId = decoded.id;

            // 1️⃣ Find wishlist document for user
            const wishlistDoc = await WishlistModel.findOne({ userId });
            if (!wishlistDoc) {
            return res.status(404).json({ error: "Wishlist not found" });
            }
            
            // 2️⃣ Find index of product inside the wishlist array
            const index = wishlistDoc.wishlist.findIndex(
            (item) => item._id.toString() === req.params.id
            );

            if (index === -1) {
            return res
                .status(403)
                .json({ error: "You are not authorized to delete this item" });
            }

            // 3️⃣ Remove item from array
            wishlistDoc.wishlist.splice(index, 1);

            // 4️⃣ Save updated document
            await wishlistDoc.save();
            
    res.status(200).json({ message: "Item deleted from cart" });

    }catch(err){
        res.status(400).json({error:err.message});
    }
}