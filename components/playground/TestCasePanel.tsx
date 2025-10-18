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

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-2">
          <span className="text-xl">🧪</span>
          <h3 className="text-lg font-bold text-gray-200">Test Cases</h3>
        </div>
        <button
          onClick={handleAddTestCase}
          className="px-3 py-1.5 text-sm bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-medium rounded-md transition-all shadow-lg hover:shadow-blue-500/50 flex items-center gap-1"
        >
          <span className="text-base">+</span>
          Add
        </button>
      </div>

      <div className="space-y-3">
        {testCases.map((testCase, index) => {
          const result = testResults?.[index];

          return (
            <div
              key={index}
              className={`p-4 rounded-lg border ${
                result
                  ? result.passed
                    ? 'border-green-600 bg-green-900/20'
                    : 'border-red-600 bg-red-900/20'
                  : 'border-gray-700 bg-gray-800/50'
              }`}
            >
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <span className="text-sm font-medium text-gray-300">
                    Test Case {index + 1}
                  </span>
                  {result && (
                    <span className="text-lg">
                      {result.passed ? '✅' : '❌'}
                    </span>
                  )}
                </div>
                <button
                  onClick={() => handleRemoveTestCase(index)}
                  className="text-red-400 hover:text-red-300 text-sm"
                >
                  Remove
                </button>
              </div>

              <div className="grid grid-cols-2 gap-3 mb-3">
                <div>
                  <label className="block text-xs text-gray-400 mb-1">
                    Input
                  </label>
                  <textarea
                    value={testCase.input}
                    onChange={(e) =>
                      handleUpdateTestCase(index, 'input', e.target.value)
                    }
                    className="w-full px-2 py-1 bg-gray-900 border border-gray-700 rounded text-sm text-gray-200 font-mono resize-none focus:outline-none focus:ring-1 focus:ring-blue-500"
                    rows={2}
                    placeholder="Enter input..."
                  />
                </div>
                <div>
                  <label className="block text-xs text-gray-400 mb-1">
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
                    className="w-full px-2 py-1 bg-gray-900 border border-gray-700 rounded text-sm text-gray-200 font-mono resize-none focus:outline-none focus:ring-1 focus:ring-blue-500"
                    rows={2}
                    placeholder="Enter expected output..."
                  />
                </div>
              </div>

              {result && !result.passed && (
                <div className="mt-3 p-3 bg-gray-900 rounded border border-red-600">
                  <div className="text-xs text-gray-400 mb-1">Actual Output:</div>
                  <div className="text-sm text-red-300 font-mono">
                    {result.actual || '(empty)'}
                  </div>
                  {result.error && (
                    <>
                      <div className="text-xs text-gray-400 mt-2 mb-1">Error:</div>
                      <div className="text-sm text-red-400 font-mono">
                        {result.error}
                      </div>
                    </>
                  )}
                </div>
              )}

              {result && result.passed && (
                <div className="mt-3 p-2 bg-green-900/30 rounded border border-green-600">
                  <div className="text-sm text-green-300">
                    Test passed! Output matches expected result.
                  </div>
                </div>
              )}
            </div>
          );
        })}

        {testCases.length === 0 && (
          <div className="text-center py-8 text-gray-500">
            No test cases added. Click &quot;Add Test Case&quot; to create one.
          </div>
        )}
      </div>

      {testResults && testResults.length > 0 && (
        <div className="p-4 bg-gray-800 rounded-lg border border-gray-700">
          <div className="text-sm font-medium text-gray-200">
            Test Summary:{' '}
            <span
              className={
                testResults.every((r) => r.passed)
                  ? 'text-green-400'
                  : 'text-red-400'
              }
            >
              {testResults.filter((r) => r.passed).length}/{testResults.length}{' '}
              passed
            </span>
          </div>
        </div>
      )}
    </div>
  );
}
