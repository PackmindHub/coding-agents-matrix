import { glossaryTerms } from '../data/glossary'
import useActiveSection from '../hooks/useActiveSection'

export default function GlossaryNav() {
  const sectionIds = glossaryTerms.map((term) => term.id)
  const activeSection = useActiveSection(sectionIds)

  const handleClick = (e, id) => {
    e.preventDefault()
    const element = document.getElementById(id)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
      window.history.pushState(null, '', `#${id}`)
    }
  }

  return (
    <nav className="glossary-nav">
      <div className="glossary-nav-container">
        {glossaryTerms.map((term) => (
          <a
            key={term.id}
            href={`#${term.id}`}
            onClick={(e) => handleClick(e, term.id)}
            className={`glossary-nav-item ${
              activeSection === term.id ? 'glossary-nav-item-active' : ''
            }`}
          >
            <term.icon className="w-4 h-4" />
            <span>{term.term}</span>
          </a>
        ))}
      </div>
    </nav>
  )
}
