import { Sparkles } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

import { Button } from "@/components/ui/button";

import { navbarVariants, leftSideVariants } from "./motion";

const AuthNavBar = () => {
  const navigate = useNavigate();

  return (
    <motion.div
      className="flex justify-between items-center font-inter font-semibold p-2 bg-white border-b shadow-sm"
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
          className="group p-4 sm:p-6 border-transparent text-indigo-400 hover:text-white hover:bg-indigo-400 w-fit font-clash"
          onClick={() => navigate("/")}
          icon={
            <motion.div
              variants={{
                initial: { rotate: 0, scale: 1 },
                hover: { rotate: 180, scale: 1.15 },
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
          Kiosk appointment
        </Button>
      </motion.div>
    </motion.div>
  );
};

export default AuthNavBar;
