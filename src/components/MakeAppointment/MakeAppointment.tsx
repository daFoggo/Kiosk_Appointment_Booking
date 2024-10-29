"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

import { CalendarIcon, CalendarPlus } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import TimeSelector from "../TimeSelector/TimeSelector";

import { IDepartMentCardProps } from "@/models/DepartmentCard/type";

// zod validation schema
const appointmentSchema = z.object({
  date: z.string({
    required_error: "Vui lòng chọn ngày hẹn.",
  }),
  time: z.string({
    required_error: "Vui lòng chọn thời gian.",
  }),
  staff: z.string({
    required_error: "Vui lòng chọn người cần hẹn.",
  }),
  purpose: z.string().min(1, {
    message: "Vui lòng cung cấp mục đích hẹn.",
  }),
  notes: z.string().optional(),
});

export function MakeAppointment(department: IDepartMentCardProps) {
  const [isOpen, setIsOpen] = useState(false);

  const form = useForm({
    resolver: zodResolver(appointmentSchema),
    defaultValues: {
      date: "",
      time: "",
      staff: "",
      purpose: "",
      notes: "",
    },
    mode: "onSubmit",
  });

  const onSubmit = async (values: z.infer<typeof appointmentSchema>) => {
    try {
      console.log(values);
      setIsOpen(false);
      form.reset();
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };

  const handleDateTimeSelect = (date: string, time: string) => {
    form.setValue("date", date, { shouldValidate: false });
    form.setValue("time", time, { shouldValidate: false });
  };

  return (
    <Drawer open={isOpen} onOpenChange={setIsOpen}>
      <DrawerTrigger asChild>
        <Button
          className="w-full font-semibold bg-indigo-400 hover:bg-indigo-500 hover:text-white/90 transition-colors duration-300 font-inter"
          icon={<CalendarPlus className="h-4 w-4" />}
          iconPosition="right"
        >
          <span>Đặt lịch hẹn</span>
        </Button>
      </DrawerTrigger>
      <DrawerContent
        className="h-[90vh] flex flex-col font-inter"
        onOpenAutoFocus={(e) => e.preventDefault()}
      >
        <DrawerHeader>
          <DrawerTitle>Đặt lịch hẹn với {department.name}</DrawerTitle>
          <DrawerDescription>
            Vui lòng điền đầy đủ thông tin để liên hệ với phòng ban
          </DrawerDescription>
        </DrawerHeader>
        <div className="flex-grow overflow-y-auto px-4">
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="space-y-8 px-4"
            >
              <FormField
                control={form.control}
                name="date"
                render={() => (
                  <FormItem className="flex flex-col">
                    <FormLabel>Ngày và giờ hẹn</FormLabel>
                    <TimeSelector
                      workingDays={department.workingDays}
                      workingHours={department.workingHours}
                      onSelect={handleDateTimeSelect}
                    />
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="staff"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Người muốn hẹn</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Chọn người muốn hẹn" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {department.staffs.map((staff) => (
                          <SelectItem
                            key={staff.id}
                            value={staff.id.toString()}
                          >
                            {staff.name} - {staff.position}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="flex flex-col sm:flex-row justify-between gap-8 w-full">
                <FormField
                  control={form.control}
                  name="purpose"
                  render={({ field }) => (
                    <FormItem className="flex-1">
                      <FormLabel>Mục đích hẹn</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Nhập mục đích hẹn"
                          className="resize-none"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="notes"
                  render={({ field }) => (
                    <FormItem className="flex-1">
                      <FormLabel>Ghi chú</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Nhập ghi chú nếu có"
                          className="resize-none"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <DrawerFooter className="sm:flex sm:justify-end font-semibold">
                <Button
                  type="submit"
                  className="w-full mb-2 sm:mb-0 bg-indigo-400 hover:bg-indigo-500 hover:text-white/90"
                >
                  Xác nhận đặt lịch
                </Button>
                <DrawerClose asChild>
                  <Button variant="outline" className="w-full">
                    Hủy
                  </Button>
                </DrawerClose>
              </DrawerFooter>
            </form>
          </Form>
        </div>
      </DrawerContent>
    </Drawer>
  );
}

export default MakeAppointment;
