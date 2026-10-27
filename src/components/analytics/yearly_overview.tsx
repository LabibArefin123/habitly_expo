import { Text, View } from "react-native";
import { yearlyOverviewStyles as styles } from "../../styles/analytics_part/yearly_overview.styles";
export interface MonthlyOverview {
  month: string;
  completed: number;
  total: number;
  percentage: number;
}

interface Props {
  year: number;
  months: MonthlyOverview[];
  totalCompletions: number;
  averageCompletion: number;
}

export function YearlyOverview({
  year,
  months,
  totalCompletions,
  averageCompletion,
}: Props) {
  const validMonths = months.slice(0, 12);

  return (
    <View style={styles.card}>
      <View style={styles.header}>
        <View>
          <Text style={styles.title}>Yearly Overview</Text>
          <Text style={styles.subtitle}>Your progress throughout {year}</Text>
        </View>

        <Text style={styles.year}>{year}</Text>
      </View>

      <View style={styles.summary}>
        <View style={styles.summaryItem}>
          <Text style={styles.summaryValue}>{totalCompletions}</Text>
          <Text style={styles.summaryLabel}>Total completions</Text>
        </View>

        <View style={styles.summaryDivider} />

        <View style={styles.summaryItem}>
          <Text style={styles.summaryValue}>
            {Math.round(averageCompletion)}%
          </Text>
          <Text style={styles.summaryLabel}>Average completion</Text>
        </View>
      </View>

      <Text style={styles.chartTitle}>Monthly completion rate</Text>

      <View style={styles.chart}>
        {validMonths.map((item, index) => {
          const percentage = Math.min(100, Math.max(0, item.percentage));

          return (
            <View key={`${item.month}-${index}`} style={styles.barColumn}>
              <Text style={styles.barValue}>
                {percentage > 0 ? `${Math.round(percentage)}%` : ""}
              </Text>

              <View style={styles.barTrack}>
                <View style={[styles.barFill, { height: `${percentage}%` }]} />
              </View>

              <Text style={styles.monthLabel}>{item.month.slice(0, 3)}</Text>
            </View>
          );
        })}
      </View>

      <View style={styles.footer}>
        <View style={styles.legendDot} />
        <Text style={styles.footerText}>Monthly habit completion</Text>
      </View>
    </View>
  );
}
