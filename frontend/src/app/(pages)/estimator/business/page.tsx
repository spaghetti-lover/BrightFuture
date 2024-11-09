"use client";
import FormSolar from "@/app/components/form/Form";
import { Card, CardContent } from "@/components/ui/card";
import Link from "next/link";
import { useState } from "react";

const Business = () => {
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
    <>
      <FormSolar link="/estimator/business/result" />
    </>
  );
};
export default Business;
