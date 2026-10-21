import { useEffect, useState } from "react";
import {
  Modal,
  Pressable,
  ScrollView,
  StyleSheet,
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
            {/* Habit name */}
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

            {/* Description */}
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

            {/* Category */}
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

            {/* Icon picker */}
            <Text style={styles.label}>Choose Icon</Text>

            <View style={styles.icons}>
              {ICONS.map((icon) => (
                <Pressable
                  key={icon}
                  style={[
                    styles.iconButton,
                    form.icon === icon && styles.selectedIcon,
                  ]}
                  onPress={() => updateForm("icon", icon)}
                  accessibilityRole="button"
                  accessibilityState={{
                    selected: form.icon === icon,
                  }}
                >
                  <Text style={styles.iconText}>{icon}</Text>
                </Pressable>
              ))}
            </View>

            {/* Daily reminder */}
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

            {/* Reminder time */}
            {form.reminderEnabled && (
              <View style={styles.timeRow}>
                <View style={styles.timeInputWrapper}>
                  <Text style={styles.label}>Hour (0–23)</Text>

                  <TextInput
                    style={styles.input}
                    keyboardType="number-pad"
                    value={String(form.reminderHour)}
                    onChangeText={(value) => {
                      const parsed = Number(value);

                      updateForm(
                        "reminderHour",
                        value.trim() === ""
                          ? 0
                          : Math.min(
                              23,
                              Math.max(0, Number.isFinite(parsed) ? parsed : 0),
                            ),
                      );
                    }}
                    maxLength={2}
                  />
                </View>

                <View style={styles.timeInputWrapper}>
                  <Text style={styles.label}>Minute (0–59)</Text>

                  <TextInput
                    style={styles.input}
                    keyboardType="number-pad"
                    value={String(form.reminderMinute)}
                    onChangeText={(value) => {
                      const parsed = Number(value);

                      updateForm(
                        "reminderMinute",
                        value.trim() === ""
                          ? 0
                          : Math.min(
                              59,
                              Math.max(0, Number.isFinite(parsed) ? parsed : 0),
                            ),
                      );
                    }}
                    maxLength={2}
                  />
                </View>
              </View>
            )}

            {/* Save */}
            <Pressable
              style={[
                styles.saveButton,
                (!form.title.trim() || saving) && styles.disabled,
              ]}
              disabled={!form.title.trim() || saving}
              onPress={handleSave}
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

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: "#00000066",
    justifyContent: "flex-end",
  },
  modal: {
    backgroundColor: COLORS.white,
    borderTopLeftRadius: 28,
    borderTopRightRadius: 28,
    padding: 22,
    maxHeight: "90%",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 15,
  },
  heading: {
    color: COLORS.text,
    fontSize: 21,
    fontWeight: "800",
  },
  headerSubtitle: {
    color: COLORS.muted,
    fontSize: 11,
    marginTop: 4,
  },
  closeButton: {
    width: 36,
    height: 36,
    borderRadius: 12,
    backgroundColor: COLORS.background,
    alignItems: "center",
    justifyContent: "center",
  },
  close: {
    color: COLORS.muted,
    fontSize: 18,
    fontWeight: "700",
  },
  label: {
    color: COLORS.text,
    fontSize: 12,
    fontWeight: "800",
    marginBottom: 9,
    marginTop: 17,
  },
  input: {
    backgroundColor: COLORS.background,
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: 13,
    paddingHorizontal: 14,
    paddingVertical: 13,
    color: COLORS.text,
    fontSize: 13,
  },
  descriptionInput: {
    height: 85,
    textAlignVertical: "top",
  },
  categories: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
  },
  categoryButton: {
    paddingHorizontal: 13,
    paddingVertical: 9,
    borderRadius: 20,
    backgroundColor: COLORS.background,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  selectedCategory: {
    backgroundColor: COLORS.primaryLight,
    borderColor: COLORS.primary,
  },
  categoryText: {
    color: COLORS.muted,
    fontSize: 11,
    fontWeight: "700",
  },
  selectedCategoryText: {
    color: COLORS.primary,
  },
  icons: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 10,
  },
  iconButton: {
    width: 45,
    height: 45,
    borderRadius: 13,
    backgroundColor: COLORS.background,
    alignItems: "center",
    justifyContent: "center",
  },
  selectedIcon: {
    backgroundColor: COLORS.primaryLight,
    borderWidth: 1.5,
    borderColor: COLORS.primary,
  },
  iconText: {
    fontSize: 22,
  },
  reminderRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: 22,
    paddingVertical: 14,
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: COLORS.border,
  },
  reminderContent: {
    flex: 1,
    paddingRight: 12,
  },
  reminderTitle: {
    color: COLORS.text,
    fontSize: 13,
    fontWeight: "800",
  },
  reminderSubtitle: {
    color: COLORS.muted,
    fontSize: 10,
    marginTop: 4,
  },
  timeRow: {
    flexDirection: "row",
    gap: 12,
  },
  timeInputWrapper: {
    flex: 1,
  },
  saveButton: {
    backgroundColor: COLORS.primary,
    paddingVertical: 16,
    borderRadius: 15,
    alignItems: "center",
    marginTop: 25,
    marginBottom: 15,
  },
  saveText: {
    color: COLORS.white,
    fontSize: 13,
    fontWeight: "800",
  },
  disabled: {
    opacity: 0.5,
  },
});
