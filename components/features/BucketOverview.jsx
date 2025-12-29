'use client'

import { ChevronDown, ChevronUp, CheckCircle, Target, Info } from 'lucide-react'
import { MermaidChart } from '../shared'

/**
 * Bucket Overview Component - Collapsible overview for a bucket
 */
export function BucketOverview({ bucketKey, bucketDetails, bucketInfo, isExpanded, onToggle }) {
    const details = bucketDetails[bucketKey]
    const info = bucketInfo[bucketKey]
    const Icon = info?.icon

    if (!details || !Icon) return null

    return (
        <div className="bucket-overview mb-6 rounded-xl border-2 overflow-hidden transition-all" style={{ borderColor: info.color }}>
            {/* Header - Always visible, clickable to toggle */}
            <button
                onClick={onToggle}
                className="w-full p-4 flex items-center justify-between cursor-pointer hover:opacity-90 transition-opacity"
                style={{ background: `linear-gradient(135deg, ${info.color}20, ${info.color}10)` }}
            >
                <div className="flex items-center gap-3">
                    <div className="p-2 rounded-lg" style={{ background: info.color }}>
                        <Icon size={20} className="text-white" />
                    </div>
                    <div className="text-left">
                        <h2 className="text-lg font-bold">{details.title}</h2>
                        <p className="text-neutral-500 dark:text-neutral-400 text-sm italic">{details.tagline}</p>
                    </div>
                </div>
                <div className="flex items-center gap-2 text-sm font-medium" style={{ color: info.color }}>
                    {isExpanded ? 'Hide Details' : 'Show Details'}
                    {isExpanded ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                </div>
            </button>

            {/* Expandable Content */}
            {isExpanded && (
                <div className="p-6 border-t" style={{ borderColor: `${info.color}30` }}>
                    <div className="grid md:grid-cols-2 gap-6">
                        {/* Left: Description & Value Props */}
                        <div className="space-y-4">
                            <div>
                                <h3 className="font-bold text-neutral-700 dark:text-neutral-300 mb-2 flex items-center gap-2">
                                    <Info size={16} style={{ color: info.color }} /> What This Bucket Does
                                </h3>
                                <p className="text-neutral-600 dark:text-neutral-400 text-sm leading-relaxed">
                                    {details.description}
                                </p>
                            </div>

                            <div className="p-4 rounded-lg border" style={{
                                background: `${info.color}10`,
                                borderColor: `${info.color}30`
                            }}>
                                <h3 className="font-bold mb-2 flex items-center gap-2" style={{ color: info.color }}>
                                    <Target size={16} /> The Problem We Solve
                                </h3>
                                <p className="text-neutral-600 dark:text-neutral-400 text-sm">
                                    {details.whatItSolves}
                                </p>
                            </div>

                            <div>
                                <h3 className="font-bold text-neutral-700 dark:text-neutral-300 mb-2 flex items-center gap-2">
                                    <CheckCircle size={16} className="text-green-500" /> Key Value Props
                                </h3>
                                <ul className="space-y-1">
                                    {details.keyValueProps?.map((prop, i) => (
                                        <li key={i} className="flex items-start gap-2 text-sm text-neutral-600 dark:text-neutral-400">
                                            <CheckCircle size={14} className="text-green-500 mt-0.5 shrink-0" />
                                            <span>{prop}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>

                        {/* Right: Mermaid Chart */}
                        <div className="flex items-center justify-center p-4 bg-neutral-50 dark:bg-neutral-900 rounded-lg min-h-[200px]">
                            <MermaidChart chart={details.chart} id={bucketKey} />
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}
