import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"
import Image from "next/image"
import { ArrowLeft, MessageCircle, Book, Users, Zap, HelpCircle, Search } from "lucide-react"

export default function AyudaPage() {
  const faqItems = [
    {
      question: "¿Qué es Investï?",
      answer:
        "Investï es la primera red social de educación financiera potenciada con IA. Conectamos a inversionistas para aprender, compartir y crecer juntos.",
    },
    {
      question: "¿Cómo funciona la IA Irï?",
      answer:
        "Irï personaliza tu experiencia analizando tus intereses y metas financieras para recomendarte contenido, comunidades y conexiones relevantes.",
    },
    {
      question: "¿Es gratis durante la beta?",
      answer:
        "Sí, durante la fase beta Investï es completamente gratuito para los primeros 1,000 usuarios registrados.",
    },
    {
      question: "¿Puedo invertir dinero real en la plataforma?",
      answer: "Actualmente estamos en fase beta con simuladores. La integración con brokers reales llegará en Q3 2024.",
    },
  ]

  const helpCategories = [
    {
      icon: Users,
      title: "Comunidades",
      description: "Aprende cómo unirte y participar en comunidades",
      color: "bg-blue-500",
    },
    {
      icon: Zap,
      title: "IA Mentor",
      description: "Guías sobre cómo usar Irï efectivamente",
      color: "bg-purple-500",
    },
    {
      icon: Book,
      title: "Educación",
      description: "Recursos de aprendizaje y cursos disponibles",
      color: "bg-green-500",
    },
  ]

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

      <main className="max-w-7xl mx-auto px-4 py-12">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Centro de Ayuda</h1>
          <p className="text-xl text-gray-600 mb-8">Encuentra respuestas a tus preguntas sobre Investï</p>

          <div className="max-w-md mx-auto relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
            <input
              type="text"
              placeholder="Buscar en la ayuda..."
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
        </div>

        {/* Help Categories */}
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          {helpCategories.map((category, index) => (
            <Card key={index} className="hover:shadow-lg transition-shadow cursor-pointer">
              <CardHeader>
                <div className={`w-12 h-12 ${category.color} rounded-lg flex items-center justify-center mb-4`}>
                  <category.icon className="h-6 w-6 text-white" />
                </div>
                <CardTitle>{category.title}</CardTitle>
                <CardDescription>{category.description}</CardDescription>
              </CardHeader>
            </Card>
          ))}
        </div>

        {/* FAQ Section */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-center mb-12">Preguntas Frecuentes</h2>
          <div className="grid gap-6 max-w-4xl mx-auto">
            {faqItems.map((item, index) => (
              <Card key={index}>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <HelpCircle className="h-5 w-5 text-blue-600" />
                    {item.question}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">{item.answer}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Contact Support */}
        <Card className="max-w-2xl mx-auto text-center">
          <CardHeader>
            <CardTitle>¿No encuentras lo que buscas?</CardTitle>
            <CardDescription>Nuestro equipo está aquí para ayudarte</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/contacto">
                <Button className="bg-blue-600 hover:bg-blue-700">
                  <MessageCircle className="h-4 w-4 mr-2" />
                  Contactar Soporte
                </Button>
              </Link>
              <Link href="/">
                <Button variant="outline">Hablar con Irï</Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  )
}
