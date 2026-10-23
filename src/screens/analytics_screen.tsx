import { useMemo, useState } from "react";
import { ScrollView, StyleSheet, Text, View, Pressable } from "react-native";

import { useAdvancedAnalytics } from "../hooks/use_advanced_analytics";
import { HabitDetailScreen } from "./habit_detail_screen";

import { COLORS } from "../constants/theme";

import { AnalyticsHeader } from "../components/analytics/analytics_header";
import { MonthlyCalendar } from "../components/analytics/monthly_calendar";
import { YearlyOverview } from "../components/analytics/yearly_overview";
import { CategoryStatistics } from "../components/analytics/category_statistics";
import { AchievementList } from "../components/analytics/achievement_list";
import { analyticsStyles as styles } from "../styles/analytics.styles";

export function AnalyticsScreen() {
  const analytics = useAdvancedAnalytics();

  const [habitId, setHabitId] = useState<number | null>(null);
  const [habitTitle, setHabitTitle] = useState("");

  // Open individual habit details.
  const openHabit = (id: number, title: string) => {
    setHabitId(id);
    setHabitTitle(title);
  };

  // Navigate to a selected year.
  const handleYearChange = (nextYear: number) => {
    const monthDifference = (nextYear - analytics.year) * 12;

    if (monthDifference !== 0) {
      analytics.changeMonth(monthDifference);
    }
  };

  // Navigate to a selected month.
  const handleMonthChange = (nextMonth: Date) => {
    const currentMonth = new Date(analytics.year, analytics.month - 1, 1);

    const difference =
      (nextMonth.getFullYear() - currentMonth.getFullYear()) * 12 +
      nextMonth.getMonth() -
      currentMonth.getMonth();

    if (difference !== 0) {
      analytics.changeMonth(difference);
    }
  };

  // Prepare monthly calendar data.
  const completionDates = useMemo(
    () =>
      analytics.calendar
        .filter((item) => item.percentage > 0)
        .map((item) => item.date),
    [analytics.calendar],
  );

  // Prepare yearly statistics.
  const annualCompletions = analytics.yearly.reduce(
    (sum, item) => sum + item.completed,
    0,
  );

  const activeMonths = analytics.yearly.filter(
    (item) => item.completed > 0,
  ).length;

  const averageCompletion = analytics.yearly.length
    ? Math.round(
        analytics.yearly.reduce((sum, item) => sum + item.percentage, 0) /
          analytics.yearly.length,
      )
    : 0;

  // Convert existing category query results to component props.
  const categoryData = useMemo(
    () =>
      analytics.categories.map((item) => ({
        category: item.category,
        habits: item.totalHabits,
        completions: item.completions,
        percentage: item.percentage,
      })),
    [analytics.categories],
  );

  // Convert existing yearly query results to component props.
  const monthlyData = useMemo(
    () =>
      analytics.yearly.map((item) => ({
        month: item.label,
        completed: item.completed,
        total: item.total,
        percentage: item.percentage,
      })),
    [analytics.yearly],
  );

  // Generate annual achievement progress.
  const achievementData = useMemo(() => {
    const milestones = [
      {
        id: "first-completion",
        title: "First Step",
        description: "Complete your first habit.",
        icon: "🌱",
        target: 1,
      },
      {
        id: "ten-completions",
        title: "Getting Started",
        description: "Reach 10 habit completions.",
        icon: "⭐",
        target: 10,
      },
      {
        id: "fifty-completions",
        title: "Consistency Builder",
        description: "Reach 50 habit completions.",
        icon: "🔥",
        target: 50,
      },
      {
        id: "hundred-completions",
        title: "Century Club",
        description: "Reach 100 habit completions.",
        icon: "🏆",
        target: 100,
      },
      {
        id: "active-months",
        title: "Yearly Dedication",
        description: "Stay active in all 12 months.",
        icon: "📅",
        target: 12,
      },
    ];

    return milestones.map((item) => {
      const current =
        item.id === "active-months" ? activeMonths : annualCompletions;

      return {
        id: item.id,
        title: item.title,
        description: item.description,
        icon: item.icon,
        unlocked: current >= item.target,
        progress: Math.min(100, Math.round((current / item.target) * 100)),
        target: 100,
      };
    });
  }, [annualCompletions, activeMonths]);

  // Show habit details instead of analytics.
  if (habitId !== null) {
    return (
      <HabitDetailScreen
        habitId={habitId}
        title={habitTitle}
        onBack={() => setHabitId(null)}
      />
    );
  }

  const selected = analytics.calendar.find(
    (item) => item.date === analytics.selectedDate,
  );

  const currentMonth = new Date(analytics.year, analytics.month - 1, 1);

  const totalHabits =
    analytics.dayHabits.length > 0
      ? analytics.dayHabits.length
      : Math.max(0, ...analytics.calendar.map((item) => item.total));

  return (
    <ScrollView
      style={styles.screen}
      contentContainerStyle={styles.content}
      showsVerticalScrollIndicator={false}
    >
      {/* Analytics Header */}
      <AnalyticsHeader
        year={analytics.year}
        totalHabits={totalHabits}
        totalCompletions={annualCompletions}
        onYearChange={handleYearChange}
      />

      {/* Monthly Calendar */}
      <MonthlyCalendar
        currentMonth={currentMonth}
        completionDates={completionDates}
        selectedDate={analytics.selectedDate}
        onSelectDate={analytics.selectDate}
        onMonthChange={handleMonthChange}
      />

      {/* Selected Day */}
      <View style={styles.sectionHeading}>
        <Text style={styles.sectionTitle}>Selected Day</Text>

        <Text style={styles.dateLabel}>{analytics.selectedDate}</Text>
      </View>

      <View style={styles.card}>
        <View style={styles.daySummary}>
          <Text style={styles.dayPercent}>{selected?.percentage ?? 0}%</Text>

          <View style={styles.daySummaryInfo}>
            <Text style={styles.daySummaryTitle}>Daily completion</Text>

            <Text style={styles.muted}>
              {selected?.completed ?? 0} of {selected?.total ?? 0} habits
              completed
            </Text>
          </View>
        </View>

        {analytics.dayHabits.length === 0 ? (
          <Text style={styles.empty}>
            No habits were created on or before this date.
          </Text>
        ) : (
          analytics.dayHabits.map((habit) => (
            <Pressable
              key={habit.id}
              style={styles.habitRow}
              onPress={() => openHabit(habit.id, habit.title)}
            >
              <View
                style={[
                  styles.habitIcon,
                  { backgroundColor: `${habit.color}20` },
                ]}
              >
                <Text style={styles.habitEmoji}>{habit.icon}</Text>
              </View>

              <View style={styles.habitInfo}>
                <Text style={styles.habitTitle}>{habit.title}</Text>

                <Text style={styles.muted}>
                  {habit.category || "Uncategorized"}
                </Text>
              </View>

              <Text
                style={[
                  styles.status,
                  {
                    color: habit.completed ? COLORS.green : COLORS.muted,
                  },
                ]}
              >
                {habit.completed ? "✓ Done" : "Pending"}
              </Text>
            </Pressable>
          ))
        )}
      </View>

      {/* Yearly Overview */}
      <YearlyOverview
        year={analytics.year}
        months={monthlyData}
        totalCompletions={annualCompletions}
        averageCompletion={averageCompletion}
      />

      {/* Annual Summary */}
      <View style={styles.metricsRow}>
        <View style={[styles.metric, styles.metricSpacing]}>
          <Text style={styles.metricValue}>{annualCompletions}</Text>

          <Text style={styles.metricLabel}>Completions</Text>
        </View>

        <View style={styles.metric}>
          <Text style={styles.metricValue}>{activeMonths}/12</Text>

          <Text style={styles.metricLabel}>Active months</Text>
        </View>
      </View>

      {/* Category Statistics */}
      <CategoryStatistics categories={categoryData} />

      {/* Achievements */}
      <AchievementList achievements={achievementData} />

      <Text style={styles.footer}>
        Your progress is built one day at a time. ✨
      </Text>
    </ScrollView>
  );
}

