import { useCallback, useEffect, useState } from "react";
import { useSQLiteContext } from "expo-sqlite";
import type {
  CalendarDay, DayHabit, MonthSummary, CategorySummary,
} from "../types/analytics.types";
import {
  getMonthCalendar, getHabitsForDate, getYearOverview, getCategoryOverview,
} from "../database/advanced_analytics_queries";

export function useAdvancedAnalytics() {
  const db = useSQLiteContext();
  const now = new Date();
  const [year, setYear] = useState(now.getFullYear());
  const [month, setMonth] = useState(now.getMonth() + 1);
  const [calendar, setCalendar] = useState<CalendarDay[]>([]);
  const [selectedDate, setSelectedDate] = useState(
    `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, "0")}-${String(now.getDate()).padStart(2, "0")}`
  );
  const [dayHabits, setDayHabits] = useState<DayHabit[]>([]);
  const [yearly, setYearly] = useState<MonthSummary[]>([]);
  const [categories, setCategories] = useState<CategorySummary[]>([]);
  const [loading, setLoading] = useState(true);

  const refresh = useCallback(async () => {
    setLoading(true);
    try {
      const [days, yearData, categoryData, selected] = await Promise.all([
        getMonthCalendar(db, year, month),
        getYearOverview(db, year),
        getCategoryOverview(db),
        getHabitsForDate(db, selectedDate),
      ]);
      setCalendar(days);
      setYearly(yearData);
      setCategories(categoryData);
      setDayHabits(selected);
    } finally {
      setLoading(false);
    }
  }, [db, year, month, selectedDate]);

  useEffect(() => { refresh().catch(console.error); }, [refresh]);

 
const changeMonth = (amount: number) => {
  const date = new Date(year, month - 1 + amount, 1);

  setYear(date.getFullYear());
  setMonth(date.getMonth() + 1);

  setSelectedDate(
    `${date.getFullYear()}-${String(
      date.getMonth() + 1
    ).padStart(2, "0")}-01`
  );
};

  const selectDate = async (date: string) => {
    setSelectedDate(date);
    setDayHabits(await getHabitsForDate(db, date));
  };

  return {
    year, month, calendar, selectedDate, dayHabits, yearly, categories,
    loading, changeMonth, selectDate, refresh,
  };
}
