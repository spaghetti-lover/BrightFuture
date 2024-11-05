import Button from "../button/ Button";
import LinkButton from "../link_button/LinkButton";

const Section1 = () => {
  return (
    <>
      <div className="bg-[url('/images/map-background.jpg')] h-[463px] flex flex-col items-center justify-center">
        <h2 className="text-[#110a61] text-[60px] font-bold">Bright Future</h2>
        <form className="mt-[30px] mb-[15px]">
          <input
            type="text"
            placeholder="Enter your address"
            className="h-[40px] w-[400px] outline-none pl-[15px]"
          />
          <Button title="Tư vấn ngay" />
        </form>
        <p className="mb-[30px] w-[400px] text-center">
          Giải pháp dự đoán và tối ưu năng lượng mặt trời cho mọi đối tượng
        </p>
        <LinkButton text="Explore your area" color="text-blue-600" />
      </div>
    </>
  );
};
export default Section1;
