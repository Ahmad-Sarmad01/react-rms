import { Routes, Route } from "react-router-dom";
import IntroPage from "./pages/IntroPage";
import LoginPage from "./components/LoginPage";
import SignupPage from "./components/SignupPage";
import Dashboard from "./pages/Dashboard";
import TasksPage from "./pages/TasksPage";
import Attendance from "./pages/Attendance";
import Achievements from "./pages/Achievements";
import Layout from "./components/Layout"; 

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<IntroPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/signup" element={<SignupPage />} />
      <Route path="/dashboard" element={<Dashboard />} />

      <Route element={<Layout />}>
        
        <Route path="/tasks" element={<TasksPage />} />
        <Route path="/attendance" element={<Attendance />} />
        <Route path="/achievements" element={<Achievements />} />
      </Route>
    </Routes>
  );
};

export default App;
