import express from "express";
import { isAuthenticated } from "../middlewares/Auth.js";
import {
  AddCategory,
  DeleteCategory,
  GetAllCategories,
  UpdateCategory,
} from "../controllers/CategoryController.js";

const router = express.Router();
router.get("/all", GetAllCategories);
router.post("/new", AddCategory);
router.put("/update/:categoryId", UpdateCategory);
router.delete("/delete/:categoryId", DeleteCategory);

export default router;
