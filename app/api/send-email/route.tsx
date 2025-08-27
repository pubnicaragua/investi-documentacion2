import { type NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest) {
  try {
    const { name, email, phone, interests } = await request.json()

    // Verificar que la API key esté configurada
    const apiKey = process.env.SENDGRID_API_KEY
    if (!apiKey) {
      console.error("[v0] SENDGRID_API_KEY no está configurada")
      return NextResponse.json({ error: "Configuración de email no disponible" }, { status: 500 })
    }

    // Preparar el contenido del email
    const emailContent = `
      <h2>Nuevo registro en Investi</h2>
      <p><strong>Nombre:</strong> ${name}</p>
      <p><strong>Email:</strong> ${email}</p>
      <p><strong>Teléfono:</strong> ${phone}</p>
      <p><strong>Intereses:</strong> ${interests.join(", ")}</p>
      <p><strong>Fecha:</strong> ${new Date().toLocaleString("es-ES")}</p>
    `

    // Enviar email usando fetch (sin dependencias externas)
    const response = await fetch("https://api.sendgrid.com/v3/mail/send", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        personalizations: [
          {
            to: [{ email: "contacto@investiiapp.com" }],
            subject: `Nuevo registro: ${name}`,
          },
        ],
        from: { email: "noreply@investiiapp.com", name: "Investi" },
        content: [
          {
            type: "text/html",
            value: emailContent,
          },
        ],
      }),
    })

    if (!response.ok) {
      const errorData = await response.text()
      console.error("[v0] Error de SendGrid:", response.status, errorData)
      return NextResponse.json({ error: "Error al enviar el email" }, { status: 500 })
    }

    console.log("[v0] Email enviado exitosamente")
    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("[v0] Error en API route:", error)
    return NextResponse.json({ error: "Error interno del servidor" }, { status: 500 })
  }
}
