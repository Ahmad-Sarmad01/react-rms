import { Link, useLocation, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSignOutAlt } from "@fortawesome/free-solid-svg-icons";

const navItems = [
  { name: "Dashboard", path: "/dashboard"},
  { name: "Tasks", path: "/tasks"},
  { name: "Attendance", path: "/attendance"},
  { name: "Achievements", path: "/achievements"},
  { name: "Team", path: "/team"},
  { name: "Leave Request", path: "/leaves"},
  { name: "Payroll", path: "/payroll"},
  { name: "Announcements", path: "/announcements"},
  { name: "My Profile", path: "/profile"},
  { name: "Calendar", path: "/calendar"},
  { name: "Reports", path: "/reports"},
  { name: "Learning", path: "/learning"},
  { name: "Support", path: "/support" }
];

const Sidebar = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("loggedInUser");
    navigate("/");
};

  return (   
      <div className="bg-gray-900 text-white w-60 flex flex-col px-4 pt-4 pb-20 fixed h-screen">  
        <div className="overflow-y-auto flex-1 pr-1 sidebar-scroll">
        <nav className="flex flex-col gap-4">
          {navItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`flex items-center gap-3 px-3 py-2 rounded hover:bg-gray-700 transition ${
                location.pathname === item.path ? "bg-gray-700" : ""
              }`}
            >
              <span className="text-xl">{item.icon}</span>
              <span>{item.name}</span>
            </Link>
          ))}
        </nav>
        </div>
        <div className="flex justify-center mt-4">
          <button
            onClick={handleLogout}
            className="text-white w-32 font-semibold py-2 backdrop-blur-sm transition-all duration-300 hover:scale-105 hover:bg-red-700 flex items-center justify-center gap-2"
          >
            Logout
            <FontAwesomeIcon icon={faSignOutAlt} />
          </button>
        </div>
    </div>
  );
};

export default Sidebar;

