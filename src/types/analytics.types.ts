export interface CalendarDay {
  date: string;
  day: number;
  total: number;
  completed: number;
  percentage: number;
  isCurrentMonth: boolean;
}

export interface DayHabit {
  id: number;
  title: string;
  icon: string;
  color: string;
  category: string;
  completed: number;
}

export interface MonthSummary {
  month: number;
  label: string;
  total: number;
  completed: number;
  percentage: number;
}

export interface CategorySummary {
  category: string;
  totalHabits: number;
  completions: number;
  percentage: number;
}

export interface HabitAnalytics {
  id: number;
  title: string;
  description: string;
  icon: string;
  color: string;
  category: string;
  created_at: string;
  totalCompletions: number;
  activeDays: number;
  completionRate: number;
  currentStreak: number;
  longestStreak: number;
  lastCompleted: string | null;
  monthlyCompletions: number;
}
