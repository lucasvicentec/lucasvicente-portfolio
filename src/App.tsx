import { lazy, Suspense, useMemo, useState } from "react";
import {
  ArrowRight,
  ArrowUpRight,
  BriefcaseBusiness,
  CircleHelp,
  Github,
  Linkedin,
  Mail,
  ShieldCheck,
} from "lucide-react";
import {
  SiDocker,
  SiGithubactions,
  SiJavascript,
  SiLinux,
  SiNginx,
  SiPostgresql,
  SiPython,
  SiReact,
  SiRedis,
  SiSqlite,
  SiTailwindcss,
  SiTypescript,
  SiVite,
} from "react-icons/si";

const InteractiveNebulaShader = lazy(() =>
  import("@/components/ui/liquid-shader").then((module) => ({ default: module.InteractiveNebulaShader })),
);

type Locale = "es" | "en";

type Project = {
  title: string;
  tag: string;
  type: string;
  headline: string;
  challenge: string;
  architecture: string;
  impact: string;
  stack: string;
  repo?: string;
  live?: string;
};

const projectsByLocale: Record<Locale, Project[]> = {
  es: [
    {
      title: "StackWatch",
      tag: "Nuevo",
      type: "Plataforma de monitorizacion",
      headline: "Pagina publica de estado + panel admin privado + ciclo de incidentes para monitorizacion VPS.",
      challenge:
        "Construir un monitor autohospedado facil de operar pero listo para produccion: auth, rate-limit, metricas historicas y checks fiables.",
      architecture:
        "Aplicacion Next.js con superficies publica/admin, persistencia en PostgreSQL, check runner interno y worker para checks periodicos con logica de apertura/cierre de incidentes.",
      impact: "Convierte la salud de infraestructura en una superficie clara de producto con estado en tiempo real e historico.",
      stack: "Next.js 16, TypeScript, PostgreSQL, Docker, Docker Swarm",
      repo: "https://github.com/lucksgg7/stackwatch",
      live: "https://status.lucasvicente.es/",
    },
    {
      title: "MD-Ingelligence",
      tag: "Privado",
      type: "MadridDigital / Herramienta interna",
      headline: "Plataforma interna UTS-MD para busqueda de ubicaciones tecnicas (UT) y aceleracion de consultas operativas.",
      challenge:
        "Gestionar datasets UT grandes y heterogeneos con ranking por relevancia, filtros y respuesta rapida para uso operativo diario.",
      architecture:
        "Next.js 15 + React 19 + TypeScript, API routes sobre runtime Node, PostgreSQL con fallback local JSON, panel admin con analitica/feedback y routing LLM opcional para ATUSUDOC.",
      impact:
        "Centraliza criterios operativos, reduce friccion en busquedas manuales y crea base escalable para analitica, feedback y flujos internos de automatizacion.",
      stack: "Next.js 15, React 19, TypeScript, Tailwind, PostgreSQL, Node API Routes",
    },
    {
      title: "Hytalia Web",
      tag: "Produccion",
      type: "Plataforma de comunidad / Infra",
      headline: "Frontend principal de Hytalia Network con auth, panel admin, leaderboards, tienda y modulos de comunidad.",
      challenge: "Sostener entrega continua de funcionalidades mientras se migra codigo legado hacia un modelo unificado de API interna.",
      architecture:
        "Next.js App Router + NextAuth (Discord), arquitectura transicional mixta (api-internal + rutas legacy a DB), despliegue con Docker/GHCR/Swarm.",
      impact: "Permite evolucion continua de producto en produccion con modulos reutilizables e infraestructura lista para despliegue.",
      stack: "Next.js 14, React 18, TypeScript, Tailwind, NextAuth, Docker Swarm",
      live: "https://www.hytalia.net",
    },
    {
      title: "Hytale Plugin Journey",
      tag: "Activo",
      type: "Servidor de juego / Ecosistema Java",
      headline: "Suite amplia de plugins para operacion de servidores Hytale, sistemas de jugabilidad y herramientas.",
      challenge: "Coordinar muchos modulos y ciclos rapidos de iteracion entre gameplay, conectores de infra y plugins operativos.",
      architecture:
        "Ecosistema de plugins Java estilo monorepo con pipelines de build en Gradle, workflows de CI y commons compartidos para funcionalidades reutilizables.",
      impact: "Permite entrega rapida de features y mantenimiento continuo en un entorno multijugador en crecimiento.",
      stack: "Java 21, Gradle, GitHub Actions, Hytale Plugin APIs",
      repo: "https://github.com/HytaliaNetwork/hytale-plugin-journey",
      live: "https://www.hytalia.net",
    },
  ],
  en: [
    {
      title: "StackWatch",
      tag: "New",
      type: "Monitoring platform",
      headline: "Public status page + private admin panel + incident lifecycle for VPS monitoring.",
      challenge:
        "Build a self-hosted monitor that is easy to operate but still production ready: auth, rate limiting, historical metrics, and reliable checks.",
      architecture:
        "Next.js application with public/admin surfaces, PostgreSQL persistence, internal check runner, and worker loop for periodic checks and incident open/close logic.",
      impact: "Turns infrastructure health into a clear product surface with real-time and historical status.",
      stack: "Next.js 16, TypeScript, PostgreSQL, Docker, Docker Swarm",
      repo: "https://github.com/lucksgg7/stackwatch",
      live: "https://status.lucasvicente.es/",
    },
    {
      title: "MD-Ingelligence",
      tag: "Private",
      type: "MadridDigital / Internal tooling",
      headline: "Internal UTS-MD platform for technical location (UT) search and faster operational queries.",
      challenge:
        "Handle large heterogeneous UT datasets with relevance ranking, filters, and low-latency responses for daily operational usage.",
      architecture:
        "Next.js 15 + React 19 + TypeScript, Node runtime API routes, PostgreSQL with local JSON fallback, admin analytics/feedback panel, and optional LLM routing for ATUSUDOC.",
      impact:
        "Centralizes operational criteria, reduces manual lookup friction, and provides a scalable base for analytics, feedback, and internal automation flows.",
      stack: "Next.js 15, React 19, TypeScript, Tailwind, PostgreSQL, Node API Routes",
    },
    {
      title: "Hytalia Web",
      tag: "Production",
      type: "Community platform / Infra",
      headline: "Main frontend for Hytalia Network with auth, admin panel, leaderboards, store, and community modules.",
      challenge:
        "Sustain continuous feature delivery while migrating legacy paths toward a unified internal API model.",
      architecture:
        "Next.js App Router + NextAuth (Discord), mixed transitional architecture (api-internal + legacy DB paths), deployed with Docker/GHCR/Swarm.",
      impact: "Enables continuous product evolution in production with reusable modules and deployment-ready infrastructure.",
      stack: "Next.js 14, React 18, TypeScript, Tailwind, NextAuth, Docker Swarm",
      live: "https://www.hytalia.net",
    },
    {
      title: "Hytale Plugin Journey",
      tag: "Active",
      type: "Game server / Java ecosystem",
      headline: "Large plugin suite for Hytale server operations, gameplay systems, and tooling.",
      challenge:
        "Coordinate many modules and fast iteration cycles across gameplay, infra connectors, and operational plugins.",
      architecture:
        "Java plugin ecosystem in a monorepo-style structure with Gradle build pipelines, CI workflows, and shared commons for reusable server features.",
      impact: "Enables fast feature delivery and continuous maintenance for a growing multiplayer environment.",
      stack: "Java 21, Gradle, GitHub Actions, Hytale Plugin APIs",
      repo: "https://github.com/HytaliaNetwork/hytale-plugin-journey",
      live: "https://www.hytalia.net",
    },
  ],
};

const stackByCategory = [
  {
    category: "Frontend",
    items: [
      { label: "React", icon: SiReact },
      { label: "TypeScript", icon: SiTypescript },
      { label: "Vite", icon: SiVite },
      { label: "Tailwind", icon: SiTailwindcss },
      { label: "JavaScript", icon: SiJavascript },
    ],
  },
  {
    category: "Backend",
    items: [
      { label: "Python", icon: SiPython },
      { label: "PostgreSQL", icon: SiPostgresql },
      { label: "SQLite", icon: SiSqlite },
      { label: "Redis", icon: SiRedis },
    ],
  },
  {
    category: "Infra / DevOps",
    items: [
      { label: "Docker", icon: SiDocker },
      { label: "Nginx", icon: SiNginx },
      { label: "GitHub Actions", icon: SiGithubactions },
      { label: "Linux", icon: SiLinux },
    ],
  },
];

const copy = {
  es: {
    navProjects: "Casos",
    navProcess: "Metodo",
    navHiring: "Contratacion",
    openToWork: "Disponible para remoto o hibrido",
    eyebrow: "Ingeniero full-stack con foco en sistemas reales",
    title: "Construyo software que mejora operaciones y escala sin romperse.",
    intro:
      "Diseno y entrego productos tecnicos de extremo a extremo: frontend, backend, automatizacion, infraestructura y despliegue. Mi foco es impacto real y mantenibilidad.",
    ctaProjects: "Ver casos",
    ctaContact: "Contactar",
    ctaGitHub: "Github",
    featuredLabel: "Casos",
    featuredTitle: "Casos destacados",
    featuredSubtitle: "Cada proyecto esta presentado con reto, arquitectura e impacto.",
    challenge: "Reto",
    architecture: "Arquitectura",
    impact: "Impacto",
    stack: "Stack",
    viewRepo: "Ver repo",
    viewLive: "Ver online",
    processLabel: "Metodo",
    processTitle: "Como trabajo para entregar valor rapido y estable",
    processItems: [
      "Empiezo por problema de negocio y criterio de exito medible.",
      "Diseno arquitectura simple para hoy, extensible para manana.",
      "Automatizo despliegues y operaciones repetitivas desde el inicio.",
      "Priorizo observabilidad y fiabilidad en produccion.",
    ],
    toolingLabel: "Herramientas",
    stackTitle: "Stack tecnico",
    stackSubtitle: "herramientas usadas en producto, backend e infraestructura.",
    hiringBadge: "Contratacion",
    hiringTitle: "Si buscas alguien que asuma responsabilidad tecnica real",
    hiringText:
      "Estoy abierto a freelance, contrato o full-time. Puedo entrar en proyectos existentes o construir desde cero con enfoque de producto y operaciones.",
    hiringPoints: ["Rapido en ejecucion", "Solido en produccion", "Comunicacion clara con negocio y equipo"],
    sendEmail: "Enviar email",
    emailSubject: "Conversacion de contratacion",
    portfolioSourceLabel: "Codigo de este portfolio",
    portfolioSourceText: "Quieres revisar implementacion, estructura y despliegue de esta web?",
    portfolioSourceCta: "Ver codigo fuente",
  },
  en: {
    navProjects: "Cases",
    navProcess: "Process",
    navHiring: "Hiring",
    openToWork: "Open to remote or hybrid",
    eyebrow: "Full-stack engineer focused on real-world systems",
    title: "I build software that improves operations and scales without breaking.",
    intro:
      "I design and ship end-to-end technical products: frontend, backend, automation, infrastructure, and deployment. My focus is real impact and maintainability.",
    ctaProjects: "View cases",
    ctaContact: "Contact",
    ctaGitHub: "Github",
    featuredLabel: "Case studies",
    featuredTitle: "Featured cases",
    featuredSubtitle: "Each project is presented by challenge, architecture, and impact.",
    challenge: "Challenge",
    architecture: "Architecture",
    impact: "Impact",
    stack: "Stack",
    viewRepo: "Open repo",
    viewLive: "Open live",
    processLabel: "Process",
    processTitle: "How I work to deliver value fast and reliably",
    processItems: [
      "Start from the business problem and measurable success criteria.",
      "Design architecture simple for today and extensible for tomorrow.",
      "Automate deploys and repetitive operations from day one.",
      "Prioritize observability and production reliability.",
    ],
    toolingLabel: "Tooling",
    stackTitle: "Tech stack",
    stackSubtitle: "tools used across product, backend, and infrastructure.",
    hiringBadge: "Hiring",
    hiringTitle: "If you need someone with real technical ownership",
    hiringText:
      "I am open to freelance, contract, or full-time roles. I can join existing systems or build from scratch with a product and operations mindset.",
    hiringPoints: ["Fast execution", "Production reliability", "Clear communication with business and team"],
    sendEmail: "Send email",
    emailSubject: "Hiring conversation",
    portfolioSourceLabel: "Portfolio source",
    portfolioSourceText: "Want to review implementation, structure, and deployment of this site?",
    portfolioSourceCta: "View source code",
  },
} as const;

function App() {
  const [lang, setLang] = useState<Locale>("es");
  const t = copy[lang];
  const projects = projectsByLocale[lang];

  const skillsCount = useMemo(() => stackByCategory.reduce((acc, group) => acc + group.items.length, 0), []);

  return (
    <div className="relative isolate min-h-screen overflow-hidden bg-background text-white">
      <Suspense fallback={null}>
        <InteractiveNebulaShader className="opacity-95" />
      </Suspense>

      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(115deg,rgba(56,189,248,0.12)_0%,transparent_35%,transparent_65%,rgba(16,185,129,0.12)_100%)]" />

      <div className="relative z-10 mx-auto w-full max-w-6xl px-4 pb-24 pt-6 sm:px-6 lg:px-8">
        <header className="border-y border-white/20 bg-black/35 px-3 py-3 backdrop-blur-xl">
          <nav className="flex items-center justify-between gap-3 text-sm text-white/80">
            <a href="#home" className="flex items-center gap-2 px-1 py-2 text-white">
              <img src="/favicon/favicon-32x32.png" alt="Lucas Vicente logo" className="h-6 w-6 object-contain" />
              <span className="font-semibold tracking-[0.1em]">lucasvicente.es</span>
            </a>

            <div className="hidden items-center gap-6 sm:flex">
              <a href="#projects" className="border-b border-transparent pb-1 transition hover:border-white/60 hover:text-white">
                {t.navProjects}
              </a>
              <a href="#process" className="border-b border-transparent pb-1 transition hover:border-white/60 hover:text-white">
                {t.navProcess}
              </a>
              <a href="#hiring" className="border-b border-transparent pb-1 transition hover:border-white/60 hover:text-white">
                {t.navHiring}
              </a>
            </div>

            <div className="flex items-center gap-2">
              <div className="border border-white/20 bg-black/40 p-1">
                <button
                  type="button"
                  onClick={() => setLang("es")}
                  className={`px-3 py-1.5 text-xs font-semibold ${lang === "es" ? "bg-white/20 text-white" : "text-white/70"}`}
                >
                  ES
                </button>
                <button
                  type="button"
                  onClick={() => setLang("en")}
                  className={`px-3 py-1.5 text-xs font-semibold ${lang === "en" ? "bg-white/20 text-white" : "text-white/70"}`}
                >
                  EN
                </button>
              </div>
              <a
                href="https://www.linkedin.com/in/lucas-esteban-vicente-cerri-3073a8330/"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 border border-white/35 bg-white px-4 py-2 font-semibold text-black transition hover:bg-white/90"
              >
                <Linkedin className="h-4 w-4" />
                LinkedIn
              </a>
            </div>
          </nav>
        </header>

        <main id="home" className="pt-16">
          <section>
            <div>
              <div className="mb-4 flex flex-wrap items-center gap-2">
                <p className="inline-flex h-9 items-center gap-2 border border-emerald-300/40 bg-emerald-500/10 px-3 text-xs uppercase tracking-[0.2em] text-emerald-100">
                  <ShieldCheck className="h-3.5 w-3.5" />
                  {t.openToWork}
                </p>

                <p className="inline-flex h-9 items-center gap-2 border border-amber-300/40 bg-amber-500/10 px-3 text-xs uppercase tracking-[0.18em] text-amber-100">
                  {t.eyebrow}
                </p>
              </div>

              <h1 className="max-w-4xl text-balance text-4xl font-semibold leading-tight sm:text-6xl">{t.title}</h1>
              <p className="mt-5 max-w-3xl text-pretty text-base text-white/80 sm:text-lg">{t.intro}</p>

              <div className="mt-8 flex flex-wrap gap-3">
                <a
                  href="#projects"
                  className="inline-flex items-center gap-2 border border-emerald-300/70 bg-emerald-500/30 px-5 py-2.5 font-semibold text-emerald-50 shadow-[0_0_14px_rgba(16,185,129,0.28)] transition hover:bg-emerald-500/45"
                >
                  {t.ctaProjects}
                  <ArrowRight className="h-4 w-4" />
                </a>
                <a
                  href="#hiring"
                  className="border border-emerald-200/35 px-5 py-2.5 font-medium text-emerald-50 transition hover:bg-emerald-500/20"
                >
                  {t.ctaContact}
                </a>
                <a
                  href="https://github.com/lucksgg7"
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 border border-white/25 px-5 py-2.5 font-medium text-white transition hover:bg-white/10"
                >
                  {t.ctaGitHub}
                  <ArrowUpRight className="h-4 w-4" />
                </a>
              </div>
            </div>
          </section>

          <section id="projects" className="mt-20">
            <div className="mb-7 flex flex-wrap items-end justify-between gap-3 border-b border-white/20 pb-3">
              <div>
                <p className="text-xs uppercase tracking-[0.24em] text-cyan-200/80">{t.featuredLabel}</p>
                <h2 className="mt-1 text-2xl font-semibold sm:text-3xl">{t.featuredTitle}</h2>
              </div>
              <p className="max-w-xl text-sm text-white/70">{t.featuredSubtitle}</p>
            </div>

            <div className="space-y-8">
              {projects.map((project, index) => (
                <article
                  key={project.title}
                  className={`grid gap-4 border-l-2 pl-4 md:grid-cols-[160px_1fr] md:gap-6 md:pl-6 ${
                    project.title === "StackWatch"
                      ? "border-emerald-300/60"
                      : "border-white/25"
                  }`}
                >
                  <div className="flex items-start justify-between md:block">
                    <span
                      className={`inline-flex border px-2 py-1 text-xs uppercase tracking-wide ${
                        project.title === "StackWatch"
                          ? "border-emerald-300/45 bg-emerald-500/15 text-emerald-100"
                          : "border-white/20 bg-black/35 text-white/80"
                      }`}
                    >
                      {project.tag}
                    </span>
                    <p className="text-xs uppercase tracking-[0.18em] text-white/50">{String(index + 1).padStart(2, "0")}</p>
                  </div>

                  <div
                    className={`space-y-3 p-4 ${
                      project.title === "StackWatch"
                        ? "border border-emerald-300/25 bg-emerald-500/10 shadow-[0_0_20px_rgba(16,185,129,0.20)]"
                        : "bg-black/25"
                    }`}
                  >
                    <div className="flex flex-wrap items-center gap-3">
                      <h3 className="text-xl font-semibold text-card-foreground">{project.title}</h3>
                      <span
                        className={`border px-2 py-0.5 text-xs uppercase tracking-wide ${
                          project.title === "StackWatch"
                            ? "border-emerald-300/45 bg-emerald-500/15 text-emerald-100"
                            : "border-cyan-300/35 bg-cyan-400/10 text-cyan-200"
                        }`}
                      >
                        {project.type}
                      </span>
                    </div>

                    <p className="text-sm text-white/80">{project.headline}</p>

                    <div className="grid gap-3 md:grid-cols-3">
                      <p className="border-t border-white/15 pt-2 text-sm text-white/75">
                        <span className="font-semibold text-white/90">{t.challenge}:</span> {project.challenge}
                      </p>
                      <p className="border-t border-white/15 pt-2 text-sm text-white/75">
                        <span className="font-semibold text-white/90">{t.architecture}:</span> {project.architecture}
                      </p>
                      <p className="border-t border-white/15 pt-2 text-sm text-white/75">
                        <span className="font-semibold text-white/90">{t.impact}:</span> {project.impact}
                      </p>
                    </div>

                    <p className="text-sm text-white/70">
                      <span className="font-semibold text-white/90">{t.stack}:</span> {project.stack}
                    </p>

                    <div className="flex flex-wrap gap-3">
                      {project.repo ? (
                        <a
                          href={project.repo}
                          target="_blank"
                          rel="noreferrer"
                          className="inline-flex items-center gap-2 border border-emerald-300/55 bg-emerald-500/18 px-4 py-2 text-sm font-medium text-emerald-50 transition hover:bg-emerald-500/30"
                        >
                          <Github className="h-4 w-4" />
                          {t.viewRepo}
                        </a>
                      ) : null}
                      {project.live ? (
                        <a
                          href={project.live}
                          target="_blank"
                          rel="noreferrer"
                          className="inline-flex items-center gap-2 border border-cyan-300/55 bg-cyan-500/18 px-4 py-2 text-sm font-medium text-cyan-50 transition hover:bg-cyan-500/30"
                        >
                          <ArrowUpRight className="h-4 w-4" />
                          {t.viewLive}
                        </a>
                      ) : null}
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </section>

          <section id="process" className="mt-20 grid gap-8 lg:grid-cols-[1fr_1fr]">
            <article className="border border-white/20 bg-black/30 p-6">
              <p className="text-xs uppercase tracking-[0.2em] text-amber-200/85">{t.processLabel}</p>
              <h2 className="mt-2 text-2xl font-semibold sm:text-3xl">{t.processTitle}</h2>

              <ol className="mt-5 space-y-3 text-sm text-white/80">
                {t.processItems.map((item, idx) => (
                  <li key={item} className="grid grid-cols-[28px_1fr] gap-3 border-t border-white/10 pt-3">
                    <span className="text-sm font-semibold text-amber-200">{idx + 1}.</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ol>
            </article>

            <article className="border border-white/20 bg-black/30 p-6">
              <p className="text-xs uppercase tracking-[0.2em] text-emerald-200/80">{t.toolingLabel}</p>
              <h2 className="mt-2 text-2xl font-semibold sm:text-3xl">{t.stackTitle}</h2>
              <p className="mt-2 text-xs text-white/60">
                {skillsCount} {t.stackSubtitle}
              </p>

              <div className="mt-5 space-y-4">
                {stackByCategory.map((group) => (
                  <div key={group.category} className="border-t border-white/15 pt-3">
                    <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-white/70">{group.category}</p>
                    <div className="flex flex-wrap gap-2">
                      {group.items.map(({ label, icon: Icon }) => (
                        <span
                          key={label}
                          className="inline-flex items-center gap-2 border border-white/20 bg-white/5 px-3 py-1.5 text-xs font-medium text-white"
                        >
                          <Icon className="h-3.5 w-3.5" />
                          {label}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </article>
          </section>

          <section
            id="hiring"
            className="mt-20 border border-emerald-300/40 bg-[radial-gradient(circle_at_20%_20%,rgba(16,185,129,0.30),transparent_45%),linear-gradient(120deg,rgba(6,20,16,0.90),rgba(4,16,12,0.92))] p-6 shadow-[0_0_35px_rgba(16,185,129,0.28)] sm:p-8"
          >
            <div className="grid gap-6 lg:grid-cols-[1fr_auto] lg:items-end">
              <div>
                <p className="inline-flex items-center gap-2 border border-emerald-300/45 bg-emerald-500/15 px-3 py-1 text-xs uppercase tracking-[0.16em] text-emerald-100">
                  <BriefcaseBusiness className="h-3.5 w-3.5" />
                  {t.hiringBadge}
                </p>
                <h2 className="mt-4 text-2xl font-semibold sm:text-3xl">{t.hiringTitle}</h2>
                <p className="mt-3 max-w-3xl text-white/75">{t.hiringText}</p>
                <ul className="mt-4 flex flex-wrap gap-2 text-sm text-white/85">
                  {t.hiringPoints.map((point) => (
                    <li key={point} className="border border-emerald-300/50 bg-emerald-500/18 px-3 py-1 text-emerald-50">
                      {point}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="flex flex-wrap gap-3">
                <a
                  href={`mailto:contacto@lucasvicente.es?subject=${encodeURIComponent(t.emailSubject)}&body=Hola%20Lucas%2C%20quiero%20hablar%20sobre%20una%20oportunidad...`}
                  className="inline-flex items-center gap-2 border border-emerald-300/70 bg-emerald-500/30 px-5 py-2.5 font-semibold text-emerald-50 shadow-[0_0_18px_rgba(16,185,129,0.35)] transition hover:bg-emerald-500/45"
                >
                  <Mail className="h-4 w-4" />
                  {t.sendEmail}
                </a>
                <a
                  href="https://www.linkedin.com/in/lucas-esteban-vicente-cerri-3073a8330/"
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 border border-emerald-200/35 bg-black/25 px-5 py-2.5 font-medium text-emerald-50 transition hover:bg-emerald-500/20"
                >
                  <Linkedin className="h-4 w-4" />
                  LinkedIn
                </a>
                <a
                  href="https://github.com/lucksgg7"
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 border border-emerald-200/35 bg-black/25 px-5 py-2.5 font-medium text-emerald-50 transition hover:bg-emerald-500/20"
                >
                  <Github className="h-4 w-4" />
                  Github
                </a>
              </div>
            </div>
          </section>

          <footer className="mt-14 border-t border-white/20 py-8 text-sm text-white/70">
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div>
                <p className="text-xs uppercase tracking-[0.2em] text-white/55">{t.portfolioSourceLabel}</p>
                <p className="mt-1 inline-flex items-center gap-2">
                  <CircleHelp className="h-4 w-4 text-amber-200" />
                  {t.portfolioSourceText}
                </p>
              </div>
              <a
                href="https://github.com/lucksgg7/lucasvicente-portfolio"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 border border-rose-300/60 bg-rose-500/22 px-4 py-2 font-medium text-rose-50 shadow-[0_0_14px_rgba(244,63,94,0.24)] transition hover:bg-rose-500/36"
              >
                <Github className="h-4 w-4" />
                {t.portfolioSourceCta}
                <ArrowUpRight className="h-4 w-4" />
              </a>
            </div>
          </footer>
        </main>
      </div>
    </div>
  );
}

export default App;
