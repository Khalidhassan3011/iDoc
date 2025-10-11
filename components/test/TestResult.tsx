'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import type { TestResult, MCQQuestion, PlainQuestion, MCQAnswer, PlainAnswer } from '@/lib/test/types';
import { formatDuration, formatTime, clearTestState } from '@/lib/test/test-engine';
import { getTopicDisplayName } from '@/lib/test/question-service';
import { Trophy, Target, CheckCircle, Star, Clock, RotateCcw, Home, ChevronDown, ChevronUp, X } from 'lucide-react';

interface TestResultProps {
  result: TestResult;
}

export function TestResultComponent({ result }: TestResultProps) {
  const router = useRouter();
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

  const handleRetake = () => {
    // Clear all test state and result
    clearTestState();
    sessionStorage.removeItem('test-result');
    // Navigate to test page
    router.push(`/test-your-skill/${topic}`);
  };

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
              {answeredPlains.map(({ question, answer }, index) => {
                const hasFollowUps = answer.followUpAttempts && answer.followUpAttempts.length > 0;
                const finalScore = answer.finalScore ?? answer.rating;

                return (
                  <div
                    key={question.id}
                    className="bg-gray-50 dark:bg-gray-900/50 rounded-lg p-6 space-y-4"
                  >
                    <div className="flex items-start gap-3">
                      <span className="flex-shrink-0 w-8 h-8 rounded-full bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400 flex items-center justify-center font-semibold text-sm">
                        {index + 1}
                      </span>
                      <div className="flex-1 space-y-4">
                        <p className="font-medium text-gray-900 dark:text-gray-100">
                          {question.question}
                        </p>

                        {/* Initial Rating */}
                        <div>
                          <div className="flex items-center justify-between mb-2">
                            <span className="text-sm text-gray-600 dark:text-gray-400">
                              Initial Self-Rating
                            </span>
                            <span className="text-xl font-bold text-blue-600 dark:text-blue-400">
                              {answer.rating}/10
                            </span>
                          </div>
                          <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                            <div
                              className="bg-blue-500 h-2 rounded-full transition-all"
                              style={{ width: `${(answer.rating / 10) * 100}%` }}
                            />
                          </div>
                        </div>

                        {/* Follow-up MCQ Attempts */}
                        {hasFollowUps && question.followUps && (
                          <div className="space-y-3">
                            <p className="text-sm font-semibold text-gray-700 dark:text-gray-300">
                              Verification Questions:
                            </p>
                            {answer.followUpAttempts!.map((attempt, attemptIndex) => {
                              const followUpQ = question.followUps![attempt.difficulty];
                              if (!followUpQ) return null;

                              return (
                                <div
                                  key={attemptIndex}
                                  className={`border-l-4 pl-4 py-2 ${
                                    attempt.isCorrect
                                      ? 'border-green-500 bg-green-50/50 dark:bg-green-900/10'
                                      : 'border-red-500 bg-red-50/50 dark:bg-red-900/10'
                                  }`}
                                >
                                  <div className="flex items-center gap-2 mb-2">
                                    <span className="px-2 py-0.5 bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 text-xs font-semibold rounded uppercase">
                                      {attempt.difficulty}
                                    </span>
                                    {attempt.isCorrect ? (
                                      <span className="flex items-center gap-1 text-green-700 dark:text-green-300 text-sm font-medium">
                                        <CheckCircle className="w-4 h-4" />
                                        Correct
                                      </span>
                                    ) : (
                                      <span className="flex items-center gap-1 text-red-700 dark:text-red-300 text-sm font-medium">
                                        <X className="w-4 h-4" />
                                        Incorrect
                                      </span>
                                    )}
                                  </div>
                                  <p className="text-sm text-gray-800 dark:text-gray-200 mb-2">
                                    {followUpQ.question}
                                  </p>
                                  <div className="space-y-1 text-sm">
                                    {followUpQ.options.map((option, optIndex) => {
                                      const isCorrect = optIndex === followUpQ.correctAnswer;
                                      const isSelected = optIndex === attempt.selectedOption;

                                      return (
                                        <div
                                          key={optIndex}
                                          className={`px-3 py-1.5 rounded ${
                                            isCorrect
                                              ? 'bg-green-100 dark:bg-green-900/30 text-green-900 dark:text-green-100 font-medium'
                                              : isSelected
                                              ? 'bg-red-100 dark:bg-red-900/30 text-red-900 dark:text-red-100 font-medium'
                                              : 'text-gray-600 dark:text-gray-400'
                                          }`}
                                        >
                                          {option}
                                          {isCorrect && ' ✓'}
                                          {isSelected && !isCorrect && ' ✗ (Your answer)'}
                                        </div>
                                      );
                                    })}
                                  </div>
                                </div>
                              );
                            })}
                          </div>
                        )}

                        {/* Final Score */}
                        <div className={`p-3 rounded-lg ${
                          finalScore >= 7
                            ? 'bg-green-100 dark:bg-green-900/30 border border-green-300 dark:border-green-700'
                            : finalScore >= 4
                            ? 'bg-blue-100 dark:bg-blue-900/30 border border-blue-300 dark:border-blue-700'
                            : 'bg-orange-100 dark:bg-orange-900/30 border border-orange-300 dark:border-orange-700'
                        }`}>
                          <div className="flex items-center justify-between">
                            <span className={`text-sm font-semibold ${
                              finalScore >= 7
                                ? 'text-green-800 dark:text-green-200'
                                : finalScore >= 4
                                ? 'text-blue-800 dark:text-blue-200'
                                : 'text-orange-800 dark:text-orange-200'
                            }`}>
                              Final Score
                            </span>
                            <span className={`text-2xl font-bold ${
                              finalScore >= 7
                                ? 'text-green-700 dark:text-green-300'
                                : finalScore >= 4
                                ? 'text-blue-700 dark:text-blue-300'
                                : 'text-orange-700 dark:text-orange-300'
                            }`}>
                              {finalScore}/10
                            </span>
                          </div>
                          {hasFollowUps && (
                            <p className={`text-xs mt-1 ${
                              finalScore >= 7
                                ? 'text-green-700 dark:text-green-300'
                                : finalScore >= 4
                                ? 'text-blue-700 dark:text-blue-300'
                                : 'text-orange-700 dark:text-orange-300'
                            }`}>
                              {finalScore === answer.rating
                                ? 'Your self-assessment was verified as accurate!'
                                : `Adjusted from ${answer.rating}/10 based on verification questions`
                              }
                            </p>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      )}

      {/* Actions */}
      <div className="flex flex-col sm:flex-row gap-4">
        <button
          onClick={handleRetake}
          className="flex-1 flex items-center justify-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition-colors"
        >
          <RotateCcw className="w-5 h-5" />
          Retake Test
        </button>
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
