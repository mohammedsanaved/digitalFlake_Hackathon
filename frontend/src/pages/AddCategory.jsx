import { useEffect, useState } from "react";
import { FaArrowLeft } from "react-icons/fa";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  addCategory,
  updateCategory,
  fetchCategoryById,
} from "../redux/slice/category/categorySlice";
import { ToastSuccess } from "../components/UI/Toast.js";

const AddCategory = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const dispatch = useDispatch();
  const { category, isLoading, isError } = useSelector(
    (state) => state.category
  );

  const [categoryName, setCategoryName] = useState("");
  const [description, setDescription] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("active");

  useEffect(() => {
    if (id) {
      console.log(id, "Id----------->");
      dispatch(fetchCategoryById(id));
    }
  }, [dispatch, id]);

  useEffect(() => {
    if (category) {
      setCategoryName(category.categoryName);
      setDescription(category.description);
      setSelectedStatus(category.status);
    }
  }, [category]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const newCategory = { categoryName, description, status: selectedStatus };
    if (id) {
      dispatch(updateCategory({ id, updatedCategory: newCategory }));
      setCategoryName("");
      setDescription("");
      setSelectedStatus("");
      ToastSuccess("Category Update Successfully");
    } else {
      dispatch(addCategory(newCategory));
      ToastSuccess("New Category Added");
    }
    navigate("/category");
  };

  return (
    <div className="max-w-[100%] mx-auto p-6 bg-white shadow-md rounded-lg h-[100%]">
      <div className="flex items-center justify-start gap-3 mb-6">
        <FaArrowLeft
          onClick={() => navigate("/category")}
          className="cursor-pointer"
        />
        <h2 className="text-xl font-semibold text-zinc-800">
          {id ? "Edit Category" : "Add Category"}
        </h2>
      </div>
      {isLoading ? (
        <div>Loading...</div>
      ) : isError ? (
        <div>Error loading category</div>
      ) : (
        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
            <div>
              <label
                htmlFor="CategoryName"
                className="block text-sm font-medium text-zinc-700"
              >
                Category Name
              </label>
              <input
                type="text"
                name="CategoryName"
                id="CategoryName"
                value={categoryName}
                onChange={(e) => setCategoryName(e.target.value)}
                className="mt-1 block w-full py-2 px-3 border border-zinc-300 rounded-md shadow-sm focus:outline-none focus:ring-purple-500 focus:border-purple-500 sm:text-sm"
                placeholder="Category Name"
              />
            </div>
            <div>
              <label
                htmlFor="Description"
                className="block text-sm font-medium text-zinc-700"
              >
                Description
              </label>
              <input
                type="text"
                name="description"
                id="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="mt-1 block w-full py-2 px-3 border border-zinc-300 rounded-md shadow-sm focus:outline-none focus:ring-purple-500 focus:border-purple-500 sm:text-sm"
                placeholder="Description"
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
                value={selectedStatus}
                onChange={(e) => setSelectedStatus(e.target.value)}
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
              onClick={() => navigate("/category")}
              className="py-2 px-4 rounded-lg bg-slate-100"
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
      )}
    </div>
  );
};

export default AddCategory;
