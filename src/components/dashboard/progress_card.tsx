import { Text, View } from "react-native";
import { progressCardStyles as styles } from "../../styles/dashboard_part/progress_card.styles";

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
