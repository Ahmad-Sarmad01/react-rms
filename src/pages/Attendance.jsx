import { useEffect, useState } from "react";
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

const Attendance = () => {

    const currentUser = JSON.parse(localStorage.getItem("currentUser"));
    const userEmail = currentUser?.email;
    if (!userEmail) {
    return <p className="p-6 text-red-600 font-semibold">User not logged in.</p>;
    }
    
    const localKey = `attendance_${userEmail}`;
    const checkInKey = `checkInTime_${userEmail}`;
    const checkedInKey = `isCheckedIn_${userEmail}`;

    const [isCheckedIn, setIsCheckedIn] = useState(() => {
    return localStorage.getItem(checkedInKey) === "true";
    });

    const [checkInTime, setCheckInTime] = useState(() => {
    const saved = localStorage.getItem(checkInKey);
    return saved ? new Date(saved) : null;
    });

    const [attendanceLog, setAttendanceLog] = useState(() => {
    const saved = localStorage.getItem(localKey);
    return saved ? JSON.parse(saved) : [];
    });

    useEffect(() => {
    localStorage.setItem(localKey, JSON.stringify(attendanceLog));
    }, [attendanceLog]);

    useEffect(() => {
    localStorage.setItem(checkedInKey, isCheckedIn);
    }, [isCheckedIn]);

    useEffect(() => {
    if (checkInTime) {
        localStorage.setItem(checkInKey, checkInTime.toISOString());
    } else {
        localStorage.removeItem(checkInKey);
    }
    }, [checkInTime]);

    const handleCheckIn = () => {
        const now = new Date();
        setCheckInTime(now);
        setAttendanceLog([
        ...attendanceLog,
        { type: "Check In", time: now.toLocaleTimeString(), date: now.toDateString() },
        ]);
        setIsCheckedIn(true);
    };

  const handleCheckOut = () => {
  const now = new Date();
  let workingHours = 0;

  if (checkInTime) {
    const diffMs = now - new Date(checkInTime);
    workingHours = (diffMs / (1000 * 60 * 60)).toFixed(2);
  }

  setAttendanceLog([
    ...attendanceLog,
    {
      type: "Check Out",
      time: now.toLocaleTimeString(),
      date: now.toDateString(),
      workingHours,
    },
  ]);
  setIsCheckedIn(false);
  setCheckInTime(null);

  localStorage.removeItem("checkInTime");
  localStorage.setItem("isCheckedIn", "false");
};

  const totalTodayHours = attendanceLog
    .filter((entry) => entry.date === new Date().toDateString() && entry.workingHours)
    .reduce((sum, entry) => sum + parseFloat(entry.workingHours), 0);

  const calendarDays = Array.from({ length: 31 }, (_, i) => i + 1);
  const currentMonth = new Date().toLocaleString("default", { month: "long" });

  return (
  <div className="min-h-screen p-6 bg-gradient-to-tr from-blue-50 to-white">
    <h1 className="text-3xl font-bold text-blue-800 mb-6">Attendance Tracker</h1>

    <div className="bg-white rounded-xl shadow p-6 mb-6 border">
        <p className="text-lg mb-4 font-medium">Today: {new Date().toDateString()}</p>

        <div className="lg:flex lg:items-center lg:justify-between">
            <div className="flex items-center gap-6">
            <div className="w-24 h-24">
                <CircularProgressbar
                value={Math.min((totalTodayHours / 8) * 100, 100)}
                text={`${totalTodayHours.toFixed(1)}h`}
                styles={buildStyles({
                    pathColor: totalTodayHours >= 8 ? '#22c55e' : '#3b82f6',
                    textColor: '#1e3a8a',
                    trailColor: '#e5e7eb',
                })}
                />
            </div>
            <p className={`font-semibold text-lg ${isCheckedIn ? "text-green-600" : "text-red-500"}`}>
                {isCheckedIn ? "Checked In" : "Not Checked In"}
            </p>
            </div>

            <div className="flex gap-4 mt-4 lg:mt-0">
            <button
                onClick={handleCheckIn}
                className="bg-green-500 hover:bg-green-600 transition px-6 py-2 rounded-full text-white shadow hover:cursor-pointer hover:scale-105"
                disabled={isCheckedIn}
            >
                🟢 Check In
            </button>
            <button
                onClick={handleCheckOut}
                className="bg-red-500 hover:bg-red-600 transition px-6 py-2 rounded-full text-white shadow hover:cursor-pointer hover:scale-105"
                disabled={!isCheckedIn}
            >
                🔴 Check Out
            </button>
            </div>
        </div>
    </div>

    <div className="bg-white rounded-xl shadow p-6 mb-10 border">
      <h2 className="text-2xl font-semibold text-blue-800 mb-4">{currentMonth} Calendar</h2>
      <div className="grid grid-cols-7 gap-3 text-sm text-center">
        {calendarDays.map((day) => {
          const dateStr = new Date(new Date().getFullYear(), new Date().getMonth(), day).toDateString();
          const hasEntry = attendanceLog.some((log) => log.date === dateStr);

          return (
            <div
              key={day}
              className={`rounded-lg py-2 font-medium shadow-sm transition ${
                hasEntry ? "bg-green-200 text-green-900 hover:scale-105 hover:bg-green-300" : "bg-gray-100 text-gray-500 hover:scale-105 hover:bg-gray-200"
              }`}
            >
              {day}
            </div>
          );
        })}
      </div>
    </div>

    <div className="bg-white rounded-xl shadow p-6 mb-10 border">
      <h2 className="text-2xl font-semibold text-blue-800 mb-4">Attendance Log 🧾</h2>
      {attendanceLog.length === 0 ? (
        <p className="text-gray-500">No entries yet.</p>
      ) : (
        <div className="overflow-auto">
          <table className="w-full text-sm text-left">
            <thead>
              <tr className="bg-blue-100 text-blue-800">
                <th className="p-3">Date</th>
                <th className="p-3">Type</th>
                <th className="p-3">Time</th>
                <th className="p-3">Hours</th>
              </tr>
            </thead>
            <tbody>
              {attendanceLog.map((entry, index) => (
                <tr key={index} className="border-t hover:bg-blue-50">
                  <td className="p-3">{entry.date}</td>
                  <td className="p-3">{entry.type}</td>
                  <td className="p-3">{entry.time}</td>
                  <td className="p-3">{entry.workingHours || "-"}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>

    <div className="bg-blue-100 text-blue-800 px-4 py-3 rounded-xl mb-6">
        <p className="font-semibold">Summary:</p>
        <p>Total Days Worked This Month: {
            Array.from(new Set(
                attendanceLog
                .filter(log => log.type === "Check Out" && new Date(log.date).getMonth() === new Date().getMonth())
                .map(log => new Date(log.date).toDateString())
            )).length
        }</p>

        <p>Total Hours: {
            attendanceLog
            .filter(log => log.workingHours && new Date(log.date).getMonth() === new Date().getMonth())
            .reduce((sum, log) => sum + parseFloat(log.workingHours), 0)
            .toFixed(1)
        } hrs</p>
    </div>
  </div>
);

};

export default Attendance;
