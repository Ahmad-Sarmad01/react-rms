import { useState, useEffect } from "react";
import { FaTrash, FaUpload, FaFileAlt } from "react-icons/fa";

const Reports = () => {
  const currentUser = JSON.parse(localStorage.getItem("currentUser"));
  const userEmail = currentUser?.email;

  const [reports, setReports] = useState([]);
  const [category, setCategory] = useState("Daily");
  const [taskName, setTaskName] = useState("");
  const [description, setDescription] = useState("");
  const [files, setFiles] = useState([]);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [reportToDelete, setReportToDelete] = useState(null);

  // Load reports for this user
  useEffect(() => {
    if (userEmail) {
      const savedReports =
        JSON.parse(localStorage.getItem(`reports_${userEmail}`)) || [];
      setReports(savedReports);
    }
  }, [userEmail]);

  const handleFileChange = (e) => {
    setFiles(Array.from(e.target.files));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!taskName.trim() || !description.trim()) {
      alert("Please fill in all required fields.");
      return;
    }

    const newReport = {
      id: Date.now(),
      category,
      taskName,
      description,
      files: files.map((file) => ({
        name: file.name,
        type: file.type,
        url: URL.createObjectURL(file),
      })),
      date: new Date().toLocaleDateString(),
    };

    const updatedReports = [newReport, ...reports];
    setReports(updatedReports);
    localStorage.setItem(`reports_${userEmail}`, JSON.stringify(updatedReports));

    // Reset form
    setCategory("Daily");
    setTaskName("");
    setDescription("");
    setFiles([]);
  };

  const confirmDelete = (reportId) => {
    setReportToDelete(reportId);
    setShowDeleteModal(true);
  };

  const handleDelete = () => {
    const updatedReports = reports.filter((r) => r.id !== reportToDelete);
    setReports(updatedReports);
    localStorage.setItem(`reports_${userEmail}`, JSON.stringify(updatedReports));
    setShowDeleteModal(false);
    setReportToDelete(null);
  };

  if (!userEmail) {
    return <p className="p-6 text-red-600 font-semibold">User not logged in.</p>;
  }

  return (
    <div className="min-h-screen p-6 bg-gradient-to-tr from-blue-50 to-white">
      <h1 className="text-3xl font-bold text-blue-800 mb-8">Reports</h1>

      {/* Report Form */}
      <form
        onSubmit={handleSubmit}
        className="bg-white rounded-xl shadow-md p-6 mb-10 border border-gray-200"
      >
        <div className="grid gap-4 sm:grid-cols-2">
          {/* Category */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Report Category
            </label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full border border-gray-300 rounded-lg p-2 focus:ring focus:ring-blue-200"
            >
              <option value="Daily">Daily</option>
              <option value="Monthly">Monthly</option>
            </select>
          </div>

          {/* Task Name */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Task Name
            </label>
            <input
              type="text"
              value={taskName}
              onChange={(e) => setTaskName(e.target.value)}
              placeholder="Enter task name"
              className="w-full border border-gray-300 rounded-lg p-2 focus:ring focus:ring-blue-200"
            />
          </div>
        </div>

        {/* Description */}
        <div className="mt-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Description
          </label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Write report description..."
            rows={3}
            className="w-full border border-gray-300 rounded-lg p-2 focus:ring focus:ring-blue-200"
          />
        </div>

        {/* File Upload */}
        <div className="mt-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Attach Files
          </label>
          <input
            type="file"
            multiple
            onChange={handleFileChange}
            className="hidden"
            id="file-upload"
          />
          <label
            htmlFor="file-upload"
            className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg cursor-pointer hover:bg-blue-700 transition"
          >
            <FaUpload /> Select Files
          </label>
          {files.length > 0 && (
            <div className="mt-2 text-sm text-gray-600">
              {files.map((file, idx) => (
                <div key={idx}>{file.name}</div>
              ))}
            </div>
          )}
        </div>

        <button
          type="submit"
          className="mt-6 px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition"
        >
          Submit Report
        </button>
      </form>

      {/* Reports Summary */}
      <h2 className="text-2xl font-semibold text-blue-800 mb-4">
        Submitted Reports
      </h2>
      {reports.length === 0 ? (
        <p className="text-gray-600">No reports submitted yet.</p>
      ) : (
        <div className="overflow-x-auto bg-white rounded-xl shadow-md border border-gray-200">
          <table className="w-full text-left">
            <thead className="bg-blue-100">
              <tr>
                <th className="p-3">Date</th>
                <th className="p-3">Category</th>
                <th className="p-3">Task Name</th>
                <th className="p-3">Description</th>
                <th className="p-3">Files</th>
                <th className="p-3">Actions</th>
              </tr>
            </thead>
            <tbody>
              {reports.map((report) => (
                <tr key={report.id} className="border-t hover:bg-gray-50">
                  <td className="p-3">{report.date}</td>
                  <td className="p-3">{report.category}</td>
                  <td className="p-3">{report.taskName}</td>
                  <td className="p-3">{report.description}</td>
                  <td className="p-3">
                    {report.files.length > 0 ? (
                      <div className="flex flex-col gap-1">
                        {report.files.map((file, idx) => (
                          <a
                            key={idx}
                            href={file.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-blue-600 hover:underline flex items-center gap-1"
                          >
                            <FaFileAlt /> {file.name}
                          </a>
                        ))}
                      </div>
                    ) : (
                      "No Files"
                    )}
                  </td>
                  <td className="p-3">
                    <button
                      onClick={() => confirmDelete(report.id)}
                      className="text-red-600 hover:text-red-800"
                    >
                      <FaTrash />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {showDeleteModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-opacity-40 z-50">
          <div className="bg-white rounded-lg border shadow-lg p-6 w-96">
            <h3 className="text-lg font-semibold mb-4 text-gray-800">
              Confirm Deletion
            </h3>
            <p className="text-gray-600 mb-6">
              Are you sure you want to delete this report? This action cannot be undone.
            </p>
            <div className="flex justify-end gap-4">
              <button
                onClick={() => setShowDeleteModal(false)}
                className="px-4 py-2 bg-gray-300 rounded-lg hover:bg-gray-400 transition"
              >
                Cancel
              </button>
              <button
                onClick={handleDelete}
                className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Reports;
