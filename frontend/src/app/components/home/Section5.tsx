import Button from "../button/ Button";
const Section5 = () => {
  return (
    <div className="bg-[url('/images/map-background.jpg')] h-[241px] flex flex-col items-center justify-center">
      <h2 className="font-bold text-[32px] mb-[20px] text-center">
        Area-wide solar potential
      </h2>
      <form className="mt-[20px] mb-[15px]">
        <input
          type="text"
          placeholder="Enter your address"
          className="h-[40px] w-[400px] outline-none pl-[15px]"
        />
        <Button title="Calculate" />
      </form>
    </div>
  );
};
export default Section5;
