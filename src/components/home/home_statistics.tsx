import { Text, View } from "react-native";
import { homeStatisticsStyles as styles } from "../../styles/home_part/home_statistics.styles";

import { ProgressCard } from "../dashboard/progress_card";
import { StatisticsCard } from "../dashboard/statistics_card";
import { WeeklyChart } from "../dashboard/weekly_chart";

import type { Statistics, WeeklyProgress } from "../../types/habit.types";

interface Props {
  statistics: Statistics;
  weeklyProgress: WeeklyProgress[];
}

export function HomeStatistics({ statistics, weeklyProgress }: Props) {
  return (
    <View>
      <ProgressCard
        completed={statistics.completedToday}
        total={statistics.totalHabits}
      />

      <View style={styles.sectionHeader}>
        <View>
          <Text style={styles.sectionTitle}>Your Statistics</Text>
          <Text style={styles.sectionSubtitle}>
            Track your personal achievements.
          </Text>
        </View>
      </View>

      <View style={styles.statsGrid}>
        <StatisticsCard
          title="Current Streak"
          value={`${statistics.currentStreak} days`}
          subtitle="Best active habit"
          icon="🔥"
          color="#FF9F43"
        />

        <StatisticsCard
          title="Best Streak"
          value={`${statistics.longestStreak} days`}
          subtitle="Personal record"
          icon="🏆"
          color="#F5B942"
        />

        <StatisticsCard
          title="Completions"
          value={statistics.totalCompletions}
          subtitle="All-time completed"
          icon="✅"
          color="#20B486"
        />

        <StatisticsCard
          title="Weekly Progress"
          value={`${statistics.weeklyCompletion}%`}
          subtitle="Last 7 days"
          icon="📊"
          color="#6C63FF"
        />
      </View>

      <WeeklyChart data={weeklyProgress} />
    </View>
  );
}
