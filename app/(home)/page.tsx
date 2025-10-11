'use client';
import Link from 'next/link';
import { ArrowRight, BookOpen, Zap, Target, Code2, Sparkles, CheckCircle2, Lightbulb } from 'lucide-react';
import { HeroSection } from '@/components/ui/hero-section-1';
import { FeatureCard } from '@/components/ui/grid-feature-cards';
import { motion, useReducedMotion } from 'framer-motion';
import { TextEffect } from '@/components/ui/text-effect';
import { IconCloud } from '@/components/ui/interactive-icon-cloud';
import { useState, useEffect } from 'react';

const interviewTips = [
  "Always clarify requirements before writing code",
  "Think out loud during technical interviews",
  "Start with a brute force solution, then optimize",
  "Use meaningful variable and function names",
  "Test your code with edge cases",
  "Ask questions when requirements are unclear",
  "Draw diagrams to explain complex concepts",
  "Practice whiteboard coding regularly",
  "Review time and space complexity analysis",
  "Keep your code clean and readable",
  "Discuss trade-offs in your solutions",
  "Stay calm under pressure during interviews",
  "Practice mock interviews with peers",
  "Research the company before your interview",
  "Prepare questions to ask the interviewer",
  "Review your resume thoroughly",
  "Know your projects inside and out",
  "Practice explaining technical concepts simply",
  "Learn from your interview mistakes",
  "Follow up with a thank you email",
  "Understand common design patterns",
  "Study data structures deeply",
  "Master algorithm fundamentals",
  "Practice solving problems daily",
  "Build a portfolio of projects",
  "Contribute to open source",
  "Write clean commit messages",
  "Document your code properly",
  "Learn to debug efficiently",
  "Understand system design basics",
  "Study scalability concepts",
  "Know database fundamentals",
  "Understand API design principles",
  "Learn about caching strategies",
  "Study load balancing concepts",
  "Understand microservices architecture",
  "Know REST and GraphQL differences",
  "Study authentication methods",
  "Learn about security best practices",
  "Understand SOLID principles",
  "Practice refactoring code",
  "Learn testing strategies",
  "Understand CI/CD pipelines",
  "Study version control best practices",
  "Know agile methodologies",
  "Understand code review processes",
  "Learn pair programming techniques",
  "Study performance optimization",
  "Understand memory management",
  "Learn about concurrency patterns",
  "Study async programming concepts",
  "Understand event-driven architecture",
  "Know message queue patterns",
  "Study distributed systems",
  "Understand CAP theorem",
  "Learn about consistency models",
  "Study replication strategies",
  "Understand sharding concepts",
  "Know indexing strategies",
  "Study query optimization",
  "Learn about ORM patterns",
  "Understand transaction isolation",
  "Study ACID properties",
  "Know NoSQL databases",
  "Understand graph databases",
  "Learn about time series databases",
  "Study column-family databases",
  "Understand document databases",
  "Know key-value stores",
  "Study blob storage patterns",
  "Learn about CDN strategies",
  "Understand DNS concepts",
  "Know HTTP protocols deeply",
  "Study WebSocket patterns",
  "Learn about gRPC",
  "Understand protocol buffers",
  "Study API versioning strategies",
  "Know rate limiting techniques",
  "Learn about API authentication",
  "Understand OAuth flows",
  "Study JWT best practices",
  "Know session management",
  "Learn about CORS policies",
  "Understand XSS prevention",
  "Study CSRF protection",
  "Know SQL injection prevention",
  "Learn about input validation",
  "Understand error handling patterns",
  "Study logging best practices",
  "Know monitoring strategies",
  "Learn about alerting systems",
  "Understand metrics collection",
  "Study distributed tracing",
  "Know container orchestration",
  "Learn about Kubernetes basics",
  "Understand Docker concepts",
  "Study serverless patterns",
  "Know cloud provider services",
  "Learn about infrastructure as code",
  "Understand deployment strategies",
  "Study blue-green deployments",
  "Know canary releases",
];

const features = [
  {
    title: 'Comprehensive Documentation',
    icon: BookOpen,
    description: 'Organized interview questions categorized by difficulty - basic, intermediate, and advanced levels',
  },
  {
    title: 'AI-Powered Mock Tests',
    icon: Target,
    description: 'Take timed mock tests with MCQ and self-assessment questions. Get instant feedback and detailed results',
  },
  {
    title: 'Smart Verification',
    icon: Zap,
    description: 'Self-rate your knowledge and get follow-up questions to verify your understanding with adaptive difficulty',
  },
  {
    title: 'Real Interview Questions',
    icon: CheckCircle2,
    description: 'Questions sourced from GitHub, InterviewBit, LeetCode, and real interview experiences',
  },
  {
    title: 'Dynamic Question Pool',
    icon: Sparkles,
    description: '1000+ AI-generated questions with randomized selection for fresh practice every time',
  },
  {
    title: 'Multi-Topic Coverage',
    icon: Code2,
    description: 'From basics to advanced topics including widgets, state management, networking, and platform channels',
  },
];

type ViewAnimationProps = {
  delay?: number;
  className?: React.ComponentProps<typeof motion.div>['className'];
  children: React.ReactNode;
};

function AnimatedContainer({ className, delay = 0.1, children }: ViewAnimationProps) {
  const shouldReduceMotion = useReducedMotion();

  if (shouldReduceMotion) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      initial={{ filter: 'blur(4px)', translateY: -8, opacity: 0 }}
      whileInView={{ filter: 'blur(0px)', translateY: 0, opacity: 1 }}
      viewport={{ once: true }}
      transition={{ delay, duration: 0.8 }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

function RotatingTip() {
  const [currentTip, setCurrentTip] = useState('');
  const [trigger, setTrigger] = useState(true);

  useEffect(() => {
    // Set initial random tip
    const randomTip = interviewTips[Math.floor(Math.random() * interviewTips.length)];
    setCurrentTip(randomTip);

    // Change tip every 6 seconds
    const interval = setInterval(() => {
      setTrigger(false);
      setTimeout(() => {
        const newRandomTip = interviewTips[Math.floor(Math.random() * interviewTips.length)];
        setCurrentTip(newRandomTip);
        setTrigger(true);
      }, 800); // Longer delay for smoother transition
    }, 6000); // Increased interval

    return () => clearInterval(interval);
  }, []);

  const blurSlideVariants = {
    container: {
      hidden: { opacity: 0 },
      visible: {
        opacity: 1,
        transition: { staggerChildren: 0.02, delayChildren: 0.1 },
      },
      exit: {
        opacity: 0,
        transition: { staggerChildren: 0.01, staggerDirection: 1, duration: 0.3 },
      },
    },
    item: {
      hidden: {
        opacity: 0,
        filter: 'blur(8px)',
        y: 10,
        scale: 0.95,
      },
      visible: {
        opacity: 1,
        y: 0,
        scale: 1,
        filter: 'blur(0px)',
        transition: {
          duration: 0.5,
          ease: [0.25, 0.1, 0.25, 1], // Smooth cubic-bezier easing
        },
      },
      exit: {
        opacity: 0,
        y: -10,
        scale: 0.95,
        filter: 'blur(8px)',
        transition: {
          duration: 0.4,
          ease: [0.25, 0.1, 0.25, 1],
        },
      },
    },
  };

  return (
    <div className="flex items-center justify-center gap-3 min-h-[60px]">
      <Lightbulb className="h-5 w-5 text-yellow-500 flex-shrink-0" />
      <div className="flex-1 max-w-3xl">
        <TextEffect
          per='word'
          variants={blurSlideVariants}
          trigger={trigger}
          className="text-sm md:text-base text-muted-foreground text-center"
        >
          {currentTip}
        </TextEffect>
      </div>
    </div>
  );
}

const iconSlugs = [
  "typescript",
  "javascript",
  "dart",
  "java",
  "react",
  "flutter",
  "android",
  "html5",
  "css3",
  "nodedotjs",
  "express",
  "nextdotjs",
  "prisma",
  "amazonaws",
  "postgresql",
  "firebase",
  "nginx",
  "vercel",
  "testinglibrary",
  "jest",
  "cypress",
  "docker",
  "git",
  "jira",
  "github",
  "gitlab",
  "visualstudiocode",
  "androidstudio",
  "sonarqube",
  "figma",
];

export default function HomePage() {
  return (
    <main className="flex flex-col">
      {/* Hero Section */}
      <HeroSection />

      {/* Tech Stack Icon Cloud Section */}
      <section className="py-16 sm:py-24">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Text Content */}
            <div className="space-y-4">
              <h2 className="text-base font-semibold leading-7 text-primary">
                Technologies We Cover
              </h2>
              <p className="text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl">
                Master Popular Tech Stacks
              </p>
              <p className="text-lg text-muted-foreground">
                Comprehensive interview questions for the most in-demand technologies
              </p>
            </div>

            {/* Icon Cloud */}
            <div className="flex items-center justify-center lg:justify-end">
              <div className="relative flex w-full max-w-lg items-center justify-center overflow-hidden rounded-lg bg-background px-20 pb-20 pt-8">
                <IconCloud iconSlugs={iconSlugs} />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 md:py-32">
        <div className="mx-auto w-full max-w-5xl space-y-8 px-4">
          <AnimatedContainer className="mx-auto max-w-3xl text-center">
            <h2 className="text-base font-semibold leading-7 text-primary">
              Everything You Need
            </h2>
            <p className="mt-2 text-3xl font-bold tracking-wide text-balance md:text-4xl lg:text-5xl xl:font-extrabold">
              Features Built for Success
            </p>
            <p className="text-muted-foreground mt-4 text-sm tracking-wide text-balance md:text-base">
              Powerful tools and resources to help you master technical interviews
            </p>
          </AnimatedContainer>

          <AnimatedContainer
            delay={0.4}
            className="grid grid-cols-1 divide-x divide-y divide-dashed border border-dashed sm:grid-cols-2 md:grid-cols-3"
          >
            {features.map((feature, i) => (
              <FeatureCard key={i} feature={feature} />
            ))}
          </AnimatedContainer>
        </div>
      </section>

      {/* Tips Footer Section */}
      <section className="border-t bg-muted/30 py-8">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="flex flex-col items-center gap-2">
            <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground/60">
              💡 Interview Tip
            </p>
            <RotatingTip />
          </div>
        </div>
      </section>
    </main>
  );
}
