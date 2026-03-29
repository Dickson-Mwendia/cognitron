import Link from "next/link";
import { Code, Brain, Trophy, ArrowRight, Lightbulb, Puzzle, Search, ListChecks, Clock, GraduationCap, TrendingUp, Zap } from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Academy — Cognitron",
  description:
    "World-class coding, AI, and chess education for children aged 6–17. Online and home coaching in Nairobi.",
};

const tracks = [
  {
    href: "/academy/coding",
    icon: Code,
    title: "Coding & App Development",
    ages: "Ages 8–17",
    description:
      "Our students write real code (Python, JavaScript, HTML/CSS) from their very first session. They build functional websites, interactive games, and web applications, guided by coaches who write production code professionally. Every session ends with something your child built, tested, and can be proud of.",
    outcomes: [
      "Write Python scripts that automate tasks and solve real problems",
      "Build and deploy a personal website with HTML, CSS & JavaScript",
      "Design and develop an interactive web application from scratch",
      "Use professional tools: VS Code, Git, GitHub, and the command line",
      "Present a polished capstone project to family and peers",
    ],
  },
  {
    href: "/academy/ai",
    icon: Brain,
    title: "AI & Machine Learning for Kids",
    ages: "Ages 10–17",
    description:
      "Our students use visual tools and real AI platforms to train classifiers, explore how language models generate text, and build working AI-powered applications. They learn how AI works, why it works, and what it means for the world. Taught by practitioners who bring genuine depth to every session.",
    outcomes: [
      "Train a custom image classifier using visual ML tools and real datasets",
      "Build a working AI chatbot using language model APIs",
      "Understand how large language models like GPT work at a high level",
      "Explore supervised learning and data quality through hands-on experiments",
      "Analyse bias in AI systems and debate ethical implications",
    ],
  },
  {
    href: "/academy/chess",
    icon: Trophy,
    title: "Chess & Strategic Thinking",
    ages: "Ages 6–17",
    description:
      "Our chess programme uses the royal game as a vehicle for teaching decision-making under pressure, pattern recognition, and long-term strategic planning. Our coaches are rated players who combine classical training methods with modern engine analysis, developing students who compete at tournament level and think critically in every area of life.",
    outcomes: [
      "Master opening principles, tactical patterns, and endgame technique",
      "Analyse positions using structured thinking frameworks",
      "Compete confidently in rated tournaments, both online and over-the-board",
      "Develop concentration, patience, and the discipline to calculate under pressure",
      "Use engine analysis tools to self-assess and continuously improve",
    ],
  },
];

export default function AcademyPage() {
  return (
    <>
      {/* Hero */}
      <section className="bg-navy text-white py-20 md:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-gold text-sm font-semibold uppercase tracking-widest mb-4">
            Cognitron Academy
          </p>
          <h1 className="text-4xl md:text-5xl font-bold leading-tight max-w-3xl">
            Real Skills. Real Projects.{" "}
            <span className="text-gold">Built by Your Child.</span>
          </h1>
          <p className="mt-6 text-lg text-white/70 max-w-2xl leading-relaxed">
            Ages 6 to 17. Three tracks taught by working technologists who
            know your child by name. Small groups, real tools, and projects
            they can demo to you at the end of every term. Online or at
            your home.
          </p>
        </div>
      </section>

      {/* Tracks */}
      <section className="py-20 md:py-28 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-16">
            {tracks.map((track, i) => (
              <div
                key={track.href}
                className={`flex flex-col ${
                  i % 2 === 1 ? "md:flex-row-reverse" : "md:flex-row"
                } gap-10 items-center`}
              >
                {/* Info */}
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 rounded-lg bg-navy flex items-center justify-center">
                      <track.icon className="w-5 h-5 text-gold" />
                    </div>
                    <span className="text-xs font-semibold text-gold-dark uppercase tracking-wider">
                      {track.ages}
                    </span>
                  </div>
                  <h2 className="text-2xl md:text-3xl font-bold text-navy">
                    {track.title}
                  </h2>
                  <p className="mt-3 text-slate leading-relaxed">
                    {track.description}
                  </p>
                  <ul className="mt-6 space-y-2.5">
                    {track.outcomes.map((outcome) => (
                      <li
                        key={outcome}
                        className="flex items-start gap-2 text-sm text-navy"
                      >
                        <span className="text-gold mt-0.5">&#10003;</span>
                        {outcome}
                      </li>
                    ))}
                  </ul>
                  <Link
                    href={track.href}
                    className="inline-flex items-center gap-2 mt-6 text-gold-dark font-semibold text-sm hover:gap-3 transition-all"
                  >
                    Learn More <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>

                {/* Visual placeholder */}
                <div className="flex-1 w-full hidden md:block">
                  <div className="aspect-[4/3] rounded-2xl bg-off-white border border-navy/5 flex items-center justify-center">
                    <track.icon className="w-20 h-20 text-navy/10" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Computational Thinking Foundation */}
      <section className="py-20 md:py-28 bg-navy text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <p className="text-gold text-sm font-semibold uppercase tracking-widest mb-4">
              The Foundation
            </p>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Built on Computational Thinking
            </h2>
            <p className="text-white/70 text-lg max-w-2xl mx-auto leading-relaxed">
              Every track at Cognitron Academy is grounded in computational
              thinking: the ability to break complex problems into manageable
              parts, spot patterns, focus on what matters, and design clear,
              step-by-step solutions. It is not a separate subject. It is the
              thinking framework that makes everything else click.
            </p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto">
            {[
              {
                icon: Puzzle,
                title: "Decomposition",
                desc: "Breaking big problems into smaller, solvable pieces. Whether debugging code, planning a chess opening, or designing an AI project, it starts here.",
              },
              {
                icon: Search,
                title: "Pattern Recognition",
                desc: "Identifying similarities and recurring structures. The skill that lets a coder spot reusable logic, a chess player read a position, or an AI student understand how models generalise.",
              },
              {
                icon: Lightbulb,
                title: "Abstraction",
                desc: "Filtering out noise to focus on what matters. Learning to identify the essential details of a problem and set aside the rest.",
              },
              {
                icon: ListChecks,
                title: "Algorithmic Design",
                desc: "Creating clear, ordered steps to reach a solution. The discipline behind clean code, sound strategy, and systematic thinking in every domain.",
              },
            ].map((pillar) => (
              <div
                key={pillar.title}
                className="bg-white/5 border border-white/10 rounded-xl p-6"
              >
                <pillar.icon className="w-8 h-8 text-gold mb-3" />
                <h3 className="font-bold text-white text-sm">{pillar.title}</h3>
                <p className="mt-2 text-xs text-white/60 leading-relaxed">
                  {pillar.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* After-School Advantage */}
      <section className="py-20 md:py-28 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center mb-14">
            <p className="text-gold text-sm font-semibold uppercase tracking-widest mb-4">
              The After-School Advantage
            </p>
            <h2 className="text-3xl md:text-4xl font-bold text-navy">
              Your Child Already Learns Tech at School.{" "}
              <span className="text-gold">We Take Them Further.</span>
            </h2>
            <p className="mt-4 text-slate text-lg leading-relaxed">
              Most schools now teach basic ICT or introductory coding. That&apos;s a
              good start, but it&apos;s a crowded classroom, a fixed pace, and a
              surface-level curriculum. Cognitron picks up where school leaves
              off.
            </p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto">
            {[
              {
                icon: TrendingUp,
                title: "Goes Deeper",
                desc: "School teaches Scratch or basic HTML. We teach Python, JavaScript, real AI tools, and competitive chess. Your child moves beyond the basics into real-world skills.",
              },
              {
                icon: Zap,
                title: "Moves at Their Pace",
                desc: "In a class of 30, everyone moves at the same speed. At Cognitron, your child's coach adapts every session to their level, pushing them exactly as fast as they can handle.",
              },
              {
                icon: Clock,
                title: "Fits Around School",
                desc: "After-school and weekend sessions designed to complement their school schedule, not compete with it. Online or at your home.",
              },
              {
                icon: GraduationCap,
                title: "Builds on What They Know",
                desc: "We assess where your child is and build from there. No repeating what school already covered. If they've done Scratch, we start with Python. If they know HTML, we jump to JavaScript.",
              },
            ].map((item) => (
              <div
                key={item.title}
                className="bg-off-white rounded-xl border border-navy/5 p-6"
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

      {/* Delivery Model */}
      <section className="py-20 md:py-28 bg-off-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-navy mb-4">
            The Cognitron Difference
          </h2>
          <p className="text-slate text-lg mb-12 max-w-2xl mx-auto">
            A dedicated coach who knows your child by name, adapts in
            real time, and pushes them beyond what any fixed curriculum ever
            could. That&apos;s the foundation everything at Cognitron is built on.
          </p>
          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <div className="bg-white rounded-2xl p-8 border border-navy/5">
              <div className="w-12 h-12 rounded-xl bg-navy/5 flex items-center justify-center mx-auto mb-4">
                <Brain className="w-6 h-6 text-navy" />
              </div>
              <h3 className="text-xl font-bold text-navy">Live &amp; Interactive</h3>
              <p className="mt-2 text-slate text-sm leading-relaxed">
                Maximum 4 students per session. Your child isn&apos;t a face in a
                crowd. They get direct instruction, live code review, and
                immediate feedback every single class.
              </p>
            </div>
            <div className="bg-white rounded-2xl p-8 border border-navy/5">
              <div className="w-12 h-12 rounded-xl bg-gold/10 flex items-center justify-center mx-auto mb-4">
                <Trophy className="w-6 h-6 text-gold-dark" />
              </div>
              <h3 className="text-xl font-bold text-navy">
                Concierge Home Coaching
              </h3>
              <p className="mt-2 text-slate text-sm leading-relaxed">
                Our coaches come to your home with everything needed: laptops
                configured, lesson plans prepared, progress tracked. The same
                model used by elite private coaching in London and New York.
              </p>
            </div>
            <div className="bg-white rounded-2xl p-8 border border-navy/5">
              <div className="w-12 h-12 rounded-xl bg-navy/5 flex items-center justify-center mx-auto mb-4">
                <Code className="w-6 h-6 text-navy" />
              </div>
              <h3 className="text-xl font-bold text-navy">
                Real Tools, Real Output
              </h3>
              <p className="mt-2 text-slate text-sm leading-relaxed">
                No toy environments. Students use VS Code, GitHub, Python,
                TensorFlow, and Lichess, the actual tools used by professional
                developers and competitive players worldwide.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 md:py-24 bg-navy text-white text-center">
        <div className="max-w-2xl mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold">
            Give Your Child the Tech Edge
          </h2>
          <p className="mt-4 text-white/60 text-lg">
            Book a free consultation and we&apos;ll help you choose the perfect
            track for your child.
          </p>
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 mt-8 bg-gold text-navy px-8 py-3.5 rounded-full font-semibold hover:bg-gold-light transition-colors"
          >
            Book a Free Consultation <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>
    </>
  );
}
