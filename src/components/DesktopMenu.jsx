import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { motion } from "framer-motion";

export default function DesktopMenu({ menu, onClick }) {
  const [isHover, toggleHover] = useState(false);
  const toggleHoverMenu = () => {
    toggleHover(!isHover);
  };

  const subMenuAnimate = {
    enter: {
      opacity: 1,
      rotateX: 0,
      transition: {
        duration: 0.5,
      },
      display: "block",
    },
    exit: {
      opacity: 0,
      rotateX: -15,
      transition: {
        duration: 0.5,
      },
      transitionEnd: {
        display: "none",
      },
    },
  };

  const hasSubMenu = menu?.subMenu?.length;

  return (
    <motion.li
      className="group/link"
      
      onHoverStart={() => {
        toggleHoverMenu();
      }}
      onHoverEnd={toggleHoverMenu}
      key={menu.name}
      onClick={() => {
        console.log(`Clicked: ${menu.name}`); 
        if (menu.link) onClick(menu.link);
        if (menu.onClick) menu.onClick(onClick); 
      }}
    >
      <span className="flex-center gap-1 hover:bg-[#8EC5FC] cursor-pointer px-3 py-1 rounded-xl">
        {menu.name}
        {hasSubMenu && (
          <ChevronDown className="mt-[0.6px] group-hover/link:rotate-180 duration-200" />
        )}
      </span>
      {hasSubMenu && (
        <motion.div
          className="sub-menu"
          style={{ backgroundColor: "#8EC5FC" }}
          initial="exit"
          animate={isHover ? "enter" : "exit"}
          variants={subMenuAnimate}
        >
          <div
            className={`grid gap-7 ${
              menu.gridCols === 3
                ? "grid-cols-3"
                : menu.gridCols === 2
                ? "grid-cols-2"
                : "grid-cols-1"
            }`}
          >
            {hasSubMenu &&
              menu.subMenu.map((submenu, i) => (
                <div className="relative cursor-pointer" key={i} onClick={() => {
                  console.log(`Clicked: ${submenu.name}`); // Log the submenu name
                  if (submenu.link) onClick(submenu.link); // Navigate to the submenu link if provided
                }}>
                  {menu.gridCols > 1 && menu?.subMenuHeading?.[i] && (
                    <p className="text-sm mb-4 text-gray-500">
                      {menu?.subMenuHeading?.[i]}
                    </p>
                  )}
                  <div className="flex-center gap-x-4 group/menubox">
                    <div className="bg-[#8EC5FC] w-fit p-2 rounded-md group-hover/menubox:bg-[#6BA8E3] group-hover/menubox:text-gray-900 duration-300">
                      {submenu.icon && <submenu.icon />}
                    </div>
                    <div>
                      <h6 className="font-semibold">{submenu.name}</h6>
                      <p className="text-sm text-gray-400">{submenu.desc}</p>
                    </div>
                  </div>
                </div>
              ))}
          </div>
        </motion.div>
      )}
    </motion.li>
  );
}
