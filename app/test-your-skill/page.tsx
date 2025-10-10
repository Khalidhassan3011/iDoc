import Link from 'next/link';
import { Brain, Clock, Target, ArrowRight } from 'lucide-react';
import type { Topic } from '@/lib/test/types';

const topics: Array<{
  id: Topic;
  name: string;
  description: string;
  icon: string;
  questionCount: number;
}> = [
  {
    id: 'flutter',
    name: 'Flutter',
    description: 'Test your Flutter knowledge with questions covering widgets, state management, navigation, and more.',
    icon: 'Flutter',
    questionCount: 20
  },
  {
    id: 'problem-solving',
    name: 'Problem Solving',
    description: 'Challenge yourself with algorithmic and problem-solving questions.',
    icon: 'Puzzle',
    questionCount: 20
  }
];

export default function TestYourSkillPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
      <div className="container max-w-6xl mx-auto px-4 py-12">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-blue-100 dark:bg-blue-900/30 mb-4">
            <Brain className="w-8 h-8 text-blue-600 dark:text-blue-400" />
          </div>
          <h1 className="text-4xl font-bold text-gray-900 dark:text-gray-100 mb-4">
            Test Your Skill
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Take a 20-minute mock test to evaluate your knowledge and identify areas for improvement.
          </p>
        </div>

        {/* Test Features */}
        <div className="grid md:grid-cols-3 gap-6 mb-12">
          <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6 text-center">
            <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-blue-100 dark:bg-blue-900/30 mb-3">
              <Clock className="w-6 h-6 text-blue-600 dark:text-blue-400" />
            </div>
            <h3 className="font-semibold text-gray-900 dark:text-gray-100 mb-2">
              20 Minutes
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Complete the test within the time limit
            </p>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6 text-center">
            <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-green-100 dark:bg-green-900/30 mb-3">
              <Target className="w-6 h-6 text-green-600 dark:text-green-400" />
            </div>
            <h3 className="font-semibold text-gray-900 dark:text-gray-100 mb-2">
              Mixed Questions
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              MCQ and self-assessment questions
            </p>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6 text-center">
            <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-purple-100 dark:bg-purple-900/30 mb-3">
              <Brain className="w-6 h-6 text-purple-600 dark:text-purple-400" />
            </div>
            <h3 className="font-semibold text-gray-900 dark:text-gray-100 mb-2">
              Instant Results
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Get detailed feedback immediately
            </p>
          </div>
        </div>

        {/* Topic Selection */}
        <div className="space-y-6">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 text-center mb-6">
            Choose a Topic
          </h2>

          <div className="grid md:grid-cols-2 gap-6">
            {topics.map((topic) => (
              <Link
                key={topic.id}
                href={`/test-your-skill/${topic.id}`}
                className="group bg-white dark:bg-gray-800 rounded-xl border-2 border-gray-200 dark:border-gray-700 hover:border-blue-500 dark:hover:border-blue-500 p-8 transition-all hover:shadow-lg"
              >
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-2">
                      {topic.name}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-400">
                      {topic.description}
                    </p>
                  </div>
                  <ArrowRight className="w-6 h-6 text-gray-400 group-hover:text-blue-600 dark:group-hover:text-blue-400 group-hover:translate-x-1 transition-all" />
                </div>

                <div className="flex items-center gap-6 text-sm text-gray-500 dark:text-gray-400">
                  <div className="flex items-center gap-2">
                    <Target className="w-4 h-4" />
                    <span>{topic.questionCount} questions</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4" />
                    <span>20 minutes</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* Instructions */}
        <div className="mt-12 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-6">
          <h3 className="font-semibold text-blue-900 dark:text-blue-100 mb-3">
            Before you start:
          </h3>
          <ul className="space-y-2 text-sm text-blue-800 dark:text-blue-200">
            <li className="flex items-start gap-2">
              <span className="text-blue-600 dark:text-blue-400 mt-0.5">•</span>
              <span>You will have <strong>20 minutes</strong> to complete the test</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-blue-600 dark:text-blue-400 mt-0.5">•</span>
              <span>Questions will be shown <strong>one at a time</strong></span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-blue-600 dark:text-blue-400 mt-0.5">•</span>
              <span>You <strong>cannot go back</strong> to previous questions</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-blue-600 dark:text-blue-400 mt-0.5">•</span>
              <span>For MCQ questions, you can change your answer before moving to the next question</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-blue-600 dark:text-blue-400 mt-0.5">•</span>
              <span>For self-assessment questions, rate your understanding from 1-10</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-blue-600 dark:text-blue-400 mt-0.5">•</span>
              <span>You can finish the test early at any time</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
