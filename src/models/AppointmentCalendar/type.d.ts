export interface IAppointment {
  id: number;
  department: string;
  departmentCode: string;
  datetime: string;
  staff: IStaff;
  purpose: string;
  note: string;
  status: string;
}

export interface IAppointmentCalendarProps {
  appointments: IAppointment[];
  onWeekChange: () => void;
  isLoading: boolean;
}

export interface IStaff {
  id: number;
  name: string;
  position: string;
  email: string;
  phoneNumber: string;
}
