import mongoose from "mongoose";
import { CartModel } from "../models/cartModel.js";

export async function addToCart(req, res) {
  try {
    const { productId, price, quantity, userId } = req.body;
    const checkUserCart = await CartModel.findOne({ userId });
    console.log("Check Product", checkUserCart);
    if (checkUserCart) {
      // console.log("price", price);
      // console.log(checkUserCart.product);
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
        res
          .status(201)
          .json({ message: "Product updated in cart", checkUserCart });
      } else {
        checkUserCart.product.push({
          productId,
          price,
          quantity,
        });
        await checkUserCart.save();
        res
          .status(201)
          .json({ message: "Product added in cart", checkUserCart });
      }
      } else {
      const cartItem = new CartModel({
        product: [{ productId, price, quantity }],
        userId: userId,
      });

      await cartItem.save();
      res.status(201).json({ message: "Product added to cart", cartItem });
    }
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
}
export async function fetchCartItems(req, res) {
  try {
    const cartItems = await CartModel.find();
    res.json(cartItems);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
}
export async function deleteItemFromCart(req, res) {
  try {
    const deleteRef = await CartModel.findByIdAndDelete(req.params.id);
    if (!deleteRef) {
      return res.status(400).json({ error: "Item not found in cart" });
    }
    res.status(200).json({ message: "Item deleted from cart", deleteRef });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
}
