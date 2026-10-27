import { useState } from "react";
import { Pressable, Text, View } from "react-native";
import { progressCardStyles as styles } from "../../styles/dashboard_part/progress_card.styles";
import { ProgressCardModal } from "./progress_card_modal";

interface Props {
  completed: number;
  total: number;
}

export function ProgressCard({ completed, total }: Props) {
  const [modalVisible, setModalVisible] = useState(false);

  const percentage = total
    ? Math.min(100, Math.max(0, Math.round((completed / total) * 100)))
    : 0;

  return (
    <>
      <Pressable
        style={({ pressed }) => [styles.card, pressed && { opacity: 0.85 }]}
        onPress={() => setModalVisible(true)}
        accessibilityRole="button"
        accessibilityLabel={`View daily progress, ${percentage}% completed`}
      >
        <Text style={styles.label}>DAILY PROGRESS</Text>
        <Text style={styles.title}>You're doing great! 🎯</Text>

        <View style={styles.row}>
          <Text style={styles.percentage}>{percentage}%</Text>
          <Text style={styles.description}>
            {completed} of {total} habits completed
          </Text>
        </View>

        <View style={styles.track}>
          <View style={[styles.fill, { width: `${percentage}%` }]} />
        </View>

        <Text style={styles.footer}>
          {percentage === 100
            ? "Amazing! All habits completed today."
            : "Every small step makes a difference."}
        </Text>
      </Pressable>

      <ProgressCardModal
        visible={modalVisible}
        completed={completed}
        total={total}
        percentage={percentage}
        onClose={() => setModalVisible(false)}
      />
    </>
  );
}
