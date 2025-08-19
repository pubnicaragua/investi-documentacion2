"use client"

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
import { ArrowLeft, Users } from "lucide-react-native"
import { listCommunities, joinCommunity, getCurrentUserId } from "../rest/api"
import { LanguageToggle } from "../components/LanguageToggle"
import { EmptyState } from "../components/EmptyState"
import { useOnboardingGuard } from "../hooks/useOnboardingGuard"

export function CommunityRecommendationsScreen({ navigation }: any) {
  const { t } = useTranslation()
  const [communities, setCommunities] = useState([])
  const [joinedCommunities, setJoinedCommunities] = useState<string[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const { loading: onboardingLoading } = useOnboardingGuard()

  useEffect(() => {
    loadCommunities()
  }, [])

  const loadCommunities = async () => {
    setLoading(true)
    setError(null)
    try {
      const data = await listCommunities()
      setCommunities(data.slice(0, 6))
    } catch (error: any) {
      setError(error.message)
    } finally {
      setLoading(false)
    }
  }

  const handleJoinCommunity = async (communityId: string) => {
    try {
      const uid = await getCurrentUserId()
      if (uid) {
        await joinCommunity(uid, communityId)
        setJoinedCommunities((prev) => [...prev, communityId])
      }
    } catch (error) {
      console.error("Error joining community:", error)
    }
  }

  const handleFinish = () => {
    navigation.navigate("HomeFeed")
  }

  if (onboardingLoading || loading) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#2673f3" />
        </View>
      </SafeAreaView>
    )
  }

  if (error || communities.length === 0) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
            <ArrowLeft size={24} color="#111" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>{t("communities.title")}</Text>
          <View style={styles.headerRight} />
        </View>
        <EmptyState
          title={t("communities.noCommunitiesAvailable")}
          message={t("common.retry")}
          onRetry={loadCommunities}
        />
        <View style={styles.languageToggleContainer}>
          <LanguageToggle />
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
        <Text style={styles.headerTitle}>{t("communities.title")}</Text>
        <View style={styles.headerRight} />
      </View>

      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        <View style={styles.content}>
          <Text style={styles.title}>{t("communities.title")}</Text>
          <Text style={styles.subtitle}>{t("communities.subtitle")}</Text>

          <View style={styles.communitiesContainer}>
            {communities.map((community: any) => (
              <View key={community.id} style={styles.communityCard}>
                <View style={styles.communityHeader}>
                  <Image
                    source={{
                      uri:
                        community.image_url ||
                        "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-1QfIzwhLwoOmOMcL1qoLmYAYFMXrN3.png",
                    }}
                    style={styles.communityImage}
                  />
                  <View style={styles.communityInfo}>
                    <Text style={styles.communityName}>{community.name}</Text>
                    <View style={styles.communityMeta}>
                      <Users size={14} color="#667" />
                      <Text style={styles.communityMembers}>
                        {community.member_count || 0} {t("communities.members")}
                      </Text>
                      <Text style={styles.communityDot}>•</Text>
                      <Text style={styles.communityType}>{t("communities.publicCommunity")}</Text>
                    </View>
                  </View>
                </View>

                {community.description && <Text style={styles.communityDescription}>{community.description}</Text>}

                <TouchableOpacity
                  style={[styles.joinButton, joinedCommunities.includes(community.id) && styles.joinButtonJoined]}
                  onPress={() => handleJoinCommunity(community.id)}
                  disabled={joinedCommunities.includes(community.id)}
                >
                  <Text
                    style={[
                      styles.joinButtonText,
                      joinedCommunities.includes(community.id) && styles.joinButtonTextJoined,
                    ]}
                  >
                    {joinedCommunities.includes(community.id) ? t("communities.joined") : t("communities.join")}
                  </Text>
                </TouchableOpacity>
              </View>
            ))}
          </View>
        </View>
      </ScrollView>

      <View style={styles.footer}>
        <TouchableOpacity style={styles.finishButton} onPress={handleFinish}>
          <Text style={styles.finishButtonText}>{t("communities.finish")}</Text>
        </TouchableOpacity>
      </View>

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
    paddingHorizontal: 20,
    paddingTop: 10,
    paddingBottom: 20,
  },
  backButton: {
    width: 40,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#111",
  },
  headerRight: {
    width: 40,
  },
  scrollView: {
    flex: 1,
  },
  content: {
    paddingHorizontal: 24,
    paddingBottom: 100,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#111",
    textAlign: "center",
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: "#667",
    textAlign: "center",
    marginBottom: 40,
    lineHeight: 22,
  },
  communitiesContainer: {
    gap: 16,
  },
  communityCard: {
    backgroundColor: "white",
    borderRadius: 12,
    padding: 16,
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  communityHeader: {
    flexDirection: "row",
    marginBottom: 12,
  },
  communityImage: {
    width: 48,
    height: 48,
    borderRadius: 24,
    marginRight: 12,
  },
  communityInfo: {
    flex: 1,
  },
  communityName: {
    fontSize: 16,
    fontWeight: "600",
    color: "#111",
    marginBottom: 4,
  },
  communityMeta: {
    flexDirection: "row",
    alignItems: "center",
  },
  communityMembers: {
    fontSize: 14,
    color: "#667",
    marginLeft: 4,
  },
  communityDot: {
    fontSize: 14,
    color: "#667",
    marginHorizontal: 8,
  },
  communityType: {
    fontSize: 14,
    color: "#667",
  },
  communityDescription: {
    fontSize: 14,
    color: "#667",
    lineHeight: 20,
    marginBottom: 16,
  },
  joinButton: {
    backgroundColor: "#2673f3",
    paddingVertical: 12,
    borderRadius: 12,
    alignItems: "center",
  },
  joinButtonJoined: {
    backgroundColor: "#27AE60",
  },
  joinButtonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "600",
  },
  joinButtonTextJoined: {
    color: "white",
  },
  footer: {
    paddingHorizontal: 24,
    paddingBottom: 40,
    paddingTop: 20,
    backgroundColor: "white",
  },
  finishButton: {
    backgroundColor: "#2673f3",
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: "center",
  },
  finishButtonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "600",
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
