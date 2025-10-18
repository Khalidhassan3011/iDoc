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
    <div className="flex gap-1 border-b border-gray-700">
      {languages.map((lang) => (
        <button
          key={lang.value}
          onClick={() => onLanguageChange(lang.value)}
          className={`px-4 py-2 text-sm font-medium transition-colors ${
            selectedLanguage === lang.value
              ? 'bg-gray-800 text-blue-400 border-b-2 border-blue-400'
              : 'text-gray-400 hover:text-gray-200 hover:bg-gray-800/50'
          }`}
        >
          <span className="mr-2">{lang.icon}</span>
          {lang.label}
        </button>
      ))}
    </div>
  );
}
