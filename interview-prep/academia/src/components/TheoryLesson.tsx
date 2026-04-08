import type { Exercise } from "../types";

interface TheoryLessonProps {
  exercise: Exercise;
  done: boolean;
  onMarkDone: () => void;
  onNext: () => void;
  hasNext: boolean;
}

export default function TheoryLesson({
  exercise,
  done,
  onMarkDone,
  onNext,
  hasNext,
}: TheoryLessonProps) {
  return (
    <div className="theory-lesson">
      <div
        className="theory-content"
        dangerouslySetInnerHTML={{ __html: exercise.content || "" }}
      />
      <div className="theory-actions">
        {!done ? (
          <button className="btn-primary" onClick={onMarkDone}>
            He leido y entendido ✓
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
    </div>
  );
}
