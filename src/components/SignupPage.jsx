import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { auth, db } from "../firebase";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";

const SignupPage = ({ embedMode }) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: ""
  });
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setError(""); 
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { name, email, password } = formData;

    try {

      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      // Update user profile with name
      await updateProfile(user, { displayName: name });

      // Save user data to Firestore
      await setDoc(doc(db, "users", user.uid), {
        uid: user.uid,
        name,
        email,
        createdAt: new Date().toISOString(),
      });

      alert("Signup successful!");

      if (!embedMode) {
        navigate("/login");
      }
    } catch (err) {
      if (err.code === "auth/email-already-in-use") {
        setError("User already exists with this email");
      } else {
        setError(err.message);
      }
    }
  };


  const FormContent = (
    <form onSubmit={handleSubmit} className="bg-white p-8 w-full max-w-sm">
      <h2 className="text-2xl font-bold mb-6 text-center">Create Account</h2>

      <input
        type="text"
        name="name"
        placeholder="Your Name"
        className="w-full mb-4 p-2 border rounded"
        value={formData.name}
        onChange={handleChange}
        required
      />

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
        className="w-full bg-green-500 hover:bg-green-600 text-white py-2 rounded"
      >
        Sign Up
      </button>
    </form>
  );

  return embedMode ? FormContent : (
    <div className="min-h-screen flex items-center justify-center bg-green-50">
      {FormContent}
    </div>
  );
};

export default SignupPage;
