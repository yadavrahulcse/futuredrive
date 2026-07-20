export interface Category {
  id: string;
  code: string;
  name: string;
}

export interface ExamSummary {
  id: string;
  title: string;
  description: string;
  durationMinutes: number;
  totalMarks: number;
  categoryName: string;
  languages: string[];
}

export interface QuestionOption {
  id: string;
  text: Record<string, string>;
  isCorrect?: boolean;
}

export interface Question {
  id: string;
  type: string;
  text: Record<string, string>;
  marks: number;
  negativeMarks: number;
  explanationText: Record<string, string>;
  options: QuestionOption[];
}

export interface AttemptQuestion {
  questionId: string;
  section: string;
  orderNumber: number;
  question: Question;
}

export interface Attempt {
  id: string;
  studentId: string;
  testSeriesId: string;
  status: string;
  score: number;
  switchedTabs: number;
  questions: AttemptQuestion[];
}

export interface ResultItem {
  questionId: string;
  correct: boolean;
  marksAwarded: number;
  explanationText: Record<string, string>;
}

export interface Result {
  attemptId: string;
  score: number;
  totalMarks: number;
  correctAnswers: number;
  incorrectAnswers: number;
  accuracyPercentage: number;
  rank: number;
  percentile: number;
  items: ResultItem[];
}

export interface AdminOverview {
  totalExams: number;
  totalQuestions: number;
  totalAttempts: number;
  completedAttempts: number;
  supportedLanguages: string[];
}
