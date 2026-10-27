import { ActivityIndicator, Pressable, Text, View } from "react-native";
import { COLORS } from "../../constants/theme";
import { settingsStyles as styles } from "../../styles/settings.styles";
import { SettingsSection } from "./settings_section";

interface SettingsBottomSectionsProps {
  resetting: boolean;
  onReset: () => void;
}

export function SettingsBottomSections({
  resetting,
  onReset,
}: SettingsBottomSectionsProps) {
  return (
    <>
      <SettingsSection
        title="Data management"
        subtitle="Manage your personal progress."
      >
        <Pressable
          style={styles.dangerRow}
          onPress={onReset}
          disabled={resetting}
          accessibilityRole="button"
          accessibilityLabel="Reset completion history"
        >
          <View style={styles.optionIcon}>
            <Text style={styles.optionEmoji}>🗑️</Text>
          </View>

          <View style={styles.optionContent}>
            <Text style={styles.dangerTitle}>Reset completion history</Text>
            <Text style={styles.optionDescription}>
              Clear completion records without deleting habits.
            </Text>
          </View>

          {resetting ? (
            <ActivityIndicator color={COLORS.orange} />
          ) : (
            <Text style={styles.chevron}>›</Text>
          )}
        </Pressable>
      </SettingsSection>

      <SettingsSection title="About" subtitle="A little about your app.">
        <View style={styles.aboutRow}>
          <View style={styles.brandIcon}>
            <Text style={styles.brandEmoji}>🌿</Text>
          </View>

          <View style={styles.optionContent}>
            <Text style={styles.aboutTitle}>Habitly</Text>
            <Text style={styles.optionDescription}>
              Build daily habits and track personal progress.
            </Text>
          </View>

          <Text style={styles.version}>v1.0.0</Text>
        </View>
      </SettingsSection>

      <Text style={styles.footer}>
        Made for better days, one habit at a time. ✨
      </Text>
    </>
  );
}
