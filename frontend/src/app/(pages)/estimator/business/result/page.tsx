import TimelinePredictionChart from "@/app/components/chart/TimelinePredictionChart";
import SolarAnalysis from "@/app/components/household/SolarAnalysis";
import SolarDataTable from "@/app/components/table/SolarDataTable";

const ResultPage = () => {
  return (
    <>
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
    </>
  );
};
export default ResultPage;
