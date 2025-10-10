'use client';

import Link from 'next/link';
import type { TestResult } from '@/lib/test/types';
import { formatDuration, formatTime } from '@/lib/test/test-engine';
import { getTopicDisplayName } from '@/lib/test/question-service';
import { Trophy, Target, CheckCircle, Star, Clock, RotateCcw, Home } from 'lucide-react';

interface TestResultProps {
  result: TestResult;
}

export function TestResultComponent({ result }: TestResultProps) {
  const {
    topic,
    totalQuestions,
    mcqQuestions,
    plainQuestions,
    mcqCorrect,
    mcqScore,
    plainAverageRating,
    overallScore,
    timeTaken
  } = result;

  const getScoreColor = (score: number) => {
    if (score >= 80) return 'text-green-600 dark:text-green-400';
    if (score >= 60) return 'text-blue-600 dark:text-blue-400';
    if (score >= 40) return 'text-orange-600 dark:text-orange-400';
    return 'text-red-600 dark:text-red-400';
  };

  const getScoreMessage = (score: number) => {
    if (score >= 90) return 'Outstanding! 🎉';
    if (score >= 80) return 'Excellent work! 🌟';
    if (score >= 70) return 'Great job! 👏';
    if (score >= 60) return 'Good effort! 👍';
    if (score >= 50) return 'Keep practicing! 💪';
    return 'Don\'t give up! 📚';
  };

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-8">
      {/* Header */}
      <div className="text-center space-y-4">
        <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-blue-100 dark:bg-blue-900/30">
          <Trophy className="w-10 h-10 text-blue-600 dark:text-blue-400" />
        </div>
        <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100">
          Test Completed!
        </h1>
        <p className="text-gray-600 dark:text-gray-400">
          {getTopicDisplayName(topic)} Mock Test
        </p>
      </div>

      {/* Overall Score */}
      <div className="bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-800/20 rounded-2xl p-8 text-center border border-blue-200 dark:border-blue-800">
        <p className="text-sm font-semibold text-blue-700 dark:text-blue-300 mb-2">
          Overall Score
        </p>
        <p className={`text-6xl font-bold mb-2 ${getScoreColor(overallScore)}`}>
          {Math.round(overallScore)}%
        </p>
        <p className="text-lg text-gray-700 dark:text-gray-300">
          {getScoreMessage(overallScore)}
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid md:grid-cols-2 gap-4">
        {/* MCQ Stats */}
        {mcqQuestions > 0 && (
          <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6 space-y-3">
            <div className="flex items-center gap-2">
              <CheckCircle className="w-5 h-5 text-blue-600 dark:text-blue-400" />
              <h3 className="font-semibold text-gray-900 dark:text-gray-100">
                Multiple Choice
              </h3>
            </div>
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-gray-600 dark:text-gray-400">
                  Correct Answers
                </span>
                <span className="font-semibold text-gray-900 dark:text-gray-100">
                  {mcqCorrect} / {mcqQuestions}
                </span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-600 dark:text-gray-400">Score</span>
                <span className={`font-semibold ${getScoreColor(mcqScore)}`}>
                  {Math.round(mcqScore)}%
                </span>
              </div>
            </div>
          </div>
        )}

        {/* Plain Questions Stats */}
        {plainQuestions > 0 && (
          <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6 space-y-3">
            <div className="flex items-center gap-2">
              <Star className="w-5 h-5 text-green-600 dark:text-green-400" />
              <h3 className="font-semibold text-gray-900 dark:text-gray-100">
                Self-Assessment
              </h3>
            </div>
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-gray-600 dark:text-gray-400">
                  Questions
                </span>
                <span className="font-semibold text-gray-900 dark:text-gray-100">
                  {plainQuestions}
                </span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-600 dark:text-gray-400">
                  Average Rating
                </span>
                <span className="font-semibold text-green-600 dark:text-green-400">
                  {plainAverageRating.toFixed(1)} / 10
                </span>
              </div>
            </div>
          </div>
        )}

        {/* Time Stats */}
        <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6 space-y-3">
          <div className="flex items-center gap-2">
            <Clock className="w-5 h-5 text-purple-600 dark:text-purple-400" />
            <h3 className="font-semibold text-gray-900 dark:text-gray-100">
              Time
            </h3>
          </div>
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-gray-600 dark:text-gray-400">
                Time Taken
              </span>
              <span className="font-semibold text-gray-900 dark:text-gray-100 font-mono">
                {formatTime(timeTaken)}
              </span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-600 dark:text-gray-400">
                Duration
              </span>
              <span className="font-semibold text-gray-900 dark:text-gray-100">
                {formatDuration(timeTaken)}
              </span>
            </div>
          </div>
        </div>

        {/* Total Questions */}
        <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6 space-y-3">
          <div className="flex items-center gap-2">
            <Target className="w-5 h-5 text-orange-600 dark:text-orange-400" />
            <h3 className="font-semibold text-gray-900 dark:text-gray-100">
              Coverage
            </h3>
          </div>
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-gray-600 dark:text-gray-400">
                Total Questions
              </span>
              <span className="font-semibold text-gray-900 dark:text-gray-100">
                {totalQuestions}
              </span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-600 dark:text-gray-400">
                Completion
              </span>
              <span className="font-semibold text-green-600 dark:text-green-400">
                100%
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Actions */}
      <div className="flex flex-col sm:flex-row gap-4">
        <Link
          href={`/test-your-skill/${topic}`}
          className="flex-1 flex items-center justify-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition-colors"
        >
          <RotateCcw className="w-5 h-5" />
          Retake Test
        </Link>
        <Link
          href="/test-your-skill"
          className="flex-1 flex items-center justify-center gap-2 px-6 py-3 bg-gray-600 hover:bg-gray-700 text-white font-semibold rounded-lg transition-colors"
        >
          <Home className="w-5 h-5" />
          Back to Tests
        </Link>
      </div>
    </div>
  );
}
