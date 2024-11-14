import React, { useState } from "react";

interface SolarDataTableProps {
  title: string;
  column: string;
  unit: string;
}
export default function SolarDataTable({
  title,
  column,
  unit,
}: SolarDataTableProps) {
  const [viewType, setViewType] = useState("daily");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  // Sample data - you can replace this with your actual data
  const dailyData = [
    { time: "2024-08-01", irradiation: 335, output: 26, efficiency: 95.9 },
    { time: "2024-08-02", irradiation: 257, output: 17, efficiency: 91.4 },
    { time: "2024-08-03", irradiation: 724, output: 37, efficiency: 96.2 },
    { time: "2024-08-04", irradiation: 440, output: 20, efficiency: 82.4 },
    { time: "2024-08-05", irradiation: 583, output: 56, efficiency: 97.3 },
    { time: "2024-08-06", irradiation: 958, output: 14, efficiency: 80.1 },
    { time: "2024-08-07", irradiation: 808, output: 56, efficiency: 85.8 },
    { time: "2024-08-08", irradiation: 710, output: 25, efficiency: 96.9 },
    { time: "2024-08-09", irradiation: 620, output: 30, efficiency: 92.5 },
    { time: "2024-08-10", irradiation: 540, output: 28, efficiency: 90.3 },
    { time: "2024-08-11", irradiation: 480, output: 22, efficiency: 88.7 },
    { time: "2024-08-12", irradiation: 700, output: 35, efficiency: 94.1 },
    { time: "2024-08-13", irradiation: 650, output: 33, efficiency: 93.2 },
  ];

  const monthlyData = [
    { time: "January", irradiation: 450, output: 35, efficiency: 93.5 },
    { time: "February", irradiation: 520, output: 42, efficiency: 94.2 },
    { time: "March", irradiation: 680, output: 58, efficiency: 95.8 },
    { time: "April", irradiation: 750, output: 65, efficiency: 96.1 },
    { time: "May", irradiation: 820, output: 72, efficiency: 96.5 },
    { time: "June", irradiation: 890, output: 78, efficiency: 96.8 },
    { time: "July", irradiation: 860, output: 75, efficiency: 96.4 },
    { time: "August", irradiation: 780, output: 68, efficiency: 95.9 },
  ];

  const currentData = viewType === "daily" ? dailyData : monthlyData;

  const formatDate = (dateStr: any) => {
    if (viewType === "daily") {
      const date = new Date(dateStr);
      return date.toLocaleDateString("en-US", {
        day: "numeric",
        month: "short",
      });
    }
    return dateStr;
  };

  const totalPages = Math.ceil(currentData.length / itemsPerPage);
  const paginatedData = currentData.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handlePrevious = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleNext = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  return (
    <div className="w-full max-w-6xl mx-auto p-6 bg-white rounded-lg shadow-sm">
      <div className="mb-6">
        <h2 className="text-xl font-semibold text-purple-600 mb-4">{title}</h2>

        <div className="flex justify-between items-center mb-4">
          <div className="flex gap-2">
            <button
              onClick={() => setViewType("daily")}
              className={`px-4 py-2 rounded-md transition-colors ${
                viewType === "daily"
                  ? "bg-gray-900 text-white"
                  : "bg-white text-gray-700 border border-gray-300"
              }`}
            >
              Daily
            </button>
            <button
              onClick={() => setViewType("monthly")}
              className={`px-4 py-2 rounded-md transition-colors ${
                viewType === "monthly"
                  ? "bg-gray-900 text-white"
                  : "bg-white text-gray-700 border border-gray-300"
              }`}
            >
              Monthly
            </button>
          </div>

          <div className="relative">
            <input
              type="text"
              placeholder="Search by time..."
              className="px-4 py-2 border border-gray-300 rounded-md w-64"
            />
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-[16px] font-medium text-gray-700">
                  Time
                </th>
                <th className="px-6 py-3 text-left text-[16px] font-medium text-gray-700">
                  <div className="flex items-center gap-2">
                    <span className="text-yellow-500">☀</span>
                    Solar Irradiation
                  </div>
                </th>
                <th className="px-6 py-3 text-left text-[16px] font-medium text-gray-700">
                  <div className="flex items-center gap-2">
                    <span className="text-blue-500">⚡</span>
                    Predicted Output
                  </div>
                </th>
                <th className="px-6 py-3 text-left text-[16px] font-medium text-gray-700">
                  <div className="flex items-center gap-2">
                    <span className="text-green-500">📊</span>
                    Efficiency
                  </div>
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {paginatedData.map((row, index) => (
                <tr key={index} className="hover:bg-gray-50">
                  <td className="px-6 py-4 text-[16px] text-gray-700">
                    {formatDate(row.time)}
                  </td>
                  <td className="px-6 py-4 text-[16px] text-gray-700">
                    {row.irradiation} kWh/m2
                  </td>
                  <td className="px-6 py-4 text-[16px] text-gray-700">
                    {row.output} kWh
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <div className="w-24 bg-gray-200 rounded-full h-2">
                        <div
                          className="bg-green-500 h-2 rounded-full"
                          style={{ width: `${row.efficiency}%` }}
                        />
                      </div>
                      <span className="text-[16px] text-gray-700">
                        {row.efficiency}%
                      </span>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="flex justify-between items-center mt-4">
          <span className="text-[16px] text-gray-600">
            Page {currentPage} of {totalPages}
          </span>
          <div className="flex gap-2">
            <button
              onClick={handlePrevious}
              className={`px-4 py-2 text-[16px] rounded-md transition-colors ${
                currentPage === 1
                  ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                  : "bg-gray-900 text-white hover:bg-gray-700"
              }`}
              disabled={currentPage === 1}
            >
              Previous
            </button>
            <button
              onClick={handleNext}
              className={`px-4 py-2 text-[16px] rounded-md transition-colors ${
                currentPage === totalPages
                  ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                  : "bg-gray-900 text-white hover:bg-gray-700"
              }`}
              disabled={currentPage === totalPages}
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
