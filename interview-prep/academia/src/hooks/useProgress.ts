import { useState, useCallback } from "react";
import type { ProgressState } from "../types";

const STORAGE_KEY = "interview_academy_v3";

const defaultState: ProgressState = {
  completed: [],
  streak: 0,
  lastDate: null,
  codes: {},
  texts: {},
  dailyLog: {},
  quizScores: {},
  startDate: null,
};

function loadState(): ProgressState {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return defaultState;
    return { ...defaultState, ...JSON.parse(raw) };
  } catch {
    return defaultState;
  }
}

function saveState(state: ProgressState) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
}

export function useProgress() {
  const [state, setState] = useState<ProgressState>(() => {
    const s = loadState();
    if (!s.startDate) {
      const today = new Date().toISOString().slice(0, 10);
      const next = { ...s, startDate: today };
      saveState(next);
      return next;
    }
    return s;
  });

  const persist = useCallback((next: ProgressState) => {
    setState(next);
    saveState(next);
  }, []);

  const markDone = useCallback(
    (id: string) => {
      setState((prev) => {
        if (prev.completed.includes(id)) return prev;
        const next = { ...prev, completed: [...prev.completed, id] };
        saveState(next);
        return next;
      });
    },
    []
  );

  const isDone = useCallback(
    (id: string) => state.completed.includes(id),
    [state.completed]
  );

  const saveCode = useCallback(
    (id: string, code: string) => {
      setState((prev) => {
        const next = { ...prev, codes: { ...prev.codes, [id]: code } };
        saveState(next);
        return next;
      });
    },
    []
  );

  const loadCode = useCallback(
    (id: string) => state.codes[id] || null,
    [state.codes]
  );

  const saveText = useCallback(
    (id: string, text: string) => {
      setState((prev) => {
        const next = { ...prev, texts: { ...prev.texts, [id]: text } };
        saveState(next);
        return next;
      });
    },
    []
  );

  const loadText = useCallback(
    (id: string) => state.texts[id] || "",
    [state.texts]
  );

  const saveQuizScore = useCallback(
    (id: string, score: number) => {
      setState((prev) => {
        const next = {
          ...prev,
          quizScores: { ...prev.quizScores, [id]: score },
        };
        saveState(next);
        return next;
      });
    },
    []
  );

  const getQuizScore = useCallback(
    (id: string) => state.quizScores[id] ?? null,
    [state.quizScores]
  );

  const updateStreak = useCallback(() => {
    const today = new Date().toISOString().slice(0, 10);
    setState((prev) => {
      if (prev.lastDate === today) return prev;
      const yesterday = new Date(Date.now() - 86400000)
        .toISOString()
        .slice(0, 10);
      const newStreak =
        prev.lastDate === yesterday ? prev.streak + 1 : 1;
      const next = { ...prev, streak: newStreak, lastDate: today };
      saveState(next);
      return next;
    });
  }, []);

  const logActivity = useCallback(() => {
    const today = new Date().toISOString().slice(0, 10);
    setState((prev) => {
      const count = (prev.dailyLog[today] || 0) + 1;
      const next = {
        ...prev,
        dailyLog: { ...prev.dailyLog, [today]: count },
      };
      saveState(next);
      return next;
    });
  }, []);

  const globalReset = useCallback(() => {
    localStorage.removeItem(STORAGE_KEY);
    setState(defaultState);
  }, []);

  return {
    state,
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
  };
}
