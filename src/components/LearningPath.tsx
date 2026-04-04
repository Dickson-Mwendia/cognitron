import { Award, ArrowRight, ChevronRight } from "lucide-react";
import Link from "next/link";

interface Level {
  name: string;
  badge: string;
  term: string;
  skills: string[];
  project: string;
}

interface LearningPathProps {
  track: string;
  levels: Level[];
}

export function LearningPath({ track, levels }: LearningPathProps) {
  return (
    <section className="py-20 bg-off-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 bg-gold/10 text-gold-dark px-4 py-1.5 rounded-full text-sm font-semibold mb-4">
            <Award className="w-4 h-4" />
            {track} Learning Path
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-navy">
            From curious to capable - a clear path forward
          </h2>
          <p className="mt-4 text-slate text-lg max-w-2xl mx-auto">
            Every student progresses through four levels. Each milestone earns a
            certificate and portfolio review. You&apos;ll always know where your
            child is - and where they&apos;re headed.
          </p>
        </div>

        {/* Level cards - stacked vertically for clarity */}
        <div className="space-y-6">
          {levels.map((level, i) => (
            <div
              key={level.name}
              className={`rounded-2xl border overflow-hidden ${
                i === 3
                  ? "bg-navy text-white border-navy"
                  : "bg-white border-navy/10"
              }`}
            >
              <div className="flex flex-col md:flex-row">
                {/* Left: Level badge & name */}
                <div
                  className={`flex items-center gap-4 p-6 md:p-8 md:w-64 md:shrink-0 md:border-r ${
                    i === 3
                      ? "bg-navy border-white/10"
                      : i === 2
                      ? "bg-gold/5 border-navy/5"
                      : i === 1
                      ? "bg-gold/[0.03] border-navy/5"
                      : "bg-navy/[0.02] border-navy/5"
                  }`}
                >
                  <div
                    className={`w-14 h-14 rounded-full flex items-center justify-center text-2xl shrink-0 ${
                      i === 3
                        ? "bg-white/10 ring-2 ring-gold/40"
                        : i === 2
                        ? "bg-gold/20 ring-2 ring-gold/20"
                        : i === 1
                        ? "bg-gold/10 ring-2 ring-gold/10"
                        : "bg-navy/5 ring-2 ring-navy/10"
                    }`}
                  >
                    {level.badge}
                  </div>
                  <div>
                    <p
                      className={`text-xs font-semibold uppercase tracking-wider ${
                        i === 3 ? "text-gold" : "text-gold-dark"
                      }`}
                    >
                      {level.term}
                    </p>
                    <h3
                      className={`text-xl font-bold ${
                        i === 3 ? "text-white" : "text-navy"
                      }`}
                    >
                      {level.name}
                    </h3>
                  </div>
                </div>

                {/* Right: Skills & project */}
                <div className="flex-1 p-6 md:p-8">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-2">
                    {level.skills.map((skill) => (
                      <div
                        key={skill}
                        className={`flex items-start gap-2 text-sm leading-relaxed ${
                          i === 3 ? "text-white/80" : "text-slate"
                        }`}
                      >
                        <span className="text-gold mt-0.5 shrink-0">✓</span>
                        <span>{skill}</span>
                      </div>
                    ))}
                  </div>

                  <div
                    className={`mt-5 pt-5 border-t flex items-start gap-3 ${
                      i === 3 ? "border-white/10" : "border-navy/5"
                    }`}
                  >
                    <span
                      className={`text-xs font-bold uppercase tracking-wider whitespace-nowrap mt-0.5 ${
                        i === 3 ? "text-gold" : "text-navy"
                      }`}
                    >
                      Milestone:
                    </span>
                    <p
                      className={`text-sm leading-relaxed ${
                        i === 3 ? "text-white/70" : "text-slate"
                      }`}
                    >
                      {level.project}
                    </p>
                  </div>
                </div>
              </div>

              {/* Arrow connector between levels (not after last) */}
              {i < levels.length - 1 && (
                <div className="flex justify-center -mb-3 relative z-10 md:hidden">
                  <ChevronRight className="w-5 h-5 text-navy/20 rotate-90" />
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Connector arrows between cards (desktop) */}
        <div className="hidden md:flex justify-center items-center gap-2 mt-8 mb-2">
          {levels.map((level, i) => (
            <div key={level.name} className="flex items-center gap-2">
              <span className="text-sm font-semibold text-navy/60">
                {level.badge} {level.name}
              </span>
              {i < levels.length - 1 && (
                <ArrowRight className="w-4 h-4 text-gold" />
              )}
            </div>
          ))}
        </div>

        <div className="text-center mt-10">
          <p className="text-slate text-sm mb-4">
            Every level milestone earns a certificate. Documented transcripts
            available for school and university applications.
          </p>
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 text-gold-dark font-semibold text-sm hover:gap-3 transition-all"
          >
            Book a free trial to find your child&apos;s starting level{" "}
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
