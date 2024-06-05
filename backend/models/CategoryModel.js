import mongoose from "mongoose";

const categorySchema = new mongoose.Schema({
  categoryName: {
    type: String,
    required: true,
    trim: true, // Remove whitespace from category name
  },
  description: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    enum: ["active", "inactive"], // Status can only be active or inactive
    default: "active",
  },
  // product: {
  //   type: mongoose.Schema.Types.ObjectId,
  //   ref: "Product",
  //   required: true,
  // },
});

const CategoryModel = mongoose.model("Category", categorySchema);

export default CategoryModel;
