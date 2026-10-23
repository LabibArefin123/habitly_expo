import { useState } from "react";
import { Alert, Pressable, StyleSheet, Text, View } from "react-native";
import { COLORS } from "../../constants/theme";
import type { Habit } from "../../types/habit.types";
import { habitCardStyles as styles } from "../../styles/habit.styles";

interface Props {
  habit: Habit;
  streak: number;
  onToggle: () => void;
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
    <View style={styles.card}>
      <View style={[styles.icon, { backgroundColor: `${habit.color}18` }]}>
        <Text style={styles.emoji}>{habit.icon}</Text>
      </View>

      <Pressable
        style={styles.details}
        onPress={onEdit}
        accessibilityRole="button"
        accessibilityLabel={`Edit ${habit.title}`}
      >
        <Text style={[styles.title, completed && styles.done]}>
          {habit.title}
        </Text>
        <Text style={styles.description}>
          {habit.description || "Keep building your habit"}
        </Text>
        <View style={styles.streakRow}>
          <Text style={styles.streakIcon}>🔥</Text>
          <Text style={styles.streakText}>
            {streak} {streak === 1 ? "day" : "days"} streak
          </Text>
        </View>
      </Pressable>

      <Pressable
        style={[
          styles.check,
          completed && styles.checked,
          toggling && styles.disabled,
        ]}
        onPress={handleToggle}
        disabled={toggling}
        accessibilityRole="checkbox"
        accessibilityState={{ checked: completed, disabled: toggling }}
        accessibilityLabel={`Mark ${habit.title} as ${completed ? "incomplete" : "complete"}`}
        hitSlop={8}
      >
        <Text style={styles.checkText}>{completed ? "✓" : ""}</Text>
      </Pressable>

      <Pressable
        style={styles.more}
        onPress={onDelete}
        accessibilityRole="button"
        accessibilityLabel={`Delete ${habit.title}`}
        hitSlop={8}
      >
        <Text style={styles.moreText}>•••</Text>
      </Pressable>
    </View>
  );
}

