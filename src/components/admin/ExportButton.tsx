'use client'

import { Download } from 'lucide-react'

interface ExportButtonProps {
  label?: string
  onClick?: () => void
}

function downloadCSV(headers: string[], rows: string[][], filename: string) {
  const csv = [headers.join(','), ...rows.map((r) => r.map((c) => `"${String(c).replace(/"/g, '""')}"`).join(','))].join('\n')
  const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' })
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = filename
  a.click()
  URL.revokeObjectURL(url)
}

export function ExportButton({ label = 'Export CSV', onClick }: ExportButtonProps) {
  return (
    <button
      type="button"
      onClick={onClick ?? (() => downloadCSV(['Sample'], [['Data']], 'export.csv'))}
      className="inline-flex items-center gap-2 rounded-lg border border-gray-200 bg-white px-3 py-2 text-xs font-medium text-[#0c1b33] transition-colors hover:bg-gray-50"
    >
      <Download className="w-3.5 h-3.5" />
      {label}
    </button>
  )
}

export { downloadCSV }
