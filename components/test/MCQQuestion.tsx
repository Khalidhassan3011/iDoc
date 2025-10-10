'use client';

import { useState, useEffect } from 'react';
import type { MCQQuestion } from '@/lib/test/types';

interface MCQQuestionProps {
  question: MCQQuestion;
  initialAnswer?: number;
  onAnswerChange: (selectedOption: number) => void;
}

export function MCQQuestionComponent({
  question,
  initialAnswer,
  onAnswerChange
}: MCQQuestionProps) {
  const [selectedOption, setSelectedOption] = useState<number | null>(
    initialAnswer !== undefined ? initialAnswer : null
  );

  useEffect(() => {
    if (initialAnswer !== undefined) {
      setSelectedOption(initialAnswer);
    } else {
      setSelectedOption(null);
    }
  }, [question.id, initialAnswer]);

  const handleOptionChange = (index: number) => {
    setSelectedOption(index);
    onAnswerChange(index);
  };

  return (
    <div className="space-y-6">
      <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-2">
          {question.question}
        </h3>
        {question.source && (
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Source: {question.source}
          </p>
        )}
      </div>

      <div className="space-y-3">
        {question.options.map((option, index) => (
          <label
            key={index}
            className={`flex items-start gap-3 p-4 rounded-lg border-2 cursor-pointer transition-all ${
              selectedOption === index
                ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20'
                : 'border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600'
            }`}
          >
            <input
              type="radio"
              name={`question-${question.id}`}
              value={index}
              checked={selectedOption === index}
              onChange={() => handleOptionChange(index)}
              className="mt-1 w-4 h-4 text-blue-600 focus:ring-blue-500"
            />
            <span className="flex-1 text-gray-700 dark:text-gray-300">
              {option}
            </span>
          </label>
        ))}
      </div>
    </div>
  );
}
