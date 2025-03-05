import { body, param } from "express-validator";
import { productExists, productNameExists, productIDExists} from "../helpers/db-validator.js";
import { validarCampos } from "./validate-files.js";
import { handleErrors } from "./handle-errors.js";
import { validateJWT } from "./validate-jwt.js";
import { hasRoles } from "./validate-roles.js";

export const addProductValidator = [
    validateJWT,
    hasRoles("ADMIN_ROLE"),
    body("productName").notEmpty().withMessage("El nombre del producto es requerido"),
    body("productName").custom(productExists),
    validarCampos,
    handleErrors
]

export const getProductByNameValidator = [
    param("productName").notEmpty().withMessage("El nombre del producto es requerido").custom(productNameExists),
    validarCampos,
    handleErrors
]

export const getProductOutOfStockValidator = [
    validateJWT,
    hasRoles("ADMIN_ROLE"),
    validarCampos,
    handleErrors
]

export const updateProductValidator = [
    validateJWT,
    hasRoles("ADMIN_ROLE"),
    param("pid", "No es un ID válido").isMongoId(),
    param("pid").custom(productIDExists),
    validarCampos,
    handleErrors
]

export const deleteProductValidator = [
    validateJWT,
    hasRoles("ADMIN_ROLE"),
    param("pid").isMongoId().withMessage("No es un ID válido de MongoDB"),
    param("pid").custom(productIDExists),
    validarCampos,
    handleErrors
]