"use client"
import type { Language } from "@/lib/translations"

interface LanguageToggleProps {
  onLanguageChange: (lang: Language) => void
  currentLanguage: Language
}

export function LanguageToggle({ onLanguageChange, currentLanguage }: LanguageToggleProps) {
  return (
    <div className="flex items-center gap-2 p-2 border rounded-lg">
      <button
        onClick={() => onLanguageChange("es")}
        className={`px-3 py-1.5 text-sm font-medium rounded ${currentLanguage === "es"
            ? "bg-foreground text-background"
            : "text-muted-foreground hover:text-foreground"
          }`}
      >
        ES
      </button>

      <button
        onClick={() => onLanguageChange("en")}
        className={`px-3 py-1.5 text-sm font-medium rounded ${currentLanguage === "en"
            ? "bg-foreground text-background"
            : "text-muted-foreground hover:text-foreground"
          }`}
      >
        EN
      </button>
    </div>
  )
}