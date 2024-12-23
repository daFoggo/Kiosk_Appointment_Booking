import { Building2, CalendarHeart, CalendarPlus, Sparkles } from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";
import { motion } from "framer-motion";

import { Button } from "@/components/ui/button";
import UserMenu from "../UserMenu/UserMenu";

import { navbarVariants, leftSideVariants, rightSideVariants } from "./motion";

const RootNavBar = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path;

  return (
    <motion.div
      className="flex justify-between items-center font-inter font-semibold"
      initial="hidden"
      animate="visible"
      variants={navbarVariants}
    >
      {/* Left side */}
      <motion.div
        className="flex items-center space-x-2 sm:space-x-4"
        variants={leftSideVariants}
      >
        <Button
          variant="outline"
          size="icon"
          aria-label="Logo"
          className="group p-4 sm:p-6 border-transparent text-indigo-400 hover:text-white hover:bg-indigo-400 w-fit aspect-auto sm:aspect-square font-clash"
          onClick={() => navigate("/")}
          icon={
            <motion.div
              variants={{
                initial: { rotate: 0, scale: 1 },
                hover: { rotate: 90, scale: 1.15 },
              }}
              initial="initial"
              animate="initial"
              className="group-hover:[&>*]:animate-[spin_0.5s_ease-in-out]"
            >
              <Sparkles className="fill-indigo-400 group-hover:fill-white" />
            </motion.div>
          }
          iconPosition="center"
        >
          <span className="sm:hidden">Kiosk appointment</span>
        </Button>

        {/* Navigation items - Only visible on desktop */}
        <div className="hidden sm:flex sm:items-center sm:space-x-4">
          <Button
            variant="outline"
            className={`px-4 py-6 text-base font-semibold text-gray-500 hover:text-white hover:bg-indigo-400 border-transparent ${
              isActive("/my-appointments") ? "text-white bg-indigo-400" : ""
            }`}
            onClick={() => navigate("/my-appointments")}
            icon={<CalendarHeart className="w-4 h-4" />}
          >
            Lịch hẹn của tôi
          </Button>

          <Button
            variant="outline"
            className={`px-4 py-6 text-base font-semibold text-gray-500 hover:text-white hover:bg-indigo-400 border-transparent ${
              isActive("/department-list") ? "text-white bg-indigo-400" : ""
            }`}
            onClick={() => navigate("/department-list")}
            icon={<Building2 className="w-4 h-4" />}
          >
            Danh sách phòng ban
          </Button>
        </div>
      </motion.div>

      {/* Right side */}
      <motion.div
        variants={rightSideVariants}
        className="flex space-x-4 items-center"
      >
        {location.pathname !== "/department-list" && (
          <div className="hidden sm:flex sm:items-center sm:space-x-4">
            <Button
              className="px-4 py-6 text-base font-semibold bg-white text-gray-500 hover:text-white hover:bg-indigo-400"
              icon={<CalendarPlus className="w-4 h-4" />}
              onClick={() => navigate("/department-list")}
            >
              Thêm lịch hẹn mới
            </Button>
          </div>
        )}
        <UserMenu />
      </motion.div>
    </motion.div>
  );
};

export default RootNavBar;
