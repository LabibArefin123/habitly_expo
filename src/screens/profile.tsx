import { useEffect, useState } from "react";
import { ScrollView } from "react-native";
import { useSQLiteContext } from "expo-sqlite";

import { ProfileHeader } from "../components/profile/profile_header";
import { ProfileCard } from "../components/profile/profile_card";
import { ProfileStats } from "../components/profile/profile_stats";
import { ProfileAbout } from "../components/profile/profile_about";
import { ProfileQuote } from "../components/profile/profile_quote";
import { ProfileFooter } from "../components/profile/profile_footer";

import { profileFooterStyles as styles } from "../styles/profile";

interface Props {
  onBack: () => void;
}

interface ProfileStatsData {
  totalHabits: number;
  totalCompletions: number;
  activeDays: number;
}

const INITIAL_STATS: ProfileStatsData = {
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
      <ProfileHeader onBack={onBack} />

      <ProfileCard />

      <ProfileStats
        totalHabits={stats.totalHabits}
        totalCompletions={stats.totalCompletions}
        activeDays={stats.activeDays}
        loading={loading}
      />

      <ProfileAbout />

      <ProfileQuote />

      <ProfileFooter />
    </ScrollView>
  );
}
