const fs = require('fs');
const path = require('path');

// Function to extract title from first heading or filename
function extractTitle(content, filename) {
  // Try to find first # heading
  const headingMatch = content.match(/^#\s+(.+)$/m);
  if (headingMatch) {
    return headingMatch[1];
  }

  // Fallback to filename
  return filename
    .replace(/\.mdx$/, '')
    .replace(/-/g, ' ')
    .replace(/^\d+-/, '') // Remove leading numbers like "1-50"
    .split(' ')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
}

// Function to add frontmatter to MDX file
function addFrontmatter(filePath) {
  const content = fs.readFileSync(filePath, 'utf8');

  // Check if frontmatter already exists
  if (content.startsWith('---')) {
    console.log(`Skipping ${filePath} - already has frontmatter`);
    return;
  }

  const filename = path.basename(filePath);
  const title = extractTitle(content, filename);

  // Remove nextra imports
  const cleanedContent = content
    .replace(/^import\s+\{[^}]*\}\s+from\s+['"]nextra\/components['"]\s*;?\s*$/gm, '')
    .replace(/<Callout[^>]*>/g, '> **Note:**')
    .replace(/<\/Callout>/g, '')
    .trim();

  // Add frontmatter
  const frontmatter = `---
title: ${title}
description: ${title}
---

`;

  const newContent = frontmatter + cleanedContent;

  fs.writeFileSync(filePath, newContent, 'utf8');
  console.log(`✓ Converted: ${filePath}`);
}

// Function to recursively process all MDX files in a directory
function processDirectory(dir) {
  const entries = fs.readdirSync(dir, { withFileTypes: true });

  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);

    if (entry.isDirectory()) {
      processDirectory(fullPath);
    } else if (entry.isFile() && entry.name.endsWith('.mdx')) {
      try {
        addFrontmatter(fullPath);
      } catch (error) {
        console.error(`✗ Error processing ${fullPath}:`, error.message);
      }
    }
  }
}

// Start processing
const contentDir = path.join(__dirname, 'content', 'docs');
console.log('Starting MDX conversion...\n');
processDirectory(contentDir);
console.log('\n✓ Conversion complete!');
