import express from "express";
import {
  AddProduct,
  DeleteProduct,
  GetAllProducts,
  UpdateProduct,
} from "../controllers/ProductController.js";
// import upload from "../middlewares/multerMiddleware.js";
import uploadFiletoCloudinary from "../utils/uploadFiletoCloudinary.js";

const router = express.Router();

// Configure Multer for file upload
// const storage = multer.diskStorage({
//   destination: (req, file, cb) => {
//     cb(null, "uploads/"); // Specify the destination directory for uploaded files
//   },
//   filename: (req, file, cb) => {
//     cb(null, Date.now() + "-" + file.originalname); // Generate a unique filename for the uploaded file
//   },
// });

// const upload = multer({ storage });

// // Error handling middleware
// router.use((err, req, res, next) => {
//   console.error(err.stack);
//   res.status(500).json({ success: false, message: "Internal Server Error" });
// });
// var uploader = multer({
//   storage: multer.diskStorage({}),
//   limits: { fileSize: 50000000 },
// });

// Routes

router.post(
  "/new",
  // upload.single("file"),
  async (req, res, next) => {
    try {
      const productImage = await uploadFiletoCloudinary(req);
      console.log(productImage, "image-------------------------------->");
      req.body.file = productImage; // Add uploaded file to request body
      next(); // Move to the next middleware
    } catch (error) {
      next(error);
    }
  },
  AddProduct
);
router.get("/all", GetAllProducts);
router.put("/update/:productId", UpdateProduct);
router.delete("/delete/:productId", DeleteProduct);

export default router;
