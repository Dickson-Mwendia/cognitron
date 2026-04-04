# Cognitron — Curriculum Dashboard Structures

**Authors:** Virgil (Coding Education Lead) · Turk (AI Education Lead) · Livingston (Chess Academy Lead)
**Date:** July 2025
**Status:** Proposal — Ready for review

---

## Executive Summary

This document defines the curriculum architecture for Cognitron's student learning dashboard across all three tracks: **Coding**, **AI & Machine Learning**, and **Chess**. Each track is designed for learners aged 5–17, delivered in small groups (≤4 students) via home visits or live online sessions aligned with the Kenyan school calendar (3 terms: Jan–Apr, May–Aug, Sep–Dec).

The structures below power the student dashboard — what learners see when they log in, track progress, earn badges, and build portfolios. Every design decision reflects our premium positioning: these families invest KES 2M+/year in schooling and expect **exceptional, outcome-driven, portfolio-building education** — not worksheets.

---

# 🖥️ TRACK 1: CODING (Virgil)

## 1.1 Age Tiers & Level Progression

| Tier | Ages | Dashboard Label | Levels | Primary Language/Tool |
|------|------|-----------------|--------|-----------------------|
| **Little Explorers** | 5–7 | 🌱 Explorer | 1–2 | ScratchJr, Unplugged Activities |
| **Young Builders** | 8–10 | 🔨 Builder | 3–5 | Scratch, Micro:bit |
| **Rising Creators** | 11–13 | 🚀 Creator | 6–8 | Python, HTML/CSS/JS, App Inventor |
| **Elite Innovators** | 14–17 | 💡 Innovator | 9–12 | Python, JavaScript/React, Git, APIs, Databases |

**Total progression:** 12 levels, each taking approximately **one school term** (12 sessions) to complete. Exceptional students may accelerate; no student is held back by age alone — placement is by demonstrated skill.

---

## 1.2 Modules Per Level

### 🌱 EXPLORER TIER (Ages 5–7)

**Level 1 — "My First Code" (12 sessions)**
| Module | Sessions | Key Concepts | Capstone Project |
|--------|----------|--------------|------------------|
| A: Thinking Like a Computer | 3 | Sequencing, algorithms (unplugged), cause & effect | "Algorithm Art" — draw a picture by following instructions |
| B: ScratchJr Adventures | 5 | Characters, motion blocks, simple sequences | "My Story" — animated 3-scene story |
| C: Patterns & Loops | 4 | Repeating patterns, loops, intro to debugging | "Dance Party" — character performs a choreographed loop dance |

**Level 2 — "Code Stories" (12 sessions)**
| Module | Sessions | Key Concepts | Capstone Project |
|--------|----------|--------------|------------------|
| A: Interactive Stories | 4 | Events (tap, bump), message passing, dialogue | "Choose Your Adventure" — branching story |
| B: Simple Games | 4 | Score tracking, win/lose conditions, timers | "Catch the Stars" — simple collection game |
| C: Creative Showcase | 4 | Combining learned concepts, presentation skills | **Portfolio Piece:** "My World" — an interactive scene with narration, shared with parents |

---

### 🔨 BUILDER TIER (Ages 8–10)

**Level 3 — "Scratch Foundations" (12 sessions)**
| Module | Sessions | Key Concepts | Capstone Project |
|--------|----------|--------------|------------------|
| A: Variables & Data | 4 | Variables, score counters, user input, data types | "Quiz Master" — interactive quiz game |
| B: Game Mechanics | 4 | Gravity, collision, cloning, broadcasts | "Platform Jumper" — side-scrolling platformer |
| C: Art & Music Code | 4 | Pen extension, generative art, sound synthesis | **Portfolio Piece:** "Art Machine" — generative art gallery |

**Level 4 — "Scratch Mastery + Physical Computing" (12 sessions)**
| Module | Sessions | Key Concepts | Capstone Project |
|--------|----------|--------------|------------------|
| A: Advanced Scratch | 4 | Custom blocks (functions), lists, cloud variables | "Multiplayer Tag" — two-player networked game |
| B: Micro:bit Intro | 4 | Sensors, LEDs, physical I/O, radio communication | "Step Counter" — wearable pedometer |
| C: Connected Creations | 4 | Scratch ↔ Micro:bit integration, data logging | **Portfolio Piece:** "Smart Room" — room environment monitor with dashboard |

**Level 5 — "Bridge to Text Coding" (12 sessions)**
| Module | Sessions | Key Concepts | Capstone Project |
|--------|----------|--------------|------------------|
| A: Python First Steps | 4 | Print, input, variables, types, operators (via Trinket/Replit) | "Mad Libs Generator" — text-based story generator |
| B: Decisions & Loops | 4 | If/elif/else, while/for loops, debugging strategies | "Number Guessing Game" — with difficulty levels |
| C: Functions & Files | 4 | Defining functions, parameters, reading/writing files | **Portfolio Piece:** "Personal Journal App" — CLI app that saves entries to file |

---

### 🚀 CREATOR TIER (Ages 11–13)

**Level 6 — "Python Power" (12 sessions)**
| Module | Sessions | Key Concepts | Capstone Project |
|--------|----------|--------------|------------------|
| A: Data Structures | 4 | Lists, dictionaries, tuples, list comprehensions | "Contact Book" — searchable address book |
| B: OOP Fundamentals | 4 | Classes, objects, inheritance, encapsulation | "Virtual Pet" — Tamagotchi-style simulation |
| C: APIs & the Internet | 4 | HTTP requests, JSON, consuming REST APIs | **Portfolio Piece:** "Weather Dashboard" — pulls live Nairobi weather data and displays it |

**Level 7 — "Web Development" (12 sessions)**
| Module | Sessions | Key Concepts | Capstone Project |
|--------|----------|--------------|------------------|
| A: HTML & CSS | 4 | Structure, styling, responsive design, Flexbox/Grid | "My Portfolio Site" — personal landing page |
| B: JavaScript Basics | 4 | DOM manipulation, events, conditionals, functions | "Interactive Quiz Site" — web-based quiz with scoring |
| C: Full Page Projects | 4 | CSS animations, local storage, deployment (Netlify/Vercel) | **Portfolio Piece:** "Cognitron Student Showcase" — deployed personal portfolio site |

**Level 8 — "App Development" (12 sessions)**
| Module | Sessions | Key Concepts | Capstone Project |
|--------|----------|--------------|------------------|
| A: App Inventor / React Basics | 4 | Component-based thinking, state, props, UI design | "Task Manager App" — functional to-do app |
| B: Databases & Persistence | 4 | Firebase/Supabase, CRUD operations, authentication | "Study Group Chat" — real-time messaging app |
| C: Ship It | 4 | Testing, deployment, user feedback, iteration | **Portfolio Piece:** "Community App" — deployed app solving a real Nairobi problem (student's choice) |

---

### 💡 INNOVATOR TIER (Ages 14–17)

**Level 9 — "Software Engineering Foundations" (12 sessions)**
| Module | Sessions | Key Concepts | Capstone Project |
|--------|----------|--------------|------------------|
| A: Git & Collaboration | 4 | Version control, branching, pull requests, code review | Contribute to a team repository |
| B: Algorithms & Problem-Solving | 4 | Sorting, searching, Big-O basics, recursion | Solve 15+ coding challenges (LeetCode-style) |
| C: Design Patterns & Architecture | 4 | MVC, separation of concerns, clean code principles | **Portfolio Piece:** Refactor a messy codebase into clean architecture |

**Level 10 — "Full-Stack Development" (12 sessions)**
| Module | Sessions | Key Concepts | Capstone Project |
|--------|----------|--------------|------------------|
| A: Backend with Node.js/Python | 4 | Express/Flask, REST APIs, middleware, routing | Build a REST API with authentication |
| B: Frontend with React | 4 | React hooks, routing, state management, API integration | Connect frontend to custom backend |
| C: DevOps & Deployment | 4 | CI/CD basics, Docker intro, cloud deployment | **Portfolio Piece:** "Full-Stack SaaS App" — complete deployed application |

**Level 11 — "Specialization Sprint" (12 sessions)**
*Student chooses one track:*

| Specialization | Focus | Capstone |
|---------------|-------|----------|
| 🎮 Game Development | Unity/Godot, physics, 2D/3D game design | Published game on Itch.io |
| 📱 Mobile Development | React Native/Flutter, mobile UX, app store prep | App submitted to Google Play |
| 🌐 Open Source & Community | Contributing to open-source, technical writing, mentorship | Merged PR on a real open-source project |
| 🤖 Systems & Automation | Raspberry Pi, IoT, automation scripts, networking | Working IoT project (e.g., home automation) |

**Level 12 — "Capstone & Portfolio" (12 sessions)**
| Module | Sessions | Key Concepts | Capstone Project |
|--------|----------|--------------|------------------|
| A: Problem Discovery | 4 | User research, problem framing, solution design | Project proposal document |
| B: Build Sprint | 4 | Agile methodology, sprint planning, daily standups | Working MVP |
| C: Launch & Present | 4 | Demo day prep, pitch skills, portfolio curation | **Grand Portfolio Piece:** Polished project + GitHub + deployed demo + presentation video |

---

## 1.3 Single Lesson Structure (90 minutes)

Every coding lesson follows this rhythm:

| Phase | Duration | What Happens | Dashboard Element |
|-------|----------|--------------|-------------------|
| 🎯 **Warm-Up Challenge** | 10 min | Quick puzzle or debugging challenge related to last lesson | "Daily Challenge" widget — streak counter |
| 📖 **Concept Unlock** | 15 min | New concept introduced via story, demo, or visual analogy | "New Skill" animation — concept card unlocked |
| 👨‍💻 **Guided Build** | 20 min | Instructor and student build together step-by-step | Live code editor / workspace |
| 🚀 **Independent Challenge** | 25 min | Student applies concept to a new problem independently | "Challenge Mode" — difficulty selector (🌟🌟🌟) |
| 🎨 **Creative Extension** | 10 min | "Make it your own" — personalize, extend, or remix | Saved to student portfolio |
| 💬 **Reflect & Share** | 10 min | What did you learn? What was hard? Show your work | Reflection journal entry + screenshot capture |

**For ages 5–7:** Phases are shorter (60-min sessions), more movement breaks, more tangible/unplugged elements woven in.

---

## 1.4 Skills Tracked (Coding)

The dashboard tracks mastery across these skill dimensions:

**Computational Thinking**
- Sequencing · Pattern Recognition · Abstraction · Decomposition · Algorithm Design

**Programming Fundamentals**
- Variables · Data Types · Operators · Conditionals (if/else) · Loops (for/while) · Functions · Parameters/Arguments · Return Values · Scope

**Data & Structures**
- Lists/Arrays · Dictionaries/Objects · Strings · File I/O · JSON · Databases (CRUD)

**Software Practices**
- Debugging · Testing · Version Control (Git) · Code Review · Documentation · Clean Code

**Web & App**
- HTML · CSS · JavaScript DOM · Responsive Design · APIs · React Components · State Management · Deployment

**Maker & Physical**
- Micro:bit · Sensors · LEDs · Physical Prototyping · IoT Concepts

Each skill has **5 mastery stars** (Introduced → Practiced → Applied → Fluent → Mastered). Stars are earned through lesson activities, challenges, and project use.

---

## 1.5 Session & Duration Estimates

| Level | Sessions | Frequency | Calendar Duration |
|-------|----------|-----------|-------------------|
| Each Level (1–12) | 12 sessions | 1x/week during term | ~1 school term (12 weeks) |
| Each Module (A/B/C) | 4 sessions | 1x/week | ~4 weeks (1 month) |
| Full Explorer Tier | 24 sessions | 1x/week | ~2 terms |
| Full Builder Tier | 36 sessions | 1x/week | ~3 terms (1 year) |
| Full Creator Tier | 36 sessions | 1x/week | ~3 terms (1 year) |
| Full Innovator Tier | 48 sessions | 1x/week | ~4 terms (~1.3 years) |
| **Complete Coding Journey** | **144 sessions** | 1x/week | **~4 years** |

**Accelerated path:** Students taking 2 sessions/week can complete in ~2 years. Holiday intensives (5 sessions/week for 2 weeks) can fast-track by ~1 level per holiday.

---

# 🤖 TRACK 2: AI & MACHINE LEARNING (Turk)

## 2.1 Age Tiers & Level Progression

| Tier | Ages | Dashboard Label | Levels | Primary Tools |
|------|------|-----------------|--------|---------------|
| **AI Discoverers** | 5–7 | 🔮 Discoverer | 1–2 | Unplugged AI games, Teachable Machine, AI drawing tools |
| **AI Apprentices** | 8–10 | 🧪 Apprentice | 3–4 | Teachable Machine, Scratch + ML extensions, ChatGPT Kids |
| **AI Engineers** | 11–13 | ⚙️ Engineer | 5–7 | Python + sklearn, Teachable Machine, prompt engineering |
| **AI Architects** | 14–17 | 🧠 Architect | 8–10 | Python, TensorFlow/PyTorch, LLM APIs, Hugging Face |

**Total progression:** 10 levels. Designed to build intuition first, then theory, then practice.

---

## 2.2 Modules Per Level

### 🔮 DISCOVERER TIER (Ages 5–7)

**Level 1 — "What Is AI?" (12 sessions)**
| Module | Sessions | Key Concepts | Tools | Capstone Project |
|--------|----------|--------------|-------|------------------|
| A: Smart vs. Not Smart | 4 | What makes something "smart"? Sorting, classifying, patterns | Unplugged games, picture cards | "Smart Sort" — sort objects into categories like a computer would |
| B: Teaching Machines | 4 | Training (examples), prediction, right/wrong feedback | Teachable Machine (image) | "Train My Pet" — teach the computer to recognize your drawings |
| C: AI Art & Stories | 4 | AI as creative partner, human + AI collaboration | AI drawing tools (age-appropriate) | **Portfolio Piece:** "My AI Storybook" — illustrated story co-created with AI art tools |

**🛡️ Ethics Thread (woven in):** "Is the computer always right?" · "Who taught the computer?" · "Kind robots vs. mean robots"

**Level 2 — "AI All Around Us" (12 sessions)**
| Module | Sessions | Key Concepts | Tools | Capstone Project |
|--------|----------|--------------|-------|------------------|
| A: AI Detectives | 4 | Spotting AI in daily life (voice assistants, recommendations, games) | Field journal, observation games | "AI Spy Log" — a journal of AI found in their world |
| B: Sound & Vision | 4 | How computers "see" (images) and "hear" (audio) | Teachable Machine (audio + image) | "Sound Sorter" — classify animal sounds |
| C: Robot Friends | 4 | How robots use AI, sensors, and decision-making | Simple robotics (optional Micro:bit) | **Portfolio Piece:** "Design My Robot" — draw + describe a robot that solves a Nairobi problem (e.g., traffic helper, clean water finder) |

---

### 🧪 APPRENTICE TIER (Ages 8–10)

**Level 3 — "Machine Learning Playground" (12 sessions)**
| Module | Sessions | Key Concepts | Tools | Capstone Project |
|--------|----------|--------------|-------|------------------|
| A: Classification | 4 | Training data, labels, classification, accuracy | Teachable Machine, ML for Kids | "Wildlife Classifier" — identify Kenyan animals from photos |
| B: Scratch + AI | 4 | Integrating ML models into Scratch projects | Scratch + ML extensions | "Smart Game" — Scratch game that responds to hand gestures |
| C: Data Stories | 4 | What is data? Collecting, cleaning, bias in data | Spreadsheets, visual data tools | **Portfolio Piece:** "My Neighborhood Data" — collect and visualize data about their area |

**🛡️ Ethics Thread:** Bias in training data · "Garbage in, garbage out" · Fairness in AI decisions

**Level 4 — "Prompt Engineering & Generative AI" (12 sessions)**
| Module | Sessions | Key Concepts | Tools | Capstone Project |
|--------|----------|--------------|-------|------------------|
| A: Talking to AI | 4 | What is a prompt? Clear instructions, specificity, iteration | ChatGPT (supervised, age-appropriate) | "Prompt Portfolio" — best prompts and results collection |
| B: AI Creative Studio | 4 | Image generation, music generation, story co-writing | Age-appropriate generative AI tools | "AI Art Exhibition" — curated gallery of AI-assisted art |
| C: AI as Tool, Not Answer | 4 | Fact-checking AI, critical thinking, when AI is wrong | Comparison exercises | **Portfolio Piece:** "AI Helper App" — Scratch app that uses AI to help with a real task (homework helper, recipe finder, etc.) |

**🛡️ Ethics Thread:** AI hallucinations · Don't trust blindly · Plagiarism and originality · Digital citizenship

---

### ⚙️ ENGINEER TIER (Ages 11–13)

**Level 5 — "Python for AI" (12 sessions)**
| Module | Sessions | Key Concepts | Tools | Capstone Project |
|--------|----------|--------------|-------|------------------|
| A: Data with Python | 4 | Pandas basics, CSV loading, data exploration, visualization | Python, Pandas, Matplotlib | "Kenya Data Explorer" — visualize Kenyan population/weather/sports data |
| B: Your First ML Model | 4 | Train/test split, linear regression, decision trees, accuracy | Python, scikit-learn | "Score Predictor" — predict exam scores from study hours |
| C: Image Classification | 4 | Neural network intuition, CNNs conceptually, transfer learning | Teachable Machine → Python export | **Portfolio Piece:** "Kenyan Wildlife AI" — trained image classifier deployed as simple web app |

**🛡️ Ethics Thread:** Surveillance concerns · Algorithmic bias in real systems (hiring, policing) · Responsible AI development

**Level 6 — "Advanced Prompt Engineering & LLMs" (12 sessions)**
| Module | Sessions | Key Concepts | Tools | Capstone Project |
|--------|----------|--------------|-------|------------------|
| A: How LLMs Work | 4 | Tokens, context windows, temperature, system prompts | OpenAI Playground, local models | "Under the Hood" — experiment log showing how parameters change output |
| B: Building with APIs | 4 | API calls, prompt chaining, structured output, function calling | Python + OpenAI/Anthropic APIs | "Study Buddy Bot" — custom chatbot for a school subject |
| C: Evaluation & Safety | 4 | Prompt injection, jailbreaking, red-teaming, guardrails | Hands-on security exercises | **Portfolio Piece:** "Safe AI App" — chatbot with safety guardrails and evaluation metrics |

**Level 7 — "AI for Good" (12 sessions)**
| Module | Sessions | Key Concepts | Tools | Capstone Project |
|--------|----------|--------------|-------|------------------|
| A: AI & Society | 4 | AI in healthcare, agriculture, education, environment (African context) | Case studies, discussions | Research presentation on AI impact in Kenya |
| B: Data Science Project | 4 | Full pipeline: question → data → model → insight → presentation | Python, Jupyter, real datasets | "Nairobi Insights" — data science project using real Nairobi data |
| C: Ethical AI Design | 4 | Fairness metrics, explainability, human-in-the-loop, AI regulation | Frameworks, design exercises | **Portfolio Piece:** "AI Impact Report" — full research paper + presentation on an AI ethics topic |

---

### 🧠 ARCHITECT TIER (Ages 14–17)

**Level 8 — "Deep Learning" (12 sessions)**
| Module | Sessions | Key Concepts | Tools | Capstone Project |
|--------|----------|--------------|-------|------------------|
| A: Neural Networks from Scratch | 4 | Perceptrons, activation functions, backpropagation, gradient descent | Python + NumPy | Build a neural network from scratch (no libraries) |
| B: CNNs & Computer Vision | 4 | Convolutions, pooling, architectures (ResNet concepts), transfer learning | TensorFlow/Keras | "Vision App" — custom image classifier for a real use case |
| C: NLP & Text | 4 | Tokenization, embeddings, sentiment analysis, text classification | Hugging Face Transformers | **Portfolio Piece:** "Kenyan News Analyzer" — sentiment analysis of Kenyan news headlines |

**Level 9 — "Generative AI & Agents" (12 sessions)**
| Module | Sessions | Key Concepts | Tools | Capstone Project |
|--------|----------|--------------|-------|------------------|
| A: Fine-Tuning & RAG | 4 | Fine-tuning concepts, retrieval-augmented generation, vector databases | OpenAI API, Pinecone/Chroma | "Knowledge Bot" — RAG chatbot over custom document set |
| B: AI Agents & Automation | 4 | Tool use, multi-step reasoning, agent architectures, function calling | LangChain/CrewAI, Python | "Research Agent" — AI agent that can search, summarize, and report |
| C: Multimodal AI | 4 | Vision + language models, audio models, multimodal applications | GPT-4V, Whisper, DALL-E APIs | **Portfolio Piece:** "Multimodal Assistant" — app that processes text, images, and audio |

**Level 10 — "AI Capstone & Research" (12 sessions)**
| Module | Sessions | Key Concepts | Capstone Project |
|--------|----------|--------------|------------------|
| A: Research & Problem Selection | 4 | Literature review, problem scoping, hypothesis formation | Research proposal + dataset identification |
| B: Build & Experiment | 4 | Model development, experimentation, iteration, evaluation | Working prototype with metrics |
| C: Paper & Presentation | 4 | Technical writing, visualization, public speaking, peer review | **Grand Portfolio Piece:** Published research paper + deployed AI application + demo video + presentation to panel |

---

## 2.3 AI Prompt Engineering Across Ages

| Age Group | Prompt Engineering Approach | Example Activity |
|-----------|---------------------------|------------------|
| **5–7** | "Magic words" — learning that *how* you ask changes *what* you get | Ask an AI to draw "a cat" vs. "a fluffy orange cat sitting on a rainbow" — observe the difference |
| **8–10** | Structured prompting — role, task, format | "You are a friendly teacher. Explain photosynthesis like I'm 8. Use an analogy." — iterate and improve |
| **11–13** | Advanced techniques — chain-of-thought, few-shot, system prompts, temperature | Build a prompt library; A/B test prompts; create "prompt recipes" for different tasks |
| **14–17** | Engineering-level — prompt injection defense, API integration, evaluation frameworks, red-teaming | Build production-grade prompt pipelines with guardrails, logging, and evaluation metrics |

---

## 2.4 AI Safety & Ethics Framework

Ethics is not a standalone module — it's a **thread woven into every lesson**. Each level has an "Ethics Checkpoint" every 4 sessions:

| Tier | Ethics Focus | Checkpoint Format |
|------|-------------|-------------------|
| Discoverer (5–7) | "Is the computer always right?" · Kindness with AI · Human vs. machine | Story-based discussion + drawing |
| Apprentice (8–10) | Bias & fairness · AI mistakes · Plagiarism · Digital citizenship | Debate + journal entry |
| Engineer (11–13) | Surveillance · Algorithmic bias in real systems · Responsible development · Deepfakes | Case study analysis + group presentation |
| Architect (14–17) | AI regulation · Existential risk · Labor displacement · AI in Africa's context · Research ethics | Position paper + structured debate |

---

## 2.5 Single Lesson Structure — AI Track (90 minutes)

| Phase | Duration | What Happens | Dashboard Element |
|-------|----------|--------------|-------------------|
| 🧩 **AI Puzzle** | 10 min | "Can you beat the AI?" — prediction game or AI-vs-human challenge | "AI Challenge" streak tracker |
| 🔍 **Concept Discovery** | 15 min | Guided exploration: "What do you think will happen if...?" | "Concept Unlocked" card |
| 🧪 **Experiment Lab** | 25 min | Hands-on experimentation with AI tools/models | Experiment log with screenshots |
| 🛠️ **Build Phase** | 20 min | Apply concepts to build something new | Project workspace |
| 🛡️ **Ethics Moment** | 10 min | Brief ethics discussion tied to today's concept | Ethics journal entry |
| 📝 **Reflect & Log** | 10 min | Document findings, update experiment log, share with group | Reflection + experiment log entry |

---

## 2.6 Skills Tracked (AI)

**AI Literacy**
- AI Recognition · Human vs. AI Distinction · AI Applications Awareness · AI Limitations Understanding

**Data Skills**
- Data Collection · Data Cleaning · Data Visualization · Statistical Thinking · Bias Detection

**Machine Learning**
- Classification · Regression · Training/Testing · Model Evaluation · Feature Selection · Neural Networks · Transfer Learning

**Prompt Engineering**
- Clear Instruction Writing · Few-Shot Prompting · Chain-of-Thought · System Prompts · Prompt Evaluation · Safety Guardrails

**AI Engineering**
- API Integration · Model Deployment · Fine-Tuning · RAG Architecture · Agent Design · Multimodal Systems

**AI Ethics & Safety**
- Bias Awareness · Fairness Evaluation · Safety Testing · Critical Thinking · Responsible Development · AI Regulation Awareness

---

## 2.7 Session & Duration Estimates

| Level | Sessions | Calendar Duration |
|-------|----------|-------------------|
| Each Level (1–10) | 12 sessions | ~1 school term |
| Full Discoverer Tier | 24 sessions | ~2 terms |
| Full Apprentice Tier | 24 sessions | ~2 terms |
| Full Engineer Tier | 36 sessions | ~3 terms (1 year) |
| Full Architect Tier | 36 sessions | ~3 terms (1 year) |
| **Complete AI Journey** | **120 sessions** | **~3.3 years** |

---

# ♟️ TRACK 3: CHESS (Livingston)

## 3.1 Rating-Based Progression

Chess uniquely benefits from an objective rating system. Cognitron maps its levels to approximate rating bands while keeping the experience exciting for non-tournament players too.

| Tier | Dashboard Label | Levels | Approx. Rating (Elo) | FIDE Equivalent |
|------|-----------------|--------|-----------------------|-----------------|
| **Pawn** (Beginner) | ♟️ Pawn | 1–3 | Unrated – 800 | Beginner |
| **Knight** (Intermediate) | ♞ Knight | 4–6 | 800 – 1200 | Improving Club Player |
| **Rook** (Advanced) | ♜ Rook | 7–9 | 1200 – 1600 | Strong Club / National Junior |
| **King** (Elite) | ♚ King | 10–12 | 1600+ | Tournament / FIDE-rated |

**Age is not the primary factor** — a talented 8-year-old can be at Knight level while a beginner 15-year-old starts at Pawn. However, we structure the *teaching approach* by age (stories for 5–7, competitive analysis for 14–17).

---

## 3.2 Modules Per Level

### ♟️ PAWN TIER (Beginner — Unrated to ~800)

**Level 1 — "The Chess World" (12 sessions)**
| Module | Sessions | Focus | Activities |
|--------|----------|-------|------------|
| A: Meet the Pieces | 4 | Piece movement, capture, board orientation | "Piece Olympics" — each piece does an obstacle course; piece-specific mini-games |
| B: Your First Games | 4 | Check, checkmate, stalemate, special moves (castling, en passant) | Play simplified games (fewer pieces), solve 1-move checkmates |
| C: Thinking Ahead | 4 | Piece values, trading, 2-move thinking | **Milestone:** Win a game against another beginner using proper strategy |

**Level 2 — "Patterns & Tactics" (12 sessions)**
| Module | Sessions | Focus | Activities |
|--------|----------|-------|------------|
| A: Opening Principles | 4 | Control the center, develop pieces, king safety (no memorized openings yet) | Play openings and analyze — "What went wrong?" discussions |
| B: Basic Tactics | 4 | Forks, pins, skewers, discovered attacks | Daily puzzle sets (10 puzzles/session), pattern recognition games |
| C: Your First Tournament Prep | 4 | Clock management, notation, etiquette, handling nerves | **Milestone:** Participate in Cognitron internal mini-tournament; record games in notation |

**Level 3 — "Competitive Foundations" (12 sessions)**
| Module | Sessions | Focus | Activities |
|--------|----------|-------|------------|
| A: Endgame Essentials | 4 | King + pawn endings, opposition, basic rook endings | Endgame drill sets; play from endgame positions |
| B: Tactical Combinations | 4 | Double attacks, back rank mates, removing the guard, deflection | 20+ puzzles/session; timed tactical exercises |
| C: First Rated Games | 4 | Playing rated games online (Lichess/Chess.com), game analysis | **Milestone:** Achieve online rating; analyze 5 of your own games with instructor |

---

### ♞ KNIGHT TIER (Intermediate — ~800–1200)

**Level 4 — "Opening Repertoire" (12 sessions)**
| Module | Sessions | Focus | Activities |
|--------|----------|-------|------------|
| A: White Openings | 4 | 1.e4 systems (Italian Game, Scotch) — ideas over memorization | Study model games; play thematic games |
| B: Black Defenses | 4 | Responses to 1.e4 (Sicilian intro) and 1.d4 (Indian defenses intro) | Build a personal opening repertoire document |
| C: Opening Traps & Preparation | 4 | Common traps, how to prepare for opponents | **Milestone:** Documented personal opening repertoire (White + Black) |

**Level 5 — "Positional Chess" (12 sessions)**
| Module | Sessions | Focus | Activities |
|--------|----------|-------|------------|
| A: Pawn Structures | 4 | Isolated, doubled, passed pawns; pawn chains, pawn breaks | Analyze grandmaster games focused on pawn play |
| B: Piece Activity & Outposts | 4 | Good vs. bad bishops, knight outposts, rook on open files | Positional puzzles — "Find the best piece placement" |
| C: Planning & Strategy | 4 | Formulating plans, identifying weaknesses, prophylaxis | **Milestone:** Annotate 3 of your games with full strategic commentary |

**Level 6 — "Tournament Player" (12 sessions)**
| Module | Sessions | Focus | Activities |
|--------|----------|-------|------------|
| A: Time Management | 4 | Clock discipline, rapid vs. classical thinking, increment strategies | Timed practice games with analysis of time usage |
| B: Preparation & Psychology | 4 | Preparing for specific opponents, handling pressure, bounce-back from losses | Mock tournament scenarios, sports psychology basics |
| C: Tournament Execution | 4 | Playing in official tournaments, post-game analysis routine | **Milestone:** Compete in Kenya Chess Federation junior event or equivalent |

---

### ♜ ROOK TIER (Advanced — ~1200–1600)

**Level 7 — "Deep Tactics" (12 sessions)**
| Module | Sessions | Focus | Activities |
|--------|----------|-------|------------|
| A: Complex Combinations | 4 | Multi-move combinations, sacrificial attacks, calculation training | 30+ puzzles/session; blindfold visualization exercises |
| B: Attack & Defense | 4 | King attacks (opposite-side castling, Greek gift), defensive techniques | Study attacking masterpieces (Tal, Kasparov) |
| C: Calculation Training | 4 | Deep calculation (4–6 moves), candidate moves, elimination process | **Milestone:** Consistently solve 1400+ rated puzzles on Lichess |

**Level 8 — "Advanced Endgames" (12 sessions)**
| Module | Sessions | Focus | Activities |
|--------|----------|-------|------------|
| A: Rook Endgames | 4 | Lucena, Philidor, active rook principles, rook + pawn endings | Endgame tablebase training |
| B: Minor Piece Endgames | 4 | Bishop vs. knight, same/opposite colored bishops, fortress concepts | Practical endgame positions from real games |
| C: Complex Endgames | 4 | Queen endings, rook + minor piece, practical endgame decisions | **Milestone:** Pass Cognitron "Endgame Mastery" assessment (80%+ on 50 endgame positions) |

**Level 9 — "Opening Mastery" (12 sessions)**
| Module | Sessions | Focus | Activities |
|--------|----------|-------|------------|
| A: Deep Opening Study | 4 | Main lines to move 12–15, critical variations, novelty ideas | Build opening database; study with engine |
| B: Middlegame Plans from Openings | 4 | Typical middlegame structures arising from chosen openings | "Find the plan" exercises from opening positions |
| C: Preparation Routines | 4 | Using databases, engine analysis, preparing for specific opponents | **Milestone:** Comprehensive opening repertoire file; demonstrate preparation against a simulated opponent |

---

### ♚ KING TIER (Elite — ~1600+)

**Level 10 — "Master Studies" (12 sessions)**
| Module | Sessions | Focus | Activities |
|--------|----------|-------|------------|
| A: Classical Game Study | 4 | Analyzing games of world champions (Capablanca through Carlsen) | Annotate 2 grandmaster games per session |
| B: Modern Chess Ideas | 4 | Computer-influenced chess, dynamic play, positional sacrifices | Study modern elite games; discuss engine evaluations |
| C: Style Development | 4 | Identifying and developing personal playing style | **Milestone:** "My Chess Philosophy" document — analyzed strengths, weaknesses, and preferred style |

**Level 11 — "Competition Mastery" (12 sessions)**
| Module | Sessions | Focus | Activities |
|--------|----------|-------|------------|
| A: Tournament Strategy | 4 | Round-by-round strategy, rest, preparation between rounds | Simulate a multi-round tournament weekend |
| B: Rapid & Blitz Skills | 4 | Time pressure techniques, intuition training, flag management | Weekly rapid/blitz rated sessions |
| C: National Championship Prep | 4 | Peak performance timing, physical fitness for chess, mental preparation | **Milestone:** Compete in Kenya National Junior Championship (U7–U18 category) |

**Level 12 — "FIDE-Rated & Beyond" (12 sessions)**
| Module | Sessions | Focus | Activities |
|--------|----------|-------|------------|
| A: FIDE Rating Pathway | 4 | Playing FIDE-rated events, achieving a FIDE rating, international exposure | Registered with FIDE; play rated events |
| B: Coaching Others | 4 | Teaching chess to younger students, creating lesson plans, mentorship | Coach a Pawn-level student (supervised) |
| C: Chess + Life | 4 | Chess scholarships, college applications, chess as a lifelong pursuit | **Grand Milestone:** FIDE-rated player with documented tournament history + coaching experience + application-ready chess portfolio |

---

## 3.3 Single Lesson Structure — Chess (90 minutes)

| Phase | Duration | What Happens | Dashboard Element |
|-------|----------|--------------|-------------------|
| ♟️ **Puzzle Warm-Up** | 10 min | 5–10 tactical puzzles, timed (appropriate difficulty) | "Daily Puzzles" — streak counter + rating tracker |
| 📖 **Concept Lesson** | 20 min | Instructor teaches a concept with board demonstrations | "Concept Unlocked" card with example position |
| 🎮 **Guided Practice** | 15 min | Solve positions together applying the concept | Interactive board — try moves, see variations |
| ⚔️ **Play & Apply** | 25 min | Play a game (vs. student, instructor, or engine) focusing on today's concept | Game recorded + saved to "My Games" library |
| 🔍 **Game Review** | 15 min | Analyze the game played — key moments, mistakes, improvements | Annotated game with instructor comments |
| 📊 **Progress Check** | 5 min | Update rating, log puzzles, set goal for next session | Rating graph + session summary |

**For ages 5–7:** Sessions are 60 minutes. More story-based ("The knight goes on an adventure!"), physical board manipulation, chess-themed coloring/activities between focused segments.

---

## 3.4 Skills Tracked (Chess)

**Opening Knowledge**
- Opening Principles · Repertoire Depth (White) · Repertoire Depth (Black) · Trap Awareness

**Tactics**
- Forks · Pins · Skewers · Discovered Attacks · Back Rank · Combinations · Calculation Depth

**Strategy**
- Pawn Structure · Piece Activity · King Safety · Planning · Prophylaxis · Positional Sacrifice

**Endgame**
- King + Pawn · Rook Endings · Minor Piece Endings · Queen Endings · Practical Endgame Decisions

**Tournament Skills**
- Time Management · Notation · Etiquette · Psychological Resilience · Preparation Routine

**Progress Metrics**
- Puzzle Rating (Lichess/Chess.com) · Online Rapid Rating · Online Blitz Rating · FIDE Rating (when applicable) · Games Analyzed · Tournament Results

---

## 3.5 Online vs. In-Person Considerations

| Aspect | In-Person (Home Visit) | Online (Live) |
|--------|----------------------|---------------|
| **Board Setup** | Physical board + pieces (provided by Cognitron) — tactile, premium feel | Lichess/Chess.com interactive board — screen sharing |
| **Puzzle Training** | Physical puzzle sheets + board setup; then digital for timed drills | Fully digital; screen-based puzzle platforms |
| **Game Play** | Physical games recorded on notation sheets; instructor sets up positions | Online rated games; auto-recorded for later analysis |
| **Analysis** | Instructor moves pieces, explains variations physically; then engine review on screen | Screen share engine analysis; interactive "try this move" |
| **Best For** | Younger kids (5–9) who benefit from tactile learning; families who value the premium home experience | Older students (10+) comfortable with digital; students wanting rated online games; families with scheduling constraints |
| **Recommended Mix** | 2 in-person + 1 online per month (for students on weekly plans) | Flexible based on family preference |

---

## 3.6 Tournament Preparation Track

An optional overlay that students at Level 3+ can activate:

| Phase | Duration | Focus | Outcome |
|-------|----------|-------|---------|
| **Pre-Tournament** (4 weeks before) | 4 sessions | Opening preparation for expected opponents, endgame review, timed practice | Preparation file; mock games under tournament conditions |
| **Tournament Week** | 1–2 sessions | Light tactics, confidence-building, logistics review, rest strategy | "Ready to Play" checklist |
| **Post-Tournament** | 1–2 sessions | Full game analysis, lessons learned, rating change review | Tournament report in dashboard; updated goals |

**Tournament Calendar Alignment (Kenya):**
| Period | Major Events | Cognitron Action |
|--------|-------------|-----------------|
| Jan–Mar | School term opens; regional qualifiers | Internal rating games; prepare for qualifiers |
| April | Holiday break; Kenya National Junior Championship (typical) | Holiday intensive camp; tournament participation |
| May–Jul | Mid-year term; club championships | Rated online tournaments; prep for nationals |
| August | Holiday break; Africa Youth Championship qualifying | Intensive preparation for international qualification |
| Sep–Nov | Final school term; end-of-year championships | Tournament performance push; year-end Cognitron Championship |
| December | Holiday break | Fun chess events; family tournament; new-year goal setting |

---

## 3.7 Session & Duration Estimates

| Level | Sessions | Calendar Duration |
|-------|----------|-------------------|
| Each Level (1–12) | 12 sessions | ~1 school term |
| Full Pawn Tier | 36 sessions | ~3 terms (1 year) |
| Full Knight Tier | 36 sessions | ~3 terms (1 year) |
| Full Rook Tier | 36 sessions | ~3 terms (1 year) |
| Full King Tier | 36 sessions | ~3 terms (1 year) |
| **Complete Chess Journey** | **144 sessions** | **~4 years** |

---

# 🔗 TRACK 4: CROSS-TRACK CONSIDERATIONS

## 4.1 Cross-Track Projects — "Fusion Labs"

This is Cognitron's **killer differentiator**. No competitor in Nairobi offers projects that combine coding, AI, and chess. These are optional projects that appear on the dashboard when a student is enrolled in 2+ tracks.

| Fusion Project | Tracks | Ages | What Students Build | Why It's Exciting |
|---------------|--------|------|--------------------|--------------------|
| **"Chess Vision"** | Chess + AI | 8+ | AI that recognizes chess positions from a photo of a physical board | "Point your phone at any board and the AI tells you the best move" |
| **"Chess Engine Jr."** | Chess + Coding | 11+ | Simple chess engine in Python (minimax algorithm) | "You literally built a brain that plays chess" |
| **"AI Chess Coach"** | All Three | 13+ | Chatbot that analyzes your games and gives coaching advice using LLM + chess engine | "You built your own personal chess coach" |
| **"Strategy Game"** | Coding + Chess | 8+ | Original strategy board game coded in Scratch/Python with chess-inspired mechanics | "You invented a new game and coded it" |
| **"AI Art Gallery"** | Coding + AI | 8+ | Web gallery of AI-generated art with student-coded website | "You built a museum on the internet" |
| **"Smart Tutor"** | Coding + AI | 11+ | An AI-powered tutoring app for a school subject | "You built something that actually helps people study" |
| **"Data Grandmaster"** | AI + Chess | 13+ | Analyze 10,000 chess games to find patterns using Python + pandas | "You discovered what makes grandmasters different using data science" |
| **"The Cognitron Challenge"** | All Three | 10+ | Annual event: code a solution → get AI help → compete in chess tournament → combined score | "The ultimate brain triathlon" |

**Dashboard Treatment:** Fusion Labs appear as special "🔗 Fusion" badges, distinct from track-specific achievements. They count toward XP in all participating tracks.

---

## 4.2 Unified Gamification System

### XP & Leveling

| XP Source | Points | Notes |
|-----------|--------|-------|
| Complete a lesson | 100 XP | Base per session attended + completed |
| Daily challenge completed | 25 XP | One per track per day |
| Module capstone completed | 250 XP | Bonus for finishing a module project |
| Portfolio piece submitted | 500 XP | Major project milestones |
| Fusion Lab completed | 750 XP | Cross-track bonus |
| Help another student | 50 XP | Peer teaching / mentorship |
| Tournament participation | 200 XP | Chess tournaments or coding hackathons |
| Tournament top-3 finish | 500 XP | Competitive excellence |
| Ethics checkpoint completed | 100 XP | Rewarding ethical thinking |
| Streak bonus (5+ consecutive sessions) | 50 XP/session | Consistency reward |

**XP is unified across all tracks.** A student earns a **Cognitron Level** that reflects their total engagement, regardless of which tracks they study. This encourages multi-track exploration.

| Cognitron Level | XP Required | Title | Unlocks |
|----------------|-------------|-------|---------|
| 1–5 | 0–2,500 | Spark | Basic dashboard, avatar customization |
| 6–10 | 2,500–7,500 | Flame | Custom dashboard theme, peer messaging |
| 11–15 | 7,500–15,000 | Blaze | Fusion Lab access, mentorship opportunities |
| 16–20 | 15,000–30,000 | Inferno | Leaderboard featured, priority event registration |
| 21–25 | 30,000–60,000 | Nova | Alumni ambassador status, recommendation letter eligibility |
| 26–30 | 60,000+ | Supernova | Lifetime Cognitron membership, speaking at events |

---

## 4.3 Badge & Achievement Framework

Badges are **per-track** but displayed on a **unified profile**. Three categories:

### 🏆 Skill Badges (Per Track)
Earned by mastering specific skills (e.g., "Loop Master" in Coding, "Fork Finder" in Chess, "Data Detective" in AI).

| Track | Example Badges |
|-------|---------------|
| Coding | `Loop Master` · `Function Wizard` · `API Explorer` · `Full-Stack Hero` · `Open Source Contributor` |
| AI | `Data Detective` · `Model Trainer` · `Prompt Engineer` · `Ethics Champion` · `AI Architect` |
| Chess | `Fork Finder` · `Endgame Expert` · `Tournament Warrior` · `FIDE Rated` · `Chess Coach` |

### 🌟 Milestone Badges (Per Track)
Earned by completing major milestones (e.g., "Level 6 Complete", "First Tournament", "Portfolio Deployed").

### 🔗 Fusion Badges (Cross-Track)
Earned by completing Fusion Lab projects. These are the **most prestigious** badges.

| Badge | Requirement |
|-------|------------|
| `🔗 Dual Threat` | Complete a Fusion project combining any 2 tracks |
| `🔗 Triple Threat` | Complete a Fusion project involving all 3 tracks |
| `🔗 Cognitron Champion` | Win "The Cognitron Challenge" annual event |
| `🔗 Renaissance Mind` | Reach Level 6+ in all three tracks simultaneously |

### 📜 Special Badges
| Badge | Requirement |
|-------|------------|
| `🇰🇪 Kenya Proud` | Project uses Kenyan data, solves a Kenyan problem, or celebrates Kenyan culture |
| `🤝 Mentor` | Successfully mentor a younger/newer student |
| `🎤 Presenter` | Present work at a Cognitron event or external showcase |
| `📝 Published` | Publish work externally (app store, GitHub, tournament result, research paper) |

---

## 4.4 Term Structure — Kenyan School Calendar Alignment

| Term | Dates (Approx.) | Weeks | Cognitron Sessions | Focus |
|------|-----------------|-------|-------------------|-------|
| **Term 1** | Jan – early April | 12–13 weeks | 12 sessions | New level launch; fresh goals; assessment baseline |
| **April Holiday** | Mid-April (2–3 weeks) | 2–3 weeks | Holiday Intensive option (8–10 sessions) | Accelerated module; camp format; Fusion Labs; tournaments |
| **Term 2** | May – early August | 12–13 weeks | 12 sessions | Mid-year progression; tournament season prep |
| **August Holiday** | Mid-August (2–3 weeks) | 2–3 weeks | Holiday Intensive option (8–10 sessions) | Africa qualifying events; hackathons; special projects |
| **Term 3** | Sep – late November | 12–13 weeks | 12 sessions | Year-end push; portfolio finalization; showcase prep |
| **December Holiday** | Dec – early Jan (4–5 weeks) | 4–5 weeks | Holiday Intensive option (10–12 sessions) | Fun events; family tournaments; new track exploration; next-year planning |

**Session scheduling flexibility:**
- **During term:** 1x/week per track (families choose day/time). Students on multiple tracks can space sessions across the week.
- **During holidays:** Intensive mode — daily or multi-weekly sessions available. Great for catching up or accelerating.
- **Year plan:** A student doing 1 track at 1x/week completes ~1 level per term, ~3 levels per year. A student doing all 3 tracks at 1x/week each = 3 levels/year across 3 tracks.

---

## 4.5 Assessment & Progress Reporting

### For Students (Dashboard View)

| Element | Description | Update Frequency |
|---------|-------------|-----------------|
| **Level Progress Bar** | Visual bar showing % completion of current level per track | Real-time |
| **Skill Constellation** | Radar/spider chart showing mastery across skill dimensions | After each lesson |
| **Badge Gallery** | All earned badges displayed; grayed-out badges show what's next | On achievement |
| **Portfolio Gallery** | All major projects with screenshots/links, organized by track | On project completion |
| **Streak Counter** | Consecutive sessions attended | Daily |
| **XP & Cognitron Level** | Total XP earned, current Cognitron Level, next milestone | Real-time |
| **Chess Rating Graph** | Online + FIDE rating over time (chess track only) | After rated games |
| **Puzzle Stats** | Puzzles solved, accuracy, rating (chess) / challenges completed (coding/AI) | Real-time |

### For Parents (Report Card — Sent Termly)

Each term, parents receive a **Cognitron Progress Report** — a beautifully designed PDF and dashboard view:

| Section | Content |
|---------|---------|
| **Executive Summary** | "This term, [Name] completed Level 4 in Coding, Level 3 in Chess, and Level 2 in AI. They built 3 portfolio projects and earned 7 new badges." |
| **Track-by-Track Progress** | Detailed skill development per track with before/after comparisons |
| **Portfolio Highlights** | Showcase of best work with instructor commentary |
| **Instructor Notes** | Personalized qualitative feedback from each track instructor |
| **Strengths & Growth Areas** | What the student excels at; where they can improve |
| **Recommendations** | Suggested next-term focus, recommended Fusion Labs, tournament opportunities |
| **Attendance & Engagement** | Session attendance, streak data, participation quality |
| **Comparative Context** | "Your child is in the top 20% of Cognitron students at this level" (opt-in) |

### Assessment Methods (by Track)

| Method | Coding | AI | Chess |
|--------|--------|-----|-------|
| **Project-based** | ✅ Portfolio pieces per module | ✅ Experiment logs + AI apps | — |
| **Skill checks** | ✅ Coding challenges (auto-graded) | ✅ Concept quizzes | — |
| **Puzzle/Problem rating** | ✅ Challenge difficulty progression | ✅ AI puzzles | ✅ Tactical puzzle rating |
| **Game/Match performance** | — | — | ✅ Rating progression |
| **Peer review** | ✅ Code review (Level 9+) | ✅ Research review (Level 10) | ✅ Game analysis presentations |
| **Instructor rubric** | ✅ Per-project rubric | ✅ Per-project rubric | ✅ Per-game + per-skill rubric |
| **Self-reflection** | ✅ Journal entries | ✅ Experiment logs | ✅ Post-game self-analysis |
| **External validation** | GitHub portfolio, deployed apps | Published research, AI app | FIDE rating, tournament results |

---

## 4.6 What Makes This Premium

This curriculum justifies Cognitron's premium pricing through:

1. **Portfolio-driven outcomes:** Every student builds real, shareable, portfolio-worthy work — not just "completed a worksheet." A 10-year-old has a deployed website. A 14-year-old has a FIDE rating and a published AI research paper.

2. **Personalized progression:** Groups of ≤4 students mean genuinely individualized pacing. A gifted 8-year-old can work at Creator level while peers are at Builder — the system accommodates this.

3. **Cross-track integration:** No competitor in Nairobi combines coding, AI, and chess into Fusion Lab projects. "My child built an AI chess coach" is a story no other program can tell.

4. **Kenyan context:** Projects use Kenyan data, address Kenyan problems, and celebrate Kenyan culture — not generic Silicon Valley curricula. The "Kenya Proud" badge rewards this.

5. **University-ready portfolios:** By the top levels, students have GitHub profiles, deployed applications, published research, FIDE ratings, and tournament histories — exactly what ISK/Brookhouse parents want for Stanford/Oxford applications.

6. **Beautiful reporting:** Termly parent reports are designed to feel like receiving a report card from a world-class institution — not a printout from a coding bootcamp.

7. **Continuous engagement:** The XP system, streaks, badges, and Fusion Labs keep students excited between sessions. The dashboard is something they *want* to check.

---

*This document was jointly authored by the Cognitron curriculum team. It defines the structural blueprint for the student dashboard and should be used as the reference for frontend development, content creation, and instructor training.*
