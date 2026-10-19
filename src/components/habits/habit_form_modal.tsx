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
import type { Habit, HabitFormData } from "../../types/habit.types";

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
  reminderEnabled: false,
  reminderHour: 9,
  reminderMinute: 0,
};

export function HabitFormModal({ visible, habit, onClose, onSave }: Props) {
  const [form, setForm] = useState<HabitFormData>(DEFAULT_FORM);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (visible) {
      setForm(
        habit
          ? {
              title: habit.title,
              description: habit.description,
              icon: habit.icon,
              color: habit.color,
              reminderEnabled: Boolean(habit.reminder_enabled),
              reminderHour: habit.reminder_hour,
              reminderMinute: habit.reminder_minute,
            }
          : DEFAULT_FORM,
      );
    }
  }, [visible, habit]);

  const handleSave = async () => {
    if (!form.title.trim() || saving) return;

    setSaving(true);

    try {
      await onSave(form);
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
            <Text style={styles.heading}>
              {habit ? "Edit Habit" : "Create Habit"}
            </Text>

            <Pressable onPress={onClose}>
              <Text style={styles.close}>✕</Text>
            </Pressable>
          </View>

          <ScrollView showsVerticalScrollIndicator={false}>
            <Text style={styles.label}>Habit Name</Text>

            <TextInput
              style={styles.input}
              placeholder="e.g. Morning Exercise"
              placeholderTextColor={COLORS.muted}
              value={form.title}
              onChangeText={(title) =>
                setForm((previous) => ({ ...previous, title }))
              }
              maxLength={60}
            />

            <Text style={styles.label}>Description</Text>

            <TextInput
              style={[styles.input, styles.descriptionInput]}
              placeholder="Add a short description..."
              placeholderTextColor={COLORS.muted}
              value={form.description}
              onChangeText={(description) =>
                setForm((previous) => ({ ...previous, description }))
              }
              multiline
              maxLength={150}
            />

            <Text style={styles.label}>Choose Icon</Text>

            <View style={styles.icons}>
              {ICONS.map((icon) => (
                <Pressable
                  key={icon}
                  style={[
                    styles.iconButton,
                    form.icon === icon && styles.selectedIcon,
                  ]}
                  onPress={() => setForm((previous) => ({ ...previous, icon }))}
                >
                  <Text style={styles.iconText}>{icon}</Text>
                </Pressable>
              ))}
            </View>

            <View style={styles.reminderRow}>
              <View>
                <Text style={styles.reminderTitle}>Daily Reminder</Text>
                <Text style={styles.reminderSubtitle}>
                  Receive a notification every day
                </Text>
              </View>

              <Switch
                value={form.reminderEnabled}
                onValueChange={(reminderEnabled) =>
                  setForm((previous) => ({
                    ...previous,
                    reminderEnabled,
                  }))
                }
                trackColor={{ true: COLORS.primary }}
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
                      setForm((previous) => ({
                        ...previous,
                        reminderHour: Math.min(
                          23,
                          Math.max(0, Number(value) || 0),
                        ),
                      }))
                    }
                  />
                </View>

                <View style={styles.timeInputWrapper}>
                  <Text style={styles.label}>Minute (0–59)</Text>
                  <TextInput
                    style={styles.input}
                    keyboardType="number-pad"
                    value={String(form.reminderMinute)}
                    onChangeText={(value) =>
                      setForm((previous) => ({
                        ...previous,
                        reminderMinute: Math.min(
                          59,
                          Math.max(0, Number(value) || 0),
                        ),
                      }))
                    }
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
    marginBottom: 24,
  },
  heading: {
    color: COLORS.text,
    fontSize: 21,
    fontWeight: "800",
  },
  close: {
    color: COLORS.muted,
    fontSize: 20,
    padding: 5,
  },
  label: {
    color: COLORS.text,
    fontSize: 12,
    fontWeight: "800",
    marginBottom: 9,
    marginTop: 15,
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
    marginTop: 25,
  },
  reminderTitle: {
    color: COLORS.text,
    fontSize: 13,
    fontWeight: "800",
  },
  reminderSubtitle: {
    color: COLORS.muted,
    fontSize: 11,
    marginTop: 5,
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
    padding: 17,
    borderRadius: 15,
    alignItems: "center",
    marginTop: 28,
    marginBottom: 20,
  },
  disabled: {
    opacity: 0.5,
  },
  saveText: {
    color: COLORS.white,
    fontSize: 14,
    fontWeight: "800",
  },
});
