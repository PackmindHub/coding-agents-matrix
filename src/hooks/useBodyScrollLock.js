import { useEffect } from 'react'

const useBodyScrollLock = (isLocked) => {
  useEffect(() => {
    if (isLocked) {
      const originalOverflow = document.body.style.overflow
      document.body.style.overflow = 'hidden'
      return () => {
        document.body.style.overflow = originalOverflow
      }
    }
  }, [isLocked])
}

export default useBodyScrollLock
