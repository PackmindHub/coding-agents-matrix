import { useMemo } from 'react'

const useSorting = (data, sortConfig) => {
  const sortedData = useMemo(() => {
    if (!sortConfig.key || !sortConfig.direction) {
      return data
    }

    const sorted = [...data].sort((a, b) => {
      const aValue = a[sortConfig.key]
      const bValue = b[sortConfig.key]

      // Handle null/undefined values - always sort to the end
      if (aValue === null || aValue === undefined) return 1
      if (bValue === null || bValue === undefined) return -1

      // Numeric sorting for stars
      if (sortConfig.key === 'ghStars') {
        const comparison = aValue - bValue
        return sortConfig.direction === 'asc' ? comparison : -comparison
      }

      // Normalize string values for comparison
      const aString = String(aValue).toLowerCase()
      const bString = String(bValue).toLowerCase()

      // For yes/no/partial values, convert to sortable format
      const getValue = (str) => {
        if (str === 'yes') return 3
        if (str === 'partial' || str === 'limited') return 2
        if (str === 'no') return 1
        return 0
      }

      const aNum = getValue(aString)
      const bNum = getValue(bString)

      if (aNum > 0 && bNum > 0) {
        return sortConfig.direction === 'asc' ? bNum - aNum : aNum - bNum
      }

      // Default string comparison
      if (aString < bString) {
        return sortConfig.direction === 'asc' ? -1 : 1
      }
      if (aString > bString) {
        return sortConfig.direction === 'asc' ? 1 : -1
      }
      return 0
    })

    return sorted
  }, [data, sortConfig])

  return sortedData
}

export default useSorting
