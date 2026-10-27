
import { useCallback, useEffect, useState } from "react";
import { Alert } from "react-native";
import { useSQLiteContext } from "expo-sqlite";

export interface Preferences {
  notifications: boolean;
  haptics: boolean;
  mondayStart: boolean;
  showStreaks: boolean;
}

export interface SettingsOverview {
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

const EMPTY_OVERVIEW: SettingsOverview = {
  totalHabits: 0,
  totalCompletions: 0,
  activeDays: 0,
};

export function useSettings() {
  const db = useSQLiteContext();

  const [preferences, setPreferences] =
    useState<Preferences>(DEFAULT_PREFERENCES);
  const [overview, setOverview] =
    useState<SettingsOverview>(EMPTY_OVERVIEW);
  const [loading, setLoading] = useState(true);
  const [savingKey, setSavingKey] =
    useState<keyof Preferences | null>(null);
  const [resetting, setResetting] = useState(false);

  const loadSettings = useCallback(async () => {
    try {
      const [savedSettings, habits, completions, days] =
        await Promise.all([
          db.getAllAsync<{
            setting_key: string;
            setting_value: string;
          }>(
            "SELECT setting_key, setting_value FROM settings"
          ),
          db.getFirstAsync<{ total: number }>(
            "SELECT COUNT(*) AS total FROM habits"
          ),
          db.getFirstAsync<{ total: number }>(
            "SELECT COUNT(*) AS total FROM habit_logs"
          ),
          db.getFirstAsync<{ total: number }>(
            "SELECT COUNT(DISTINCT completion_date) AS total FROM habit_logs"
          ),
        ]);

      const values = new Map(
        savedSettings.map((item) => [
          item.setting_key,
          item.setting_value,
        ])
      );

      setPreferences({
        notifications:
          values.get(SETTING_KEYS.notifications) !== "0",
        haptics: values.get(SETTING_KEYS.haptics) !== "0",
        mondayStart:
          values.get(SETTING_KEYS.mondayStart) === "1",
        showStreaks:
          values.get(SETTING_KEYS.showStreaks) !== "0",
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
    void loadSettings();
  }, [loadSettings]);

  const updatePreference = async (
    key: keyof Preferences,
    value: boolean
  ) => {
    if (savingKey !== null) return;

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
        value ? "1" : "0"
      );
    } catch (error) {
      console.error("Unable to save preference:", error);

      setPreferences((current) => ({
        ...current,
        [key]: previousValue,
      }));

      Alert.alert(
        "Couldn't save",
        "Your preference could not be updated. Please try again."
      );
    } finally {
      setSavingKey(null);
    }
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

      Alert.alert(
        "History reset",
        "Your completion history has been cleared."
      );
    } catch (error) {
      console.error("Unable to reset history:", error);
      Alert.alert(
        "Error",
        "Unable to reset completion history."
      );
    } finally {
      setResetting(false);
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
          onPress: () => {
            void resetHistory();
          },
        },
      ]
    );
  };

  return {
    preferences,
    overview,
    loading,
    savingKey,
    resetting,
    updatePreference,
    confirmResetHistory,
  };
}
