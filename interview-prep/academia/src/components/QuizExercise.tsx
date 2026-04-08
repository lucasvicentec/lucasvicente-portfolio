import { useState, useMemo, useCallback } from "react";
import type { Exercise } from "../types";

interface QuizExerciseProps {
  exercise: Exercise;
  done: boolean;
  savedScore: number | null;
  onMarkDone: () => void;
  onSaveScore: (score: number) => void;
  onNext: () => void;
  hasNext: boolean;
}

export default function QuizExercise({
  exercise,
  done,
  savedScore,
  onMarkDone,
  onSaveScore,
  onNext,
  hasNext,
}: QuizExerciseProps) {
  const questions = exercise.questions || [];
  const [currentIdx, setCurrentIdx] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [score, setScore] = useState(0);
  const [finished, setFinished] = useState(false);
  const [answered, setAnswered] = useState(false);

  // Shuffle options per question deterministically
  const shuffledQuestions = useMemo(() => {
    return questions.map((q) => {
      const indices = q.opts.map((_, i) => i);
      // Simple shuffle
      for (let i = indices.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [indices[i], indices[j]] = [indices[j], indices[i]];
      }
      return {
        ...q,
        shuffledOpts: indices.map((i) => q.opts[i]),
        correctShuffledIdx: indices.indexOf(q.c),
      };
    });
  }, [questions]);

  const current = shuffledQuestions[currentIdx];

  const handleSelect = useCallback(
    (idx: number) => {
      if (answered) return;
      setSelected(idx);
      setAnswered(true);
      if (idx === current.correctShuffledIdx) {
        setScore((s) => s + 1);
      }
    },
    [answered, current]
  );

  const handleNext = useCallback(() => {
    if (currentIdx < questions.length - 1) {
      setCurrentIdx((i) => i + 1);
      setSelected(null);
      setAnswered(false);
    } else {
      setFinished(true);
      const finalScore = score + (selected === current.correctShuffledIdx ? 0 : 0); // already added
      const pct = Math.round((score / questions.length) * 100);
      onSaveScore(pct);
      if (pct >= 70) {
        onMarkDone();
      }
    }
  }, [currentIdx, questions.length, score, selected, current, onSaveScore, onMarkDone]);

  const retry = useCallback(() => {
    setCurrentIdx(0);
    setSelected(null);
    setScore(0);
    setFinished(false);
    setAnswered(false);
  }, []);

  if (finished) {
    const pct = Math.round((score / questions.length) * 100);
    const passed = pct >= 70;
    return (
      <div className="quiz-result">
        <h3>{passed ? "Aprobado!" : "No aprobado"}</h3>
        <div className="quiz-score" style={{ color: passed ? "#22c55e" : "#ef4444" }}>
          {score}/{questions.length} ({pct}%)
        </div>
        <p>
          {passed
            ? "Excelente! Has demostrado buen conocimiento de este tema."
            : "Necesitas 70% para aprobar. Revisa la teoria y vuelve a intentarlo."}
        </p>
        <div className="quiz-actions">
          {!passed && (
            <button className="btn-primary" onClick={retry}>
              Reintentar
            </button>
          )}
          {hasNext && (
            <button className="btn-secondary" onClick={onNext}>
              Siguiente →
            </button>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="quiz-exercise">
      <div className="quiz-progress">
        Pregunta {currentIdx + 1} de {questions.length}
        <span style={{ marginLeft: "auto" }}>
          Aciertos: {score}
        </span>
      </div>
      <div className="quiz-question">
        <h3>{current.q}</h3>
        <div className="quiz-options">
          {current.shuffledOpts.map((opt, i) => {
            let cls = "quiz-option";
            if (answered) {
              if (i === current.correctShuffledIdx) cls += " correct";
              else if (i === selected) cls += " wrong";
            }
            return (
              <button
                key={i}
                className={cls}
                onClick={() => handleSelect(i)}
                disabled={answered}
              >
                {opt}
              </button>
            );
          })}
        </div>
        {answered && (
          <div className="quiz-explanation">
            <strong>
              {selected === current.correctShuffledIdx
                ? "Correcto! "
                : "Incorrecto. "}
            </strong>
            {current.exp}
          </div>
        )}
        {answered && (
          <button className="btn-primary" onClick={handleNext}>
            {currentIdx < questions.length - 1 ? "Siguiente pregunta" : "Ver resultado"}
          </button>
        )}
      </div>
    </div>
  );
}
