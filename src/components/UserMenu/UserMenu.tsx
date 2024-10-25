"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import {
  CalendarHeart,
  MoveRight,
  User,
  ChevronDown,
  LogOut,
  CalendarPlus,
} from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { user } from "./constant";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export default function UserMenu() {
  const [isSignedIn, setIsSignedIn] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const storedIsSignedIn = localStorage.getItem("isSignedIn");
    setIsSignedIn(storedIsSignedIn === "true");

    return () => {
      setIsSignedIn(false);
    };
  }, []);

  const handleSignOut = () => {
    localStorage.removeItem("isSignedIn");
    setIsSignedIn(false);
    navigate("/auth/sign-in");
  };

  const itemVariants = {
    closed: { opacity: 0, y: -10 },
    open: { opacity: 1, y: 0 },
  };

  if (!isSignedIn) {
    return (
      <motion.div variants={itemVariants}>
        <Link to="/auth/sign-in">
          <Button className="p-2 sm:p-4 text-sm sm:text-base bg-indigo-500 text-white hover:text-white/90 hover:bg-indigo-400">
            <span className="hidden sm:inline">Đăng nhập</span>
            <span className="sm:hidden">Login</span>
            <MoveRight className="ml-2 h-4 w-4" />
          </Button>
        </Link>
      </motion.div>
    );
  }

  return (
    <motion.div variants={itemVariants}>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="outline"
            className="px-2 py-2 sm:px-4 sm:py-6 border-transparent text-gray-500 hover:text-gray-600 hover:bg-gray-200 space-x-2 select-none"
          >
            <Avatar className="h-6 w-6 sm:h-8 sm:w-8">
              <AvatarImage src={user.profilepic} alt={user.name} />
              <AvatarFallback className="bg-white text-gray-500 font-inter font-semibold text-sm sm:text-base">
                {user.name[0]}
              </AvatarFallback>
            </Avatar>
            <span className="hidden sm:inline font-inter font-semibold">
              {user.name}
            </span>
            <ChevronDown className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-48 sm:w-56 font-inter font-semibold cursor-pointer text-gray-500">
          <DropdownMenuLabel>
            <span className="text-sm sm:text-base">{user.name}</span>
            <p className="text-xs text-gray-400">{user.job}</p>
          </DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuGroup>
            <DropdownMenuItem 
              onClick={() => navigate("/my-profile")}
              className="text-sm sm:text-base"
            >
              <User className="mr-2 h-4 w-4" />
              <span>Hồ sơ của tôi</span>
            </DropdownMenuItem>
          </DropdownMenuGroup>
          <DropdownMenuSeparator />
          <DropdownMenuGroup>
            <DropdownMenuItem 
              onClick={() => navigate("/my-appointments")}
              className="text-sm sm:text-base"
            >
              <CalendarHeart className="mr-2 h-4 w-4" />
              <span>Lịch hẹn của tôi</span>
            </DropdownMenuItem>
            <DropdownMenuItem 
              onClick={() => navigate("/department-list")}
              className="text-sm sm:text-base"
            >
              <CalendarPlus className="mr-2 h-4 w-4" />
              <span>Thêm lịch hẹn mới</span>
            </DropdownMenuItem>
          </DropdownMenuGroup>
          <DropdownMenuSeparator />
          <DropdownMenuItem 
            onClick={handleSignOut}
            className="text-sm sm:text-base"
          >
            <LogOut className="mr-2 h-4 w-4" />
            <span>Đăng xuất</span>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </motion.div>
  );
}