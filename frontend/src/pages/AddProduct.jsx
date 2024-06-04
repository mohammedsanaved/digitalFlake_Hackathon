import { useState } from "react";
import { FaArrowLeft } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { addProduct } from "../redux/slice/product/productSlice";

const AddProduct = () => {
  const navigate = useNavigate();
  const [productName, setProductName] = useState("");
  const [packSize, setPackSize] = useState("");
  const [mrp, setMrp] = useState(0);
  const [selectStatus, setSelectStatus] = useState("active");
  const [productImage, setProductImage] = useState(null);
  const dispatch = useDispatch();
  const { categories } = useSelector((state) => state.category);

  const handleSubmit = (e) => {
    e.preventDefault();
    const newProduct = {
      productName,
      packSize,
      mrp,
      selectStatus,
      productImage,
    };
    dispatch(addProduct(newProduct));
    console.log(productImage, productName, mrp, selectStatus, packSize);
  };

  return (
    <>
      <div className="max-w-[100%] mx-auto p-6 bg-white shadow-md rounded-lg h-[100%]">
        <div className="flex items-center justify-start gap-3 mb-6">
          <FaArrowLeft
            onClick={() => navigate("/product")}
            className="cursor-pointer"
          />
          <h2 className="text-xl font-semibold text-zinc-800">Add Product</h2>
          <span></span>
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
              >
                {categories.map((category) => (
                  <option key={category._id} value={category.categoryName}>
                    {category.categoryName}
                  </option>
                ))}
                {/* <option>Milk</option> */}
                {/* <option>Fruit</option> */}
              </select>
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
                htmlFor="productImage"
                className="block text-sm font-medium text-zinc-700"
              >
                Product Image
              </label>
              <input
                type="file"
                name="productImage"
                id="productImage"
                onChange={(e) => setProductImage(e.target.files[0])}
                className="mt-1 block w-full py-2 px-3 border border-zinc-300 rounded-md shadow-sm focus:outline-none focus:ring-purple-500 focus:border-purple-500 sm:text-sm"
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
              Add
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default AddProduct;
