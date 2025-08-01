import React, { useState } from "react";

const teamMembers = [
  {
    id: 1,
    name: "Ahmad Sarmad",
    role: "Frontend Developer",
    email: "ahmad@example.com",
    image: "ahmad.jpeg",
    status: "Available",
    social: {
      linkedin: "https://www.linkedin.com/in/muhammad-ahmad-sarmad-849b2a2a8?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app",
      github: "https://github.com/Ahmad-Sarmad01",
    },
    description: "Ahmad is a passionate frontend developer with a keen eye for design and user experience. He loves creating interactive and responsive web applications.",
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
    description: "Ayesha is a creative UI/UX designer who specializes in crafting intuitive and visually appealing user interfaces. She believes in the power of design to enhance user experience.",
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
    description: "Bilal is a skilled backend developer with expertise in building robust and scalable server-side applications. He enjoys solving complex problems and optimizing performance.",
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
    description: "Ali is an experienced project manager who excels in coordinating teams and ensuring projects are delivered on time and within budget. He has a knack for effective communication and leadership.",
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
    description: "Usman is a DevOps engineer with a strong background in automation and cloud infrastructure. He is passionate about improving deployment processes and ensuring system reliability.",
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
    description: "Faraz is a detail-oriented QA engineer who focuses on ensuring the quality and performance of software applications. He enjoys writing test cases and finding bugs to improve product reliability.",
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
    description: "Danish is a versatile full stack developer with expertise in both frontend and backend technologies. He enjoys building end-to-end solutions and has a passion for learning new frameworks and languages.",
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
    description: "Nimra is a content strategist who specializes in creating engaging and informative content. She has a knack for storytelling and believes in the importance of content in driving user engagement.",
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
    description: "Mariam is a security analyst who focuses on protecting systems and data from cyber threats. She is passionate about cybersecurity and enjoys staying updated with the latest security trends.",
  },
  {
  id: 10,
  name: "Zain Raza",
  role: "DevOps Engineer",
  email: "zain@example.com",
  image: "https://i.pravatar.cc/150?img=33",
  status: "Busy",
  social: {
    linkedin: "#",
    github: "#",
  },
  description: "Zain ensures smooth development and deployment pipelines. He specializes in CI/CD, cloud infrastructure, and automation of operations tasks.",
},
{
  id: 11,
  name: "Hira Yousaf",
  role: "UI/UX Designer",
  email: "hira@example.com",
  image: "https://i.pravatar.cc/150?img=32",
  status: "Available",
  social: {
    linkedin: "#",
    github: "#",
  },
  description: "Hira creates user-centered designs with a focus on accessibility and aesthetics. She loves designing intuitive interfaces that enhance user experiences.",
},
];

const Team = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedMember, setSelectedMember] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const filteredMembers = teamMembers.filter(
    (member) =>
      member.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      member.role.toLowerCase().includes(searchQuery.toLowerCase())
  );



  return (
    <div className="min-h-screen bg-gradient-to-tr from-blue-50 to-white p-6 animate-fade-in">
        <div className="flex items-center justify-between flex-wrap gap-4 mb-10">
          <h1 className="text-3xl font-bold text-blue-800">Meet the Team</h1>

          <div>
              <input
              type="text"
              placeholder="Search by name or role..."
              className="w-[600px] px-4 py-2 border border-gray-300 rounded-xl shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
             />
          </div>
        </div>


      <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
        {filteredMembers.map((member) => (
          <div
           key={member.id}
           onClick={() => {
            setSelectedMember(member);
            setIsModalOpen(true);
           }}
           className="cursor-pointer bg-white shadow-md rounded-xl p-4 flex flex-col items-center hover:bg-blue-50 transition-transform hover:scale-105 duration-300"
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
                  : member.status === "On Leave"
                  ? "text-yellow-500"
                  : "text-red-500"
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
      {isModalOpen && selectedMember && (
        <div className="fixed inset-0 bg-transparent flex justify-center items-center animate-fadeIn z-50 backdrop-blur-sm">
          <div className="bg-white rounded-2xl shadow-xl p-6 w-[90%] max-w-md relative animate-slideUp pulse-neon ring-2 ring-blue-500" style={{boxShadow: '0 0 15px 4px rgba(59, 130, 246, 0.7)',}}>
            <button
              className="absolute top-2 right-3 text-gray-500 hover:text-red-600 text-3xl"
              onClick={() => setIsModalOpen(false)}
            >
              &times;
            </button>
            <img
              src={selectedMember.image}
              alt={selectedMember.name}
              className="w-28 h-28 rounded-full mx-auto mb-4 object-cover"
            />
            <h2 className="text-2xl font-bold text-center">{selectedMember.name}</h2>
            <p className="text-center text-gray-600">{selectedMember.role}</p>
            <p className={`text-xs mt-1 text-center font-medium ${ selectedMember.status === "Available" ? "text-green-500" : selectedMember.status === "On Leave" ? "text-yellow-500" : "text-red-500" }`}>{selectedMember.status}</p>
            <p className="mt-3 text-sm text-gray-700 text-center">{selectedMember.description}</p>
            <p className="mt-1 text-sm text-blue-700 text-center">{selectedMember.email}</p>
            <div className="flex justify-center gap-3 mt-3">
              <a href={selectedMember.social.linkedin} target="_blank" rel="noreferrer">
                <i className="fab fa-linkedin text-blue-600 text-lg"></i>
              </a>
              <a href={selectedMember.social.github} target="_blank" rel="noreferrer">
                <i className="fab fa-github text-gray-700 text-lg"></i>
              </a>
            </div>
          </div>
        </div>
      )}

      {filteredMembers.length === 0 && (
        <p className="text-center text-red-500 mt-6 font-medium">No team member found.</p>
      )}
    </div>
  );
};

export default Team;