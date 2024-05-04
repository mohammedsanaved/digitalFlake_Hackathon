import { useState } from "react";
import { FaArrowLeft } from "react-icons/fa";

const AddCategory = () => {
  const [categoryName, setCategoryName] = useState("");
  const [description, setDescription] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("Status");
  return (
    <>
      <div className="max-w-[100%] mx-auto p-6 bg-white shadow-md rounded-lg h-[100%]">
        <div className="flex items-center justify-start gap-3 mb-6">
          <FaArrowLeft />
          <h2 className="text-xl font-semibold text-zinc-800">Add Category</h2>
          <span></span>
        </div>
        <form>
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
                htmlFor="Description
                "
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
                htmlFor="category"
                className="block text-sm font-medium text-zinc-700"
              >
                Status
              </label>
              <select
                id="category"
                name="category"
                value={selectedStatus}
                onChange={(e) => setSelectedStatus(e.target.value)}
                className="mt-1 block w-full py-2 px-3 border border-zinc-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-purple-500 focus:border-purple-500 sm:text-sm"
              >
                <option value={"Status"} selected>
                  Status
                </option>
                <option value={"active"}>Active</option>
                <option value={"inactive"}>inActive</option>
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

export default AddCategory;
