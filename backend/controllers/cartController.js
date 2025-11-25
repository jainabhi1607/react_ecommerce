import mongoose from "mongoose";
import { CartModel } from "../models/cartModel.js";
import jwt from "jsonwebtoken";
import { ProductModel } from "../models/productModel.js";

export async function addToCart(req, res) {
    try {
        const token = req.cookies?.authToken;
        if (!token) {
            return res.status(401).json({ error: "User is not authenticated" });
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const userId = decoded.id || decoded._id;
        let { productId, price, quantity } = req.body;
        const checkUserCart = await CartModel.findOne({ userId });

        const productDetails = await ProductModel.findById(productId);
        price = productDetails.price;
        console.log("Price",price);
        if (checkUserCart) {
            if (
                checkUserCart.product.some(
                    (item) => item.productId.toString() === productId
                )
            ) {
                //increment quantity
                checkUserCart.product = checkUserCart.product.map((item) => {
                    if (item.productId.toString() === productId) {
                        item.quantity = quantity;
                    }
                    return item;
                });
                await checkUserCart.save();
                res.status(201).json({
                    message: "Product updated in cart",
                    checkUserCart,
                });
            } else {
                checkUserCart.product.push({
                    productId,
                    price,
                    quantity,
                });
                await checkUserCart.save();
                res.status(201).json({
                    message: "Product added in cart",
                    checkUserCart,
                });
            }
        } else {
            const cartItem = new CartModel({
                product: [{ productId, price, quantity }],
                userId: userId,
            });

            await cartItem.save();
            res.status(201).json({
                message: "Product added to cart",
                cartItem,
            });
        }
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
}
export async function fetchCartItems(req, res) {
    try {
        const token = req.cookies?.authToken;
        if (!token) {
            return res.status(401).json({ error: "User is not authenticated" });
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const userId = decoded.id || decoded._id;

        const cartItems = await CartModel.findOne({ userId });
        res.json(cartItems);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
}
export async function deleteItemFromCart(req, res) {
    try {
        const token = req.cookies?.authToken;
        if (!token) {
            return res.status(401).json({ error: "User not authenticated" });
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const userId = decoded.id;
        const cartItem = await CartModel.findOne({
            _id: req.params.id,
            userId: userId,
        });
        console.log("id is: ",cartItem)

        if (!cartItem) {
            return res
                .status(403)
                .json({ error: "You are not authorized to delete this item" });
        }

        const deleteRef = await CartModel.findByIdAndDelete(req.params.id);
        if (!deleteRef) {
            return res.status(400).json({ error: "Item not found in cart" });
        }
        res.status(200).json({ message: "Item deleted from cart", deleteRef });
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
}
