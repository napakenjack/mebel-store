import type { HTMLAttributes, ReactNode } from 'react'

type CardProps = HTMLAttributes<HTMLDivElement> & {
  title?: string
  eyebrow?: string
  action?: ReactNode
}

export function Card({ children, className = '', title, eyebrow, action, ...props }: CardProps) {
  return (
    <section className={`card ${className}`.trim()} {...props}>
      {(title || eyebrow || action) && (
        <div className="card-head">
          <div>
            {eyebrow && <span className="eyebrow">{eyebrow}</span>}
            {title && <h2>{title}</h2>}
          </div>
          {action}
        </div>
      )}
      {children}
    </section>
  )
}
