import { FaArrowLeft } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const AddProduct = () => {
  const navigate = useNavigate();
  return (
    <>
      <div className="max-w-[100%] mx-auto p-6 bg-white shadow-md rounded-lg h-[100%]">
        <div
          className="flex items-center justify-start gap-3 mb-6"
          // onClick={navigate("/product")}
        >
          <FaArrowLeft
            onClick={() => navigate("/product")}
            className="cursor-pointer"
          />
          <h2 className="text-xl font-semibold text-zinc-800">Add Product</h2>
          <span></span>
        </div>
        <form>
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
                <option selected>Choose a category</option>
                <option>Milk</option>
                <option>Fruit</option>
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
                className="mt-1 block w-full py-2 px-3 border border-zinc-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-purple-500 focus:border-purple-500 sm:text-sm"
              >
                <option selected>Choose a status</option>
                <option>Active</option>
                <option>inActive</option>
              </select>
            </div>
          </div>
          <div className="flex justify-end gap-4">
            <button className="py-2 px-4 rounded-lg bg-slate-100">
              Cancel
            </button>
            <button className="py-2 px-4 rounded-lg bg-purple-600 text-white">
              Add
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default AddProduct;
