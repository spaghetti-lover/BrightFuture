import TimelinePredictionChart from "@/app/components/chart/TimelinePredictionChart";
import SolarAnalysis from "@/app/components/household/SolarAnalysis";
import SolarPanelFinance from "@/app/components/household/SolarPanelFinance";
import SolarDataTable from "@/app/components/table/SolarDataTable";

const ResultPage = () => {
  return (
    <>
      <SolarAnalysis />
      <TimelinePredictionChart />
      <SolarDataTable />
    </>
  );
};
export default ResultPage;
