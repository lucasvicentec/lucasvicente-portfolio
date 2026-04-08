import type { Track, ProgressState } from "../types";

interface TrackDetailProps {
  track: Track;
  progress: ProgressState;
  onBack: () => void;
  onExercise: (exerciseId: string) => void;
}

export default function TrackDetail({
  track,
  progress,
  onBack,
  onExercise,
}: TrackDetailProps) {
  const done = track.exercises.filter((e) =>
    progress.completed.includes(e.id)
  ).length;

  const typeLabels: Record<string, string> = {
    theory: "Teoria",
    quiz: "Quiz",
    code: "Codigo",
    open: "Abierta",
  };

  const typeIcons: Record<string, string> = {
    theory: "📖",
    quiz: "❓",
    code: "💻",
    open: "✍️",
  };

  return (
    <div className="track-detail">
      <button className="back-btn" onClick={onBack}>
        ← Volver
      </button>
      <div className="track-detail-header" style={{ borderColor: track.color + "33" }}>
        <div
          className="track-detail-icon"
          style={{ background: track.color + "22", color: track.color }}
        >
          {track.icon}
        </div>
        <div>
          <h2>{track.title}</h2>
          <p style={{ opacity: 0.7 }}>{track.desc}</p>
          <p style={{ marginTop: "8px" }}>
            <span style={{ color: track.color, fontWeight: 600 }}>
              {done}/{track.exercises.length}
            </span>{" "}
            ejercicios completados
          </p>
        </div>
      </div>

      <div className="exercise-list">
        {track.exercises.map((ex, i) => {
          const completed = progress.completed.includes(ex.id);
          return (
            <div
              key={ex.id}
              className={`exercise-item ${completed ? "completed" : ""}`}
              onClick={() => onExercise(ex.id)}
            >
              <div className="exercise-item-num">{i + 1}</div>
              <div className="exercise-item-info">
                <div className="exercise-item-title">{ex.title}</div>
                <div className="exercise-item-meta">
                  <span className="exercise-type-badge" style={{ background: track.color + "22", color: track.color }}>
                    {typeIcons[ex.type]} {typeLabels[ex.type]}
                  </span>
                  {ex.difficulty && (
                    <span className={`difficulty-badge ${ex.difficulty}`}>
                      {ex.difficulty}
                    </span>
                  )}
                </div>
              </div>
              <div className="exercise-item-check">
                {completed ? "✅" : "○"}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
