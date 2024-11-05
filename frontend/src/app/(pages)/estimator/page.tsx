import { Users, Building2 } from "lucide-react";
import Link from "next/link";
const Estimators = () => {
  return (
    <>
      <div className="flex items-center justify-center align-middle pt-[150px]">
        <Link
          href="estimator/household"
          className="flex flex-col items-center border rounded-lg p-5 w-72 shadow-md mr-[15px]"
        >
          <Users size={48} />
          <h4 className="font-semibold text-lg mb-3">Hộ gia đình</h4>
        </Link>
        <Link
          href="/estimator/business"
          className="flex flex-col items-center border rounded-lg p-5 w-72 shadow-md mr-[15px]"
        >
          <Building2 size={48} />
          <h4 className="font-semibold text-lg mb-3">Doanh nghiệp</h4>
        </Link>
        <Link
          href="/estimator/factory"
          className="flex flex-col items-center border rounded-lg p-5 w-72 shadow-md mr-[15px]"
        >
          <Building2 size={48} />
          <h4 className="font-semibold text-lg mb-3">Nhà máy điện</h4>
        </Link>
      </div>
    </>
  );
};

export default Estimators;
