# Flutter Question Generation Scripts

Generate 1000+ dynamic Flutter interview questions using AI.

## Setup

1. **Install Python dependencies:**
   ```bash
   pip install -r requirements.txt
   ```

## Usage

### Step 1: Extract Questions from MDX Files

```bash
python3 scripts/extract_questions.py
```

This will:
- Parse all MDX files in `content/docs/flutter/`
- Extract question-answer pairs
- Auto-detect difficulty levels
- Output: `scripts/questions_extracted.json` (~300-500 questions)

### Step 2: Generate MCQ Format with AI

```bash
python3 scripts/generate_mcq.py
```

This will:
- Use DeepSeek AI (via OpenRouter) to convert questions
- Generate MCQ format with 4 options
- Generate plain questions with follow-up verification MCQs
- Mix: 60% MCQ, 40% Plain
- Target: 1000 questions (adjust in script)
- Output: `public/data/questions/flutter-generated.json`

**Note:** Generation takes ~15-30 minutes with rate limiting

### Step 3: Use Generated Questions

Replace the existing question file:

```bash
cp public/data/questions/flutter-generated.json public/data/questions/flutter.json
```

Or keep both and switch as needed!

## Configuration

Edit `generate_mcq.py` to adjust:
- `target_total = 1000` - Change to 2000 for more questions
- `time.sleep(0.5)` - Adjust rate limiting
- Mix ratio (60/40) - Change MCQ vs Plain proportion

## Features

- ✅ Auto-extracts from existing MDX documentation
- ✅ AI-powered MCQ generation
- ✅ Follow-up verification questions
- ✅ Checkpoint saves every 50 questions
- ✅ Free API (DeepSeek v3.1)
- ✅ No manual work required

## Troubleshooting

**"API Error 429"**: Rate limit hit, increase `time.sleep()` value

**"No questions extracted"**: Check MDX file format has `## Number. Question` headers

**"JSON decode error"**: AI returned invalid JSON, will skip and continue
