import * as SecureStore from "expo-secure-store"

export const urls = {
  REST_URL: "https://paoliakwfoczcallnecf.supabase.co/rest/v1",
  AUTH_URL: "https://paoliakwfoczcallnecf.supabase.co/auth/v1",
  STORAGE_URL: "https://paoliakwfoczcallnecf.supabase.co/storage/v1",
}

const ANON_KEY =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBhb2xpYWt3Zm9jemNhbGxuZWNmIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTQ2MzA5ODYsImV4cCI6MjA3MDIwNjk4Nn0.zCJoTHcWKZB9vpy5Vn231PNsNSLzmnPvFBKTkNlgG4o"

export async function request(
  method: string,
  path: string,
  options: {
    params?: Record<string, any>
    body?: any
    headers?: Record<string, string>
    binary?: boolean
  } = {},
) {
  const { params, body, headers = {}, binary = false } = options

  // Build URL with query params
  let url = `${urls.REST_URL}${path}`
  if (params) {
    const searchParams = new URLSearchParams()
    Object.entries(params).forEach(([key, value]) => {
      if (value !== undefined) {
        searchParams.append(key, String(value))
      }
    })
    if (searchParams.toString()) {
      url += `?${searchParams.toString()}`
    }
  }

  // Headers
  const requestHeaders: Record<string, string> = {
    apikey: ANON_KEY,
    ...headers,
  }

  // Add auth token if available
  try {
    const token = await SecureStore.getItemAsync("access_token")
    if (token) {
      requestHeaders["Authorization"] = `Bearer ${token}`
    }
  } catch (error) {
    // Ignore token retrieval errors
  }

  if (!binary) {
    requestHeaders["Content-Type"] = "application/json"
  }

  // Make request
  const response = await fetch(url, {
    method,
    headers: requestHeaders,
    body: body ? (binary ? body : JSON.stringify(body)) : undefined,
  })

  if (!response.ok) {
    let errorData
    try {
      errorData = await response.json()
    } catch {
      errorData = { message: response.statusText }
    }
    throw {
      code: errorData.code || response.status,
      message: errorData.message || "Request failed",
      details: errorData.details || null,
    }
  }

  try {
    return await response.json()
  } catch {
    return null
  }
}

export async function authSignIn(email: string, password: string) {
  const response = await fetch(`${urls.AUTH_URL}/token?grant_type=password`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      apikey: ANON_KEY,
    },
    body: JSON.stringify({ email, password }),
  })

  if (!response.ok) {
    const error = await response.json()
    throw new Error(error.error_description || "Sign in failed")
  }

  const data = await response.json()

  // Guardar los tokens de autenticación
  if (data.access_token) {
    await SecureStore.setItemAsync('supabase.auth.token', data.access_token)
    await SecureStore.setItemAsync('access_token', data.access_token)
  }
  
  if (data.refresh_token) {
    await SecureStore.setItemAsync('supabase.auth.refresh_token', data.refresh_token)
    await SecureStore.setItemAsync('refresh_token', data.refresh_token)
  }

  return data
}

export async function authSignUp(email: string, password: string) {
  const response = await fetch(`${urls.AUTH_URL}/signup`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      apikey: ANON_KEY,
    },
    body: JSON.stringify({ email, password }),
  })

  if (!response.ok) {
    const error = await response.json()
    throw new Error(error.error_description || "Sign up failed")
  }

  return await response.json()
}

export async function authSignOut() {
  await SecureStore.deleteItemAsync("access_token")
  await SecureStore.deleteItemAsync("refresh_token")
}

export async function getCurrentUserId(): Promise<string | null> {
  try {
    const token = await SecureStore.getItemAsync("access_token")
    if (!token) return null

    // Decode JWT to get user ID (simple decode, no verification needed for client)
    const payload = JSON.parse(atob(token.split(".")[1]))
    return payload.sub || null
  } catch {
    return null
  }
}
