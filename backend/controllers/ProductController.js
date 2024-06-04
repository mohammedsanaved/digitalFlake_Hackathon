import ProductModel from "../models/ProductModel.js";
import uploadFiletoCloudinary from "../utils/uploadFiletoCloudinary.js";
// import { v2 as cloudinary } from "cloudinary";

// Configure Cloudinary
// cloudinary.config({
//   cloud_name: process.env.CLOUDINARY_NAME,
//   api_key: process.env.CLOUDINARY_KEY,
//   api_secret: process.env.CLOUDINARY_SECRET,
// });

// // Helper function to upload file to Cloudinary
// const uploadFiletoCloudinary = async (file) => {
//   const result = await cloudinary.uploader.upload(file.path);
//   return {
//     url: result.secure_url,
//     public_id: result.public_id,
//   };
// };

// Add Product
export const AddProduct = async (req, res, next) => {
  try {
    const { name, packSize, MRP, category } = req.body;

    // Check if file is provided
    if (!req.file) {
      return res
        .status(400)
        .json({ success: false, message: "File is required" });
    }

    // Upload image to Cloudinary
    const productImage = await uploadFiletoCloudinary(req.file);
    console.log("Image----------------------->", productImage);

    // Create a new product
    const newProduct = new ProductModel({
      name,
      packSize,
      MRP,
      image: {
        url: productImage.url,
        public_id: productImage.public_id,
      },
      category,
    });
    console.log("newProduct------------------------------->", newProduct);

    // Save the product to the database
    const savedProduct = await newProduct.save();
    console.log("savedProduct------------------------------->", savedProduct);

    // Respond with success
    res.status(201).json({
      success: true,
      message: "Product created successfully",
      product: savedProduct,
    });
  } catch (error) {
    next(error);
  }
};

// Get All Products
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

// Update Product
export const UpdateProduct = async (req, res, next) => {
  try {
    const { productId } = req.params;
    const { name, packSize, MRP, category } = req.body;

    // Check if a new file is provided for the update
    let updatedData = { name, packSize, MRP, category };

    if (req.file) {
      // Upload new image to Cloudinary
      const productImage = await uploadFiletoCloudinary(req.file);
      updatedData.image = {
        url: productImage.url,
        public_id: productImage.public_id,
      };
    }

    // Update the product
    const updatedProduct = await ProductModel.findByIdAndUpdate(
      productId,
      updatedData,
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

// Delete Product
export const DeleteProduct = async (req, res, next) => {
  try {
    const { productId } = req.params;

    const deletedProduct = await ProductModel.findByIdAndDelete(productId);

    // Remove image from Cloudinary
    if (deletedProduct.image && deletedProduct.image.public_id) {
      await cloudinary.uploader.destroy(deletedProduct.image.public_id);
    }

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
