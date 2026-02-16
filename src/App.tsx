import { ArrowUpRight, Linkedin, Orbit, Sparkles } from "lucide-react";
import { InteractiveNebulaShader } from "@/components/ui/liquid-shader";

const projects = [
  {
    title: "MadridDigital-Lucas",
    description: "Repositorio publico de Lucas Vicente con trabajo tecnico orientado a web.",
    image:
      "https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=1200&q=80",
    href: "https://github.com/lucksgg7/MadridDigital-Lucas",
  },
  {
    title: "ServerMappings",
    description: "Proyecto centrado en mapeo y estructura para entornos de servidor.",
    image:
      "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1200&q=80",
    href: "https://github.com/lucksgg7/ServerMappings",
  },
  {
    title: "lucksgg7",
    description: "Repositorio de perfil y presencia publica de GitHub.",
    image:
      "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&w=1200&q=80",
    href: "https://github.com/lucksgg7/lucksgg7",
  },
];

function App() {
  return (
    <div className="relative isolate min-h-screen overflow-hidden bg-background">
      <InteractiveNebulaShader className="opacity-95" />

      <div className="relative z-10 mx-auto flex w-full max-w-6xl flex-col px-4 pb-24 pt-6 sm:px-6 lg:px-8">
        <header className="mx-auto w-full max-w-4xl rounded-full border border-white/15 bg-black/55 p-2 backdrop-blur-xl">
          <nav className="flex items-center justify-between gap-3 text-sm text-white/80">
            <a href="#inicio" className="flex items-center gap-2 rounded-full px-3 py-2 text-white">
              <Orbit className="h-5 w-5" />
              <span className="font-semibold tracking-wide">lucasvicente.es</span>
            </a>
            <div className="flex items-center gap-1">
              <a
                href="#proyectos"
                className="rounded-full px-4 py-2 transition hover:bg-white/10 hover:text-white"
              >
                Proyectos
              </a>
              <a
                href="https://github.com/lucksgg7"
                target="_blank"
                rel="noreferrer"
                className="rounded-full px-4 py-2 transition hover:bg-white/10 hover:text-white"
              >
                Github
              </a>
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
          </nav>
        </header>

        <main id="inicio" className="pt-24">
          <section className="max-w-3xl">
            <p className="mb-4 inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-3 py-1 text-xs uppercase tracking-[0.2em] text-white/80">
              <Sparkles className="h-3.5 w-3.5" />
              React Developer Portfolio
            </p>
            <h1 className="text-balance text-4xl font-semibold leading-tight sm:text-6xl">
              Construyo productos web con foco en experiencia, rendimiento y detalle visual.
            </h1>
            <p className="mt-5 max-w-2xl text-pretty text-base text-white/75 sm:text-lg">
              Soy Lucas Vicente (@lucksgg7). Este portfolio conecta mi GitHub y LinkedIn con una experiencia
              visual creada en React, TypeScript, Tailwind y un fondo shader interactivo.
            </p>
            <div className="mt-5 flex flex-wrap gap-2 text-xs text-white/75">
              <span className="rounded-full border border-white/20 bg-white/5 px-3 py-1">GitHub followers: 3</span>
              <span className="rounded-full border border-white/20 bg-white/5 px-3 py-1">GitHub following: 5</span>
              <span className="rounded-full border border-white/20 bg-white/5 px-3 py-1">Repos publicos: 3</span>
            </div>
            <div className="mt-8 flex flex-wrap gap-3">
              <a
                href="#proyectos"
                className="rounded-full border border-white/20 bg-white/10 px-5 py-2.5 font-medium text-white transition hover:bg-white/15"
              >
                Ver proyectos
              </a>
              <a
                href="https://github.com/lucksgg7"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 rounded-full border border-white/20 px-5 py-2.5 font-medium text-white transition hover:bg-white/10"
              >
                Ir a Github
                <ArrowUpRight className="h-4 w-4" />
              </a>
            </div>
          </section>

          <section id="proyectos" className="mt-16">
            <h2 className="text-2xl font-semibold sm:text-3xl">Proyectos</h2>
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
                    <p className="text-sm text-muted-foreground">{project.description}</p>
                    <a
                      href={project.href}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-2 text-sm font-medium text-white/90 hover:text-white"
                    >
                      Ver caso
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
