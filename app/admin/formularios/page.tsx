"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

interface Formulario {
  id: number
  nombre: string
  email: string
  telefono?: string
  objetivo_financiero?: string
  created_at: string
}

interface Estadisticas {
  total: number
  hoy: number
  esta_semana: number
  objetivos: Record<string, number>
}

export default function FormulariosAdmin() {
  const [formularios, setFormularios] = useState<Formulario[]>([])
  const [estadisticas, setEstadisticas] = useState<Estadisticas | null>(null)
  const [loading, setLoading] = useState(true)
  const [pagina, setPagina] = useState(1)
  const [totalPaginas, setTotalPaginas] = useState(1)

  const cargarFormularios = async (paginaActual = 1) => {
    try {
      setLoading(true)
      const offset = (paginaActual - 1) * 20
      const response = await fetch(`/api/formularios?limit=20&offset=${offset}`)
      const data = await response.json()

      if (response.ok) {
        setFormularios(data.formularios)
        setEstadisticas(data.estadisticas)
        setTotalPaginas(data.paginacion.total_paginas)
        setPagina(paginaActual)
      } else {
        console.error("Error:", data.error)
      }
    } catch (error) {
      console.error("Error al cargar formularios:", error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    cargarFormularios()
  }, [])

  const formatearFecha = (fecha: string) => {
    return new Date(fecha).toLocaleString("es-ES", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    })
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Cargando formularios...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Panel de Formularios</h1>
          <p className="text-gray-600 mt-2">Gestiona los registros de la landing page de Investi</p>
        </div>

        {/* Estadísticas */}
        {estadisticas && (
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-2xl font-bold text-blue-600">{estadisticas.total}</CardTitle>
                <CardDescription>Total de registros</CardDescription>
              </CardHeader>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-2xl font-bold text-green-600">{estadisticas.hoy}</CardTitle>
                <CardDescription>Registros hoy</CardDescription>
              </CardHeader>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-2xl font-bold text-purple-600">{estadisticas.esta_semana}</CardTitle>
                <CardDescription>Esta semana</CardDescription>
              </CardHeader>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-2xl font-bold text-orange-600">
                  {Object.keys(estadisticas.objetivos).length}
                </CardTitle>
                <CardDescription>Objetivos únicos</CardDescription>
              </CardHeader>
            </Card>
          </div>
        )}

        {/* Lista de formularios */}
        <Card>
          <CardHeader>
            <CardTitle>Formularios Recibidos</CardTitle>
            <CardDescription>Lista de todos los formularios enviados desde la landing page</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {formularios.map((formulario) => (
                <div key={formulario.id} className="border rounded-lg p-4 hover:bg-gray-50 transition-colors">
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <h3 className="font-semibold text-lg">{formulario.nombre}</h3>
                      <p className="text-gray-600">{formulario.email}</p>
                    </div>
                    <Badge variant="outline">{formatearFecha(formulario.created_at)}</Badge>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-3">
                    <div>
                      <span className="text-sm font-medium text-gray-500">Teléfono:</span>
                      <p className="text-sm">{formulario.telefono || "No proporcionado"}</p>
                    </div>
                    <div>
                      <span className="text-sm font-medium text-gray-500">Objetivo:</span>
                      <p className="text-sm">{formulario.objetivo_financiero || "No especificado"}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Paginación */}
            {totalPaginas > 1 && (
              <div className="flex justify-center items-center space-x-2 mt-6">
                <Button variant="outline" onClick={() => cargarFormularios(pagina - 1)} disabled={pagina <= 1}>
                  Anterior
                </Button>

                <span className="text-sm text-gray-600">
                  Página {pagina} de {totalPaginas}
                </span>

                <Button
                  variant="outline"
                  onClick={() => cargarFormularios(pagina + 1)}
                  disabled={pagina >= totalPaginas}
                >
                  Siguiente
                </Button>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
