import mongoose from "mongoose";
import { OrderModel } from "../models/orderModel.js";
import { OrderProductModel } from "../models/orderProductModel.js";
import jwt from "jsonwebtoken";
import { CartModel } from "../models/cartModel.js";
import { ProductModel } from "../models/productModel.js";

export async function createOrder(req, res) {
    try {
        const token = req.cookies?.authToken;
        if (!token) {
            return res.status(401).json({ error: "User is not authenticated" });
        }
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const userId = decoded.id || decoded._id;

        const cart = await CartModel.findOne({ userId });
        if (!cart || cart.product.length === 0) {
            return res.status(400).json({ error: "Cart is empty." });
        }
        const totalAmount = cart?.product?.reduce(
            (total, item) => total + item.price * item.quantity,
            0
        );
        const { address, paymentStatus } = req.body;

        const newOrder = new OrderModel({
            userId: userId,
            totalAmount: totalAmount,
            paymentStatus: paymentStatus || "Pending",
            address: address,
        });

        const savedOrder = await newOrder.save();

        const orderProducts = await Promise.all(
            cart.product.map(async (item) => {
                let productArr = {};

                const productDetails = await ProductModel.findById(
                    item.productId
                );
                productArr.orderId = savedOrder._id;
                productArr.productId = item.productId;
                productArr.price = productDetails.price;
                productArr.quantity = item.quantity;

                return productArr;
            })
        );

        await OrderProductModel.insertMany(orderProducts);

        await CartModel.findOneAndDelete({ userId });
        res.status(201).json({
            message: "Order created successfully",
            orderId: savedOrder._id,
        });
    } catch (err) {
        return res.status(400).json({ error: err.message });
    }
}

export const fetchOrders = async (req, res) => {
    try {
        // --- AUTH ---
        const token = req.cookies?.authToken;
        if (!token) {
            return res.status(401).json({ error: "User is not authenticated" });
        }

        let decoded;
        try {
            decoded = jwt.verify(token, process.env.JWT_SECRET);
        } catch (error) {
            return res.status(401).json({ error: "Invalid token" });
        }

        const userId = decoded.id || decoded._id;
        if (!userId) {
            return res.status(400).json({ error: "Invalid user in token" });
        }

        const startDate = req.query.startDate || null;
        const endDate = req.query.endDate || null;
        const page = Number(req.query.page) || 1;
        const limit = Number(req.query.limit) || 10;
        const skip = (page - 1) * limit;

            console.log("End",endDate)
        let query = {"userId": userId };
        
        if (startDate || endDate)
            query.createdAt = {};

        if (startDate) {
            query.createdAt.$gte = new Date(startDate);
        }

        if (endDate) {
            console.log("End",endDate)
            // Set time to end of day (23:59:59) for accurate results
            const end = new Date(endDate);
            end.setHours(23, 59, 59, 999);

            query.createdAt.$lte = end;
        }
console.log(query)
        // --- QUERY ---
        const orders = await OrderModel.find(query)
            .sort({ createdAt: -1 })
            .skip(skip)
            .limit(limit);

        return res.json({ page, limit, orders });

    } catch (err) {
        console.error("SERVER ERROR:", err);
        return res.status(500).json({ error: err.message });
    }
};


export async function singleOrder(req, res) {
    try {
        const token = req.cookies.authToken;
        if (!token) {
            return res.status(401).json({ error: "User is not authenticated" });
        }
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const userId = decoded.id || decoded._id;
        const orderId = req.params.id;
        const orders = await OrderModel.findById(orderId);

        if (!orders) {
            return res.status(400).json({ error: "Order not found" });
        }
        if (orders.userId.toString() !== userId.toString()) {
            return res
                .status(401)
                .json({ error: "User is not authorized to view this order" });
        }

        const orderProducts = await OrderProductModel.find({ orderId: orderId })
            .populate("productId", "name image price") // fetch product details //.populate("productId");
            .lean();
        res.status(200).json({
            orders,
            products: orderProducts,
        });
    } catch (err) {
        return res.status(400).json({ error: err.message });
    }
}

export async function updateOrderStatus(req, res) {
    try {
        const token = req.cookies.authToken;
        if (!token) {
            return res.status(401).json({ error: "User is not authenticated" });
        }
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const userId = decoded.id || decoded._id;

        const orderId = req.params.id;
        const { status } = req.body;

        const orderDetails = await OrderModel.findById(orderId);
        if (orderDetails.userId.toString() !== userId.toString()) {
            return res
                .status(401)
                .json({ error: "User is not authorized to update this order" });
        }
        const updateOrder = await OrderModel.findByIdAndUpdate(orderId, {
            paymentStatus: status,
        });
        if (!updateOrder) {
            return res.status(400).json({ error: "Order not found" });
        }
        res.status(200).json({ message: "Order status updated", updateOrder });
    } catch (err) {
        return res.status(400).json({ error: err.message });
    }
}
