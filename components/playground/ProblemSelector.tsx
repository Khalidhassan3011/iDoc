'use client';

import { Problem } from '@/lib/get-problems';

interface ProblemSelectorProps {
  problems: Problem[];
  selectedProblem: Problem | null;
  onProblemChange: (problem: Problem) => void;
}

export default function ProblemSelector({
  problems,
  selectedProblem,
  onProblemChange,
}: ProblemSelectorProps) {
  return (
    <div className="flex items-center gap-4">
      <label htmlFor="problem-select" className="text-sm font-semibold text-gray-300 whitespace-nowrap">
        📚 Problem:
      </label>
      <select
        id="problem-select"
        value={selectedProblem?.id || ''}
        onChange={(e) => {
          const problem = problems.find((p) => p.id === e.target.value);
          if (problem) onProblemChange(problem);
        }}
        className="flex-1 max-w-2xl px-4 py-2.5 bg-gradient-to-r from-gray-800 to-gray-900 border border-gray-600 rounded-lg text-sm text-gray-200 font-medium focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 shadow-lg cursor-pointer hover:border-gray-500 transition-all"
      >
        <option value="">Choose a problem to solve...</option>
        {problems.map((problem) => (
          <option key={problem.id} value={problem.id}>
            {problem.title}
          </option>
        ))}
      </select>
    </div>
  );
}
