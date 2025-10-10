/**
 * Question Service
 * Handles loading and randomizing questions for tests
 */

import type { Question, Topic, QuestionPool } from './types';

/**
 * Fisher-Yates shuffle algorithm for randomizing arrays
 */
function shuffleArray<T>(array: T[]): T[] {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

/**
 * Load questions for a specific topic
 */
export async function loadQuestions(topic: Topic): Promise<QuestionPool> {
  try {
    const response = await fetch(`/data/questions/${topic}.json`);

    if (!response.ok) {
      throw new Error(`Failed to load questions for ${topic}`);
    }

    const data: QuestionPool = await response.json();
    return data;
  } catch (error) {
    console.error('Error loading questions:', error);
    throw error;
  }
}

/**
 * Get random questions for a test (default 20 questions)
 * Mixes MCQ and plain questions randomly
 */
export function getRandomQuestions(
  pool: QuestionPool,
  count: number = 20
): Question[] {
  const { questions } = pool;

  if (questions.length < count) {
    console.warn(`Not enough questions in pool. Requested: ${count}, Available: ${questions.length}`);
  }

  const shuffled = shuffleArray(questions);
  return shuffled.slice(0, Math.min(count, questions.length));
}

/**
 * Get questions with difficulty distribution
 */
export function getBalancedQuestions(
  pool: QuestionPool,
  count: number = 20,
  distribution?: { basic?: number; intermediate?: number; advanced?: number }
): Question[] {
  const { questions } = pool;

  // Default distribution: 40% basic, 40% intermediate, 20% advanced
  const dist = distribution || {
    basic: Math.floor(count * 0.4),
    intermediate: Math.floor(count * 0.4),
    advanced: count - Math.floor(count * 0.8)
  };

  const basicQuestions = shuffleArray(
    questions.filter(q => q.difficulty === 'basic')
  ).slice(0, dist.basic || 0);

  const intermediateQuestions = shuffleArray(
    questions.filter(q => q.difficulty === 'intermediate')
  ).slice(0, dist.intermediate || 0);

  const advancedQuestions = shuffleArray(
    questions.filter(q => q.difficulty === 'advanced')
  ).slice(0, dist.advanced || 0);

  // Combine and shuffle again to mix difficulties
  return shuffleArray([
    ...basicQuestions,
    ...intermediateQuestions,
    ...advancedQuestions
  ]);
}

/**
 * Get topic display name
 */
export function getTopicDisplayName(topic: Topic): string {
  const names: Record<Topic, string> = {
    'flutter': 'Flutter',
    'problem-solving': 'Problem Solving'
  };
  return names[topic] || topic;
}

/**
 * Get topic description
 */
export function getTopicDescription(topic: Topic): string {
  const descriptions: Record<Topic, string> = {
    'flutter': 'Test your Flutter knowledge with questions covering widgets, state management, navigation, and more.',
    'problem-solving': 'Challenge yourself with algorithmic and problem-solving questions.'
  };
  return descriptions[topic] || '';
}
