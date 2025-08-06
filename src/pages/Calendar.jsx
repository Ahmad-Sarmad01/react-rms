import { useState, useEffect } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import CalendarModal from "../components/CalendarModal";

const formatDateKey = (y, m, d) => {
  return `${y}-${String(m + 1).padStart(2, "0")}-${String(d).padStart(2, "0")}`;
};

const Calendar = () => {
  const currentUser = JSON.parse(localStorage.getItem("currentUser"));
  const userEmail = currentUser?.email;

  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(null);
  const [tasks, setTasks] = useState([]);
  const [leaves, setLeaves] = useState([]);
  const [personalEvents, setPersonalEvents] = useState([]);
  const [announcements, setAnnouncements] = useState([]);
  const [slideDirection, setSlideDirection] = useState("");

  useEffect(() => {
    if (!userEmail) return;

    setTasks(JSON.parse(localStorage.getItem(`tasks_${userEmail}`)) || []);

    const allLeaves = JSON.parse(localStorage.getItem("leaveRequests")) || [];
    setLeaves(allLeaves.filter((l) => l.user === userEmail));

    setPersonalEvents(JSON.parse(localStorage.getItem(`calendarEvents_${userEmail}`)) || []);

    const ann = (JSON.parse(localStorage.getItem("announcements")) || []).map(a => {
      if (!a.dateKey && a.date) {
        const dateObj = new Date(a.date);
        return { ...a, dateKey: formatDateKey(dateObj.getFullYear(), dateObj.getMonth(), dateObj.getDate()) };
      }
      return a;
    });
    setAnnouncements(ann);
  }, [userEmail]);

  const daysInMonth = (month, year) => new Date(year, month + 1, 0).getDate();
  const firstDayOfMonth = (month, year) => new Date(year, month, 1).getDay();

  const prevMonth = () => {
    setSlideDirection("left");
    setTimeout(() => {
      setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1));
      setSlideDirection("");
    }, 200);
  };

  const nextMonth = () => {
    setSlideDirection("right");
    setTimeout(() => {
      setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1));
      setSlideDirection("");
    }, 200);
  };

  const month = currentDate.getMonth();
  const year = currentDate.getFullYear();
  const days = daysInMonth(month, year);
  const startDay = firstDayOfMonth(month, year);

  const handleDateClick = (day) => {
    setSelectedDate({
      date: day,
      month,
      year,
      key: formatDateKey(year, month, day),
    });
  };

  const updatePersonalEvents = (updated) => {
    setPersonalEvents(updated);
    localStorage.setItem(`calendarEvents_${userEmail}`, JSON.stringify(updated));
  };

  if (!userEmail) {
    return <p className="p-6 text-red-600 font-semibold">User not logged in.</p>;
  }

  return (
    <div className="min-h-screen p-6 bg-gradient-to-tr from-blue-50 to-white">
      <h1 className="text-3xl font-bold text-blue-800 mb-12">Calendar</h1>

      <div className="flex justify-between items-center mb-4">
        <button onClick={prevMonth} className="text-blue-600 hover:text-blue-800">
          <FaChevronLeft size={20} />
        </button>
        <h2 className="text-xl font-semibold text-gray-800">
          {currentDate.toLocaleString("default", { month: "long" })} {year}
        </h2>
        <button onClick={nextMonth} className="text-blue-600 hover:text-blue-800">
          <FaChevronRight size={20} />
        </button>
      </div>

      <div
        className={`grid grid-cols-7 gap-2 transition-transform duration-200 ${
          slideDirection === "left"
            ? "-translate-x-full"
            : slideDirection === "right"
            ? "translate-x-full"
            : ""
        }`}
      >
        {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
          <div key={day} className="text-center font-semibold text-gray-600">
            {day}
          </div>
        ))}

        {Array(startDay)
          .fill(null)
          .map((_, i) => (
            <div key={`empty-${i}`} />
          ))}

        {Array.from({ length: days }, (_, i) => {
          const day = i + 1;
          const dateKey = formatDateKey(year, month, day);

          const hasTask = tasks.some((t) => t.dueDate === dateKey);
          const hasLeave = leaves.some((l) => dateKey >= l.fromDate && dateKey <= l.toDate);
          const hasEvent = personalEvents.some((e) => e.date === dateKey);
          const hasAnnouncement = announcements.some((a) => a.dateKey === dateKey);

          return (
            <div
              key={day}
              onClick={() => handleDateClick(day)}
              className="h-20 border rounded-lg flex flex-col justify-between p-1 cursor-pointer hover:bg-blue-50"
            >
              <span className="text-sm">{day}</span>
              <div className="flex gap-1 justify-center">
                {hasTask && <span className="w-2 h-2 rounded-full bg-green-500" />}
                {hasLeave && <span className="w-2 h-2 rounded-full bg-red-500" />}
                {hasAnnouncement && <span className="w-2 h-2 rounded-full bg-orange-500" />}
                {hasEvent && <span className="w-2 h-2 rounded-full bg-blue-500" />}
              </div>
            </div>
          );
        })}
      </div>

      {selectedDate && (
        <CalendarModal
          dateInfo={selectedDate}
          tasks={tasks}
          leaves={leaves}
          announcements={announcements}
          events={personalEvents}
          updateEvents={updatePersonalEvents}
          closeModal={() => setSelectedDate(null)}
        />
      )}
    </div>
  );
};

export default Calendar;
