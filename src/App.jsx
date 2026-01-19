import { useState } from 'react'
import AgentTable from './components/AgentTable'
import FilterBar from './components/FilterBar'
import ChangelogDrawer from './components/ChangelogDrawer'
import useAgentsData from './hooks/useAgentsData'
import useFiltering from './hooks/useFiltering'
import useSorting from './hooks/useSorting'
import { Sparkles, Github, History } from 'lucide-react'

function App() {
  const { agents, loading, error } = useAgentsData()
  const [sortConfig, setSortConfig] = useState({ key: 'name', direction: 'asc' })
  const [filters, setFilters] = useState({
    searchTerm: '',
    type: 'all',
    features: {}
  })
  const [isChangelogOpen, setIsChangelogOpen] = useState(false)

  const filteredAgents = useFiltering(agents, filters)
  const sortedAgents = useSorting(filteredAgents, sortConfig)

  const handleSort = (newSortConfig) => {
    setSortConfig(newSortConfig)
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="relative">
            <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-violet-500 mx-auto mb-6"></div>
            <Sparkles className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-violet-400 w-6 h-6 animate-pulse" />
          </div>
          <p className="text-slate-300 font-light tracking-wide">Loading agents...</p>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="bg-red-500/10 backdrop-blur-sm border border-red-500/20 rounded-2xl p-8">
            <p className="text-xl font-semibold mb-2 text-red-400">Error loading agents</p>
            <p className="text-sm text-red-300/70">{error}</p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen py-4 px-4 sm:px-6 lg:px-8">
      <div className="max-w-[120rem] mx-auto">
        {/* Header */}
        <div className="mb-4 relative">
          {/* Header Links - Top Right */}
          <div className="absolute top-0 right-0 flex items-center gap-4">
            <button
              onClick={() => setIsChangelogOpen(true)}
              className="btn-header"
            >
              <History className="w-4 h-4" />
              Changelog
            </button>
            <a
              href="https://github.com/PackmindHub/packmind/issues"
              target="_blank"
              rel="noopener noreferrer"
              className="text-slate-400 hover:text-violet-400 text-sm font-light tracking-wide transition-colors duration-200"
            >
              Submit an update
            </a>
            <a
              href="https://github.com/PackmindHub/packmind"
              target="_blank"
              rel="noopener noreferrer"
              className="text-slate-400 hover:text-violet-400 transition-colors duration-200"
              aria-label="GitHub Repository"
            >
              <Github className="w-5 h-5" />
            </a>
          </div>

          {/* Title Section */}
          <div className="text-center">
            <div className="inline-flex items-center gap-3 mb-2">
              <Sparkles className="text-violet-400 w-6 h-6" />
              <h1 className="text-3xl font-bold text-violet-400 tracking-tight">
                AI Coding Agents
              </h1>
              <Sparkles className="text-violet-400 w-6 h-6" />
            </div>
            <p className="text-slate-400 text-base font-light tracking-wide">
              A curated comparison of the finest AI coding assistants
            </p>
            <div className="mt-2 h-px w-48 mx-auto bg-gradient-to-r from-transparent via-violet-500/50 to-transparent"></div>
          </div>
        </div>

        {/* Filter Bar */}
        <FilterBar
          filters={filters}
          onChange={setFilters}
          totalAgents={agents.length}
          filteredCount={filteredAgents.length}
        />

        {/* Agent Table */}
        <AgentTable
          agents={sortedAgents}
          sortConfig={sortConfig}
          onSort={handleSort}
        />

        {/* Footer */}
        <div className="mt-4 text-center">
          <div className="inline-block">
            <p className="text-slate-500 text-sm font-light tracking-wider">
              Meticulously compiled • January 2026
            </p>
            <div className="mt-2 h-px bg-gradient-to-r from-transparent via-slate-700 to-transparent"></div>
          </div>
        </div>
      </div>

      {/* Changelog Drawer */}
      <ChangelogDrawer
        isOpen={isChangelogOpen}
        onClose={() => setIsChangelogOpen(false)}
      />
    </div>
  )
}

export default App
