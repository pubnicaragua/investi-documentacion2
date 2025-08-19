"use client"

import { useState, useEffect } from "react"
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  TextInput,
  Image,
  ActivityIndicator,
} from "react-native"
import { useTranslation } from "react-i18next"
import { Search, MessageSquare, Plus, BarChart3, Home, Users as UsersIcon } from "lucide-react-native"
import { getUserFeed, getCurrentUserId } from "../rest/api"
import { LanguageToggle } from "../components/LanguageToggle"
import { EmptyState } from "../components/EmptyState"
import { useAuthGuard } from "../hooks/useAuthGuard"
import { useOnboardingGuard } from "../hooks/useOnboardingGuard"

export function HomeFeedScreen({ navigation }: any) {
  const { t } = useTranslation()
  const [activeTab, setActiveTab] = useState("forYou")
  const [posts, setPosts] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useAuthGuard()
  const { loading: onboardingLoading } = useOnboardingGuard()

  useEffect(() => {
    loadFeed()
  }, [])

  const loadFeed = async () => {
    setLoading(true)
    setError(null)
    try {
      const uid = await getCurrentUserId()
      if (uid) {
        const data = await getUserFeed(uid)
        setPosts(data)
      }
    } catch (error: any) {
      setError(error.message)
    } finally {
      setLoading(false)
    }
  }

  const tabs = [
    { key: "forYou", label: t("feed.title") },
    { key: "following", label: t("feed.following") },
    { key: "popular", label: t("feed.popular") },
  ]

  if (onboardingLoading) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#2673f3" />
        </View>
      </SafeAreaView>
    )
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Image
          source={{
            uri: "https://softwarenicaragua.com/wp-content/uploads/2025/04/image_2025-04-11_071419058.png",
          }}
          style={styles.profileImage}
        />
        <View style={styles.searchContainer}>
          <Search size={20} color="#667" />
          <TextInput style={styles.searchInput} placeholder={t("home.searchPlaceholder")} placeholderTextColor="#999" />
        </View>
        <TouchableOpacity>
          <MessageSquare size={24} color="#111" />
        </TouchableOpacity>
        <LanguageToggle />
      </View>

      <View style={styles.tabsContainer}>
        {tabs.map((tab) => (
          <TouchableOpacity
            key={tab.key}
            style={[styles.tab, activeTab === tab.key && styles.activeTab]}
            onPress={() => setActiveTab(tab.key)}
          >
            <Text style={[styles.tabText, activeTab === tab.key && styles.activeTabText]}>{tab.label}</Text>
          </TouchableOpacity>
        ))}
      </View>

      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        {loading ? (
          <View style={styles.loadingContainer}>
            <ActivityIndicator size="large" color="#2673f3" />
          </View>
        ) : error || posts.length === 0 ? (
          <EmptyState title={t("feed.noPostsAvailable")} message={t("common.retry")} onRetry={loadFeed} />
        ) : (
          <View style={styles.content}>
            <Text style={styles.suggestionsText}>{t("feed.suggestions")}</Text>

            <View style={styles.suggestionsContainer}>
              <View style={styles.suggestionCard}>
                <Image
                  source={{
                    uri: "https://softwarenicaragua.com/wp-content/uploads/2025/04/image_2025-04-11_071419058.png",
                  }}
                  style={styles.suggestionAvatar}
                />
                <Text style={styles.suggestionName}>Alexey Makova...</Text>
                <Text style={styles.suggestionRole}>Mercadólogo y financista</Text>
                <TouchableOpacity style={styles.connectButton}>
                  <Text style={styles.connectButtonText}>{t("feed.connect")}</Text>
                </TouchableOpacity>
              </View>

              <View style={styles.suggestionCard}>
                <Image
                  source={{
                    uri: "https://softwarenicaragua.com/wp-content/uploads/2025/04/image_2025-04-11_071419058.png",
                  }}
                  style={styles.suggestionAvatar}
                />
                <Text style={styles.suggestionName}>Alexey Makova...</Text>
                <Text style={styles.suggestionRole}>Mercadólogo y financista</Text>
                <TouchableOpacity style={styles.connectButton}>
                  <Text style={styles.connectButtonText}>{t("feed.connect")}</Text>
                </TouchableOpacity>
              </View>
            </View>

            <View style={styles.communityCard}>
              <Text style={styles.communityTitle}>Inversiones para principiantes</Text>
              <View style={styles.communityMeta}>
                <Text style={styles.communityMembers}>12k miembros</Text>
                <TouchableOpacity style={styles.joinCommunityButton}>
                  <Text style={styles.joinCommunityButtonText}>{t("communities.join")}</Text>
                </TouchableOpacity>
              </View>
            </View>

            <View style={styles.cryptoCard}>
              <Image
                source={{
                  uri: "https://softwarenicaragua.com/wp-content/uploads/2025/04/image_2025-04-11_071419058.png",
                }}
                style={styles.cryptoAvatar}
              />
              <TouchableOpacity style={styles.joinCryptoButton}>
                <Text style={styles.joinCryptoButtonText}>{t("communities.join")}</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
      </ScrollView>

      <View style={styles.bottomNavigation}>
        <TouchableOpacity 
          style={[styles.navItem, navigation.isFocused() && styles.navItemActive]}
          onPress={() => navigation.navigate("HomeFeed")}
        >
          <Home size={24} color={navigation.isFocused() ? "#2673f3" : "#667"} style={styles.navIcon} />
          <Text style={[styles.navLabel, navigation.isFocused() && styles.navLabelActive]}>{t('common.home')}</Text>
        </TouchableOpacity>

        <TouchableOpacity 
          style={styles.navItem}
          onPress={() => navigation.navigate("MarketInfo")}
        >
          <BarChart3 size={24} color="#667" style={styles.navIcon} />
          <Text style={styles.navLabel}>{t('market.title')}</Text>
        </TouchableOpacity>

        <TouchableOpacity 
          style={styles.navItem}
          onPress={() => navigation.navigate("CreatePost")}
        >
          <View style={{
            backgroundColor: '#2673f3',
            width: 48,
            height: 28,
            borderRadius: 14,
            justifyContent: 'center',
            alignItems: 'center',
            marginBottom: 4,
          }}>
            <Plus size={20} color="white" />
          </View>
          <Text style={styles.navLabel}>{t('common.create')}</Text>
        </TouchableOpacity>

        <TouchableOpacity 
          style={styles.navItem}
          onPress={() => navigation.navigate("Communities")}
        >
          <UsersIcon size={24} color="#667" style={styles.navIcon} />
          <Text style={styles.navLabel}>{t('communities.title')}</Text>
        </TouchableOpacity>

        <TouchableOpacity 
          style={styles.navItem}
          onPress={() => navigation.navigate("Profile")}
        >
          <View style={styles.profileNavIcon}>
            <Image
              source={{ uri: "https://softwarenicaragua.com/wp-content/uploads/2025/04/image_2025-04-11_071419058.png" }}
              style={{ width: '100%', height: '100%' }}
              resizeMode="cover"
            />
          </View>
          <Text style={styles.navLabel}>{t('profile.title')}</Text>
        </TouchableOpacity>
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
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: "white",
    borderBottomWidth: 1,
    borderBottomColor: "#e5e5e5",
  },
  profileImage: {
    width: 32,
    height: 32,
    borderRadius: 16,
    marginRight: 12,
  },
  searchContainer: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#f0f0f0",
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: 8,
    marginRight: 12,
  },
  searchInput: {
    flex: 1,
    marginLeft: 8,
    fontSize: 16,
    color: "#111",
  },
  tabsContainer: {
    flexDirection: "row",
    backgroundColor: "white",
    borderBottomWidth: 1,
    borderBottomColor: "#e5e5e5",
  },
  tab: {
    flex: 1,
    paddingVertical: 16,
    alignItems: "center",
  },
  activeTab: {
    borderBottomWidth: 2,
    borderBottomColor: "#2673f3",
  },
  tabText: {
    fontSize: 16,
    color: "#667",
    fontWeight: "500",
  },
  activeTabText: {
    color: "#2673f3",
    fontWeight: "600",
  },
  scrollView: {
    flex: 1,
  },
  content: {
    padding: 16,
  },
  suggestionsText: {
    fontSize: 14,
    color: "#667",
    textAlign: "center",
    marginBottom: 16,
  },
  suggestionsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 16,
  },
  suggestionCard: {
    alignItems: "center",
    width: "48%",
  },
  suggestionAvatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    marginBottom: 8,
  },
  suggestionName: {
    fontSize: 16,
    fontWeight: "600",
    color: "#111",
    marginBottom: 4,
  },
  suggestionRole: {
    fontSize: 14,
    color: "#667",
    textAlign: "center",
    marginBottom: 12,
  },
  connectButton: {
    backgroundColor: "#2673f3",
    paddingHorizontal: 24,
    paddingVertical: 8,
    borderRadius: 20,
  },
  connectButtonText: {
    color: "white",
    fontSize: 14,
    fontWeight: "600",
  },
  communityCard: {
    backgroundColor: "#2673f3",
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
  },
  communityTitle: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 8,
  },
  communityMeta: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  communityMembers: {
    color: "white",
    fontSize: 14,
  },
  joinCommunityButton: {
    backgroundColor: "white",
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
  },
  joinCommunityButtonText: {
    color: "#2673f3",
    fontSize: 14,
    fontWeight: "600",
  },
  cryptoCard: {
    backgroundColor: "#FF9500",
    borderRadius: 12,
    padding: 16,
    alignItems: "flex-start",
  },
  cryptoAvatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
    marginBottom: 12,
  },
  joinCryptoButton: {
    backgroundColor: "white",
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
  },
  joinCryptoButtonText: {
    color: "#FF9500",
    fontSize: 14,
    fontWeight: "600",
  },
  bottomNavigation: {
    flexDirection: "row",
    backgroundColor: "white",
    borderTopWidth: 1,
    borderTopColor: "#e5e5e5",
    paddingVertical: 8,
    paddingBottom: 24, // Extra padding for iPhone X+ devices
    height: 70,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 5,
  },
  navItem: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 8,
  },
  navItemActive: {
    // Style for active tab if needed
  },
  navIcon: {
    marginBottom: 4,
  },
  navLabel: {
    fontSize: 10,
    color: "#667",
    marginTop: 2,
  },
  navLabelActive: {
    color: "#2673f3",
    fontWeight: '600',
  },
  profileNavIcon: {
    width: 24,
    height: 24,
    backgroundColor: "#e5e5e5",
    borderRadius: 12,
    overflow: 'hidden',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 40,
  },
})
