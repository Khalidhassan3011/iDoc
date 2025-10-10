'use client';

interface TestProgressProps {
  current: number;
  total: number;
  answered: number;
}

export function TestProgress({ current, total, answered }: TestProgressProps) {
  const progress = ((current + 1) / total) * 100;
  const answeredProgress = (answered / total) * 100;

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between text-sm">
        <span className="font-semibold text-gray-700 dark:text-gray-300">
          Question {current + 1} of {total}
        </span>
        <span className="text-gray-500 dark:text-gray-400">
          Answered: {answered}/{total}
        </span>
      </div>

      <div className="relative h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
        <div
          className="absolute top-0 left-0 h-full bg-green-500 dark:bg-green-600 transition-all duration-300"
          style={{ width: `${answeredProgress}%` }}
        />
        <div
          className="absolute top-0 left-0 h-full bg-blue-500 dark:bg-blue-600 transition-all duration-300 opacity-50"
          style={{ width: `${progress}%` }}
        />
      </div>

      <div className="flex gap-1">
        {Array.from({ length: total }, (_, i) => (
          <div
            key={i}
            className={`flex-1 h-1 rounded-full transition-colors ${
              i < answered
                ? 'bg-green-500 dark:bg-green-600'
                : i === current
                ? 'bg-blue-500 dark:bg-blue-600'
                : 'bg-gray-200 dark:bg-gray-700'
            }`}
          />
        ))}
      </div>
    </div>
  );
}
