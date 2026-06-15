import type { ReactNode } from 'react'

type BadgeProps = {
  children: ReactNode
  tone?: string
  className?: string
}

export function Badge({ children, tone = 'neutral', className = '' }: BadgeProps) {
  return <span className={`badge badge-${tone} ${className}`.trim()}>{children}</span>
}
