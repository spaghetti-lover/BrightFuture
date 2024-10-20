import Image from "next/image";
import Button from "../button/ Button";
const Section3 = () => {
  return (
    <>
      <div className="bg-[#f8f8f8] flex flex-col items-center py-[40px]">
        <div className="w-[75%]">
          <h2 className="font-bold text-[32px] mb-[20px] text-center">
            Customized savings estimate
          </h2>
          <p className="text-center mb-[40px]">
            Solar savings are calculated using roof size and shape, shaded roof
            areas, local weather, local electricity prices, solar costs, and
            estimated incentives over time. Using a sample address, take a look
            at the detailed estimate Future Bright can give you.
          </p>
          <div className="flex justify-evenly">
            <div>
              <h3 className="text-[16px] font-bold">
                15, Tran Quang Dieu Street, Dong Da, Ha Noi, Vietnam{" "}
              </h3>
              <div className="py-[10px] border-y border-gray-300 my-[15px] flex flex-col">
                <div className="flex mb-[15px]">
                  <Image
                    src="/images/ic_sun.png"
                    alt="sun"
                    width={40}
                    height={40}
                    objectFit="cover"
                    className="mr-[10px]"
                  />
                  <div>
                    <h3>1,479 hours of usable sunlight per year</h3>
                    <p className="font-light text-[#212121] text-[14px]">
                      Based on day-to-day analysis of weather patterns
                    </p>
                  </div>
                </div>
                <div className="flex mb-[15px]">
                  <Image
                    src="/images/ic_house.png"
                    alt="house"
                    width={40}
                    height={40}
                    objectFit="cover"
                    className="mr-[10px]"
                  />
                  <div>
                    <h3>1,479 hours of usable sunlight per year</h3>
                    <p className="font-light text-[#212121] text-[14px]">
                      Based on day-to-day analysis of weather patterns
                    </p>
                  </div>
                </div>
              </div>

              <h3 className="text-[24px]">$18,000 savings </h3>
              <p className="font-light text-[#212121] text-[14px] mb-[20px]">
                Estimated net savings for roof over 20 years{" "}
              </p>
              <Button title="Check my roof" />
            </div>
            <Image
              src="/images/masked-house.png"
              alt="savings estimate"
              width={300}
              height={300}
              objectFit="cover"
              className=""
            />
          </div>
        </div>
      </div>
    </>
  );
};
export default Section3;
