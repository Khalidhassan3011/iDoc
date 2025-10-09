# Multi-Doc Setup Guide - Interview Doc

## Overview

This project uses Fumadocs multi-doc functionality with multiple root folders. The documentation is organized into separate sections: **Flutter** interview questions and **Problem Solving** challenges.

## Current Structure

```
content/docs/
├── flutter/
│   ├── meta.json              # Root folder config with Flutter icon
│   ├── index.mdx             # Flutter overview
│   ├── important-topics.mdx  # Top 10 topics
│   ├── best-practices.mdx    # Best practices
│   ├── common-mistakes.mdx   # Common mistakes
│   ├── basics/               # 192 basic questions
│   ├── intermediate/         # 102 intermediate questions
│   ├── advanced/             # 28 advanced questions
│   ├── turing-questions/     # 100 questions from Turing
│   ├── geeksforgeeks/        # 10 questions from GeeksforGeeks
│   ├── interviewbit/         # 38 questions from InterviewBit
│   ├── medium/               # 100 questions from Medium
│   ├── github/               # 100 questions from GitHub
│   ├── simplilearn/          # 32 questions from Simplilearn
│   └── lemon/                # 57 questions from Lemon.io
└── problem-solving/
    ├── meta.json             # Root folder config with Code icon
    └── index.mdx             # Problem solving overview
```

## How It Works

### Root Folders

Each folder marked with `"root": true` in its `meta.json` becomes a separate documentation section:

**content/docs/flutter/meta.json:**
```json
{
  "title": "Flutter",
  "description": "Flutter interview questions and preparation guide",
  "icon": "Flutter",
  "root": true,
  "pages": [
    "index",
    "important-topics",
    "best-practices",
    "common-mistakes",
    "---",
    "basics",
    "intermediate",
    "advanced",
    "---2",
    "turing-questions",
    "geeksforgeeks",
    "interviewbit",
    "medium",
    "github",
    "simplilearn",
    "lemon"
  ]
}
```

**content/docs/problem-solving/meta.json:**
```json
{
  "title": "Problem Solving",
  "description": "Problem solving and coding challenges",
  "icon": "Code",
  "root": true,
  "pages": ["index"]
}
```

### Automatic Sidebar Tabs with Icons

Fumadocs automatically creates sidebar tabs for each root folder with custom icons. Users can switch between "Flutter" (with Flutter icon) and "Problem Solving" (with Code icon) sections using these tabs.

## Adding New Documentation Sections

To add a new documentation section:

1. **Create a new folder** under `content/docs/`:
   ```bash
   mkdir content/docs/your-section
   ```

2. **Add a meta.json file** to mark it as a root folder:
   ```json
   {
     "title": "Your Section",
     "description": "Description of your section",
     "root": true,
     "pages": ["index", "page1", "page2"]
   }
   ```

3. **Create your MDX files**:
   ```bash
   touch content/docs/your-section/index.mdx
   touch content/docs/your-section/page1.mdx
   ```

4. **Rebuild the project**:
   ```bash
   npm run postinstall
   ```

## Adding Pages to Existing Sections

1. Create a new `.mdx` file in the appropriate section folder
2. Add the filename (without extension) to the `pages` array in `meta.json`
3. Run `npm run postinstall` to regenerate the content

## Benefits of This Approach

- **No code changes required** - Just file structure and meta.json
- **Automatic navigation** - Fumadocs handles sidebar tabs automatically
- **Clean organization** - Each section is self-contained
- **Easy to maintain** - Simple folder structure
- **Scalable** - Add as many sections as needed

## Configuration Files

Modified files:
- `app/docs/[[...slug]]/page.tsx` - Added redirect from `/docs` to `/docs/flutter`
- `lib/source.ts` - Added icon handler for Flutter and Code icons
- `lib/layout.shared.tsx` - Changed site name to "Interview Doc"

No changes needed to:
- `source.config.ts` - Uses single defineDocs
- `app/docs/layout.tsx` - Automatically picks up root folders

## Development

Start the development server:
```bash
npm run dev
```

The dev server will be available at http://localhost:3000 (or another port if 3000 is busy).

### URL Structure

When using root folders, you must navigate to a specific section:

- `/docs` - Automatically redirects to `/docs/flutter` (first root folder)
- `/docs/flutter` - Flutter section homepage
- `/docs/flutter/basics` - Basic Flutter questions
- `/docs/flutter/important-topics` - Top 10 important topics
- `/docs/problem-solving` - Problem Solving section homepage

The sidebar will show tabs at the top with icons allowing you to switch between "Flutter" and "Problem Solving" sections.

## More Information

For more details about Fumadocs multi-doc functionality, visit:
- [Fumadocs Page Conventions](https://fumadocs.dev/docs/ui/page-conventions)
- [Fumadocs Collections](https://fumadocs.dev/docs/mdx/collections)
