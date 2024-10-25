'use client'

import { Clock, Users, CircleUserRound } from "lucide-react"
import { motion } from "framer-motion"
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import {
  formatWorkingDays,
  formatWorkingHours,
} from "@/utils/Helper/DepartmentList/helper"
import { IDepartMentCardProps } from "@/models/DepartmentCard/type"
import MakeAppointment from "../MakeAppointment/MakeAppointment"

const DepartmentCard = (department: IDepartMentCardProps) => {
  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      transition={{ type: "spring", stiffness: 100 }}
      className="group h-full"
    >
      <Card className="h-full flex flex-col shadow-sm transition-all duration-300 font-inter relative overflow-hidden group-hover:shadow-md group-hover:shadow-indigo-500/25">
        <div className="absolute inset-0 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300" style={{ mixBlendMode: 'overlay' }} />
        <div className="absolute inset-0 bg-white dark:bg-gray-950" />
        <div className="relative z-10 h-full flex flex-col">
          <CardHeader>
            <div className="flex items-start justify-between">
              <Badge variant="outline" className="mb-2 font-semibold text-gray-500 dark:text-gray-400">
                {department.code}
              </Badge>
              <Badge
                variant="secondary"
                className="flex items-center gap-1 font-semibold"
              >
                <Users className="w-3 h-3" />
                {department.staffs.length}
              </Badge>
            </div>
            <CardTitle className="text-lg md:text-xl line-clamp-2 font-bold">
              {department.name}
            </CardTitle>
            <Separator className="my-2" />
            {department.description && (
              <p className="text-sm text-gray-500 dark:text-gray-400">{department.description}</p>
            )}
            <CardDescription className="flex items-center gap-2 font-semibold mt-2">
              <CircleUserRound className="w-4 h-4 text-gray-500 dark:text-gray-400" />
              Trưởng phòng: {department.headOfDepartment}
            </CardDescription>
          </CardHeader>

          <CardContent className="flex-grow">
            <div className="space-y-3 font-semibold">
              <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
                <Clock className="w-4 h-4" />
                <span>
                  {formatWorkingDays(department.workingDays)},{" "}
                  {formatWorkingHours(department.workingHours)}
                </span>
              </div>
            </div>
          </CardContent>

          <CardFooter className="flex flex-col sm:flex-row gap-2 mt-auto">
            <MakeAppointment {...department} />
          </CardFooter>
        </div>
      </Card>
    </motion.div>
  )
}

export default DepartmentCard