"use client";
import TimelinePredictionChart from "@/app/components/chart/TimelinePredictionChart";
import SolarAnalysis from "@/app/components/household/SolarAnalysis";
import SolarDataTable from "@/app/components/table/SolarDataTable";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useEffect, useState } from "react";

const ResultPage = ({
  searchParams,
}: {
  searchParams: {
    capacity: number;
    lat: number;
    lon: number;
    tilt: number;
    model: string;
    azimuth: number;
    pr: number;
  };
}) => {
  const { capacity, lat, lon, tilt, model, azimuth, pr } = searchParams;
  const url = `http://localhost:8000/statistics/?capacity=${capacity}&latitude=${lat}&longitude=${lon}&timezone=Asia%2FHo_Chi_Minh&model=${model}&surface_tilt=${tilt}&surface_azimuth=${azimuth}&performance_ratio=${pr}`;
  const [data, setData] = useState<any>(null);
  const getSolarAnalysis = async () => {
    try {
      const response = await fetch(
        "http://localhost:8000/statistics/?capacity=5&latitude=10.7769&longitude=106.6951&timezone=Asia%2FHo_Chi_Minh&model=450Wp_44V_Mono&surface_tilt=20&surface_azimuth=180&performance_ratio=81",
        {
          method: "GET",
        }
      );
      const data = await response.json();
      if (data) {
        console.log(data);
      }
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(() => {
    getSolarAnalysis();
  }, []);
  return (
    <>
      <div className="flex flex-col items-center">
        <SolarAnalysis />
        <SolarDataTable
          title="Solar Irradation Values"
          column="Solar Irradiation"
          unit="kWh/m2"
        />
        <TimelinePredictionChart title="Solar Irradiation (kWh/m2)" />

        <SolarDataTable
          title="Solar Energy Generation Values"
          column="Solar Energy Prediction"
          unit="kWh"
        />
        <TimelinePredictionChart title="Solar Energy Production (kWh)" />
        <Link href="/consulting/household">
          <Button className="mt-[15px] mb-[15px] bg-orange-500 hover:bg-orange-600">
            <span className="flex items-center gap-2 font">Tư vấn ngay</span>
          </Button>
        </Link>
      </div>
    </>
  );
};
export default ResultPage;
