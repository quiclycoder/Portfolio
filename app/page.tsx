"use client"

import { Menu, X, ExternalLink, Linkedin, Mail, ChevronDown, Check, Phone } from "lucide-react"
import { useState, useEffect, useRef } from "react"
import Link from "next/link"

function useInView() {
  const ref = useRef(null)
  const [isInView, setIsInView] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true)
          observer.unobserve(entry.target)
        }
      },
      { threshold: 0.1 },
    )

    if (ref.current) {
      observer.observe(ref.current)
    }

    return () => observer.disconnect()
  }, [])

  return [ref, isInView]
}

export default function Portfolio() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [activeSection, setActiveSection] = useState("about")
  const [isScrolled, setIsScrolled] = useState(false)
  const [copiedPhone, setCopiedPhone] = useState(false)

  const heroRef = useRef(null)
  const aboutRef = useRef(null)
  const experienceRef = useRef(null)
  const projectsRef = useRef(null)
  const skillsRef = useRef(null)

  const [heroInView, setHeroInView] = useState(true)
  const [aboutInView, setAboutInView] = useState(false)
  const [experienceInView, setExperienceInView] = useState(false)
  const [projectsInView, setProjectsInView] = useState(false)
  const [skillsInView, setSkillsInView] = useState(false)

  useEffect(() => {
    const observerOptions = { threshold: 0.1 }

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.target === aboutRef.current) setAboutInView(entry.isIntersecting)
        if (entry.target === experienceRef.current) setExperienceInView(entry.isIntersecting)
        if (entry.target === projectsRef.current) setProjectsInView(entry.isIntersecting)
        if (entry.target === skillsRef.current) setSkillsInView(entry.isIntersecting)
      })
    }, observerOptions)
      ;[aboutRef, experienceRef, projectsRef, skillsRef].forEach((ref) => {
        if (ref.current) observer.observe(ref.current)
      })

    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const scrollToSection = (id: string) => {
    setActiveSection(id)
    setIsMenuOpen(false)
    const element = document.getElementById(id)
    element?.scrollIntoView({ behavior: "smooth" })
  }

  const handleCopyPhone = () => {
    navigator.clipboard.writeText("+212 7 78 01 43 97")
    setCopiedPhone(true)
    setTimeout(() => setCopiedPhone(false), 2000)
  }

  const experiences = [
    {
      company: "Commission Nationale de la Protection des Données Personnelles (CNDP)",
      position: "Chargé de mission Data Scientist & Développeur Full Stack",
      period: "Mai 2025 – Présent",
      tasks: [
        "Automatisation de pipelines de données (SQL avancé, Python, Excel) pour extraction, traitement et reporting sous Oracle APEX",
        "Audit fonctionnel et technique de Chafafiya 2.0 (Next.js, NestJS, TypeORM, MSSQL)",
        "Mise en place de la documentation technique et knowledge management avec Wiki.js",
        "Conception et développement d’un module RH sur Odoo (paramétrage et adaptation métier)",
        "Développement d’une application de gestion des pôles (Next.js, Node.js, MySQL) avec reporting automatisé",
      ],
    },
    {
      company: "Auto-entrepreneur",
      position: "Développeur Full Stack – Projet BeActive",
      period: "Fév 2025 – Juin 2025",
      tasks: [
        "Conception et développement d’une application mobile React Native avec API Node.js et Firebase",
        "Implémentation de l’authentification, gestion des abonnements et intégration paiement",
        "Gestion d’équipes, planification de matchs et synchronisation temps réel",
        "Structuration du back-end Node.js et sécurisation Firebase (rôles et règles)",
      ],
    },
    {
      company: "Kshuttle (France)",
      position: "Stagiaire Développeur Full Stack",
      period: "Avr 2024 – Sep 2024",
      tasks: [
        "Maintenance et évolution de l’application Lease Insight conforme IFRS 16",
        "Développement Java et industrialisation via Docker",
        "Optimisation des traitements OLAP pour analyses financières",
        "Améliorations UI via CSS, JEXL et outils Shuttle",
      ],
    },
    {
      company: "Cabinet topographique – Ahaouari",
      position: "Stagiaire Développeur Full Stack Web & Mobile",
      period: "Juin 2023 – Août 2023",
      tasks: [
        "Développement application web React.js avec back-end Express.js (API REST)",
        "Développement mobile React Native avec Firebase",
        "Ajout de fonctionnalités de suivi et reporting",
      ],
    },
    {
      company: "IsyChain",
      position: "Stagiaire Développeur Full Stack Blockchain",
      period: "Jan 2022 – Août 2022",
      tasks: [
        "Conception et développement de IsySend, messagerie sécurisée basée sur la blockchain",
        "Développement de smart contracts pour chiffrement et déchiffrement",
        "Interface web React.js avec Framer Motion",
      ],
    },
  ]

  const projects = [
    {
      name: "BeActive",
      description:
        "Application mobile de gestion d’équipes sportives, abonnements, paiements et planification de matchs",
      tech: ["React Native", "Node.js", "Firebase"],
      link: "#",
    },
    {
      name: "IsySend",
      description:
        "Système de messagerie sécurisée basé sur la blockchain garantissant confidentialité et intégrité",
      tech: ["React.js", "Blockchain", "Smart Contracts", "Framer Motion"],
      link: "#",
    },
    {
      name: "Lease Insight",
      description:
        "Application financière conforme IFRS 16 avec analyses OLAP et industrialisation Docker",
      tech: ["Java", "Docker", "OLAP"],
      link: "#",
    },
    {
      name: "Chafafiya 2.0",
      description:
        "Portail national d’accès à l’information – audit technique et fonctionnel complet",
      tech: ["Next.js", "NestJS", "TypeORM", "MSSQL"],
      link: "#",
    },
  ]

  const skills = {
    "Data & Reporting": ["Python", "SQL avancé", "Excel", "Power BI"],
    "Web Development": ["HTML", "JavaScript", "CSS", "React.js", "Node.js", "Express", ".NET", "JEE"],
    Programming: ["C/C++", "Java", "Python", "TypeScript"],
    "Data & Analytics": ["Power BI", "Hadoop", "Talend", "SQL"],
    Databases: ["SQL", "MySQL", "PostgreSQL", "PL/SQL", "Firebase"],
    "Cloud & DevOps": ["Azure", "Docker", "Cloud Foundations", "Agile"],
    Blockchain: ["Smart Contracts", "Blockchain Basics", "Cryptography"],
  }

  return (
    <div className="bg-background text-foreground min-h-screen">
      {/* Navigation */}
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? "bg-background/95 backdrop-blur border-b border-border" : "bg-transparent"}`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Link
              href="#"
              className="text-2xl font-bold bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent"
            >
              TB
            </Link>

            {/* Desktop Menu */}
            <div className="hidden md:flex gap-8">
              {["about", "experience", "projects", "skills"].map((item) => (
                <button
                  key={item}
                  onClick={() => scrollToSection(item)}
                  className={`capitalize transition-colors ${activeSection === item ? "text-secondary font-semibold" : "text-foreground/70 hover:text-foreground"}`}
                >
                  {item}
                </button>
              ))}
            </div>

            {/* Mobile Menu Button */}
            <button className="md:hidden p-2 hover:bg-muted rounded-lg" onClick={() => setIsMenuOpen(!isMenuOpen)}>
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>

          {/* Mobile Menu */}
          {isMenuOpen && (
            <div className="md:hidden pb-4 border-t border-border">
              {["about", "experience", "projects", "skills"].map((item) => (
                <button
                  key={item}
                  onClick={() => scrollToSection(item)}
                  className="block w-full text-left py-2 px-2 capitalize hover:bg-muted rounded transition-colors text-foreground"
                >
                  {item}
                </button>
              ))}
            </div>
          )}
        </div>
      </nav>

      {/* Hero Section */}
      <section ref={heroRef} className="pt-32 pb-20 px-4 sm:px-6 lg:px-8 shadow-xl overflow-hidden">
        <div className="max-w-6xl mx-auto flex flex-col lg:flex-row gap-8 lg:gap-12 items-center">
          {/* Profile Image */}
          <div className="flex-shrink-0 w-full lg:w-auto lg:order-1">
            <div
              className={`relative w-64 h-80 mx-auto lg:mx-0 transition-all duration-1000 ${heroInView ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-12"
                }`}
            >
              <img
                src="/profile.png"
                alt="Taher Bellout"
                className="w-full h-full object-cover rounded-2xl shadow-2xl border-4 border-secondary/30"
              />
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-t from-secondary/10 to-transparent pointer-events-none"></div>
            </div>
          </div>

          {/* Content */}
          <div
            className={`flex-1 text-center lg:text-left lg:order-2 transition-all duration-1000 ${heroInView ? "opacity-100 translate-x-0" : "opacity-0 translate-x-12"
              }`}
          >
            <div className="mb-8">
              <h1 className="text-5xl md:text-6xl font-bold mb-4 text-balance text-foreground">Taher Bellout</h1>
              <p className="text-xl md:text-2xl text-secondary font-semibold mb-4">Data Scientist & Développeur Full Stack</p>
              <p className="text-lg text-foreground/75 max-w-2xl text-pretty">
                Profil hybride Full Stack & Data : automatisation, reporting, audit applicatif et développement d’applications web et mobiles jusqu’à la mise en production.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row flex-wrap gap-4 pt-8 border-t border-border justify-center lg:justify-start">
              <a
                href="mailto:taher.bellout30@gmail.com"
                className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-primary-foreground rounded-lg hover:opacity-90 transition-opacity font-medium"
              >
                <Mail size={20} /> Me contacter
              </a>
              <a
                href="https://www.linkedin.com/in/taher-bellout/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3 border border-border text-foreground hover:bg-muted rounded-lg transition-colors"
              >
                <Linkedin size={20} /> LinkedIn
              </a>
              <button
                onClick={handleCopyPhone}
                className="inline-flex items-center gap-2 px-6 py-3 border border-secondary text-secondary hover:bg-secondary/10 rounded-lg transition-colors font-medium"
              >
                {copiedPhone ? (
                  <>
                    <Check size={20} /> Copié!
                  </>
                ) : (
                  <>
                    <Phone size={20} /> Copier
                  </>
                )}
              </button>
            </div>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-border text-center">
          <button
            onClick={() => scrollToSection("experience")}
            className="inline-flex items-center gap-2 text-secondary hover:text-accent transition-colors animate-bounce"
          >
            Découvrir mon travail <ChevronDown size={20} />
          </button>
        </div>
      </section>

      {/* About Section */}
      <section id="about" ref={aboutRef} className="py-20 px-4 sm:px-6 lg:px-8 border-t border-border">
        <div className="max-w-4xl mx-auto">
          <h2
            className={`text-4xl font-bold mb-8 text-foreground transition-all duration-1000 ${aboutInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
              }`}
          >
            À propos
          </h2>
          <div className="grid md:grid-cols-2 gap-12">
            <div
              className={`transition-all duration-1000 delay-100 ${aboutInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
                }`}
            >
              <p className="text-foreground/75 leading-relaxed mb-4">
                Je suis un développeur ingénieur Full Stack passionné par la création de solutions technologiques
                innovantes. Ma formation à l'École Marocaine des Sciences de l'Ingénieur (EMSI) m'a fourni une base
                solide en génie informatique, spécialisée dans les méthodes informatiques appliquées à la gestion
                d'entreprise.
              </p>
              <p className="text-foreground/75 leading-relaxed">
                Mon parcours me permet de combiner expertise technique et compréhension des enjeux métier pour
                développer des applications performantes et scalables.
              </p>
            </div>
            <div
              className={`bg-muted/40 p-8 rounded-lg border border-border transition-all duration-1000 delay-200 ${aboutInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
                }`}
            >
              <h3 className="font-semibold text-lg mb-4 text-foreground">Formation</h3>
              <div className="space-y-4">
                <div>
                  <p className="font-medium text-foreground">Élève ingénieur en génie informatique</p>
                  <p className="text-sm text-foreground/60">EMSI - Mention Bien (2024)</p>
                </div>
                <div>
                  <p className="font-medium text-foreground">Classes Préparatoires - Option informatique</p>
                  <p className="text-sm text-foreground/60">EMSI (2021)</p>
                </div>
                <div>
                  <p className="font-medium text-foreground">Baccalauréat Scientifique</p>
                  <p className="text-sm text-foreground/60">
                    Option Sciences Physique - Lycée Institut de Rabat (2019)
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Experience Section */}
      <section id="experience" ref={experienceRef} className="py-20 px-4 sm:px-6 lg:px-8 bg-muted/10">
        <div className="max-w-4xl mx-auto">
          <h2
            className={`text-4xl font-bold mb-12 text-foreground transition-all duration-1000 ${experienceInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
              }`}
          >
            Expérience
          </h2>
          <div className="space-y-8">
            {experiences.map((exp, idx) => (
              <div
                key={idx}
                className={`border-l-2 border-secondary pl-8 pb-8 transition-all duration-1000 ${experienceInView ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-8"
                  }`}
                style={{ transitionDelay: `${idx * 100}ms` }}
              >
                <div className="absolute -left-2.5 w-5 h-5 bg-secondary rounded-full"></div>
                <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-2 mb-2">
                  <div>
                    <h3 className="text-xl font-bold text-foreground">{exp.position}</h3>
                    <p className="text-secondary font-medium">{exp.company}</p>
                  </div>
                  <span className="text-sm text-foreground/60 whitespace-nowrap">{exp.period}</span>
                </div>
                <ul className="mt-4 space-y-2">
                  {exp.tasks.map((task, i) => (
                    <li key={i} className="text-foreground/75 flex gap-2">
                      <span className="text-secondary mt-1">•</span>
                      <span>{task}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" ref={projectsRef} className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <h2
            className={`text-4xl font-bold mb-12 text-foreground transition-all duration-1000 ${projectsInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
              }`}
          >
            Projets
          </h2>
          <div className="grid md:grid-cols-2 gap-6">
            {projects.map((project, idx) => (
              <div
                key={idx}
                className={`border border-border rounded-lg p-6 hover:border-secondary hover:shadow-lg transition-all duration-300 group bg-card ${projectsInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
                  }`}
                style={{ transitionDelay: `${idx * 100}ms` }}
              >
                <div className="flex justify-between items-start mb-4">
                  <h3 className="text-xl font-bold group-hover:text-secondary transition-colors text-foreground">
                    {project.name}
                  </h3>
                  <ExternalLink size={20} className="text-foreground/40 group-hover:text-secondary transition-colors" />
                </div>
                <p className="text-foreground/70 mb-4">{project.description}</p>
                <div className="flex flex-wrap gap-2">
                  {project.tech.map((tech, i) => (
                    <span
                      key={i}
                      className="px-3 py-1 bg-secondary/15 text-secondary text-sm rounded-full border border-secondary/30"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section id="skills" ref={skillsRef} className="py-20 px-4 sm:px-6 lg:px-8 bg-muted/10">
        <div className="max-w-4xl mx-auto">
          <h2
            className={`text-4xl font-bold mb-12 text-foreground transition-all duration-1000 ${skillsInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
              }`}
          >
            Compétences
          </h2>
          <div className="grid md:grid-cols-2 gap-8">
            {Object.entries(skills).map(([category, items], categoryIdx) => (
              <div
                key={category}
                className={`transition-all duration-1000 ${skillsInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
                  }`}
                style={{ transitionDelay: `${categoryIdx * 100}ms` }}
              >
                <h3 className="text-lg font-semibold mb-4 text-secondary">{category}</h3>
                <div className="flex flex-wrap gap-2">
                  {items.map((skill, idx) => (
                    <span
                      key={idx}
                      className="px-4 py-2 bg-primary/12 text-primary border border-primary/25 rounded-lg text-sm hover:bg-primary/20 transition-all hover:scale-105 cursor-default"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 border-t border-border">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-4xl font-bold mb-6 text-foreground">Parlons de votre projet</h2>
          <p className="text-lg text-foreground/75 mb-8">
            Je serais ravi de discuter de vos besoins et explorer comment je peux vous aider à réaliser vos objectifs
            technologiques.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <a
              href="mailto:taher.bellout30@gmail.com"
              className="inline-flex items-center gap-2 px-8 py-3 bg-primary text-primary-foreground rounded-lg hover:opacity-90 transition-opacity font-medium"
            >
              <Mail size={20} /> M'envoyer un email
            </a>
            <a
              href="tel:+212778014397"
              className="inline-flex items-center gap-2 px-8 py-3 border border-border text-foreground hover:bg-muted rounded-lg transition-colors"
            >
              +212 7 78 01 43 97
            </a>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 px-4 sm:px-6 lg:px-8 border-t border-border bg-muted/10">
        <div className="max-w-4xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-foreground/60">
          <p>© 2025 Taher Bellout. Tous droits réservés.</p>
          <div className="flex gap-4">
            <a
              href="https://www.linkedin.com/in/taher-bellout/"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-foreground transition-colors"
            >
              <Linkedin size={20} />
            </a>
            <a href="mailto:taher.bellout30@gmail.com" className="hover:text-foreground transition-colors">
              <Mail size={20} />
            </a>
          </div>
        </div>
      </footer>
    </div>
  )
}
