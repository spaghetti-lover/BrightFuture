import TimelinePredictionChart from "@/app/components/chart/TimelinePredictionChart";
import Section1 from "@/app/components/household/Section1";
import SolarDataTable from "@/app/components/table/SolarDataTable";
const Household = () => {
  return (
    <>
      <Section1 />
      <TimelinePredictionChart />
      <SolarDataTable />
    </>
  );
};

export default Household;
