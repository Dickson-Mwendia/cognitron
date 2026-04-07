import Link from "next/link";
import { Trophy, ArrowRight, Target, Clock, Eye, ShieldCheck } from "lucide-react";
import { LearningPath } from "@/components/LearningPath";
import type { Metadata } from "next";

export const dynamic = 'force-static'

export const metadata: Metadata = {
  title: "Chess Lessons for Kids Nairobi | Cognitron Academy | Tournament Prep",
  description:
    "Personal chess coaching from rated players. Classical training, Stockfish analysis, tournament preparation. Ages 6–17. At your home in Nairobi or online.",
  openGraph: {
    title: "Chess Lessons for Kids Nairobi | Cognitron Academy | Tournament Prep",
    description:
      "Personal chess coaching from rated players. Classical training, Stockfish analysis, tournament preparation. Ages 6–17. At your home in Nairobi or online.",
    url: "/academy/chess",
    images: [{ url: "/og-image.jpg", width: 1200, height: 630, alt: "Cognitron — Chess Coaching & Tournament Prep for Kids in Nairobi" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Chess Lessons for Kids Nairobi | Cognitron Academy | Tournament Prep",
    description:
      "Personal chess coaching from rated players. Classical training, Stockfish analysis, tournament preparation. Ages 6–17. At your home in Nairobi or online.",
    images: ["/og-image.jpg"],
  },
};

const chessLevels = [
  {
    name: "Explorer",
    badge: "🌱",
    term: "Term 1",
    skills: [
      "Piece movement & board geometry",
      "Basic checkmate patterns",
      "Opening principles",
      "Daily puzzle habit (Lichess)",
    ],
    project: "Play and analyse a 10-game series against their coach with full review",
  },
  {
    name: "Builder",
    badge: "🔨",
    term: "Term 2",
    skills: [
      "Tactical motifs (forks, pins, skewers)",
      "Pawn structure understanding",
      "Middlegame planning",
      "Stockfish game analysis",
    ],
    project: "Enter and complete their first rated tournament (online or over-the-board)",
  },
  {
    name: "Creator",
    badge: "⚡",
    term: "Term 3",
    skills: [
      "Endgame technique & opposition",
      "Personal opening repertoire",
      "Clock management & psychology",
      "Self-directed study habits",
    ],
    project: "Build a personal opening repertoire document and present their preparation",
  },
  {
    name: "Architect",
    badge: "🏆",
    term: "Term 4+",
    skills: [
      "Advanced positional play",
      "Regular tournament participation",
      "Help coach younger students",
      "Work toward a rated chess profile",
    ],
    project: "Compete regularly in rated events and maintain a personal game analysis journal",
  },
];

const curriculum = [
  {
    module: "Foundations & vision",
    weeks: "Weeks 1–4",
    topics: [
      "Piece movement, board geometry, and coordination drills",
      "Basic checkmate patterns: back rank, two rooks, queen & king",
      "Opening principles: centre control, development, king safety",
      "Daily puzzles: forks, pins, and simple combinations (Lichess)",
    ],
  },
  {
    module: "Tactical & positional play",
    weeks: "Weeks 5–8",
    topics: [
      "Intermediate tactics: discovered attacks, deflection, decoys",
      "Pawn structure and positional understanding (isolani, passed pawns, pawn chains)",
      "Middlegame planning: identifying weaknesses, creating targets",
      "Game analysis with Stockfish, learning to use engine evaluation, not just follow it",
    ],
  },
  {
    module: "Competition & mastery",
    weeks: "Weeks 9–12",
    topics: [
      "Endgame technique: king and pawn, rook endgames, opposition",
      "Opening repertoire: building a personal set of openings for both colours",
      "Tournament preparation: clock management, psychology, between-round routines",
      "Simul match and post-game analysis: thinking out loud with a coach",
    ],
  },
];

export default function ChessPage() {
  return (
    <>
      <section className="bg-navy text-white py-20 md:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-lg bg-white/10 flex items-center justify-center">
              <Trophy className="w-5 h-5 text-gold" />
            </div>
            <span className="text-xs font-semibold text-gold uppercase tracking-wider">
              Ages 6–17
            </span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold leading-tight max-w-3xl">
            A classical chess education
          </h1>
          <p className="mt-6 text-lg text-white/70 max-w-2xl leading-relaxed">
            Our students learn from rated coaches who sit across the board,
            watch how they think, and shape their development move by move.
            We combine classical training methods with modern engine
            analysis, personalised to your child&apos;s rating, age, and
            ambition. The result: young thinkers who see the board deeply,
            build plans confidently, and carry that discipline into every
            part of life.
          </p>
        </div>
      </section>

      {/* Why Chess */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-navy mb-3">
            Why Chess matters more than you think
          </h2>
          <p className="text-slate mb-8 max-w-2xl">
            Research-backed cognitive benefits that extend far beyond the
            64 squares.
          </p>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                icon: Target,
                title: "Decision making under pressure",
                desc: "Every move is a decision with consequences. Your child practises structured thinking: weighing options, anticipating responses, committing to a plan. Hundreds of times per session.",
              },
              {
                icon: Clock,
                title: "Deep focus & patience",
                desc: "In a world of 15-second attention spans, chess demands sustained concentration. A single game can last an hour. That capacity for deep work transfers to academics and beyond.",
              },
              {
                icon: Eye,
                title: "Pattern recognition",
                desc: "Grandmasters recognise ~100,000 patterns. Even beginners start building a mental library of tactical motifs, the same cognitive skill behind reading code, mathematical reasoning, and scientific deduction.",
              },
              {
                icon: ShieldCheck,
                title: "Emotional resilience",
                desc: "Chess teaches children to lose with dignity, analyse their own mistakes honestly, and come back with a better plan. No other activity builds this combination of humility and determination as naturally.",
              },
            ].map((item) => (
              <div
                key={item.title}
                className="bg-off-white rounded-xl p-6 border border-navy/5"
              >
                <item.icon className="w-8 h-8 text-gold mb-3" />
                <h3 className="font-bold text-navy text-sm">{item.title}</h3>
                <p className="mt-2 text-xs text-slate leading-relaxed">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why We're Different */}
      <section className="py-16 bg-off-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-navy mb-8">
            What sets our programme apart
          </h2>
          <div className="space-y-6">
            {[
              {
                label: "Personal coaching from rated players",
                detail:
                  "Every student works directly with a coach who can watch their face when they're stuck, ask 'what were you thinking on move 12?', and adapt their teaching to your child's personality and learning style. That personal connection is the foundation of real improvement.",
              },
              {
                label: "Classical training meets modern analysis",
                detail:
                  "We teach chess the way strong players actually study: play games, then review them move-by-move with Stockfish analysis. Students learn to understand why a move is strong, developing judgement and intuition, not just memorisation.",
              },
              {
                label: "Thinking frameworks before opening theory",
                detail:
                  "We teach children how to think about positions: centre control, piece activity, king safety. The same framework-first approach applies to middlegames and endgames. They learn principles they can apply in any position they've never seen before.",
              },
              {
                label: "Tournament-ready when they choose to compete",
                detail:
                  "For students who want to go competitive, we prepare them fully: clock management, between-round routines, handling nerves, and post-game analysis discipline. We connect families with rated tournaments in Nairobi and online events on Lichess.",
              },
            ].map((item) => (
              <div
                key={item.label}
                className="bg-white rounded-xl p-6 border border-navy/5"
              >
                <h3 className="font-bold text-navy">{item.label}</h3>
                <p className="mt-1 text-sm text-slate leading-relaxed">
                  {item.detail}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Learning Path */}
      <LearningPath track="Chess" levels={chessLevels} />

      {/* Curriculum */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-navy mb-3">
            Sample curriculum: 12-week programme
          </h2>
          <p className="text-slate mb-12 max-w-2xl">
            Adapted to each student&apos;s rating and experience. Complete
            beginners and experienced club players follow different tracks.
          </p>
          <div className="grid md:grid-cols-3 gap-8">
            {curriculum.map((mod) => (
              <div
                key={mod.module}
                className="bg-off-white rounded-2xl p-8 border border-navy/5"
              >
                <p className="text-xs font-semibold text-gold uppercase tracking-wider">
                  {mod.weeks}
                </p>
                <h3 className="text-xl font-bold text-navy mt-2">
                  {mod.module}
                </h3>
                <ul className="mt-4 space-y-2">
                  {mod.topics.map((topic) => (
                    <li
                      key={topic}
                      className="flex items-start gap-2 text-sm text-slate"
                    >
                      <span className="text-gold mt-0.5">&#10003;</span>
                      {topic}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-navy text-white text-center">
        <div className="max-w-2xl mx-auto px-4">
          <h2 className="text-3xl font-bold">
            Every grandmaster started with a single game
          </h2>
          <p className="mt-4 text-white/60">
            Book a free trial session. Your child will play their first
            coached game and receive a personalised assessment of where to
            start.
          </p>
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 mt-8 bg-gold text-navy px-8 py-3.5 rounded-full font-semibold hover:bg-gold-light transition-colors"
          >
            Book a free trial <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>
    </>
  );
}
