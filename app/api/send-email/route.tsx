import { type NextRequest, NextResponse } from "next/server"

const SENDGRID_API_KEY = "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"
const SENDGRID_API_URL = "https://api.sendgrid.com/v3/mail/send"

export async function POST(request: NextRequest) {
  try {
    const formData = await request.json()

    const emailData = {
      personalizations: [
        {
          to: [
            {
              email: "contacto@investiiapp.com",
              name: "Equipo Investi",
            },
          ],
          subject: `Nueva solicitud de registro - ${formData.name}`,
        },
      ],
      from: {
        email: "noreply@investiapp.com",
        name: "Investi Landing Page",
      },
      content: [
        {
          type: "text/html",
          value: `
            <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
              <h2 style="color: #2563eb;">Nueva Solicitud de Registro - Investi</h2>
              
              <div style="background-color: #f8fafc; padding: 20px; border-radius: 8px; margin: 20px 0;">
                <h3 style="color: #1e293b; margin-top: 0;">Información Personal</h3>
                <p><strong>Nombre:</strong> ${formData.name}</p>
                <p><strong>Email:</strong> ${formData.email}</p>
                <p><strong>Teléfono:</strong> ${formData.phone}</p>
                <p><strong>Edad:</strong> ${formData.age}</p>
              </div>

              <div style="background-color: #f0f9ff; padding: 20px; border-radius: 8px; margin: 20px 0;">
                <h3 style="color: #1e293b; margin-top: 0;">Objetivos de Educación Financiera</h3>
                <ul>
                  ${formData.goals.map((goal: string) => `<li>${goal}</li>`).join("")}
                </ul>
              </div>

              <div style="background-color: #f0fdf4; padding: 20px; border-radius: 8px; margin: 20px 0;">
                <h3 style="color: #1e293b; margin-top: 0;">Intereses</h3>
                <ul>
                  ${formData.interests.map((interest: string) => `<li>${interest}</li>`).join("")}
                </ul>
              </div>

              <div style="background-color: #fafafa; padding: 15px; border-radius: 8px; margin: 20px 0;">
                <p style="margin: 0; color: #64748b;"><strong>Fecha de registro:</strong> ${new Date(formData.timestamp).toLocaleString("es-ES")}</p>
              </div>
            </div>
          `,
        },
      ],
    }

    const response = await fetch(SENDGRID_API_URL, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${SENDGRID_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(emailData),
    })

    if (response.ok) {
      return NextResponse.json({ success: true })
    } else {
      const errorData = await response.text()
      console.error("SendGrid error:", errorData)
      return NextResponse.json({ error: "Failed to send email" }, { status: 500 })
    }
  } catch (error) {
    console.error("Error sending email:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
