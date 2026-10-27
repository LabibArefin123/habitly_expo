import { useEffect, useMemo } from "react";
import {
  ActivityIndicator,
  Modal,
  Pressable,
  ScrollView,
  Text,
  View,
} from "react-native";

import { COLORS } from "../../constants/theme";
import type { DayHabit } from "../../types/analytics.types";
import { weeklyDayModalStyles as styles } from "../../styles/dashboard_part/weekly_day_modal.styles";

interface Props {
  visible: boolean;
  date: string | null;
  habits: DayHabit[];
  loading: boolean;
  onClose: () => void;
}

export function WeeklyDayModal({
  visible,
  date,
  habits,
  loading,
  onClose,
}: Props) {
  const formattedDate = useMemo(() => {
    if (!date) return "Selected day";

    const [year, month, day] = date.split("-").map(Number);
    const parsedDate = new Date(year, month - 1, day);

    return parsedDate.toLocaleDateString(undefined, {
      weekday: "long",
      month: "long",
      day: "numeric",
      year: "numeric",
    });
  }, [date]);

  useEffect(() => {
    if (!visible) return;
  }, [visible]);

  const completedHabits = habits.filter(
    (habit) => Number(habit.completed) === 1,
  );

  const incompleteHabits = habits.filter(
    (habit) => Number(habit.completed) !== 1,
  );

  const renderHabit = (habit: DayHabit, completed: boolean) => (
    <View key={String(habit.id)} style={styles.habitRow}>
      <View
        style={[
          styles.habitIcon,
          {
            backgroundColor: completed ? COLORS.greenLight : COLORS.background,
          },
        ]}
      >
        <Text style={styles.habitEmoji}>{habit.icon || "✨"}</Text>
      </View>

      <Text
        style={[styles.habitTitle, completed && styles.completedHabitTitle]}
      >
        {habit.title}
      </Text>

      <View
        style={[
          styles.statusBadge,
          completed ? styles.completedBadge : styles.incompleteBadge,
        ]}
      >
        <Text
          style={[
            styles.statusText,
            completed
              ? styles.completedStatusText
              : styles.incompleteStatusText,
          ]}
        >
          {completed ? "Done" : "Not done"}
        </Text>
      </View>
    </View>
  );

  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={onClose}
      statusBarTranslucent
    >
      <View style={styles.overlay}>
        <Pressable
          style={styles.backdrop}
          onPress={onClose}
          accessibilityLabel="Close daily habit details"
        />

        <View style={styles.modal}>
          <View style={styles.header}>
            <View style={styles.headerText}>
              <Text style={styles.eyebrow}>DAILY SUMMARY</Text>
              <Text style={styles.title}>Your habits</Text>
              <Text style={styles.date}>{formattedDate}</Text>
            </View>

            <Pressable
              style={styles.closeButton}
              onPress={onClose}
              accessibilityRole="button"
              accessibilityLabel="Close modal"
              hitSlop={8}
            >
              <Text style={styles.closeText}>×</Text>
            </Pressable>
          </View>

          {loading ? (
            <View style={styles.loading}>
              <ActivityIndicator size="large" color={COLORS.primary} />
              <Text style={styles.loadingText}>Loading your habits...</Text>
            </View>
          ) : (
            <ScrollView
              style={styles.list}
              contentContainerStyle={styles.listContent}
              showsVerticalScrollIndicator={false}
            >
              <View style={styles.summaryRow}>
                <View style={styles.summaryCard}>
                  <Text style={styles.summaryNumber}>
                    {completedHabits.length}
                  </Text>
                  <Text style={styles.summaryLabel}>Completed</Text>
                </View>

                <View style={styles.summaryCard}>
                  <Text style={styles.summaryNumber}>
                    {incompleteHabits.length}
                  </Text>
                  <Text style={styles.summaryLabel}>Not completed</Text>
                </View>
              </View>

              <View style={styles.section}>
                <View style={styles.sectionHeader}>
                  <Text style={styles.sectionTitle}>Completed</Text>
                  <Text style={styles.sectionCount}>
                    {completedHabits.length}
                  </Text>
                </View>

                {completedHabits.length ? (
                  completedHabits.map((habit) => renderHabit(habit, true))
                ) : (
                  <Text style={styles.emptyText}>
                    No habits completed on this day.
                  </Text>
                )}
              </View>

              <View style={styles.section}>
                <View style={styles.sectionHeader}>
                  <Text style={styles.sectionTitle}>Not completed</Text>
                  <Text style={styles.sectionCount}>
                    {incompleteHabits.length}
                  </Text>
                </View>

                {incompleteHabits.length ? (
                  incompleteHabits.map((habit) => renderHabit(habit, false))
                ) : (
                  <Text style={styles.emptyText}>
                    Great work! Nothing left incomplete.
                  </Text>
                )}
              </View>
            </ScrollView>
          )}
        </View>
      </View>
    </Modal>
  );
}
