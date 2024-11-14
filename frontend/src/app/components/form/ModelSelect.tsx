"use client";
import React, { useState } from "react";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import Link from "next/link";

const ModelSelect = () => {
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

  const selectedOption = options.find(
    (option) => option.label === selectedModel
  );

  return (
    <div>
      <label className="block text-sm text-gray-600 mb-1">Chọn mô hình</label>
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

      {/* Hiển thị thông tin của mô hình đã chọn */}
      {selectedOption && (
        <div className="flex option-preview mt-4">
          <img
            src={selectedOption.img}
            alt={selectedOption.label}
            className="w-32 h-32 object-cover mt-2"
          />
          <ul className="mt-2 text-sm text-gray-600">
            <li>
              <strong>NSX:</strong> {selectedOption.manufacturer}
            </li>
            <li>
              <strong>Hiệu suất:</strong> {selectedOption.efficiency}%
            </li>
            <li>
              <strong>Chiều dài:</strong> {selectedOption.length} mm
            </li>
            <li>
              <strong>Chiều rộng:</strong> {selectedOption.width} mm
            </li>
            <li>
              <strong>Diện tích:</strong> {selectedOption.area} m²
            </li>
            <li>
              <strong>Điện tối đa:</strong> {selectedOption.wattPeak} W
            </li>
          </ul>
        </div>
      )}
    </div>
  );
};

export default ModelSelect;
