import mongoose from "mongoose";

const wishlistProductSchema = new mongoose.Schema({
      productId:{
            type:mongoose.Types.ObjectId,
            required:true,
      },
      price:{
            type:Number,
            required:true,
      }
})

const wishlistSchema = new mongoose.Schema({
      wishlist:[wishlistProductSchema],
      userId:{
            type: mongoose.Types.ObjectId,
            required:true,
      }
},
{ timestamps: true }
);

export const WishlistModel = mongoose.model("wishlist",wishlistSchema);