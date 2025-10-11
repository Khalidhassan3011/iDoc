# Quick Start: Generate 1000+ Flutter Questions

## Step 1: Install Dependencies

```bash
pip3 install requests
```

## Step 2: Extract Questions (Already Done!)

```bash
python3 scripts/extract_questions.py
```

✅ **Result**: 660 questions extracted from MDX files

## Step 3: Generate MCQ Format with AI

```bash
python3 scripts/generate_mcq.py
```

This will:
- Use Google Gemini (free tier) to convert questions
- Generate 1000 questions (60% MCQ, 40% Plain with follow-ups)
- Save checkpoints every 50 questions
- Take ~30-45 minutes

**Output**: `public/data/questions/flutter-generated.json`

## Step 4: Use Generated Questions

```bash
# Backup original
cp public/data/questions/flutter.json public/data/questions/flutter-original.json

# Use generated questions
cp public/data/questions/flutter-generated.json public/data/questions/flutter.json
```

## Test First (Recommended)

```bash
# Test API connection
python3 scripts/test_generation.py
```

Should show: `✓ SUCCESS with model: google/gemini-2.0-flash-exp:free`

## Adjust Settings

Edit `scripts/generate_mcq.py` line 147:

```python
target_total = 1000  # Change to 2000 for more questions
```

## Auto-Resume Feature ⭐

The script automatically saves progress after **every successful question**:

- **Progress file**: `scripts/progress.json`
- **Output updates**: `public/data/questions/flutter-generated.json` (every 50 questions)

### If Interrupted:

Just run the script again:

```bash
python3 scripts/generate_mcq.py
```

It will automatically:
1. Detect `scripts/progress.json`
2. Load all previously generated questions
3. Resume from the next question
4. Continue until target reached

### Manual Stop:

Press `Ctrl+C` to stop safely. Progress is saved immediately.

### Start Fresh:

To restart from beginning, delete progress file:

```bash
rm scripts/progress.json
python3 scripts/generate_mcq.py
```

## Troubleshooting

**Rate Limited**: Script automatically switches models and waits

**Connection Error**: Check internet connection

**Invalid JSON**: Some questions may be skipped, script continues

## Status

- ✅ Extraction: 660 base questions
- ✅ Test: API working with Google Gemini
- ⏳ Generation: Ready to run `python3 scripts/generate_mcq.py`
