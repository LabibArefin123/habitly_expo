import { Pressable, Text, View } from "react-native";

import type { Habit } from "../../../types/habit.types";
import { habitFormLayoutStyles as styles } from "../../../styles/habit";

type Props = {
  habit?: Habit | null;
  onClose: () => void;
};

export function HabitFormHeader({ habit, onClose }: Props) {
  return (
    <View style={styles.header}>
      <View>
        <Text style={styles.heading}>
          {habit ? "Edit Habit" : "Create Habit"}
        </Text>
        <Text style={styles.headerSubtitle}>Build a better daily routine</Text>
      </View>

      <Pressable
        onPress={onClose}
        style={styles.closeButton}
        accessibilityRole="button"
        accessibilityLabel="Close habit form"
      >
        <Text style={styles.close}>✕</Text>
      </Pressable>
    </View>
  );
}
