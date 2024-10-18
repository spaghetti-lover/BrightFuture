import { FiAlignJustify } from "react-icons/fi";
const Header = () => {
  return (
    <>
      <div className="flex flex-wrap items-center justify-between">
        <div className="flex flex-wrap">
          <div className="mx-[15px] text-greytext text-[24px]">
            <FiAlignJustify />
          </div>
          <div className="text-[24px] text-greytext">BrightFuture</div>
        </div>
        <div>
          <ul className="flex flex-wrap">
            <li>Solar API in Maps</li>
            <li>Savings Estimators</li>
            <li>Data explorer</li>
            <li>Solar 101</li>
            <li>FAQ</li>
          </ul>
        </div>
      </div>
    </>
  );
};
export default Header;
