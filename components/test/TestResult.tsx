'use client';

import { useState } from 'react';
import Link from 'next/link';
import type { TestResult, MCQQuestion, PlainQuestion, MCQAnswer, PlainAnswer } from '@/lib/test/types';
import { formatDuration, formatTime } from '@/lib/test/test-engine';
import { getTopicDisplayName } from '@/lib/test/question-service';
import { Trophy, Target, CheckCircle, Star, Clock, RotateCcw, Home, ChevronDown, ChevronUp, X } from 'lucide-react';

interface TestResultProps {
  result: TestResult;
}

export function TestResultComponent({ result }: TestResultProps) {
  const [showMCQReview, setShowMCQReview] = useState(false);
  const [showPlainReview, setShowPlainReview] = useState(false);

  const {
    topic,
    totalQuestions,
    answeredQuestions,
    mcqQuestions,
    plainQuestions,
    mcqCorrect,
    mcqScore,
    plainAverageRating,
    overallScore,
    timeTaken,
    answers,
    questions
  } = result;

  const completionPercentage = totalQuestions > 0
    ? Math.round((answeredQuestions / totalQuestions) * 100)
    : 0;

  // Get answered MCQ questions with their answers
  const answeredMCQs = answers
    .filter((a): a is MCQAnswer => a.type === 'mcq')
    .map(answer => {
      const question = questions.find(q => q.id === answer.questionId) as MCQQuestion;
      return { question, answer };
    })
    .filter(({ question }) => question !== undefined);

  // Get answered plain questions with their answers
  const answeredPlains = answers
    .filter((a): a is PlainAnswer => a.type === 'plain')
    .map(answer => {
      const question = questions.find(q => q.id === answer.questionId) as PlainQuestion;
      return { question, answer };
    })
    .filter(({ question }) => question !== undefined);

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
                  Questions Answered
                </span>
                <span className="font-semibold text-gray-900 dark:text-gray-100">
                  {answeredMCQs.length}
                </span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-600 dark:text-gray-400">
                  Correct Answers
                </span>
                <span className="font-semibold text-gray-900 dark:text-gray-100">
                  {mcqCorrect} / {answeredMCQs.length}
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
                  Questions Answered
                </span>
                <span className="font-semibold text-gray-900 dark:text-gray-100">
                  {answeredPlains.length}
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
                Answered
              </span>
              <span className="font-semibold text-green-600 dark:text-green-400">
                {answeredQuestions} ({completionPercentage}%)
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Detailed Review Sections */}
      {answeredMCQs.length > 0 && (
        <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 overflow-hidden">
          <button
            onClick={() => setShowMCQReview(!showMCQReview)}
            className="w-full flex items-center justify-between p-6 hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors"
          >
            <div className="flex items-center gap-3">
              <CheckCircle className="w-6 h-6 text-blue-600 dark:text-blue-400" />
              <div className="text-left">
                <h3 className="font-semibold text-gray-900 dark:text-gray-100">
                  Multiple Choice Answers
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Review your {answeredMCQs.length} MCQ answer{answeredMCQs.length !== 1 ? 's' : ''}
                </p>
              </div>
            </div>
            {showMCQReview ? (
              <ChevronUp className="w-5 h-5 text-gray-400" />
            ) : (
              <ChevronDown className="w-5 h-5 text-gray-400" />
            )}
          </button>

          {showMCQReview && (
            <div className="border-t border-gray-200 dark:border-gray-700 p-6 space-y-6">
              {answeredMCQs.map(({ question, answer }, index) => (
                <div
                  key={question.id}
                  className="bg-gray-50 dark:bg-gray-900/50 rounded-lg p-6 space-y-4"
                >
                  <div className="flex items-start gap-3">
                    <span className="flex-shrink-0 w-8 h-8 rounded-full bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 flex items-center justify-center font-semibold text-sm">
                      {index + 1}
                    </span>
                    <div className="flex-1">
                      <p className="font-medium text-gray-900 dark:text-gray-100 mb-4">
                        {question.question}
                      </p>

                      <div className="space-y-2">
                        {question.options.map((option, optionIndex) => {
                          const isCorrect = optionIndex === question.correctAnswer;
                          const isSelected = optionIndex === answer.selectedOption;
                          const showAsCorrect = isCorrect;
                          const showAsWrong = isSelected && !isCorrect;

                          return (
                            <div
                              key={optionIndex}
                              className={`p-3 rounded-lg border-2 ${
                                showAsCorrect
                                  ? 'bg-green-50 dark:bg-green-900/20 border-green-500 dark:border-green-500'
                                  : showAsWrong
                                  ? 'bg-red-50 dark:bg-red-900/20 border-red-500 dark:border-red-500'
                                  : 'bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700'
                              }`}
                            >
                              <div className="flex items-center justify-between">
                                <span className={`${
                                  showAsCorrect
                                    ? 'text-green-900 dark:text-green-100 font-medium'
                                    : showAsWrong
                                    ? 'text-red-900 dark:text-red-100 font-medium'
                                    : 'text-gray-700 dark:text-gray-300'
                                }`}>
                                  {option}
                                </span>
                                {showAsCorrect && (
                                  <span className="flex items-center gap-1 text-sm font-semibold text-green-700 dark:text-green-300">
                                    <CheckCircle className="w-4 h-4" />
                                    Correct
                                  </span>
                                )}
                                {showAsWrong && (
                                  <span className="flex items-center gap-1 text-sm font-semibold text-red-700 dark:text-red-300">
                                    <X className="w-4 h-4" />
                                    Your Answer
                                  </span>
                                )}
                                {isSelected && isCorrect && (
                                  <span className="flex items-center gap-1 text-sm font-semibold text-green-700 dark:text-green-300">
                                    <CheckCircle className="w-4 h-4" />
                                    Your Answer
                                  </span>
                                )}
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {answeredPlains.length > 0 && (
        <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 overflow-hidden">
          <button
            onClick={() => setShowPlainReview(!showPlainReview)}
            className="w-full flex items-center justify-between p-6 hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors"
          >
            <div className="flex items-center gap-3">
              <Star className="w-6 h-6 text-green-600 dark:text-green-400" />
              <div className="text-left">
                <h3 className="font-semibold text-gray-900 dark:text-gray-100">
                  Self-Assessment Answers
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Review your {answeredPlains.length} self-rated answer{answeredPlains.length !== 1 ? 's' : ''}
                </p>
              </div>
            </div>
            {showPlainReview ? (
              <ChevronUp className="w-5 h-5 text-gray-400" />
            ) : (
              <ChevronDown className="w-5 h-5 text-gray-400" />
            )}
          </button>

          {showPlainReview && (
            <div className="border-t border-gray-200 dark:border-gray-700 p-6 space-y-6">
              {answeredPlains.map(({ question, answer }, index) => (
                <div
                  key={question.id}
                  className="bg-gray-50 dark:bg-gray-900/50 rounded-lg p-6 space-y-4"
                >
                  <div className="flex items-start gap-3">
                    <span className="flex-shrink-0 w-8 h-8 rounded-full bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400 flex items-center justify-center font-semibold text-sm">
                      {index + 1}
                    </span>
                    <div className="flex-1">
                      <p className="font-medium text-gray-900 dark:text-gray-100 mb-4">
                        {question.question}
                      </p>

                      <div className="flex items-center gap-4">
                        <div className="flex-1">
                          <div className="flex items-center justify-between mb-2">
                            <span className="text-sm text-gray-600 dark:text-gray-400">
                              Your Rating
                            </span>
                            <span className="text-2xl font-bold text-green-600 dark:text-green-400">
                              {answer.rating}/10
                            </span>
                          </div>
                          <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-3">
                            <div
                              className="bg-green-500 h-3 rounded-full transition-all"
                              style={{ width: `${(answer.rating / 10) * 100}%` }}
                            />
                          </div>
                          <div className="flex justify-between text-xs text-gray-500 dark:text-gray-500 mt-1">
                            <span>Not Familiar</span>
                            <span>Expert</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

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
