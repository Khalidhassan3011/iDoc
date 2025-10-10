/**
 * Test Engine
 * Core logic for managing test state, timing, and scoring
 */

import type {
  TestState,
  TestResult,
  Question,
  Answer,
  MCQQuestion,
  Topic
} from './types';

const TEST_DURATION = 20 * 60; // 20 minutes in seconds
const STORAGE_KEY = 'test-your-skill-state';

/**
 * Initialize a new test
 */
export function initializeTest(topic: Topic, questions: Question[]): TestState {
  const now = Date.now();

  return {
    topic,
    questions,
    currentQuestionIndex: 0,
    answers: [],
    startTime: now,
    timeRemaining: TEST_DURATION,
    isFinished: false
  };
}

/**
 * Save test state to sessionStorage
 */
export function saveTestState(state: TestState): void {
  try {
    sessionStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  } catch (error) {
    console.error('Failed to save test state:', error);
  }
}

/**
 * Load test state from sessionStorage
 */
export function loadTestState(): TestState | null {
  try {
    const saved = sessionStorage.getItem(STORAGE_KEY);
    if (!saved) return null;

    const state: TestState = JSON.parse(saved);

    // Recalculate time remaining based on elapsed time
    const elapsed = Math.floor((Date.now() - state.startTime) / 1000);
    state.timeRemaining = Math.max(0, TEST_DURATION - elapsed);

    return state;
  } catch (error) {
    console.error('Failed to load test state:', error);
    return null;
  }
}

/**
 * Clear test state from sessionStorage
 */
export function clearTestState(): void {
  try {
    sessionStorage.removeItem(STORAGE_KEY);
  } catch (error) {
    console.error('Failed to clear test state:', error);
  }
}

/**
 * Update time remaining
 */
export function updateTimeRemaining(state: TestState): TestState {
  const elapsed = Math.floor((Date.now() - state.startTime) / 1000);
  const timeRemaining = Math.max(0, TEST_DURATION - elapsed);

  return {
    ...state,
    timeRemaining,
    isFinished: state.isFinished || timeRemaining === 0
  };
}

/**
 * Submit answer for current question
 */
export function submitAnswer(
  state: TestState,
  answer: Answer
): TestState {
  // Check if answer for this question already exists
  const existingIndex = state.answers.findIndex(a => a.questionId === answer.questionId);

  const updatedAnswers = existingIndex >= 0
    ? state.answers.map((a, i) => i === existingIndex ? answer : a)
    : [...state.answers, answer];

  return {
    ...state,
    answers: updatedAnswers
  };
}

/**
 * Move to next question
 */
export function nextQuestion(state: TestState): TestState {
  const nextIndex = state.currentQuestionIndex + 1;

  return {
    ...state,
    currentQuestionIndex: nextIndex,
    isFinished: state.isFinished || nextIndex >= state.questions.length
  };
}

/**
 * Finish the test
 */
export function finishTest(state: TestState): TestState {
  return {
    ...state,
    isFinished: true
  };
}

/**
 * Calculate test results
 */
export function calculateResults(state: TestState): TestResult {
  const { questions, answers, startTime } = state;

  const mcqQuestions = questions.filter(q => q.type === 'mcq');
  const plainQuestions = questions.filter(q => q.type === 'plain');

  const mcqAnswers = answers.filter(a => a.type === 'mcq');
  const plainAnswers = answers.filter(a => a.type === 'plain');

  // Calculate MCQ score
  const mcqCorrect = mcqAnswers.filter(a => a.isCorrect).length;
  const mcqScore = mcqQuestions.length > 0
    ? (mcqCorrect / mcqQuestions.length) * 100
    : 0;

  // Calculate plain questions average rating
  const plainAverageRating = plainAnswers.length > 0
    ? plainAnswers.reduce((sum, a) => sum + a.rating, 0) / plainAnswers.length
    : 0;

  // Calculate overall score
  // MCQ contributes 60%, plain questions contribute 40%
  const overallScore = mcqQuestions.length > 0 && plainQuestions.length > 0
    ? (mcqScore * 0.6) + ((plainAverageRating / 10) * 100 * 0.4)
    : mcqQuestions.length > 0
      ? mcqScore
      : (plainAverageRating / 10) * 100;

  // Calculate time taken
  const timeTaken = Math.floor((Date.now() - startTime) / 1000);

  return {
    topic: state.topic,
    totalQuestions: questions.length,
    mcqQuestions: mcqQuestions.length,
    plainQuestions: plainQuestions.length,
    mcqCorrect,
    mcqScore,
    plainAverageRating,
    overallScore,
    timeTaken,
    answers
  };
}

/**
 * Check if MCQ answer is correct
 */
export function checkMCQAnswer(question: MCQQuestion, selectedOption: number): boolean {
  return question.correctAnswer === selectedOption;
}

/**
 * Get current question
 */
export function getCurrentQuestion(state: TestState): Question | null {
  return state.questions[state.currentQuestionIndex] || null;
}

/**
 * Check if current question is answered
 */
export function isCurrentQuestionAnswered(state: TestState): boolean {
  const currentQuestion = getCurrentQuestion(state);
  if (!currentQuestion) return false;

  return state.answers.some(a => a.questionId === currentQuestion.id);
}

/**
 * Get answer for current question
 */
export function getCurrentQuestionAnswer(state: TestState): Answer | null {
  const currentQuestion = getCurrentQuestion(state);
  if (!currentQuestion) return null;

  return state.answers.find(a => a.questionId === currentQuestion.id) || null;
}

/**
 * Format time (seconds to MM:SS)
 */
export function formatTime(seconds: number): string {
  const minutes = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return `${String(minutes).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
}

/**
 * Format duration (seconds to readable format)
 */
export function formatDuration(seconds: number): string {
  const minutes = Math.floor(seconds / 60);
  const secs = seconds % 60;

  if (minutes === 0) {
    return `${secs} second${secs !== 1 ? 's' : ''}`;
  }

  return `${minutes} minute${minutes !== 1 ? 's' : ''} ${secs} second${secs !== 1 ? 's' : ''}`;
}
