import { useEffect, useState } from "react";
import { generatePaySlipPDF } from "../components/PayPDF";
import { Pie, Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
} from "chart.js";

ChartJS.register(
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement
);

const monthNames = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
];

const Payroll = () => {
  const currentUser = JSON.parse(localStorage.getItem("currentUser"));
  const userEmail = currentUser?.email;
  const [payrollData, setPayrollData] = useState(null);
  const [history, setHistory] = useState([]);

  const generateRandomPayroll = (month, year) => {
    const basicSalary = Math.floor(Math.random() * (90000 - 80000 + 1)) + 80000;
    const bonus = Math.floor(Math.random() * (15000 - 5000 + 1)) + 5000;
    const deductions = Math.floor(Math.random() * (8000 - 2000 + 1)) + 2000;
    const netSalary = basicSalary + bonus - deductions;

    return {
      month: `${month} ${year}`,
      basicSalary,
      bonus,
      deductions,
      netSalary,
      status: "Paid"
    };
  };

  useEffect(() => {
    if (!userEmail) return;

    const allPayrolls = JSON.parse(localStorage.getItem("payrollRecords")) || {};
    const userPayroll = allPayrolls[userEmail];

    if (!userPayroll || !userPayroll.current || !userPayroll.history) {
      const year = new Date().getFullYear();
      const monthIndex = new Date().getMonth();

      const historyData = [];
      for (let i = 0; i < 6; i++) {
        let mIndex = (monthIndex - i + 12) % 12;
        let y = year;
        if (monthIndex - i < 0) y = year - 1;
        historyData.push(generateRandomPayroll(monthNames[mIndex], y));
      }

      allPayrolls[userEmail] = {
        current: historyData[0],
        history: historyData
      };
      localStorage.setItem("payrollRecords", JSON.stringify(allPayrolls));
      setPayrollData(historyData[0]);
      setHistory(historyData);
    } else {
      setPayrollData(userPayroll.current);
      setHistory(userPayroll.history);
    }
  }, [userEmail]);

  if (!userEmail) {
    return (
      <div className="p-6 text-red-600 text-center font-semibold">
        You must be logged in to view your payroll.
      </div>
    );
  }

  if (!payrollData) {
    return (
      <div className="p-6 text-gray-600 text-center">
        Loading payroll data...
      </div>
    );
  }

  // Pie Chart Data
  const pieData = {
    labels: ["Basic Salary", "Bonus", "Deductions"],
    datasets: [
      {
        data: [payrollData.basicSalary, payrollData.bonus, payrollData.deductions],
        backgroundColor: ["#3b82f6", "#10b981", "#ef4444"],
        hoverBackgroundColor: ["#2563eb", "#059669", "#dc2626"],
      },
    ],
  };

  // Line Chart Data (Net Salary Trend)
  const lineData = {
    labels: history.map((h) => h.month).reverse(),
    datasets: [
      {
        label: "Net Salary",
        data: history.map((h) => h.netSalary).reverse(),
        borderColor: "#3b82f6",
        backgroundColor: "rgba(59,130,246,0.2)",
        tension: 0.3,
        fill: true,
        pointBackgroundColor: "#3b82f6",
      },
    ],
  };

  return (
    <div className="min-h-screen p-6 bg-gradient-to-tr from-blue-50 to-white animate-fade-in">
      <h2 className="text-3xl font-bold text-blue-800 mb-6">Payroll</h2>

      {/* Current Month Payroll */}
      <div className="bg-white rounded-xl shadow p-6 mb-6 border">
        <h3 className="text-2xl font-semibold mb-4 text-blue-800">Current Month Payroll</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <p><strong>Month:</strong> {payrollData.month}</p>
            <p><strong>Basic Salary:</strong> PKR {payrollData.basicSalary}</p>
            <p><strong>Bonus:</strong> PKR {payrollData.bonus}</p>
            <p><strong>Deductions:</strong> PKR {payrollData.deductions}</p>
          </div>

          <div
            className="flex flex-col items-center justify-center bg-blue-100 rounded-lg p-4
            transform transition duration-300 hover:scale-105 
            hover:shadow-[0_0_20px_rgba(59,130,246,0.7)] mx-3"
          >
            <p className="text-lg font-semibold text-black">Net Salary</p>
            <p className="text-2xl font-bold text-green-700">
              PKR {payrollData.netSalary}
            </p>
            <p className="mt-2">
              <strong>Status:</strong>{" "}
              <span className="text-green-600 font-bold">Paid</span>
            </p>

            <button
              onClick={() =>
                generatePaySlipPDF(
                  { name: currentUser.name, email: currentUser.email },
                  payrollData
                )
              }
              className="mt-4 bg-blue-600 text-white px-6 py-2 rounded-md 
              transition duration-300 transform hover:scale-105 hover:bg-blue-800 
              hover:shadow-[0_0_15px_rgba(59,130,246,0.8)]"
            >
              Payslip
            </button>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
        <div className="bg-white rounded-xl shadow p-6 border hover:shadow-lg transition duration-300 
                        animate-fade-in-scale flex justify-center">
          <div className="w-full max-w-[350px]">
            <h4 className="text-lg font-semibold text-gray-800 mb-4">Salary Structure</h4>
            <Pie data={pieData} />
          </div>
        </div>
        <div className="bg-white rounded-xl shadow p-6 border hover:shadow-lg transition duration-300 
                        animate-fade-in-scale delay-200 flex justify-center">
          <div className="w-full max-w-[700px]">
            <h4 className="text-lg font-semibold text-gray-800 mb-4">Salary Trend (Last 6 Months)</h4>
            <Line data={lineData} />
          </div>
        </div>
      </div>

      <div>
        <h3 className="text-2xl font-semibold mb-4 text-blue-800">Payroll History</h3>
        <table className="w-full border border-gray-200 rounded-lg overflow-hidden">
          <thead className="bg-blue-600 text-white">
            <tr>
              <th className="py-2 px-4 text-left">Month</th>
              <th className="py-2 px-4 text-left">Basic</th>
              <th className="py-2 px-4 text-left">Bonus</th>
              <th className="py-2 px-4 text-left">Deductions</th>
              <th className="py-2 px-4 text-left">Net Salary</th>
              <th className="py-2 px-4 text-left">Status</th>
              <th className="py-2 px-4 text-left">Action</th>
            </tr>
          </thead>
          <tbody>
            {history.map((record, idx) => (
              <tr key={idx} className="border-t">
                <td className="py-2 px-4">{record.month}</td>
                <td className="py-2 px-4">PKR {record.basicSalary}</td>
                <td className="py-2 px-4">PKR {record.bonus}</td>
                <td className="py-2 px-4">PKR {record.deductions}</td>
                <td className="py-2 px-4 text-green-700 font-semibold">
                  PKR {record.netSalary}
                </td>
                <td className="py-2 px-4 text-green-600 font-bold">{record.status}</td>
                <td className="py-2 px-4">
                  <button
                    onClick={() =>
                      generatePaySlipPDF(
                        { name: currentUser.name, email: currentUser.email },
                        record
                      )
                    }
                    className="bg-blue-500 text-white px-3 py-1 rounded text-sm transition duration-300 transform hover:scale-105 hover:bg-blue-700 hover:shadow-[0_0_15px_rgba(59,130,246,0.8)]"
                  >
                    Payslip
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Payroll;
