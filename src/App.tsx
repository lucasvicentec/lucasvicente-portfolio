import { useEffect, useMemo, useState } from "react";
import { ArrowUpRight, Linkedin, Orbit, Sparkles } from "lucide-react";
import { InteractiveNebulaShader } from "@/components/ui/liquid-shader";

type Locale = "es" | "en";

type Project = {
  title: string;
  image: string;
  href: string;
  description: Record<Locale, string>;
};

const projects: Project[] = [
  {
    title: "MD-Intelligence",
    description: {
      es: "Proyecto publico enfocado en inteligencia aplicada, automatizacion y sistemas conectados.",
      en: "Public project focused on applied intelligence, automation, and connected systems.",
    },
    image:
      "https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=1200&q=80",
    href: "https://github.com/lucksgg7/MD-Intelligence",
  },
];

const copy = {
  es: {
    projects: "Proyectos",
    github: "Github",
    about: "Sobre mi",
    heroTag: "Hey, soy Lucas (Lucks)",
    heroTitle: "Desarrollador Full Stack construyendo sistemas reales.",
    heroDescription:
      "Trabajo en paneles, APIs, automatizacion, servidores e infraestructura. Proyecto actual: Hytalia (Network + sistemas propios).",
    collab: "Abierto a colaboraciones",
    ctaProjects: "Ver proyectos",
    ctaGithub: "Ir a Github",
    sectionTitle: "Proyectos publicos",
    statsFollowers: "Followers",
    statsFollowing: "Following",
    statsRepos: "Repos publicos",
    statsCommits: "Commits este mes (live)",
    stackTitle: "Stack tecnico",
    stack: [
      "TypeScript / JavaScript",
      "Python",
      "React / Vite / Tailwind",
      "Docker / Nginx / GitHub Actions",
      "PostgreSQL / SQLite / Redis",
      "Linux",
    ],
  },
  en: {
    projects: "Projects",
    github: "Github",
    about: "About",
    heroTag: "Hey, I'm Lucas (Lucks)",
    heroTitle: "Full Stack developer building real systems.",
    heroDescription:
      "I work on panels, APIs, automation, servers, and infrastructure. Current focus: Hytalia (Network + internal systems).",
    collab: "Open to collaborations",
    ctaProjects: "View projects",
    ctaGithub: "Open Github",
    sectionTitle: "Public projects",
    statsFollowers: "Followers",
    statsFollowing: "Following",
    statsRepos: "Public repos",
    statsCommits: "Commits this month (live)",
    stackTitle: "Tech stack",
    stack: [
      "TypeScript / JavaScript",
      "Python",
      "React / Vite / Tailwind",
      "Docker / Nginx / GitHub Actions",
      "PostgreSQL / SQLite / Redis",
      "Linux",
    ],
  },
} as const;

function App() {
  const [locale, setLocale] = useState<Locale>("es");
  const [stats, setStats] = useState({
    followers: null as number | null,
    following: null as number | null,
    publicRepos: null as number | null,
    monthCommits: null as number | null,
  });
  const t = useMemo(() => copy[locale], [locale]);

  useEffect(() => {
    const getCommitCount = async (repo: string, since: string, until: string): Promise<number> => {
      const url = `https://api.github.com/repos/${repo}/commits?author=lucksgg7&since=${since}&until=${until}&per_page=1`;
      const res = await fetch(url);
      if (!res.ok) return 0;

      const link = res.headers.get("link");
      if (link) {
        const last = link.match(/&page=(\d+)>; rel="last"/);
        if (last?.[1]) return Number(last[1]);
      }

      const items = (await res.json()) as unknown[];
      return items.length;
    };

    const load = async () => {
      try {
        const now = new Date();
        const sinceDate = new Date(Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), 1, 0, 0, 0));
        const since = sinceDate.toISOString();
        const until = now.toISOString();

        const [userRes, hytaliaWebCount, journeyCount] = await Promise.all([
          fetch("https://api.github.com/users/lucksgg7"),
          getCommitCount("HytaliaNetwork/hytalia-web", since, until),
          getCommitCount("HytaliaNetwork/hytale-plugin-journey", since, until),
        ]);

        if (userRes.ok) {
          const user = (await userRes.json()) as {
            followers: number;
            following: number;
            public_repos: number;
          };
          setStats({
            followers: user.followers,
            following: user.following,
            publicRepos: user.public_repos,
            monthCommits: hytaliaWebCount + journeyCount,
          });
        }
      } catch {
        // Keep fallbacks when GitHub API is unavailable.
      }
    };

    load();
  }, []);

  return (
    <div className="relative isolate min-h-screen overflow-hidden bg-background">
      <InteractiveNebulaShader className="opacity-95" />

      <div className="relative z-10 mx-auto flex w-full max-w-6xl flex-col px-4 pb-24 pt-6 sm:px-6 lg:px-8">
        <header className="mx-auto w-full max-w-5xl rounded-full border border-white/15 bg-black/55 p-2 backdrop-blur-xl">
          <nav className="flex items-center justify-between gap-3 text-sm text-white/80">
            <a href="#inicio" className="flex items-center gap-2 rounded-full px-3 py-2 text-white">
              <Orbit className="h-5 w-5" />
              <span className="font-semibold tracking-wide">lucasvicente.es</span>
            </a>

            <div className="hidden items-center gap-1 sm:flex">
              <a
                href="#proyectos"
                className="rounded-full px-4 py-2 transition hover:bg-white/10 hover:text-white"
              >
                {t.projects}
              </a>
              <a
                href="https://github.com/lucksgg7"
                target="_blank"
                rel="noreferrer"
                className="rounded-full px-4 py-2 transition hover:bg-white/10 hover:text-white"
              >
                {t.github}
              </a>
            </div>

            <div className="flex items-center gap-2">
              <div className="rounded-2xl border border-white/20 bg-white/5 p-1">
                <button
                  type="button"
                  onClick={() => setLocale("es")}
                  className={`rounded-xl px-3 py-2 text-xs font-semibold transition ${
                    locale === "es" ? "bg-white/20 text-white" : "text-white/70 hover:text-white"
                  }`}
                  aria-label="Cambiar idioma a espanol"
                >
                  ES
                </button>
                <button
                  type="button"
                  onClick={() => setLocale("en")}
                  className={`rounded-xl px-3 py-2 text-xs font-semibold transition ${
                    locale === "en" ? "bg-white/20 text-white" : "text-white/70 hover:text-white"
                  }`}
                  aria-label="Switch language to english"
                >
                  EN
                </button>
              </div>

              <a
                href="https://www.linkedin.com/in/lucas-esteban-vicente-cerri-3073a8330/"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 rounded-full bg-white px-4 py-2 font-semibold text-black transition hover:bg-white/90"
              >
                <Linkedin className="h-4 w-4" />
                LinkedIn
              </a>
            </div>
          </nav>
        </header>

        <main id="inicio" className="pt-20">
          <section className="max-w-4xl">
            <div className="mb-4 flex flex-wrap items-center gap-3">
              <p className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-3 py-1 text-xs uppercase tracking-[0.2em] text-white/80">
                <Sparkles className="h-3.5 w-3.5" />
                {t.heroTag}
              </p>
              <span className="inline-flex items-center gap-2 rounded-full border border-emerald-400/40 bg-emerald-500/10 px-4 py-1.5 text-sm font-medium text-emerald-200">
                <span className="relative flex h-2.5 w-2.5">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
                  <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-emerald-300 shadow-[0_0_12px_rgba(110,231,183,0.8)]" />
                </span>
                {t.collab}
              </span>
            </div>

            <h1 className="text-balance text-4xl font-semibold leading-tight sm:text-6xl">{t.heroTitle}</h1>

            <p className="mt-5 max-w-3xl text-pretty text-base text-white/80 sm:text-lg">{t.heroDescription}</p>

            <div className="mt-5 flex flex-wrap gap-2 text-xs text-white/90">
              <span className="rounded-full border border-cyan-300/40 bg-cyan-500/10 px-3 py-1.5 font-medium shadow-[0_0_16px_rgba(34,211,238,0.18)]">
                {t.statsFollowers}: {stats.followers ?? "--"}
              </span>
              <span className="rounded-full border border-blue-300/40 bg-blue-500/10 px-3 py-1.5 font-medium shadow-[0_0_16px_rgba(96,165,250,0.18)]">
                {t.statsFollowing}: {stats.following ?? "--"}
              </span>
              <span className="rounded-full border border-violet-300/40 bg-violet-500/10 px-3 py-1.5 font-medium shadow-[0_0_16px_rgba(167,139,250,0.2)]">
                {t.statsRepos}: {stats.publicRepos ?? "--"}
              </span>
              <span className="rounded-full border border-emerald-300/40 bg-emerald-500/10 px-3 py-1.5 font-medium shadow-[0_0_16px_rgba(52,211,153,0.2)]">
                {t.statsCommits}: {stats.monthCommits ?? "--"}
              </span>
            </div>

            <div className="mt-6">
              <p className="mb-2 text-sm font-semibold text-white/90">{t.stackTitle}</p>
              <div className="flex flex-wrap gap-2">
                {t.stack.map((item) => (
                  <span key={item} className="rounded-full border border-white/15 bg-white/5 px-3 py-1 text-xs">
                    {item}
                  </span>
                ))}
              </div>
            </div>

            <div className="mt-8 flex flex-wrap gap-3">
              <a
                href="#proyectos"
                className="rounded-full border border-white/20 bg-white/10 px-5 py-2.5 font-medium text-white transition hover:bg-white/15"
              >
                {t.ctaProjects}
              </a>
              <a
                href="https://github.com/lucksgg7"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 rounded-full border border-white/20 px-5 py-2.5 font-medium text-white transition hover:bg-white/10"
              >
                {t.ctaGithub}
                <ArrowUpRight className="h-4 w-4" />
              </a>
            </div>
          </section>

          <section id="proyectos" className="mt-16">
            <h2 className="text-2xl font-semibold sm:text-3xl">{t.sectionTitle}</h2>
            <div className="mt-6 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {projects.map((project) => (
                <article
                  key={project.title}
                  className="group overflow-hidden rounded-2xl border border-white/15 bg-card/70 shadow-glow backdrop-blur-sm"
                >
                  <img
                    src={project.image}
                    alt={project.title}
                    className="h-44 w-full object-cover transition duration-500 group-hover:scale-105"
                    loading="lazy"
                  />
                  <div className="space-y-3 p-5">
                    <h3 className="text-lg font-semibold text-card-foreground">{project.title}</h3>
                    <p className="text-sm text-muted-foreground">{project.description[locale]}</p>
                    <a
                      href={project.href}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-2 text-sm font-medium text-white/90 hover:text-white"
                    >
                      Github
                      <ArrowUpRight className="h-4 w-4" />
                    </a>
                  </div>
                </article>
              ))}
            </div>
          </section>
        </main>
      </div>
    </div>
  );
}

export default App;
