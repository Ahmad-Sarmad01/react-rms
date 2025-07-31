import React from "react";

const teamMembers = [
  {
    id: 1,
    name: "Ahmad Sarmad",
    role: "Frontend Developer",
    email: "ahmad@example.com",
    image: "https://i.pravatar.cc/150?img=1",
    status: "Available",
    social: {
      linkedin: "#",
      github: "#",
    },
  },
  {
    id: 2,
    name: "Ayesha Khan",
    role: "UI/UX Designer",
    email: "ayesha@example.com",
    image: "https://i.pravatar.cc/150?img=5",
    status: "On Leave",
    social: {
      linkedin: "#",
      github: "#",
    },
  },
  {
    id: 3,
    name: "Bilal Ahmed",
    role: "Backend Developer",
    email: "bilal@example.com",
    image: "https://i.pravatar.cc/150?img=8",
    status: "Available",
    social: {
      linkedin: "#",
      github: "#",
    },
  },
  {
    id: 4,
    name: "Ali Hussnain",
    role: "Project Manager",
    email: "ali@example.com",
    image: "https://i.pravatar.cc/150?img=12",
    status: "Busy",
    social: {
      linkedin: "#",
      github: "#",
    },
  },
  {
    id: 5,
    name: "Usman Raza",
    role: "DevOps Engineer",
    email: "usman@example.com",
    image: "https://i.pravatar.cc/150?img=15",
    status: "Available",
    social: {
      linkedin: "#",
      github: "#",
    },
  },
  {
    id: 6,
    name: "Faraz Siddiqui",
    role: "QA Engineer",
    email: "faraz@example.com",
    image: "https://i.pravatar.cc/150?img=18",
    status: "Remote",
    social: {
      linkedin: "#",
      github: "#",
    },
  },
  {
    id: 7,
    name: "Danish Ali",
    role: "Full Stack Developer",
    email: "danish@example.com",
    image: "https://i.pravatar.cc/150?img=22",
    status: "Available",
    social: {
      linkedin: "#",
      github: "#",
    },
  },
  {
    id: 8,
    name: "Nimra Hassan",
    role: "Content Strategist",
    email: "nimra@example.com",
    image: "https://i.pravatar.cc/150?img=27",
    status: "On Leave",
    social: {
      linkedin: "#",
      github: "#",
    },
  },
  {
    id: 9,
    name: "Mariam Shah",
    role: "Security Analyst",
    email: "mariam@example.com",
    image: "https://i.pravatar.cc/150?img=31",
    status: "Available",
    social: {
      linkedin: "#",
      github: "#",
    },
  }
];


const Team = () => {
  return (
    <div className="min-h-screen bg-gradient-to-tr from-blue-50 to-white py-10 px-4">
      <h1 className="text-3xl font-bold text-center mb-8 text-gray-800">Meet the Team</h1>

      <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
        {teamMembers.map((member) => (
          <div
            key={member.id}
            className="bg-white shadow-md rounded-xl p-4 flex flex-col items-center transition-transform hover:scale-105 duration-300"
          >
            <img
              src={member.image}
              alt={member.name}
              className="w-24 h-24 rounded-full object-cover mb-3 border-4 border-blue-200"
            />
            <h2 className="text-xl font-semibold text-gray-800">{member.name}</h2>
            <p className="text-sm text-gray-500">{member.role}</p>
            <p
              className={`text-xs mt-1 font-medium ${
                member.status === "Available"
                  ? "text-green-500"
                  : "text-yellow-500"
              }`}
            >
              {member.status}
            </p>
            <div className="flex gap-3 mt-3">
              <a href={member.social.linkedin} target="_blank" rel="noreferrer">
                <i className="fab fa-linkedin text-blue-600 text-lg"></i>
              </a>
              <a href={member.social.github} target="_blank" rel="noreferrer">
                <i className="fab fa-github text-gray-700 text-lg"></i>
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Team;
