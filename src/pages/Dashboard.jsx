import DashboardCard from "../components/DashboardCard";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Loader from "../components/Loader";
import { FaTasks, FaCalendarCheck, FaAward, FaUserCircle, FaPlaneDeparture, FaMoneyCheckAlt, FaUsers, 
         FaBullhorn, FaCalendarAlt, FaChartLine, FaBookOpen, FaHeadset, FaSignOutAlt } from "react-icons/fa";
import Footer from "../components/Footer";

const Dashboard = () => {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("currentUser"));
    if (storedUser) {
      setCurrentUser(storedUser);
      setTimeout(() => setLoading(false), 2500);
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
    { icon: <FaUsers />, title: "Team", to: "/team" },
    { icon: <FaPlaneDeparture />, title: "Leave Requests", to: "/leaves" },
    { icon: <FaMoneyCheckAlt />, title: "Payroll", to: "/payroll" },
    { icon: <FaBullhorn />, title: "Announcements", to: "/announcements" },
    { icon: <FaUserCircle />, title: "My Profile", to: "/profile" },
    { icon: <FaCalendarAlt />, title: "Calendar", to: "/calendar" },
    { icon: <FaChartLine />, title: "Reports", to: "/reports" },
    { icon: <FaBookOpen />, title: "Learning", to: "/learning" },
    { icon: <FaHeadset />, title: "Support", to: "/support" }
  ];

  if (loading) return <Loader />;

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-blue-100 to-white">
      <div className="flex-grow p-4">
        <div className="flex justify-between items-center mt-3 mb-12 mx-14">
          <h1 className="text-2xl font-bold">
            Welcome {currentUser?.name}
          </h1>
          <button
            onClick={handleLogout}
            className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 hover:scale-90 transition-all flex items-center gap-2"
          >
            Logout
            <FaSignOutAlt />
          </button>
        </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6 mx-4 md:mx-16 lg:mx-36 lg:my-24">
            {options.map((option, index) => (
              <DashboardCard key={index} {...option} />
            ))}
          </div>
      </div>
      <Footer />
    </div>
  );
};

export default Dashboard;
