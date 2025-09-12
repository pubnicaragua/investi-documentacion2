import { type NextRequest, NextResponse } from "next/server"
import sgMail from "@sendgrid/mail"
import { createClient } from "@supabase/supabase-js"

const SENDGRID_API_KEY = process.env.SENDGRID_API_KEY
const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL
const SUPABASE_ANON_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

if (!SENDGRID_API_KEY) {
  console.error("[v0] SENDGRID_API_KEY no está configurada")
}

if (!SUPABASE_URL || !SUPABASE_ANON_KEY) {
  console.error("[v0] Variables de Supabase no están configuradas")
}

// Configurar SendGrid
if (SENDGRID_API_KEY) {
  sgMail.setApiKey(SENDGRID_API_KEY)
}

// Configurar Supabase
const supabase = createClient(SUPABASE_URL!, SUPABASE_ANON_KEY!)

export async function POST(request: NextRequest) {
  try {
    console.log("[v0] API route called")

    const body = await request.json()
    console.log("[v0] Request body:", body)

    const { name, email, phone, age, goals, interests, timestamp } = body

    // Validar campos requeridos
    if (!name || !email) {
      return NextResponse.json({ error: "Nombre y email son requeridos" }, { status: 400 })
    }

    // Guardar en Supabase
    console.log("[v0] Saving to Supabase...")
    const { data: supabaseData, error: supabaseError } = await supabase
      .from("formularios_landing")
      .insert([
        {
          name,
          email,
          phone: phone || null,
          age,
          goals: Array.isArray(goals) ? goals : [goals],
          interests: Array.isArray(interests) ? interests : [interests],
          timestamp: timestamp || new Date().toISOString(),
        },
      ])
      .select()

    if (supabaseError) {
      console.error("[v0] Supabase Error:", supabaseError)
      return NextResponse.json(
        { error: "Error al guardar en base de datos", details: supabaseError.message },
        { status: 500 },
      )
    }

    console.log("[v0] Saved to Supabase successfully:", supabaseData)

    // Por ahora, solo guardar en Supabase sin enviar email
    console.log("[v0] Skipping email sending due to SendGrid configuration issues")
    
    return NextResponse.json(
      {
        success: true,
        message: "¡Registro exitoso! Nos pondremos en contacto contigo pronto.",
        data: supabaseData,
      },
      { status: 200 },
    )
  } catch (error: any) {
    console.error("[v0] API Error:", error)

    if (error.code === 401) {
      return NextResponse.json(
        {
          error: "Error de autenticación con SendGrid",
          details: "Verificar API key de SendGrid",
          suggestion: "La API key puede estar incorrecta o no tener permisos suficientes",
        },
        { status: 500 },
      )
    }

    if (error.code === 403) {
      return NextResponse.json(
        {
          error: "Error de permisos con SendGrid",
          details: "El dominio remitente no está verificado",
          suggestion: "Verificar el dominio en SendGrid o usar un email verificado",
        },
        { status: 500 },
      )
    }

    return NextResponse.json(
      {
        error: "Error interno del servidor",
        details: error.message,
        code: error.code || "unknown",
      },
      { status: 500 },
    )
  }
}
