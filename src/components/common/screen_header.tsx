import { Pressable, Text, View } from "react-native";
import { screenHeaderStyles as styles } from "../../styles/common.styles";

interface Props {
  title: string;
  subtitle?: string;
  eyebrow?: string;
  actionIcon?: string;
  onAction?: () => void;
}

export function ScreenHeader({
  title,
  subtitle,
  eyebrow,
  actionIcon,
  onAction,
}: Props) {
  return (
    <View style={styles.container}>
      <View style={styles.textContainer}>
        {eyebrow && <Text style={styles.eyebrow}>{eyebrow}</Text>}

        <Text style={styles.title}>{title}</Text>

        {subtitle && <Text style={styles.subtitle}>{subtitle}</Text>}
      </View>

      {actionIcon && onAction && (
        <Pressable
          style={styles.actionButton}
          onPress={onAction}
          accessibilityRole="button"
        >
          <Text style={styles.actionText}>{actionIcon}</Text>
        </Pressable>
      )}
    </View>
  );
}
