import { supabase } from "./supabase"

// Auth functions
export const signUp = async (email: string, password: string, userData?: any) => {
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
  })

  if (error) throw error

  if (data.user && userData) {
    const { error: profileError } = await supabase.from("users").insert([
      {
        id: data.user.id,
        email: data.user.email,
        ...userData,
      },
    ])

    if (profileError) throw profileError
  }

  return data
}

export const signIn = async (email: string, password: string) => {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  })

  if (error) throw error
  return data
}

// User functions
export const getUser = async (uid: string) => {
  const { data, error } = await supabase.from("users").select("*").eq("id", uid).single()

  if (error) throw error
  return data
}

export const updateUser = async (uid: string, updates: any) => {
  const { data, error } = await supabase.from("users").update(updates).eq("id", uid)

  if (error) throw error
  return data
}

// Community functions
export const getCommunityList = async (limit?: number) => {
  let query = supabase.from("communities").select("*")

  if (limit) {
    query = query.limit(limit).order("created_at", { ascending: false })
  }

  const { data, error } = await query

  if (error) throw error
  return data || []
}

export const joinCommunity = async (userId: string, communityId: string) => {
  const { data, error } = await supabase
    .from("user_communities")
    .insert([{ user_id: userId, community_id: communityId }])

  if (error) throw error
  return data
}

// Feed functions
export const getUserFeed = async (userId: string, limit = 20) => {
  const { data, error } = await supabase.rpc("get_user_feed", {
    p_user: userId,
    p_limit: limit,
  })

  if (error) throw error
  return data || []
}

// Post functions
export const createPost = async (postData: {
  user_id: string
  community_id?: string
  contenido: string
  media_url?: string[]
}) => {
  const { data, error } = await supabase.from("posts").insert([postData])

  if (error) throw error
  return data
}

export const getPostDetail = async (postId: string) => {
  const { data, error } = await supabase
    .from("posts")
    .select(`
      *,
      author:users(username, photo_url),
      comments(*)
    `)
    .eq("id", postId)
    .single()

  if (error) throw error
  return data
}

// Storage functions
export const uploadAvatar = async (userId: string, file: any) => {
  const fileExt = file.uri.split(".").pop()
  const fileName = `${userId}/avatar.${fileExt}`

  const { data, error } = await supabase.storage.from("post-media").upload(fileName, file)

  if (error) throw error
  return data
}

export const uploadPostMedia = async (userId: string, file: any) => {
  const fileExt = file.uri.split(".").pop()
  const fileName = `${userId}/${Date.now()}.${fileExt}`

  const { data, error } = await supabase.storage.from("post-media").upload(fileName, file)

  if (error) throw error
  return data
}

// Block user
export const blockUser = async (userId: string, blockedUserId: string) => {
  const { data, error } = await supabase
    .from("user_blocks")
    .insert([{ user_id: userId, blocked_user_id: blockedUserId }])

  if (error) throw error
  return data
}
