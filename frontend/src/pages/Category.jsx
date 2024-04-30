// import React from "react";

import { BiCategory } from "react-icons/bi";
import { FaEdit, FaRegTrashAlt } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const Category = () => {
  const navigate = useNavigate();
  const handleRoute = () => {
    navigate("/category/new");
  };
  return (
    <>
      <div className="flex justify-between items-center shadow-lg p-4 rounded-lg">
        <div className="flex gap-2">
          <BiCategory className="text-2xl" />
          <div className="font-bold">Category</div>
          {/* Apply font-bold for header */}
        </div>
        <div className="border rounded-lg">
          <input
            type="text"
            name=""
            id=""
            className="border border-none px-3 w-[100%] py-2 rounded-lg"
          />
        </div>
        <div>
          <button
            className="bg-[#662671] hover:bg-[#662669] text-white font-bold py-2 px-4 rounded"
            onClick={handleRoute}
          >
            Add New {/* Apply button styles */}
          </button>
        </div>
      </div>
      <div className="mt-3 h-auto bg-slate-300 grid grid-cols-4 p-4">
        <div>ID</div>
        <div>Name</div>
        <div>Description</div>
        <div>Status</div>
      </div>
      <div className="p-4 grid grid-cols-4 mt-3 bg-slate-200">
        <div>ID</div>
        <div>Name</div>
        <div>Description</div>
        <div className="flex gap-6 items-center">
          <span>Status</span>
          <span className="p-2 hover:bg-slate-300 rounded-xl">
            <FaEdit className="text-xl  duration-300 text-blue-400 " />
          </span>
          <span className="p-2 hover:bg-slate-300 rounded-xl">
            <FaRegTrashAlt className="text-xl  duration-300  text-red-500" />
          </span>
        </div>
      </div>
    </>
  );
};

export default Category;
