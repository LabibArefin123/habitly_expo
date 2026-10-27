import { Pressable, Text, View } from "react-native";
import { analyticsHeaderStyles as styles } from "../../styles/analytics_part/analytics_header.styles";
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
