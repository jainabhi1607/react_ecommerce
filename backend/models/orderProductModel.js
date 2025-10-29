import mongoose from "mongoose";

const orderProductSchema = new mongoose.Schema({
    orderId : {
        type: mongoose.Types.ObjectId,
        ref: "order",
        required: true,
    },
    productId:{
        type:mongoose.Types.ObjectId,
        ref: "product",
        required:true,
    },
    quantity:{
        type: Number,
        required:true,
    },
    price:{
        type:Number,
        required:true,
    }
});

export const OrderProductModel = mongoose.model("orderProduct", orderProductSchema);