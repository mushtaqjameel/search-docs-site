'use client'

import React from 'react'
import { ChevronDown, ChevronUp, ExternalLink, Link2, Users, Zap } from 'lucide-react'
import { Alert } from '../shared'
import { pillarColors } from '../../constants/colors'

/**
 * Feature Card for FeaturesList - full-featured with expand, modal, and share
 */
const FeaturesListCard = React.forwardRef(function FeaturesListCard(
    { feature, isExpanded, bucketInfo, onToggle, onOpenModal, onCopyLink },
    ref
) {
    return (
        <div
            ref={ref}
            className={`feature-card ${isExpanded ? 'ring-2 ring-indigo-500' : ''}`}
            onClick={onToggle}
        >
            <div className="feature-header">
                <div className="feature-title-row">
                    <span className="feature-title">{feature.title}</span>
                    {isExpanded ? <ChevronUp size={16} className="text-neutral-400" /> : <ChevronDown size={16} className="text-neutral-400" />}
                </div>

                <div className="pillars flex gap-1">
                    <div className="w-2.5 h-2.5 rounded-full" style={{ background: pillarColors[feature.pillars.data] }} title={`Data: ${feature.pillars.data}`} />
                    <div className="w-2.5 h-2.5 rounded-full" style={{ background: pillarColors[feature.pillars.gov] }} title={`Governance: ${feature.pillars.gov}`} />
                    <div className="w-2.5 h-2.5 rounded-full" style={{ background: pillarColors[feature.pillars.safe] }} title={`Safety: ${feature.pillars.safe}`} />
                </div>
            </div>

            <div className="feature-bucket-badge" style={{ background: bucketInfo[feature.bucket].color, color: 'white' }}>
                {bucketInfo[feature.bucket].label.split(' — ')[0]}
            </div>

            {isExpanded && (
                <div className="feature-details">
                    <div className="space-y-2">
                        <p><strong className="text-neutral-700 dark:text-neutral-300">What It Does:</strong> {feature.desc}</p>
                        <p><strong className="text-neutral-700 dark:text-neutral-300">B2B Value:</strong> {feature.value}</p>
                        <p><strong className="text-neutral-700 dark:text-neutral-300">Data Required:</strong> {feature.dataRequired}</p>
                        <p><strong className="text-neutral-700 dark:text-neutral-300">Implementation:</strong> {feature.implementation}</p>
                    </div>

                    {/* Personas and Problems */}
                    {(feature.personas || feature.problemsSolved) && (
                        <div className="mt-3 flex flex-wrap gap-2">
                            {feature.personas?.map(p => (
                                <span key={p} className="text-xs px-2 py-1 rounded bg-indigo-50 text-indigo-700 dark:bg-indigo-900/20 dark:text-indigo-300 flex items-center gap-1">
                                    <Users size={10} /> {p}
                                </span>
                            ))}
                            {feature.problemsSolved?.map(p => (
                                <span key={p} className="text-xs px-2 py-1 rounded bg-orange-50 text-orange-700 dark:bg-orange-900/20 dark:text-orange-300 flex items-center gap-1">
                                    <Zap size={10} /> {p}
                                </span>
                            ))}
                        </div>
                    )}

                    {feature.alert && (
                        <div className="mt-3">
                            <Alert type={feature.alert.type} text={feature.alert.text} />
                        </div>
                    )}

                    {/* Full Content Button */}
                    {feature.fullContent && (
                        <div className="mt-4">
                            <button
                                onClick={onOpenModal}
                                className="w-full py-2 px-4 bg-indigo-50 dark:bg-indigo-900/30 hover:bg-indigo-100 dark:hover:bg-indigo-900/50 text-indigo-700 dark:text-indigo-300 rounded-lg font-bold text-sm flex items-center justify-center gap-2 transition-colors"
                            >
                                <ExternalLink size={14} /> Read Full Details
                            </button>
                        </div>
                    )}

                    <div className="mt-3 pt-3 border-t border-dashed border-neutral-200 dark:border-neutral-700 flex justify-between items-center">
                        <div className="flex items-center gap-2">
                            <div className="text-xs uppercase font-bold text-neutral-400">Investment:</div>
                            <div className={`text-xs font-bold px-2 py-1 rounded ${
                                feature.badge === 'MVP' ? 'bg-neutral-100 text-neutral-600 dark:bg-neutral-800 dark:text-neutral-400' :
                                feature.badge === 'STANDARD' ? 'bg-green-100 text-green-700 dark:bg-green-900/20 dark:text-green-300' :
                                feature.badge === 'POLISHED' ? 'bg-cyan-100 text-cyan-700 dark:bg-cyan-900/20 dark:text-cyan-300' :
                                'bg-purple-100 text-purple-700 dark:bg-purple-900/20 dark:text-purple-300'
                            }`}>
                                {feature.badge}
                            </div>
                        </div>
                        <button
                            onClick={(e) => onCopyLink(feature.id, e)}
                            className="text-xs text-neutral-400 hover:text-indigo-500 flex items-center gap-1 transition-colors"
                            title="Copy link to this feature"
                        >
                            <Link2 size={12} /> Share
                        </button>
                    </div>
                </div>
            )}

            <style jsx>{`
                .feature-card {
                    border: 1px solid #e5e5e5;
                    border-radius: 12px;
                    padding: 1.5rem;
                    cursor: pointer;
                    transition: all 0.2s;
                    background: white;
                }
                :global(.dark) .feature-card {
                    background: #111;
                    border-color: #333;
                }
                .feature-card:hover {
                    box-shadow: 0 10px 30px -10px rgba(0,0,0,0.1);
                    transform: translateY(-2px);
                    border-color: #ccc;
                }
                :global(.dark) .feature-card:hover {
                    border-color: #555;
                    box-shadow: 0 10px 30px -10px rgba(0,0,0,0.5);
                }
                .feature-header {
                    display: flex;
                    justify-content: space-between;
                    align-items: flex-start;
                    margin-bottom: 0.8rem;
                }
                .feature-title-row {
                    display: flex;
                    align-items: center;
                    gap: 8px;
                    flex: 1;
                }
                .feature-title {
                    font-weight: 700;
                    font-size: 1.1rem;
                }
                .feature-bucket-badge {
                    display: inline-block;
                    padding: 4px 8px;
                    border-radius: 4px;
                    font-size: 0.7rem;
                    font-weight: 700;
                    text-transform: uppercase;
                }
                .feature-details {
                    margin-top: 1.5rem;
                    padding-top: 1.5rem;
                    border-top: 1px dashed #eee;
                    font-size: 0.9rem;
                    line-height: 1.6;
                }
                :global(.dark) .feature-details {
                    border-color: #333;
                }
            `}</style>
        </div>
    )
})

export { FeaturesListCard }
