"use client"

import { useState, useEffect } from "react"
import {
  Download,
  Github,
  Linkedin,
  Mail,
  Menu,
  X,
  Moon,
  Sun,
  ExternalLink,
  ArrowRight,
  Code,
  Briefcase,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { motion, AnimatePresence } from "framer-motion"
import ThreeScene from "@/components/three-scene"
import SocialButton from "@/components/social-button"
import Preloader from "@/components/preloader"

export default function Home() {
  const [darkMode, setDarkMode] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [activeSection, setActiveSection] = useState("home")
  const [isLoaded, setIsLoaded] = useState(false)
  const [skillValues, setSkillValues] = useState({
    python: "",
    csharp: "",
    javascript: "",
    html: "",
    sql: "",
    mysql: "",
    sqlite: "",
    dotnet: "",
    react: "",
    bootstrap: "",
  })

  // Toggle dark mode
  useEffect(() => {
    // Check user preference
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches
    setDarkMode(prefersDark)

    if (prefersDark) {
      document.documentElement.classList.add("dark")
    } else {
      document.documentElement.classList.remove("dark")
    }

    // Set loaded state after a delay to ensure preloader shows
    const timer = setTimeout(() => {
      setIsLoaded(true)
    }, 500)

    return () => clearTimeout(timer)
  }, [])

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark")
    } else {
      document.documentElement.classList.remove("dark")
    }
  }, [darkMode])

  // Animate skill bars on view
  useEffect(() => {
    const timer = setTimeout(() => {
      setSkillValues({
        python: "Avanzado",
        csharp: "Avanzado",
        javascript: "Intermedio",
        html: "Avanzado",
        sql: "Avanzado",
        mysql: "Avanzado",
        sqlite: "Intermedio",
        dotnet: "Intermedio",
        react: "Intermedio",
        bootstrap: "Avanzado",
      })
    }, 500)

    return () => clearTimeout(timer)
  }, [])

  // Handle scroll to update active section
  useEffect(() => {
    const handleScroll = () => {
      const sections = ["home", "about", "skills", "projects", "connect"]
      const scrollPosition = window.scrollY + 100

      for (const section of sections) {
        const element = document.getElementById(section)
        if (element) {
          const offsetTop = element.offsetTop
          const offsetHeight = element.offsetHeight

          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveSection(section)
            break
          }
        }
      }
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId)
    if (element) {
      window.scrollTo({
        top: element.offsetTop - 80,
        behavior: "smooth",
      })
      setActiveSection(sectionId)
      setMobileMenuOpen(false)
    }
  }

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3,
      },
    },
  }

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.5 },
    },
  }

  // Map section names to Spanish
  const sectionNames = {
    home: "Inicio",
    about: "Sobre Mí",
    skills: "Habilidades",
    projects: "Proyectos",
    connect: "Contacto",
  }

  return (
    <>
        <link rel="icon" type="image/png" href="/icon.png" />
      <Preloader />

      <div
        className={`min-h-screen bg-gray-50 text-gray-900 dark:bg-gray-900 dark:text-gray-100 transition-colors duration-300`}
      >
        {/* 3D Background */}
        <div className="fixed inset-0 z-0 opacity-30 pointer-events-none">
          <ThreeScene darkMode={darkMode} />
        </div>

        {/* Header */}
        <header className="fixed top-0 left-0 right-0 z-50 bg-white/90 dark:bg-gray-900/90 backdrop-blur-md border-b border-gray-200 dark:border-gray-800 transition-colors duration-300">
          <div className="container mx-auto px-4 py-4 flex justify-between items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-violet-600 dark:from-blue-400 dark:to-violet-400"
            >
              AVM
            </motion.div>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex space-x-8">
              {["home", "about", "skills", "projects", "connect"].map((section) => (
                <motion.button
                  key={section}
                  onClick={() => scrollToSection(section)}
                  className={`capitalize hover:text-blue-600 dark:hover:text-blue-400 transition-colors relative ${
                    activeSection === section ? "text-blue-600 dark:text-blue-400" : ""
                  }`}
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    duration: 0.5,
                    delay:
                      section === "home"
                        ? 0.1
                        : section === "about"
                          ? 0.2
                          : section === "skills"
                            ? 0.3
                            : section === "projects"
                              ? 0.4
                              : 0.5,
                  }}
                >
                  {sectionNames[section]}
                  {activeSection === section && (
                    <motion.div
                      className="absolute -bottom-1.5 left-0 right-0 h-0.5 bg-blue-600 dark:bg-blue-400"
                      layoutId="activeSection"
                    />
                  )}
                </motion.button>
              ))}
            </nav>

            <div className="flex items-center space-x-4">
              {/* Dark Mode Toggle */}
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 0.6 }}
              >
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setDarkMode(!darkMode)}
                  className="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 rounded-full"
                  aria-label={darkMode ? "Cambiar a modo claro" : "Cambiar a modo oscuro"}
                >
                  {darkMode ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
                </Button>
              </motion.div>

              {/* CV Download Button */}
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 0.7 }}
              >
                <Button className="hidden md:flex bg-gradient-to-r from-blue-600 to-violet-600 hover:from-blue-700 hover:to-violet-700 text-white dark:from-blue-500 dark:to-violet-500 dark:hover:from-blue-600 dark:hover:to-violet-600 rounded-full">
                  <Download className="mr-2 h-4 w-4" />
                  <a href="/CV_Fabricio_VillegasMozo.pdf" download>
                        Descargar CV
                      </a>
                </Button>
              </motion.div>

              {/* Mobile Menu Button */}
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 0.6 }}
                className="md:hidden"
              >
                <Button
                  variant="ghost"
                  size="icon"
                  className="text-gray-700 dark:text-gray-300 rounded-full"
                  onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                  aria-label={mobileMenuOpen ? "Cerrar menú" : "Abrir menú"}
                >
                  {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
                </Button>
              </motion.div>
            </div>
          </div>

          {/* Mobile Navigation */}
          <AnimatePresence>
            {mobileMenuOpen && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3 }}
                className="md:hidden bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800 overflow-hidden"
              >
                <div className="container mx-auto px-4 py-4 flex flex-col space-y-4">
                  {["home", "about", "skills", "projects", "connect"].map((section) => (
                    <motion.button
                      key={section}
                      onClick={() => scrollToSection(section)}
                      className={`capitalize py-2 hover:text-blue-600 dark:hover:text-blue-400 transition-colors ${
                        activeSection === section ? "text-blue-600 dark:text-blue-400 font-medium" : ""
                      }`}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{
                        duration: 0.3,
                        delay:
                          section === "home"
                            ? 0.1
                            : section === "about"
                              ? 0.15
                              : section === "skills"
                                ? 0.2
                                : section === "projects"
                                  ? 0.25
                                  : 0.3,
                      }}
                    >
                      {sectionNames[section]}
                    </motion.button>
                  ))}
                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3, delay: 0.35 }}
                  >
                    <Button className="bg-gradient-to-r from-blue-600 to-violet-600 hover:from-blue-700 hover:to-violet-700 text-white dark:from-blue-500 dark:to-violet-500 dark:hover:from-blue-600 dark:hover:to-violet-600 w-full rounded-full">
                      <Download className="mr-2 h-4 w-4" />
                      <a href="/CV_Fabricio_VillegasMozo.pdf" download>
                        Descargar CV
                      </a>
                    </Button>
                  </motion.div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </header>

        <main className="relative z-10 pt-20">
          {/* Hero Section */}
          <section id="home" className="min-h-screen flex items-center relative overflow-hidden">
            {/* Background elements */}
            <div className="absolute inset-0 z-0">
              <div className="absolute top-20 right-10 w-64 h-64 bg-blue-400/10 dark:bg-blue-600/10 rounded-full blur-3xl"></div>
              <div className="absolute bottom-20 left-10 w-72 h-72 bg-violet-400/10 dark:bg-violet-600/10 rounded-full blur-3xl"></div>

              {/* Code-like pattern */}
              <div className="absolute inset-0 opacity-5 dark:opacity-10 pointer-events-none">
                <div className="absolute top-1/4 left-1/4 transform -translate-x-1/2 -translate-y-1/2 text-4xl font-mono text-blue-600 dark:text-blue-400">
                  &lt;/&gt;
                </div>
                <div className="absolute top-3/4 right-1/4 transform translate-x-1/2 -translate-y-1/2 text-4xl font-mono text-violet-600 dark:text-violet-400">
                  {`{}`}
                </div>
                <div className="absolute bottom-1/4 left-1/3 transform -translate-x-1/2 translate-y-1/2 text-4xl font-mono text-blue-600 dark:text-blue-400">
                  &lt;/&gt;
                </div>
              </div>
            </div>

            <div className="container mx-auto px-4 py-20 z-10">
              <motion.div className="max-w-4xl mx-auto" initial="hidden" animate="visible" variants={containerVariants}>
                <div className="text-center mb-12">
                  <motion.div variants={itemVariants}>
                    <Badge className="mb-4 bg-blue-100 text-blue-800 dark:bg-blue-900/50 dark:text-blue-300 hover:bg-blue-200 dark:hover:bg-blue-900 px-4 py-1.5 rounded-full text-sm font-medium">
                      Desarrollador Full Stack
                    </Badge>
                  </motion.div>
                  <motion.h1
                    variants={itemVariants}
                    className="text-5xl md:text-7xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-violet-600 dark:from-blue-400 dark:to-violet-400 leading-tight"
                  >
                    Aldair Villegas Mozo
                  </motion.h1>
                  <motion.div
                    variants={itemVariants}
                    className="h-1 w-24 bg-gradient-to-r from-blue-600 to-violet-600 dark:from-blue-400 dark:to-violet-400 mx-auto mb-8 rounded-full"
                  ></motion.div>
                  <motion.p
                    variants={itemVariants}
                    className="text-xl text-gray-600 dark:text-gray-300 mb-10 max-w-2xl mx-auto leading-relaxed"
                  >
                    Un desarrollador apasionado que crea soluciones elegantes con tecnologías modernas. Especializado en
                    desarrollo full-stack con experiencia en bases de datos, lenguajes de programación y frameworks web.
                  </motion.p>
                </div>

                <motion.div variants={itemVariants} className="flex flex-wrap justify-center gap-4 mb-12">
                  <Button className="bg-gradient-to-r from-blue-600 to-violet-600 hover:from-blue-700 hover:to-violet-700 text-white dark:from-blue-500 dark:to-violet-500 dark:hover:from-blue-600 dark:hover:to-violet-600 rounded-full px-8 py-6 text-lg">
                    <Download className="mr-2 h-5 w-5" />
                    <a href="/CV_Fabricio_VillegasMozo.pdf" download>
                        Descargar CV
                      </a>
                  </Button>
                  <Button
                    variant="outline"
                    className="border-blue-200 text-blue-600 hover:bg-blue-50 dark:border-blue-800 dark:text-blue-400 dark:hover:bg-blue-900/50 rounded-full px-8 py-6 text-lg"
                    onClick={() => scrollToSection("projects")}
                  >
                    Ver Proyectos
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </motion.div>

                <motion.div variants={itemVariants} className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-3xl mx-auto">
                  {[
                    { title: "3+", subtitle: "Años de Experiencia", color: "blue" },
                    { title: "20+", subtitle: "Proyectos Completados", color: "indigo" },
                    { title: "10+", subtitle: "Tecnologías", color: "violet" },
                    { title: "3", subtitle: "Sectores Industriales", color: "purple" },
                  ].map((stat, index) => (
                    <div
                      key={index}
                      className="bg-white/80 dark:bg-gray-800/50 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-gray-200 dark:border-gray-700 hover:shadow-xl transition-all duration-300 hover:scale-105 text-center group"
                    >
                      <div
                        className={`text-3xl md:text-4xl font-bold mb-2 bg-clip-text text-transparent bg-gradient-to-r from-${stat.color}-500 to-${stat.color}-300 dark:from-${stat.color}-400 dark:to-${stat.color}-200 group-hover:scale-110 transition-transform duration-300`}
                      >
                        {stat.title}
                      </div>
                      <div className="text-gray-600 dark:text-gray-300 text-sm">{stat.subtitle}</div>
                    </div>
                  ))}
                </motion.div>

                <motion.div variants={itemVariants} className="flex justify-center space-x-6 mt-12">
                  <SocialButton
                    icon={<Github className="h-6 w-6" />}
                    href="https://github.com/aldairvillegas"
                    label="GitHub"
                    color="blue"
                  />
                  <SocialButton
                    icon={<Linkedin className="h-6 w-6" />}
                    href="https://linkedin.com/in/aldairvillegas"
                    label="LinkedIn"
                    color="indigo"
                  />
                  <SocialButton
                    icon={<Mail className="h-6 w-6" />}
                    href="mailto:fabri-19@outlook.com"
                    label="Email"
                    color="violet"
                  />
                </motion.div>

                <motion.div variants={itemVariants} className="flex justify-center mt-16">
                  <button
                    onClick={() => scrollToSection("about")}
                    className="text-gray-400 dark:text-gray-500 hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-300 animate-bounce"
                    aria-label="Desplazar hacia abajo"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-8 w-8"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M19 14l-7 7m0 0l-7-7m7 7V3"
                      />
                    </svg>
                  </button>
                </motion.div>
              </motion.div>
            </div>
          </section>

          {/* About Section */}
          <section id="about" className="py-20 bg-white/80 dark:bg-gray-800/30 backdrop-blur-sm">
            <div className="container mx-auto px-4">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.6 }}
                className="max-w-3xl mx-auto text-center mb-16"
              >
                <Badge className="mb-4 bg-blue-100 text-blue-800 dark:bg-blue-900/50 dark:text-blue-300 px-4 py-1.5 rounded-full text-sm font-medium">
                  Sobre Mí
                </Badge>
                <h2 className="text-3xl md:text-4xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-violet-600 dark:from-blue-400 dark:to-violet-400">
                  Mi Trayectoria y Experiencia
                </h2>
                <div className="w-20 h-1 bg-gradient-to-r from-blue-600 to-violet-600 dark:from-blue-400 dark:to-violet-400 mx-auto rounded-full"></div>
              </motion.div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
                <motion.div
                  initial={{ opacity: 0, x: -30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.6 }}
                >
                  <div className="relative">
                    <div className="relative z-10 rounded-2xl overflow-hidden border-4 border-white dark:border-gray-700 shadow-xl transform transition-transform hover:scale-[1.02] duration-500">
                      <img
                        src="/placeholder.svg?height=600&width=500"
                        alt="Aldair Villegas Mozo"
                        className="w-full h-auto"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300 flex items-end">
                        <div className="p-6">
                          <h3 className="text-white text-xl font-bold">Aldair Villegas Mozo</h3>
                          <p className="text-gray-200">Desarrollador Full Stack</p>
                        </div>
                      </div>
                    </div>
                    <div className="absolute top-0 right-0 -mt-4 -mr-4 bg-gradient-to-r from-blue-600 to-violet-600 dark:from-blue-500 dark:to-violet-500 text-white p-4 rounded-lg shadow-lg transform transition-transform hover:scale-105 duration-300">
                      <span className="block text-3xl font-bold">5+</span>
                      <span className="text-sm">Años de Experiencia</span>
                    </div>
                    <div className="absolute -bottom-4 -left-4 w-24 h-24 bg-blue-400/20 dark:bg-blue-600/20 rounded-full blur-2xl"></div>
                    <div className="absolute -top-4 -right-4 w-24 h-24 bg-violet-400/20 dark:bg-violet-600/20 rounded-full blur-2xl"></div>
                  </div>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, x: 30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.6 }}
                  className="space-y-6"
                >
                  <h3 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-violet-600 dark:from-blue-400 dark:to-violet-400">
                    Desarrollador Full Stack Apasionado
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                    Soy un programador junior dedicado con aspiraciones de sobresalir como desarrollador full stack. Mi
                    trayectoria en programación me ha equipado con un conjunto diverso de habilidades que abarcan bases
                    de datos, lenguajes de programación y frameworks.
                  </p>
                  <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                    Con una sólida base en tecnologías tanto de front-end como de back-end, estoy comprometido a crear
                    aplicaciones eficientes, escalables y amigables para el usuario. Estoy particularmente interesado en
                    construir soluciones innovadoras que aprovechen tecnologías de vanguardia para resolver problemas
                    del mundo real.
                  </p>

                  <div className="grid grid-cols-2 gap-4 pt-4">
                    {[
                      { icon: <Code size={16} />, text: "Resolución de Problemas" },
                      { icon: <Code size={16} />, text: "Código Limpio" },
                      { icon: <Code size={16} />, text: "Diseño de Bases de Datos" },
                      { icon: <Code size={16} />, text: "Principios de UI/UX" },
                      { icon: <Code size={16} />, text: "Desarrollo de APIs" },
                      { icon: <Code size={16} />, text: "Aprendizaje Continuo" },
                    ].map((item, index) => (
                      <div key={index} className="flex items-center space-x-2 group">
                        <div className="w-8 h-8 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center text-blue-600 dark:text-blue-400 group-hover:bg-blue-200 dark:group-hover:bg-blue-800/30 transition-colors duration-300">
                          {item.icon}
                        </div>
                        <span className="text-gray-700 dark:text-gray-200 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-300">
                          {item.text}
                        </span>
                      </div>
                    ))}
                  </div>

                  <Button className="bg-gradient-to-r from-blue-600 to-violet-600 hover:from-blue-700 hover:to-violet-700 text-white dark:from-blue-500 dark:to-violet-500 dark:hover:from-blue-600 dark:hover:to-violet-600 mt-4 rounded-full px-6">
                    <Download className="mr-2 h-4 w-4" />
                    <a href="/CV_Fabricio_VillegasMozo.pdf" download>
                        Descargar CV
                      </a>
                  </Button>
                </motion.div>
              </div>
            </div>
          </section>

          {/* Skills Section */}
          <section id="skills" className="py-20">
            <div className="container mx-auto px-4">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.6 }}
                className="max-w-3xl mx-auto text-center mb-16"
              >
                <Badge className="mb-4 bg-blue-100 text-blue-800 dark:bg-blue-900/50 dark:text-blue-300 px-4 py-1.5 rounded-full text-sm font-medium">
                  Mis Habilidades
                </Badge>
                <h2 className="text-3xl md:text-4xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-violet-600 dark:from-blue-400 dark:to-violet-400">
                  Experiencia Técnica
                </h2>
                <div className="w-20 h-1 bg-gradient-to-r from-blue-600 to-violet-600 dark:from-blue-400 dark:to-violet-400 mx-auto rounded-full"></div>
              </motion.div>

              <Tabs defaultValue="programming" className="max-w-4xl mx-auto">
                <TabsList className="grid grid-cols-3 mb-12 bg-blue-50 dark:bg-gray-800/50 p-1 rounded-full">
                  <TabsTrigger
                    value="programming"
                    className="rounded-full data-[state=active]:bg-white dark:data-[state=active]:bg-gray-700"
                  >
                    <Code className="mr-2 h-4 w-4" />
                    Programación
                  </TabsTrigger>
                  <TabsTrigger
                    value="databases"
                    className="rounded-full data-[state=active]:bg-white dark:data-[state=active]:bg-gray-700"
                  >
                    <Briefcase className="mr-2 h-4 w-4" />
                    Bases de Datos
                  </TabsTrigger>
                  <TabsTrigger
                    value="frameworks"
                    className="rounded-full data-[state=active]:bg-white dark:data-[state=active]:bg-gray-700"
                  >
                    <ExternalLink className="mr-2 h-4 w-4" />
                    Frameworks
                  </TabsTrigger>
                </TabsList>

                <TabsContent value="programming" className="space-y-8">
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.5 }}
                    className="space-y-6"
                  >
                    {[
                      { name: "Python", level: skillValues.python },
                      { name: "C#", level: skillValues.csharp },
                      { name: "JavaScript", level: skillValues.javascript },
                      { name: "HTML/CSS", level: skillValues.html },
                    ].map((skill, index) => (
                      <div
                        key={index}
                        className="bg-white dark:bg-gray-800 rounded-xl p-4 shadow-sm border border-gray-200 dark:border-gray-700"
                      >
                        <div className="flex justify-between items-center mb-2">
                          <span className="font-medium text-gray-700 dark:text-gray-200">{skill.name}</span>
                          <Badge
                            className={`${
                              skill.level === "Avanzado"
                                ? "bg-green-100 text-green-800 dark:bg-green-900/50 dark:text-green-300"
                                : skill.level === "Intermedio"
                                  ? "bg-blue-100 text-blue-800 dark:bg-blue-900/50 dark:text-blue-300"
                                  : "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/50 dark:text-yellow-300"
                            }`}
                          >
                            {skill.level}
                          </Badge>
                        </div>
                        <div className="h-2 bg-gray-200 dark:bg-gray-700 rounded-full">
                          <div
                            className={`h-full rounded-full transition-all duration-1000 ease-out ${
                              skill.level === "Avanzado"
                                ? "bg-gradient-to-r from-green-500 to-green-300 dark:from-green-600 dark:to-green-400 w-[85%]"
                                : skill.level === "Intermedio"
                                  ? "bg-gradient-to-r from-blue-500 to-blue-300 dark:from-blue-600 dark:to-blue-400 w-[65%]"
                                  : "bg-gradient-to-r from-yellow-500 to-yellow-300 dark:from-yellow-600 dark:to-yellow-400 w-[40%]"
                            }`}
                          ></div>
                        </div>
                      </div>
                    ))}
                  </motion.div>
                </TabsContent>

                <TabsContent value="databases" className="space-y-8">
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.5 }}
                    className="space-y-6"
                  >
                    {[
                      { name: "SQL", level: skillValues.sql },
                      { name: "MySQL", level: skillValues.mysql },
                      { name: "SQLite", level: skillValues.sqlite },
                    ].map((skill, index) => (
                      <div
                        key={index}
                        className="bg-white dark:bg-gray-800 rounded-xl p-4 shadow-sm border border-gray-200 dark:border-gray-700"
                      >
                        <div className="flex justify-between items-center mb-2">
                          <span className="font-medium text-gray-700 dark:text-gray-200">{skill.name}</span>
                          <Badge
                            className={`${
                              skill.level === "Avanzado"
                                ? "bg-green-100 text-green-800 dark:bg-green-900/50 dark:text-green-300"
                                : skill.level === "Intermedio"
                                  ? "bg-blue-100 text-blue-800 dark:bg-blue-900/50 dark:text-blue-300"
                                  : "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/50 dark:text-yellow-300"
                            }`}
                          >
                            {skill.level}
                          </Badge>
                        </div>
                        <div className="h-2 bg-gray-200 dark:bg-gray-700 rounded-full">
                          <div
                            className={`h-full rounded-full transition-all duration-1000 ease-out ${
                              skill.level === "Avanzado"
                                ? "bg-gradient-to-r from-green-500 to-green-300 dark:from-green-600 dark:to-green-400 w-[85%]"
                                : skill.level === "Intermedio"
                                  ? "bg-gradient-to-r from-blue-500 to-blue-300 dark:from-blue-600 dark:to-blue-400 w-[65%]"
                                  : "bg-gradient-to-r from-yellow-500 to-yellow-300 dark:from-yellow-600 dark:to-yellow-400 w-[40%]"
                            }`}
                          ></div>
                        </div>
                      </div>
                    ))}
                  </motion.div>
                </TabsContent>

                <TabsContent value="frameworks" className="space-y-8">
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.5 }}
                    className="space-y-6"
                  >
                    {[
                      { name: ".NET", level: skillValues.dotnet },
                      { name: "React", level: skillValues.react },
                      { name: "Bootstrap", level: skillValues.bootstrap },
                    ].map((skill, index) => (
                      <div
                        key={index}
                        className="bg-white dark:bg-gray-800 rounded-xl p-4 shadow-sm border border-gray-200 dark:border-gray-700"
                      >
                        <div className="flex justify-between items-center mb-2">
                          <span className="font-medium text-gray-700 dark:text-gray-200">{skill.name}</span>
                          <Badge
                            className={`${
                              skill.level === "Avanzado"
                                ? "bg-green-100 text-green-800 dark:bg-green-900/50 dark:text-green-300"
                                : skill.level === "Intermedio"
                                  ? "bg-blue-100 text-blue-800 dark:bg-blue-900/50 dark:text-blue-300"
                                  : "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/50 dark:text-yellow-300"
                            }`}
                          >
                            {skill.level}
                          </Badge>
                        </div>
                        <div className="h-2 bg-gray-200 dark:bg-gray-700 rounded-full">
                          <div
                            className={`h-full rounded-full transition-all duration-1000 ease-out ${
                              skill.level === "Avanzado"
                                ? "bg-gradient-to-r from-green-500 to-green-300 dark:from-green-600 dark:to-green-400 w-[85%]"
                                : skill.level === "Intermedio"
                                  ? "bg-gradient-to-r from-blue-500 to-blue-300 dark:from-blue-600 dark:to-blue-400 w-[65%]"
                                  : "bg-gradient-to-r from-yellow-500 to-yellow-300 dark:from-yellow-600 dark:to-yellow-400 w-[40%]"
                            }`}
                          ></div>
                        </div>
                      </div>
                    ))}
                  </motion.div>
                </TabsContent>
              </Tabs>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="flex flex-wrap justify-center gap-3 mt-16 max-w-4xl mx-auto"
              >
                {[
                  "Python",
                  "C#",
                  ".NET",
                  "HTML",
                  "CSS",
                  "JavaScript",
                  "SQL",
                  "MySQL",
                  "SQLite",
                  "React",
                  "Bootstrap",
                  "Git",
                  "APIs RESTful",
                  "VS Code",
                ].map((skill, index) => (
                  <Badge
                    key={index}
                    className="bg-blue-100 text-blue-800 dark:bg-blue-900/50 dark:text-blue-300 hover:bg-blue-200 dark:hover:bg-blue-800 px-4 py-1.5 rounded-full text-sm font-medium transition-all duration-300 hover:scale-105"
                  >
                    {skill}
                  </Badge>
                ))}
              </motion.div>
            </div>
          </section>

          {/* Projects Section */}
          <section id="projects" className="py-20 bg-white/80 dark:bg-gray-800/30 backdrop-blur-sm">
            <div className="container mx-auto px-4">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.6 }}
                className="max-w-3xl mx-auto text-center mb-16"
              >
                <Badge className="mb-4 bg-blue-100 text-blue-800 dark:bg-blue-900/50 dark:text-blue-300 px-4 py-1.5 rounded-full text-sm font-medium">
                  Mi Trabajo
                </Badge>
                <h2 className="text-3xl md:text-4xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-violet-600 dark:from-blue-400 dark:to-violet-400">
                  Proyectos Destacados
                </h2>
                <div className="w-20 h-1 bg-gradient-to-r from-blue-600 to-violet-600 dark:from-blue-400 dark:to-violet-400 mx-auto rounded-full"></div>
              </motion.div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[
                  {
                    title: "Pagina web para una Reconocida Barberia",
                    description:
                      "Una estrategia para aumentar la visibilidad para una barbería reconocida, fortaleciendo su presencia en redes sociales.",
                    image: "/maffia18.png?height=200&width=300",
                    tags: ["HTML", "CSS", "Bootstrap"],
                    delay: 0.1,
                    demoUrl: "https://litc0d3.github.io/maffia18/",
                    codeUrl: "https://github.com/LitC0d3/maffia18",
                  },
                  {
                    title: "App de Streaming con Kotlin",
                    description:
                      "Una aplicación de streaming para ver peliculas y series hecho con kotlin desarrollado en colaboracion para un proyecto grupal implementando una solucion.",
                      image: "/Stream.jpg?height=200&width=300",
                      tags: ["Kotlin", "API", "SQLite", "LocalStorage"],
                    delay: 0.2,
                    demoUrl: "https://github.com/LitC0d3/Stream",
                    codeUrl: "https://github.com/LitC0d3/Stream",
                  },
                  {
                    title: "Creacion de Documentacion con Docusaurus",
                    description:
                      "Una documentacion pedida a practica en empresa para la documentacion de errores en un sistema de tienda virtual.",
                    image: "/Docusaurus.png?height=200&width=300",
                    tags: ["MarkDown", "SQL", "Visualización de Datos"],
                    delay: 0.3,
                    demoUrl: "https://litc0d3.github.io/Docusaurus-Buho/",
                    codeUrl: "https://github.com/LitC0d3/Docusaurus-Buho",
                  },
                ].map((project, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.6, delay: project.delay }}
                  >
                    <Card className="overflow-hidden border-gray-200 dark:border-gray-700 bg-white/90 dark:bg-gray-800/50 backdrop-blur-sm hover:shadow-xl transition-all duration-500 hover:scale-[1.02] group">
                      <div className="relative overflow-hidden h-48">
                        <img
                          src={project.image || "/placeholder.svg"}
                          alt={project.title}
                          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-end">
                          <div className="p-6">
                            <h3 className="text-white text-xl font-bold">{project.title}</h3>
                            <div className="flex flex-wrap gap-2 mt-2">
                              {project.tags.map((tag, tagIndex) => (
                                <Badge key={tagIndex} className="bg-white/20 text-white hover:bg-white/30">
                                  {tag}
                                </Badge>
                              ))}
                            </div>
                          </div>
                        </div>
                      </div>

                      <CardContent className="p-6">
                        <h3 className="text-xl font-bold mb-2 bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-violet-600 dark:from-blue-400 dark:to-violet-400 group-hover:from-violet-600 group-hover:to-blue-600 dark:group-hover:from-violet-400 dark:group-hover:to-blue-400 transition-all duration-500">
                          {project.title}
                        </h3>

                        <p className="text-gray-600 dark:text-gray-300 mb-6 text-sm">{project.description}</p>

                        <div className="flex space-x-3">
                          <Button
                            variant="outline"
                            size="sm"
                            className="border-blue-200 text-blue-600 hover:bg-blue-50 dark:border-blue-800 dark:text-blue-400 dark:hover:bg-blue-900/50 flex-1 rounded-full group-hover:bg-blue-600 group-hover:text-white dark:group-hover:bg-blue-500 transition-all duration-300"
                            asChild
                          >
                            <a
                              href={project.demoUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              aria-label={`Ver demo en vivo de ${project.title}`}
                            >
                              <ExternalLink className="mr-2 h-4 w-4" />
                              Demo en Vivo
                            </a>
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            className="border-gray-200 text-gray-600 hover:bg-gray-50 dark:border-gray-700 dark:text-gray-300 dark:hover:bg-gray-800/50 flex-1 rounded-full group-hover:bg-gray-800 group-hover:text-white dark:group-hover:bg-gray-700 transition-all duration-300"
                            asChild
                          >
                            <a
                              href={project.codeUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              aria-label={`Ver código de ${project.title}`}
                            >
                              <Github className="mr-2 h-4 w-4" />
                              Código
                            </a>
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </div>

              <div className="text-center mt-12">
                <Button className="bg-gradient-to-r from-blue-600 to-violet-600 hover:from-blue-700 hover:to-violet-700 text-white dark:from-blue-500 dark:to-violet-500 dark:hover:from-blue-600 dark:hover:to-violet-600 rounded-full px-8 py-6 text-lg font-medium">
                  Ver Todos los Proyectos
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </div>
            </div>
          </section>

          {/* Connect Section (Replaced Contact Form) */}
          <section id="connect" className="py-20">
            <div className="container mx-auto px-4">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.6 }}
                className="max-w-3xl mx-auto text-center mb-16"
              >
                <Badge className="mb-4 bg-blue-100 text-blue-800 dark:bg-blue-900/50 dark:text-blue-300 px-4 py-1.5 rounded-full text-sm font-medium">
                  Conecta Conmigo
                </Badge>
                <h2 className="text-3xl md:text-4xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-violet-600 dark:from-blue-400 dark:to-violet-400">
                  Pongámonos en Contacto
                </h2>
                <div className="w-20 h-1 bg-gradient-to-r from-blue-600 to-violet-600 dark:from-blue-400 dark:to-violet-400 mx-auto rounded-full"></div>
              </motion.div>

              <div className="max-w-4xl mx-auto">
                <Card className="border-gray-200 dark:border-gray-700 bg-white/90 dark:bg-gray-800/50 backdrop-blur-sm shadow-xl overflow-hidden">
                  <CardContent className="p-0">
                    <div className="p-8 md:p-12 text-center">
                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5 }}
                      >
                        <h3 className="text-2xl md:text-3xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-violet-600 dark:from-blue-400 dark:to-violet-400">
                          Siempre estoy abierto a nuevas oportunidades
                        </h3>
                        <p className="text-gray-600 dark:text-gray-300 mb-8 max-w-2xl mx-auto">
                          Ya sea que estés buscando un desarrollador para tu próximo proyecto, tengas una pregunta o
                          simplemente quieras conectar, me encantaría saber de ti. Contáctame a través de cualquiera de
                          las plataformas a continuación.
                        </p>
                      </motion.div>

                      <motion.div
                        className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-3xl mx-auto"
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                      >
                        <a
                          href="https://github.com/LitC0d3"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="group"
                        >
                          <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 h-full flex flex-col items-center justify-center">
                            <div className="w-16 h-16 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center mb-4 group-hover:bg-blue-600 dark:group-hover:bg-blue-700 transition-colors duration-300">
                              <Github className="h-8 w-8 text-blue-600 dark:text-blue-400 group-hover:text-white transition-colors duration-300" />
                            </div>
                            <h4 className="text-xl font-bold text-gray-900 dark:text-white mb-2">GitHub</h4>
                            <p className="text-gray-500 dark:text-gray-400 text-sm mb-4">
                              Revisa mis repositorios de código
                            </p>
                            <span className="text-blue-600 dark:text-blue-400 font-medium flex items-center group-hover:underline">
                              Ver Perfil
                              <ArrowRight className="ml-1 h-4 w-4 group-hover:translate-x-1 transition-transform duration-300" />
                            </span>
                          </div>
                        </a>

                        <a
                          href="https://linkedin.com/in/aldairvillegas"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="group"
                        >
                          <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 h-full flex flex-col items-center justify-center">
                            <div className="w-16 h-16 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center mb-4 group-hover:bg-blue-600 dark:group-hover:bg-blue-700 transition-colors duration-300">
                              <Linkedin className="h-8 w-8 text-blue-600 dark:text-blue-400 group-hover:text-white transition-colors duration-300" />
                            </div>
                            <h4 className="text-xl font-bold text-gray-900 dark:text-white mb-2">LinkedIn</h4>
                            <p className="text-gray-500 dark:text-gray-400 text-sm mb-4">
                              Conecta conmigo profesionalmente
                            </p>
                            <span className="text-blue-600 dark:text-blue-400 font-medium flex items-center group-hover:underline">
                              Conectar
                              <ArrowRight className="ml-1 h-4 w-4 group-hover:translate-x-1 transition-transform duration-300" />
                            </span>
                          </div>
                        </a>

                        <a href="mailto:fabri-19@outlook.com" className="group">
                          <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 h-full flex flex-col items-center justify-center">
                            <div className="w-16 h-16 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center mb-4 group-hover:bg-blue-600 dark:group-hover:bg-blue-700 transition-colors duration-300">
                              <Mail className="h-8 w-8 text-blue-600 dark:text-blue-400 group-hover:text-white transition-colors duration-300" />
                            </div>
                            <h4 className="text-xl font-bold text-gray-900 dark:text-white mb-2">Email</h4>
                            <p className="text-gray-500 dark:text-gray-400 text-sm mb-4">
                              Envíame un mensaje directamente
                            </p>
                            <span className="text-blue-600 dark:text-blue-400 font-medium flex items-center group-hover:underline">
                              Enviar Email
                              <ArrowRight className="ml-1 h-4 w-4 group-hover:translate-x-1 transition-transform duration-300" />
                            </span>
                          </div>
                        </a>
                      </motion.div>

                      <motion.div
                        className="mt-12"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: 0.4 }}
                      >
                        <Button className="bg-gradient-to-r from-blue-600 to-violet-600 hover:from-blue-700 hover:to-violet-700 text-white dark:from-blue-500 dark:to-violet-500 dark:hover:from-blue-600 dark:hover:to-violet-600 rounded-full px-8 py-6 text-lg font-medium">
                          <Download className="mr-2 h-5 w-5" />
                          <a href="/CV_Fabricio_VillegasMozo.pdf" download>
                        Descargar Mi  CV
                      </a>
                        </Button>
                      </motion.div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </section>
        </main>

        {/* Footer */}
        <footer className="bg-white/80 dark:bg-gray-800/30 backdrop-blur-sm py-12 border-t border-gray-200 dark:border-gray-700">
          <div className="container mx-auto px-4 text-center">
            <div className="text-xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-violet-600 dark:from-blue-400 dark:to-violet-400">
              Aldair Villegas Mozo
            </div>

            <div className="flex justify-center space-x-6 mb-8">
              <SocialButton
                icon={<Github className="h-5 w-5" />}
                href="https://github.com/LitC0d3"
                label="GitHub"
                color="blue"
              />
              <SocialButton
                icon={<Linkedin className="h-5 w-5" />}
                href="https://linkedin.com/in/aldairvillegas"
                label="LinkedIn"
                color="indigo"
              />
              <SocialButton
                icon={<Mail className="h-5 w-5" />}
                href="mailto:fabri-19@outlook.com"
                label="Email"
                color="violet"
              />
            </div>

            <p className="text-gray-600 dark:text-gray-400">
              © {new Date().getFullYear()} Aldair Villegas Mozo. Todos los derechos reservados.
            </p>
            <p className="text-gray-500 dark:text-gray-500 text-sm mt-2">Desarrollado con Next.js y Tailwind CSS</p>
          </div>
        </footer>
      </div>
    </>
  )
}

