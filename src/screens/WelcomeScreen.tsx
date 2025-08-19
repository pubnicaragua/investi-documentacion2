"use client"

import { useEffect, useState } from "react"
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  Image,
  ScrollView,
  ActivityIndicator,
} from "react-native"
import { useTranslation } from "react-i18next"
import { Users } from "lucide-react-native"
import { listCommunities } from "../rest/api"

export function WelcomeScreen({ navigation }: any) {
  const { t } = useTranslation()
  const [communities, setCommunities] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    loadCommunities()
  }, [])

  const loadCommunities = async () => {
    try {
      const data = await listCommunities()
      setCommunities(data.slice(0, 3))
    } catch (error) {
      console.error("Error loading communities:", error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView} contentContainerStyle={styles.content}>
        <View style={styles.logoContainer}>
          <Image
            source={{
              uri: "https://softwarenicaragua.com/wp-content/uploads/2025/04/image_2025-04-11_071419058.png",
            }}
            style={styles.heroImage}
            resizeMode="contain"
          />
        </View>

        <View style={styles.titleContainer}>
          <View style={styles.iconContainer}>
            <Text style={styles.iconText}>i</Text>
          </View>
          <Text style={styles.title}>Investí</Text>
          <Text style={styles.subtitle}>Community</Text>
        </View>

        <Text style={styles.description}>{t("welcome.subtitle")}</Text>

        <View style={styles.statsContainer}>
          <Users size={16} color="#007AFF" />
          <Text style={styles.statsText}>Más de 100k usuarios registrados</Text>
        </View>

        <View style={styles.buttonsContainer}>
          <TouchableOpacity style={styles.primaryButton} onPress={() => navigation.navigate("SignUp")}>
            <Text style={styles.primaryButtonText}>{t("welcome.getStarted")}</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.secondaryButton} onPress={() => navigation.navigate("SignIn")}>
            <Text style={styles.secondaryButtonText}>{t("welcome.signIn")}</Text>
          </TouchableOpacity>
        </View>

        {loading && (
          <View style={styles.loadingContainer}>
            <ActivityIndicator size="small" color="#007AFF" />
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f7f8fa",
  },
  scrollView: {
    flex: 1,
  },
  content: {
    flexGrow: 1,
    paddingHorizontal: 24,
    paddingVertical: 40,
    justifyContent: "center",
  },
  logoContainer: {
    alignItems: "center",
    marginBottom: 40,
  },
  heroImage: {
    width: 280,
    height: 200,
  },
  titleContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 12,
  },
  iconContainer: {
    width: 36,
    height: 36,
    backgroundColor: "#007AFF",
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 12,
  },
  iconText: {
    color: "white",
    fontSize: 20,
    fontWeight: "bold",
  },
  title: {
    fontSize: 32,
    fontWeight: "bold",
    color: "#111",
    marginRight: 8,
  },
  subtitle: {
    fontSize: 32,
    fontWeight: "300",
    color: "#667",
  },
  description: {
    fontSize: 16,
    color: "#667",
    textAlign: "center",
    lineHeight: 24,
    marginBottom: 24,
  },
  statsContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 48,
  },
  statsText: {
    marginLeft: 8,
    color: "#007AFF",
    fontWeight: "500",
    fontSize: 14,
  },
  buttonsContainer: {
    gap: 16,
  },
  primaryButton: {
    backgroundColor: "#007AFF",
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: "center",
  },
  primaryButtonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "600",
  },
  secondaryButton: {
    backgroundColor: "transparent",
    borderWidth: 1,
    borderColor: "#007AFF",
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: "center",
  },
  secondaryButtonText: {
    color: "#007AFF",
    fontSize: 16,
    fontWeight: "600",
  },
  loadingContainer: {
    marginTop: 20,
    alignItems: "center",
  },
})
