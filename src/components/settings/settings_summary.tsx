import { Text, View } from "react-native";
import type { SettingsOverview } from "../../hooks/use_settings";
import { settingsStyles as styles } from "../../styles/settings.styles";

interface SettingsSummaryProps {
  overview: SettingsOverview;
}

export function SettingsSummary({ overview }: SettingsSummaryProps) {
  return (
    <View style={styles.summaryCard}>
      <View style={styles.summaryHeader}>
        <View>
          <Text style={styles.summaryEyebrow}>YOUR JOURNEY</Text>
          <Text style={styles.summaryTitle}>Personal progress</Text>
        </View>

        <Text style={styles.summaryIcon}>🌱</Text>
      </View>

      <View style={styles.statsRow}>
        <View style={styles.stat}>
          <Text style={styles.statValue}>{overview.totalHabits}</Text>
          <Text style={styles.statLabel}>Habits</Text>
        </View>

        <View style={styles.statDivider} />

        <View style={styles.stat}>
          <Text style={styles.statValue}>{overview.totalCompletions}</Text>
          <Text style={styles.statLabel}>Completions</Text>
        </View>

        <View style={styles.statDivider} />

        <View style={styles.stat}>
          <Text style={styles.statValue}>{overview.activeDays}</Text>
          <Text style={styles.statLabel}>Active days</Text>
        </View>
      </View>
    </View>
  );
}
