'use client'

import { useState } from 'react'
import { Layers, Box, ArrowRight, ArrowLeft, RotateCcw, Lightbulb, DollarSign, Target, Users } from 'lucide-react'
import { semanticColors } from '../constants/colors'
import { useCopyToClipboard } from '../hooks'
import { WizardHeader, WizardProgress, WizardNav, WizardResultHeader } from './shared/WizardShell'
import estimationFramework from '../data/estimationFramework.json'

// Get dimensions from centralized data
const { dimensions, investmentMatrix, layerRecommendations } = estimationFramework

// Map icons to dimension options (icons can't be stored in JSON)
const DIMENSION_ICONS = {
    platform: <Layers size={24} />,
    integration: <Target size={24} />
}

// Build options arrays from JSON data
const LAYERS = dimensions.layer.options.map(opt => ({
    ...opt,
    icon: DIMENSION_ICONS[opt.value]
}))

const SCOPES = dimensions.scope.options
const PRIORITIES = dimensions.priority.options

// Results logic based on cube cell
function getResults(layer, scope, priority) {
    const matrixKey = `${scope}-${priority}`
    const matrix = investmentMatrix[matrixKey] || {}
    const layerRec = layerRecommendations[layer]?.[scope] || ''

    return {
        cell: `${layer} × ${scope} × ${priority}`,
        investment: `${matrix.investment || 'UNKNOWN'} — ${matrix.label || ''}`,
        billing: matrix.billing || '',
        reusability: matrix.reusability || '',
        recommendation: layerRec,
        riskLevel: matrix.riskLevel || 'low'
    }
}

function OptionCard({ option, active, onClick, showDetails = true }) {
    const colors = semanticColors[option.color] || semanticColors.neutral

    return (
        <button
            onClick={onClick}
            className={`p-5 text-left border-2 rounded-xl transition-all w-full ${
                active
                    ? `${colors.bg} ${colors.borderActive}`
                    : 'border-neutral-200 dark:border-neutral-700 hover:border-neutral-400 bg-white dark:bg-neutral-800'
            }`}
        >
            <div className={`font-bold text-lg mb-1 flex items-center gap-2 ${active ? colors.text : ''}`}>
                {option.icon && <span className="shrink-0">{option.icon}</span>}
                {option.label}
            </div>
            {option.storyLevel && (
                <div className={`text-xs font-bold uppercase mb-2 ${active ? colors.text : 'opacity-60'}`}>
                    {option.storyLevel}
                </div>
            )}
            <div className="text-sm opacity-80 mb-2">{option.description}</div>
            {showDetails && option.examples && (
                <div className="text-xs opacity-60 mt-2">
                    <span className="font-medium">Examples:</span> {option.examples}
                </div>
            )}
            {showDetails && option.reusability && (
                <div className="text-xs opacity-60 mt-1">
                    <span className="font-medium">Reusability:</span> {option.reusability}
                </div>
            )}
            {showDetails && option.focus && (
                <div className="text-xs opacity-60 mt-1">
                    <span className="font-medium">Focus:</span> {option.focus}
                </div>
            )}
        </button>
    )
}

export default function TaskClassifier() {
    const [step, setStep] = useState(0)
    const [taskName, setTaskName] = useState('')
    const [layer, setLayer] = useState(null)
    const [scope, setScope] = useState(null)
    const [priority, setPriority] = useState(null)
    const { copied, copy } = useCopyToClipboard()

    const reset = () => {
        setStep(0)
        setTaskName('')
        setLayer(null)
        setScope(null)
        setPriority(null)
    }

    const results = layer && scope && priority ? getResults(layer, scope, priority) : null

    const stepTitles = [
        'What task are you classifying?',
        `Layer: ${dimensions.layer.question}`,
        `Scope: ${dimensions.scope.question}`,
        `Priority: ${dimensions.priority.question}`,
        'Classification Results'
    ]

    const riskColors = {
        low: semanticColors.green.combined,
        medium: semanticColors.yellow.combined,
        high: semanticColors.red.combined
    }

    const copyResults = () => {
        if (!results) return
        const text = `## Task Classification: ${taskName}

**Layer:** ${layer}
**Scope:** ${scope}
**Priority:** ${priority}

### Investment Level
${results.investment}

### Billing Model
${results.billing}

### Reusability
${results.reusability}

### Recommendation
${results.recommendation}
`
        copy(text)
    }

    const canProceed = () => {
        switch (step) {
            case 0: return taskName.trim().length > 0
            case 1: return layer !== null
            case 2: return scope !== null
            case 3: return priority !== null
            default: return true
        }
    }

    return (
        <div className="border border-neutral-200 dark:border-neutral-700 rounded-xl overflow-hidden">
            <WizardHeader
                icon={Box}
                iconColor="text-indigo-600"
                title="Task Classifier"
                subtitle="Classify any task into the 3D estimation cube"
                onReset={reset}
                showReset={step > 0}
            />

            <WizardProgress currentStep={step} totalSteps={5} />

            <div className="p-6">
                <h4 className="text-lg font-bold mb-4">{stepTitles[step]}</h4>

                {/* Step 0: Task Name */}
                {step === 0 && (
                    <div className="space-y-4">
                        <input
                            type="text"
                            value={taskName}
                            onChange={(e) => setTaskName(e.target.value)}
                            placeholder="e.g., Build CLIP embedding service"
                            className="w-full p-4 border border-neutral-300 dark:border-neutral-600 rounded-lg bg-white dark:bg-neutral-800 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        />
                        <p className="text-sm text-neutral-500">
                            Enter a brief description of the task you want to classify.
                        </p>
                    </div>
                )}

                {/* Step 1: Layer */}
                {step === 1 && (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {LAYERS.map(l => (
                            <OptionCard
                                key={l.value}
                                option={l}
                                active={layer === l.value}
                                onClick={() => setLayer(l.value)}
                            />
                        ))}
                    </div>
                )}

                {/* Step 2: Scope */}
                {step === 2 && (
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        {SCOPES.map(s => (
                            <OptionCard
                                key={s.value}
                                option={s}
                                active={scope === s.value}
                                onClick={() => setScope(s.value)}
                            />
                        ))}
                    </div>
                )}

                {/* Step 3: Priority */}
                {step === 3 && (
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        {PRIORITIES.map(p => (
                            <OptionCard
                                key={p.value}
                                option={p}
                                active={priority === p.value}
                                onClick={() => setPriority(p.value)}
                            />
                        ))}
                    </div>
                )}

                {/* Step 4: Results */}
                {step === 4 && results && (
                    <div className="space-y-6">
                        <WizardResultHeader
                            label="Task"
                            value={taskName || 'Untitled Task'}
                            onCopy={copyResults}
                            copied={copied}
                        />

                        {/* Cube Cell */}
                        <div className="grid grid-cols-3 gap-3">
                            <div className={`p-3 rounded-lg border text-center ${semanticColors.purple.bg} ${semanticColors.purple.border}`}>
                                <div className={`text-xs uppercase font-bold mb-1 ${semanticColors.purple.textMuted}`}>Layer</div>
                                <div className={`font-bold capitalize ${semanticColors.purple.text}`}>{layer}</div>
                            </div>
                            <div className={`p-3 rounded-lg border text-center ${semanticColors[scope === 'universal' ? 'green' : scope === 'industry' ? 'yellow' : 'red'].bg} ${semanticColors[scope === 'universal' ? 'green' : scope === 'industry' ? 'yellow' : 'red'].border}`}>
                                <div className={`text-xs uppercase font-bold mb-1 ${semanticColors[scope === 'universal' ? 'green' : scope === 'industry' ? 'yellow' : 'red'].textMuted}`}>Scope</div>
                                <div className={`font-bold capitalize ${semanticColors[scope === 'universal' ? 'green' : scope === 'industry' ? 'yellow' : 'red'].text}`}>{scope}</div>
                            </div>
                            <div className={`p-3 rounded-lg border text-center ${semanticColors[priority === 'essential' ? 'green' : priority === 'enhanced' ? 'yellow' : 'red'].bg} ${semanticColors[priority === 'essential' ? 'green' : priority === 'enhanced' ? 'yellow' : 'red'].border}`}>
                                <div className={`text-xs uppercase font-bold mb-1 ${semanticColors[priority === 'essential' ? 'green' : priority === 'enhanced' ? 'yellow' : 'red'].textMuted}`}>Priority</div>
                                <div className={`font-bold capitalize ${semanticColors[priority === 'essential' ? 'green' : priority === 'enhanced' ? 'yellow' : 'red'].text}`}>{priority}</div>
                            </div>
                        </div>

                        {/* Results Details */}
                        <div className="space-y-4">
                            <div className="p-4 bg-neutral-50 dark:bg-neutral-800/50 rounded-lg">
                                <div className="flex items-center gap-2 mb-2">
                                    <DollarSign size={18} className="text-green-600" />
                                    <span className="font-bold">Investment Level</span>
                                </div>
                                <p className="text-sm">{results.investment}</p>
                            </div>

                            <div className="p-4 bg-neutral-50 dark:bg-neutral-800/50 rounded-lg">
                                <div className="flex items-center gap-2 mb-2">
                                    <Users size={18} className="text-blue-600" />
                                    <span className="font-bold">Billing Model</span>
                                </div>
                                <p className="text-sm">{results.billing}</p>
                            </div>

                            <div className="p-4 bg-neutral-50 dark:bg-neutral-800/50 rounded-lg">
                                <div className="flex items-center gap-2 mb-2">
                                    <RotateCcw size={18} className="text-purple-600" />
                                    <span className="font-bold">Reusability</span>
                                </div>
                                <p className="text-sm">{results.reusability}</p>
                            </div>

                            <div className={`p-4 rounded-lg border ${riskColors[results.riskLevel]}`}>
                                <div className="flex items-center gap-2 mb-2">
                                    <Lightbulb size={18} />
                                    <span className="font-bold">Recommendation</span>
                                </div>
                                <p className="text-sm">{results.recommendation}</p>
                            </div>
                        </div>
                    </div>
                )}

                <WizardNav
                    onBack={step > 0 ? () => setStep(step - 1) : null}
                    onNext={step < 4 ? () => setStep(step + 1) : null}
                    onFinish={step === 4 ? reset : null}
                    canGoBack={step > 0}
                    canProceed={canProceed()}
                    isLastStep={step === 4}
                    finishLabel="Classify Another Task"
                />
            </div>
        </div>
    )
}
