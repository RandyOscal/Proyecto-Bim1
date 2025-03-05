import { Router } from "express";
import { addProduct, getProductByName, getProductsOutOfStock, getProducts, listProducts, updateProduct, deleteProduct } from "./product.controller.js";
import { addProductValidator, getProductByNameValidator, getProductOutOfStockValidator, updateProductValidator, deleteProductValidator } from "../middlewares/product-validator.js"

const router = Router();

router.post("/addProduct", addProductValidator, addProduct);

router.get("/getProduct", getProductByNameValidator, getProductByName);//no funciona

router.get("/getProductsOutOfStock", getProductOutOfStockValidator, getProductsOutOfStock);

router.get("/getProducts", getProducts);

router.get("/filterProducts", listProducts);

router.put("/updateProduct/:id", updateProductValidator, updateProduct);

router.delete("/deleteProduct/:id", deleteProductValidator, deleteProduct);

export default router;
