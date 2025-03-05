import { Router } from "express"
import { validateJWT } from "../middlewares/validate-jwt.js"
import { hasRoles } from "../middlewares/validate-roles.js"
import { getUserById, getUsers, deleteUser, updateRole, updateUser } from "./user.controller.js"
import { getUserByIdValidator, updateRoleValidator, updateUserValidator, deleteUserValidator } from "../middlewares/user-validator.js"

const router = Router()

/**
 * @swagger
 * /findUser/{uid}:
 *   get:
 *     summary: Get user by ID
 *     parameters:
 *       - in: path
 *         name: uid
 *         required: true
 *         schema:
 *           type: string
 *         description: User ID
 *     responses:
 *       200:
 *         description: User found
 */
router.get("/findUser/:uid", getUserByIdValidator, getUserById)

/**
 * @swagger
 * /:
 *   get:
 *     summary: Get all users
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of users
 */
router.get("/", validateJWT, hasRoles("ADMIN_ROLE"), getUsers)

/**
 * @swagger
 * /deleteUser:
 *   delete:
 *     summary: Delete a user
 *     responses:
 *       200:
 *         description: User deleted
 */
router.delete("/deleteUser", deleteUserValidator, deleteUser)

/**
 * @swagger
 * /updateRole/{uid}:
 *   patch:
 *     summary: Update user role
 *     parameters:
 *       - in: path
 *         name: uid
 *         required: true
 *         schema:
 *           type: string
 *         description: User ID
 *     responses:
 *       200:
 *         description: User role updated
 */
router.patch("/updateRole/:uid", updateRoleValidator, updateRole)

/**
 * @swagger
 * /updateUser/{uid}:
 *   put:
 *     summary: Update user information
 *     parameters:
 *       - in: path
 *         name: uid
 *         required: true
 *         schema:
 *           type: string
 *         description: User ID
 *     responses:
 *       200:
 *         description: User information updated
 */
router.put("/updateUser/:uid", updateUserValidator, updateUser)

export default router