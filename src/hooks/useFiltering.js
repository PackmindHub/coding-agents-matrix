import { useMemo } from 'react'

const useFiltering = (data, filters) => {
  const filteredData = useMemo(() => {
    let result = [...data]

    // Search filter
    if (filters.searchTerm) {
      const term = filters.searchTerm.toLowerCase()
      result = result.filter((agent) =>
        agent.name.toLowerCase().includes(term) ||
        agent.type.toLowerCase().includes(term) ||
        (agent.additionalInfo && agent.additionalInfo.toLowerCase().includes(term))
      )
    }

    // Type filter
    if (filters.type && filters.type !== 'all') {
      result = result.filter((agent) => agent.type === filters.type)
    }

    // Feature filters (AND logic)
    if (filters.features) {
      Object.keys(filters.features).forEach((feature) => {
        if (filters.features[feature]) {
          result = result.filter((agent) => {
            const value = agent[feature]
            return value === 'yes' || value === 'partial'
          })
        }
      })
    }

    return result
  }, [data, filters])

  return filteredData
}

export default useFiltering
