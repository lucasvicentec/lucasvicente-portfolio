import { lazy, Suspense, useEffect, useMemo, useRef, useState, type KeyboardEvent } from "react";
import {
  ArrowRight,
  ArrowUpRight,
  BriefcaseBusiness,
  CircleHelp,
  Command,
  Github,
  Linkedin,
  Mail,
  ShieldCheck,
} from "lucide-react";
import type { IconType } from "react-icons";
import { FaJava } from "react-icons/fa";
import {
  SiCloudflare,
  SiDocker,
  SiGooglecloud,
  SiGithub,
  SiGithubactions,
  SiJavascript,
  SiLinux,
  SiMariadb,
  SiMongodb,
  SiMysql,
  SiN8N,
  SiNginx,
  SiNodedotjs,
  SiNextdotjs,
  SiOpenai,
  SiPostgresql,
  SiPython,
  SiReact,
  SiRedis,
  SiSqlite,
  SiSupabase,
  SiSwagger,
  SiTailwindcss,
  SiTypescript,
  SiVercel,
  SiVite,
  SiVuedotjs,
} from "react-icons/si";

const InteractiveNebulaShader = lazy(() =>
  import("@/components/ui/liquid-shader").then((module) => ({ default: module.InteractiveNebulaShader })),
);

type Locale = "es" | "en";

type Project = {
  title: string;
  tag: string;
  type: string;
  context: string;
  decision: string;
  result: string;
  evidence?: string[];
  stack: string;
  repo?: string;
  live?: string;
  keyCommit?: string;
  nda?: boolean;
  insight?: PsiSnapshot;
};

type PsiSnapshot = {
  url: string;
  strategy: "mobile" | "desktop";
  updatedAt: string;
  score?: number;
  lcp: string;
  inp: string;
  cls: string;
  sourceLabel: string;
  reportUrl?: string;
};

const LINKS = {
  githubProfile: "https://github.com/lucasvicentec",
  githubStackWatch: "https://github.com/lucasvicentec/stackwatch",
  githubPortfolio: "https://github.com/lucasvicentec/lucasvicente-portfolio",
  linkedinProfile: "https://www.linkedin.com/in/lucas-esteban-vicente-cerri-3073a8330/",
  statusPage: "https://status.lucasvicente.es/",
  hytaliaSite: "https://www.hytalia.net",
  pipeline:
    "https://github.com/lucasvicentec/lucasvicente-portfolio/blob/main/.github/workflows/deploy-cloudflare-worker.yml",
  metricsSummary: "#metrics",
  postmortem: "#postmortem",
  cv: "mailto:contacto@lucasvicente.es?subject=CV%20Lucas%20Vicente",
} as const;

const psiReportUrl = (url: string) => `https://pagespeed.web.dev/report?url=${encodeURIComponent(url)}`;

const TERMINAL_STORAGE_KEY = "lucas_portfolio_terminal_history_v1";

type TechLogo = {
  label: string;
  icon: IconType;
  colorClass: string;
};

const techLogos: TechLogo[] = [
  { label: "React", icon: SiReact, colorClass: "text-cyan-300" },
  { label: "Next.js", icon: SiNextdotjs, colorClass: "text-white" },
  { label: "GitHub", icon: SiGithub, colorClass: "text-white" },
  { label: "Node", icon: SiNodedotjs, colorClass: "text-lime-300" },
  { label: "Java", icon: FaJava, colorClass: "text-orange-300" },
  { label: "Docker", icon: SiDocker, colorClass: "text-blue-300" },
  { label: "MySQL", icon: SiMysql, colorClass: "text-blue-300" },
  { label: "MariaDB", icon: SiMariadb, colorClass: "text-orange-300" },
  { label: "PostgreSQL", icon: SiPostgresql, colorClass: "text-indigo-300" },
  { label: "Swagger API", icon: SiSwagger, colorClass: "text-lime-300" },
  { label: "TypeScript", icon: SiTypescript, colorClass: "text-sky-300" },
  { label: "OpenAI", icon: SiOpenai, colorClass: "text-emerald-300" },
  { label: "Vercel", icon: SiVercel, colorClass: "text-white" },
  { label: "Cloudflare", icon: SiCloudflare, colorClass: "text-orange-300" },
  { label: "Python", icon: SiPython, colorClass: "text-blue-300" },
  { label: "MongoDB", icon: SiMongodb, colorClass: "text-green-300" },
  { label: "Supabase", icon: SiSupabase, colorClass: "text-emerald-300" },
  { label: "Vue", icon: SiVuedotjs, colorClass: "text-emerald-300" },
  { label: "Tailwind", icon: SiTailwindcss, colorClass: "text-cyan-300" },
  { label: "n8n", icon: SiN8N, colorClass: "text-rose-300" },
  { label: "GCP", icon: SiGooglecloud, colorClass: "text-blue-300" },
];

const getTerminalIntroByLocale = (locale: Locale): string[] =>
  locale === "es"
    ? ["Bienvenido al terminal de Lucas", 'Escribe "ayuda" para ver comandos disponibles.', ""]
    : ["🚀 Welcome to Lucas terminal", 'Type "help" to list available commands.', ""];

const readTerminalHistory = (): string[] => {
  if (typeof window === "undefined") return getTerminalIntroByLocale("es");

  try {
    const raw = window.localStorage.getItem(TERMINAL_STORAGE_KEY);
    if (!raw) return getTerminalIntroByLocale("es");

    const parsed = JSON.parse(raw);
    if (Array.isArray(parsed) && parsed.every((line) => typeof line === "string")) {
      return parsed.slice(-140);
    }
  } catch {
    // Ignore invalid local storage and use intro.
  }

  return getTerminalIntroByLocale("es");
};

const projectsByLocale: Record<Locale, Project[]> = {
  es: [
    {
      title: "StackWatch",
      tag: "Nuevo",
      type: "Plataforma de monitorización",
      context: "Monitoriza mis VPS/servicios y expone una status page pública para incidencias y mantenimiento.",
      decision:
        "Elegí PostgreSQL + worker interno (vs cron externo) para mantener histórico consistente y controlar reintentos en un solo punto.",
      result:
        "Checks cada 60s, histórico e incident lifecycle en producción. Pendiente de añadir métricas públicas (p95, uptime y coste mensual).",
      evidence: ["Demo pública activa", "Pipeline de despliegue automatizado", "Repositorio con commits de incident lifecycle"],
      stack: "Next.js 16, TypeScript, PostgreSQL, Docker, Docker Swarm",
      repo: LINKS.githubStackWatch,
      live: LINKS.statusPage,
      keyCommit: LINKS.githubStackWatch,
      insight: {
        url: LINKS.statusPage,
        strategy: "desktop",
        updatedAt: "2026-02-19",
        score: 97,
        lcp: "0.6 s",
        inp: "N/D (Lighthouse muestra TBT 140 ms)",
        cls: "0.005",
        sourceLabel: "PageSpeed snapshot (manual)",
        reportUrl: psiReportUrl(LINKS.statusPage),
      },
    },
    {
      title: "VarynHost",
      tag: "Producción",
      type: "Hosting / Infra y automatización",
      context: "Servicio de hosting con paneles custom, automatizaciones y operación diaria para clientes reales.",
      decision: "Se combinó Pterodactyl + WHMCS + APIs para balancear velocidad de entrega y operación mantenible.",
      result:
        "Más de 60 clientes y más de 60 servidores activos, con soporte técnico y comunidad orientada al lanzamiento oficial de Hytale.",
      evidence: ["Sitio público activo", "Operación con clientes reales", "Automatizaciones y paneles custom en producción"],
      stack: "Pterodactyl, WHMCS, APIs, automatización operativa",
      live: "https://varynhost.com/",
      insight: {
        url: "https://varynhost.com/",
        strategy: "mobile",
        updatedAt: "2026-02-19",
        score: 97,
        lcp: "0.5 s",
        inp: "N/D (Lighthouse muestra TBT 10 ms)",
        cls: "0.000",
        sourceLabel: "PageSpeed snapshot (manual)",
        reportUrl: psiReportUrl("https://varynhost.com/"),
      },
    },
    {
      title: "MD-Ingelligence",
      tag: "Privado",
      type: "MadridDigital / Herramienta interna",
      context: "Herramienta interna para consultas operativas diarias sobre ubicaciones técnicas (UT).",
      decision:
        "Se priorizó una arquitectura híbrida (PostgreSQL + fallback JSON) para asegurar continuidad operativa durante iteraciones de datos.",
      result: "Uso interno continuo. Métricas y capturas públicas limitadas por NDA; solo comparto arquitectura y decisiones técnicas.",
      evidence: ["Arquitectura high-level compartible", "Decisiones de rendimiento y ranking sin datos sensibles"],
      stack: "Next.js 15, React 19, TypeScript, Tailwind, PostgreSQL, Node API Routes",
      nda: true,
      insight: {
        url: "Privado (NDA)",
        strategy: "mobile",
        updatedAt: "2026-02-19",
        score: 100,
        lcp: "0.5 s",
        inp: "N/D (Lighthouse muestra TBT 0 ms)",
        cls: "0.006",
        sourceLabel: "Última medición (PSI, entorno privado)",
      },
    },
    {
      title: "Hytalia Web",
      tag: "Produccion",
      type: "Plataforma de comunidad / Infra",
      context: "Frontend principal para usuarios de comunidad con login, panel y módulos de producto.",
      decision: "Se mantuvo arquitectura transicional para migrar legacy sin frenar entregas semanales.",
      result: "Producto en producción con despliegue continuo y módulos reutilizables; pendiente de publicar métricas de tráfico/rendimiento.",
      evidence: ["Sitio en producción", "Despliegue con contenedores y Swarm"],
      stack: "Next.js 14, React 18, TypeScript, Tailwind, NextAuth, Docker Swarm",
      live: LINKS.hytaliaSite,
      insight: {
        url: LINKS.hytaliaSite,
        strategy: "mobile",
        updatedAt: "2026-02-19",
        lcp: "1.8 s",
        inp: "146 ms",
        cls: "0.02",
        sourceLabel: "Core Web Vitals (CrUX, últimas 4 semanas)",
        reportUrl: psiReportUrl(LINKS.hytaliaSite),
      },
    },
    {
      title: "Hytale Plugin Journey",
      tag: "Activo",
      type: "Servidor de juego / Ecosistema Java",
      context: "Conjunto de plugins para operación y jugabilidad en servidores multijugador.",
      decision: "Se consolidó una base compartida para evitar duplicación entre módulos y acelerar releases.",
      result: "Iteración rápida de funcionalidades en entorno activo; próximas métricas: tiempo medio de build y frecuencia de despliegue.",
      evidence: ["Workflows de CI para plugins", "Base commons reutilizable en Java"],
      stack: "Java 21, Gradle, GitHub Actions, Hytale Plugin APIs",
      repo: LINKS.githubProfile,
      live: LINKS.hytaliaSite,
    },
  ],
  en: [
    {
      title: "StackWatch",
      tag: "New",
      type: "Monitoring platform",
      context: "Monitors my VPS/services and exposes a public status page for incidents and maintenance.",
      decision:
        "I chose PostgreSQL + an internal worker (vs external cron) to keep history consistent and retry logic controlled in one place.",
      result:
        "60s checks, production incident lifecycle, and active public status page. Public p95/uptime/cost metrics are being added next.",
      evidence: ["Live demo", "Automated deployment pipeline", "Repository with incident lifecycle code"],
      stack: "Next.js 16, TypeScript, PostgreSQL, Docker, Docker Swarm",
      repo: LINKS.githubStackWatch,
      live: LINKS.statusPage,
      keyCommit: LINKS.githubStackWatch,
      insight: {
        url: LINKS.statusPage,
        strategy: "desktop",
        updatedAt: "2026-02-19",
        score: 97,
        lcp: "0.6 s",
        inp: "N/A (Lighthouse reports TBT 140 ms)",
        cls: "0.005",
        sourceLabel: "PageSpeed snapshot (manual)",
        reportUrl: psiReportUrl(LINKS.statusPage),
      },
    },
    {
      title: "VarynHost",
      tag: "Production",
      type: "Hosting / Infra and automation",
      context: "Hosting service with custom panels, automations, and day-to-day operations for real clients.",
      decision: "Pterodactyl + WHMCS + APIs were combined to balance delivery speed with maintainable operations.",
      result:
        "More than 60 clients and more than 60 active servers, including technical support and community workflows for Hytale launch timing.",
      evidence: ["Public live website", "Real client operations", "Production automations and custom panels"],
      stack: "Pterodactyl, WHMCS, APIs, operational automation",
      live: "https://varynhost.com/",
      insight: {
        url: "https://varynhost.com/",
        strategy: "mobile",
        updatedAt: "2026-02-19",
        score: 97,
        lcp: "0.5 s",
        inp: "N/A (Lighthouse reports TBT 10 ms)",
        cls: "0.000",
        sourceLabel: "PageSpeed snapshot (manual)",
        reportUrl: psiReportUrl("https://varynhost.com/"),
      },
    },
    {
      title: "MD-Ingelligence",
      tag: "Private",
      type: "MadridDigital / Internal tooling",
      context: "Internal platform for daily operational queries on technical location datasets.",
      decision:
        "A hybrid architecture (PostgreSQL + JSON fallback) was prioritized to guarantee continuity while iterating on data quality.",
      result: "Stable internal usage. Public metrics and screenshots are limited due to NDA.",
      evidence: ["Shareable high-level architecture", "Performance/relevance decisions without sensitive data"],
      stack: "Next.js 15, React 19, TypeScript, Tailwind, PostgreSQL, Node API Routes",
      nda: true,
      insight: {
        url: "Private (NDA)",
        strategy: "mobile",
        updatedAt: "2026-02-19",
        score: 100,
        lcp: "0.5 s",
        inp: "N/A (Lighthouse reports TBT 0 ms)",
        cls: "0.006",
        sourceLabel: "Latest snapshot (PSI, private environment)",
      },
    },
    {
      title: "Hytalia Web",
      tag: "Production",
      type: "Community platform / Infra",
      context: "Main frontend for community users with login, admin, and product modules.",
      decision: "A transitional architecture was kept to migrate legacy paths without blocking weekly delivery.",
      result: "Production-ready app with continuous deploys and reusable modules; public traffic/perf metrics coming next.",
      evidence: ["Production website", "Container-based deployment flow"],
      stack: "Next.js 14, React 18, TypeScript, Tailwind, NextAuth, Docker Swarm",
      live: LINKS.hytaliaSite,
      insight: {
        url: LINKS.hytaliaSite,
        strategy: "mobile",
        updatedAt: "2026-02-19",
        lcp: "1.8 s",
        inp: "146 ms",
        cls: "0.02",
        sourceLabel: "Core Web Vitals (CrUX, last 4 weeks)",
        reportUrl: psiReportUrl(LINKS.hytaliaSite),
      },
    },
    {
      title: "Hytale Plugin Journey",
      tag: "Active",
      type: "Game server / Java ecosystem",
      context: "Plugin suite used for server operation and gameplay in a multiplayer environment.",
      decision: "Shared commons were consolidated to reduce duplication and speed up releases across modules.",
      result: "Fast iteration in active development. Next metrics to expose: build time and release frequency.",
      evidence: ["CI workflows for plugin builds", "Reusable Java commons base"],
      stack: "Java 21, Gradle, GitHub Actions, Hytale Plugin APIs",
      repo: LINKS.githubProfile,
      live: LINKS.hytaliaSite,
    },
  ],
};

const coreStack = [
  { label: "React / Next.js", icon: SiReact },
  { label: "TypeScript", icon: SiTypescript },
  { label: "PostgreSQL", icon: SiPostgresql },
  { label: "Docker", icon: SiDocker },
  { label: "Cloudflare", icon: SiCloudflare },
];

const alsoUsedStack = [
  { label: "Python", icon: SiPython },
  { label: "Redis", icon: SiRedis },
  { label: "Nginx", icon: SiNginx },
  { label: "GitHub Actions", icon: SiGithubactions },
  { label: "Linux", icon: SiLinux },
  { label: "SQLite", icon: SiSqlite },
  { label: "JavaScript", icon: SiJavascript },
  { label: "Vite", icon: SiVite },
  { label: "Tailwind", icon: SiTailwindcss },
];

const copy = {
  es: {
    navProjects: "Casos",
    navProcess: "Método",
    navHiring: "Contratación",
    openToWork: "Disponible para remoto o híbrido",
    eyebrow: "Full-Stack con mentalidad de operaciones",
    title: "Full-Stack con mentalidad de operaciones: monitorización, automatización y despliegue.",
    intro:
      "Me obsesionan métricas, fiabilidad y sistemas mantenibles.",
    ctaProjects: "Ver casos",
    ctaContact: "Contactar",
    ctaGitHub: "GitHub",
    featuredLabel: "Casos",
    featuredTitle: "Casos destacados",
    featuredSubtitle: "Cada caso incluye contexto real, tradeoff técnico y resultado medible (o pendiente de medición).",
    challenge: "Contexto",
    architecture: "Decisión difícil",
    impact: "Resultado",
    stack: "Stack",
    viewRepo: "Ver repo",
    viewLive: "Ver online",
    processLabel: "Método",
    processTitle: "Cómo trabajo para entregar valor rápido y estable",
    processItems: [
      "Empiezo por el problema de negocio y un criterio de éxito medible.",
      "Diseño una arquitectura simple para hoy y extensible para mañana.",
      "Automatizo despliegues y operaciones repetitivas desde el inicio.",
      "Priorizo observabilidad y fiabilidad en producción.",
    ],
    toolingLabel: "Herramientas",
    stackTitle: "Stack técnico",
    stackSubtitle: "enfoque principal y tecnologías secundarias que he usado en producción.",
    hiringBadge: "Contratación",
    hiringTitle: "Si buscas a alguien que asuma responsabilidad técnica real",
    hiringText:
      "Estoy abierto a freelance, contrato o full-time. Puedo entrar en proyectos existentes o construir desde cero con enfoque de producto y operaciones.",
    hiringPoints: ["Rápido en ejecución", "Sólido en producción", "Comunicación clara con negocio y equipo"],
    sendEmail: "Enviar email",
    emailSubject: "Conversación de contratación",
    portfolioSourceLabel: "Código de este portfolio",
    portfolioSourceText: "¿Quieres revisar la implementación, estructura y despliegue de esta web?",
    portfolioSourceCta: "Ver codigo fuente",
    terminalLabel: "Terminal interactivo",
    terminalTitle: "Consola de navegación rápida",
    terminalHint: "Prueba frases naturales: hola, quién eres, te quiero contratar, qué stack usas, contacto.",
    terminalPlaceholder: "Escribe un comando...",
    terminalRun: "Ejecutar",
  },
  en: {
    navProjects: "Cases",
    navProcess: "Process",
    navHiring: "Hiring",
    openToWork: "Open to remote or hybrid",
    eyebrow: "Full-stack with an operations mindset",
    title: "Full-stack with an operations mindset: monitoring, automation, and deployment.",
    intro:
      "I care deeply about metrics, reliability, and maintainable systems.",
    ctaProjects: "View cases",
    ctaContact: "Contact",
    ctaGitHub: "GitHub",
    featuredLabel: "Case studies",
    featuredTitle: "Featured cases",
    featuredSubtitle: "Each case includes real context, a technical tradeoff, and measurable results (or pending metrics).",
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
    stackSubtitle: "core focus plus additional tools used in production.",
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
    terminalLabel: "Interactive terminal",
    terminalTitle: "Fast navigation console",
    terminalHint: "Try natural phrases: hi, who are you, I want to hire you, what's your stack, contact.",
    terminalPlaceholder: "Type a command...",
    terminalRun: "Run",
  },
} as const;

function App() {
  const [lang, setLang] = useState<Locale>("es");
  const t = copy[lang];
  const projects = projectsByLocale[lang];  const marqueeLogos = useMemo(() => [...techLogos, ...techLogos], []);
  const [terminalInput, setTerminalInput] = useState("");
  const [terminalLines, setTerminalLines] = useState<string[]>(() => readTerminalHistory());
  const [typingLine, setTypingLine] = useState("");
  const terminalViewportRef = useRef<HTMLDivElement | null>(null);
  const terminalInputRef = useRef<HTMLInputElement | null>(null);
  const typingQueueRef = useRef<string[]>([]);
  const typingTimeoutRef = useRef<number | undefined>(undefined);
  const isTypingRef = useRef(false);
  const isUnmountedRef = useRef(false);
  const [cursorPos, setCursorPos] = useState({ x: 0, y: 0 });
  const [showCustomCursor, setShowCustomCursor] = useState(false);

  const skillsCount = useMemo(() => coreStack.length + alsoUsedStack.length, []);
  const terminalIntro = useMemo(() => getTerminalIntroByLocale(lang), [lang]);
  const highlights = useMemo(
    () =>
      lang === "es"
        ? [
            "5 proyectos en producción (desde Mar 2024).",
            `Despliegue continuo con Cloudflare/Docker/Swarm (${LINKS.pipeline}).`,
          ]
        : [
            "5 projects in production (since Mar 2024).",
            `Continuous delivery with Cloudflare/Docker/Swarm (${LINKS.pipeline}).`,
          ],
    [lang],
  );
  useEffect(() => {
    if (typeof window === "undefined") return;
    window.localStorage.setItem(TERMINAL_STORAGE_KEY, JSON.stringify(terminalLines.slice(-140)));
  }, [terminalLines]);

  useEffect(() => {
    isUnmountedRef.current = false;
    return () => {
      isUnmountedRef.current = true;
      if (typingTimeoutRef.current !== undefined) {
        window.clearTimeout(typingTimeoutRef.current);
        typingTimeoutRef.current = undefined;
      }
    };
  }, []);

  useEffect(() => {
    if (!terminalViewportRef.current) return;
    terminalViewportRef.current.scrollTop = terminalViewportRef.current.scrollHeight;
  }, [terminalLines, typingLine]);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const finePointer = window.matchMedia("(pointer: fine)");
    const updateCursorVisibility = () => setShowCustomCursor(finePointer.matches);

    updateCursorVisibility();
    finePointer.addEventListener("change", updateCursorVisibility);

    return () => {
      finePointer.removeEventListener("change", updateCursorVisibility);
    };
  }, []);

  useEffect(() => {
    if (!showCustomCursor || typeof window === "undefined") return;

    const handleMouseMove = (event: MouseEvent) => {
      setCursorPos({ x: event.clientX, y: event.clientY });
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [showCustomCursor]);

  useEffect(() => {
    if (typeof window === "undefined") return;
    document.body.classList.toggle("custom-cursor-enabled", showCustomCursor);
    return () => document.body.classList.remove("custom-cursor-enabled");
  }, [showCustomCursor]);

  const sleep = (ms: number) =>
    new Promise<void>((resolve) => {
      typingTimeoutRef.current = window.setTimeout(resolve, ms);
    });

  const processTypingQueue = async () => {
    if (isTypingRef.current || isUnmountedRef.current) return;
    isTypingRef.current = true;

    while (typingQueueRef.current.length > 0 && !isUnmountedRef.current) {
      const nextLine = typingQueueRef.current.shift() ?? "";

      if (!nextLine) {
        setTerminalLines((prev) => [...prev, ""]);
        continue;
      }

      for (let index = 1; index <= nextLine.length; index += 1) {
        if (isUnmountedRef.current) return;
        setTypingLine(nextLine.slice(0, index));
        await sleep(14);
      }

      setTerminalLines((prev) => [...prev, nextLine]);
      setTypingLine("");
      await sleep(48);
    }

    setTypingLine("");
    isTypingRef.current = false;
  };

  const enqueueTypedLines = (lines: string[]) => {
    typingQueueRef.current.push(...lines);
    void processTypingQueue();
  };

  const runCommand = (rawCommand: string) => {
    const command = rawCommand.trim().toLowerCase();
    const normalized = command.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
    if (!command) return;

    const aliases: Record<string, string> =
      lang === "es"
        ? {
            ayuda: "help",
            proyectos: "projects",
            stack: "stack",
            contacto: "contact",
            servicios: "services",
            sobre: "about",
            cv: "cv",
            stackwatch: "stackwatch",
            metricas: "metrics",
            postmortem: "postmortem",
            tema: "theme",
            secreto: "secret",
            sudo: "sudo",
            github: "github",
            linkedin: "linkedin",
            limpiar: "clear",
          }
        : {
            help: "help",
            projects: "projects",
            stack: "stack",
            contact: "contact",
            services: "services",
            about: "about",
            cv: "cv",
            stackwatch: "stackwatch",
            metrics: "metrics",
            postmortem: "postmortem",
            theme: "theme",
            secret: "secret",
            sudo: "sudo",
            github: "github",
            linkedin: "linkedin",
            clear: "clear",
          };

    const detectNaturalIntent = () => {
      const hasAny = (keywords: string[]) => keywords.some((k) => normalized.includes(k));

      if (hasAny(["hola", "buenas", "hello", "hi", "hey"])) return "greet";
      if (hasAny(["quien eres", "quien sos", "who are you", "about you"])) return "about";
      if (hasAny(["te quiero contratar", "quiero contratarte", "contratar", "hire you", "hire", "trabajar contigo"])) return "hire";
      if (hasAny(["precio", "coste", "costo", "tarifa", "budget", "presupuesto", "rate"])) return "pricing";
      if (hasAny(["contacto", "correo", "email", "mail", "linkedin", "github"])) return "contact";
      if (hasAny(["proyectos", "proyecto", "project", "portfolio", "trabajos"])) return "projects";
      if (hasAny(["stack", "tecnologias", "tecnologia", "tech", "skills"])) return "stack";
      if (hasAny(["cv", "curriculum", "resume"])) return "cv";
      if (hasAny(["gracias", "thanks", "thank you"])) return "thanks";
      return null;
    };

    const resolved = aliases[command] ?? aliases[normalized] ?? detectNaturalIntent();

    if (!resolved) {
      const unknown = lang === "es" ? `Comando no reconocido: ${command}. Usa "ayuda".` : `Unknown command: ${command}. Use "help".`;
      setTerminalLines((prev) => [...prev, `$ ${command}`]);
      enqueueTypedLines([unknown, ""]);
      return;
    }

    if (resolved === "clear") {
      setTerminalLines(terminalIntro);
      typingQueueRef.current = [];
      setTypingLine("");
      isTypingRef.current = false;
      if (typingTimeoutRef.current !== undefined) {
        window.clearTimeout(typingTimeoutRef.current);
        typingTimeoutRef.current = undefined;
      }
      return;
    }

    const responsesByCommand: Record<string, string[]> = {
      help:
        lang === "es"
          ? ["Comandos disponibles:", "ayuda, proyectos, stack, stackwatch, contacto, servicios, sobre, cv, metricas, postmortem, github, linkedin, secreto, sudo, tema, limpiar"]
          : ["Available commands:", "help, projects, stack, stackwatch, contact, services, about, cv, metrics, postmortem, github, linkedin, secret, sudo, theme, clear"],
      greet:
        lang === "es"
          ? ["Hola, soy Lucas 👋", "Puedo contarte sobre proyectos, stack, métricas o contratación."]
          : ["Hey, I'm Lucas 👋", "I can tell you about projects, stack, metrics, or hiring."],
      projects:
        lang === "es"
          ? [
              "Proyectos destacados:",
              "- StackWatch (monitorización de VPS)",
              "- MD-Ingelligence (herramienta interna)",
              "- Hytalia Web (plataforma de comunidad)",
              "- Hytale Plugin Journey (ecosistema Java)",
            ]
          : [
              "Featured projects:",
              "- StackWatch (VPS monitoring)",
              "- MD-Ingelligence (internal tooling)",
              "- Hytalia Web (community platform)",
              "- Hytale Plugin Journey (Java ecosystem)",
            ],
      stack:
        lang === "es"
          ? ["Stack principal: React, TypeScript, Next.js, Python, PostgreSQL, Docker, Cloudflare, GitHub Actions."]
          : ["Core stack: React, TypeScript, Next.js, Python, PostgreSQL, Docker, Cloudflare, GitHub Actions."],
      contact:
        lang === "es"
          ? ["Contacto:", "- Email: contacto@lucasvicente.es", `- LinkedIn: ${LINKS.linkedinProfile}`]
          : ["Contact:", "- Email: contacto@lucasvicente.es", `- LinkedIn: ${LINKS.linkedinProfile}`],
      services:
        lang === "es"
          ? ["Servicios:", "- Desarrollo web full-stack", "- Integraciones/automatización", "- Infraestructura y despliegue"]
          : ["Services:", "- Full-stack web development", "- Integrations/automation", "- Infrastructure and deployment"],
      about:
        lang === "es"
          ? ["Sobre mí:", "Ingeniero full-stack orientado a producto, operación e impacto real."]
          : ["About:", "Full-stack engineer focused on product, operations, and measurable impact."],
      hire:
        lang === "es"
          ? ["Perfecto, hablemos.", "Puedes escribirme a contacto@lucasvicente.es o por LinkedIn y te respondo rápido."]
          : ["Great, let's talk.", "You can reach me at contacto@lucasvicente.es or on LinkedIn for a quick reply."],
      pricing:
        lang === "es"
          ? ["Depende del alcance y urgencia.", "Si me pasas contexto por email, te doy propuesta cerrada o por fases."]
          : ["It depends on scope and urgency.", "If you share context by email, I can send a fixed or phased proposal."],
      cv:
        lang === "es"
          ? ["CV: abriendo acceso al PDF/contacto..."]
          : ["CV: opening PDF/contact access..."],
      stackwatch:
        lang === "es"
          ? ["StackWatch: abriendo demo + repo + referencia de implementación."]
          : ["StackWatch: opening live demo + repo + implementation reference."],
      metrics:
        lang === "es"
          ? ["Métricas: abriendo resumen público para completar con p95/uptime/checks/coste."]
          : ["Metrics: opening public summary placeholder for p95/uptime/checks/cost."],
      postmortem:
        lang === "es"
          ? ["Postmortem: abriendo notas de aprendizajes y próximos ajustes."]
          : ["Postmortem: opening lessons learned and next adjustments."],
      theme:
        lang === "es"
          ? ["Tema:", "Modo neón activo por defecto."]
          : ["Theme:", "Neon mode is active by default."],
      secret:
        lang === "es"
          ? ["🛰️ Modo explorador: activo.", "Tip: prueba 'stack' y 'proyectos'."]
          : ["🛰️ Explorer mode: enabled.", "Tip: try 'stack' and 'projects'."],
      sudo:
        lang === "es"
          ? ["[sudo] contraseña para lucas:", "Permiso denegado. Buen intento 😄"]
          : ["[sudo] password for lucas:", "Permission denied. Nice try 😄"],
      thanks:
        lang === "es"
          ? ["¡Gracias a ti!", "Si quieres, puedo abrirte ahora los enlaces clave de evidencia."]
          : ["Thanks!", "If you want, I can open the key evidence links now."],
      github: [LINKS.githubProfile],
      linkedin: [LINKS.linkedinProfile],
    };

    const output = responsesByCommand[resolved];
    setTerminalLines((prev) => [...prev, `$ ${command}`]);
    enqueueTypedLines([...output, ""]);

    if (typeof window !== "undefined") {
      const open = (url: string) => window.open(url, "_blank", "noopener,noreferrer");
      if (resolved === "cv") open(LINKS.cv);
      if (resolved === "stackwatch") {
        open(LINKS.statusPage);
        open(LINKS.githubStackWatch);
      }
      if (resolved === "metrics") window.location.hash = "metrics";
      if (resolved === "postmortem") window.location.hash = "postmortem";
    }
  };

  const executeTerminalInput = () => {
    runCommand(terminalInput);
    setTerminalInput("");
    terminalInputRef.current?.focus();
  };

  const handleTerminalKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      event.preventDefault();
      executeTerminalInput();
    }
  };

  return (
    <div className="relative isolate min-h-screen overflow-hidden bg-background text-white">
      {showCustomCursor ? (
        <div
          aria-hidden="true"
          className="pointer-events-none fixed left-0 top-0 z-[70] -translate-x-1/2 -translate-y-1/2"
          style={{ transform: `translate(${cursorPos.x}px, ${cursorPos.y}px)` }}
        >
          <span className="block h-5 w-5 rounded-full border border-cyan-300/90 shadow-[0_0_16px_rgba(34,211,238,0.55)]" />
          <span className="absolute left-1/2 top-1/2 block h-1.5 w-1.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-cyan-300 shadow-[0_0_10px_rgba(34,211,238,0.9)]" />
        </div>
      ) : null}

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
                  aria-label="Cambiar idioma a español"
                  aria-pressed={lang === "es"}
                  className={`px-3 py-1.5 text-xs font-semibold ${lang === "es" ? "bg-white/20 text-white" : "text-white/70"}`}
                >
                  ES
                </button>
                <button
                  type="button"
                  onClick={() => setLang("en")}
                  aria-label="Switch language to English"
                  aria-pressed={lang === "en"}
                  className={`px-3 py-1.5 text-xs font-semibold ${lang === "en" ? "bg-white/20 text-white" : "text-white/70"}`}
                >
                  EN
                </button>
              </div>
              <a
                href={LINKS.linkedinProfile}
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
          <section className="mb-10 border border-cyan-300/30 bg-cyan-500/5 p-4">
            <p className="text-xs uppercase tracking-[0.2em] text-cyan-200/90">Highlights</p>
            <ul className="mt-3 space-y-2 text-sm text-white/85">
              {highlights.map((item) => (
                <li key={item} className="flex items-start gap-2">
                  <span className="mt-1 h-1.5 w-1.5 rounded-full bg-cyan-300" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </section>

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
                  href={LINKS.githubProfile}
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

            <div className="space-y-6">
              {projects.map((p, index) => (
                <article key={p.title} className="border border-white/20 bg-black/30 p-5">
                  <div className="mb-3 flex flex-wrap items-start justify-between gap-2">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="inline-flex border border-white/25 bg-black/35 px-2 py-1 text-xs uppercase tracking-wide text-white/85">
                        {p.tag}
                      </span>
                      <h3 className="text-xl font-semibold text-card-foreground">{p.title}</h3>
                      <span className="border border-cyan-300/35 bg-cyan-400/10 px-2 py-0.5 text-xs uppercase tracking-wide text-cyan-200">
                        {p.type}
                      </span>
                    </div>
                    <p className="text-xs uppercase tracking-[0.18em] text-white/50">{String(index + 1).padStart(2, "0")}</p>
                  </div>

                  <div className="grid gap-3 md:grid-cols-3">
                    <p className="border-t border-white/15 pt-2 text-sm text-white/80">
                      <span className="font-semibold text-white/90">{t.challenge}:</span> {p.context}
                    </p>
                    <p className="border-t border-white/15 pt-2 text-sm text-white/80">
                      <span className="font-semibold text-white/90">{t.architecture}:</span> {p.decision}
                    </p>
                    <p className="border-t border-white/15 pt-2 text-sm text-white/80">
                      <span className="font-semibold text-white/90">{t.impact}:</span> {p.result}
                    </p>
                  </div>

                  {p.nda ? (
                    <p className="mt-3 rounded border border-amber-300/40 bg-amber-500/10 px-3 py-2 text-xs text-amber-100">
                      Bajo NDA: arquitectura y decisiones compartibles; datos sensibles no públicos.
                    </p>
                  ) : null}

                  {p.evidence?.length ? (
                    <p className="mt-3 text-sm text-white/75">
                      <span className="font-semibold text-white/90">Evidencia:</span> {p.evidence.join(" · ")}
                    </p>
                  ) : null}

                  <p className="mt-3 text-sm text-white/70">
                    <span className="font-semibold text-white/90">{t.stack}:</span> {p.stack}
                  </p>

                  {p.insight ? (
                    <div className="mt-3 rounded border border-cyan-300/35 bg-cyan-500/10 p-3 text-xs text-white/85">
                      <div className="mb-2 flex items-start justify-between gap-2">
                        <div>
                          <p className="text-[10px] uppercase tracking-wide text-cyan-200/85">{p.insight.sourceLabel}</p>
                          <p className="text-[10px] text-white/60">{p.insight.strategy === "mobile" ? "Medido en móvil" : "Medido en desktop"}</p>
                        </div>
                        {typeof p.insight.score === "number" ? (
                          <span className="rounded border border-cyan-300/45 bg-black/25 px-2 py-0.5 font-semibold text-cyan-100">
                            {p.insight.score}/100
                          </span>
                        ) : null}
                      </div>

                      <div className="grid grid-cols-3 gap-2">
                        <div className="rounded border border-white/15 bg-black/20 px-2 py-1">
                          <p className="text-[10px] text-white/60">LCP</p>
                          <p className="font-semibold">{p.insight.lcp}</p>
                        </div>
                        <div className="rounded border border-white/15 bg-black/20 px-2 py-1">
                          <p className="text-[10px] text-white/60">INP</p>
                          <p className="font-semibold">{p.insight.inp}</p>
                        </div>
                        <div className="rounded border border-white/15 bg-black/20 px-2 py-1">
                          <p className="text-[10px] text-white/60">CLS</p>
                          <p className="font-semibold">{p.insight.cls}</p>
                        </div>
                      </div>

                      <div className="mt-2 flex items-center justify-between text-[10px] text-white/65">
                        <span>Actualizado: {p.insight.updatedAt}</span>
                        {p.insight.reportUrl ? (
                          <a href={p.insight.reportUrl} target="_blank" rel="noreferrer" className="underline underline-offset-2">
                            Ver informe oficial
                          </a>
                        ) : (
                          <span>Informe no público</span>
                        )}
                      </div>
                    </div>
                  ) : null}

                  <div className="mt-4 flex flex-wrap gap-3">
                    {p.repo ? (
                      <a
                        href={p.repo}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center gap-2 border border-emerald-300/55 bg-emerald-500/18 px-4 py-2 text-sm font-medium text-emerald-50 transition hover:bg-emerald-500/30"
                      >
                        <Github className="h-4 w-4" />
                        {t.viewRepo}
                      </a>
                    ) : null}
                    {p.live ? (
                      <a
                        href={p.live}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center gap-2 border border-cyan-300/55 bg-cyan-500/18 px-4 py-2 text-sm font-medium text-cyan-50 transition hover:bg-cyan-500/30"
                      >
                        <ArrowUpRight className="h-4 w-4" />
                        {t.viewLive}
                      </a>
                    ) : null}
                  </div>
                </article>
              ))}
            </div>
          </section>

          <section className="mt-16">
            <div className="mb-4 flex items-center gap-3">
              <span className="h-2 w-2 rounded-full bg-cyan-300 shadow-[0_0_10px_rgba(34,211,238,0.75)]" />
              <p className="text-xs uppercase tracking-[0.22em] text-white/65">Stack tecnológico</p>
            </div>
            <div
              className="overflow-hidden rounded-xl border border-white/15 bg-black/25 p-4"
              style={{
                maskImage: "linear-gradient(to right, transparent 0%, black 8%, black 92%, transparent 100%)",
                WebkitMaskImage: "linear-gradient(to right, transparent 0%, black 8%, black 92%, transparent 100%)",
              }}
            >
              <div className="animate-marquee flex w-max items-center gap-4">
                {marqueeLogos.map(({ label, icon: Icon, colorClass }, index) => (
                  <div
                    key={`${label}-${index}`}
                    className="flex min-w-[170px] items-center gap-3 rounded-xl border border-white/10 bg-slate-950/85 px-4 py-3 text-white/85 shadow-[inset_0_0_18px_rgba(148,163,184,0.08)]"
                  >
                    <Icon className={`h-6 w-6 ${colorClass}`} />
                    <span className="text-lg font-semibold">{label}</span>
                  </div>
                ))}
              </div>
            </div>
          </section>

          <section className="mt-16 border border-cyan-300/30 bg-black/40 p-4 shadow-[0_0_24px_rgba(34,211,238,0.15)] sm:p-6">
            <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
              <div>
                <p className="text-xs uppercase tracking-[0.2em] text-cyan-200/85">{t.terminalLabel}</p>
                <h2 className="mt-1 text-2xl font-semibold sm:text-3xl">{t.terminalTitle}</h2>
              </div>
              <div className="flex items-center gap-2 rounded-full border border-white/20 bg-black/45 px-3 py-1 text-xs text-white/70">
                <Command className="h-3.5 w-3.5" />
                <span>contacto@lucasvicente.es</span>
              </div>
            </div>

            <div className="overflow-hidden rounded-xl border border-cyan-300/25 bg-[linear-gradient(180deg,rgba(2,6,23,0.98),rgba(2,10,28,0.96))] shadow-[0_0_28px_rgba(34,211,238,0.14)]">
              <div className="flex items-center gap-2 border-b border-white/10 bg-slate-800/70 px-3 py-2">
                <span className="h-3 w-3 rounded-full bg-red-400" />
                <span className="h-3 w-3 rounded-full bg-amber-400" />
                <span className="h-3 w-3 rounded-full bg-green-400" />
                <span className="ml-3 text-xs text-white/60">lucas-console://ops</span>
              </div>
              <div
                ref={terminalViewportRef}
                className="h-80 overflow-y-auto px-4 py-3 font-mono text-sm text-white/90"
                onClick={() => terminalInputRef.current?.focus()}
              >
                {terminalLines.map((line, index) => (
                  <p key={`${line}-${index}`} className={`${line.startsWith("$ ") ? "text-cyan-300" : "text-white/85"}`}>
                    {line || "\u00A0"}
                  </p>
                ))}
                {typingLine ? (
                  <p className="text-white/85">
                    {typingLine}
                    <span className="terminal-caret">█</span>
                  </p>
                ) : null}

                <p className="mt-1 flex items-center gap-2 text-cyan-300">
                  <span>$</span>
                  <input
                    ref={terminalInputRef}
                    value={terminalInput}
                    onChange={(event) => setTerminalInput(event.target.value)}
                    onKeyDown={handleTerminalKeyDown}
                    placeholder={t.terminalPlaceholder}
                    className="w-full bg-transparent font-mono text-sm text-white outline-none placeholder:text-white/45"
                    aria-label={t.terminalPlaceholder}
                    autoComplete="off"
                    spellCheck={false}
                  />
                </p>
              </div>
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
                <div className="border-t border-white/15 pt-3">
                  <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-white/70">Core 5</p>
                  <div className="flex flex-wrap gap-2">
                    {coreStack.map(({ label, icon: Icon }) => (
                      <span key={label} className="inline-flex items-center gap-2 border border-cyan-300/35 bg-cyan-500/10 px-3 py-1.5 text-xs font-medium text-cyan-100">
                        <Icon className="h-3.5 w-3.5" />
                        {label}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="border-t border-white/15 pt-3">
                  <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-white/70">También he usado</p>
                  <div className="flex flex-wrap gap-2">
                    {alsoUsedStack.map(({ label, icon: Icon }) => (
                      <span key={label} className="inline-flex items-center gap-2 border border-white/20 bg-white/5 px-3 py-1.5 text-xs font-medium text-white">
                        <Icon className="h-3.5 w-3.5" />
                        {label}
                      </span>
                    ))}
                  </div>
                </div>
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
                  href={LINKS.linkedinProfile}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 border border-emerald-200/35 bg-black/25 px-5 py-2.5 font-medium text-emerald-50 transition hover:bg-emerald-500/20"
                >
                  <Linkedin className="h-4 w-4" />
                  LinkedIn
                </a>
                <a
                  href={LINKS.githubProfile}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 border border-emerald-200/35 bg-black/25 px-5 py-2.5 font-medium text-emerald-50 transition hover:bg-emerald-500/20"
                >
                  <Github className="h-4 w-4" />
                  GitHub
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
                href={LINKS.githubPortfolio}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 border border-rose-300/60 bg-rose-500/22 px-4 py-2 font-medium text-rose-50 shadow-[0_0_14px_rgba(244,63,94,0.24)] transition duration-200 hover:-translate-y-0.5 hover:scale-[1.02] hover:bg-rose-500/36 hover:shadow-[0_0_22px_rgba(244,63,94,0.34)] active:translate-y-0 active:scale-100"
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










