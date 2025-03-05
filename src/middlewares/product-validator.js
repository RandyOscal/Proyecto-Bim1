import { body, param } from "express-validator";
import { productExists, productIDExists} from "../helpers/db-validator.js";
import { validarCampos } from "./validate-files.js";
import { handleErrors } from "./handle-errors.js";
import { validateJWT } from "./validate-jwt.js";
import { hasRoles } from "./validate-roles.js";
import  Producto  from "../product/product.model.js";
import { query } from "express-validator";

export const addProductValidator = [
    validateJWT,
    hasRoles("ADMIN_ROLE"),
    body("productName").notEmpty().withMessage("El nombre del producto es requerido"),
    body("productName").custom(productExists),
    validarCampos,
    handleErrors
]

export const getProductByNameValidator = [
    validateJWT,
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
    param("id", "No es un ID válido").isMongoId(),
    param("id").custom(productIDExists),
    validarCampos,
    handleErrors
]

export const deleteProductValidator = [
    validateJWT,
    hasRoles("ADMIN_ROLE"),
    param("id").isMongoId().withMessage("No es un ID válido de MongoDB"),
    param("id").custom(productIDExists),
    validarCampos,
    handleErrors
]