import { useState, useEffect, useCallback } from "react";
import type { Exercise } from "../types";

interface OpenExerciseProps {
  exercise: Exercise;
  done: boolean;
  savedText: string;
  onMarkDone: () => void;
  onSaveText: (text: string) => void;
  onNext: () => void;
  hasNext: boolean;
  onToast: (msg: string, type: "success" | "error" | "info") => void;
  timerMinutes?: number;
}

function Timer({ minutes }: { minutes: number }) {
  const [seconds, setSeconds] = useState(minutes * 60);
  useEffect(() => {
    if (seconds <= 0) return;
    const id = setInterval(() => setSeconds(s => s - 1), 1000);
    return () => clearInterval(id);
  }, [seconds]);
  const mm = Math.floor(seconds / 60);
  const ss = seconds % 60;
  const expired = seconds <= 0;
  const isLow = seconds > 0 && seconds < 300;
  const isCritical = seconds > 0 && seconds < 60;
  return (
    <div style={{
      position: "absolute",
      top: "12px",
      right: "12px",
      fontFamily: "monospace",
      fontSize: "18px",
      fontWeight: "bold",
      padding: "8px 16px",
      borderRadius: "8px",
      background: expired ? "#ef444433" : isLow ? "#ef444422" : "#1a1a3e",
      color: expired ? "#ef4444" : isLow ? "#ef4444" : "#a5a0ff",
      border: expired ? "1px solid #ef4444" : isLow ? "1px solid #ef444466" : "1px solid #2a2a3e",
      animation: isCritical ? "pulse 1s ease-in-out infinite" : "none",
      zIndex: 10,
    }}>
      {expired ? "Tiempo agotado!" : mm + ":" + ss.toString().padStart(2, "0")}
    </div>
  );
}

export default function OpenExercise({
  exercise,
  done,
  savedText,
  onMarkDone,
  onSaveText,
  onNext,
  hasNext,
  onToast,
  timerMinutes,
}: OpenExerciseProps) {
  const [text, setText] = useState(savedText || "");
  const [score, setScore] = useState<number | null>(null);
  const [feedback, setFeedback] = useState<string | null>(null);
  const [showModel, setShowModel] = useState(false);
  const [hintIdx, setHintIdx] = useState(-1);

  // Save on change
  useEffect(() => {
    const t = setTimeout(() => onSaveText(text), 500);
    return () => clearTimeout(t);
  }, [text, onSaveText]);

  const evaluate = useCallback(() => {
    if (!text.trim()) {
      onToast("Escribe tu respuesta primero", "info");
      return;
    }

    const keywords = exercise.keywords || [];
    if (keywords.length === 0) {
      onToast("No hay criterios de evaluacion configurados", "info");
      return;
    }

    const textLower = text.toLowerCase();
    const matched = keywords.filter((kw) => textLower.includes(kw.toLowerCase()));
    const pct = Math.round((matched.length / keywords.length) * 100);

    setScore(pct);

    if (pct >= 80) {
      setFeedback(
        `Excelente! (${pct}%) Tu respuesta cubre los puntos clave: ${matched.join(", ")}.`
      );
    } else if (pct >= 50) {
      const missing = keywords.filter((kw) => !textLower.includes(kw.toLowerCase()));
      setFeedback(
        `Buen intento (${pct}%). Mencionas: ${matched.join(", ")}. Podrias mejorar cubriendo: ${missing.slice(0, 4).join(", ")}.`
      );
    } else {
      const missing = keywords.filter((kw) => !textLower.includes(kw.toLowerCase()));
      setFeedback(
        `Necesitas profundizar mas (${pct}%). Intenta cubrir conceptos como: ${missing.slice(0, 5).join(", ")}.`
      );
    }
  }, [text, exercise.keywords, onToast]);

  return (
    <div className="open-exercise" style={{ position: "relative" }}>
      {timerMinutes && <Timer minutes={timerMinutes} />}
      {exercise.desc && <p className="exercise-desc">{exercise.desc}</p>}

      <textarea
        className="open-textarea"
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Escribe tu respuesta aqui..."
        rows={12}
      />

      <div className="open-actions">
        <button className="btn-primary" onClick={evaluate}>
          📊 Evaluar respuesta
        </button>
        <button
          className="btn-secondary"
          onClick={() => setShowModel(!showModel)}
        >
          {showModel ? "Ocultar modelo" : "📋 Ver respuesta modelo"}
        </button>
        {exercise.hints && exercise.hints.length > 0 && (
          <button
            className="btn-secondary"
            onClick={() =>
              setHintIdx((i) => Math.min(i + 1, exercise.hints!.length - 1))
            }
          >
            💡 Pista
          </button>
        )}
        {!done ? (
          <button className="btn-success" onClick={onMarkDone}>
            ✓ Marcar completado
          </button>
        ) : (
          <span className="done-badge">✅ Completado</span>
        )}
        {hasNext && (
          <button className="btn-secondary" onClick={onNext}>
            Siguiente →
          </button>
        )}
      </div>

      {score !== null && feedback && (
        <div
          className="evaluation-result"
          style={{
            borderColor: score >= 80 ? "#22c55e" : score >= 50 ? "#eab308" : "#ef4444",
          }}
        >
          <div
            className="evaluation-score"
            style={{
              color: score >= 80 ? "#22c55e" : score >= 50 ? "#eab308" : "#ef4444",
            }}
          >
            {score}%
          </div>
          <p>{feedback}</p>
        </div>
      )}

      {hintIdx >= 0 && exercise.hints && (
        <div className="hints-panel">
          {exercise.hints.slice(0, hintIdx + 1).map((h, i) => (
            <div key={i} className="hint">
              <strong>Pista {i + 1}:</strong> {h}
            </div>
          ))}
        </div>
      )}

      {showModel && exercise.modelAnswer && (
        <div className="model-answer">
          <h4>Respuesta modelo:</h4>
          <p style={{ whiteSpace: "pre-wrap" }}>{exercise.modelAnswer}</p>
        </div>
      )}
    </div>
  );
}
