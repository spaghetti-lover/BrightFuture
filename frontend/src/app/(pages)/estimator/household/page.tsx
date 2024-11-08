"use client";
import React, { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import Link from "next/link";
const Household = () => {
  const [formData, setFormData] = useState({
    capacity: 0,
    latitude: 10.78,
    longitude: 106.7,
    timezone: "Asia/Ho_Chi_Minh",
    model: "450Wp_44V_Mono",
    tilt: 20,
    azimuth: 180,
    performanceRatio: 81,
    address: "114, Xuan Thuy",
  });
  const [inputType, setInputType] = useState("address");
  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
  };

  return (
    <Card className="my-[100px] max-w-2xl mx-auto bg-white shadow-lg">
      <CardContent className="p-6">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="flex gap-2 mb-4">
            <button
              className={`px-3 py-1 rounded ${
                inputType === "address"
                  ? "bg-blue-500 text-white"
                  : "bg-gray-200 text-gray-700"
              }`}
              onClick={() => setInputType("address")}
            >
              Address
            </button>
            <button
              className={`px-3 py-1 rounded ${
                inputType === "coordinates"
                  ? "bg-blue-500 text-white"
                  : "bg-gray-200 text-gray-700"
              }`}
              onClick={() => setInputType("coordinates")}
            >
              Coordinates
            </button>
          </div>
          {/* Plant Capacity */}
          <div className="space-y-2">
            <label className="text-sm text-gray-600 block">
              Enter the plant capacity in kW
            </label>
            <div className="flex items-center">
              <input
                type="number"
                name="capacity"
                value={formData.capacity}
                onChange={handleChange}
                className="w-full p-2 border rounded-lg bg-gray-50"
                step="0.01"
              />
              <button
                type="button"
                className="px-3 py-2 ml-2 text-gray-600 hover:bg-gray-100 rounded"
              >
                -
              </button>
              <button
                type="button"
                className="px-3 py-2 text-gray-600 hover:bg-gray-100 rounded"
              >
                +
              </button>
            </div>
          </div>

          {/* Latitude & Longitude */}
          {inputType == "coordinates" ? (
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-sm text-gray-600 block">
                  Enter latitude
                </label>
                <input
                  type="number"
                  name="latitude"
                  value={formData.latitude}
                  onChange={handleChange}
                  className="w-full p-2 border rounded-lg bg-gray-50"
                  step="0.000001"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm text-gray-600 block">
                  Enter longitude
                </label>
                <input
                  type="number"
                  name="longitude"
                  value={formData.longitude}
                  onChange={handleChange}
                  className="w-full p-2 border rounded-lg bg-gray-50"
                  step="0.000001"
                />
              </div>
            </div>
          ) : (
            <div className="space-y-2">
              <label className="text-sm text-gray-600 block">
                Enter address
              </label>
              <input
                type="text"
                name="address"
                placeholder="Enter your address"
                value={formData.address}
                onChange={handleChange}
                className="w-full p-2 border rounded-lg bg-gray-50"
              />
            </div>
          )}

          {/* Timezone */}
          <div className="space-y-2">
            <label className="text-sm text-gray-600 block">
              Select your Time Zone
            </label>
            <select
              name="timezone"
              value={formData.timezone}
              onChange={handleChange}
              className="w-full p-2 border rounded-lg bg-gray-50"
            >
              <option value="Asia/Ho_Chi_Minh">Asia/Ho_Chi_Minh</option>
              {/* Add other timezone options */}
            </select>
          </div>

          {/* Model Selection */}
          <div className="space-y-2">
            <label className="text-sm text-gray-600 block">
              Select a model
            </label>
            <select
              name="model"
              value={formData.model}
              onChange={handleChange}
              className="w-full p-2 border rounded-lg bg-gray-50"
            >
              <option value="450Wp_44V_Mono">450Wp_44V_Mono</option>
              {/* Add other model options */}
            </select>
          </div>

          {/* Surface Tilt */}
          <div className="space-y-2">
            <label className="text-sm text-gray-600 block">
              Enter surface tilt
            </label>
            <div className="relative">
              <input
                type="range"
                name="tilt"
                value={formData.tilt}
                onChange={handleChange}
                min="0"
                max="90"
                className="w-full h-2 bg-blue-500 rounded-lg appearance-none cursor-pointer"
              />
              <div className="flex justify-between text-xs text-gray-500 mt-1">
                <span>0.00</span>
                <span>90.00</span>
              </div>
            </div>
          </div>

          {/* Surface Azimuth */}
          <div className="space-y-2">
            <label className="text-sm text-gray-600 block">
              Enter surface azimuth (180 means facing direct to south)
            </label>
            <div className="relative">
              <input
                type="range"
                name="azimuth"
                value={formData.azimuth}
                onChange={handleChange}
                min="-180"
                max="180"
                className="w-full h-2 bg-blue-500 rounded-lg appearance-none cursor-pointer"
              />
              <div className="flex justify-between text-xs text-gray-500 mt-1">
                <span>-180</span>
                <span>180</span>
              </div>
            </div>
          </div>

          {/* Performance Ratio */}
          <div className="space-y-2">
            <label className="text-sm text-gray-600 block">
              Enter plant Performance Ratio (%PR)
            </label>
            <div className="flex items-center">
              <input
                type="number"
                name="performanceRatio"
                value={formData.performanceRatio}
                onChange={handleChange}
                className="w-full p-2 border rounded-lg bg-gray-50"
                min="0"
                max="100"
              />
              <button
                type="button"
                className="px-3 py-2 ml-2 text-gray-600 hover:bg-gray-100 rounded"
              >
                -
              </button>
              <button
                type="button"
                className="px-3 py-2 text-gray-600 hover:bg-gray-100 rounded"
              >
                +
              </button>
            </div>
          </div>

          {/* Submit Button */}
          <Link href={"/estimator/household/result"}>
            <button
              type="submit"
              className="w-full bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition-colors"
            >
              Submit
            </button>
          </Link>
        </form>
      </CardContent>
    </Card>
  );
};

export default Household;
