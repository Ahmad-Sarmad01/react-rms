import { useState } from "react";
import LoginPage from "../components/LoginPage";
import SignupPage from "../components/SignupPage";

const IntroPage = () => {
  const [showLogin, setShowLogin] = useState(false);
  const [showSignup, setShowSignup] = useState(false);

  return (
    <div className="min-h-screen flex flex-col justify-between bg-gradient-to-br from-white via-blue-50 to-blue-100 px-6 relative overflow-hidden">
      {/* Intro Content */}
      <div className="flex flex-col items-center justify-center flex-grow text-center mt-20 z-10">
        <h1 className="text-4xl sm:text-5xl font-bold text-blue-700 mb-3">
          Invex RMS
        </h1>
        <p className="text-gray-600 text-lg sm:text-xl mb-6 max-w-md">
          Simplifying Resource Management for Smart Teams
        </p>

        <div className="flex gap-4">
          <button
            onClick={() => setShowLogin(true)}
            className="px-6 py-2 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-medium shadow-md transition"
          >
            Login
          </button>
          <button
            onClick={() => setShowSignup(true)}
            className="px-6 py-2 rounded-lg bg-gray-200 hover:bg-gray-300 text-blue-700 font-medium shadow-md transition"
          >
            Signup
          </button>
        </div>
      </div>

      {/* Footer */}
      <footer className="text-center text-sm text-black py-4 z-10">
        © 2025 InvexTech · All rights reserved
      </footer>

    {showLogin && (
    <div className="absolute inset-0 bg-white/10 backdrop-blur-md flex items-center justify-center z-20 animate-slideUp">
        <div className="w-full max-w-sm p-6 bg-white/80 rounded-xl shadow-xl backdrop-blur-sm">
        <LoginPage embedMode={true} />
        <button
            className="mt-4 text-sm text-blue-600 hover:underline"
            onClick={() => setShowLogin(false)}
        >
            Back
        </button>
        </div>
    </div>
    )}

    {showSignup && (
    <div className="absolute inset-0 bg-white/10 backdrop-blur-md flex items-center justify-center z-20 animate-slideUp">
        <div className="w-full max-w-sm p-6 bg-white/80 rounded-xl shadow-xl backdrop-blur-sm">
        <SignupPage embedMode={true} />
        <button
            className="mt-4 text-sm text-blue-600 hover:underline"
            onClick={() => setShowSignup(false)}
        >
            Back
        </button>
        </div>
    </div>
    )}


    </div>
  );
};

export default IntroPage;
