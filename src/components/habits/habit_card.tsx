import { useState } from "react";
import { Alert, Pressable, Text, View } from "react-native";

import type { Habit } from "../../types/habit.types";
import { habitCardStyles, habitCardStatusStyles } from "../../styles/habit";

interface Props {
  habit: Habit;
  streak: number;
  onToggle: () => void | Promise<void>;
  onEdit: () => void;
  onDelete: () => void;
}

export function HabitCard({
  habit,
  streak,
  onToggle,
  onEdit,
  onDelete,
}: Props) {
  const completed = Number(habit.completed) === 1;
  const [toggling, setToggling] = useState(false);

  const handleToggle = async () => {
    if (toggling) return;

    setToggling(true);

    try {
      await onToggle();
    } catch {
      Alert.alert("Error", "Unable to update this habit. Please try again.");
    } finally {
      setToggling(false);
    }
  };

  return (
    <View style={habitCardStyles.card}>
      <View
        style={[habitCardStyles.icon, { backgroundColor: `${habit.color}18` }]}
      >
        <Text style={habitCardStyles.emoji}>{habit.icon}</Text>
      </View>

      <Pressable
        style={habitCardStyles.details}
        onPress={onEdit}
        accessibilityRole="button"
        accessibilityLabel={`Edit ${habit.title}`}
      >
        <Text
          style={[habitCardStyles.title, completed && habitCardStyles.done]}
        >
          {habit.title}
        </Text>

        <Text style={habitCardStyles.description}>
          {habit.description || "Keep building your habit"}
        </Text>

        <View style={habitCardStyles.streakRow}>
          <Text style={habitCardStyles.streakIcon}>🔥</Text>

          <Text style={habitCardStyles.streakText}>
            {streak} {streak === 1 ? "day" : "days"} streak
          </Text>
        </View>
      </Pressable>

      <Pressable
        style={[
          habitCardStatusStyles.check,
          completed && habitCardStatusStyles.checked,
          toggling && habitCardStatusStyles.disabled,
        ]}
        onPress={handleToggle}
        disabled={toggling}
        accessibilityRole="checkbox"
        accessibilityState={{
          checked: completed,
          disabled: toggling,
        }}
        accessibilityLabel={`Mark ${habit.title} as ${
          completed ? "incomplete" : "complete"
        }`}
        hitSlop={8}
      >
        <Text style={habitCardStatusStyles.checkText}>
          {completed ? "✓" : ""}
        </Text>
      </Pressable>

      <Pressable
        style={habitCardStatusStyles.more}
        onPress={onDelete}
        accessibilityRole="button"
        accessibilityLabel={`Delete ${habit.title}`}
        hitSlop={8}
      >
        <Text style={habitCardStatusStyles.moreText}>•••</Text>
      </Pressable>
    </View>
  );
}
