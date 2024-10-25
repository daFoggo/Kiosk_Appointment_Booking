export interface ITimeSelectorProps {
  workingDays: number[];
  workingHours: number[];
  onSelect: (date: string, time: string) => void;
}
