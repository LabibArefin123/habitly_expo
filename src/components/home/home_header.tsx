import { Pressable, Text, View } from "react-native";
import { homeHeaderStyles as styles } from "../../styles/home_part/home_header.styles";

type HomeHeaderProps = {
  onProfilePress: () => void;
};

export function HomeHeader({ onProfilePress }: HomeHeaderProps) {
  const today = new Intl.DateTimeFormat("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
  }).format(new Date());

  return (
    <View>
      <View style={styles.header}>
        <View>
          <Text style={styles.greeting}>WELCOME BACK 👋</Text>
          <Text style={styles.heading}>Habitly</Text>
          <Text style={styles.subtitle}>Build better habits every day.</Text>
        </View>

        <Pressable
          style={styles.avatar}
          onPress={onProfilePress}
          accessibilityRole="button"
          accessibilityLabel="Open profile"
        >
          <Text style={styles.avatarText}>L</Text>
        </Pressable>
      </View>

      <Text style={styles.date}>{today}</Text>
    </View>
  );
}
