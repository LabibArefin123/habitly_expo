import { ActivityIndicator, Text, View } from "react-native";

import { COLORS } from "../../constants/theme";
import { profileStatsStyles as styles } from "../../styles/profile";

interface Props {
  totalHabits: number;
  totalCompletions: number;
  activeDays: number;
  loading: boolean;
}

export function ProfileStats({
  totalHabits,
  totalCompletions,
  activeDays,
  loading,
}: Props) {
  return (
    <>
      <Text style={styles.sectionTitle}>My Progress</Text>

      {loading ? (
        <View style={styles.loading}>
          <ActivityIndicator color={COLORS.primary} />
          <Text style={styles.loadingText}>Loading your progress...</Text>
        </View>
      ) : (
        <View style={styles.grid}>
          <StatCard icon="🎯" value={totalHabits} label="Total habits" />

          <StatCard icon="✅" value={totalCompletions} label="Completions" />

          <StatCard icon="📅" value={activeDays} label="Active days" />
        </View>
      )}
    </>
  );
}

interface StatCardProps {
  icon: string;
  value: number;
  label: string;
}

function StatCard({ icon, value, label }: StatCardProps) {
  return (
    <View style={styles.card}>
      <Text style={styles.icon}>{icon}</Text>
      <Text style={styles.value}>{value}</Text>
      <Text style={styles.label}>{label}</Text>
    </View>
  );
}
