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

import {
  cancelHabitReminder,
  scheduleHabitReminder,
} from "../services/notification_service";

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
    const habitId = await createHabit(db, data);

    if (data.reminderEnabled) {
      try {
        await scheduleHabitReminder(db, habitId);
      } catch (error) {
        console.error("Unable to schedule habit reminder:", error);
      }
    }

    await refreshHabits();
  };

  const editHabit = async (id: number, data: HabitFormData) => {
    await updateHabit(db, id, data);

    try {
      await scheduleHabitReminder(db, id);
    } catch (error) {
      console.error("Unable to update habit reminder:", error);
    }

    await refreshHabits();
  };

  const removeHabit = async (id: number) => {
    await cancelHabitReminder(db, id);
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