import { useCallback } from "react";
import { Alert, FlatList, Text, View } from "react-native";

import type { Habit } from "../../types/habit.types";
import { HabitCard } from "./habit_card";
import { habitListStyles as styles } from "../../styles/habit";

interface Props {
  habits: Habit[];
  streaks?: Record<string, number>;
  onToggle: (habit: Habit) => void | Promise<void>;
  onEdit: (habit: Habit) => void;
  onDelete: (habit: Habit) => void | Promise<void>;
}

export function HabitList({
  habits,
  streaks = {},
  onToggle,
  onEdit,
  onDelete,
}: Props) {
  const handleDelete = useCallback(
    (habit: Habit) => {
      Alert.alert(
        "Delete Habit",
        `Are you sure you want to delete "${habit.title}"?`,
        [
          {
            text: "Cancel",
            style: "cancel",
          },
          {
            text: "Delete",
            style: "destructive",
            onPress: () => {
              void Promise.resolve(onDelete(habit)).catch(() => {
                Alert.alert(
                  "Error",
                  "Unable to delete this habit. Please try again.",
                );
              });
            },
          },
        ],
      );
    },
    [onDelete],
  );

  const renderHabit = useCallback(
    ({ item }: { item: Habit }) => (
      <HabitCard
        habit={item}
        streak={streaks[String(item.id)] ?? 0}
        onToggle={() => onToggle(item)}
        onEdit={() => onEdit(item)}
        onDelete={() => handleDelete(item)}
      />
    ),
    [streaks, onToggle, onEdit, handleDelete],
  );

  const renderEmpty = () => (
    <View style={styles.emptyContainer}>
      <Text style={styles.emptyIcon}>🌱</Text>

      <Text style={styles.emptyTitle}>No habits yet</Text>

      <Text style={styles.emptyDescription}>
        Start building a better routine. Create your first habit and track your
        progress every day.
      </Text>
    </View>
  );

  return (
    <FlatList
      data={habits}
      renderItem={renderHabit}
      keyExtractor={(item) => String(item.id)}
      showsVerticalScrollIndicator={false}
      contentContainerStyle={styles.list}
      ListEmptyComponent={renderEmpty}
      keyboardShouldPersistTaps="handled"
    />
  );
}
