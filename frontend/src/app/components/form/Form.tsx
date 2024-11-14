"use client";
import React, { useState } from "react";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import Link from "next/link";
import ModelSelect from "./ModelSelect";

const FormSolar = ({ link }: { link: string }) => {
  let dictionary = [
    "Số 12, ngõ 88, phố Trần Quang Diệu",
    "VNU University of Engineering and Technology",
  ];
  const [capacity, setCapacity] = useState(5);
  const [lat, setLat] = useState(10.7769);
  const [lon, setLon] = useState(106.6951);
  const [address, setAddress] = useState("");
  const [tilt, setTilt] = useState(20);
  const [model, setModel] = useState("450Wp_44V_Mono");
  const [azimuth, setAzimuth] = useState(180);
  const [pr, setPr] = useState(81);
  const [activeTab, setActiveTab] = useState("address");
  const [errorMessage, setErrorMessage] = useState("");
  const [selectedModel, setSelectedModel] = useState("");

  const options = [
    {
      label: "450Wp_44V_Mono",
      img: "/images/450Wp_44V_Mono.png",
      manufacturer: "Hanwha Q Cells",
      efficiency: 20.2,
      length: 2163,
      width: 1030,
      area: 2.22789,
      wattPeak: 450,
    },
    {
      label: "500Wp_39V_Mono_PERC",
      img: "/images/500Wp_39V_Mono_PERC.jpg",
      manufacturer: "LONGi",
      efficiency: 21.1,
      length: 2094,
      width: 1134,
      area: 2.374596,
      wattPeak: 500,
    },
    {
      label: "545Wp_41V_Mono_PERC",
      img: "/images/545Wp_41V_Mono_PERC.jpg",
      manufacturer: "Jinko Solar",
      efficiency: 21.13,
      length: 2278,
      width: 1134,
      area: 2.583252,
      wattPeak: 545,
    },
    {
      label: "600Wp_45V_Mono_PERC",
      img: "/images/600Wp_45V_Mono_PERC.jpg",
      manufacturer: "Jinko Solar",
      efficiency: 21.48,
      length: 2465,
      width: 1134,
      area: 2.79531,
      wattPeak: 600,
    },
    {
      label: "620Wp_46V_Mono_PERC",
      img: "/images/620Wp_46V_Mono_PERC.jpg",
      manufacturer: "Jinko Solar",
      efficiency: 22.19,
      length: 2465,
      width: 1134,
      area: 2.79531,
      wattPeak: 620,
    },
  ];

  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedValue = event.target.value;
    setSelectedModel(selectedValue);
    handleModelChange(selectedValue);
  };

  const handleLatChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseFloat(e.target.value);
    setLat(value);
  };

  const handleLonChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseFloat(e.target.value);
    setLon(value);
  };

  const handleTiltChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseFloat(e.target.value);
    setTilt(value);
  };
  const handleModelChange = (value: string) => {
    setModel(value);
  };
  const handleAzimuthChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseFloat(e.target.value);
    setAzimuth(value);
  };
  const handleAddress = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAddress(e.target.value);
  };
  const router = useRouter();
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (dictionary.includes(address) || activeTab === "coordinates") {
      router.push(
        `${link}?capacity=${capacity}&lat=${lat}&lon=${lon}&tilt=${tilt}&model=${model}&azimuth=${azimuth}&pr=${pr}`
      );
    } else {
      setErrorMessage("Address is not valid");
    }
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
              Tổng công suất hệ thống pin (kW)
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
              <Input onChange={handleAddress} />
              {errorMessage && (
                <div className="text-red-500 text-sm mb-4">{errorMessage}</div>
              )}
            </div>
          ) : (
            <div>
              <label className="block text-sm text-gray-600 mb-1">
                Nhập kinh độ
              </label>
              <Input onChange={handleLatChange} />
              <label className="block text-sm text-gray-600 mt-3 mb-1">
                Nhập vĩ độ
              </label>
              <Input onChange={handleLonChange} />
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
          {/* <div>
             <label className="block text-sm text-gray-600 mb-1">
              Chọn mô hình
            </label> 
             <select
              className="w-full border rounded-md p-2"
              value={selectedModel}
              onChange={handleChange}
            >
              <option value="">Select a model</option>
              {options.map((option, index) => (
                <option key={index} value={option.label}>
                  {option.label}
                </option>
              ))}
            </select>
            <div className="option-preview mt-2">
              {selectedModel && (
                <img
                  src={
                    options.find((option) => option.label === selectedModel)
                      ?.img
                  }
                  alt={selectedModel}
                  className="w-32 h-32 object-cover mt-2"
                />
              )}
            </div> 
          </div> */}
          <ModelSelect />
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
              <Button variant="ghost" className="px-2">
                +
              </Button>
            </div>
          </div>
        </div>
        <Button
          type="submit"
          className="w-full outline-none bg-blue-500 hover:bg-blue-600 text-white mt-[15px]"
          onClick={handleSubmit}
        >
          Gửi
        </Button>
      </Card>
    </div>
  );
};

export default FormSolar;
