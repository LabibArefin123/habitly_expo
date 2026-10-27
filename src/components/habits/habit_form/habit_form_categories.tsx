import { Pressable, Text, View } from "react-native";

import {
  HABIT_CATEGORIES,
  type HabitFormData,
} from "../../../types/habit.types";

import {
  habitFormInputStyles,
  habitFormOptionsStyles,
} from "../../../styles/habit";

type Props = {
  category: HabitFormData["category"];
  onChange: (category: HabitFormData["category"]) => void;
};

export function HabitFormCategories({ category, onChange }: Props) {
  return (
    <>
      <Text style={habitFormInputStyles.label}>Habit Category</Text>

      <View style={habitFormOptionsStyles.categories}>
        {HABIT_CATEGORIES.map((item) => {
          const selected = category === item;

          return (
            <Pressable
              key={item}
              onPress={() => onChange(item)}
              style={[
                habitFormOptionsStyles.categoryButton,
                selected && habitFormOptionsStyles.selectedCategory,
              ]}
              accessibilityRole="button"
              accessibilityState={{ selected }}
            >
              <Text
                style={[
                  habitFormOptionsStyles.categoryText,
                  selected && habitFormOptionsStyles.selectedCategoryText,
                ]}
              >
                {item}
              </Text>
            </Pressable>
          );
        })}
      </View>
    </>
  );
}
