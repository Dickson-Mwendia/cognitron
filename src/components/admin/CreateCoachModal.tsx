'use client'

import { useState } from 'react'
import { X } from 'lucide-react'
import type { TrackName } from '@/types'

interface CreateCoachModalProps {
  open: boolean
  onClose: () => void
}

const trackOptions: { value: TrackName; label: string }[] = [
  { value: 'coding', label: '💻 Coding' },
  { value: 'ai', label: '🤖 AI' },
  { value: 'chess', label: '♟️ Chess' },
]

export function CreateCoachModal({ open, onClose }: CreateCoachModalProps) {
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [email, setEmail] = useState('')
  const [tracks, setTracks] = useState<TrackName[]>([])
  const [submitted, setSubmitted] = useState(false)

  function toggleTrack(t: TrackName) {
    setTracks((prev) => (prev.includes(t) ? prev.filter((x) => x !== t) : [...prev, t]))
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setSubmitted(true)
    setTimeout(() => {
      setSubmitted(false)
      setFirstName('')
      setLastName('')
      setEmail('')
      setTracks([])
      onClose()
    }, 1500)
  }

  if (!open) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
      <div className="w-full max-w-md rounded-2xl bg-white p-6 shadow-xl">
        <div className="flex items-center justify-between mb-6">
          <h2 className="font-heading text-xl font-bold text-[#0c1b33]">Create Coach Account</h2>
          <button
            type="button"
            onClick={onClose}
            className="rounded-lg p-1 text-[#0c1b33]/40 hover:text-[#0c1b33] hover:bg-gray-100 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-medium text-[#0c1b33]/60 mb-1">First Name</label>
              <input
                type="text"
                required
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                className="w-full rounded-lg border border-gray-200 px-3 py-2 text-sm text-[#0c1b33] outline-none focus:border-[#2a9d8f] focus:ring-2 focus:ring-[#2a9d8f]/20"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-[#0c1b33]/60 mb-1">Last Name</label>
              <input
                type="text"
                required
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                className="w-full rounded-lg border border-gray-200 px-3 py-2 text-sm text-[#0c1b33] outline-none focus:border-[#2a9d8f] focus:ring-2 focus:ring-[#2a9d8f]/20"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-medium text-[#0c1b33]/60 mb-1">Email</label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="coach@cognitron.tech"
              className="w-full rounded-lg border border-gray-200 px-3 py-2 text-sm text-[#0c1b33] outline-none focus:border-[#2a9d8f] focus:ring-2 focus:ring-[#2a9d8f]/20"
            />
          </div>

          <div>
            <label className="block text-xs font-medium text-[#0c1b33]/60 mb-1">Tracks</label>
            <div className="flex gap-2">
              {trackOptions.map((t) => (
                <button
                  key={t.value}
                  type="button"
                  onClick={() => toggleTrack(t.value)}
                  className={`rounded-full px-4 py-1.5 text-xs font-semibold transition-colors ${
                    tracks.includes(t.value)
                      ? 'bg-[#0c1b33] text-white'
                      : 'bg-[#0c1b33]/5 text-[#0c1b33]/60 hover:bg-[#0c1b33]/10'
                  }`}
                >
                  {t.label}
                </button>
              ))}
            </div>
          </div>

          <button
            type="submit"
            disabled={submitted}
            className="w-full rounded-lg bg-[#0c1b33] py-2.5 text-sm font-semibold text-white transition-colors hover:bg-[#162d50] disabled:opacity-60"
          >
            {submitted ? '✓ Coach Created!' : 'Create Coach'}
          </button>
        </form>
      </div>
    </div>
  )
}
