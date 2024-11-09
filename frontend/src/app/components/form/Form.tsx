"use client";
import React, { useState } from "react";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const FormSolar = ({ link }: { link: string }) => {
  const [capacity, setCapacity] = useState(0);
  const [tilt, setTilt] = useState(0);
  const [azimuth, setAzimuth] = useState(0);
  const [pr, setPr] = useState(81);
  const [activeTab, setActiveTab] = useState("address");

  const handleTiltChange = (e: any) => {
    const value = parseFloat(e.target.value);
    setTilt(value);
  };

  const handleAzimuthChange = (e: any) => {
    const value = parseFloat(e.target.value);
    setAzimuth(value);
  };

  const handleSubmit = (e: any) => {
    console.log({ capacity, tilt, azimuth, pr });
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-gray-50 p-4">
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
            Address
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
            Coordinates
          </Button>
        </div>

        <div className="space-y-4">
          <div>
            <label className="block text-sm text-gray-600 mb-1">
              Enter the plant capacity in kW
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

          <div>
            <label className="block text-sm text-gray-600 mb-1">
              Enter address
            </label>
            <Input defaultValue="114, Xuan Thuy" />
          </div>

          <div>
            <label className="block text-sm text-gray-600 mb-1">
              Select your Time Zone
            </label>
            <select className="w-full border rounded-md p-2">
              <option>Asia/Ho_Chi_Minh</option>
            </select>
          </div>

          <div>
            <label className="block text-sm text-gray-600 mb-1">
              Select a model
            </label>
            <select className="w-full border rounded-md p-2">
              <option>450Wp_44V_Mono</option>
            </select>
          </div>

          <div>
            <label className="block text-sm text-gray-600 mb-1">
              Enter surface tilt
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
              Enter surface azimuth (180 means facing direct to south)
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
              Enter plant Performance Ratio (%PR)
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
        <Link href={link}>
          <Button
            className="w-full outline-none bg-blue-500 hover:bg-blue-600 text-white mt-[15px]"
            onClick={handleSubmit}
          >
            Submit
          </Button>
        </Link>
      </Card>
    </div>
  );
};

export default FormSolar;
