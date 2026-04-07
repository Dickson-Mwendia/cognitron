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
  MessageCircle,
  GraduationCap,
  Sparkles,
  Target,
  Clock,
  MapPin,
  Award,
  Quote,
  ChevronRight,
} from "lucide-react";

const testimonials = [
  {
    quote:
      "My 11-year-old showed me the app she built - on her own phone. She was beaming. Cognitron didn't just teach her to code. It gave her something to be genuinely proud of.",
    name: "Wanjiku M.",
    detail: "Mother of two, Nairobi",
    childContext: "Daughter, age 11 - Coding track",
  },
  {
    quote:
      "He used to spend hours watching YouTube. Now he spends hours building things. Same screen, completely different child. Even his teachers noticed the difference in his problem-solving.",
    name: "James O.",
    detail: "Father, Nairobi",
    childContext: "Son, age 13 - AI & Coding tracks",
  },
  {
    quote:
      "What sold me was the home coaching. With Nairobi traffic, getting the kids to another class was impossible. Coach Dickson comes to us every Saturday and the boys are genuinely excited.",
    name: "Amina K.",
    detail: "Mother of three, Nairobi",
    childContext: "Sons, ages 9 & 12 - Chess & Coding tracks",
  },
  {
    quote:
      "My daughter went from not knowing what Python was to building a chatbot that helps her organise homework. In eight weeks. She's already talking about studying Computer Science.",
    name: "Dr. Patricia N.",
    detail: "Parent, Nairobi",
    childContext: "Daughter, age 14 - AI track",
  },
  // PLACEHOLDER: Replace with real testimonial
  {
    quote:
      "I enrolled Njeri in the coding track because she wanted to make apps — I wasn't thinking about maths at all. Then her Year 7 teacher called to say she'd jumped two sets in maths. When I asked Njeri about it, she shrugged and said 'It's just logic, Mum — same as debugging.' That's when I knew this was worth every shilling.",
    name: "Florence W.",
    detail: "Mother, Karen",
    childContext: "Daughter, age 12 - Coding track",
  },
];

export const dynamic = 'force-static'

export default function Home() {
  return (
    <>
      {/* Hero */}
      <section className="bg-navy text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-navy-light via-navy to-navy-dark opacity-80" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 md:py-36">
          <div className="max-w-3xl">
            <p className="text-gold text-sm font-semibold uppercase tracking-widest mb-4">
              Coding, AI &amp; Chess coaching for kids &amp; teens
            </p>
            <h1 className="text-4xl md:text-6xl font-bold leading-tight tracking-tight">
              Your child builds apps, masters AI and competes in Chess -{" "}
              <span className="text-gold">with a coach who comes home.</span>
            </h1>
            <p className="mt-6 text-lg md:text-xl text-white/70 leading-relaxed max-w-2xl">
              Coding, artificial
              intelligence, and chess - with expert coaches who teach at your
              home or live online. Groups of 4 or fewer. Real projects from
              week one.
            </p>
            <div className="mt-10 flex flex-col sm:flex-row gap-4">
              <Link
                href="/contact"
                className="inline-flex items-center justify-center gap-2 bg-gold text-navy px-8 py-3.5 rounded-full font-semibold hover:bg-gold-light transition-colors"
              >
                Book Your Child&apos;s Free First Lesson{" "}
                <ArrowRight className="w-4 h-4" />
              </Link>
              <a
                href="https://wa.me/254710643847?text=Hi%2C%20I%27d%20like%20to%20learn%20about%20Cognitron%20for%20my%20child"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 border border-white/30 text-white px-8 py-3.5 rounded-full font-semibold hover:bg-white/10 transition-colors"
              >
                <MessageCircle className="w-4 h-4" /> Chat on WhatsApp
              </a>
            </div>
            <p className="mt-4 text-white/40 text-sm">
              No commitment required. See if Cognitron is right for your family.
            </p>
          </div>
        </div>
      </section>

      {/* Trust Bar */}
      <section className="bg-white border-b border-navy/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-wrap items-center justify-center gap-x-10 gap-y-4 text-sm text-slate">
            <span className="flex items-center gap-2">
              <Users className="w-4 h-4 text-gold" />
              Trusted by families across Nairobi
            </span>
            <span className="flex items-center gap-2">
              <Star className="w-4 h-4 text-gold" />
              Max 4 students per session
            </span>
            <span className="flex items-center gap-2">
              <MapPin className="w-4 h-4 text-gold" />
              Home coaching available across Nairobi
            </span>
            <span className="flex items-center gap-2">
              <Award className="w-4 h-4 text-gold" />
              Certified learning transcripts
            </span>
          </div>
        </div>
      </section>

      {/* Screen Time Reframe */}
      <section className="py-16 md:py-20 bg-off-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center gap-2 bg-gold/10 text-gold-dark px-4 py-1.5 rounded-full text-sm font-semibold mb-6">
            <Sparkles className="w-4 h-4" />
            The Cognitron Difference
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-navy">
            Turn screen time into{" "}
            <span className="text-gold">skill time.</span>
          </h2>
          <p className="mt-4 text-slate text-lg max-w-2xl mx-auto">
            Every hour your child spends with Cognitron, they&apos;re building
            something real - not consuming content. Same screen, completely
            different outcome.
          </p>
        </div>
      </section>

      {/* Three Tracks */}
      <section className="py-20 md:py-28 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-navy">
              Three tracks. One mission.
            </h2>
            <p className="mt-4 text-slate text-lg">
              Your child chooses their path - or combines all three. Each track
              produces real, tangible results they can show you.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="group rounded-2xl border border-navy/10 bg-off-white p-8 hover:shadow-xl transition-shadow">
              <div className="w-14 h-14 rounded-xl bg-navy flex items-center justify-center mb-6">
                <Code className="w-7 h-7 text-gold" />
              </div>
              <h3 className="text-xl font-bold text-navy">
                Coding and app development
              </h3>
              <p className="mt-3 text-slate text-sm leading-relaxed">
                Younger kids start with Scratch - games, animations, creative
                projects. Older students progress to Python and web
                development. Every child works at their pace, with a coach
                who adapts to them.
              </p>
              <p className="mt-4 text-xs font-semibold text-navy/50 uppercase tracking-wider">
                Ages 8–17
              </p>
              <Link
                href="/academy/coding"
                className="inline-flex items-center gap-2 mt-6 text-gold-dark font-semibold text-sm group-hover:gap-3 transition-all"
              >
                Learn more <ArrowRight className="w-4 h-4" />
              </Link>
            </div>

            <div className="group rounded-2xl border border-navy/10 bg-off-white p-8 hover:shadow-xl transition-shadow">
              <div className="w-14 h-14 rounded-xl bg-navy flex items-center justify-center mb-6">
                <Brain className="w-7 h-7 text-gold" />
              </div>
              <h3 className="text-xl font-bold text-navy">
                AI and machine learning
              </h3>
              <p className="mt-3 text-slate text-sm leading-relaxed">
                Your child already uses AI every day. We help them understand
                how it works, build with AI tools creatively, and think
                critically about a technology shaping their future. No coding
                experience needed to start.
              </p>
              <p className="mt-4 text-xs font-semibold text-navy/50 uppercase tracking-wider">
                Ages 10–17
              </p>
              <Link
                href="/academy/ai"
                className="inline-flex items-center gap-2 mt-6 text-gold-dark font-semibold text-sm group-hover:gap-3 transition-all"
              >
                Learn more <ArrowRight className="w-4 h-4" />
              </Link>
            </div>

            <div className="group rounded-2xl border border-navy/10 bg-off-white p-8 hover:shadow-xl transition-shadow">
              <div className="w-14 h-14 rounded-xl bg-navy flex items-center justify-center mb-6">
                <Trophy className="w-7 h-7 text-gold" />
              </div>
              <h3 className="text-xl font-bold text-navy">
                Chess and strategic thinking
              </h3>
              <p className="mt-3 text-slate text-sm leading-relaxed">
                From first moves to tournament competition. Chess builds
                concentration, pattern recognition, and strategic thinking that
                transfers to every subject in school.
              </p>
              <p className="mt-4 text-xs font-semibold text-navy/50 uppercase tracking-wider">
                Ages 6–17
              </p>
              <Link
                href="/academy/chess"
                className="inline-flex items-center gap-2 mt-6 text-gold-dark font-semibold text-sm group-hover:gap-3 transition-all"
              >
                Learn more <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>

          <div className="mt-12 text-center">
            <Link
              href="/academy"
              className="inline-flex items-center gap-2 text-navy font-semibold hover:text-gold-dark transition-colors"
            >
              Explore all Academy tracks <ChevronRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 md:py-28 bg-off-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-navy">
              From sign-up to first project in three steps
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                step: "01",
                title: "Book a free trial lesson",
                description:
                  "Tell us your child's age and interests. We'll match them with the right coach and track - then your child tries a real session, free.",
                icon: Users,
              },
              {
                step: "02",
                title: "Get a personalised learning plan",
                description:
                  "Your coach builds a curriculum around your child's level and pace. At your home, live online, or a mix of both - on your family's schedule.",
                icon: Monitor,
              },
              {
                step: "03",
                title: "Watch them build real things",
                description:
                  "From week one, your child creates projects they can show you. Apps, AI models, chess strategies. Tangible proof, not just screen time.",
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
              Book your child&apos;s free first lesson{" "}
              <ArrowRight className="w-4 h-4" />
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
                icon: Target,
                title: "Not another YouTube tutorial",
                description:
                  "Hands-on, project-based, never passive. Your child writes real code with a live coach - not watching pre-recorded videos in a class of 40.",
              },
              {
                icon: Users,
                title: "A coach who knows your child",
                description:
                  "Groups of 4 or fewer. Your child gets a dedicated coach who adapts to their pace, celebrates their wins, and pushes them further.",
              },
              {
                icon: GraduationCap,
                title: "Projects they're proud of",
                description:
                  "Games, websites, AI experiments, chess wins. Every term ends with finished work your child created themselves - and can't wait to show you.",
              },
              {
                icon: MapPin,
                title: "We come to your home",
                description:
                  "Skip the Nairobi traffic. Our coaches come to your home, anywhere in the city. Or learn live online.",
              },
            ].map((item) => (
              <div key={item.title} className="text-center">
                <div className="w-12 h-12 rounded-xl bg-gold/10 flex items-center justify-center mx-auto mb-4">
                  <item.icon className="w-6 h-6 text-gold" />
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

      {/* Progression System */}
      <section className="py-16 md:py-20 bg-off-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-navy">
              A clear path from curious to capable
            </h2>
            <p className="mt-4 text-slate text-lg">
              Every student progresses through four levels. You&apos;ll always
              know exactly where your child is - and where they&apos;re headed.
            </p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
            {[
              {
                level: "Explorer",
                description: "Discovers fundamentals and finds their spark",
                color: "bg-navy/5 border-navy/10",
                badge: "🌱",
              },
              {
                level: "Builder",
                description: "Creates first real projects with guidance",
                color: "bg-gold/5 border-gold/20",
                badge: "🔨",
              },
              {
                level: "Creator",
                description: "Works independently on complex challenges",
                color: "bg-gold/10 border-gold/30",
                badge: "⚡",
              },
              {
                level: "Architect",
                description:
                  "Leads projects and mentors younger students",
                color: "bg-navy border-navy text-white",
                badge: "🏆",
              },
            ].map((item, i) => (
              <div
                key={item.level}
                className={`rounded-xl border p-5 text-center ${item.color}`}
              >
                <div className="text-2xl mb-2">{item.badge}</div>
                <p className="font-bold text-sm">{item.level}</p>
                <p
                  className={`mt-1 text-xs leading-relaxed ${
                    i === 3 ? "text-white/70" : "text-slate"
                  }`}
                >
                  {item.description}
                </p>
              </div>
            ))}
          </div>
          <p className="text-center mt-6 text-slate text-sm">
            Every level milestone earns a certificate and portfolio review.
            Documented transcripts available for school and university
            applications.
          </p>
        </div>
      </section>

      {/* Meet Your Lead Coach */}
      <section className="py-20 md:py-28 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-navy">
              Meet your lead coach
            </h2>
            <p className="mt-4 text-slate text-lg">
              Your child&apos;s success starts with who teaches them.
            </p>
          </div>
          <div className="bg-off-white rounded-2xl border border-navy/10 p-8 md:p-10 flex flex-col md:flex-row gap-8 items-center">
            <div className="w-32 h-32 rounded-full bg-navy flex items-center justify-center shrink-0">
              <span className="text-4xl font-bold text-gold">DM</span>
            </div>
            <div>
              <h3 className="text-2xl font-bold text-navy">
                Dickson Mwendia
              </h3>
              <p className="text-gold-dark font-semibold text-sm mt-1">
                Founder
              </p>
              <p className="mt-4 text-slate leading-relaxed">
                Dickson founded Cognitron with a simple belief: every child
                deserves great tech education, taught by someone who
                actually knows them. He leads the coaching team
                personally, ensuring every student gets the mentorship,
                challenge, and encouragement they need to build things they
                never thought possible.
              </p>
              <a
                href="https://wa.me/254710643847?text=Hi%20Dickson%2C%20I%27d%20like%20to%20learn%20about%20Cognitron%20for%20my%20child"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 mt-4 text-gold-dark font-semibold text-sm hover:gap-3 transition-all"
              >
                <MessageCircle className="w-4 h-4" /> Message Dickson directly
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 md:py-28 bg-navy text-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <p className="text-gold text-sm font-semibold uppercase tracking-widest mb-4">
              What Nairobi Parents Say
            </p>
            <h2 className="text-3xl md:text-4xl font-bold">
              Real families. Real results.
            </h2>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {testimonials.map((t) => (
              <div
                key={t.name}
                className="bg-white/5 border border-white/10 rounded-2xl p-8"
              >
                <Quote className="w-8 h-8 text-gold/40 mb-4" />
                <blockquote className="text-white/90 leading-relaxed">
                  &ldquo;{t.quote}&rdquo;
                </blockquote>
                <div className="mt-6 pt-4 border-t border-white/10">
                  <p className="font-semibold text-white">{t.name}</p>
                  <p className="text-white/50 text-sm">{t.detail}</p>
                  <p className="text-gold/60 text-xs mt-1">{t.childContext}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* After-School Advantage */}
      <section className="py-16 md:py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <h2 className="text-3xl md:text-4xl font-bold text-navy">
              &ldquo;But my child already learns coding at school.&rdquo;
            </h2>
          </div>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-off-white rounded-xl p-6 border border-navy/5">
              <p className="text-xs font-semibold text-slate uppercase tracking-wider mb-4">
                Typical School ICT
              </p>
              <ul className="space-y-3 text-sm text-slate">
                <li className="flex items-start gap-2">
                  <span className="text-slate-light mt-0.5">-</span>
                  Scratch or basic HTML
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-slate-light mt-0.5">-</span>
                  Class of 30–40 students
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-slate-light mt-0.5">-</span>
                  Follow-along exercises
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-slate-light mt-0.5">-</span>
                  Same pace for everyone
                </li>
              </ul>
            </div>
            <div className="bg-navy rounded-xl p-6 text-white">
              <p className="text-xs font-semibold text-gold uppercase tracking-wider mb-4">
                Cognitron Academy
              </p>
              <ul className="space-y-3 text-sm text-white/80">
                <li className="flex items-start gap-2">
                  <span className="text-gold mt-0.5">✓</span>
                  Scratch, Python, AI tools - age-appropriate
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-gold mt-0.5">✓</span>
                  Max 4 students per coach
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-gold mt-0.5">✓</span>
                  Hands-on projects every session
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-gold mt-0.5">✓</span>
                  Personalised to your child&apos;s level
                </li>
              </ul>
            </div>
          </div>
          <p className="text-center mt-6 text-slate text-sm">
            We build on what school teaches - we never repeat it.
          </p>
        </div>
      </section>

      {/* Protect Teaser */}
      <section className="py-16 md:py-20 bg-off-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-navy rounded-2xl p-8 md:p-12 flex flex-col md:flex-row items-center gap-8">
            <div className="flex-1">
              <div className="inline-flex items-center gap-2 bg-white/10 text-gold px-3 py-1 rounded-full text-xs font-semibold mb-4">
                <ShieldCheck className="w-3.5 h-3.5" />
                Also from Cognitron
              </div>
              <h3 className="text-2xl md:text-3xl font-bold text-white">
                Your kids build. Your family stays protected.
              </h3>
              <p className="mt-3 text-white/60 leading-relaxed">
                Cognitron Protect offers comprehensive digital safety for
                families and personal cybersecurity for executives. Because the
                same parents investing in their children&apos;s digital future
                should also be securing it.
              </p>
              <div className="mt-6 flex flex-wrap gap-4">
                <Link
                  href="/protect/family"
                  className="inline-flex items-center gap-2 text-gold font-semibold text-sm hover:gap-3 transition-all"
                >
                  <HomeIcon className="w-4 h-4" /> Family Safety{" "}
                  <ArrowRight className="w-3 h-3" />
                </Link>
                <Link
                  href="/protect/executive"
                  className="inline-flex items-center gap-2 text-gold font-semibold text-sm hover:gap-3 transition-all"
                >
                  <Lock className="w-4 h-4" /> Executive Protection{" "}
                  <ArrowRight className="w-3 h-3" />
                </Link>
              </div>
            </div>
            <div className="w-24 h-24 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center shrink-0">
              <ShieldCheck className="w-12 h-12 text-gold" />
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-20 md:py-28 bg-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold text-navy text-center mb-12">
            Questions parents ask
          </h2>

          <div className="space-y-6">
            {[
              {
                q: "What ages do you teach?",
                a: "Chess welcomes players from age 6. Coding is best from age 8. AI starts from age 10. All tracks run up to age 17.",
              },
              {
                q: "Do your coaches come to our home?",
                a: "Yes. We offer premium home coaching across Nairobi. We also offer live online sessions. You choose what works for your family.",
              },
              {
                q: "My child watches coding tutorials on YouTube. How is this different?",
                a: "YouTube is passive. Cognitron is hands-on. Your child writes real code with a live coach who reviews their work, gives feedback in real time, and challenges them to go further. They build real projects from week one - not just follow along.",
              },
              {
                q: "What will my child actually build?",
                a: "Coding students build working apps and websites. AI students train image classifiers and chatbots. Chess students develop tournament-level strategy. Every track produces tangible work your child can demonstrate - and add to university applications.",
              },
              {
                q: "My child already learns coding at school. Is Cognitron worth it?",
                a: "School ICT covers basics - Scratch, introductory HTML - in a class of 30+. Cognitron teaches real Python, JavaScript, and AI tools, with a dedicated coach for groups of 4 or fewer. We build on what school teaches. We never repeat it.",
              },
              {
                q: "Does Cognitron help with school maths?",
                a: "Every track builds mathematical thinking — but we're not a maths tutor. Coding teaches logic, sequencing, and algorithms. Chess develops calculation, spatial reasoning, and probability. AI introduces data patterns, statistics, and estimation. We teach the thinking behind the maths, and parents consistently tell us their children's confidence and performance in school maths improves as a result. We complement school — we don't replace it.",
              },
              {
                q: "How do I know my child is progressing?",
                a: "Every student moves through our four-level system (Explorer → Builder → Creator → Architect) with documented milestones, project reviews, and certificates. You'll receive regular progress updates, and your child presents their work at each milestone.",
              },
            ].map((item) => (
              <div
                key={item.q}
                className="bg-off-white rounded-xl p-6 border border-navy/5"
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
            Give your child the edge that matters.
          </h2>
          <p className="mt-4 text-white/60 text-lg">
            Book a free trial lesson. Your child tries a real session - coding,
            AI, or chess - with zero commitment. If they love it, we&apos;ll
            build their learning plan together.
          </p>
          <div className="mt-8 flex flex-col sm:flex-row justify-center gap-4">
            <Link
              href="/contact"
              className="inline-flex items-center justify-center gap-2 bg-gold text-navy px-8 py-3.5 rounded-full font-semibold hover:bg-gold-light transition-colors"
            >
              Book a free trial lesson <ArrowRight className="w-4 h-4" />
            </Link>
            <a
              href="https://wa.me/254710643847?text=Hi%2C%20I%27d%20like%20to%20book%20a%20free%20trial%20lesson%20for%20my%20child"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 border border-white/30 text-white px-8 py-3.5 rounded-full font-semibold hover:bg-white/10 transition-colors"
            >
              <MessageCircle className="w-4 h-4" /> WhatsApp us
            </a>
          </div>
          <p className="mt-6 text-white/30 text-sm flex items-center justify-center gap-2">
            <Clock className="w-3.5 h-3.5" />
            Most families hear back within 2 hours
          </p>
        </div>
      </section>
    </>
  );
}
