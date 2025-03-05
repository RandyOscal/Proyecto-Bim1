import { Router } from "express";
import { addToCart, getCart, removeFromCart } from "./cart.controller.js";
import { validateJWT } from "../middlewares/validate-jwt.js";

const router = Router();

/**
 * @swagger
 * /addCart:
 *   post:
 *     summary: Adds a product to the cart.
 *     tags: [Cart]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Product added to cart successfully.
 *       400:
 *         description: Bad request.
 *       500:
 *         description: Internal server error.
 */
router.post("/addCart", validateJWT, addToCart);

/**
 * @swagger
 * /getCart:
 *   get:
 *     summary: Retrieves the user's cart.
 *     tags: [Cart]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Cart retrieved successfully.
 *       400:
 *         description: Bad request.
 *       500:
 *         description: Internal server error.
 */
router.get("/getCart", validateJWT, getCart);

/**
 * @swagger
 * /removeFromCart:
 *   delete:
 *     summary: Removes a product from the cart.
 *     tags: [Cart]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Product removed from cart successfully.
 *       400:
 *         description: Bad request.
 *       500:
 *         description: Internal server error.
 */
router.delete("/removeFromCart", validateJWT, removeFromCart);

export default router;