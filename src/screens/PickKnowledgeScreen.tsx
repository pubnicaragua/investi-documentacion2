"use client"

import { useState, useEffect } from "react"
import { View, Text, TouchableOpacity, StyleSheet, SafeAreaView, ActivityIndicator } from "react-native"
import { useTranslation } from "react-i18next"
import { ArrowLeft } from "lucide-react-native"
import { getMe, updateUser, getCurrentUserId } from "../rest/api"

const KNOWLEDGE_LEVELS = [
  { id: "none", text: "No tengo conocimiento", color: "#E74C3C" },
  { id: "little", text: "Tengo un poco de conocimiento", color: "#F39C12" },
  { id: "some", text: "Tengo conocimiento", color: "#F1C40F" },
  { id: "expert", text: "Soy experto", color: "#27AE60" },
]

export function PickKnowledgeScreen({ navigation }: any) {
  const { t } = useTranslation()
  const [selectedLevel, setSelectedLevel] = useState<string>("")
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
        if (user?.nivel_finanzas) {
          setSelectedLevel(user.nivel_finanzas)
        }
      }
    } catch (error) {
      console.error("Error loading user data:", error)
    } finally {
      setInitialLoading(false)
    }
  }

  const handleContinue = async () => {
    if (!selectedLevel) return

    setLoading(true)
    try {
      const uid = await getCurrentUserId()
      if (uid) {
        await updateUser(uid, { nivel_finanzas: selectedLevel })
        navigation.navigate("CommunityRecommendations")
      }
    } catch (error) {
      console.error("Error updating knowledge level:", error)
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

      <View style={styles.content}>
        <Text style={styles.title}>{t("knowledge.title")}</Text>

        <View style={styles.levelsContainer}>
          {KNOWLEDGE_LEVELS.map((level) => (
            <TouchableOpacity
              key={level.id}
              style={[
                styles.levelItem,
                selectedLevel === level.id && {
                  borderColor: level.color,
                  backgroundColor: `${level.color}15`,
                },
              ]}
              onPress={() => setSelectedLevel(level.id)}
            >
              <View style={[styles.radioButton, selectedLevel === level.id && { backgroundColor: level.color }]}>
                {selectedLevel === level.id && <View style={styles.radioButtonInner} />}
              </View>
              <Text style={[styles.levelText, selectedLevel === level.id && { color: level.color }]}>{level.text}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      <View style={styles.footer}>
        <TouchableOpacity
          style={[styles.continueButton, !selectedLevel && styles.continueButtonDisabled]}
          onPress={handleContinue}
          disabled={loading || !selectedLevel}
        >
          {loading ? (
            <ActivityIndicator color="white" />
          ) : (
            <Text style={styles.continueButtonText}>{t("knowledge.continue")}</Text>
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
  content: {
    flex: 1,
    paddingHorizontal: 24,
    justifyContent: "center",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#111",
    textAlign: "center",
    marginBottom: 60,
    lineHeight: 32,
  },
  levelsContainer: {
    gap: 16,
  },
  levelItem: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "white",
    paddingHorizontal: 20,
    paddingVertical: 20,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: "#e5e5e5",
  },
  radioButton: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: "#ddd",
    marginRight: 16,
    alignItems: "center",
    justifyContent: "center",
  },
  radioButtonInner: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: "white",
  },
  levelText: {
    fontSize: 16,
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
