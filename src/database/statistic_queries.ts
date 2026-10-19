import type { SQLiteDatabase } from "expo-sqlite";

import type {
  HabitStreak,
  Statistics,
  WeeklyProgress,
} from "../types/habit.types";

import { getLocalDate } from "../database/habit_queries";

// Generate a local date key.
function dateKey(date: Date): string {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");

  return `${year}-${month}-${day}`;
}

// Add or subtract calendar days.
function shiftDate(date: Date, amount: number): Date {
  const result = new Date(
    date.getFullYear(),
    date.getMonth(),
    date.getDate()
  );

  result.setDate(result.getDate() + amount);

  return result;
}

// Calculate streaks using unique completion dates.
function calculateStreaks(
  dates: string[]
): { currentStreak: number; longestStreak: number } {
  const completedDates = new Set(dates);

  const sortedDates = [...completedDates].sort((a, b) =>
    b.localeCompare(a)
  );

  if (sortedDates.length === 0) {
    return {
      currentStreak: 0,
      longestStreak: 0,
    };
  }

  // Current streak can continue from yesterday
  // if today's habit has not yet been completed.
  const today = getLocalDate();

  const yesterday = dateKey(shiftDate(new Date(), -1));

  let currentStreak = 0;

  let cursor = completedDates.has(today)
    ? today
    : yesterday;

  while (completedDates.has(cursor)) {
    currentStreak++;

    const [year, month, day] = cursor.split("-").map(Number);

    cursor = dateKey(
      shiftDate(new Date(year, month - 1, day), -1)
    );
  }

  // Calculate the longest historical streak.
  let longestStreak = 0;
  let runningStreak = 0;
  let previousDate: string | null = null;

  for (const currentDate of sortedDates) {
    if (previousDate === null) {
      runningStreak = 1;
    } else {
      const [year, month, day] = previousDate
        .split("-")
        .map(Number);

      const expectedPrevious = dateKey(
        shiftDate(new Date(year, month - 1, day), -1)
      );

      runningStreak =
        currentDate === expectedPrevious
          ? runningStreak + 1
          : 1;
    }

    longestStreak = Math.max(
      longestStreak,
      runningStreak
    );

    previousDate = currentDate;
  }

  return {
    currentStreak,
    longestStreak,
  };
}

// Get streaks for every habit.
export async function getHabitStreaks(
  db: SQLiteDatabase
): Promise<HabitStreak[]> {
  const habits = await db.getAllAsync<{ id: number }>(
    "SELECT id FROM habits"
  );

  const results: HabitStreak[] = [];

  for (const habit of habits) {
    const logs = await db.getAllAsync<{ completion_date: string }>(
      `SELECT completion_date
       FROM habit_logs
       WHERE habit_id = ?
       ORDER BY completion_date DESC`,
      habit.id
    );

    const streak = calculateStreaks(
      logs.map((log) => log.completion_date)
    );

    results.push({
      habitId: habit.id,
      ...streak,
    });
  }

  return results;
}

// Get progress for the latest seven calendar days.
export async function getWeeklyProgress(
  db: SQLiteDatabase
): Promise<WeeklyProgress[]> {
  const today = new Date();

  const results: WeeklyProgress[] = [];

  for (let i = 6; i >= 0; i--) {
    const date = shiftDate(today, -i);
    const key = dateKey(date);

    const total = await db.getFirstAsync<{ total: number }>(
      `SELECT COUNT(*) AS total
       FROM habits
       WHERE substr(created_at, 1, 10) <= ?`,
      key
    );

    const completed = await db.getFirstAsync<{
      completed: number;
    }>(
      `SELECT COUNT(DISTINCT hl.habit_id) AS completed
       FROM habit_logs hl
       INNER JOIN habits h ON h.id = hl.habit_id
       WHERE hl.completion_date = ?
       AND substr(h.created_at, 1, 10) <= ?`,
      key,
      key
    );

    const totalHabits = total?.total ?? 0;
    const completedHabits = completed?.completed ?? 0;

    results.push({
      day: date.toLocaleDateString("en-US", {
        weekday: "short",
      }),
      date: key,
      completed: completedHabits,
      total: totalHabits,
      percentage: totalHabits
        ? Math.round((completedHabits / totalHabits) * 100)
        : 0,
    });
  }

  return results;
}

// Generate dashboard statistics.
export async function getStatistics(
  db: SQLiteDatabase
): Promise<Statistics> {
  const today = getLocalDate();

  const habits = await db.getFirstAsync<{
    total: number;
    completed: number;
  }>(
    `SELECT
      COUNT(*) AS total,
      COUNT(
        CASE WHEN EXISTS (
          SELECT 1
          FROM habit_logs l
          WHERE l.habit_id = habits.id
          AND l.completion_date = ?
        ) THEN 1 END
      ) AS completed
    FROM habits`,
    today
  );

  const completions = await db.getFirstAsync<{
    total: number;
  }>(
    "SELECT COUNT(*) AS total FROM habit_logs"
  );

  const streaks = await getHabitStreaks(db);

  const currentStreak = streaks.reduce(
    (maximum, item) =>
      Math.max(maximum, item.currentStreak),
    0
  );

  const longestStreak = streaks.reduce(
    (maximum, item) =>
      Math.max(maximum, item.longestStreak),
    0
  );

  const weekly = await getWeeklyProgress(db);

  const totalAvailable = weekly.reduce(
    (sum, day) => sum + day.total,
    0
  );

  const totalCompleted = weekly.reduce(
    (sum, day) => sum + day.completed,
    0
  );

  return {
    totalHabits: habits?.total ?? 0,
    completedToday: habits?.completed ?? 0,
    totalCompletions: completions?.total ?? 0,
    currentStreak,
    longestStreak,
    weeklyCompletion: totalAvailable
      ? Math.round((totalCompleted / totalAvailable) * 100)
      : 0,
  };
}