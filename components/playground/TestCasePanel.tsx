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
      <div className="space-y-4">
        {testCases.map((testCase, index) => {
          const result = testResults?.[index];

          return (
            <div key={index}>
              <div className="flex items-start gap-3">
                {/* Input and Output Fields */}
                <div className="flex-1 space-y-2">
                  {/* Input Row */}
                  <div className="flex items-center gap-2">
                    <span className="text-sm text-gray-400 font-medium w-4">I</span>
                    <input
                      type="text"
                      value={testCase.input}
                      onChange={(e) =>
                        handleUpdateTestCase(index, 'input', e.target.value)
                      }
                      className={`flex-1 px-3 py-2 bg-gray-900/80 border rounded-lg text-sm text-gray-200 font-mono focus:outline-none focus:ring-2 transition-all ${
                        result
                          ? result.passed
                            ? 'border-green-500/50 focus:ring-green-500/50'
                            : 'border-red-500/50 focus:ring-red-500/50'
                          : 'border-gray-700/50 focus:ring-blue-500/50'
                      }`}
                      placeholder="Input"
                    />
                    {result && (
                      <span className="text-lg">
                        {result.passed ? '✅' : '❌'}
                      </span>
                    )}
                  </div>

                  {/* Output Row */}
                  <div className="flex items-center gap-2">
                    <span className="text-sm text-gray-400 font-medium w-4">O</span>
                    <input
                      type="text"
                      value={testCase.expectedOutput}
                      onChange={(e) =>
                        handleUpdateTestCase(
                          index,
                          'expectedOutput',
                          e.target.value
                        )
                      }
                      className={`flex-1 px-3 py-2 bg-gray-900/80 border rounded-lg text-sm text-gray-200 font-mono focus:outline-none focus:ring-2 transition-all ${
                        result
                          ? result.passed
                            ? 'border-green-500/50 focus:ring-green-500/50'
                            : 'border-red-500/50 focus:ring-red-500/50'
                          : 'border-gray-700/50 focus:ring-blue-500/50'
                      }`}
                      placeholder="Expected Output"
                    />
                  </div>

                  {/* Error Message */}
                  {result && !result.passed && (
                    <div className="ml-6 text-xs text-red-400 font-mono bg-red-950/30 px-2 py-1.5 rounded border border-red-500/30">
                      {result.error ? (
                        <>Error: {result.error}</>
                      ) : (
                        <>Expected: {result.expected} | Got: {result.actual || '(empty)'}</>
                      )}
                    </div>
                  )}
                </div>

                {/* Delete Button */}
                <button
                  onClick={() => handleRemoveTestCase(index)}
                  className="mt-1 text-red-400 hover:text-red-300 transition-colors"
                  title="Remove test case"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                  </svg>
                </button>
              </div>

              {/* Separator */}
              {index < testCases.length - 1 && (
                <div className="my-4 border-t border-gray-700/50"></div>
              )}
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
