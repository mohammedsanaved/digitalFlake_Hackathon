import React from "react";
import { FaRegUserCircle } from "react-icons/fa";
const Header = () => {
  return (
    <header className="h-[60px] bg-[#662671] px-12 py-3 border-b border-gray-200 flex justify-between items-center text-white">
      <div className="font-semibold">DigitalFlake</div>
      <div>
        <FaRegUserCircle className="text-2xl" />
      </div>
    </header>
  );
};

export default Header;
