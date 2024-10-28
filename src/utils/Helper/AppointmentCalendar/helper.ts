export const generateHours = () =>
  Array.from(
    { length: 13 },
    (_, i) => `${(i + 7).toString().padStart(2, "0")}:00`
  );

export const generateWeekDays = (date: Date) => {
  const week = [];
  const monday = new Date(date);
  const diff = date.getDay() === 0 ? -6 : 1 - date.getDay();
  monday.setDate(date.getDate() + diff);

  for (let i = 0; i < 7; i++) {
    const day = new Date(monday);
    day.setDate(monday.getDate() + i);
    week.push(day);
  }
  return week;
};

// Status utilities

export const getStatusColor = (
  status: "pending" | "confirmed" | "deleted" | "finished"
) => {
  const statusColors = {
    pending: "bg-yellow-100 text-yellow-500 hover:bg-yellow-200",
    confirmed: "bg-emerald-100 text-emerald-500 hover:bg-emerald-200",
    deleted: "bg-red-100 text-red-500 hover:bg-red-200",
    finished: "bg-indigo-100 text-indigo-500 hover:bg-indigo-200",
  };
  return statusColors[status] || "bg-gray-100 text-gray-500 hover:bg-gray-200";
};

export const getAppointmentColor = (status: string) => {
  const colors = {
    confirmed: "bg-emerald-50 border-emerald-500 hover:bg-emerald-100",
    pending: "bg-yellow-50 border-yellow-500 hover:bg-yellow-100",
    finished: "bg-indigo-50 border-indigo-500 hover:bg-indigo-100",
    default: "bg-gray-50 border-gray-500 hover:bg-gray-100",
  };
  return colors[status as keyof typeof colors] || colors.default;
};
