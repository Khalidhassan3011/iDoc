'use client';

interface OutputPanelProps {
  output: string;
  error?: string;
  isLoading: boolean;
  executionTime?: number;
}

export default function OutputPanel({
  output,
  error,
  isLoading,
  executionTime,
}: OutputPanelProps) {
  return (
    <div className="h-full flex flex-col bg-gray-900 border border-gray-700 rounded-lg shadow-xl">
      <div className="flex items-center justify-between px-4 py-2.5 border-b border-gray-700 bg-gray-800/50">
        <div className="flex items-center gap-2">
          <span className="text-lg">📟</span>
          <h3 className="text-sm font-bold text-gray-200">Console Output</h3>
        </div>
        {executionTime !== undefined && (
          <span className="text-xs text-gray-400 bg-gray-800 px-2 py-1 rounded font-mono">
            ⏱ {executionTime}ms
          </span>
        )}
      </div>

      <div className="flex-1 p-4 overflow-auto">
        {isLoading ? (
          <div className="flex items-center gap-2 text-blue-400">
            <div className="animate-spin rounded-full h-4 w-4 border-2 border-blue-400 border-t-transparent"></div>
            <span className="text-sm">Running code...</span>
          </div>
        ) : error ? (
          <div className="space-y-2">
            <div className="text-sm font-semibold text-red-400">Error:</div>
            <pre className="text-sm text-red-300 font-mono whitespace-pre-wrap">
              {error}
            </pre>
          </div>
        ) : output ? (
          <pre className="text-sm text-gray-200 font-mono whitespace-pre-wrap">
            {output}
          </pre>
        ) : (
          <div className="text-sm text-gray-500 italic">
            No output yet. Click &quot;Run Code&quot; or &quot;Run Tests&quot; to execute.
          </div>
        )}
      </div>
    </div>
  );
}
