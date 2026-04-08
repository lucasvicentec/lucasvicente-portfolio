import { useState, useCallback, useMemo } from "react";
import type { View } from "./types";
import { tracks, dailyChallenges } from "./data/tracks";
import { useProgress } from "./hooks/useProgress";
import Dashboard from "./components/Dashboard";
import TrackList from "./components/TrackList";
import TrackDetail from "./components/TrackDetail";
import CodeExercise from "./components/CodeExercise";
import OpenExercise from "./components/OpenExercise";
import TheoryLesson from "./components/TheoryLesson";
import QuizExercise from "./components/QuizExercise";
import Toast from "./components/Toast";

function App() {
  const [view, setView] = useState<View>({ page: "dashboard" });
  const [toast, setToast] = useState<{ msg: string; type: "success" | "error" | "info" } | null>(null);
  const [resetModal, setResetModal] = useState(false);
  const [resetInput, setResetInput] = useState("");

  const {
    state: progress,
    markDone,
    isDone,
    saveCode,
    loadCode,
    saveText,
    loadText,
    saveQuizScore,
    getQuizScore,
    updateStreak,
    logActivity,
    globalReset,
  } = useProgress();

  const showToast = useCallback(
    (msg: string, type: "success" | "error" | "info" = "info") => {
      setToast({ msg, type });
    },
    []
  );

  const totalExercises = useMemo(
    () => tracks.reduce((s, t) => s + t.exercises.length, 0),
    []
  );
  const completedCount = progress.completed.length;

  // Navigation helpers
  const goTracks = useCallback(() => setView({ page: "tracks" }), []);
  const goDashboard = useCallback(() => setView({ page: "dashboard" }), []);

  const goTrack = useCallback((trackId: string) => {
    if (trackId === "__daily__") {
      setView({ page: "daily" });
    } else {
      setView({ page: "track", trackId });
    }
  }, []);

  const goExercise = useCallback(
    (trackId: string, exerciseId: string) => {
      setView({ page: "exercise", trackId, exerciseId });
    },
    []
  );

  // Find current track/exercise for exercise view
  const currentTrack = useMemo(() => {
    if (view.page === "track") return tracks.find((t) => t.id === view.trackId);
    if (view.page === "exercise") return tracks.find((t) => t.id === view.trackId);
    return null;
  }, [view]);

  const currentExercise = useMemo(() => {
    if (view.page === "exercise" && currentTrack) {
      return currentTrack.exercises.find((e) => e.id === view.exerciseId);
    }
    return null;
  }, [view, currentTrack]);

  const nextExercise = useMemo(() => {
    if (!currentTrack || !currentExercise) return null;
    const idx = currentTrack.exercises.findIndex((e) => e.id === currentExercise.id);
    if (idx < currentTrack.exercises.length - 1) {
      return currentTrack.exercises[idx + 1];
    }
    return null;
  }, [currentTrack, currentExercise]);

  const handleMarkDone = useCallback(
    (id: string) => {
      markDone(id);
      updateStreak();
      logActivity();
      showToast("Ejercicio completado!", "success");
    },
    [markDone, updateStreak, logActivity, showToast]
  );

  const handleReset = useCallback(() => {
    if (resetInput === "REINICIAR") {
      globalReset();
      setResetModal(false);
      setResetInput("");
      setView({ page: "dashboard" });
      showToast("Todo el progreso ha sido eliminado", "info");
    }
  }, [resetInput, globalReset, showToast]);

  // Render current view
  const renderContent = () => {
    switch (view.page) {
      case "dashboard":
        return (
          <Dashboard
            progress={progress}
            tracks={tracks}
            onNavigate={goTrack}
            onExercise={goExercise}
          />
        );

      case "tracks":
        return (
          <TrackList
            tracks={tracks}
            progress={progress}
            onSelect={goTrack}
          />
        );

      case "track":
        if (!currentTrack) return <p>Track no encontrado</p>;
        return (
          <TrackDetail
            track={currentTrack}
            progress={progress}
            onBack={goTracks}
            onExercise={(exId) => goExercise(currentTrack.id, exId)}
          />
        );

      case "exercise":
        if (!currentTrack || !currentExercise) return <p>Ejercicio no encontrado</p>;
        return (
          <div className="exercise-view">
            <button
              className="back-btn"
              onClick={() => setView({ page: "track", trackId: currentTrack.id })}
            >
              ← {currentTrack.title}
            </button>
            <h2 style={{ margin: "12px 0 20px" }}>{currentExercise.title}</h2>

            {currentExercise.type === "theory" && (
              <TheoryLesson
                exercise={currentExercise}
                done={isDone(currentExercise.id)}
                onMarkDone={() => handleMarkDone(currentExercise.id)}
                onNext={() =>
                  nextExercise &&
                  goExercise(currentTrack.id, nextExercise.id)
                }
                hasNext={!!nextExercise}
              />
            )}

            {currentExercise.type === "quiz" && (
              <QuizExercise
                exercise={currentExercise}
                done={isDone(currentExercise.id)}
                savedScore={getQuizScore(currentExercise.id)}
                onMarkDone={() => handleMarkDone(currentExercise.id)}
                onSaveScore={(s) => saveQuizScore(currentExercise.id, s)}
                onNext={() =>
                  nextExercise &&
                  goExercise(currentTrack.id, nextExercise.id)
                }
                hasNext={!!nextExercise}
              />
            )}

            {currentExercise.type === "code" && (
              <CodeExercise
                key={currentExercise.id}
                exercise={currentExercise}
                done={isDone(currentExercise.id)}
                savedCode={loadCode(currentExercise.id)}
                onMarkDone={() => handleMarkDone(currentExercise.id)}
                onSaveCode={(c) => saveCode(currentExercise.id, c)}
                onNext={() =>
                  nextExercise &&
                  goExercise(currentTrack.id, nextExercise.id)
                }
                hasNext={!!nextExercise}
                onToast={showToast}
                timerMinutes={currentTrack?.id === "simulacro" ? 45 : undefined}
              />
            )}

            {currentExercise.type === "open" && (
              <OpenExercise
                key={currentExercise.id}
                exercise={currentExercise}
                done={isDone(currentExercise.id)}
                savedText={loadText(currentExercise.id)}
                onMarkDone={() => handleMarkDone(currentExercise.id)}
                onSaveText={(t) => saveText(currentExercise.id, t)}
                onNext={() =>
                  nextExercise &&
                  goExercise(currentTrack.id, nextExercise.id)
                }
                hasNext={!!nextExercise}
                onToast={showToast}
                timerMinutes={currentTrack?.id === "simulacro" ? 45 : undefined}
              />
            )}
          </div>
        );

      case "daily": {
        const dailyIdx = Math.floor(
          (Date.now() / 86400000) % dailyChallenges.length
        );
        const daily = dailyChallenges[dailyIdx];
        return (
          <div className="exercise-view">
            <button className="back-btn" onClick={goDashboard}>
              ← Dashboard
            </button>
            <h2 style={{ margin: "12px 0 20px" }}>{daily.title}</h2>
            {daily.type === "code" && (
              <CodeExercise
                key={daily.id}
                exercise={daily}
                done={isDone(daily.id)}
                savedCode={loadCode(daily.id)}
                onMarkDone={() => handleMarkDone(daily.id)}
                onSaveCode={(c) => saveCode(daily.id, c)}
                onNext={goDashboard}
                hasNext={false}
                onToast={showToast}
              />
            )}
          </div>
        );
      }

      default:
        return null;
    }
  };

  return (
    <div className="app">
      {/* Top Navigation */}
      <nav className="top-nav">
        <div className="nav-left">
          <div className="nav-logo" onClick={goDashboard}>
            IA
          </div>
          <span className="nav-title" onClick={goDashboard}>
            Interview Academy
          </span>
        </div>
        <div className="nav-tabs">
          <button
            className={`nav-tab ${view.page === "dashboard" ? "active" : ""}`}
            onClick={goDashboard}
          >
            Dashboard
          </button>
          <button
            className={`nav-tab ${view.page === "tracks" || view.page === "track" || view.page === "exercise" ? "active" : ""}`}
            onClick={goTracks}
          >
            Pistas
          </button>
          <button
            className={`nav-tab ${view.page === "daily" ? "active" : ""}`}
            onClick={() => setView({ page: "daily" })}
          >
            Reto Diario
          </button>
        </div>
        <div className="nav-right">
          <span className="nav-stats">
            {completedCount}/{totalExercises}
          </span>
          <button
            className="btn-reset-small"
            onClick={() => setResetModal(true)}
          >
            Reiniciar todo
          </button>
        </div>
      </nav>

      {/* Main content */}
      <main className="main-content">{renderContent()}</main>

      {/* Toast */}
      {toast && (
        <Toast
          message={toast.msg}
          type={toast.type}
          onClose={() => setToast(null)}
        />
      )}

      {/* Reset Modal */}
      {resetModal && (
        <div className="modal-overlay" onClick={() => setResetModal(false)}>
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            <h3>Reiniciar todo el progreso</h3>
            <p style={{ color: "#ef4444", margin: "12px 0" }}>
              ATENCION: Esto eliminara TODO tu progreso, codigo guardado,
              respuestas y racha. Esta accion no se puede deshacer.
            </p>
            <p>
              Escribe <strong>REINICIAR</strong> para confirmar:
            </p>
            <input
              value={resetInput}
              onChange={(e) => setResetInput(e.target.value)}
              placeholder="REINICIAR"
              style={{
                width: "100%",
                padding: "10px",
                margin: "12px 0",
                borderRadius: "8px",
                border: "1px solid #ef4444",
                background: "#1a1a2e",
                color: "white",
                fontSize: "16px",
                textAlign: "center",
              }}
            />
            <div style={{ display: "flex", gap: "8px", justifyContent: "flex-end" }}>
              <button
                className="btn-secondary"
                onClick={() => {
                  setResetModal(false);
                  setResetInput("");
                }}
              >
                Cancelar
              </button>
              <button
                className="btn-danger"
                onClick={handleReset}
                disabled={resetInput !== "REINICIAR"}
                style={{ opacity: resetInput === "REINICIAR" ? 1 : 0.4 }}
              >
                Eliminar todo
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
