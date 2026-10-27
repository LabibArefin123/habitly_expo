import { Text, View } from "react-native";
import { weeklyChartStyles as styles } from "../../styles/dashboard_part/weekly_chart.styles";
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
