"use client";
import React, { useState } from "react";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { SolarAnalysisInterface } from "@/app/interfaces/form/SolarAnalysisInterface";
import { useRouter } from "next/navigation";
import Link from "next/link";

const FormSolar = ({ link }: { link: string }) => {
  const [capacity, setCapacity] = useState(5);
  const [lat, setLat] = useState(10.7769);
  const [lon, setLon] = useState(106.6951);
  const [tilt, setTilt] = useState(20);
  const [model, setModel] = useState("450Wp_44V_Mono");
  const [azimuth, setAzimuth] = useState(180);
  const [pr, setPr] = useState(81);
  const [activeTab, setActiveTab] = useState("address");

  const router = useRouter();
  const handleLatChange = (e: any) => {
    const value = parseFloat(e.target.value);
    setLat(value);
  };

  const handleLonChange = (e: any) => {
    const value = parseFloat(e.target.value);
    setLon(value);
  };

  const handleTiltChange = (e: any) => {
    const value = parseFloat(e.target.value);
    setTilt(value);
  };
  const handleModelChange = (e: any) => {
    const value = e.target.value;
    setModel(value);
  };
  const handleAzimuthChange = (e: any) => {
    const value = parseFloat(e.target.value);
    setAzimuth(value);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    // Construct the URL with query parameters
  };

  return (
    <div className=" w-full flex items-center justify-center bg-gray-50 p-4">
      <Card className="w-full max-w-md p-6 space-y-6">
        <div className="flex space-x-2">
          <Button
            variant={activeTab === "address" ? "default" : "secondary"}
            className={`w-24 ${
              activeTab === "address"
                ? "bg-blue-500 text-white hover:bg-blue-600"
                : "bg-gray-200 text-gray-700 hover:bg-gray-300"
            }`}
            onClick={() => setActiveTab("address")}
          >
            Địa chỉ
          </Button>
          <Button
            variant={activeTab === "coordinates" ? "default" : "secondary"}
            className={`w-24 ${
              activeTab === "coordinates"
                ? "bg-blue-500 text-white hover:bg-blue-600"
                : "bg-gray-200 text-gray-700 hover:bg-gray-300"
            }`}
            onClick={() => setActiveTab("coordinates")}
          >
            Tọa độ
          </Button>
        </div>

        <div className="space-y-4">
          <div>
            <label className="block text-sm text-gray-600 mb-1">
              Công suất nhà máy theo kW
            </label>
            <div className="flex items-center">
              <Input
                type="number"
                value={capacity}
                onChange={(e: any) => setCapacity(e.target.value)}
                className="flex-grow"
              />
              <Button
                variant="ghost"
                className="px-2"
                onClick={() => setCapacity(Math.max(0, capacity - 1))}
              >
                -
              </Button>
              <Button
                variant="ghost"
                className="px-2"
                onClick={() => setCapacity(capacity + 1)}
              >
                +
              </Button>
            </div>
          </div>

          {activeTab === "address" ? (
            <div>
              <label className="block text-sm text-gray-600 mb-1">
                Nhập địa chỉ
              </label>
              <Input defaultValue="114, Xuan Thuy" />
            </div>
          ) : (
            <div>
              <label className="block text-sm text-gray-600 mb-1">
                Nhập kinh độ
              </label>
              <Input value={lon} onChange={handleLonChange} />
              <label className="block text-sm text-gray-600 mt-3 mb-1">
                Nhập vĩ độ
              </label>
              <Input value={lat} onChange={handleLatChange} />
            </div>
          )}

          <div>
            <label className="block text-sm text-gray-600 mb-1">
              Lựa chọn múi giờ
            </label>
            <select className="w-full border rounded-md p-2">
              <option>Asia/Ho_Chi_Minh</option>
            </select>
          </div>
          <div>
            <label className="block text-sm text-gray-600 mb-1">
              Chọn mô hình
            </label>
            <select
              className="w-full border rounded-md p-2"
              onChange={handleModelChange}
            >
              <option>450Wp_44V_Mono</option>
              <option>500Wp_39V_Mono_PERC</option>
              <option>545Wp_41V_Mono_PERC</option>
              <option>600Wp_45V_Mono_PERC</option>
              <option>620Wp_46V_Mono_PERC</option>
            </select>
          </div>
          <div>
            <label className="block text-sm text-gray-600 mb-1">
              Nhập độ nghiêng
            </label>
            <div className="space-y-2">
              <Input
                type="number"
                value={tilt}
                onChange={handleTiltChange}
                className="w-full"
              />
              <input
                type="range"
                min="0"
                max="90"
                value={tilt}
                onChange={handleTiltChange}
                className="w-full"
              />
              <div className="flex justify-between text-sm text-gray-500">
                <span>0.00</span>
                <span>90.00</span>
              </div>
            </div>
          </div>
          <div>
            <label className="block text-sm text-gray-600 mb-1">
              Nhập góc phương vị bề mặt (180 nghĩa là hướng thẳng về hướng Nam)
            </label>
            <div className="space-y-2">
              <Input
                type="number"
                value={azimuth}
                onChange={handleAzimuthChange}
                className="w-full"
              />
              <input
                type="range"
                min="-180"
                max="180"
                value={azimuth}
                onChange={handleAzimuthChange}
                className="w-full"
              />
              <div className="flex justify-between text-sm text-gray-500">
                <span>-180</span>
                <span>180</span>
              </div>
            </div>
          </div>
          <div>
            <label className="block text-sm text-gray-600 mb-1">
              Nhập tỷ lệ hiệu suất của nhà máy (%PR)
            </label>
            <div className="flex items-center">
              <Input
                type="number"
                value={pr}
                onChange={(e: any) => setPr(e.target.value)}
                className="flex-grow"
              />
              <Button
                variant="ghost"
                className="px-2"
                onClick={() => setPr(Math.max(0, pr - 1))}
              >
                -
              </Button>
              <Button
                variant="ghost"
                className="px-2"
                onClick={() => setPr(pr + 1)}
              >
                +
              </Button>
            </div>
          </div>
        </div>
        <Link
          href={{
            pathname: link,
            query: {
              capacity: capacity,
              lat: lat,
              lon: lon,
              tilt: tilt,
              model: model,
              azimuth: azimuth,
              pr: pr,
            },
          }}
        >
          <Button
            className="w-full outline-none bg-blue-500 hover:bg-blue-600 text-white mt-[15px]"
            onClick={handleSubmit}
          >
            Gửi
          </Button>
        </Link>
      </Card>
    </div>
  );
};

export default FormSolar;
