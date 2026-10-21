import { StyleSheet, Text, View } from "react-native";

import { COLORS } from "../../constants/theme";

export interface CategoryOverviewItem {
  category: string;
  habits: number;
  completions: number;
  percentage: number;
  color?: string;
}

interface Props {
  categories: CategoryOverviewItem[];
}

const CATEGORY_COLORS: Record<string, string> = {
  Personal: COLORS.primary,
  Health: COLORS.green,
  Fitness: COLORS.orange,
  Learning: "#3997D8",
  Productivity: "#A06BE0",
  Mindfulness: "#20B8B0",
  Finance: "#D68B42",
  Other: COLORS.muted,
};

export function CategoryStatistics({ categories }: Props) {
  const sortedCategories = [...categories].sort(
    (a, b) => b.completions - a.completions,
  );

  if (sortedCategories.length === 0) {
    return (
      <View style={styles.card}>
        <Text style={styles.title}>Category Statistics</Text>
        <Text style={styles.emptyText}>
          Create habits and assign categories to see your statistics.
        </Text>
      </View>
    );
  }

  return (
    <View style={styles.card}>
      <View style={styles.header}>
        <View>
          <Text style={styles.title}>Category Statistics</Text>
          <Text style={styles.subtitle}>See where you spend your effort</Text>
        </View>

        <Text style={styles.count}>{sortedCategories.length}</Text>
      </View>

      <View style={styles.list}>
        {sortedCategories.map((item) => {
          const percentage = Math.min(100, Math.max(0, item.percentage));

          const color =
            item.color ?? CATEGORY_COLORS[item.category] ?? COLORS.primary;

          return (
            <View key={item.category} style={styles.categoryItem}>
              <View style={styles.categoryHeader}>
                <View style={styles.categoryNameGroup}>
                  <View
                    style={[styles.categoryDot, { backgroundColor: color }]}
                  />

                  <Text style={styles.categoryName}>{item.category}</Text>
                </View>

                <Text style={styles.percentage}>{Math.round(percentage)}%</Text>
              </View>

              <View style={styles.progressTrack}>
                <View
                  style={[
                    styles.progressFill,
                    {
                      width: `${percentage}%`,
                      backgroundColor: color,
                    },
                  ]}
                />
              </View>

              <View style={styles.categoryFooter}>
                <Text style={styles.meta}>
                  {item.habits} {item.habits === 1 ? "habit" : "habits"}
                </Text>

                <Text style={styles.meta}>{item.completions} completions</Text>
              </View>
            </View>
          );
        })}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: COLORS.white,
    borderRadius: 20,
    padding: 17,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  title: {
    color: COLORS.text,
    fontSize: 15,
    fontWeight: "800",
  },
  subtitle: {
    color: COLORS.muted,
    fontSize: 11,
    marginTop: 4,
  },
  count: {
    color: COLORS.primary,
    backgroundColor: COLORS.primaryLight,
    fontSize: 12,
    fontWeight: "800",
    paddingHorizontal: 11,
    paddingVertical: 7,
    borderRadius: 10,
  },
  list: {
    marginTop: 20,
    gap: 19,
  },
  categoryItem: {
    gap: 9,
  },
  categoryHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  categoryNameGroup: {
    flexDirection: "row",
    alignItems: "center",
    gap: 9,
  },
  categoryDot: {
    width: 9,
    height: 9,
    borderRadius: 5,
  },
  categoryName: {
    color: COLORS.text,
    fontSize: 12,
    fontWeight: "700",
  },
  percentage: {
    color: COLORS.text,
    fontSize: 11,
    fontWeight: "800",
  },
  progressTrack: {
    height: 7,
    borderRadius: 10,
    backgroundColor: COLORS.background,
    overflow: "hidden",
  },
  progressFill: {
    height: "100%",
    borderRadius: 10,
  },
  categoryFooter: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  meta: {
    color: COLORS.muted,
    fontSize: 10,
  },
  emptyText: {
    color: COLORS.muted,
    fontSize: 12,
    lineHeight: 19,
    marginTop: 12,
  },
});
