import { useState } from "react";
import { Alert, Pressable, StyleSheet, Text, View } from "react-native";
import { COLORS } from "../../constants/theme";
import type { Habit } from "../../types/habit.types";

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

const styles = StyleSheet.create({
  card: {
    backgroundColor: COLORS.white,
    flexDirection: "row",
    alignItems: "center",
    padding: 14,
    borderRadius: 18,
    marginBottom: 11,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  icon: {
    width: 46,
    height: 46,
    flexShrink: 0,
    borderRadius: 14,
    alignItems: "center",
    justifyContent: "center",
  },
  emoji: {
    fontSize: 22,
  },
  details: {
    flex: 1,
    minWidth: 0,
    marginLeft: 12,
    marginRight: 10,
  },
  title: {
    color: COLORS.text,
    fontSize: 13,
    fontWeight: "800",
    flexShrink: 1,
  },
  done: {
    textDecorationLine: "line-through",
    color: COLORS.muted,
  },
  description: {
    color: COLORS.muted,
    fontSize: 11,
    lineHeight: 16,
    marginTop: 4,
    flexShrink: 1,
  },
  streakRow: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 6,
  },
  streakIcon: {
    fontSize: 11,
  },
  streakText: {
    color: COLORS.orange,
    fontSize: 10,
    fontWeight: "800",
    marginLeft: 4,
  },
  check: {
    width: 32,
    height: 32,
    flexShrink: 0,
    borderRadius: 10,
    borderWidth: 1.5,
    borderColor: "#DADDE8",
    alignItems: "center",
    justifyContent: "center",
  },
  checked: {
    backgroundColor: COLORS.green,
    borderColor: COLORS.green,
  },
  checkText: {
    color: COLORS.white,
    fontSize: 17,
    fontWeight: "800",
  },
  disabled: {
    opacity: 0.55,
  },
  more: {
    flexShrink: 0,
    paddingLeft: 10,
    paddingVertical: 8,
  },
  moreText: {
    color: COLORS.muted,
    fontWeight: "800",
  },
});
