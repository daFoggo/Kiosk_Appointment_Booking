import { Clock, Users, ArrowUpRight, CircleUserRound } from "lucide-react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

import {
  formatWorkingDays,
  formatWorkingHours,
} from "@/utils/Helper/DepartmentList/helper";
import { IDepartMentCardProps } from "@/models/DepartmentCard/type";

const DepartmentCard = (department: IDepartMentCardProps) => {
  return (
    <Card className="h-full flex flex-col shadow-sm hover:shadow-md transition-shadow duration-300 font-inter">
      <CardHeader>
        <div className="flex items-start justify-between">
          <Badge variant="outline" className="mb-2 font-semibold text-gray-500">
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
        {department.description && (
          <p className="text-sm text-gray-500">{department.description}</p>
        )}
        <CardDescription className="flex items-center gap-2 font-semibold">
          <CircleUserRound className="w-4 h-4 text-gray-500 " />
          Trưởng phòng: {department.headOfDepartment}
        </CardDescription>
      </CardHeader>

      <CardContent className="flex-grow">
        <div className="space-y-3 font-semibold">
          <div className="flex items-center gap-2 text-sm text-gray-500">
            <Clock className="w-4 h-4" />
            <span>
              {formatWorkingDays(department.workingDays)},{" "}
              {formatWorkingHours(department.workingHours)}
            </span>
          </div>
        </div>
      </CardContent>

      <CardFooter className="flex flex-col sm:flex-row gap-2 mt-auto">
        <Button
          className="w-full font-semibold bg-indigo-400 hover:bg-indigo-500 hover:text-white/90"
          onClick={() =>
            (window.location.href = `tel:${department.staffs[0].phoneNumber}`)
          }
          icon={<ArrowUpRight />}
          iconPosition="right"
        >
          Đặt lịch hẹn
        </Button>
      </CardFooter>
    </Card>
  );
};

export default DepartmentCard;
