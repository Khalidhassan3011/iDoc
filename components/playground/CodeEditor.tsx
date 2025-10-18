'use client';

import Editor from '@monaco-editor/react';

interface CodeEditorProps {
  code: string;
  language: string;
  onChange: (value: string | undefined) => void;
}

export default function CodeEditor({ code, language, onChange }: CodeEditorProps) {
  // Map our language keys to Monaco language IDs
  const monacoLanguage = language === 'cpp' ? 'cpp' : language;

  return (
    <div className="h-full w-full">
      <Editor
        height="100%"
        language={monacoLanguage}
        value={code}
        onChange={onChange}
        theme="vs-dark"
        options={{
          fontSize: 14,
          minimap: { enabled: true },
          scrollBeyondLastLine: false,
          automaticLayout: true,
          tabSize: language === 'python' ? 4 : 2,
          wordWrap: 'on',
          lineNumbers: 'on',
          renderWhitespace: 'selection',
          bracketPairColorization: {
            enabled: true,
          },
        }}
      />
    </div>
  );
}
