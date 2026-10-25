
import type { SQLiteDatabase } from "expo-sqlite";

import type { CategorySummary } from "../../types/analytics.types";

export async function getCategoryOverview(
  db: SQLiteDatabase,
): Promise<CategorySummary[]> {
  return db.getAllAsync<CategorySummary>(
    `SELECT
      h.category,

      COUNT(DISTINCT h.id) AS totalHabits,

      COUNT(l.id) AS completions,

      CASE
        WHEN SUM(
          CASE
            WHEN CAST(
              julianday('now') - julianday(h.created_at)
              AS INTEGER
            ) + 1 > 0
            THEN CAST(
              julianday('now') - julianday(h.created_at)
              AS INTEGER
            ) + 1
            ELSE 1
          END
        ) = 0
        THEN 0

        ELSE ROUND(
          COUNT(l.id) * 100.0 /
          SUM(
            CASE
              WHEN CAST(
                julianday('now') - julianday(h.created_at)
                AS INTEGER
              ) + 1 > 0
              THEN CAST(
                julianday('now') - julianday(h.created_at)
                AS INTEGER
              ) + 1
              ELSE 1
            END
          ),
          0
        )
      END AS percentage

     FROM habits h

     LEFT JOIN habit_logs l
       ON l.habit_id = h.id

     GROUP BY h.category

     ORDER BY completions DESC`,
  );
}
