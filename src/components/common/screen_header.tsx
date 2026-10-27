import { Pressable, Text, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";

import { screenHeaderStyles as styles } from "../../styles/common/screen_header.styles";

interface ScreenHeaderProps {
  title: string;
  subtitle?: string;
  eyebrow?: string;
  actionIcon?: keyof typeof Ionicons.glyphMap;
  onAction?: () => void;
  actionLabel?: string;
}

export function ScreenHeader({
  title,
  subtitle,
  eyebrow,
  actionIcon,
  onAction,
  actionLabel = "Header action",
}: ScreenHeaderProps) {
  return (
    <View style={styles.container}>
      <View style={styles.textContainer}>
        {eyebrow ? <Text style={styles.eyebrow}>{eyebrow}</Text> : null}

        <Text style={styles.title}>{title}</Text>

        {subtitle ? <Text style={styles.subtitle}>{subtitle}</Text> : null}
      </View>

      {actionIcon && onAction ? (
        <Pressable
          style={({ pressed }) => [
            styles.actionButton,
            pressed && styles.actionButtonPressed,
          ]}
          onPress={onAction}
          accessibilityRole="button"
          accessibilityLabel={actionLabel}
          hitSlop={8}
        >
          <Ionicons
            name={actionIcon}
            size={21}
            color={styles.actionIcon.color}
          />
        </Pressable>
      ) : null}
    </View>
  );
}
