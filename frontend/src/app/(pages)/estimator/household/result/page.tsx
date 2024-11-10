"use client";
import TimelinePredictionChart from "@/app/components/chart/TimelinePredictionChart";
import SolarAnalysis from "@/app/components/household/SolarAnalysis";
import SolarDataTable from "@/app/components/table/SolarDataTable";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const ResultPage = () => {
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
