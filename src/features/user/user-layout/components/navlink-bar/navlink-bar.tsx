import { memo } from "react";
import { NavLink } from "react-router-dom";
import { NAVLINK } from "../../../../../shared/static";
import type { INavlink } from "../../../../../shared/interface/navlink.interface";
import { Home, Plus, User } from "lucide-react";

const NavlinkBar = () => {
  return (
    <div className="fixed bottom-5 bg-blue-500 left-1/2 -translate-x-1/2 w-[200px] rounded-2xl shadow-md">
      <ul className="flex items-center">
        {NAVLINK.map((item: INavlink) => (
          <NavLink
            end={item.link === "/user" && true}
            key={item.id}
            className="navlink w-1/2 h-16 text-white font-bold gridCenter border-2 border-transparent"
            to={item.link}
          >
            {item.link === "/user" ? (
              <Home />
            ) : item.link === "profile" ? (
              <User />
            ) : item.link === "create-news" ? (
              <Plus />
            ) : (
              ""
            )}
          </NavLink>
        ))}
      </ul>
    </div>
  );
};

export default memo(NavlinkBar);
