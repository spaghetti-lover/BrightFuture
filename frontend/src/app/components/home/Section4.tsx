import Image from "next/image";
import LinkButton from "../link_button/LinkButton";
const Section4 = () => {
  return (
    <div className="flex flex-col items-center py-[40px]">
      <div className="w-[75%]">
        <h2 className="font-bold text-[32px] mb-[20px] text-center">
          Area-wide solar potential
        </h2>
        <p className="text-center mb-[40px]">
          Search for a city, state, or zip code to see solar potential and
          impact across entire geographic areas. We currently have solar data
          for portions of 10 cities and Ha Noi. See if we’ve got you covered.
        </p>
        <LinkButton text="Explore your area" color="text-primary-orange" />
        <Image
          src="/images/coverage.png"
          alt="coverage"
          width={960}
          height={600}
        />
      </div>
    </div>
  );
};
export default Section4;
