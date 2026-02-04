import { useState, useEffect, useCallback } from 'react'
import { glossaryTerms } from '../data/glossary'
import { RotateCcw, Lightbulb, Play, ChevronDown } from 'lucide-react'

function shuffleArray(array) {
  const shuffled = [...array]
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]]
  }
  return shuffled
}

export default function ConceptQuiz() {
  const [isExpanded, setIsExpanded] = useState(false)
  const [currentIndex, setCurrentIndex] = useState(0)
  const [shuffledTerms, setShuffledTerms] = useState([])
  const [selectedAnswer, setSelectedAnswer] = useState(null)
  const [score, setScore] = useState(0)
  const [showResult, setShowResult] = useState(false)
  const [quizComplete, setQuizComplete] = useState(false)

  const initializeQuiz = useCallback(() => {
    setShuffledTerms(shuffleArray(glossaryTerms))
    setCurrentIndex(0)
    setSelectedAnswer(null)
    setScore(0)
    setShowResult(false)
    setQuizComplete(false)
  }, [])

  useEffect(() => {
    initializeQuiz()
  }, [initializeQuiz])

  const handleExpand = () => {
    setIsExpanded(true)
  }

  const handleCollapse = () => {
    setIsExpanded(false)
    initializeQuiz()
  }

  const currentTerm = shuffledTerms[currentIndex]
  const totalQuestions = glossaryTerms.length

  const handleAnswerSelect = (termId) => {
    if (showResult) return
    setSelectedAnswer(termId)
  }

  const handleSubmit = () => {
    if (!selectedAnswer || showResult) return
    setShowResult(true)
    if (selectedAnswer === currentTerm.id) {
      setScore((prev) => prev + 1)
    }
  }

  const handleNextQuestion = () => {
    if (currentIndex + 1 >= totalQuestions) {
      setQuizComplete(true)
    } else {
      setCurrentIndex((prev) => prev + 1)
      setSelectedAnswer(null)
      setShowResult(false)
    }
  }

  const getAnswerButtonClass = (termId) => {
    const baseClass = 'concept-quiz-answer'

    if (!showResult) {
      if (termId === selectedAnswer) {
        return `${baseClass} concept-quiz-answer-selected`
      }
      return baseClass
    }

    if (termId === currentTerm.id) {
      return `${baseClass} concept-quiz-answer-correct`
    }

    if (termId === selectedAnswer && termId !== currentTerm.id) {
      return `${baseClass} concept-quiz-answer-wrong`
    }

    return `${baseClass} concept-quiz-answer-disabled`
  }

  if (!currentTerm) {
    return null
  }

  // Collapsed view
  if (!isExpanded) {
    return (
      <div className="concept-quiz-collapsed">
        <div className="concept-quiz-collapsed-content">
          <Lightbulb className="w-5 h-5 text-amber-400" />
          <span className="concept-quiz-collapsed-title">Test your knowledge on AI coding agents concepts</span>
        </div>
        <button onClick={handleExpand} className="concept-quiz-start-btn">
          <Play className="w-4 h-4" />
          Start Quiz
        </button>
      </div>
    )
  }

  if (quizComplete) {
    const percentage = Math.round((score / totalQuestions) * 100)
    const getMessage = () => {
      if (percentage === 100) return 'Perfect score!'
      if (percentage >= 80) return 'Great job!'
      if (percentage >= 60) return 'Good effort!'
      return 'Keep learning!'
    }

    return (
      <div className="concept-quiz-container">
        <button onClick={handleCollapse} className="concept-quiz-collapse-btn">
          <ChevronDown className="w-4 h-4" />
          Collapse
        </button>
        <div className="concept-quiz-complete">
          <h3 className="concept-quiz-complete-title">Quiz Complete!</h3>
          <div className="concept-quiz-complete-score">
            {score}/{totalQuestions}
          </div>
          <p className="concept-quiz-complete-message">{getMessage()}</p>
          <button
            onClick={initializeQuiz}
            className="concept-quiz-restart-btn"
          >
            <RotateCcw className="w-4 h-4" />
            Try Again
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="concept-quiz-container">
      <button onClick={handleCollapse} className="concept-quiz-collapse-btn">
        <ChevronDown className="w-4 h-4" />
        Collapse
      </button>
      <h3 className="concept-quiz-title">
        <Lightbulb className="w-5 h-5" />
        Test your knowledge on AI coding agents concepts
      </h3>

      <p className="concept-quiz-description">"{currentTerm.quizQuestion}"</p>

      <p className="concept-quiz-question">What concept does this describe?</p>

      <div className="concept-quiz-answers">
        {glossaryTerms.map((term) => (
          <button
            key={term.id}
            onClick={() => handleAnswerSelect(term.id)}
            className={getAnswerButtonClass(term.id)}
            disabled={showResult}
          >
            {term.term}
          </button>
        ))}
      </div>

      <p className="concept-quiz-score">
        Question {currentIndex + 1}/{totalQuestions} · Score: {score}/{currentIndex + (showResult ? 1 : 0)}
      </p>

      {!showResult ? (
        <button
          onClick={handleSubmit}
          className="concept-quiz-submit-btn"
          disabled={!selectedAnswer}
        >
          Submit
        </button>
      ) : (
        <button
          onClick={handleNextQuestion}
          className="concept-quiz-next-btn"
        >
          {currentIndex + 1 >= totalQuestions ? 'See Results' : 'Next Question'}
        </button>
      )}
    </div>
  )
}
