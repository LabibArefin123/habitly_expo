import { useEffect, useMemo, useState } from "react";
import { Alert, StyleSheet, View } from "react-native";

import { COLORS } from "../constants/theme";
import { useHabits } from "../hooks/use_habits";
import { useStatistics } from "../hooks/use_statistics";

import { HabitFormModal } from "../components/habits/habit_form_modal";
import { HomeHeader } from "../components/home/home_header";
import { HomeStatistics } from "../components/home/home_statistics";
import { HomeHabitsSection } from "../components/home/home_habits_section";
import { HomeMotivation } from "../components/home/home_motivation";

import type { Habit, HabitFormData } from "../types/habit.types";

export function HomeScreen() {
  const { habits, loading, addHabit, editHabit, removeHabit, completeHabit } =
    useHabits();

  const { statistics, weeklyProgress, habitStreaks, refreshStatistics } =
    useStatistics();

  const [modalVisible, setModalVisible] = useState(false);
  const [selectedHabit, setSelectedHabit] = useState<Habit | null>(null);

  useEffect(() => {
    if (!loading) {
      refreshStatistics().catch((error) => {
        console.error("Unable to refresh statistics:", error);
      });
    }
  }, [habits, loading, refreshStatistics]);

  const streakMap = useMemo(
    () =>
      Object.fromEntries(
        habitStreaks.map((item) => [item.habitId, item.currentStreak]),
      ) as Record<number, number>,
    [habitStreaks],
  );

  const openAddModal = () => {
    setSelectedHabit(null);
    setModalVisible(true);
  };

  const openEditModal = (habit: Habit) => {
    setSelectedHabit(habit);
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
    setSelectedHabit(null);
  };

  const handleSave = async (data: HabitFormData) => {
    try {
      if (selectedHabit) {
        await editHabit(selectedHabit.id, data);
      } else {
        await addHabit(data);
      }

      closeModal();
    } catch (error) {
      console.error("Unable to save habit:", error);
      Alert.alert("Error", "Unable to save your habit. Please try again.");
      throw error;
    }
  };

  const handleDelete = (habit: Habit) => {
    Alert.alert(
      "Delete Habit",
      `Are you sure you want to delete "${habit.title}"?`,
      [
        {
          text: "Cancel",
          style: "cancel",
        },
        {
          text: "Delete",
          style: "destructive",
          onPress: async () => {
            try {
              await removeHabit(habit.id);
            } catch (error) {
              console.error("Unable to delete habit:", error);
              Alert.alert("Error", "Unable to delete this habit.");
            }
          },
        },
      ],
    );
  };
 
  const handleToggle = async (id: number): Promise<void> => {
    await completeHabit(id);
    await refreshStatistics();
  };

  return (
    <View style={styles.container}>
      <HomeHeader />

      <HomeStatistics statistics={statistics} weeklyProgress={weeklyProgress} />

      <HomeHabitsSection
        habits={habits}
        loading={loading}
        completedToday={statistics.completedToday}
        totalHabits={statistics.totalHabits}
        streakMap={streakMap}
        onAdd={openAddModal}
        onToggle={handleToggle}
        onEdit={openEditModal}
        onDelete={handleDelete}
      />

      <HomeMotivation />

      <HabitFormModal
        visible={modalVisible}
        habit={selectedHabit}
        onClose={closeModal}
        onSave={handleSave}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
    paddingHorizontal: 20,
    paddingTop: 20,
  },
});
