import { useState } from 'react'
import AgentTable from './components/AgentTable'
import FilterBar from './components/FilterBar'
import ChangelogDrawer from './components/ChangelogDrawer'
import useAgentsData from './hooks/useAgentsData'
import useFiltering from './hooks/useFiltering'
import useSorting from './hooks/useSorting'
import { Sparkles, Github, History } from 'lucide-react'

// Format date from "2026-01-26" to "January 26, 2026"
function formatDate(dateString) {
  if (!dateString) return null
  const date = new Date(dateString + 'T00:00:00')
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })
}

// Format date from "2026-01-26" to "January 2026"
function formatMonthYear(dateString) {
  if (!dateString) return null
  const date = new Date(dateString + 'T00:00:00')
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long'
  })
}

function App() {
  const { agents, lastUpdated, loading, error } = useAgentsData()
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
        <div className="mb-4 sm:relative">
          {/* Title Section */}
          <div className="text-center">
            <div className="inline-flex items-center gap-3 mb-2">
              <Sparkles className="text-violet-400 w-6 h-6" />
              <h1 className="text-3xl font-bold text-violet-400 tracking-tight">
                AI Coding Agents Matrix
              </h1>
              <Sparkles className="text-violet-400 w-6 h-6" />
            </div>
            <p className="text-slate-400 text-base font-light tracking-wide">
              A curated comparison of AI coding assistants, powered by <a target={"_blank"} href={"https://packmind.com?utm_source=coding-agents-list"}>Packmind</a>.
            </p>
            <p className="text-slate-500 text-sm font-light tracking-wide mt-1">
              Last updated: {formatDate(lastUpdated) || 'Unknown'}. Based on the latest versions of each agent's documentation.
            </p>
            <div className="mt-2 h-px w-48 mx-auto bg-gradient-to-r from-transparent via-violet-500/50 to-transparent"></div>
          </div>

          {/* Header Links - Below title on mobile, top right on desktop */}
          <div className="flex items-center justify-center gap-3 sm:gap-4 mt-4 sm:absolute sm:top-0 sm:right-0 sm:mt-0 flex-wrap">
            <button
              onClick={() => setIsChangelogOpen(true)}
              className="btn-header"
            >
              <History className="w-4 h-4" />
              <span className="hidden sm:inline">Changelog</span>
            </button>
            <a
              href="https://github.com/PackmindHub/coding-agents-matrix/issues"
              target="_blank"
              rel="noopener noreferrer"
              className="text-slate-400 hover:text-violet-400 text-xs sm:text-sm font-light tracking-wide transition-colors duration-200"
            >
              Submit an update
            </a>
            <a
              href="https://github.com/PackmindHub/coding-agents-matrix"
              target="_blank"
              rel="noopener noreferrer"
              className="text-slate-400 hover:text-violet-400 transition-colors duration-200"
              aria-label="GitHub Repository"
            >
              <Github className="w-5 h-5" />
            </a>
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
              Meticulously compiled • {formatMonthYear(lastUpdated) || 'Unknown'}
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
