import { memo } from "react";
import Logo from "../../../../shared/components/logo/logo";
import { Link } from "react-router-dom";
import { Github } from "lucide-react";

const Footer = () => {
  return (
    <footer>
      <div className="container h-20 my-2 bg-blue-500 rounded-2xl shadow-md gridCenter flex items-center justify-between">
        <Logo />
        <Link
          target="_blank"
          className="flex items-center gap-1 text-blue-500 bg-white px-2 py-1 rounded-2xl"
          to={"https://github.com/kalgo4444"}
        >
          <Github />
          <span className="font-semibold">Github</span>
        </Link>
      </div>
    </footer>
  );
};

export default memo(Footer);
