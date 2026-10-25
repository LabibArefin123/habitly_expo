import { Pressable, Text, View } from "react-native";

import { profileHeaderStyles as styles } from "../../styles/profile";

interface Props {
  onBack: () => void;
}

export function ProfileHeader({ onBack }: Props) {
  return (
    <View style={styles.header}>
      <Pressable
        onPress={onBack}
        style={styles.backButton}
        accessibilityRole="button"
        accessibilityLabel="Go back"
      >
        <Text style={styles.backIcon}>‹</Text>
      </Pressable>

      <Text style={styles.title}>My Profile</Text>

      <View style={styles.spacer} />
    </View>
  );
}
