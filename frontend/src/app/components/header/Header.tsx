import Link from "next/link";
import { FiAlignJustify } from "react-icons/fi";
const Header = () => {
  const MenuLinks = [
    {
      title: "Estimator",
      url: "/estimator",
    },

    {
      title: "Consulting",
      url: "/consulting",
    },
    {
      title: "History",
      url: "/history",
    },
    {
      title: "FAQ",
      url: "/faq",
    },
    {
      title: "About",
      url: "/about",
    },
  ];
  return (
    <>
      <div className="h-[60px] fixed top-0 left-0 right-0 mx-auto flex content-center items-center justify-between border-b-2 border-orange-500 z-auto bg-white">
        <div className="flex items-center content-center h-full">
          <FiAlignJustify className="h-full hover:bg-gray-950 mr-[15px] text-[24px] text-title-grey" />
          <a
            href="/"
            className="h-full hover:bg-gray-950 text-[24px] text-title-grey font-medium"
          >
            Bright Future
          </a>
        </div>
        <nav className="h-full">
          <ul className="flex items-center h-full">
            {MenuLinks.map((item, index) => (
              <li
                key={index}
                className="px-[10px] h-full text-text-grey hover:bg-gray-950 text-[15px]"
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
