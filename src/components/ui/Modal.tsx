import type { ReactNode } from 'react'
import { X } from 'lucide-react'
import { Button } from './Button'

type ModalProps = {
  open: boolean
  title: string
  children: ReactNode
  onClose: () => void
}

export function Modal({ open, title, children, onClose }: ModalProps) {
  if (!open) {
    return null
  }

  return (
    <div className="modal-backdrop" role="presentation">
      <div aria-modal="true" className="modal" role="dialog">
        <div className="modal-head">
          <h2>{title}</h2>
          <Button aria-label="Закрыть" icon={<X size={18} />} onClick={onClose} variant="ghost">
            Закрыть
          </Button>
        </div>
        {children}
      </div>
    </div>
  )
}
