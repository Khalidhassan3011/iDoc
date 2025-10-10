'use client';

import { useEffect, useState } from 'react';
import { formatTime } from '@/lib/test/test-engine';
import { Clock } from 'lucide-react';

interface TestTimerProps {
  timeRemaining: number;
  onTimeExpired?: () => void;
}

export function TestTimer({ timeRemaining, onTimeExpired }: TestTimerProps) {
  const [time, setTime] = useState(timeRemaining);

  useEffect(() => {
    setTime(timeRemaining);
  }, [timeRemaining]);

  useEffect(() => {
    if (time <= 0) {
      onTimeExpired?.();
      return;
    }

    const timer = setInterval(() => {
      setTime((prevTime) => {
        const newTime = Math.max(0, prevTime - 1);
        if (newTime === 0) {
          onTimeExpired?.();
        }
        return newTime;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [time, onTimeExpired]);

  const isLowTime = time <= 60; // Less than 1 minute
  const isCritical = time <= 30; // Less than 30 seconds

  return (
    <div
      className={`flex items-center gap-2 px-4 py-2 rounded-lg font-mono text-lg font-semibold ${
        isCritical
          ? 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400'
          : isLowTime
          ? 'bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-400'
          : 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400'
      }`}
    >
      <Clock className="w-5 h-5" />
      <span>{formatTime(time)}</span>
    </div>
  );
}
