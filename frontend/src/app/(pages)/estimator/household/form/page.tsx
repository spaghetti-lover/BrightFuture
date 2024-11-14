"use client";
import React, { useState } from "react";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import FormSolar from "@/app/components/form/Form";

const HouseHold = () => {
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
    <>
      <FormSolar link="/estimator/household/result" />
    </>
  );
};

export default HouseHold;
