import { StyleSheet, Text, View } from "react-native";

import { COLORS } from "../../constants/theme";

interface Props {
  completed: number;
  total: number;
}

export function ProgressCard({ completed, total }: Props) {
  const percentage = total ? Math.round((completed / total) * 100) : 0;

  return (
    <View style={styles.card}>
      <Text style={styles.label}>DAILY PROGRESS</Text>
      <Text style={styles.title}>You're doing great! 🎯</Text>

      <View style={styles.row}>
        <Text style={styles.percentage}>{percentage}%</Text>
        <Text style={styles.description}>
          {completed} of {total} habits completed
        </Text>
      </View>

      <View style={styles.track}>
        <View style={[styles.fill, { width: `${percentage}%` }]} />
      </View>

      <Text style={styles.footer}>
        {percentage === 100
          ? "Amazing! All habits completed today."
          : "Every small step makes a difference."}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: COLORS.primary,
    borderRadius: 24,
    padding: 22,
    marginBottom: 20,
  },
  label: {
    color: "#D8D5FF",
    fontSize: 10,
    fontWeight: "800",
    letterSpacing: 1.5,
  },
  title: {
    color: COLORS.white,
    fontSize: 19,
    fontWeight: "800",
    marginTop: 8,
  },
  row: {
    flexDirection: "row",
    alignItems: "baseline",
    marginTop: 22,
    marginBottom: 12,
  },
  percentage: {
    color: COLORS.white,
    fontSize: 36,
    fontWeight: "800",
  },
  description: {
    color: "#E2E0FF",
    fontSize: 12,
    marginLeft: 10,
  },
  track: {
    height: 9,
    backgroundColor: "#9690FF",
    borderRadius: 10,
    overflow: "hidden",
  },
  fill: {
    height: "100%",
    backgroundColor: COLORS.white,
    borderRadius: 10,
  },
  footer: {
    color: "#E2E0FF",
    fontSize: 11,
    marginTop: 14,
  },
});
