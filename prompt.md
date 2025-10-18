# MDX Problem-Solving Template Prompt

Use this template when creating new problem-solving documentation files or update in the `content/docs/problem-solving/top-100/` directory.

## Template Structure

```mdx
---
title: [Problem Number]. [Problem Title]
description: [Brief one-line description of the problem]
---

import { Tab, Tabs } from 'fumadocs-ui/components/tabs';
import { LanguageSwitcher, TranslatedText } from '@/components/LanguageSwitcher';

<LanguageSwitcher />

# <TranslatedText en="[Problem Title in English]" bn="[Problem Title in Bengali]" />

<TranslatedText
  en="[Brief problem description in English]"
  bn="[Brief problem description in Bengali]"
/>

## <TranslatedText en="Problem Statement" bn="সমস্যা বিবৃতি" />

<TranslatedText
  en={
    <>
      <p><strong>Input:</strong> [Example input]</p>
      <p><strong>Output:</strong> [Example output]</p>
      <p><strong>Explanation:</strong></p>
      <ul>
        <li>[Explanation point 1]</li>
        <li>[Explanation point 2]</li>
        <li>[Explanation point 3]</li>
      </ul>
    </>
  }
  bn={
    <>
      <p><strong>ইনপুট:</strong> [Example input]</p>
      <p><strong>আউটপুট:</strong> [Example output]</p>
      <p><strong>ব্যাখ্যা:</strong></p>
      <ul>
        <li>[Bengali explanation point 1]</li>
        <li>[Bengali explanation point 2]</li>
        <li>[Bengali explanation point 3]</li>
      </ul>
    </>
  }
/>

## <TranslatedText en="Solution Approaches" bn="সমাধান পদ্ধতি" />

### <TranslatedText en="Approach 1: [First Approach Name]" bn="পদ্ধতি ১: [Bengali Approach Name]" />

<TranslatedText
  en={<p>[Description of first approach in English]</p>}
  bn={<p>[Description of first approach in Bengali]</p>}
/>

<Tabs items={['C++', 'Python', 'JavaScript']} groupId="language">
  <Tab value="C++">
```cpp
// C++ code here
```

**Output:**
```
[Expected output]
```
  </Tab>
  <Tab value="Python">
```python
# Python code here
```

**Output:**
```
[Expected output]
```
  </Tab>
  <Tab value="JavaScript">
```javascript
// JavaScript code here
```

**Output:**
```
[Expected output]
```
  </Tab>
</Tabs>

<TranslatedText
  en={
    <>
      <p><strong>Time Complexity:</strong> O([complexity])</p>
      <p><strong>Space Complexity:</strong> O([complexity])</p>
      <p><strong>Note:</strong> [Additional notes in English]</p>
    </>
  }
  bn={
    <>
      <p><strong>সময় জটিলতা:</strong> O([complexity])</p>
      <p><strong>স্থান জটিলতা:</strong> O([complexity])</p>
      <p><strong>নোট:</strong> [Additional notes in Bengali]</p>
    </>
  }
/>

### <TranslatedText en="Approach 2: [Second Approach Name]" bn="পদ্ধতি ২: [Bengali Approach Name]" />

<TranslatedText
  en={<p>[Description of second approach in English]</p>}
  bn={<p>[Description of second approach in Bengali]</p>}
/>

<Tabs items={['C++', 'Python', 'JavaScript']} groupId="language">
  <Tab value="C++">
```cpp
// C++ code here
```

**Output:**
```
[Expected output]
```
  </Tab>
  <Tab value="Python">
```python
# Python code here
```

**Output:**
```
[Expected output]
```
  </Tab>
  <Tab value="JavaScript">
```javascript
// JavaScript code here
```

**Output:**
```
[Expected output]
```
  </Tab>
</Tabs>

<TranslatedText
  en={
    <>
      <p><strong>Time Complexity:</strong> O([complexity])</p>
      <p><strong>Space Complexity:</strong> O([complexity])</p>
      <p><strong>Advantage:</strong> [Why this approach is better]</p>
    </>
  }
  bn={
    <>
      <p><strong>সময় জটিলতা:</strong> O([complexity])</p>
      <p><strong>স্থান জটিলতা:</strong> O([complexity])</p>
      <p><strong>সুবিধা:</strong> [Why this approach is better in Bengali]</p>
    </>
  }
/>

## <TranslatedText en="How the [Algorithm] Works" bn="[Algorithm] কীভাবে কাজ করে" />

<TranslatedText
  en={
    <>
      <p><strong>Key Insight:</strong> [Main insight about the algorithm]</p>
      <p><strong>Step-by-step for [example input]:</strong></p>
      <ol>
        <li>[Step 1 description]</li>
        <li>[Step 2 description]</li>
        <li>[Step 3 description]</li>
        <li>[Step 4 description]</li>
      </ol>
      <p>Result: [Final result]</p>
    </>
  }
  bn={
    <>
      <p><strong>মূল ধারণা:</strong> [Main insight in Bengali]</p>
      <p><strong>[example input] এর জন্য ধাপে ধাপে:</strong></p>
      <ol>
        <li>[Step 1 in Bengali]</li>
        <li>[Step 2 in Bengali]</li>
        <li>[Step 3 in Bengali]</li>
        <li>[Step 4 in Bengali]</li>
      </ol>
      <p>ফলাফল: [Final result in Bengali]</p>
    </>
  }
/>

## <TranslatedText en="Variants of This Problem" bn="এই সমস্যার রূপান্তর" />

<TranslatedText
  en={
    <>
      <ul>
        <li><strong>[Variant 1 Name]:</strong> [Brief description]</li>
        <li><strong>[Variant 2 Name]:</strong> [Brief description]</li>
        <li><strong>[Variant 3 Name]:</strong> [Brief description]</li>
        <li><strong>[Related Problem]:</strong> [Brief description]</li>
      </ul>
    </>
  }
  bn={
    <>
      <ul>
        <li><strong>[Variant 1 in Bengali]:</strong> [Brief description in Bengali]</li>
        <li><strong>[Variant 2 in Bengali]:</strong> [Brief description in Bengali]</li>
        <li><strong>[Variant 3 in Bengali]:</strong> [Brief description in Bengali]</li>
        <li><strong>[Related Problem in Bengali]:</strong> [Brief description in Bengali]</li>
      </ul>
    </>
  }
/>

## <TranslatedText en="Comparison Table" bn="তুলনা সারণী" />

<TranslatedText
  en={
    <table>
      <thead>
        <tr>
          <th>Approach</th>
          <th>Time Complexity</th>
          <th>Space Complexity</th>
          <th>Best For</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>[Approach 1]</td>
          <td>O([complexity])</td>
          <td>O([complexity])</td>
          <td>[Use case]</td>
        </tr>
        <tr>
          <td>[Approach 2]</td>
          <td>O([complexity])</td>
          <td>O([complexity])</td>
          <td>[Use case]</td>
        </tr>
      </tbody>
    </table>
  }
  bn={
    <table>
      <thead>
        <tr>
          <th>পদ্ধতি</th>
          <th>সময় জটিলতা</th>
          <th>স্থান জটিলতা</th>
          <th>সেরা কখন</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>[Approach 1 in Bengali]</td>
          <td>O([complexity])</td>
          <td>O([complexity])</td>
          <td>[Use case in Bengali]</td>
        </tr>
        <tr>
          <td>[Approach 2 in Bengali]</td>
          <td>O([complexity])</td>
          <td>O([complexity])</td>
          <td>[Use case in Bengali]</td>
        </tr>
      </tbody>
    </table>
  }
/>

## <TranslatedText en="Key Insights" bn="মূল অন্তর্দৃষ্টি" />

<TranslatedText
  en={
    <>
      <ul>
        <li><strong>[Insight 1 Title]:</strong> [Insight 1 description]</li>
        <li><strong>[Insight 2 Title]:</strong> [Insight 2 description]</li>
        <li><strong>[Insight 3 Title]:</strong> [Insight 3 description]</li>
        <li><strong>[Insight 4 Title]:</strong> [Insight 4 description]</li>
      </ul>
    </>
  }
  bn={
    <>
      <ul>
        <li><strong>[Insight 1 Title in Bengali]:</strong> [Insight 1 in Bengali]</li>
        <li><strong>[Insight 2 Title in Bengali]:</strong> [Insight 2 in Bengali]</li>
        <li><strong>[Insight 3 Title in Bengali]:</strong> [Insight 3 in Bengali]</li>
        <li><strong>[Insight 4 Title in Bengali]:</strong> [Insight 4 in Bengali]</li>
      </ul>
    </>
  }
/>

## <TranslatedText en="Interview Tips" bn="ইন্টারভিউ টিপস" />

<TranslatedText
  en={
    <>
      <blockquote>
        <p><strong>Interview Tips:</strong></p>
        <ul>
          <li>[Interview tip 1]</li>
          <li>[Interview tip 2]</li>
          <li>[Interview tip 3]</li>
          <li>[Interview tip 4]</li>
          <li>[Interview tip 5]</li>
          <li>[Interview tip 6]</li>
        </ul>
      </blockquote>
    </>
  }
  bn={
    <>
      <blockquote>
        <p><strong>ইন্টারভিউ টিপস:</strong></p>
        <ul>
          <li>[Interview tip 1 in Bengali]</li>
          <li>[Interview tip 2 in Bengali]</li>
          <li>[Interview tip 3 in Bengali]</li>
          <li>[Interview tip 4 in Bengali]</li>
          <li>[Interview tip 5 in Bengali]</li>
          <li>[Interview tip 6 in Bengali]</li>
        </ul>
      </blockquote>
    </>
  }
/>

## <TranslatedText en="Key Takeaways" bn="মূল শিক্ষা" />

<TranslatedText
  en={
    <>
      <blockquote>
        <p><strong>Interview Tips:</strong></p>
        <ul>
          <li>[Interview tip 1]</li>
          <li>[Interview tip 2]</li>
          <li>[Interview tip 3]</li>
          <li>[Interview tip 4]</li>
          <li>[Interview tip 5]</li>
          <li>[Interview tip 6]</li>
        </ul>
      </blockquote>
    </>
  }
  bn={
    <>
      <blockquote>
        <p><strong>ইন্টারভিউ টিপস:</strong></p>
        <ul>
          <li>[Interview tip 1 in Bengali]</li>
          <li>[Interview tip 2 in Bengali]</li>
          <li>[Interview tip 3 in Bengali]</li>
          <li>[Interview tip 4 in Bengali]</li>
          <li>[Interview tip 5 in Bengali]</li>
          <li>[Interview tip 6 in Bengali]</li>
        </ul>
      </blockquote>
    </>
  }
/>
```

## Key Points to Remember

### 1. **Imports (CRITICAL)**
```jsx
import { Tab, Tabs } from 'fumadocs-ui/components/tabs';
import { LanguageSwitcher, TranslatedText } from '@/components/LanguageSwitcher';
```
- **MUST** import both `Tab` and `Tabs` (not just `Tabs`)
- Import `LanguageSwitcher` and `TranslatedText` for bilingual support

### 2. **Tabs Syntax (CRITICAL)**
```jsx
<Tabs items={['C++', 'Python', 'JavaScript']} groupId="language">
  <Tab value="C++">
    {/* Content */}
  </Tab>
  <Tab value="Python">
    {/* Content */}
  </Tab>
  <Tab value="JavaScript">
    {/* Content */}
  </Tab>
</Tabs>
```
- Use `<Tab value="...">` NOT `<Tabs.Tab>`
- The `value` attribute must match the language name in the `items` array
- Always include `groupId="language"` for proper tab synchronization

### 3. **Bilingual Content**
- Every text element should have both English (`en`) and Bengali (`bn`) versions
- Use `<TranslatedText>` component for all content
- For complex HTML content, wrap in `<>` fragments inside the language props

### 4. **Code Blocks**
- Always provide implementations in C++, Python, and JavaScript
- Include example output after each code block
- Use proper syntax highlighting (```cpp, ```python, ```javascript)

### 5. **Complexity Analysis**
- Include Time and Space complexity for each approach
- Add notes about advantages/disadvantages
- Explain when to use each approach

### 6. **File Naming**
- Use format: `[number]-[problem-name-kebab-case].mdx`
- Example: `27-minimum-coins.mdx`, `28-two-sum.mdx`

### 7. **Frontmatter**
```yaml
---
title: [Number]. [Problem Title]
description: [Brief description]
---
```

## Common Mistakes to Avoid

❌ **DON'T:**
- Use `<Tabs.Tab>` (will cause error)
- Forget to import `Tab` component
- Mix English and Bengali in same text block
- Skip complexity analysis
- Forget `groupId` in Tabs

✅ **DO:**
- Use `<Tab value="...">` with proper value attribute
- Import both `Tab` and `Tabs`
- Keep languages separate using `en` and `bn` props
- Include all complexity information
- Add `groupId="language"` for tab synchronization

## Example Usage

When creating a new problem file (e.g., `28-two-sum.mdx`), copy the template above and fill in:
1. Problem title and description in frontmatter
2. English and Bengali translations for all text
3. Code implementations in all three languages
4. Step-by-step explanations
5. Complexity analysis
6. Interview tips and variants

This ensures consistency across all problem-solving documentation files.

## Task: Apply Template to Files 28-53

**Objective**: Update all problem files from `28-two-sum.mdx` to `53-*.mdx` to match the template format.

### Required Updates for Each File:

1. **Title Format**:
   - Ensure frontmatter title starts with problem number: `title: [Number]. [Problem Title]`
   - Example: `title: 28. Two Sum Problem`

2. **Main Heading**:
   - Add main heading after LanguageSwitcher with bilingual title
   - Add brief description after the heading using TranslatedText

3. **Tab Components**:
   - Ensure all `<Tabs>` have `groupId="language"` attribute
   - Use `<Tab value="C++">`, `<Tab value="Python">`, `<Tab value="JavaScript">`
   - Never use `<Tabs.Tab>` syntax

4. **Required Sections** (in order):
   - Problem Statement
   - Solution Approaches (with at least 1-2 approaches)
   - How the Algorithm Works (step-by-step walkthrough)
   - Comparison Table (if multiple approaches)
   - Key Insights (bulleted list of main concepts)
   - Interview Tips (blockquote with tips)
   - Variants of This Problem
   - Key Takeaways (blockquote with summary)

5. **Format Consistency**:
   - Wrap descriptions in `<p>` tags
   - Use `<ul>` for lists within TranslatedText
   - Use `<ol>` for step-by-step explanations
   - Use `<blockquote>` for Interview Tips and Key Takeaways
   