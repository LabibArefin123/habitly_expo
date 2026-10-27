
import { Modal, Pressable, ScrollView, Text, View } from "react-native";
import { progressCardModalStyles as styles } from "../../styles/dashboard_part/progress_card_modal.styles";

interface Props {
  visible: boolean;
  completed: number;
  total: number;
  percentage: number;
  onClose: () => void;
}

export function ProgressCardModal({
  visible,
  completed,
  total,
  percentage,
  onClose,
}: Props) {
  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      statusBarTranslucent
      onRequestClose={onClose}
    >
      <View style={styles.overlay}>
        <Pressable
          style={styles.backdrop}
          onPress={onClose}
          accessibilityLabel="Close daily progress details"
        />

        <View style={styles.modal}>
          <ScrollView
            showsVerticalScrollIndicator={false}
            contentContainerStyle={styles.content}
          >
            <View style={styles.header}>
              <Text style={styles.icon}>🎯</Text>

              <Pressable
                onPress={onClose}
                style={styles.closeButton}
                accessibilityRole="button"
                accessibilityLabel="Close modal"
              >
                <Text style={styles.closeText}>×</Text>
              </Pressable>
            </View>

            <Text style={styles.eyebrow}>YOUR DAILY SUMMARY</Text>
            <Text style={styles.title}>Daily Progress</Text>

            <Text style={styles.percentage}>{percentage}%</Text>
            <Text style={styles.subtitle}>
              {completed} of {total} habits completed today
            </Text>

            <View style={styles.track}>
              <View
                style={[
                  styles.fill,
                  { width: `${percentage}%` },
                ]}
              />
            </View>

            <View style={styles.statsRow}>
              <View style={styles.statBox}>
                <Text style={styles.statValue}>{completed}</Text>
                <Text style={styles.statLabel}>Completed</Text>
              </View>

              <View style={styles.statBox}>
                <Text style={styles.statValue}>
                  {Math.max(0, total - completed)}
                </Text>
                <Text style={styles.statLabel}>Remaining</Text>
              </View>
            </View>

            <View style={styles.messageBox}>
              <Text style={styles.messageTitle}>
                {percentage === 100
                  ? "Amazing work! 🎉"
                  : percentage > 0
                    ? "Keep it going! 💪"
                    : "Start with one small step 🌱"}
              </Text>

              <Text style={styles.message}>
                {percentage === 100
                  ? "You've completed all your habits for today. Keep building that consistency!"
                  : "Every completed habit is progress. Continue working through your daily goals at your own pace."}
              </Text>
            </View>

            <Pressable
              style={styles.doneButton}
              onPress={onClose}
              accessibilityRole="button"
            >
              <Text style={styles.doneText}>Got it</Text>
            </Pressable>
          </ScrollView>
        </View>
      </View>
    </Modal>
  );
}
