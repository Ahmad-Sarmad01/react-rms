import { Routes, Route } from "react-router-dom";
import IntroPage from "./pages/IntroPage";
import LoginPage from "./components/LoginPage";
import SignupPage from "./components/SignupPage";
import Dashboard from "./pages/Dashboard";
import TasksPage from "./pages/TasksPage";
import Attendance from "./pages/Attendance";
import Achievements from "./pages/Achievements";
import Leaves from "./pages/Leaves";
import Payroll from "./pages/Payroll";
import Announcements from "./pages/Announcements";
import Profile from "./pages/Profile";
import Calendar from "./pages/Calendar";
import Reports from "./pages/Reports";
import Learning from "./pages/Learning";
import Support from "./pages/Support";
import Team from "./pages/Team";
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
        <Route path="/leaves" element={<Leaves />} />
        <Route path="/payroll" element={<Payroll />} />
        <Route path="/announcements" element={<Announcements />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/calendar" element={<Calendar />} />
        <Route path="/reports" element={<Reports />} />
        <Route path="/learning" element={<Learning />} />
        <Route path="/support" element={<Support />} />
        <Route path="/team" element={<Team />} />
      </Route>
    </Routes>
  );
};

export default App;
