"use client";
import React, { useState } from "react";
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

  // if (data) {
  //   const dailyData: DailyData[] = data.daily_values;
  //   usableSunlightHoursPerYear = calculateSolarPowerHour(dailyData);
  // }

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
  console.log(
    `https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d298.1834136886554
    !2d${longitude}!3d${latitude}!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1
    !3m3!1m2!1s0x3135ab70b95c36c5%3A0x6cc1da673ea579d3!!5e1!3m2!1sen!2s
    !4v1731539928843!5m2!1sen!2s`
  );
  return (
    <div className="relative w-full bg-gray-200">
      {/* <div className="h-[600px] w-full bg-gray-400 bg-[url('/images/solar.png')] bg-cover"></div> */}
      <iframe
        // src={`https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d298.1834136886554!2d${longitude}!3d${latitude}!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3135ab70b95c36c5%3A0x6cc1da673ea579d3!2sHanoi%20University%20Of%20Culture!5e1!3m2!1sen!2s!4v1731539928843!5m2!1sen!2s`}
        src={`https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2836.5348155533816!2d105.7801040737975!3d21.038243387455555!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3135ab354920c233%3A0x5d0313a3bfdc4f37!2sVNU%20University%20of%20Engineering%20and%20Technology!5e1!3m2!1sen!2s!4v1731599998757!5m2!1sen!2s`}
        width="100%"
        height="600"
        style={{ border: 0 }}
        allowFullScreen={true}
        loading="lazy"
      ></iframe>

      {/* <div className="absolute top-4 right-4 bg-white p-2 rounded-sm cursor-pointer z-50">
        <Maximize size={24} />
      </div> */}

      {/* Analysis overlay */}
      <div className="absolute py-[40px] top-2 left-3 bg-white rounded-lg shadow-lg p-4 w-150 z-50">
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
                Phân tích xong. Mái nhà của bạn có:
              </div>

              <div className="flex items-center mb-2">
                <img
                  src="/images/ic_sun.png"
                  alt="sun"
                  className="w-10 h-10 mr-[10px] object-cover"
                />
                <div>
                  <div className="font-bold">
                    {/* {usableSunlightHoursPerYear} tiếng nắng mỗi năm */}
                    2938 tiếng nắng mỗi năm
                  </div>
                  <div className="text-sm text-gray-600">
                    Dựa trên dữ liệu thời tiết gần đây
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
                    Diện tích mái nhà để lắp pin của bạn: 200 m²
                  </div>
                  <div className="text-sm text-gray-600">
                    Dựa trên mô hình 3D của mái nhà và cây xung quanh
                  </div>
                </div>
              </div>
            </div>

            <div className="border-t pt-4">
              <div className="font-bold text-2xl mb-1">
                $15,000 tiết kiệm được
              </div>
              <div className="text-sm text-gray-600 mb-4">
                Dự đoán số tiền bạn có thể tiết kiệm trong 20 năm tới
              </div>
              <div className="text-sm text-blue-600 cursor-pointer">
                Nhầm nhà? Click vào mái nhà khác để xem chi tiết.
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
