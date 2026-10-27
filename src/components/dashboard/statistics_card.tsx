import { useState } from "react";
import { Modal, Pressable, ScrollView, Text, View } from "react-native";
import { statisticsCardStyles as styles } from "../../styles/dashboard_part/statistics_card.styles";

interface Props {
  title: string;
  value: string | number;
  subtitle: string;
  icon: string;
  color: string;
}

function getStatisticDescription(title: string): string {
  const normalizedTitle = title.toLowerCase();

  if (normalizedTitle.includes("current streak")) {
    return "Your current streak tracks how consistently you complete your habits on consecutive days.";
  }

  if (
    normalizedTitle.includes("best streak") ||
    normalizedTitle.includes("longest streak")
  ) {
    return "Your best streak shows the longest consecutive period you have maintained your habits.";
  }

  if (normalizedTitle.includes("completion")) {
    return "This statistic tracks your habit completion activity. Keep completing your habits regularly to improve your consistency.";
  }

  if (normalizedTitle.includes("weekly")) {
    return "Your weekly progress summarizes your habit completion performance during the current tracking week.";
  }

  return `Review your ${title.toLowerCase()} statistic to understand your habit progress and consistency.`;
}

export function StatisticsCard({ title, value, subtitle, icon, color }: Props) {
  const [modalVisible, setModalVisible] = useState(false);

  return (
    <>
      <Pressable
        style={({ pressed }) => [
          styles.card,
          pressed && { opacity: 0.8, transform: [{ scale: 0.98 }] },
        ]}
        onPress={() => setModalVisible(true)}
        accessibilityRole="button"
        accessibilityLabel={`View details for ${title}`}
      >
        <View style={[styles.iconBox, { backgroundColor: `${color}18` }]}>
          <Text style={styles.icon}>{icon}</Text>
        </View>

        <Text style={styles.title}>{title}</Text>
        <Text style={styles.value}>{value}</Text>
        <Text style={styles.subtitle}>{subtitle}</Text>
      </Pressable>

      <Modal
        visible={modalVisible}
        transparent
        animationType="fade"
        statusBarTranslucent
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <Pressable
            style={styles.modalBackdrop}
            onPress={() => setModalVisible(false)}
            accessibilityLabel="Close statistic details"
          />

          <View style={styles.modalContent}>
            <ScrollView
              showsVerticalScrollIndicator={false}
              contentContainerStyle={styles.modalScrollContent}
            >
              <View style={styles.modalHeader}>
                <View
                  style={[
                    styles.modalIconBox,
                    { backgroundColor: `${color}18` },
                  ]}
                >
                  <Text style={styles.modalIcon}>{icon}</Text>
                </View>

                <Pressable
                  onPress={() => setModalVisible(false)}
                  style={styles.closeButton}
                  accessibilityRole="button"
                  accessibilityLabel="Close modal"
                >
                  <Text style={styles.closeButtonText}>×</Text>
                </Pressable>
              </View>

              <Text style={styles.modalTitle}>{title}</Text>
              <Text style={[styles.modalValue, { color }]}>{value}</Text>
              <Text style={styles.modalSubtitle}>{subtitle}</Text>

              <View style={styles.modalDivider} />

              <Text style={styles.detailsHeading}>About this statistic</Text>
              <Text style={styles.modalDescription}>
                {getStatisticDescription(title)}
              </Text>

              <View style={styles.tipBox}>
                <Text style={styles.tipTitle}>Keep going!</Text>
                <Text style={styles.tipText}>
                  Small, consistent actions can help you build lasting habits.
                  Check your progress regularly and keep working toward your
                  goals.
                </Text>
              </View>

              <Pressable
                style={[styles.doneButton, { backgroundColor: color }]}
                onPress={() => setModalVisible(false)}
                accessibilityRole="button"
              >
                <Text style={styles.doneButtonText}>Done</Text>
              </Pressable>
            </ScrollView>
          </View>
        </View>
      </Modal>
    </>
  );
}
