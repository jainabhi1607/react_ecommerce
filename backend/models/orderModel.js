import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
    userId:{
        type: mongoose.Types.ObjectId,
        required: true,
    },
    totalAmount:{
        type:Number,
    },
    paymentStatus:{
        type:String,
        enum: ["Pending", "Paid", "Failed"],
        default: "Pending",
    },
    orderStatus:{
        type:String,
        enum: ["Processing", "Shipped", "Delivered", "Cancelled"],
        default: "Processing",
    },
    address:{
        type: String,
        required: true,
    }

}, { timestamps: true });

export const OrderModel = mongoose.model("order", orderSchema);