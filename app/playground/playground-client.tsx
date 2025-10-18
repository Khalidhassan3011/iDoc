'use client';

import { useState, useEffect } from 'react';
import CodeEditor from '@/components/playground/CodeEditor';
import LanguageSelector from '@/components/playground/LanguageSelector';
import ProblemSelector from '@/components/playground/ProblemSelector';
import TestCasePanel from '@/components/playground/TestCasePanel';
import OutputPanel from '@/components/playground/OutputPanel';
import ControlPanel from '@/components/playground/ControlPanel';
import { Problem } from '@/lib/get-problems';
import { codeTemplates } from '@/lib/code-templates';

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

interface PlaygroundClientProps {
  problems: Problem[];
}

export default function PlaygroundClient({ problems }: PlaygroundClientProps) {
  const [selectedProblem, setSelectedProblem] = useState<Problem | null>(null);
  const [selectedLanguage, setSelectedLanguage] = useState<string>('cpp');
  const [code, setCode] = useState<string>(codeTemplates.cpp);
  const [testCases, setTestCases] = useState<TestCase[]>([]);
  const [output, setOutput] = useState<string>('');
  const [error, setError] = useState<string>('');
  const [testResults, setTestResults] = useState<TestResult[] | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [executionTime, setExecutionTime] = useState<number | undefined>();

  // Update code when language changes
  useEffect(() => {
    setCode(codeTemplates[selectedLanguage as keyof typeof codeTemplates]);
    setOutput('');
    setError('');
    setTestResults(null);
  }, [selectedLanguage]);

  const handleRunCode = async () => {
    setIsLoading(true);
    setOutput('');
    setError('');
    setTestResults(null);

    try {
      const response = await fetch('/api/execute', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          language: selectedLanguage,
          code,
          runTests: false,
        }),
      });

      const data = await response.json();

      if (data.success) {
        setOutput(data.output);
        setExecutionTime(data.executionTime);
      } else {
        setError(data.error || 'Execution failed');
      }
    } catch (err: any) {
      setError(err.message || 'Failed to execute code');
    } finally {
      setIsLoading(false);
    }
  };

  const handleRunTests = async () => {
    if (testCases.length === 0) {
      setError('No test cases to run. Add at least one test case.');
      return;
    }

    setIsLoading(true);
    setOutput('');
    setError('');
    setTestResults(null);

    try {
      const response = await fetch('/api/execute', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          language: selectedLanguage,
          code,
          testCases,
          runTests: true,
        }),
      });

      const data = await response.json();

      if (data.success) {
        setTestResults(data.testResults);
        setOutput(data.output);
      } else {
        setError(data.error || 'Test execution failed');
      }
    } catch (err: any) {
      setError(err.message || 'Failed to run tests');
    } finally {
      setIsLoading(false);
    }
  };

  const handleReset = () => {
    setCode(codeTemplates[selectedLanguage as keyof typeof codeTemplates]);
    setOutput('');
    setError('');
    setTestResults(null);
    setTestCases([]);
    setExecutionTime(undefined);
  };

  const handleProblemChange = (problem: Problem) => {
    setSelectedProblem(problem);
    // Reset test cases when problem changes
    setTestCases([]);
    setTestResults(null);
    setOutput('');
    setError('');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-950 via-gray-900 to-gray-950 text-gray-200">
      <div className="container mx-auto p-6">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center text-2xl">
              💻
            </div>
            <div>
              <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
                Code Playground
              </h1>
              <p className="text-gray-400 text-sm">
                Write, test, and execute code for interview problems
              </p>
            </div>
          </div>
        </div>

        {/* Problem Selector */}
        <div className="mb-6">
          <ProblemSelector
            problems={problems}
            selectedProblem={selectedProblem}
            onProblemChange={handleProblemChange}
          />
          {selectedProblem && (
            <div className="mt-4 p-4 bg-gradient-to-r from-gray-800/50 to-gray-900/50 rounded-lg border border-gray-700/50 backdrop-blur-sm">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <span className="text-2xl">🎯</span>
                  <div>
                    <p className="text-sm text-gray-400">Selected Problem</p>
                    <p className="font-semibold text-gray-200">{selectedProblem.title}</p>
                  </div>
                </div>
                <a
                  href={selectedProblem.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium rounded-lg transition-colors flex items-center gap-2 shadow-lg"
                >
                  View Details
                  <span>→</span>
                </a>
              </div>
            </div>
          )}
        </div>

        {/* Main Layout: Editor + Test Cases */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Code Editor Section */}
          <div className="lg:col-span-2 space-y-4">
            <div className="bg-gray-900 border border-gray-700 rounded-lg overflow-hidden shadow-xl">
              {/* Language Selector + Control Buttons */}
              <div className="flex items-center justify-between border-b border-gray-700 bg-gray-800/50">
                <LanguageSelector
                  selectedLanguage={selectedLanguage}
                  onLanguageChange={setSelectedLanguage}
                />
                <ControlPanel
                  onRunCode={handleRunCode}
                  onRunTests={handleRunTests}
                  onReset={handleReset}
                  isLoading={isLoading}
                  hasTestCases={testCases.length > 0}
                />
              </div>

              <div style={{ height: '500px' }}>
                <CodeEditor
                  code={code}
                  language={selectedLanguage}
                  onChange={(value) => setCode(value || '')}
                />
              </div>
            </div>

            {/* Output Panel */}
            <div style={{ height: '250px' }}>
              <OutputPanel
                output={output}
                error={error}
                isLoading={isLoading}
                executionTime={executionTime}
              />
            </div>
          </div>

          {/* Test Cases Section */}
          <div className="lg:col-span-1">
            <div className="bg-gray-900 border border-gray-700 rounded-lg p-4 max-h-[780px] overflow-y-auto shadow-xl">
              <TestCasePanel
                testCases={testCases}
                testResults={testResults}
                onTestCaseChange={setTestCases}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
