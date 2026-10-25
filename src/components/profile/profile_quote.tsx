import { Text, View } from "react-native";

import { profileQuoteStyles as styles } from "../../styles/profile";

export function ProfileQuote() {
  return (
    <View style={styles.container}>
      <Text style={styles.icon}>✨</Text>

      <Text style={styles.title}>Small progress every day.</Text>

      <Text style={styles.description}>
        Consistency turns daily effort into long-term achievement.
      </Text>
    </View>
  );
}
