'use client'

import { useState } from 'react'
import { saveCoachNote } from '@/lib/actions'

export interface CoachNote {
  id: string
  studentName: string
  content: string
  updatedAt: string
}

interface CoachNoteEditorProps {
  notes: CoachNote[]
}

export function CoachNoteEditor({ notes: initialNotes }: CoachNoteEditorProps) {
  const [notes, setNotes] = useState<CoachNote[]>(initialNotes)
  const [editingId, setEditingId] = useState<string | null>(null)
  const [editContent, setEditContent] = useState('')
  const [savingId, setSavingId] = useState<string | null>(null)
  const [saveError, setSaveError] = useState<string | null>(null)

  const handleEdit = (note: CoachNote) => {
    setEditingId(note.id)
    setEditContent(note.content)
    setSaveError(null)
  }

  const handleCancel = () => {
    setEditingId(null)
    setEditContent('')
    setSaveError(null)
  }

  const handleSave = async (noteId: string) => {
    setSavingId(noteId)
    setSaveError(null)

    const result = await saveCoachNote(noteId, editContent)

    if (result.success) {
      setNotes((prev) =>
        prev.map((n) =>
          n.id === noteId
            ? { ...n, content: editContent, updatedAt: 'Just now' }
            : n,
        ),
      )
      setEditingId(null)
    } else {
      setSaveError(result.error)
    }
    setSavingId(null)
  }

  return (
    <section>
      <h2 className="font-heading text-xl font-bold text-[#0c1b33] mb-4">
        Session Notes
      </h2>
      {notes.length === 0 ? (
        <div className="rounded-2xl border-2 border-dashed border-[#0c1b33]/15 bg-white p-8 text-center">
          <span className="text-4xl mb-3 block">📝</span>
          <h3 className="font-heading text-lg font-bold text-[#0c1b33] mb-2">
            No notes yet
          </h3>
          <p className="text-[#0c1b33]/60 text-sm max-w-sm mx-auto">
            Notes you write about your students will appear here.
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          {notes.map((note) => {
            const isEditing = editingId === note.id
            const isSaving = savingId === note.id

            return (
              <div
                key={note.id}
                className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm transition-all hover:shadow-md"
              >
                {/* Header */}
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#0c1b33] text-xs font-semibold text-white">
                      {note.studentName
                        .split(' ')
                        .map((w) => w[0])
                        .join('')}
                    </div>
                    <span className="font-semibold text-[#0c1b33]">
                      {note.studentName}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    {isSaving && (
                      <span className="text-xs text-[#2a9d8f] animate-pulse font-medium">
                        Saving…
                      </span>
                    )}
                    <span className="text-xs text-[#0c1b33]/40">
                      {note.updatedAt}
                    </span>
                  </div>
                </div>

                {/* Content or Edit area */}
                {isEditing ? (
                  <div className="space-y-3">
                    <textarea
                      value={editContent}
                      onChange={(e) => setEditContent(e.target.value)}
                      className="w-full rounded-lg border border-gray-300 bg-gray-50 p-3 text-sm text-[#0c1b33] leading-relaxed focus:border-[#2a9d8f] focus:ring-2 focus:ring-[#2a9d8f]/20 focus:outline-none resize-y min-h-[80px]"
                      rows={4}
                      autoFocus
                    />
                    <div className="flex gap-2">
                      <button
                        onClick={() => handleSave(note.id)}
                        className="rounded-full bg-[#2a9d8f] px-4 py-1.5 text-xs font-semibold text-white transition-all hover:bg-[#2a9d8f]/90 active:scale-[0.97]"
                      >
                        Save
                      </button>
                      <button
                        onClick={handleCancel}
                        className="rounded-full border border-gray-300 px-4 py-1.5 text-xs font-semibold text-[#0c1b33]/60 transition-all hover:bg-gray-50 active:scale-[0.97]"
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                ) : (
                  <div>
                    <p className="text-sm leading-relaxed text-[#0c1b33]/80 mb-3">
                      {note.content}
                    </p>
                    <button
                      onClick={() => handleEdit(note)}
                      className="rounded-full border border-gray-200 px-3 py-1 text-xs font-medium text-[#0c1b33]/50 transition-all hover:border-[#2a9d8f] hover:text-[#2a9d8f] active:scale-[0.97]"
                    >
                      ✏️ Edit
                    </button>
                  </div>
                )}
              </div>
            )
          })}
        </div>
      )}
    </section>
  )
}
