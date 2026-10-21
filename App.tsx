import { useState } from "react";
import { StatusBar } from "expo-status-bar";
import { SQLiteProvider } from "expo-sqlite";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { HomeScreen } from "./src/screens/home_screen";
import { AnalyticsScreen } from "./src/screens/analytics_screen";
import { initializeDatabase } from "./src/database/database";
import { COLORS } from "./src/constants/theme";

type TabName = "home" | "analytics";

export default function App() {
  const [activeTab, setActiveTab] = useState<TabName>("home");

  return (
    <SQLiteProvider databaseName="habitly.db" onInit={initializeDatabase}>
      <SafeAreaView style={styles.container}>
        <StatusBar style="dark" />

        <View style={styles.screen}>
          {activeTab === "home" ? <HomeScreen /> : <AnalyticsScreen />}
        </View>

        <View style={styles.bottomNavigation}>
          <TabButton
            label="Home"
            icon="⌂"
            active={activeTab === "home"}
            onPress={() => setActiveTab("home")}
          />

          <TabButton
            label="Analytics"
            icon="▥"
            active={activeTab === "analytics"}
            onPress={() => setActiveTab("analytics")}
          />
        </View>
      </SafeAreaView>
    </SQLiteProvider>
  );
}

interface TabButtonProps {
  label: string;
  icon: string;
  active: boolean;
  onPress: () => void;
}

function TabButton({ label, icon, active, onPress }: TabButtonProps) {
  return (
    <Pressable
      style={styles.tabButton}
      onPress={onPress}
      accessibilityRole="button"
      accessibilityState={{ selected: active }}
    >
      <Text style={[styles.tabIcon, active && styles.activeTabText]}>
        {icon}
      </Text>

      <Text style={[styles.tabLabel, active && styles.activeTabText]}>
        {label}
      </Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  screen: {
    flex: 1,
  },
  bottomNavigation: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
    backgroundColor: COLORS.white,
    borderTopWidth: 1,
    borderTopColor: COLORS.border,
    paddingTop: 10,
    paddingBottom: 6,
  },
  tabButton: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 5,
    gap: 3,
  },
  tabIcon: {
    color: COLORS.muted,
    fontSize: 23,
    fontWeight: "700",
  },
  tabLabel: {
    color: COLORS.muted,
    fontSize: 10,
    fontWeight: "700",
  },
  activeTabText: {
    color: COLORS.primary,
  },
});
