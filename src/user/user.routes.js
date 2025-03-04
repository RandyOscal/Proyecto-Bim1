import { Router } from "express"
import { validateJWT } from "../middlewares/validate-jwt.js"
import { hasRoles } from "../middlewares/validate-roles.js"
import { getUserById, getUsers, deleteUser, updateRole, updateUser } from "./user.controller.js"
import { getUserByIdValidator, updateRoleValidator, updateUserValidator, deleteUserValidator } from "../middlewares/user-validator.js"

const router = Router()

router.get("/findUser/:uid", getUserByIdValidator, getUserById)

router.get("/", validateJWT, hasRoles("ADMIN_ROLE"), getUsers)

router.delete("/deleteUser", deleteUserValidator, deleteUser)

router.patch("/updateRole/:uid", updateRoleValidator, updateRole)

router.put("/updateUser/:uid", updateUserValidator, updateUser)


export default router
