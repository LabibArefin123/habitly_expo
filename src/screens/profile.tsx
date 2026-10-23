import { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { useSQLiteContext } from "expo-sqlite";

import { COLORS } from "../constants/theme";

interface Props {
  onBack: () => void;
}

interface ProfileStats {
  totalHabits: number;
  totalCompletions: number;
  activeDays: number;
}

const INITIAL_STATS: ProfileStats = {
  totalHabits: 0,
  totalCompletions: 0,
  activeDays: 0,
};

export function ProfileScreen({ onBack }: Props) {
  const db = useSQLiteContext();

  const [stats, setStats] = useState(INITIAL_STATS);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;

    async function loadProfileStats() {
      try {
        const [habits, completions, days] = await Promise.all([
          db.getFirstAsync<{ total: number }>(
            "SELECT COUNT(*) AS total FROM habits",
          ),
          db.getFirstAsync<{ total: number }>(
            "SELECT COUNT(*) AS total FROM habit_logs",
          ),
          db.getFirstAsync<{ total: number }>(
            "SELECT COUNT(DISTINCT completion_date) AS total FROM habit_logs",
          ),
        ]);

        if (mounted) {
          setStats({
            totalHabits: habits?.total ?? 0,
            totalCompletions: completions?.total ?? 0,
            activeDays: days?.total ?? 0,
          });
        }
      } catch (error) {
        console.error("Unable to load profile statistics:", error);
      } finally {
        if (mounted) {
          setLoading(false);
        }
      }
    }

    loadProfileStats();

    return () => {
      mounted = false;
    };
  }, [db]);

  return (
    <ScrollView
      style={styles.screen}
      contentContainerStyle={styles.content}
      showsVerticalScrollIndicator={false}
    >
      <View style={styles.header}>
        <Pressable
          onPress={onBack}
          style={styles.backButton}
          accessibilityRole="button"
          accessibilityLabel="Go back"
        >
          <Text style={styles.backIcon}>‹</Text>
        </Pressable>

        <Text style={styles.headerTitle}>My Profile</Text>

        <View style={styles.headerSpacer} />
      </View>

      <View style={styles.profileCard}>
        <View style={styles.avatar}>
          <Text style={styles.avatarText}>LA</Text>
        </View>

        <Text style={styles.name}>Md. Labib Arefin</Text>

        <Text style={styles.profession}>Software Developer</Text>

        <Text style={styles.bio}>
          Building software, learning new technologies, and improving every day.
        </Text>

        <View style={styles.memberBadge}>
          <Text style={styles.memberBadgeText}>HABITLY MEMBER</Text>
        </View>
      </View>

      <Text style={styles.sectionTitle}>My Progress</Text>

      {loading ? (
        <View style={styles.loading}>
          <ActivityIndicator color={COLORS.primary} />
          <Text style={styles.loadingText}>Loading your progress...</Text>
        </View>
      ) : (
        <View style={styles.statsGrid}>
          <View style={styles.statCard}>
            <Text style={styles.statIcon}>🎯</Text>
            <Text style={styles.statValue}>{stats.totalHabits}</Text>
            <Text style={styles.statLabel}>Total habits</Text>
          </View>

          <View style={styles.statCard}>
            <Text style={styles.statIcon}>✅</Text>
            <Text style={styles.statValue}>{stats.totalCompletions}</Text>
            <Text style={styles.statLabel}>Completions</Text>
          </View>

          <View style={styles.statCard}>
            <Text style={styles.statIcon}>📅</Text>
            <Text style={styles.statValue}>{stats.activeDays}</Text>
            <Text style={styles.statLabel}>Active days</Text>
          </View>
        </View>
      )}

      <Text style={styles.sectionTitle}>About Me</Text>

      <View style={styles.infoCard}>
        <InfoRow icon="👤" label="Full name" value="Md. Labib Arefin" />

        <InfoRow icon="💼" label="Profession" value="Software Developer" />

        <InfoRow icon="💻" label="Main focus" value="Software Development" />

        <InfoRow
          icon="🚀"
          label="Personal goal"
          value="Continuous Improvement"
          last
        />
      </View>

      <View style={styles.quoteCard}>
        <Text style={styles.quoteIcon}>✨</Text>

        <Text style={styles.quoteTitle}>Small progress every day.</Text>

        <Text style={styles.quoteDescription}>
          Consistency turns daily effort into long-term achievement.
        </Text>
      </View>

      <Text style={styles.footer}>
        Habitly · Build daily habits and track personal progress.
      </Text>
    </ScrollView>
  );
}

interface InfoRowProps {
  icon: string;
  label: string;
  value: string;
  last?: boolean;
}

function InfoRow({ icon, label, value, last = false }: InfoRowProps) {
  return (
    <View style={[styles.infoRow, last && styles.lastInfoRow]}>
      <View style={styles.infoIcon}>
        <Text style={styles.infoEmoji}>{icon}</Text>
      </View>

      <View style={styles.infoContent}>
        <Text style={styles.infoLabel}>{label}</Text>
        <Text style={styles.infoValue}>{value}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  content: {
    paddingHorizontal: 20,
    paddingBottom: 30,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 22,
  },
  backButton: {
    width: 42,
    height: 42,
    borderRadius: 13,
    backgroundColor: COLORS.white,
    borderWidth: 1,
    borderColor: COLORS.border,
    alignItems: "center",
    justifyContent: "center",
  },
  backIcon: {
    fontSize: 29,
    color: COLORS.primary,
    fontWeight: "700",
    marginTop: -3,
  },
  headerTitle: {
    color: COLORS.text,
    fontSize: 18,
    fontWeight: "900",
  },
  headerSpacer: {
    width: 42,
  },
  profileCard: {
    backgroundColor: COLORS.white,
    borderRadius: 23,
    borderWidth: 1,
    borderColor: COLORS.border,
    padding: 25,
    alignItems: "center",
  },
  avatar: {
    width: 88,
    height: 88,
    borderRadius: 28,
    backgroundColor: COLORS.primaryLight,
    borderWidth: 2,
    borderColor: COLORS.primary,
    alignItems: "center",
    justifyContent: "center",
  },
  avatarText: {
    color: COLORS.primary,
    fontSize: 27,
    fontWeight: "900",
  },
  name: {
    color: COLORS.text,
    fontSize: 21,
    fontWeight: "900",
    marginTop: 17,
    textAlign: "center",
  },
  profession: {
    color: COLORS.primary,
    fontSize: 12,
    fontWeight: "800",
    marginTop: 6,
  },
  bio: {
    color: COLORS.muted,
    fontSize: 12,
    lineHeight: 19,
    textAlign: "center",
    marginTop: 13,
  },
  memberBadge: {
    backgroundColor: COLORS.primaryLight,
    paddingHorizontal: 13,
    paddingVertical: 8,
    borderRadius: 20,
    marginTop: 17,
  },
  memberBadgeText: {
    color: COLORS.primary,
    fontSize: 9,
    fontWeight: "900",
    letterSpacing: 1,
  },
  sectionTitle: {
    color: COLORS.text,
    fontSize: 16,
    fontWeight: "900",
    marginTop: 25,
    marginBottom: 13,
  },
  statsGrid: {
    flexDirection: "row",
    gap: 9,
  },
  statCard: {
    flex: 1,
    backgroundColor: COLORS.white,
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: 17,
    paddingVertical: 16,
    paddingHorizontal: 8,
    alignItems: "center",
  },
  statIcon: {
    fontSize: 21,
  },
  statValue: {
    color: COLORS.primary,
    fontSize: 23,
    fontWeight: "900",
    marginTop: 9,
  },
  statLabel: {
    color: COLORS.muted,
    fontSize: 9,
    fontWeight: "700",
    marginTop: 4,
    textAlign: "center",
  },
  loading: {
    padding: 25,
    alignItems: "center",
    backgroundColor: COLORS.white,
    borderRadius: 17,
  },
  loadingText: {
    color: COLORS.muted,
    fontSize: 11,
    marginTop: 9,
  },
  infoCard: {
    backgroundColor: COLORS.white,
    borderRadius: 19,
    borderWidth: 1,
    borderColor: COLORS.border,
    paddingHorizontal: 15,
  },
  infoRow: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
    gap: 12,
  },
  lastInfoRow: {
    borderBottomWidth: 0,
  },
  infoIcon: {
    width: 39,
    height: 39,
    borderRadius: 12,
    backgroundColor: COLORS.background,
    alignItems: "center",
    justifyContent: "center",
  },
  infoEmoji: {
    fontSize: 18,
  },
  infoContent: {
    flex: 1,
  },
  infoLabel: {
    color: COLORS.muted,
    fontSize: 10,
  },
  infoValue: {
    color: COLORS.text,
    fontSize: 12,
    fontWeight: "800",
    marginTop: 4,
  },
  quoteCard: {
    backgroundColor: COLORS.primary,
    borderRadius: 19,
    padding: 19,
    marginTop: 22,
  },
  quoteIcon: {
    fontSize: 22,
  },
  quoteTitle: {
    color: COLORS.white,
    fontSize: 15,
    fontWeight: "900",
    marginTop: 10,
  },
  quoteDescription: {
    color: "#E5E3FF",
    fontSize: 11,
    lineHeight: 18,
    marginTop: 6,
  },
  footer: {
    color: COLORS.muted,
    fontSize: 10,
    textAlign: "center",
    marginTop: 25,
  },
});
