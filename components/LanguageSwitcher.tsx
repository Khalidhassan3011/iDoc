'use client';

import { useState, useEffect } from 'react';

type Language = 'en' | 'bn';

// Custom hook to manage language state with localStorage
export function useLanguageState() {
  const [language, setLanguageState] = useState<Language>('en');
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const saved = localStorage.getItem('doc-language') as Language;
    if (saved && (saved === 'en' || saved === 'bn')) {
      setLanguageState(saved);
    }
  }, []);

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    localStorage.setItem('doc-language', lang);
    // Dispatch custom event for other components to listen
    window.dispatchEvent(new CustomEvent('languageChange', { detail: lang }));
  };

  return { language, setLanguage, mounted };
}

export function LanguageSwitcher() {
  const { language, setLanguage } = useLanguageState();

  return (
    <div className="flex justify-start mb-4">
      <select
        value={language}
        onChange={(e) => setLanguage(e.target.value as Language)}
        className="px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-sm font-medium shadow-sm hover:shadow-md transition-shadow cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-500"
        aria-label="Select language"
      >
        <option value="en">🇬🇧 English</option>
        <option value="bn">🇧🇩 বাংলা</option>
      </select>
    </div>
  );
}

interface TranslatedTextProps {
  en: string | React.ReactNode;
  bn: string | React.ReactNode;
}

export function TranslatedText({ en, bn }: TranslatedTextProps) {
  const [language, setLanguage] = useState<Language>('en');
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    // Get initial language from localStorage
    const saved = localStorage.getItem('doc-language') as Language;
    if (saved && (saved === 'en' || saved === 'bn')) {
      setLanguage(saved);
    }

    // Listen for language changes
    const handleLanguageChange = (e: CustomEvent<Language>) => {
      setLanguage(e.detail);
    };

    window.addEventListener('languageChange', handleLanguageChange as EventListener);
    return () => {
      window.removeEventListener('languageChange', handleLanguageChange as EventListener);
    };
  }, []);

  // Prevent hydration mismatch by not rendering until mounted
  if (!mounted) {
    return <>{en}</>;
  }

  return <>{language === 'en' ? en : bn}</>;
}
