import { useMemo, useState } from "react";
import { ScrollView, Text } from "react-native";

import { useAdvancedAnalytics } from "../hooks/use_advanced_analytics";
import { HabitDetailScreen } from "./habit_detail_screen";

import { CategoryStatistics } from "../components/analytics/category_statistics";
import { AchievementList } from "../components/analytics/achievement_list";

import { analyticsStyles as styles } from "../styles/analytics.styles";

import { AnalyticHeader } from "./analytics/analytic_header";
import { AnalyticBody } from "./analytics/analytic_body";
import { AnalyticSelectedDay } from "./analytics/analytic_selected_day";
import { AnalyticYearlySummary } from "./analytics/analytic_yearly_summary";

import { getAnalyticData } from "./analytics/analytic_data";
import {
  handleMonthChange,
  handleYearChange,
} from "./analytics/analytic_handlers";

export function AnalyticsScreen() {
  const analytics = useAdvancedAnalytics();

  const [habitId, setHabitId] = useState<number | null>(null);
  const [habitTitle, setHabitTitle] = useState("");

  const data = useMemo(
    () => getAnalyticData(analytics),
    [
      analytics.calendar,
      analytics.yearly,
      analytics.categories,
      analytics.dayHabits,
    ],
  );

  const currentMonth = new Date(analytics.year, analytics.month - 1, 1);

  const openHabit = (id: number, title: string) => {
    setHabitId(id);
    setHabitTitle(title);
  };

  if (habitId !== null) {
    return (
      <HabitDetailScreen
        habitId={habitId}
        title={habitTitle}
        onBack={() => setHabitId(null)}
      />
    );
  }

  return (
    <ScrollView
      style={styles.screen}
      contentContainerStyle={styles.content}
      showsVerticalScrollIndicator={false}
    >
      <AnalyticHeader
        year={analytics.year}
        totalHabits={data.totalHabits}
        totalCompletions={data.annualCompletions}
        onYearChange={(nextYear) => handleYearChange(analytics, nextYear)}
      />

      <AnalyticBody
        currentMonth={currentMonth}
        completionDates={data.completionDates}
        selectedDate={analytics.selectedDate}
        onSelectDate={analytics.selectDate}
        onMonthChange={(nextMonth) => handleMonthChange(analytics, nextMonth)}
      />

      <AnalyticSelectedDay analytics={analytics} onOpenHabit={openHabit} />

      <AnalyticYearlySummary
        year={analytics.year}
        months={data.monthlyData}
        totalCompletions={data.annualCompletions}
        activeMonths={data.activeMonths}
        averageCompletion={data.averageCompletion}
      />

      <CategoryStatistics categories={data.categoryData} />

      <AchievementList achievements={data.achievementData} />

      <Text style={styles.footer}>
        Your progress is built one day at a time. ✨
      </Text>
    </ScrollView>
  );
}
