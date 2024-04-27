import React from "react";

import logo from "../assets/d.png";
const Home = () => {
  return (
    <div className="flex justify-center items-center bg-white">
      <div className="">
        <img src={logo} className="h-[260px] flex items-center" alt="" />
        <h3 className="flex items-center justify-center text-xl font-semibold">
          Welcome to Digitalflake Admin
        </h3>
      </div>
    </div>
  );
};

export default Home;
