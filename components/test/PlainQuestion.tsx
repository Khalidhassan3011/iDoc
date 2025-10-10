'use client';

import { useState, useEffect } from 'react';
import type { PlainQuestion } from '@/lib/test/types';

interface PlainQuestionProps {
  question: PlainQuestion;
  initialRating?: number;
  onRatingChange: (rating: number) => void;
}

export function PlainQuestionComponent({
  question,
  initialRating,
  onRatingChange
}: PlainQuestionProps) {
  const [rating, setRating] = useState<number>(initialRating ?? 5);

  useEffect(() => {
    if (initialRating !== undefined) {
      setRating(initialRating);
    } else {
      setRating(5);
    }
  }, [question.id, initialRating]);

  const handleRatingChange = (newRating: number) => {
    setRating(newRating);
    onRatingChange(newRating);
  };

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
              onChange={(e) => handleRatingChange(parseInt(e.target.value))}
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
              onClick={() => handleRatingChange(num)}
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
      </div>
    </div>
  );
}
