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

export interface FollowUpMCQ {
  question: string;
  options: string[];
  correctAnswer: number;
}

export interface PlainQuestionFollowUps {
  easy?: FollowUpMCQ;
  medium?: FollowUpMCQ;
  hard?: FollowUpMCQ;
}

export interface PlainQuestion {
  id: string;
  topic: Topic;
  difficulty: Difficulty;
  type: 'plain';
  question: string;
  source?: string;
  followUps?: PlainQuestionFollowUps;
}

export type Question = MCQQuestion | PlainQuestion;

export interface MCQAnswer {
  questionId: string;
  type: 'mcq';
  selectedOption: number;
  isCorrect: boolean;
}

export type FollowUpDifficulty = 'easy' | 'medium' | 'hard';

export interface FollowUpAttempt {
  difficulty: FollowUpDifficulty;
  selectedOption: number;
  isCorrect: boolean;
}

export interface PlainAnswer {
  questionId: string;
  type: 'plain';
  rating: number;  // 0-10
  followUpAttempts?: FollowUpAttempt[];  // Track all follow-up attempts
  finalScore?: number;  // Final calculated score after follow-ups
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
  answeredQuestions: number;
  mcqQuestions: number;
  plainQuestions: number;
  mcqCorrect: number;
  mcqScore: number;  // percentage
  plainAverageRating: number;  // average of ratings
  overallScore: number;  // percentage
  timeTaken: number;  // in seconds
  answers: Answer[];
  questions: Question[];  // Include all questions for detailed review
}

export interface QuestionPool {
  topic: Topic;
  questions: Question[];
}
