import { useCallback, useEffect, useState } from "react";
import { useSQLiteContext } from "expo-sqlite";

import type { Habit, HabitFormData } from "../types/habit.types";

import {
  getHabits,
  createHabit,
  updateHabit,
  deleteHabit,
  toggleHabit,
} from "../database/habit_queries";

export function useHabits() {
  const db = useSQLiteContext();

  const [habits, setHabits] = useState<Habit[]>([]);
  const [loading, setLoading] = useState(true);

  const refreshHabits = useCallback(async () => {
    const data = await getHabits(db);
    setHabits(data);
  }, [db]);

  useEffect(() => {
    refreshHabits()
      .catch(console.error)
      .finally(() => setLoading(false));
  }, [refreshHabits]);

  const addHabit = async (data: HabitFormData) => {
    await createHabit(db, data);
    await refreshHabits();
  };

  const editHabit = async (id: number, data: HabitFormData) => {
    await updateHabit(db, id, data);
    await refreshHabits();
  };

  const removeHabit = async (id: number) => {
    await deleteHabit(db, id);
    await refreshHabits();
  };

  const completeHabit = async (id: number) => {
    await toggleHabit(db, id);
    await refreshHabits();
  };

  return {
    habits,
    loading,
    refreshHabits,
    addHabit,
    editHabit,
    removeHabit,
    completeHabit,
  };
}