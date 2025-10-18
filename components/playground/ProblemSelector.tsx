'use client';

import { Problem } from '@/lib/get-problems';
import { useState, useRef, useEffect } from 'react';

interface ProblemSelectorProps {
  problems: Problem[];
  selectedProblem: Problem | null;
  onProblemChange: (problem: Problem) => void;
}

export default function ProblemSelector({
  problems,
  selectedProblem,
  onProblemChange,
}: ProblemSelectorProps) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Extract path from URL (remove /docs/ prefix)
  const getPathFromUrl = (url: string) => {
    return url.replace('/docs/', '');
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="flex items-center gap-4 relative" ref={dropdownRef}>
      <label className="text-sm font-semibold text-gray-300 whitespace-nowrap">
        📚 Problem:
      </label>

      {/* Custom Dropdown Button */}
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="flex-1 max-w-full px-4 py-2.5 bg-gradient-to-r from-gray-800 to-gray-900 border border-gray-600 rounded-lg text-sm text-left focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 shadow-lg hover:border-gray-500 transition-all flex items-center justify-between"
      >
        <div className="flex items-center gap-2 overflow-hidden">
          {selectedProblem ? (
            <>
              <span className="text-gray-200 font-medium">{selectedProblem.title}</span>
              <span className="text-gray-500 text-xs font-mono">
                {getPathFromUrl(selectedProblem.url)}
              </span>
            </>
          ) : (
            <span className="text-gray-400">Choose a problem to solve...</span>
          )}
        </div>
        <svg
          className={`w-4 h-4 text-gray-400 transition-transform ${isOpen ? 'rotate-180' : ''}`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {/* Custom Dropdown Menu */}
      {isOpen && (
        <div className="absolute top-full left-0 right-0 mt-2 ml-24 bg-gray-800 border border-gray-600 rounded-lg shadow-2xl z-50 max-h-96 overflow-y-auto">
          {problems.map((problem) => (
            <button
              key={problem.id}
              type="button"
              onClick={() => {
                onProblemChange(problem);
                setIsOpen(false);
              }}
              className={`w-full px-4 py-2.5 text-left hover:bg-gray-700 transition-colors flex items-center gap-2 ${
                selectedProblem?.id === problem.id ? 'bg-gray-700' : ''
              }`}
            >
              <span className="text-gray-200 text-sm font-medium">{problem.title}</span>
              <span className="text-gray-500 text-xs font-mono">
                {getPathFromUrl(problem.url)}
              </span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
