import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"
import Image from "next/image"
import { ArrowLeft, Shield, Eye, Database, Lock, UserCheck, Globe } from "lucide-react"

export default function PrivacidadPage() {
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
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Política de Privacidad</h1>
          <p className="text-lg text-gray-600">Última actualización: {new Date().toLocaleDateString("es-ES")}</p>
        </div>

        <div className="space-y-8">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Shield className="h-5 w-5 text-green-600" />
                Nuestro Compromiso con tu Privacidad
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-lg">
                En Investï, tu privacidad es fundamental. Esta política explica cómo recopilamos, usamos y protegemos tu
                información personal.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Database className="h-5 w-5 text-blue-600" />
                Información que Recopilamos
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h4 className="font-semibold mb-2">Información Personal:</h4>
                <ul className="list-disc pl-6 space-y-1">
                  <li>Nombre completo y edad</li>
                  <li>Dirección de correo electrónico</li>
                  <li>Número de teléfono (opcional)</li>
                  <li>Preferencias de inversión y metas financieras</li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold mb-2">Información de Uso:</h4>
                <ul className="list-disc pl-6 space-y-1">
                  <li>Actividad en la plataforma</li>
                  <li>Interacciones con comunidades</li>
                  <li>Conversaciones con Irï (nuestro asistente IA)</li>
                </ul>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Eye className="h-5 w-5 text-purple-600" />
                Cómo Usamos tu Información
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="list-disc pl-6 space-y-2">
                <li>Personalizar tu experiencia educativa</li>
                <li>Conectarte con comunidades relevantes</li>
                <li>Mejorar nuestros servicios y funcionalidades</li>
                <li>Enviarte actualizaciones importantes sobre la plataforma</li>
                <li>Proporcionar soporte técnico</li>
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Lock className="h-5 w-5 text-red-600" />
                Protección de Datos
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-4">
                <p className="font-semibold text-green-800">
                  🔒 Tus datos están protegidos con encriptación de nivel bancario
                </p>
              </div>
              <ul className="list-disc pl-6 space-y-2">
                <li>Encriptación SSL/TLS para todas las transmisiones</li>
                <li>Servidores seguros con acceso restringido</li>
                <li>Auditorías de seguridad regulares</li>
                <li>Cumplimiento con estándares internacionales de privacidad</li>
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <UserCheck className="h-5 w-5 text-indigo-600" />
                Tus Derechos
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="mb-4">Tienes derecho a:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Acceder a tu información personal</li>
                <li>Corregir datos inexactos</li>
                <li>Solicitar la eliminación de tu cuenta</li>
                <li>Exportar tus datos</li>
                <li>Retirar tu consentimiento en cualquier momento</li>
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Globe className="h-5 w-5 text-cyan-600" />
                Compartir Información
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-4">
                <p className="font-semibold text-blue-800">✋ NUNCA vendemos tu información personal a terceros</p>
              </div>
              <p>Solo compartimos información cuando es necesario para:</p>
              <ul className="list-disc pl-6 space-y-1 mt-2">
                <li>Cumplir con obligaciones legales</li>
                <li>Proteger la seguridad de la plataforma</li>
                <li>Proporcionar servicios técnicos esenciales</li>
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Contacto sobre Privacidad</CardTitle>
            </CardHeader>
            <CardContent>
              <p>
                Si tienes preguntas sobre esta política de privacidad o quieres ejercer tus derechos, contáctanos a
                través de nuestro{" "}
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
