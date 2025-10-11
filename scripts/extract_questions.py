#!/usr/bin/env python3
"""
Extract Flutter interview questions from MDX files
"""

import os
import re
import json
from pathlib import Path

def parse_mdx_file(file_path):
    """Extract questions from MDX file"""
    try:
        with open(file_path, 'r', encoding='utf-8') as f:
            content = f.read()
    except Exception as e:
        print(f"Error reading {file_path}: {e}")
        return []

    questions = []

    # Extract H2 headers with question numbers
    pattern = r'##\s+(\d+)\.\s+(.+?)\n\n(.*?)(?=\n##\s+\d+\.|\Z)'
    matches = re.findall(pattern, content, re.DOTALL)

    source = Path(file_path).parent.name.upper()

    for match in matches:
        number, question_text, answer = match

        # Clean up question and answer
        question_text = question_text.strip()
        answer = answer.strip()[:300]  # First 300 chars

        questions.append({
            "question": question_text,
            "answer_preview": answer,
            "source": source
        })

    return questions

def determine_difficulty(file_path):
    """Determine difficulty from file path"""
    path_str = str(file_path).lower()

    if any(x in path_str for x in ['easy', 'basic', 'freshers', '1-50']):
        return 'basic'
    elif any(x in path_str for x in ['intermediate', 'medium', '51-100', '101-150']):
        return 'intermediate'
    elif any(x in path_str for x in ['advanced', 'experienced', 'expert']):
        return 'advanced'
    return 'basic'

def main():
    base_path = Path('content/docs/flutter')

    if not base_path.exists():
        print(f"Error: {base_path} not found")
        return

    # Find all MDX files
    mdx_files = list(base_path.rglob('*.mdx'))

    # Exclude index, roadmap, and non-question files
    mdx_files = [
        f for f in mdx_files
        if not any(x in str(f).lower() for x in ['index', 'roadmap', 'best-practices', 'common-mistakes', 'important-topics'])
    ]

    print(f"Found {len(mdx_files)} MDX files to process")

    all_questions = []

    for mdx_file in mdx_files:
        print(f"Processing: {mdx_file.relative_to(base_path)}")
        questions = parse_mdx_file(mdx_file)

        difficulty = determine_difficulty(mdx_file)

        for q in questions:
            q['difficulty'] = difficulty

        all_questions.extend(questions)
        print(f"  Extracted {len(questions)} questions")

    print(f"\n{'='*60}")
    print(f"Total questions extracted: {len(all_questions)}")
    print(f"{'='*60}")

    # Count by difficulty
    basic = sum(1 for q in all_questions if q['difficulty'] == 'basic')
    intermediate = sum(1 for q in all_questions if q['difficulty'] == 'intermediate')
    advanced = sum(1 for q in all_questions if q['difficulty'] == 'advanced')

    print(f"\nBreakdown:")
    print(f"  Basic: {basic}")
    print(f"  Intermediate: {intermediate}")
    print(f"  Advanced: {advanced}")

    # Save extracted questions
    output_file = Path('scripts/questions_extracted.json')
    output_file.parent.mkdir(exist_ok=True)

    with open(output_file, 'w', encoding='utf-8') as f:
        json.dump(all_questions, f, indent=2, ensure_ascii=False)

    print(f"\n✓ Saved to: {output_file}")

if __name__ == "__main__":
    main()
