'use client';

import Link from 'next/link';
import { Brain, Clock, Target, ArrowRight, Sparkles, CheckCircle2, Trophy, Zap } from 'lucide-react';
import type { Topic } from '@/lib/test/types';
import { motion } from 'framer-motion';
import { AnimatedGroup } from '@/components/ui/animated-group';

const topics: Array<{
  id: Topic;
  name: string;
  description: string;
  icon: string;
  questionCount: number;
  color: string;
  gradient: string;
}> = [
  {
    id: 'flutter',
    name: 'Flutter',
    description: 'Test your Flutter knowledge with questions covering widgets, state management, navigation, and more.',
    icon: 'Flutter',
    questionCount: 20,
    color: 'blue',
    gradient: 'from-blue-500 to-cyan-500'
  },
  {
    id: 'problem-solving',
    name: 'Problem Solving',
    description: 'Challenge yourself with algorithmic and problem-solving questions.',
    icon: 'Puzzle',
    questionCount: 20,
    color: 'purple',
    gradient: 'from-purple-500 to-pink-500'
  }
];

const features = [
  {
    icon: Clock,
    title: '20 Minutes',
    description: 'Timed mock test simulating real interview conditions',
    color: 'text-blue-600 dark:text-blue-400',
    bgColor: 'bg-blue-100 dark:bg-blue-900/30'
  },
  {
    icon: Target,
    title: 'Mixed Questions',
    description: 'MCQ and self-assessment questions for comprehensive evaluation',
    color: 'text-green-600 dark:text-green-400',
    bgColor: 'bg-green-100 dark:bg-green-900/30'
  },
  {
    icon: Brain,
    title: 'Instant Results',
    description: 'Get detailed feedback and performance analysis immediately',
    color: 'text-purple-600 dark:text-purple-400',
    bgColor: 'bg-purple-100 dark:bg-purple-900/30'
  },
  {
    icon: Sparkles,
    title: 'AI-Powered',
    description: 'Smart follow-up questions based on your responses',
    color: 'text-orange-600 dark:text-orange-400',
    bgColor: 'bg-orange-100 dark:bg-orange-900/30'
  }
];

const transitionVariants = {
  item: {
    hidden: {
      opacity: 0,
      filter: "blur(12px)",
      y: 12,
    },
    visible: {
      opacity: 1,
      filter: "blur(0px)",
      y: 0,
      transition: {
        type: "spring",
        bounce: 0.3,
        duration: 1.5,
      },
    },
  },
};

export default function TestYourSkillPage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative pt-24 pb-16 md:pt-32 md:pb-24 overflow-hidden">
        {/* Background decoration */}
        <div
          className="absolute inset-0 -z-20 hidden dark:block"
          style={{
            background: "radial-gradient(ellipse at top, hsl(var(--primary) / 0.15) 0%, transparent 50%)",
          }}
        />
        <div
          aria-hidden
          className="absolute inset-0 -z-10 size-full"
          style={{
            background: "radial-gradient(125% 125% at 50% 100%, transparent 0%, hsl(var(--background)) 75%)"
          }}
        />

        <div className="container max-w-7xl mx-auto px-6 lg:px-8">
          <AnimatedGroup variants={transitionVariants}>
            <div className="text-center max-w-4xl mx-auto">
              {/* Badge */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-6"
              >
                <Trophy className="w-4 h-4 text-primary" />
                <span className="text-sm font-medium text-foreground">
                  Practice Makes Perfect
                </span>
              </motion.div>

              {/* Main Heading */}
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-6">
                Test Your{' '}
                <span className="bg-gradient-to-r from-blue-600 to-cyan-600 dark:from-blue-400 dark:to-cyan-400 bg-clip-text text-transparent">
                  Technical Skills
                </span>
              </h1>

              <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-8">
                Take AI-powered mock tests to evaluate your knowledge and identify areas for improvement. Get instant feedback and track your progress.
              </p>

              {/* Stats */}
              <div className="flex items-center justify-center gap-8 flex-wrap">
                <div className="text-center">
                  <div className="text-3xl font-bold text-foreground">20+</div>
                  <div className="text-sm text-muted-foreground">Questions</div>
                </div>
                <div className="w-px h-12 bg-border" />
                <div className="text-center">
                  <div className="text-3xl font-bold text-foreground">20</div>
                  <div className="text-sm text-muted-foreground">Minutes</div>
                </div>
                <div className="w-px h-12 bg-border" />
                <div className="text-center">
                  <div className="text-3xl font-bold text-foreground">100%</div>
                  <div className="text-sm text-muted-foreground">Free</div>
                </div>
              </div>
            </div>
          </AnimatedGroup>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-16 md:py-24">
        <div className="container max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-base font-semibold leading-7 text-primary mb-2">
              Everything You Need
            </h2>
            <p className="text-3xl font-bold tracking-tight sm:text-4xl">
              Comprehensive Testing Features
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="group relative bg-card border rounded-xl p-6 hover:shadow-lg transition-all duration-300"
              >
                <div className={`inline-flex items-center justify-center w-12 h-12 rounded-lg ${feature.bgColor} mb-4`}>
                  <feature.icon className={`w-6 h-6 ${feature.color}`} />
                </div>
                <h3 className="text-lg font-semibold text-foreground mb-2">
                  {feature.title}
                </h3>
                <p className="text-sm text-muted-foreground">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Topic Selection */}
      <section className="py-16 md:py-24 bg-muted/30">
        <div className="container max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl mb-4">
              Choose Your Challenge
            </h2>
            <p className="text-lg text-muted-foreground">
              Select a topic and start your practice test
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {topics.map((topic, index) => (
              <motion.div
                key={topic.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Link
                  href={`/test-your-skill/${topic.id}`}
                  className="group relative block h-full"
                >
                  <div className="relative h-full bg-card border-2 border-border hover:border-primary rounded-2xl p-8 transition-all duration-300 hover:shadow-xl overflow-hidden">
                    {/* Gradient overlay on hover */}
                    <div className={`absolute inset-0 bg-gradient-to-br ${topic.gradient} opacity-0 group-hover:opacity-5 transition-opacity duration-300`} />

                    <div className="relative">
                      <div className="flex items-start justify-between mb-6">
                        <div className={`inline-flex items-center justify-center w-14 h-14 rounded-xl bg-gradient-to-br ${topic.gradient} text-white`}>
                          <Zap className="w-7 h-7" />
                        </div>
                        <ArrowRight className="w-6 h-6 text-muted-foreground group-hover:text-primary group-hover:translate-x-1 transition-all duration-300" />
                      </div>

                      <h3 className="text-2xl font-bold text-foreground mb-3">
                        {topic.name}
                      </h3>
                      <p className="text-muted-foreground mb-6">
                        {topic.description}
                      </p>

                      <div className="flex items-center gap-6 text-sm text-muted-foreground">
                        <div className="flex items-center gap-2">
                          <Target className="w-4 h-4" />
                          <span>{topic.questionCount} questions</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Clock className="w-4 h-4" />
                          <span>20 minutes</span>
                        </div>
                      </div>

                      <div className="mt-6 inline-flex items-center gap-2 text-sm font-medium text-primary group-hover:gap-3 transition-all">
                        Start Test
                        <ArrowRight className="w-4 h-4" />
                      </div>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Instructions */}
      <section className="py-16 md:py-24">
        <div className="container max-w-4xl mx-auto px-6 lg:px-8">
          <div className="bg-card border rounded-2xl p-8 md:p-10">
            <div className="flex items-center gap-3 mb-6">
              <div className="inline-flex items-center justify-center w-10 h-10 rounded-lg bg-primary/10">
                <CheckCircle2 className="w-5 h-5 text-primary" />
              </div>
              <h3 className="text-2xl font-bold text-foreground">
                Before You Start
              </h3>
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              {[
                'You will have 20 minutes to complete the test',
                'Questions will be shown one at a time',
                'You cannot go back to previous questions',
                'For MCQ questions, select the best answer',
                'For self-assessment questions, rate your understanding from 1-10',
                'You can finish the test early at any time'
              ].map((instruction, index) => (
                <div key={index} className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                  <span className="text-sm text-muted-foreground">{instruction}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
