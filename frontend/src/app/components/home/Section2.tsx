import Image from "next/image";
const Section2 = () => {
  const MenuLinks = [
    {
      image: "/images/2b-how-works.png",
      number: 1,
      title: "Search for your home",
      desc: "We use Google Earth imagery to analyze your roof shape and local weather patterns to create a personalized solar plan. ",
    },
    {
      image: "/images/volt_and_panels@2X.png",
      number: 2,
      title: "Personalize your solar analysis",
      desc: "Adjust your electric bill to fine-tune your savings estimate and the recommended number of solar panels for your home. ",
    },
    {
      image: "/images/savings@2X.png",
      number: 3,
      title: "Compare finance options",
      desc: "Compare loan, lease, and purchase options for your solar panels based on your results.",
    },
  ];
  return (
    <>
      <div className="flex flex-col items-center mt-[50px]">
        <h2 className="font-bold text-[32px]">How Project Sunroof Works</h2>
        <p className="my-[20px]">
          Your own personalized solar savings estimator, powered by Google Earth
          imagery
        </p>
        <ul className=" mx-[200px]">
          {MenuLinks.map((item, index) => (
            <li
              key={index}
              className="flex justify-between items-center mb-[30px]"
            >
              <div className="">
                <Image
                  src={item.image}
                  alt={item.title}
                  width={250}
                  height={175}
                  objectFit="cover"
                  className=""
                />
              </div>
              <div className="flex flex-col w-[50%]">
                <h2 className="text-[48px] font-bold">{item.number}</h2>
                <h3 className="text-[24px] font-bold">{item.title}</h3>
                <p>{item.desc}</p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
};
export default Section2;
