import { Pressable, Text, View } from "react-native";
import { emptyStateStyles as styles } from "../../styles/common.styles";

interface Props {
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
}: Props) {
  return (
    <View style={styles.container}>
      <Text style={styles.icon}>{icon}</Text>

      <Text style={styles.title}>{title}</Text>

      <Text style={styles.description}>{description}</Text>

      {buttonText && onPress && (
        <Pressable
          style={styles.button}
          onPress={onPress}
          accessibilityRole="button"
        >
          <Text style={styles.buttonText}>{buttonText}</Text>
        </Pressable>
      )}
    </View>
  );
}
