import type React from "react"
import type { Metadata } from "next"
import { Geist } from "next/font/google"
import "./globals.css"

const geist = Geist({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-geist",
})

export const metadata: Metadata = {
  title: "Javier Llorente | Portfolio",
  description:
    "Product Owner y emprendedor enfocado en productos digitales, experiencia de usuario y estrategia.",
  icons: {
    icon: "/icon.svg",
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="es" className={geist.variable}>
      <body className="font-sans antialiased">{children}</body>
    </html>
  )
}