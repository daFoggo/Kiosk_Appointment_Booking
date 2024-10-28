"use client";

import { motion } from "framer-motion";

import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { CalendarDays, Briefcase, Building2, AtSign, User } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { user } from "@/components/UserMenu/constant";
import myProfileBanner from "@/assets/images/MyProfile/myProfileBanner.png";

const MyProfile = () => {
  
  const renderField = (icon: React.ReactNode, label: string, value: string) => (
    <motion.div
      className="flex items-center space-x-2 font-semibold"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="text-violet-400">{icon}</div>
      <span className="text-gray-500">{label}:</span>
      <span className="text-zinc-800">{value}</span>
    </motion.div>
  );

  return (
    <div className="flex flex-col gap-6 min-h-screen bg-gray-50 rounded-xl p-2 sm:p-4 border font-inter">
      <Card className="w-full h-screen overflow-hidden">
        <CardHeader className="relative h-48 ">
          <motion.div
            className="absolute inset-0"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
          >
            <div className="absolute inset-0" />
            <img
              src={myProfileBanner}
              alt="Background"
              className="w-full h-full object-cover"
            />
          </motion.div>
          <motion.div
            className="absolute -bottom-16 left-4"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", stiffness: 260, damping: 20 }}
          >
            <Avatar className="w-32 h-32 border-4 border-violet-400">
              <AvatarImage src={user.profilepic} alt={user.name} />
              <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
            </Avatar>
          </motion.div>
        </CardHeader>
        <CardContent className="mt-16 p-6">
          <motion.h2
            className="text-3xl font-bold mb-2"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            {user.name}
          </motion.h2>
          <div className="space-y-4">
            {renderField(
              <User className="h-5 w-5" />,
              "Tên người dùng",
              user.name
            )}
            {renderField(
              <CalendarDays className="h-5 w-5" />,
              "Ngày sinh",
              user.dob
            )}
            {renderField(
              <Briefcase className="h-5 w-5" />,
              "Công việc",
              user.job
            )}
            {renderField(
              <Building2 className="h-5 w-5" />,
              "Tổ chức",
              user.company
            )}
            {renderField(<AtSign className="h-5 w-5" />, "Email", user.email)}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default MyProfile;
