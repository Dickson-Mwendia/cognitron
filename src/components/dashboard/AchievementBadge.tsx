interface AchievementBadgeProps {
  name: string;
  description: string;
  icon: string;
  earned: boolean;
  earnedAt?: string | null;
  progress?: { current: number; total: number } | null;
  className?: string;
  onClick?: () => void;
}

function formatDate(iso: string): string {
  const d = new Date(iso);
  return d.toLocaleDateString('en-GB', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  });
}

export function AchievementBadge({
  name,
  description,
  icon,
  earned,
  earnedAt,
  progress,
  className = '',
  onClick,
}: AchievementBadgeProps) {
  const progressPercent =
    progress && progress.total > 0
      ? Math.min(100, (progress.current / progress.total) * 100)
      : 0;

  return (
    <div
      className={`relative rounded-xl p-4 flex flex-col items-center text-center gap-2 transition-all duration-200 ${
        earned
          ? 'bg-navy-light border-2 border-gold shadow-md hover:shadow-lg hover:shadow-gold/10 hover:scale-[1.03]'
          : 'bg-navy-light/60 border-2 border-dashed border-slate/40 hover:border-slate/60'
      } ${onClick ? 'cursor-pointer' : 'cursor-default'} ${className}`}
      onClick={onClick}
      role={onClick ? 'button' : undefined}
      tabIndex={onClick ? 0 : undefined}
      onKeyDown={onClick ? (e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); onClick(); } } : undefined}
    >
      {/* Icon */}
      <div
        className={`text-3xl leading-none ${earned ? '' : 'grayscale opacity-50'}`}
      >
        {earned ? (
          <span>{icon}</span>
        ) : (
          <div className="relative">
            <span>{icon}</span>
            <span className="absolute inset-0 flex items-center justify-center text-2xl font-bold text-slate">
              ?
            </span>
          </div>
        )}
      </div>

      {/* Name */}
      <h4
        className={`text-sm font-bold font-heading ${
          earned ? 'text-gold' : 'text-slate'
        }`}
      >
        {earned ? name : '???'}
      </h4>

      {/* Description */}
      <p className={`text-xs ${earned ? 'text-slate-light' : 'text-slate/60'}`}>
        {earned ? description : 'Keep going to unlock!'}
      </p>

      {/* Earned date */}
      {earned && earnedAt && (
        <span className="text-[10px] text-gold-dark">
          Earned {formatDate(earnedAt)}
        </span>
      )}

      {/* Progress bar for in-progress badges */}
      {!earned && progress && progress.total > 0 && (
        <div className="w-full mt-1">
          <div className="h-1.5 rounded-full bg-navy overflow-hidden">
            <div
              className="h-full rounded-full bg-gold/60"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
          <p className="text-[10px] text-slate-light mt-0.5">
            {progress.current}/{progress.total}
          </p>
        </div>
      )}
    </div>
  );
}
