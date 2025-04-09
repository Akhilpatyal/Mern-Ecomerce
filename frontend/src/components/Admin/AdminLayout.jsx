import { useState } from "react";
import { FaBars } from "react-icons/fa6";
import AdminSlidebar from "./AdminSlidebar";
import { Outlet } from "react-router-dom";

const AdminLayout = () => {
  const [isSlidebarOpen, setIsSlidebarOpen] = useState(false);
  const toggleSlider = () => {
    setIsSlidebarOpen(!isSlidebarOpen);
  };
  return (
    <div className="min-h-screen flex flex-col md:flex-row relative">
      <div className="flex md:hidden p-4 bg-gray-900 text-white z-30">
        <button onClick={toggleSlider} aria-label="Toggle Sidebar">
          <FaBars size={24} />
        </button>
        <h1 className="ml-4 text-xl font-medium">Admin Dashboard</h1>
      </div>
      {/* overlay for mobile */}
      {isSlidebarOpen && (
        <div
          className="fixed inset-0 z-10 bg-black bg-opacity-50 md:hidden"
          onClick={toggleSlider}
        ></div>
      )}
      {/* slidebar */}
      <div
        className={`bg-gray-900 w-64 min-h-screen text-white absolute md:relative transform ${
          isSlidebarOpen ? "translate-x-0" : "-translate-x-full"
        } transition-transform duration-300 md:translate-x-0 md:static md:block z-20`}
      >
        {/* slidebar */}
        <AdminSlidebar />
      </div>
      {/* main Content */}
      <div className="flex-grow p-6 overflow-auto">
        <Outlet />
      </div>
    </div>
  );
};

export default AdminLayout;
