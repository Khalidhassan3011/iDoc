'use client';

import { useState, useEffect } from 'react';
import type { PlainQuestion, PlainAnswer, FollowUpDifficulty, FollowUpAttempt } from '@/lib/test/types';
import { CheckCircle, X } from 'lucide-react';

interface PlainQuestionProps {
  question: PlainQuestion;
  initialAnswer?: PlainAnswer;
  onAnswerChange: (answer: PlainAnswer) => void;
}

export function PlainQuestionComponent({
  question,
  initialAnswer,
  onAnswerChange
}: PlainQuestionProps) {
  const [rating, setRating] = useState<number>(initialAnswer?.rating ?? 5);
  const [ratingSubmitted, setRatingSubmitted] = useState(false);
  const [followUpAttempts, setFollowUpAttempts] = useState<FollowUpAttempt[]>(initialAnswer?.followUpAttempts || []);
  const [currentFollowUp, setCurrentFollowUp] = useState<FollowUpDifficulty | null>(null);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [calculatedFinalScore, setCalculatedFinalScore] = useState<number | null>(null);

  useEffect(() => {
    // Reset all state when question changes
    if (initialAnswer) {
      setRating(initialAnswer.rating);
      setRatingSubmitted(true);
      setFollowUpAttempts(initialAnswer.followUpAttempts || []);
      setSelectedOption(null);
      setShowResult(false);
      setCalculatedFinalScore(initialAnswer.finalScore ?? null);

      // If there are follow-up attempts but not all completed, show the next one
      if (initialAnswer.followUpAttempts && initialAnswer.followUpAttempts.length > 0) {
        const lastAttempt = initialAnswer.followUpAttempts[initialAnswer.followUpAttempts.length - 1];
        if (!lastAttempt.isCorrect) {
          // Determine next difficulty
          const nextDiff = getNextDifficulty(lastAttempt.difficulty);
          if (nextDiff) {
            setCurrentFollowUp(nextDiff);
          }
        } else {
          // All attempts completed successfully
          setCurrentFollowUp(null);
        }
      } else {
        setCurrentFollowUp(null);
      }
    } else {
      // No initial answer - reset to fresh state
      setRating(5);
      setRatingSubmitted(false);
      setFollowUpAttempts([]);
      setCurrentFollowUp(null);
      setSelectedOption(null);
      setShowResult(false);
      setCalculatedFinalScore(null);
    }
  }, [question.id, initialAnswer]);

  const getInitialFollowUpDifficulty = (rating: number): FollowUpDifficulty | null => {
    if (rating === 0) return null;
    if (rating >= 7) return 'hard';
    if (rating >= 4) return 'medium';
    return 'easy';
  };

  const getNextDifficulty = (currentDiff: FollowUpDifficulty): FollowUpDifficulty | null => {
    if (currentDiff === 'hard') return 'medium';
    if (currentDiff === 'medium') return 'easy';
    return null; // No more follow-ups after easy
  };

  const calculateFinalScore = (rating: number, attempts: FollowUpAttempt[]): number => {
    if (rating === 0) return 0;
    if (attempts.length === 0) return rating; // No follow-ups attempted yet

    const lastAttempt = attempts[attempts.length - 1];

    // Only calculate if last attempt was correct
    if (lastAttempt.isCorrect) {
      if (lastAttempt.difficulty === 'hard') return rating; // Full points for hard
      if (lastAttempt.difficulty === 'medium') {
        // Random between 4-6
        return Math.floor(Math.random() * 3) + 4;
      }
      if (lastAttempt.difficulty === 'easy') {
        // Random between 1-3
        return Math.floor(Math.random() * 3) + 1;
      }
    }

    // If we get here, answer was wrong - return 0
    return 0;
  };

  const handleRatingSubmit = () => {
    setRatingSubmitted(true);
    const initialDiff = getInitialFollowUpDifficulty(rating);

    // Check if question has follow-ups AND the specific difficulty exists
    if (initialDiff && question.followUps && question.followUps[initialDiff]) {
      setCurrentFollowUp(initialDiff);
    } else {
      // No follow-up available, finalize answer
      const answer: PlainAnswer = {
        questionId: question.id,
        type: 'plain',
        rating,
        followUpAttempts: [],
        finalScore: rating
      };
      onAnswerChange(answer);
    }
  };

  const handleFollowUpSubmit = () => {
    if (selectedOption === null || !currentFollowUp || !question.followUps) return;

    const followUpQuestion = question.followUps[currentFollowUp];
    if (!followUpQuestion) return;

    const isCorrect = followUpQuestion.correctAnswer === selectedOption;
    const newAttempt: FollowUpAttempt = {
      difficulty: currentFollowUp,
      selectedOption,
      isCorrect
    };

    const updatedAttempts = [...followUpAttempts, newAttempt];
    setFollowUpAttempts(updatedAttempts);
    setShowResult(true);

    // Determine final score or next follow-up
    if (isCorrect) {
      // Correct answer - finalize and store calculated score
      const finalScore = calculateFinalScore(rating, updatedAttempts);
      setCalculatedFinalScore(finalScore);
      const answer: PlainAnswer = {
        questionId: question.id,
        type: 'plain',
        rating,
        followUpAttempts: updatedAttempts,
        finalScore
      };
      onAnswerChange(answer);
    }
    // If wrong, don't do anything - wait for user to click Continue button
  };

  const handleContinue = () => {
    if (!currentFollowUp || !question.followUps) return;

    const nextDiff = getNextDifficulty(currentFollowUp);
    if (nextDiff && question.followUps[nextDiff]) {
      // There's a next follow-up - show it
      setCurrentFollowUp(nextDiff);
      setSelectedOption(null);
      setShowResult(false);
    } else {
      // No more follow-ups - finalize with final score based on attempts
      const finalScore = calculateFinalScore(rating, followUpAttempts);
      const answer: PlainAnswer = {
        questionId: question.id,
        type: 'plain',
        rating,
        followUpAttempts,
        finalScore
      };
      onAnswerChange(answer);
    }
  };

  const getCurrentFollowUpQuestion = () => {
    if (!currentFollowUp || !question.followUps) return null;
    return question.followUps[currentFollowUp];
  };

  const followUpMCQ = getCurrentFollowUpQuestion();

  return (
    <div className="space-y-6">
      <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg p-4">
        <div className="flex items-center gap-2 mb-3">
          <span className="px-2 py-1 bg-green-200 dark:bg-green-800 text-green-800 dark:text-green-200 text-xs font-semibold rounded">
            Self-Assessment
          </span>
        </div>
        <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-2">
          {question.question}
        </h3>
        {question.source && (
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Source: {question.source}
          </p>
        )}
      </div>

      {!ratingSubmitted ? (
        // Rating selection UI
        <div className="space-y-4">
          <div className="bg-gray-50 dark:bg-gray-800/50 rounded-lg p-4">
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
              Rate your understanding of this topic (0 = Not familiar at all, 10 = Expert)
            </p>

            <div className="flex items-center gap-4">
              <input
                type="range"
                min="0"
                max="10"
                value={rating}
                onChange={(e) => setRating(parseInt(e.target.value))}
                className="flex-1 h-2 bg-gray-200 dark:bg-gray-700 rounded-lg appearance-none cursor-pointer accent-blue-600"
              />
              <div className="flex items-center justify-center w-16 h-16 rounded-lg bg-blue-100 dark:bg-blue-900/30 text-2xl font-bold text-blue-700 dark:text-blue-400">
                {rating}
              </div>
            </div>

            <div className="flex justify-between mt-2 text-xs text-gray-500 dark:text-gray-400">
              <span>Not Familiar</span>
              <span>Expert</span>
            </div>
          </div>

          <div className="grid grid-cols-11 gap-1">
            {Array.from({ length: 11 }, (_, i) => i).map((num) => (
              <button
                key={num}
                onClick={() => setRating(num)}
                className={`h-8 rounded text-xs font-semibold transition-all ${
                  rating === num
                    ? 'bg-blue-600 text-white scale-110'
                    : 'bg-gray-200 dark:bg-gray-700 text-gray-600 dark:text-gray-400 hover:bg-gray-300 dark:hover:bg-gray-600'
                }`}
              >
                {num}
              </button>
            ))}
          </div>

          <button
            onClick={handleRatingSubmit}
            className="w-full px-6 py-3 bg-green-600 hover:bg-green-700 text-white font-semibold rounded-lg transition-colors"
          >
            Submit Rating
          </button>
        </div>
      ) : followUpMCQ && currentFollowUp ? (
        // Follow-up MCQ UI
        <div className="space-y-4">
          <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4">
            <div className="flex items-center gap-2 mb-3">
              <span className="px-2 py-1 bg-blue-200 dark:bg-blue-800 text-blue-800 dark:text-blue-200 text-xs font-semibold rounded uppercase">
                {currentFollowUp} Verification Question
              </span>
            </div>
            <p className="text-sm text-blue-800 dark:text-blue-200">
              You rated yourself {rating}/10. {calculatedFinalScore !== null ? `Final Score: ${calculatedFinalScore}/10` : "Let's verify your knowledge!"}
            </p>
          </div>

          {/* Only show MCQ if not completed (no final score yet) */}
          {calculatedFinalScore === null && (
            <>
              <div className="bg-gray-50 dark:bg-gray-800/50 rounded-lg p-6">
                <p className="font-medium text-gray-900 dark:text-gray-100 mb-4">
                  {followUpMCQ.question}
                </p>

                <div className="space-y-2">
                  {followUpMCQ.options.map((option, index) => (
                    <button
                      key={index}
                      onClick={() => !showResult && setSelectedOption(index)}
                      disabled={showResult}
                      className={`w-full text-left p-4 rounded-lg border-2 transition-all ${
                        showResult
                          ? index === followUpMCQ.correctAnswer
                            ? 'bg-green-50 dark:bg-green-900/20 border-green-500 dark:border-green-500'
                            : index === selectedOption
                            ? 'bg-red-50 dark:bg-red-900/20 border-red-500 dark:border-red-500'
                            : 'bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700'
                          : selectedOption === index
                          ? 'bg-blue-50 dark:bg-blue-900/20 border-blue-500 dark:border-blue-500'
                          : 'bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 hover:border-blue-300 dark:hover:border-blue-600'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <span className={`${
                          showResult
                            ? index === followUpMCQ.correctAnswer
                              ? 'text-green-900 dark:text-green-100 font-medium'
                              : index === selectedOption
                              ? 'text-red-900 dark:text-red-100 font-medium'
                              : 'text-gray-700 dark:text-gray-300'
                            : selectedOption === index
                            ? 'text-blue-900 dark:text-blue-100 font-medium'
                            : 'text-gray-700 dark:text-gray-300'
                        }`}>
                          {option}
                        </span>
                        {showResult && index === followUpMCQ.correctAnswer && (
                          <CheckCircle className="w-5 h-5 text-green-600 dark:text-green-400" />
                        )}
                        {showResult && index === selectedOption && index !== followUpMCQ.correctAnswer && (
                          <X className="w-5 h-5 text-red-600 dark:text-red-400" />
                        )}
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              {!showResult && (
                <button
                  onClick={handleFollowUpSubmit}
                  disabled={selectedOption === null}
                  className={`w-full px-6 py-3 font-semibold rounded-lg transition-colors ${
                    selectedOption !== null
                      ? 'bg-blue-600 hover:bg-blue-700 text-white'
                      : 'bg-gray-300 dark:bg-gray-700 text-gray-500 dark:text-gray-500 cursor-not-allowed'
                  }`}
                >
                  Submit Answer
                </button>
              )}

              {showResult && (
                <>
                  <div className={`p-4 rounded-lg ${
                    selectedOption === followUpMCQ.correctAnswer
                      ? 'bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800'
                      : 'bg-orange-50 dark:bg-orange-900/20 border border-orange-200 dark:border-orange-800'
                  }`}>
                    <p className={`font-medium ${
                      selectedOption === followUpMCQ.correctAnswer
                        ? 'text-green-800 dark:text-green-200'
                        : 'text-orange-800 dark:text-orange-200'
                    }`}>
                      {selectedOption === followUpMCQ.correctAnswer
                        ? '✓ Correct! Your self-assessment was accurate.'
                        : `✗ Incorrect. ${getNextDifficulty(currentFollowUp) && question.followUps && question.followUps[getNextDifficulty(currentFollowUp)!] ? 'Click Continue to try an easier question.' : 'Final score: 0'}`
                      }
                    </p>
                  </div>

                  {/* Continue button for wrong answers */}
                  {selectedOption !== followUpMCQ.correctAnswer && (
                    <button
                      onClick={handleContinue}
                      className="w-full px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition-colors"
                    >
                      {getNextDifficulty(currentFollowUp) && question.followUps && question.followUps[getNextDifficulty(currentFollowUp)!]
                        ? 'Continue to Next Question'
                        : 'Continue'
                      }
                    </button>
                  )}
                </>
              )}
            </>
          )}
        </div>
      ) : (
        // Rating submitted, no follow-up or completed
        <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg p-4">
          <p className="text-green-800 dark:text-green-200 font-medium">
            ✓ {calculatedFinalScore !== null ? `Final Score: ${calculatedFinalScore}/10` : `Rating submitted: ${rating}/10`}
          </p>
        </div>
      )}
    </div>
  );
}
