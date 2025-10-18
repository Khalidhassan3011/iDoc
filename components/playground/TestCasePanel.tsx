'use client';

interface TestCase {
  input: string;
  expectedOutput: string;
  description?: string;
}

interface TestResult {
  passed: boolean;
  input: string;
  expected: string;
  actual: string;
  error?: string;
}

interface TestCasePanelProps {
  testCases: TestCase[];
  testResults: TestResult[] | null;
  onTestCaseChange: (testCases: TestCase[]) => void;
}

export default function TestCasePanel({
  testCases,
  testResults,
  onTestCaseChange,
}: TestCasePanelProps) {
  const handleAddTestCase = () => {
    onTestCaseChange([
      ...testCases,
      { input: '', expectedOutput: '', description: '' },
    ]);
  };

  const handleRemoveTestCase = (index: number) => {
    onTestCaseChange(testCases.filter((_, i) => i !== index));
  };

  const handleUpdateTestCase = (
    index: number,
    field: keyof TestCase,
    value: string
  ) => {
    const updated = [...testCases];
    updated[index] = { ...updated[index], [field]: value };
    onTestCaseChange(updated);
  };

  const passedCount = testResults?.filter((r) => r.passed).length || 0;
  const totalCount = testResults?.length || 0;
  const allPassed = totalCount > 0 && passedCount === totalCount;

  return (
    <div className="space-y-4">
      {/* Header with Summary Badge */}
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2">
            <span className="text-2xl">🧪</span>
            <h3 className="text-lg font-bold text-gray-200">Test Cases</h3>
          </div>
          {testResults && testResults.length > 0 && (
            <div
              className={`px-3 py-1 rounded-full text-xs font-semibold ${
                allPassed
                  ? 'bg-green-500/20 text-green-400 border border-green-500/30'
                  : 'bg-red-500/20 text-red-400 border border-red-500/30'
              }`}
            >
              {passedCount}/{totalCount} Passed
            </div>
          )}
        </div>
        <button
          onClick={handleAddTestCase}
          className="px-4 py-2 text-sm bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-semibold rounded-lg transition-all shadow-lg hover:shadow-blue-500/50 flex items-center gap-2"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
          </svg>
          Add Test Case
        </button>
      </div>

      {/* Test Cases List */}
      <div className="space-y-3">
        {testCases.map((testCase, index) => {
          const result = testResults?.[index];

          return (
            <div
              key={index}
              className={`relative rounded-xl border-2 transition-all duration-300 ${
                result
                  ? result.passed
                    ? 'border-green-500/50 bg-gradient-to-r from-green-900/10 to-green-800/5 shadow-lg shadow-green-500/10'
                    : 'border-red-500/50 bg-gradient-to-r from-red-900/10 to-red-800/5 shadow-lg shadow-red-500/10'
                  : 'border-gray-700/50 bg-gradient-to-r from-gray-800/50 to-gray-900/30 hover:border-gray-600/50'
              }`}
            >
              {/* Status Indicator Bar */}
              {result && (
                <div
                  className={`absolute top-0 left-0 right-0 h-1 rounded-t-xl ${
                    result.passed ? 'bg-gradient-to-r from-green-500 to-emerald-500' : 'bg-gradient-to-r from-red-500 to-rose-500'
                  }`}
                />
              )}

              <div className="p-5">
                {/* Header */}
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-gray-700/50 border border-gray-600">
                      <span className="text-sm font-bold text-gray-300">#{index + 1}</span>
                    </div>
                    <span className="text-sm font-semibold text-gray-200">
                      Test Case {index + 1}
                    </span>
                    {result && (
                      <div className="flex items-center gap-1.5">
                        {result.passed ? (
                          <>
                            <svg className="w-5 h-5 text-green-400" fill="currentColor" viewBox="0 0 20 20">
                              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                            </svg>
                            <span className="text-xs font-semibold text-green-400">Passed</span>
                          </>
                        ) : (
                          <>
                            <svg className="w-5 h-5 text-red-400" fill="currentColor" viewBox="0 0 20 20">
                              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                            </svg>
                            <span className="text-xs font-semibold text-red-400">Failed</span>
                          </>
                        )}
                      </div>
                    )}
                  </div>
                  <button
                    onClick={() => handleRemoveTestCase(index)}
                    className="flex items-center gap-1.5 px-3 py-1.5 text-xs text-red-400 hover:text-red-300 hover:bg-red-500/10 rounded-lg transition-colors"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
                    Remove
                  </button>
                </div>

                {/* Input Fields */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="flex items-center gap-2 text-xs font-semibold text-gray-400 uppercase tracking-wide">
                      <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                      </svg>
                      Input
                    </label>
                    <textarea
                      value={testCase.input}
                      onChange={(e) =>
                        handleUpdateTestCase(index, 'input', e.target.value)
                      }
                      className="w-full px-3 py-2.5 bg-gray-900/80 border border-gray-700/50 rounded-lg text-sm text-gray-200 font-mono resize-none focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 transition-all"
                      rows={3}
                      placeholder="Enter test input..."
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="flex items-center gap-2 text-xs font-semibold text-gray-400 uppercase tracking-wide">
                      <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      Expected Output
                    </label>
                    <textarea
                      value={testCase.expectedOutput}
                      onChange={(e) =>
                        handleUpdateTestCase(
                          index,
                          'expectedOutput',
                          e.target.value
                        )
                      }
                      className="w-full px-3 py-2.5 bg-gray-900/80 border border-gray-700/50 rounded-lg text-sm text-gray-200 font-mono resize-none focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 transition-all"
                      rows={3}
                      placeholder="Enter expected output..."
                    />
                  </div>
                </div>

                {/* Test Results */}
                {result && !result.passed && (
                  <div className="mt-4 p-4 bg-red-950/30 rounded-lg border border-red-500/30">
                    <div className="flex items-center gap-2 mb-2">
                      <svg className="w-4 h-4 text-red-400" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                      </svg>
                      <span className="text-xs font-semibold text-red-400 uppercase tracking-wide">Actual Output</span>
                    </div>
                    <div className="text-sm text-red-300 font-mono bg-red-950/50 p-2 rounded border border-red-500/20">
                      {result.actual || '(empty)'}
                    </div>
                    {result.error && (
                      <>
                        <div className="flex items-center gap-2 mt-3 mb-2">
                          <svg className="w-4 h-4 text-red-400" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                          </svg>
                          <span className="text-xs font-semibold text-red-400 uppercase tracking-wide">Error</span>
                        </div>
                        <div className="text-sm text-red-400 font-mono bg-red-950/50 p-2 rounded border border-red-500/20">
                          {result.error}
                        </div>
                      </>
                    )}
                  </div>
                )}

                {result && result.passed && (
                  <div className="mt-4 p-3 bg-green-950/30 rounded-lg border border-green-500/30 flex items-center gap-2">
                    <svg className="w-5 h-5 text-green-400" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    <span className="text-sm font-medium text-green-300">
                      Test passed! Output matches expected result.
                    </span>
                  </div>
                )}
              </div>
            </div>
          );
        })}

        {/* Empty State */}
        {testCases.length === 0 && (
          <div className="flex flex-col items-center justify-center py-12 px-4 bg-gray-800/30 border-2 border-dashed border-gray-700 rounded-xl">
            <svg className="w-16 h-16 text-gray-600 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
            </svg>
            <p className="text-gray-400 text-sm font-medium">No test cases yet</p>
            <p className="text-gray-500 text-xs mt-1">Click &quot;Add Test Case&quot; to create your first test</p>
          </div>
        )}
      </div>
    </div>
  );
}
