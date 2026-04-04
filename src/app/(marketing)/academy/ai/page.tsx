import Link from "next/link";
import { Brain, ArrowRight, Eye, MessageSquare, BarChart3, Scale } from "lucide-react";
import { LearningPath } from "@/components/LearningPath";
import type { Metadata } from "next";

export const dynamic = 'force-static'

export const metadata: Metadata = {
  title: "AI for Kids Nairobi | Cognitron Academy | Machine Learning, Chatbots",
  description:
    "Your child learns how AI works and builds real AI-powered apps. Image classifiers, chatbots, prompt engineering. Ages 10–17. Nairobi home coaching or online.",
};

const aiLevels = [
  {
    name: "Explorer",
    badge: "🌱",
    term: "Term 1",
    skills: [
      "What AI is (and isn't) - cut through the hype",
      "Train a simple image recogniser (no code needed)",
      "How AI \"sees\" and \"reads\" - visual experiments",
      "Think critically about AI in everyday life",
    ],
    project: "Train a custom image recogniser to identify objects they choose - and demo it live",
  },
  {
    name: "Builder",
    badge: "🔨",
    term: "Term 2",
    skills: [
      "Use AI tools to build creative projects",
      "Prompt engineering - get the best from ChatGPT & others",
      "Simple Python scripts that talk to AI",
      "Understand how data shapes AI behaviour",
    ],
    project: "Build a helpful AI chatbot with a custom personality and purpose",
  },
  {
    name: "Creator",
    badge: "⚡",
    term: "Term 3",
    skills: [
      "Combine AI with other skills (code, design, data)",
      "AI ethics: bias, fairness & when AI gets it wrong",
      "Design an AI tool that solves a real problem",
      "Present and explain AI work to a non-technical audience",
    ],
    project: "Design and present an AI-powered tool that helps people in their community",
  },
  {
    name: "Architect",
    badge: "🏆",
    term: "Term 4+",
    skills: [
      "Lead an independent AI project from idea to demo",
      "Deeper Python + AI integration",
      "Help coach younger students",
      "Explore advanced topics (computer vision, data science)",
    ],
    project: "Build an original AI project they can demo and add to their portfolio",
  },
];

const curriculum = [
  {
    module: "How AI thinks",
    weeks: "Weeks 1–4",
    topics: [
      "What AI actually is - and what it can't do (cutting through the hype)",
      "Hands-on: train an image recogniser with Google Teachable Machine (no coding needed)",
      "How AI learns from examples - the idea behind \"training data\"",
      "Exploring AI in the real world: recommendations, voice assistants, image filters",
    ],
  },
  {
    module: "Creating with AI",
    weeks: "Weeks 5–8",
    topics: [
      "Prompt engineering: how to talk to ChatGPT, Claude, and other AI tools effectively",
      "Build a custom chatbot with a specific purpose and personality",
      "Introduction to Python for working with AI (simple scripts, guided by coach)",
      "Project: build an AI chatbot that helps with something your child cares about",
    ],
  },
  {
    module: "AI & the real world",
    weeks: "Weeks 9–12",
    topics: [
      "When AI gets it wrong: bias, mistakes, and why humans still matter",
      "Design thinking: how to spot a problem AI could help solve",
      "Combine skills: AI + coding + creativity to build something original",
      "Capstone: design, build, and present an AI-powered project to family and peers",
    ],
  },
];

export default function AIPage() {
  return (
    <>
      <section className="bg-navy text-white py-20 md:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-lg bg-white/10 flex items-center justify-center">
              <Brain className="w-5 h-5 text-gold" />
            </div>
            <span className="text-xs font-semibold text-gold uppercase tracking-wider">
              Ages 10–17
            </span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold leading-tight max-w-3xl">
            They won&apos;t just use AI - they&apos;ll build with it
          </h1>
          <p className="mt-6 text-lg text-white/70 max-w-2xl leading-relaxed">
            AI is everywhere your child looks - from the videos YouTube
            recommends to the filters on their photos. We help them
            understand how it all works, use AI tools creatively, and think
            critically about a technology that will shape their entire
            future. No prior coding experience needed - we start with
            hands-on experiments, not textbooks.
          </p>
        </div>
      </section>

      {/* What they'll build */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-navy mb-3">
            What your child will build
          </h2>
          <p className="text-slate mb-8 max-w-2xl">
            Hands-on projects they can explain, demonstrate, and be proud
            of - not just theory.
          </p>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                icon: Eye,
                title: "Image recogniser",
                desc: "Train AI to recognise things they choose - dog breeds, plant species, hand gestures - using visual tools. No coding required to start.",
              },
              {
                icon: MessageSquare,
                title: "Custom AI chatbot",
                desc: "Build a chatbot with its own personality and purpose - a homework helper, a storyteller, a quiz master - using real AI tools.",
              },
              {
                icon: BarChart3,
                title: "AI-powered tool",
                desc: "Combine AI with their own ideas to build something useful: a recommendation engine, a creative writing assistant, or a study tool.",
              },
              {
                icon: Scale,
                title: "AI ethics presentation",
                desc: "Research how AI affects real people - from facial recognition to social media - and present their findings and opinions to family.",
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
                label: "No coding experience needed to start",
                detail:
                  "We begin with visual, no-code tools like Google Teachable Machine - your child trains AI models by dragging and dropping, not writing code. Python is introduced gradually for older or more experienced students, always with a coach guiding every step.",
              },
              {
                label: "Understanding, not just using",
                detail:
                  "Every child uses AI tools already (YouTube, Siri, photo filters). We help them understand what's happening behind the screen - why AI recommends certain videos, how image filters work, why chatbots sometimes say wrong things. That understanding changes how they see the world.",
              },
              {
                label: "Ethics and critical thinking built in",
                detail:
                  "AI raises real questions about fairness, privacy, and truth. We don't shy away from these. Your child will debate real cases - from biased facial recognition to deepfakes - and develop the critical thinking skills to navigate an AI-shaped world.",
              },
              {
                label: "Tailored to what excites your child",
                detail:
                  "Loves animals? They'll train an AI to recognise dog breeds. Into sport? They'll explore how AI predicts match results. We build projects around your child's interests, so every session feels relevant and exciting.",
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
      <LearningPath track="AI" levels={aiLevels} />

      {/* Curriculum */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-navy mb-3">
            Sample curriculum: 12-week programme
          </h2>
          <p className="text-slate mb-12 max-w-2xl">
            Adapted to each student&apos;s age and experience. Students with
            prior coding knowledge move faster through foundations.
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
            The future belongs to the AI-literate
          </h2>
          <p className="mt-4 text-white/60">
            Book a free trial and watch your child train their first machine
            learning model in 60 minutes.
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
