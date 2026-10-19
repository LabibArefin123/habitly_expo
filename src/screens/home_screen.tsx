import { useEffect, useMemo, useState } from "react";
import {
  Alert,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";

import { COLORS } from "../constants/theme";

import { useHabits } from "../hooks/use_habits";
import { useStatistics } from "../hooks/use_statistics";

import { ProgressCard } from "../components/dashboard/progress_card";
import { StatisticsCard } from "../components/dashboard/statistics_card";
import { WeeklyChart } from "../components/dashboard/weekly_chart";

import { HabitCard } from "../components/habits/habit_card";
import { HabitFormModal } from "../components/habits/habit_form_modal";

import type { Habit, HabitFormData } from "../types/habit.types";

export function HomeScreen() {
  const { habits, loading, addHabit, editHabit, removeHabit, completeHabit } =
    useHabits();

  const { statistics, weeklyProgress, habitStreaks, refreshStatistics } =
    useStatistics();

  const [modalVisible, setModalVisible] = useState(false);
  const [selectedHabit, setSelectedHabit] = useState<Habit | null>(null);

  // Refresh analytics whenever the habit list changes.
  useEffect(() => {
    if (!loading) {
      refreshStatistics().catch(console.error);
    }
  }, [habits, loading, refreshStatistics]);

  const streakMap = useMemo(
    () =>
      Object.fromEntries(
        habitStreaks.map((item) => [item.habitId, item.currentStreak]),
      ),
    [habitStreaks],
  );

  const today = new Intl.DateTimeFormat("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
  }).format(new Date());

  const handleSave = async (data: HabitFormData) => {
    if (selectedHabit) {
      await editHabit(selectedHabit.id, data);
    } else {
      await addHabit(data);
    }
  };

  const handleEdit = (habit: Habit) => {
    setSelectedHabit(habit);
    setModalVisible(true);
  };

  const handleAdd = () => {
    setSelectedHabit(null);
    setModalVisible(true);
  };

  const handleDelete = (habit: Habit) => {
    Alert.alert(
      "Delete Habit",
      `Are you sure you want to delete "${habit.title}"?`,
      [
        {
          text: "Cancel",
          style: "cancel",
        },
        {
          text: "Delete",
          style: "destructive",
          onPress: () => {
            removeHabit(habit.id).catch(console.error);
          },
        },
      ],
    );
  };

  const handleToggle = async (id: number) => {
    try {
      await completeHabit(id);
    } catch (error) {
      console.error("Unable to update habit:", error);
      Alert.alert("Error", "Unable to update habit completion.");
    }
  };

  return (
    <View style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <View>
            <Text style={styles.greeting}>WELCOME BACK 👋</Text>
            <Text style={styles.heading}>Habitly</Text>
            <Text style={styles.subtitle}>Build better habits every day.</Text>
          </View>

          <View style={styles.avatar}>
            <Text style={styles.avatarText}>L</Text>
          </View>
        </View>

        <Text style={styles.date}>{today}</Text>

        {/* Daily Progress */}
        <ProgressCard
          completed={statistics.completedToday}
          total={statistics.totalHabits}
        />

        {/* Statistics */}
        <View style={styles.sectionHeader}>
          <View>
            <Text style={styles.sectionTitle}>Your Statistics</Text>
            <Text style={styles.sectionSubtitle}>
              Track your personal achievements.
            </Text>
          </View>
        </View>

        <View style={styles.statsGrid}>
          <StatisticsCard
            title="Current Streak"
            value={`${statistics.currentStreak} days`}
            subtitle="Best active habit"
            icon="🔥"
            color="#FF9F43"
          />

          <StatisticsCard
            title="Best Streak"
            value={`${statistics.longestStreak} days`}
            subtitle="Personal record"
            icon="🏆"
            color="#F5B942"
          />

          <StatisticsCard
            title="Completions"
            value={statistics.totalCompletions}
            subtitle="All-time completed"
            icon="✅"
            color="#20B486"
          />

          <StatisticsCard
            title="Weekly Progress"
            value={`${statistics.weeklyCompletion}%`}
            subtitle="Last 7 days"
            icon="📊"
            color="#6C63FF"
          />
        </View>

        {/* Weekly Analytics */}
        <WeeklyChart data={weeklyProgress} />

        {/* Today's Habits */}
        <View style={[styles.sectionHeader, styles.habitHeader]}>
          <View>
            <Text style={styles.sectionTitle}>Today's Habits</Text>
            <Text style={styles.sectionSubtitle}>
              {statistics.completedToday} completed ·{" "}
              {Math.max(0, statistics.totalHabits - statistics.completedToday)}{" "}
              remaining
            </Text>
          </View>

          <Pressable onPress={handleAdd} style={styles.addButton}>
            <Text style={styles.addButtonText}>+ Add Habit</Text>
          </Pressable>
        </View>

        {loading ? (
          <Text style={styles.emptyText}>Loading habits...</Text>
        ) : habits.length === 0 ? (
          <View style={styles.emptyState}>
            <Text style={styles.emptyIcon}>🌱</Text>

            <Text style={styles.emptyTitle}>Start your journey!</Text>

            <Text style={styles.emptyText}>
              Create your first habit and start building a better routine.
            </Text>

            <Pressable onPress={handleAdd} style={styles.createButton}>
              <Text style={styles.createButtonText}>Create First Habit</Text>
            </Pressable>
          </View>
        ) : (
          habits.map((habit) => (
            <HabitCard
              key={habit.id}
              habit={habit}
              streak={streakMap[habit.id] ?? 0}
              onToggle={() => handleToggle(habit.id)}
              onEdit={() => handleEdit(habit)}
              onDelete={() => handleDelete(habit)}
            />
          ))
        )}

        {/* Motivation */}
        <View style={styles.motivationCard}>
          <Text style={styles.motivationEmoji}>✨</Text>

          <Text style={styles.motivationTitle}>Consistency is everything.</Text>

          <Text style={styles.motivationText}>
            Small actions repeated daily create remarkable results.
          </Text>
        </View>

        <Text style={styles.footer}>Made with ❤️ by Habitly</Text>
      </ScrollView>

      {/* Habit Form */}
      <HabitFormModal
        visible={modalVisible}
        habit={selectedHabit}
        onClose={() => {
          setModalVisible(false);
          setSelectedHabit(null);
        }}
        onSave={handleSave}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 25,
  },
  greeting: {
    color: COLORS.primary,
    fontSize: 10,
    fontWeight: "800",
    letterSpacing: 1.5,
  },
  heading: {
    color: COLORS.text,
    fontSize: 27,
    fontWeight: "900",
    marginTop: 6,
  },
  subtitle: {
    color: COLORS.muted,
    fontSize: 12,
    marginTop: 5,
  },
  avatar: {
    width: 46,
    height: 46,
    borderRadius: 16,
    backgroundColor: COLORS.primaryLight,
    justifyContent: "center",
    alignItems: "center",
  },
  avatarText: {
    color: COLORS.primary,
    fontSize: 20,
    fontWeight: "800",
  },
  date: {
    color: COLORS.text,
    fontSize: 14,
    fontWeight: "800",
    marginBottom: 15,
  },
  sectionHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 16,
  },
  sectionTitle: {
    color: COLORS.text,
    fontSize: 19,
    fontWeight: "800",
  },
  sectionSubtitle: {
    color: COLORS.muted,
    fontSize: 11,
    marginTop: 5,
  },
  statsGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 12,
  },
  habitHeader: {
    marginTop: 28,
  },
  addButton: {
    backgroundColor: COLORS.primaryLight,
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 12,
  },
  addButtonText: {
    color: COLORS.primary,
    fontSize: 12,
    fontWeight: "800",
  },
  emptyState: {
    backgroundColor: COLORS.white,
    borderRadius: 22,
    padding: 25,
    alignItems: "center",
  },
  emptyIcon: {
    fontSize: 42,
  },
  emptyTitle: {
    color: COLORS.text,
    fontSize: 17,
    fontWeight: "800",
    marginTop: 15,
  },
  emptyText: {
    color: COLORS.muted,
    fontSize: 12,
    textAlign: "center",
    marginTop: 9,
    lineHeight: 19,
  },
  createButton: {
    backgroundColor: COLORS.primary,
    padding: 14,
    borderRadius: 12,
    marginTop: 18,
  },
  createButtonText: {
    color: COLORS.white,
    fontWeight: "800",
    fontSize: 12,
  },
  motivationCard: {
    backgroundColor: COLORS.primaryLight,
    padding: 20,
    borderRadius: 20,
    marginTop: 20,
  },
  motivationEmoji: {
    fontSize: 24,
  },
  motivationTitle: {
    color: COLORS.text,
    fontSize: 15,
    fontWeight: "800",
    marginTop: 10,
  },
  motivationText: {
    color: COLORS.muted,
    fontSize: 12,
    lineHeight: 19,
    marginTop: 6,
  },
  footer: {
    textAlign: "center",
    color: COLORS.muted,
    fontSize: 11,
    marginTop: 25,
    marginBottom: 25,
  },
});
