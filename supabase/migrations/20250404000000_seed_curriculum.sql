-- ============================================================================
-- COGNITRON — CURRICULUM SEED DATA MIGRATION
-- ============================================================================
-- Seeds levels, modules, lessons, and achievements for all 3 tracks:
--   Coding (4 levels), AI (4 levels), Chess (4 levels)
-- ============================================================================

-- ============================================================================
-- LEVELS
-- ============================================================================

-- CODING TRACK — 4 levels
INSERT INTO levels (track_id, name, level_order, description, xp_required, badge_emoji) VALUES
    ((SELECT id FROM tracks WHERE name = 'coding'), 'Explorer',  1, 'Scratch basics for ages 5-8 — drag-and-drop coding, animation, and simple games',        0, '🧭'),
    ((SELECT id FROM tracks WHERE name = 'coding'), 'Builder',   2, 'Python introduction for ages 9-12 — variables, loops, functions, and simple projects',  500, '🔨'),
    ((SELECT id FROM tracks WHERE name = 'coding'), 'Creator',   3, 'Web development for ages 13-15 — HTML, CSS, JavaScript, responsive design',            1500, '🎨'),
    ((SELECT id FROM tracks WHERE name = 'coding'), 'Innovator', 4, 'Full-stack development for ages 16-17 — React, APIs, databases, portfolio project',   3500, '🚀');

-- AI TRACK — 4 levels
INSERT INTO levels (track_id, name, level_order, description, xp_required, badge_emoji) VALUES
    ((SELECT id FROM tracks WHERE name = 'ai'), 'Curious',   1, 'What is AI? Ages 5-8 — voice assistants, image recognition games, AI art',                 0, '🔍'),
    ((SELECT id FROM tracks WHERE name = 'ai'), 'Thinker',   2, 'No-code ML for ages 9-12 — Teachable Machine, data patterns, chatbot building',          500, '🧠'),
    ((SELECT id FROM tracks WHERE name = 'ai'), 'Engineer',  3, 'Python ML for ages 13-15 — scikit-learn basics, datasets, simple models',               1500, '⚙️'),
    ((SELECT id FROM tracks WHERE name = 'ai'), 'Architect', 4, 'Deep learning intro for ages 16-17 — neural networks, NLP, AI ethics project',          3500, '🏛️');

-- CHESS TRACK — 4 levels
INSERT INTO levels (track_id, name, level_order, description, xp_required, badge_emoji) VALUES
    ((SELECT id FROM tracks WHERE name = 'chess'), 'Pawn',   1, 'Chess foundations for ages 5-8 — piece movement, capture, check, simple tactics',          0, '♟️'),
    ((SELECT id FROM tracks WHERE name = 'chess'), 'Knight', 2, 'Intermediate chess for ages 9-12 — openings, tactical patterns, puzzle solving',          500, '♞'),
    ((SELECT id FROM tracks WHERE name = 'chess'), 'Bishop', 3, 'Advanced chess for ages 13-15 — endgame technique, positional play, tournaments',       1500, '♝'),
    ((SELECT id FROM tracks WHERE name = 'chess'), 'Rook',   4, 'Competitive chess for ages 16-17 — advanced strategy, game analysis, rating improvement',3500, '♜');


-- ============================================================================
-- MODULES
-- ============================================================================
-- Helper aliases used throughout:
--   coding_level(N) = (SELECT id FROM levels WHERE track_id = (SELECT id FROM tracks WHERE name = 'coding') AND level_order = N)
--   ai_level(N)     = (SELECT id FROM levels WHERE track_id = (SELECT id FROM tracks WHERE name = 'ai')     AND level_order = N)
--   chess_level(N)  = (SELECT id FROM levels WHERE track_id = (SELECT id FROM tracks WHERE name = 'chess')  AND level_order = N)

-- ── CODING ── Explorer (Level 1) ──
INSERT INTO modules (level_id, name, module_order, description, lesson_count) VALUES
    ((SELECT id FROM levels WHERE track_id = (SELECT id FROM tracks WHERE name = 'coding') AND level_order = 1),
     'Scratch Fundamentals', 1, 'Learn the Scratch interface, sprites, and basic motion blocks', 4),
    ((SELECT id FROM levels WHERE track_id = (SELECT id FROM tracks WHERE name = 'coding') AND level_order = 1),
     'Animation & Simple Games', 2, 'Create animated stories and your first interactive game', 4);

-- ── CODING ── Builder (Level 2) ──
INSERT INTO modules (level_id, name, module_order, description, lesson_count) VALUES
    ((SELECT id FROM levels WHERE track_id = (SELECT id FROM tracks WHERE name = 'coding') AND level_order = 2),
     'Python Basics', 1, 'Variables, data types, input/output, and basic operations', 4),
    ((SELECT id FROM levels WHERE track_id = (SELECT id FROM tracks WHERE name = 'coding') AND level_order = 2),
     'Logic & Simple Projects', 2, 'Conditionals, loops, functions, and building small programs', 4);

-- ── CODING ── Creator (Level 3) ──
INSERT INTO modules (level_id, name, module_order, description, lesson_count) VALUES
    ((SELECT id FROM levels WHERE track_id = (SELECT id FROM tracks WHERE name = 'coding') AND level_order = 3),
     'HTML & CSS Foundations', 1, 'Structuring web pages, styling, layouts, and responsive design', 4),
    ((SELECT id FROM levels WHERE track_id = (SELECT id FROM tracks WHERE name = 'coding') AND level_order = 3),
     'JavaScript & Interactivity', 2, 'DOM manipulation, events, and building interactive mini-projects', 4);

-- ── CODING ── Innovator (Level 4) ──
INSERT INTO modules (level_id, name, module_order, description, lesson_count) VALUES
    ((SELECT id FROM levels WHERE track_id = (SELECT id FROM tracks WHERE name = 'coding') AND level_order = 4),
     'React & Frontend Architecture', 1, 'Components, state, props, and single-page applications', 4),
    ((SELECT id FROM levels WHERE track_id = (SELECT id FROM tracks WHERE name = 'coding') AND level_order = 4),
     'Backend, APIs & Portfolio', 2, 'REST APIs, databases, authentication, and portfolio project', 4);

-- ── AI ── Curious (Level 1) ──
INSERT INTO modules (level_id, name, module_order, description, lesson_count) VALUES
    ((SELECT id FROM levels WHERE track_id = (SELECT id FROM tracks WHERE name = 'ai') AND level_order = 1),
     'Meet the Machines', 1, 'Discover what AI is, voice assistants, and smart devices around us', 3),
    ((SELECT id FROM levels WHERE track_id = (SELECT id FROM tracks WHERE name = 'ai') AND level_order = 1),
     'AI Art & Image Fun', 2, 'Image recognition games, AI-generated art, and creative projects', 3);

-- ── AI ── Thinker (Level 2) ──
INSERT INTO modules (level_id, name, module_order, description, lesson_count) VALUES
    ((SELECT id FROM levels WHERE track_id = (SELECT id FROM tracks WHERE name = 'ai') AND level_order = 2),
     'Teachable Machine & Data Patterns', 1, 'Train your first ML model using Google Teachable Machine and explore data', 4),
    ((SELECT id FROM levels WHERE track_id = (SELECT id FROM tracks WHERE name = 'ai') AND level_order = 2),
     'Chatbots & Smart Applications', 2, 'Build a chatbot, explore recommendation systems, and AI assistants', 4);

-- ── AI ── Engineer (Level 3) ──
INSERT INTO modules (level_id, name, module_order, description, lesson_count) VALUES
    ((SELECT id FROM levels WHERE track_id = (SELECT id FROM tracks WHERE name = 'ai') AND level_order = 3),
     'Python for Data Science', 1, 'NumPy, pandas, data cleaning, and exploratory data analysis', 4),
    ((SELECT id FROM levels WHERE track_id = (SELECT id FROM tracks WHERE name = 'ai') AND level_order = 3),
     'Building ML Models', 2, 'Scikit-learn basics — classification, regression, and model evaluation', 4);

-- ── AI ── Architect (Level 4) ──
INSERT INTO modules (level_id, name, module_order, description, lesson_count) VALUES
    ((SELECT id FROM levels WHERE track_id = (SELECT id FROM tracks WHERE name = 'ai') AND level_order = 4),
     'Neural Networks & Deep Learning', 1, 'Perceptrons, neural network architecture, and intro to TensorFlow/Keras', 3),
    ((SELECT id FROM levels WHERE track_id = (SELECT id FROM tracks WHERE name = 'ai') AND level_order = 4),
     'NLP & AI Ethics', 2, 'Natural language processing, sentiment analysis, and responsible AI project', 3);

-- ── CHESS ── Pawn (Level 1) ──
INSERT INTO modules (level_id, name, module_order, description, lesson_count) VALUES
    ((SELECT id FROM levels WHERE track_id = (SELECT id FROM tracks WHERE name = 'chess') AND level_order = 1),
     'The Chessboard & Pieces', 1, 'Board setup, how each piece moves, and capturing', 4),
    ((SELECT id FROM levels WHERE track_id = (SELECT id FROM tracks WHERE name = 'chess') AND level_order = 1),
     'Check, Checkmate & Simple Tactics', 2, 'Understanding check, achieving checkmate, and basic tactical ideas', 4);

-- ── CHESS ── Knight (Level 2) ──
INSERT INTO modules (level_id, name, module_order, description, lesson_count) VALUES
    ((SELECT id FROM levels WHERE track_id = (SELECT id FROM tracks WHERE name = 'chess') AND level_order = 2),
     'Opening Principles', 1, 'Controlling the center, developing pieces, and king safety', 4),
    ((SELECT id FROM levels WHERE track_id = (SELECT id FROM tracks WHERE name = 'chess') AND level_order = 2),
     'Tactical Patterns', 2, 'Forks, pins, skewers, discovered attacks, and puzzle solving', 4);

-- ── CHESS ── Bishop (Level 3) ──
INSERT INTO modules (level_id, name, module_order, description, lesson_count) VALUES
    ((SELECT id FROM levels WHERE track_id = (SELECT id FROM tracks WHERE name = 'chess') AND level_order = 3),
     'Endgame Technique', 1, 'King and pawn endings, rook endings, and essential endgame patterns', 4),
    ((SELECT id FROM levels WHERE track_id = (SELECT id FROM tracks WHERE name = 'chess') AND level_order = 3),
     'Positional Play & Tournaments', 2, 'Pawn structure, piece activity, planning, and tournament preparation', 4);

-- ── CHESS ── Rook (Level 4) ──
INSERT INTO modules (level_id, name, module_order, description, lesson_count) VALUES
    ((SELECT id FROM levels WHERE track_id = (SELECT id FROM tracks WHERE name = 'chess') AND level_order = 4),
     'Advanced Strategy', 1, 'Prophylaxis, pawn breaks, imbalances, and complex middlegame plans', 3),
    ((SELECT id FROM levels WHERE track_id = (SELECT id FROM tracks WHERE name = 'chess') AND level_order = 4),
     'Game Analysis & Competitive Play', 2, 'Annotating master games, rating improvement plans, and competitive readiness', 3);


-- ============================================================================
-- LESSONS
-- ============================================================================
-- Shorthand for module references:
--   mod(track, level_order, module_order) =
--     (SELECT m.id FROM modules m
--      JOIN levels l ON l.id = m.level_id
--      WHERE l.track_id = (SELECT id FROM tracks WHERE name = track)
--        AND l.level_order = level_order
--        AND m.module_order = module_order)

-- ────────────────────────────────────────────────────────────────────────────
-- CODING TRACK
-- ────────────────────────────────────────────────────────────────────────────

-- Explorer — Module 1: Scratch Fundamentals
INSERT INTO lessons (module_id, name, lesson_order, description, duration_minutes, content_type) VALUES
    ((SELECT m.id FROM modules m JOIN levels l ON l.id = m.level_id WHERE l.track_id = (SELECT id FROM tracks WHERE name = 'coding') AND l.level_order = 1 AND m.module_order = 1),
     'Welcome to Scratch', 1, 'Explore the Scratch interface, create your first sprite, and make it move across the stage', 45, 'live'),
    ((SELECT m.id FROM modules m JOIN levels l ON l.id = m.level_id WHERE l.track_id = (SELECT id FROM tracks WHERE name = 'coding') AND l.level_order = 1 AND m.module_order = 1),
     'Motion & Looks Blocks', 2, 'Use motion and looks blocks to animate sprites — glide, turn, change size, and switch costumes', 45, 'practice'),
    ((SELECT m.id FROM modules m JOIN levels l ON l.id = m.level_id WHERE l.track_id = (SELECT id FROM tracks WHERE name = 'coding') AND l.level_order = 1 AND m.module_order = 1),
     'Sound & Events', 3, 'Add sounds, use event blocks to trigger actions, and create interactive sequences', 50, 'live'),
    ((SELECT m.id FROM modules m JOIN levels l ON l.id = m.level_id WHERE l.track_id = (SELECT id FROM tracks WHERE name = 'coding') AND l.level_order = 1 AND m.module_order = 1),
     'My First Scratch Project', 4, 'Combine everything learned to build a short animated story with sound effects', 60, 'project');

-- Explorer — Module 2: Animation & Simple Games
INSERT INTO lessons (module_id, name, lesson_order, description, duration_minutes, content_type) VALUES
    ((SELECT m.id FROM modules m JOIN levels l ON l.id = m.level_id WHERE l.track_id = (SELECT id FROM tracks WHERE name = 'coding') AND l.level_order = 1 AND m.module_order = 2),
     'Animated Stories', 1, 'Create multi-scene animated stories with dialogue, backdrops, and character interactions', 50, 'live'),
    ((SELECT m.id FROM modules m JOIN levels l ON l.id = m.level_id WHERE l.track_id = (SELECT id FROM tracks WHERE name = 'coding') AND l.level_order = 1 AND m.module_order = 2),
     'Loops & Repetition', 2, 'Use repeat and forever loops to create continuous animations and patterns', 45, 'practice'),
    ((SELECT m.id FROM modules m JOIN levels l ON l.id = m.level_id WHERE l.track_id = (SELECT id FROM tracks WHERE name = 'coding') AND l.level_order = 1 AND m.module_order = 2),
     'Chase Game Basics', 3, 'Build a simple chase game — keyboard controls, collision detection, and scoring', 60, 'live'),
    ((SELECT m.id FROM modules m JOIN levels l ON l.id = m.level_id WHERE l.track_id = (SELECT id FROM tracks WHERE name = 'coding') AND l.level_order = 1 AND m.module_order = 2),
     'Explorer Showcase', 4, 'Design and present your own Scratch game or animation as a final project', 60, 'assessment');

-- Builder — Module 1: Python Basics
INSERT INTO lessons (module_id, name, lesson_order, description, duration_minutes, content_type) VALUES
    ((SELECT m.id FROM modules m JOIN levels l ON l.id = m.level_id WHERE l.track_id = (SELECT id FROM tracks WHERE name = 'coding') AND l.level_order = 2 AND m.module_order = 1),
     'Hello Python', 1, 'Install Python, write your first program, and understand print, input, and comments', 60, 'live'),
    ((SELECT m.id FROM modules m JOIN levels l ON l.id = m.level_id WHERE l.track_id = (SELECT id FROM tracks WHERE name = 'coding') AND l.level_order = 2 AND m.module_order = 1),
     'Variables & Data Types', 2, 'Strings, integers, floats, booleans — store and manipulate data in variables', 60, 'practice'),
    ((SELECT m.id FROM modules m JOIN levels l ON l.id = m.level_id WHERE l.track_id = (SELECT id FROM tracks WHERE name = 'coding') AND l.level_order = 2 AND m.module_order = 1),
     'Operators & Expressions', 3, 'Arithmetic, comparison, and logical operators — building expressions and calculations', 55, 'live'),
    ((SELECT m.id FROM modules m JOIN levels l ON l.id = m.level_id WHERE l.track_id = (SELECT id FROM tracks WHERE name = 'coding') AND l.level_order = 2 AND m.module_order = 1),
     'Mini Calculator Project', 4, 'Build a calculator that takes user input and performs operations with error handling', 65, 'project');

-- Builder — Module 2: Logic & Simple Projects
INSERT INTO lessons (module_id, name, lesson_order, description, duration_minutes, content_type) VALUES
    ((SELECT m.id FROM modules m JOIN levels l ON l.id = m.level_id WHERE l.track_id = (SELECT id FROM tracks WHERE name = 'coding') AND l.level_order = 2 AND m.module_order = 2),
     'If/Else & Conditionals', 1, 'Control program flow with if, elif, and else — make decisions in code', 60, 'live'),
    ((SELECT m.id FROM modules m JOIN levels l ON l.id = m.level_id WHERE l.track_id = (SELECT id FROM tracks WHERE name = 'coding') AND l.level_order = 2 AND m.module_order = 2),
     'Loops: For & While', 2, 'Iterate with for loops and while loops — counting, patterns, and repetition', 60, 'practice'),
    ((SELECT m.id FROM modules m JOIN levels l ON l.id = m.level_id WHERE l.track_id = (SELECT id FROM tracks WHERE name = 'coding') AND l.level_order = 2 AND m.module_order = 2),
     'Functions & Code Reuse', 3, 'Define and call functions, pass parameters, return values, and keep code DRY', 65, 'live'),
    ((SELECT m.id FROM modules m JOIN levels l ON l.id = m.level_id WHERE l.track_id = (SELECT id FROM tracks WHERE name = 'coding') AND l.level_order = 2 AND m.module_order = 2),
     'Number Guessing Game', 4, 'Build a number guessing game using random, loops, functions, and user feedback', 70, 'project');

-- Creator — Module 1: HTML & CSS Foundations
INSERT INTO lessons (module_id, name, lesson_order, description, duration_minutes, content_type) VALUES
    ((SELECT m.id FROM modules m JOIN levels l ON l.id = m.level_id WHERE l.track_id = (SELECT id FROM tracks WHERE name = 'coding') AND l.level_order = 3 AND m.module_order = 1),
     'HTML Structure & Semantics', 1, 'Understand HTML documents — headings, paragraphs, lists, links, images, and semantic tags', 60, 'live'),
    ((SELECT m.id FROM modules m JOIN levels l ON l.id = m.level_id WHERE l.track_id = (SELECT id FROM tracks WHERE name = 'coding') AND l.level_order = 3 AND m.module_order = 1),
     'CSS Styling Essentials', 2, 'Selectors, properties, colors, fonts, spacing — bring your HTML pages to life', 60, 'practice'),
    ((SELECT m.id FROM modules m JOIN levels l ON l.id = m.level_id WHERE l.track_id = (SELECT id FROM tracks WHERE name = 'coding') AND l.level_order = 3 AND m.module_order = 1),
     'Flexbox & Grid Layouts', 3, 'Modern CSS layout techniques — build responsive page structures with flexbox and grid', 70, 'live'),
    ((SELECT m.id FROM modules m JOIN levels l ON l.id = m.level_id WHERE l.track_id = (SELECT id FROM tracks WHERE name = 'coding') AND l.level_order = 3 AND m.module_order = 1),
     'Personal Portfolio Page', 4, 'Design and code a responsive personal portfolio page from scratch', 75, 'project');

-- Creator — Module 2: JavaScript & Interactivity
INSERT INTO lessons (module_id, name, lesson_order, description, duration_minutes, content_type) VALUES
    ((SELECT m.id FROM modules m JOIN levels l ON l.id = m.level_id WHERE l.track_id = (SELECT id FROM tracks WHERE name = 'coding') AND l.level_order = 3 AND m.module_order = 2),
     'JavaScript Fundamentals', 1, 'Variables, functions, and control flow in JavaScript — the language of the web', 65, 'live'),
    ((SELECT m.id FROM modules m JOIN levels l ON l.id = m.level_id WHERE l.track_id = (SELECT id FROM tracks WHERE name = 'coding') AND l.level_order = 3 AND m.module_order = 2),
     'DOM Manipulation', 2, 'Select elements, change content, handle clicks — make web pages interactive', 65, 'practice'),
    ((SELECT m.id FROM modules m JOIN levels l ON l.id = m.level_id WHERE l.track_id = (SELECT id FROM tracks WHERE name = 'coding') AND l.level_order = 3 AND m.module_order = 2),
     'Events & Dynamic UI', 3, 'Event listeners, form validation, modals, and building dynamic user interfaces', 70, 'live'),
    ((SELECT m.id FROM modules m JOIN levels l ON l.id = m.level_id WHERE l.track_id = (SELECT id FROM tracks WHERE name = 'coding') AND l.level_order = 3 AND m.module_order = 2),
     'Interactive Quiz App', 4, 'Build a fully interactive quiz application with scoring, timer, and results screen', 80, 'project');

-- Innovator — Module 1: React & Frontend Architecture
INSERT INTO lessons (module_id, name, lesson_order, description, duration_minutes, content_type) VALUES
    ((SELECT m.id FROM modules m JOIN levels l ON l.id = m.level_id WHERE l.track_id = (SELECT id FROM tracks WHERE name = 'coding') AND l.level_order = 4 AND m.module_order = 1),
     'React Components & JSX', 1, 'Understand React philosophy — components, JSX syntax, and rendering UI', 75, 'live'),
    ((SELECT m.id FROM modules m JOIN levels l ON l.id = m.level_id WHERE l.track_id = (SELECT id FROM tracks WHERE name = 'coding') AND l.level_order = 4 AND m.module_order = 1),
     'State & Props', 2, 'Manage component state with useState, pass data via props, and handle user interactions', 75, 'practice'),
    ((SELECT m.id FROM modules m JOIN levels l ON l.id = m.level_id WHERE l.track_id = (SELECT id FROM tracks WHERE name = 'coding') AND l.level_order = 4 AND m.module_order = 1),
     'Hooks & Side Effects', 3, 'useEffect, custom hooks, and managing side effects — data fetching and lifecycle', 80, 'live'),
    ((SELECT m.id FROM modules m JOIN levels l ON l.id = m.level_id WHERE l.track_id = (SELECT id FROM tracks WHERE name = 'coding') AND l.level_order = 4 AND m.module_order = 1),
     'React Dashboard Project', 4, 'Build a multi-page dashboard app with routing, reusable components, and dynamic data', 90, 'project');

-- Innovator — Module 2: Backend, APIs & Portfolio
INSERT INTO lessons (module_id, name, lesson_order, description, duration_minutes, content_type) VALUES
    ((SELECT m.id FROM modules m JOIN levels l ON l.id = m.level_id WHERE l.track_id = (SELECT id FROM tracks WHERE name = 'coding') AND l.level_order = 4 AND m.module_order = 2),
     'REST APIs & Fetch', 1, 'Understand REST principles, consume APIs with fetch, and handle JSON responses', 75, 'live'),
    ((SELECT m.id FROM modules m JOIN levels l ON l.id = m.level_id WHERE l.track_id = (SELECT id FROM tracks WHERE name = 'coding') AND l.level_order = 4 AND m.module_order = 2),
     'Databases & Supabase', 2, 'Relational database concepts, SQL basics, and integrating Supabase as a backend', 80, 'practice'),
    ((SELECT m.id FROM modules m JOIN levels l ON l.id = m.level_id WHERE l.track_id = (SELECT id FROM tracks WHERE name = 'coding') AND l.level_order = 4 AND m.module_order = 2),
     'Authentication & Security', 3, 'User auth flows, JWT tokens, row-level security, and protecting routes', 80, 'live'),
    ((SELECT m.id FROM modules m JOIN levels l ON l.id = m.level_id WHERE l.track_id = (SELECT id FROM tracks WHERE name = 'coding') AND l.level_order = 4 AND m.module_order = 2),
     'Full-Stack Portfolio Project', 4, 'Build and deploy a complete full-stack application as your developer portfolio centerpiece', 90, 'assessment');

-- ────────────────────────────────────────────────────────────────────────────
-- AI TRACK
-- ────────────────────────────────────────────────────────────────────────────

-- Curious — Module 1: Meet the Machines
INSERT INTO lessons (module_id, name, lesson_order, description, duration_minutes, content_type) VALUES
    ((SELECT m.id FROM modules m JOIN levels l ON l.id = m.level_id WHERE l.track_id = (SELECT id FROM tracks WHERE name = 'ai') AND l.level_order = 1 AND m.module_order = 1),
     'What Is Artificial Intelligence?', 1, 'Discover what AI is through everyday examples — voice assistants, smart speakers, and recommendations', 45, 'live'),
    ((SELECT m.id FROM modules m JOIN levels l ON l.id = m.level_id WHERE l.track_id = (SELECT id FROM tracks WHERE name = 'ai') AND l.level_order = 1 AND m.module_order = 1),
     'Talking to Smart Devices', 2, 'Interact with voice assistants, explore how they understand speech, and try commands', 45, 'practice'),
    ((SELECT m.id FROM modules m JOIN levels l ON l.id = m.level_id WHERE l.track_id = (SELECT id FROM tracks WHERE name = 'ai') AND l.level_order = 1 AND m.module_order = 1),
     'Spot the AI Around Us', 3, 'Go on an AI scavenger hunt — find AI in games, apps, cars, and everyday objects', 50, 'project');

-- Curious — Module 2: AI Art & Image Fun
INSERT INTO lessons (module_id, name, lesson_order, description, duration_minutes, content_type) VALUES
    ((SELECT m.id FROM modules m JOIN levels l ON l.id = m.level_id WHERE l.track_id = (SELECT id FROM tracks WHERE name = 'ai') AND l.level_order = 1 AND m.module_order = 2),
     'Image Recognition Games', 1, 'Play games where AI identifies objects in photos — learn how computers see', 45, 'live'),
    ((SELECT m.id FROM modules m JOIN levels l ON l.id = m.level_id WHERE l.track_id = (SELECT id FROM tracks WHERE name = 'ai') AND l.level_order = 1 AND m.module_order = 2),
     'Create AI Art', 2, 'Use kid-friendly AI art tools to generate creative artwork and learn about style transfer', 50, 'practice'),
    ((SELECT m.id FROM modules m JOIN levels l ON l.id = m.level_id WHERE l.track_id = (SELECT id FROM tracks WHERE name = 'ai') AND l.level_order = 1 AND m.module_order = 2),
     'My AI Art Gallery', 3, 'Curate and present your collection of AI-generated artwork in a digital gallery', 55, 'project');

-- Thinker — Module 1: Teachable Machine & Data Patterns
INSERT INTO lessons (module_id, name, lesson_order, description, duration_minutes, content_type) VALUES
    ((SELECT m.id FROM modules m JOIN levels l ON l.id = m.level_id WHERE l.track_id = (SELECT id FROM tracks WHERE name = 'ai') AND l.level_order = 2 AND m.module_order = 1),
     'Train Your First Model', 1, 'Use Google Teachable Machine to train an image classifier with your webcam', 55, 'live'),
    ((SELECT m.id FROM modules m JOIN levels l ON l.id = m.level_id WHERE l.track_id = (SELECT id FROM tracks WHERE name = 'ai') AND l.level_order = 2 AND m.module_order = 1),
     'Understanding Data', 2, 'What makes good training data? Explore bias, accuracy, and data collection', 55, 'practice'),
    ((SELECT m.id FROM modules m JOIN levels l ON l.id = m.level_id WHERE l.track_id = (SELECT id FROM tracks WHERE name = 'ai') AND l.level_order = 2 AND m.module_order = 1),
     'Pattern Recognition', 3, 'Find patterns in data using charts and visualizations — weather, sports, and trends', 60, 'live'),
    ((SELECT m.id FROM modules m JOIN levels l ON l.id = m.level_id WHERE l.track_id = (SELECT id FROM tracks WHERE name = 'ai') AND l.level_order = 2 AND m.module_order = 1),
     'Sound & Pose Classifier', 4, 'Train audio and pose classifiers using Teachable Machine and test with friends', 60, 'project');

-- Thinker — Module 2: Chatbots & Smart Applications
INSERT INTO lessons (module_id, name, lesson_order, description, duration_minutes, content_type) VALUES
    ((SELECT m.id FROM modules m JOIN levels l ON l.id = m.level_id WHERE l.track_id = (SELECT id FROM tracks WHERE name = 'ai') AND l.level_order = 2 AND m.module_order = 2),
     'Build a Simple Chatbot', 1, 'Create a rule-based chatbot that answers questions about a topic you choose', 60, 'live'),
    ((SELECT m.id FROM modules m JOIN levels l ON l.id = m.level_id WHERE l.track_id = (SELECT id FROM tracks WHERE name = 'ai') AND l.level_order = 2 AND m.module_order = 2),
     'Recommendation Systems', 2, 'How does Netflix know what you like? Build a simple recommendation engine', 55, 'practice'),
    ((SELECT m.id FROM modules m JOIN levels l ON l.id = m.level_id WHERE l.track_id = (SELECT id FROM tracks WHERE name = 'ai') AND l.level_order = 2 AND m.module_order = 2),
     'AI Assistants in Action', 3, 'Explore how AI assistants schedule, translate, and summarize — build a mini assistant', 60, 'live'),
    ((SELECT m.id FROM modules m JOIN levels l ON l.id = m.level_id WHERE l.track_id = (SELECT id FROM tracks WHERE name = 'ai') AND l.level_order = 2 AND m.module_order = 2),
     'My Smart App Project', 4, 'Design and present your own AI-powered application concept with a working prototype', 65, 'project');

-- Engineer — Module 1: Python for Data Science
INSERT INTO lessons (module_id, name, lesson_order, description, duration_minutes, content_type) VALUES
    ((SELECT m.id FROM modules m JOIN levels l ON l.id = m.level_id WHERE l.track_id = (SELECT id FROM tracks WHERE name = 'ai') AND l.level_order = 3 AND m.module_order = 1),
     'NumPy & Arrays', 1, 'Introduction to NumPy — arrays, operations, and mathematical computing in Python', 70, 'live'),
    ((SELECT m.id FROM modules m JOIN levels l ON l.id = m.level_id WHERE l.track_id = (SELECT id FROM tracks WHERE name = 'ai') AND l.level_order = 3 AND m.module_order = 1),
     'Pandas DataFrames', 2, 'Load, explore, and manipulate datasets using pandas DataFrames', 70, 'practice'),
    ((SELECT m.id FROM modules m JOIN levels l ON l.id = m.level_id WHERE l.track_id = (SELECT id FROM tracks WHERE name = 'ai') AND l.level_order = 3 AND m.module_order = 1),
     'Data Cleaning & Preparation', 3, 'Handle missing values, filter data, and prepare datasets for machine learning', 65, 'live'),
    ((SELECT m.id FROM modules m JOIN levels l ON l.id = m.level_id WHERE l.track_id = (SELECT id FROM tracks WHERE name = 'ai') AND l.level_order = 3 AND m.module_order = 1),
     'Exploratory Data Analysis Project', 4, 'Analyze a real-world Kenyan dataset — visualize trends and present findings', 75, 'project');

-- Engineer — Module 2: Building ML Models
INSERT INTO lessons (module_id, name, lesson_order, description, duration_minutes, content_type) VALUES
    ((SELECT m.id FROM modules m JOIN levels l ON l.id = m.level_id WHERE l.track_id = (SELECT id FROM tracks WHERE name = 'ai') AND l.level_order = 3 AND m.module_order = 2),
     'Classification with Scikit-learn', 1, 'Train your first classifier — decision trees, features, labels, and predictions', 75, 'live'),
    ((SELECT m.id FROM modules m JOIN levels l ON l.id = m.level_id WHERE l.track_id = (SELECT id FROM tracks WHERE name = 'ai') AND l.level_order = 3 AND m.module_order = 2),
     'Regression & Prediction', 2, 'Linear regression — predict numerical values from data and evaluate accuracy', 70, 'practice'),
    ((SELECT m.id FROM modules m JOIN levels l ON l.id = m.level_id WHERE l.track_id = (SELECT id FROM tracks WHERE name = 'ai') AND l.level_order = 3 AND m.module_order = 2),
     'Model Evaluation & Tuning', 3, 'Accuracy, confusion matrices, cross-validation — measure and improve your models', 75, 'live'),
    ((SELECT m.id FROM modules m JOIN levels l ON l.id = m.level_id WHERE l.track_id = (SELECT id FROM tracks WHERE name = 'ai') AND l.level_order = 3 AND m.module_order = 2),
     'Nairobi Weather Predictor', 4, 'Build an ML model that predicts Nairobi weather patterns using historical data', 80, 'project');

-- Architect — Module 1: Neural Networks & Deep Learning
INSERT INTO lessons (module_id, name, lesson_order, description, duration_minutes, content_type) VALUES
    ((SELECT m.id FROM modules m JOIN levels l ON l.id = m.level_id WHERE l.track_id = (SELECT id FROM tracks WHERE name = 'ai') AND l.level_order = 4 AND m.module_order = 1),
     'How Neural Networks Work', 1, 'Perceptrons, layers, weights, and biases — understand the building blocks of deep learning', 80, 'live'),
    ((SELECT m.id FROM modules m JOIN levels l ON l.id = m.level_id WHERE l.track_id = (SELECT id FROM tracks WHERE name = 'ai') AND l.level_order = 4 AND m.module_order = 1),
     'Building with TensorFlow/Keras', 2, 'Create and train neural networks using TensorFlow and Keras — image classification', 80, 'practice'),
    ((SELECT m.id FROM modules m JOIN levels l ON l.id = m.level_id WHERE l.track_id = (SELECT id FROM tracks WHERE name = 'ai') AND l.level_order = 4 AND m.module_order = 1),
     'Convolutional Neural Networks', 3, 'CNNs for image recognition — filters, pooling, and building a digit classifier', 85, 'project');

-- Architect — Module 2: NLP & AI Ethics
INSERT INTO lessons (module_id, name, lesson_order, description, duration_minutes, content_type) VALUES
    ((SELECT m.id FROM modules m JOIN levels l ON l.id = m.level_id WHERE l.track_id = (SELECT id FROM tracks WHERE name = 'ai') AND l.level_order = 4 AND m.module_order = 2),
     'Natural Language Processing', 1, 'Tokenization, sentiment analysis, and text classification with Python NLP libraries', 80, 'live'),
    ((SELECT m.id FROM modules m JOIN levels l ON l.id = m.level_id WHERE l.track_id = (SELECT id FROM tracks WHERE name = 'ai') AND l.level_order = 4 AND m.module_order = 2),
     'AI Ethics & Responsible AI', 2, 'Bias in AI, fairness, privacy, and the social impact of artificial intelligence', 70, 'live'),
    ((SELECT m.id FROM modules m JOIN levels l ON l.id = m.level_id WHERE l.track_id = (SELECT id FROM tracks WHERE name = 'ai') AND l.level_order = 4 AND m.module_order = 2),
     'AI for Good — Capstone Project', 3, 'Design and build an AI solution addressing a real challenge in the Kenyan community', 90, 'assessment');

-- ────────────────────────────────────────────────────────────────────────────
-- CHESS TRACK
-- ────────────────────────────────────────────────────────────────────────────

-- Pawn — Module 1: The Chessboard & Pieces
INSERT INTO lessons (module_id, name, lesson_order, description, duration_minutes, content_type) VALUES
    ((SELECT m.id FROM modules m JOIN levels l ON l.id = m.level_id WHERE l.track_id = (SELECT id FROM tracks WHERE name = 'chess') AND l.level_order = 1 AND m.module_order = 1),
     'The Board & Setup', 1, 'Learn the chessboard — ranks, files, diagonals, and how to set up pieces correctly', 45, 'live'),
    ((SELECT m.id FROM modules m JOIN levels l ON l.id = m.level_id WHERE l.track_id = (SELECT id FROM tracks WHERE name = 'chess') AND l.level_order = 1 AND m.module_order = 1),
     'Pawns, Rooks & Bishops', 2, 'How pawns, rooks, and bishops move and capture — practice on the board', 45, 'practice'),
    ((SELECT m.id FROM modules m JOIN levels l ON l.id = m.level_id WHERE l.track_id = (SELECT id FROM tracks WHERE name = 'chess') AND l.level_order = 1 AND m.module_order = 1),
     'Knights, Queens & Kings', 3, 'The knight''s L-shape, the powerful queen, and the king''s special rules', 50, 'live'),
    ((SELECT m.id FROM modules m JOIN levels l ON l.id = m.level_id WHERE l.track_id = (SELECT id FROM tracks WHERE name = 'chess') AND l.level_order = 1 AND m.module_order = 1),
     'Special Moves', 4, 'Castling, en passant, and pawn promotion — the special rules of chess', 50, 'practice');

-- Pawn — Module 2: Check, Checkmate & Simple Tactics
INSERT INTO lessons (module_id, name, lesson_order, description, duration_minutes, content_type) VALUES
    ((SELECT m.id FROM modules m JOIN levels l ON l.id = m.level_id WHERE l.track_id = (SELECT id FROM tracks WHERE name = 'chess') AND l.level_order = 1 AND m.module_order = 2),
     'Understanding Check', 1, 'What is check? How to give check, block check, and escape check', 45, 'live'),
    ((SELECT m.id FROM modules m JOIN levels l ON l.id = m.level_id WHERE l.track_id = (SELECT id FROM tracks WHERE name = 'chess') AND l.level_order = 1 AND m.module_order = 2),
     'Checkmate Patterns', 2, 'Back-rank mate, scholar''s mate, and two-rook checkmate — winning the game', 50, 'practice'),
    ((SELECT m.id FROM modules m JOIN levels l ON l.id = m.level_id WHERE l.track_id = (SELECT id FROM tracks WHERE name = 'chess') AND l.level_order = 1 AND m.module_order = 2),
     'Stalemate & Draws', 3, 'Stalemate, repetition, insufficient material — not every game has a winner', 45, 'live'),
    ((SELECT m.id FROM modules m JOIN levels l ON l.id = m.level_id WHERE l.track_id = (SELECT id FROM tracks WHERE name = 'chess') AND l.level_order = 1 AND m.module_order = 2),
     'First Tournament Game', 4, 'Play a complete game with proper rules, notation, and sportsmanship', 60, 'assessment');

-- Knight — Module 1: Opening Principles
INSERT INTO lessons (module_id, name, lesson_order, description, duration_minutes, content_type) VALUES
    ((SELECT m.id FROM modules m JOIN levels l ON l.id = m.level_id WHERE l.track_id = (SELECT id FROM tracks WHERE name = 'chess') AND l.level_order = 2 AND m.module_order = 1),
     'Control the Center', 1, 'Why the center matters — e4, d4, and the fight for central squares', 55, 'live'),
    ((SELECT m.id FROM modules m JOIN levels l ON l.id = m.level_id WHERE l.track_id = (SELECT id FROM tracks WHERE name = 'chess') AND l.level_order = 2 AND m.module_order = 1),
     'Develop Your Pieces', 2, 'Knights before bishops, don''t move the same piece twice — opening principles in action', 55, 'practice'),
    ((SELECT m.id FROM modules m JOIN levels l ON l.id = m.level_id WHERE l.track_id = (SELECT id FROM tracks WHERE name = 'chess') AND l.level_order = 2 AND m.module_order = 1),
     'King Safety & Castling', 3, 'When to castle, which side, and keeping your king safe in the opening', 55, 'live'),
    ((SELECT m.id FROM modules m JOIN levels l ON l.id = m.level_id WHERE l.track_id = (SELECT id FROM tracks WHERE name = 'chess') AND l.level_order = 2 AND m.module_order = 1),
     'Opening Repertoire Builder', 4, 'Choose and practice your first opening repertoire for white and black', 60, 'project');

-- Knight — Module 2: Tactical Patterns
INSERT INTO lessons (module_id, name, lesson_order, description, duration_minutes, content_type) VALUES
    ((SELECT m.id FROM modules m JOIN levels l ON l.id = m.level_id WHERE l.track_id = (SELECT id FROM tracks WHERE name = 'chess') AND l.level_order = 2 AND m.module_order = 2),
     'Forks & Double Attacks', 1, 'Knight forks, pawn forks, and queen forks — attack two targets at once', 55, 'live'),
    ((SELECT m.id FROM modules m JOIN levels l ON l.id = m.level_id WHERE l.track_id = (SELECT id FROM tracks WHERE name = 'chess') AND l.level_order = 2 AND m.module_order = 2),
     'Pins & Skewers', 2, 'Pin pieces to the king, skewer valuable pieces — line-based tactics', 55, 'practice'),
    ((SELECT m.id FROM modules m JOIN levels l ON l.id = m.level_id WHERE l.track_id = (SELECT id FROM tracks WHERE name = 'chess') AND l.level_order = 2 AND m.module_order = 2),
     'Discovered Attacks & Deflection', 3, 'Revealed attacks, removing the guard, and deflection tactics', 60, 'live'),
    ((SELECT m.id FROM modules m JOIN levels l ON l.id = m.level_id WHERE l.track_id = (SELECT id FROM tracks WHERE name = 'chess') AND l.level_order = 2 AND m.module_order = 2),
     'Tactics Puzzle Challenge', 4, 'Solve 20 tactical puzzles covering forks, pins, skewers, and combinations', 60, 'assessment');

-- Bishop — Module 1: Endgame Technique
INSERT INTO lessons (module_id, name, lesson_order, description, duration_minutes, content_type) VALUES
    ((SELECT m.id FROM modules m JOIN levels l ON l.id = m.level_id WHERE l.track_id = (SELECT id FROM tracks WHERE name = 'chess') AND l.level_order = 3 AND m.module_order = 1),
     'King & Pawn Endings', 1, 'Opposition, key squares, and the rule of the square — master pawn endgames', 65, 'live'),
    ((SELECT m.id FROM modules m JOIN levels l ON l.id = m.level_id WHERE l.track_id = (SELECT id FROM tracks WHERE name = 'chess') AND l.level_order = 3 AND m.module_order = 1),
     'Rook Endings', 2, 'Lucena position, Philidor position, and active rook principles', 65, 'practice'),
    ((SELECT m.id FROM modules m JOIN levels l ON l.id = m.level_id WHERE l.track_id = (SELECT id FROM tracks WHERE name = 'chess') AND l.level_order = 3 AND m.module_order = 1),
     'Minor Piece Endings', 3, 'Bishop vs knight, good bishop vs bad bishop, and bishop pair advantage', 65, 'live'),
    ((SELECT m.id FROM modules m JOIN levels l ON l.id = m.level_id WHERE l.track_id = (SELECT id FROM tracks WHERE name = 'chess') AND l.level_order = 3 AND m.module_order = 1),
     'Endgame Drill Set', 4, 'Practice 15 essential endgame positions to mastery level', 70, 'practice');

-- Bishop — Module 2: Positional Play & Tournaments
INSERT INTO lessons (module_id, name, lesson_order, description, duration_minutes, content_type) VALUES
    ((SELECT m.id FROM modules m JOIN levels l ON l.id = m.level_id WHERE l.track_id = (SELECT id FROM tracks WHERE name = 'chess') AND l.level_order = 3 AND m.module_order = 2),
     'Pawn Structure & Strategy', 1, 'Isolated pawns, doubled pawns, pawn chains — how pawn structure guides plans', 70, 'live'),
    ((SELECT m.id FROM modules m JOIN levels l ON l.id = m.level_id WHERE l.track_id = (SELECT id FROM tracks WHERE name = 'chess') AND l.level_order = 3 AND m.module_order = 2),
     'Piece Activity & Outposts', 2, 'Active vs passive pieces, outposts, and improving your worst piece', 65, 'practice'),
    ((SELECT m.id FROM modules m JOIN levels l ON l.id = m.level_id WHERE l.track_id = (SELECT id FROM tracks WHERE name = 'chess') AND l.level_order = 3 AND m.module_order = 2),
     'Planning & Prophylaxis', 3, 'Formulate plans, anticipate opponent ideas, and think like a positional player', 70, 'live'),
    ((SELECT m.id FROM modules m JOIN levels l ON l.id = m.level_id WHERE l.track_id = (SELECT id FROM tracks WHERE name = 'chess') AND l.level_order = 3 AND m.module_order = 2),
     'Tournament Simulation', 4, 'Play in a simulated tournament with clocks, notation, and post-game analysis', 75, 'assessment');

-- Rook — Module 1: Advanced Strategy
INSERT INTO lessons (module_id, name, lesson_order, description, duration_minutes, content_type) VALUES
    ((SELECT m.id FROM modules m JOIN levels l ON l.id = m.level_id WHERE l.track_id = (SELECT id FROM tracks WHERE name = 'chess') AND l.level_order = 4 AND m.module_order = 1),
     'Prophylactic Thinking', 1, 'Petrosian-style prophylaxis — prevent your opponent''s plans before they happen', 75, 'live'),
    ((SELECT m.id FROM modules m JOIN levels l ON l.id = m.level_id WHERE l.track_id = (SELECT id FROM tracks WHERE name = 'chess') AND l.level_order = 4 AND m.module_order = 1),
     'Dynamic Pawn Breaks', 2, 'When and how to break pawn structures — timing, calculation, and practical examples', 75, 'practice'),
    ((SELECT m.id FROM modules m JOIN levels l ON l.id = m.level_id WHERE l.track_id = (SELECT id FROM tracks WHERE name = 'chess') AND l.level_order = 4 AND m.module_order = 1),
     'Imbalances & Compensation', 3, 'Material vs positional imbalances — exchange sacrifices, activity, and initiative', 80, 'live');

-- Rook — Module 2: Game Analysis & Competitive Play
INSERT INTO lessons (module_id, name, lesson_order, description, duration_minutes, content_type) VALUES
    ((SELECT m.id FROM modules m JOIN levels l ON l.id = m.level_id WHERE l.track_id = (SELECT id FROM tracks WHERE name = 'chess') AND l.level_order = 4 AND m.module_order = 2),
     'Annotating Master Games', 1, 'Study and annotate famous games — Morphy, Tal, Fischer, Carlsen', 75, 'live'),
    ((SELECT m.id FROM modules m JOIN levels l ON l.id = m.level_id WHERE l.track_id = (SELECT id FROM tracks WHERE name = 'chess') AND l.level_order = 4 AND m.module_order = 2),
     'Self-Analysis & Improvement Plan', 2, 'Analyze your own games, identify weaknesses, and create a targeted improvement plan', 70, 'practice'),
    ((SELECT m.id FROM modules m JOIN levels l ON l.id = m.level_id WHERE l.track_id = (SELECT id FROM tracks WHERE name = 'chess') AND l.level_order = 4 AND m.module_order = 2),
     'Competitive Readiness Assessment', 3, 'Final assessment — play rated games, demonstrate opening prep, and strategic thinking', 80, 'assessment');


-- ============================================================================
-- ACHIEVEMENTS
-- ============================================================================

-- ── Per-Track Mastery Badges (complete each level) ──

-- Coding mastery
INSERT INTO achievements (name, description, icon, track_id, category, criteria) VALUES
    ('Explorer Complete',   'Completed the Explorer level — Scratch basics mastered!',          '🧭', (SELECT id FROM tracks WHERE name = 'coding'), 'mastery', '{"level": "Explorer", "track": "coding"}'),
    ('Builder Complete',    'Completed the Builder level — Python fundamentals mastered!',       '🔨', (SELECT id FROM tracks WHERE name = 'coding'), 'mastery', '{"level": "Builder", "track": "coding"}'),
    ('Creator Complete',    'Completed the Creator level — Web development skills unlocked!',    '🎨', (SELECT id FROM tracks WHERE name = 'coding'), 'mastery', '{"level": "Creator", "track": "coding"}'),
    ('Innovator Complete',  'Completed the Innovator level — Full-stack developer status!',     '🚀', (SELECT id FROM tracks WHERE name = 'coding'), 'mastery', '{"level": "Innovator", "track": "coding"}');

-- AI mastery
INSERT INTO achievements (name, description, icon, track_id, category, criteria) VALUES
    ('Curious Complete',    'Completed the Curious level — AI awareness unlocked!',             '🔍', (SELECT id FROM tracks WHERE name = 'ai'), 'mastery', '{"level": "Curious", "track": "ai"}'),
    ('Thinker Complete',    'Completed the Thinker level — No-code ML skills mastered!',        '🧠', (SELECT id FROM tracks WHERE name = 'ai'), 'mastery', '{"level": "Thinker", "track": "ai"}'),
    ('Engineer Complete',   'Completed the Engineer level — Python ML skills unlocked!',        '⚙️', (SELECT id FROM tracks WHERE name = 'ai'), 'mastery', '{"level": "Engineer", "track": "ai"}'),
    ('Architect Complete',  'Completed the Architect level — Deep learning mastery achieved!',   '🏛️', (SELECT id FROM tracks WHERE name = 'ai'), 'mastery', '{"level": "Architect", "track": "ai"}');

-- Chess mastery
INSERT INTO achievements (name, description, icon, track_id, category, criteria) VALUES
    ('Pawn Complete',       'Completed the Pawn level — chess foundations established!',         '♟️', (SELECT id FROM tracks WHERE name = 'chess'), 'mastery', '{"level": "Pawn", "track": "chess"}'),
    ('Knight Complete',     'Completed the Knight level — tactical warrior!',                   '♞',  (SELECT id FROM tracks WHERE name = 'chess'), 'mastery', '{"level": "Knight", "track": "chess"}'),
    ('Bishop Complete',     'Completed the Bishop level — strategic thinker!',                  '♝',  (SELECT id FROM tracks WHERE name = 'chess'), 'mastery', '{"level": "Bishop", "track": "chess"}'),
    ('Rook Complete',       'Completed the Rook level — competitive player status!',            '♜',  (SELECT id FROM tracks WHERE name = 'chess'), 'mastery', '{"level": "Rook", "track": "chess"}');

-- ── Streak Achievements (global — no track_id) ──

INSERT INTO achievements (name, description, icon, track_id, category, criteria) VALUES
    ('Week Warrior',        'Maintained a 7-day learning streak — consistency is key!',         '🔥', NULL, 'streak', '{"streak_days": 7}'),
    ('Monthly Master',      'Maintained a 30-day learning streak — dedication unlocked!',       '⚡', NULL, 'streak', '{"streak_days": 30}'),
    ('Century Streak',      'Maintained a 100-day learning streak — legendary commitment!',     '💯', NULL, 'streak', '{"streak_days": 100}');

-- ── Special Achievements (global — no track_id) ──

INSERT INTO achievements (name, description, icon, track_id, category, criteria) VALUES
    ('First Steps',         'Completed your very first lesson on Cognitron!',                   '👣', NULL, 'special', '{"type": "first_lesson"}'),
    ('Project Pioneer',     'Submitted your first project — a maker is born!',                  '🏗️', NULL, 'special', '{"type": "first_project"}'),
    ('Tournament Ready',    'Completed all preparation for competitive play!',                  '🏆', NULL, 'special', '{"type": "tournament_ready"}');


-- ============================================================================
-- DONE — Curriculum seeded for all 3 tracks
-- ============================================================================
