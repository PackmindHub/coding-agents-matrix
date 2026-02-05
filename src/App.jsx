import { useState } from 'react'
import { Routes, Route } from 'react-router-dom'
import AgentTable from './components/AgentTable'
import FilterBar from './components/FilterBar'
import ChangelogDrawer from './components/ChangelogDrawer'
import GlossaryPage from './components/GlossaryPage'
import Header from './components/Header'
import Footer from './components/Footer'
import useAgentsData from './hooks/useAgentsData'
import useFiltering from './hooks/useFiltering'
import useSorting from './hooks/useSorting'
import { Sparkles } from 'lucide-react'

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

function MatrixPage({ onChangelogOpen }) {
  const { agents, lastUpdated, loading, error } = useAgentsData()
  const [sortConfig, setSortConfig] = useState({ key: 'name', direction: 'asc' })
  const [filters, setFilters] = useState({
    searchTerm: '',
    type: 'all',
    features: {}
  })

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
        <Header onChangelogOpen={onChangelogOpen} />

        {/* Description */}
        <div className="text-center mb-2">
          <p className="text-slate-400 text-base font-light tracking-wide">
            A curated comparison of AI coding assistants, powered by <a href="https://packmind.com?utm_source=coding-agents-matrix" target="_blank" rel="noopener noreferrer" className="text-violet-400 hover:text-violet-300 transition-colors">Packmind</a>.
          </p>
        </div>

        {/* Last Updated Info */}
        <div className="text-center mb-4">
          <p className="text-slate-500 text-sm font-light tracking-wide">
            Last updated: {formatDate(lastUpdated) || 'Unknown'}. Based on the latest versions of each agent's documentation.
          </p>
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
        <Footer />
      </div>
    </div>
  )
}

function App() {
  const [isChangelogOpen, setIsChangelogOpen] = useState(false)

  return (
    <>
      <Routes>
        <Route path="/" element={<MatrixPage onChangelogOpen={() => setIsChangelogOpen(true)} />} />
        <Route path="/glossary" element={<GlossaryPage onChangelogOpen={() => setIsChangelogOpen(true)} />} />
      </Routes>

      {/* Changelog Drawer - shared across all pages */}
      <ChangelogDrawer
        isOpen={isChangelogOpen}
        onClose={() => setIsChangelogOpen(false)}
      />
    </>
  )
}

export default App
