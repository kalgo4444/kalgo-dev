import { memo } from "react";
import { Link } from "react-router-dom";
import { EthernetPort } from "lucide-react";

const Logo = () => {
  return (
    <Link
      to={"/"}
      className="bg-white px-2 py-1 rounded-2xl text-blue-500 text-xl sm:text-2xl font-extrabold flex items-center gap-2"
    >
      <EthernetPort size={30} />
      <span>KalgoDEV.</span>
    </Link>
  );
};

export default memo(Logo);
