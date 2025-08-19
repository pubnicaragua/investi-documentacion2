"use client"

import React from "react"

import { useState, useEffect } from "react"
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  Image,
  ActivityIndicator,
} from "react-native"
import { useTranslation } from "react-i18next"
import { ArrowLeft, Settings, Bookmark, Users, MessageCircle, Sliders } from "lucide-react-native"
import { getMe, getCurrentUserId } from "../rest/api"
import { LanguageToggle } from "../components/LanguageToggle"
import { useAuthGuard } from "../hooks/useAuthGuard"

export function ProfileScreen({ navigation }: any) {
  const { t } = useTranslation()
  const [user, setUser] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  useAuthGuard()

  useEffect(() => {
    loadUser()
  }, [])

  const loadUser = async () => {
    try {
      const uid = await getCurrentUserId()
      if (uid) {
        const data = await getMe(uid)
        setUser(data)
      }
    } catch (error) {
      console.error("Error loading user:", error)
    } finally {
      setLoading(false)
    }
  }

  const quickAccessItems = [
    {
      icon: "🏦",
      title: "Inversiones para principiantes",
      subtitle: "Inversionista principiante y diseñador",
    },
    {
      icon: "₿",
      title: "Criptomonedas para principiantes",
      subtitle: "",
    },
  ]

  const menuItems = [
    { icon: Bookmark, label: t("profile.savedPosts") },
    { icon: Users, label: t("profile.communities") },
    { icon: MessageCircle, label: t("profile.consultIri") },
    { icon: Sliders, label: t("profile.configuration"), onPress: () => navigation.navigate("Settings") },
  ]

  if (loading) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
            <ArrowLeft size={24} color="#111" />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate("Settings")}>
            <Settings size={24} color="#111" />
          </TouchableOpacity>
        </View>
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#2673f3" />
        </View>
      </SafeAreaView>
    )
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
          <ArrowLeft size={24} color="#111" />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate("Settings")}>
          <Settings size={24} color="#111" />
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        <View style={styles.profileHeader}>
          <Image
            source={{
              uri:
                user?.photo_url ||
                "https://softwarenicaragua.com/wp-content/uploads/2025/04/image_2025-04-11_071419058.png",
            }}
            style={styles.profileImage}
          />
          <Text style={styles.profileName}>{user?.name || "Paolo Fernández"}</Text>
          <Text style={styles.profileBio}>{user?.bio || "Inversionista principiante y diseñador"}</Text>
          <View style={styles.profileLocation}>
            <Text style={styles.locationText}>{user?.location || "🇨🇱 Chile"}</Text>
          </View>
          <TouchableOpacity style={styles.profileButton}>
            <Text style={styles.profileButtonText}>{t("profile.goToProfile")}</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.quickAccessSection}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>{t("profile.quickAccess")}</Text>
            <TouchableOpacity>
              <Text style={styles.editButton}>{t("profile.edit")}</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.quickAccessItems}>
            {quickAccessItems.map((item, index) => (
              <View key={index} style={styles.quickAccessItem}>
                <Text style={styles.quickAccessIcon}>{item.icon}</Text>
                <View style={styles.quickAccessInfo}>
                  <Text style={styles.quickAccessTitle}>{item.title}</Text>
                  {item.subtitle && <Text style={styles.quickAccessSubtitle}>{item.subtitle}</Text>}
                </View>
              </View>
            ))}
          </View>
        </View>

        <View style={styles.menuSection}>
          {menuItems.map((item, index) => (
            <TouchableOpacity key={index} style={styles.menuItem} onPress={item.onPress}>
              {React.createElement(item.icon, { size: 24, color: "#667" })}
              <Text style={styles.menuItemText}>{item.label}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>

      <View style={styles.languageToggleContainer}>
        <LanguageToggle />
      </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f7f8fa",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: "white",
    borderBottomWidth: 1,
    borderBottomColor: "#e5e5e5",
  },
  backButton: {
    padding: 4,
  },
  scrollView: {
    flex: 1,
  },
  profileHeader: {
    alignItems: "center",
    paddingVertical: 24,
    paddingHorizontal: 16,
    backgroundColor: "white",
  },
  profileImage: {
    width: 96,
    height: 96,
    borderRadius: 48,
    marginBottom: 16,
  },
  profileName: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#111",
    marginBottom: 8,
  },
  profileBio: {
    fontSize: 16,
    color: "#667",
    textAlign: "center",
    marginBottom: 8,
  },
  profileLocation: {
    marginBottom: 16,
  },
  locationText: {
    fontSize: 16,
    color: "#2673f3",
  },
  profileButton: {
    borderWidth: 1,
    borderColor: "#2673f3",
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
  },
  profileButtonText: {
    color: "#2673f3",
    fontSize: 14,
    fontWeight: "500",
  },
  quickAccessSection: {
    paddingHorizontal: 16,
    paddingVertical: 24,
    backgroundColor: "white",
    marginTop: 8,
  },
  sectionHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#111",
  },
  editButton: {
    color: "#2673f3",
    fontSize: 16,
    fontWeight: "500",
  },
  quickAccessItems: {
    gap: 12,
  },
  quickAccessItem: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#f0f0f0",
    padding: 12,
    borderRadius: 12,
  },
  quickAccessIcon: {
    fontSize: 24,
    marginRight: 12,
  },
  quickAccessInfo: {
    flex: 1,
  },
  quickAccessTitle: {
    fontSize: 16,
    fontWeight: "500",
    color: "#111",
  },
  quickAccessSubtitle: {
    fontSize: 14,
    color: "#667",
  },
  menuSection: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    backgroundColor: "white",
    marginTop: 8,
  },
  menuItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 16,
  },
  menuItemText: {
    fontSize: 18,
    color: "#111",
    marginLeft: 16,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  languageToggleContainer: {
    position: "absolute",
    top: 60,
    right: 20,
  },
})
