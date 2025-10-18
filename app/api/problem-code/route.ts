import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const slug = searchParams.get('slug');

    if (!slug) {
      return NextResponse.json(
        { success: false, error: 'Slug is required' },
        { status: 400 }
      );
    }

    // Build the file path
    // slug format: "28-two-sum" or "problem-solving/top-100/28-two-sum"
    const segments = slug.includes('/') ? slug : `problem-solving/top-100/${slug}`;
    const filePath = path.join(process.cwd(), 'content', 'docs', `${segments}.mdx`);

    // Check if file exists
    if (!fs.existsSync(filePath)) {
      return NextResponse.json(
        { success: false, error: 'Problem file not found' },
        { status: 404 }
      );
    }

    // Read the raw MDX file
    const content = fs.readFileSync(filePath, 'utf-8');

    // Extract code blocks by language
    const codeBlocks = extractCodeBlocks(content);

    return NextResponse.json({
      success: true,
      codeBlocks,
    });
  } catch (error: any) {
    console.error('Error fetching problem code:', error);
    return NextResponse.json(
      { success: false, error: error.message || 'Failed to fetch problem code' },
      { status: 500 }
    );
  }
}

interface CodeBlock {
  language: string;
  code: string;
  approach?: string;
}

function extractCodeBlocks(content: string): {
  cpp: CodeBlock[];
  python: CodeBlock[];
  javascript: CodeBlock[];
} {
  const result = {
    cpp: [] as CodeBlock[],
    python: [] as CodeBlock[],
    javascript: [] as CodeBlock[],
  };

  // Match code blocks with language identifier
  // Pattern: ```language\ncode\n```
  const codeBlockRegex = /```(\w+)\n([\s\S]*?)```/g;
  let match;

  // Track approaches by looking for headers or approach indicators
  let currentApproach = 'Approach 1';
  let approachCounts = { cpp: 0, python: 0, javascript: 0 };

  // Also check for approach headers in the content
  const approachHeaderRegex = /###?\s*(Approach\s+\d+|Solution\s+\d+|Method\s+\d+)/gi;
  const approaches: string[] = [];
  let approachMatch;

  while ((approachMatch = approachHeaderRegex.exec(content)) !== null) {
    approaches.push(approachMatch[1]);
  }

  let approachIndex = 0;

  while ((match = codeBlockRegex.exec(content)) !== null) {
    const language = match[1].toLowerCase();
    const code = match[2].trim();

    // Map language identifiers
    let langKey: 'cpp' | 'python' | 'javascript' | null = null;

    if (language === 'cpp' || language === 'c++') {
      langKey = 'cpp';
    } else if (language === 'python' || language === 'py') {
      langKey = 'python';
    } else if (language === 'javascript' || language === 'js') {
      langKey = 'javascript';
    }

    if (langKey && code.length > 0) {
      approachCounts[langKey]++;

      // Determine approach name
      let approachName = `Approach ${approachCounts[langKey]}`;

      // If we have approach headers, use them
      if (approaches.length > 0 && approachIndex < approaches.length) {
        // Check if this is a new group of code blocks (all three languages together)
        if (approachCounts[langKey] > result[langKey].length) {
          approachName = approaches[Math.min(approachIndex, approaches.length - 1)];
        }
      }

      result[langKey].push({
        language: langKey,
        code,
        approach: approachName,
      });

      // Increment approach index when we complete a set of all languages
      if (langKey === 'javascript' &&
          result.cpp.length === approachCounts.cpp &&
          result.python.length === approachCounts.python &&
          result.javascript.length === approachCounts.javascript) {
        approachIndex++;
      }
    }
  }

  return result;
}
