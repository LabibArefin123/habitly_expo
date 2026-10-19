import type { SQLiteDatabase } from "expo-sqlite";
import {
  configureNotifications as configureServiceNotifications,
  requestNotificationPermission as requestServiceNotificationPermission,
  cancelHabitReminder as cancelServiceHabitReminder,
  scheduleHabitReminder as scheduleServiceHabitReminder,
  restoreScheduledHabitReminders as restoreServiceHabitReminders,
} from "../services/notification_service";

export async function configureNotifications(): Promise<void> {
  await configureServiceNotifications();
}

export async function requestNotificationPermission(): Promise<boolean> {
  return requestServiceNotificationPermission();
}

export async function cancelHabitReminder(
  db: SQLiteDatabase,
  habitId: number
): Promise<void> {
  await cancelServiceHabitReminder(db, habitId);
}

export async function scheduleHabitReminder(
  db: SQLiteDatabase,
  habitId: number
): Promise<boolean> {
  return scheduleServiceHabitReminder(db, habitId);
}

export async function restoreScheduledHabitReminders(
  db: SQLiteDatabase
): Promise<void> {
  await restoreServiceHabitReminders(db);
}