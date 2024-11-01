import Image from "next/image";
const Section2 = () => {
  const MenuLinks = [
    {
      image: "/images/2b-how-works.png",
      number: 1,
      title: "Dự đoán sản lượng năng lượng mặt trời",
      desc: "Sử dụng dữ liệu từ các tấm pin, dữ liệu về thời tiết và dữ liệu về địa lý để dự đoán sản lượng năng lượng mặt trời cho từng mái nhà, khu vực",
    },
    {
      image: "/images/volt_and_panels@2X.png",
      number: 2,
      title: "Tư vấn lắp đặt hiệu quả",
      desc: "Tính toán chi phí lắp đặt, tiết kiệm năng lượng và giảm lượng khí thải CO2, đồng thời cung cấp thông tin về các chương trình khuyến mãi và hỗ trợ tài chính",
    },
    {
      image: "/images/savings@2X.png",
      number: 3,
      title: "Theo dõi & phân tích dữ liệu lịch sử",
      desc: "Theo dõi sản lượng năng lượng mặt trời, tiết kiệm năng lượng và giảm lượng khí thải CO2 theo thời gian",
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
