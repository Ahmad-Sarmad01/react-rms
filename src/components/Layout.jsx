import { useState } from "react";
import Sidebar from "./Sidebar";
import Topbar from "./Topbar";
import { Outlet } from "react-router-dom";

const Layout = () => {
  const [sidebarVisible, setSidebarVisible] = useState(false);

  const toggleSidebar = () => {
    setSidebarVisible((prev) => !prev);
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Topbar toggleSidebar={toggleSidebar} />

      <div className="flex flex-1 pt-14">
        <div
          className={`fixed z-40 bg-gray-900 text-white h-full w-60 transition-all duration-300
            ${sidebarVisible ? "left-0" : "-left-64"}
          `}
        >
          <Sidebar />
        </div>

        {sidebarVisible && (
          <div
            className="fixed inset-0 bg-black z-30 md:hidden"
            onClick={toggleSidebar}
          ></div>
        )}

        <main
          className={`
            flex-1 transition-all duration-300 p-4
            ${sidebarVisible ? "ml-60" : "ml-0"}
          `}
        >
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default Layout;
