import { Text, View } from "react-native";

import { profileAboutStyles as styles } from "../../styles/profile";

export function ProfileAbout() {
  return (
    <>
      <Text style={styles.sectionTitle}>About Me</Text>

      <View style={styles.card}>
        <InfoRow icon="👤" label="Full name" value="Md. Labib Arefin" />

        <InfoRow icon="💼" label="Profession" value="Software Developer" />

        <InfoRow icon="💻" label="Main focus" value="Software Development" />

        <InfoRow
          icon="🚀"
          label="Personal goal"
          value="Continuous Improvement"
          last
        />
      </View>
    </>
  );
}

interface InfoRowProps {
  icon: string;
  label: string;
  value: string;
  last?: boolean;
}

function InfoRow({ icon, label, value, last = false }: InfoRowProps) {
  return (
    <View style={[styles.row, last && styles.lastRow]}>
      <View style={styles.iconContainer}>
        <Text style={styles.emoji}>{icon}</Text>
      </View>

      <View style={styles.content}>
        <Text style={styles.label}>{label}</Text>
        <Text style={styles.value}>{value}</Text>
      </View>
    </View>
  );
}
