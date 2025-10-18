'use client';

import { getSupportedLanguages } from '@/lib/code-templates';

interface LanguageSelectorProps {
  selectedLanguage: string;
  onLanguageChange: (language: string) => void;
}

export default function LanguageSelector({
  selectedLanguage,
  onLanguageChange,
}: LanguageSelectorProps) {
  const languages = getSupportedLanguages();

  return (
    <div className="flex gap-1">
      {languages.map((lang) => (
        <button
          key={lang.value}
          onClick={() => onLanguageChange(lang.value)}
          className={`px-4 py-2.5 text-sm font-semibold transition-all relative ${
            selectedLanguage === lang.value
              ? 'bg-gradient-to-b from-gray-700 to-gray-800 text-blue-400'
              : 'text-gray-400 hover:text-gray-200 hover:bg-gray-800/30'
          }`}
        >
          {selectedLanguage === lang.value && (
            <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-blue-500 to-cyan-500"></div>
          )}
          <span className="mr-2 text-base">{lang.icon}</span>
          {lang.label}
        </button>
      ))}
    </div>
  );
}
