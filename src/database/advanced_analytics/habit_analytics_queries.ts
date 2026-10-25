
import type { SQLiteDatabase } from "expo-sqlite";

import type { HabitAnalytics } from "../../types/analytics.types";
import { getLocalDate } from "../habit_queries";

function shiftDate(date: Date, amount: number): Date {
  const next = new Date(
    date.getFullYear(),
    date.getMonth(),
    date.getDate(),
  );

  next.setDate(next.getDate() + amount);

  return next;
}

function createDateKey(
  year: number,
  month: number,
  day: number,
): string {
  return `${year}-${String(month).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
}

function calculateStreaks(
  dates: string[],
): { current: number; longest: number } {
  const completedDates = new Set(dates);
  const sortedDates = [...completedDates].sort();

  let longest = 0;
  let run = 0;
  let previous: Date | null = null;

  for (const value of sortedDates) {
    const [year, month, day] = value.split("-").map(Number);

    const currentDate = new Date(year, month - 1, day);

    const difference = previous
      ? Math.round(
          (currentDate.getTime() - previous.getTime()) /
            86400000,
        )
      : 0;

    run = previous && difference === 1 ? run + 1 : 1;

    longest = Math.max(longest, run);
    previous = currentDate;
  }

  const today = getLocalDate();
  const yesterdayDate = shiftDate(new Date(), -1);

  const yesterday = createDateKey(
    yesterdayDate.getFullYear(),
    yesterdayDate.getMonth() + 1,
    yesterdayDate.getDate(),
  );

  let cursor = completedDates.has(today) ? today : yesterday;
  let current = 0;

  while (completedDates.has(cursor)) {
    current++;

    const [year, month, day] = cursor.split("-").map(Number);

    const previousDate = shiftDate(
      new Date(year, month - 1, day),
      -1,
    );

    cursor = createDateKey(
      previousDate.getFullYear(),
      previousDate.getMonth() + 1,
      previousDate.getDate(),
    );
  }

  return { current, longest };
}

export async function getHabitAnalytics(
  db: SQLiteDatabase,
  habitId: number,
): Promise<HabitAnalytics | null> {
  const habit = await db.getFirstAsync<{
    id: number;
    title: string;
    description: string;
    icon: string;
    color: string;
    category: string;
    created_at: string;
  }>(
    "SELECT * FROM habits WHERE id = ?",
    habitId,
  );

  if (!habit) {
    return null;
  }

  const logs = await db.getAllAsync<{
    completion_date: string;
  }>(
    `SELECT completion_date
     FROM habit_logs
     WHERE habit_id = ?
     ORDER BY completion_date`,
    habitId,
  );

  const dates = logs.map((item) => item.completion_date);

  const streak = calculateStreaks(dates);

  const created = habit.created_at.slice(0, 10);
  const start = new Date(`${created}T00:00:00`);

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const elapsed = Math.max(
    1,
    Math.floor(
      (today.getTime() - start.getTime()) / 86400000,
    ) + 1,
  );

  const thisMonth = getLocalDate().slice(0, 7);

  const monthlyCompletions = dates.filter((date) =>
    date.startsWith(thisMonth),
  ).length;

  return {
    ...habit,
    totalCompletions: dates.length,
    activeDays: elapsed,
    completionRate: Math.min(
      100,
      Math.round((dates.length / elapsed) * 100),
    ),
    currentStreak: streak.current,
    longestStreak: streak.longest,
    lastCompleted: dates.length
      ? dates[dates.length - 1]
      : null,
    monthlyCompletions,
  };
}
