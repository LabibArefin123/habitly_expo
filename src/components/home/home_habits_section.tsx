import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";

import { COLORS } from "../../constants/theme";
import { HabitCard } from "../habits/habit_card";

import type { Habit } from "../../types/habit.types";

interface Props {
  habits: Habit[];
  loading: boolean;
  completedToday: number;
  totalHabits: number;
  streakMap: Record<number, number>;
  onAdd: () => void;
  onToggle: (id: number) => void;
  onEdit: (habit: Habit) => void;
  onDelete: (habit: Habit) => void;
}

export function HomeHabitsSection({
  habits,
  loading,
  completedToday,
  totalHabits,
  streakMap,
  onAdd,
  onToggle,
  onEdit,
  onDelete,
}: Props) {
  const remaining = Math.max(0, totalHabits - completedToday);

  return (
    <View style={styles.container}>
      <View style={styles.sectionHeader}>
        <View style={styles.headingContainer}>
          <Text style={styles.sectionTitle}>Today's Habits</Text>

          <Text style={styles.sectionSubtitle}>
            {completedToday} completed · {remaining} remaining
          </Text>
        </View>

        <Pressable
          onPress={onAdd}
          style={styles.addButton}
          accessibilityRole="button"
          accessibilityLabel="Add a new habit"
        >
          <Text style={styles.addButtonText}>+ Add Habit</Text>
        </Pressable>
      </View>

      {loading ? (
        <Text style={styles.emptyText}>Loading habits...</Text>
      ) : habits.length === 0 ? (
        <View style={styles.emptyState}>
          <Text style={styles.emptyIcon}>🌱</Text>

          <Text style={styles.emptyTitle}>Start your journey!</Text>

          <Text style={styles.emptyText}>
            Create your first habit and start building a better routine.
          </Text>

          <Pressable
            onPress={onAdd}
            style={styles.createButton}
            accessibilityRole="button"
          >
            <Text style={styles.createButtonText}>Create First Habit</Text>
          </Pressable>
        </View>
      ) : (
        <ScrollView scrollEnabled={false} showsVerticalScrollIndicator={false}>
          {habits.map((habit) => (
            <HabitCard
              key={habit.id}
              habit={habit}
              streak={streakMap[habit.id] ?? 0}
              onToggle={() => onToggle(habit.id)}
              onEdit={() => onEdit(habit)}
              onDelete={() => onDelete(habit)}
            />
          ))}
        </ScrollView>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 28,
  },
  sectionHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 16,
  },
  headingContainer: {
    flex: 1,
  },
  sectionTitle: {
    color: COLORS.text,
    fontSize: 19,
    fontWeight: "800",
  },
  sectionSubtitle: {
    color: COLORS.muted,
    fontSize: 11,
    marginTop: 5,
  },
  addButton: {
    backgroundColor: COLORS.primaryLight,
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 12,
    marginLeft: 8,
  },
  addButtonText: {
    color: COLORS.primary,
    fontSize: 12,
    fontWeight: "800",
  },
  emptyState: {
    backgroundColor: COLORS.white,
    borderRadius: 22,
    padding: 25,
    alignItems: "center",
  },
  emptyIcon: {
    fontSize: 42,
  },
  emptyTitle: {
    color: COLORS.text,
    fontSize: 17,
    fontWeight: "800",
    marginTop: 15,
  },
  emptyText: {
    color: COLORS.muted,
    fontSize: 12,
    textAlign: "center",
    marginTop: 9,
    lineHeight: 19,
  },
  createButton: {
    backgroundColor: COLORS.primary,
    padding: 14,
    borderRadius: 12,
    marginTop: 18,
  },
  createButtonText: {
    color: COLORS.white,
    fontWeight: "800",
    fontSize: 12,
  },
});
