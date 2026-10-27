import { useAdvancedAnalytics } from "../../hooks/use_advanced_analytics";

type AnalyticsData = ReturnType<typeof useAdvancedAnalytics>;

export function handleYearChange(analytics: AnalyticsData, nextYear: number) {
  const monthDifference = (nextYear - analytics.year) * 12;

  if (monthDifference !== 0) {
    analytics.changeMonth(monthDifference);
  }
}

export function handleMonthChange(analytics: AnalyticsData, nextMonth: Date) {
  const currentMonth = new Date(analytics.year, analytics.month - 1, 1);

  const difference =
    (nextMonth.getFullYear() - currentMonth.getFullYear()) * 12 +
    nextMonth.getMonth() -
    currentMonth.getMonth();

  if (difference !== 0) {
    analytics.changeMonth(difference);
  }
}
