'use client'

import { useState } from 'react'
import { Compass, AlertTriangle, CheckCircle, XCircle, Clock, Zap } from 'lucide-react'
import { semanticColors } from '../constants/colors'
import { useCopyToClipboard } from '../hooks'
import { WizardHeader, WizardProgress, WizardStepLabels, WizardNav, WizardResultHeader } from './shared/WizardShell'
import quadrantsData from '../data/quadrants.json'

// Get quadrant definitions from centralized data
const { quadrants: QUADRANTS } = quadrantsData

const STEPS = [
    { id: 'feature', title: 'Feature' },
    { id: 'importance', title: 'Importance & Data' },
    { id: 'effort', title: 'Effort & Value' },
    { id: 'capacity', title: 'Capacity' },
    { id: 'risk', title: 'Risk' },
    { id: 'results', title: 'Results' }
]

const RESULT_ICONS = {
    green: <CheckCircle size={20} />,
    yellow: <Clock size={20} />,
    blue: <Zap size={20} />,
    red: <AlertTriangle size={20} />
}

function RatingButton({ label, value, selected, onClick }) {
    return (
        <button
            onClick={() => onClick(value)}
            className={`flex-1 p-4 border-2 rounded-lg font-medium transition-all ${
                selected
                    ? `${semanticColors.indigo.borderActive} ${semanticColors.indigo.bg} ${semanticColors.indigo.text}`
                    : 'border-neutral-200 dark:border-neutral-700 hover:border-neutral-400'
            }`}
        >
            {label}
        </button>
    )
}

function QuadrantResult({ quadrantId, xValue, yValue }) {
    const q = QUADRANTS[quadrantId]
    if (!q) return null

    const key = `${yValue}-${xValue}`
    const result = q.results[key]
    if (!result) return null

    const colors = semanticColors[result.color] || semanticColors.neutral

    return (
        <div className={`p-4 rounded-lg border-2 ${colors.bg} ${colors.border} ${colors.text}`}>
            <div className="flex items-center gap-2 mb-2">
                {RESULT_ICONS[result.color]}
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
    const { copied, copy } = useCopyToClipboard()

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

    const getSynthesis = () => {
        const warnings = []
        const recommendations = []

        // Analyze build decision
        const buildKey = `${importance}-${dataQuality}`
        if (buildKey === 'low-poor') {
            warnings.push('This feature should likely be removed from scope')
        } else if (buildKey === 'high-poor') {
            recommendations.push('Prioritize data remediation before building')
        }

        // Analyze prioritization
        const prioKey = `${value}-${effort}`
        if (prioKey === 'high-low') {
            recommendations.push('This is a quick win — prioritize early')
        } else if (prioKey === 'low-high') {
            warnings.push('Consider dropping this feature — effort exceeds value')
        }

        // Analyze delivery
        const deliveryKey = `${capacity}-${dataQuality}`
        if (deliveryKey === 'low-poor') {
            warnings.push('Danger zone — both data and capacity are low')
        } else if (deliveryKey === 'low-rich') {
            recommendations.push('Invest in automation — client can\'t do manual work')
        }

        // Analyze support
        const supportKey = `${risk}-${capacity}`
        if (supportKey === 'high-low') {
            recommendations.push('Budget for Managed Service (Tier 4)')
        }

        return { warnings, recommendations }
    }

    const copyResults = () => {
        const getResult = (quadrantId, x, y) => {
            const key = `${y}-${x}`
            return QUADRANTS[quadrantId]?.results?.[key]
        }

        const buildResult = getResult('buildDecision', dataQuality, importance)
        const prioResult = getResult('prioritization', effort, value)
        const deliveryResult = getResult('deliveryApproach', dataQuality, capacity)
        const supportResult = getResult('supportModel', capacity, risk)
        const synthesis = getSynthesis()

        const text = `## Feature Decision: ${featureName}

### Quadrant Analysis

| Quadrant | Position | Action |
|----------|----------|--------|
| Build Decision | ${buildResult?.position || 'N/A'} | ${buildResult?.action || 'N/A'} |
| Prioritization | ${prioResult?.position || 'N/A'} | ${prioResult?.action || 'N/A'} |
| Delivery Approach | ${deliveryResult?.position || 'N/A'} | ${deliveryResult?.action || 'N/A'} |
| Support Model | ${supportResult?.position || 'N/A'} | ${supportResult?.action || 'N/A'} |

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
        copy(text)
    }

    return (
        <div className="border border-neutral-200 dark:border-neutral-700 rounded-xl overflow-hidden">
            <WizardHeader
                icon={Compass}
                iconColor="text-purple-600"
                title="Feature Decision Navigator"
                subtitle="Walk through all 4 strategic quadrants for a feature decision"
                onReset={reset}
                showReset={step > 0}
            />

            <WizardProgress currentStep={step} totalSteps={STEPS.length} color="bg-purple-500" />
            <WizardStepLabels steps={STEPS} currentStep={step} color="text-purple-600 dark:text-purple-400" />

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
                            <h4 className="text-lg font-bold mb-1">Quadrant 1: {QUADRANTS.buildDecision.title}</h4>
                            <p className="text-sm text-neutral-500 mb-4">{QUADRANTS.buildDecision.question}</p>
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
                            <QuadrantResult quadrantId="buildDecision" xValue={dataQuality} yValue={importance} />
                        )}
                    </div>
                )}

                {/* Step 2: Effort & Value */}
                {step === 2 && (
                    <div className="space-y-6">
                        <div>
                            <h4 className="text-lg font-bold mb-1">Quadrant 2: {QUADRANTS.prioritization.title}</h4>
                            <p className="text-sm text-neutral-500 mb-4">{QUADRANTS.prioritization.question}</p>
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
                            <QuadrantResult quadrantId="prioritization" xValue={effort} yValue={value} />
                        )}
                    </div>
                )}

                {/* Step 3: Capacity */}
                {step === 3 && (
                    <div className="space-y-6">
                        <div>
                            <h4 className="text-lg font-bold mb-1">Quadrant 3: {QUADRANTS.deliveryApproach.title}</h4>
                            <p className="text-sm text-neutral-500 mb-4">{QUADRANTS.deliveryApproach.question}</p>
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
                            <QuadrantResult quadrantId="deliveryApproach" xValue={dataQuality} yValue={capacity} />
                        )}
                    </div>
                )}

                {/* Step 4: Risk */}
                {step === 4 && (
                    <div className="space-y-6">
                        <div>
                            <h4 className="text-lg font-bold mb-1">Quadrant 4: {QUADRANTS.supportModel.title}</h4>
                            <p className="text-sm text-neutral-500 mb-4">{QUADRANTS.supportModel.question}</p>
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
                            <QuadrantResult quadrantId="supportModel" xValue={capacity} yValue={risk} />
                        )}
                    </div>
                )}

                {/* Step 5: Results */}
                {step === 5 && (
                    <div className="space-y-6">
                        <WizardResultHeader
                            label="Feature"
                            value={featureName}
                            onCopy={copyResults}
                            copied={copied}
                        />

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <QuadrantResult quadrantId="buildDecision" xValue={dataQuality} yValue={importance} />
                            <QuadrantResult quadrantId="prioritization" xValue={effort} yValue={value} />
                            <QuadrantResult quadrantId="deliveryApproach" xValue={dataQuality} yValue={capacity} />
                            <QuadrantResult quadrantId="supportModel" xValue={capacity} yValue={risk} />
                        </div>

                        {/* Synthesis */}
                        {(() => {
                            const { warnings, recommendations } = getSynthesis()
                            return (
                                <>
                                    {warnings.length > 0 && (
                                        <div className={`p-4 rounded-lg border ${semanticColors.red.combined}`}>
                                            <div className="flex items-center gap-2 font-bold mb-2">
                                                <AlertTriangle size={18} />
                                                Warnings
                                            </div>
                                            <ul className="space-y-1">
                                                {warnings.map((w, i) => (
                                                    <li key={i} className="text-sm flex items-start gap-2">
                                                        <XCircle size={14} className="shrink-0 mt-0.5" />
                                                        {w}
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                    )}

                                    {recommendations.length > 0 && (
                                        <div className={`p-4 rounded-lg border ${semanticColors.green.combined}`}>
                                            <div className="flex items-center gap-2 font-bold mb-2">
                                                <CheckCircle size={18} />
                                                Recommendations
                                            </div>
                                            <ul className="space-y-1">
                                                {recommendations.map((r, i) => (
                                                    <li key={i} className="text-sm flex items-start gap-2">
                                                        <CheckCircle size={14} className="shrink-0 mt-0.5" />
                                                        {r}
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                    )}

                                    {warnings.length === 0 && recommendations.length === 0 && (
                                        <div className={`p-4 rounded-lg border ${semanticColors.neutral.combined}`}>
                                            <p className="text-sm">
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

                <WizardNav
                    onBack={step > 0 ? () => setStep(step - 1) : null}
                    onNext={step < 5 ? () => setStep(step + 1) : null}
                    onFinish={step === 5 ? reset : null}
                    canGoBack={step > 0}
                    canProceed={canProceed()}
                    isLastStep={step === 5}
                    finishLabel="Evaluate Another Feature"
                    color="bg-purple-600 hover:bg-purple-700"
                />
            </div>
        </div>
    )
}
