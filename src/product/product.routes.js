import { Router } from "express";
import { addProduct, getProductByName, getProductsOutOfStock, getProducts, listProducts, updateProduct, deleteProduct } from "./product.controller.js";
import { addProductValidator, getProductByNameValidator, getProductOutOfStockValidator, updateProductValidator, deleteProductValidator } from "../middlewares/product-validator.js"

const router = Router();

/**
 * @swagger
 * /addProduct:
 *   post:
 *     summary: Add a new product
 *     tags: [Products]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               price:
 *                 type: number
 *               stock:
 *                 type: number
 *     responses:
 *       200:
 *         description: Product added successfully
 */
router.post("/addProduct", addProductValidator, addProduct);

/**
 * @swagger
 * /getProduct:
 *   get:
 *     summary: Get a product by name
 *     tags: [Products]
 *     parameters:
 *       - in: query
 *         name: name
 *         schema:
 *           type: string
 *         required: true
 *         description: Name of the product
 *     responses:
 *       200:
 *         description: Product retrieved successfully
 */
router.get("/getProduct", getProductByNameValidator, getProductByName);

/**
 * @swagger
 * /getProductsOutOfStock:
 *   get:
 *     summary: Get products out of stock
 *     tags: [Products]
 *     responses:
 *       200:
 *         description: List of products out of stock
 */
router.get("/getProductsOutOfStock", getProductOutOfStockValidator, getProductsOutOfStock);

/**
 * @swagger
 * /getProducts:
 *   get:
 *     summary: Get all products
 *     tags: [Products]
 *     responses:
 *       200:
 *         description: List of all products
 */
router.get("/getProducts", getProducts);

/**
 * @swagger
 * /filterProducts:
 *   get:
 *     summary: Filter products
 *     tags: [Products]
 *     responses:
 *       200:
 *         description: List of filtered products
 */
router.get("/filterProducts", listProducts);

/**
 * @swagger
 * /updateProduct/{id}:
 *   put:
 *     summary: Update a product
 *     tags: [Products]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID of the product to update
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               price:
 *                 type: number
 *               stock:
 *                 type: number
 *     responses:
 *       200:
 *         description: Product updated successfully
 */
router.put("/updateProduct/:id", updateProductValidator, updateProduct);

/**
 * @swagger
 * /deleteProduct/{id}:
 *   delete:
 *     summary: Delete a product
 *     tags: [Products]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID of the product to delete
 *     responses:
 *       200:
 *         description: Product deleted successfully
 */
router.delete("/deleteProduct/:id", deleteProductValidator, deleteProduct);

export default router;