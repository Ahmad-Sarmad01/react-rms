import DashboardCard from "../components/DashboardCard";
import { FaTasks, FaCalendarCheck, FaAward } from "react-icons/fa";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const [currentUser, setCurrentUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("currentUser"));
    if (storedUser) {
      setCurrentUser(storedUser);
    } else {
      navigate("/login"); 
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("currentUser");
    navigate("/");
  };

  const options = [
    { icon: <FaTasks />, title: "Tasks", to: "/tasks" },
    { icon: <FaCalendarCheck />, title: "Attendance", to: "/attendance" },
    { icon: <FaAward />, title: "Achievements", to: "/achievements" },
    // Add more options later...
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 to-white p-4">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">
          Welcome {currentUser?.name || "to RMS Portal"}
        </h1>
        <button
          onClick={handleLogout}
          className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
        >
          Logout
        </button>
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 justify-items-center">
        {options.map((option, index) => (
          <DashboardCard key={index} {...option} />
        ))}
      </div>
    </div>
  );
};

export default Dashboard;
