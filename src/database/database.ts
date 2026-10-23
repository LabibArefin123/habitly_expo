
import type { SQLiteDatabase } from "expo-sqlite";

import { seedHabitData } from "./seeders/habit_seeder";

export async function initializeDatabase(
  db: SQLiteDatabase,
): Promise<void> {
  await db.execAsync(`
    PRAGMA journal_mode = WAL;
    PRAGMA foreign_keys = ON;

    CREATE TABLE IF NOT EXISTS habits (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      title TEXT NOT NULL,
      description TEXT DEFAULT '',
      icon TEXT DEFAULT '🎯',
      color TEXT DEFAULT '#6C63FF',
      reminder_enabled INTEGER DEFAULT 0,
      reminder_hour INTEGER DEFAULT 9,
      reminder_minute INTEGER DEFAULT 0,
      created_at TEXT DEFAULT CURRENT_TIMESTAMP
    );

    CREATE TABLE IF NOT EXISTS habit_logs (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      habit_id INTEGER NOT NULL,
      completion_date TEXT NOT NULL,
      completed_at TEXT DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (habit_id) REFERENCES habits(id) ON DELETE CASCADE,
      UNIQUE(habit_id, completion_date)
    );

    CREATE TABLE IF NOT EXISTS settings (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      setting_key TEXT NOT NULL UNIQUE,
      setting_value TEXT NOT NULL
    );

    CREATE TABLE IF NOT EXISTS habit_reminders (
      habit_id INTEGER PRIMARY KEY,
      notification_id TEXT NOT NULL,
      FOREIGN KEY (habit_id) REFERENCES habits(id) ON DELETE CASCADE
    );
  `);

  // Check existing columns.
  const columns = await db.getAllAsync<{ name: string }>(
    "PRAGMA table_info(habits)",
  );

  const hasCategoryColumn = columns.some(
    (column) => column.name === "category",
  );

  // Add category for existing databases.
  if (!hasCategoryColumn) {
    await db.execAsync(`
      ALTER TABLE habits
      ADD COLUMN category TEXT NOT NULL DEFAULT 'Personal';
    `);
  }

  // Normalize empty category values.
  await db.runAsync(`
    UPDATE habits
    SET category = 'Personal'
    WHERE category IS NULL OR TRIM(category) = '';
  `);

  // Seed after tables and migrations are ready.
  await seedHabitData(db);
}
