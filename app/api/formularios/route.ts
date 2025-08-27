import { type NextRequest, NextResponse } from "next/server"
import { supabase } from "@/lib/supabase"

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const limit = searchParams.get("limit") || "50"
    const offset = searchParams.get("offset") || "0"

    // Obtener formularios con paginación
    const {
      data: formularios,
      error,
      count,
    } = await supabase
      .from("formularios_landing")
      .select("*", { count: "exact" })
      .order("created_at", { ascending: false })
      .range(Number.parseInt(offset), Number.parseInt(offset) + Number.parseInt(limit) - 1)

    if (error) {
      console.error("Error al obtener formularios:", error)
      return NextResponse.json({ error: "Error al obtener los formularios" }, { status: 500 })
    }

    // Obtener estadísticas adicionales
    const { data: stats } = await supabase.from("formularios_landing").select("objetivo_financiero, created_at")

    const estadisticas = {
      total: count || 0,
      hoy:
        stats?.filter((item) => {
          const today = new Date().toDateString()
          const itemDate = new Date(item.created_at).toDateString()
          return today === itemDate
        }).length || 0,
      esta_semana:
        stats?.filter((item) => {
          const weekAgo = new Date()
          weekAgo.setDate(weekAgo.getDate() - 7)
          return new Date(item.created_at) >= weekAgo
        }).length || 0,
      objetivos:
        stats?.reduce((acc: any, item) => {
          const objetivo = item.objetivo_financiero || "No especificado"
          acc[objetivo] = (acc[objetivo] || 0) + 1
          return acc
        }, {}) || {},
    }

    return NextResponse.json({
      formularios,
      estadisticas,
      paginacion: {
        total: count || 0,
        offset: Number.parseInt(offset),
        limit: Number.parseInt(limit),
        pagina_actual: Math.floor(Number.parseInt(offset) / Number.parseInt(limit)) + 1,
        total_paginas: Math.ceil((count || 0) / Number.parseInt(limit)),
      },
    })
  } catch (error: any) {
    console.error("Error completo:", error)
    return NextResponse.json({ error: "Error interno del servidor", details: error.message }, { status: 500 })
  }
}
