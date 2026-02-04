import { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Sparkles, Github, History, BookOpen, LayoutGrid, Menu, X } from 'lucide-react'

export default function Header({ onChangelogOpen }) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const location = useLocation()
  const activePage = location.pathname === '/glossary' ? 'glossary' : 'matrix'

  const closeMobileMenu = () => setIsMobileMenuOpen(false)

  return (
    <>
      {/* Fixed Header */}
      <header className="fixed top-0 left-0 right-0 z-50 h-16 bg-slate-900/95 backdrop-blur-xl border-b border-slate-700/50">
        <div className="h-full max-w-[120rem] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="h-full flex items-center justify-between">
            {/* Left: Logo */}
            <Link
              to="/"
              className="flex items-center gap-2 text-violet-400 hover:text-violet-300 transition-colors duration-200"
              onClick={closeMobileMenu}
            >
              <Sparkles className="w-5 h-5 flex-shrink-0" />
              <span className="font-bold text-lg tracking-tight whitespace-nowrap">
                <span className="hidden sm:inline">AI Coding Agents Matrix</span>
                <span className="sm:hidden">AI Coding Agents</span>
              </span>
            </Link>

            {/* Center: Navigation (Desktop only) */}
            <nav className="hidden md:flex items-center gap-1">
              <Link
                to="/"
                className={`nav-tab ${activePage === 'matrix' ? 'nav-tab-active' : ''}`}
              >
                <LayoutGrid className="w-4 h-4" />
                Matrix
              </Link>
              <Link
                to="/glossary"
                className={`nav-tab ${activePage === 'glossary' ? 'nav-tab-active' : ''}`}
              >
                <BookOpen className="w-4 h-4" />
                Glossary
              </Link>
            </nav>

            {/* Right: Actions (Desktop only) */}
            <div className="hidden md:flex items-center gap-3">
              <button
                onClick={onChangelogOpen}
                className="btn-header"
              >
                <History className="w-4 h-4" />
                Changelog
              </button>
              <a
                href="https://github.com/PackmindHub/coding-agents-matrix/issues"
                target="_blank"
                rel="noopener noreferrer"
                className="text-slate-400 hover:text-violet-400 text-sm font-light tracking-wide transition-colors duration-200"
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

            {/* Mobile: Hamburger Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden p-2 text-slate-400 hover:text-violet-400 transition-colors duration-200"
              aria-label={isMobileMenuOpen ? 'Close menu' : 'Open menu'}
            >
              {isMobileMenuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Menu Dropdown */}
      {isMobileMenuOpen && (
        <div className="fixed top-16 left-0 right-0 z-40 md:hidden bg-slate-900/98 backdrop-blur-xl border-b border-slate-700/50 shadow-xl">
          <nav className="px-4 py-4 space-y-1">
            {/* Navigation Links */}
            <Link
              to="/"
              onClick={closeMobileMenu}
              className={`mobile-nav-item ${activePage === 'matrix' ? 'mobile-nav-item-active' : ''}`}
            >
              <LayoutGrid className="w-5 h-5" />
              Matrix
            </Link>
            <Link
              to="/glossary"
              onClick={closeMobileMenu}
              className={`mobile-nav-item ${activePage === 'glossary' ? 'mobile-nav-item-active' : ''}`}
            >
              <BookOpen className="w-5 h-5" />
              Glossary
            </Link>

            {/* Divider */}
            <div className="h-px bg-slate-700/50 my-3" />

            {/* Action Links */}
            <button
              onClick={() => {
                onChangelogOpen()
                closeMobileMenu()
              }}
              className="mobile-nav-item w-full text-left"
            >
              <History className="w-5 h-5" />
              Changelog
            </button>
            <a
              href="https://github.com/PackmindHub/coding-agents-matrix/issues"
              target="_blank"
              rel="noopener noreferrer"
              className="mobile-nav-item"
            >
              Submit an update
            </a>
            <a
              href="https://github.com/PackmindHub/coding-agents-matrix"
              target="_blank"
              rel="noopener noreferrer"
              className="mobile-nav-item"
            >
              <Github className="w-5 h-5" />
              GitHub
            </a>
          </nav>
        </div>
      )}

      {/* Spacer to prevent content from being hidden under fixed header */}
      <div className="h-16" />
    </>
  )
}
