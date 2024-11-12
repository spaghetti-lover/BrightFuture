"use client";
import React, { useState } from "react";
import { Maximize } from "lucide-react";
import MapComponent from "./MapComponent";
import { DailyData } from "@/app/interfaces/form/SolarAnalysisInterface";
import { SolarAnalysisInterface } from "@/app/interfaces/form/SolarAnalysisInterface";
import { calculateSolarPowerHour } from "@/app/helpers/calculateSolarPower";

const SolarAnalysis = ({ data }: { data: SolarAnalysisInterface }) => {
  const [inputType, setInputType] = useState("address");
  const [address, setAddress] = useState("");
  const [latitude, setLatitude] = useState("");
  const [longitude, setLongitude] = useState("");
  const [showAnalysis, setShowAnalysis] = useState(true);
  let usableSunlightHoursPerYear = 0;

  if (data) {
    const dailyData: DailyData[] = data.daily_values;
    usableSunlightHoursPerYear = calculateSolarPowerHour(dailyData);
  }

  const handleSubmit = (e: any) => {
    e.preventDefault();
    if (inputType === "coordinates") {
      const lat = parseFloat(latitude);
      const lng = parseFloat(longitude);
      if (
        isNaN(lat) ||
        isNaN(lng) ||
        lat < -90 ||
        lat > 90 ||
        lng < -180 ||
        lng > 180
      ) {
        alert("Please enter valid coordinates");
        return;
      }
    }
    setShowAnalysis(true);
  };

  return (
    <div className="relative w-full bg-gray-200">
      {/* Map container */}
      <MapComponent />
      <div className="absolute top-4 right-4 bg-white p-2 rounded-sm cursor-pointer z-50">
        <Maximize size={24} />
      </div>

      {/* Analysis overlay */}
      <div className="absolute top-2 left-3 bg-white rounded-lg shadow-lg p-4 w-150 z-50">
        <div className="mb-4">
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

          <form onSubmit={handleSubmit}>
            {inputType === "address" ? (
              <div className="flex items-center">
                <input
                  type="text"
                  placeholder="Enter your address"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  className="flex-grow border rounded px-2 py-1 mr-2"
                />
                <button
                  type="submit"
                  className="bg-blue-500 text-white px-3 py-1 rounded"
                >
                  GO
                </button>
              </div>
            ) : (
              <div className="space-y-2">
                <div className="flex gap-2">
                  <input
                    type="text"
                    placeholder="Latitude (-90 to 90)"
                    value={latitude}
                    onChange={(e) => setLatitude(e.target.value)}
                    className="flex-grow border rounded px-2 py-1"
                  />
                  <input
                    type="text"
                    placeholder="Longitude (-180 to 180)"
                    value={longitude}
                    onChange={(e) => setLongitude(e.target.value)}
                    className="flex-grow border rounded px-2 py-1"
                  />
                  <button
                    type="submit"
                    className="bg-blue-500 text-white px-3 py-1 rounded"
                  >
                    GO
                  </button>
                </div>
                <div className="text-xs text-gray-500">
                  Enter coordinates in decimal degrees (e.g., 40.7128, -74.0060
                  for New York City)
                </div>
              </div>
            )}
          </form>
        </div>

        {showAnalysis && (
          <>
            <div className="mb-4">
              <div className="flex items-center text-green-600 mb-2">
                <svg
                  className="w-5 h-5 mr-2"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                    clipRule="evenodd"
                  />
                </svg>
                Analysis complete. Your roof has:
              </div>

              <div className="flex items-center mb-2">
                <img
                  src="/images/ic_sun.png"
                  alt="sun"
                  className="w-10 h-10 mr-[10px] object-cover"
                />
                <div>
                  <div className="font-bold">
                    {usableSunlightHoursPerYear} hours of usable sunlight per
                    year
                  </div>
                  <div className="text-sm text-gray-600">
                    Based on day-to-day analysis of weather patterns
                  </div>
                </div>
              </div>

              <div className="flex items-center">
                <img
                  src="/images/ic_house.png"
                  alt="house"
                  className="w-10 h-10 mr-[10px] object-cover"
                />
                <div>
                  <div className="font-bold">
                    1,374 sq feet available for solar panels
                  </div>
                  <div className="text-sm text-gray-600">
                    Based on 3D modeling of your roof and nearby trees
                  </div>
                </div>
              </div>
            </div>

            <div className="border-t pt-4">
              <div className="font-bold text-2xl mb-1">$15,000 savings</div>
              <div className="text-sm text-gray-600 mb-4">
                Estimated net savings for your roof over 20 years
              </div>
              <div className="text-sm text-blue-600 cursor-pointer">
                Wrong building? Click another roof to view details.
              </div>
            </div>
          </>
        )}
      </div>

      {/* Heatmap legend */}
      {/* <div className="absolute bottom-4 right-4 bg-white rounded-lg shadow p-2 flex items-center z-50">
        <span className="mr-2">Shady</span>
        <div className="w-32 h-4 bg-gradient-to-r from-purple-500 via-orange-500 to-yellow-300 rounded"></div>
        <span className="ml-2">Sunny</span>
      </div> */}

      {/* Map attribution */}
      {/* <div className="absolute bottom-1 left-1 text-xs text-gray-600 z-50">
        Keyboard shortcuts | Map data ©2024 Google | Terms
      </div> */}
    </div>
  );
};

export default SolarAnalysis;
