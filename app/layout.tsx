import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Investï - Red Social de Educación Financiera con IA | Aprende a Invertir",
  description:
    "Únete a la primera red social de educación financiera potenciada con IA. Aprende a invertir, conecta con inversionistas y crece financieramente con Irï, tu mentor personal 24/7.",
  keywords:
    "educación financiera, inversiones, IA financiera, red social inversores, mentor financiero, Irï, aprender a invertir, comunidad financiera, gamificación financiera",
  authors: [{ name: "Investï SpA" }],
  creator: "Investï SpA",
  publisher: "Investï SpA",
  robots: "index, follow",
  openGraph: {
    type: "website",
    locale: "es_ES",
    url: "https://investiapp.com/",
    siteName: "Investï",
    title: "Investï - Red Social de Educación Financiera con IA",
    description:
      "La primera red social de educación financiera potenciada con IA. Aprende, conecta y crece junto a miles de inversionistas.",
    images: [
      {
        url: "https://investiapp.com/investi-og-image.png",
        width: 1200,
        height: 630,
        alt: "Investï - Red Social de Educación Financiera",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Investï - Red Social de Educación Financiera con IA",
    description:
      "Únete a la revolución de la educación financiera. Aprende con IA, conecta con inversionistas y alcanza tus metas financieras.",
    images: ["https://investiapp.com/investi-twitter-image.png"],
  },
  icons: {
    icon: "/investi-favicon.png",
    shortcut: "/investi-favicon.png",
    apple: "/investi-favicon.png",
  },
  manifest: "/manifest.json",
  verification: {
    google: "your-google-verification-code",
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
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              name: "Investï",
              description: "Red social de educación financiera potenciada con IA",
              url: "https://investiapp.com",
              logo: "https://investiapp.com/investi-logo.png",
              sameAs: ["https://www.instagram.com/investi_chile"],
              contactPoint: {
                "@type": "ContactPoint",
                telephone: "+56-9-1234-5678",
                contactType: "customer service",
                availableLanguage: "Spanish",
              },
              offers: {
                "@type": "Offer",
                description: "Acceso beta gratuito a la plataforma de educación financiera",
                price: "0",
                priceCurrency: "USD",
              },
            }),
          }}
        />
        <link rel="canonical" href="https://investiapp.com/" />
        <meta name="theme-color" content="#2563eb" />
        <meta name="msapplication-TileColor" content="#2563eb" />
      </head>
      <body className={inter.className}>{children}</body>
    </html>
  )
}
