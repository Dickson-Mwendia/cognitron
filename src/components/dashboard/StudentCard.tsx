import Image from 'next/image';

interface StudentCardProps {
  firstName: string;
  lastName: string;
  avatarUrl: string | null;
  ageTier: string;
  tracks: readonly string[];
  totalXp: number;
  streak: number;
  currentLevel: number;
  lastActive: string;
  className?: string;
}

const trackBadges: Record<string, string> = {
  coding: '💻',
  ai: '🤖',
  chess: '♟️',
};

function formatLastActive(iso: string): string {
  const date = new Date(iso);
  const now = new Date();
  const diffMs = now.getTime() - date.getTime();
  const diffMins = Math.floor(diffMs / (1000 * 60));
  const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
  const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

  if (diffMins < 1) return 'Just now';
  if (diffMins < 60) return `${diffMins}m ago`;
  if (diffHours < 24) return `${diffHours}h ago`;
  if (diffDays < 7) return `${diffDays}d ago`;
  return date.toLocaleDateString('en-GB', { day: 'numeric', month: 'short' });
}

function getInitials(firstName: string, lastName: string): string {
  return `${firstName.charAt(0)}${lastName.charAt(0)}`.toUpperCase();
}

export function StudentCard({
  firstName,
  lastName,
  avatarUrl,
  ageTier,
  tracks,
  totalXp,
  streak,
  currentLevel,
  lastActive,
  className = '',
}: StudentCardProps) {
  return (
    <div
      className={`rounded-xl bg-navy-light p-4 cursor-pointer transition-all hover:ring-2 hover:ring-gold/40 hover:shadow-lg hover:shadow-gold/5 ${className}`}
    >
      <div className="flex items-start gap-3">
        {/* Avatar */}
        {avatarUrl ? (
          <Image
            src={avatarUrl}
            alt={`${firstName} ${lastName}`}
            width={44}
            height={44}
            className="w-11 h-11 rounded-full object-cover ring-2 ring-gold/30"
          />
        ) : (
          <div className="w-11 h-11 rounded-full bg-navy flex items-center justify-center ring-2 ring-gold/30">
            <span className="text-sm font-bold text-gold">
              {getInitials(firstName, lastName)}
            </span>
          </div>
        )}

        {/* Info */}
        <div className="flex-1 min-w-0">
          <h4 className="text-sm font-bold text-white truncate">
            {firstName} {lastName}
          </h4>
          <p className="text-xs text-slate-light">{ageTier}</p>
        </div>

        {/* Level */}
        <span className="text-xs font-semibold text-gold bg-navy px-2 py-0.5 rounded-full">
          Lv.{currentLevel}
        </span>
      </div>

      {/* Stats row */}
      <div className="flex items-center gap-3 mt-3 pt-3 border-t border-white/5">
        {/* Tracks */}
        <div className="flex items-center gap-1">
          {tracks.map((t) => (
            <span
              key={t}
              className="text-sm"
              title={t}
            >
              {trackBadges[t.toLowerCase()] ?? '📚'}
            </span>
          ))}
        </div>

        <span className="text-[10px] text-slate">·</span>

        {/* XP */}
        <span className="text-xs text-slate-light">
          ⭐ {totalXp.toLocaleString()} XP
        </span>

        <span className="text-[10px] text-slate">·</span>

        {/* Streak */}
        <span className="text-xs text-slate-light">🔥 {streak}d</span>

        {/* Last active - push right */}
        <span className="text-[10px] text-slate ml-auto">
          {formatLastActive(lastActive)}
        </span>
      </div>
    </div>
  );
}
