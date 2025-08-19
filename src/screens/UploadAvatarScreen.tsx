"use client"

import { useState } from "react"
import { View, Text, TouchableOpacity, StyleSheet, SafeAreaView, Image, Alert, ActivityIndicator } from "react-native"
import { useTranslation } from "react-i18next"
import { ArrowLeft, Camera } from "lucide-react-native"
import * as ImagePicker from "expo-image-picker"
import { uploadAvatar, getCurrentUserId } from "../rest/api"
import { LanguageToggle } from "../components/LanguageToggle"

export function UploadAvatarScreen({ navigation }: any) {
  const { t } = useTranslation()
  const [avatar, setAvatar] = useState<any>(null)
  const [loading, setLoading] = useState(false)

  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.8,
    })

    if (!result.canceled) {
      setAvatar(result.assets[0])
    }
  }

  const handleSave = async () => {
    setLoading(true)
    try {
      if (avatar) {
        const uid = await getCurrentUserId()
        if (uid) {
          // Convert to blob for upload
          const response = await fetch(avatar.uri)
          const blob = await response.blob()
          await uploadAvatar(uid, blob)
        }
      }
      navigation.navigate("PickGoals")
    } catch (error: any) {
      Alert.alert("Error", error.message)
    } finally {
      setLoading(false)
    }
  }

  const handleSkip = () => {
    navigation.navigate("PickGoals")
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
          <ArrowLeft size={24} color="#111" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>{t("avatar.title")}</Text>
        <TouchableOpacity style={styles.skipButton} onPress={handleSkip}>
          <Text style={styles.skipButtonText}>{t("avatar.skip")}</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.content}>
        <View style={styles.avatarContainer}>
          <View style={styles.avatarWrapper}>
            {avatar ? (
              <Image source={{ uri: avatar.uri }} style={styles.avatar} />
            ) : (
              <View style={styles.avatarPlaceholder}>
                <Camera size={40} color="#ccc" />
              </View>
            )}
          </View>
        </View>

        <TouchableOpacity style={styles.changePhotoButton} onPress={pickImage}>
          <Camera size={20} color="#2673f3" />
          <Text style={styles.changePhotoText}>{t("avatar.changePhoto")}</Text>
        </TouchableOpacity>

        <Text style={styles.subtitle}>{t("avatar.subtitle")}</Text>
      </View>

      <View style={styles.footer}>
        <TouchableOpacity style={styles.continueButton} onPress={handleSave} disabled={loading}>
          {loading ? (
            <ActivityIndicator color="white" />
          ) : (
            <Text style={styles.continueButtonText}>{t("avatar.continue")}</Text>
          )}
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
    width: 60,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#111",
  },
  skipButton: {
    width: 60,
    alignItems: "flex-end",
  },
  skipButtonText: {
    color: "#2673f3",
    fontSize: 16,
    fontWeight: "500",
  },
  content: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 24,
  },
  avatarContainer: {
    marginBottom: 40,
  },
  avatarWrapper: {
    width: 200,
    height: 200,
    borderRadius: 100,
    overflow: "hidden",
  },
  avatar: {
    width: "100%",
    height: "100%",
  },
  avatarPlaceholder: {
    width: "100%",
    height: "100%",
    backgroundColor: "#f0f0f0",
    alignItems: "center",
    justifyContent: "center",
  },
  changePhotoButton: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#2673f3",
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 12,
    marginBottom: 40,
  },
  changePhotoText: {
    color: "#2673f3",
    fontSize: 16,
    fontWeight: "500",
    marginLeft: 8,
  },
  subtitle: {
    fontSize: 16,
    color: "#667",
    textAlign: "center",
    lineHeight: 22,
  },
  footer: {
    paddingHorizontal: 24,
    paddingBottom: 40,
    paddingTop: 20,
  },
  continueButton: {
    backgroundColor: "#2673f3",
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: "center",
  },
  continueButtonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "600",
  },
  languageToggleContainer: {
    position: "absolute",
    top: 60,
    right: 20,
  },
})
