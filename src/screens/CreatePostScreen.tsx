"use client"

import { useState } from "react"
import { View, Text, TextInput, TouchableOpacity, StyleSheet, SafeAreaView, ScrollView, Image } from "react-native"
import { useTranslation } from "react-i18next"
import { ArrowLeft, ChevronDown, Camera, Video, Star, FileText, Users, BarChart3 } from "lucide-react-native"
import { createPost, getCurrentUserId } from "../rest/api"

export function CreatePostScreen({ navigation }: any) {
  const { t } = useTranslation()
  const [content, setContent] = useState("")
  const [selectedCommunity, setSelectedCommunity] = useState("Comunidad")
  const [loading, setLoading] = useState(false)

  const handlePublish = async () => {
    if (!content.trim()) return

    setLoading(true)
    try {
      const userId = await getCurrentUserId()
      if (userId) {
        await createPost({
          user_id: userId,
          contenido: content,
          media_url: [],
        })
        navigation.goBack()
      }
    } catch (error) {
      console.error("Error creating post:", error)
    } finally {
      setLoading(false)
    }
  }

  const postOptions = [
    { icon: Camera, label: t("createPost.addPhoto"), color: "#666" },
    { icon: Video, label: t("createPost.addVideo"), color: "#666" },
    { icon: Star, label: t("createPost.celebrate"), color: "#666" },
    { icon: FileText, label: t("createPost.addDocument"), color: "#666" },
    { icon: Users, label: t("createPost.findPartner"), color: "#666" },
    { icon: BarChart3, label: t("createPost.createPoll"), color: "#666" },
  ]

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
          <ArrowLeft size={24} color="#111" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>{t("createPost.title")}</Text>
        <TouchableOpacity style={styles.publishButton} onPress={handlePublish} disabled={loading || !content.trim()}>
          <Text style={[styles.publishButtonText, { color: content.trim() ? "#007AFF" : "#ccc" }]}>
            {loading ? "Publicando..." : t("createPost.publish")}
          </Text>
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        <View style={styles.userContainer}>
          <Image
            source={{
              uri: "https://softwarenicaragua.com/wp-content/uploads/2025/04/image_2025-04-11_071419058.png",
            }}
            style={styles.avatar}
          />
          <View style={styles.userInfo}>
            <Text style={styles.userName}>Paolo Fernández</Text>
            <TouchableOpacity style={styles.communitySelector}>
              <View style={styles.communityIcon} />
              <Text style={styles.communityText}>{selectedCommunity}</Text>
              <ChevronDown size={16} color="#666" />
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.textContainer}>
          <TextInput
            style={styles.textInput}
            placeholder={t("createPost.placeholder")}
            placeholderTextColor="#999"
            value={content}
            onChangeText={setContent}
            multiline
            textAlignVertical="top"
          />
        </View>

        <View style={styles.dividerContainer}>
          <View style={styles.divider} />
        </View>

        <View style={styles.optionsContainer}>
          {postOptions.map((option, index) => (
            <TouchableOpacity key={index} style={styles.option}>
              <option.icon size={24} color={option.color} />
              <Text style={styles.optionText}>{option.label}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>

      <View style={styles.bottomIndicator}>
        <View style={styles.indicator} />
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
    paddingVertical: 16,
    backgroundColor: "white",
    borderBottomWidth: 1,
    borderBottomColor: "#e5e5e5",
  },
  backButton: {
    padding: 4,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#111",
  },
  publishButton: {
    padding: 4,
  },
  publishButtonText: {
    fontSize: 16,
    fontWeight: "600",
  },
  scrollView: {
    flex: 1,
  },
  userContainer: {
    flexDirection: "row",
    paddingHorizontal: 20,
    paddingVertical: 20,
    backgroundColor: "white",
  },
  avatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
    marginRight: 12,
  },
  userInfo: {
    flex: 1,
  },
  userName: {
    fontSize: 16,
    fontWeight: "600",
    color: "#111",
    marginBottom: 4,
  },
  communitySelector: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#f0f0f0",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    alignSelf: "flex-start",
  },
  communityIcon: {
    width: 8,
    height: 8,
    backgroundColor: "#007AFF",
    borderRadius: 4,
    marginRight: 8,
  },
  communityText: {
    fontSize: 14,
    color: "#111",
    marginRight: 4,
  },
  textContainer: {
    backgroundColor: "white",
    paddingHorizontal: 20,
    paddingBottom: 40,
  },
  textInput: {
    fontSize: 18,
    color: "#111",
    minHeight: 200,
    textAlignVertical: "top",
  },
  dividerContainer: {
    alignItems: "center",
    paddingVertical: 20,
    backgroundColor: "white",
  },
  divider: {
    width: 50,
    height: 4,
    backgroundColor: "#ddd",
    borderRadius: 2,
  },
  optionsContainer: {
    backgroundColor: "white",
    paddingHorizontal: 20,
    paddingBottom: 40,
  },
  option: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 16,
  },
  optionText: {
    fontSize: 16,
    color: "#111",
    marginLeft: 16,
  },
  bottomIndicator: {
    alignItems: "center",
    paddingVertical: 20,
    backgroundColor: "white",
  },
  indicator: {
    width: 134,
    height: 4,
    backgroundColor: "#111",
    borderRadius: 2,
  },
})
