#!/usr/bin/env python3
"""Test resume functionality"""

import json
from pathlib import Path

def test_resume_functionality():
    """Verify progress file structure"""

    print("Testing Resume Functionality\n")

    # Check if progress file exists
    progress_file = Path('scripts/progress.json')

    if not progress_file.exists():
        print("✓ No progress file - Fresh start mode")
        print("  (This is normal if you haven't run generation yet)")
        return True

    # Load and validate progress file
    print("📂 Found progress file\n")

    with open(progress_file, 'r') as f:
        progress = json.load(f)

    # Check required fields
    required_fields = ['last_index', 'generated_count', 'questions']

    for field in required_fields:
        if field in progress:
            print(f"✓ Field '{field}': Present")
        else:
            print(f"✗ Field '{field}': MISSING")
            return False

    # Validate data
    last_index = progress['last_index']
    generated_count = progress['generated_count']
    questions = progress['questions']

    print(f"\n📊 Progress Stats:")
    print(f"   Last Index: {last_index}")
    print(f"   Generated: {generated_count} questions")
    print(f"   Questions in array: {len(questions)}")

    # Validation
    if generated_count != len(questions):
        print(f"\n⚠️  Warning: Count mismatch ({generated_count} != {len(questions)})")
        return False

    if last_index < -1:
        print(f"\n⚠️  Warning: Invalid last_index ({last_index})")
        return False

    print("\n✅ Resume file is valid!")
    print(f"\nNext run will resume from question {last_index + 2}")

    return True

if __name__ == "__main__":
    success = test_resume_functionality()
    exit(0 if success else 1)
