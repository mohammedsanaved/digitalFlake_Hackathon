import ProductModel from "../models/ProductModel.js";
import CategoryModel from "../models/CategoryModel.js";

// Helper function to find category ID by name
const findCategoryIdByName = async (categoryName) => {
  if (!categoryName || typeof categoryName !== "string") {
    throw new Error("Invalid category name");
  }
  console.log("category------------------->", categoryName);

  const normalizedCategoryName = categoryName.trim().toLowerCase();
  console.log(
    "normalizedCategoryName---------------->",
    normalizedCategoryName
  );
  const category = await CategoryModel.findOne({
    categoryName,
  });

  console.log("data---------------->", category);

  if (category) {
    return category._id;
  } else {
    // Handle case where category is not found
    throw new Error("Category not found");
  }
};

export const AddProduct = async (req, res, next) => {
  try {
    const { productName, packSize, mrp, selectStatus, category } = req.body;

    // Find the category ID based on the category name
    const categoryId = await findCategoryIdByName(category);

    // Create a new product
    const newProduct = new ProductModel({
      name: productName,
      packSize,
      MRP: mrp,
      category: categoryId,
      status: selectStatus,
    });

    const savedProduct = await newProduct.save();

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
