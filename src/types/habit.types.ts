export const HABIT_CATEGORIES = [
  "Personal",
  "Health",
  "Fitness",
  "Learning",
  "Productivity",
  "Mindfulness",
  "Finance",
  "Other",
] as const;

export type HabitCategory =
  (typeof HABIT_CATEGORIES)[number];

export interface Habit {
  id: number;
  title: string;
  description: string;
  icon: string;
  color: string;
  category: HabitCategory;
  reminder_enabled: number;
  reminder_hour: number;
  reminder_minute: number;
  created_at: string;
  completed: number;
}

export interface HabitFormData {
  title: string;
  description: string;
  icon: string;
  color: string;
  category: HabitCategory;
  reminderEnabled: boolean;
  reminderHour: number;
  reminderMinute: number;
}

export interface WeeklyProgress {
  day: string;
  date: string;
  completed: number;
  total: number;
  percentage: number;
}

export interface HabitStreak {
  habitId: number;
  currentStreak: number;
  longestStreak: number;
}

export interface Statistics {
  totalHabits: number;
  completedToday: number;
  totalCompletions: number;
  currentStreak: number;
  longestStreak: number;
  weeklyCompletion: number;
}