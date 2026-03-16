import { useEffect, useRef, useState, useCallback } from "react";
import gsap from "gsap";

interface SplashPageProps {
  onEnterPortfolio: () => void;
}

export default function SplashPage({ onEnterPortfolio }: SplashPageProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const nameRef = useRef<HTMLDivElement>(null);
  const subtitleRef = useRef<HTMLDivElement>(null);
  const buttonsRef = useRef<HTMLDivElement>(null);
  const lineLeftRef = useRef<HTMLDivElement>(null);
  const lineRightRef = useRef<HTMLDivElement>(null);
  const [exiting, setExiting] = useState(false);
  const animFrameRef = useRef<number>(0);

  // Particle canvas background
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let w = (canvas.width = window.innerWidth);
    let h = (canvas.height = window.innerHeight);

    const particles: {
      x: number;
      y: number;
      vx: number;
      vy: number;
      size: number;
      alpha: number;
      color: string;
    }[] = [];

    const colors = [
      "rgba(34,211,238,", // cyan
      "rgba(132,0,255,",  // purple
      "rgba(16,185,129,", // emerald
      "rgba(255,255,255,", // white
    ];

    for (let i = 0; i < 80; i++) {
      particles.push({
        x: Math.random() * w,
        y: Math.random() * h,
        vx: (Math.random() - 0.5) * 0.4,
        vy: (Math.random() - 0.5) * 0.4,
        size: Math.random() * 2 + 0.5,
        alpha: Math.random() * 0.5 + 0.1,
        color: colors[Math.floor(Math.random() * colors.length)],
      });
    }

    const animate = () => {
      ctx.clearRect(0, 0, w, h);

      // Draw connections
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 150) {
            ctx.beginPath();
            ctx.strokeStyle = `rgba(34,211,238,${0.03 * (1 - dist / 150)})`;
            ctx.lineWidth = 0.5;
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.stroke();
          }
        }
      }

      // Draw particles
      for (const p of particles) {
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < 0 || p.x > w) p.vx *= -1;
        if (p.y < 0 || p.y > h) p.vy *= -1;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = p.color + p.alpha + ")";
        ctx.fill();
      }

      animFrameRef.current = requestAnimationFrame(animate);
    };

    animate();

    const handleResize = () => {
      w = canvas.width = window.innerWidth;
      h = canvas.height = window.innerHeight;
    };
    window.addEventListener("resize", handleResize);

    return () => {
      cancelAnimationFrame(animFrameRef.current);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  // GSAP entrance animations
  useEffect(() => {
    const tl = gsap.timeline({ defaults: { ease: "power4.out" } });

    // Animate each letter of the name
    const letters = nameRef.current?.querySelectorAll(".splash-letter");
    if (letters) {
      gsap.set(letters, { y: 120, opacity: 0, rotateX: -90 });
      tl.to(letters, {
        y: 0,
        opacity: 1,
        rotateX: 0,
        duration: 1.2,
        stagger: 0.04,
        ease: "back.out(1.7)",
      }, 0.3);
    }

    // Decorative lines
    gsap.set([lineLeftRef.current, lineRightRef.current], { scaleX: 0 });
    tl.to(lineLeftRef.current, { scaleX: 1, duration: 0.8, ease: "power3.inOut" }, 0.8);
    tl.to(lineRightRef.current, { scaleX: 1, duration: 0.8, ease: "power3.inOut" }, 0.8);

    // Subtitle
    gsap.set(subtitleRef.current, { y: 30, opacity: 0 });
    tl.to(subtitleRef.current, { y: 0, opacity: 1, duration: 0.8 }, 1.2);

    // Buttons
    const buttons = buttonsRef.current?.querySelectorAll(".splash-btn");
    if (buttons) {
      gsap.set(buttons, { y: 50, opacity: 0, scale: 0.9 });
      tl.to(buttons, {
        y: 0,
        opacity: 1,
        scale: 1,
        duration: 0.8,
        stagger: 0.15,
        ease: "back.out(1.4)",
      }, 1.5);
    }
  }, []);

  const handleExit = useCallback(
    (destination: "studio" | "portfolio") => {
      if (exiting) return;
      setExiting(true);

      const tl = gsap.timeline({
        onComplete: () => {
          if (destination === "studio") {
            window.open("https://studio.lucasvicente.es", "_blank", "noopener,noreferrer");
          } else {
            onEnterPortfolio();
          }
        },
      });

      // Exit animation
      const letters = nameRef.current?.querySelectorAll(".splash-letter");
      const buttons = buttonsRef.current?.querySelectorAll(".splash-btn");

      tl.to(buttons || [], {
        y: -30,
        opacity: 0,
        scale: 0.9,
        duration: 0.4,
        stagger: 0.05,
        ease: "power2.in",
      }, 0);

      tl.to(subtitleRef.current, { y: -20, opacity: 0, duration: 0.3 }, 0.1);
      tl.to([lineLeftRef.current, lineRightRef.current], { scaleX: 0, duration: 0.4, ease: "power3.in" }, 0.1);

      tl.to(letters || [], {
        y: -100,
        opacity: 0,
        rotateX: 90,
        duration: 0.6,
        stagger: 0.02,
        ease: "power3.in",
      }, 0.2);

      tl.to(containerRef.current, {
        opacity: 0,
        duration: 0.3,
      }, 0.7);
    },
    [exiting, onEnterPortfolio],
  );

  const nameText = "LUCAS VICENTE";

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-[9999] flex flex-col items-center justify-center overflow-hidden"
      style={{ background: "hsl(224, 58%, 4%)" }}
    >
      {/* Particle canvas */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 pointer-events-none"
        style={{ opacity: 0.6 }}
      />

      {/* Radial glow behind name */}
      <div
        className="absolute pointer-events-none"
        style={{
          width: "700px",
          height: "700px",
          background:
            "radial-gradient(circle, rgba(34,211,238,0.08) 0%, rgba(132,0,255,0.04) 40%, transparent 70%)",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -55%)",
        }}
      />

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center gap-6 px-4">
        {/* Line left */}
        <div className="flex items-center gap-4 w-full max-w-2xl">
          <div
            ref={lineLeftRef}
            className="h-px flex-1 origin-right"
            style={{
              background:
                "linear-gradient(to left, rgba(34,211,238,0.5), transparent)",
            }}
          />
          <div className="w-2 h-2 rounded-full bg-cyan-400/50" />
        </div>

        {/* Name */}
        <div
          ref={nameRef}
          className="flex flex-wrap justify-center"
          style={{ perspective: "800px" }}
        >
          {nameText.split("").map((char, i) => (
            <span
              key={i}
              className="splash-letter inline-block text-4xl sm:text-7xl md:text-8xl lg:text-9xl font-bold tracking-tight select-none"
              style={{
                color: "transparent",
                backgroundImage:
                  "linear-gradient(135deg, #fff 0%, rgba(34,211,238,0.9) 50%, rgba(132,0,255,0.8) 100%)",
                backgroundClip: "text",
                WebkitBackgroundClip: "text",
                textShadow: "0 0 80px rgba(34,211,238,0.15)",
                transformStyle: "preserve-3d",
              }}
            >
              {char === " " ? "\u00A0" : char}
            </span>
          ))}
        </div>

        {/* Line right */}
        <div className="flex items-center gap-4 w-full max-w-2xl">
          <div className="w-2 h-2 rounded-full bg-purple-500/50" />
          <div
            ref={lineRightRef}
            className="h-px flex-1 origin-left"
            style={{
              background:
                "linear-gradient(to right, rgba(132,0,255,0.5), transparent)",
            }}
          />
        </div>

        {/* Subtitle */}
        <div
          ref={subtitleRef}
          className="flex flex-col items-center gap-1 mt-2"
        >
          <span className="text-sm sm:text-base tracking-[0.3em] uppercase text-white/40 font-medium">
            Full Stack Developer
          </span>
          <span className="text-xs sm:text-sm text-white/25 tracking-wide">
            Construyo software que escala sin romperse
          </span>
        </div>

        {/* Buttons */}
        <div ref={buttonsRef} className="flex flex-col sm:flex-row gap-5 mt-8">
          <button
            onClick={() => handleExit("studio")}
            className="splash-btn group relative px-10 py-4 rounded-xl text-lg font-semibold tracking-widest uppercase overflow-hidden transition-all duration-300 hover:scale-105 focus:outline-none"
            style={{
              background:
                "linear-gradient(135deg, rgba(132,0,255,0.15) 0%, rgba(132,0,255,0.05) 100%)",
              border: "1px solid rgba(132,0,255,0.3)",
              color: "#c084fc",
            }}
          >
            <span className="relative z-10 flex flex-col items-center gap-1">
              <span className="flex items-center gap-3">
                STUDIO
                <svg
                  className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M7 17L17 7M17 7H7m10 0v10" />
                </svg>
              </span>
              <span className="text-[10px] sm:text-xs font-normal tracking-wider text-purple-300/50 normal-case">
                Servicios y soluciones para empresas
              </span>
            </span>
            <div
              className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
              style={{
                background:
                  "linear-gradient(135deg, rgba(132,0,255,0.25) 0%, rgba(132,0,255,0.1) 100%)",
              }}
            />
            <div
              className="absolute -inset-1 opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-xl"
              style={{ background: "rgba(132,0,255,0.15)" }}
            />
          </button>

          <button
            onClick={() => handleExit("portfolio")}
            className="splash-btn group relative px-10 py-4 rounded-xl text-lg font-semibold tracking-widest uppercase overflow-hidden transition-all duration-300 hover:scale-105 focus:outline-none"
            style={{
              background:
                "linear-gradient(135deg, rgba(34,211,238,0.15) 0%, rgba(34,211,238,0.05) 100%)",
              border: "1px solid rgba(34,211,238,0.3)",
              color: "#22d3ee",
            }}
          >
            <span className="relative z-10 flex flex-col items-center gap-1">
              <span className="flex items-center gap-3">
                PORTFOLIO
                <svg
                  className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </span>
              <span className="text-[10px] sm:text-xs font-normal tracking-wider text-cyan-300/50 normal-case">
                Proyectos, stack y experiencia
              </span>
            </span>
            <div
              className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
              style={{
                background:
                  "linear-gradient(135deg, rgba(34,211,238,0.25) 0%, rgba(34,211,238,0.1) 100%)",
              }}
            />
            <div
              className="absolute -inset-1 opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-xl"
              style={{ background: "rgba(34,211,238,0.15)" }}
            />
          </button>
        </div>
      </div>
    </div>
  );
}
