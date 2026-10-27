import { AnalyticsHeader } from "../../components/analytics/analytics_header";

type AnalyticHeaderProps = {
  year: number;
  totalHabits: number;
  totalCompletions: number;
  onYearChange: (nextYear: number) => void;
};

export function AnalyticHeader({
  year,
  totalHabits,
  totalCompletions,
  onYearChange,
}: AnalyticHeaderProps) {
  return (
    <AnalyticsHeader
      year={year}
      totalHabits={totalHabits}
      totalCompletions={totalCompletions}
      onYearChange={onYearChange}
    />
  );
}
