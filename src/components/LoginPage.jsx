import { useState } from "react";
import { useNavigate } from "react-router-dom";

const LoginPage = ({ embedMode = false }) => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setError("");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const storedUsers = JSON.parse(localStorage.getItem("users")) || [];

    const matchedUser = storedUsers.find(
      (user) =>
        user.email === formData.email && user.password === formData.password
    );

    if (matchedUser) {
      localStorage.setItem("currentUser", JSON.stringify(matchedUser));
      navigate("/dashboard");
    } else {
      setError("Invalid email or password");
    }
  };

  const formContent = (
    <form
      onSubmit={handleSubmit}
      className="bg-white p-6 sm:p-8 w-full"
    >
      <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>

      <input
        type="email"
        name="email"
        placeholder="Email"
        className="w-full mb-4 p-2 border rounded"
        value={formData.email}
        onChange={handleChange}
        required
      />

      <input
        type="password"
        name="password"
        placeholder="Password"
        className="w-full mb-4 p-2 border rounded"
        value={formData.password}
        onChange={handleChange}
        required
      />

      {error && <p className="text-red-500 mb-4 text-sm">{error}</p>}

      <button
        type="submit"
        className="w-full bg-blue-500 hover:bg-blue-600 text-white py-2 rounded"
      >
        Login
      </button>
    </form>
  );

  return embedMode ? formContent : (
    <div className="min-h-screen flex items-center justify-center bg-blue-50">
      <div className="w-full max-w-sm">{formContent}</div>
    </div>
  );
};

export default LoginPage;
