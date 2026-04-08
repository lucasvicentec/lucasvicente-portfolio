import { useState, useRef, useCallback, useEffect } from "react";
import React, { createElement } from "react";
import * as ReactDOM from "react-dom/client";
import * as Babel from "@babel/standalone";
import type { Exercise } from "../types";

interface CodeExerciseProps {
  exercise: Exercise;
  done: boolean;
  savedCode: string | null;
  onMarkDone: () => void;
  onSaveCode: (code: string) => void;
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

export default function CodeExercise({
  exercise,
  done,
  savedCode,
  onMarkDone,
  onSaveCode,
  onNext,
  hasNext,
  onToast,
  timerMinutes,
}: CodeExerciseProps) {
  const [code, setCode] = useState(savedCode || exercise.starter || "");
  const [error, setError] = useState<string | null>(null);
  const [hintIdx, setHintIdx] = useState(-1);
  const [showSolution, setShowSolution] = useState(false);
  const previewRef = useRef<HTMLDivElement>(null);
  const rootRef = useRef<ReactDOM.Root | null>(null);

  // Save code on change (debounced)
  useEffect(() => {
    const t = setTimeout(() => onSaveCode(code), 500);
    return () => clearTimeout(t);
  }, [code, onSaveCode]);

  const runCode = useCallback(() => {
    if (!previewRef.current) return;
    setError(null);

    try {
      // Strip imports/exports
      let cleaned = code
        .replace(/^\s*import\s+[\s\S]*?\s+from\s+['"].*?['"];?\s*$/gm, "")
        .replace(/^\s*import\s+['"].*?['"];?\s*$/gm, "")
        .replace(/^\s*export\s+default\s+function\s/gm, "function ")
        .replace(/^\s*export\s+default\s+/gm, "")
        .replace(/^\s*export\s+function\s/gm, "function ")
        .replace(/^\s*export\s+const\s/gm, "const ")
        .replace(/^\s*export\s+/gm, "");

      // Compile with Babel
      let compiled: string | undefined;
      try {
        compiled = Babel.transform(cleaned, {
          presets: ["react"],
          filename: "exercise.jsx",
        })?.code || undefined;
      } catch (babelErr: any) {
        const msg = babelErr.message || String(babelErr);
        throw new Error("Error de sintaxis: " + msg.replace(/^.*?:/, "").trim());
      }

      if (!compiled) throw new Error("Error de compilacion: Babel no produjo codigo");

      // Create function with React hooks in scope
      const fn = new Function(
        "React",
        "useState",
        "useEffect",
        "useRef",
        "useMemo",
        "useCallback",
        "useReducer",
        "useContext",
        "createContext",
        "memo",
        "createElement",
        compiled + "\nreturn typeof App !== 'undefined' ? App : null;"
      );

      const AppComponent = fn(
        React,
        React.useState,
        React.useEffect,
        React.useRef,
        React.useMemo,
        React.useCallback,
        React.useReducer,
        React.useContext,
        React.createContext,
        React.memo,
        createElement
      );

      if (!AppComponent) {
        throw new Error("No se encontro la funcion App. Asegurate de definir function App().");
      }

      // Cleanup old root
      if (rootRef.current) {
        try { rootRef.current.unmount(); } catch (_) { /* ignore */ }
        rootRef.current = null;
      }

      // Render
      const root = ReactDOM.createRoot(previewRef.current);
      rootRef.current = root;
      root.render(createElement(AppComponent));
    } catch (err: any) {
      setError(err.message || String(err));
    }
  }, [code]);

  const checkCode = useCallback(() => {
    if (!previewRef.current) return;
    if (!exercise.check) {
      onToast("Este ejercicio no tiene verificacion automatica", "info");
      return;
    }

    try {
      // First run the code
      runCode();

      // Give React a tick to render
      setTimeout(() => {
        try {
          const checkFn = new Function("return " + exercise.check)();
          const result = checkFn(previewRef.current);
          if (result === true) {
            onToast("Correcto! Ejercicio completado.", "success");
            onMarkDone();
          } else {
            onToast(typeof result === "string" ? result : "Revisa tu codigo", "error");
          }
        } catch (err: any) {
          onToast("Error al verificar: " + err.message, "error");
        }
      }, 600);
    } catch (err: any) {
      onToast("Error al ejecutar: " + err.message, "error");
    }
  }, [exercise.check, runCode, onMarkDone, onToast]);

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
      if (e.key === "Tab") {
        e.preventDefault();
        const textarea = e.target as HTMLTextAreaElement;
        const start = textarea.selectionStart;
        const end = textarea.selectionEnd;
        const newCode = code.substring(0, start) + "  " + code.substring(end);
        setCode(newCode);
        setTimeout(() => {
          textarea.selectionStart = textarea.selectionEnd = start + 2;
        }, 0);
      }
      if (e.key === "Enter" && e.ctrlKey) {
        e.preventDefault();
        runCode();
      }
    },
    [code, runCode]
  );

  const handleReset = useCallback(() => {
    setCode(exercise.starter || "");
    setError(null);
    setShowSolution(false);
    setHintIdx(-1);
    if (rootRef.current) {
      rootRef.current.unmount();
      rootRef.current = null;
    }
  }, [exercise.starter]);

  return (
    <div className="code-exercise" style={{ position: "relative" }}>
      {timerMinutes && <Timer minutes={timerMinutes} />}
      {exercise.desc && <p className="exercise-desc">{exercise.desc}</p>}

      <div className="code-layout">
        <div className="code-editor-panel">
          <div className="panel-header">
            <span>Editor</span>
            <span style={{ fontSize: "12px", opacity: 0.5 }}>
              Ctrl+Enter para ejecutar
            </span>
          </div>
          <textarea
            className="code-editor"
            value={code}
            onChange={(e) => setCode(e.target.value)}
            onKeyDown={handleKeyDown}
            spellCheck={false}
            autoComplete="off"
            autoCorrect="off"
            autoCapitalize="off"
          />
        </div>
        <div className="code-preview-panel">
          <div className="panel-header">Vista previa</div>
          <div className="code-preview" ref={previewRef} />
          {error && <div className="code-error">{error}</div>}
        </div>
      </div>

      <div className="code-actions">
        <button className="btn-primary" onClick={runCode}>
          ▶ Ejecutar
        </button>
        <button className="btn-success" onClick={checkCode}>
          ✓ Comprobar
        </button>
        {exercise.hints && exercise.hints.length > 0 && (
          <button
            className="btn-secondary"
            onClick={() => setHintIdx((i) => Math.min(i + 1, exercise.hints!.length - 1))}
          >
            💡 Pista
          </button>
        )}
        <button
          className="btn-secondary"
          onClick={() => setShowSolution(!showSolution)}
        >
          {showSolution ? "Ocultar solucion" : "👁 Ver solucion"}
        </button>
        <button className="btn-danger" onClick={handleReset}>
          ↺ Reiniciar
        </button>
        {hasNext && (
          <button className="btn-secondary" onClick={onNext}>
            Siguiente →
          </button>
        )}
      </div>

      {done && <div className="done-badge" style={{ marginTop: "12px" }}>✅ Completado</div>}

      {hintIdx >= 0 && exercise.hints && (
        <div className="hints-panel">
          {exercise.hints.slice(0, hintIdx + 1).map((h, i) => (
            <div key={i} className="hint">
              <strong>Pista {i + 1}:</strong> {h}
            </div>
          ))}
        </div>
      )}

      {showSolution && exercise.solution && (
        <div className="solution-panel">
          <h4>Solucion:</h4>
          <pre>{exercise.solution}</pre>
        </div>
      )}
    </div>
  );
}
