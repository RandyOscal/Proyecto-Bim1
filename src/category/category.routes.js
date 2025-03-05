import { Router } from "express"
import { addCategory, getCategory, updateCategory, deleteCategory } from "./category.controller.js"
import { addCategoryValidator, getCategoryValidator, updateCategoriValidator, deleteCategoryValidator } from "../middlewares/category-validator.js"

const router = Router()

/**
 * @swagger
 * /AddCategory:
 *   post:
 *     summary: Add a new category
 *     tags: [Category]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: Electronics
 *     responses:
 *       200:
 *         description: Category added successfully
 */
router.post("/AddCategory", addCategoryValidator, addCategory)

/**
 * @swagger
 * /getCategorys:
 *   get:
 *     summary: Get all categories
 *     tags: [Category]
 *     responses:
 *       200:
 *         description: List of categories
 */
router.get("/getCategorys", getCategoryValidator, getCategory)

/**
 * @swagger
 * /deleteCategory/{cid}:
 *   delete:
 *     summary: Delete a category
 *     tags: [Category]
 *     parameters:
 *       - in: path
 *         name: cid
 *         required: true
 *         schema:
 *           type: string
 *         description: Category ID
 *     responses:
 *       200:
 *         description: Category deleted successfully
 */
router.delete("/deleteCategory/:id", deleteCategoryValidator, deleteCategory)

/**
 * @swagger
 * /updateCategory/{cid}:
 *   put:
 *     summary: Update a category
 *     tags: [Category]
 *     parameters:
 *       - in: path
 *         name: cid
 *         required: true
 *         schema:
 *           type: string
 *         description: Category ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: Electronics
 *     responses:
 *       200:
 *         description: Category updated successfully
 */
router.put("/updateCategory/:id", updateCategoriValidator, updateCategory)

export default router