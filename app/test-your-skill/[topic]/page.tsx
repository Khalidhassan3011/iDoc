'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import type { Topic, TestState, Answer, MCQQuestion, PlainQuestion, PlainAnswer } from '@/lib/test/types';
import { loadQuestions, getRandomQuestions, getTopicDisplayName } from '@/lib/test/question-service';
import {
  initializeTest,
  saveTestState,
  loadTestState,
  clearTestState,
  updateTimeRemaining,
  submitAnswer,
  nextQuestion,
  finishTest,
  getCurrentQuestion,
  isCurrentQuestionAnswered,
  getCurrentQuestionAnswer,
  checkMCQAnswer,
  calculateResults
} from '@/lib/test/test-engine';
import { TestTimer } from '@/components/test/TestTimer';
import { MCQQuestionComponent } from '@/components/test/MCQQuestion';
import { PlainQuestionComponent } from '@/components/test/PlainQuestion';
import { TestProgress } from '@/components/test/TestProgress';
import { Loader2, AlertTriangle } from 'lucide-react';

export default function TestPage() {
  const params = useParams();
  const router = useRouter();
  const topic = params.topic as Topic;

  const [testState, setTestState] = useState<TestState | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentAnswer, setCurrentAnswer] = useState<Answer | null>(null);
  const [showReloadDialog, setShowReloadDialog] = useState(false);

  // Initialize or load test - always start fresh
  useEffect(() => {
    const initTest = async () => {
      try {
        // Always clear old state and start fresh
        clearTestState();
        sessionStorage.removeItem('test-result');

        const questionPool = await loadQuestions(topic);
        const questions = getRandomQuestions(questionPool, 20);

        const newState = initializeTest(topic, questions);
        setTestState(newState);
        saveTestState(newState);
        setLoading(false);
      } catch (err) {
        console.error('Failed to initialize test:', err);
        setError('Failed to load questions. Please try again.');
        setLoading(false);
      }
    };

    initTest();
  }, [topic]);

  // Update timer every second
  useEffect(() => {
    if (!testState || testState.isFinished) return;

    const interval = setInterval(() => {
      setTestState(prevState => {
        if (!prevState) return null;
        const updated = updateTimeRemaining(prevState);
        saveTestState(updated);
        return updated;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [testState?.isFinished]);

  // Prevent page reload/navigation during active test
  useEffect(() => {
    if (!testState || testState.isFinished || loading) return;

    const handleBeforeUnload = (e: BeforeUnloadEvent) => {
      e.preventDefault();
      e.returnValue = '';
      return '';
    };

    window.addEventListener('beforeunload', handleBeforeUnload);

    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, [testState, loading]);

  // Handle time expiry
  const handleTimeExpired = () => {
    if (!testState) return;

    const finishedState = finishTest(testState);
    setTestState(finishedState);
    saveTestState(finishedState);

    // Navigate to results
    const result = calculateResults(finishedState);
    sessionStorage.setItem('test-result', JSON.stringify(result));
    router.push(`/test-your-skill/${topic}/result`);
  };

  // Handle answer change
  const handleAnswerChange = (answer: Answer) => {
    if (!testState) return;

    setCurrentAnswer(answer);
    const updated = submitAnswer(testState, answer);
    setTestState(updated);
    saveTestState(updated);
  };

  // Handle MCQ answer
  const handleMCQAnswer = (selectedOption: number) => {
    const currentQuestion = getCurrentQuestion(testState!);
    if (!currentQuestion || currentQuestion.type !== 'mcq') return;

    const answer: Answer = {
      questionId: currentQuestion.id,
      type: 'mcq',
      selectedOption,
      isCorrect: checkMCQAnswer(currentQuestion as MCQQuestion, selectedOption)
    };

    handleAnswerChange(answer);
  };

  // Handle plain question answer (with follow-ups)
  const handlePlainAnswer = (answer: PlainAnswer) => {
    handleAnswerChange(answer);
  };

  // Handle next question
  const handleNext = () => {
    if (!testState) return;

    const updated = nextQuestion(testState);
    setTestState(updated);
    saveTestState(updated);
    setCurrentAnswer(null);

    // If this was the last question, finish the test
    if (updated.isFinished) {
      const result = calculateResults(updated);
      sessionStorage.setItem('test-result', JSON.stringify(result));
      clearTestState();
      router.push(`/test-your-skill/${topic}/result`);
    }
  };

  // Handle finish test
  const handleFinish = () => {
    if (!testState) return;

    const finishedState = finishTest(testState);
    const result = calculateResults(finishedState);
    sessionStorage.setItem('test-result', JSON.stringify(result));
    clearTestState();
    router.push(`/test-your-skill/${topic}/result`);
  };

  // Handle exit confirmation (for custom reload dialog)
  const handleConfirmExit = () => {
    clearTestState();
    sessionStorage.removeItem('test-result');
    setShowReloadDialog(false);
    router.push(`/test-your-skill/${topic}`);
  };

  const handleCancelExit = () => {
    setShowReloadDialog(false);
  };

  // Loading state
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="w-12 h-12 text-blue-600 dark:text-blue-400 animate-spin mx-auto mb-4" />
          <p className="text-gray-600 dark:text-gray-400">Loading questions...</p>
        </div>
      </div>
    );
  }

  // Error state
  if (error || !testState) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center max-w-md">
          <AlertTriangle className="w-12 h-12 text-red-600 dark:text-red-400 mx-auto mb-4" />
          <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-2">
            Error Loading Test
          </h2>
          <p className="text-gray-600 dark:text-gray-400 mb-6">
            {error || 'Failed to load test. Please try again.'}
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

  const currentQuestion = getCurrentQuestion(testState);
  const isAnswered = isCurrentQuestionAnswered(testState);
  const savedAnswer = getCurrentQuestionAnswer(testState);
  const answeredCount = testState.answers.length;

  if (!currentQuestion) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8">
      <div className="container max-w-4xl mx-auto px-4">
        {/* Header */}
        <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6 mb-6">
          <div className="flex items-center justify-between mb-4">
            <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
              {getTopicDisplayName(topic)} Test
            </h1>
            <TestTimer
              timeRemaining={testState.timeRemaining}
              onTimeExpired={handleTimeExpired}
            />
          </div>
          <TestProgress
            current={testState.currentQuestionIndex}
            total={testState.questions.length}
            answered={answeredCount}
          />
        </div>

        {/* Question */}
        <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-8 mb-6">
          <div className="mb-6">
            <span className="inline-block px-3 py-1 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 text-sm font-semibold rounded-full">
              {currentQuestion.difficulty.charAt(0).toUpperCase() + currentQuestion.difficulty.slice(1)}
            </span>
          </div>

          {currentQuestion.type === 'mcq' ? (
            <MCQQuestionComponent
              question={currentQuestion as MCQQuestion}
              initialAnswer={savedAnswer?.type === 'mcq' ? savedAnswer.selectedOption : undefined}
              onAnswerChange={handleMCQAnswer}
            />
          ) : (
            <PlainQuestionComponent
              question={currentQuestion as PlainQuestion}
              initialAnswer={savedAnswer?.type === 'plain' ? savedAnswer : undefined}
              onAnswerChange={handlePlainAnswer}
            />
          )}
        </div>

        {/* Actions */}
        <div className="flex items-center justify-between gap-4">
          <button
            onClick={handleFinish}
            className="px-6 py-3 bg-gray-600 hover:bg-gray-700 text-white font-semibold rounded-lg transition-colors"
          >
            Finish Test
          </button>

          <button
            onClick={handleNext}
            disabled={!isAnswered}
            className={`px-8 py-3 font-semibold rounded-lg transition-colors ${
              isAnswered
                ? 'bg-blue-600 hover:bg-blue-700 text-white'
                : 'bg-gray-300 dark:bg-gray-700 text-gray-500 dark:text-gray-500 cursor-not-allowed'
            }`}
          >
            {testState.currentQuestionIndex === testState.questions.length - 1
              ? 'Submit Test'
              : 'Next Question'}
          </button>
        </div>

        {/* Warning */}
        {!isAnswered && (
          <p className="text-center text-sm text-orange-600 dark:text-orange-400 mt-4">
            Please answer the current question before proceeding
          </p>
        )}
      </div>

      {/* Reload Warning Dialog */}
      {showReloadDialog && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl max-w-md w-full p-6">
            <div className="flex items-center gap-3 mb-4">
              <AlertTriangle className="w-6 h-6 text-orange-600 dark:text-orange-400" />
              <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100">
                Exit Test?
              </h2>
            </div>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              If you reload the page, all quizzes will end and you will have to start again from the beginning. Your current progress will be lost.
            </p>
            <div className="flex gap-3">
              <button
                onClick={handleCancelExit}
                className="flex-1 px-6 py-3 bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 text-gray-900 dark:text-gray-100 font-semibold rounded-lg transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleConfirmExit}
                className="flex-1 px-6 py-3 bg-red-600 hover:bg-red-700 text-white font-semibold rounded-lg transition-colors"
              >
                Confirm Exit
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
