import { NextRequest, NextResponse } from 'next/server';
import axios from 'axios';

const PISTON_API = 'https://emkc.org/api/v2/piston';

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

// Language mapping for Piston API
const languageMap: Record<string, { language: string; version: string }> = {
  cpp: { language: 'cpp', version: '10.2.0' },
  python: { language: 'python', version: '3.10.0' },
  javascript: { language: 'javascript', version: '18.15.0' },
};

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { language, code, testCases, runTests } = body;

    if (!language || !code) {
      return NextResponse.json(
        { success: false, error: 'Language and code are required' },
        { status: 400 }
      );
    }

    const langConfig = languageMap[language];
    if (!langConfig) {
      return NextResponse.json(
        { success: false, error: 'Unsupported language' },
        { status: 400 }
      );
    }

    // If running tests, validate against test cases
    if (runTests && testCases && testCases.length > 0) {
      const testResults: TestResult[] = [];

      for (const testCase of testCases) {
        try {
          const response = await axios.post(`${PISTON_API}/execute`, {
            language: langConfig.language,
            version: langConfig.version,
            files: [
              {
                name: getFileName(language),
                content: code,
              },
            ],
            stdin: testCase.input,
            compile_timeout: 10000,
            run_timeout: 3000,
            compile_memory_limit: -1,
            run_memory_limit: -1,
          });

          const output = response.data.run.output.trim();
          const expected = testCase.expectedOutput.trim();
          const passed = output === expected;

          testResults.push({
            passed,
            input: testCase.input,
            expected,
            actual: output,
            error: response.data.run.stderr || undefined,
          });
        } catch (error: any) {
          testResults.push({
            passed: false,
            input: testCase.input,
            expected: testCase.expectedOutput,
            actual: '',
            error: error.message || 'Execution failed',
          });
        }
      }

      const allPassed = testResults.every((result) => result.passed);
      const passedCount = testResults.filter((result) => result.passed).length;

      return NextResponse.json({
        success: true,
        output: `Tests: ${passedCount}/${testResults.length} passed`,
        testResults,
        allPassed,
      });
    }

    // Regular code execution (no tests)
    const response = await axios.post(`${PISTON_API}/execute`, {
      language: langConfig.language,
      version: langConfig.version,
      files: [
        {
          name: getFileName(language),
          content: code,
        },
      ],
      stdin: '',
      compile_timeout: 10000,
      run_timeout: 3000,
      compile_memory_limit: -1,
      run_memory_limit: -1,
    });

    const output = response.data.run.output || '';
    const stderr = response.data.run.stderr || '';
    const compileOutput = response.data.compile?.output || '';

    return NextResponse.json({
      success: !stderr && !compileOutput,
      output: output || compileOutput || stderr || 'No output',
      error: stderr || compileOutput || undefined,
      executionTime: response.data.run.time || 0,
    });
  } catch (error: any) {
    console.error('Execution error:', error);
    return NextResponse.json(
      {
        success: false,
        error: error.response?.data?.message || error.message || 'Execution failed',
      },
      { status: 500 }
    );
  }
}

function getFileName(language: string): string {
  switch (language) {
    case 'cpp':
      return 'main.cpp';
    case 'python':
      return 'main.py';
    case 'javascript':
      return 'main.js';
    default:
      return 'main.txt';
  }
}
