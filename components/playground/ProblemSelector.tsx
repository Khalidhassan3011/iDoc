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
    <div className="flex items-center gap-3">
      <label htmlFor="problem-select" className="text-sm font-medium text-gray-300">
        Select Problem:
      </label>
      <select
        id="problem-select"
        value={selectedProblem?.id || ''}
        onChange={(e) => {
          const problem = problems.find((p) => p.id === e.target.value);
          if (problem) onProblemChange(problem);
        }}
        className="flex-1 max-w-md px-3 py-2 bg-gray-800 border border-gray-700 rounded-md text-sm text-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
      >
        <option value="">Choose a problem...</option>
        {problems.map((problem) => (
          <option key={problem.id} value={problem.id}>
            {problem.title}
          </option>
        ))}
      </select>
    </div>
  );
}
