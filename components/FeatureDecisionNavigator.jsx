'use client'

import { useState } from 'react'
import { Compass, ArrowRight, ArrowLeft, RotateCcw, Copy, Check, AlertTriangle, CheckCircle, XCircle, Clock, Zap } from 'lucide-react'

// Quadrant definitions
const QUADRANTS = {
    buildDecision: {
        title: 'Build Decision',
        question: 'Should we build this feature?',
        xAxis: { label: 'Data Quality', low: 'Poor', high: 'Rich' },
        yAxis: { label: 'Importance', low: 'Low', high: 'High' },
        results: {
            'high-rich': { position: 'INVEST HEAVILY', color: 'green', action: 'Perfect conditions — invest fully for maximum impact' },
            'high-poor': { position: 'FIX DATA FIRST', color: 'yellow', action: 'Feature matters but data is blocking — fix data first' },
            'low-rich': { position: 'OPPORTUNISTIC', color: 'blue', action: 'Data supports it but not critical — quick win if budget allows' },
            'low-poor': { position: 'SKIP', color: 'red', action: 'Not important and data won\'t support it — remove from scope' }
        }
    },
    prioritization: {
        title: 'Prioritization',
        question: 'When should we build this feature?',
        xAxis: { label: 'Effort', low: 'Low', high: 'High' },
        yAxis: { label: 'Value', low: 'Low', high: 'High' },
        results: {
            'high-low': { position: 'QUICK WINS', color: 'green', action: 'Maximum ROI — should be in every engagement' },
            'high-high': { position: 'STRATEGIC', color: 'blue', action: 'Worth it but requires investment — phase if needed' },
            'low-low': { position: 'FILL-INS', color: 'yellow', action: 'Nice to have — add to polish phase' },
            'low-high': { position: 'AVOID', color: 'red', action: 'Poor ROI — only if client insists and pays' }
        }
    },
    deliveryApproach: {
        title: 'Delivery Approach',
        question: 'How should we build this feature?',
        xAxis: { label: 'Data Quality', low: 'Poor', high: 'Rich' },
        yAxis: { label: 'Capacity', low: 'Low', high: 'High' },
        results: {
            'high-rich': { position: 'EMPOWER', color: 'green', action: 'Give them tools — they tune it themselves' },
            'low-rich': { position: 'AUTOMATE', color: 'blue', action: 'Build full self-service — they can\'t help manually' },
            'high-poor': { position: 'ITERATE', color: 'yellow', action: 'Ship fast, they fill gaps — upgrade when data improves' },
            'low-poor': { position: 'DANGER ZONE', color: 'red', action: 'Nothing works here — fix data first or consider Managed Service' }
        }
    },
    supportModel: {
        title: 'Support Model',
        question: 'How should we support this feature?',
        xAxis: { label: 'Capacity', low: 'Low', high: 'High' },
        yAxis: { label: 'Risk', low: 'Low', high: 'High' },
        results: {
            'high-high': { position: 'GUIDED', color: 'blue', action: 'Tier 3 — Monthly check-ins, consultation hours' },
            'high-low': { position: 'MANAGED', color: 'red', action: 'Tier 4 — We manage for them, retainer model' },
            'low-high': { position: 'HANDS-OFF', color: 'green', action: 'Tier 1 — Standard support, they own it' },
            'low-low': { position: 'SELF-SERVE', color: 'yellow', action: 'Tier 2 — Strong docs, guardrails, quarterly reviews' }
        }
    }
}

const STEPS = [
    { id: 'feature', title: 'Feature' },
    { id: 'importance', title: 'Importance & Data' },
    { id: 'effort', title: 'Effort & Value' },
    { id: 'capacity', title: 'Capacity' },
    { id: 'risk', title: 'Risk' },
    { id: 'results', title: 'Results' }
]

function RatingButton({ label, value, selected, onClick, color = 'indigo' }) {
    const colorClasses = {
        indigo: selected ? 'border-indigo-500 bg-indigo-50 dark:bg-indigo-900/20 text-indigo-700 dark:text-indigo-300' : '',
        green: selected ? 'border-green-500 bg-green-50 dark:bg-green-900/20 text-green-700 dark:text-green-300' : '',
        yellow: selected ? 'border-yellow-500 bg-yellow-50 dark:bg-yellow-900/20 text-yellow-700 dark:text-yellow-300' : '',
        red: selected ? 'border-red-500 bg-red-50 dark:bg-red-900/20 text-red-700 dark:text-red-300' : ''
    }

    return (
        <button
            onClick={() => onClick(value)}
            className={`flex-1 p-4 border-2 rounded-lg font-medium transition-all ${
                selected
                    ? colorClasses[color]
                    : 'border-neutral-200 dark:border-neutral-700 hover:border-neutral-400'
            }`}
        >
            {label}
        </button>
    )
}

function QuadrantResult({ quadrant, xValue, yValue }) {
    const q = QUADRANTS[quadrant]
    const key = `${yValue}-${xValue}`
    const result = q.results[key]

    if (!result) return null

    const colorClasses = {
        green: 'bg-green-50 dark:bg-green-900/20 border-green-300 dark:border-green-700 text-green-800 dark:text-green-300',
        yellow: 'bg-yellow-50 dark:bg-yellow-900/20 border-yellow-300 dark:border-yellow-700 text-yellow-800 dark:text-yellow-300',
        blue: 'bg-blue-50 dark:bg-blue-900/20 border-blue-300 dark:border-blue-700 text-blue-800 dark:text-blue-300',
        red: 'bg-red-50 dark:bg-red-900/20 border-red-300 dark:border-red-700 text-red-800 dark:text-red-300'
    }

    const icons = {
        green: <CheckCircle size={20} />,
        yellow: <Clock size={20} />,
        blue: <Zap size={20} />,
        red: <AlertTriangle size={20} />
    }

    return (
        <div className={`p-4 rounded-lg border-2 ${colorClasses[result.color]}`}>
            <div className="flex items-center gap-2 mb-2">
                {icons[result.color]}
                <span className="font-bold">{q.title}</span>
            </div>
            <div className="text-lg font-bold mb-1">{result.position}</div>
            <div className="text-sm opacity-80">{result.action}</div>
            <div className="text-xs mt-2 opacity-60">
                {q.yAxis.label}: {yValue === 'high' ? 'High' : 'Low'} | {q.xAxis.label}: {xValue === 'rich' || xValue === 'high' ? 'High/Rich' : 'Low/Poor'}
            </div>
        </div>
    )
}

export default function FeatureDecisionNavigator() {
    const [step, setStep] = useState(0)
    const [featureName, setFeatureName] = useState('')
    const [importance, setImportance] = useState(null)
    const [dataQuality, setDataQuality] = useState(null)
    const [effort, setEffort] = useState(null)
    const [value, setValue] = useState(null)
    const [capacity, setCapacity] = useState(null)
    const [risk, setRisk] = useState(null)
    const [copied, setCopied] = useState(false)

    const reset = () => {
        setStep(0)
        setFeatureName('')
        setImportance(null)
        setDataQuality(null)
        setEffort(null)
        setValue(null)
        setCapacity(null)
        setRisk(null)
    }

    const canProceed = () => {
        switch (step) {
            case 0: return featureName.trim().length > 0
            case 1: return importance && dataQuality
            case 2: return effort && value
            case 3: return capacity
            case 4: return risk
            default: return true
        }
    }

    const getResults = () => {
        return {
            buildDecision: { x: dataQuality, y: importance },
            prioritization: { x: effort, y: value },
            deliveryApproach: { x: dataQuality, y: capacity },
            supportModel: { x: capacity, y: risk }
        }
    }

    const getSynthesis = () => {
        const results = getResults()
        const warnings = []
        const recommendations = []

        // Analyze build decision
        const buildKey = `${results.buildDecision.y}-${results.buildDecision.x}`
        if (buildKey === 'low-poor') {
            warnings.push('This feature should likely be removed from scope')
        } else if (buildKey === 'high-poor') {
            recommendations.push('Prioritize data remediation before building')
        }

        // Analyze prioritization
        const prioKey = `${results.prioritization.y}-${results.prioritization.x}`
        if (prioKey === 'high-low') {
            recommendations.push('This is a quick win — prioritize early')
        } else if (prioKey === 'low-high') {
            warnings.push('Consider dropping this feature — effort exceeds value')
        }

        // Analyze delivery
        const deliveryKey = `${results.deliveryApproach.y}-${results.deliveryApproach.x}`
        if (deliveryKey === 'low-poor') {
            warnings.push('Danger zone — both data and capacity are low')
        } else if (deliveryKey === 'low-rich') {
            recommendations.push('Invest in automation — client can\'t do manual work')
        }

        // Analyze support
        const supportKey = `${results.supportModel.y}-${results.supportModel.x}`
        if (supportKey === 'high-low') {
            recommendations.push('Budget for Managed Service (Tier 4)')
        }

        return { warnings, recommendations }
    }

    const copyResults = () => {
        const results = getResults()
        const synthesis = getSynthesis()

        const buildResult = QUADRANTS.buildDecision.results[`${results.buildDecision.y}-${results.buildDecision.x}`]
        const prioResult = QUADRANTS.prioritization.results[`${results.prioritization.y}-${results.prioritization.x}`]
        const deliveryResult = QUADRANTS.deliveryApproach.results[`${results.deliveryApproach.y}-${results.deliveryApproach.x}`]
        const supportResult = QUADRANTS.supportModel.results[`${results.supportModel.y}-${results.supportModel.x}`]

        const text = `## Feature Decision: ${featureName}

### Quadrant Analysis

| Quadrant | Position | Action |
|----------|----------|--------|
| Build Decision | ${buildResult?.position} | ${buildResult?.action} |
| Prioritization | ${prioResult?.position} | ${prioResult?.action} |
| Delivery Approach | ${deliveryResult?.position} | ${deliveryResult?.action} |
| Support Model | ${supportResult?.position} | ${supportResult?.action} |

### Inputs
- Importance: ${importance}
- Data Quality: ${dataQuality}
- Effort: ${effort}
- Value: ${value}
- Capacity: ${capacity}
- Risk: ${risk}

${synthesis.warnings.length > 0 ? `### Warnings\n${synthesis.warnings.map(w => `- ${w}`).join('\n')}\n` : ''}
${synthesis.recommendations.length > 0 ? `### Recommendations\n${synthesis.recommendations.map(r => `- ${r}`).join('\n')}` : ''}
`
        navigator.clipboard.writeText(text)
        setCopied(true)
        setTimeout(() => setCopied(false), 2000)
    }

    return (
        <div className="border border-neutral-200 dark:border-neutral-700 rounded-xl overflow-hidden">
            {/* Header */}
            <div className="bg-neutral-100 dark:bg-neutral-800 p-4 border-b border-neutral-200 dark:border-neutral-700">
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                        <Compass className="text-purple-600" size={24} />
                        <h3 className="font-bold text-lg">Feature Decision Navigator</h3>
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
                <p className="text-sm text-neutral-500 mt-1">Walk through all 4 strategic quadrants for a feature decision</p>
            </div>

            {/* Progress */}
            <div className="flex border-b border-neutral-200 dark:border-neutral-700">
                {STEPS.map((s, i) => (
                    <div
                        key={s.id}
                        className={`flex-1 h-1 ${i <= step ? 'bg-purple-500' : 'bg-neutral-200 dark:bg-neutral-700'}`}
                    />
                ))}
            </div>

            {/* Step Labels */}
            <div className="flex border-b border-neutral-200 dark:border-neutral-700 bg-neutral-50 dark:bg-neutral-800/50 overflow-x-auto">
                {STEPS.map((s, i) => (
                    <div
                        key={s.id}
                        className={`flex-1 min-w-[80px] px-2 py-2 text-center text-xs font-medium ${
                            i === step ? 'text-purple-600 dark:text-purple-400' : 'text-neutral-400'
                        }`}
                    >
                        {s.title}
                    </div>
                ))}
            </div>

            {/* Content */}
            <div className="p-6">
                {/* Step 0: Feature Name */}
                {step === 0 && (
                    <div className="space-y-4">
                        <h4 className="text-lg font-bold">What feature are you evaluating?</h4>
                        <input
                            type="text"
                            value={featureName}
                            onChange={(e) => setFeatureName(e.target.value)}
                            placeholder="e.g., Semantic Search, Image Search, Recommendations"
                            className="w-full p-4 border border-neutral-300 dark:border-neutral-600 rounded-lg bg-white dark:bg-neutral-800 focus:outline-none focus:ring-2 focus:ring-purple-500"
                        />
                        <p className="text-sm text-neutral-500">
                            We'll evaluate this feature across 4 strategic quadrants.
                        </p>
                    </div>
                )}

                {/* Step 1: Importance & Data */}
                {step === 1 && (
                    <div className="space-y-6">
                        <div>
                            <h4 className="text-lg font-bold mb-1">Quadrant 1: Build Decision</h4>
                            <p className="text-sm text-neutral-500 mb-4">Should we build "{featureName}"?</p>
                        </div>

                        <div>
                            <label className="block text-sm font-medium mb-2">How important is this feature to the client?</label>
                            <div className="flex gap-3">
                                <RatingButton label="Low" value="low" selected={importance === 'low'} onClick={setImportance} />
                                <RatingButton label="High" value="high" selected={importance === 'high'} onClick={setImportance} />
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-medium mb-2">What's the data quality for this feature?</label>
                            <div className="flex gap-3">
                                <RatingButton label="Poor" value="poor" selected={dataQuality === 'poor'} onClick={setDataQuality} />
                                <RatingButton label="Rich" value="rich" selected={dataQuality === 'rich'} onClick={setDataQuality} />
                            </div>
                        </div>

                        {importance && dataQuality && (
                            <QuadrantResult quadrant="buildDecision" xValue={dataQuality} yValue={importance} />
                        )}
                    </div>
                )}

                {/* Step 2: Effort & Value */}
                {step === 2 && (
                    <div className="space-y-6">
                        <div>
                            <h4 className="text-lg font-bold mb-1">Quadrant 2: Prioritization</h4>
                            <p className="text-sm text-neutral-500 mb-4">When should we build "{featureName}"?</p>
                        </div>

                        <div>
                            <label className="block text-sm font-medium mb-2">How much effort does this feature require?</label>
                            <div className="flex gap-3">
                                <RatingButton label="Low Effort" value="low" selected={effort === 'low'} onClick={setEffort} />
                                <RatingButton label="High Effort" value="high" selected={effort === 'high'} onClick={setEffort} />
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-medium mb-2">How much value does this feature deliver?</label>
                            <div className="flex gap-3">
                                <RatingButton label="Low Value" value="low" selected={value === 'low'} onClick={setValue} />
                                <RatingButton label="High Value" value="high" selected={value === 'high'} onClick={setValue} />
                            </div>
                        </div>

                        {effort && value && (
                            <QuadrantResult quadrant="prioritization" xValue={effort} yValue={value} />
                        )}
                    </div>
                )}

                {/* Step 3: Capacity */}
                {step === 3 && (
                    <div className="space-y-6">
                        <div>
                            <h4 className="text-lg font-bold mb-1">Quadrant 3: Delivery Approach</h4>
                            <p className="text-sm text-neutral-500 mb-4">How should we build "{featureName}"?</p>
                        </div>

                        <div>
                            <label className="block text-sm font-medium mb-2">What's the client's capacity to manage this feature?</label>
                            <div className="flex gap-3">
                                <RatingButton label="Low Capacity" value="low" selected={capacity === 'low'} onClick={setCapacity} />
                                <RatingButton label="High Capacity" value="high" selected={capacity === 'high'} onClick={setCapacity} />
                            </div>
                            <p className="text-xs text-neutral-500 mt-2">Low = no dedicated team, limited time. High = dedicated resources, can do manual work.</p>
                        </div>

                        {capacity && dataQuality && (
                            <QuadrantResult quadrant="deliveryApproach" xValue={dataQuality} yValue={capacity} />
                        )}
                    </div>
                )}

                {/* Step 4: Risk */}
                {step === 4 && (
                    <div className="space-y-6">
                        <div>
                            <h4 className="text-lg font-bold mb-1">Quadrant 4: Support Model</h4>
                            <p className="text-sm text-neutral-500 mb-4">How should we support "{featureName}"?</p>
                        </div>

                        <div>
                            <label className="block text-sm font-medium mb-2">What's the risk level if this feature goes wrong?</label>
                            <div className="flex gap-3">
                                <RatingButton label="Low Risk" value="low" selected={risk === 'low'} onClick={setRisk} />
                                <RatingButton label="High Risk" value="high" selected={risk === 'high'} onClick={setRisk} />
                            </div>
                            <p className="text-xs text-neutral-500 mt-2">Low = minimal business impact. High = affects revenue, reputation, or compliance.</p>
                        </div>

                        {risk && capacity && (
                            <QuadrantResult quadrant="supportModel" xValue={capacity} yValue={risk} />
                        )}
                    </div>
                )}

                {/* Step 5: Results */}
                {step === 5 && (
                    <div className="space-y-6">
                        <div className="flex items-start justify-between">
                            <div>
                                <h4 className="text-lg font-bold mb-1">Decision Summary</h4>
                                <p className="text-sm text-neutral-500">Complete quadrant analysis for "{featureName}"</p>
                            </div>
                            <button
                                onClick={copyResults}
                                className="p-2 text-purple-600 dark:text-purple-400 hover:bg-purple-100 dark:hover:bg-purple-900/40 rounded-lg transition-colors"
                                title="Copy results"
                            >
                                {copied ? <Check size={18} /> : <Copy size={18} />}
                            </button>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <QuadrantResult quadrant="buildDecision" xValue={dataQuality} yValue={importance} />
                            <QuadrantResult quadrant="prioritization" xValue={effort} yValue={value} />
                            <QuadrantResult quadrant="deliveryApproach" xValue={dataQuality} yValue={capacity} />
                            <QuadrantResult quadrant="supportModel" xValue={capacity} yValue={risk} />
                        </div>

                        {/* Synthesis */}
                        {(() => {
                            const { warnings, recommendations } = getSynthesis()
                            return (
                                <>
                                    {warnings.length > 0 && (
                                        <div className="p-4 bg-red-50 dark:bg-red-900/20 border border-red-300 dark:border-red-700 rounded-lg">
                                            <div className="flex items-center gap-2 font-bold text-red-800 dark:text-red-300 mb-2">
                                                <AlertTriangle size={18} />
                                                Warnings
                                            </div>
                                            <ul className="space-y-1">
                                                {warnings.map((w, i) => (
                                                    <li key={i} className="text-sm text-red-700 dark:text-red-400 flex items-start gap-2">
                                                        <XCircle size={14} className="shrink-0 mt-0.5" />
                                                        {w}
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                    )}

                                    {recommendations.length > 0 && (
                                        <div className="p-4 bg-green-50 dark:bg-green-900/20 border border-green-300 dark:border-green-700 rounded-lg">
                                            <div className="flex items-center gap-2 font-bold text-green-800 dark:text-green-300 mb-2">
                                                <CheckCircle size={18} />
                                                Recommendations
                                            </div>
                                            <ul className="space-y-1">
                                                {recommendations.map((r, i) => (
                                                    <li key={i} className="text-sm text-green-700 dark:text-green-400 flex items-start gap-2">
                                                        <CheckCircle size={14} className="shrink-0 mt-0.5" />
                                                        {r}
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                    )}

                                    {warnings.length === 0 && recommendations.length === 0 && (
                                        <div className="p-4 bg-neutral-50 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 rounded-lg">
                                            <p className="text-sm text-neutral-600 dark:text-neutral-400">
                                                This feature has a balanced profile. Review the individual quadrant results above to inform your decision.
                                            </p>
                                        </div>
                                    )}
                                </>
                            )
                        })()}

                        {/* Input Summary */}
                        <div className="p-4 bg-neutral-50 dark:bg-neutral-800/50 rounded-lg">
                            <div className="text-sm font-medium mb-2">Inputs</div>
                            <div className="grid grid-cols-2 md:grid-cols-3 gap-2 text-xs">
                                <div><span className="opacity-60">Importance:</span> {importance}</div>
                                <div><span className="opacity-60">Data:</span> {dataQuality}</div>
                                <div><span className="opacity-60">Effort:</span> {effort}</div>
                                <div><span className="opacity-60">Value:</span> {value}</div>
                                <div><span className="opacity-60">Capacity:</span> {capacity}</div>
                                <div><span className="opacity-60">Risk:</span> {risk}</div>
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

                    {step < 5 && (
                        <button
                            onClick={() => setStep(step + 1)}
                            disabled={!canProceed()}
                            className="px-4 py-2 bg-purple-600 hover:bg-purple-700 disabled:bg-neutral-300 disabled:cursor-not-allowed text-white rounded-lg font-medium flex items-center gap-2"
                        >
                            Continue <ArrowRight size={16} />
                        </button>
                    )}

                    {step === 5 && (
                        <button
                            onClick={reset}
                            className="px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-lg font-medium flex items-center gap-2"
                        >
                            Evaluate Another Feature <ArrowRight size={16} />
                        </button>
                    )}
                </div>
            </div>
        </div>
    )
}
