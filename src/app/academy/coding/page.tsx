import Link from "next/link";
import { Code, ArrowRight, Terminal, Globe, Smartphone, GitBranch } from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Coding & App Development — Cognitron Academy",
  description:
    "Real code, real projects, real tools. Python, JavaScript, and mobile development for ages 8–17. Expert coaches, not pre-recorded tutorials.",
};

const curriculum = [
  {
    module: "Computational foundations",
    weeks: "Weeks 1–4",
    topics: [
      "Python fundamentals: variables, data types, conditionals, loops",
      "Functions, scope, and modular thinking",
      "Debugging strategies and reading error messages",
      "Project: Build a command-line quiz game with scoring and persistence",
    ],
  },
  {
    module: "Web development",
    weeks: "Weeks 5–8",
    topics: [
      "HTML5 structure, CSS layouts (Flexbox, Grid), and responsive design",
      "JavaScript fundamentals: DOM manipulation and event handling",
      "Working with APIs: fetching and displaying real-world data",
      "Project: Build and deploy a personal portfolio website to the web",
    ],
  },
  {
    module: "App development & capstone",
    weeks: "Weeks 9–12",
    topics: [
      "Building more complex web apps: multiple pages, forms, and data persistence",
      "Introduction to libraries and frameworks (age-appropriate progression)",
      "Version control with Git and GitHub: commits, branches, and collaboration",
      "Capstone: Design, build, and present a working application to family and peers",
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
            Real Code. Real Projects. Real Skills.
          </h1>
          <p className="mt-6 text-lg text-white/70 max-w-2xl leading-relaxed">
            Our students write in Python, JavaScript, and HTML/CSS from
            session one, the same languages used across the tech industry.
            They learn with professional-grade tools like VS Code, Git, and
            GitHub. Every session produces something tangible: code your
            child wrote, tested, and can be proud of.
          </p>
        </div>
      </section>

      {/* What They'll Build — with specifics */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-navy mb-3">
            What your child will build
          </h2>
          <p className="text-slate mb-8 max-w-2xl">
            Functional software they can show to anyone with a link. Projects
            that grow in ambition each term.
          </p>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                icon: Terminal,
                title: "Command-line applications",
                desc: "Python programs that solve real problems: calculators, quiz engines, data sorters, automation scripts.",
              },
              {
                icon: Globe,
                title: "Live websites",
                desc: "A personal portfolio deployed to the internet with HTML, CSS & JavaScript. Responsive, interactive, theirs.",
              },
              {
                icon: Smartphone,
                title: "Interactive web applications",
                desc: "A multi-page web app with user interaction, dynamic content, and real functionality they designed from scratch.",
              },
              {
                icon: GitBranch,
                title: "A GitHub portfolio",
                desc: "All projects version-controlled on GitHub, building a professional portfolio that grows with them.",
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
                label: "Real languages from day one",
                detail:
                  "We teach Python and JavaScript, two of the most widely used languages in professional software development. Your child learns to express ideas in the same tools working developers use every day.",
              },
              {
                label: "Professional tools, professional habits",
                detail:
                  "Students work in VS Code, use the terminal, push code to GitHub, and deploy to the real web. From day one, they develop the workflows and discipline of working software engineers.",
              },
              {
                label: "Coaches who build software for a living",
                detail:
                  "Our coaches are working developers who bring real industry experience into every session. They adapt to your child's pace, answer the hard questions, and model what great engineering looks like.",
              },
              {
                label: "Projects that build progressively",
                detail:
                  "Learning is structured around meaningful projects, each one more ambitious than the last. By the end of term, your child has a portfolio of real applications they designed and built themselves.",
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
