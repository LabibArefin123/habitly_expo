import { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Pressable,
  ScrollView,
  Text,
  View,
} from "react-native";
import { useSQLiteContext } from "expo-sqlite";

import { styles } from "../styles/profile.styles";

interface Props {
  onBack: () => void;
}

interface ProfileStats {
  totalHabits: number;
  totalCompletions: number;
  activeDays: number;
}

interface InfoRowProps {
  icon: string;
  label: string;
  value: string;
  last?: boolean;
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
      {/* Header */}
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

      {/* Profile Card */}
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

      {/* Progress */}
      <Text style={styles.sectionTitle}>My Progress</Text>

      {loading ? (
        <View style={styles.loading}>
          <ActivityIndicator color={styles.primaryColor.color} />
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

      {/* About Me */}
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

      {/* Daily Motivation */}
      <View style={styles.quoteCard}>
        <Text style={styles.quoteIcon}>✨</Text>

        <Text style={styles.quoteTitle}>Small progress every day.</Text>

        <Text style={styles.quoteDescription}>
          Consistency turns daily effort into long-term achievement.
        </Text>
      </View>

      {/* Footer */}
      <Text style={styles.footer}>
        Habitly · Build daily habits and track personal progress.
      </Text>
    </ScrollView>
  );
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
