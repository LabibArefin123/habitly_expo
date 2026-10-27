import { Switch, Text, TextInput, View } from "react-native";

import { COLORS } from "../../../constants/theme";
import type { HabitFormData } from "../../../types/habit.types";
import {
  habitFormInputStyles,
  habitFormReminderStyles,
} from "../../../styles/habit";

import { getReminderTimeValue } from "./habit_form_utils";

const styles = {
  ...habitFormInputStyles,
  ...habitFormReminderStyles,
};

type Props = {
  form: HabitFormData;
  updateForm: <K extends keyof HabitFormData>(
    key: K,
    value: HabitFormData[K],
  ) => void;
};

export function HabitFormReminder({ form, updateForm }: Props) {
  const updateTime = (
    key: "reminderHour" | "reminderMinute",
    value: string,
  ) => {
    updateForm(key, getReminderTimeValue(key, value));
  };

  return (
    <>
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
              onChangeText={(value) => updateTime("reminderHour", value)}
              maxLength={2}
            />
          </View>

          <View style={styles.timeInputWrapper}>
            <Text style={styles.label}>Minute (0–59)</Text>
            <TextInput
              style={styles.input}
              keyboardType="number-pad"
              value={String(form.reminderMinute)}
              onChangeText={(value) => updateTime("reminderMinute", value)}
              maxLength={2}
            />
          </View>
        </View>
      )}
    </>
  );
}
