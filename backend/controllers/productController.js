import mongoose from "mongoose";
import {ProductModel} from "../models/productModel.js"


export async function fetchProduct(req, res){
    try {
    const product = await ProductModel.find();
    res.json(product);
  } catch (error) {
    res.status(500).json({ message: "Error in fetching product", error: error });
  }

}
export async function addProduct(req, res){
   try { const { name, code,price,description } = req.body;
  const productToAdd = new ProductModel({ name, code,price,description, image: req.file.path });

  await productToAdd.save();
  res
    .status(201)
    .json({ message: "Product added successfully", newRecord: productToAdd });
}
catch(err){
  res.status(400).json({ error: err.message });
}
}
export async function fetchSingleProduct(req, res){
    try {
    const product = await ProductModel.findById(req.params.id);
    res.json(product);
  } catch (error) {
    res.status(500).json({ message: "Error in fetching product", error: error });
  }

}
export async function editProduct(req, res){
     try {
    const { name, code,price,description } = req.body;
    const updatedUser = await ProductModel.findByIdAndUpdate(
      req.params.id,
      { name, code,price,description },
      { new: true, runValidators: true }
    );
    if(!updatedUser){return res.status(400).json({error:"User not found"})}
    res.json({message: "Product updated",updatedUser})
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
}
export async function deleteProduct(req, res){
   try{
    //if (req.cookies?.authToken) {
      const deleteRef = await ProductModel.findByIdAndDelete(req.params.id)
      if(!deleteRef) {return res.status(400).json({error: "Product not found"})}
      res.json({message:"Product deleted", deleteRef})
  // } else {
  //   res.status(401).json({ error: "User is not authenticated" });
  // }

    
  }
  catch(err){
    res.status(400).json({error: err.message})
  } 
}