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
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="w-16 h-16 text-primary animate-spin mx-auto mb-6" />
          <h2 className="text-2xl font-bold text-foreground mb-2">Preparing Your Test</h2>
          <p className="text-muted-foreground">Loading questions...</p>
        </div>
      </div>
    );
  }

  // Error state
  if (error || !testState) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center p-4">
        <div className="text-center max-w-md">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-destructive/10 mb-6">
            <AlertTriangle className="w-8 h-8 text-destructive" />
          </div>
          <h2 className="text-2xl font-bold text-foreground mb-3">
            Error Loading Test
          </h2>
          <p className="text-muted-foreground mb-8">
            {error || 'Failed to load test. Please try again.'}
          </p>
          <button
            onClick={() => router.push('/test-your-skill')}
            className="px-8 py-3 bg-primary hover:bg-primary/90 text-primary-foreground font-semibold rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl"
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
    <div className="min-h-screen bg-background">
      <div className="container max-w-5xl mx-auto px-4 py-8">
        {/* Header Card */}
        <div className="bg-card border rounded-2xl shadow-sm p-6 mb-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-2xl md:text-3xl font-bold text-foreground mb-1">
                {getTopicDisplayName(topic)} Test
              </h1>
              <p className="text-sm text-muted-foreground">
                Question {testState.currentQuestionIndex + 1} of {testState.questions.length}
              </p>
            </div>
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

        {/* Question Card */}
        <div className="bg-card border rounded-2xl shadow-sm p-8 md:p-10 mb-6">
          {/* Difficulty Badge */}
          <div className="mb-6">
            <span className={`inline-flex items-center px-4 py-1.5 rounded-full text-sm font-medium ${
              currentQuestion.difficulty === 'easy'
                ? 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400'
                : currentQuestion.difficulty === 'medium'
                ? 'bg-yellow-100 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-400'
                : 'bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400'
            }`}>
              {currentQuestion.difficulty.charAt(0).toUpperCase() + currentQuestion.difficulty.slice(1)}
            </span>
          </div>

          {/* Question Content */}
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

        {/* Action Buttons */}
        <div className="flex items-center justify-between gap-4">
          <button
            onClick={handleFinish}
            className="px-6 py-3 bg-muted hover:bg-muted/80 text-foreground font-semibold rounded-xl transition-all duration-300 border border-border"
          >
            Finish Test
          </button>

          <button
            onClick={handleNext}
            disabled={!isAnswered}
            className={`px-8 py-3 font-semibold rounded-xl transition-all duration-300 ${
              isAnswered
                ? 'bg-primary hover:bg-primary/90 text-primary-foreground shadow-lg hover:shadow-xl'
                : 'bg-muted text-muted-foreground cursor-not-allowed'
            }`}
          >
            {testState.currentQuestionIndex === testState.questions.length - 1
              ? 'Submit Test'
              : 'Next Question'}
          </button>
        </div>

        {/* Warning Message */}
        {!isAnswered && (
          <div className="mt-4 flex items-center justify-center gap-2 text-sm text-orange-600 dark:text-orange-400">
            <AlertTriangle className="w-4 h-4" />
            <p>Please answer the current question before proceeding</p>
          </div>
        )}
      </div>

      {/* Reload Warning Dialog */}
      {showReloadDialog && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-card border rounded-2xl shadow-2xl max-w-md w-full p-8">
            <div className="flex items-center gap-3 mb-4">
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-orange-100 dark:bg-orange-900/30">
                <AlertTriangle className="w-6 h-6 text-orange-600 dark:text-orange-400" />
              </div>
              <h2 className="text-2xl font-bold text-foreground">
                Exit Test?
              </h2>
            </div>
            <p className="text-muted-foreground mb-8 leading-relaxed">
              If you reload the page, all quizzes will end and you will have to start again from the beginning. Your current progress will be lost.
            </p>
            <div className="flex gap-3">
              <button
                onClick={handleCancelExit}
                className="flex-1 px-6 py-3 bg-muted hover:bg-muted/80 text-foreground font-semibold rounded-xl transition-all duration-300 border border-border"
              >
                Cancel
              </button>
              <button
                onClick={handleConfirmExit}
                className="flex-1 px-6 py-3 bg-destructive hover:bg-destructive/90 text-destructive-foreground font-semibold rounded-xl transition-all duration-300 shadow-lg"
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
