'use client'

import { useState } from 'react'
import { Layers, Users, Clock, Box, ArrowRight, ArrowLeft, CheckCircle, RotateCcw, Lightbulb, DollarSign, Target } from 'lucide-react'

const LAYERS = [
    {
        value: 'platform',
        label: 'Platform',
        icon: <Layers size={24} />,
        description: 'Backend services, APIs, models, pipelines, data processing',
        examples: 'Embedding service, ES index, search API, product pipeline',
        color: 'purple'
    },
    {
        value: 'integration',
        label: 'Integration',
        icon: <Target size={24} />,
        description: 'Frontend components, UI wiring, client-facing touchpoints',
        examples: 'Upload UI, results display, camera capture, filters',
        color: 'cyan'
    }
]

const SCOPES = [
    {
        value: 'universal',
        label: 'Universal',
        description: 'Works for any client in any industry',
        reusability: 'Build once, use everywhere',
        examples: 'CLIP embedding, ES KNN, basic similarity',
        color: 'green'
    },
    {
        value: 'industry',
        label: 'Industry-Specific',
        description: 'Works for any client in the SAME industry',
        reusability: 'Build for first client, becomes platform IP',
        examples: 'Thread pitch detection, fastener OCR, wood grain matching',
        color: 'yellow'
    },
    {
        value: 'client',
        label: 'Client-Specific',
        description: 'Only works for THIS client',
        reusability: 'Billable per client',
        examples: 'Config values, UI wiring, custom workflows',
        color: 'red'
    }
]

const PRIORITIES = [
    {
        value: 'essential',
        label: 'Essential (Tooling)',
        storyLevel: 'Level 1',
        focus: 'Configure → Deploy → Evaluate → Monitor → Switch',
        description: 'Must exist for the feature to function at all',
        investment: 'Must build — feature doesn\'t function without it',
        color: 'green'
    },
    {
        value: 'enhanced',
        label: 'Enhanced (Platform Spikes)',
        storyLevel: 'Level 2',
        focus: 'Understand technologies, build platform knowledge',
        description: 'Improves quality, UX, operations, analytics',
        investment: 'Should build — multiplies value across clients',
        color: 'yellow'
    },
    {
        value: 'specialized',
        label: 'Specialized (Context Spikes)',
        storyLevel: 'Level 3',
        focus: 'Industry and client-specific discovery',
        description: 'Complex, requires POC/research, may not build',
        investment: 'Might build — only if validated for this context',
        color: 'red'
    }
]

// Results logic based on cube cell
function getResults(layer, scope, priority) {
    const results = {
        cell: `${layer} × ${scope} × ${priority}`,
        investment: '',
        billing: '',
        reusability: '',
        recommendation: '',
        riskLevel: 'low'
    }

    // Investment justification
    if (scope === 'universal' && priority === 'essential') {
        results.investment = 'HIGH — Core infrastructure. This is foundational platform work.'
        results.billing = 'Platform investment (not client-billable)'
        results.reusability = 'Every client benefits. Build it right once.'
    } else if (scope === 'universal' && priority === 'enhanced') {
        results.investment = 'MEDIUM-HIGH — Improves platform quality for all clients.'
        results.billing = 'Platform investment, prioritize by impact'
        results.reusability = 'All clients benefit when activated.'
    } else if (scope === 'universal' && priority === 'specialized') {
        results.investment = 'CONDITIONAL — High potential value but requires POC validation.'
        results.billing = 'Platform R&D, time-boxed POC'
        results.reusability = 'If proven, becomes platform differentiator.'
        results.riskLevel = 'medium'
    } else if (scope === 'industry' && priority === 'essential') {
        results.investment = 'HIGH — Market differentiator for this vertical.'
        results.billing = 'Shared: first client pays premium, future clients get discount'
        results.reusability = 'Becomes platform IP for this industry.'
    } else if (scope === 'industry' && priority === 'enhanced') {
        results.investment = 'MEDIUM — Valuable addition for industry clients.'
        results.billing = 'Partially billable to first client, platform for future'
        results.reusability = 'Industry knowledge that transfers to similar clients.'
    } else if (scope === 'industry' && priority === 'specialized') {
        results.investment = 'LOW-MEDIUM — Only build with clear demand and validation.'
        results.billing = 'POC funded by interested client'
        results.reusability = 'Niche — may only help a few clients in vertical.'
        results.riskLevel = 'high'
    } else if (scope === 'client' && priority === 'essential') {
        results.investment = 'CLIENT-FUNDED — Required for this client\'s launch.'
        results.billing = '100% billable to client'
        results.reusability = 'None — this is integration/config work.'
    } else if (scope === 'client' && priority === 'enhanced') {
        results.investment = 'CLIENT-FUNDED — Nice-to-have for this client.'
        results.billing = 'Billable, scope carefully'
        results.reusability = 'None — client-specific polish.'
    } else if (scope === 'client' && priority === 'specialized') {
        results.investment = 'QUESTION IT — Why are we building specialized work for one client?'
        results.billing = 'Billable only if client insists and pays premium'
        results.reusability = 'Zero — likely throwaway work.'
        results.riskLevel = 'high'
    }

    // Recommendations by layer
    if (layer === 'platform') {
        results.recommendation = scope === 'universal'
            ? 'Platform work with universal scope is the highest leverage. Invest in quality and documentation.'
            : scope === 'industry'
            ? 'Platform work for an industry becomes IP. Ensure it\'s abstracted enough to reuse.'
            : 'Platform work for a single client is unusual. Consider if this should be integration instead.'
    } else {
        results.recommendation = scope === 'universal'
            ? 'Reusable UI components are valuable. Build with configuration in mind.'
            : scope === 'industry'
            ? 'Industry-specific UI can be templatized. Look for patterns.'
            : 'Client integration work. Keep scope tight, don\'t over-engineer.'
    }

    return results
}

function OptionCard({ option, active, onClick, showDetails = true }) {
    const colorClasses = {
        purple: 'border-purple-300 bg-purple-50 dark:bg-purple-900/20',
        cyan: 'border-cyan-300 bg-cyan-50 dark:bg-cyan-900/20',
        green: 'border-green-300 bg-green-50 dark:bg-green-900/20',
        yellow: 'border-yellow-300 bg-yellow-50 dark:bg-yellow-900/20',
        red: 'border-red-300 bg-red-50 dark:bg-red-900/20'
    }

    const textClasses = {
        purple: 'text-purple-800 dark:text-purple-300',
        cyan: 'text-cyan-800 dark:text-cyan-300',
        green: 'text-green-800 dark:text-green-300',
        yellow: 'text-yellow-800 dark:text-yellow-300',
        red: 'text-red-800 dark:text-red-300'
    }

    return (
        <button
            onClick={onClick}
            className={`p-5 text-left border-2 rounded-xl transition-all w-full ${
                active
                    ? `${colorClasses[option.color]} border-${option.color}-500`
                    : 'border-neutral-200 dark:border-neutral-700 hover:border-neutral-400 bg-white dark:bg-neutral-800'
            }`}
        >
            <div className={`font-bold text-lg mb-1 flex items-center gap-2 ${active ? textClasses[option.color] : ''}`}>
                {option.icon && <span className="shrink-0">{option.icon}</span>}
                {option.label}
            </div>
            {option.storyLevel && (
                <div className={`text-xs font-bold uppercase mb-2 ${active ? textClasses[option.color] : 'opacity-60'}`}>
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
        'Layer: What TYPE of work is this?',
        'Scope: WHO can reuse this?',
        'Priority: WHEN do we build this?',
        'Classification Results'
    ]

    const riskColors = {
        low: 'bg-green-100 text-green-800 border-green-300',
        medium: 'bg-yellow-100 text-yellow-800 border-yellow-300',
        high: 'bg-red-100 text-red-800 border-red-300'
    }

    return (
        <div className="border border-neutral-200 dark:border-neutral-700 rounded-xl overflow-hidden">
            {/* Header */}
            <div className="bg-neutral-100 dark:bg-neutral-800 p-4 border-b border-neutral-200 dark:border-neutral-700">
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                        <Box className="text-indigo-600" size={24} />
                        <h3 className="font-bold text-lg">Task Classifier</h3>
                    </div>
                    {step > 0 && (
                        <button
                            onClick={reset}
                            className="text-sm text-neutral-500 hover:text-neutral-700 flex items-center gap-1"
                        >
                            <RotateCcw size={14} /> Start Over
                        </button>
                    )}
                </div>
                <p className="text-sm text-neutral-500 mt-1">Classify any task into the 3D estimation cube</p>
            </div>

            {/* Progress */}
            <div className="flex border-b border-neutral-200 dark:border-neutral-700">
                {[0, 1, 2, 3, 4].map(i => (
                    <div
                        key={i}
                        className={`flex-1 h-1 ${i <= step ? 'bg-indigo-500' : 'bg-neutral-200 dark:bg-neutral-700'}`}
                    />
                ))}
            </div>

            {/* Content */}
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
                        {/* Task Summary */}
                        <div className="p-4 bg-indigo-50 dark:bg-indigo-900/20 rounded-lg border border-indigo-200 dark:border-indigo-800">
                            <div className="text-sm text-indigo-600 dark:text-indigo-400 font-medium mb-1">Task</div>
                            <div className="font-bold text-lg">{taskName || 'Untitled Task'}</div>
                        </div>

                        {/* Cube Cell */}
                        <div className="grid grid-cols-3 gap-3">
                            <div className="p-3 bg-purple-50 dark:bg-purple-900/20 rounded-lg border border-purple-200 text-center">
                                <div className="text-xs uppercase font-bold text-purple-600 mb-1">Layer</div>
                                <div className="font-bold text-purple-800 dark:text-purple-300 capitalize">{layer}</div>
                            </div>
                            <div className={`p-3 rounded-lg border text-center ${
                                scope === 'universal' ? 'bg-green-50 dark:bg-green-900/20 border-green-200' :
                                scope === 'industry' ? 'bg-yellow-50 dark:bg-yellow-900/20 border-yellow-200' :
                                'bg-red-50 dark:bg-red-900/20 border-red-200'
                            }`}>
                                <div className={`text-xs uppercase font-bold mb-1 ${
                                    scope === 'universal' ? 'text-green-600' :
                                    scope === 'industry' ? 'text-yellow-600' :
                                    'text-red-600'
                                }`}>Scope</div>
                                <div className={`font-bold capitalize ${
                                    scope === 'universal' ? 'text-green-800 dark:text-green-300' :
                                    scope === 'industry' ? 'text-yellow-800 dark:text-yellow-300' :
                                    'text-red-800 dark:text-red-300'
                                }`}>{scope}</div>
                            </div>
                            <div className={`p-3 rounded-lg border text-center ${
                                priority === 'essential' ? 'bg-green-50 dark:bg-green-900/20 border-green-200' :
                                priority === 'enhanced' ? 'bg-yellow-50 dark:bg-yellow-900/20 border-yellow-200' :
                                'bg-red-50 dark:bg-red-900/20 border-red-200'
                            }`}>
                                <div className={`text-xs uppercase font-bold mb-1 ${
                                    priority === 'essential' ? 'text-green-600' :
                                    priority === 'enhanced' ? 'text-yellow-600' :
                                    'text-red-600'
                                }`}>Priority</div>
                                <div className={`font-bold capitalize ${
                                    priority === 'essential' ? 'text-green-800 dark:text-green-300' :
                                    priority === 'enhanced' ? 'text-yellow-800 dark:text-yellow-300' :
                                    'text-red-800 dark:text-red-300'
                                }`}>{priority}</div>
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

                {/* Navigation */}
                <div className="mt-6 flex justify-between">
                    {step > 0 ? (
                        <button
                            onClick={() => setStep(step - 1)}
                            className="px-4 py-2 border border-neutral-300 dark:border-neutral-600 hover:bg-neutral-50 dark:hover:bg-neutral-800 rounded-lg font-medium flex items-center gap-2"
                        >
                            <ArrowLeft size={16} /> Back
                        </button>
                    ) : <div />}

                    {step < 4 && (
                        <button
                            onClick={() => setStep(step + 1)}
                            disabled={
                                (step === 0 && !taskName) ||
                                (step === 1 && !layer) ||
                                (step === 2 && !scope) ||
                                (step === 3 && !priority)
                            }
                            className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 disabled:bg-neutral-300 disabled:cursor-not-allowed text-white rounded-lg font-medium flex items-center gap-2"
                        >
                            Continue <ArrowRight size={16} />
                        </button>
                    )}

                    {step === 4 && (
                        <button
                            onClick={reset}
                            className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg font-medium flex items-center gap-2"
                        >
                            Classify Another Task <ArrowRight size={16} />
                        </button>
                    )}
                </div>
            </div>
        </div>
    )
}
