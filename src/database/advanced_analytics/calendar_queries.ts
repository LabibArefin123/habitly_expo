
import type { SQLiteDatabase } from "expo-sqlite";

import type {
  CalendarDay,
  DayHabit,
} from "../../types/analytics.types";

function createDateKey(
  year: number,
  month: number,
  day: number,
): string {
  return `${year}-${String(month).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
}

export async function getMonthCalendar(
  db: SQLiteDatabase,
  year: number,
  month: number,
): Promise<CalendarDay[]> {
  const daysInMonth = new Date(year, month, 0).getDate();
  const rows: CalendarDay[] = [];

  for (let day = 1; day <= daysInMonth; day++) {
    const date = createDateKey(year, month, day);

    const totals = await db.getFirstAsync<{
      total: number;
      completed: number;
    }>(
      `SELECT
        COUNT(h.id) AS total,
        COUNT(l.id) AS completed
       FROM habits h
       LEFT JOIN habit_logs l
         ON l.habit_id = h.id
         AND l.completion_date = ?
       WHERE substr(h.created_at, 1, 10) <= ?`,
      date,
      date,
    );

    const total = totals?.total ?? 0;
    const completed = totals?.completed ?? 0;

    rows.push({
      date,
      day,
      total,
      completed,
      percentage: total
        ? Math.round((completed / total) * 100)
        : 0,
      isCurrentMonth: true,
    });
  }

  return rows;
}

export async function getHabitsForDate(
  db: SQLiteDatabase,
  date: string,
): Promise<DayHabit[]> {
  return db.getAllAsync<DayHabit>(
    `SELECT
      h.id,
      h.title,
      h.icon,
      h.color,
      h.category,
      CASE
        WHEN l.id IS NULL THEN 0
        ELSE 1
      END AS completed
     FROM habits h
     LEFT JOIN habit_logs l
       ON l.habit_id = h.id
       AND l.completion_date = ?
     WHERE substr(h.created_at, 1, 10) <= ?
     ORDER BY h.title COLLATE NOCASE`,
    date,
    date,
  );
}
