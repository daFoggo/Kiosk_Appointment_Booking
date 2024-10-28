import { IAppointment } from "../AppointmentCalendar/type";

export interface IAppointmentDialogProps {
  selectedappointment: IAppointment;
  isDialogOpen: boolean;
  setIsDialogOpen: (value: boolean) => void;
}
