import { useMemo } from "react";
import { Pressable, Text, View } from "react-native";
import { monthlyCalendarStyles as styles } from "../../styles/analytics_part/monthly_calendar.styles";
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
