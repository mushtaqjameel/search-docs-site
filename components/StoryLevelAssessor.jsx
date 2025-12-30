'use client'

import { useState } from 'react'
import { Lightbulb, CheckCircle, Wrench, Zap, Microscope, AlertTriangle, Target, HelpCircle } from 'lucide-react'
import { semanticColors } from '../constants/colors'
import { useCopyToClipboard } from '../hooks'
import { WizardHeader, WizardProgress, WizardNav, WizardResultHeader } from './shared/WizardShell'
import estimationFramework from '../data/estimationFramework.json'

// Get data from centralized file
const { storyLevels, storyLevelQuestions } = estimationFramework

// Map icons (can't be stored in JSON)
const LEVEL_ICONS = {
    essential: <Wrench size={24} />,
    enhanced: <Zap size={24} />,
    specialized: <Microscope size={24} />
}

// Build story levels with icons
const STORY_LEVELS = Object.fromEntries(
    Object.entries(storyLevels).map(([key, level]) => [
        key,
        { ...level, icon: LEVEL_ICONS[key] }
    ])
)

const QUESTIONS = storyLevelQuestions

function determineLevel(answers) {
    const scores = { essential: 0, enhanced: 0, specialized: 0 }

    Object.values(answers).forEach(answer => {
        if (answer?.score) {
            scores.essential += answer.score.essential
            scores.enhanced += answer.score.enhanced
            scores.specialized += answer.score.specialized
        }
    })

    const total = scores.essential + scores.enhanced + scores.specialized

    if (total === 0) {
        return { level: 'essential', scores, confidence: 0 }
    }

    if (scores.essential >= scores.enhanced && scores.essential >= scores.specialized) {
        return { level: 'essential', scores, confidence: scores.essential / total }
    } else if (scores.enhanced >= scores.essential && scores.enhanced >= scores.specialized) {
        return { level: 'enhanced', scores, confidence: scores.enhanced / total }
    } else {
        return { level: 'specialized', scores, confidence: scores.specialized / total }
    }
}

function QuestionCard({ question, selectedValue, onSelect }) {
    return (
        <div className="space-y-4">
            <div>
                <h4 className="text-lg font-bold mb-1">{question.question}</h4>
                <p className="text-sm text-neutral-500">{question.description}</p>
            </div>
            <div className="space-y-2">
                {question.options.map(option => (
                    <button
                        key={option.value}
                        onClick={() => onSelect(option)}
                        className={`w-full p-4 text-left border-2 rounded-lg transition-all ${
                            selectedValue === option.value
                                ? `${semanticColors.indigo.borderActive} ${semanticColors.indigo.bg}`
                                : 'border-neutral-200 dark:border-neutral-700 hover:border-neutral-400'
                        }`}
                    >
                        <div className={`font-medium ${selectedValue === option.value ? semanticColors.indigo.text : ''}`}>
                            {option.label}
                        </div>
                    </button>
                ))}
            </div>
        </div>
    )
}

export default function StoryLevelAssessor() {
    const [taskName, setTaskName] = useState('')
    const [currentQuestion, setCurrentQuestion] = useState(-1)
    const [answers, setAnswers] = useState({})
    const [showResults, setShowResults] = useState(false)
    const { copied, copy } = useCopyToClipboard()

    const reset = () => {
        setTaskName('')
        setCurrentQuestion(-1)
        setAnswers({})
        setShowResults(false)
    }

    const handleAnswer = (questionId, option) => {
        setAnswers(prev => ({ ...prev, [questionId]: option }))
    }

    const goNext = () => {
        if (currentQuestion < QUESTIONS.length - 1) {
            setCurrentQuestion(currentQuestion + 1)
        } else {
            setShowResults(true)
        }
    }

    const goBack = () => {
        if (showResults) {
            setShowResults(false)
        } else if (currentQuestion > -1) {
            setCurrentQuestion(currentQuestion - 1)
        }
    }

    const canProceed = () => {
        if (currentQuestion === -1) return taskName.trim().length > 0
        return answers[QUESTIONS[currentQuestion]?.id] !== undefined
    }

    const result = showResults ? determineLevel(answers) : null
    const levelInfo = result ? STORY_LEVELS[result.level] : null

    const copyResults = () => {
        if (!result || !levelInfo) return
        const text = `## Story Level Assessment: ${taskName}

**Level:** ${levelInfo.label}
**Confidence:** ${Math.round(result.confidence * 100)}%

### Scores
- Essential: ${result.scores.essential}
- Enhanced: ${result.scores.enhanced}
- Specialized: ${result.scores.specialized}

### Description
${levelInfo.description}

### Focus
${levelInfo.focus}

### Guidance
${levelInfo.guidance.map(g => `- ${g}`).join('\n')}
`
        copy(text)
    }

    const totalSteps = QUESTIONS.length + 1
    const currentStep = showResults ? totalSteps : currentQuestion + 1

    return (
        <div className="border border-neutral-200 dark:border-neutral-700 rounded-xl overflow-hidden">
            <WizardHeader
                icon={Lightbulb}
                iconColor="text-yellow-500"
                title="Story Level Assessor"
                subtitle="Determine if a task is Essential, Enhanced, or Specialized"
                onReset={reset}
                showReset={currentQuestion > -1 || showResults}
            />

            {!showResults && (
                <WizardProgress currentStep={currentStep} totalSteps={totalSteps} />
            )}

            <div className="p-6">
                {/* Task Name Entry */}
                {currentQuestion === -1 && !showResults && (
                    <div className="space-y-4">
                        <h4 className="text-lg font-bold">What task are you assessing?</h4>
                        <input
                            type="text"
                            value={taskName}
                            onChange={(e) => setTaskName(e.target.value)}
                            placeholder="e.g., Build CLIP embedding service"
                            className="w-full p-4 border border-neutral-300 dark:border-neutral-600 rounded-lg bg-white dark:bg-neutral-800 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        />
                        <p className="text-sm text-neutral-500">
                            We'll ask {QUESTIONS.length} questions to determine the story level.
                        </p>
                    </div>
                )}

                {/* Questions */}
                {currentQuestion >= 0 && !showResults && (
                    <QuestionCard
                        question={QUESTIONS[currentQuestion]}
                        selectedValue={answers[QUESTIONS[currentQuestion].id]?.value}
                        onSelect={(option) => handleAnswer(QUESTIONS[currentQuestion].id, option)}
                    />
                )}

                {/* Results */}
                {showResults && levelInfo && (
                    <div className="space-y-6">
                        <WizardResultHeader
                            label="Task"
                            value={taskName}
                            onCopy={copyResults}
                            copied={copied}
                        />

                        {/* Level Result */}
                        <div className={`p-6 rounded-xl border-2 ${semanticColors[levelInfo.color].bg} ${semanticColors[levelInfo.color].border}`}>
                            <div className="flex items-center gap-3 mb-3">
                                <div className={semanticColors[levelInfo.color].text}>
                                    {levelInfo.icon}
                                </div>
                                <div>
                                    <div className={`text-xs uppercase font-bold ${semanticColors[levelInfo.color].text}`}>
                                        {levelInfo.level}
                                    </div>
                                    <h4 className={`text-xl font-bold ${semanticColors[levelInfo.color].text}`}>
                                        {levelInfo.label}
                                    </h4>
                                </div>
                                <div className={`ml-auto px-3 py-1 rounded-full text-sm font-bold ${semanticColors[levelInfo.color].badge}`}>
                                    {Math.round(result.confidence * 100)}% confidence
                                </div>
                            </div>
                            <p className="text-sm opacity-80 mb-3">{levelInfo.description}</p>
                            <div className="text-sm font-medium opacity-70">
                                <span className="font-bold">Focus:</span> {levelInfo.focus}
                            </div>
                        </div>

                        {/* Score Breakdown */}
                        <div className="grid grid-cols-3 gap-3">
                            {['essential', 'enhanced', 'specialized'].map(level => {
                                const isActive = result.level === level
                                const color = STORY_LEVELS[level].color
                                return (
                                    <div
                                        key={level}
                                        className={`p-3 rounded-lg border text-center ${
                                            isActive
                                                ? `${semanticColors[color].bg} ${semanticColors[color].border}`
                                                : 'bg-neutral-50 dark:bg-neutral-800 border-neutral-200 dark:border-neutral-700'
                                        }`}
                                    >
                                        <div className="text-xs uppercase font-bold opacity-60 mb-1 capitalize">{level}</div>
                                        <div className="text-2xl font-bold">{result.scores[level]}</div>
                                    </div>
                                )
                            })}
                        </div>

                        {/* Guidance */}
                        <div className="p-4 bg-neutral-50 dark:bg-neutral-800/50 rounded-lg">
                            <h5 className="font-bold mb-3 flex items-center gap-2">
                                <Target size={18} className="text-indigo-600" />
                                Guidance for {levelInfo.label}
                            </h5>
                            <ul className="space-y-2">
                                {levelInfo.guidance.map((item, i) => (
                                    <li key={i} className="flex items-start gap-2 text-sm">
                                        <CheckCircle size={16} className="text-green-500 shrink-0 mt-0.5" />
                                        {item}
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {/* Examples */}
                        <div className="p-4 bg-neutral-50 dark:bg-neutral-800/50 rounded-lg">
                            <h5 className="font-bold mb-3 flex items-center gap-2">
                                <HelpCircle size={18} className="text-purple-600" />
                                Other tasks at this level
                            </h5>
                            <ul className="space-y-1">
                                {levelInfo.examples.map((item, i) => (
                                    <li key={i} className="text-sm flex items-center gap-2">
                                        <span className="text-neutral-400">•</span>
                                        {item}
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {/* Warning if low confidence */}
                        {result.confidence < 0.4 && (
                            <div className={`p-4 rounded-lg border ${semanticColors.yellow.combined}`}>
                                <div className="flex items-center gap-2">
                                    <AlertTriangle size={18} />
                                    <span className="font-bold">Low Confidence Result</span>
                                </div>
                                <p className="text-sm mt-2">
                                    This task has characteristics of multiple story levels. Consider breaking it down into smaller tasks, or discuss with your team to align on the right classification.
                                </p>
                            </div>
                        )}
                    </div>
                )}

                <WizardNav
                    onBack={(currentQuestion > -1 || showResults) ? goBack : null}
                    onNext={!showResults ? goNext : null}
                    onFinish={showResults ? reset : null}
                    canGoBack={currentQuestion > -1 || showResults}
                    canProceed={canProceed()}
                    isLastStep={showResults}
                    nextLabel={currentQuestion === QUESTIONS.length - 1 ? 'See Results' : 'Continue'}
                    finishLabel="Assess Another Task"
                />
            </div>
        </div>
    )
}
