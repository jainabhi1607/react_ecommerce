import { Router } from "express";
import multer from "multer";  
import {
  fetchProduct,
  fetchSingleProduct,
  addProduct,
  editProduct,
  deleteProduct,
} from "../controllers/productController.js";

import path from 'path'; 

const productRouter = Router();
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './uploads')
  },
  filename: function (req, file, cb) {
    const ext = path.extname(file.originalname);
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
    cb(null, file.fieldname + '-' + uniqueSuffix+ext)
  }
})
const upload = multer({storage: storage})

productRouter.get("/get", fetchProduct);
productRouter.post("/add", upload.single('image'), addProduct);
productRouter.put("/edit/:id", editProduct);
productRouter.get("/product/:id", fetchSingleProduct);
productRouter.delete("/delete/:id", deleteProduct);

export default productRouter;
