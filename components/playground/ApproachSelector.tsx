'use client';

interface ApproachSelectorProps {
  approaches: string[];
  selectedApproach: number;
  onApproachChange: (index: number) => void;
}

export default function ApproachSelector({
  approaches,
  selectedApproach,
  onApproachChange,
}: ApproachSelectorProps) {
  if (approaches.length <= 1) {
    return null;
  }

  return (
    <div className="flex items-center gap-3 p-3 bg-gray-800/50 rounded-lg border border-gray-700/50">
      <span className="text-sm font-semibold text-gray-300">💡 Solution:</span>
      <div className="flex gap-2">
        {approaches.map((approach, index) => (
          <button
            key={index}
            onClick={() => onApproachChange(index)}
            className={`px-3 py-1.5 text-sm font-medium rounded-md transition-all ${
              selectedApproach === index
                ? 'bg-gradient-to-r from-purple-600 to-purple-700 text-white shadow-lg'
                : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
            }`}
          >
            {approach}
          </button>
        ))}
      </div>
    </div>
  );
}
