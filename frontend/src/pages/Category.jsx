import { useEffect, useState } from "react";
import { BiCategory } from "react-icons/bi";
import { FaEdit, FaRegTrashAlt } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteCategory,
  getAllCategory,
} from "../redux/slice/category/categorySlice";
import { ToastSuccess, ToastError } from "../components/UI/Toast";

const Category = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { categories, isLoading, isError } = useSelector(
    (state) => state.category
  );
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  useEffect(() => {
    dispatch(getAllCategory());
  }, [dispatch]);

  const handleRoute = () => {
    navigate("/category/new");
  };

  const handleDelete = (id) => {
    dispatch(deleteCategory(id));
    ToastSuccess("Delete Successfully");
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
    setCurrentPage(1); // Reset to the first page on search
  };

  const filteredCategories = categories?.filter((category) =>
    category.categoryName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Pagination logic
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredCategories?.slice(
    indexOfFirstItem,
    indexOfLastItem
  );
  const totalPages = Math.ceil(filteredCategories?.length / itemsPerPage);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <>
      <div className="flex justify-between items-center shadow-lg p-4 bg-white rounded-lg">
        <div className="flex gap-2 items-center">
          <BiCategory className="text-2xl" />
          <div className="font-bold text-lg">Category</div>
        </div>
        <div className="border rounded-lg overflow-hidden">
          <input
            type="text"
            name="search"
            id="search"
            className="border-none px-3 py-2 w-full"
            placeholder="Search..."
            value={searchTerm}
            onChange={handleSearchChange}
          />
        </div>
        <div>
          <button
            className="bg-[#662671] hover:bg-[#662669] text-white font-bold py-2 px-4 rounded"
            onClick={handleRoute}
          >
            Add New
          </button>
        </div>
      </div>

      <div className="overflow-x-auto rounded-lg border border-gray-200 mt-3">
        <table className="min-w-full divide-y-2 divide-gray-200 bg-white text-sm">
          <thead className="text-left">
            <tr>
              <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                ID
              </th>
              <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                Name
              </th>
              <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                Description
              </th>
              <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                Status
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {isLoading ? (
              <tr>
                <td
                  colSpan="4"
                  className="whitespace-nowrap px-4 py-2 text-center text-gray-700"
                >
                  Loading...
                </td>
              </tr>
            ) : isError ? (
              <tr>
                <td
                  colSpan="4"
                  className="whitespace-nowrap px-4 py-2 text-center text-gray-700"
                >
                  Error: {isError}
                </td>
              </tr>
            ) : filteredCategories?.length === 0 ? (
              <tr>
                <td
                  colSpan="4"
                  className="whitespace-nowrap px-4 py-2 text-center text-gray-700"
                >
                  No categories found.
                </td>
              </tr>
            ) : (
              currentItems.map((item, i) => (
                <tr key={i}>
                  <td className="whitespace-nowrap px-4 py-2 text-gray-700">
                    {indexOfFirstItem + i + 1}
                  </td>
                  <td className="whitespace-nowrap px-4 py-2 text-gray-700">
                    {item.categoryName}
                  </td>
                  <td className="whitespace-nowrap px-4 py-2 text-gray-700">
                    {item.description}
                  </td>
                  <td className="whitespace-nowrap px-4 py-2 flex gap-6 items-center">
                    <span
                      style={{
                        color: item.status === "active" ? "green" : "red",
                      }}
                    >
                      {item.status}
                    </span>
                    <span className="p-2 hover:bg-blue-100 hover:shadow-lg rounded-xl duration-300 cursor-pointer">
                      <FaEdit
                        className="text-xl duration-300 text-blue-400"
                        onClick={() => navigate(`/category/${item._id}`)}
                      />
                    </span>
                    <span className="p-2 hover:bg-red-200 hover:shadow-lg duration-300 rounded-xl cursor-pointer">
                      <FaRegTrashAlt
                        className="text-xl duration-300 text-red-500"
                        onClick={() => handleDelete(item._id)}
                      />
                    </span>
                  </td>
                </tr>
              ))
            )}
          </tbody>
          <tfoot>
            <tr>
              <td colSpan="4" className="px-4 py-2">
                <div className="flex justify-start gap-2 items-center">
                  <button
                    onClick={() => handlePageChange(currentPage - 1)}
                    disabled={currentPage === 1}
                    className="px-3 py-1 bg-gray-300 rounded disabled:opacity-50"
                  >
                    Previous
                  </button>
                  <span>
                    Page {currentPage} of {totalPages}
                  </span>
                  <button
                    onClick={() => handlePageChange(currentPage + 1)}
                    disabled={currentPage === totalPages}
                    className="px-3 py-1 bg-gray-300 rounded disabled:opacity-50"
                  >
                    Next
                  </button>
                </div>
              </td>
            </tr>
          </tfoot>
        </table>
      </div>
    </>
  );
};

export default Category;
