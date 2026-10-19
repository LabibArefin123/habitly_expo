import { Pressable, StyleSheet, Text, View } from "react-native";

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
  const completed = habit.completed === 1;

  return (
    <View style={styles.card}>
      <View style={[styles.icon, { backgroundColor: habit.color + "18" }]}>
        <Text style={styles.emoji}>{habit.icon}</Text>
      </View>

      <Pressable style={styles.details} onPress={onEdit}>
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
        style={[styles.check, completed && styles.checked]}
        onPress={onToggle}
      >
        <Text style={styles.checkText}>{completed ? "✓" : ""}</Text>
      </Pressable>

      <Pressable style={styles.more} onPress={onDelete}>
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
    borderRadius: 14,
    alignItems: "center",
    justifyContent: "center",
  },
  emoji: {
    fontSize: 22,
  },
  details: {
    flex: 1,
    marginLeft: 12,
  },
  title: {
    color: COLORS.text,
    fontSize: 13,
    fontWeight: "800",
  },
  done: {
    textDecorationLine: "line-through",
    color: COLORS.muted,
  },
  description: {
    color: COLORS.muted,
    fontSize: 11,
    marginTop: 4,
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
    width: 30,
    height: 30,
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
  more: {
    paddingLeft: 12,
    paddingVertical: 8,
  },
  moreText: {
    color: COLORS.muted,
    fontWeight: "800",
  },
});
