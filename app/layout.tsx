import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Investi - Red Social de Educación Financiera",
  description:
    "La primera red social de educación financiera potenciada con IA. Conecta, aprende y crece junto a miles de inversionistas.",
  icons: {
    icon: "/investi-favicon.png",
    shortcut: "/investi-favicon.png",
    apple: "/investi-favicon.png",
  },
    generator: 'v0.app'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="es">
      <body className={inter.className}>{children}</body>
    </html>
  )
}
