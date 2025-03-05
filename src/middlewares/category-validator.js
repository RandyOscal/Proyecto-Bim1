import { body, param } from "express-validator";
import { categoryExists, categoryIDExists } from "../helpers/db-validator.js";
import { validarCampos } from "./validate-files.js";
import { handleErrors } from "./handle-errors.js";
import { validateJWT } from "./validate-jwt.js";
import { hasRoles } from "./validate-roles.js";

export const addCategoryValidator = [
    validateJWT,
    hasRoles("ADMIN_ROLE"),
    body("categoryName").notEmpty().withMessage("El nombre de la categoria es requerido"),
    body("categoryName").custom(categoryExists),
    validarCampos,
    handleErrors
]

export const getCategoryValidator = [
    validarCampos,
    handleErrors
]

export const deleteCategoryValidator = [
    validateJWT,
    hasRoles("ADMIN_ROLE"),
    param("id").isMongoId().withMessage("No es un ID válido de MongoDB"),
    param("id").custom(categoryIDExists),
    validarCampos,
    handleErrors
]

export const updateCategoriValidator = [
    validateJWT,
    hasRoles("ADMIN_ROLE"),
    param("id", "No es un ID válido").isMongoId(),
    param("id").custom(categoryIDExists),
    validarCampos,
    handleErrors
]