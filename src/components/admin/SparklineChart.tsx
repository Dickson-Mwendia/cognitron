'use client'

import type { SparklinePoint } from '@/types'

interface SparklineChartProps {
  data: SparklinePoint[]
  color?: string
  height?: number
  width?: number
  showArea?: boolean
}

export function SparklineChart({
  data,
  color = '#2a9d8f',
  height = 40,
  width = 120,
  showArea = true,
}: SparklineChartProps) {
  if (data.length < 2) return null

  const values = data.map((d) => d.value)
  const min = Math.min(...values)
  const max = Math.max(...values)
  const range = max - min || 1

  const padding = 2
  const chartWidth = width - padding * 2
  const chartHeight = height - padding * 2

  const points = values.map((v, i) => ({
    x: padding + (i / (values.length - 1)) * chartWidth,
    y: padding + chartHeight - ((v - min) / range) * chartHeight,
  }))

  const linePath = points.map((p, i) => `${i === 0 ? 'M' : 'L'} ${p.x} ${p.y}`).join(' ')

  const areaPath = `${linePath} L ${points[points.length - 1].x} ${height - padding} L ${points[0].x} ${height - padding} Z`

  return (
    <svg width={width} height={height} viewBox={`0 0 ${width} ${height}`} className="overflow-visible">
      {showArea && (
        <path d={areaPath} fill={color} fillOpacity={0.1} />
      )}
      <path d={linePath} fill="none" stroke={color} strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" />
      <circle
        cx={points[points.length - 1].x}
        cy={points[points.length - 1].y}
        r={2.5}
        fill={color}
      />
    </svg>
  )
}
