import { Text, View } from "react-native";
import { COLORS } from "../../constants/theme";
import { categoryStatisticsStyles as styles } from "../../styles/analytics_part/category_statistics.styles";
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
