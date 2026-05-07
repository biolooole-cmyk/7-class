export interface GlossaryTerm {
  term: string;
  definition: string;
  simpleExplanation: string;
  example: string;
}

export interface Question {
  id: string;
  text: string;
  options: string[];
  correctAnswer: number;
  explanationCorrect: string;
  explanationIncorrect: string;
}

export interface LessonBlock {
  id: string;
  title: string;
  icon: string;
  motivation: string;
  theory: string;
  examples: string[];
  analogies: string[];
  glossary: GlossaryTerm[];
  quiz: Question[];
}

export interface QuizResult {
  score: number;
  total: number;
  gaps: string[];
  recommendations: string[];
}
