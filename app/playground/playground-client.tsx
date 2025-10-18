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
    <div className="min-h-screen bg-gray-950 text-gray-200">
      <div className="container mx-auto p-6">
        <div className="mb-6">
          <h1 className="text-3xl font-bold mb-2">Code Playground</h1>
          <p className="text-gray-400">
            Write, test, and execute code for interview problems
          </p>
        </div>

        {/* Problem Selector */}
        <div className="mb-6">
          <ProblemSelector
            problems={problems}
            selectedProblem={selectedProblem}
            onProblemChange={handleProblemChange}
          />
          {selectedProblem && (
            <div className="mt-3 p-3 bg-gray-800 rounded-lg border border-gray-700">
              <a
                href={selectedProblem.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-400 hover:text-blue-300 text-sm"
              >
                View Problem Details →
              </a>
            </div>
          )}
        </div>

        {/* Main Layout: Editor + Test Cases */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
          {/* Code Editor Section */}
          <div className="lg:col-span-2 space-y-4">
            <div className="bg-gray-900 border border-gray-700 rounded-lg overflow-hidden">
              <LanguageSelector
                selectedLanguage={selectedLanguage}
                onLanguageChange={setSelectedLanguage}
              />
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
            <div className="bg-gray-900 border border-gray-700 rounded-lg p-4 max-h-[780px] overflow-y-auto">
              <TestCasePanel
                testCases={testCases}
                testResults={testResults}
                onTestCaseChange={setTestCases}
              />
            </div>
          </div>
        </div>

        {/* Control Panel */}
        <ControlPanel
          onRunCode={handleRunCode}
          onRunTests={handleRunTests}
          onReset={handleReset}
          isLoading={isLoading}
          hasTestCases={testCases.length > 0}
        />
      </div>
    </div>
  );
}
