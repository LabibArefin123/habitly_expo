import * as Notifications from "expo-notifications";
import { Platform } from "react-native";
import type { SQLiteDatabase } from "expo-sqlite";

const CHANNEL_ID = "habit-reminders";

interface ReminderHabit {
  id: number;
  title: string;
  description: string;
  icon: string;
  reminder_enabled: number;
  reminder_hour: number;
  reminder_minute: number;
}

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowBanner: true,
    shouldShowList: true,
    shouldPlaySound: true,
    shouldSetBadge: false,
  }),
});

export async function configureNotifications(): Promise<void> {
  if (Platform.OS === "android") {
    await Notifications.setNotificationChannelAsync(CHANNEL_ID, {
      name: "Habit Reminders",
      description: "Daily reminders for your habits",
      importance: Notifications.AndroidImportance.HIGH,
      vibrationPattern: [0, 250, 250, 250],
      lightColor: "#6C63FF",
      sound: "default",
    });
  }
}

export async function requestNotificationPermission(): Promise<boolean> {
  const current = await Notifications.getPermissionsAsync();

  if (current.granted) {
    return true;
  }

  const requested = await Notifications.requestPermissionsAsync();

  return requested.granted;
}

export async function cancelHabitReminder(
  db: SQLiteDatabase,
  habitId: number
): Promise<void> {
  const reminder = await db.getFirstAsync<{ notification_id: string }>(
    `SELECT notification_id
     FROM habit_reminders
     WHERE habit_id = ?`,
    habitId
  );

  if (reminder) {
    try {
      await Notifications.cancelScheduledNotificationAsync(
        reminder.notification_id
      );
    } catch (error) {
      console.warn("Unable to cancel old reminder:", error);
    }

    await db.runAsync(
      "DELETE FROM habit_reminders WHERE habit_id = ?",
      habitId
    );
  }
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

  if (!habit || !habit.reminder_enabled) {
    return false;
  }

  const hasPermission = await requestNotificationPermission();

  if (!hasPermission) {
    return false;
  }

  const notificationId = await Notifications.scheduleNotificationAsync({
    content: {
      title: `${habit.icon} Time for ${habit.title}!`,
      body: habit.description.trim()
        ? habit.description
        : "A small step today makes a big difference.",
      sound: "default",
      data: {
        habitId: habit.id,
        screen: "home",
      },
    },
    trigger: {
      type: Notifications.SchedulableTriggerInputTypes.DAILY,
      hour: habit.reminder_hour,
      minute: habit.reminder_minute,
      ...(Platform.OS === "android" ? { channelId: CHANNEL_ID } : {}),
    },
  });

  await db.runAsync(
    `INSERT OR REPLACE INTO habit_reminders (
      habit_id, notification_id
    ) VALUES (?, ?)`,
    habitId,
    notificationId
  );

  return true;
}

export async function restoreScheduledHabitReminders(
  db: SQLiteDatabase
): Promise<void> {
  await configureNotifications();

  const permissions = await Notifications.getPermissionsAsync();

  if (!permissions.granted) {
    return;
  }

  const existing = await db.getAllAsync<{ notification_id: string }>(
    "SELECT notification_id FROM habit_reminders"
  );

  for (const reminder of existing) {
    try {
      await Notifications.cancelScheduledNotificationAsync(
        reminder.notification_id
      );
    } catch (error) {
      console.warn("Unable to restore reminder:", error);
    }
  }

  await db.runAsync("DELETE FROM habit_reminders");

  const habits = await db.getAllAsync<ReminderHabit>(
    `SELECT id, title, description, icon,
      reminder_enabled, reminder_hour, reminder_minute
     FROM habits
     WHERE reminder_enabled = 1`
  );

  for (const habit of habits) {
    const notificationId = await Notifications.scheduleNotificationAsync({
      content: {
        title: `${habit.icon} Time for ${habit.title}!`,
        body: habit.description.trim()
          ? habit.description
          : "A small step today makes a big difference.",
        sound: "default",
        data: {
          habitId: habit.id,
          screen: "home",
        },
      },
      trigger: {
        type: Notifications.SchedulableTriggerInputTypes.DAILY,
        hour: habit.reminder_hour,
        minute: habit.reminder_minute,
        ...(Platform.OS === "android" ? { channelId: CHANNEL_ID } : {}),
      },
    });

    await db.runAsync(
      `INSERT OR REPLACE INTO habit_reminders (
        habit_id, notification_id
      ) VALUES (?, ?)`,
      habit.id,
      notificationId
    );
  }
}