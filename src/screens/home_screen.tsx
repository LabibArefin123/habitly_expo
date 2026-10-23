import { useEffect, useMemo, useState } from "react";
import { Alert, Modal, Pressable, ScrollView, Text, View } from "react-native";

import { useHabits } from "../hooks/use_habits";
import { useStatistics } from "../hooks/use_statistics";

import { HabitFormModal } from "../components/habits/habit_form_modal";
import { HomeHeader } from "../components/home/home_header";
import { HomeStatistics } from "../components/home/home_statistics";
import { HomeHabitsSection } from "../components/home/home_habits_section";
import { HomeMotivation } from "../components/home/home_motivation";

import { ProfileScreen } from "./profile";

import { homeStyles as styles } from "../styles/home.styles";

import type { Habit, HabitFormData } from "../types/habit.types";

export function HomeScreen() {
  const { habits, loading, addHabit, editHabit, removeHabit, completeHabit } =
    useHabits();

  const { statistics, weeklyProgress, habitStreaks, refreshStatistics } =
    useStatistics();

  const [modalVisible, setModalVisible] = useState(false);
  const [profileVisible, setProfileVisible] = useState(false);
  const [selectedHabit, setSelectedHabit] = useState<Habit | null>(null);

  useEffect(() => {
    if (!loading) {
      refreshStatistics().catch(console.error);
    }
  }, [habits, loading, refreshStatistics]);

  const streakMap = useMemo(
    () =>
      Object.fromEntries(
        habitStreaks.map((item) => [item.habitId, item.currentStreak]),
      ) as Record<number, number>,
    [habitStreaks],
  );

  // Profile modal
  const openProfile = () => {
    setProfileVisible(true);
  };

  const closeProfile = () => {
    setProfileVisible(false);
  };

  // Add habit
  const openAddModal = () => {
    setSelectedHabit(null);
    setModalVisible(true);
  };

  // Edit habit
  const openEditModal = (habit: Habit) => {
    setSelectedHabit(habit);
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
    setSelectedHabit(null);
  };

  // Save habit
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
      Alert.alert("Error", "Unable to save your habit.");
      throw error;
    }
  };

  // Delete habit
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
              await refreshStatistics();
            } catch (error) {
              console.error(error);
              Alert.alert("Error", "Unable to delete this habit.");
            }
          },
        },
      ],
    );
  };

  // Complete habit
  const handleToggle = async (id: number) => {
    try {
      await completeHabit(id);
      await refreshStatistics();
    } catch (error) {
      console.error(error);
      Alert.alert("Error", "Unable to update habit.");
    }
  };

  return (
    <View style={styles.container}>
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
      >
        {/* Home header with clickable L avatar */}
        <HomeHeader onProfilePress={openProfile} />

        <HomeStatistics
          statistics={statistics}
          weeklyProgress={weeklyProgress}
        />

        <HomeHabitsSection
          habits={habits}
          loading={loading}
          completedToday={statistics.completedToday}
          totalHabits={habits.length}
          streakMap={streakMap}
          onAdd={openAddModal}
          onToggle={handleToggle}
          onEdit={openEditModal}
          onDelete={handleDelete}
        />

        <HomeMotivation />
      </ScrollView>

      {/* Floating Add Habit button */}
      <Pressable
        style={styles.floatingAddButton}
        onPress={openAddModal}
        accessibilityRole="button"
        accessibilityLabel="Add a new habit"
      >
        <Text style={styles.floatingAddIcon}>+</Text>
        <Text style={styles.floatingAddText}>Add Habit</Text>
      </Pressable>

      {/* Add/Edit Habit Modal */}
      <HabitFormModal
        visible={modalVisible}
        habit={selectedHabit}
        onClose={closeModal}
        onSave={handleSave}
      />

      {/* Profile Modal */}
      <Modal
        visible={profileVisible}
        animationType="slide"
        presentationStyle="fullScreen"
        statusBarTranslucent={false}
        onRequestClose={closeProfile}
      >
        <View style={{ flex: 1 }}>
          <ProfileScreen onBack={closeProfile} />
        </View>
      </Modal>
    </View>
  );
}
