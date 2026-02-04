import { Search, X, Filter } from 'lucide-react'

const FilterBar = ({ filters, onChange, totalAgents, filteredCount }) => {
  const handleSearchChange = (e) => {
    onChange({ ...filters, searchTerm: e.target.value })
  }

  const handleTypeToggle = (typeValue) => {
    // If clicking the active type, reset to 'all', otherwise set to the clicked type
    onChange({ ...filters, type: filters.type === typeValue ? 'all' : typeValue })
  }

  const handleFeatureToggle = (featureKey) => {
    onChange({
      ...filters,
      features: {
        ...filters.features,
        [featureKey]: !filters.features[featureKey]
      }
    })
  }

  const clearFilters = () => {
    onChange({
      searchTerm: '',
      type: 'all',
      features: {}
    })
  }

  const hasActiveFilters =
    filters.searchTerm ||
    filters.type !== 'all' ||
    Object.values(filters.features).some(Boolean)

  const featureOptions = [
    // Packaging
    { key: 'cli', label: 'CLI' },
    { key: 'dedicatedIde', label: 'Dedicated IDE' },
    { key: 'ideExtension', label: 'IDE Extension' },
    // Features
    { key: 'byoLlm', label: 'BYO LLM' },
    { key: 'mcpSupport', label: 'MCP Support' },
    { key: 'customRules', label: 'Custom Rules' },
    { key: 'agentsMdSupport', label: 'AGENTS.md' },
    { key: 'agentSkillsSupport', label: 'Skills' },
    { key: 'commandsReusablePrompts', label: 'Commands' },
    { key: 'subagentsSupport', label: 'Subagents' },
    { key: 'planMode', label: 'Plan Mode' },
    { key: 'hooks', label: 'Hooks' }
  ]

  return (
    <div className="glass-container p-4 mb-4">
      <div className="space-y-3">
        {/* Search Row */}
        <div className="relative group">
          <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-slate-500 w-5 h-5 group-focus-within:text-violet-400 transition-colors" />
          <input
            type="text"
            placeholder="Search agents..."
            value={filters.searchTerm}
            onChange={handleSearchChange}
            className="input-base"
          />
        </div>

        {/* Filters */}
        <div className="flex flex-wrap gap-2 items-center">
          <div className="flex items-center gap-2 text-sm font-medium text-slate-400">
            <Filter className="w-4 h-4" />
            <span className="tracking-wide">Filters:</span>
          </div>
          {/* Type Filters */}
          <button
            onClick={() => handleTypeToggle('Open Source')}
            className={filters.type === 'Open Source' ? 'btn-filter-active' : 'btn-filter-inactive'}
          >
            Open Source
          </button>
          <button
            onClick={() => handleTypeToggle('Proprietary')}
            className={filters.type === 'Proprietary' ? 'btn-filter-active' : 'btn-filter-inactive'}
          >
            Proprietary
          </button>
          {/* Feature Filters */}
          {featureOptions.map((feature) => (
            <button
              key={feature.key}
              onClick={() => handleFeatureToggle(feature.key)}
              className={filters.features[feature.key] ? 'btn-filter-active' : 'btn-filter-inactive'}
            >
              {feature.label}
            </button>
          ))}
        </div>

        {/* Results Count and Clear Button */}
        <div className="flex items-center justify-between pt-2 border-t border-slate-700/50">
          <span className="text-sm text-slate-400 font-light tracking-wide">
            Showing <span className="font-semibold text-violet-400">{filteredCount}</span> of{' '}
            <span className="font-semibold text-slate-300">{totalAgents}</span> agents
          </span>
          {hasActiveFilters && (
            <button
              onClick={clearFilters}
              className="btn-clear"
            >
              <X className="w-4 h-4" />
              Clear filters
            </button>
          )}
        </div>
      </div>
    </div>
  )
}

export default FilterBar
