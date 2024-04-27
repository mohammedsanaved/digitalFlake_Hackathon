// import React from "react";

const Category = () => {
  return (
    <div className="flex justify-between items-center shadow-lg p-4 rounded-lg">
      <div className="flex">
        <div className="flex gap-2">
          <div>Icon</div>
          <div className="font-bold">Category</div>{" "}
          {/* Apply font-bold for header */}
        </div>
        <div>
          <input type="text" name="" id="" className="border border-black" />
        </div>
        <div>
          <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
            Add New {/* Apply button styles */}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Category;
