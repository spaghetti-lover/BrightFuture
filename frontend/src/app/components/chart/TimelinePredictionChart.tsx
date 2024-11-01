"use client";
import React, { useState } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const TimelinePredictionChart = () => {
  // Sample data for different time periods
  const hourlyData = Array.from({ length: 24 }, (_, i) => ({
    time: `${i}:00`,
    savings: Math.round(150 + Math.sin(i / 3) * 50),
  }));

  const dailyData = Array.from({ length: 7 }, (_, i) => ({
    time: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"][i],
    savings: Math.round(800 + Math.sin(i / 2) * 200),
  }));

  const weeklyData = Array.from({ length: 12 }, (_, i) => ({
    time: `Week ${i + 1}`,
    savings: Math.round(3000 + Math.cos(i / 4) * 500),
  }));

  const [timeframe, setTimeframe] = useState("daily");
  const [data, setData] = useState(dailyData);

  const handleTimeframeChange = (
    newTimeframe: React.SetStateAction<string>
  ) => {
    setTimeframe(newTimeframe);
    switch (newTimeframe) {
      case "hourly":
        setData(hourlyData);
        break;
      case "daily":
        setData(dailyData);
        break;
      case "weekly":
        setData(weeklyData);
        break;
    }
  };

  return (
    <Card className="w-full max-w-4xl bg-white shadow-lg">
      <CardHeader>
        <div className="flex justify-between items-center">
          <CardTitle className="text-xl text-purple-800">
            Energy Savings Prediction
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
              variant={timeframe === "weekly" ? "default" : "outline"}
              onClick={() => handleTimeframeChange("weekly")}
              className="text-sm"
            >
              Weekly
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="h-64 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart
              data={data}
              margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
              <XAxis
                dataKey="time"
                stroke="#666"
                fontSize={12}
                tickLine={false}
              />
              <YAxis
                stroke="#666"
                fontSize={12}
                tickLine={false}
                tickFormatter={(value) => `$${value}`}
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: "white",
                  border: "none",
                  borderRadius: "8px",
                  boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
                }}
                formatter={(value) => [`$${value}`, "Predicted Savings"]}
              />
              <Line
                type="monotone"
                dataKey="savings"
                stroke="#8B5CF6"
                strokeWidth={2}
                dot={false}
                activeDot={{ r: 6 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
        <p className="text-sm text-gray-600 mt-4 text-center">
          Estimated savings over different time periods. Toggle between views to
          see detailed predictions.
        </p>
      </CardContent>
    </Card>
  );
};

export default TimelinePredictionChart;
