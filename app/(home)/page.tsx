import Link from 'next/link';
import { ArrowRight, BookOpen, Zap, Target, Code2, Sparkles, CheckCircle2 } from 'lucide-react';
import { HeroSection } from '@/components/ui/hero-section';

export default function HomePage() {
  return (
    <main className="flex flex-col">
      {/* Hero Section */}
      <HeroSection />

      {/* Available Stacks Section */}
      <section className="border-b py-16 sm:py-24">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center mb-16">
            <h2 className="text-base font-semibold leading-7 text-primary">
              Currently Available
            </h2>
            <p className="mt-2 text-3xl font-bold tracking-tight sm:text-4xl">
              Master Popular Tech Stacks
            </p>
            <p className="mt-4 text-lg text-muted-foreground">
              Comprehensive interview questions and resources for the most in-demand technologies
            </p>
          </div>

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {/* Flutter Card */}
            <Link
              href="/docs/flutter"
              className="group relative overflow-hidden rounded-2xl border bg-card p-8 transition-all hover:shadow-xl hover:shadow-primary/10 hover:-translate-y-1"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-cyan-500/10 opacity-0 transition-opacity group-hover:opacity-100" />
              <div className="relative">
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-blue-100 dark:bg-blue-900/30">
                  <Code2 className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                </div>
                <h3 className="mb-2 text-xl font-bold">Flutter</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  660+ interview questions covering widgets, state management, navigation, and more
                </p>
                <div className="flex items-center text-sm font-medium text-primary">
                  Explore Flutter
                  <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </div>
              </div>
            </Link>

            {/* Laravel Card - Coming Soon */}
            <div className="group relative overflow-hidden rounded-2xl border bg-card p-8 opacity-60">
              <div className="relative">
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-red-100 dark:bg-red-900/30">
                  <Code2 className="h-6 w-6 text-red-600 dark:text-red-400" />
                </div>
                <h3 className="mb-2 text-xl font-bold">Laravel</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Backend development, eloquent ORM, authentication, and API building
                </p>
                <div className="inline-flex items-center rounded-full bg-muted px-3 py-1 text-xs font-medium">
                  Coming Soon
                </div>
              </div>
            </div>

            {/* React Card - Coming Soon */}
            <div className="group relative overflow-hidden rounded-2xl border bg-card p-8 opacity-60">
              <div className="relative">
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-cyan-100 dark:bg-cyan-900/30">
                  <Code2 className="h-6 w-6 text-cyan-600 dark:text-cyan-400" />
                </div>
                <h3 className="mb-2 text-xl font-bold">React</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Hooks, state management, performance optimization, and modern patterns
                </p>
                <div className="inline-flex items-center rounded-full bg-muted px-3 py-1 text-xs font-medium">
                  Coming Soon
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 sm:py-24">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center mb-16">
            <h2 className="text-base font-semibold leading-7 text-primary">
              Everything You Need
            </h2>
            <p className="mt-2 text-3xl font-bold tracking-tight sm:text-4xl">
              Features Built for Success
            </p>
            <p className="mt-4 text-lg text-muted-foreground">
              Powerful tools and resources to help you master technical interviews
            </p>
          </div>

          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {/* Feature 1 */}
            <div className="relative rounded-2xl border bg-card p-8">
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-gradient-to-br from-blue-500 to-cyan-500">
                <BookOpen className="h-6 w-6 text-white" />
              </div>
              <h3 className="mb-2 text-xl font-bold">Comprehensive Documentation</h3>
              <p className="text-muted-foreground">
                Organized interview questions categorized by difficulty - basic, intermediate, and advanced levels
              </p>
            </div>

            {/* Feature 2 */}
            <div className="relative rounded-2xl border bg-card p-8">
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-gradient-to-br from-purple-500 to-pink-500">
                <Target className="h-6 w-6 text-white" />
              </div>
              <h3 className="mb-2 text-xl font-bold">AI-Powered Mock Tests</h3>
              <p className="text-muted-foreground">
                Take timed mock tests with MCQ and self-assessment questions. Get instant feedback and detailed results
              </p>
            </div>

            {/* Feature 3 */}
            <div className="relative rounded-2xl border bg-card p-8">
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-gradient-to-br from-orange-500 to-red-500">
                <Zap className="h-6 w-6 text-white" />
              </div>
              <h3 className="mb-2 text-xl font-bold">Smart Verification</h3>
              <p className="text-muted-foreground">
                Self-rate your knowledge and get follow-up questions to verify your understanding with adaptive difficulty
              </p>
            </div>

            {/* Feature 4 */}
            <div className="relative rounded-2xl border bg-card p-8">
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-gradient-to-br from-green-500 to-emerald-500">
                <CheckCircle2 className="h-6 w-6 text-white" />
              </div>
              <h3 className="mb-2 text-xl font-bold">Real Interview Questions</h3>
              <p className="text-muted-foreground">
                Questions sourced from GitHub, InterviewBit, LeetCode, and real interview experiences
              </p>
            </div>

            {/* Feature 5 */}
            <div className="relative rounded-2xl border bg-card p-8">
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-gradient-to-br from-yellow-500 to-orange-500">
                <Sparkles className="h-6 w-6 text-white" />
              </div>
              <h3 className="mb-2 text-xl font-bold">Dynamic Question Pool</h3>
              <p className="text-muted-foreground">
                1000+ AI-generated questions with randomized selection for fresh practice every time
              </p>
            </div>

            {/* Feature 6 */}
            <div className="relative rounded-2xl border bg-card p-8">
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-gradient-to-br from-indigo-500 to-purple-500">
                <Code2 className="h-6 w-6 text-white" />
              </div>
              <h3 className="mb-2 text-xl font-bold">Multi-Topic Coverage</h3>
              <p className="text-muted-foreground">
                From basics to advanced topics including widgets, state management, networking, and platform channels
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative overflow-hidden border-t bg-gradient-to-b from-muted/20 to-background py-16 sm:py-24">
        <div className="absolute inset-0 bg-grid-slate-900/[0.04] [mask-image:linear-gradient(180deg,transparent,black)]" />
        <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
              Ready to Ace Your Interview?
            </h2>
            <p className="mt-4 text-lg text-muted-foreground">
              Start practicing with our comprehensive resources and AI-powered mock tests today
            </p>
            <div className="mt-10 flex items-center justify-center gap-4">
              <Link
                href="/docs/flutter"
                className="inline-flex items-center gap-2 rounded-lg bg-foreground px-8 py-3.5 text-sm font-semibold text-background transition-all hover:bg-foreground/90"
              >
                Get Started Free
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                href="/test-your-skill"
                className="inline-flex items-center gap-2 rounded-lg border px-8 py-3.5 text-sm font-semibold transition-all hover:bg-muted"
              >
                Try Mock Test
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
