
import type { SQLiteDatabase } from "expo-sqlite";
import type { Habit, HabitFormData } from "../types/habit.types";

// Get local date in YYYY-MM-DD format.
export function getLocalDate(date = new Date()): string {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");

  return `${year}-${month}-${day}`;
}

// Get local datetime in YYYY-MM-DD HH:mm:ss format.
function getLocalDateTime(): string {
  const now = new Date();

  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, "0");
  const day = String(now.getDate()).padStart(2, "0");
  const hours = String(now.getHours()).padStart(2, "0");
  const minutes = String(now.getMinutes()).padStart(2, "0");
  const seconds = String(now.getSeconds()).padStart(2, "0");

  return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
}

// Get all habits with today's completion status.
export async function getHabits(
  db: SQLiteDatabase
): Promise<Habit[]> {
  const today = getLocalDate();

  return db.getAllAsync<Habit>(
    `SELECT
      h.*,
      CASE
        WHEN l.id IS NULL THEN 0
        ELSE 1
      END AS completed
    FROM habits h
    LEFT JOIN habit_logs l
      ON l.habit_id = h.id
      AND l.completion_date = ?
    ORDER BY h.id DESC`,
    today
  );
}

// Create a new habit.
export async function createHabit(
  db: SQLiteDatabase,
  data: HabitFormData
): Promise<number> {
  const result = await db.runAsync(
    `INSERT INTO habits (
      title,
      description,
      icon,
      color,
      reminder_enabled,
      reminder_hour,
      reminder_minute,
      created_at
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
    data.title.trim(),
    data.description.trim(),
    data.icon,
    data.color,
    data.reminderEnabled ? 1 : 0,
    data.reminderHour,
    data.reminderMinute,
    getLocalDateTime()
  );

  return result.lastInsertRowId;
}

// Update an existing habit.
export async function updateHabit(
  db: SQLiteDatabase,
  id: number,
  data: HabitFormData
): Promise<void> {
  await db.runAsync(
    `UPDATE habits SET
      title = ?,
      description = ?,
      icon = ?,
      color = ?,
      reminder_enabled = ?,
      reminder_hour = ?,
      reminder_minute = ?
    WHERE id = ?`,
    data.title.trim(),
    data.description.trim(),
    data.icon,
    data.color,
    data.reminderEnabled ? 1 : 0,
    data.reminderHour,
    data.reminderMinute,
    id
  );
}

// Delete a habit and its completion history.
export async function deleteHabit(
  db: SQLiteDatabase,
  id: number
): Promise<void> {
  await db.withTransactionAsync(async () => {
    await db.runAsync(
      "DELETE FROM habit_logs WHERE habit_id = ?",
      id
    );

    await db.runAsync(
      "DELETE FROM habits WHERE id = ?",
      id
    );
  });
}

// Toggle today's habit completion.
export async function toggleHabit(
  db: SQLiteDatabase,
  id: number
): Promise<void> {
  const today = getLocalDate();

  await db.withTransactionAsync(async () => {
    const existing = await db.getFirstAsync<{ id: number }>(
      `SELECT id
       FROM habit_logs
       WHERE habit_id = ?
       AND completion_date = ?`,
      id,
      today
    );

    if (existing) {
      await db.runAsync(
        `DELETE FROM habit_logs
         WHERE habit_id = ?
         AND completion_date = ?`,
        id,
        today
      );
    } else {
      await db.runAsync(
        `INSERT INTO habit_logs (
          habit_id,
          completion_date
        ) VALUES (?, ?)`,
        id,
        today
      );
    }
  });
}

// Check whether a habit is completed on a specific date.
export async function isHabitCompleted(
  db: SQLiteDatabase,
  habitId: number,
  date = getLocalDate()
): Promise<boolean> {
  const result = await db.getFirstAsync<{ id: number }>(
    `SELECT id
     FROM habit_logs
     WHERE habit_id = ?
     AND completion_date = ?`,
    habitId,
    date
  );

  return Boolean(result);
}
