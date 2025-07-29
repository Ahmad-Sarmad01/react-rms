import { Link } from "react-router-dom";

const DashboardCard = ({ icon, title, to }) => {
  return (
    <Link
      to={to}
      className="w-full sm:w-40 md:w-48 bg-white rounded-2xl shadow-lg p-4 flex flex-col items-center justify-center hover:shadow-2xl transition-all duration-300"
    >
      <div className="text-4xl mb-2">{icon}</div>
      <h2 className="text-center font-semibold text-gray-700">{title}</h2>
    </Link>
  );
};

export default DashboardCard;
