import { body, param } from "express-validator";
import { emailExists, userExists, usernameExists } from "../helpers/db-validator.js";
import { validarCampos } from "./validate-files.js";
import { handleErrors } from "./handle-errors.js";
import { validateJWT } from "./validate-jwt.js";
import { hasRoles } from "./validate-roles.js";
import { roleBlock } from "../helpers/db-validator.js";

export const registerValidator = [
    body("name").notEmpty().withMessage("El nombre es requerido"),
    body("email").notEmpty().withMessage("El email es requerido"),
    body("username").notEmpty().withMessage("El username es requerido"),
    body("email").isEmail().withMessage("No es un email válido"),
    body("role").optional().custom(roleBlock),
    body("email").custom(emailExists),
    body("username").custom(usernameExists),
    body("password").isStrongPassword({
        minLength: 8,
        minLowercase:1,
        minUppercase: 1,
        minNumbers: 1,
        minSymbols: 1
    }),
    validarCampos,
    handleErrors
]

export const loginValidator = [
    body("email").optional().isEmail().withMessage("No es un email válido"),
    body("username").optional().isString().withMessage("Username es en formáto erróneo"),
    body("password").isLength({min: 4}).withMessage("El password debe contener al menos 8 caracteres"),
    validarCampos,
    handleErrors
]

export const getUserByIdValidator = [
    validateJWT,
    param("uid").isMongoId().withMessage("No es un ID válido de MongoDB"),
    param("uid").custom(userExists),
    validarCampos,
    handleErrors
]

export const deleteUserValidator = [
    validateJWT,
    validarCampos,
    handleErrors
]

export const updateRoleValidator = [
    validateJWT,
    hasRoles("ADMIN_ROLE"),
    param("uid").isMongoId().withMessage("No es un ID válido de MongoDB"),
    param("uid").custom(userExists),
    validarCampos,
    handleErrors
]

export const updateUserValidator = [
    validateJWT,
    body("role").optional().custom(roleBlock),
    param("uid", "No es un ID válido").isMongoId(),
    param("uid").custom(userExists),
    validarCampos,
    handleErrors
]


