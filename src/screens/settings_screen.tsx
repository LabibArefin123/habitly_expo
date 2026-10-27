import { ActivityIndicator, ScrollView, Text, View } from "react-native";

import { COLORS } from "../constants/theme";
import { settingsStyles as styles } from "../styles/settings.styles";
import { useSettings } from "../hooks/use_settings";

import { SettingsSummary } from "../components/settings/settings_summary";
import { SettingsSection } from "../components/settings/settings_section";
import { SettingsSwitch } from "../components/settings/settings_switch";
import { SettingsBottomSections } from "../components/settings/settings_bottom_sections";

export function SettingsScreen() {
  const {
    preferences,
    overview,
    loading,
    savingKey,
    resetting,
    updatePreference,
    confirmResetHistory,
  } = useSettings();

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color={COLORS.primary} />
        <Text style={styles.loadingText}>Loading settings...</Text>
      </View>
    );
  }

  return (
    <ScrollView
      style={styles.screen}
      contentContainerStyle={styles.content}
      showsVerticalScrollIndicator={false}
    >
      <View style={styles.header}>
        <Text style={styles.eyebrow}>MAKE IT YOURS</Text>
        <Text style={styles.title}>Settings</Text>
        <Text style={styles.subtitle}>Customize your Habitly experience.</Text>
      </View>

      <SettingsSummary overview={overview} />

      <SettingsSection
        title="Preferences"
        subtitle="Make Habitly work your way."
      >
        <SettingsSwitch
          icon="🔔"
          title="Daily reminders"
          description="Enable your notification preference."
          value={preferences.notifications}
          disabled={savingKey !== null}
          onChange={(value) => void updatePreference("notifications", value)}
        />

        <SettingsSwitch
          icon="〰️"
          title="Haptic feedback"
          description="Preference for touch feedback."
          value={preferences.haptics}
          disabled={savingKey !== null}
          onChange={(value) => void updatePreference("haptics", value)}
        />

        <SettingsSwitch
          icon="📅"
          title="Start week on Monday"
          description="Use Monday as the first day of the week."
          value={preferences.mondayStart}
          disabled={savingKey !== null}
          onChange={(value) => void updatePreference("mondayStart", value)}
        />

        <SettingsSwitch
          icon="🔥"
          title="Show habit streaks"
          description="Display consecutive-day progress."
          value={preferences.showStreaks}
          disabled={savingKey !== null}
          onChange={(value) => void updatePreference("showStreaks", value)}
        />
      </SettingsSection>

      <SettingsBottomSections
        resetting={resetting}
        onReset={confirmResetHistory}
      />
    </ScrollView>
  );
}
