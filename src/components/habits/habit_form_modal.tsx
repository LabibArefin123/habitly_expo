import { useEffect, useState } from "react";
import { Modal, Pressable, ScrollView, Text, View } from "react-native";

import type { Habit, HabitFormData } from "../../types/habit.types";
import {
  habitFormInputStyles,
  habitFormLayoutStyles,
  habitFormOptionsStyles,
  habitFormReminderStyles,
} from "../../styles/habit";

import { DEFAULT_FORM } from "./habit_form/habit_form_utils";
import { HabitFormHeader } from "./habit_form/habit_form_header";
import { HabitFormFields } from "./habit_form/habit_form_fields";
import { HabitFormCategories } from "./habit_form/habit_form_categories";
import { HabitFormIcons } from "./habit_form/habit_form_icons";
import { HabitFormReminder } from "./habit_form/habit_form_reminder";

interface Props {
  visible: boolean;
  habit?: Habit | null;
  onClose: () => void;
  onSave: (data: HabitFormData) => Promise<void>;
}

const styles = {
  ...habitFormLayoutStyles,
  ...habitFormInputStyles,
  ...habitFormOptionsStyles,
  ...habitFormReminderStyles,
};

export function HabitFormModal({ visible, habit, onClose, onSave }: Props) {
  const [form, setForm] = useState<HabitFormData>({ ...DEFAULT_FORM });
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (!visible) return;

    if (!habit) {
      setForm({ ...DEFAULT_FORM });
      return;
    }

    setForm({
      title: habit.title,
      description: habit.description ?? "",
      icon: habit.icon,
      color: habit.color,
      category: habit.category ?? "Personal",
      reminderEnabled: Boolean(habit.reminder_enabled),
      reminderHour: habit.reminder_hour ?? 9,
      reminderMinute: habit.reminder_minute ?? 0,
    });
  }, [visible, habit]);

  const updateForm = <K extends keyof HabitFormData>(
    key: K,
    value: HabitFormData[K],
  ) => {
    setForm((previous) => ({
      ...previous,
      [key]: value,
    }));
  };

  const handleSave = async () => {
    if (!form.title.trim() || saving) return;

    setSaving(true);

    try {
      await onSave({
        ...form,
        title: form.title.trim(),
        description: form.description.trim(),
      });

      onClose();
    } catch (error) {
      console.error("Failed to save habit:", error);
    } finally {
      setSaving(false);
    }
  };

  return (
    <Modal
      visible={visible}
      transparent
      animationType="slide"
      onRequestClose={onClose}
    >
      <View style={styles.overlay}>
        <View style={styles.modal}>
          <HabitFormHeader habit={habit} onClose={onClose} />

          <ScrollView
            showsVerticalScrollIndicator={false}
            keyboardShouldPersistTaps="handled"
          >
            <HabitFormFields form={form} updateForm={updateForm} />

            <HabitFormCategories
              category={form.category}
              onChange={(value) => updateForm("category", value)}
            />

            <HabitFormIcons
              icon={form.icon}
              onChange={(value) => updateForm("icon", value)}
            />

            <HabitFormReminder form={form} updateForm={updateForm} />

            <Pressable
              style={[
                styles.saveButton,
                (!form.title.trim() || saving) && styles.disabled,
              ]}
              disabled={!form.title.trim() || saving}
              onPress={handleSave}
              accessibilityRole="button"
            >
              <Text style={styles.saveText}>
                {saving ? "Saving..." : habit ? "Update Habit" : "Create Habit"}
              </Text>
            </Pressable>
          </ScrollView>
        </View>
      </View>
    </Modal>
  );
}
