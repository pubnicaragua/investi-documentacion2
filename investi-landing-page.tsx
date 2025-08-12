"use client"

import type React from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import Image from "next/image"
import Link from "next/link"
import {
  Users,
  GraduationCap,
  Share2,
  MessageCircle,
  Star,
  CheckCircle,
  Play,
  Rocket,
  BarChart3,
  Send,
  X,
  Handshake,
  Instagram,
  Lock,
  Globe,
  Award,
} from "lucide-react"
import { useState, useEffect, useRef } from "react"

interface ChatMessage {
  id: number
  text: string
  isBot: boolean
  timestamp: Date
  typing?: boolean
}

interface QuickAction {
  text: string
  action: () => void
}

const scrollToSection = (sectionId: string) => {
  const element = document.getElementById(sectionId)
  if (element) {
    element.scrollIntoView({
      behavior: "smooth",
      block: "start",
    })
  }
}

export default function InvestiLandingPage() {
  const [email, setEmail] = useState("")
  const [name, setName] = useState("")
  const [phone, setPhone] = useState("")
  const [age, setAge] = useState("")
  const [selectedGoals, setSelectedGoals] = useState<string[]>([])
  const [selectedInterests, setSelectedInterests] = useState<string[]>([])
  const [message, setMessage] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)

  // Chat state
  const [isChatOpen, setIsChatOpen] = useState(false)
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([
    {
      id: 1,
      text: "¡Hola! 👋 Soy Irï, tu asistente personal de Investï. Estoy aquí para ayudarte a descubrir cómo nuestra plataforma puede transformar tu futuro financiero. ¿En qué puedo ayudarte hoy?",
      isBot: true,
      timestamp: new Date(),
    },
  ])
  const [chatInput, setChatInput] = useState("")
  const [isTyping, setIsTyping] = useState(false)
  const [showQuickActions, setShowQuickActions] = useState(true)
  const chatEndRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = () => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [chatMessages])

  const handleQuickAction = (text: string) => {
    setChatInput(text)
    setShowQuickActions(false)
    // Simulate sending the message
    setTimeout(() => {
      handleChatSubmit(new Event("submit") as any, text)
    }, 100)
  }

  const quickActions: QuickAction[] = [
    {
      text: "¿Qué es Investï?",
      action: () => handleQuickAction("¿Qué es Investï?"),
    },
    {
      text: "¿Cómo funciona la IA?",
      action: () => handleQuickAction("¿Cómo funciona la IA?"),
    },
    {
      text: "Quiero registrarme",
      action: () => handleQuickAction("Quiero registrarme"),
    },
    {
      text: "¿Es gratis?",
      action: () => handleQuickAction("¿Es gratis?"),
    },
  ]

  const botResponses = [
    {
      keywords: ["hola", "hi", "hello", "buenas", "hey"],
      response:
        "¡Hola! 😊 Me da mucho gusto conocerte. Soy Irï, tu asistente inteligente de Investï. Estoy aquí para ayudarte a descubrir cómo nuestra plataforma puede transformar tu tu futuro financiero. ¿Te gustaría saber más sobre nuestras características principales?",
    },
    {
      keywords: ["que es", "qué es", "investï", "plataforma", "explicar"],
      response:
        "¡Excelente pregunta! 🚀 Investï es la primera red social de educación financiera potenciada con Inteligencia Artificial. Conectamos a más de 100,000 personas con metas similares para aprender, compartir y crecer financieramente juntas. Imagínate tener acceso a una comunidad donde puedes aprender de expertos, conectar con personas como tú, y tener un mentor IA disponible 24/7. ¿Te interesa algún aspecto en particular?",
    },
    {
      keywords: ["ia", "inteligencia artificial", "mentor", "como funciona", "cómo funciona"],
      response:
        "¡Me encanta que preguntes sobre esto! 🤖 Yo soy parte de esa IA. Mi función es personalizar completamente tu experiencia en Investï. Analizo tus intereses, metas financieras y nivel de conocimiento para recomendarte las mejores comunidades, contenido educativo y personas con las que conectar. Además, estoy disponible 24/7 para responder tus dudas, guiar tu aprendizaje y ayudarte a alcanzar tus objetivos financieros. ¡Es como tener un mentor personal que nunca duerme! Recuerda, Irï no te dará recomendaciones directas de inversión, pero te guiará para que tomes tus propias decisiones informadas. ¿Te gustaría que te ayude a empezar?",
    },
    {
      keywords: ["registro", "registrar", "unir", "beta", "inscribir", "apuntar"],
      response:
        "¡Perfecto! 🎯 Me emociona ayudarte a unirte a la revolución financiera. Para registrarte en nuestro programa beta exclusivo, necesito algunos datos básicos. Puedo ayudarte a completar el formulario paso a paso, o si prefieres, puedes scrollear hacia abajo hasta la sección 'Registro Beta Exclusivo'. Durante la fase beta, Investï es completamente GRATUITO. ¿Empezamos con tu nombre completo?",
    },
    {
      keywords: ["comunidad", "comunidades", "conectar", "gente", "personas"],
      response:
        "¡Las comunidades son el corazón de Investï! ❤️ Tenemos más de 50 comunidades activas especializadas en diferentes áreas: criptomonedas (15,234 miembros), acciones y ETFs (22,891 miembros), startups y VC (8,567 miembros), educación financiera, libertad financiera, y muchas más. Cada comunidad tiene expertos verificados y personas en tu mismo nivel de conocimiento. La IA te ayuda a encontrar las comunidades perfectas según tus intereses. ¿Qué área te interesa más?",
    },
    {
      keywords: ["precio", "costo", "gratis", "pagar", "dinero", "cuanto cuesta", "cuánto cuesta"],
      response:
        "¡Tengo excelentes noticias! 🎉 Durante toda la fase beta, Investï es completamente GRATUITO para los primeros 1,000 usuarios. Es nuestra forma de agradecerte por ayudarnos a construir la mejor plataforma de educación financiera del mundo. No hay costos ocultos, no hay trucos. Solo educación financiera de calidad, comunidades increíbles y tu mentor IA personal, todo gratis. ¿Te gustaría asegurar tu lugar ahora?",
    },
    {
      keywords: ["cuando", "cuándo", "lanzamiento", "disponible", "fecha"],
      response:
        "¡Estamos súper cerca! ⏰ Los beta testers tendrán acceso exclusivo en las próximas 4-6 semanas. Estamos en las etapas finales de desarrollo y testing. Por eso es crucial registrarse ahora para no perderse esta oportunidad única de ser pionero en el futuro de las finanzas. Los primeros usuarios también tendrán beneficios especiales cuando lancemos oficialmente. ¡No te quedes fuera!",
    },
    {
      keywords: ["educacion", "educación", "aprender", "cursos", "enseñar"],
      response:
        "¡La educación es nuestra pasión! 📚 En Investï transformamos el aprendizaje financiero en una experiencia divertida y efectiva. Ofrecemos cursos interactivos, desafíos semanales, minijuegos educativos, simuladores de inversión, y un sistema de gamificación con badges y niveles. Todo adaptado a tu ritmo y nivel de conocimiento. Desde conceptos básicos hasta estrategias avanzadas. ¿Te gustaría saber más sobre algún tema específico?",
    },
    {
      keywords: ["seguro", "seguridad", "confiable", "regulado"],
      response:
        "¡La seguridad es nuestra prioridad número uno! 🛡️ Investï cumple con los más altos estándares de seguridad y regulación financiera. Todos tus datos están encriptados, nunca compartimos información personal, y trabajamos solo con instituciones financieras reguladas. Además, como mentor IA, nunca te daré recomendaciones de inversión específicas para cumplir con las regulaciones. Mi función es educarte y guiarte para que tomes tus propias decisiones informadas.",
    },
    {
      keywords: ["ayuda", "soporte", "contacto", "problema"],
      response:
        "¡Estoy aquí para ayudarte! 💪 Como tu asistente IA, puedo resolver la mayoría de tus dudas al instante. Si necesitas ayuda más específica, nuestro equipo de soporte humano está disponible 24/7 para usuarios beta. También tenemos un centro de ayuda completo, tutoriales en video, y una comunidad súper activa donde otros usuarios pueden ayudarte. ¿En qué específicamente puedo ayudarte ahora?",
    },
  ]

  const handleChatSubmit = async (e: React.FormEvent, quickText?: string) => {
    e.preventDefault()
    const messageText = quickText || chatInput
    if (!messageText.trim()) return

    const userMessage: ChatMessage = {
      id: chatMessages.length + 1,
      text: messageText,
      isBot: false,
      timestamp: new Date(),
    }

    setChatMessages((prev) => [...prev, userMessage])
    setChatInput("")
    setIsTyping(true)

    // Add typing indicator
    const typingMessage: ChatMessage = {
      id: chatMessages.length + 2,
      text: "",
      isBot: true,
      timestamp: new Date(),
      typing: true,
    }
    setChatMessages((prev) => [...prev, typingMessage])

    // Simulate realistic typing delay
    setTimeout(
      () => {
        const lowerInput = messageText.toLowerCase()
        let response =
          "Interesante pregunta. 🤔 Investï está diseñado para democratizar la educación financiera y crear una comunidad donde todos puedan aprender y crecer juntos. Nuestra IA personaliza cada experiencia para maximizar tu aprendizaje. ¿Te gustaría saber más sobre alguna característica específica?"

        // Find the best matching response
        for (const botResponse of botResponses) {
          if (botResponse.keywords.some((keyword) => lowerInput.includes(keyword))) {
            response = botResponse.response
            break
          }
        }

        // Remove typing indicator and add real response
        setChatMessages((prev) => {
          const withoutTyping = prev.filter((msg) => !msg.typing)
          return [
            ...withoutTyping,
            {
              id: prev.length + 1,
              text: response,
              isBot: true,
              timestamp: new Date(),
            },
          ]
        })
        setIsTyping(false)
      },
      2000 + Math.random() * 1000,
    ) // Random delay for realism
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setMessage("")

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 2000))

    setMessage(
      "🎉 ¡Increíble! Ya eres parte de la revolución financiera. Te contactaremos en las próximas 24-48 horas con tu acceso beta exclusivo y todos los detalles para empezar tu viaje hacia la libertad financiera.",
    )
    setEmail("")
    setName("")
    setPhone("")
    setAge("")
    setSelectedGoals([])
    setSelectedInterests([])
    setIsSubmitting(false)
  }

  const stats = [
    { number: "100K+", label: "Usuarios Registrados", icon: Users },
    { number: "50+", label: "Comunidades Activas", icon: Share2 },
    { number: "95%", label: "Satisfacción de Usuarios", icon: Star },
  ]

  const features = [
    {
      icon: () => (
        <Image
          src="https://socialmediamkt.softwarenicaragua.com/wp-content/uploads/2025/08/iri-icono-Sin-fondo.gif"
          alt="Irï Icon"
          width={48}
          height={48}
          unoptimized
        />
      ),
      title: "IA Personalizada",
      description: "Conecta, Aprende y crece",
      color: "bg-blue-500",
    },
    {
      icon: Users,
      title: "Comunidades Vibrantes",
      description: "Conecta con inversionistas que comparten tus intereses y objetivos financieros.",
      color: "bg-blue-500",
    },
    {
      icon: GraduationCap,
      title: "Educación Gamificada",
      description: "Aprende con cursos interactivos, desafíos y minijuegos que hacen divertido el aprendizaje.",
      color: "bg-yellow-500",
    },
    {
      icon: Rocket,
      title: "Zona de Emprendimiento y Startups",
      description: "Un espacio para descubrir y potenciar proyectos innovadores.",
      color: "bg-purple-500",
    },
    {
      icon: Handshake,
      title: "Conecta con Inversionistas Angeles",
      description: "Acceso exclusivo para conectar con inversionistas ángeles y potenciar tu proyecto.",
      color: "bg-pink-500",
    },
    {
      icon: BarChart3,
      title: "Análisis Avanzado",
      description: "Herramientas profesionales de análisis para tomar decisiones informadas.",
      color: "bg-indigo-500",
    },
  ]

  const communities = [
    {
      name: "Inversiones para principiantes",
      members: "12k miembros",
      type: "Comunidad pública",
      icon: "📈",
      color: "from-blue-500 to-blue-600",
      isPrivate: false,
    },
    {
      name: "Criptomonedas para principiantes",
      members: "2k miembros",
      type: "Comunidad privada",
      icon: "₿",
      color: "from-amber-600 to-amber-700",
      isPrivate: true,
    },
    {
      name: "Startups & VC",
      members: "8.5k miembros",
      type: "Comunidad pública",
      icon: "🚀",
      color: "from-purple-500 to-purple-600",
      isPrivate: false,
    },
  ]

  const testimonials = [
    {
      name: "María González",
      role: "Emprendedora",
      content:
        "Investï cambió completamente mi perspectiva sobre las inversiones. En 3 meses aprendí más que en años de intentarlo sola. La comunidad es increíble y Irï siempre tiene las respuestas que necesito.",
      avatar:
        "https://socialmediamkt.softwarenicaragua.com/wp-content/uploads/2025/08/iri-icono-tipografia-Sin-fondo-.gif",
      rating: 5,
    },
    {
      name: "Carlos Ruiz",
      role: "Ingeniero de Software",
      content:
        "La comunidad de cripto en Investï es increíble. He hecho conexiones valiosas y mi portafolio simulado ha crecido 40%. Definitivamente la mejor plataforma para aprender inversiones.",
      avatar:
        "https://socialmediamkt.softwarenicaragua.com/wp-content/uploads/2025/08/iri-icono-tipografia-Sin-fondo-.gif",
      rating: 5,
    },
    {
      name: "Ana Martínez",
      role: "Doctora",
      content:
        "Como principiante total, Irï me guió paso a paso desde cero. Ahora tengo confianza para tomar mis propias decisiones de inversión. ¡No puedo esperar al lanzamiento oficial!",
      avatar:
        "https://socialmediamkt.softwarenicaragua.com/wp-content/uploads/2025/08/iri-icono-tipografia-Sin-fondo-.gif",
      rating: 5,
    },
  ]

  const roadmapItems = [
    {
      phase: "Fase 1",
      title: "Beta Cerrado",
      description: "Acceso exclusivo para los primeros 1000 usuarios con todas las funciones principales",
      status: "current",
      date: "Q1 2024",
    },
    {
      phase: "Fase 2",
      title: "Lanzamiento Público",
      description: "Apertura completa de la plataforma con nuevas funciones y comunidades",
      status: "upcoming",
      date: "Q2 2024",
    },
    {
      phase: "Fase 3",
      title: "Inversiones Reales",
      description: "Integración con brokers regulados para inversiones reales desde la plataforma",
      status: "upcoming",
      date: "Q3 2024",
    },
    {
      phase: "Fase 4",
      title: "Zona Startups y Emprendimientos",
      description: "Plataforma completa de crowdfunding y conexión con inversionistas ángeles",
      status: "upcoming",
      date: "Q4 2024",
    },
  ]

  const userGoals = [
    "Comprar una casa",
    "Pagar estudios",
    "Comprar un auto",
    "Invertir en mi mascota",
    "Viajes",
    "Ahorrar para el retiro",
    "Para mis hijos",
    "Diversificar inversiones",
  ]

  const learningInterests = [
    "Depósitos a plazo",
    "Acciones (general)",
    "Inversión inmobiliaria",
    "Startups",
    "Educarse financieramente",
    "Criptomonedas",
  ]

  const handleGoalChange = (goal: string) => {
    setSelectedGoals((prev) => (prev.includes(goal) ? prev.filter((g) => g !== goal) : [...prev, goal]))
  }

  const handleInterestChange = (interest: string) => {
    setSelectedInterests((prev) => (prev.includes(interest) ? prev.filter((i) => i !== interest) : [...prev, interest]))
  }

  return (
    <div className="flex flex-col min-h-screen bg-white text-gray-900 relative">
      {/* Header */}
      <header className="px-4 lg:px-6 h-20 flex items-center justify-center bg-white/95 backdrop-blur-sm shadow-sm sticky top-0 z-40 border-b">
        <div className="w-full max-w-7xl flex items-center justify-between">
          <Link href="#" className="flex items-center gap-3">
            <Image
              src="https://socialmediamkt.softwarenicaragua.com/wp-content/uploads/2025/08/Group-6-1.png"
              alt="Investï Community"
              width={150}
              height={40}
              className="h-10 w-auto"
              priority
            />
            <Badge variant="secondary" className="bg-blue-100 text-blue-700">
              Beta
            </Badge>
          </Link>
          <nav className="hidden md:flex gap-8">
            <button
              onClick={() => scrollToSection("features")}
              className="text-sm font-medium hover:text-blue-600 transition-colors cursor-pointer"
            >
              Características
            </button>
            <button
              onClick={() => scrollToSection("community")}
              className="text-sm font-medium hover:text-blue-600 transition-colors cursor-pointer"
            >
              Comunidad
            </button>
            <button
              onClick={() => scrollToSection("roadmap")}
              className="text-sm font-medium hover:text-blue-600 transition-colors cursor-pointer"
            >
              Roadmap
            </button>
            <button
              onClick={() => scrollToSection("testimonials")}
              className="text-sm font-medium hover:text-blue-600 transition-colors cursor-pointer"
            >
              Testimonios
            </button>
          </nav>
          <Button
            className="bg-blue-600 hover:bg-blue-700 text-white shadow-lg"
            onClick={() => scrollToSection("register")}
          >
            Regístrate Ahora
          </Button>
        </div>
      </header>

      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative w-full py-20 md:py-32 lg:py-40 bg-gradient-to-br from-blue-50 via-white to-blue-50 overflow-hidden">
          <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
          <div className="w-full max-w-7xl mx-auto px-4 md:px-6 relative z-10">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div className="flex flex-col space-y-8 text-center lg:text-left max-w-2xl mx-auto lg:mx-0">
                <div className="space-y-4">
                  <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-black tracking-tight leading-none">
                    <span className="bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">
                      Conecta
                    </span>{" "}
                    con tu
                    <br />
                    <span className="bg-gradient-to-r from-cyan-600 to-blue-600 bg-clip-text text-transparent">
                      Futuro
                    </span>
                  </h1>
                  <p className="text-xl md:text-2xl text-gray-600 leading-relaxed">
                    La primera Red Socïal de Educación Financiera y Inversionistas del Mundo, Potenciada con
                    inteligencia Artificial.
                    <span className="font-semibold text-blue-600"> Conecta, Aprende y crece</span> junto a miles de
                    personas en todo el Mundo.
                  </p>
                </div>

                <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                  <Button
                    size="lg"
                    className="h-14 px-8 text-lg bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white shadow-xl transition-all duration-300 transform hover:scale-105"
                    onClick={() => scrollToSection("register")}
                  >
                    Únete a la primera red social de educación financiera
                  </Button>
                  <Button
                    variant="outline"
                    size="lg"
                    className="h-14 px-8 text-lg border-2 border-blue-600 text-blue-600 hover:bg-blue-50 transition-all duration-300 transform hover:scale-105 bg-transparent"
                    onClick={() => scrollToSection("features")}
                  >
                    <Play className="mr-2 h-5 w-5" />
                    Ver Demo
                  </Button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-8">
                  {stats.map((stat, index) => (
                    <div key={index} className="text-center">
                      <div className="flex justify-center mb-2">
                        <stat.icon className="h-8 w-8 text-blue-600" />
                      </div>
                      <div className="text-2xl md:text-3xl font-bold text-gray-900">{stat.number}</div>
                      <div className="text-sm text-gray-600">{stat.label}</div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="relative flex justify-center">
                <div className="relative w-full max-w-lg">
                  <Image
                    src="https://socialmediamkt.softwarenicaragua.com/wp-content/uploads/2025/08/iri-icono-tipografia-Sin-fondo-.gif"
                    width={600}
                    height={600}
                    alt="Crecimiento financiero con Investï"
                    className="object-contain w-full h-auto animate-float"
                    priority
                    unoptimized
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section id="features" className="w-full py-20 md:py-32 bg-gray-50">
          <div className="w-full max-w-7xl mx-auto px-4 md:px-6">
            <div className="text-center mb-16">
              <Badge className="bg-blue-100 text-blue-700 px-4 py-2 text-sm font-medium mb-4">¿Por qué Investï?</Badge>
              <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight mb-6">
                Una Plataforma <span className="text-blue-600">Revolucionaria</span>
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Combinamos inteligencia artificial, gamificación y comunidad para crear la experiencia de aprendizaje
                financiero más avanzada del mundo.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {features.map((feature, index) => (
                <Card
                  key={index}
                  className="group hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 border-0 bg-white rounded-3xl overflow-hidden"
                >
                  <CardHeader className="pb-4 text-center">
                    <div
                      className={`w-20 h-20 ${feature.color} rounded-full flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300 mx-auto`}
                    >
                      {typeof feature.icon === "function" ? (
                        feature.icon()
                      ) : (
                        <feature.icon className="h-10 w-10 text-white" />
                      )}
                    </div>
                    <CardTitle className="text-2xl font-bold group-hover:text-blue-600 transition-colors">
                      {feature.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="text-center">
                    <CardDescription className="text-gray-600 text-base leading-relaxed">
                      {feature.description}
                    </CardDescription>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* AI Mentor Section */}
        <section className="w-full py-20 md:py-32 bg-gradient-to-r from-[#4a1b47] to-cyan-600 text-white">
          <div className="w-full max-w-7xl mx-auto px-4 md:px-6">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div className="space-y-8 max-w-2xl mx-auto lg:mx-0">
                <div>
                  <Badge className="bg-white/20 text-white px-4 py-2 text-sm font-medium mb-4">
                    🤖 Inteligencia Artificial
                  </Badge>
                  <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-6">
                    Conoce a <span className="text-yellow-300">Irï</span>
                  </h2>
                  <p className="text-xl leading-relaxed opacity-90">
                    Tu{" "}
                    <span className="font-semibold" style={{ color: "#4a1b47" }}>
                      mentor
                    </span>{" "}
                    financiero{" "}
                    <span className="font-semibold" style={{ color: "#4a1b47" }}>
                      personal potenciado con Ïnteligencia Artificial
                    </span>{" "}
                    que te{" "}
                    <span className="font-semibold" style={{ color: "#4a1b47" }}>
                      acompañará
                    </span>{" "}
                    24/7 brindándote una{" "}
                    <span className="font-semibold" style={{ color: "#4a1b47" }}>
                      experiencia
                    </span>{" "}
                    <span className="font-semibold" style={{ color: "#4a1b47" }}>
                      personalizada
                    </span>{" "}
                    <span className="font-semibold" style={{ color: "#4a1b47" }}>
                      enseñandote
                    </span>{" "}
                    y{" "}
                    <span className="font-semibold" style={{ color: "#4a1b47" }}>
                      acompañándote
                    </span>{" "}
                    hacía tus{" "}
                    <span className="font-semibold" style={{ color: "#4a1b47" }}>
                      metas
                    </span>{" "}
                    <span className="font-semibold" style={{ color: "#4a1b47" }}>
                      financieras
                    </span>
                    .{" "}
                    <span className="font-semibold" style={{ color: "#4a1b47" }}>
                      Irï
                    </span>{" "}
                    no te dará{" "}
                    <span className="font-semibold" style={{ color: "#4a1b47" }}>
                      recomendaciones
                    </span>{" "}
                    de{" "}
                    <span className="font-semibold" style={{ color: "#4a1b47" }}>
                      inversión
                    </span>{" "}
                    pero te guiará para tomes{" "}
                    <span className="font-semibold" style={{ color: "#4a1b47" }}>
                      decisiones
                    </span>{" "}
                    de manera{" "}
                    <span className="font-semibold" style={{ color: "#4a1b47" }}>
                      informada
                    </span>
                    .
                  </p>
                </div>

                <Button
                  size="lg"
                  className="bg-white text-blue-600 hover:bg-gray-100 h-14 px-8 text-lg font-semibold shadow-xl"
                  onClick={() => setIsChatOpen(true)}
                >
                  <MessageCircle className="mr-2 h-5 w-5" />
                  Habla con Irï Ahora
                </Button>
              </div>

              <div className="relative flex justify-center">
                <Image
                  src="https://socialmediamkt.softwarenicaragua.com/wp-content/uploads/2025/08/iri-icono-Sin-fondo.gif"
                  width={500}
                  height={600}
                  alt="Chat con Irï, el mentor de IA"
                  className="object-contain w-full h-auto rounded-2xl shadow-2xl"
                  unoptimized
                />
              </div>
            </div>
          </div>
        </section>

        {/* Community Section */}
        <section id="community" className="w-full py-20 md:py-32 bg-white">
          <div className="w-full max-w-7xl mx-auto px-4 md:px-6">
            <div className="text-center mb-16">
              <Badge className="bg-blue-100 text-blue-700 px-4 py-2 text-sm font-medium mb-4">🌟 Comunidad</Badge>
              <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight mb-6">
                Conecta con <span className="text-blue-600">tus intereses</span>
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Regístrate en nuestra red social y descubre comunidades vibrantes dónde podrás compartir experiencias,
                aprender y crecer junto a otros.
              </p>
            </div>

            <div className="grid md:grid-cols-1 lg:grid-cols-3 gap-6 mb-16 max-w-4xl mx-auto">
              {communities.map((community, index) => (
                <Card
                  key={index}
                  className={`group hover:shadow-xl transition-all duration-300 border-0 overflow-hidden bg-gradient-to-br ${community.color}`}
                >
                  <CardHeader className="text-white pb-2">
                    <div className="flex items-center justify-between mb-2">
                      <div className="text-3xl">{community.icon}</div>
                      <Button
                        size="sm"
                        className="bg-white/20 hover:bg-white/30 text-white border-white/30"
                        variant="outline"
                      >
                        📋 Unirse
                      </Button>
                    </div>
                    <CardTitle className="text-xl text-white font-bold">{community.name}</CardTitle>
                  </CardHeader>
                  <CardContent className="text-white/90 pt-0">
                    <div className="flex items-center gap-4 text-sm">
                      <div className="flex items-center gap-1">
                        <Users className="h-4 w-4" />
                        <span>{community.members}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        {community.isPrivate ? <Lock className="h-4 w-4" /> : <Globe className="h-4 w-4" />}
                        <span>{community.type}</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            <div className="text-center">
              <p className="text-gray-600 mb-6">
                También te puede interesar seguir a estas personas basado en tus preferencias
              </p>
              <Image
                src="https://socialmediamkt.softwarenicaragua.com/wp-content/uploads/2025/08/iri-icono-tipografia-Sin-fondo-.gif"
                width={600}
                height={400}
                alt="Red de comunidad Investï"
                className="mx-auto rounded-2xl shadow-2xl mb-8"
                unoptimized
              />
              <Button
                size="lg"
                className="bg-blue-600 hover:bg-blue-700 text-white h-14 px-8 text-lg"
                onClick={() => scrollToSection("register")}
              >
                <Users className="mr-2 h-5 w-5" />
                Explora Todas las Comunidades
              </Button>
            </div>
          </div>
        </section>

        {/* Testimonials Section */}
        <section id="testimonials" className="w-full py-20 md:py-32 bg-gray-50">
          <div className="w-full max-w-7xl mx-auto px-4 md:px-6">
            <div className="text-center mb-16">
              <Badge className="bg-green-100 text-green-700 px-4 py-2 text-sm font-medium mb-4">💬 Testimonios</Badge>
              <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight mb-6">
                Lo que Dicen <span className="text-green-600">Nuestros Usuarios</span>
              </h2>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              {testimonials.map((testimonial, index) => (
                <Card key={index} className="bg-white border-0 shadow-lg hover:shadow-xl transition-all duration-300">
                  <CardHeader>
                    <div className="flex items-center gap-4">
                      <Image
                        src={testimonial.avatar || "/placeholder.svg"}
                        width={60}
                        height={60}
                        alt={testimonial.name}
                        className="rounded-full"
                        unoptimized
                      />
                      <div>
                        <h3 className="font-semibold text-lg">{testimonial.name}</h3>
                        <p className="text-gray-600">{testimonial.role}</p>
                      </div>
                    </div>
                    <div className="flex gap-1">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <Star key={i} className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                      ))}
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-700 italic">"{testimonial.content}"</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Roadmap Section */}
        <section id="roadmap" className="w-full py-20 md:py-32 bg-white">
          <div className="w-full max-w-7xl mx-auto px-4 md:px-6">
            <div className="text-center mb-16">
              <Badge className="bg-indigo-100 text-indigo-700 px-4 py-2 text-sm font-medium mb-4">🗺️ Roadmap</Badge>
              <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight mb-6">
                El <span className="text-indigo-600">Futuro</span> de Investï: Tu Camino al Éxito
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Conoce nuestros planes y únete desde el principio para ser parte de esta revolución financiera.
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {roadmapItems.map((item, index) => (
                <Card
                  key={index}
                  className={`group hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-4 border-0 relative overflow-hidden ${
                    item.status === "current"
                      ? "bg-gradient-to-br from-blue-600 to-cyan-600 text-white"
                      : "bg-white hover:bg-gray-50"
                  }`}
                >
                  <div
                    className={`absolute top-4 right-4 w-12 h-12 rounded-full flex items-center justify-center font-bold text-xl ${
                      item.status === "current" ? "bg-white/20 text-white" : "bg-blue-100 text-blue-600"
                    }`}
                  >
                    {index + 1}
                  </div>

                  <CardHeader className="pb-4 pt-6">
                    <Badge
                      className={`w-fit mb-2 ${
                        item.status === "current" ? "bg-white/20 text-white" : "bg-blue-100 text-blue-700"
                      }`}
                    >
                      {item.date}
                    </Badge>
                    <CardTitle
                      className={`text-xl font-bold ${
                        item.status === "current" ? "text-white" : "text-gray-900 group-hover:text-blue-600"
                      }`}
                    >
                      {item.title}
                    </CardTitle>
                  </CardHeader>

                  <CardContent>
                    <p
                      className={`text-sm leading-relaxed ${
                        item.status === "current" ? "text-white/90" : "text-gray-600"
                      }`}
                    >
                      {item.description}
                    </p>
                    {item.status === "current" && (
                      <Badge className="bg-green-400 text-green-900 mt-4">¡En Progreso!</Badge>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Registration Section */}
        <section
          id="register"
          className="w-full py-20 md:py-32 bg-gradient-to-br from-blue-600 via-cyan-600 to-indigo-600 text-white relative overflow-hidden"
        >
          <div className="absolute inset-0 bg-black/20"></div>
          <div className="w-full max-w-7xl mx-auto px-4 md:px-6 relative z-10">
            <div className="max-w-4xl mx-auto text-center mb-12">
              <Badge className="bg-white/20 text-white px-4 py-2 text-sm font-medium mb-4">
                🎯 Acceso Beta Exclusivo
              </Badge>
              <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight mb-6">
                ¡Asegura tu Lugar en la <span className="text-yellow-300">Revolución!</span>
              </h2>
              <p className="text-xl leading-relaxed opacity-90 mb-8">
                Solo los primeros 1,000 usuarios tendrán acceso beta ANTICIPADO. No pierdas esta oportunidad única de
                ser pionero en el futuro de las finanzas.
              </p>
              <div className="flex flex-wrap justify-center gap-8 text-lg font-semibold">
                <div className="flex items-center gap-2">
                  <CheckCircle className="h-6 w-6 text-green-300" />
                  <span>Acceso Beta ANTICIPADO</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="h-6 w-6 text-green-300" />
                  <span>Acceso Prioritario</span>
                </div>
                <div className="flex items-center gap-2">
                  <Award className="h-6 w-6 text-green-300" />
                  <span>Badge de Beta Tester Oficial</span>
                </div>
              </div>
            </div>

            <Card className="max-w-2xl mx-auto p-8 bg-white/95 backdrop-blur-sm text-gray-900 shadow-2xl">
              <CardHeader className="text-center pb-6">
                <CardTitle className="text-3xl font-bold mb-2">Registro Beta Exclusivo</CardTitle>
                <CardDescription className="text-lg text-gray-600">
                  Completa el formulario y recibe tu invitación en 24-48 horas
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid md:grid-cols-3 gap-4">
                    <div>
                      <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                        Nombre Completo *
                      </label>
                      <Input
                        id="name"
                        type="text"
                        placeholder="Tu nombre completo"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                        className="h-12 text-base"
                      />
                    </div>
                    <div>
                      <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
                        Teléfono
                      </label>
                      <Input
                        id="phone"
                        type="tel"
                        placeholder="+56 9 1234 5678"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        className="h-12 text-base"
                      />
                    </div>
                    <div>
                      <label htmlFor="age" className="block text-sm font-medium text-gray-700 mb-2">
                        Edad *
                      </label>
                      <Select onValueChange={setAge} value={age} required>
                        <SelectTrigger className="h-12 text-base">
                          <SelectValue placeholder="Selecciona tu edad" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="18-25">18-25 años</SelectItem>
                          <SelectItem value="26-35">26-35 años</SelectItem>
                          <SelectItem value="36-45">36-45 años</SelectItem>
                          <SelectItem value="46-55">46-55 años</SelectItem>
                          <SelectItem value="56-65">56-65 años</SelectItem>
                          <SelectItem value="65+">65+ años</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                      Correo Electrónico *
                    </label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="tu@email.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                      className="h-12 text-base"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      ¿Qué esperas lograr con Investï? (Puedes seleccionar varios) *
                    </label>
                    <div className="grid grid-cols-2 gap-2">
                      {userGoals.map((goal) => (
                        <Button
                          key={goal}
                          type="button"
                          variant={selectedGoals.includes(goal) ? "default" : "outline"}
                          className={`h-auto py-2 px-3 text-sm ${selectedGoals.includes(goal) ? "bg-blue-600 text-white" : "border-gray-300 text-gray-700 hover:bg-gray-100"}`}
                          onClick={() => handleGoalChange(goal)}
                        >
                          {goal}
                        </Button>
                      ))}
                    </div>
                    {selectedGoals.length === 0 && (
                      <p className="text-red-500 text-xs mt-1">Por favor, selecciona al menos una meta.</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      ¿Qué te gustaría aprender o en qué te interesa invertir? (Puedes seleccionar varios) *
                    </label>
                    <div className="grid grid-cols-2 gap-2">
                      {learningInterests.map((interest) => (
                        <Button
                          key={interest}
                          type="button"
                          variant={selectedInterests.includes(interest) ? "default" : "outline"}
                          className={`h-auto py-2 px-3 text-sm ${selectedInterests.includes(interest) ? "bg-blue-600 text-white" : "border-gray-300 text-gray-700 hover:bg-gray-100"}`}
                          onClick={() => handleInterestChange(interest)}
                        >
                          {interest}
                        </Button>
                      ))}
                    </div>
                    {selectedInterests.length === 0 && (
                      <p className="text-red-500 text-xs mt-1">Por favor, selecciona al menos un interés.</p>
                    )}
                  </div>

                  <Button
                    type="submit"
                    className="w-full h-14 text-lg bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white shadow-xl transition-all duration-300 transform hover:scale-105"
                    disabled={isSubmitting || selectedGoals.length === 0 || selectedInterests.length === 0 || !age}
                  >
                    {isSubmitting ? (
                      <>
                        <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                        Procesando...
                      </>
                    ) : (
                      <>
                        <Rocket className="mr-2 h-5 w-5" />
                        ¡Quiero Mi Acceso Beta ANTICIPADO!
                      </>
                    )}
                  </Button>

                  {message && (
                    <div
                      className={`mt-4 p-4 rounded-lg text-center ${
                        message.includes("Increíble") ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"
                      }`}
                    >
                      {message}
                    </div>
                  )}
                </form>
              </CardContent>
            </Card>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white py-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/10 to-cyan-600/10"></div>
        <div className="w-full max-w-7xl mx-auto px-4 md:px-6 relative z-10">
          <div className="grid md:grid-cols-4 gap-12 mb-12">
            <div className="md:col-span-2">
              <div className="flex items-center gap-3 mb-6">
                <Image
                  src="https://socialmediamkt.softwarenicaragua.com/wp-content/uploads/2025/08/Group-6-1.png"
                  alt="Investï Community"
                  width={150}
                  height={40}
                  className="h-10 w-auto"
                />
                <Badge className="bg-blue-600 text-white">Beta</Badge>
              </div>
              <p className="text-gray-300 mb-6 text-lg leading-relaxed">
                La primera red social de educación financiera potenciada con IA. Conecta, aprende y crece junto a miles
                de inversionistas en todo el mundo.
              </p>
              <div className="flex gap-4">
                <Button
                  size="lg"
                  variant="ghost"
                  className="text-gray-300 hover:text-white hover:bg-white/10 rounded-full p-3"
                  onClick={() => window.open("https://www.instagram.com/investi_chile", "_blank")}
                >
                  <Instagram className="h-6 w-6" />
                </Button>
              </div>
            </div>

            <div>
              <h3 className="font-bold text-xl mb-6 text-white">Producto</h3>
              <ul className="space-y-4 text-gray-300">
                <li>
                  <button
                    onClick={() => scrollToSection("features")}
                    className="hover:text-white transition-colors text-left hover:translate-x-2 transform duration-200"
                  >
                    → Características
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => scrollToSection("community")}
                    className="hover:text-white transition-colors text-left hover:translate-x-2 transform duration-200"
                  >
                    → Comunidades
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => setIsChatOpen(true)}
                    className="hover:text-white transition-colors text-left hover:translate-x-2 transform duration-200"
                  >
                    → IA Mentor
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => scrollToSection("features")}
                    className="hover:text-white transition-colors text-left hover:translate-x-2 transform duration-200"
                  >
                    → Educación
                  </button>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="font-bold text-xl mb-6 text-white">Soporte</h3>
              <ul className="space-y-4 text-gray-300">
                <li>
                  <Link
                    href="/ayuda"
                    className="hover:text-white transition-colors hover:translate-x-2 transform duration-200 inline-block"
                  >
                    → Centro de Ayuda
                  </Link>
                </li>
                <li>
                  <Link
                    href="/contacto"
                    className="hover:text-white transition-colors hover:translate-x-2 transform duration-200 inline-block"
                  >
                    → Contacto
                  </Link>
                </li>
                <li>
                  <Link
                    href="/terminos"
                    className="hover:text-white transition-colors hover:translate-x-2 transform duration-200 inline-block"
                  >
                    → Términos
                  </Link>
                </li>
                <li>
                  <Link
                    href="/privacidad"
                    className="hover:text-white transition-colors hover:translate-x-2 transform duration-200 inline-block"
                  >
                    → Privacidad
                  </Link>
                </li>
              </ul>
            </div>
          </div>

          <div className="border-t border-gray-700 pt-8">
            <div className="flex flex-col md:flex-row justify-between items-center gap-4">
              <p className="text-gray-400">
                &copy; {new Date().getFullYear()} Investï Community. Todos los derechos reservados.
              </p>
              <div className="flex items-center gap-4">
                <Badge variant="outline" className="border-blue-500 text-blue-400">
                  🚀 Beta Disponible
                </Badge>
                <Button
                  size="sm"
                  className="bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700"
                  onClick={() => scrollToSection("register")}
                >
                  Únete Ahora
                </Button>
              </div>
            </div>
          </div>
        </div>
      </footer>

      {/* AI Chat Widget */}
      {isChatOpen && (
        <div className="fixed bottom-4 right-4 w-96 h-[600px] bg-white rounded-2xl shadow-2xl border z-50 flex flex-col">
          <div className="bg-gradient-to-r from-blue-600 to-cyan-600 text-white p-4 rounded-t-2xl flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
                <Image
                  src="https://socialmediamkt.softwarenicaragua.com/wp-content/uploads/2025/08/iri-icono-Sin-fondo.gif"
                  alt="Irï Icon"
                  width={32}
                  height={32}
                  unoptimized
                />
              </div>
              <div>
                <h3 className="font-semibold">Irï - Tu Mentor IA</h3>
                <p className="text-xs opacity-90 flex items-center gap-1">
                  <div className="w-2 h-2 bg-green-300 rounded-full animate-pulse"></div>
                  En línea
                </p>
              </div>
            </div>
            <Button
              size="sm"
              variant="ghost"
              className="text-white hover:bg-white/20"
              onClick={() => setIsChatOpen(false)}
            >
              <X className="h-4 w-4" />
            </Button>
          </div>

          <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50">
            {chatMessages.map((msg) => (
              <div key={msg.id} className={`flex ${msg.isBot ? "justify-start" : "justify-end"}`}>
                <div
                  className={`max-w-[85%] p-3 rounded-2xl ${
                    msg.isBot
                      ? "bg-white text-gray-900 shadow-sm border"
                      : "bg-gradient-to-r from-blue-600 to-cyan-600 text-white"
                  }`}
                >
                  {msg.typing ? (
                    <div className="flex gap-1 py-2">
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                      <div
                        className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                        style={{ animationDelay: "0.1s" }}
                      ></div>
                      <div
                        className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                        style={{ animationDelay: "0.2s" }}
                      ></div>
                    </div>
                  ) : (
                    <>
                      <p className="text-sm leading-relaxed">{msg.text}</p>
                      <p className={`text-xs mt-2 ${msg.isBot ? "text-gray-500" : "text-white/70"}`}>
                        {msg.timestamp.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                      </p>
                    </>
                  )}
                </div>
              </div>
            ))}

            {/* Quick Actions */}
            {showQuickActions && chatMessages.length === 1 && (
              <div className="space-y-2">
                <p className="text-xs text-gray-500 text-center">Preguntas frecuentes:</p>
                <div className="grid grid-cols-2 gap-2">
                  {quickActions.map((action, index) => (
                    <Button
                      key={index}
                      variant="outline"
                      size="sm"
                      className="text-xs h-8 bg-white hover:bg-blue-50 border-blue-200"
                      onClick={action.action}
                    >
                      {action.text}
                    </Button>
                  ))}
                </div>
              </div>
            )}

            <div ref={chatEndRef} />
          </div>

          <form onSubmit={handleChatSubmit} className="p-4 border-t bg-white">
            <div className="flex gap-2">
              <Input
                value={chatInput}
                onChange={(e) => setChatInput(e.target.value)}
                placeholder="Escribe tu pregunta..."
                className="flex-1 h-10"
                disabled={isTyping}
              />
              <Button
                type="submit"
                size="sm"
                disabled={isTyping || !chatInput.trim()}
                className="bg-blue-600 hover:bg-blue-700 px-3"
              >
                <Send className="h-4 w-4" />
              </Button>
            </div>
            <p className="text-xs text-gray-500 mt-2 text-center">Irï está aquí para ayudarte 24/7 ✨</p>
          </form>
        </div>
      )}

      {/* Floating Chat Button */}
      {!isChatOpen && (
        <Button
          className="fixed bottom-6 right-6 w-16 h-16 rounded-full bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white shadow-2xl z-40 animate-pulse"
          onClick={() => setIsChatOpen(true)}
        >
          <MessageCircle className="h-6 w-6" />
        </Button>
      )}

      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-20px); }
        }
        .animate-float {
          animation: float 6s ease-in-out infinite;
        }
        .bg-grid-pattern {
          background-image: radial-gradient(circle, #e5e7eb 1px, transparent 1px);
          background-size: 20px 20px;
        }
      `}</style>
    </div>
  )
}
