"use client";
import React, { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useRouter, useSearchParams } from "next/navigation";
import ModelSelect from "./ModelSelect";

const FormSolar = ({ link }: { link: string }) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [address, setAddress] = useState<string | null>(null);
  const [capacity, setCapacity] = useState(5);
  const [lat, setLat] = useState(10.7769);
  const [lon, setLon] = useState(106.6951);
  const [tilt, setTilt] = useState(20);
  const [model, setModel] = useState("450Wp_44V_Mono");
  const [azimuth, setAzimuth] = useState(180);
  const [pr, setPr] = useState(81);
  const [activeTab, setActiveTab] = useState("address");
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    const queryAddress = searchParams.get("address");
    if (queryAddress) {
      setAddress(queryAddress);
    }
  }, [searchParams]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (address) {
      router.push(
        `${link}?address=${address}&capacity=${capacity}&lat=${lat}&lon=${lon}&tilt=${tilt}&model=${model}&azimuth=${azimuth}&pr=${pr}`
      );
    } else {
      setErrorMessage("Address is not valid");
    }
  };

  return (
    <div className="w-full flex items-center justify-center p-4">
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
              <Input
                value={address || ""}
                onChange={(e) => setAddress(e.target.value)}
              />
              {errorMessage && (
                <div className="text-red-500 text-sm mb-4">{errorMessage}</div>
              )}
            </div>
          ) : (
            <div>
              <label className="block text-sm text-gray-600 mb-1">
                Nhập kinh độ
              </label>
              <Input
                value={lat}
                onChange={(e) => setLat(parseFloat(e.target.value))}
              />
              <label className="block text-sm text-gray-600 mt-3 mb-1">
                Nhập vĩ độ
              </label>
              <Input
                value={lon}
                onChange={(e) => setLon(parseFloat(e.target.value))}
              />
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
          <ModelSelect />
          <div>
            <label className="block text-sm text-gray-600 mb-1">
              Nhập độ nghiêng
            </label>
            <div className="space-y-2">
              <Input
                type="number"
                value={tilt}
                onChange={(e) => setTilt(parseFloat(e.target.value))}
                className="w-full"
              />
              <input
                type="range"
                min="0"
                max="90"
                value={tilt}
                onChange={(e) => setTilt(parseFloat(e.target.value))}
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
                onChange={(e) => setAzimuth(parseFloat(e.target.value))}
                className="w-full"
              />
              <input
                type="range"
                min="-180"
                max="180"
                value={azimuth}
                onChange={(e) => setAzimuth(parseFloat(e.target.value))}
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
                onChange={(e) => setPr(parseFloat(e.target.value))}
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
        <Button
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
