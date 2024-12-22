import express from "express";
import {
  AddProduct,
  DeleteProduct,
  GetAllProducts,
  UpdateProduct,
  GetAllCategories,
  GetProductById,
} from "../controllers/ProductController.js";

const router = express.Router();

// Routes
router.get("/categories", GetAllCategories); // Move this before /:productId
router.get("/all", GetAllProducts);
router.post("/new", AddProduct);
router.get("/:productId", GetProductById); // Generic routes should come last
router.put("/update/:productId", UpdateProduct);
router.delete("/delete/:productId", DeleteProduct);

export default router;
