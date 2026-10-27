import { Text, View } from "react-native";
import { homeMotivationStyles as styles } from "../../styles/home_part/home_motivation.styles";

export function HomeMotivation() {
  return (
    <View>
      <View style={styles.card}>
        <Text style={styles.emoji}>✨</Text>
        <Text style={styles.title}>Consistency is everything.</Text>
        <Text style={styles.description}>
          Small actions repeated daily create remarkable results.
        </Text>
      </View>
    </View>
  );
}
