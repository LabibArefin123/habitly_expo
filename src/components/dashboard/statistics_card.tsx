import { StyleSheet, Text, View } from "react-native";

import { COLORS } from "../../constants/theme";

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

const styles = StyleSheet.create({
  card: {
    flex: 1,
    minWidth: "45%",
    backgroundColor: COLORS.white,
    borderRadius: 18,
    padding: 15,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  iconBox: {
    width: 38,
    height: 38,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 12,
  },
  icon: {
    fontSize: 19,
  },
  title: {
    color: COLORS.muted,
    fontSize: 11,
    fontWeight: "600",
  },
  value: {
    color: COLORS.text,
    fontSize: 22,
    fontWeight: "900",
    marginTop: 5,
  },
  subtitle: {
    color: COLORS.muted,
    fontSize: 10,
    marginTop: 4,
  },
});
