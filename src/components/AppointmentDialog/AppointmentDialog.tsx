'use client'

import { useState } from "react"
import { Clock, User, Building2, FileText, MessageCircle, Mail, Phone, Network, LoaderCircle, CheckCircle, Trash2, Edit, ChevronDown, ChevronUp } from "lucide-react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { Badge } from "@/components/ui/badge"
import AppointmentQR from "../AppointmentQR/AppointmentQR"
import ConfirmDialog from "../ConfirmDialog/ConfirmDialog"
import { getStatusColor } from "@/utils/Helper/AppointmentCalendar/helper"
import { IAppointmentDialogProps } from "@/models/AppointmentDialog/type"

export default function AppointmentDialog({
  selectedappointment,
  isDialogOpen,
  setIsDialogOpen,
}: IAppointmentDialogProps) {
  const [isEditting, setIsEditting] = useState(false)
  const [isDeleteConfirm, setIsDeleteConfirm] = useState(false)
  const [isMarkConfirm, setIsMarkConfirm] = useState(false)
  const [isPurposeExpanded, setIsPurposeExpanded] = useState(false)
  const [isNoteExpanded, setIsNoteExpanded] = useState(false)

  const handleEdit = () => {
    console.log("Edit appointment")
  }

  const handleDelete = () => {
    console.log("Delete appointment")
  }

  const handleMarkAsCompleted = () => {
    console.log("Mark appointment as completed")
  }

  const renderField = (icon: React.ReactNode, label: string, value: string, isExpandable = false, isExpanded = false, onToggle?: () => void) => (
    <div className="flex flex-col space-y-2">
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
        ) : isExpandable ? (
          <Button variant="ghost" size="sm" onClick={onToggle} className="p-0 h-6">
            {isExpanded ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
          </Button>
        ) : (
          <span>{value}</span>
        )}
      </div>
      {isExpandable && (
        <div className={`pl-7 ${isExpanded ? 'block' : 'hidden'}`}>
          <p className="text-sm text-gray-600 whitespace-pre-wrap">{value}</p>
        </div>
      )}
    </div>
  )

  return (
    <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
      <DialogContent className="max-w-[95%] sm:max-w-[80%] md:max-w-[70%] lg:max-w-[60%] xl:max-w-[50%] max-h-[95%] sm:h-auto rounded-xl p-4 sm:p-6 font-inter overflow-y-auto">
        <DialogHeader className="flex flex-col sm:flex-row justify-between items-start sm:pr-6 sm:items-center space-y-4 sm:space-y-0">
          <DialogTitle className="text-2xl text-indigo-400">
            Chi tiết cuộc hẹn
          </DialogTitle>
          <div className="flex space-x-2">
            <TooltipProvider delayDuration={100}>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => setIsEditting(true)}
                    className="border-transparent rounded-full text-violet-400 hover:bg-violet-50 hover:text-violet-500"
                  >
                    <Edit className="h-4 w-4 font-semibold" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent side="bottom">
                  <p>Chỉnh sửa</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
            <TooltipProvider delayDuration={100}>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    variant="outline"
                    size="icon"
                    className="border-transparent rounded-full text-red-400 hover:bg-red-50 hover:text-red-500"
                    onClick={() => setIsDeleteConfirm(true)}
                  >
                    <Trash2 className="h-4 w-4 font-semibold" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent side="bottom">
                  <p>Xóa</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
            <TooltipProvider delayDuration={100}>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => setIsMarkConfirm(true)}
                    className="border-transparent rounded-full text-emerald-400 hover:bg-emerald-50 hover:text-emerald-500"
                  >
                    <CheckCircle className="h-4 w-4 font-semibold" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent side="bottom">
                  <p>Hoàn thành</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
        </DialogHeader>
        <Separator className="mb-4" />
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
              selectedappointment.purpose,
              true,
              isPurposeExpanded,
              () => setIsPurposeExpanded(!isPurposeExpanded)
            )}
            {renderField(
              <FileText className="h-5 w-5" />,
              "Ghi chú",
              selectedappointment.note,
              true,
              isNoteExpanded,
              () => setIsNoteExpanded(!isNoteExpanded)
            )}

            <div className="p-4 bg-gray-50 rounded-lg">
              <h3 className="text-lg font-semibold text-zinc-800">
                Thông tin liên hệ
              </h3>
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
      {isDeleteConfirm && (
        <ConfirmDialog
          isOpen={isDeleteConfirm}
          onClose={() => setIsDeleteConfirm(false)}
          onConfirm={handleDelete}
          title="Xác nhận xóa"
          message="Bạn có chắc chắn muốn xóa cuộc hẹn này?"
          confirmText="Xóa"
          cancelText="Hủy"
          confirmVariant="destructive"
        />
      )}
      {isMarkConfirm && (
        <ConfirmDialog
          isOpen={isMarkConfirm}
          onClose={() => setIsMarkConfirm(false)}
          onConfirm={handleMarkAsCompleted}
          title="Xác nhận hoàn thành"
          message="Bạn có chắc chắn muốn đánh dấu cuộc hẹn này là đã hoàn thành?"
          confirmText="Hoàn thành"
          cancelText="Hủy"
          confirmVariant="default"
        />
      )}
    </Dialog>
  )
}