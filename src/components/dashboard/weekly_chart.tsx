import { useState } from "react";
import { Alert, Pressable, Text, View } from "react-native";
import { useSQLiteContext } from "expo-sqlite";

import { COLORS } from "../../constants/theme";
import { getHabitsForDate } from "../../database/advanced_analytics_queries";
import type { DayHabit } from "../../types/analytics.types";
import type { WeeklyProgress } from "../../types/habit.types";

import { weeklyChartStyles as styles } from "../../styles/dashboard_part/weekly_chart.styles";
import { WeeklyDayModal } from "./weekly_day_modal";

interface Props {
  data: WeeklyProgress[];
}

export function WeeklyChart({ data }: Props) {
  const db = useSQLiteContext();

  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [selectedHabits, setSelectedHabits] = useState<DayHabit[]>([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [loadingDay, setLoadingDay] = useState(false);

  const average = data.length
    ? Math.round(
        data.reduce((sum, item) => sum + item.percentage, 0) / data.length,
      )
    : 0;

  const openDay = async (date: string) => {
    setSelectedDate(date);
    setSelectedHabits([]);
    setModalVisible(true);
    setLoadingDay(true);

    try {
      const habits = await getHabitsForDate(db, date);
      setSelectedHabits(habits);
    } catch (error) {
      console.error("Failed to load habits for selected day:", error);
      Alert.alert(
        "Unable to load habits",
        "Please try selecting this day again.",
      );
    } finally {
      setLoadingDay(false);
    }
  };

  const closeModal = () => {
    setModalVisible(false);
  };

  return (
    <>
      <View style={styles.card}>
        <View style={styles.header}>
          <View>
            <Text style={styles.title}>Weekly Overview</Text>
            <Text style={styles.subtitle}>Tap a day to review your habits</Text>
          </View>

          <View style={styles.averageBox}>
            <Text style={styles.average}>{average}%</Text>
            <Text style={styles.averageLabel}>Average</Text>
          </View>
        </View>

        <View style={styles.chart}>
          {data.map((item) => (
            <Pressable
              key={item.date}
              style={styles.column}
              onPress={() => void openDay(item.date)}
              accessibilityRole="button"
              accessibilityLabel={`View habits for ${item.day}, ${item.date}`}
            >
              <Text style={styles.percentage}>
                {item.total > 0 ? `${item.percentage}%` : "—"}
              </Text>

              <View style={styles.track}>
                <View
                  style={[
                    styles.bar,
                    {
                      height: `${Math.min(100, Math.max(0, item.percentage))}%`,
                    },
                  ]}
                />
              </View>

              <Text style={styles.day}>{item.day}</Text>
            </Pressable>
          ))}
        </View>

        <View style={styles.legend}>
          <View style={styles.dot} />
          <Text style={styles.legendText}>Daily completion rate</Text>
        </View>
      </View>

      <WeeklyDayModal
        visible={modalVisible}
        date={selectedDate}
        habits={selectedHabits}
        loading={loadingDay}
        onClose={closeModal}
      />
    </>
  );
}
