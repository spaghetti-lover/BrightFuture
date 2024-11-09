import Link from "next/link";
const Footer = () => {
  const MenuLinks = [
    {
      title: "Giới thiệu",
      url: "/about",
    },
    {
      title: "FAQ",
      url: "/faq",
    },
    {
      title: "Quyền riêng tư",
      url: "/privacy",
    },
    {
      title: "Điều khoản",
      url: "/terms",
    },
    {
      title: "Phản hồi",
      url: "/feedback",
    },
  ];
  return (
    <>
      <div className="h-[60px] bottom-0 left-0 right-0 mx-auto flex  items-center py-[30px] border-t-2 border-orange-500 z-50 bg-[#f5f5f5]">
        <div className="flex items-center h-full px-4">
          <span className="text-xl font-bold text-title-grey">
            Bright Future
          </span>
        </div>
        <nav>
          <ul className="flex items-center">
            {MenuLinks.map((item, index) => (
              <li key={index} className="mx-[20px] text-[15px] text-text-grey">
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
export default Footer;
