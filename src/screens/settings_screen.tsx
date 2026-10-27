import { useCallback, useEffect, useState } from "react";
import {
  ActivityIndicator,
  Alert,
  Pressable,
  ScrollView,
  Switch,
  Text,
  View,
} from "react-native";
import { useSQLiteContext } from "expo-sqlite";
import type { ReactNode } from "react";
import { COLORS } from "../constants/theme";
import { settingsStyles as styles } from "../styles/settings.styles";

interface Preferences {
  notifications: boolean;
  haptics: boolean;
  mondayStart: boolean;
  showStreaks: boolean;
}

interface SectionProps {
  title: string;
  subtitle?: string;
  children: ReactNode;
}

interface Overview {
  totalHabits: number;
  totalCompletions: number;
  activeDays: number;
}

const DEFAULT_PREFERENCES: Preferences = {
  notifications: true,
  haptics: true,
  mondayStart: false,
  showStreaks: true,
};

const SETTING_KEYS: Record<keyof Preferences, string> = {
  notifications: "notifications_enabled",
  haptics: "haptics_enabled",
  mondayStart: "week_starts_monday",
  showStreaks: "show_streaks",
};

export function SettingsScreen() {
  const db = useSQLiteContext();

  const [preferences, setPreferences] = useState(DEFAULT_PREFERENCES);
  const [overview, setOverview] = useState<Overview>({
    totalHabits: 0,
    totalCompletions: 0,
    activeDays: 0,
  });

  const [loading, setLoading] = useState(true);
  const [savingKey, setSavingKey] = useState<keyof Preferences | null>(null);
  const [resetting, setResetting] = useState(false);

  const loadSettings = useCallback(async () => {
    try {
      const [savedSettings, habits, completions, days] = await Promise.all([
        db.getAllAsync<{
          setting_key: string;
          setting_value: string;
        }>("SELECT setting_key, setting_value FROM settings"),

        db.getFirstAsync<{ total: number }>(
          "SELECT COUNT(*) AS total FROM habits",
        ),

        db.getFirstAsync<{ total: number }>(
          "SELECT COUNT(*) AS total FROM habit_logs",
        ),

        db.getFirstAsync<{ total: number }>(
          "SELECT COUNT(DISTINCT completion_date) AS total FROM habit_logs",
        ),
      ]);

      const values = new Map(
        savedSettings.map((item) => [item.setting_key, item.setting_value]),
      );

      setPreferences({
        notifications: values.get(SETTING_KEYS.notifications) !== "0",
        haptics: values.get(SETTING_KEYS.haptics) !== "0",
        mondayStart: values.get(SETTING_KEYS.mondayStart) === "1",
        showStreaks: values.get(SETTING_KEYS.showStreaks) !== "0",
      });

      setOverview({
        totalHabits: habits?.total ?? 0,
        totalCompletions: completions?.total ?? 0,
        activeDays: days?.total ?? 0,
      });
    } catch (error) {
      console.error("Unable to load settings:", error);
      Alert.alert("Error", "Unable to load your settings.");
    } finally {
      setLoading(false);
    }
  }, [db]);

  useEffect(() => {
    loadSettings();
  }, [loadSettings]);

  const updatePreference = async (key: keyof Preferences, value: boolean) => {
    if (savingKey) return;

    const previousValue = preferences[key];

    setPreferences((current) => ({
      ...current,
      [key]: value,
    }));

    setSavingKey(key);

    try {
      await db.runAsync(
        `INSERT INTO settings (setting_key, setting_value)
         VALUES (?, ?)
         ON CONFLICT(setting_key)
         DO UPDATE SET setting_value = excluded.setting_value`,
        SETTING_KEYS[key],
        value ? "1" : "0",
      );
    } catch (error) {
      console.error("Unable to save preference:", error);

      setPreferences((current) => ({
        ...current,
        [key]: previousValue,
      }));

      Alert.alert(
        "Couldn't save",
        "Your preference could not be updated. Please try again.",
      );
    } finally {
      setSavingKey(null);
    }
  };

  const confirmResetHistory = () => {
    Alert.alert(
      "Reset completion history?",
      "This permanently deletes all habit completion records. Your habits and their settings will remain unchanged.",
      [
        {
          text: "Cancel",
          style: "cancel",
        },
        {
          text: "Reset History",
          style: "destructive",
          onPress: resetHistory,
        },
      ],
    );
  };

  const resetHistory = async () => {
    if (resetting) return;

    setResetting(true);

    try {
      await db.runAsync("DELETE FROM habit_logs");

      setOverview((current) => ({
        ...current,
        totalCompletions: 0,
        activeDays: 0,
      }));

      Alert.alert("History reset", "Your completion history has been cleared.");
    } catch (error) {
      console.error("Unable to reset history:", error);
      Alert.alert("Error", "Unable to reset completion history.");
    } finally {
      setResetting(false);
    }
  };

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

      <View style={styles.summaryCard}>
        <View style={styles.summaryHeader}>
          <View>
            <Text style={styles.summaryEyebrow}>YOUR JOURNEY</Text>
            <Text style={styles.summaryTitle}>Personal progress</Text>
          </View>

          <Text style={styles.summaryIcon}>🌱</Text>
        </View>

        <View style={styles.statsRow}>
          <View style={styles.stat}>
            <Text style={styles.statValue}>{overview.totalHabits}</Text>
            <Text style={styles.statLabel}>Habits</Text>
          </View>

          <View style={styles.statDivider} />

          <View style={styles.stat}>
            <Text style={styles.statValue}>{overview.totalCompletions}</Text>
            <Text style={styles.statLabel}>Completions</Text>
          </View>

          <View style={styles.statDivider} />

          <View style={styles.stat}>
            <Text style={styles.statValue}>{overview.activeDays}</Text>
            <Text style={styles.statLabel}>Active days</Text>
          </View>
        </View>
      </View>

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
          onChange={(value) => updatePreference("notifications", value)}
        />

        <SettingsSwitch
          icon="〰️"
          title="Haptic feedback"
          description="Preference for touch feedback."
          value={preferences.haptics}
          disabled={savingKey !== null}
          onChange={(value) => updatePreference("haptics", value)}
        />

        <SettingsSwitch
          icon="📅"
          title="Start week on Monday"
          description="Use Monday as the first day of the week."
          value={preferences.mondayStart}
          disabled={savingKey !== null}
          onChange={(value) => updatePreference("mondayStart", value)}
        />

        <SettingsSwitch
          icon="🔥"
          title="Show habit streaks"
          description="Display consecutive-day progress."
          value={preferences.showStreaks}
          disabled={savingKey !== null}
          onChange={(value) => updatePreference("showStreaks", value)}
        />
      </SettingsSection>

      <SettingsSection
        title="Data management"
        subtitle="Manage your personal progress."
      >
        <Pressable
          style={styles.dangerRow}
          onPress={confirmResetHistory}
          disabled={resetting}
          accessibilityRole="button"
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
    </ScrollView>
  );
}

interface SectionProps {
  title: string;
  subtitle?: string;
  children: React.ReactNode;
}

function SettingsSection({ title, subtitle, children }: SectionProps) {
  return (
    <View style={styles.section}>
      <View style={styles.sectionHeading}>
        <Text style={styles.sectionTitle}>{title}</Text>
        {subtitle && <Text style={styles.sectionSubtitle}>{subtitle}</Text>}
      </View>

      <View style={styles.sectionCard}>{children}</View>
    </View>
  );
}

interface SwitchProps {
  icon: string;
  title: string;
  description: string;
  value: boolean;
  disabled: boolean;
  onChange: (value: boolean) => void;
}

function SettingsSwitch({
  icon,
  title,
  description,
  value,
  disabled,
  onChange,
}: SwitchProps) {
  return (
    <View style={styles.switchRow}>
      <View style={styles.optionIcon}>
        <Text style={styles.optionEmoji}>{icon}</Text>
      </View>

      <View style={styles.optionContent}>
        <Text style={styles.optionTitle}>{title}</Text>
        <Text style={styles.optionDescription}>{description}</Text>
      </View>

      <Switch
        value={value}
        onValueChange={onChange}
        disabled={disabled}
        trackColor={{
          false: COLORS.border,
          true: COLORS.primary,
        }}
        thumbColor={COLORS.white}
      />
    </View>
  );
}
