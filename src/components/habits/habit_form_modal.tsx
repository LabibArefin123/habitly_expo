import { useEffect, useState } from "react";
import {
  Modal,
  Pressable,
  ScrollView,
  Switch,
  Text,
  TextInput,
  View,
} from "react-native";

import { COLORS } from "../../constants/theme";

import {
  HABIT_CATEGORIES,
  type Habit,
  type HabitFormData,
} from "../../types/habit.types";

import {
  habitFormInputStyles,
  habitFormLayoutStyles,
  habitFormOptionsStyles,
  habitFormReminderStyles,
} from "../../styles/habit";

interface Props {
  visible: boolean;
  habit?: Habit | null;
  onClose: () => void;
  onSave: (data: HabitFormData) => Promise<void>;
}

const ICONS = ["🏃", "📚", "💧", "🧘", "🌙", "🎯", "🥗", "✍️"];

const DEFAULT_FORM: HabitFormData = {
  title: "",
  description: "",
  icon: "🎯",
  color: COLORS.primary,
  category: "Personal",
  reminderEnabled: false,
  reminderHour: 9,
  reminderMinute: 0,
};

const styles = {
  ...habitFormLayoutStyles,
  ...habitFormInputStyles,
  ...habitFormOptionsStyles,
  ...habitFormReminderStyles,
};

export function HabitFormModal({ visible, habit, onClose, onSave }: Props) {
  const [form, setForm] = useState<HabitFormData>(DEFAULT_FORM);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (!visible) return;

    setForm(
      habit
        ? {
            title: habit.title,
            description: habit.description ?? "",
            icon: habit.icon,
            color: habit.color,
            category: habit.category ?? "Personal",
            reminderEnabled: Boolean(habit.reminder_enabled),
            reminderHour: habit.reminder_hour,
            reminderMinute: habit.reminder_minute,
          }
        : { ...DEFAULT_FORM },
    );
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
    } catch {
      // Keep the modal open if saving fails.
    } finally {
      setSaving(false);
    }
  };

  const updateReminderTime = (
    key: "reminderHour" | "reminderMinute",
    value: string,
  ) => {
    const parsed = Number(value);
    const maximum = key === "reminderHour" ? 23 : 59;

    updateForm(
      key,
      value.trim() === ""
        ? 0
        : Math.min(maximum, Math.max(0, Number.isFinite(parsed) ? parsed : 0)),
    );
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
          <View style={styles.header}>
            <View>
              <Text style={styles.heading}>
                {habit ? "Edit Habit" : "Create Habit"}
              </Text>

              <Text style={styles.headerSubtitle}>
                Build a better daily routine
              </Text>
            </View>

            <Pressable
              onPress={onClose}
              style={styles.closeButton}
              accessibilityRole="button"
              accessibilityLabel="Close habit form"
            >
              <Text style={styles.close}>✕</Text>
            </Pressable>
          </View>

          <ScrollView
            showsVerticalScrollIndicator={false}
            keyboardShouldPersistTaps="handled"
          >
            <Text style={styles.label}>Habit Name</Text>

            <TextInput
              style={styles.input}
              placeholder="e.g. Morning Exercise"
              placeholderTextColor={COLORS.muted}
              value={form.title}
              onChangeText={(value) => updateForm("title", value)}
              maxLength={60}
              returnKeyType="next"
            />

            <Text style={styles.label}>Description</Text>

            <TextInput
              style={[styles.input, styles.descriptionInput]}
              placeholder="Add a short description..."
              placeholderTextColor={COLORS.muted}
              value={form.description}
              onChangeText={(value) => updateForm("description", value)}
              multiline
              maxLength={150}
            />

            <Text style={styles.label}>Habit Category</Text>

            <View style={styles.categories}>
              {HABIT_CATEGORIES.map((category) => {
                const selected = form.category === category;

                return (
                  <Pressable
                    key={category}
                    onPress={() => updateForm("category", category)}
                    style={[
                      styles.categoryButton,
                      selected && styles.selectedCategory,
                    ]}
                    accessibilityRole="button"
                    accessibilityState={{ selected }}
                  >
                    <Text
                      style={[
                        styles.categoryText,
                        selected && styles.selectedCategoryText,
                      ]}
                    >
                      {category}
                    </Text>
                  </Pressable>
                );
              })}
            </View>

            <Text style={styles.label}>Choose Icon</Text>

            <View style={styles.icons}>
              {ICONS.map((icon) => {
                const selected = form.icon === icon;

                return (
                  <Pressable
                    key={icon}
                    style={[styles.iconButton, selected && styles.selectedIcon]}
                    onPress={() => updateForm("icon", icon)}
                    accessibilityRole="button"
                    accessibilityState={{ selected }}
                    accessibilityLabel={`Select ${icon} icon`}
                  >
                    <Text style={styles.iconText}>{icon}</Text>
                  </Pressable>
                );
              })}
            </View>

            <View style={styles.reminderRow}>
              <View style={styles.reminderContent}>
                <Text style={styles.reminderTitle}>Daily Reminder</Text>

                <Text style={styles.reminderSubtitle}>
                  Receive a notification every day
                </Text>
              </View>

              <Switch
                value={form.reminderEnabled}
                onValueChange={(value) => updateForm("reminderEnabled", value)}
                trackColor={{
                  false: COLORS.border,
                  true: COLORS.primary,
                }}
                thumbColor={COLORS.white}
              />
            </View>

            {form.reminderEnabled && (
              <View style={styles.timeRow}>
                <View style={styles.timeInputWrapper}>
                  <Text style={styles.label}>Hour (0–23)</Text>

                  <TextInput
                    style={styles.input}
                    keyboardType="number-pad"
                    value={String(form.reminderHour)}
                    onChangeText={(value) =>
                      updateReminderTime("reminderHour", value)
                    }
                    maxLength={2}
                  />
                </View>

                <View style={styles.timeInputWrapper}>
                  <Text style={styles.label}>Minute (0–59)</Text>

                  <TextInput
                    style={styles.input}
                    keyboardType="number-pad"
                    value={String(form.reminderMinute)}
                    onChangeText={(value) =>
                      updateReminderTime("reminderMinute", value)
                    }
                    maxLength={2}
                  />
                </View>
              </View>
            )}

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
