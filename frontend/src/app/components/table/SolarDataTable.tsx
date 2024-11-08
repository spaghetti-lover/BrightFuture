"use client";

import React, { useState } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Sun,
  Zap,
  BarChart,
  ChevronDown,
  ChevronUp,
  ChevronsUpDown,
} from "lucide-react";

// Generate sample data
const generateData = () => {
  const times = Array.from(
    { length: 24 },
    (_, i) => `${String(i).padStart(2, "0")}:00`
  );

  return times.map((time) => ({
    time,
    solarIrradiation: Math.round(Math.random() * 800 + 200),
    predictedOutput: Math.round(Math.random() * 50 + 10),
    efficiency: Math.round((Math.random() * 20 + 80) * 10) / 10,
  }));
};

const initialData = generateData();

export default function SolarDataTable() {
  const [data, setData] = useState(initialData);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortConfig, setSortConfig] = useState({ key: "", direction: "" });
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;

  // Sorting function
  const handleSort = (key: keyof (typeof initialData)[0]) => {
    let direction = "asc";
    if (sortConfig.key === key && sortConfig.direction === "asc") {
      direction = "desc";
    }
    setSortConfig({ key, direction });

    const sortedData = [...data].sort((a, b) => {
      if (a[key] < b[key]) return direction === "asc" ? -1 : 1;
      if (a[key] > b[key]) return direction === "asc" ? 1 : -1;
      return 0;
    });
    setData(sortedData);
  };

  // Get sort icon based on current sort state
  const getSortIcon = (key: keyof (typeof initialData)[0]) => {
    if (sortConfig.key !== key) return <ChevronsUpDown className="w-4 h-4" />;
    return sortConfig.direction === "asc" ? (
      <ChevronUp className="w-4 h-4" />
    ) : (
      <ChevronDown className="w-4 h-4" />
    );
  };

  // Filter data based on search term
  const filteredData = data.filter((item) =>
    item.time.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Pagination
  const totalPages = Math.ceil(filteredData.length / itemsPerPage);
  const paginatedData = filteredData.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );
  const hourlyData = Array.from({ length: 24 }, (_, i) => ({
    time: `${i}:00`,
    savings: Math.round(150 + Math.sin(i / 3) * 50),
  }));
  const dailyData = Array.from({ length: 7 }, (_, i) => ({
    time: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"][i],
    savings: Math.round(800 + Math.sin(i / 2) * 200),
  }));
  const yearlyData = Array.from({ length: 12 }, (_, i) => ({
    time: `year ${i + 1}`,
    savings: Math.round(3000 + Math.cos(i / 4) * 500),
  }));
  const [timeframe, setTimeframe] = useState("daily");
  const [daydata, setDayData] = useState(dailyData);
  const handleTimeframeChange = (
    newTimeframe: React.SetStateAction<string>
  ) => {
    setTimeframe(newTimeframe);
    switch (newTimeframe) {
      case "hourly":
        setDayData(hourlyData);
        break;
      case "daily":
        setDayData(dailyData);
        break;
      case "yearly":
        setDayData(yearlyData);
        break;
    }
  };

  return (
    <Card className="w-full max-w-4xl">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="text-xl text-purple-800">
            Solar Irradiation Data
          </CardTitle>
          <div className="flex gap-2">
            <Button
              variant={timeframe === "hourly" ? "default" : "outline"}
              onClick={() => handleTimeframeChange("hourly")}
              className="text-sm"
            >
              Hourly
            </Button>
            <Button
              variant={timeframe === "daily" ? "default" : "outline"}
              onClick={() => handleTimeframeChange("daily")}
              className="text-sm"
            >
              Daily
            </Button>
            <Button
              variant={timeframe === "yearly" ? "default" : "outline"}
              onClick={() => handleTimeframeChange("yearly")}
              className="text-sm"
            >
              Yearly
            </Button>
          </div>
          <Input
            placeholder="Search by time..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="max-w-xs"
          />
        </div>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-4 py-3 text-left border-b">
                  <Button
                    variant="ghost"
                    onClick={() => handleSort("time")}
                    className="font-semibold flex items-center gap-2"
                  >
                    Time {getSortIcon("time")}
                  </Button>
                </th>
                <th className="px-4 py-3 text-left border-b">
                  <Button
                    variant="ghost"
                    onClick={() => handleSort("solarIrradiation")}
                    className="font-semibold flex items-center gap-2"
                  >
                    <Sun className="w-4 h-4 text-yellow-500" />
                    Solar Irradiation {getSortIcon("solarIrradiation")}
                  </Button>
                </th>
                <th className="px-4 py-3 text-left border-b">
                  <Button
                    variant="ghost"
                    onClick={() => handleSort("predictedOutput")}
                    className="font-semibold flex items-center gap-2"
                  >
                    <Zap className="w-4 h-4 text-blue-500" />
                    Predicted Output {getSortIcon("predictedOutput")}
                  </Button>
                </th>
                <th className="px-4 py-3 text-left border-b">
                  <Button
                    variant="ghost"
                    onClick={() => handleSort("efficiency")}
                    className="font-semibold flex items-center gap-2"
                  >
                    <BarChart className="w-4 h-4 text-green-500" />
                    Efficiency {getSortIcon("efficiency")}
                  </Button>
                </th>
              </tr>
            </thead>
            <tbody>
              {paginatedData.map((row, index) => (
                <tr
                  key={row.time}
                  className={index % 2 === 0 ? "bg-white" : "bg-gray-50"}
                >
                  <td className="px-4 py-3 border-b">{row.time}</td>
                  <td className="px-4 py-3 border-b text-right">
                    {row.solarIrradiation} W/m²
                  </td>
                  <td className="px-4 py-3 border-b text-right">
                    {row.predictedOutput} kWh
                  </td>
                  <td className="px-4 py-3 border-b">
                    <div className="flex items-center justify-end">
                      <div className="w-24 bg-gray-200 rounded-full h-2 mr-2">
                        <div
                          className="bg-green-500 h-2 rounded-full"
                          style={{ width: `${row.efficiency}%` }}
                        />
                      </div>
                      <span>{row.efficiency}%</span>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="flex items-center justify-between mt-4">
          <div className="text-sm text-gray-600">
            Page {currentPage} of {totalPages}
          </div>
          <div className="flex gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
            >
              Previous
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() =>
                setCurrentPage((prev) => Math.min(prev + 1, totalPages))
              }
              disabled={currentPage === totalPages}
            >
              Next
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
