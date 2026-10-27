import { Text, View } from "react-native";
import { achievementListStyles as styles } from "../../styles/analytics_part/achievement_list.styles";

export interface AchievementItem {
  id: string;
  title: string;
  description: string;
  icon: string;
  unlocked: boolean;
  progress?: number;
  target?: number;
}

interface Props {
  achievements: AchievementItem[];
}

export function AchievementList({ achievements }: Props) {
  const unlockedCount = achievements.filter((item) => item.unlocked).length;

  if (achievements.length === 0) {
    return (
      <View style={styles.card}>
        <Text style={styles.title}>Achievements</Text>
        <Text style={styles.emptyText}>
          Your achievements will appear here as you build your habits.
        </Text>
      </View>
    );
  }

  return (
    <View style={styles.card}>
      <View style={styles.header}>
        <View>
          <Text style={styles.title}>Achievements</Text>
          <Text style={styles.subtitle}>Celebrate your consistency</Text>
        </View>

        <View style={styles.counter}>
          <Text style={styles.counterText}>
            {unlockedCount}/{achievements.length}
          </Text>
        </View>
      </View>

      <View style={styles.list}>
        {achievements.map((item) => {
          const progress = Math.min(100, Math.max(0, item.progress ?? 0));

          return (
            <View
              key={item.id}
              style={[
                styles.achievement,
                !item.unlocked && styles.lockedAchievement,
              ]}
            >
              <View
                style={[
                  styles.iconBox,
                  item.unlocked ? styles.unlockedIcon : styles.lockedIcon,
                ]}
              >
                <Text style={styles.icon}>{item.icon}</Text>
              </View>

              <View style={styles.content}>
                <View style={styles.titleRow}>
                  <Text style={styles.achievementTitle}>{item.title}</Text>

                  {item.unlocked && (
                    <Text style={styles.unlockedLabel}>UNLOCKED</Text>
                  )}
                </View>

                <Text style={styles.description}>{item.description}</Text>

                {!item.unlocked && item.target !== undefined && (
                  <View style={styles.progressSection}>
                    <View style={styles.progressTrack}>
                      <View
                        style={[styles.progressFill, { width: `${progress}%` }]}
                      />
                    </View>

                    <Text style={styles.progressText}>
                      {item.progress ?? 0}/{item.target}
                    </Text>
                  </View>
                )}
              </View>
            </View>
          );
        })}
      </View>
    </View>
  );
}
