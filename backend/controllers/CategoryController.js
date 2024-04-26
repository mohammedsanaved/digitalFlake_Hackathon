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

    const updatedCategory = await CategoryModel.findByIdAndUpdate(
      categoryId,
      { categoryName, description, status },
      { new: true, runValidators: true }
    );

    if (!updatedCategory) {
      return res.status(404).json({
        success: false,
        message: "Category not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Category updated successfully",
      category: updatedCategory,
    });
  } catch (error) {
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
    const categories = await CategoryModel.find();

    res.status(200).json({
      success: true,
      categories,
    });
  } catch (error) {
    next(error);
  }
};
