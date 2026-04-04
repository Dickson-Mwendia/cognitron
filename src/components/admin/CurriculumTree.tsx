'use client'

import { useState } from 'react'
import type { CurriculumNode } from '@/types'
import { ChevronRight, ChevronDown, GripVertical } from 'lucide-react'

const typeIcons: Record<CurriculumNode['type'], string> = {
  track: '📚',
  level: '🏆',
  module: '📦',
  lesson: '📝',
}

const typeBg: Record<CurriculumNode['type'], string> = {
  track: 'bg-[#0c1b33]/5',
  level: 'bg-[#d4a843]/5',
  module: 'bg-[#2a9d8f]/5',
  lesson: 'bg-white',
}

interface CurriculumTreeProps {
  nodes: CurriculumNode[]
  onSelect?: (node: CurriculumNode) => void
  selectedId?: string
}

function TreeNode({
  node,
  depth,
  onSelect,
  selectedId,
}: {
  node: CurriculumNode
  depth: number
  onSelect?: (node: CurriculumNode) => void
  selectedId?: string
}) {
  const [expanded, setExpanded] = useState(depth < 2)
  const hasChildren = node.children && node.children.length > 0
  const isSelected = selectedId === node.id

  return (
    <div>
      <div
        className={`flex items-center gap-2 rounded-lg px-3 py-2 text-sm transition-colors cursor-pointer group ${typeBg[node.type]} ${
          isSelected ? 'ring-2 ring-[#d4a843]/40 bg-[#d4a843]/10' : 'hover:bg-[#0c1b33]/5'
        }`}
        style={{ paddingLeft: `${depth * 20 + 12}px` }}
        onClick={() => onSelect?.(node)}
      >
        <GripVertical className="w-3.5 h-3.5 text-[#0c1b33]/20 opacity-0 group-hover:opacity-100 flex-shrink-0" />

        {hasChildren ? (
          <button
            type="button"
            onClick={(e) => { e.stopPropagation(); setExpanded(!expanded) }}
            className="text-[#0c1b33]/40 hover:text-[#0c1b33] flex-shrink-0"
          >
            {expanded ? <ChevronDown className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />}
          </button>
        ) : (
          <span className="w-4" />
        )}

        <span className="flex-shrink-0">{typeIcons[node.type]}</span>
        <span className="font-medium text-[#0c1b33] truncate">{node.name}</span>
        <span className="text-xs text-[#0c1b33]/40 ml-auto flex-shrink-0">
          {node.type}
          {node.meta?.duration ? ` · ${node.meta.duration}min` : ''}
          {node.meta?.contentType ? ` · ${node.meta.contentType}` : ''}
        </span>
      </div>

      {expanded && hasChildren && (
        <div>
          {node.children!.map((child) => (
            <TreeNode
              key={child.id}
              node={child}
              depth={depth + 1}
              onSelect={onSelect}
              selectedId={selectedId}
            />
          ))}
        </div>
      )}
    </div>
  )
}

export function CurriculumTree({ nodes, onSelect, selectedId }: CurriculumTreeProps) {
  return (
    <div className="space-y-1">
      {nodes.map((node) => (
        <TreeNode key={node.id} node={node} depth={0} onSelect={onSelect} selectedId={selectedId} />
      ))}
    </div>
  )
}
