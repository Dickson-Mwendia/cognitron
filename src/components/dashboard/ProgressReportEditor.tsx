'use client'

import { useState } from 'react'
import Link from 'next/link'
import {
  ArrowLeft,
  Save,
  Send,
  Printer,
  Star,
  Check,
  Plus,
  X,
} from 'lucide-react'
import type { ProgressReportData } from '@/lib/mock-data'

interface ProgressReportEditorProps {
  initialData: ProgressReportData
  backHref: string
  backLabel: string
}

export function ProgressReportEditor({
  initialData,
  backHref,
  backLabel,
}: ProgressReportEditorProps) {
  const [report, setReport] = useState<ProgressReportData>(initialData)
  const [toast, setToast] = useState<string | null>(null)
  const [newAchievement, setNewAchievement] = useState('')

  function showToast(msg: string) {
    setToast(msg)
    setTimeout(() => setToast(null), 3000)
  }

  function updateField<K extends keyof ProgressReportData>(
    key: K,
    value: ProgressReportData[K],
  ) {
    setReport((prev) => ({ ...prev, [key]: value }))
  }

  function updateTrack(
    index: number,
    field: string,
    value: string | Array<{ name: string; demonstrated: boolean }> | string[],
  ) {
    setReport((prev) => ({
      ...prev,
      trackProgress: prev.trackProgress.map((t, i) =>
        i === index ? { ...t, [field]: value } : t,
      ),
    }))
  }

  function toggleSkill(trackIdx: number, skillIdx: number) {
    setReport((prev) => ({
      ...prev,
      trackProgress: prev.trackProgress.map((t, ti) =>
        ti === trackIdx
          ? {
              ...t,
              skills: t.skills.map((s, si) =>
                si === skillIdx ? { ...s, demonstrated: !s.demonstrated } : s,
              ),
            }
          : t,
      ),
    }))
  }

  function addProject(trackIdx: number, project: string) {
    if (!project.trim()) return
    setReport((prev) => ({
      ...prev,
      trackProgress: prev.trackProgress.map((t, i) =>
        i === trackIdx ? { ...t, projects: [...t.projects, project.trim()] } : t,
      ),
    }))
  }

  function removeProject(trackIdx: number, projIdx: number) {
    setReport((prev) => ({
      ...prev,
      trackProgress: prev.trackProgress.map((t, i) =>
        i === trackIdx
          ? { ...t, projects: t.projects.filter((_, pi) => pi !== projIdx) }
          : t,
      ),
    }))
  }

  function addAchievement() {
    if (!newAchievement.trim()) return
    setReport((prev) => ({
      ...prev,
      achievementsEarned: [
        ...prev.achievementsEarned,
        {
          id: `custom-${Date.now()}`,
          name: newAchievement.trim(),
          icon: '⭐',
          earnedAt: new Date().toISOString().split('T')[0],
        },
      ],
    }))
    setNewAchievement('')
  }

  function removeAchievement(id: string) {
    setReport((prev) => ({
      ...prev,
      achievementsEarned: prev.achievementsEarned.filter((a) => a.id !== id),
    }))
  }

  return (
    <>
      {/* Toast */}
      {toast && (
        <div className="fixed top-6 right-6 z-50 rounded-xl bg-[#2a9d8f] px-5 py-3 text-sm font-semibold text-white shadow-lg animate-fade-in print:hidden">
          {toast}
        </div>
      )}

      <div className="space-y-8 max-w-4xl mx-auto">
        {/* Navigation & Actions */}
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between print:hidden">
          <Link
            href={backHref}
            className="inline-flex items-center gap-1.5 text-sm font-medium text-[#0c1b33]/60 hover:text-[#0c1b33] transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            {backLabel}
          </Link>
          <div className="flex gap-2 flex-wrap">
            <button
              type="button"
              onClick={() => showToast('Draft saved successfully')}
              className="inline-flex items-center gap-2 rounded-full border border-gray-200 bg-white px-4 py-2 text-sm font-semibold text-[#0c1b33] transition-colors hover:bg-gray-50"
            >
              <Save className="w-4 h-4" />
              Save Draft
            </button>
            <button
              type="button"
              onClick={() => window.print()}
              className="inline-flex items-center gap-2 rounded-full border border-gray-200 bg-white px-4 py-2 text-sm font-semibold text-[#0c1b33] transition-colors hover:bg-gray-50"
            >
              <Printer className="w-4 h-4" />
              Print / PDF
            </button>
            <button
              type="button"
              onClick={() => showToast('Report sent to parent')}
              className="inline-flex items-center gap-2 rounded-full bg-[#0c1b33] px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-[#162d50]"
            >
              <Send className="w-4 h-4" />
              Send to Parent
            </button>
          </div>
        </div>

        {/* Print Header */}
        <div className="hidden print:block text-center mb-8">
          <h1 className="text-2xl font-bold text-[#0c1b33]">COGNITRON</h1>
          <p className="text-sm text-[#0c1b33]/60">Premium Tech Education</p>
          <div className="mt-2 h-1 w-24 mx-auto bg-[#d4a843] rounded-full" />
        </div>

        {/* Report Title */}
        <div className="text-center">
          <h1 className="font-heading text-3xl font-bold text-[#0c1b33]">
            Progress Report
          </h1>
          <p className="mt-1 text-[#0c1b33]/50 text-sm">
            {report.studentName}
          </p>
        </div>

        {/* Student Info — read-only */}
        <section className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
          <h2 className="font-heading text-lg font-bold text-[#0c1b33] mb-4">
            Student Information
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
            <div>
              <span className="text-[#0c1b33]/40">Name</span>
              <p className="font-semibold text-[#0c1b33]">{report.studentName}</p>
            </div>
            <div>
              <span className="text-[#0c1b33]/40">Age Tier</span>
              <p className="font-semibold text-[#0c1b33]">{report.ageTier}</p>
            </div>
            <div>
              <span className="text-[#0c1b33]/40">Enrolled Tracks</span>
              <p className="font-semibold text-[#0c1b33]">
                {report.enrolledTracks.join(', ')}
              </p>
            </div>
            <div>
              <span className="text-[#0c1b33]/40">Enrollment Date</span>
              <p className="font-semibold text-[#0c1b33]">
                {new Date(report.enrollmentDate).toLocaleDateString('en-GB', {
                  day: 'numeric',
                  month: 'long',
                  year: 'numeric',
                })}
              </p>
            </div>
            <div>
              <span className="text-[#0c1b33]/40">Coach</span>
              <p className="font-semibold text-[#0c1b33]">{report.coachName}</p>
            </div>
          </div>
        </section>

        {/* Period */}
        <section className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
          <h2 className="font-heading text-lg font-bold text-[#0c1b33] mb-4">
            Report Period
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="sm:col-span-1">
              <label className="block text-xs font-medium text-[#0c1b33]/40 mb-1">
                Period Name
              </label>
              <input
                type="text"
                value={report.period}
                onChange={(e) => updateField('period', e.target.value)}
                className="w-full rounded-xl border border-gray-200 bg-white px-4 py-2.5 text-sm text-[#0c1b33] outline-none focus:border-[#d4a843] focus:ring-2 focus:ring-[#d4a843]/20 transition-colors print:border-none print:p-0 print:ring-0"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-[#0c1b33]/40 mb-1">
                Start Date
              </label>
              <input
                type="date"
                value={report.periodStart}
                onChange={(e) => updateField('periodStart', e.target.value)}
                className="w-full rounded-xl border border-gray-200 bg-white px-4 py-2.5 text-sm text-[#0c1b33] outline-none focus:border-[#d4a843] focus:ring-2 focus:ring-[#d4a843]/20 transition-colors print:border-none print:p-0 print:ring-0"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-[#0c1b33]/40 mb-1">
                End Date
              </label>
              <input
                type="date"
                value={report.periodEnd}
                onChange={(e) => updateField('periodEnd', e.target.value)}
                className="w-full rounded-xl border border-gray-200 bg-white px-4 py-2.5 text-sm text-[#0c1b33] outline-none focus:border-[#d4a843] focus:ring-2 focus:ring-[#d4a843]/20 transition-colors print:border-none print:p-0 print:ring-0"
              />
            </div>
          </div>
        </section>

        {/* Overall Assessment */}
        <section className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
          <h2 className="font-heading text-lg font-bold text-[#0c1b33] mb-4">
            Overall Assessment
          </h2>
          <textarea
            value={report.overallAssessment}
            onChange={(e) => updateField('overallAssessment', e.target.value)}
            rows={5}
            className="w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm text-[#0c1b33] leading-relaxed outline-none focus:border-[#d4a843] focus:ring-2 focus:ring-[#d4a843]/20 transition-colors resize-y print:border-none print:p-0 print:ring-0"
          />
        </section>

        {/* Track Progress */}
        {report.trackProgress.map((track, idx) => (
          <section
            key={track.trackName}
            className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm print:break-inside-avoid"
          >
            <h2 className="font-heading text-lg font-bold text-[#0c1b33] mb-1">
              {track.trackName}
            </h2>
            <p className="text-sm text-[#d4a843] font-medium mb-4">
              {track.currentLevel}
            </p>

            {/* Skills */}
            <div className="mb-4">
              <h3 className="text-xs font-semibold uppercase tracking-wider text-[#0c1b33]/40 mb-2">
                Skills Demonstrated
              </h3>
              <div className="flex flex-wrap gap-2">
                {track.skills.map((skill, si) => (
                  <button
                    key={skill.name}
                    type="button"
                    onClick={() => toggleSkill(idx, si)}
                    className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-medium transition-colors print:border print:border-gray-300 ${
                      skill.demonstrated
                        ? 'bg-[#2a9d8f]/10 text-[#2a9d8f]'
                        : 'bg-gray-100 text-[#0c1b33]/40'
                    }`}
                  >
                    {skill.demonstrated && <Check className="w-3 h-3" />}
                    {skill.name}
                  </button>
                ))}
              </div>
            </div>

            {/* Strengths */}
            <div className="mb-4">
              <label className="block text-xs font-semibold uppercase tracking-wider text-[#0c1b33]/40 mb-2">
                Areas of Strength
              </label>
              <textarea
                value={track.strengths}
                onChange={(e) => updateTrack(idx, 'strengths', e.target.value)}
                rows={3}
                className="w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm text-[#0c1b33] leading-relaxed outline-none focus:border-[#d4a843] focus:ring-2 focus:ring-[#d4a843]/20 transition-colors resize-y print:border-none print:p-0 print:ring-0"
              />
            </div>

            {/* Improvements */}
            <div className="mb-4">
              <label className="block text-xs font-semibold uppercase tracking-wider text-[#0c1b33]/40 mb-2">
                Areas for Improvement
              </label>
              <textarea
                value={track.improvements}
                onChange={(e) =>
                  updateTrack(idx, 'improvements', e.target.value)
                }
                rows={3}
                className="w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm text-[#0c1b33] leading-relaxed outline-none focus:border-[#d4a843] focus:ring-2 focus:ring-[#d4a843]/20 transition-colors resize-y print:border-none print:p-0 print:ring-0"
              />
            </div>

            {/* Projects */}
            <div>
              <h3 className="text-xs font-semibold uppercase tracking-wider text-[#0c1b33]/40 mb-2">
                Projects Completed
              </h3>
              <ul className="space-y-2 mb-2">
                {track.projects.map((project, pi) => (
                  <li
                    key={pi}
                    className="flex items-center justify-between rounded-lg border border-gray-100 bg-gray-50 px-3 py-2 text-sm text-[#0c1b33]"
                  >
                    <span>{project}</span>
                    <button
                      type="button"
                      onClick={() => removeProject(idx, pi)}
                      className="text-[#0c1b33]/30 hover:text-[#e8614d] transition-colors print:hidden"
                    >
                      <X className="w-3.5 h-3.5" />
                    </button>
                  </li>
                ))}
              </ul>
              <div className="flex gap-2 print:hidden">
                <input
                  type="text"
                  placeholder="Add a project…"
                  className="flex-1 rounded-lg border border-gray-200 px-3 py-1.5 text-sm outline-none focus:border-[#d4a843] focus:ring-2 focus:ring-[#d4a843]/20"
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      addProject(idx, e.currentTarget.value)
                      e.currentTarget.value = ''
                    }
                  }}
                />
                <button
                  type="button"
                  onClick={(e) => {
                    const input = (e.currentTarget as HTMLElement)
                      .previousElementSibling as HTMLInputElement
                    addProject(idx, input.value)
                    input.value = ''
                  }}
                  className="rounded-lg bg-[#0c1b33]/5 px-3 py-1.5 text-sm font-medium text-[#0c1b33]/60 hover:bg-[#0c1b33]/10 transition-colors"
                >
                  <Plus className="w-4 h-4" />
                </button>
              </div>
            </div>
          </section>
        ))}

        {/* Attendance & Engagement */}
        <section className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
          <h2 className="font-heading text-lg font-bold text-[#0c1b33] mb-4">
            Attendance &amp; Engagement
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-[#0c1b33]/40 mb-2">
                Sessions Attended
              </label>
              <div className="flex items-center gap-3">
                <input
                  type="number"
                  min={0}
                  value={report.attendance.sessionsAttended}
                  onChange={(e) =>
                    updateField('attendance', {
                      ...report.attendance,
                      sessionsAttended: parseInt(e.target.value) || 0,
                    })
                  }
                  className="w-20 rounded-xl border border-gray-200 bg-white px-3 py-2.5 text-sm text-center text-[#0c1b33] outline-none focus:border-[#d4a843] focus:ring-2 focus:ring-[#d4a843]/20 print:border-none print:p-0 print:ring-0"
                />
                <span className="text-[#0c1b33]/40 text-sm">of</span>
                <input
                  type="number"
                  min={0}
                  value={report.attendance.sessionsTotal}
                  onChange={(e) =>
                    updateField('attendance', {
                      ...report.attendance,
                      sessionsTotal: parseInt(e.target.value) || 0,
                    })
                  }
                  className="w-20 rounded-xl border border-gray-200 bg-white px-3 py-2.5 text-sm text-center text-[#0c1b33] outline-none focus:border-[#d4a843] focus:ring-2 focus:ring-[#d4a843]/20 print:border-none print:p-0 print:ring-0"
                />
                <span className="text-sm font-medium text-[#2a9d8f]">
                  (
                  {report.attendance.sessionsTotal > 0
                    ? Math.round(
                        (report.attendance.sessionsAttended /
                          report.attendance.sessionsTotal) *
                          100,
                      )
                    : 0}
                  %)
                </span>
              </div>
            </div>
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-[#0c1b33]/40 mb-2">
                Engagement Rating
              </label>
              <div className="flex gap-1">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    type="button"
                    onClick={() =>
                      updateField('attendance', {
                        ...report.attendance,
                        engagementRating: star,
                      })
                    }
                    className="transition-transform hover:scale-110 print:pointer-events-none"
                  >
                    <Star
                      className={`w-7 h-7 ${
                        star <= report.attendance.engagementRating
                          ? 'fill-[#d4a843] text-[#d4a843]'
                          : 'text-gray-300'
                      }`}
                    />
                  </button>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Achievements Earned */}
        <section className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
          <h2 className="font-heading text-lg font-bold text-[#0c1b33] mb-4">
            Achievements Earned
          </h2>
          <div className="flex flex-wrap gap-2 mb-3">
            {report.achievementsEarned.map((a) => (
              <span
                key={a.id}
                className="inline-flex items-center gap-1.5 rounded-full bg-[#d4a843]/10 px-3 py-1.5 text-sm font-medium text-[#0c1b33]"
              >
                {a.icon} {a.name}
                <button
                  type="button"
                  onClick={() => removeAchievement(a.id)}
                  className="text-[#0c1b33]/30 hover:text-[#e8614d] transition-colors print:hidden"
                >
                  <X className="w-3 h-3" />
                </button>
              </span>
            ))}
          </div>
          <div className="flex gap-2 print:hidden">
            <input
              type="text"
              placeholder="Add an achievement…"
              value={newAchievement}
              onChange={(e) => setNewAchievement(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') addAchievement()
              }}
              className="flex-1 rounded-lg border border-gray-200 px-3 py-1.5 text-sm outline-none focus:border-[#d4a843] focus:ring-2 focus:ring-[#d4a843]/20"
            />
            <button
              type="button"
              onClick={addAchievement}
              className="rounded-lg bg-[#0c1b33]/5 px-3 py-1.5 text-sm font-medium text-[#0c1b33]/60 hover:bg-[#0c1b33]/10 transition-colors"
            >
              <Plus className="w-4 h-4" />
            </button>
          </div>
        </section>

        {/* Goals for Next Period */}
        <section className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
          <h2 className="font-heading text-lg font-bold text-[#0c1b33] mb-4">
            Goals for Next Period
          </h2>
          <textarea
            value={report.goalsForNextPeriod}
            onChange={(e) => updateField('goalsForNextPeriod', e.target.value)}
            rows={4}
            className="w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm text-[#0c1b33] leading-relaxed outline-none focus:border-[#d4a843] focus:ring-2 focus:ring-[#d4a843]/20 transition-colors resize-y print:border-none print:p-0 print:ring-0"
          />
        </section>

        {/* Coach Notes (private) */}
        <section className="rounded-2xl border border-[#e8614d]/20 bg-[#e8614d]/5 p-6 shadow-sm print:break-inside-avoid">
          <div className="flex items-center gap-2 mb-4">
            <h2 className="font-heading text-lg font-bold text-[#0c1b33]">
              Coach Notes
            </h2>
            <span className="rounded-full bg-[#e8614d]/10 px-2 py-0.5 text-[10px] font-semibold uppercase text-[#e8614d]">
              Private
            </span>
          </div>
          <textarea
            value={report.coachNotes}
            onChange={(e) => updateField('coachNotes', e.target.value)}
            rows={4}
            className="w-full rounded-xl border border-[#e8614d]/20 bg-white px-4 py-3 text-sm text-[#0c1b33] leading-relaxed outline-none focus:border-[#e8614d] focus:ring-2 focus:ring-[#e8614d]/20 transition-colors resize-y print:border-none print:p-0 print:ring-0"
          />
        </section>

        {/* Recommendations */}
        <section className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
          <h2 className="font-heading text-lg font-bold text-[#0c1b33] mb-4">
            Recommendations
          </h2>
          <textarea
            value={report.recommendations}
            onChange={(e) => updateField('recommendations', e.target.value)}
            rows={4}
            className="w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm text-[#0c1b33] leading-relaxed outline-none focus:border-[#d4a843] focus:ring-2 focus:ring-[#d4a843]/20 transition-colors resize-y print:border-none print:p-0 print:ring-0"
          />
        </section>

        {/* Bottom Actions */}
        <div className="flex gap-3 justify-end pb-8 print:hidden">
          <button
            type="button"
            onClick={() => showToast('Draft saved successfully')}
            className="inline-flex items-center gap-2 rounded-full border border-gray-200 bg-white px-5 py-2.5 text-sm font-semibold text-[#0c1b33] transition-colors hover:bg-gray-50"
          >
            <Save className="w-4 h-4" />
            Save Draft
          </button>
          <button
            type="button"
            onClick={() => showToast('Report sent to parent')}
            className="inline-flex items-center gap-2 rounded-full bg-[#0c1b33] px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-[#162d50]"
          >
            <Send className="w-4 h-4" />
            Send to Parent
          </button>
        </div>
      </div>
    </>
  )
}
