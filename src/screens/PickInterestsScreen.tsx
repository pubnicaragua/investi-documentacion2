"use client"

import { useState, useEffect } from "react"
import { View, Text, TouchableOpacity, StyleSheet, SafeAreaView, ScrollView, ActivityIndicator } from "react-native"
import { useTranslation } from "react-i18next"
import { ArrowLeft } from "lucide-react-native"
import { getMe, updateUser, getCurrentUserId } from "../rest/api"

const INTERESTS = [
  { id: "international_stocks", icon: "🌐", text: "Acciones internacionales", color: "#4A90E2" },
  { id: "chilean_stocks", icon: "🇨🇱", text: "Acciones Chilenas", color: "#E74C3C" },
  { id: "tech_stocks", icon: "💻", text: "Acciones tecnológicas", color: "#8E44AD" },
  { id: "crypto", icon: "₿", text: "Criptomonedas", color: "#F39C12" },
  { id: "eco_stocks", icon: "🌱", text: "Acciones ecológicas", color: "#27AE60" },
  { id: "health_stocks", icon: "💊", text: "Acciones en salud", color: "#3498DB" },
  { id: "etfs", icon: "📊", text: "ETFs", color: "#9B59B6" },
  { id: "startups", icon: "🚀", text: "Startups", color: "#E67E22" },
  { id: "bonds", icon: "📋", text: "Bonos / Renta fija", color: "#34495E" },
  { id: "real_estate", icon: "🏘️", text: "Inversión inmobiliaria", color: "#16A085" },
  { id: "industrial", icon: "🏭", text: "Acciones industriales", color: "#7F8C8D" },
  { id: "retail", icon: "🛍️", text: "Acciones de retail", color: "#E91E63" },
  { id: "oil", icon: "⛽", text: "Acciones petroleras", color: "#FF5722" },
  { id: "telecom", icon: "📱", text: "Acciones telefónicas", color: "#2196F3" },
  { id: "banking", icon: "🏦", text: "Acciones de banco", color: "#607D8B" },
  { id: "transport", icon: "🚛", text: "Acciones de transporte", color: "#FF9800" },
]

export function PickInterestsScreen({ navigation }: any) {
  const { t } = useTranslation()
  const [selectedInterests, setSelectedInterests] = useState<string[]>([])
  const [loading, setLoading] = useState(false)
  const [initialLoading, setInitialLoading] = useState(true)

  useEffect(() => {
    loadUserData()
  }, [])

  const loadUserData = async () => {
    try {
      const uid = await getCurrentUserId()
      if (uid) {
        const user = await getMe(uid)
        if (user?.intereses) {
          setSelectedInterests(user.intereses)
        }
      }
    } catch (error) {
      console.error("Error loading user data:", error)
    } finally {
      setInitialLoading(false)
    }
  }

  const toggleInterest = (interestId: string) => {
    setSelectedInterests((prev) => {
      if (prev.includes(interestId)) {
        return prev.filter((id) => id !== interestId)
      }
      return [...prev, interestId]
    })
  }

  const handleContinue = async () => {
    if (selectedInterests.length < 3) return

    setLoading(true)
    try {
      const uid = await getCurrentUserId()
      if (uid) {
        await updateUser(uid, { intereses: selectedInterests })
        navigation.navigate("PickKnowledge")
      }
    } catch (error) {
      console.error("Error updating interests:", error)
    } finally {
      setLoading(false)
    }
  }

  if (initialLoading) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#007AFF" />
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
        <View style={styles.headerRight} />
      </View>

      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        <View style={styles.content}>
          <Text style={styles.title}>{t("interests.title")}</Text>
          <Text style={styles.subtitle}>{t("interests.subtitle")}</Text>

          <View style={styles.interestsContainer}>
            {INTERESTS.map((interest) => (
              <TouchableOpacity
                key={interest.id}
                style={[
                  styles.interestItem,
                  selectedInterests.includes(interest.id) && {
                    borderColor: interest.color,
                    backgroundColor: `${interest.color}15`,
                  },
                ]}
                onPress={() => toggleInterest(interest.id)}
              >
                <Text style={styles.interestIcon}>{interest.icon}</Text>
                <Text
                  style={[styles.interestText, selectedInterests.includes(interest.id) && { color: interest.color }]}
                >
                  {interest.text}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      </ScrollView>

      <View style={styles.footer}>
        <TouchableOpacity
          style={[styles.continueButton, selectedInterests.length < 3 && styles.continueButtonDisabled]}
          onPress={handleContinue}
          disabled={loading || selectedInterests.length < 3}
        >
          {loading ? (
            <ActivityIndicator color="white" />
          ) : (
            <Text style={styles.continueButtonText}>{t("interests.continue")}</Text>
          )}
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
    justifyContent: "space-between",
    paddingHorizontal: 20,
    paddingTop: 10,
    paddingBottom: 20,
  },
  backButton: {
    width: 40,
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
  interestsContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 12,
  },
  interestItem: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "white",
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: "#e5e5e5",
    width: "48%",
  },
  interestIcon: {
    fontSize: 20,
    marginRight: 8,
  },
  interestText: {
    fontSize: 14,
    color: "#111",
    flex: 1,
    fontWeight: "500",
  },
  footer: {
    paddingHorizontal: 24,
    paddingBottom: 40,
    paddingTop: 20,
    backgroundColor: "white",
  },
  continueButton: {
    backgroundColor: "#007AFF",
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: "center",
  },
  continueButtonDisabled: {
    backgroundColor: "#ccc",
  },
  continueButtonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "600",
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
})
