import { useState, useEffect } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import Loadertwo from "../components/Loadertwo";
import CalendarModal from "../components/CalendarModal";
import {
  collection,
  getDocs,
  addDoc,
  deleteDoc,
  doc
} from "firebase/firestore";
import { db } from "../firebase";

const formatDateKey = (y, m, d) =>
  `${y}-${String(m + 1).padStart(2, "0")}-${String(d).padStart(2, "0")}`;

const Calendar = () => {
  const currentUser = JSON.parse(localStorage.getItem("currentUser"));
  const userEmailRaw = currentUser?.email;
  const userEmail = userEmailRaw?.toLowerCase();

  const [loading, setLoading] = useState(true);

  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(null);
  const [tasks, setTasks] = useState([]);
  const [leaves, setLeaves] = useState([]);
  const [personalEvents, setPersonalEvents] = useState([]);
  const [announcements, setAnnouncements] = useState([]);
  const [slideDirection, setSlideDirection] = useState("");

  useEffect(() => {
    if (!userEmail) return;

    const fetchAll = async () => {
      try {
        setLoading(true);

        const tasksSnap = await getDocs(collection(db, "tasks"));
        const allTasks = tasksSnap.docs.map((d) => ({ id: d.id, ...d.data() }));
        setTasks(allTasks.filter((t) => (t.email || "").toLowerCase() === userEmail));

        const leavesSnap = await getDocs(collection(db, "leaveRequests"));
        const allLeaves = leavesSnap.docs.map((d) => ({ id: d.id, ...d.data() }));
        setLeaves(allLeaves.filter((l) => (l.user || "").toLowerCase() === userEmail));

        const eventsSnap = await getDocs(collection(db, "calendarEvents"));
        const allEvents = eventsSnap.docs.map((d) => ({ id: d.id, ...d.data() }));
        setPersonalEvents(allEvents.filter((e) => (e.email || "").toLowerCase() === userEmail));

        const annSnap = await getDocs(collection(db, "announcements"));
        const annData = annSnap.docs.map((d) => ({ id: d.id, ...d.data() })).map((a) => {
          if (!a.dateKey && a.date) {
            const dateObj = new Date(a.date);
            return {
              ...a,
              dateKey: formatDateKey(dateObj.getFullYear(), dateObj.getMonth(), dateObj.getDate()),
            };
          }
          return a;
        });
        setAnnouncements(annData);
        } catch (err) {
          console.error("Error fetching calendar data:", err);
        } finally {
          setLoading(false);
        }
      };

    fetchAll();
  }, [userEmail]);

  const updatePersonalEvents = async (updated) => {
    setPersonalEvents(updated);

    try {
      const prev = personalEvents || [];
      const toAdd = updated.filter((e) => !e.id);
      for (const e of toAdd) {
        await addDoc(collection(db, "calendarEvents"), {
          email: userEmail,
          date: e.date,
          title: e.title || "",
        });
      }

      const removed = prev.filter((p) => p.id && !updated.some((u) => u.id === p.id));
      for (const r of removed) {
        await deleteDoc(doc(db, "calendarEvents", r.id));
      }

      const eventsSnap = await getDocs(collection(db, "calendarEvents"));
      const allEvents = eventsSnap.docs.map((d) => ({ id: d.id, ...d.data() }));
      setPersonalEvents(allEvents.filter((e) => (e.email || "").toLowerCase() === userEmail));
    } catch (err) {
      console.error("Error syncing personal events with Firestore:", err);
    }
  };

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

  if (!userEmail) {
    return <p className="p-6 text-red-600 font-semibold">User not logged in.</p>;
  }

  return (
    <div className="min-h-screen p-6 bg-gradient-to-tr from-blue-50 to-white">
      <h1 className="text-3xl font-bold text-blue-800 mb-12">Calendar</h1>
{loading ? (
      <Loadertwo />
    ) : (
      <>
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
        {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((d) => (
          <div key={d} className="text-center font-semibold text-gray-600">
            {d}
          </div>
        ))}

        {Array(startDay).fill(null).map((_, i) => <div key={`empty-${i}`} />)}

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
      </>
      )}
    </div>
  );
};

export default Calendar;
