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
      <div className="h-[60px] fixed top-0 left-0 right-0 mx-auto flex content-center items-center justify-between py-[30px] border-b-2 border-orange-500 z-auto bg-white">
        <div className="flex items-center">
          <FiAlignJustify className=" mr-[15px] text-[24px] text-title-grey" />
          <h3 className="text-[24px] text-title-grey font-medium">
            Bright Future
          </h3>
        </div>
        <nav>
          <ul className="flex items-center">
            {MenuLinks.map((item, index) => (
              <li key={index} className="mx-[10px] text-text-grey text-[15px]">
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
