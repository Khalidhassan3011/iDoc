# Resume Feature - How It Works

## Overview

The `generate_mcq.py` script now has **automatic resume** functionality. It saves progress after every successful question generation, so you can stop and restart anytime without losing work.

## Key Features

✅ **Saves after each question** - No progress lost
✅ **Auto-resume on restart** - Just run the script again
✅ **Keyboard interrupt safe** - Press Ctrl+C anytime
✅ **Progress tracking** - Shows where you left off
✅ **Clean completion** - Auto-deletes progress file when done

## How It Works

### 1. Progress File

Location: `scripts/progress.json`

Contains:
```json
{
  "last_index": 42,
  "generated_count": 25,
  "questions": [...]
}
```

- `last_index`: Last processed question from extracted list
- `generated_count`: Total questions successfully generated
- `questions`: Array of all generated questions so far

### 2. Saving Strategy

**After each successful generation:**
- Updates `scripts/progress.json`
- Includes all questions generated so far

**Every 50 questions:**
- Also updates `public/data/questions/flutter-generated.json`
- This is your final output file

### 3. Resume Logic

**On script start:**
1. Checks if `scripts/progress.json` exists
2. If yes:
   - Loads all previously generated questions
   - Resumes from `last_index + 1`
   - Shows: "📂 Resuming from question X"
3. If no:
   - Starts fresh from index 0
   - Shows: "🆕 Starting fresh generation"

### 4. Interruption Handling

**If you press Ctrl+C:**
```
⚠️  Interrupted! Progress saved.
Generated so far: 123 questions
Last processed index: 199

Run the script again to resume from where you left off.
```

Progress is already saved (after each question), so you can restart immediately.

## Usage Examples

### Example 1: Normal Run

```bash
$ python3 scripts/generate_mcq.py

Loading extracted questions...
Loaded 660 questions
🆕 Starting fresh generation

Target: 1000 questions
Models: google/gemini-2.0-flash-exp:free, ...

[1/660] Generating... ✓ MCQ (1/1000)
[2/660] Generating... ✓ MCQ (2/1000)
[3/660] Generating... ✓ Plain (3/1000)
...
```

### Example 2: Resume After Interrupt

```bash
$ python3 scripts/generate_mcq.py

Loading extracted questions...
Loaded 660 questions
📂 Resuming from question 124
   Already generated: 75 questions

Target: 1000 questions
Models: google/gemini-2.0-flash-exp:free, ...

[124/660] Generating... ✓ MCQ (76/1000)
[125/660] Generating... ✓ Plain (77/1000)
...
```

### Example 3: Manual Stop

```bash
[150/660] Generating... ✓ MCQ (92/1000)
[151/660] Generating... ^C

⚠️  Interrupted! Progress saved.
Generated so far: 92 questions
Last processed index: 150

Run the script again to resume from where you left off.
```

Then restart:
```bash
$ python3 scripts/generate_mcq.py
# Resumes from question 151
```

### Example 4: Start Fresh

Delete progress file to restart:

```bash
$ rm scripts/progress.json
$ python3 scripts/generate_mcq.py
# Starts from beginning
```

## Files Created

During generation:
- `scripts/progress.json` - Resume state (deleted on completion)
- `public/data/questions/flutter-generated.json` - Final output (updated every 50 questions)

On completion:
- `scripts/progress.json` - **Deleted automatically**
- `public/data/questions/flutter-generated.json` - Final output with all questions

## Benefits

1. **No Time Wasted**: Can stop anytime, resume later
2. **Safe Interruptions**: Ctrl+C is safe, progress saved
3. **Network Issues**: If API fails, restart without losing work
4. **Flexible Schedule**: Generate 100 now, 900 later
5. **Easy Monitoring**: See exactly where you are

## Technical Details

- Progress saved synchronously after each question
- Uses JSON file for human-readable state
- Question index tracked separately from generated count (handles skipped questions)
- Final output file updated every 50 questions as backup
- Clean shutdown on completion (deletes progress file)

## Troubleshooting

**Progress not resuming?**
- Check if `scripts/progress.json` exists
- Make sure you're in the project root directory

**Want to see current progress?**
```bash
cat scripts/progress.json | python3 -m json.tool | head -20
```

**Corrupted progress file?**
```bash
rm scripts/progress.json
# Restart from beginning
```
