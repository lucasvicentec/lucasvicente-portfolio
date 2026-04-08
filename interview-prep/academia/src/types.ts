export interface QuizQuestion {
  q: string;
  opts: string[];
  c: number;
  exp: string;
}

export interface Exercise {
  id: string;
  title: string;
  type: "theory" | "quiz" | "code" | "open";
  difficulty?: "easy" | "medium" | "hard";
  desc?: string;
  content?: string; // HTML for theory
  questions?: QuizQuestion[]; // for quiz
  starter?: string; // starter code for code exercises
  solution?: string;
  check?: string; // JS check function body (receives previewEl)
  hints?: string[];
  keywords?: string[]; // for open exercise scoring
  modelAnswer?: string;
}

export interface Track {
  id: string;
  title: string;
  desc: string;
  icon: string;
  color: string;
  week: number;
  exercises: Exercise[];
}

export interface ProgressState {
  completed: string[];
  streak: number;
  lastDate: string | null;
  codes: Record<string, string>;
  texts: Record<string, string>;
  dailyLog: Record<string, number>;
  quizScores: Record<string, number>;
  startDate: string | null;
}

export type View =
  | { page: "dashboard" }
  | { page: "tracks" }
  | { page: "track"; trackId: string }
  | { page: "exercise"; trackId: string; exerciseId: string }
  | { page: "daily" };
