import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  packSize: {
    type: String,
    required: true,
  },
  MRP: {
    type: Number,
    required: true,
  },
  // image: {
  //   url: String,
  //   public_id: String,
  // },
  status: {
    type: String,
    enum: ["active", "inactive"],
    default: "active",
  },
  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Category",
    required: true,
  },
});

const ProductModel = mongoose.model("Product", productSchema);

export default ProductModel;
