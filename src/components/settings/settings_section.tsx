import type { ReactNode } from "react";
import { Text, View } from "react-native";
import { settingsStyles as styles } from "../../styles/settings.styles";

interface SettingsSectionProps {
  title: string;
  subtitle?: string;
  children: ReactNode;
}

interface SettingsSectionComponentProps {
  title: string;
  subtitle?: string;
  children: ReactNode;
}

export function SettingsSection({
  title,
  subtitle,
  children,
}: SettingsSectionProps) {
  return (
    <View style={styles.section}>
      <View style={styles.sectionHeading}>
        <Text style={styles.sectionTitle}>{title}</Text>

        {subtitle ? (
          <Text style={styles.sectionSubtitle}>{subtitle}</Text>
        ) : null}
      </View>

      <View style={styles.sectionCard}>{children}</View>
    </View>
  );
}
