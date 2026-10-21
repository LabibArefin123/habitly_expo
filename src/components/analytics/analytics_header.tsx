import { Pressable, StyleSheet, Text, View } from "react-native";

import { COLORS } from "../../constants/theme";

interface Props {
  year: number;
  totalHabits: number;
  totalCompletions: number;
  onYearChange: (year: number) => void;
}

export function AnalyticsHeader({
  year,
  totalHabits,
  totalCompletions,
  onYearChange,
}: Props) {
  return (
    <View style={styles.container}>
      <View style={styles.topRow}>
        <View>
          <Text style={styles.eyebrow}>YOUR PROGRESS</Text>
          <Text style={styles.title}>Analytics</Text>
          <Text style={styles.subtitle}>
            Track your growth and consistency.
          </Text>
        </View>

        <View style={styles.yearSelector}>
          <Pressable
            style={styles.yearButton}
            onPress={() => onYearChange(year - 1)}
            accessibilityLabel="Previous year"
          >
            <Text style={styles.arrow}>‹</Text>
          </Pressable>

          <Text style={styles.year}>{year}</Text>

          <Pressable
            style={styles.yearButton}
            onPress={() => onYearChange(year + 1)}
            accessibilityLabel="Next year"
          >
            <Text style={styles.arrow}>›</Text>
          </Pressable>
        </View>
      </View>

      <View style={styles.summary}>
        <View style={styles.summaryItem}>
          <Text style={styles.summaryValue}>{totalHabits}</Text>
          <Text style={styles.summaryLabel}>Total habits</Text>
        </View>

        <View style={styles.divider} />

        <View style={styles.summaryItem}>
          <Text style={styles.summaryValue}>{totalCompletions}</Text>
          <Text style={styles.summaryLabel}>Completions</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 20,
  },
  topRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    gap: 10,
  },
  eyebrow: {
    color: COLORS.primary,
    fontSize: 9,
    fontWeight: "900",
    letterSpacing: 1.5,
  },
  title: {
    color: COLORS.text,
    fontSize: 27,
    fontWeight: "900",
    marginTop: 5,
  },
  subtitle: {
    color: COLORS.muted,
    fontSize: 11,
    marginTop: 5,
  },
  yearSelector: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: COLORS.white,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: COLORS.border,
    paddingHorizontal: 5,
    paddingVertical: 4,
  },
  yearButton: {
    width: 27,
    height: 30,
    alignItems: "center",
    justifyContent: "center",
  },
  arrow: {
    color: COLORS.primary,
    fontSize: 22,
    fontWeight: "700",
  },
  year: {
    color: COLORS.text,
    fontSize: 12,
    fontWeight: "800",
    minWidth: 42,
    textAlign: "center",
  },
  summary: {
    flexDirection: "row",
    backgroundColor: COLORS.primary,
    borderRadius: 18,
    padding: 18,
    marginTop: 20,
  },
  summaryItem: {
    flex: 1,
  },
  summaryValue: {
    color: COLORS.white,
    fontSize: 25,
    fontWeight: "900",
  },
  summaryLabel: {
    color: "#E5E3FF",
    fontSize: 10,
    marginTop: 5,
  },
  divider: {
    width: 1,
    backgroundColor: "#FFFFFF40",
    marginHorizontal: 18,
  },
});
