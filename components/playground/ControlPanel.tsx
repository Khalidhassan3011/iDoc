'use client';

interface ControlPanelProps {
  onRunCode: () => void;
  onRunTests: () => void;
  onReset: () => void;
  isLoading: boolean;
  hasTestCases: boolean;
}

export default function ControlPanel({
  onRunCode,
  onRunTests,
  onReset,
  isLoading,
  hasTestCases,
}: ControlPanelProps) {
  return (
    <div className="flex items-center gap-3 px-4 py-3 bg-gray-800 border-t border-gray-700">
      <button
        onClick={onRunCode}
        disabled={isLoading}
        className="px-4 py-2 bg-green-600 hover:bg-green-700 disabled:bg-gray-600 disabled:cursor-not-allowed text-white text-sm font-medium rounded-md transition-colors"
      >
        {isLoading ? 'Running...' : '▶ Run Code'}
      </button>

      <button
        onClick={onRunTests}
        disabled={isLoading || !hasTestCases}
        className="px-4 py-2 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-600 disabled:cursor-not-allowed text-white text-sm font-medium rounded-md transition-colors"
      >
        ✓ Run Tests
      </button>

      <button
        onClick={onReset}
        disabled={isLoading}
        className="px-4 py-2 bg-gray-700 hover:bg-gray-600 disabled:bg-gray-600 disabled:cursor-not-allowed text-white text-sm font-medium rounded-md transition-colors"
      >
        ↻ Reset
      </button>

      {!hasTestCases && (
        <span className="text-xs text-gray-500 italic ml-2">
          Add test cases to enable test validation
        </span>
      )}
    </div>
  );
}
