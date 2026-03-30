import Link from "next/link";
import { Brain, ArrowRight, Eye, MessageSquare, BarChart3, Scale } from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "AI & Machine Learning for Kids — Cognitron Academy",
  description:
    "Go beyond AI awareness. Kids train real ML models, build chatbots, and understand how GPT works, not just what it does. Ages 10–17.",
};

const curriculum = [
  {
    module: "How machines learn",
    weeks: "Weeks 1–4",
    topics: [
      "What AI actually is (and isn't): cutting through the hype",
      "Supervised learning: training a model on labelled data",
      "Hands-on: train an image classifier with Google Teachable Machine",
      "Data collection, cleaning, and why 'garbage in = garbage out'",
    ],
  },
  {
    module: "Building with AI",
    weeks: "Weeks 5–8",
    topics: [
      "Introduction to Python for working with AI (basic scripting and API calls)",
      "Natural Language Processing: how computers interpret and generate text",
      "Working with AI APIs: connecting to real services (OpenAI, Hugging Face)",
      "Project: build a sentiment analysis tool that reads product reviews",
    ],
  },
  {
    module: "AI product & ethics",
    weeks: "Weeks 9–12",
    topics: [
      "Large Language Models: how GPT, Claude, and Gemini work at a high level (tokens, prediction, and why they sometimes hallucinate)",
      "Prompt engineering: getting the best output from AI systems",
      "AI bias, fairness, privacy: real case studies and debate",
      "Capstone: design, build, and present an AI-powered application",
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
            Your Child Will Understand AI Before Most Adults
          </h1>
          <p className="mt-6 text-lg text-white/70 max-w-2xl leading-relaxed">
            Our students learn how artificial intelligence actually works
            and how to build with it. They use visual tools and real AI
            platforms to train classifiers, explore how language models
            generate text, and build working AI-powered applications they
            can demonstrate. Concepts are taught by practitioners and
            adapted for younger learners, building genuine understanding
            at every stage.
          </p>
        </div>
      </section>

      {/* What They'll Build */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-navy mb-3">
            What your child will build
          </h2>
          <p className="text-slate mb-8 max-w-2xl">
            Functional applications powered by real machine learning.
            Projects they can explain, demonstrate, and be proud of.
          </p>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                icon: Eye,
                title: "Image recognition model",
                desc: "A custom classifier trained on their own dataset, distinguishing dog breeds, plant species, or handwritten characters.",
              },
              {
                icon: MessageSquare,
                title: "AI-powered chatbot",
                desc: "A conversational bot built by connecting to language model APIs, with custom instructions, personality, and useful functionality.",
              },
              {
                icon: BarChart3,
                title: "Sentiment analysis tool",
                desc: "A Python application that reads text (reviews, tweets, articles) and determines whether the sentiment is positive, negative, or neutral.",
              },
              {
                icon: Scale,
                title: "AI ethics case study",
                desc: "A researched presentation analysing real-world AI bias, from hiring algorithms to facial recognition, with proposed solutions.",
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
                label: "We teach the 'how', not just the 'what'",
                detail:
                  "Our students go beyond using AI tools. They understand how data becomes predictions, why models sometimes get things wrong, and what makes one approach better than another. We bring real technical depth to younger learners with age-appropriate scaffolding, so your child builds genuine intuition.",
              },
              {
                label: "Python-first from the start",
                detail:
                  "We begin with visual tools like Teachable Machine to build intuition, then gradually introduce Python. By the second half of the programme, students are writing code to interact with AI APIs and process results, building real working applications.",
              },
              {
                label: "Ethics is built into the curriculum",
                detail:
                  "AI is reshaping society. Our students learn to question, not just build. We dedicate real time to bias, fairness, privacy, and societal impact, using real-world case studies that spark genuine debate and develop critical thinkers.",
              },
              {
                label: "Personalised to your child's interests",
                detail:
                  "Loves animals? They'll train an animal breed classifier. Into sport? They'll analyse match statistics with AI tools. We tailor projects to what motivates your child, making every session deeply engaging.",
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
