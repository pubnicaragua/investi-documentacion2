import { type NextRequest, NextResponse } from "next/server"
import sgMail from "@sendgrid/mail"
import { createClient } from "@supabase/supabase-js"

// Configurar SendGrid
sgMail.setApiKey(process.env.SENDGRID_API_KEY!)

// Configurar Supabase
const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!)

export async function POST(request: NextRequest) {
  try {
    console.log("[v0] API route called")

    const body = await request.json()
    console.log("[v0] Request body:", body)

    const { name, email, phone, age, goals, interests, timestamp } = body

    console.log("[v0] Saving to Supabase...")
    const { data: supabaseData, error: supabaseError } = await supabase
      .from("formularios_landing")
      .insert([
        {
          name,
          email,
          phone: phone || null,
          age,
          goals,
          interests,
          timestamp,
        },
      ])
      .select()

    if (supabaseError) {
      console.log("[v0] Supabase error:", supabaseError.message)
      return NextResponse.json(
        { error: `Error al guardar en base de datos: ${supabaseError.message}` },
        { status: 500 },
      )
    }

    console.log("[v0] Saved to Supabase successfully:", supabaseData)

    console.log("[v0] Sending email...")
    const msg = {
      to: "contacto@investiiapp.com",
      from: "contacto@investiiapp.com",
      subject: "Nuevo registro desde la landing page de Investi",
      html: `
        <h2>Nuevo registro desde la landing page</h2>
        <p><strong>Nombre:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Teléfono:</strong> ${phone || "No proporcionado"}</p>
        <p><strong>Edad:</strong> ${age}</p>
        <p><strong>Objetivos:</strong> ${goals.join(", ")}</p>
        <p><strong>Intereses:</strong> ${interests.join(", ")}</p>
        <p><strong>Fecha:</strong> ${new Date(timestamp).toLocaleString("es-ES")}</p>
      `,
    }

    await sgMail.send(msg)
    console.log("[v0] Email sent successfully")

    return NextResponse.json({
      success: true,
      message: "Formulario enviado correctamente",
      id: supabaseData[0]?.id,
    })
  } catch (error) {
    console.log("[v0] General error:", error)
    return NextResponse.json({ error: "Error interno del servidor" }, { status: 500 })
  }
}
