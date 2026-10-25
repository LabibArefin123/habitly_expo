import { Text } from "react-native";

import { profileFooterStyles as styles } from "../../styles/profile";

export function ProfileFooter() {
  return (
    <Text style={styles.footer}>
      Habitly · Build daily habits and track personal progress.
    </Text>
  );
}
