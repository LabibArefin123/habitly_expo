export interface Habit {
  id: number;
  title: string;
  description: string;
  icon: string;
  color: string;
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