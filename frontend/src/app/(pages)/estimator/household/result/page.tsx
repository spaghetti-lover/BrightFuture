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
      const response = await fetch(url, {
        method: "GET",
      });
      const data = await response.json();
      if (data) {
        setData(data);
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
        <SolarAnalysis data={data} />
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
