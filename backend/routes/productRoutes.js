/**
 * @swagger
 * tags:
 *   name: Product
 *   description: Product management endpoints
 */

/**
 * @swagger
 * /api/product/get:
 *   get:
 *     summary: Get all products
 *     tags: [Product]
 *     responses:
 *       200:
 *         description: Returns all products
 */

/**
 * @swagger
 * /api/product/add:
 *   post:
 *     summary: Add a new product
 *     tags: [Product]
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               category:
 *                 type: string
 *               originalPrice:
 *                 type: number
 *               price:
 *                 type: number
 *               description:
 *                 type: string
 *               image:
 *                 type: string
 *                 format: binary
 *           example:
 *             name: Sample Product
 *             category: Electronics
 *             originalPrice: 1000
 *             price: 800
 *             description: A high-quality electronic product
 *     responses:
 *       201:
 *         description: Product created successfully
 */

/**
 * @swagger
 * /api/product/product/{id}:
 *   get:
 *     summary: Get a single product by ID
 *     tags: [Product]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Single product details
 */

/**
 * @swagger
 * /api/product/edit/{id}:
 *   put:
 *     summary: Update product details
 *     tags: [Product]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               price:
 *                 type: number
 *               image:
 *                 type: string
 *                 format: binary
 *           example:
 *             name: Updated Product
 *             price: 900
 *     responses:
 *       200:
 *         description: Product updated successfully
 */

/**
 * @swagger
 * /api/product/delete/{id}:
 *   delete:
 *     summary: Delete a product
 *     tags: [Product]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Product deleted successfully
 */
import { Router } from "express";
import multer from "multer";
import { fetchProduct, fetchSingleProduct, addProduct, editProduct, deleteProduct } from "../controllers/productController.js";
import path from 'path';
import express from "express";


const productRouter = express.Router();
const storage = multer.diskStorage({
  destination: function (req, file, cb) { cb(null, './uploads') },
  filename: function (req, file, cb) {
    const ext = path.extname(file.originalname);
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, file.fieldname + '-' + uniqueSuffix + ext);
  }
});
const upload = multer({ storage: storage });

productRouter.get("/product/:id", fetchSingleProduct);
productRouter.get("/get", fetchProduct);
productRouter.get("/get/:pageNumber", fetchProduct);
productRouter.post("/add", upload.single("image"), addProduct);
productRouter.put("/edit/:id", upload.single("image"), editProduct);
productRouter.delete("/delete/:id", deleteProduct);

export default productRouter;
