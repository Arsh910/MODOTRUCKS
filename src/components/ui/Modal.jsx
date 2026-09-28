import { useEffect, useRef } from 'react'
import './modal.css'

// Native <dialog> as a modal: Esc closes, the backdrop dims the page, clicking the backdrop closes.
export function Modal({ open, onClose, title, children }) {
  const ref = useRef(null)
  useEffect(() => {
    const d = ref.current
    if (open && !d.open) d.showModal()
    if (!open && d.open) d.close()
  }, [open])
  return (
    <dialog ref={ref} className="modal" onClose={onClose} onClick={e => e.target === ref.current && onClose()} aria-label={title}>
      <div className="modal-box">
        <div className="modal-head">
          <b>{title}</b>
          <button type="button" aria-label="Close" onClick={onClose}>×</button>
        </div>
        {children}
      </div>
    </dialog>
  )
}
