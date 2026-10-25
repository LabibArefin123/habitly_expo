
import type { SQLiteDatabase } from "expo-sqlite";

import type { MonthSummary } from "../../types/analytics.types";

function createDateKey(
  year: number,
  month: number,
  day: number,
): string {
  return `${year}-${String(month).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
}

export async function getYearOverview(
  db: SQLiteDatabase,
  year: number,
): Promise<MonthSummary[]> {
  const output: MonthSummary[] = [];

  for (let month = 1; month <= 12; month++) {
    const daysInMonth = new Date(year, month, 0).getDate();

    const start = createDateKey(year, month, 1);
    const end = createDateKey(year, month, daysInMonth);

    const result = await db.getFirstAsync<{
      total: number;
      completed: number;
    }>(
      `SELECT
        (
          SELECT COUNT(*)
          FROM habits h
          WHERE substr(h.created_at, 1, 10) <= ?
        ) * ? AS total,

        (
          SELECT COUNT(*)
          FROM habit_logs l
          INNER JOIN habits h ON h.id = l.habit_id
          WHERE l.completion_date BETWEEN ? AND ?
            AND substr(h.created_at, 1, 10) <= ?
        ) AS completed`,
      end,
      daysInMonth,
      start,
      end,
      end,
    );

    const total = result?.total ?? 0;
    const completed = result?.completed ?? 0;

    output.push({
      month,
      label: new Date(year, month - 1, 1).toLocaleDateString(
        "en-US",
        { month: "short" },
      ),
      total,
      completed,
      percentage: total
        ? Math.round((completed / total) * 100)
        : 0,
    });
  }

  return output;
}
