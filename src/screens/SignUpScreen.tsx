"use client"

import { useState } from "react"
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  Alert,
  ScrollView,
  ActivityIndicator,
} from "react-native"
import { useTranslation } from "react-i18next"
import { ArrowLeft, Eye, EyeOff } from "lucide-react-native"
import { authSignUp, updateUser, getCurrentUserId } from "../rest/api"

export function SignUpScreen({ navigation }: any) {
  const { t } = useTranslation()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [name, setName] = useState("")
  const [username, setUsername] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)

  const handleSignUp = async () => {
    if (!email || !password || !name || !username) {
      Alert.alert(t("common.error"), t("auth.completeAllFields"))
      return
    }

    setLoading(true)
    try {
      await authSignUp(email, password)
      const uid = await getCurrentUserId()
      if (uid) {
        await updateUser(uid, { nombre: name, username })
      }
      navigation.navigate("UploadAvatar")
    } catch (error: any) {
      Alert.alert("Error", error.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
          <ArrowLeft size={24} color="#111" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>{t("auth.signUp")}</Text>
        <View style={styles.headerRight} />
      </View>

      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        <View style={styles.formContainer}>
          <TextInput
            style={styles.input}
            placeholder={t("auth.email")}
            placeholderTextColor="#999"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
          />

          <View style={styles.passwordContainer}>
            <TextInput
              style={styles.passwordInput}
              placeholder={t("auth.password")}
              placeholderTextColor="#999"
              value={password}
              onChangeText={setPassword}
              secureTextEntry={!showPassword}
            />
            <TouchableOpacity style={styles.eyeButton} onPress={() => setShowPassword(!showPassword)}>
              {showPassword ? <EyeOff size={20} color="#999" /> : <Eye size={20} color="#999" />}
            </TouchableOpacity>
          </View>

          <TextInput
            style={styles.input}
            placeholder={t("auth.name")}
            placeholderTextColor="#999"
            value={name}
            onChangeText={setName}
          />

          <TextInput
            style={styles.input}
            placeholder={t("auth.username")}
            placeholderTextColor="#999"
            value={username}
            onChangeText={setUsername}
            autoCapitalize="none"
          />

          <TouchableOpacity style={styles.signUpButton} onPress={handleSignUp} disabled={loading}>
            {loading ? (
              <ActivityIndicator color="white" />
            ) : (
              <Text style={styles.signUpButtonText}>{t("auth.createAccount")}</Text>
            )}
          </TouchableOpacity>
        </View>

        <View style={styles.dividerContainer}>
          <View style={styles.divider} />
        </View>

        <View style={styles.socialButtons}>
          <TouchableOpacity style={[styles.socialButton, styles.linkedinButton]}>
            <Text style={styles.socialButtonText}>
              {t("auth.signUpWith")} {t("auth.linkedin")}
            </Text>
          </TouchableOpacity>

          <TouchableOpacity style={[styles.socialButton, styles.googleButton]}>
            <Text style={[styles.socialButtonText, { color: "#333" }]}>
              {t("auth.signUpWith")} {t("auth.google")}
            </Text>
          </TouchableOpacity>

          <TouchableOpacity style={[styles.socialButton, styles.appleButton]}>
            <Text style={styles.socialButtonText}>
              {t("auth.signUpWith")} {t("auth.apple")}
            </Text>
          </TouchableOpacity>

          <TouchableOpacity style={[styles.socialButton, styles.facebookButton]}>
            <Text style={styles.socialButtonText}>
              {t("auth.signUpWith")} {t("auth.facebook")}
            </Text>
          </TouchableOpacity>
        </View>

        <Text style={styles.termsText}>{t("auth.terms")}</Text>
      </ScrollView>
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
    paddingHorizontal: 24,
  },
  formContainer: {
    paddingTop: 20,
  },
  input: {
    backgroundColor: "white",
    paddingHorizontal: 16,
    paddingVertical: 16,
    borderRadius: 12,
    fontSize: 16,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: "#e5e5e5",
  },
  passwordContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "white",
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 16,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: "#e5e5e5",
  },
  passwordInput: {
    flex: 1,
    fontSize: 16,
  },
  eyeButton: {
    padding: 4,
  },
  signUpButton: {
    backgroundColor: "#007AFF",
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: "center",
    marginTop: 8,
    marginBottom: 24,
  },
  signUpButtonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "600",
  },
  dividerContainer: {
    alignItems: "center",
    marginVertical: 20,
  },
  divider: {
    width: 40,
    height: 2,
    backgroundColor: "#ddd",
    borderRadius: 1,
  },
  socialButtons: {
    gap: 12,
    marginBottom: 24,
  },
  socialButton: {
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: "center",
  },
  socialButtonText: {
    color: "white",
    fontSize: 14,
    fontWeight: "500",
  },
  linkedinButton: {
    backgroundColor: "#0A66C2",
  },
  googleButton: {
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "#ddd",
  },
  appleButton: {
    backgroundColor: "#000",
  },
  facebookButton: {
    backgroundColor: "#1877F2",
  },
  termsText: {
    fontSize: 12,
    color: "#667",
    textAlign: "center",
    lineHeight: 18,
    marginBottom: 40,
  },
})
