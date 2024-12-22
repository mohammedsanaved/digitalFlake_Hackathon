import { useState, useEffect } from "react";
import { FaArrowLeft } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import {
  addProduct,
  getProductById,
  clearCurrentProduct,
  updateProduct,
} from "../redux/slice/product/productSlice";
import axios from "axios";
import { ToastSuccess } from "../components/UI/Toast";

const AddProduct = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [productName, setProductName] = useState("");
  const [packSize, setPackSize] = useState("");
  const [mrp, setMrp] = useState(0);
  const [selectStatus, setSelectStatus] = useState("active");
  const [selectedCategory, setSelectedCategory] = useState("");
  const dispatch = useDispatch();
  const { product, isLoading, isError, errorMessage } = useSelector(
    (state) => state.product
  );
  const [categories, setCategories] = useState([]);
  const [categoryLoading, setCategoryLoading] = useState(false);
  const [categoryError, setCategoryError] = useState(null);

  useEffect(() => {
    if (product) {
      setProductName(product.name);
      setPackSize(product.packSize);
      setMrp(product.MRP);
      setSelectStatus(product.status);
      setSelectedCategory(product.category.categoryName);
    }
  }, [product]);

  useEffect(() => {
    const fetchCategories = async () => {
      setCategoryLoading(true);
      try {
        const response = await axios.get(
          "http://localhost:8000/api/v1/category/all"
        );
        setCategories(response.data.categories);
        setCategoryError(null);
      } catch (error) {
        setCategoryError(
          error.response?.data?.message || "Failed to fetch categories"
        );
      } finally {
        setCategoryLoading(false);
      }
    };

    fetchCategories();
  }, []);

  useEffect(() => {
    if (id) {
      dispatch(getProductById(id));
    }
    return () => {
      dispatch(clearCurrentProduct());
    };
  }, [dispatch, id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const productData = {
      productName,
      packSize,
      mrp,
      selectStatus,
      category: selectedCategory,
    };

    try {
      if (id) {
        await dispatch(
          updateProduct({ id, updatedProduct: productData })
        ).unwrap();
        ToastSuccess("Product Updated Successfully");
      } else {
        await dispatch(addProduct(productData)).unwrap();
        ToastSuccess("Product Added Successfully");
      }
      navigate("/product"); // Navigate only after successful operation
    } catch (error) {
      // Handle error if needed
      console.error("Error:", error);
    }
  };

  return (
    <>
      <div className="max-w-[100%] mx-auto p-6 bg-white shadow-md rounded-lg h-[100%]">
        <div className="flex items-center justify-start gap-3 mb-6">
          <FaArrowLeft
            onClick={() => navigate("/product")}
            className="cursor-pointer"
          />
          <h2 className="text-xl font-semibold text-zinc-800">
            {id ? "Edit Product" : " Add Product"}
          </h2>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
            <div>
              <label
                htmlFor="category"
                className="block text-sm font-medium text-zinc-700"
              >
                Category
              </label>
              <select
                id="category"
                name="category"
                className="mt-1 block w-full py-2 px-3 border border-zinc-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-purple-500 focus:border-purple-500 sm:text-sm"
                onChange={(e) => setSelectedCategory(e.target.value)}
                value={selectedCategory}
                disabled={categoryLoading}
              >
                <option value="">Select Category</option>
                {categories.map((category) => (
                  <option key={category._id} value={category.categoryName}>
                    {category.categoryName}
                  </option>
                ))}
              </select>
              {categoryLoading && (
                <div className="text-sm text-gray-500">
                  Loading categories...
                </div>
              )}
              {categoryError && (
                <div className="text-sm text-red-500">{categoryError}</div>
              )}
            </div>
            <div>
              <label
                htmlFor="productName"
                className="block text-sm font-medium text-zinc-700"
              >
                Product Name
              </label>
              <input
                type="text"
                name="productName"
                id="productName"
                value={productName}
                onChange={(e) => setProductName(e.target.value)}
                className="mt-1 block w-full py-2 px-3 border border-zinc-300 rounded-md shadow-sm focus:outline-none focus:ring-purple-500 focus:border-purple-500 sm:text-sm"
                placeholder="Product Name"
              />
            </div>
            <div>
              <label
                htmlFor="packSize"
                className="block text-sm font-medium text-zinc-700"
              >
                Pack Size
              </label>
              <input
                type="text"
                name="packSize"
                id="packSize"
                value={packSize}
                onChange={(e) => setPackSize(e.target.value)}
                className="mt-1 block w-full py-2 px-3 border border-zinc-300 rounded-md shadow-sm focus:outline-none focus:ring-purple-500 focus:border-purple-500 sm:text-sm"
                placeholder="Pack Size"
              />
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <div>
              <label
                htmlFor="mrp"
                className="block text-sm font-medium text-zinc-700"
              >
                MRP
              </label>
              <input
                type="number"
                name="mrp"
                id="mrp"
                value={mrp}
                onChange={(e) => setMrp(Number(e.target.value))}
                className="mt-1 block w-full py-2 px-3 border border-zinc-300 rounded-md shadow-sm focus:outline-none focus:ring-purple-500 focus:border-purple-500 sm:text-sm"
                placeholder="MRP"
              />
            </div>
            <div>
              <label
                htmlFor="status"
                className="block text-sm font-medium text-zinc-700"
              >
                Status
              </label>
              <select
                id="status"
                name="status"
                value={selectStatus}
                onChange={(e) => setSelectStatus(e.target.value)}
                className="mt-1 block w-full py-2 px-3 border border-zinc-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-purple-500 focus:border-purple-500 sm:text-sm"
              >
                <option value="active">Active</option>
                <option value="inactive">Inactive</option>
              </select>
            </div>
          </div>
          {isLoading && <div>Adding product...</div>}
          {isError && <div className="text-red-500">{errorMessage}</div>}
          <div className="flex justify-end gap-4">
            <button
              type="button"
              className="py-2 px-4 rounded-lg bg-slate-100"
              onClick={() => navigate("/product")}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="py-2 px-4 rounded-lg bg-purple-600 text-white"
            >
              {id ? "Update" : "Add"}
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default AddProduct;
