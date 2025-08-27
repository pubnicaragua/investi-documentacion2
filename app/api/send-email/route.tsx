import { type NextRequest, NextResponse } from "next/server"
import sgMail from "@sendgrid/mail"
import { supabase } from "@/lib/supabase"

sgMail.setApiKey(process.env.SENDGRID_API_KEY!)

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { nombre, email, telefono, objetivoFinanciero } = body

    // Validar datos requeridos
    if (!nombre || !email) {
      return NextResponse.json({ error: "Nombre y email son requeridos" }, { status: 400 })
    }

    const { data: supabaseData, error: supabaseError } = await supabase
      .from("formularios_landing")
      .insert([
        {
          nombre,
          email,
          telefono: telefono || null,
          objetivo_financiero: objetivoFinanciero || null,
        },
      ])
      .select()

    if (supabaseError) {
      console.error("Error al guardar en Supabase:", supabaseError)
      return NextResponse.json({ error: "Error al guardar los datos" }, { status: 500 })
    }

    const msg = {
      to: "contacto@investiiapp.com",
      from: "contacto@investiiapp.com", // Debe ser un email verificado en SendGrid
      subject: `Nuevo registro desde Investi Landing - ${nombre}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #1e40af;">Nuevo registro desde Investi Landing</h2>
          
          <div style="background-color: #f8fafc; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h3 style="color: #334155; margin-top: 0;">Información del usuario:</h3>
            <p><strong>Nombre:</strong> ${nombre}</p>
            <p><strong>Email:</strong> ${email}</p>
            <p><strong>Teléfono:</strong> ${telefono || "No proporcionado"}</p>
            <p><strong>Objetivo Financiero:</strong> ${objetivoFinanciero || "No especificado"}</p>
          </div>
          
          <div style="background-color: #dbeafe; padding: 15px; border-radius: 8px; margin: 20px 0;">
            <p style="margin: 0; color: #1e40af;">
              <strong>Fecha de registro:</strong> ${new Date().toLocaleString("es-ES")}
            </p>
          </div>
          
          <hr style="border: none; border-top: 1px solid #e2e8f0; margin: 30px 0;">
          
          <p style="color: #64748b; font-size: 14px;">
            Este email fue generado automáticamente desde la landing page de Investi.
          </p>
        </div>
      `,
    }

    await sgMail.send(msg)

    return NextResponse.json({
      success: true,
      message: "Formulario enviado y guardado exitosamente",
      data: supabaseData,
    })
  } catch (error: any) {
    console.error("Error completo:", error)
    return NextResponse.json({ error: "Error interno del servidor", details: error.message }, { status: 500 })
  }
}
