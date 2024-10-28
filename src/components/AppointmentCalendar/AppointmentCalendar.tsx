import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "../ui/separator";

import {
  IAppointment,
  IAppointmentCalendarProps,
} from "@/models/AppointmentCalendar/type";
import {
  generateHours,
  generateWeekDays,
  getAppointmentColor,
} from "@/utils/Helper/AppointmentCalendar/helper";
import AppointmentDialog from "../AppointmentDialog/AppointmentDialog";
import { ChevronLeft, ChevronRight, Loader2 } from "lucide-react";

const AppointmentCalendar = ({
  appointments = [],
  onWeekChange,
  isLoading = false,
}: IAppointmentCalendarProps) => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedappointment, setSelectedappointment] =
    useState<IAppointment | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [viewMode, setViewMode] = useState("week");
  const scrollRef = useRef<HTMLDivElement>(null);
  const hours = generateHours();
  const weekDays = generateWeekDays(currentDate);

  useEffect(() => {
    scrollRef.current?.scrollTo(0, 8 * 60);
  }, [viewMode]);

  // Calendar navigation
  const navigateCalendar = async (days: number) => {
    const newDate = new Date(currentDate);
    newDate.setDate(newDate.getDate() + days);
    setCurrentDate(newDate);

    if (viewMode === "week") {
      onWeekChange();
    }
  };

  const goToday = async () => {
    const today = new Date();
    setCurrentDate(today);
    if (viewMode === "week") {
      onWeekChange();
    }
  };

  // appointment rendering
  const renderAppointmentItem = (
    appointment: IAppointment,
    hourHeight = 80
  ) => {
    const appointmentDate = new Date(appointment.datetime);
    const topOffset = (appointmentDate.getMinutes() / 60) * hourHeight;

    return (
      <motion.div
        key={appointment.id}
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className={`absolute left-0 right-0 mx-2 p-2 rounded-lg border cursor-pointer 
          ${getAppointmentColor(
            appointment.status
          )} transition-colors duration-200`}
        style={{
          top: `${topOffset}px`,
          height: `${hourHeight}px`,
        }}
        onClick={() => {
          setSelectedappointment(appointment);
          setIsDialogOpen(true);
        }}
      >
        <p className="font-semibold truncate">
          {viewMode === "week" && (
            <span className="sm:hidden">{appointment.departmentCode}</span>
          )}
          <span className="sm:hidden">{appointment.department}</span>
          <span className="hidden sm:inline">{appointment.department}</span>
        </p>
        <p className="text-sm text-gray-600 truncate">
          {appointment.staff.name} - {appointment.purpose}
        </p>
      </motion.div>
    );
  };

  // Calendar views
  const renderDayView = (day: Date) => (
    <ScrollArea
      ref={scrollRef}
      className="h-[calc(100vh-14rem)] lg:h-[calc(100vh-12rem)]"
    >
      {isLoading ? (
        <div className="flex justify-center items-center h-full">
          <div className="flex flex-col items-center gap-4">
            <Loader2 className="h-8 w-8 animate-spin text-indigo-400" />
            <p className="text-gray-500">Đang tải lịch...</p>
          </div>
        </div>
      ) : (
        <div className="min-w-[300px] pr-4">
          {hours.map((hour) => (
            <div
              key={hour}
              className="flex items-stretch border-t-2 border-gray-200 h-20"
            >
              <span className="w-20 lg:w-24 text-gray-500 py-2 sticky left-0 bg-white z-20 text-sm lg:text-base">
                {hour}
              </span>
              <div className="flex-1 relative">
                {appointments
                  .filter((appointment) => {
                    const appointmentDate = new Date(appointment.datetime);
                    return (
                      appointmentDate.getHours() === parseInt(hour) &&
                      appointmentDate.getDate() === day.getDate() &&
                      appointmentDate.getMonth() === day.getMonth() &&
                      appointmentDate.getFullYear() === day.getFullYear()
                    );
                  })
                  .map((appointment) => renderAppointmentItem(appointment))}
              </div>
            </div>
          ))}
        </div>
      )}
    </ScrollArea>
  );

  const renderWeekView = () => (
    <ScrollArea ref={scrollRef} className="w-full h-[calc(100vh-12rem)]">
      <div className="min-w-[800px] lg:min-w-[1200px]">
        <div className="flex sticky top-0 bg-white z-10">
          <div className="w-20 lg:w-24" />
          {weekDays.map((day, index) => (
            <div
              key={index}
              className={`flex-1 text-center p-2 text-sm lg:text-base font-semibold min-w-[100px] lg:min-w-[150px]
                ${
                  day.toDateString() === new Date().toDateString()
                    ? "bg-indigo-400 text-white rounded-md"
                    : ""
                }`}
            >
              <div>{day.toLocaleDateString("vi-VN", { weekday: "short" })}</div>
              <div>{day.getDate()}</div>
            </div>
          ))}
        </div>
        {hours.map((hour) => (
          <div key={hour} className="flex border-t-2 border-gray-200 h-20">
            <span className="w-20 lg:w-24 text-gray-500 py-2 sticky left-0 bg-white z-20 text-sm lg:text-base">
              {hour}
            </span>
            {weekDays.map((day, dayIndex) => (
              <div
                key={dayIndex}
                className="flex-1 relative border-l border-gray-100 min-w-[100px] lg:min-w-[150px]"
              >
                {appointments
                  .filter((appointment) => {
                    const appointmentDate = new Date(appointment.datetime);
                    return (
                      appointmentDate.getHours() === parseInt(hour) &&
                      appointmentDate.getDate() === day.getDate() &&
                      appointmentDate.getMonth() === day.getMonth() &&
                      appointmentDate.getFullYear() === day.getFullYear()
                    );
                  })
                  .map((appointment) => renderAppointmentItem(appointment))}
              </div>
            ))}
          </div>
        ))}
      </div>
      <ScrollBar orientation="horizontal" />
    </ScrollArea>
  );

  return (
    <Card className="w-full h-full bg-white shadow-sm rounded-xl font-inter">
      <CardHeader className="flex flex-col space-y-4 sm:flex-row sm:items-center sm:justify-between sm:space-y-0 p-4">
        <CardTitle className="text-base sm:text-lg font-bold text-zinc-800">
          <motion.p
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            {viewMode === "day"
              ? currentDate.toLocaleDateString("vi-VN", {
                  weekday: "long",
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })
              : `${weekDays[0].toLocaleDateString("vi-VN", {
                  month: "long",
                  day: "numeric",
                })} - ${weekDays[6].toLocaleDateString("vi-VN", {
                  month: "long",
                  day: "numeric",
                  year: "numeric",
                })}`}
          </motion.p>
        </CardTitle>

        <div className="flex items-center gap-2 font-semibold">
          <Button
            variant="outline"
            size="icon"
            onClick={() => navigateCalendar(viewMode === "day" ? -1 : -7)}
            disabled={isLoading}
            className="h-9 w-9"
          >
            <ChevronLeft className="h-5 w-5" />
          </Button>
          <Button
            variant="outline"
            onClick={goToday}
            disabled={isLoading}
            className="h-9"
          >
            {isLoading ? (
              <div className="flex items-center gap-2">
                <Loader2 className="h-4 w-4 animate-spin" />
                Đang tải...
              </div>
            ) : (
              "Hôm nay"
            )}
          </Button>
          <Button
            variant="outline"
            size="icon"
            onClick={() => navigateCalendar(viewMode === "day" ? 1 : 7)}
            disabled={isLoading}
            className="h-9 w-9"
          >
            <ChevronRight className="h-5 w-5" />
          </Button>
        </div>
      </CardHeader>

      <Separator />

      <CardContent className="p-4">
        <Tabs value={viewMode} onValueChange={setViewMode} className="w-full">
          <TabsList className="w-full mb-4">
            <TabsTrigger value="day" className="flex-1">
              Ngày
            </TabsTrigger>
            <TabsTrigger value="week" className="flex-1">
              Tuần
            </TabsTrigger>
          </TabsList>

          <AnimatePresence mode="wait">
            <TabsContent value="day" className="mt-0" key="day">
              {renderDayView(currentDate)}
            </TabsContent>
            <TabsContent value="week" className="mt-0" key="week">
              {renderWeekView()}
            </TabsContent>
          </AnimatePresence>
        </Tabs>
      </CardContent>

      <AnimatePresence>
        {isDialogOpen && selectedappointment && (
          <AppointmentDialog
            selectedappointment={selectedappointment}
            isDialogOpen={isDialogOpen}
            setIsDialogOpen={setIsDialogOpen}
          />
        )}
      </AnimatePresence>
    </Card>
  );
};

export default AppointmentCalendar;
