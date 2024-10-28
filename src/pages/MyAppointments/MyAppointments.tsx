import { useState} from "react";
import AppointmentCalendar from "@/components/AppointmentCalendar/AppointmentCalendar";
import PageHeading from "@/components/PageHeading/PageHeading";
import { user } from "@/components/UserMenu/constant";

const MyAppointments = () => {
  const [appointmentList, setAppointmentList] = useState(user.appointmentList);
  const [isLoading, setIsLoading] = useState(false);

  const getAppointmentList = () => {
    setIsLoading(true);
    setTimeout(() => {
      setAppointmentList(user.appointmentList);
      setIsLoading(false);
    }, 300);
  };

  return (
    <div className="flex flex-col gap-6 min-h-screen bg-gray-50 rounded-xl p-2 sm:p-4 border">
      <PageHeading
        title="Lịch hẹn của tôi"
        description="Theo dõi các lịch hẹn bạn đã đặt"
      />

      <AppointmentCalendar
        appointments={appointmentList}
        onWeekChange={getAppointmentList}
        isLoading={isLoading}
      />
    </div>
  );
};

export default MyAppointments;
