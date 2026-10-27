import { useAdvancedAnalytics } from "../../hooks/use_advanced_analytics";

type AnalyticsData = ReturnType<typeof useAdvancedAnalytics>;

export function getAnalyticData(analytics: AnalyticsData) {
  const completionDates = analytics.calendar
    .filter((item) => item.percentage > 0)
    .map((item) => item.date);

  const annualCompletions = analytics.yearly.reduce(
    (sum, item) => sum + item.completed,
    0,
  );

  const activeMonths = analytics.yearly.filter(
    (item) => item.completed > 0,
  ).length;

  const averageCompletion = analytics.yearly.length
    ? Math.round(
        analytics.yearly.reduce((sum, item) => sum + item.percentage, 0) /
          analytics.yearly.length,
      )
    : 0;

  const totalHabits =
    analytics.dayHabits.length > 0
      ? analytics.dayHabits.length
      : Math.max(0, ...analytics.calendar.map((item) => item.total));

  const categoryData = analytics.categories.map((item) => ({
    category: item.category,
    habits: item.totalHabits,
    completions: item.completions,
    percentage: item.percentage,
  }));

  const monthlyData = analytics.yearly.map((item) => ({
    month: item.label,
    completed: item.completed,
    total: item.total,
    percentage: item.percentage,
  }));

  const milestones = [
    {
      id: "first-completion",
      title: "First Step",
      description: "Complete your first habit.",
      icon: "🌱",
      target: 1,
    },
    {
      id: "ten-completions",
      title: "Getting Started",
      description: "Reach 10 habit completions.",
      icon: "⭐",
      target: 10,
    },
    {
      id: "fifty-completions",
      title: "Consistency Builder",
      description: "Reach 50 habit completions.",
      icon: "🔥",
      target: 50,
    },
    {
      id: "hundred-completions",
      title: "Century Club",
      description: "Reach 100 habit completions.",
      icon: "🏆",
      target: 100,
    },
    {
      id: "active-months",
      title: "Yearly Dedication",
      description: "Stay active in all 12 months.",
      icon: "📅",
      target: 12,
    },
  ];

  const achievementData = milestones.map((item) => {
    const current =
      item.id === "active-months" ? activeMonths : annualCompletions;

    return {
      id: item.id,
      title: item.title,
      description: item.description,
      icon: item.icon,
      unlocked: current >= item.target,
      progress: Math.min(100, Math.round((current / item.target) * 100)),
      target: 100,
    };
  });

  return {
    completionDates,
    annualCompletions,
    activeMonths,
    averageCompletion,
    totalHabits,
    categoryData,
    monthlyData,
    achievementData,
  };
}
