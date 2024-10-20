import Link from "next/link";
const Footer = () => {
  const MenuLinks = [
    {
      title: "About",
      url: "/about",
    },
    {
      title: "FAQ",
      url: "/faq",
    },
    {
      title: "Privacy",
      url: "/privacy",
    },
    {
      title: "Terms",
      url: "/terms",
    },
    {
      title: "Send feedback",
      url: "/feedback",
    },
  ];
  return (
    <>
      <div className="h-[60px] fixed bottom-0 left-0 right-0 mx-auto flex  items-center py-[30px] border-t-2 border-orange-500 z-50 bg-[#f5f5f5]">
        <div className="text-[18px] mr-[200px] text-title-grey font-bold">
          Bright Future
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
