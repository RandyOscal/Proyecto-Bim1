import { Router } from "express";
import { addProduct, getProductByName, getProductsOutOfStock, getProducts, listProducts, updateProduct, deleteProduct } from "./product.controller.js";
import { addProductValidator, getProductByNameValidator, getProductOutOfStockValidator, updateProductValidator, deleteProductValidator } from "../middlewares/product-validator.js"

const router = Router();

router.post("/addProduct", addProductValidator, addProduct);

router.get("/getProduct/:productName", getProductByNameValidator, getProductByName);

router.get("/getProductsOutOfStock", getProductOutOfStockValidator, getProductsOutOfStock);

router.get("/getProducts", listProducts);

router.get("/filterProducts", getProducts);

router.put("/updateProduct/:pid", updateProductValidator, updateProduct);

router.delete("/deleteProduct/:pid", deleteProductValidator, deleteProduct);

export default router;
