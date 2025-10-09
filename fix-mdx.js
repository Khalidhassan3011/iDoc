const fs = require('fs');
const path = require('path');

// Function to fix MDX content
function fixMDXContent(content) {
  let fixed = content;

  // Remove Nextra imports
  fixed = fixed.replace(/^import\s+\{[^}]*\}\s+from\s+['"]nextra\/components['"]\s*;?\s*$/gm, '');

  // Replace Callout components with markdown blockquotes
  fixed = fixed.replace(/<Callout[^>]*type="info"[^>]*>/g, '> **Note:**\n>');
  fixed = fixed.replace(/<Callout[^>]*type="success"[^>]*>/g, '> **Success:**\n>');
  fixed = fixed.replace(/<Callout[^>]*type="warning"[^>]*>/g, '> **Warning:**\n>');
  fixed = fixed.replace(/<Callout[^>]*type="error"[^>]*>/g, '> **Error:**\n>');
  fixed = fixed.replace(/<Callout[^>]*>/g, '> **Note:**\n>');
  fixed = fixed.replace(/<\/Callout>/g, '');

  // Fix JSX style objects in span tags - convert to markdown bold text with emoji
  // Pattern: <span style={{...}}>📚 SOURCE</span>
  fixed = fixed.replace(/<span\s+style=\{\{[^}]*\}\}>(📚\s*[^<]+)<\/span>/g, '**$1**');

  // Clean up any remaining span tags with style objects
  fixed = fixed.replace(/<span\s+style=\{\{[^}]*\}\}>/g, '');
  fixed = fixed.replace(/<\/span>/g, '');

  // Clean up multiple blank lines
  fixed = fixed.replace(/\n{3,}/g, '\n\n');

  return fixed;
}

// Function to process a single file
function processFile(filePath) {
  try {
    const content = fs.readFileSync(filePath, 'utf8');
    const fixed = fixMDXContent(content);

    if (content !== fixed) {
      fs.writeFileSync(filePath, fixed, 'utf8');
      console.log(`✓ Fixed: ${filePath}`);
      return true;
    } else {
      console.log(`  Skipped (no changes): ${filePath}`);
      return false;
    }
  } catch (error) {
    console.error(`✗ Error processing ${filePath}:`, error.message);
    return false;
  }
}

// Function to recursively process all MDX files in a directory
function processDirectory(dir) {
  let fixedCount = 0;
  const entries = fs.readdirSync(dir, { withFileTypes: true });

  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);

    if (entry.isDirectory()) {
      fixedCount += processDirectory(fullPath);
    } else if (entry.isFile() && entry.name.endsWith('.mdx')) {
      if (processFile(fullPath)) {
        fixedCount++;
      }
    }
  }

  return fixedCount;
}

// Start processing
const contentDir = path.join(__dirname, 'content', 'docs');
console.log('Starting MDX fixes...\n');
const fixedCount = processDirectory(contentDir);
console.log(`\n✓ Fixed ${fixedCount} files!`);
