'use client'

import { ChevronDown, ChevronUp, AlertTriangle, CheckCircle, Clock, Zap } from 'lucide-react'
import { PillarDots } from '../ui/PillarDots'
import { InvestmentBadge, Badge, RecommendationBadge } from '../ui/Badge'
import { pillarColors } from '../../constants/colors'

/**
 * Feature card for grid/list display
 */
export function FeatureCard({
    feature,
    bucketInfo,
    isExpanded,
    onToggle,
    variant = 'grid', // 'grid' | 'compact' | 'result'
    showRecommendation = false,
    className = ''
}) {
    const bucket = bucketInfo[feature.bucket]

    if (variant === 'compact') {
        return (
            <CompactFeatureCard
                feature={feature}
                bucketInfo={bucketInfo}
                showRecommendation={showRecommendation}
                className={className}
            />
        )
    }

    if (variant === 'result') {
        return (
            <ResultFeatureCard
                feature={feature}
                bucketInfo={bucketInfo}
                isExpanded={isExpanded}
                onToggle={onToggle}
                className={className}
            />
        )
    }

    // Default grid variant
    return (
        <div
            className={`border rounded-lg p-4 cursor-pointer transition-all hover:shadow-md bg-white dark:bg-neutral-900 dark:border-neutral-700 ${isExpanded ? 'ring-2 ring-indigo-500' : ''} ${className}`}
            onClick={onToggle}
        >
            <div className="flex items-start justify-between mb-2">
                <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                        <span className="font-semibold">{feature.title}</span>
                        {isExpanded !== undefined && (
                            isExpanded ? <ChevronUp size={16} className="text-neutral-400" /> : <ChevronDown size={16} className="text-neutral-400" />
                        )}
                    </div>
                    <div className="flex items-center gap-2">
                        <span
                            className="text-xs px-2 py-0.5 rounded"
                            style={{ background: `${bucket?.color}20`, color: bucket?.color }}
                        >
                            {bucket?.label}
                        </span>
                        <PillarDots pillars={feature.pillars} size="sm" />
                    </div>
                </div>
                <InvestmentBadge level={feature.badge || feature.investment || feature.typicalInvestment} size="xs" />
            </div>

            <p className="text-sm text-neutral-600 dark:text-neutral-400 mb-2">{feature.desc}</p>

            {isExpanded && feature.fullContent && (
                <FeatureExpandedContent feature={feature} />
            )}
        </div>
    )
}

/**
 * Compact feature card for results/lists
 */
function CompactFeatureCard({ feature, bucketInfo, showRecommendation, className = '' }) {
    const bucket = bucketInfo[feature.bucket]

    return (
        <div className={`flex items-center justify-between p-3 border rounded-lg bg-white dark:bg-neutral-900 dark:border-neutral-700 ${className}`}>
            <div className="flex items-center gap-3">
                <PillarDots pillars={feature.pillars} size="sm" />
                <div>
                    <span className="font-medium">{feature.title}</span>
                    {feature.consultationNote && (
                        <span className="text-xs text-orange-600 dark:text-orange-400 ml-2">
                            * {feature.consultationNote}
                        </span>
                    )}
                </div>
            </div>
            <div className="flex items-center gap-2">
                {showRecommendation && feature.recommendation && (
                    <RecommendationBadge recommendation={feature.recommendation} size="xs" />
                )}
                <InvestmentBadge level={feature.investment || feature.typicalInvestment} size="xs" />
            </div>
        </div>
    )
}

/**
 * Result feature card for SearchScopeGenerator results
 */
function ResultFeatureCard({ feature, bucketInfo, isExpanded, onToggle, className = '' }) {
    const bucket = bucketInfo[feature.bucket]

    const recColors = {
        include: 'border-green-200 dark:border-green-800',
        limited: 'border-yellow-200 dark:border-yellow-800',
        caution: 'border-orange-200 dark:border-orange-800',
        phase: 'border-blue-200 dark:border-blue-800',
        exclude: 'border-red-200 dark:border-red-800'
    }

    return (
        <div
            className={`border rounded-lg p-3 cursor-pointer transition-all hover:shadow-sm bg-white dark:bg-neutral-900 ${recColors[feature.recommendation] || 'dark:border-neutral-700'} ${className}`}
            onClick={onToggle}
        >
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                    <PillarDots pillars={feature.pillars} size="sm" />
                    <span className="font-medium">{feature.title}</span>
                    {feature.needsAI && (
                        <span className="text-xs bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-300 px-1.5 py-0.5 rounded flex items-center gap-1">
                            <Zap size={10} /> AI
                        </span>
                    )}
                </div>
                <div className="flex items-center gap-2">
                    {feature.payNowPayLater && (
                        <span className={`text-xs px-1.5 py-0.5 rounded ${feature.payNowPayLater === 'pay_later' ? 'bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-300' : 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300'}`}>
                            {feature.payNowPayLater === 'pay_later' ? 'Pay Later' : 'Pay Now'}
                        </span>
                    )}
                    <InvestmentBadge level={feature.investment} size="xs" />
                    {isExpanded !== undefined && (
                        isExpanded ? <ChevronUp size={14} /> : <ChevronDown size={14} />
                    )}
                </div>
            </div>

            {feature.reason && (
                <p className="text-xs text-neutral-500 dark:text-neutral-400 mt-1 ml-6">{feature.reason}</p>
            )}

            {feature.consultationNote && (
                <p className="text-xs text-orange-600 dark:text-orange-400 mt-1 ml-6 flex items-center gap-1">
                    <AlertTriangle size={10} /> {feature.consultationNote}
                </p>
            )}

            {isExpanded && (
                <div className="mt-3 pt-3 border-t dark:border-neutral-700 text-sm">
                    <p className="text-neutral-600 dark:text-neutral-400">{feature.desc}</p>
                    {feature.fullContent?.whatItSolves && (
                        <p className="mt-2 text-neutral-500 dark:text-neutral-500">{feature.fullContent.whatItSolves}</p>
                    )}
                </div>
            )}
        </div>
    )
}

/**
 * Expanded content section for full feature details
 */
function FeatureExpandedContent({ feature }) {
    const fc = feature.fullContent

    return (
        <div className="mt-4 pt-4 border-t dark:border-neutral-700 space-y-4" onClick={e => e.stopPropagation()}>
            {fc.whatItSolves && (
                <div>
                    <h4 className="font-semibold text-sm mb-1">What It Solves</h4>
                    <p className="text-sm text-neutral-600 dark:text-neutral-400">{fc.whatItSolves}</p>
                </div>
            )}

            {fc.keyValueProps && fc.keyValueProps.length > 0 && (
                <div>
                    <h4 className="font-semibold text-sm mb-1">Key Value</h4>
                    <ul className="text-sm text-neutral-600 dark:text-neutral-400 list-disc list-inside space-y-1">
                        {fc.keyValueProps.map((prop, i) => (
                            <li key={i}>{prop}</li>
                        ))}
                    </ul>
                </div>
            )}

            {fc.b2bContext && (
                <div>
                    <h4 className="font-semibold text-sm mb-1">B2B Context</h4>
                    <p className="text-sm text-neutral-600 dark:text-neutral-400">{fc.b2bContext}</p>
                </div>
            )}

            {fc.useCases && fc.useCases.length > 0 && (
                <div>
                    <h4 className="font-semibold text-sm mb-1">Use Cases</h4>
                    <ul className="text-sm text-neutral-600 dark:text-neutral-400 list-disc list-inside space-y-1">
                        {fc.useCases.map((uc, i) => (
                            <li key={i}>{uc}</li>
                        ))}
                    </ul>
                </div>
            )}

            {fc.implementationNotes && (
                <div>
                    <h4 className="font-semibold text-sm mb-1">Implementation Notes</h4>
                    <p className="text-sm text-neutral-600 dark:text-neutral-400">{fc.implementationNotes}</p>
                </div>
            )}

            {feature.alert && (
                <div className={`p-3 rounded-lg border text-sm flex gap-2 items-start ${
                    feature.alert.type === 'warning' ? 'bg-yellow-50 text-yellow-800 border-yellow-200 dark:bg-yellow-900/10 dark:text-yellow-200 dark:border-yellow-800' :
                    feature.alert.type === 'danger' ? 'bg-red-50 text-red-800 border-red-200 dark:bg-red-900/10 dark:text-red-200 dark:border-red-800' :
                    feature.alert.type === 'success' ? 'bg-green-50 text-green-800 border-green-200 dark:bg-green-900/10 dark:text-green-200 dark:border-green-800' :
                    'bg-blue-50 text-blue-800 border-blue-200 dark:bg-blue-900/10 dark:text-blue-200 dark:border-blue-800'
                }`}>
                    <AlertTriangle size={16} className="mt-0.5 flex-shrink-0" />
                    <span>{feature.alert.text}</span>
                </div>
            )}
        </div>
    )
}

export { FeatureExpandedContent }
