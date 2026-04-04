import Link from "next/link";
import { Code, ArrowRight, Terminal, Globe, Smartphone, GitBranch } from "lucide-react";
import { LearningPath } from "@/components/LearningPath";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Coding for Kids Nairobi | Cognitron Academy | Python, JavaScript, Apps",
  description:
    "Your child builds real apps with Python & JavaScript from session one. Professional tools, groups of 4, expert coaches at your home or online. Ages 8–17. Nairobi.",
};

const codingLevels = [
  {
    name: "Explorer",
    badge: "🌱",
    term: "Term 1",
    skills: [
      "Visual coding with Scratch (ages 8–10) or Python basics (ages 11+)",
      "Sequences, loops & simple logic",
      "Making interactive animations & stories",
      "Thinking like a programmer",
    ],
    project: "Build an interactive game or animated story they can share with friends",
  },
  {
    name: "Builder",
    badge: "🔨",
    term: "Term 2",
    skills: [
      "First steps in Python or JavaScript",
      "Build a simple personal website (HTML & CSS)",
      "Variables, conditionals & functions",
      "Solving puzzles with code",
    ],
    project: "Create a personal website or a Python program that does something fun",
  },
  {
    name: "Creator",
    badge: "⚡",
    term: "Term 3",
    skills: [
      "Longer programs with multiple features",
      "Adding interactivity to websites",
      "Working with data (lists, scores, user input)",
      "Debugging and improving their own code",
    ],
    project: "Build a multi-feature app or game they designed themselves",
  },
  {
    name: "Architect",
    badge: "🏆",
    term: "Term 4+",
    skills: [
      "Plan a project from idea to finish",
      "Combine skills across languages",
      "Help coach younger students",
      "Publish work online (with guidance)",
    ],
    project: "Design, build & present a capstone project to family and peers",
  },
];

const curriculum = [
  {
    module: "Foundations & first programs",
    weeks: "Weeks 1–4",
    topics: [
      "Ages 8–10: Scratch - drag-and-drop coding, animations, simple games",
      "Ages 11+: Python basics - variables, if/else, loops, and print",
      "Thinking like a programmer: breaking big problems into small steps",
      "Project: Build an interactive game or animation to share with family",
    ],
  },
  {
    module: "Building real things",
    weeks: "Weeks 5–8",
    topics: [
      "Create a personal website with HTML & CSS (all ages)",
      "Ages 11+: Add interactivity with Python or JavaScript",
      "Working with data: keeping score, saving progress, user input",
      "Project: Build and share a personal website or a Python mini-app",
    ],
  },
  {
    module: "Your own creation",
    weeks: "Weeks 9–12",
    topics: [
      "Plan and design a project from scratch (your child picks the idea)",
      "Combine skills: code + design + problem-solving",
      "Testing, debugging, and making it better",
      "Capstone: Present a finished project to family - something they built entirely themselves",
    ],
  },
];

export default function CodingPage() {
  return (
    <>
      <section className="bg-navy text-white py-20 md:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-lg bg-white/10 flex items-center justify-center">
              <Code className="w-5 h-5 text-gold" />
            </div>
            <span className="text-xs font-semibold text-gold uppercase tracking-wider">
              Ages 8–17
            </span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold leading-tight max-w-3xl">
            Your child writes real code.{" "}
            <span className="text-gold">From session one.</span>
          </h1>
          <p className="mt-6 text-lg text-white/70 max-w-2xl leading-relaxed">
            Younger students (ages 8–10) start with visual coding in Scratch,
            building games and animations that hook their interest. Older
            students (ages 11+) start with Python and move into web
            development. Every child works at their own pace with a coach
            who adapts to them - never a one-size-fits-all syllabus.
          </p>
        </div>
      </section>

      {/* What they'll build - with specifics */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-navy mb-3">
            What your child will build
          </h2>
          <p className="text-slate mb-8 max-w-2xl">
            Things they can show you, their friends, and their teachers.
            Projects grow in ambition as their skills develop.
          </p>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                icon: Terminal,
                title: "Games & animations",
                desc: "Interactive games, animated stories, and creative projects they design themselves - the kind of thing they'll want to show everyone.",
              },
              {
                icon: Globe,
                title: "Their own website",
                desc: "A personal website they build with HTML & CSS. Older students add interactivity. Published online for the world to see.",
              },
              {
                icon: Smartphone,
                title: "Python programs",
                desc: "Programs that actually do things: quiz games, calculators, text adventures, and tools that solve problems they care about.",
              },
              {
                icon: GitBranch,
                title: "A project portfolio",
                desc: "By the end of each term, a collection of finished work they built themselves - tangible proof of what they've learned.",
              },
            ].map((project) => (
              <div
                key={project.title}
                className="bg-off-white rounded-xl p-6 border border-navy/5"
              >
                <project.icon className="w-8 h-8 text-gold mb-3" />
                <h3 className="font-bold text-navy text-sm">{project.title}</h3>
                <p className="mt-2 text-xs text-slate leading-relaxed">
                  {project.desc}
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
                label: "Age-appropriate starting points",
                detail:
                  "An 8-year-old and a 15-year-old don't start in the same place. Younger students begin with visual, drag-and-drop coding (Scratch) that builds logic through play. Older students start with Python or web development. Every child enters at the right level for them.",
              },
              {
                label: "Fun first, fundamentals follow",
                detail:
                  "Kids learn best when they're having fun. We start with projects they're excited about - games, animations, things they want to show friends - and build the programming concepts around that excitement. The fundamentals stick because they're applied, not memorised.",
              },
              {
                label: "A coach who knows your child",
                detail:
                  "Our coaches aren't just teaching a curriculum - they're watching how your child thinks, where they get stuck, and what lights them up. With a maximum of 4 students, every session is genuinely personalised.",
              },
              {
                label: "Projects that grow with them",
                detail:
                  "Each term's project is a little more ambitious than the last. By the end of the year, your child has a collection of finished work that shows real progression - and something they're genuinely proud to share.",
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
      <LearningPath track="Coding" levels={codingLevels} />

      {/* Curriculum */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-navy mb-3">
            Sample curriculum: 12-week programme
          </h2>
          <p className="text-slate mb-12 max-w-2xl">
            Personalised for each student. Accelerated paths available for
            students with prior experience.
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
            Give your child a head start that matters
          </h2>
          <p className="mt-4 text-white/60">
            Book a free trial session. Your child will write and run their
            first real Python programme in the very first class.
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
