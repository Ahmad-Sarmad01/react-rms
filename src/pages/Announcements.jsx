import { useState, useEffect } from "react";
import {
  FaExclamationCircle,
  FaBell,
  FaInfoCircle,
  FaGift,
  FaUsers,
  FaTrophy,
  FaStar,
  FaCalendarAlt,
} from "react-icons/fa";

const Announcements = () => {
  const announcements = [
    {
      id: 1,
      title: "Server Maintenance Tonight",
      date: "August 5, 2025",
      category: "Urgent",
      icon: <FaExclamationCircle />,
      content:
        "Our servers will undergo maintenance from 12:00 AM to 2:00 AM. Please save your work before this time.",
      color: "from-red-400 via-red-500 to-red-600",
      glow: "rgba(239,68,68,0.8)",
    },
    {
      id: 2,
      title: "Team Building Event",
      date: "August 12, 2025",
      category: "Event",
      icon: <FaUsers />,
      content:
        "Join us for a fun day at the beach! Activities include volleyball, BBQ, and team challenges.",
      color: "from-indigo-400 via-indigo-500 to-indigo-600",
      glow: "rgba(99,102,241,0.8)",
    },
    {
      id: 3,
      title: "Performance Reviews",
      date: "August 20, 2025",
      category: "Reminder",
      icon: <FaBell />,
      content:
        "Performance review meetings will be held next week. Check your email for your scheduled time.",
      color: "from-amber-400 via-amber-500 to-amber-600",
      glow: "rgba(245,158,11,0.8)",
    },
    {
      id: 4,
      title: "New Project Launch",
      date: "August 8, 2025",
      category: "General",
      icon: <FaInfoCircle />,
      content:
        "We’re launching a new project in collaboration with InvexTech clients. Stay tuned for updates.",
      color: "from-blue-400 via-blue-500 to-blue-600",
      glow: "rgba(59,130,246,0.8)",
    },
    {
      id: 5,
      title: "Birthday Celebration",
      date: "August 7, 2025",
      category: "Event",
      icon: <FaGift />,
      content:
        "Celebrate Ahmad’s birthday in the lounge at 4:00 PM. Cake and snacks will be served.",
      color: "from-pink-400 via-pink-500 to-pink-600",
      glow: "rgba(236,72,153,0.8)",
    },
    {
      id: 6,
      title: "Quarterly Awards",
      date: "August 15, 2025",
      category: "Awards",
      icon: <FaTrophy />,
      content:
        "Join us in congratulating our top performers of the quarter. Ceremony will be in the main hall.",
      color: "from-yellow-400 via-yellow-500 to-yellow-600",
      glow: "rgba(234,179,8,0.8)",
    },
    {
      id: 7,
      title: "Client Visit",
      date: "August 18, 2025",
      category: "Reminder",
      icon: <FaStar />,
      content:
        "Our top client will visit our office. Please ensure your workspace is tidy and professional.",
      color: "from-teal-400 via-teal-500 to-teal-600",
      glow: "rgba(20,184,166,0.8)",
    },
    {
      id: 8,
      title: "HR Policy Update",
      date: "August 3, 2025",
      category: "General",
      icon: <FaInfoCircle />,
      content:
        "New HR policies regarding remote work have been posted. Check the HR portal for full details.",
      color: "from-gray-400 via-gray-500 to-gray-600",
      glow: "rgba(107,114,128,0.8)",
    },
  ];

  const [expanded, setExpanded] = useState(null);
  const [visible, setVisible] = useState(false);
  const [recentAchievements, setRecentAchievements] = useState([]);

    useEffect(() => {
    setTimeout(() => setVisible(true), 50);

    const allUsers = JSON.parse(localStorage.getItem("users")) || [];
    let combined = [];

    allUsers.forEach((user) => {
        const unlocked = JSON.parse(localStorage.getItem(`achievements_${user.email}`)) || [];

        unlocked.slice().reverse().forEach((achieve) => {
            const match = achieve.match(/^(.*?)\s*\((.*?)\)$/);
            const title = match?.[1] || achieve;
            const description = match?.[2] || "";

            combined.push({
                name: user.name,
                title,
                description,
                color: "from-green-400 via-green-500 to-green-600",
                glow: "rgba(34,197,94,0.8)",
            });
        });
    });

    setRecentAchievements(combined.slice(0, 11));
    }, []);

  const upcomingEvents = [
    {
      title: "Annual Tech Conference",
      date: "September 10, 2025",
      description: "A full-day event with guest speakers, networking, and tech showcases.",
      color: "from-purple-400 via-purple-500 to-purple-600",
      glow: "rgba(168,85,247,0.8)",
    },
    {
      title: "Hackathon",
      date: "October 2, 2025",
      description: "24-hour coding challenge for all employees with exciting prizes.",
      color: "from-cyan-400 via-cyan-500 to-cyan-600",
      glow: "rgba(6,182,212,0.8)",
    },
  ];

  const quickReminders = [
    {
      title: "Submit Timesheets",
      date: "Every Friday",
      description: "Ensure your timesheets are updated before the weekend.",
      color: "from-orange-400 via-orange-500 to-orange-600",
      glow: "rgba(249,115,22,0.8)",
    },
    {
      title: "Security Check",
      date: "First Monday of Month",
      description: "IT will perform routine security checks on all systems.",
      color: "from-sky-400 via-sky-500 to-sky-600",
      glow: "rgba(14,165,233,0.8)",
    },
  ];

  const renderCard = (item, index) => (
    <div
      key={index}
      style={{
        transitionDelay: `${index * 100}ms`,
        "--glow-color": item.glow,
        animation: "pulseGlow 3s infinite",
        border: `2px solid ${item.glow}`,
        borderRadius: "0.75rem",
      }}
      className={`bg-white rounded-xl shadow-md overflow-hidden transform transition-all duration-500 ${
        visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
      } hover:scale-[1.02]`}
    >
      <div
        className={`flex items-center gap-2 px-4 py-2 text-white bg-gradient-to-r ${item.color}`}
      >
        <span className="font-medium text-sm">{item.title}</span>
      </div>
      <div className="p-4">
        <p className="text-xs text-gray-500 italic mb-2">{item.date}</p>
        <p className="text-sm text-gray-700 leading-relaxed">{item.description}</p>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen p-6 bg-gradient-to-tr from-blue-50 to-white animate-fade-in">
      <h2 className="text-3xl font-bold text-blue-800 mb-6">Announcements</h2>

      <style>
        {`
          @keyframes pulseGlow {
            0% { box-shadow: 0 0 5px var(--glow-color); }
            50% { box-shadow: 0 0 20px var(--glow-color); }
            100% { box-shadow: 0 0 5px var(--glow-color); }
          }
        `}
      </style>

      <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 mb-10">
        {announcements.map((item, index) => (
          <div
            key={item.id}
            style={{
              transitionDelay: `${index * 100}ms`,
              "--glow-color": item.glow,
              animation: "pulseGlow 3s infinite",
              border: `2px solid ${item.glow}`,
              borderRadius: "0.75rem",
            }}
            className={`bg-white rounded-xl shadow-md overflow-hidden transform transition-all duration-500 ${
              visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
            } hover:scale-[1.02]`}
          >
            <div
              className={`flex items-center gap-2 px-4 py-2 text-white bg-gradient-to-r ${item.color}`}
            >
              <span className="text-sm">{item.icon}</span>
              <span className="font-medium text-sm">{item.category}</span>
            </div>
            <div className="p-4">
              <h3 className="text-lg font-semibold text-gray-800 mb-1">
                {item.title}
              </h3>
              <p className="text-xs text-gray-500 italic mb-3">{item.date}</p>
              <p className="text-sm text-gray-700 leading-relaxed">
                {expanded === item.id
                  ? item.content
                  : `${item.content.substring(0, 80)}...`}
              </p>
              <button
                onClick={() =>
                  setExpanded(expanded === item.id ? null : item.id)
                }
                className="mt-3 text-blue-600 hover:text-blue-800 text-xs font-medium transition"
              >
                {expanded === item.id ? "Show Less" : "Read More"}
              </button>
            </div>
          </div>
        ))}
      </div>

      <h3 className="text-2xl font-semibold mb-4 text-blue-800">Upcoming Events</h3>
      <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 mb-10">
        {upcomingEvents.map(renderCard)}
      </div>

      <h3 className="text-2xl font-semibold mb-4 text-blue-800">Quick Reminders</h3>
      <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 mb-10">
        {quickReminders.map(renderCard)}
      </div>

      <h3 className="text-2xl font-semibold mb-4 text-blue-800">Recent Achievements</h3>
      <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        {recentAchievements.map((ach, index) => (
          <div
            key={index}
            style={{
              "--glow-color": ach.glow,
              animation: "pulseGlow 3s infinite",
              border: `2px solid ${ach.glow}`,
              borderRadius: "0.75rem",
            }}
            className="bg-white rounded-xl shadow-md overflow-hidden transform transition-all duration-500 hover:scale-[1.02]"
          >
            <div
              className={`flex items-center gap-2 px-4 py-2 text-white bg-gradient-to-r ${ach.color}`}
            >
              <span className="font-medium text-sm">{ach.name}</span>
            </div>
            <div className="p-4">
              <h4 className="text-lg font-semibold text-gray-800 mb-1">
                {ach.title}
              </h4>
              <p className="text-sm text-gray-700 leading-relaxed">{ach.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Announcements;
