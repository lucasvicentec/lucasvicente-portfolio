import { lazy, Suspense, useMemo, useState } from "react";
import {
  ArrowRight,
  ArrowUpRight,
  BriefcaseBusiness,
  Github,
  Linkedin,
  Mail,
  ShieldCheck,
  Sparkles,
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

const projects: Project[] = [
  {
    title: "StackWatch",
    tag: "New",
    type: "Monitoring Platform",
    headline: "Public status page + private admin + incident lifecycle for VPS monitoring.",
    challenge:
      "Build a self-hosted monitor that is easy to run but still production ready: auth, rate-limit, historical metrics, and reliable checks.",
    architecture:
      "Next.js app with public/admin surfaces, PostgreSQL persistence, internal check runner, and worker loop for periodic checks and incident open/close logic.",
    impact: "Turns infrastructure health into a clear product surface with real-time state and historical context.",
    stack: "Next.js 16, TypeScript, PostgreSQL, Docker, Docker Swarm",
    repo: "https://github.com/lucksgg7/stackwatch",
  },
  {
    title: "MD-Ingelligence",
    tag: "Production",
    type: "Automation / Integrations",
    headline: "Operational platform to reduce manual UT searches and repetitive internal tasks.",
    challenge: "Normalize heterogeneous data while keeping fast response times across complex filters.",
    architecture: "Product-oriented platform with focused utilities, SAP-related workflows, and maintainable backend logic.",
    impact: "Lower friction for daily operations and better throughput in repetitive processes.",
    stack: "Next.js, TypeScript, PostgreSQL, Tailwind, APIs",
    live: "http://md.lucasvicente.es/",
  },
  {
    title: "Hytalia",
    tag: "Production",
    type: "Network / Infrastructure",
    headline: "End-to-end technical ecosystem: web, store, APIs, infra, and internal management tools.",
    challenge: "Coordinate multiple systems with evolving requirements and continuous availability needs.",
    architecture: "Unified platform design connecting product, internal operations, and deployment infrastructure.",
    impact: "Scalable technical base for platform growth and continuous product evolution.",
    stack: "TypeScript, Python, Nginx, Docker, Redis, PostgreSQL",
    live: "https://www.hytalia.net",
  },
];

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
    navHiring: "Hiring",
    openToWork: "Disponible para remoto o hibrido",
    eyebrow: "Full-stack engineer con foco en sistemas reales",
    title: "Construyo software que mejora operaciones y escala sin romperse.",
    intro:
      "Diseno y entrego productos tecnicos end-to-end: frontend, backend, automatizacion, infraestructura y despliegue. Mi foco es impacto real y mantenibilidad.",
    ctaProjects: "Ver casos",
    ctaContact: "Contactar",
    ctaGitHub: "Github",
    proofTitle: "Senales que importan a reclutadores y equipos",
    proofItems: [
      { label: "Ownership", value: "End-to-end" },
      { label: "Entorno", value: "Produccion" },
      { label: "Especialidad", value: "Automation + Infra" },
      { label: "Modo", value: "Build / Operate / Improve" },
    ],
    featuredTitle: "Featured Case Studies",
    featuredSubtitle: "Cada proyecto esta presentado con reto, arquitectura e impacto.",
    challenge: "Reto",
    architecture: "Arquitectura",
    impact: "Impacto",
    stack: "Stack",
    viewRepo: "Ver repo",
    viewLive: "Ver online",
    processTitle: "Como trabajo para entregar valor rapido y estable",
    processItems: [
      "Empiezo por problema de negocio y criterio de exito medible.",
      "Diseno arquitectura simple para hoy, extensible para manana.",
      "Automatizo despliegues y operaciones repetitivas desde el inicio.",
      "Priorizo observabilidad y fiabilidad en produccion.",
    ],
    hiringTitle: "Si buscas alguien que tome ownership tecnico real",
    hiringText:
      "Estoy abierto a freelance, contrato o full-time. Puedo entrar en proyectos existentes o construir desde cero con enfoque de producto y operaciones.",
    hiringPoints: ["Rapido en ejecucion", "Solido en produccion", "Comunicacion clara con negocio y equipo"],
    sendEmail: "Enviar email",
  },
  en: {
    navProjects: "Cases",
    navProcess: "Process",
    navHiring: "Hiring",
    openToWork: "Open to remote or hybrid roles",
    eyebrow: "Full-stack engineer focused on real-world systems",
    title: "I build software that improves operations and scales without breaking.",
    intro:
      "I design and ship end-to-end technical products: frontend, backend, automation, infrastructure, and deployment. My focus is measurable impact and maintainability.",
    ctaProjects: "View cases",
    ctaContact: "Contact",
    ctaGitHub: "Github",
    proofTitle: "Signals recruiters and teams actually care about",
    proofItems: [
      { label: "Ownership", value: "End-to-end" },
      { label: "Environment", value: "Production" },
      { label: "Specialty", value: "Automation + Infra" },
      { label: "Mode", value: "Build / Operate / Improve" },
    ],
    featuredTitle: "Featured Case Studies",
    featuredSubtitle: "Each project is presented by challenge, architecture, and impact.",
    challenge: "Challenge",
    architecture: "Architecture",
    impact: "Impact",
    stack: "Stack",
    viewRepo: "Open repo",
    viewLive: "Open live",
    processTitle: "How I work to deliver value fast and reliably",
    processItems: [
      "Start from business problem and measurable success criteria.",
      "Design architecture simple for now, extensible for later.",
      "Automate deploy and repetitive operations from day one.",
      "Prioritize observability and production reliability.",
    ],
    hiringTitle: "If you need someone with real technical ownership",
    hiringText:
      "Open to freelance, contract, or full-time opportunities. I can join existing systems or build from scratch with product and operations mindset.",
    hiringPoints: ["Fast execution", "Production reliability", "Clear communication with product and team"],
    sendEmail: "Send email",
  },
} as const;

function App() {
  const [lang, setLang] = useState<Locale>("es");
  const t = copy[lang];

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
            <a href="#inicio" className="flex items-center gap-2 px-1 py-2 text-white">
              <img src="/favicon/favicon-32x32.png" alt="Lucas Vicente logo" className="h-6 w-6 object-contain" />
              <span className="font-semibold tracking-[0.1em]">lucasvicente.es</span>
            </a>

            <div className="hidden items-center gap-6 sm:flex">
              <a href="#casos" className="border-b border-transparent pb-1 transition hover:border-white/60 hover:text-white">
                {t.navProjects}
              </a>
              <a href="#metodo" className="border-b border-transparent pb-1 transition hover:border-white/60 hover:text-white">
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

        <main id="inicio" className="pt-16">
          <section className="grid gap-10 lg:grid-cols-[1.2fr_0.8fr] lg:items-end">
            <div>
              <p className="mb-4 inline-flex items-center gap-2 border border-emerald-300/40 bg-emerald-500/10 px-3 py-1 text-xs uppercase tracking-[0.2em] text-emerald-100">
                <ShieldCheck className="h-3.5 w-3.5" />
                {t.openToWork}
              </p>

              <p className="mb-4 inline-flex items-center gap-2 border border-white/15 bg-black/35 px-3 py-1 text-xs uppercase tracking-[0.18em] text-white/80">
                <Sparkles className="h-3.5 w-3.5" />
                {t.eyebrow}
              </p>

              <h1 className="max-w-4xl text-balance text-4xl font-semibold leading-tight sm:text-6xl">{t.title}</h1>
              <p className="mt-5 max-w-3xl text-pretty text-base text-white/80 sm:text-lg">{t.intro}</p>

              <div className="mt-8 flex flex-wrap gap-3">
                <a
                  href="#casos"
                  className="inline-flex items-center gap-2 border border-white/25 bg-white/10 px-5 py-2.5 font-medium text-white transition hover:bg-white/20"
                >
                  {t.ctaProjects}
                  <ArrowRight className="h-4 w-4" />
                </a>
                <a
                  href="#hiring"
                  className="border border-white/25 px-5 py-2.5 font-medium text-white transition hover:bg-white/10"
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

            <aside className="border-l border-white/20 pl-5">
              <p className="text-xs uppercase tracking-[0.22em] text-white/60">Proof</p>
              <h2 className="mt-2 text-base font-semibold text-white/90">{t.proofTitle}</h2>
              <div className="mt-4 space-y-3">
                {t.proofItems.map((item) => (
                  <div key={item.label} className="border-b border-white/10 pb-2">
                    <p className="text-xs uppercase tracking-wide text-white/55">{item.label}</p>
                    <p className="text-lg font-semibold text-white">{item.value}</p>
                  </div>
                ))}
              </div>
            </aside>
          </section>

          <section id="casos" className="mt-20">
            <div className="mb-7 flex flex-wrap items-end justify-between gap-3 border-b border-white/20 pb-3">
              <div>
                <p className="text-xs uppercase tracking-[0.24em] text-cyan-200/80">Case studies</p>
                <h2 className="mt-1 text-2xl font-semibold sm:text-3xl">{t.featuredTitle}</h2>
              </div>
              <p className="max-w-xl text-sm text-white/70">{t.featuredSubtitle}</p>
            </div>

            <div className="space-y-8">
              {projects.map((project, index) => (
                <article key={project.title} className="grid gap-4 border-l-2 border-white/25 pl-4 md:grid-cols-[160px_1fr] md:gap-6 md:pl-6">
                  <div className="flex items-start justify-between md:block">
                    <span className="inline-flex border border-white/20 bg-black/35 px-2 py-1 text-xs uppercase tracking-wide text-white/80">
                      {project.tag}
                    </span>
                    <p className="text-xs uppercase tracking-[0.18em] text-white/50">{String(index + 1).padStart(2, "0")}</p>
                  </div>

                  <div className="space-y-3 bg-black/25 p-4">
                    <div className="flex flex-wrap items-center gap-3">
                      <h3 className="text-xl font-semibold text-card-foreground">{project.title}</h3>
                      <span className="border border-cyan-300/35 bg-cyan-400/10 px-2 py-0.5 text-xs uppercase tracking-wide text-cyan-200">
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
                          className="inline-flex items-center gap-2 border border-white/20 px-4 py-2 text-sm font-medium text-white hover:bg-white/10"
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
                          className="inline-flex items-center gap-2 border border-white/20 px-4 py-2 text-sm font-medium text-white hover:bg-white/10"
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

          <section id="metodo" className="mt-20 grid gap-8 lg:grid-cols-[1fr_1fr]">
            <article className="border border-white/20 bg-black/30 p-6">
              <p className="text-xs uppercase tracking-[0.2em] text-emerald-200/80">Method</p>
              <h2 className="mt-2 text-2xl font-semibold sm:text-3xl">{t.processTitle}</h2>

              <ol className="mt-5 space-y-3 text-sm text-white/80">
                {t.processItems.map((item, idx) => (
                  <li key={item} className="grid grid-cols-[28px_1fr] gap-3 border-t border-white/10 pt-3">
                    <span className="text-sm font-semibold text-cyan-200">{idx + 1}.</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ol>
            </article>

            <article className="border border-white/20 bg-black/30 p-6">
              <p className="text-xs uppercase tracking-[0.2em] text-emerald-200/80">Tooling</p>
              <h2 className="mt-2 text-2xl font-semibold sm:text-3xl">Tech Stack</h2>
              <p className="mt-2 text-xs text-white/60">{skillsCount} herramientas usadas en producto, backend e infraestructura.</p>

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

          <section id="hiring" className="mt-20 border border-white/25 bg-[linear-gradient(120deg,rgba(255,255,255,0.09),rgba(255,255,255,0.02))] p-6 sm:p-8">
            <div className="grid gap-6 lg:grid-cols-[1fr_auto] lg:items-end">
              <div>
                <p className="inline-flex items-center gap-2 border border-white/20 bg-black/30 px-3 py-1 text-xs uppercase tracking-[0.16em] text-white/80">
                  <BriefcaseBusiness className="h-3.5 w-3.5" />
                  Hiring
                </p>
                <h2 className="mt-4 text-2xl font-semibold sm:text-3xl">{t.hiringTitle}</h2>
                <p className="mt-3 max-w-3xl text-white/75">{t.hiringText}</p>
                <ul className="mt-4 flex flex-wrap gap-2 text-sm text-white/85">
                  {t.hiringPoints.map((point) => (
                    <li key={point} className="border border-emerald-300/35 bg-emerald-500/10 px-3 py-1">
                      {point}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="flex flex-wrap gap-3">
                <a
                  href="mailto:lucasvicentecerri6@gmail.com?subject=Hiring%20conversation&body=Hola%20Lucas%2C%20quiero%20hablar%20sobre%20una%20oportunidad..."
                  className="inline-flex items-center gap-2 border border-white/20 bg-white/10 px-5 py-2.5 font-medium text-white transition hover:bg-white/15"
                >
                  <Mail className="h-4 w-4" />
                  {t.sendEmail}
                </a>
                <a
                  href="https://www.linkedin.com/in/lucas-esteban-vicente-cerri-3073a8330/"
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 border border-white/20 px-5 py-2.5 font-medium text-white transition hover:bg-white/10"
                >
                  <Linkedin className="h-4 w-4" />
                  LinkedIn
                </a>
                <a
                  href="https://github.com/lucksgg7"
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 border border-white/20 px-5 py-2.5 font-medium text-white transition hover:bg-white/10"
                >
                  <Github className="h-4 w-4" />
                  Github
                </a>
              </div>
            </div>
          </section>
        </main>
      </div>
    </div>
  );
}

export default App;
