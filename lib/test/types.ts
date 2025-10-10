/**
 * Test Your Skill - Type Definitions
 * Shared types for the mock test system
 */

export type QuestionType = 'mcq' | 'plain';
export type Topic = 'flutter' | 'problem-solving';
export type Difficulty = 'basic' | 'intermediate' | 'advanced';

export interface MCQQuestion {
  id: string;
  topic: Topic;
  difficulty: Difficulty;
  type: 'mcq';
  question: string;
  options: string[];
  correctAnswer: number;  // Index of correct option
  source?: string;
}

export interface PlainQuestion {
  id: string;
  topic: Topic;
  difficulty: Difficulty;
  type: 'plain';
  question: string;
  source?: string;
}

export type Question = MCQQuestion | PlainQuestion;

export interface MCQAnswer {
  questionId: string;
  type: 'mcq';
  selectedOption: number;
  isCorrect: boolean;
}

export interface PlainAnswer {
  questionId: string;
  type: 'plain';
  rating: number;  // 1-10
}

export type Answer = MCQAnswer | PlainAnswer;

export interface TestState {
  topic: Topic;
  questions: Question[];
  currentQuestionIndex: number;
  answers: Answer[];
  startTime: number;
  timeRemaining: number;  // in seconds
  isFinished: boolean;
}

export interface TestResult {
  topic: Topic;
  totalQuestions: number;
  mcqQuestions: number;
  plainQuestions: number;
  mcqCorrect: number;
  mcqScore: number;  // percentage
  plainAverageRating: number;  // average of ratings
  overallScore: number;  // percentage
  timeTaken: number;  // in seconds
  answers: Answer[];
}

export interface QuestionPool {
  topic: Topic;
  questions: Question[];
}
