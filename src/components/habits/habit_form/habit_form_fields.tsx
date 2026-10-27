import { Text, TextInput } from "react-native";

import { COLORS } from "../../../constants/theme";
import type { HabitFormData } from "../../../types/habit.types";
import { habitFormInputStyles as styles } from "../../../styles/habit";

type Props = {
  form: HabitFormData;
  updateForm: <K extends keyof HabitFormData>(
    key: K,
    value: HabitFormData[K],
  ) => void;
};

export function HabitFormFields({ form, updateForm }: Props) {
  return (
    <>
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
    </>
  );
}
