import { StyleSheet, Text, View } from "react-native";

import { COLORS } from "../../constants/theme";
import type { WeeklyProgress } from "../../types/habit.types";

interface Props {
  data: WeeklyProgress[];
}

export function WeeklyChart({ data }: Props) {
  const average = data.length
    ? Math.round(
        data.reduce((sum, item) => sum + item.percentage, 0) / data.length,
      )
    : 0;

  return (
    <View style={styles.card}>
      <View style={styles.header}>
        <View>
          <Text style={styles.title}>Weekly Overview</Text>
          <Text style={styles.subtitle}>Your last 7 days of consistency</Text>
        </View>

        <View style={styles.averageBox}>
          <Text style={styles.average}>{average}%</Text>
          <Text style={styles.averageLabel}>Average</Text>
        </View>
      </View>

      <View style={styles.chart}>
        {data.map((item) => (
          <View key={item.date} style={styles.column}>
            <Text style={styles.percentage}>
              {item.total > 0 ? `${item.percentage}%` : "—"}
            </Text>

            <View style={styles.track}>
              <View
                style={[
                  styles.bar,
                  {
                    height: `${item.percentage}%`,
                  },
                ]}
              />
            </View>

            <Text style={styles.day}>{item.day}</Text>
          </View>
        ))}
      </View>

      <View style={styles.legend}>
        <View style={styles.dot} />
        <Text style={styles.legendText}>Daily completion rate</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: COLORS.white,
    borderRadius: 22,
    padding: 20,
    marginTop: 20,
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
    fontSize: 18,
    fontWeight: "800",
  },
  subtitle: {
    color: COLORS.muted,
    fontSize: 11,
    marginTop: 5,
  },
  averageBox: {
    backgroundColor: COLORS.primaryLight,
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 12,
    alignItems: "center",
  },
  average: {
    color: COLORS.primary,
    fontSize: 17,
    fontWeight: "900",
  },
  averageLabel: {
    color: COLORS.muted,
    fontSize: 9,
    marginTop: 2,
  },
  chart: {
    height: 170,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-end",
    marginTop: 20,
  },
  column: {
    flex: 1,
    alignItems: "center",
  },
  percentage: {
    color: COLORS.muted,
    fontSize: 9,
    marginBottom: 7,
  },
  track: {
    width: 23,
    height: 105,
    backgroundColor: "#F0F0F8",
    borderRadius: 12,
    justifyContent: "flex-end",
    overflow: "hidden",
  },
  bar: {
    width: "100%",
    backgroundColor: COLORS.primary,
    borderRadius: 12,
  },
  day: {
    color: COLORS.muted,
    fontSize: 10,
    fontWeight: "700",
    marginTop: 10,
  },
  legend: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 18,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 5,
    backgroundColor: COLORS.primary,
  },
  legendText: {
    color: COLORS.muted,
    fontSize: 10,
    marginLeft: 7,
  },
});
