import { Link, useLocation, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSignOutAlt } from "@fortawesome/free-solid-svg-icons";

const navItems = [
  { name: "Dashboard", path: "/dashboard"},
  { name: "Tasks", path: "/tasks"},
  { name: "Attendance", path: "/attendance"},
  { name: "Achievements", path: "/achievements"},
];

const Sidebar = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("loggedInUser");
    navigate("/");
};


  return (   // Fix Sidebar's components in here
    <div className="bg-gray-900 text-white w-60 flex flex-col px-4 pt-4 pb-20 fixed justify-between h-screen ">   
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

