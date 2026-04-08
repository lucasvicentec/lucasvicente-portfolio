import { useMemo } from "react";
import type { ProgressState, Track } from "../types";

interface DashboardProps {
  progress: ProgressState;
  tracks: Track[];
  onNavigate: (trackId: string) => void;
  onExercise?: (trackId: string, exerciseId: string) => void;
}

const DAILY_PLAN: { day: number; label: string; trackId?: string; exerciseId?: string }[] = [
  { day: 1, label: "JS - Teoria", trackId: "javascript", exerciseId: "js_theory" },
  { day: 2, label: "JS - Quiz + Array Methods", trackId: "javascript", exerciseId: "js_quiz" },
  { day: 3, label: "JS - Destructuring + Promesas", trackId: "javascript", exerciseId: "js2" },
  { day: 4, label: "JS - Closures + Debugging", trackId: "javascript", exerciseId: "js4" },
  { day: 5, label: "React - Teoria", trackId: "react", exerciseId: "react_theory" },
  { day: 6, label: "React - Quiz + Contador", trackId: "react", exerciseId: "react_quiz" },
  { day: 7, label: "React - Toggle + Fetch+Lista", trackId: "react", exerciseId: "r2" },
  { day: 8, label: "React - Formulario + Todo CRUD", trackId: "react", exerciseId: "r4" },
  { day: 9, label: "React - Custom Hook + Memo + Fetch Error", trackId: "react", exerciseId: "r6" },
  { day: 10, label: "Next.js - Teoria + Quiz", trackId: "nextjs", exerciseId: "nextjs_theory" },
  { day: 11, label: "TypeScript - Teoria + Quiz", trackId: "typescript", exerciseId: "ts_theory" },
  { day: 12, label: "TypeScript - Ejercicios", trackId: "typescript", exerciseId: "ts1" },
  { day: 13, label: "SQL - Teoria + Quiz", trackId: "sql", exerciseId: "sql_theory" },
  { day: 14, label: "SQL - Ejercicios", trackId: "sql", exerciseId: "sq1" },
  { day: 15, label: "DevOps - Teoria + Quiz", trackId: "devops", exerciseId: "devops_theory" },
  { day: 16, label: "DevOps - Ejercicios", trackId: "devops", exerciseId: "devops1" },
  { day: 17, label: "REPASO semana 2 (repetir quizzes)", trackId: "typescript", exerciseId: "ts_quiz" },
  { day: 18, label: "System Design - Teoria + Quiz", trackId: "system-design", exerciseId: "design_theory" },
  { day: 19, label: "System Design - URL Shortener", trackId: "system-design", exerciseId: "sd1" },
  { day: 20, label: "System Design - Chat + Feed", trackId: "system-design", exerciseId: "sd2" },
  { day: 21, label: "Behavioral - Teoria + Quiz", trackId: "behavioral", exerciseId: "behavioral_theory" },
  { day: 22, label: "Behavioral - Desafio + Conflicto", trackId: "behavioral", exerciseId: "b1" },
  { day: 23, label: "Behavioral - Fallo + Orgullo + Presion", trackId: "behavioral", exerciseId: "b3" },
  { day: 24, label: "Proyectos - Teoria", trackId: "projects", exerciseId: "projects_theory" },
  { day: 25, label: "Proyectos - Pitch Informo + Finesse", trackId: "projects", exerciseId: "p1" },
  { day: 26, label: "Proyectos - Trade-offs + Preguntas dificiles", trackId: "projects", exerciseId: "p3" },
  { day: 27, label: "REPASO semana 3", trackId: "system-design", exerciseId: "design_quiz" },
  { day: 28, label: "Simulacro - Coding Challenge", trackId: "simulacro", exerciseId: "m1" },
  { day: 29, label: "Simulacro - System Design", trackId: "simulacro", exerciseId: "m2" },
  { day: 30, label: "Simulacro - Behavioral", trackId: "simulacro", exerciseId: "m3" },
  { day: 31, label: "Simulacro - Live Coding", trackId: "simulacro", exerciseId: "m4" },
  { day: 32, label: "REPASO - Repetir ejercicios fallados" },
  { day: 33, label: "REPASO - JS + React quizzes", trackId: "javascript", exerciseId: "js_quiz" },
  { day: 34, label: "REPASO - TS + SQL + DevOps quizzes", trackId: "sql", exerciseId: "sql_quiz" },
  { day: 35, label: "REPASO - System Design + Behavioral", trackId: "behavioral", exerciseId: "behavioral_quiz" },
  { day: 36, label: "Mock interview con amigo/grabacion" },
  { day: 37, label: "Mock interview con amigo/grabacion" },
  { day: 38, label: "Repaso de respuestas modelo" },
  { day: 39, label: "Repaso ligero, descanso" },
  { day: 40, label: "DIA DE LA ENTREVISTA - Confianza total" },
];

export default function Dashboard({ progress, tracks, onNavigate, onExercise }: DashboardProps) {
  const totalExercises = useMemo(
    () => tracks.reduce((s, t) => s + t.exercises.length, 0),
    [tracks]
  );

  const completedCount = progress.completed.length;
  const pendingCount = totalExercises - completedCount;
  const progressPct = totalExercises > 0 ? Math.round((completedCount / totalExercises) * 100) : 0;

  // Week activity
  const today = new Date();
  const weekStart = new Date(today);
  weekStart.setDate(today.getDate() - today.getDay());
  let weekCount = 0;
  for (let i = 0; i < 7; i++) {
    const d = new Date(weekStart);
    d.setDate(weekStart.getDate() + i);
    const key = d.toISOString().slice(0, 10);
    weekCount += progress.dailyLog[key] || 0;
  }

  // Readiness
  let readiness = "Sin empezar";
  let readinessColor = "#666";
  if (progressPct >= 90) { readiness = "Listo!"; readinessColor = "#22c55e"; }
  else if (progressPct >= 60) { readiness = "Casi listo"; readinessColor = "#eab308"; }
  else if (progressPct >= 30) { readiness = "En camino"; readinessColor = "#f97316"; }
  else if (progressPct > 0) { readiness = "Empezando"; readinessColor = "#3b82f6"; }

  // Track progress
  const trackProgress = tracks.map((t) => {
    const done = t.exercises.filter((e) => progress.completed.includes(e.id)).length;
    return { track: t, done, total: t.exercises.length, pct: t.exercises.length > 0 ? Math.round((done / t.exercises.length) * 100) : 0 };
  });

  // Strong and weak areas
  const strong = trackProgress.filter((tp) => tp.pct >= 70).map((tp) => tp.track.title);
  const weak = trackProgress.filter((tp) => tp.pct < 30 && tp.total > 0).map((tp) => tp.track.title);

  // Calendar (last 90 days)
  const calendarDays: { date: string; count: number }[] = [];
  for (let i = 89; i >= 0; i--) {
    const d = new Date();
    d.setDate(d.getDate() - i);
    const key = d.toISOString().slice(0, 10);
    calendarDays.push({ date: key, count: progress.dailyLog[key] || 0 });
  }

  function getLevel(count: number) {
    if (count === 0) return 0;
    if (count <= 2) return 1;
    if (count <= 5) return 2;
    if (count <= 8) return 3;
    return 4;
  }

  const levelColors = ["#161b22", "#0e4429", "#006d32", "#26a641", "#39d353"];

  // Roadmap (6 weeks)
  const roadmap = [
    { week: 1, title: "Fundamentos", desc: "JavaScript + React + Next.js", tracks: ["javascript", "react", "nextjs"] },
    { week: 2, title: "Herramientas", desc: "TypeScript + SQL + DevOps", tracks: ["typescript", "sql", "devops"] },
    { week: 3, title: "Nivel Senior", desc: "System Design + Behavioral", tracks: ["system-design", "behavioral"] },
    { week: 4, title: "Cierre", desc: "Proyectos + Simulacro", tracks: ["projects", "simulacro"] },
    { week: 5, title: "Repaso Intensivo", desc: "Repetir quizzes y ejercicios", tracks: [] },
    { week: 6, title: "Dia Final", desc: "Mock interviews + dia final", tracks: [] },
  ];

  // 40-day plan: current day calculation
  const currentDay = useMemo(() => {
    if (!progress.startDate) return 1;
    const start = new Date(progress.startDate + "T00:00:00");
    const now = new Date();
    now.setHours(0, 0, 0, 0);
    const diff = Math.floor((now.getTime() - start.getTime()) / 86400000) + 1;
    return Math.max(1, Math.min(diff, 40));
  }, [progress.startDate]);

  return (
    <div className="dashboard">
      {/* Stats cards */}
      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-icon">🔥</div>
          <div className="stat-value">{progress.streak}</div>
          <div className="stat-label">Racha</div>
        </div>
        <div className="stat-card">
          <div className="stat-icon">✅</div>
          <div className="stat-value">{completedCount}</div>
          <div className="stat-label">Completados</div>
        </div>
        <div className="stat-card">
          <div className="stat-icon">📋</div>
          <div className="stat-value">{pendingCount}</div>
          <div className="stat-label">Pendientes</div>
        </div>
        <div className="stat-card">
          <div className="stat-icon">📅</div>
          <div className="stat-value">{weekCount}</div>
          <div className="stat-label">Esta semana</div>
        </div>
        <div className="stat-card">
          <div className="stat-icon">📊</div>
          <div className="stat-value">{progressPct}%</div>
          <div className="stat-label">Progreso</div>
        </div>
      </div>

      {/* Activity Calendar */}
      <div className="section-card">
        <h3>Actividad (90 dias)</h3>
        <div className="calendar-grid">
          {calendarDays.map((d) => (
            <div
              key={d.date}
              className="calendar-cell"
              style={{ background: levelColors[getLevel(d.count)] }}
              title={d.date + ": " + d.count + " actividades"}
            />
          ))}
        </div>
        <div className="calendar-legend">
          <span>Menos</span>
          {levelColors.map((c, i) => (
            <div
              key={i}
              className="calendar-cell"
              style={{ background: c }}
            />
          ))}
          <span>Mas</span>
        </div>
      </div>

      {/* Insights */}
      <div className="section-card">
        <h3>Insights</h3>
        <div className="readiness">
          <span>Nivel de preparacion:</span>
          <strong style={{ color: readinessColor, marginLeft: "8px" }}>
            {readiness}
          </strong>
        </div>
        <div className="insight-bar-wrap" style={{ marginTop: "12px" }}>
          <div className="insight-bar-bg">
            <div
              className="insight-bar-fill"
              style={{ width: progressPct + "%", background: readinessColor }}
            />
          </div>
          <span className="insight-bar-label">{progressPct}%</span>
        </div>

        {strong.length > 0 && (
          <div style={{ marginTop: "16px" }}>
            <strong style={{ color: "#22c55e" }}>Puntos fuertes:</strong>{" "}
            {strong.join(", ")}
          </div>
        )}
        {weak.length > 0 && (
          <div style={{ marginTop: "8px" }}>
            <strong style={{ color: "#f97316" }}>Areas a mejorar:</strong>{" "}
            {weak.join(", ")}
          </div>
        )}

        <div className="track-bars" style={{ marginTop: "20px" }}>
          {trackProgress.map((tp) => (
            <div key={tp.track.id} className="track-bar-row" onClick={() => onNavigate(tp.track.id)} style={{ cursor: "pointer" }}>
              <div className="track-bar-label">
                <span
                  className="track-bar-dot"
                  style={{ background: tp.track.color }}
                />
                {tp.track.title}
              </div>
              <div className="track-bar-bg">
                <div
                  className="track-bar-fill"
                  style={{
                    width: tp.pct + "%",
                    background: tp.track.color,
                  }}
                />
              </div>
              <span className="track-bar-pct">{tp.pct}%</span>
            </div>
          ))}
        </div>
      </div>

      {/* 40-day Plan */}
      <div className="section-card">
        <h3>Plan de 40 dias</h3>
        <p style={{ opacity: 0.7, marginBottom: "12px", fontSize: "14px" }}>
          Dia actual: <strong style={{ color: "#6c63ff" }}>{currentDay}</strong> de 40
        </p>
        <div style={{ maxHeight: "360px", overflowY: "auto", paddingRight: "8px" }}>
          {DAILY_PLAN.map((item) => {
            const isPast = item.day < currentDay;
            const isCurrent = item.day === currentDay;
            const isDayDone = item.exerciseId ? progress.completed.includes(item.exerciseId) : false;
            const isReview = item.label.startsWith("REPASO");
            const isFinal = item.day === 40;
            let bg = "#1a1a2e";
            let border = "1px solid #2a2a3e";
            if (isPast && isDayDone) { bg = "#0e2a1a"; border = "1px solid #22c55e44"; }
            else if (isPast && !isDayDone) { bg = "#2a1a0a"; border = "1px solid #f9731644"; }
            if (isCurrent) { bg = "#1a1a3e"; border = "2px solid #6c63ff"; }
            if (isFinal && isCurrent) { bg = "#2a1a2e"; border = "2px solid #ec4899"; }
            return (
              <div
                key={item.day}
                onClick={() => {
                  if (item.trackId && item.exerciseId && onExercise) {
                    onExercise(item.trackId, item.exerciseId);
                  } else if (item.trackId) {
                    onNavigate(item.trackId);
                  }
                }}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "12px",
                  padding: "10px 12px",
                  marginBottom: "4px",
                  borderRadius: "8px",
                  background: bg,
                  border: border,
                  opacity: isPast && !isCurrent ? 0.75 : 1,
                  transition: "all 0.2s",
                  cursor: item.trackId ? "pointer" : "default",
                }}
              >
                <div
                  style={{
                    minWidth: "36px",
                    height: "36px",
                    borderRadius: "50%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: "13px",
                    fontWeight: "bold",
                    background: isPast && isDayDone ? "#22c55e" : isPast && !isDayDone ? "#f97316" : isCurrent ? "#6c63ff" : "#2a2a3e",
                    color: isPast || isCurrent ? "#fff" : "#888",
                  }}
                >
                  {isPast && isDayDone ? "\u2713" : isPast && !isDayDone ? "\u26A0" : item.day}
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{
                    fontSize: "13px",
                    fontWeight: isCurrent || isReview || isFinal ? "bold" : "normal",
                    color: isCurrent ? "#a5a0ff" : isPast && isDayDone ? "#66bb6a" : isPast && !isDayDone ? "#f97316" : "#ccc",
                  }}>
                    {item.label}
                  </div>
                  {isPast && !isDayDone && item.exerciseId && (
                    <div style={{ fontSize: "11px", color: "#f97316", marginTop: "2px" }}>
                      Pendiente
                    </div>
                  )}
                </div>
                {isCurrent && item.trackId && (
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      if (item.trackId && item.exerciseId && onExercise) {
                        onExercise(item.trackId, item.exerciseId);
                      }
                    }}
                    style={{
                      fontSize: "12px",
                      padding: "5px 16px",
                      borderRadius: "8px",
                      background: "#6c63ff",
                      color: "#fff",
                      fontWeight: "bold",
                      border: "none",
                      cursor: "pointer",
                      whiteSpace: "nowrap",
                    }}
                  >
                    Empezar →
                  </button>
                )}
                {isCurrent && (
                  <div style={{
                    fontSize: "11px",
                    padding: "2px 8px",
                    borderRadius: "12px",
                    background: "#6c63ff33",
                    color: "#a5a0ff",
                    fontWeight: "bold",
                  }}>
                    HOY
                  </div>
                )}
                {!isCurrent && item.trackId && (
                  <div style={{
                    fontSize: "11px",
                    color: "#555",
                  }}>
                    →
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Roadmap */}
      <div className="section-card">
        <h3>Roadmap (6 semanas)</h3>
        <div className="roadmap-grid">
          {roadmap.map((r) => {
            const rTracks = trackProgress.filter((tp) =>
              r.tracks.includes(tp.track.id)
            );
            const rDone = rTracks.reduce((s, tp) => s + tp.done, 0);
            const rTotal = rTracks.reduce((s, tp) => s + tp.total, 0);
            const rPct = rTotal > 0 ? Math.round((rDone / rTotal) * 100) : 0;
            return (
              <div key={r.week} className="roadmap-card">
                <div className="roadmap-week">Semana {r.week}</div>
                <div className="roadmap-title">{r.title}</div>
                <div className="roadmap-desc">{r.desc}</div>
                <div className="roadmap-bar-bg">
                  <div
                    className="roadmap-bar-fill"
                    style={{ width: rPct + "%" }}
                  />
                </div>
                <div className="roadmap-pct">{rPct}%</div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Daily Challenge Banner */}
      <div className="daily-banner" onClick={() => onNavigate("__daily__")}>
        <div className="daily-banner-icon">⚡</div>
        <div>
          <div className="daily-banner-title">Reto Diario</div>
          <div className="daily-banner-desc">
            Un ejercicio rapido para mantener la racha
          </div>
        </div>
        <div className="daily-banner-arrow">&rarr;</div>
      </div>
    </div>
  );
}
