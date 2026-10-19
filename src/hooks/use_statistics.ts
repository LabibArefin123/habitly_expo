import { useCallback, useEffect, useState } from "react";
import { useSQLiteContext } from "expo-sqlite";

import type {
  HabitStreak,
  Statistics,
  WeeklyProgress,
} from "../types/habit.types";

import {
  getHabitStreaks,
  getStatistics,
  getWeeklyProgress,
} from "../database/statistic_queries";

const INITIAL_STATS: Statistics = {
  totalHabits: 0,
  completedToday: 0,
  totalCompletions: 0,
  currentStreak: 0,
  longestStreak: 0,
  weeklyCompletion: 0,
};

export function useStatistics() {
  const db = useSQLiteContext();

  const [statistics, setStatistics] =
    useState<Statistics>(INITIAL_STATS);

  const [weeklyProgress, setWeeklyProgress] =
    useState<WeeklyProgress[]>([]);

  const [habitStreaks, setHabitStreaks] =
    useState<HabitStreak[]>([]);

  const [loading, setLoading] = useState(true);

  const refreshStatistics = useCallback(async () => {
    const [stats, weekly, streaks] = await Promise.all([
      getStatistics(db),
      getWeeklyProgress(db),
      getHabitStreaks(db),
    ]);

    setStatistics(stats);
    setWeeklyProgress(weekly);
    setHabitStreaks(streaks);
  }, [db]);

  useEffect(() => {
    refreshStatistics()
      .catch(console.error)
      .finally(() => setLoading(false));
  }, [refreshStatistics]);

  return {
    statistics,
    weeklyProgress,
    habitStreaks,
    loading,
    refreshStatistics,
  };
}