import { useMemo } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";

import { COLORS } from "../../constants/theme";

interface Props {
  currentMonth: Date;
  completionDates: string[];
  selectedDate: string;
  onSelectDate: (date: string) => void;
  onMonthChange: (date: Date) => void;
}

const WEEK_DAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

function getDateKey(date: Date): string {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");

  return `${year}-${month}-${day}`;
}

export function MonthlyCalendar({
  currentMonth,
  completionDates,
  selectedDate,
  onSelectDate,
  onMonthChange,
}: Props) {
  const today = getDateKey(new Date());

  const completedSet = useMemo(
    () => new Set(completionDates),
    [completionDates],
  );

  const year = currentMonth.getFullYear();
  const month = currentMonth.getMonth();

  const firstDay = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();

  const calendarDays = [
    ...Array(firstDay).fill(null),
    ...Array.from({ length: daysInMonth }, (_, index) => index + 1),
  ];

  const monthTitle = currentMonth.toLocaleDateString("en-US", {
    month: "long",
    year: "numeric",
  });

  const changeMonth = (amount: number) => {
    onMonthChange(new Date(year, month + amount, 1));
  };

  const completedCount = calendarDays.filter((day) => {
    if (day === null) return false;

    return completedSet.has(getDateKey(new Date(year, month, day)));
  }).length;

  return (
    <View style={styles.card}>
      <View style={styles.header}>
        <View>
          <Text style={styles.title}>Monthly Calendar</Text>
          <Text style={styles.subtitle}>Your daily consistency</Text>
        </View>

        <View style={styles.navigation}>
          <Pressable
            style={styles.arrowButton}
            onPress={() => changeMonth(-1)}
            accessibilityLabel="Previous month"
          >
            <Text style={styles.arrow}>‹</Text>
          </Pressable>

          <Pressable
            style={styles.arrowButton}
            onPress={() => changeMonth(1)}
            accessibilityLabel="Next month"
          >
            <Text style={styles.arrow}>›</Text>
          </Pressable>
        </View>
      </View>

      <Text style={styles.monthTitle}>{monthTitle}</Text>

      <View style={styles.weekRow}>
        {WEEK_DAYS.map((day) => (
          <Text key={day} style={styles.weekDay}>
            {day}
          </Text>
        ))}
      </View>

      <View style={styles.calendarGrid}>
        {calendarDays.map((day, index) => {
          if (day === null) {
            return <View key={`empty-${index}`} style={styles.dayCell} />;
          }

          const date = getDateKey(new Date(year, month, day));

          const completed = completedSet.has(date);
          const selected = selectedDate === date;
          const isToday = today === date;

          return (
            <Pressable
              key={date}
              style={styles.dayCell}
              onPress={() => onSelectDate(date)}
              accessibilityRole="button"
              accessibilityLabel={`${date}${completed ? ", completed" : ""}`}
              accessibilityState={{ selected }}
            >
              <View
                style={[
                  styles.dayCircle,
                  completed && styles.completedDay,
                  isToday && styles.todayDay,
                  selected && styles.selectedDay,
                ]}
              >
                <Text
                  style={[
                    styles.dayText,
                    completed && styles.completedDayText,
                    selected && styles.selectedDayText,
                  ]}
                >
                  {day}
                </Text>
              </View>

              {completed && <View style={styles.completionDot} />}
            </Pressable>
          );
        })}
      </View>

      <View style={styles.footer}>
        <View style={styles.legend}>
          <View style={styles.legendDot} />
          <Text style={styles.legendText}>Completed</Text>
        </View>

        <Text style={styles.completedCount}>
          {completedCount} completed days
        </Text>
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
    alignItems: "center",
    justifyContent: "space-between",
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
  navigation: {
    flexDirection: "row",
    gap: 8,
  },
  arrowButton: {
    width: 32,
    height: 32,
    borderRadius: 10,
    backgroundColor: COLORS.background,
    alignItems: "center",
    justifyContent: "center",
  },
  arrow: {
    color: COLORS.text,
    fontSize: 23,
    lineHeight: 26,
  },
  monthTitle: {
    color: COLORS.text,
    fontSize: 13,
    fontWeight: "800",
    marginTop: 22,
    marginBottom: 16,
    textAlign: "center",
  },
  weekRow: {
    flexDirection: "row",
    marginBottom: 10,
  },
  weekDay: {
    width: `${100 / 7}%`,
    textAlign: "center",
    color: COLORS.muted,
    fontSize: 10,
    fontWeight: "700",
  },
  calendarGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
  },
  dayCell: {
    width: `${100 / 7}%`,
    aspectRatio: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  dayCircle: {
    width: 34,
    height: 34,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
  },
  dayText: {
    color: COLORS.text,
    fontSize: 12,
    fontWeight: "600",
  },
  completedDay: {
    backgroundColor: COLORS.greenLight,
  },
  completedDayText: {
    color: COLORS.green,
    fontWeight: "800",
  },
  todayDay: {
    borderWidth: 1.5,
    borderColor: COLORS.primary,
  },
  selectedDay: {
    backgroundColor: COLORS.primary,
  },
  selectedDayText: {
    color: COLORS.white,
  },
  completionDot: {
    position: "absolute",
    bottom: 1,
    width: 4,
    height: 4,
    borderRadius: 2,
    backgroundColor: COLORS.green,
  },
  footer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderTopWidth: 1,
    borderTopColor: COLORS.border,
    marginTop: 12,
    paddingTop: 13,
  },
  legend: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },
  legendDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: COLORS.green,
  },
  legendText: {
    color: COLORS.muted,
    fontSize: 10,
  },
  completedCount: {
    color: COLORS.text,
    fontSize: 10,
    fontWeight: "700",
  },
});
