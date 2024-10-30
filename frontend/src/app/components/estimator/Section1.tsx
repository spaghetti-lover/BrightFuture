import React from "react";
import { Maximize } from "lucide-react";
import Image from "next/image";
const Section1 = () => {
  return (
    <div className="relative w-full h-screen bg-gray-200">
      {/* Map container */}
      <div className="absolute inset-0 bg-orange-400">
        {/* Placeholder for map */}
        <div className="absolute top-4 right-4 bg-white p-2 rounded-sm cursor-pointer">
          <Maximize size={24} />
        </div>
      </div>

      {/* Analysis overlay */}
      <div className="absolute top-4 left-4 bg-white rounded-lg shadow-lg p-4 w-80">
        <div className="flex items-center mb-4">
          <input
            type="text"
            value="183 Bowery, New York, NY 10002, USA"
            className="flex-grow border rounded px-2 py-1 mr-2"
          />
          <button className="bg-blue-500 text-white px-3 py-1 rounded">
            GO
          </button>
        </div>

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
            <Image
              src="/images/ic_sun.png"
              alt="sun"
              width={40}
              height={40}
              objectFit="cover"
              className="mr-[10px]"
            />
            <div>
              <div className="font-bold">
                1,361 hours of usable sunlight per year
              </div>
              <div className="text-sm text-gray-600">
                Based on day-to-day analysis of weather patterns
              </div>
            </div>
          </div>

          <div className="flex items-center">
            <Image
              src="/images/ic_house.png"
              alt="house"
              width={40}
              height={40}
              objectFit="cover"
              className="mr-[10px]"
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
      </div>

      {/* Heatmap legend */}
      <div className="absolute bottom-4 right-4 bg-white rounded-lg shadow p-2 flex items-center">
        <span className="mr-2">Shady</span>
        <div className="w-32 h-4 bg-gradient-to-r from-purple-500 via-orange-500 to-yellow-300 rounded"></div>
        <span className="ml-2">Sunny</span>
      </div>

      {/* Map attribution */}
      <div className="absolute bottom-1 left-1 text-xs text-gray-600">
        Keyboard shortcuts | Map data ©2024 Google | Terms
      </div>
    </div>
  );
};

export default Section1;
