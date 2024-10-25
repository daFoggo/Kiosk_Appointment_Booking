"use client";

import { useState, useCallback } from "react";
import { format, addDays, startOfWeek, isSameDay, isBefore, startOfDay } from "date-fns";
import { vi } from "date-fns/locale";

import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

import { ITimeSelectorProps } from "@/models/TimeSelector/type";

const TimeSelector = ({
  workingDays,
  workingHours,
  onSelect,
}: ITimeSelectorProps) => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);

  // Generate time selection based on working hours
  const generateTimeSlots = useCallback(() => {
    const slots = [];
    const [startHour, endHour] = workingHours;

    for (let hour = startHour; hour <= endHour; hour++) {
      for (let minute = 0; minute < 60; minute += 30) {
        if (hour === endHour && minute > 0) continue;

        const time = new Date();
        time.setHours(hour);
        time.setMinutes(minute);
        slots.push(format(time, "HH:mm"));
      }
    }
    return slots;
  }, [workingHours]);

  const timeSlots = generateTimeSlots();

  // Week change button
  const handlePrevWeek = useCallback(() => {
    setCurrentDate((prev) => addDays(prev, -7));
  }, []);

  const handleNextWeek = useCallback(() => {
    setCurrentDate((prev) => addDays(prev, 7));
  }, []);

  const handleDateSelect = useCallback((date: Date) => {
    setSelectedDate(date);
    setSelectedTime(null);
  }, []);

  const handleTimeSelect = useCallback(
    (time: string) => {
      setSelectedTime(time);
      if (selectedDate) {
        setTimeout(() => {
          onSelect(format(selectedDate, "yyyy-MM-dd"), time);
        }, 0);
      }
    },
    [selectedDate, onSelect]
  );

  // Render week days based on working days
  const renderWeekDays = useCallback(() => {
    const weekStart = startOfWeek(currentDate, { weekStartsOn: 1 });
    const [startDay, endDay] = workingDays;
    const numDays = endDay - startDay + 1;
    const today = startOfDay(new Date()); 

    return Array.from({ length: numDays }).map((_, index) => {
      const date = addDays(weekStart, index);
      const isSelected = selectedDate && isSameDay(date, selectedDate);
      const isDisabled = isBefore(date, today); 

      return (
        <Button
          type="button"
          key={index}
          className={`flex-col items-center justify-center h-16 font-semibold ${
            isDisabled ? "opacity-50" : ""
          } ${
            isSelected
              ? "bg-indigo-400 hover:bg-indigo-500 hover:text-white/90"
              : "bg-white border text-zinc-800 hover:bg-zinc-100 hover:text-zinc-900"
          }`}
          onClick={(e) => {
            e.preventDefault();
            !isDisabled && handleDateSelect(date);
          }}
          disabled={isDisabled}
        >
          <div className="text-xs capitalize">{format(date, "EEE", { locale: vi })}</div>
          <div className="text-lg">{format(date, "d")}</div>
        </Button>
      );
    });
  }, [currentDate, selectedDate, workingDays, handleDateSelect]);

  return (
    <Card className="w-full mx-auto font-inter">
      <CardContent className="p-4">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold capitalize">
            {format(currentDate, "MMMM yyyy", { locale: vi })}
          </h2>
          <div className="flex gap-2">
            <Button
              type="button"
              variant="outline"
              size="icon"
              onClick={(e) => {
                e.preventDefault();
                handlePrevWeek();
              }}
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <Button
              type="button"
              variant="outline"
              size="icon"
              onClick={(e) => {
                e.preventDefault();
                handleNextWeek();
              }}
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
        <div className="grid grid-cols-6 gap-1 sm:gap-2 mb-4">
          {renderWeekDays()}
        </div>
        {selectedDate && (
          <ScrollArea className="h-48 w-full">
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-1 sm:gap-2 p-1">
              {timeSlots.map((time) => (
                <Button
                  type="button"
                  key={time}
                  className={`text-xs font-semibold sm:text-sm py-1 px-2 sm:py-2 sm:px-3 ${
                    selectedTime === time
                      ? "bg-indigo-400 hover:bg-indigo-500 hover:text-white/90"
                      : "bg-white border text-zinc-800 hover:bg-zinc-100 hover:text-zinc-900"
                  }`}
                  onClick={(e) => {
                    e.preventDefault();
                    handleTimeSelect(time);
                  }}
                >
                  {time}
                </Button>
              ))}
            </div>
          </ScrollArea>
        )}
      </CardContent>
    </Card>
  );
};

export default TimeSelector;
