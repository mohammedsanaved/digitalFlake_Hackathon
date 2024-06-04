import CategoryModel from "../models/CategoryModel.js";

export const AddCategory = async (req, res, next) => {
  try {
    const { categoryName, description, status } = req.body;

    const newCategory = new CategoryModel({
      categoryName,
      description,
      status,
    });

    const savedCategory = await newCategory.save();

    res.status(201).json({
      success: true,
      message: "Category created successfully",
      category: savedCategory,
    });
  } catch (error) {
    next(error);
  }
};

export const UpdateCategory = async (req, res, next) => {
  try {
    const { categoryId } = req.params;
    const { categoryName, description, status } = req.body;

    // Find the category by ID and update its details
    const updatedCategory = await CategoryModel.findByIdAndUpdate(
      categoryId,
      { categoryName, description, status },
      { new: true, runValidators: true }
    );

    // Check if the category was found and updated
    if (!updatedCategory) {
      return res.status(404).json({
        success: false,
        message: "Category not found",
      });
    }

    // Respond with the updated category details
    res.status(200).json({
      success: true,
      message: "Category updated successfully",
      category: updatedCategory,
    });
  } catch (error) {
    // Pass the error to the next middleware for centralized error handling
    next(error);
  }
};

export const DeleteCategory = async (req, res, next) => {
  try {
    const { categoryId } = req.params;

    const deletedCategory = await CategoryModel.findByIdAndDelete(categoryId);

    if (!deletedCategory) {
      return res.status(404).json({
        success: false,
        message: "Category not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Category deleted successfully",
      category: deletedCategory,
    });
  } catch (error) {
    next(error);
  }
};

export const GetAllCategories = async (req, res, next) => {
  try {
    res.status(200).json({
      success: true,
      ...res.PaginationResult,
    });
  } catch (error) {
    next(error);
  }
};

export const GetCategoryById = async (req, res, next) => {
  try {
    const { categoryId } = req.params;

    const category = await CategoryModel.findById(categoryId);

    if (!category) {
      return res.status(404).json({
        success: false,
        message: "Category not found",
      });
    }

    res.status(200).json({
      success: true,
      category,
    });
  } catch (error) {
    next(error);
  }
};


// const page = parseInt(req.query.page);
    // const limit = parseInt(req.query.limit);

    // const startIndex = (page - 1) * limit;
    // const endIndex = page * limit;

    // const categories = await CategoryModel.find();
    // const results = {};

    // if (endIndex < CategoryModel.length)
    //   results.next = {
    //     page: page + 1,
    //     limit: limit,
    //   };
    // if (startIndex > 0) {
    //   results.previous = {
    //     page: page - 1,
    //     limit: limit,
    //   };
    // }
    // results.rows = categories.slice(startIndex, endIndex);