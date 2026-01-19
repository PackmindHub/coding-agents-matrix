import { useEffect, useCallback } from 'react'
import { X } from 'lucide-react'
import useBodyScrollLock from '../hooks/useBodyScrollLock'

const Drawer = ({ isOpen, onClose, title, children }) => {
  useBodyScrollLock(isOpen)

  const handleEscape = useCallback((event) => {
    if (event.key === 'Escape') {
      onClose()
    }
  }, [onClose])

  useEffect(() => {
    if (isOpen) {
      document.addEventListener('keydown', handleEscape)
      return () => {
        document.removeEventListener('keydown', handleEscape)
      }
    }
  }, [isOpen, handleEscape])

  return (
    <>
      {/* Backdrop */}
      <div
        className={`drawer-backdrop ${isOpen ? 'drawer-backdrop-visible' : 'drawer-backdrop-hidden'}`}
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Panel */}
      <div
        className={`drawer-panel ${isOpen ? 'drawer-panel-open' : 'drawer-panel-closed'}`}
        role="dialog"
        aria-modal="true"
        aria-labelledby="drawer-title"
      >
        {/* Header */}
        <div className="drawer-header">
          <h2 id="drawer-title" className="drawer-title">{title}</h2>
          <button
            onClick={onClose}
            className="drawer-close-btn"
            aria-label="Close drawer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="drawer-content">
          {children}
        </div>
      </div>
    </>
  )
}

export default Drawer
