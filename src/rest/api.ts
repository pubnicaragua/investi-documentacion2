import {
    request,
    authSignIn as clientSignIn,
    authSignUp as clientSignUp,
    authSignOut as clientSignOut,
    getCurrentUserId,
    urls,
  } from "./client"
  
  // Auth
  export const authSignIn = clientSignIn
  export const authSignUp = clientSignUp
  export const authSignOut = clientSignOut
  
  // Users
  export async function getMe(uid: string) {
    try {
      const response = await request("GET", "/users", {
        params: { select: "*", id: `eq.${uid}` },
      })
      return response?.[0] || null
    } catch (error: any) {
      if (error.code === "42P01") return null // Table doesn't exist
      throw error
    }
  }
  
  export async function updateUser(uid: string, data: any) {
    try {
      return await request("PATCH", "/users", {
        params: { id: `eq.${uid}` },
        body: data,
        headers: { Prefer: "return=representation" },
      })
    } catch (error: any) {
      if (error.code === "42P01") return null
      throw error
    }
  }
  
  // Communities
  export async function listCommunities() {
    try {
      const response = await request("GET", "/communities", {
        params: { select: "*", order: "created_at.desc" },
      })
      return response || []
    } catch (error: any) {
      if (error.code === "42P01") return []
      throw error
    }
  }
  
  export async function joinCommunity(uid: string, community_id: string) {
    try {
      return await request("POST", "/user_communities", {
        body: { user_id: uid, community_id },
      })
    } catch (error: any) {
      if (error.code === "23505") return null // Already joined
      throw error
    }
  }
  
  // Feed / Posts
  export async function getUserFeed(uid: string, limit = 20) {
    try {
      return await request("POST", "/rpc/get_user_feed", {
        body: { p_user: uid, p_limit: limit },
      })
    } catch (error: any) {
      if (error.code === "PGRST202") return [] // RPC doesn't exist
      return []
    }
  }
  
  export async function createPost(data: {
    user_id: string
    community_id?: string
    contenido: string
    media_url?: string[]
  }) {
    return await request("POST", "/posts", { body: data })
  }
  
  export async function getPostDetail(postId: string) {
    try {
      const response = await request("GET", "/posts", {
        params: {
          id: `eq.${postId}`,
          select: "id,contenido,created_at,likes_count,comment_count,author:users(username,photo_url),comments(*)",
        },
      })
      return response?.[0] || null
    } catch (error) {
      return null
    }
  }
  
  export async function likePost(post_id: string, user_id: string, is_like = true) {
    try {
      return await request("POST", "/post_likes", {
        body: { post_id, user_id, is_like },
      })
    } catch (error: any) {
      if (error.code === "23505") return null // Already liked
      return null
    }
  }
  
  export async function commentPost(post_id: string, user_id: string, contenido: string, parent_id?: string) {
    return await request("POST", "/comments", {
      body: { post_id, user_id, contenido, parent_id: parent_id || null },
    })
  }
  
  // Storage
  export async function uploadAvatar(uid: string, blob: Blob) {
    const response = await fetch(`${urls.STORAGE_URL}/object/post-media/${uid}/avatar.jpg`, {
      method: "POST",
      headers: {
        "Content-Type": "image/jpeg",
      },
      body: blob,
    })
  
    if (!response.ok) {
      throw new Error("Upload failed")
    }
  
    return await response.json()
  }
  
  // Courses
  export async function getCoursesWithLessons() {
    try {
      return await request("GET", "/courses", {
        params: {
          select: "id,titulo,descripcion,course_modules(id,titulo,orden,lessons(id,titulo,orden))",
        },
      })
    } catch (error: any) {
      if (error.code === "42P01") return []
      return []
    }
  }
  
  export async function completeLesson(user_id: string, lesson_id: string) {
    return await request("POST", "/lesson_progress", {
      body: { user_id, lesson_id },
    })
  }
  
  // Portfolio
  export async function getPortfolio(uid: string) {
    try {
      const response = await request("GET", "/simulated_portfolios", {
        params: {
          user_id: `eq.${uid}`,
          select: "*,simulated_investments(*)",
        },
      })
      return response?.[0] || null
    } catch (error: any) {
      if (error.code === "42P01") return null
      return null
    }
  }
  
  export async function addInvestment(payload: any) {
    return await request("POST", "/simulated_investments", { body: payload })
  }
  
  // Block
  export async function blockUser(user_id: string, blocked_user_id: string) {
    return await request("POST", "/user_blocks", {
      body: { user_id, blocked_user_id },
    })
  }
  
  // Get current user helper
  export async function getCurrentUser() {
    const uid = await getCurrentUserId()
    if (!uid) return null
    return await getMe(uid)
  }
