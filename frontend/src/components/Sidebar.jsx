import { NavLink } from "react-router-dom";
import {
  HiOutlineCalendarDays,
  HiOutlineCog6Tooth,
  HiOutlineHome,
  HiOutlineHomeModern,
  HiOutlineUsers,
} from "react-icons/hi2";

function Sidebar() {
  return (
    <nav className="space-y-2">
      <NavLink
        to="/home"
        className="flex items-center gap-3 py-3 px-6 rounded-md text-gray-600 hover:text-gray-800 hover:bg-gray-50"
        activeClassName="text-brand-600"
      >
        <HiOutlineHome className="w-6 h-6" />
        <span>Home</span>
      </NavLink>
      <NavLink
        to="/category"
        className="flex items-center gap-3 py-3 px-6 rounded-md text-gray-600 hover:text-gray-800 hover:bg-gray-50"
        activeClassName="text-brand-600"
      >
        <HiOutlineCalendarDays className="w-6 h-6" />
        <span>Category</span>
      </NavLink>
      <NavLink
        to="/product"
        className="flex items-center gap-3 py-3 px-6 rounded-md text-gray-600 hover:text-gray-800 hover:bg-gray-50"
        activeClassName="text-brand-600"
      >
        <HiOutlineHomeModern className="w-6 h-6" />
        <span>Products</span>
      </NavLink>
    </nav>
  );
}

export default Sidebar;
