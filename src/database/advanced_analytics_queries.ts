import type { SQLiteDatabase } from "expo-sqlite";
import type {
  CalendarDay, DayHabit, MonthSummary, CategorySummary, HabitAnalytics,
} from "../types/analytics.types";
import { getLocalDate } from "./habit_queries";

function keyOf(year: number, month: number, day: number): string {
  return `${year}-${String(month).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
}

function shift(date: Date, amount: number): Date {
  const next = new Date(date.getFullYear(), date.getMonth(), date.getDate());
  next.setDate(next.getDate() + amount);
  return next;
}

function streaks(dates: string[]): { current: number; longest: number } {
  const set = new Set(dates);
  const sorted = [...set].sort();
  let longest = 0;
  let run = 0;
  let previous: Date | null = null;

  for (const value of sorted) {
    const [y, m, d] = value.split("-").map(Number);
    const current = new Date(y, m - 1, d);
    const diff = previous
      ? Math.round((current.getTime() - previous.getTime()) / 86400000)
      : 0;
    run = previous && diff === 1 ? run + 1 : 1;
    longest = Math.max(longest, run);
    previous = current;
  }

  const today = getLocalDate();
  const yesterday = keyOf(
    shift(new Date(), -1).getFullYear(),
    shift(new Date(), -1).getMonth() + 1,
    shift(new Date(), -1).getDate()
  );
  let cursor = set.has(today) ? today : yesterday;
  let current = 0;
  while (set.has(cursor)) {
    current++;
    const [y, m, d] = cursor.split("-").map(Number);
    cursor = getLocalDate(shift(new Date(y, m - 1, d), -1));
  }
  return { current, longest };
}

export async function getMonthCalendar(
  db: SQLiteDatabase,
  year: number,
  month: number
): Promise<CalendarDay[]> {
  const daysInMonth = new Date(year, month, 0).getDate();
  const today = getLocalDate();
  const rows: CalendarDay[] = [];

  for (let day = 1; day <= daysInMonth; day++) {
    const date = keyOf(year, month, day);
    const totals = await db.getFirstAsync<{ total: number; completed: number }>(
      `SELECT COUNT(h.id) AS total,
        COUNT(l.id) AS completed
       FROM habits h
       LEFT JOIN habit_logs l
         ON l.habit_id = h.id AND l.completion_date = ?
       WHERE substr(h.created_at, 1, 10) <= ?`,
      date,
      date
    );
    const total = totals?.total ?? 0;
    const completed = totals?.completed ?? 0;
    rows.push({
      date, day, total, completed,
      percentage: total ? Math.round((completed / total) * 100) : 0,
      isCurrentMonth: true,
    });
  }
  return rows;
}

export async function getHabitsForDate(
  db: SQLiteDatabase,
  date: string
): Promise<DayHabit[]> {
  return db.getAllAsync<DayHabit>(
    `SELECT h.id, h.title, h.icon, h.color, h.category,
      CASE WHEN l.id IS NULL THEN 0 ELSE 1 END AS completed
     FROM habits h
     LEFT JOIN habit_logs l
       ON l.habit_id = h.id AND l.completion_date = ?
     WHERE substr(h.created_at, 1, 10) <= ?
     ORDER BY h.title COLLATE NOCASE`,
    date,
    date
  );
}

export async function getYearOverview(
  db: SQLiteDatabase,
  year: number
): Promise<MonthSummary[]> {
  const output: MonthSummary[] = [];
  for (let month = 1; month <= 12; month++) {
    const end = keyOf(year, month, new Date(year, month, 0).getDate());
    const start = keyOf(year, month, 1);
    const result = await db.getFirstAsync<{ total: number; completed: number }>(
      `SELECT
        (SELECT COUNT(*) FROM habits h
         WHERE substr(h.created_at, 1, 10) <= ?) *
        ? AS total,
        (SELECT COUNT(*) FROM habit_logs l
         INNER JOIN habits h ON h.id = l.habit_id
         WHERE l.completion_date BETWEEN ? AND ?
           AND substr(h.created_at, 1, 10) <= ?) AS completed`,
      end,
      new Date(year, month, 0).getDate(),
      start,
      end,
      end
    );
    const total = result?.total ?? 0;
    const completed = result?.completed ?? 0;
    output.push({
      month,
      label: new Date(year, month - 1, 1).toLocaleDateString("en-US", { month: "short" }),
      total,
      completed,
      percentage: total ? Math.round((completed / total) * 100) : 0,
    });
  }
  return output;
}

export async function getCategoryOverview(
  db: SQLiteDatabase
): Promise<CategorySummary[]> {
  return db.getAllAsync<CategorySummary>(
    `SELECT h.category,
      COUNT(DISTINCT h.id) AS totalHabits,
      COUNT(l.id) AS completions,
      CASE WHEN SUM(
        CASE WHEN CAST(julianday('now') - julianday(h.created_at) AS INTEGER) + 1 > 0
          THEN CAST(julianday('now') - julianday(h.created_at) AS INTEGER) + 1
          ELSE 1 END
      ) = 0 THEN 0
      ELSE ROUND(COUNT(l.id) * 100.0 / SUM(
        CASE WHEN CAST(julianday('now') - julianday(h.created_at) AS INTEGER) + 1 > 0
          THEN CAST(julianday('now') - julianday(h.created_at) AS INTEGER) + 1
          ELSE 1 END
      ), 0) END AS percentage
     FROM habits h
     LEFT JOIN habit_logs l ON l.habit_id = h.id
     GROUP BY h.category
     ORDER BY completions DESC`
  );
}

export async function getHabitAnalytics(
  db: SQLiteDatabase,
  habitId: number
): Promise<HabitAnalytics | null> {
  const habit = await db.getFirstAsync<{
    id: number; title: string; description: string; icon: string;
    color: string; category: string; created_at: string;
  }>("SELECT * FROM habits WHERE id = ?", habitId);
  if (!habit) return null;

  const logs = await db.getAllAsync<{ completion_date: string }>(
    "SELECT completion_date FROM habit_logs WHERE habit_id = ? ORDER BY completion_date",
    habitId
  );
  const dates = logs.map((item) => item.completion_date);
  const streak = streaks(dates);
  const created = habit.created_at.slice(0, 10);
  const start = new Date(`${created}T00:00:00`);
  const elapsed = Math.max(1, Math.floor((new Date().setHours(0,0,0,0) - start.getTime()) / 86400000) + 1);
  const thisMonth = getLocalDate().slice(0, 7);
  const monthlyCompletions = dates.filter((date) => date.startsWith(thisMonth)).length;

  return {
    ...habit,
    totalCompletions: dates.length,
    activeDays: elapsed,
    completionRate: Math.min(100, Math.round((dates.length / elapsed) * 100)),
    currentStreak: streak.current,
    longestStreak: streak.longest,
    lastCompleted: dates.length ? dates[dates.length - 1] : null,
    monthlyCompletions,
  };
}
