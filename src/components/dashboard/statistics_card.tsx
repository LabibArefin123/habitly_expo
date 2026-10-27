import { Text, View } from "react-native";
import { statisticsCardStyles as styles } from "../../styles/dashboard_part/statistics_card.styles";

interface Props {
  title: string;
  value: string | number;
  subtitle: string;
  icon: string;
  color: string;
}

export function StatisticsCard({ title, value, subtitle, icon, color }: Props) {
  return (
    <View style={styles.card}>
      <View style={[styles.iconBox, { backgroundColor: color + "18" }]}>
        <Text style={styles.icon}>{icon}</Text>
      </View>

      <Text style={styles.title}>{title}</Text>
      <Text style={styles.value}>{value}</Text>
      <Text style={styles.subtitle}>{subtitle}</Text>
    </View>
  );
}
