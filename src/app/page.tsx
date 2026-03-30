import Link from "next/link";
import {
  Code,
  Brain,
  Trophy,
  ShieldCheck,
  Lock,
  ArrowRight,
  Star,
  Users,
  Monitor,
  Home as HomeIcon,
} from "lucide-react";

export default function Home() {
  return (
    <>
      {/* Hero */}
      <section className="bg-navy text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-navy-light via-navy to-navy-dark opacity-80" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 md:py-36">
          <div className="max-w-3xl">
            <p className="text-gold text-sm font-semibold uppercase tracking-widest mb-4">
              Premium Tech Education for Kids &amp; Teens
            </p>
            <h1 className="text-4xl md:text-6xl font-bold leading-tight tracking-tight">
              Where the Brightest Young Minds{" "}
              <span className="text-gold">Learn to Build.</span>
            </h1>
            <p className="mt-6 text-lg md:text-xl text-white/70 leading-relaxed max-w-2xl">
              Your child learns to code real apps, apply AI responsibly, and
              compete in chess, guided by expert coaches who come to your home
              or teach live online. Plus cybersecurity protection for the
              whole family.
            </p>
            <div className="mt-10 flex flex-col sm:flex-row gap-4">
              <Link
                href="/academy"
                className="inline-flex items-center justify-center gap-2 bg-gold text-navy px-8 py-3.5 rounded-full font-semibold hover:bg-gold-light transition-colors"
              >
                Explore Academy <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                href="/protect"
                className="inline-flex items-center justify-center gap-2 border border-white/30 text-white px-8 py-3.5 rounded-full font-semibold hover:bg-white/10 transition-colors"
              >
                Protect my family <ShieldCheck className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Two Pillars */}
      <section className="py-20 md:py-28 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-navy">
              They build. You&apos;re protected.
            </h2>
            <p className="mt-4 text-slate text-lg">
              World-class education for your kids. Enterprise-grade security
              for your family. Two sides of the same mission.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {/* Academy Card */}
            <div className="group rounded-2xl border border-navy/10 bg-off-white p-8 md:p-10 hover:shadow-xl transition-shadow">
              <div className="w-14 h-14 rounded-xl bg-navy flex items-center justify-center mb-6">
                <Brain className="w-7 h-7 text-gold" />
              </div>
              <h3 className="text-2xl font-bold text-navy">
                Cognitron Academy
              </h3>
              <p className="mt-3 text-slate leading-relaxed">
                Ages 6 to 17. Your child writes real code, applies AI
                responsibly, and plays competitive chess with expert coaches
                who know them by name. Online or at your home.
              </p>
              <ul className="mt-6 space-y-3">
                <li className="flex items-center gap-3 text-sm text-navy">
                  <Code className="w-5 h-5 text-gold" />
                  Coding & App Development
                </li>
                <li className="flex items-center gap-3 text-sm text-navy">
                  <Brain className="w-5 h-5 text-gold" />
                  AI & Machine Learning for kids
                </li>
                <li className="flex items-center gap-3 text-sm text-navy">
                  <Trophy className="w-5 h-5 text-gold" />
                  Chess & Strategic Thinking
                </li>
              </ul>
              <Link
                href="/academy"
                className="inline-flex items-center gap-2 mt-8 text-gold-dark font-semibold text-sm group-hover:gap-3 transition-all"
              >
                Explore Academy <ArrowRight className="w-4 h-4" />
              </Link>
            </div>

            {/* Protect Card */}
            <div className="group rounded-2xl border border-navy/10 bg-off-white p-8 md:p-10 hover:shadow-xl transition-shadow">
              <div className="w-14 h-14 rounded-xl bg-navy flex items-center justify-center mb-6">
                <ShieldCheck className="w-7 h-7 text-gold" />
              </div>
              <h3 className="text-2xl font-bold text-navy">
                Cognitron Protect
              </h3>
              <p className="mt-3 text-slate leading-relaxed">
                Comprehensive digital safety for your family and personal
                cybersecurity for executives. Sleep soundly knowing your digital
                life is secured.
              </p>
              <ul className="mt-6 space-y-3">
                <li className="flex items-center gap-3 text-sm text-navy">
                  <HomeIcon className="w-5 h-5 text-gold" />
                  Family Digital Safety
                </li>
                <li className="flex items-center gap-3 text-sm text-navy">
                  <Lock className="w-5 h-5 text-gold" />
                  Executive Cyber Protection
                </li>
              </ul>
              <Link
                href="/protect"
                className="inline-flex items-center gap-2 mt-8 text-gold-dark font-semibold text-sm group-hover:gap-3 transition-all"
              >
                Explore Protect <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 md:py-28 bg-off-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-navy">
              Getting started is simple
            </h2>
            <p className="mt-4 text-slate text-lg">
              Three steps to your child&apos;s first real project.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                step: "01",
                title: "Tell us about your child",
                description:
                  "Their age, interests, and what excites them. We'll recommend the right track and match them with the perfect coach.",
                icon: Users,
              },
              {
                step: "02",
                title: "Get a personalized curriculum",
                description:
                  "A learning plan built around your child's level and pace. Online, at your home, or a mix of both.",
                icon: Monitor,
              },
              {
                step: "03",
                title: "Watch them build",
                description:
                  "From week one, your child is creating real projects. Apps, AI models, chess strategies. Things they can show you.",
                icon: Star,
              },
            ].map((item) => (
              <div key={item.step} className="text-center">
                <div className="w-16 h-16 rounded-full bg-navy text-gold flex items-center justify-center mx-auto mb-6 text-xl font-bold">
                  {item.step}
                </div>
                <h3 className="text-xl font-bold text-navy">{item.title}</h3>
                <p className="mt-3 text-slate text-sm leading-relaxed max-w-xs mx-auto">
                  {item.description}
                </p>
              </div>
            ))}
          </div>

          <div className="text-center mt-12">
            <Link
              href="/contact"
              className="inline-flex items-center justify-center gap-2 bg-gold text-navy px-6 sm:px-8 py-3.5 rounded-full font-semibold hover:bg-gold-light transition-colors w-full sm:w-auto"
            >
              Book your free consultation <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* Why Cognitron */}
      <section className="py-20 md:py-28 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-navy">
              Why families choose Cognitron
            </h2>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                title: "Built for how kids learn",
                description:
                  "Project-based, hands-on, and never passive. Your child builds something real every session, not just watches a screen.",
              },
              {
                title: "Coaches who know your child",
                description:
                  "Small groups of four or fewer. Your child gets a dedicated coach who adapts to their pace, interests, and learning style.",
              },
              {
                title: "Real things they can show you",
                description:
                  "Apps, websites, AI models, tournament wins. Every track ends with tangible work your child is proud of.",
              },
              {
                title: "We come to you",
                description:
                  "Live online or at your home in Nairobi. Premium concierge coaching on your family's schedule.",
              },
            ].map((item) => (
              <div key={item.title} className="text-center">
                <div className="w-12 h-12 rounded-xl bg-gold/10 flex items-center justify-center mx-auto mb-4">
                  <Star className="w-6 h-6 text-gold" />
                </div>
                <h3 className="text-lg font-bold text-navy">{item.title}</h3>
                <p className="mt-2 text-slate text-sm leading-relaxed">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonial Placeholder */}
      <section className="py-20 md:py-28 bg-navy text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-gold text-sm font-semibold uppercase tracking-widest mb-6">
            What Parents Say
          </p>
          <blockquote className="text-2xl md:text-3xl font-medium leading-relaxed italic text-white/90">
            &ldquo;My 11-year-old showed me the app she built, on her own
            phone. She was beaming. Cognitron didn&apos;t just teach her to
            code. It gave her something to be genuinely proud of.&rdquo;
          </blockquote>
          <p className="mt-8 text-white/50 text-sm">
            — Parent, Nairobi
          </p>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-20 md:py-28 bg-off-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold text-navy text-center mb-12">
            Frequently asked questions
          </h2>

          <div className="space-y-6">
            {[
              {
                q: "What ages do you teach?",
                a: "Cognitron Academy serves children and teens aged 6–17. Our Chess & Strategy track starts from age 6, while Coding and AI tracks are best suited for ages 8 and above.",
              },
              {
                q: "Is everything online, or do you offer in-person coaching?",
                a: "Both. We offer live online sessions and premium home coaching where our coaches come to your location. You choose what works best for your family.",
              },
              {
                q: "My child already watches coding videos on YouTube. How is this different?",
                a: "Videos are passive. Cognitron is hands-on. Your child writes real code with a live coach who reviews their work, answers questions in real time, and pushes them further than a video ever can. They build real projects, not just follow along.",
              },
              {
                q: "What will my child actually build?",
                a: "Real things they can show you. Coding students build apps and websites. AI students train image classifiers and chatbots. Chess students develop tournament-level strategy. Every track ends with a project they present to family.",
              },
              {
                q: "My child already learns coding at school. Do they need Cognitron?",
                a: "School ICT classes are a great start, but they typically cover basics like Scratch or introductory HTML in a class of 30+. Cognitron goes deeper: real Python, JavaScript, AI tools, and competitive chess, with a dedicated coach who adapts to your child's level. We build on what school teaches, never repeat it.",
              },
              {
                q: "What is Cognitron Protect?",
                a: "Our digital safety service for families and executives. We secure your devices, set up parental controls, monitor for threats, and provide ongoing cybersecurity support so your family is safe online.",
              },
            ].map((item) => (
              <div
                key={item.q}
                className="bg-white rounded-xl p-6 border border-navy/5"
              >
                <h3 className="font-semibold text-navy">{item.q}</h3>
                <p className="mt-2 text-slate text-sm leading-relaxed">
                  {item.a}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-20 md:py-24 bg-navy text-white text-center">
        <div className="max-w-2xl mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold">
            Ready to invest in your child&apos;s future?
          </h2>
          <p className="mt-4 text-white/60 text-lg">
            Book a free 15-minute consultation. No pressure, no obligations,
            just a conversation about what&apos;s possible.
          </p>
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 mt-8 bg-gold text-navy px-8 py-3.5 rounded-full font-semibold hover:bg-gold-light transition-colors"
          >
            Book a free consultation <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>
    </>
  );
}
