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
    <div className="flex items-center gap-2 px-4 py-2">
      <button
        onClick={onRunCode}
        disabled={isLoading}
        className="px-4 py-2 bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 disabled:from-gray-600 disabled:to-gray-600 disabled:cursor-not-allowed text-white text-sm font-semibold rounded-md transition-all shadow-lg hover:shadow-green-500/50 flex items-center gap-2"
      >
        {isLoading ? (
          <>
            <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent"></div>
            Running...
          </>
        ) : (
          <>
            <span>▶</span>
            Run
          </>
        )}
      </button>

      <button
        onClick={onRunTests}
        disabled={isLoading || !hasTestCases}
        title={!hasTestCases ? 'Add test cases to enable' : 'Run all test cases'}
        className="px-4 py-2 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 disabled:from-gray-600 disabled:to-gray-600 disabled:cursor-not-allowed text-white text-sm font-semibold rounded-md transition-all shadow-lg hover:shadow-blue-500/50 flex items-center gap-2"
      >
        <span>✓</span>
        Test
      </button>

      <button
        onClick={onReset}
        disabled={isLoading}
        className="px-3 py-2 bg-gray-700 hover:bg-gray-600 disabled:bg-gray-600 disabled:cursor-not-allowed text-gray-300 text-sm font-medium rounded-md transition-colors flex items-center gap-1"
      >
        <span className="text-base">↻</span>
        Reset
      </button>
    </div>
  );
}
