// import React from "react";
import { FaEdit, FaRegTrashAlt } from "react-icons/fa";
import { LuPackage } from "react-icons/lu";
import { useNavigate } from "react-router-dom";

const Products = () => {
  const navigate = useNavigate();
  const handleRoute = () => {
    navigate("/product/new");
  };
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
            name=""
            id=""
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
                Image
              </th>
              <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                Status
              </th>
            </tr>
          </thead>

          <tbody className="divide-y divide-gray-200">
            <tr>
              <td className="whitespace-nowrap px-4 py-2 text-gray-700">ID</td>
              <td className="whitespace-nowrap px-4 py-2 text-gray-700">
                Name
              </td>
              <td className="whitespace-nowrap px-4 py-2 text-gray-700">
                PackSize
              </td>
              <td className="whitespace-nowrap px-4 py-2 text-gray-700">
                Category
              </td>
              <td className="whitespace-nowrap px-4 py-2 text-gray-700">MRP</td>
              <td className="whitespace-nowrap px-4 py-2 text-gray-700">
                Image
              </td>
              <td className="whitespace-nowrap px-4 py-2 flex gap-6 items-center">
                <span>Status</span>
                <span className="p-2 hover:bg-slate-300 rounded-xl">
                  <FaEdit className="text-xl duration-300 text-blue-400" />
                </span>
                <span className="p-2 hover:bg-slate-300 rounded-xl">
                  <FaRegTrashAlt className="text-xl duration-300 text-red-500" />
                </span>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </>
  );
};

export default Products;
