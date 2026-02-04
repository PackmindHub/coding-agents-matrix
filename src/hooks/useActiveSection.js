import { useState, useEffect } from 'react'

export default function useActiveSection(sectionIds) {
  const [activeSection, setActiveSection] = useState(sectionIds[0] || '')

  useEffect(() => {
    const observers = []
    const visibleSections = new Map()

    const updateActiveSection = () => {
      // Find the topmost visible section
      let topSection = null
      let topPosition = Infinity

      visibleSections.forEach((rect, id) => {
        if (rect.top < topPosition && rect.top >= -100) {
          topPosition = rect.top
          topSection = id
        }
      })

      // If no section is in view from top, use the one closest to top
      if (!topSection && visibleSections.size > 0) {
        visibleSections.forEach((rect, id) => {
          if (rect.top < topPosition) {
            topPosition = rect.top
            topSection = id
          }
        })
      }

      if (topSection) {
        setActiveSection(topSection)
      }
    }

    sectionIds.forEach((id) => {
      const element = document.getElementById(id)
      if (!element) return

      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              visibleSections.set(id, entry.boundingClientRect)
            } else {
              visibleSections.delete(id)
            }
            updateActiveSection()
          })
        },
        {
          rootMargin: '-80px 0px -50% 0px',
          threshold: [0, 0.25, 0.5, 0.75, 1]
        }
      )

      observer.observe(element)
      observers.push(observer)
    })

    return () => {
      observers.forEach((observer) => observer.disconnect())
    }
  }, [sectionIds])

  return activeSection
}
