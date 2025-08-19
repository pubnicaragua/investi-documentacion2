"use client"

import { useState, useEffect } from "react"
import { View, Text, TouchableOpacity, StyleSheet, SafeAreaView, ScrollView, ActivityIndicator } from "react-native"
import { useTranslation } from "react-i18next"
import { ArrowLeft } from "lucide-react-native"
import { getMe, updateUser, getCurrentUserId } from "../rest/api"

const GOALS = [
  { id: "house", icon: "🏠", text: "Comprar una casa o departamento" },
  { id: "education", icon: "🎓", text: "Pagar estudios" },
  { id: "freedom", icon: "💰", text: "Lograr libertad financiera" },
  { id: "travel", icon: "✈️", text: "Viajar por el mundo" },
  { id: "car", icon: "🚗", text: "Comprar un auto" },
  { id: "investment", icon: "📈", text: "Hacer crecer mi dinero a largo plazo" },
  { id: "health", icon: "⚕️", text: "Prepararme para mi salud" },
  { id: "personal", icon: "💖", text: "Proyectos personales" },
  { id: "learn", icon: "🧠", text: "Aprender financieramente" },
]

export function PickGoalsScreen({ navigation }: any) {
  const { t } = useTranslation()
  const [selectedGoals, setSelectedGoals] = useState<string[]>([])
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
        if (user?.metas) {
          setSelectedGoals(user.metas)
        }
      }
    } catch (error) {
      console.error("Error loading user data:", error)
    } finally {
      setInitialLoading(false)
    }
  }

  const toggleGoal = (goalId: string) => {
    setSelectedGoals((prev) => {
      if (prev.includes(goalId)) {
        return prev.filter((id) => id !== goalId)
      }
      if (prev.length >= 3) {
        return prev
      }
      return [...prev, goalId]
    })
  }

  const handleContinue = async () => {
    if (selectedGoals.length === 0) return

    setLoading(true)
    try {
      const uid = await getCurrentUserId()
      if (uid) {
        await updateUser(uid, { metas: selectedGoals })
        navigation.navigate("PickInterests")
      }
    } catch (error) {
      console.error("Error updating goals:", error)
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
          <Text style={styles.title}>{t("goals.title")}</Text>
          <Text style={styles.subtitle}>{t("goals.subtitle")}</Text>

          <View style={styles.goalsContainer}>
            {GOALS.map((goal) => (
              <TouchableOpacity
                key={goal.id}
                style={[styles.goalItem, selectedGoals.includes(goal.id) && styles.goalItemSelected]}
                onPress={() => toggleGoal(goal.id)}
              >
                <Text style={styles.goalIcon}>{goal.icon}</Text>
                <Text style={[styles.goalText, selectedGoals.includes(goal.id) && styles.goalTextSelected]}>
                  {goal.text}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      </ScrollView>

      <View style={styles.footer}>
        <TouchableOpacity
          style={[styles.continueButton, selectedGoals.length === 0 && styles.continueButtonDisabled]}
          onPress={handleContinue}
          disabled={loading || selectedGoals.length === 0}
        >
          {loading ? (
            <ActivityIndicator color="white" />
          ) : (
            <Text style={styles.continueButtonText}>{t("goals.continue")}</Text>
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
  goalsContainer: {
    gap: 12,
  },
  goalItem: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "white",
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: "#e5e5e5",
  },
  goalItemSelected: {
    borderColor: "#007AFF",
    backgroundColor: "#f0f8ff",
  },
  goalIcon: {
    fontSize: 24,
    marginRight: 16,
  },
  goalText: {
    fontSize: 16,
    color: "#111",
    flex: 1,
  },
  goalTextSelected: {
    color: "#007AFF",
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
