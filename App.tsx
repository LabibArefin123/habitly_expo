import { useState } from "react";
import { StatusBar } from "expo-status-bar";
import { SQLiteProvider } from "expo-sqlite";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";

import { HomeScreen } from "./src/screens/home_screen";
import { AnalyticsScreen } from "./src/screens/analytics_screen";
import { initializeDatabase } from "./src/database/database";
import { COLORS } from "./src/constants/theme";

type TabName = "home" | "analytics";

export default function App() {
  const [activeTab, setActiveTab] = useState<TabName>("home");

  const navigateTo = (tab: TabName) => {
    setActiveTab(tab);
  };

  return (
    <SafeAreaProvider>
      <SQLiteProvider databaseName="habitly.db" onInit={initializeDatabase}>
        <SafeAreaView
          style={styles.appContainer}
          edges={["top", "left", "right", "bottom"]}
        >
          <StatusBar style="dark" />

          {/* Screen Content */}
          <View style={styles.screen}>
            {activeTab === "home" ? <HomeScreen /> : <AnalyticsScreen />}
          </View>

          {/* Fixed Bottom Navigation */}
          <View style={styles.bottomNavigation} pointerEvents="auto">
            <TabButton
              label="Home"
              icon="⌂"
              active={activeTab === "home"}
              onPress={() => navigateTo("home")}
            />

            <TabButton
              label="Analytics"
              icon="▥"
              active={activeTab === "analytics"}
              onPress={() => navigateTo("analytics")}
            />
          </View>
        </SafeAreaView>
      </SQLiteProvider>
    </SafeAreaProvider>
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
      style={({ pressed }) => [
        styles.tabButton,
        pressed && styles.tabButtonPressed,
      ]}
      onPress={onPress}
      hitSlop={4}
      accessibilityRole="button"
      accessibilityLabel={`Navigate to ${label}`}
      accessibilityState={{ selected: active }}
    >
      <Text style={[styles.tabIcon, active && styles.activeTabText]}>
        {icon}
      </Text>

      <Text style={[styles.tabLabel, active && styles.activeTabText]}>
        {label}
      </Text>

      {active && <View style={styles.activeIndicator} />}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  appContainer: {
    flex: 1,
    backgroundColor: COLORS.background,
  },

  screen: {
    flex: 1,
    minHeight: 0,
    zIndex: 0,
    overflow: "hidden",
  },

  bottomNavigation: {
    position: "relative",
    zIndex: 100,
    elevation: 30,

    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",

    backgroundColor: COLORS.white,

    borderTopWidth: 1,
    borderTopColor: COLORS.border,

    paddingTop: 9,
    paddingBottom: 7,
  },

  tabButton: {
    flex: 1,
    minHeight: 55,

    alignItems: "center",
    justifyContent: "center",

    paddingVertical: 7,
    gap: 3,
  },

  tabButtonPressed: {
    opacity: 0.65,
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

  activeIndicator: {
    position: "absolute",
    bottom: 0,

    width: 24,
    height: 3,

    borderRadius: 5,
    backgroundColor: COLORS.primary,
  },
});
