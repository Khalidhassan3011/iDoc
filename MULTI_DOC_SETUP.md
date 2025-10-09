# Multi-Doc Setup Guide

## Overview

This project now uses Fumadocs multi-doc functionality with multiple root folders. This allows you to organize documentation into separate sections with their own navigation.

## Current Structure

```
content/docs/
├── guide/
│   ├── meta.json          # Root folder config
│   ├── index.mdx         # Welcome page
│   └── components.mdx    # Components documentation
└── api-reference/
    ├── meta.json          # Root folder config
    ├── index.mdx         # API overview
    └── authentication.mdx # Authentication guide
```

## How It Works

### Root Folders

Each folder marked with `"root": true` in its `meta.json` becomes a separate documentation section:

**content/docs/guide/meta.json:**
```json
{
  "title": "Guide",
  "description": "Complete guide and tutorials",
  "root": true,
  "pages": ["index", "components"]
}
```

**content/docs/api-reference/meta.json:**
```json
{
  "title": "API Reference",
  "description": "API documentation and reference",
  "root": true,
  "pages": ["index", "authentication"]
}
```

### Automatic Sidebar Tabs

Fumadocs automatically creates sidebar tabs for each root folder. Users can switch between "Guide" and "API Reference" sections using these tabs.

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
- `app/docs/[[...slug]]/page.tsx` - Added redirect from `/docs` to `/docs/guide`

No changes needed to:
- `source.config.ts` - Uses single defineDocs
- `lib/source.ts` - Single loader handles all sections
- `app/docs/layout.tsx` - Automatically picks up root folders

## Development

Start the development server:
```bash
npm run dev
```

The dev server will be available at http://localhost:3000 (or another port if 3000 is busy).

### URL Structure

When using root folders, you must navigate to a specific section:

- `/docs` - Automatically redirects to `/docs/guide` (first root folder)
- `/docs/guide` - Guide section homepage
- `/docs/guide/components` - Components page in Guide section
- `/docs/api-reference` - API Reference section homepage
- `/docs/api-reference/authentication` - Authentication page in API section

The sidebar will show tabs at the top allowing you to switch between "Guide" and "API Reference" sections.

## More Information

For more details about Fumadocs multi-doc functionality, visit:
- [Fumadocs Page Conventions](https://fumadocs.dev/docs/ui/page-conventions)
- [Fumadocs Collections](https://fumadocs.dev/docs/mdx/collections)
