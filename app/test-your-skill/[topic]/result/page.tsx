'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import type { TestResult } from '@/lib/test/types';
import { TestResultComponent } from '@/components/test/TestResult';
import { Loader2, AlertTriangle } from 'lucide-react';

export default function ResultPage() {
  const params = useParams();
  const router = useRouter();
  const [result, setResult] = useState<TestResult | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    try {
      const savedResult = sessionStorage.getItem('test-result');

      if (!savedResult) {
        // No result found, redirect to test selection
        router.push('/test-your-skill');
        return;
      }

      const parsedResult: TestResult = JSON.parse(savedResult);

      // Verify the result matches the current topic
      if (parsedResult.topic !== params.topic) {
        router.push('/test-your-skill');
        return;
      }

      setResult(parsedResult);
      setLoading(false);
    } catch (error) {
      console.error('Failed to load test result:', error);
      router.push('/test-your-skill');
    }
  }, [params.topic, router]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
        <div className="text-center">
          <Loader2 className="w-12 h-12 text-blue-600 dark:text-blue-400 animate-spin mx-auto mb-4" />
          <p className="text-gray-600 dark:text-gray-400">Loading results...</p>
        </div>
      </div>
    );
  }

  if (!result) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
        <div className="text-center max-w-md">
          <AlertTriangle className="w-12 h-12 text-red-600 dark:text-red-400 mx-auto mb-4" />
          <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-2">
            No Results Found
          </h2>
          <p className="text-gray-600 dark:text-gray-400 mb-6">
            Unable to load test results. Please take a test first.
          </p>
          <button
            onClick={() => router.push('/test-your-skill')}
            className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition-colors"
          >
            Back to Tests
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8">
      <TestResultComponent result={result} />
    </div>
  );
}
