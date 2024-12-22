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

    // Add validation
    if (!productName || !packSize || !mrp || !category) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    // Find the category ID
    const categoryDoc = await CategoryModel.findOne({ categoryName: category });
    if (!categoryDoc) {
      return res.status(404).json({
        success: false,
        message: "Category not found",
      });
    }

    // Create a new product with the found category ID
    const newProduct = new ProductModel({
      name: productName,
      packSize,
      MRP: mrp,
      category: categoryDoc._id,
      status: selectStatus,
    });

    const savedProduct = await newProduct.save();

    // Populate the category details before sending response
    const populatedProduct = await savedProduct.populate("category");

    res.status(201).json({
      success: true,
      message: "Product created successfully",
      product: populatedProduct,
    });
  } catch (error) {
    next(error);
  }
};

// Get All Products
export const GetAllProducts = async (req, res, next) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;

    const skip = (page - 1) * limit;
    const total = await ProductModel.countDocuments();

    // Retrieve all products from the database
    const products = await ProductModel.find()
      .skip(skip)
      .limit(limit)
      .populate("category");

    // Respond with the list of products
    res.status(200).json({
      success: true,
      currentPage: page,
      total,
      totalPages: Math.ceil(total / limit),
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
    const { productName, packSize, mrp, selectStatus, category } = req.body;

    // Find category ID
    const categoryDoc = await CategoryModel.findOne({ categoryName: category });
    if (!categoryDoc) {
      return res.status(404).json({
        success: false,
        message: "Category not found",
      });
    }

    const updatedProduct = await ProductModel.findByIdAndUpdate(
      productId,
      {
        name: productName,
        packSize,
        MRP: mrp,
        status: selectStatus,
        category: categoryDoc._id,
      },
      { new: true, runValidators: true }
    ).populate("category");

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

// Get All Categories
export const GetAllCategories = async (req, res, next) => {
  try {
    // Simple fetch without pagination for dropdown
    const categories = await CategoryModel.find({}, "categoryName");

    res.status(200).json({
      success: true,
      categories,
    });
  } catch (error) {
    next(error);
  }
};

export const GetProductById = async (req, res, next) => {
  try {
    const { productId } = req.params;

    const product = await ProductModel.findById(productId).populate("category");

    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    res.status(200).json({
      success: true,
      product,
    });
  } catch (error) {
    next(error);
  }
};
