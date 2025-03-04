import { Router } from "express"
import { addCategory, getCategory, updateCategory, deleteCategory } from "./category.controller.js"
import { addCategoryValidator, getCategoryValidator, updateCategoriValidator, deleteCategoryValidator } from "../middlewares/category-validator.js"

const router = Router()

router.post("/AddCategory", addCategoryValidator, addCategory)

router.get("/getCategorys", getCategoryValidator, getCategory)

router.delete("/deleteCategory/:cid", deleteCategoryValidator, deleteCategory)

router.put("/updateCategory/:cid", updateCategoriValidator, updateCategory)

export default router