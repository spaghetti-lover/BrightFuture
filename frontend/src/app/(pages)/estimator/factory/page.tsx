import TimelinePredictionChart from "@/app/components/chart/TimelinePredictionChart";
import Section1 from "@/app/components/household/SolarAnalysis";
import SolarDataTable from "@/app/components/table/SolarDataTable";
const Factory = () => {
  return (
    <div>
      <Section1 />
      <TimelinePredictionChart />
      <SolarDataTable />
    </div>
  );
};
export default Factory;
