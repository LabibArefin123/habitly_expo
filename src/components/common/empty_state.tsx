import { Pressable, Text, View } from "react-native";

import { emptyStateStyles as styles } from "../../styles/common/empty_state.styles";

interface EmptyStateProps {
  title: string;
  description: string;
  icon?: string;
  buttonText?: string;
  onPress?: () => void;
}

export function EmptyState({
  title,
  description,
  icon = "🌱",
  buttonText,
  onPress,
}: EmptyStateProps) {
  return (
    <View style={styles.container} accessible accessibilityRole="summary">
      <View style={styles.iconContainer}>
        <Text style={styles.icon}>{icon}</Text>
      </View>

      <Text style={styles.title}>{title}</Text>

      <Text style={styles.description}>{description}</Text>

      {buttonText && onPress ? (
        <Pressable
          style={({ pressed }) => [
            styles.button,
            pressed && styles.buttonPressed,
          ]}
          onPress={onPress}
          accessibilityRole="button"
          accessibilityLabel={buttonText}
        >
          <Text style={styles.buttonText}>{buttonText}</Text>
        </Pressable>
      ) : null}
    </View>
  );
}
