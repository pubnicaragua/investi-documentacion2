import { type NextRequest, NextResponse } from "next/server"
import sgMail from "@sendgrid/mail"
import { createClient } from "@supabase/supabase-js"

// Configurar SendGrid
if (process.env.SENDGRID_API_KEY) {
  sgMail.setApiKey(process.env.SENDGRID_API_KEY)
}

// Configurar Supabase
const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!)

export async function POST(request: NextRequest) {
  try {
    console.log("[v0] API route called")

    // Validar variables de entorno
    if (!process.env.SENDGRID_API_KEY) {
      console.error("[v0] SENDGRID_API_KEY not configured")
      return NextResponse.json({ error: "SendGrid no configurado" }, { status: 500 })
    }

    if (!process.env.NEXT_PUBLIC_SUPABASE_URL || !process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY) {
      console.error("[v0] Supabase not configured")
      return NextResponse.json({ error: "Supabase no configurado" }, { status: 500 })
    }

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
          goals: Array.isArray(goals) ? goals : [],
          interests: Array.isArray(interests) ? interests : [],
          timestamp: timestamp || new Date().toISOString(),
        },
      ])
      .select()

    if (supabaseError) {
      console.error("[v0] Supabase error:", supabaseError)
      return NextResponse.json(
        { error: "Error al guardar en base de datos: " + supabaseError.message },
        { status: 500 },
      )
    }

    console.log("[v0] Saved to Supabase successfully:", supabaseData)

    // Enviar email con SendGrid
    console.log("[v0] Sending email...")
    const msg = {
      to: "contacto@investiiapp.com",
      from: "contacto@investiiapp.com",
      subject: `Nuevo registro en Investï - ${name}`,
      html: `
        <h2>Nuevo registro en la landing de Investï</h2>
        <p><strong>Nombre:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Teléfono:</strong> ${phone || "No proporcionado"}</p>
        <p><strong>Edad:</strong> ${age}</p>
        <p><strong>Objetivos financieros:</strong> ${Array.isArray(goals) ? goals.join(", ") : "Ninguno"}</p>
        <p><strong>Intereses:</strong> ${Array.isArray(interests) ? interests.join(", ") : "Ninguno"}</p>
        <p><strong>Fecha:</strong> ${new Date(timestamp || new Date()).toLocaleString()}</p>
      `,
    }

    await sgMail.send(msg)
    console.log("[v0] Email sent successfully")

    return NextResponse.json({
      success: true,
      message: "Formulario enviado exitosamente",
      data: supabaseData,
    })
  } catch (error: any) {
    console.error("[v0] API Error:", error)
    return NextResponse.json(
      {
        error: "Error interno del servidor",
        details: error.message,
      },
      { status: 500 },
    )
  }
}
