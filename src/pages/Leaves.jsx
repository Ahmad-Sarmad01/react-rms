import { useEffect, useState } from "react";
import Loadertwo from "../components/Loadertwo";
import { format } from "date-fns";
import { motion } from "framer-motion";
import { FaPaperPlane, FaTrashAlt } from "react-icons/fa";
import { db } from "../firebase"; 
import {
  collection,
  addDoc,
  query,
  where,
  getDocs,
  deleteDoc,
  doc,
  onSnapshot,
} from "firebase/firestore";

const Leaves = () => {
  const [showSuccess, setShowSuccess] = useState(false);
  const currentUser = JSON.parse(localStorage.getItem("currentUser"));
  const userEmail = currentUser?.email;

  const [loading, setLoading] = useState(true);

  const [requests, setRequests] = useState([]);
  const [leaveType, setLeaveType] = useState("");
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");
  const [reason, setReason] = useState("");

  useEffect(() => {
    if (!userEmail) return;

    const q = query(collection(db, "leaveRequests"), where("user", "==", userEmail));

    // Live updates from Firestore
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const userRequests = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
      setRequests(userRequests);
      setLoading(false);
    });

    return () => unsubscribe();
  }, [userEmail]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newRequest = {
      user: userEmail,
      leaveType,
      fromDate,
      toDate,
      reason,
      status: "Pending",
    };

    await addDoc(collection(db, "leaveRequests"), newRequest);

    // Clear form
    setLeaveType("");
    setFromDate("");
    setToDate("");
    setReason("");
    setShowSuccess(true);
    setTimeout(() => setShowSuccess(false), 8000);
  };

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this request?");
    if (!confirmDelete) return;

    await deleteDoc(doc(db, "leaveRequests", id));
  };

  if (!userEmail) {
    return (
      <div className="p-6 text-red-600 text-center font-semibold">
        You must be logged in to view leave requests.
      </div>
    );
  }

  return (
    <div className="min-h-screen p-6 bg-gradient-to-tr from-blue-50 to-white animate-fade-in">
      <h2 className="text-3xl font-bold text-blue-800 mb-6">Request a Leave</h2>
      {loading ? (
          <Loadertwo />
      ) : (
        <>
      {/* Summary Boxes */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        <div className="bg-blue-100 p-4 rounded-xl shadow text-center">
          <p className="text-xl font-bold text-blue-800">{requests.length}</p>
          <p className="text-sm text-gray-600">Total Requests</p>
        </div>
        <div className="bg-yellow-100 p-4 rounded-xl shadow text-center">
          <p className="text-xl font-bold text-yellow-700">
            {requests.filter((r) => r.status === "Pending").length}
          </p>
          <p className="text-sm text-gray-600">Pending</p>
        </div>
        <div className="bg-green-100 p-4 rounded-xl shadow text-center">
          <p className="text-xl font-bold text-green-700">
            {requests.filter((r) => r.status === "Approved").length}
          </p>
          <p className="text-sm text-gray-600">Approved</p>
        </div>
        <div className="bg-red-100 p-4 rounded-xl shadow text-center">
          <p className="text-xl font-bold text-red-700">
            {requests.filter((r) => r.status === "Rejected").length}
          </p>
          <p className="text-sm text-gray-600">Rejected</p>
        </div>
      </div>

      {/* Success message */}
      {showSuccess && (
        <motion.div
          className="mb-4 text-green-800 bg-green-100 border border-green-300 rounded-md px-4 py-3 text-center font-medium"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0 }}
        >
          Leave request submitted successfully! ✅
        </motion.div>
      )}

      {/* Request Form */}
      <motion.form
        onSubmit={handleSubmit}
        className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-white rounded-xl shadow p-6 mb-10"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
      >
        {/* Form Fields */}
        <div>
          <label className="font-medium">Leave Type</label>
          <select
            value={leaveType}
            onChange={(e) => setLeaveType(e.target.value)}
            required
            className="mt-1 p-2 w-full border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-300"
          >
            <option value="">Select Leave Type</option>
            <option value="Sick">Sick</option>
            <option value="Annual">Annual</option>
            <option value="Maternity">Maternity</option>
            <option value="Paternity">Paternity</option>
            <option value="Bereavement">Bereavement</option>
            <option value="Vacation">Vacation</option>
            <option value="Unpaid">Unpaid</option>
            <option value="Casual">Casual</option>
          </select>
        </div>

        <div>
          <label className="font-medium">From</label>
          <input
            type="date"
            value={fromDate}
            onChange={(e) => setFromDate(e.target.value)}
            required
            className="mt-1 p-2 w-full border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-300"
          />
        </div>

        <div>
          <label className="font-medium">To</label>
          <input
            type="date"
            value={toDate}
            onChange={(e) => setToDate(e.target.value)}
            required
            className="mt-1 p-2 w-full border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-300"
          />
        </div>

        <div className="md:col-span-2">
          <label className="font-medium">Reason</label>
          <textarea
            value={reason}
            onChange={(e) => setReason(e.target.value)}
            required
            className="mt-1 p-2 w-full border border-gray-300 rounded-md resize-none focus:outline-none focus:ring focus:ring-blue-300"
            rows={3}
          ></textarea>
        </div>

        <motion.button
          whileTap={{ scale: 0.97 }}
          type="submit"
          className="md:col-span-2 bg-blue-600 text-white font-medium py-2 px-6 rounded-md hover:bg-blue-700 transition flex items-center justify-center gap-2 mx-auto w-fit"
        >
          Submit Request
          <FaPaperPlane />
        </motion.button>
      </motion.form>

      {/* Leave History */}
      <div className="mt-10 mx-auto">
        <h3 className="text-2xl font-semibold mb-4 text-blue-800">My Leave History</h3>

        {requests.length === 0 ? (
          <p className="text-gray-500">No leave requests submitted yet.</p>
        ) : (
          <div className="overflow-x-auto rounded-lg shadow-md">
            <table className="min-w-full border border-gray-200 text-sm bg-white">
              <thead className="bg-blue-600 text-white">
                <tr>
                  <th className="p-3 text-left">Type</th>
                  <th className="p-3 text-left">From</th>
                  <th className="p-3 text-left">To</th>
                  <th className="p-3 text-left">Reason</th>
                  <th className="p-3 text-left">Status</th>
                  <th className="p-3 text-left">Action</th>
                </tr>
              </thead>
              <tbody>
                {requests.map((req) => (
                  <motion.tr
                    key={req.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                    className="hover:bg-blue-100"
                  >
                    <td className="p-3">{req.leaveType}</td>
                    <td className="p-3">{format(new Date(req.fromDate), "PPP")}</td>
                    <td className="p-3">{format(new Date(req.toDate), "PPP")}</td>
                    <td className="p-3">{req.reason}</td>
                    <td
                      className={`p-3 font-semibold ${
                        req.status === "Pending"
                          ? "text-yellow-600"
                          : req.status === "Approved"
                          ? "text-green-600"
                          : "text-red-600"
                      }`}
                    >
                      {req.status}
                    </td>
                    <td className="p-3">
                      <motion.button
                        whileHover={{ scale: 1.3 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={() => handleDelete(req.id)}
                        className="text-red-600 hover:text-red-800 transition"
                        title="Delete"
                      >
                        <FaTrashAlt />
                      </motion.button>
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
      </>
      )}
    </div>
  );
};

export default Leaves;
