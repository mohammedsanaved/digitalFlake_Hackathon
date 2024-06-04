import express from "express";
// import { isAuthenticated } from "../middlewares/Auth.js";
import {
  AddCategory,
  DeleteCategory,
  GetAllCategories,
  GetCategoryById,
  UpdateCategory,
} from "../controllers/CategoryController.js";
import { PaginationResult } from "../middlewares/PaginationMiddleware.js";
import CategoryModel from "../models/CategoryModel.js";

const router = express.Router();
router.get("/all", PaginationResult(CategoryModel), GetAllCategories);
router.get("/:categoryId", GetCategoryById);
router.post("/new", AddCategory);
router.put("/update/:categoryId", UpdateCategory);
router.delete("/delete/:categoryId", DeleteCategory);

export default router;
