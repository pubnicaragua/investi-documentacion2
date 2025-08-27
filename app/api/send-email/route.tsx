import { type NextRequest, NextResponse } from "next/server"
import sgMail from "@sendgrid/mail"
import { createClient } from "@supabase/supabase-js"

// Initialize SendGrid
sgMail.setApiKey(process.env.SENDGRID_API_KEY!)

// Initialize Supabase
const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!)

export async function POST(request: NextRequest) {
  try {
    console.log("[v0] API route called")

    const body = await request.json()
    console.log("[v0] Request body:", body)

    const { name, email, phone, age, goals, interests, timestamp } = body

    // Validate required fields
    if (!name || !email) {
      console.log("[v0] Missing required fields")
      return NextResponse.json({ error: "Nombre y email son requeridos" }, { status: 400 })
    }

    console.log("[v0] Saving to Supabase...")
    const { data: supabaseData, error: supabaseError } = await supabase
      .from("formularios_landing")
      .insert([
        {
          nombre: name,
          email: email,
          telefono: phone || null,
          edad: age || null,
          objetivos: goals || [],
          intereses: interests || [],
          fecha_registro: timestamp || new Date().toISOString(),
        },
      ])
      .select()

    if (supabaseError) {
      console.log("[v0] Supabase error:", supabaseError)
      return NextResponse.json(
        { error: "Error al guardar en base de datos: " + supabaseError.message },
        { status: 500 },
      )
    }

    console.log("[v0] Saved to Supabase successfully:", supabaseData)

    console.log("[v0] Sending email...")
    const msg = {
      to: "contacto@investiiapp.com",
      from: "contacto@investiiapp.com", // Must be verified sender
      subject: `Nuevo registro Beta - ${name}`,
      html: `
        <h2>Nuevo registro para Beta de Investï</h2>
        <p><strong>Nombre:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Teléfono:</strong> ${phone || "No proporcionado"}</p>
        <p><strong>Edad:</strong> ${age || "No proporcionada"}</p>
        <p><strong>Objetivos:</strong> ${goals?.join(", ") || "Ninguno seleccionado"}</p>
        <p><strong>Intereses:</strong> ${interests?.join(", ") || "Ninguno seleccionado"}</p>
        <p><strong>Fecha:</strong> ${new Date(timestamp || Date.now()).toLocaleString("es-ES")}</p>
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
    return NextResponse.json({ error: "Error interno del servidor: " + error.message }, { status: 500 })
  }
}
