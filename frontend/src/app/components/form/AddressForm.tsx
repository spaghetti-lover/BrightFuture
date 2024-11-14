"use client";
import React, { useState } from "react";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import ImageUpload from "../image/ImageUpload";

const AddressForm = () => {
  let dictionary = [
    "Số 12, ngõ 88, phố Trần Quang Diệu",
    "VNU University of Engineering and Technology",
  ];
  const [address, setAddress] = useState("");
  const [lat, setLat] = useState(10.7769);
  const [lon, setLon] = useState(106.6951);
  const [activeTab, setActiveTab] = useState("address");
  const [errorMessage, setErrorMessage] = useState("");

  const handleAddress = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAddress(e.target.value);
  };
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
  };
  const handleLatChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseFloat(e.target.value);
    setLat(value);
  };

  const handleLonChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseFloat(e.target.value);
    setLon(value);
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
          <ImageUpload />
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

export default AddressForm;
