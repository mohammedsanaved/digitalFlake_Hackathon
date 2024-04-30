// import multer from "multer";
import ProductModel from "../models/ProductModel.js";
// import uploadImageToCloudinary from "../helper/uploadImageToCloudinary.js";
import uploadFiletoCloudinary from "../utils/uploadFiletoCloudinary.js";

// var uploader = multer({
//   storage: multer.diskStorage({}),
//   limits: { fileSize: 50000000 },
// });
export const AddProduct = async (req, res, next) => {
  try {
    const { name, packSize, MRP, category } = req.body;

    // Check if file is provided
    if (!req.file) {
      return res
        .status(400)
        .json({ success: false, message: "File is required" });
    }

    const productImage = await uploadFiletoCloudinary(req.file);

    const newProduct = new ProductModel({
      name,
      packSize,
      MRP,
      productImage,
      category,
    });

    const savedProduct = await newProduct.save();

    res.status(201).json({
      success: true,
      message: "Product created successfully",
      product: savedProduct,
    });
  } catch (error) {
    next(error);
  }
};


export const GetAllProducts = async (req, res, next) => {
  try {
    // Retrieve all products from the database
    const products = await ProductModel.find().populate("category");

    // Respond with the list of products
    res.status(200).json({
      success: true,
      products,
    });
  } catch (error) {
    // If an error occurs, pass it to the error handling middleware
    next(error);
  }
};

export const UpdateProduct = async (req, res, next) => {
  try {
    const { productId } = req.params;
    const { name, packSize, MRP, productImage, category } = req.body;

    const updatedProduct = await ProductModel.findByIdAndUpdate(
      productId,
      { name, packSize, MRP, productImage, category },
      { new: true, runValidators: true }
    );

    if (!updatedProduct) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Product updated successfully",
      product: updatedProduct,
    });
  } catch (error) {
    next(error);
  }
};

export const DeleteProduct = async (req, res, next) => {
  try {
    const { productId } = req.params;

    const deletedProduct = await ProductModel.findByIdAndDelete(productId);

    if (!deletedProduct) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Product deleted successfully",
    });
  } catch (error) {
    next(error);
  }
};
