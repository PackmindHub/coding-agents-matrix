import { useEffect } from 'react'
import { Helmet } from 'react-helmet-async'
import { glossaryTerms } from '../data/glossary'
import GlossaryCard from './GlossaryCard'
import GlossaryNav from './GlossaryNav'
import ConceptQuiz from './ConceptQuiz'
import Header from './Header'

export default function GlossaryPage({ onChangelogOpen }) {
  // Handle initial hash navigation
  useEffect(() => {
    if (window.location.hash) {
      const id = window.location.hash.slice(1)
      const element = document.getElementById(id)
      if (element) {
        setTimeout(() => {
          element.scrollIntoView({ behavior: 'smooth' })
        }, 100)
      }
    }
  }, [])

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'DefinedTermSet',
    name: 'AI Coding Agent Glossary',
    description: 'Key concepts and terminology used in AI coding agents and assistants',
    hasDefinedTerm: glossaryTerms.map((term) => ({
      '@type': 'DefinedTerm',
      name: term.term,
      description: term.description,
      identifier: term.id
    }))
  }

  return (
    <>
      <Helmet>
        <title>Glossary - AI Coding Agents Matrix</title>
        <meta
          name="description"
          content="Learn key AI coding agent concepts: Skills, Commands, SubAgents, Hooks, and Plugins. Understand the terminology used in modern AI coding assistants."
        />
        <meta
          name="keywords"
          content="AI coding agents, AI skills, slash commands, subagents, hooks, plugins, AI assistant glossary"
        />
        <link rel="canonical" href="https://coding-agents-matrix.dev/glossary" />
        <script type="application/ld+json">{JSON.stringify(jsonLd)}</script>
      </Helmet>

      <div className="min-h-screen py-4 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <Header onChangelogOpen={onChangelogOpen} />

          {/* Concept Quiz */}
          <ConceptQuiz />

          {/* Sticky Navigation */}
          <GlossaryNav />

          {/* Glossary Cards */}
          <div className="glossary-grid">
            {glossaryTerms.map((term) => (
              <GlossaryCard key={term.id} {...term} />
            ))}
          </div>

          {/* Footer */}
          <div className="mt-8 text-center">
            <div className="inline-block">
              <p className="text-slate-500 text-sm font-light tracking-wider">
                Part of the AI Coding Agents Matrix, powered by <a href={"https://packmind.com?utm_source=coding-agents-matrix"}>Packmind</a>
              </p>
              <div className="mt-2 h-px bg-gradient-to-r from-transparent via-slate-700 to-transparent"></div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
