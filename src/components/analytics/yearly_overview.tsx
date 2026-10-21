import { StyleSheet, Text, View } from "react-native";

import { COLORS } from "../../constants/theme";

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

const styles = StyleSheet.create({
  card: {
    backgroundColor: COLORS.white,
    borderRadius: 20,
    padding: 17,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  title: {
    color: COLORS.text,
    fontSize: 15,
    fontWeight: "800",
  },
  subtitle: {
    color: COLORS.muted,
    fontSize: 11,
    marginTop: 4,
  },
  year: {
    color: COLORS.primary,
    fontSize: 13,
    fontWeight: "800",
    backgroundColor: COLORS.primaryLight,
    paddingHorizontal: 11,
    paddingVertical: 7,
    borderRadius: 10,
  },
  summary: {
    flexDirection: "row",
    backgroundColor: COLORS.background,
    borderRadius: 15,
    padding: 15,
    marginTop: 20,
  },
  summaryItem: {
    flex: 1,
  },
  summaryValue: {
    color: COLORS.text,
    fontSize: 23,
    fontWeight: "900",
  },
  summaryLabel: {
    color: COLORS.muted,
    fontSize: 10,
    marginTop: 5,
  },
  summaryDivider: {
    width: 1,
    backgroundColor: COLORS.border,
    marginHorizontal: 15,
  },
  chartTitle: {
    color: COLORS.text,
    fontSize: 12,
    fontWeight: "800",
    marginTop: 23,
    marginBottom: 15,
  },
  chart: {
    height: 155,
    flexDirection: "row",
    alignItems: "flex-end",
    justifyContent: "space-between",
    gap: 5,
  },
  barColumn: {
    flex: 1,
    height: "100%",
    alignItems: "center",
    justifyContent: "flex-end",
  },
  barValue: {
    color: COLORS.muted,
    fontSize: 8,
    height: 15,
    marginBottom: 5,
  },
  barTrack: {
    width: "65%",
    height: 105,
    backgroundColor: COLORS.background,
    borderRadius: 7,
    justifyContent: "flex-end",
    overflow: "hidden",
  },
  barFill: {
    width: "100%",
    backgroundColor: COLORS.primary,
    borderRadius: 7,
    minHeight: 0,
  },
  monthLabel: {
    color: COLORS.muted,
    fontSize: 9,
    fontWeight: "600",
    marginTop: 8,
  },
  footer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 7,
    marginTop: 15,
  },
  legendDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: COLORS.primary,
  },
  footerText: {
    color: COLORS.muted,
    fontSize: 10,
  },
});
