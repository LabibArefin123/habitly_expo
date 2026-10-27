
import { COLORS } from "../../../constants/theme";
import type { HabitFormData } from "../../../types/habit.types";

export const HABIT_ICONS = [
  "🏃",
  "📚",
  "💧",
  "🧘",
  "🌙",
  "🎯",
  "🥗",
  "✍️",
];

export const DEFAULT_FORM: HabitFormData = {
  title: "",
  description: "",
  icon: "🎯",
  color: COLORS.primary,
  category: "Personal",
  reminderEnabled: false,
  reminderHour: 9,
  reminderMinute: 0,
};

export function getReminderTimeValue(
  key: "reminderHour" | "reminderMinute",
  value: string,
): number {
  const maximum = key === "reminderHour" ? 23 : 59;

  if (value.trim() === "") {
    return 0;
  }

  const parsed = Number(value);

  return Math.min(
    maximum,
    Math.max(0, Number.isFinite(parsed) ? parsed : 0),
  );
}
