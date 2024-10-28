"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import {
  Clock,
  User,
  Building2,
  FileText,
  MessageCircle,
  Mail,
  Phone,
  Network,
  LoaderCircle,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import AppointmentQR from "../AppointmentQR/AppointmentQR";

import { getStatusColor } from "@/utils/Helper/AppointmentCalendar/helper";
import { IAppointmentDialogProps } from "@/models/AppointmentDialog/type";

export default function AppointmentDialog({
  selectedappointment,
  isDialogOpen,
  setIsDialogOpen,
}: IAppointmentDialogProps) {
  const renderField = (icon: React.ReactNode, label: string, value: string) => (
    <div className="flex items-center space-x-2 font-semibold">
      <div className="text-indigo-400">{icon}</div>
      <span className="text-zinc-800">{label}:</span>
      {label === "Trạng thái" ? (
        <Badge
          className={`text-base px-3 py-1 ${getStatusColor(
            value as "pending" | "confirmed" | "deleted" | "finished"
          )}`}
        >
          {value === "confirmed"
            ? "Đã xác nhận"
            : value === "pending"
            ? "Đang chờ"
            : value === "deleted"
            ? " Đã xóa"
            : value === "finished"
            ? "Đã hoàn thành"
            : value}
        </Badge>
      ) : (
        <span>{value}</span>
      )}
    </div>
  );

  return (
    <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
      <DialogContent className="max-w-[95%] sm:max-w-[80%] md:max-w-[70%] lg:max-w-[60%] xl:max-w-[50%] max-h-[95%] sm:h-auto rounded-xl p-4 sm:p-6 font-inter overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-xl text-indigo-400">
            Chi tiết cuộc hẹn
          </DialogTitle>
        </DialogHeader>
        <Separator className="my-4" />
        <div className="flex flex-col space-y-6 md:flex-row md:space-y-0 md:space-x-6">
          <DialogDescription className="flex-1 space-y-4">
            {renderField(
              <Building2 className="h-5 w-5" />,
              "Phòng ban",
              selectedappointment.department
            )}
            {renderField(
              <User className="h-5 w-5" />,
              "Nhân viên",
              selectedappointment.staff.name
            )}
            {renderField(
              <Network className="h-5 w-5" />,
              "Chức vụ",
              selectedappointment.staff.position
            )}
            {renderField(
              <Clock className="h-5 w-5" />,
              "Thời gian",
              new Date(selectedappointment.datetime).toLocaleString("vi-VN", {
                hour: "2-digit",
                minute: "2-digit",
                hour12: false,
              })
            )}
            {renderField(
              <LoaderCircle className="h-5 w-5" />,
              "Trạng thái",
              selectedappointment?.status
            )}
            {renderField(
              <MessageCircle className="h-5 w-5" />,
              "Mục đích",
              selectedappointment.purpose
            )}
            {selectedappointment.note &&
              renderField(
                <FileText className="h-5 w-5" />,
                "Ghi chú",
                selectedappointment.note
              )}

            <div className="p-4 bg-gray-50 rounded-lg">
              <h3 className="text-lg font-semibold text-zinc-800">Thông tin liên hệ</h3>
              <div className="space-y-2 mt-2">
                {renderField(
                  <Mail className="h-5 w-5" />,
                  "Email",
                  selectedappointment.staff.email
                )}
                {renderField(
                  <Phone className="h-5 w-5" />,
                  "Số điện thoại",
                  selectedappointment.staff.phoneNumber
                )}
              </div>
            </div>
          </DialogDescription>
          <Separator orientation="vertical" className="hidden md:block" />
          <Separator orientation="horizontal" className="block md:hidden" />
          <div className="flex-1">
            <AppointmentQR appointment={selectedappointment} />
          </div>
        </div>
        <DialogFooter className="mt-6 sm:mt-8">
          <Button
            onClick={() => setIsDialogOpen(false)}
            className="w-full sm:w-auto bg-indigo-400 hover:bg-indigo-500 text-white font-semibold"
          >
            Đóng
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
