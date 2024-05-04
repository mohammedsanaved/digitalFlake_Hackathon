// import React from "react";

import { BiCategory } from "react-icons/bi";
import { FaEdit, FaRegTrashAlt } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getAllCategory } from "../redux/slice/category/categorySlice";

const Category = () => {
  const navigate = useNavigate();
  const handleRoute = () => {
    navigate("/category/new");
  };
  const dispatch = useDispatch();
  const allCategory = useSelector((state) => state.category);
  // console.log(allCategory);
  const { categories, isLoading, isError } = allCategory;

  useEffect(() => {
    dispatch(getAllCategory());
  }, [dispatch]);
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
      <div className="mt-3 h-auto bg-blue-300 grid grid-cols-4 p-4 items-center">
        <div className="font-bold">ID</div>
        <div className="font-bold">Name</div>
        <div className="font-bold">Description</div>
        <div className="font-bold">Status</div>
      </div>
      {isLoading ? (
        <div>Loading...</div>
      ) : isError ? (
        <div>Error: {isError}</div>
      ) : (
        categories?.categories?.map((item, i) => (
          <div className="p-4 grid grid-cols-4 mt-3 bg-slate-200" key={i}>
            <div>{i + 1}</div>
            <div>{item.categoryName}</div>
            <div>{item.description}</div>
            <div className="flex gap-6 items-center">
              <span
                style={{ color: item.status === "active" ? "green" : "red" }}
              >
                {item.status}
              </span>
              <span className="p-2 hover:bg-slate-300 rounded-xl cursor-pointer">
                <FaEdit className="text-xl  duration-300 text-blue-400 " />
              </span>
              <span className="p-2 hover:bg-slate-300 rounded-xl cursor-pointer">
                <FaRegTrashAlt className="text-xl  duration-300  text-red-500" />
              </span>
            </div>
          </div>
        ))
      )}
    </>
  );
};

export default Category;
