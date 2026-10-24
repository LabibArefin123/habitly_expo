
import { StyleSheet } from "react-native";

import { COLORS } from "../constants/theme";

export const styles = StyleSheet.create({
  primaryColor: {
    color: COLORS.primary,
  },

  screen: {
    flex: 1,
    backgroundColor: COLORS.background,
  },

  content: {
    paddingHorizontal: 20,
    paddingBottom: 30,
  },

  // Header
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 22,
  },

  backButton: {
    width: 42,
    height: 42,
    borderRadius: 13,
    backgroundColor: COLORS.white,
    borderWidth: 1,
    borderColor: COLORS.border,
    alignItems: "center",
    justifyContent: "center",
  },

  backIcon: {
    fontSize: 29,
    color: COLORS.primary,
    fontWeight: "700",
    marginTop: -3,
  },

  headerTitle: {
    color: COLORS.text,
    fontSize: 18,
    fontWeight: "900",
  },

  headerSpacer: {
    width: 42,
  },

  // Profile Card
  profileCard: {
    backgroundColor: COLORS.white,
    borderRadius: 23,
    borderWidth: 1,
    borderColor: COLORS.border,
    padding: 25,
    alignItems: "center",
  },

  avatar: {
    width: 88,
    height: 88,
    borderRadius: 28,
    backgroundColor: COLORS.primaryLight,
    borderWidth: 2,
    borderColor: COLORS.primary,
    alignItems: "center",
    justifyContent: "center",
  },

  avatarText: {
    color: COLORS.primary,
    fontSize: 27,
    fontWeight: "900",
  },

  name: {
    color: COLORS.text,
    fontSize: 21,
    fontWeight: "900",
    marginTop: 17,
    textAlign: "center",
  },

  profession: {
    color: COLORS.primary,
    fontSize: 12,
    fontWeight: "800",
    marginTop: 6,
  },

  bio: {
    color: COLORS.muted,
    fontSize: 12,
    lineHeight: 19,
    textAlign: "center",
    marginTop: 13,
  },

  memberBadge: {
    backgroundColor: COLORS.primaryLight,
    paddingHorizontal: 13,
    paddingVertical: 8,
    borderRadius: 20,
    marginTop: 17,
  },

  memberBadgeText: {
    color: COLORS.primary,
    fontSize: 9,
    fontWeight: "900",
    letterSpacing: 1,
  },

  // Section Titles
  sectionTitle: {
    color: COLORS.text,
    fontSize: 16,
    fontWeight: "900",
    marginTop: 25,
    marginBottom: 13,
  },

  // Progress Statistics
  statsGrid: {
    flexDirection: "row",
    gap: 9,
  },

  statCard: {
    flex: 1,
    backgroundColor: COLORS.white,
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: 17,
    paddingVertical: 16,
    paddingHorizontal: 8,
    alignItems: "center",
  },

  statIcon: {
    fontSize: 21,
  },

  statValue: {
    color: COLORS.primary,
    fontSize: 23,
    fontWeight: "900",
    marginTop: 9,
  },

  statLabel: {
    color: COLORS.muted,
    fontSize: 9,
    fontWeight: "700",
    marginTop: 4,
    textAlign: "center",
  },

  loading: {
    padding: 25,
    alignItems: "center",
    backgroundColor: COLORS.white,
    borderRadius: 17,
  },

  loadingText: {
    color: COLORS.muted,
    fontSize: 11,
    marginTop: 9,
  },

  // About Me
  infoCard: {
    backgroundColor: COLORS.white,
    borderRadius: 19,
    borderWidth: 1,
    borderColor: COLORS.border,
    paddingHorizontal: 15,
  },

  infoRow: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
    gap: 12,
  },

  lastInfoRow: {
    borderBottomWidth: 0,
  },

  infoIcon: {
    width: 39,
    height: 39,
    borderRadius: 12,
    backgroundColor: COLORS.background,
    alignItems: "center",
    justifyContent: "center",
  },

  infoEmoji: {
    fontSize: 18,
  },

  infoContent: {
    flex: 1,
  },

  infoLabel: {
    color: COLORS.muted,
    fontSize: 10,
  },

  infoValue: {
    color: COLORS.text,
    fontSize: 12,
    fontWeight: "800",
    marginTop: 4,
  },

  // Daily Motivation
  quoteCard: {
    backgroundColor: COLORS.primary,
    borderRadius: 19,
    padding: 19,
    marginTop: 22,
  },

  quoteIcon: {
    fontSize: 22,
  },

  quoteTitle: {
    color: COLORS.white,
    fontSize: 15,
    fontWeight: "900",
    marginTop: 10,
  },

  quoteDescription: {
    color: "#E5E3FF",
    fontSize: 11,
    lineHeight: 18,
    marginTop: 6,
  },

  // Footer
  footer: {
    color: COLORS.muted,
    fontSize: 10,
    textAlign: "center",
    marginTop: 25,
  },
});
