import { Search, X, Filter } from 'lucide-react'

const FilterBar = ({ filters, onChange, totalAgents, filteredCount }) => {
  const handleSearchChange = (e) => {
    onChange({ ...filters, searchTerm: e.target.value })
  }

  const handleTypeChange = (e) => {
    onChange({ ...filters, type: e.target.value })
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
    { key: 'cli', label: 'CLI' },
    { key: 'mcpSupport', label: 'MCP Support' },
    { key: 'agentsMdSupport', label: 'AGENTS.md' },
    { key: 'agentSkillsSupport', label: 'Skills' },
    { key: 'subagentsSupport', label: 'Subagents' }
  ]

  return (
    <div className="bg-slate-800/40 backdrop-blur-xl rounded-2xl shadow-2xl border border-slate-700/50 p-4 mb-4 hover:border-slate-600/50 transition-all duration-300">
      <div className="space-y-3">
        {/* Search and Type Filter Row */}
        <div className="flex flex-col sm:flex-row gap-4">
          {/* Search Input */}
          <div className="flex-1 relative group">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-slate-500 w-5 h-5 group-focus-within:text-violet-400 transition-colors" />
            <input
              type="text"
              placeholder="Search agents..."
              value={filters.searchTerm}
              onChange={handleSearchChange}
              className="w-full pl-12 pr-4 py-2 bg-slate-900/50 border border-slate-600/50 rounded-xl text-slate-200 placeholder-slate-500 focus:ring-2 focus:ring-violet-500/50 focus:border-violet-500/50 outline-none transition-all duration-300"
            />
          </div>

          {/* Type Filter */}
          <select
            value={filters.type}
            onChange={handleTypeChange}
            className="px-4 py-2 bg-slate-900/50 border border-slate-600/50 rounded-xl text-slate-200 focus:ring-2 focus:ring-violet-500/50 focus:border-violet-500/50 outline-none transition-all duration-300 cursor-pointer hover:bg-slate-900/70"
          >
            <option value="all">All Types</option>
            <option value="Open Source">Open Source</option>
            <option value="Proprietary">Proprietary</option>
          </select>
        </div>

        {/* Feature Filters */}
        <div className="flex flex-wrap gap-2 items-center">
          <div className="flex items-center gap-2 text-sm font-medium text-slate-400">
            <Filter className="w-4 h-4" />
            <span className="tracking-wide">Filters:</span>
          </div>
          {featureOptions.map((feature) => (
            <button
              key={feature.key}
              onClick={() => handleFeatureToggle(feature.key)}
              className={`px-3 py-1.5 rounded-xl text-sm font-medium transition-all duration-300 ${
                filters.features[feature.key]
                  ? 'bg-gradient-to-r from-violet-600 to-purple-600 text-white shadow-lg shadow-violet-500/30 scale-105'
                  : 'bg-slate-700/50 text-slate-300 hover:bg-slate-700 border border-slate-600/50 hover:border-slate-500/50'
              }`}
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
              className="flex items-center gap-2 px-4 py-2 text-sm text-slate-400 hover:text-slate-200 bg-slate-700/30 hover:bg-slate-700/50 rounded-lg transition-all duration-300 border border-slate-600/30 hover:border-slate-500/50"
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
