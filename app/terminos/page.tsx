import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"
import Image from "next/image"
import { ArrowLeft, FileText, Shield, Users, AlertTriangle } from "lucide-react"

export default function TerminosPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center gap-4">
            <Link href="/">
              <Button variant="ghost" size="sm">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Volver
              </Button>
            </Link>
            <Image
              src="https://socialmediamkt.softwarenicaragua.com/wp-content/uploads/2025/08/Group-6-1.png"
              alt="Investï"
              width={120}
              height={32}
              className="h-8 w-auto"
            />
            <Badge className="bg-blue-100 text-blue-700">Beta</Badge>
          </div>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Términos y Condiciones</h1>
          <p className="text-lg text-gray-600">Última actualización: {new Date().toLocaleDateString("es-ES")}</p>
        </div>

        <div className="space-y-8">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileText className="h-5 w-5 text-blue-600" />
                1. Aceptación de Términos
              </CardTitle>
            </CardHeader>
            <CardContent className="prose max-w-none">
              <p>
                Al acceder y usar Investï, aceptas estar sujeto a estos términos y condiciones. Si no estás de acuerdo
                con alguna parte de estos términos, no debes usar nuestro servicio.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Users className="h-5 w-5 text-blue-600" />
                2. Programa Beta
              </CardTitle>
            </CardHeader>
            <CardContent className="prose max-w-none">
              <p>Investï está actualmente en fase beta. Esto significa que:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li>El servicio puede contener errores o funcionalidades incompletas</li>
                <li>Podemos realizar cambios sin previo aviso</li>
                <li>Tu feedback es valioso para mejorar la plataforma</li>
                <li>El acceso beta es gratuito para los primeros 1,000 usuarios</li>
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Shield className="h-5 w-5 text-blue-600" />
                3. Uso de la Plataforma
              </CardTitle>
            </CardHeader>
            <CardContent className="prose max-w-none">
              <p>Te comprometes a:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Proporcionar información veraz y actualizada</li>
                <li>No usar la plataforma para actividades ilegales</li>
                <li>Respetar a otros usuarios y mantener un ambiente positivo</li>
                <li>No compartir contenido ofensivo o inapropiado</li>
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <AlertTriangle className="h-5 w-5 text-orange-600" />
                4. Descargo de Responsabilidad Financiera
              </CardTitle>
            </CardHeader>
            <CardContent className="prose max-w-none">
              <div className="bg-orange-50 border border-orange-200 rounded-lg p-4 mb-4">
                <p className="font-semibold text-orange-800">
                  IMPORTANTE: Investï es una plataforma educativa, no un asesor financiero.
                </p>
              </div>
              <ul className="list-disc pl-6 space-y-2">
                <li>No proporcionamos consejos de inversión personalizados</li>
                <li>Todo el contenido es solo para fines educativos</li>
                <li>Las decisiones de inversión son tu responsabilidad</li>
                <li>Consulta con profesionales antes de tomar decisiones financieras importantes</li>
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>5. Modificaciones</CardTitle>
            </CardHeader>
            <CardContent>
              <p>
                Nos reservamos el derecho de modificar estos términos en cualquier momento. Los cambios serán
                notificados a través de la plataforma y entrarán en vigor inmediatamente después de su publicación.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>6. Contacto</CardTitle>
            </CardHeader>
            <CardContent>
              <p>
                Si tienes preguntas sobre estos términos, puedes contactarnos a través de nuestro{" "}
                <Link href="/contacto" className="text-blue-600 hover:underline">
                  formulario de contacto
                </Link>
                .
              </p>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  )
}
