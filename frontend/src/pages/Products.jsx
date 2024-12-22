import { FaEdit, FaRegTrashAlt } from "react-icons/fa";
import { LuPackage } from "react-icons/lu";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllProducts } from "../redux/slice/product/productSlice";

const Products = () => {
  const dispatch = useDispatch();
  const { products, isLoading, isError, errorMessage, pagination } =
    useSelector((state) => state.product);
  const navigate = useNavigate();
  const [page, setPage] = useState(1);
  const [limit] = useState(2);

  useEffect(() => {
    dispatch(getAllProducts({ page, limit }));
  }, [dispatch, page, limit]);

  const handleRoute = () => {
    navigate("/product/new");
  };
  const handleDelete = () => {
    alert("Delete");
  };
  const handlePageChange = (pageNo) => {
    setPage(pageNo);
    window.scrollTo(0, 0);
  };

  if (isLoading) {
    return <div className="text-center mt-4">Loading...</div>;
  }

  if (isError) {
    return <div className="text-center mt-4 text-red-500">{errorMessage}</div>;
  }

  return (
    <>
      <div className="flex justify-between items-center shadow-lg p-4 bg-white">
        <div className="flex gap-2 items-center">
          <LuPackage className="text-2xl" />
          <div className="font-bold text-lg">Products</div>
        </div>
        <div className="border rounded-lg overflow-hidden">
          <input
            type="text"
            name="search"
            id="search"
            className="border-none px-3 py-2 w-full"
            placeholder="Search..."
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
                PackSize
              </th>
              <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                Category
              </th>
              <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                MRP
              </th>
              <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                Status
              </th>
              <th className="whitespace-nowrap px-2 py-2 font-medium text-gray-900">
                Actions
              </th>
            </tr>
          </thead>

          <tbody className="divide-y divide-gray-200">
            {products.map((product, i) => (
              <tr key={product._id}>
                <td className="whitespace-nowrap px-4 py-2 text-gray-700">
                  {i + 1}
                </td>
                <td className="whitespace-nowrap px-4 py-2 text-gray-700">
                  {product.name}
                </td>
                <td className="whitespace-nowrap px-4 py-2 text-gray-700">
                  {product.packSize}
                </td>
                <td className="whitespace-nowrap px-4 py-2 text-gray-700">
                  {product.category.categoryName}
                </td>
                <td className="whitespace-nowrap px-4 py-2 text-gray-700">
                  {product.MRP}
                </td>
                <td className="whitespace-nowrap px-4 py-2 gap-6 items-center">
                  <span>{product.status}</span>
                </td>
                <td className="whitespace-nowrap px-4 py-2 flex gap-2 items-center">
                  <span
                    className="p-2 hover:bg-slate-300 rounded-xl"
                    onClick={() => navigate(`/product/${product._id}`)}
                  >
                    <FaEdit className="text-xl duration-300 text-blue-400" />
                  </span>
                  <span
                    className="p-2 hover:bg-slate-300 rounded-xl"
                    onClick={handleDelete}
                  >
                    <FaRegTrashAlt className="text-xl duration-300 text-red-500" />
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
          <tfoot>
            <tr>
              <td colSpan="12" className="px-4 py-2">
                <div className="flex justify-between items-center">
                  <div className="flex gap-2 items-center">
                    <button
                      onClick={() => handlePageChange(page - 1)}
                      disabled={page === 1}
                      className="px-3 py-1 bg-[#662671] rounded disabled:opacity-50 text-white"
                    >
                      Previous
                    </button>
                    <span>
                      Page {pagination.currentPage} of {pagination.totalPages}
                    </span>
                    <button
                      onClick={() => handlePageChange(page + 1)}
                      disabled={page === pagination.totalPages}
                      className="px-3 py-1 bg-[#662671] rounded disabled:opacity-50 text-white"
                    >
                      Next
                    </button>
                  </div>
                  <div className="text-sm text-gray-500">
                    Total items:
                    {pagination.total}
                  </div>
                </div>
              </td>
            </tr>
          </tfoot>
        </table>
      </div>
    </>
  );
};

export default Products;
