import { MonthlyCalendar } from "../../components/analytics/monthly_calendar";

type AnalyticBodyProps = {
  currentMonth: Date;
  completionDates: string[];
  selectedDate: string;
  onSelectDate: (date: string) => void;
  onMonthChange: (nextMonth: Date) => void;
};

export function AnalyticBody({
  currentMonth,
  completionDates,
  selectedDate,
  onSelectDate,
  onMonthChange,
}: AnalyticBodyProps) {
  return (
    <MonthlyCalendar
      currentMonth={currentMonth}
      completionDates={completionDates}
      selectedDate={selectedDate}
      onSelectDate={onSelectDate}
      onMonthChange={onMonthChange}
    />
  );
}
