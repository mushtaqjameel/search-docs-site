'use client'

import { useState } from 'react'
import { Lightbulb, CheckCircle, ArrowRight, ArrowLeft, RotateCcw, Wrench, Zap, Microscope, AlertTriangle, Target, HelpCircle } from 'lucide-react'

const QUESTIONS = [
    {
        id: 'strategy_agnostic',
        question: 'Can this work be used with multiple strategies or approaches?',
        description: 'Does building this enable flexibility, or does it commit us to a specific path?',
        options: [
            { value: 'yes', label: 'Yes — it\'s strategy-agnostic', score: { essential: 2, enhanced: 0, specialized: 0 } },
            { value: 'partial', label: 'Partially — works for most approaches', score: { essential: 1, enhanced: 1, specialized: 0 } },
            { value: 'no', label: 'No — it commits to a specific strategy', score: { essential: 0, enhanced: 0, specialized: 2 } }
        ]
    },
    {
        id: 'rebuild_required',
        question: 'If we change our approach later, would we need to rebuild this?',
        description: 'Think about pivoting to a different technology or vendor.',
        options: [
            { value: 'no', label: 'No — it supports switching', score: { essential: 2, enhanced: 0, specialized: 0 } },
            { value: 'minor', label: 'Minor changes needed', score: { essential: 1, enhanced: 1, specialized: 0 } },
            { value: 'yes', label: 'Yes — significant rebuild required', score: { essential: 0, enhanced: 1, specialized: 1 } }
        ]
    },
    {
        id: 'future_clients',
        question: 'Will understanding this help future clients?',
        description: 'Is this learning transferable, or specific to this situation?',
        options: [
            { value: 'all', label: 'Yes — all future clients benefit', score: { essential: 1, enhanced: 2, specialized: 0 } },
            { value: 'industry', label: 'Same industry clients benefit', score: { essential: 0, enhanced: 1, specialized: 1 } },
            { value: 'this_only', label: 'Only this client benefits', score: { essential: 0, enhanced: 0, specialized: 2 } }
        ]
    },
    {
        id: 'feature_dependency',
        question: 'Does the feature work without this?',
        description: 'Is this required for basic functionality, or an enhancement?',
        options: [
            { value: 'no', label: 'No — feature doesn\'t work without it', score: { essential: 2, enhanced: 0, specialized: 0 } },
            { value: 'limited', label: 'Limited functionality without it', score: { essential: 1, enhanced: 1, specialized: 0 } },
            { value: 'yes', label: 'Yes — feature works, this improves it', score: { essential: 0, enhanced: 1, specialized: 1 } }
        ]
    },
    {
        id: 'poc_required',
        question: 'Does this require a POC or research phase?',
        description: 'Is the outcome predictable, or do we need to validate first?',
        options: [
            { value: 'no', label: 'No — well-understood, predictable', score: { essential: 2, enhanced: 0, specialized: 0 } },
            { value: 'some', label: 'Some unknowns, but manageable', score: { essential: 0, enhanced: 2, specialized: 0 } },
            { value: 'yes', label: 'Yes — significant research needed', score: { essential: 0, enhanced: 0, specialized: 2 } }
        ]
    },
    {
        id: 'industry_specific',
        question: 'Is this specific to an industry vertical?',
        description: 'Does it require domain expertise or industry knowledge?',
        options: [
            { value: 'no', label: 'No — works across industries', score: { essential: 1, enhanced: 1, specialized: 0 } },
            { value: 'yes', label: 'Yes — requires industry expertise', score: { essential: 0, enhanced: 0, specialized: 2 } }
        ]
    }
]

const STORY_LEVELS = {
    essential: {
        label: 'Essential (Tooling)',
        level: 'Level 1',
        color: 'green',
        icon: <Wrench size={24} />,
        description: 'Build strategy-agnostic tooling that makes all options configurable.',
        focus: 'Configure → Deploy → Evaluate → Monitor → Switch',
        guidance: [
            'This is foundational work. Build it well, document it thoroughly.',
            'Focus on flexibility — support multiple strategies without rebuilding.',
            'This enables everything else. Don\'t cut corners here.',
            'Other teams and clients will depend on this being solid.'
        ],
        examples: [
            'Embedding service with configurable models',
            'Query pipeline with A/B capability',
            'Search API with feature flags',
            'Monitoring and metrics infrastructure'
        ]
    },
    enhanced: {
        label: 'Enhanced (Platform Spikes)',
        level: 'Level 2',
        color: 'yellow',
        icon: <Zap size={24} />,
        description: 'Understand technologies, build platform knowledge. Learn once, advise all clients.',
        focus: 'Research → Document → Abstract → Share',
        guidance: [
            'This builds platform intelligence. Time-box it, document findings.',
            'The goal is understanding that transfers to future work.',
            'Create artifacts: comparison docs, decision matrices, best practices.',
            'Even if we don\'t ship a feature, the learning is valuable.'
        ],
        examples: [
            'Embedding model comparison spike',
            'Synonym extraction patterns research',
            'Performance benchmarking across approaches',
            'Integration pattern documentation'
        ]
    },
    specialized: {
        label: 'Specialized (Context Spikes)',
        level: 'Level 3',
        color: 'red',
        icon: <Microscope size={24} />,
        description: 'Industry and client-specific discovery. What works for fasteners may not work for cabinet hardware.',
        focus: 'Validate → Scope → Build (if validated) → Document edge cases',
        guidance: [
            'Validate before committing. Run a POC.',
            'This is the riskiest category — highest chance of waste.',
            'Get explicit sign-off before significant investment.',
            'If it works, document heavily — it becomes industry IP.'
        ],
        examples: [
            'Fastener-specific fine-tuning',
            'Industry taxonomy mapping',
            'Client-specific workflow integration',
            'Domain-specific ML model training'
        ]
    }
}

function determineLevel(answers) {
    const scores = { essential: 0, enhanced: 0, specialized: 0 }

    Object.values(answers).forEach(answer => {
        if (answer?.score) {
            scores.essential += answer.score.essential
            scores.enhanced += answer.score.enhanced
            scores.specialized += answer.score.specialized
        }
    })

    // Determine winner
    if (scores.essential >= scores.enhanced && scores.essential >= scores.specialized) {
        return { level: 'essential', scores, confidence: scores.essential / (scores.essential + scores.enhanced + scores.specialized) }
    } else if (scores.enhanced >= scores.essential && scores.enhanced >= scores.specialized) {
        return { level: 'enhanced', scores, confidence: scores.enhanced / (scores.essential + scores.enhanced + scores.specialized) }
    } else {
        return { level: 'specialized', scores, confidence: scores.specialized / (scores.essential + scores.enhanced + scores.specialized) }
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
                                ? 'border-indigo-500 bg-indigo-50 dark:bg-indigo-900/20'
                                : 'border-neutral-200 dark:border-neutral-700 hover:border-neutral-400'
                        }`}
                    >
                        <div className={`font-medium ${selectedValue === option.value ? 'text-indigo-600 dark:text-indigo-400' : ''}`}>
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
    const [currentQuestion, setCurrentQuestion] = useState(-1) // -1 = task name entry
    const [answers, setAnswers] = useState({})
    const [showResults, setShowResults] = useState(false)

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

    const colorClasses = {
        green: {
            bg: 'bg-green-50 dark:bg-green-900/20',
            border: 'border-green-300 dark:border-green-700',
            text: 'text-green-800 dark:text-green-300',
            badge: 'bg-green-200 text-green-800'
        },
        yellow: {
            bg: 'bg-yellow-50 dark:bg-yellow-900/20',
            border: 'border-yellow-300 dark:border-yellow-700',
            text: 'text-yellow-800 dark:text-yellow-300',
            badge: 'bg-yellow-200 text-yellow-800'
        },
        red: {
            bg: 'bg-red-50 dark:bg-red-900/20',
            border: 'border-red-300 dark:border-red-700',
            text: 'text-red-800 dark:text-red-300',
            badge: 'bg-red-200 text-red-800'
        }
    }

    return (
        <div className="border border-neutral-200 dark:border-neutral-700 rounded-xl overflow-hidden">
            {/* Header */}
            <div className="bg-neutral-100 dark:bg-neutral-800 p-4 border-b border-neutral-200 dark:border-neutral-700">
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                        <Lightbulb className="text-yellow-500" size={24} />
                        <h3 className="font-bold text-lg">Story Level Assessor</h3>
                    </div>
                    {(currentQuestion > -1 || showResults) && (
                        <button
                            onClick={reset}
                            className="text-sm text-neutral-500 hover:text-neutral-700 flex items-center gap-1"
                        >
                            <RotateCcw size={14} /> Start Over
                        </button>
                    )}
                </div>
                <p className="text-sm text-neutral-500 mt-1">Determine if a task is Essential, Enhanced, or Specialized</p>
            </div>

            {/* Progress */}
            {!showResults && (
                <div className="flex border-b border-neutral-200 dark:border-neutral-700">
                    {[-1, ...QUESTIONS.map((_, i) => i)].map(i => (
                        <div
                            key={i}
                            className={`flex-1 h-1 ${i <= currentQuestion ? 'bg-indigo-500' : 'bg-neutral-200 dark:bg-neutral-700'}`}
                        />
                    ))}
                </div>
            )}

            {/* Content */}
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
                        {/* Task Summary */}
                        <div className="p-4 bg-indigo-50 dark:bg-indigo-900/20 rounded-lg border border-indigo-200 dark:border-indigo-800">
                            <div className="text-sm text-indigo-600 dark:text-indigo-400 font-medium mb-1">Task</div>
                            <div className="font-bold text-lg">{taskName}</div>
                        </div>

                        {/* Level Result */}
                        <div className={`p-6 rounded-xl border-2 ${colorClasses[levelInfo.color].bg} ${colorClasses[levelInfo.color].border}`}>
                            <div className="flex items-center gap-3 mb-3">
                                <div className={colorClasses[levelInfo.color].text}>
                                    {levelInfo.icon}
                                </div>
                                <div>
                                    <div className={`text-xs uppercase font-bold ${colorClasses[levelInfo.color].text}`}>
                                        {levelInfo.level}
                                    </div>
                                    <h4 className={`text-xl font-bold ${colorClasses[levelInfo.color].text}`}>
                                        {levelInfo.label}
                                    </h4>
                                </div>
                                <div className={`ml-auto px-3 py-1 rounded-full text-sm font-bold ${colorClasses[levelInfo.color].badge}`}>
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
                            <div className={`p-3 rounded-lg border text-center ${result.level === 'essential' ? colorClasses.green.bg + ' ' + colorClasses.green.border : 'bg-neutral-50 dark:bg-neutral-800 border-neutral-200 dark:border-neutral-700'}`}>
                                <div className="text-xs uppercase font-bold opacity-60 mb-1">Essential</div>
                                <div className="text-2xl font-bold">{result.scores.essential}</div>
                            </div>
                            <div className={`p-3 rounded-lg border text-center ${result.level === 'enhanced' ? colorClasses.yellow.bg + ' ' + colorClasses.yellow.border : 'bg-neutral-50 dark:bg-neutral-800 border-neutral-200 dark:border-neutral-700'}`}>
                                <div className="text-xs uppercase font-bold opacity-60 mb-1">Enhanced</div>
                                <div className="text-2xl font-bold">{result.scores.enhanced}</div>
                            </div>
                            <div className={`p-3 rounded-lg border text-center ${result.level === 'specialized' ? colorClasses.red.bg + ' ' + colorClasses.red.border : 'bg-neutral-50 dark:bg-neutral-800 border-neutral-200 dark:border-neutral-700'}`}>
                                <div className="text-xs uppercase font-bold opacity-60 mb-1">Specialized</div>
                                <div className="text-2xl font-bold">{result.scores.specialized}</div>
                            </div>
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
                            <div className="p-4 bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-300 dark:border-yellow-700 rounded-lg">
                                <div className="flex items-center gap-2 text-yellow-800 dark:text-yellow-300">
                                    <AlertTriangle size={18} />
                                    <span className="font-bold">Low Confidence Result</span>
                                </div>
                                <p className="text-sm mt-2 text-yellow-700 dark:text-yellow-400">
                                    This task has characteristics of multiple story levels. Consider breaking it down into smaller tasks, or discuss with your team to align on the right classification.
                                </p>
                            </div>
                        )}
                    </div>
                )}

                {/* Navigation */}
                <div className="mt-6 flex justify-between">
                    {(currentQuestion > -1 || showResults) ? (
                        <button
                            onClick={goBack}
                            className="px-4 py-2 border border-neutral-300 dark:border-neutral-600 hover:bg-neutral-50 dark:hover:bg-neutral-800 rounded-lg font-medium flex items-center gap-2"
                        >
                            <ArrowLeft size={16} /> Back
                        </button>
                    ) : <div />}

                    {!showResults && (
                        <button
                            onClick={goNext}
                            disabled={!canProceed()}
                            className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 disabled:bg-neutral-300 disabled:cursor-not-allowed text-white rounded-lg font-medium flex items-center gap-2"
                        >
                            {currentQuestion === QUESTIONS.length - 1 ? 'See Results' : 'Continue'} <ArrowRight size={16} />
                        </button>
                    )}

                    {showResults && (
                        <button
                            onClick={reset}
                            className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg font-medium flex items-center gap-2"
                        >
                            Assess Another Task <ArrowRight size={16} />
                        </button>
                    )}
                </div>
            </div>
        </div>
    )
}
