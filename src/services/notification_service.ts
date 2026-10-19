import type { SQLiteDatabase } from "expo-sqlite";

interface ReminderHabit {
  id: number;
  title: string;
  description: string;
  icon: string;
  reminder_enabled: number;
  reminder_hour: number;
  reminder_minute: number;
}

export async function configureNotifications(): Promise<void> {
  // Notifications are temporarily disabled for Expo Go compatibility.
}

export async function requestNotificationPermission(): Promise<boolean> {
  return false;
}

export async function cancelHabitReminder(
  db: SQLiteDatabase,
  habitId: number
): Promise<void> {
  await db.runAsync(
    "DELETE FROM habit_reminders WHERE habit_id = ?",
    habitId
  );
}

export async function scheduleHabitReminder(
  db: SQLiteDatabase,
  habitId: number
): Promise<boolean> {
  await cancelHabitReminder(db, habitId);

  const habit = await db.getFirstAsync<ReminderHabit>(
    `SELECT id, title, description, icon,
      reminder_enabled, reminder_hour, reminder_minute
     FROM habits
     WHERE id = ?`,
    habitId
  );

  // Keep habit data unchanged; scheduling is disabled temporarily.
  return false;
}

export async function restoreScheduledHabitReminders(
  db: SQLiteDatabase
): Promise<void> {
  // Clear saved notification IDs without accessing native notifications.
  await db.runAsync("DELETE FROM habit_reminders");
}