#!/usr/bin/env python3
"""
Generate MCQ questions using AI via OpenRouter with automatic model fallback
"""

import json
import requests
import time
from pathlib import Path

OPENROUTER_API_KEY = "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"

# Multiple free models - will rotate if rate limited
MODELS = [
    "google/gemini-2.0-flash-exp:free",
    "mistralai/mistral-7b-instruct:free",
    "deepseek/deepseek-chat-v3.1:free",
    "z-ai/glm-4.5-air:free",
    "qwen/qwen3-235b-a22b:free"
]

current_model_index = 0

def call_ai_api(prompt, retry_count=0):
    """Call AI API with automatic model rotation"""
    global current_model_index

    try:
        response = requests.post(
            url="https://openrouter.ai/api/v1/chat/completions",
            headers={
                "Authorization": f"Bearer {OPENROUTER_API_KEY}",
                "Content-Type": "application/json"
            },
            json={
                "model": MODELS[current_model_index],
                "messages": [{"role": "user", "content": prompt}]
            },
            timeout=45
        )

        # Handle rate limiting
        if response.status_code == 429:
            if retry_count < len(MODELS) - 1:
                current_model_index = (current_model_index + 1) % len(MODELS)
                print(f"    Rate limited, trying: {MODELS[current_model_index]}")
                time.sleep(3)
                return call_ai_api(prompt, retry_count + 1)
            else:
                print("    All models rate limited, waiting 30s...")
                time.sleep(30)
                current_model_index = 0
                return call_ai_api(prompt, 0)

        if response.status_code == 200:
            result = response.json()

            # Check for API errors in response
            if 'error' in result:
                print(f"    API Error: {result['error'].get('message', 'Unknown')}")
                if retry_count < len(MODELS) - 1:
                    current_model_index = (current_model_index + 1) % len(MODELS)
                    print(f"    Switching to: {MODELS[current_model_index]}")
                    time.sleep(2)
                    return call_ai_api(prompt, retry_count + 1)
                return None

            # Check response structure
            if 'choices' not in result or len(result['choices']) == 0:
                print("    Invalid response structure")
                return None

            content = result['choices'][0]['message']['content']

            # Clean markdown formatting
            content = content.strip()
            if content.startswith('```json'):
                content = content[7:]
            if content.startswith('```'):
                content = content[3:]
            if content.endswith('```'):
                content = content[:-3]
            content = content.strip()

            return json.loads(content)
        else:
            print(f"    API Error {response.status_code}: {response.text[:100]}")
            return None

    except Exception as e:
        print(f"    Error: {e}")
        return None

def generate_mcq_question(question_text, difficulty, source):
    """Generate MCQ format"""

    prompt = f"""Convert this Flutter question into MCQ format.

Question: {question_text}
Difficulty: {difficulty}

Return JSON with this EXACT structure:
{{
  "id": "flutter-{source.lower()}-{difficulty}-001",
  "topic": "flutter",
  "difficulty": "{difficulty}",
  "type": "mcq",
  "question": "<question>",
  "options": ["<opt1>", "<opt2>", "<opt3>", "<opt4>"],
  "correctAnswer": 0,
  "source": "{source}"
}}

Requirements:
- Keep question clear and concise
- 4 plausible options
- correctAnswer is index 0-3
- Return ONLY JSON, no explanation"""

    return call_ai_api(prompt)

def generate_plain_question(question_text, difficulty, source):
    """Generate plain question with follow-ups"""

    prompt = f"""Convert this to a self-assessment question with follow-up MCQs.

Question: {question_text}
Difficulty: {difficulty}

Return JSON with this structure:
{{
  "id": "flutter-{source.lower()}-{difficulty}-plain-001",
  "topic": "flutter",
  "difficulty": "{difficulty}",
  "type": "plain",
  "question": "How comfortable are you with {question_text.lower()}?",
  "source": "{source}",
  "followUps": {{
    "easy": {{"question": "<easy mcq>", "options": ["a","b","c","d"], "correctAnswer": 0}},
    "medium": {{"question": "<medium mcq>", "options": ["a","b","c","d"], "correctAnswer": 0}},
    "hard": {{"question": "<hard mcq>", "options": ["a","b","c","d"], "correctAnswer": 0}}
  }}
}}

Return ONLY JSON"""

    return call_ai_api(prompt)

def load_progress():
    """Load progress from resume file"""
    progress_file = Path('scripts/progress.json')
    if progress_file.exists():
        with open(progress_file, 'r', encoding='utf-8') as f:
            return json.load(f)
    return {"last_index": -1, "generated_count": 0, "questions": []}

def save_progress(index, generated_questions):
    """Save progress after each successful generation"""
    progress_file = Path('scripts/progress.json')
    progress = {
        "last_index": index,
        "generated_count": len(generated_questions),
        "questions": generated_questions
    }
    with open(progress_file, 'w', encoding='utf-8') as f:
        json.dump(progress, f, indent=2, ensure_ascii=False)

def save_final_output(generated_questions):
    """Save final output to public folder"""
    output = {
        "topic": "flutter",
        "questions": generated_questions
    }

    output_file = Path('public/data/questions/flutter-generated.json')
    output_file.parent.mkdir(parents=True, exist_ok=True)

    with open(output_file, 'w', encoding='utf-8') as f:
        json.dump(output, f, indent=2, ensure_ascii=False)

    return output_file

def main():
    input_file = Path('scripts/questions_extracted.json')

    if not input_file.exists():
        print(f"Error: {input_file} not found")
        print("Run: python3 scripts/extract_questions.py first")
        return

    print("Loading extracted questions...")
    with open(input_file, 'r', encoding='utf-8') as f:
        extracted = json.load(f)

    print(f"Loaded {len(extracted)} questions")

    # Load progress
    progress = load_progress()
    start_index = progress['last_index'] + 1
    generated_questions = progress['questions']

    if start_index > 0:
        print(f"📂 Resuming from question {start_index + 1}")
        print(f"   Already generated: {len(generated_questions)} questions\n")
    else:
        print("🆕 Starting fresh generation\n")

    # Target
    target_total = 1000
    print(f"Target: {target_total} questions")
    print(f"Models: {', '.join(MODELS)}\n")

    counter = start_index
    skipped = 0

    try:
        for i in range(start_index, len(extracted)):
            if len(generated_questions) >= target_total:
                break

            item = extracted[i]
            question_text = item['question']
            difficulty = item['difficulty']
            source = item['source']

            print(f"[{i+1}/{len(extracted)}] Generating...", end=' ')

            # Mix: 60% MCQ, 40% Plain
            if counter % 5 < 3:  # MCQ
                result = generate_mcq_question(question_text, difficulty, source)
                if result:
                    result['id'] = f"flutter-gen-mcq-{counter:04d}"
                    generated_questions.append(result)
                    print(f"✓ MCQ ({len(generated_questions)}/{target_total})")

                    # Save progress after each successful generation
                    save_progress(i, generated_questions)
                else:
                    skipped += 1
                    print("✗ Skipped")
            else:  # Plain
                result = generate_plain_question(question_text, difficulty, source)
                if result:
                    result['id'] = f"flutter-gen-plain-{counter:04d}"
                    generated_questions.append(result)
                    print(f"✓ Plain ({len(generated_questions)}/{target_total})")

                    # Save progress after each successful generation
                    save_progress(i, generated_questions)
                else:
                    skipped += 1
                    print("✗ Skipped")

            counter += 1

            # Rate limiting
            time.sleep(1)

            # Also save to final output every 50 questions
            if len(generated_questions) > 0 and len(generated_questions) % 50 == 0:
                output_file = save_final_output(generated_questions)
                print(f"  💾 Saved: {output_file}")

    except KeyboardInterrupt:
        print("\n\n⚠️  Interrupted! Progress saved.")
        print(f"Generated so far: {len(generated_questions)} questions")
        print(f"Last processed index: {counter}")
        print("\nRun the script again to resume from where you left off.\n")
        return

    print(f"\n{'='*60}")
    print(f"Generation Complete!")
    print(f"Generated: {len(generated_questions)}")
    print(f"Skipped: {skipped}")
    print(f"{'='*60}\n")

    # Save final
    output_file = save_final_output(generated_questions)
    print(f"✓ Saved: {output_file}")

    # Clean up progress file on completion
    progress_file = Path('scripts/progress.json')
    if progress_file.exists():
        progress_file.unlink()
        print(f"✓ Cleaned up progress file")

    print(f"\nTo use: cp {output_file} public/data/questions/flutter.json")

if __name__ == "__main__":
    main()
