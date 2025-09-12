"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

interface Formulario {
  id: number
  name: string
  email: string
  phone?: string
  age?: string
  goals?: string[]
  interests?: string[]
  timestamp: string
  created_at: string
  updated_at: string
}

interface Estadisticas {
  total: number
  hoy: number
  esta_semana: number
  este_mes: number
  objetivos: Record<string, number>
  intereses: Record<string, number>
  edades: Record<string, number>
  conversion_rate: number
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
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">Panel de Formularios</h1>
              <p className="text-gray-600 mt-2 text-lg">Gestiona los registros de la landing page de Investï</p>
            </div>
            <div className="text-right">
              <Badge className="bg-gradient-to-r from-green-500 to-blue-500 text-white px-4 py-2">
                🚀 Beta Activo
              </Badge>
            </div>
          </div>
        </div>

        {/* Estadísticas */}
        {estadisticas && (
          <>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
              <Card className="bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200">
                <CardHeader className="pb-2">
                  <CardTitle className="text-3xl font-bold text-blue-700">{estadisticas.total}</CardTitle>
                  <CardDescription className="text-blue-600 font-medium">Total de registros</CardDescription>
                </CardHeader>
              </Card>

              <Card className="bg-gradient-to-br from-green-50 to-green-100 border-green-200">
                <CardHeader className="pb-2">
                  <CardTitle className="text-3xl font-bold text-green-700">{estadisticas.hoy}</CardTitle>
                  <CardDescription className="text-green-600 font-medium">Registros hoy</CardDescription>
                </CardHeader>
              </Card>

              <Card className="bg-gradient-to-br from-purple-50 to-purple-100 border-purple-200">
                <CardHeader className="pb-2">
                  <CardTitle className="text-3xl font-bold text-purple-700">{estadisticas.esta_semana}</CardTitle>
                  <CardDescription className="text-purple-600 font-medium">Esta semana</CardDescription>
                </CardHeader>
              </Card>

              <Card className="bg-gradient-to-br from-orange-50 to-orange-100 border-orange-200">
                <CardHeader className="pb-2">
                  <CardTitle className="text-3xl font-bold text-orange-700">{estadisticas.este_mes}</CardTitle>
                  <CardDescription className="text-orange-600 font-medium">Este mes</CardDescription>
                </CardHeader>
              </Card>
            </div>

            {/* Analytics Cards */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg font-semibold text-gray-800">Objetivos Más Populares</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {Object.entries(estadisticas.objetivos)
                      .sort(([,a], [,b]) => b - a)
                      .slice(0, 5)
                      .map(([objetivo, count]) => (
                        <div key={objetivo} className="flex justify-between items-center">
                          <span className="text-sm text-gray-600 truncate">{objetivo}</span>
                          <Badge variant="secondary" className="ml-2">{count}</Badge>
                        </div>
                      ))}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg font-semibold text-gray-800">Intereses de Inversión</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {Object.entries(estadisticas.intereses)
                      .sort(([,a], [,b]) => b - a)
                      .slice(0, 5)
                      .map(([interes, count]) => (
                        <div key={interes} className="flex justify-between items-center">
                          <span className="text-sm text-gray-600 truncate">{interes}</span>
                          <Badge variant="outline" className="ml-2">{count}</Badge>
                        </div>
                      ))}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg font-semibold text-gray-800">Distribución por Edad</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {Object.entries(estadisticas.edades)
                      .sort(([,a], [,b]) => b - a)
                      .map(([edad, count]) => (
                        <div key={edad} className="flex justify-between items-center">
                          <span className="text-sm text-gray-600">{edad} años</span>
                          <Badge variant="default" className="ml-2">{count}</Badge>
                        </div>
                      ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </>
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
                <div key={formulario.id} className="border rounded-xl p-6 hover:bg-gray-50 transition-all duration-200 hover:shadow-md">
                  <div className="flex justify-between items-start mb-4">
                    <div className="flex-1">
                      <h3 className="font-bold text-xl text-gray-900">{formulario.name}</h3>
                      <p className="text-blue-600 font-medium">{formulario.email}</p>
                      {formulario.phone && (
                        <p className="text-gray-500 text-sm mt-1">📱 {formulario.phone}</p>
                      )}
                    </div>
                    <div className="text-right">
                      <Badge variant="outline" className="mb-2">{formatearFecha(formulario.created_at)}</Badge>
                      {formulario.age && (
                        <p className="text-sm text-gray-500">{formulario.age} años</p>
                      )}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-4">
                    <div className="bg-blue-50 p-4 rounded-lg">
                      <span className="text-sm font-semibold text-blue-700 mb-2 block">🎯 Objetivos Financieros:</span>
                      <div className="flex flex-wrap gap-2">
                        {formulario.goals && formulario.goals.length > 0 ? (
                          formulario.goals.map((goal, index) => (
                            <Badge key={index} variant="secondary" className="bg-blue-100 text-blue-800">
                              {goal}
                            </Badge>
                          ))
                        ) : (
                          <span className="text-sm text-gray-500 italic">No especificado</span>
                        )}
                      </div>
                    </div>
                    
                    <div className="bg-green-50 p-4 rounded-lg">
                      <span className="text-sm font-semibold text-green-700 mb-2 block">💡 Intereses de Inversión:</span>
                      <div className="flex flex-wrap gap-2">
                        {formulario.interests && formulario.interests.length > 0 ? (
                          formulario.interests.map((interest, index) => (
                            <Badge key={index} variant="outline" className="border-green-300 text-green-700">
                              {interest}
                            </Badge>
                          ))
                        ) : (
                          <span className="text-sm text-gray-500 italic">No especificado</span>
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="mt-4 pt-4 border-t border-gray-200">
                    <div className="flex justify-between items-center text-xs text-gray-500">
                      <span>ID: {formulario.id}</span>
                      <span>Actualizado: {formatearFecha(formulario.updated_at)}</span>
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
