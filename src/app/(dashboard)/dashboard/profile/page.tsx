import { requireRole } from '@/lib/auth'
import {
  getStudentDashboardData,
  getStudentAchievements,
} from '@/lib/queries'
import Link from 'next/link'
import {
  User,
  Award,
  Flame,
  Star,
  BookOpen,
  LogOut,
  ChevronRight,
} from 'lucide-react'

export const metadata = { title: 'Profile' }

const trackIcons: Record<string, string> = {
  coding: '💻',
  ai: '🤖',
  chess: '♟️',
}

export default async function ProfilePage() {
  const user = await requireRole(['student'])
  const data = await getStudentDashboardData(user)
  const achievements = await getStudentAchievements(user.id)
  const earnedAchievements = achievements.filter((a: { earned: boolean }) => a.earned)

  const memberSince = new Date(user.id ? Date.now() : Date.now()).toLocaleDateString('en-US', {
    month: 'long',
    year: 'numeric',
  })

  return (
    <div className="space-y-8">
      {/* ── Header ── */}
      <section className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm md:p-8">
        <div className="flex flex-col items-center gap-4 sm:flex-row sm:items-start">
          {/* Avatar */}
          <div className="flex h-20 w-20 shrink-0 items-center justify-center rounded-full bg-[#0c1b33] text-2xl font-bold text-white">
            {user.firstName[0]}
            {user.lastName[0]}
          </div>
          <div className="text-center sm:text-left">
            <h1 className="font-heading text-2xl font-bold text-[#0c1b33] md:text-3xl">
              {user.firstName} {user.lastName}
            </h1>
            <div className="mt-1 flex flex-wrap items-center justify-center gap-2 sm:justify-start">
              <span className="inline-flex items-center gap-1 rounded-full bg-[#d4a843]/10 px-3 py-1 text-xs font-semibold capitalize text-[#d4a843]">
                <User className="h-3 w-3" />
                {user.role}
              </span>
              {user.ageTier && (
                <span className="rounded-full bg-[#0c1b33]/5 px-3 py-1 text-xs font-medium text-[#0c1b33]/60">
                  Ages {user.ageTier}
                </span>
              )}
            </div>
            <p className="mt-2 text-sm text-[#0c1b33]/50">
              Member since {memberSince}
            </p>
          </div>
        </div>
      </section>

      {/* ── Quick Stats ── */}
      <section className="grid grid-cols-2 gap-4 md:grid-cols-4">
        <div className="rounded-2xl border border-gray-200 bg-white p-4 text-center shadow-sm">
          <Star className="mx-auto mb-2 h-6 w-6 text-[#d4a843]" />
          <p className="text-2xl font-bold text-[#0c1b33]">
            {data.totalXp.toLocaleString()}
          </p>
          <p className="text-xs text-[#0c1b33]/50 uppercase">Total XP</p>
        </div>
        <div className="rounded-2xl border border-gray-200 bg-white p-4 text-center shadow-sm">
          <Flame className="mx-auto mb-2 h-6 w-6 text-[#e8614d]" />
          <p className="text-2xl font-bold text-[#0c1b33]">{data.streak}</p>
          <p className="text-xs text-[#0c1b33]/50 uppercase">Day Streak</p>
        </div>
        <div className="rounded-2xl border border-gray-200 bg-white p-4 text-center shadow-sm">
          <Award className="mx-auto mb-2 h-6 w-6 text-[#2a9d8f]" />
          <p className="text-2xl font-bold text-[#0c1b33]">
            {earnedAchievements.length}
          </p>
          <p className="text-xs text-[#0c1b33]/50 uppercase">Achievements</p>
        </div>
        <div className="rounded-2xl border border-gray-200 bg-white p-4 text-center shadow-sm">
          <BookOpen className="mx-auto mb-2 h-6 w-6 text-[#6366f1]" />
          <p className="text-2xl font-bold text-[#0c1b33]">
            {data.currentLevel}
          </p>
          <p className="text-xs text-[#0c1b33]/50 uppercase">Level</p>
        </div>
      </section>

      {/* ── Enrolled Tracks ── */}
      <section>
        <h2 className="font-heading text-xl font-bold text-[#0c1b33] mb-4">
          Enrolled Tracks
        </h2>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
          {data.tracks.map((track) => (
            <div
              key={track.trackId}
              className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm transition-all hover:shadow-md hover:border-[#d4a843]/30"
            >
              <div className="mb-3 flex items-center gap-2">
                <span className="text-2xl">
                  {trackIcons[track.trackName]}
                </span>
                <h3 className="font-heading font-bold capitalize text-[#0c1b33]">
                  {track.trackName}
                </h3>
              </div>
              <p className="mb-3 text-sm text-[#0c1b33]/60">
                {track.currentLevelName}
              </p>

              {/* Progress bar */}
              <div className="mb-2">
                <div className="flex items-center justify-between text-xs text-[#0c1b33]/50 mb-1">
                  <span>Level {track.currentLevel}</span>
                  <span>
                    {track.levelXp.toLocaleString()} /{' '}
                    {track.xpToNextLevel.toLocaleString()} XP
                  </span>
                </div>
                <div className="h-2 w-full rounded-full bg-gray-100">
                  <div
                    className="h-2 rounded-full bg-[#d4a843] transition-all"
                    style={{ width: `${track.progressPercent}%` }}
                  />
                </div>
              </div>

              <p className="text-xs text-[#0c1b33]/50">
                {track.completedLessons} / {track.totalLessons} lessons
                completed
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* ── Account Settings ── */}
      <section>
        <h2 className="font-heading text-xl font-bold text-[#0c1b33] mb-4">
          Account Settings
        </h2>
        <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm md:p-6">
          <div className="space-y-4">
            <div className="flex flex-col gap-1 sm:flex-row sm:items-center sm:gap-4">
              <label className="w-32 text-sm font-medium text-[#0c1b33]/70">
                Email
              </label>
              <p className="text-sm text-[#0c1b33]">{user.email}</p>
            </div>
            <div className="border-t border-gray-100" />
            <div className="flex flex-col gap-1 sm:flex-row sm:items-center sm:gap-4">
              <label className="w-32 text-sm font-medium text-[#0c1b33]/70">
                Display Name
              </label>
              <p className="text-sm text-[#0c1b33]">
                {user.firstName} {user.lastName}
              </p>
            </div>
            <div className="border-t border-gray-100" />
            <div className="flex flex-col gap-1 sm:flex-row sm:items-center sm:gap-4">
              <label className="w-32 text-sm font-medium text-[#0c1b33]/70">
                Age Tier
              </label>
              <p className="text-sm text-[#0c1b33]">
                {user.ageTier ?? 'Not set'}
              </p>
            </div>
            <div className="border-t border-gray-100" />
            <div className="flex flex-col gap-1 sm:flex-row sm:items-center sm:gap-4">
              <label className="w-32 text-sm font-medium text-[#0c1b33]/70">
                Role
              </label>
              <p className="text-sm capitalize text-[#0c1b33]">{user.role}</p>
            </div>
          </div>
        </div>
      </section>

      {/* ── Actions ── */}
      <section className="flex flex-wrap gap-3">
        <Link
          href="/dashboard"
          className="inline-flex items-center gap-2 rounded-full bg-[#0c1b33] px-5 py-2.5 text-sm font-semibold text-white transition-all hover:bg-[#0c1b33]/90 hover:shadow-md active:scale-[0.97]"
        >
          <ChevronRight className="h-4 w-4 rotate-180" />
          Back to Dashboard
        </Link>
        <form action="/api/auth/signout" method="POST">
          <button
            type="submit"
            className="inline-flex items-center gap-2 rounded-full border-2 border-[#e8614d]/30 px-5 py-2.5 text-sm font-semibold text-[#e8614d] transition-all hover:bg-[#e8614d]/5 hover:shadow-sm active:scale-[0.97]"
          >
            <LogOut className="h-4 w-4" />
            Sign Out
          </button>
        </form>
      </section>
    </div>
  )
}
