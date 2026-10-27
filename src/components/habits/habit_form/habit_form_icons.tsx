import { Pressable, Text, View } from "react-native";

import {
  habitFormInputStyles,
  habitFormOptionsStyles,
} from "../../../styles/habit";

import { HABIT_ICONS } from "./habit_form_utils";

type Props = {
  icon: string;
  onChange: (icon: string) => void;
};

export function HabitFormIcons({ icon, onChange }: Props) {
  return (
    <>
      <Text style={habitFormInputStyles.label}>Choose Icon</Text>

      <View style={habitFormOptionsStyles.icons}>
        {HABIT_ICONS.map((item) => {
          const selected = icon === item;

          return (
            <Pressable
              key={item}
              style={[
                habitFormOptionsStyles.iconButton,
                selected && habitFormOptionsStyles.selectedIcon,
              ]}
              onPress={() => onChange(item)}
              accessibilityRole="button"
              accessibilityState={{ selected }}
              accessibilityLabel={`Select ${item} icon`}
            >
              <Text style={habitFormOptionsStyles.iconText}>{item}</Text>
            </Pressable>
          );
        })}
      </View>
    </>
  );
}
