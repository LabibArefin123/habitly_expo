import { Text, View } from "react-native";

import { profileCardStyles as styles } from "../../styles/profile";

export function ProfileCard() {
  return (
    <View style={styles.container}>
      <View style={styles.avatar}>
        <Text style={styles.avatarText}>LA</Text>
      </View>

      <Text style={styles.name}>Md. Labib Arefin</Text>

      <Text style={styles.profession}>Software Developer</Text>

      <Text style={styles.bio}>
        Building software, learning new technologies, and improving every day.
      </Text>

      <View style={styles.memberBadge}>
        <Text style={styles.memberBadgeText}>HABITLY MEMBER</Text>
      </View>
    </View>
  );
}
