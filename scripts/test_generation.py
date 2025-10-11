#!/usr/bin/env python3
"""Test DeepSeek AI generation with 5 questions"""

import json
import requests
from pathlib import Path

OPENROUTER_API_KEY = "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"
# Try different working models
MODELS_TO_TRY = [
    "google/gemini-2.0-flash-exp:free",
    "meta-llama/llama-3.1-8b-instruct:free",
    "mistralai/mistral-7b-instruct:free",
    "deepseek/deepseek-chat-v3.1:free",
    "z-ai/glm-4.5-air:free",
    "qwen/qwen3-235b-a22b:free"
]

def test_mcq_generation():
    """Test generating one MCQ"""

    prompt = """Convert this Flutter question into MCQ format:

Question: What is Flutter?
Difficulty: basic

Generate JSON with this structure:
{
  "id": "test-001",
  "topic": "flutter",
  "difficulty": "basic",
  "type": "mcq",
  "question": "What is Flutter?",
  "options": ["option1", "option2", "option3", "option4"],
  "correctAnswer": 0,
  "source": "TEST"
}

Return ONLY the JSON object."""

    for model in MODELS_TO_TRY:
        print(f"\nTrying model: {model}")

        response = requests.post(
            url="https://openrouter.ai/api/v1/chat/completions",
            headers={
                "Authorization": f"Bearer {OPENROUTER_API_KEY}",
                "Content-Type": "application/json"
            },
            json={
                "model": model,
                "messages": [{"role": "user", "content": prompt}]
            },
            timeout=30
        )

        result = response.json()

        # Check for errors
        if 'error' in result:
            print(f"  ✗ Error: {result['error'].get('message', 'Unknown error')}")
            continue

        if response.status_code == 200:
            # Debug: Print full response structure
            print("API Response:")
            print(json.dumps(result, indent=2)[:500] + "...")

            # Check if response has expected structure
            if 'choices' not in result:
                print("  ✗ Response missing 'choices' field")
                continue

            if len(result['choices']) == 0:
                print("  ✗ 'choices' array is empty")
                continue

            if 'message' not in result['choices'][0]:
                print("  ✗ First choice missing 'message' field")
                continue

            content = result['choices'][0]['message']['content']

            # Clean formatting
            content = content.strip()
            if content.startswith('```json'):
                content = content[7:]
            if content.startswith('```'):
                content = content[3:]
            if content.endswith('```'):
                content = content[:-3]
            content = content.strip()

            try:
                mcq = json.loads(content)
                print(f"\n✓ SUCCESS with model: {model}")
                print(json.dumps(mcq, indent=2))
                return True
            except json.JSONDecodeError as e:
                print(f"  ✗ JSON Parse Error: {e}")
                print(f"  Content: {content[:200]}")
                continue
        else:
            print(f"  ✗ HTTP Error: {response.status_code}")
            continue

    print("\n✗ All models failed")
    return False

if __name__ == "__main__":
    print("Testing DeepSeek API connection...\n")
    test_mcq_generation()
