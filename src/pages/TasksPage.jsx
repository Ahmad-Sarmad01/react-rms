import { useState, useEffect } from "react";
import {
  collection,
  addDoc,
  getDocs,
  updateDoc,
  deleteDoc,
  doc,
  query,
  where
} from "firebase/firestore";
import { db } from "../firebase"; 

const TasksPage = () => {
  const [title, setTitle] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [tasks, setTasks] = useState([]);
  const [filter, setFilter] = useState("All");

const currentUser = JSON.parse(localStorage.getItem("currentUser"));
const userEmail = currentUser?.email;

if (!userEmail) {
  return <p className="p-6 text-red-600 font-semibold">User not logged in.</p>;
}

  const addTask = async () => {
    if (!title || !dueDate) return;
    const newTask = {
      title,
      dueDate,
      completed: false,
      email: userEmail,
      createdAt: Date.now()
    };

    try {
      const docRef = await addDoc(collection(db, "tasks"), newTask);
      setTasks([...tasks, { id: docRef.id, ...newTask }]);
      setTitle("");
      setDueDate("");
    } catch (error) {
      console.error("Error adding task: ", error);
    }
  };

  const deleteTask = async (id) => {
    try {
      await deleteDoc(doc(db, "tasks", id));
      setTasks(tasks.filter((task) => task.id !== id));
    } catch (error) {
      console.error("Error deleting task: ", error);
    }
  };

  const toggleTask = async (id) => {
    const updatedTasks = tasks.map((task) =>
      task.id === id ? { ...task, completed: !task.completed } : task
    );
    const toggledTask = updatedTasks.find((t) => t.id === id);

    try {
      await updateDoc(doc(db, "tasks", id), {
        completed: toggledTask.completed,
      });
      setTasks(updatedTasks);
    } catch (error) {
      console.error("Error toggling task: ", error);
    }
  };

  const getFilteredTasks = () => {
    if (filter === "Completed") return tasks.filter((t) => t.completed);
    if (filter === "Pending") return tasks.filter((t) => !t.completed);
    return tasks;
  };

  const filteredTasks = getFilteredTasks();

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const q = query(collection(db, "tasks"), where("email", "==", userEmail));
        const querySnapshot = await getDocs(q);
        const fetchedTasks = [];
        querySnapshot.forEach((docSnap) => {
          const data = docSnap.data();
          fetchedTasks.push({
            id: docSnap.id,
            ...data
          });
        });
        setTasks(fetchedTasks);
      } catch (error) {
        console.error("Error fetching tasks: ", error);
      }
    };

    if (userEmail) {
      fetchTasks();
    }
  }, [userEmail]);


  return (
    <div className="min-h-screen p-6 bg-gradient-to-tr from-blue-50 to-white animate-fade-in">
      <h2 className="text-3xl font-bold text-blue-800 mb-6">
        Tasks Management
      </h2>

      <div className="flex flex-col sm:flex-row gap-4 mb-6">
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Task title"
          className="border rounded px-4 py-2 w-full shadow"
        />
        <input
          type="date"
          value={dueDate}
          onChange={(e) => setDueDate(e.target.value)}
          className="border rounded px-4 py-2 shadow"
        />
        <button
          onClick={addTask}
          className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 shadow"
        >
          ADD
        </button>
      </div>

      <div className="flex gap-4 mb-6">
        {["All", "Completed", "Pending"].map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={`px-4 py-2 rounded-full border ${
              filter === f
                ? "bg-blue-600 text-white"
                : "text-blue-600 hover:bg-blue-100"
            }`}
          >
            {f}
          </button>
        ))}
      </div>

      {filteredTasks.length === 0 ? (
        <p className="text-gray-500 text-center">No tasks to show.</p>
      ) : (
        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4">
          {filteredTasks.map((task) => (
            <div
              key={task.id}
              className={`p-4 rounded-xl shadow transition-all duration-300 border ${
                task.completed ? "bg-green-100" : "bg-white"
              }`}
            >
              <div className="flex justify-between items-center mb-2">
                <h3
                  className={`font-semibold text-lg ${
                    task.completed ? "line-through text-gray-500" : ""
                  }`}
                >
                  {task.title}
                </h3>
                <button
                  onClick={() => deleteTask(task.id)}
                  className="text-red-500 hover:text-red-700"
                >
                  ❌
                </button>
              </div>
              <p className="text-sm text-gray-600">🕒 Due: {task.dueDate}</p>
              <div className="mt-3 flex justify-between items-center">
                <button
                  onClick={() => toggleTask(task.id)}
                  className={`px-3 py-1 rounded-full text-xs font-medium ${
                    task.completed
                      ? "bg-green-600 text-white"
                      : "bg-yellow-500 text-white"
                  }`}
                >
                  {task.completed ? "Completed" : "Pending"}
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default TasksPage;
