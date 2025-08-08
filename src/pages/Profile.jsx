import { useState, useEffect } from "react";
import { FaEdit } from "react-icons/fa";
import { db } from "../firebase";
import { doc, getDoc, setDoc } from "firebase/firestore";
import Loadertwo from "../components/Loadertwo";

const Profile = () => {
  const currentUser = JSON.parse(localStorage.getItem("currentUser"));
  const userEmail = currentUser?.email;

  const [loading, setLoading] = useState(true);

  const [profile, setProfile] = useState({
    name: "",
    email: "",
    phone: "",
    role: "",
    bio: "",
    skills: [],
    profilePic: "",
  });

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState(profile);
  const [previewImage, setPreviewImage] = useState("");

  useEffect(() => {
    if (!userEmail) return;

    const fetchProfile = async () => {
      try {
        const docRef = doc(db, "profiles", userEmail);
        const docSnap = await getDoc(docRef);

        const defaultProfile = {
          name: currentUser?.name || "",
          email: userEmail,
          phone: "",
          role: "",
          bio: "",
          skills: [],
          profilePic: "",
        };

        const savedProfile = docSnap.exists() ? docSnap.data() : defaultProfile;

        setProfile(savedProfile);
        setFormData({
          ...savedProfile,
          skills: Array.isArray(savedProfile.skills)
            ? savedProfile.skills.join(", ")
            : savedProfile.skills || "",
        });
        setPreviewImage(savedProfile.profilePic);
      } catch (error) {
        console.error("Error loading profile:", error);
      } finally {
        setLoading(false); 
      }
    };

    fetchProfile();
  }, [userEmail]);


  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onloadend = () => {
      setPreviewImage(reader.result);
      setFormData({ ...formData, profilePic: reader.result });
    };
    reader.readAsDataURL(file);
  };

  const handleSave = async () => {
    const updatedProfile = {
      ...formData,
      skills: typeof formData.skills === "string"
        ? formData.skills.split(",").map((s) => s.trim()).filter((s) => s)
        : formData.skills
    };

    try {
      await setDoc(doc(db, "profiles", userEmail), updatedProfile);
      setProfile(updatedProfile);
      setIsModalOpen(false);
    } catch (error) {
      console.error("Error saving profile:", error);
    }
  };


  if (!userEmail) {
    return (
      <p className="p-6 text-red-600 font-semibold">User not logged in.</p>
    );
  }

  return (
    <div className=" p-6 bg-gradient-to-tr from-blue-50 to-white animate-fade-in">
      <h1 className="text-3xl font-bold text-blue-800 mb-6">My Profile</h1>
    {loading ? (
            <Loadertwo />
        ) : (
          <>
      <style>
        {`
          @keyframes pulseGlow {
            0% { box-shadow: 0 0 5px var(--glow-color); }
            50% { box-shadow: 0 0 15px var(--glow-color); }
            100% { box-shadow: 0 0 5px var(--glow-color); }
          }
          @keyframes slideUp {
            0% { transform: translateY(100%); opacity: 0; }
            100% { transform: translateY(0); opacity: 1; }
          }
        `}
      </style>

    <div
        style={{
          "--glow-color": "rgba(59,130,246,0.8)",
          animation: "pulseGlow 3s infinite",
        }}
        className="relative bg-white rounded-xl shadow-md border-2 border-blue-400 p-6 flex flex-col items-center text-center"
    >
        <button
            onClick={() => setIsModalOpen(true)}
            className="absolute top-4 right-4  text-blue-600 hover:text-blue-900 shadow transition"
        >
            <FaEdit size={22} className="font-bold" />
        </button>

        <div className="relative mb-4">
          <img
            src={profile.profilePic || "https://via.placeholder.com/150"}
            alt="Profile"
            className="w-32 h-32 rounded-full border-4 border-blue-400 object-cover"
            style={{
              boxShadow: "0 0 15px rgba(59,130,246,0.8)",
            }}
          />
        </div>

        <h2 className="text-2xl font-bold text-gray-800">{profile.name}</h2>
        <p className="text-gray-500">{profile.phone}</p>
        <p className="text-gray-500">{profile.email}</p>
        <p className="text-blue-600 font-medium">{profile.role}</p>
        <p className="mt-3 text-gray-700 max-w-lg">{profile.bio}</p>

        <div className="mt-4 flex flex-wrap gap-2 justify-center">
          {profile.skills.map((skill, idx) => (
            <span
              key={idx}
              style={{
                "--glow-color": "rgba(59,130,246,0.8)",
                animation: "pulse-neon 2s infinite",
              }}
              className="px-3 py-1 rounded-full bg-gradient-to-r from-blue-700 to-purple-500 text-white text-sm font-medium shadow"
            >
              {skill}
            </span>
          ))}
        </div>
    </div>

      {isModalOpen && (
        <div className="fixed inset-0 backdrop-blur-sm bg-opacity-20 flex justify-center items-start z-50">
            <div
            className="bg-white/80 backdrop-blur-lg border border-blue-200 shadow-2xl w-full max-w-lg rounded-t-2xl overflow-hidden animate-[slideUp_0.4s_ease-out]"
            style={{
                boxShadow: "0 0 25px rgba(59,130,246,0.3)",
            }}
            >
            {/* Header */}
            <div className="bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500 p-4 text-white font-bold text-lg text-center shadow-md">
                Edit Profile
            </div>
                <div className="p-6">
                    {/* Profile Pic Upload */}
                    <div className="flex flex-col items-center mb-6">
                    <div className="relative">
                        <img
                        src={previewImage || "https://via.placeholder.com/150"}
                        alt="Preview"
                        className="w-28 h-28 rounded-full border-4 border-blue-400 object-cover shadow-lg"
                        style={{
                            boxShadow: "0 0 20px rgba(59,130,246,0.6)",
                        }}
                        />
                    </div>
                    <label className="mt-3 px-4 py-1 bg-blue-500 text-white text-sm rounded-full shadow hover:bg-blue-600 cursor-pointer transition">
                        Change Picture
                        <input
                        type="file"
                        accept="image/*"
                        onChange={handleImageUpload}
                        className="hidden"
                        />
                    </label>
                    </div>

                    {/* Name */}
                    <input
                    type="text"
                    placeholder="Name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full border border-gray-300 p-2 rounded-lg mb-3 focus:outline-none focus:ring-2 focus:ring-blue-400"
                    />

                    <input
                    type="text"
                    placeholder="Phone no."
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full border border-gray-300 p-2 rounded-lg mb-3 focus:outline-none focus:ring-2 focus:ring-blue-400"
                    />

                    <input
                    type="email"
                    placeholder="Email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full border border-gray-300 p-2 rounded-lg mb-3 focus:outline-none focus:ring-2 focus:ring-blue-400"
                    />

                    <input
                    type="text"
                    placeholder="Role"
                    value={formData.role}
                    onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                    className="w-full border border-gray-300 p-2 rounded-lg mb-3 focus:outline-none focus:ring-2 focus:ring-blue-400"
                    />

                    <textarea
                    placeholder="Bio"
                    value={formData.bio}
                    onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
                    className="w-full border border-gray-300 p-2 rounded-lg mb-3 focus:outline-none focus:ring-2 focus:ring-blue-400"
                    />

                    <input
                    type="text"
                    placeholder="Skills (comma separated)"
                    value={formData.skills}
                    onChange={(e) => setFormData({ ...formData, skills: e.target.value })}
                    className="w-full border border-gray-300 p-2 rounded-lg mb-6 focus:outline-none focus:ring-2 focus:ring-blue-400"
                    />

                    <div className="flex justify-end gap-3">
                    <button
                        onClick={() => setIsModalOpen(false)}
                        className="px-4 py-2 bg-gray-300 rounded-lg hover:bg-gray-400 transition"
                    >
                        Cancel
                    </button>
                    <button
                        onClick={handleSave}
                        className="px-4 py-2 bg-gradient-to-r from-blue-500 to-indigo-500 text-white rounded-lg shadow hover:from-blue-600 hover:to-indigo-600 transition"
                    >
                        Save
                    </button>
                    </div>
                </div>
            </div>
        </div>
      )}
      </>
        )}
    </div>
  );
};

export default Profile;
