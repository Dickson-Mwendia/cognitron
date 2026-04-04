'use client'

import { useState } from 'react'
import type { CurriculumNode } from '@/types'
import { CurriculumTree } from '@/components/admin/CurriculumTree'
import { Plus, Edit3, Trash2, Eye } from 'lucide-react'

interface Props {
  curriculum: CurriculumNode[]
}

export default function AdminCurriculumClient({ curriculum }: Props) {
  const [selected, setSelected] = useState<CurriculumNode | null>(null)

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="font-heading text-2xl font-bold text-[#0c1b33]">Curriculum</h1>
        <button
          type="button"
          className="inline-flex items-center gap-2 rounded-lg bg-[#0c1b33] px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-[#162d50]"
        >
          <Plus className="w-4 h-4" />
          Add Item
        </button>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        {/* Tree browser */}
        <div className="lg:col-span-2 rounded-2xl border border-gray-200 bg-white p-4 shadow-sm">
          <p className="text-xs font-semibold uppercase tracking-wider text-[#0c1b33]/40 mb-3">
            Track / Level / Module / Lesson
          </p>
          <CurriculumTree
            nodes={curriculum}
            onSelect={setSelected}
            selectedId={selected?.id}
          />
        </div>

        {/* Detail panel */}
        <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">
          {selected ? (
            <div className="space-y-4">
              <div>
                <span className="inline-flex rounded-full bg-[#0c1b33]/5 px-2.5 py-0.5 text-xs font-semibold text-[#0c1b33]/60 capitalize">
                  {selected.type}
                </span>
                <h3 className="font-heading text-xl font-bold text-[#0c1b33] mt-2">
                  {selected.name}
                </h3>
              </div>

              {selected.meta && (
                <div className="space-y-2">
                  {Object.entries(selected.meta).map(([key, val]) => (
                    <div key={key} className="flex items-center justify-between text-sm">
                      <span className="text-[#0c1b33]/50 capitalize">{key.replace(/([A-Z])/g, ' $1')}</span>
                      <span className="font-medium text-[#0c1b33]">{val}</span>
                    </div>
                  ))}
                </div>
              )}

              {selected.children && (
                <div>
                  <p className="text-xs text-[#0c1b33]/40 mb-1">
                    Contains {selected.children.length} {selected.children.length === 1 ? 'item' : 'items'}
                  </p>
                </div>
              )}

              {/* Actions */}
              <div className="flex gap-2 pt-2 border-t border-gray-100">
                <button
                  type="button"
                  className="flex-1 inline-flex items-center justify-center gap-1.5 rounded-lg border border-gray-200 px-3 py-2 text-xs font-medium text-[#0c1b33] transition-colors hover:bg-gray-50"
                >
                  <Edit3 className="w-3.5 h-3.5" /> Edit
                </button>
                {selected.type === 'lesson' && (
                  <button
                    type="button"
                    className="flex-1 inline-flex items-center justify-center gap-1.5 rounded-lg border border-gray-200 px-3 py-2 text-xs font-medium text-[#2a9d8f] transition-colors hover:bg-[#2a9d8f]/5"
                  >
                    <Eye className="w-3.5 h-3.5" /> Preview
                  </button>
                )}
                <button
                  type="button"
                  className="inline-flex items-center justify-center rounded-lg border border-[#e8614d]/20 px-3 py-2 text-xs font-medium text-[#e8614d] transition-colors hover:bg-[#e8614d]/5"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center py-12 text-center">
              <div className="w-12 h-12 rounded-full bg-[#0c1b33]/5 flex items-center justify-center mb-3">
                <span className="text-xl">📚</span>
              </div>
              <p className="text-sm font-medium text-[#0c1b33]/60">Select an item</p>
              <p className="text-xs text-[#0c1b33]/40 mt-1">Click any item in the tree to view details</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
