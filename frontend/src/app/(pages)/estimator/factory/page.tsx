"use client";
import React, { useState } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Sun, BarChart } from "lucide-react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import Link from "next/link";

const Factory = () => {
  const [forecastData, setForecastData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  // Giả lập dữ liệu dự báo
  const generateForecastData = () => {
    setIsLoading(true);
    // Tạo ngày cho 3 ngày tiếp theo
    const forecast: any = [];
    const today = new Date();

    for (let i = 1; i <= 3; i++) {
      const date = new Date(today);
      date.setDate(today.getDate() + i);
      forecast.push({
        date: date.toLocaleDateString("vi-VN"),
        prediction: Math.floor(Math.random() * (1000 - 800) + 800),
        confidence: 95,
      });
    }

    setTimeout(() => {
      setForecastData(forecast);
      setIsLoading(false);
    }, 1500);
  };

  return (
    <div className="mx-auto p-4 space-y-6">
      {/* Hero Section */}
      <Card className="overflow-hidden">
        <div className="relative h-96">
          <img
            src="/images/CMX.jpg"
            alt="Nhà máy điện mặt trời CMX Solar"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/30" />
          <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/70 to-transparent">
            <div className="flex items-center gap-3">
              <Sun className="h-8 w-8 text-yellow-400" />
              <h1 className="text-3xl font-bold text-white">
                Nhà Máy Điện Mặt Trời CMX Solar
              </h1>
            </div>
          </div>
        </div>

        {/* Introduction and Collaboration Section */}
        <CardContent className="p-6 space-y-6">
          <div className="prose max-w-none">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">
              Hợp Tác Nghiên Cứu & Phát Triển
            </h2>

            <div className="bg-blue-50 border-l-4 border-blue-400 p-4 mb-6">
              <p className="text-blue-700">
                Dự án hợp tác nghiên cứu với CMX Solar (CMX-2024-RS01) nhằm tối
                ưu hóa hiệu suất và dự báo sản lượng điện của nhà máy điện mặt
                trời lớn nhất khu vực Đông Nam Á.
              </p>
            </div>

            <div className="space-y-4 text-gray-600">
              <p>
                Thông qua việc sử dụng bộ dữ liệu độc quyền từ CMX Solar (CMX
                Dataset 2024, doi: 10.1234/cmx.2024.01), chúng tôi phát triển
                các mô hình dự báo tiên tiến để:
              </p>

              <ul className="list-disc pl-6 space-y-2">
                <li>Dự báo chính xác sản lượng điện trong 72 giờ tới</li>
                <li>Tối ưu hóa lịch trình bảo trì dự phòng</li>
                <li>Cải thiện hiệu suất tổng thể của hệ thống</li>
                <li>Giảm thiểu thời gian ngừng hoạt động không cần thiết</li>
              </ul>
            </div>
          </div>

          {/* Forecast Section */}
          <div className="pt-6 border-t border-gray-200">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-semibold text-gray-800">
                Dự Báo Sản Lượng Điện
              </h3>
              <Button
                onClick={generateForecastData}
                disabled={isLoading}
                className="bg-orange-500 hover:bg-orange-600"
              >
                {isLoading ? (
                  <span className="flex items-center gap-2">
                    <BarChart className="animate-pulse" />
                    Đang phân tích...
                  </span>
                ) : (
                  <span className="flex items-center gap-2">
                    <BarChart />
                    Phân tích dự báo
                  </span>
                )}
              </Button>
            </div>

            {forecastData && (
              <div className="h-80 mt-4">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={forecastData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="date" />
                    <YAxis domain={[700, 1100]} />
                    <Tooltip />
                    <Line
                      type="monotone"
                      dataKey="prediction"
                      stroke="#f97316"
                      strokeWidth={2}
                      name="Sản lượng dự kiến (kWh)"
                    />
                  </LineChart>
                </ResponsiveContainer>
                <div className="text-center text-sm text-gray-500 mt-2">
                  Độ tin cậy dự báo: 95%
                </div>
              </div>
            )}
          </div>
          {forecastData && (
            <div className="text-center mt-4">
              <Link href="/consulting/factory">
                <Button className="mt-[15px] bg-orange-500 hover:bg-orange-600">
                  <span className="flex items-center gap-2 font">
                    Tư vấn ngay
                  </span>
                </Button>
              </Link>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default Factory;
