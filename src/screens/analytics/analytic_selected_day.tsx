import { Pressable, Text, View } from "react-native";

import { COLORS } from "../../constants/theme";
import { useAdvancedAnalytics } from "../../hooks/use_advanced_analytics";
import { analyticsStyles as styles } from "../../styles/analytics.styles";

type AnalyticsData = ReturnType<typeof useAdvancedAnalytics>;

type AnalyticSelectedDayProps = {
  analytics: AnalyticsData;
  onOpenHabit: (id: number, title: string) => void;
};

export function AnalyticSelectedDay({
  analytics,
  onOpenHabit,
}: AnalyticSelectedDayProps) {
  const selected = analytics.calendar.find(
    (item) => item.date === analytics.selectedDate,
  );

  return (
    <>
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
              onPress={() => onOpenHabit(habit.id, habit.title)}
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
    </>
  );
}
