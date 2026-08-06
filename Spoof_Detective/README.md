# Spoof Detective: A Phishing Simulation

A framework-free HTML, CSS, and JavaScript phishing simulation for high-school cybersecurity learners.

## Current student flow

**Read the message → Choose a response → Submit → Identify the strongest evidence for bonus points → Learn why → Next case**

### Step 1: Choose and submit a response

The learner answers the concrete question:

> **How should you handle this message?**

The three response choices are:

- **Report as phishing** — evidence strongly supports that the message is deceptive or trying to steal information.
- **Verify before acting** — evidence is incomplete or mixed, so the learner should confirm the request independently through a trusted source.
- **Proceed normally** — the sender, destination, request, and context consistently match an expected legitimate message.

Selecting a response does not immediately submit it. The learner reviews the selection and presses **Submit decision**.

### Step 2: Explain why for bonus points

A correct decision opens a second multiple-choice container:

> **Which clue best supports your decision?**

The learner chooses the strongest evidence from three options. A correct evidence answer earns **+25 bonus points**. Missing or skipping the evidence question does not remove the 100 points already earned for the correct decision and does not block mission progress.

## Scoring

- Correct decision: **100 points**
- Correct evidence explanation: **+25 bonus points**
- Incorrect decision: **0 points**, followed by an immediate debrief
- Mission unlocking: based on decision accuracy, not bonus points

## Deliberately simple design

- No lives
- No timer
- No confidence calibration
- No required evidence quotas
- No response-order puzzles
- No branching incident trees in standard gameplay
- Optional clickable clues
- Immediate debrief showing why, strongest evidence, and safest next step

## Project structure

```text
spoof-detective-full-codebase/
├── index.html
├── styles.css
├── data.js
├── game.js
├── build.py
├── assets/
│   └── detective-byte.png
└── dist/
    ├── spoof-detective.html
    ├── spoof-detective-offline.html
    └── spoof-detective-embed-snippet.html
```

## Run the editable source locally

From this directory:

```bash
python3 -m http.server 8000
```

Open `http://localhost:8000`.

## Build the distributable files

```bash
python3 build.py
```

The script creates:

- `dist/spoof-detective.html` — self-contained build using the Google Fonts import
- `dist/spoof-detective-offline.html` — fully offline self-contained build using local font fallbacks
- `dist/spoof-detective-embed-snippet.html` — direct-paste HTML/CSS/JavaScript embed

## Embed with an iframe

```html
<iframe
  src="/games/spoof-detective.html"
  title="Spoof Detective: A Phishing Simulation"
  style="width:100%;min-height:940px;border:0;display:block"
  loading="lazy"
  allow="fullscreen"
></iframe>
```

All styles are scoped beneath `#spoof-detective-embed`.

## JavaScript API

```js
SpoofDetectiveEmbed.startMission("recognize");
SpoofDetectiveEmbed.resume();
SpoofDetectiveEmbed.getState();
SpoofDetectiveEmbed.exportResults("csv");
```

## Storage and privacy

Progress is stored locally in the browser. The game does not automatically transmit learner data or analytics. The current session key is separate from older gameplay layouts, preventing an outdated partially completed case from being resumed in the new two-step flow.
