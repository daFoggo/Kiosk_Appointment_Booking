import { CalendarHeart, CalendarPlus, Sparkles } from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import UserMenu from "../UserMenu/UserMenu";
import { motion } from "framer-motion";

const RootNavBar = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path;

  // Container variants
  const navbarVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        when: "beforeChildren",
        staggerChildren: 0.1,
        duration: 0.3
      }
    }
  };

  // Left side variants with slide and fade
  const leftSideVariants = {
    hidden: { x: -20, opacity: 0 },
    visible: {
      x: 0,
      opacity: 1,
      transition: {
        duration: 0.5,
        ease: "easeOut"
      }
    }
  };

  // Right side variants with slide and fade
  const rightSideVariants = {
    hidden: { x: 20, opacity: 0 },
    visible: {
      x: 0,
      opacity: 1,
      transition: {
        duration: 0.5,
        ease: "easeOut"
      }
    }
  };

  return (
    <motion.div
      className="flex justify-between items-center font-inter font-semibold"
      initial="hidden"
      animate="visible"
      variants={navbarVariants}
    >
      {/* Left side */}
      <motion.div 
        className="flex items-center space-x-6"
        variants={leftSideVariants}
      >
        <Button
          variant="outline"
          size="icon"
          aria-label="Logo"
          className="p-4 border-transparent text-indigo-500 aspect-square hover:text-white hover:bg-indigo-500"
          onClick={() => navigate("/")}
          icon={<Sparkles />}
          iconPosition="center"
        />

        <Button
          variant="outline"
          className={`p-4 text-gray-500 hover:text-white hover:bg-indigo-500 border-transparent ${
            isActive("/my-appointments") ? "text-white bg-indigo-500" : ""
          }`}
          onClick={() => navigate("/my-appointments")}
          icon={<CalendarHeart />}
        >
          Lịch hẹn của tôi
        </Button>
      </motion.div>

      {/* Right side */}
      <motion.div 
        className="flex items-center space-x-6"
        variants={rightSideVariants}
      >
        <Button
          className="p-4 bg-indigo-500 text-white hover:text-white/90 hover:bg-indigo-400"
          icon={<CalendarPlus />}
        >
          Thêm lịch mới
        </Button>

        <UserMenu />
      </motion.div>
    </motion.div>
  );
};

export default RootNavBar;