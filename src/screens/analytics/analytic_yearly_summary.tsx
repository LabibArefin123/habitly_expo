import { Text, View } from "react-native";

import { YearlyOverview } from "../../components/analytics/yearly_overview";
import { analyticsStyles as styles } from "../../styles/analytics.styles";

type MonthlyData = {
  month: string;
  completed: number;
  total: number;
  percentage: number;
};

type AnalyticYearlySummaryProps = {
  year: number;
  months: MonthlyData[];
  totalCompletions: number;
  activeMonths: number;
  averageCompletion: number;
};

export function AnalyticYearlySummary({
  year,
  months,
  totalCompletions,
  activeMonths,
  averageCompletion,
}: AnalyticYearlySummaryProps) {
  return (
    <>
      <YearlyOverview
        year={year}
        months={months}
        totalCompletions={totalCompletions}
        averageCompletion={averageCompletion}
      />

      <View style={styles.metricsRow}>
        <View style={[styles.metric, styles.metricSpacing]}>
          <Text style={styles.metricValue}>{totalCompletions}</Text>

          <Text style={styles.metricLabel}>Completions</Text>
        </View>

        <View style={styles.metric}>
          <Text style={styles.metricValue}>{activeMonths}/12</Text>

          <Text style={styles.metricLabel}>Active months</Text>
        </View>
      </View>
    </>
  );
}
