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

/**
 * @swagger
 * /product/get:
 *   get:
 *     summary: Product List
 *     security:
 *       - cookieAuth: []
 *     responses:
 *       200:
 *         description: Find all products
 */
productRouter.get("/get", fetchProduct);

/**
 * @swagger
 * /product/add:
 *   get:
 *     summary: Add product
 *     security:
 *       - cookieAuth: []
 *     responses:
 *       200:
 *         description: Add product
 */
productRouter.post("/add", upload.single('image'), addProduct);


/**
 * @swagger
 * /product/edit/:id:
 *   get:
 *     summary: Edit product
 *     security:
 *       - cookieAuth: []
 *     responses:
 *       200:
 *         description: Edit product details including imaage
 */

productRouter.put("/edit/:id", upload.single('image'),editProduct);

/**
 * @swagger
 * /product/product/:id:
 *   get:
 *     summary: Single product
 *     security:
 *       - cookieAuth: []
 *     responses:
 *       200:
 *         description: Single product details
 */
productRouter.get("/product/:id", fetchSingleProduct);

/**
 * @swagger
 * /product/delete/:id:
 *   get:
 *     summary: delete product
 *     security:
 *       - cookieAuth: []
 *     responses:
 *       200:
 *         description: delete a product
 */
productRouter.delete("/delete/:id", deleteProduct);

export default productRouter;
