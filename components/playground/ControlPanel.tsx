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
    <div className="flex items-center gap-4 px-4">
      <button
        onClick={onRunCode}
        disabled={isLoading}
        title="Run Code"
        className="text-green-500 hover:text-green-400 disabled:text-gray-600 disabled:cursor-not-allowed transition-colors flex items-center gap-1.5"
      >
        {isLoading ? (
          <div className="animate-spin rounded-full h-5 w-5 border-2 border-green-500 border-t-transparent"></div>
        ) : (
          <svg
            className="w-6 h-6"
            fill="currentColor"
            viewBox="0 0 24 24"
          >
            <path d="M8 5v14l11-7z" />
          </svg>
        )}
        <span className="text-sm font-semibold">Run</span>
      </button>

      <button
        onClick={onRunTests}
        disabled={isLoading || !hasTestCases}
        title={!hasTestCases ? 'Add test cases to enable' : 'Run Test Cases'}
        className="text-blue-500 hover:text-blue-400 disabled:text-gray-600 disabled:cursor-not-allowed transition-colors flex items-center gap-1.5"
      >
        <svg
          className="w-6 h-6"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
        <span className="text-sm font-semibold">Test</span>
      </button>

      <button
        onClick={onReset}
        disabled={isLoading}
        title="Reset Code"
        className="text-orange-500 hover:text-orange-400 disabled:text-gray-600 disabled:cursor-not-allowed transition-colors flex items-center gap-1.5"
      >
        <svg
          className="w-6 h-6"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
        </svg>
        <span className="text-sm font-semibold">Reset</span>
      </button>
    </div>
  );
}
