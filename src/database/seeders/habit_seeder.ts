
import type { SQLiteDatabase } from "expo-sqlite";

type SeedHabit = {
  title: string;
  description: string;
  icon: string;
  color: string;
  category: string;
  reminderHour: number;
  reminderMinute: number;
  completedOffsets: number[];
};

const SEED_KEY = "habitly_demo_habits_v1";

function getDateOffset(offset: number): string {
  const date = new Date();

  date.setHours(0, 0, 0, 0);
  date.setDate(date.getDate() - offset);

  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");

  return `${year}-${month}-${day}`;
}

const DEMO_HABITS: SeedHabit[] = [
  {
    title: "Deep Coding Session",
    description: "Spend focused time building software projects.",
    icon: "💻",
    color: "#6C63FF",
    category: "Productivity",
    reminderHour: 9,
    reminderMinute: 0,
    completedOffsets: [0, 1, 2, 3, 4, 5, 6],
  },
  {
    title: "Learn Something New",
    description: "Learn a new programming concept or technology.",
    icon: "📚",
    color: "#3B82F6",
    category: "Learning",
    reminderHour: 11,
    reminderMinute: 0,
    completedOffsets: [0, 1, 3, 4, 6],
  },
  {
    title: "Morning Exercise",
    description: "Stay active with a short workout.",
    icon: "🏃",
    color: "#F59E0B",
    category: "Fitness",
    reminderHour: 7,
    reminderMinute: 0,
    completedOffsets: [0, 2, 4, 6],
  },
  {
    title: "Take a Daily Walk",
    description: "Take a break and enjoy some fresh air.",
    icon: "🚶",
    color: "#10B981",
    category: "Health",
    reminderHour: 17,
    reminderMinute: 0,
    completedOffsets: [0, 1, 2, 4, 5],
  },
  {
    title: "Drink Enough Water",
    description: "Stay hydrated throughout the day.",
    icon: "💧",
    color: "#06B6D4",
    category: "Health",
    reminderHour: 10,
    reminderMinute: 0,
    completedOffsets: [0, 1, 2, 3, 4, 5, 6],
  },
  {
    title: "Plan My Day",
    description: "Organize tasks and prioritize important work.",
    icon: "📝",
    color: "#8B5CF6",
    category: "Productivity",
    reminderHour: 8,
    reminderMinute: 0,
    completedOffsets: [0, 1, 2, 3, 4, 5, 6],
  },
  {
    title: "Read for 20 Minutes",
    description: "Read a book or useful technical documentation.",
    icon: "📖",
    color: "#EC4899",
    category: "Learning",
    reminderHour: 20,
    reminderMinute: 0,
    completedOffsets: [0, 1, 3, 4, 6],
  },
  {
    title: "Write Daily Journal",
    description: "Reflect on progress and daily experiences.",
    icon: "✍️",
    color: "#F97316",
    category: "Personal",
    reminderHour: 21,
    reminderMinute: 0,
    completedOffsets: [1, 2, 4, 6],
  },
  {
    title: "Maintain Healthy Sleep",
    description: "Follow a consistent sleep schedule.",
    icon: "🌙",
    color: "#64748B",
    category: "Health",
    reminderHour: 22,
    reminderMinute: 0,
    completedOffsets: [0, 1, 2, 3, 5, 6],
  },
];

export async function seedHabitData(
  db: SQLiteDatabase,
): Promise<void> {
  const existingSeed = await db.getFirstAsync<{ setting_value: string }>(
    "SELECT setting_value FROM settings WHERE setting_key = ?",
    SEED_KEY,
  );

  if (existingSeed) {
    return;
  }

  await db.withTransactionAsync(async () => {
    for (const habit of DEMO_HABITS) {
      // Reuse an existing matching habit if an older seeder
      // already inserted it before the seed marker existed.
      let existingHabit = await db.getFirstAsync<{ id: number }>(
        "SELECT id FROM habits WHERE title = ? LIMIT 1",
        habit.title,
      );

      let habitId = existingHabit?.id;

      if (!habitId) {
        const result = await db.runAsync(
          `INSERT INTO habits (
            title,
            description,
            icon,
            color,
            category,
            reminder_enabled,
            reminder_hour,
            reminder_minute,
            created_at
          ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
          habit.title,
          habit.description,
          habit.icon,
          habit.color,
          habit.category,
          1,
          habit.reminderHour,
          habit.reminderMinute,
          `${getDateOffset(6)} 07:30:00`,
        );

        habitId = result.lastInsertRowId;
      }

      // Add the previous seven days of completion history.
      for (const offset of habit.completedOffsets) {
        await db.runAsync(
          `INSERT OR IGNORE INTO habit_logs (
            habit_id,
            completion_date
          ) VALUES (?, ?)`,
          habitId,
          getDateOffset(offset),
        );
      }
    }

    // Mark seeding as complete only after all records are inserted.
    await db.runAsync(
      `INSERT OR REPLACE INTO settings (
        setting_key,
        setting_value
      ) VALUES (?, ?)`,
      SEED_KEY,
      "completed",
    );
  });

  console.log("Habitly demo habits seeded successfully.");
}
