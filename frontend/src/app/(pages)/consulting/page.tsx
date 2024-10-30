import { Users, Building2 } from "lucide-react";
const Consulting = () => {
  return (
    <>
      <div className="flex items-center justify-center align-middle pt-[150px]">
        <a
          href="/"
          className="flex flex-col items-center border rounded-lg p-5 w-72 shadow-md mr-[15px]"
        >
          <Users size={48} />
          <h4 className="font-semibold text-lg mb-3">Household</h4>
        </a>
        <a
          href="/"
          className="flex flex-col items-center border rounded-lg p-5 w-72 shadow-md mr-[15px]"
        >
          <Building2 size={48} />
          <h4 className="font-semibold text-lg mb-3">Company</h4>
        </a>
      </div>
    </>
  );
};

export default Consulting;
