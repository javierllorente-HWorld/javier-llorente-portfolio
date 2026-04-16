"use client"
import type { Language } from "@/lib/translations"

interface LanguageToggleProps {
  onLanguageChange: (lang: Language) => void
  currentLanguage: Language
}

export function LanguageToggle({ onLanguageChange, currentLanguage }: LanguageToggleProps) {
  return (
    <div className="flex items-center gap-2 p-2 bg-background/80 backdrop-blur-sm border border-border rounded-lg">
      <button
        onClick={() => onLanguageChange("es")}
        className={`px-3 py-1.5 text-sm font-medium rounded transition-all duration-300 ${
          currentLanguage === "es" ? "bg-foreground text-background" : "text-muted-foreground hover:text-foreground"
        }`}
        aria-label="Cambiar a español"
      >
        ES
      </button>
      <button
        onClick={() => onLanguageChange("en")}
        className={`px-3 py-1.5 text-sm font-medium rounded transition-all duration-300 ${
          currentLanguage === "en" ? "bg-foreground text-background" : "text-muted-foreground hover:text-foreground"
        }`}
        aria-label="Switch to English"
      >
        EN
      </button>
    </div>
  )
}
