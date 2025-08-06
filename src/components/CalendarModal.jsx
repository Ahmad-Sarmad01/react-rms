import { useState } from "react";
import { FaTimes, FaTrash, FaBullhorn } from "react-icons/fa";

const CalendarModal = ({
  dateInfo,
  tasks,
  leaves,
  announcements,
  events,
  updateEvents,
  closeModal,
}) => {
  const [newEvent, setNewEvent] = useState("");

  const dateKey = dateInfo.key;

  const dayTasks = tasks.filter((t) => t.dueDate === dateKey);
  const dayLeaves = leaves.filter((l) => dateKey >= l.fromDate && dateKey <= l.toDate);
  const dayAnnouncements = announcements.filter((a) => a.dateKey === dateKey);
  const dayEvents = events.filter((e) => e.date === dateKey);

  const addEvent = () => {
    if (!newEvent.trim()) return;
    const updated = [...events, { date: dateKey, title: newEvent.trim() }];
    updateEvents(updated);
    setNewEvent("");
  };

  const deleteEvent = (index) => {
    const updated = events.filter((e, i) => !(e.date === dateKey && i === index));
    updateEvents(updated);
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50">
      <div className="bg-white w-full max-w-md rounded-lg shadow-lg p-6 animate-[slideUp_0.3s_ease-out] overflow-y-auto max-h-[90vh]">
        
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-bold text-gray-800">
            {dateInfo.date}{" "}
            {new Date(dateInfo.year, dateInfo.month).toLocaleString("default", { month: "long" })}{" "}
            {dateInfo.year}
          </h2>
          <button onClick={closeModal} className="text-gray-500 hover:text-gray-700">
            <FaTimes size={18} />
          </button>
        </div>

        {dayAnnouncements.length > 0 && (
          <div className="mb-4 bg-orange-50 border-l-4 border-orange-500 p-3 rounded">
            <h3 className="font-semibold text-orange-600 flex items-center gap-2">
              <FaBullhorn /> Announcements
            </h3>
            <ul className="list-disc list-inside text-sm text-gray-700">
              {dayAnnouncements.map((a, idx) => (
                <li key={idx}>{a.title}</li>
              ))}
            </ul>
          </div>
        )}

        {dayTasks.length > 0 && (
          <div className="mb-4">
            <h3 className="font-semibold text-green-600">Tasks</h3>
            <ul className="list-disc list-inside text-sm text-gray-700">
              {dayTasks.map((t, idx) => (
                <li key={idx}>{t.title}</li>
              ))}
            </ul>
          </div>
        )}

        {dayLeaves.length > 0 && (
          <div className="mb-4">
            <h3 className="font-semibold text-red-600">Leaves</h3>
            <ul className="list-disc list-inside text-sm text-gray-700">
              {dayLeaves.map((l, idx) => (
                <li key={idx}>
                  {l.leaveType} - {l.reason}
                </li>
              ))}
            </ul>
          </div>
        )}

        <div className="mb-4">
          <h3 className="font-semibold text-blue-600">Personal Events</h3>
          {dayEvents.length > 0 ? (
            <ul className="list-disc list-inside text-sm text-gray-700">
              {dayEvents.map((e, idx) => (
                <li key={idx} className="flex justify-between items-center">
                  {e.title}
                  <button
                    onClick={() => deleteEvent(idx)}
                    className="text-red-500 hover:text-red-700"
                  >
                    <FaTrash size={14} />
                  </button>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-gray-500 text-sm">No personal events for this date.</p>
          )}
        </div>

        <div className="flex gap-2">
          <input
            type="text"
            value={newEvent}
            onChange={(e) => setNewEvent(e.target.value)}
            placeholder="New event"
            className="flex-1 border p-2 rounded"
          />
          <button
            onClick={addEvent}
            className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            Add
          </button>
        </div>
      </div>
    </div>
  );
};

export default CalendarModal;
