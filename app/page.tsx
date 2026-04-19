"use client"

import Link from "next/link"
import Image from "next/image"
import { useEffect, useRef, useState } from "react"
import { LanguageToggle } from "@/components/language-toggle"
import { SidebarNav } from "@/components/SidebarNav"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"
import { translations, type Language } from "@/lib/translations"

const INTRO_EMPHASIS_PHRASES = ["Product Manager", "AI Products", "fintech"] as const

function renderIntroWithEmphasis(text: string) {
  const pattern = INTRO_EMPHASIS_PHRASES.map((p) => p.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")).join("|")
  const re = new RegExp(`(${pattern})`, "g")
  return text.split(re).map((part, i) =>
    (INTRO_EMPHASIS_PHRASES as readonly string[]).includes(part) ? (
      <strong key={i} className="text-foreground font-bold">
        {part}
      </strong>
    ) : (
      part
    ),
  )
}

export default function Home() {
  const [isDark, setIsDark] = useState(true)
  const [activeSection, setActiveSection] = useState("")
  const [language, setLanguage] = useState<Language>("en")
  const sectionsRef = useRef<(HTMLElement | null)[]>([])

  useEffect(() => {
    document.documentElement.classList.toggle("dark", isDark)
  }, [isDark])

  useEffect(() => {
    const savedLanguage = localStorage.getItem("language") as Language
    if (savedLanguage && (savedLanguage === "en" || savedLanguage === "es")) {
      setLanguage(savedLanguage)
    }
  }, [])

  const handleLanguageChange = (lang: Language) => {
    setLanguage(lang)
    localStorage.setItem("language", lang)
  }

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("animate-fade-in-up")
            setActiveSection(entry.target.id)
          }
        })
      },
      { threshold: 0.1, rootMargin: "0px 0px -10% 0px" },
    )

    sectionsRef.current.forEach((section) => {
      if (section) observer.observe(section)
    })

    return () => observer.disconnect()
  }, [])

  const toggleTheme = () => {
    setIsDark(!isDark)
  }

  const t = translations[language]

  return (
    <div className="min-h-screen bg-background text-foreground relative">
      <div className="fixed top-8 right-8 z-20">
        <LanguageToggle onLanguageChange={handleLanguageChange} currentLanguage={language} />
      </div>

      <SidebarNav activeSection={activeSection} />

      <main className="max-w-4xl xl:max-w-5xl 2xl:max-w-6xl mx-auto px-6 sm:px-8 lg:px-16">
        <header
          id="intro"
          ref={(el) => {
            sectionsRef.current[0] = el
          }}
          className="min-h-screen flex items-center opacity-0"
        >
          <div className="w-full space-y-8 sm:space-y-12">
            <div className="text-sm text-muted-foreground font-mono tracking-wider">{t.portfolio} / 2026</div>

            <div className="grid lg:grid-cols-5 gap-12 sm:gap-16 w-full items-start">
              <div className="lg:col-span-3 space-y-6 sm:space-y-8">
                <h1 className="text-5xl sm:text-6xl lg:text-7xl font-light tracking-tight">
                  Javier
                  <br />
                  <span className="text-muted-foreground">LLorente</span>
                </h1>

                <div className="space-y-6 max-w-md">
                  <p className="text-lg sm:text-xl text-muted-foreground leading-relaxed">
                    {renderIntroWithEmphasis(t.intro)}
                  </p>

                  <div className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-4 text-sm text-muted-foreground">
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                      {t.availableForWork}
                    </div>
                    <div>{t.location}</div>
                  </div>
                </div>
              </div>

              <div className="lg:col-span-2 space-y-6 sm:space-y-8">
                <div>
                  <Image
                    src="/images/profile.png"
                    alt="Javier LLorente"
                    width={220}
                    height={220}
                    className="rounded-lg w-full max-w-[220px]"
                    priority
                  />
                </div>

                <div className="space-y-4">
                  <div className="text-sm text-muted-foreground font-mono">{t.currently}</div>
                  <div className="space-y-2">
                    <div className="text-foreground">{t.jobs[0].role}</div>
                    <div className="text-muted-foreground">@ Mateo - Fintech</div>
                    <div className="text-xs text-muted-foreground">2026 — {t.present}</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </header>

        <div className="py-12 sm:py-16 flex justify-center">
          <Link
            href="https://www.linkedin.com/in/javier-llorente-/"
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex items-center gap-3 px-8 py-4 bg-[#0A66C2] hover:bg-[#004182] text-white rounded-lg transition-all duration-300 hover:shadow-xl hover:scale-105"
          >
            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
              <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
            </svg>
            <span className="font-medium text-lg">
              {language === "es" ? "Conecta conmigo en LinkedIn" : "Connect with me on LinkedIn"}
            </span>
            <svg
              className="w-5 h-5 transform group-hover:translate-x-1 transition-transform duration-300"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </Link>
        </div>

        <section
          id="focus"
          ref={(el) => {
            sectionsRef.current[1] = el
          }}
          className="min-h-screen py-12 sm:py-16 opacity-0"
        >
          <div className="space-y-12 sm:space-y-16">
            <h2 className="text-3xl sm:text-4xl font-light">{t.focus}</h2>

            <div className="flex flex-wrap gap-3">
              {t.focusTags.map((skill) => (
                <span
                  key={skill}
                  className="px-4 py-2 text-sm border border-border rounded-full hover:border-muted-foreground/50 hover:bg-muted/20 transition-all duration-300"
                >
                  {skill}
                </span>
              ))}
            </div>

            <div className="space-y-8 pt-12">
              <div className="space-y-4">
                <h3 className="text-2xl sm:text-3xl font-light">{t.tools}</h3>
              </div>

              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                {t.toolCategories.map((category, index) => (
                  <div
                    key={index}
                    className="space-y-3 p-4 border border-border rounded-lg hover:border-muted-foreground/30 transition-all duration-300"
                  >
                    <h4 className="text-base font-medium text-foreground">{category.name}</h4>
                    <div className="flex flex-wrap gap-1.5">
                      {category.tools.map((tool) => (
                        <span
                          key={tool}
                          className="px-2 py-1 text-xs text-muted-foreground bg-muted/30 border border-border rounded-md hover:bg-muted/50 hover:text-foreground transition-all duration-300"
                        >
                          {tool}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>

              <div className="p-4 border-2 border-dashed border-border rounded-lg bg-muted/20">
                <div className="space-y-3">
                  <div className="flex items-center gap-2">
                    <svg
                      className="w-5 h-5 text-muted-foreground"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
                      />
                    </svg>
                    <h4 className="text-base font-medium text-foreground">{t.learningTools}</h4>
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {t.learningToolsList.map((tool) => (
                      <span
                        key={tool}
                        className="px-2 py-1 text-xs text-foreground bg-background border border-border rounded-md"
                      >
                        {tool}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="projects" ref={(el) => {
  sectionsRef.current[2] = el
}} className="py-12 sm:py-16 opacity-0">
          <div className="space-y-8">
            <div className="space-y-2">
              <h2 className="text-2xl sm:text-3xl font-light">{t.featuredProjects}</h2>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
              {t.projects.map((project, index) => (
                <div
                  key={index}
                  className={`group relative overflow-hidden border border-border rounded-lg hover:border-muted-foreground/50 transition-all duration-300 hover:shadow-md ${index === 0 ? "bg-blue-500/5 border-blue-500/30 hover:border-blue-500/50" : ""
                    }`}
                >
                  {index === 0 && (
                    <div className="absolute top-2 right-2 z-10 px-2 py-0.5 text-xs font-medium text-blue-600 dark:text-blue-400 bg-blue-100 dark:bg-blue-950/50 border border-blue-200 dark:border-blue-800 rounded-full">
                      {language === "es" ? "Destacado" : "Featured"}
                    </div>
                  )}

                  <div className="aspect-video relative overflow-hidden bg-muted">
                    <Image src={project.image || "/placeholder.svg"} alt={project.title} fill className="object-cover" />
                  </div>

                  <div className="p-4 space-y-3">
                    <h4 className="text-base font-medium group-hover:text-muted-foreground transition-colors duration-300">
                      {project.title}
                    </h4>

                    <p className="text-xs text-muted-foreground leading-relaxed">{project.description}</p>

                    <div className="flex flex-wrap gap-1.5">
                      {project.tech.slice(0, 3).map((tech) => (
                        <span
                          key={tech}
                          className="px-2 py-0.5 text-xs text-muted-foreground bg-muted/30 border border-border rounded-md"
                        >
                          {tech}
                        </span>
                      ))}
                      {project.tech.length > 3 && (
                        <span className="px-2 py-0.5 text-xs text-muted-foreground">+{project.tech.length - 3}</span>
                      )}
                    </div>

                    <Link
                      href={project.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 text-xs text-foreground hover:text-muted-foreground transition-colors duration-300"
                    >
                      {t.viewProject}
                      <svg
                        className="w-3 h-3 transform group-hover:translate-x-1 transition-transform duration-300"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M17 8l4 4m0 0l-4 4m4-4H3"
                        />
                      </svg>
                    </Link>
                  </div>
                </div>
              ))}
            </div>

            <div className="relative overflow-hidden border-2 border-dashed border-border rounded-lg p-6 bg-gradient-to-br from-muted/20 to-muted/5 hover:border-muted-foreground/30 transition-all duration-300 group">
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0">
                  <svg
                    className="w-8 h-8 text-muted-foreground group-hover:text-foreground transition-colors duration-300"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1.5}
                      d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"
                    />
                  </svg>
                </div>

                <div className="flex-1 space-y-3">
                  <h4 className="text-base font-medium">{t.portfolioMetaTitle}</h4>
                  <p className="text-sm text-muted-foreground leading-relaxed">{t.portfolioMetaDescription}</p>

                  <div className="flex flex-wrap gap-1.5 pt-1">
                    {["Next.js", "TypeScript", "Tailwind CSS"].map((tech) => (
                      <span
                        key={tech}
                        className="px-2 py-0.5 text-xs font-medium text-foreground bg-background border border-border rounded-full"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="tools" ref={(el) => {
  sectionsRef.current[3] = el
}} className="py-12 sm:py-16 opacity-0">
          <div className="space-y-12 sm:space-y-16">
            <div className="space-y-4">
              <h2 className="text-3xl sm:text-4xl font-light">{t.eventsTitle}</h2>
              <p className="text-muted-foreground leading-relaxed max-w-2xl">{t.eventsDescription}</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 sm:gap-12">
              {t.eventPhotos.map((photo, index) => (
                <div
                  key={index}
                  className="group"
                  style={{
                    transform: `rotate(${index % 2 === 0 ? "-2deg" : "2deg"})`,
                  }}
                >
                  <div className="bg-white dark:bg-white p-3 pb-12 shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105 hover:rotate-0">
                    <div className="aspect-square relative overflow-hidden bg-muted">
                      <Image
                        src={
                          index === 0
                            ? "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/ETH-EYWKIn7xP0Feij0EVlXBKB8T6yRLwf.jpg"
                            : index === 1
                              ? "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/PANDA%202021-rsduEvmhZMo4EULvU3z70RCt6Dj0IH.jpg"
                              : index === 2
                                ? "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/IMG_1620.PNG-P6GSF7URy12fUQxIoYIWJaY8c5TqZX.png"
                                : index === 3
                                  ? "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/VICI%202021.JPG-YCAnfwklSg2GVXcaXgUdIkfw3qOgp5.jpeg"
                                  : index === 4
                                    ? "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Panda%20creando%202023.JPG-GWNBnjD3CNuyvovsV4mkHz6YgXY0Mb.jpeg"
                                    : index === 5
                                      ? "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/USINA%202021.JPG-HH5imtvx5iBj6ScQbYuGEN4VooFHke.jpeg"
                                      : `/placeholder.svg?height=400&width=400&query=${encodeURIComponent(photo.caption)}`
                        }
                        alt={photo.caption}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div className="mt-3 text-center">
                      <p className="text-sm text-gray-700 font-mono tracking-wide">
                        {photo.caption}
                        {index === 0 && " - 2026"}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section id="recommendations" ref={(el) => {
  sectionsRef.current[4] = el
}} className="py-12 sm:py-16 opacity-0">
          <div className="space-y-16 sm:space-y-20">
            <div className="space-y-8">
              <h3 className="text-2xl sm:text-3xl font-light">{t.peopleRecommend}</h3>
              <Carousel
                opts={{ align: "start", loop: false }}
                className="relative w-full px-11 sm:px-12 md:px-14"
              >
                <CarouselContent className="-ml-3 sm:-ml-4">
                  {t.testimonials.map((testimonial, index) => (
                    <CarouselItem
                      key={index}
                      className="pl-3 sm:pl-4 basis-full sm:basis-1/2"
                    >
                      <div
                        className={`group flex h-full min-h-0 flex-col p-6 lg:p-8 border rounded-lg transition-all duration-300 hover:shadow-lg ${index === 2
                            ? "border-blue-500/30 bg-blue-500/5 hover:border-blue-500/50 hover:bg-blue-500/10"
                            : "border-border hover:border-muted-foreground/50"
                          }`}
                      >
                        <div className="flex min-h-0 flex-1 flex-col">
                          <div className="space-y-1">
                            <div className="font-medium text-foreground">{testimonial.name}</div>
                            <div className="text-xs text-muted-foreground">{testimonial.role}</div>
                          </div>
                          <p className="mt-4 border-t border-border/50 pt-4 text-sm text-muted-foreground leading-relaxed italic sm:text-[0.9375rem] lg:leading-[1.65]">
                            "{testimonial.text}"
                          </p>
                        </div>
                      </div>
                    </CarouselItem>
                  ))}
                </CarouselContent>
                <CarouselPrevious
                  className="left-1 top-1/2 z-10 h-9 w-9 -translate-y-1/2 border-border bg-background/90 text-foreground shadow-md backdrop-blur-sm hover:bg-muted/50 hover:text-foreground disabled:opacity-25"
                />
                <CarouselNext
                  className="right-1 top-1/2 z-10 h-9 w-9 -translate-y-1/2 border-border bg-background/90 text-foreground shadow-md backdrop-blur-sm hover:bg-muted/50 hover:text-foreground disabled:opacity-25"
                />
              </Carousel>
            </div>

            <div className="flex flex-col items-center gap-4 pt-8">
              <p className="text-center text-muted-foreground">
                {language === "es"
                  ? "¿Quieres conocer más sobre mi trabajo y recomendaciones?"
                  : "Want to learn more about my work and recommendations?"}
              </p>
              <Link
                href="https://www.linkedin.com/in/javier-llorente-/"
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center gap-3 px-6 py-3 border-2 border-[#0A66C2] text-[#0A66C2] hover:bg-[#0A66C2] hover:text-white rounded-lg transition-all duration-300 hover:shadow-lg"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                </svg>
                <span className="font-medium">
                  {language === "es" ? "Ver más recomendaciones en LinkedIn" : "View more recommendations on LinkedIn"}
                </span>
                <svg
                  className="w-4 h-4 transform group-hover:translate-x-1 transition-transform duration-300"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                  />
                </svg>
              </Link>
            </div>
          </div>
        </section>

        <section id="work" ref={(el) => {
  sectionsRef.current[5] = el
}} className="py-12 sm:py-16 opacity-0">
          <div className="space-y-12 sm:space-y-16">
            <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
              <h2 className="text-3xl sm:text-4xl font-light">{t.selectedWork}</h2>
              <div className="text-sm text-muted-foreground font-mono">2021 — 2026</div>
            </div>

            <div className="space-y-8 sm:space-y-12 max-h-none overflow-auto">
              {t.jobs.map((job, index) => (
                <div
                  key={index}
                  className="group grid lg:grid-cols-12 gap-4 sm:gap-8 py-6 sm:py-8 border-b border-border/50 hover:border-border transition-colors duration-500"
                >
                  <div className="lg:col-span-2">
                    <div className="text-xl sm:text-2xl font-light text-muted-foreground group-hover:text-foreground transition-colors duration-500">
                      {job.year}
                    </div>
                  </div>

                  <div className="lg:col-span-10 space-y-3">
                    <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-3 lg:gap-8">
                      <div>
                        <h3 className="text-lg sm:text-xl font-medium">{job.role}</h3>
                        <div className="text-muted-foreground">{job.company}</div>
                      </div>

                      <div className="flex flex-wrap gap-2 lg:justify-end">
                        {job.tech.map((tech) => (
                          <span
                            key={tech}
                            className="px-2 py-1 text-xs text-muted-foreground rounded group-hover:border-muted-foreground/50 transition-colors duration-500"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>

                    <p className="text-muted-foreground leading-relaxed max-w-2xl">{job.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section id="connect" ref={(el) => {
  sectionsRef.current[6] = el
}} className="py-12 sm:py-16 opacity-0">
          <div className="grid lg:grid-cols-2 gap-12 sm:gap-16">
            <div className="space-y-6 sm:space-y-8">
              <h2 className="text-3xl sm:text-4xl font-light">{t.letsConnect}</h2>

              <div className="space-y-6">
                <p className="text-lg sm:text-xl text-muted-foreground leading-relaxed">{t.connectDescription}</p>

                <div className="space-y-4">
                  <Link
                    href="mailto:Javierllorentee@gmail.com"
                    className="group flex items-center gap-3 text-foreground hover:text-muted-foreground transition-colors duration-300"
                  >
                    <span className="text-base sm:text-lg">Javierllorentee@gmail.com</span>
                    <svg
                      className="w-5 h-5 transform group-hover:translate-x-1 transition-transform duration-300"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </Link>
                </div>
              </div>
            </div>

            <div className="space-y-6 sm:space-y-8">
              <div className="text-sm text-muted-foreground font-mono">{t.elsewhere}</div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Link
                  href="https://www.linkedin.com/in/javier-llorente-/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group p-4 border border-border rounded-lg hover:border-muted-foreground/50 transition-all duration-300 hover:shadow-sm"
                >
                  <div className="space-y-2">
                    <div className="text-foreground group-hover:text-muted-foreground transition-colors duration-300">
                      LinkedIn
                    </div>
                    <div className="text-sm text-muted-foreground">javierllorente</div>
                  </div>
                </Link>
              </div>
            </div>
          </div>
        </section>

        <footer className="py-12 sm:py-16 border-t border-border">
          <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6 sm:gap-8">
            <div className="space-y-2">
              <div className="text-sm text-muted-foreground">© 2026 Javier LLorente. {t.allRightsReserved}</div>
              <div className="text-xs text-muted-foreground">{t.builtWith} Javier LLorente</div>
            </div>

            <div className="flex items-center gap-4">
              <button
                onClick={toggleTheme}
                className="group p-3 rounded-lg border border-border hover:border-muted-foreground/50 transition-all duration-300"
                aria-label="Toggle theme"
              >
                {isDark ? (
                  <svg
                    className="w-4 h-4 text-muted-foreground group-hover:text-foreground transition-colors duration-300"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.706-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707a1 1 0 011.414 0zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z"
                      clipRule="evenodd"
                    />
                  </svg>
                ) : (
                  <svg
                    className="w-4 h-4 text-muted-foreground group-hover:text-foreground transition-colors duration-300"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
                  </svg>
                )}
              </button>
            </div>
          </div>
        </footer>
      </main>

      <div className="fixed bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-background via-background/80 to-transparent pointer-events-none"></div>
    </div>
  )
}