import { Pressable, Text, View } from "react-native";

import { HabitCard } from "../habits/habit_card";
import { homeStyles as styles } from "../../styles/home.styles";

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
    <View style={styles.habitsContainer}>
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
        <View>
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
        </View>
      )}
    </View>
  );
}
