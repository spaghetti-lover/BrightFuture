import Link from "next/link";
import { FiAlignJustify } from "react-icons/fi";
const Header = () => {
  const MenuLinks = [
    {
      title: "Dự đoán",
      url: "/estimator",
    },

    {
      title: "Tư vấn lắp đặt",
      url: "/consulting",
    },
    {
      title: "Lịch sử",
      url: "/history",
    },
    {
      title: "Liên hệ",
      url: "/faq",
    },
    {
      title: "Giới thiệu",
      url: "/about",
    },
  ];
  return (
    <>
      <div className="h-[60px] fixed top-0 left-0 right-0 mx-auto flex content-center items-center justify-between border-b-2 border-orange-500 z-auto bg-white">
        <div className="flex items-center content-center h-full">
          <FiAlignJustify className="h-full mr-[15px] text-[24px] text-title-grey" />
          <a
            href="/"
            className="h-full text-[24px] text-title-grey font-medium"
          >
            Bright Future
          </a>
        </div>
        <nav className="h-full">
          <ul className="flex items-center h-full">
            {MenuLinks.map((item, index) => (
              <li
                key={index}
                className="px-[10px] flex items-center h-full text-text-grey text-[15px]"
              >
                <Link className="" href={item.url}>
                  <span>{item.title}</span>
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </>
  );
};
export default Header;
