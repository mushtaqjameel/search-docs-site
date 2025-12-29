'use client'

import {
    X, Search, Brain, Lightbulb, Target, Shield,
    Users, Zap, CheckCircle, AlertTriangle, Link2
} from 'lucide-react'
import { Alert } from '../shared'
import { pillarColors } from '../../constants/colors'

/**
 * Full-page modal for feature details
 */
export function FeatureModal({ feature, bucketInfo, linkCopied, onCopyLink, onClose }) {
    if (!feature) return null

    return (
        <div className="fixed inset-0 z-50 bg-white dark:bg-neutral-950 overflow-auto">
            {/* Modal Header */}
            <div className="sticky top-0 z-10 bg-white dark:bg-neutral-950 border-b border-neutral-200 dark:border-neutral-800 px-6 py-4">
                <div className="max-w-4xl mx-auto flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <div className="inline-block px-2 py-1 rounded text-xs font-bold uppercase text-white"
                            style={{ background: bucketInfo[feature.bucket]?.color }}>
                            {bucketInfo[feature.bucket]?.label}
                        </div>
                        <h1 className="text-2xl font-bold">{feature.title}</h1>
                    </div>
                    <button
                        onClick={onClose}
                        className="p-2 hover:bg-neutral-100 dark:hover:bg-neutral-800 rounded-lg transition-colors"
                    >
                        <X size={24} />
                    </button>
                </div>
            </div>

            {/* Modal Content */}
            <div className="max-w-4xl mx-auto px-6 py-8">
                {/* Quick Stats */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                    <div className="p-4 bg-neutral-50 dark:bg-neutral-900 rounded-lg text-center">
                        <div className="text-xs uppercase font-bold text-neutral-500 mb-1">Investment</div>
                        <div className={`text-sm font-bold px-2 py-1 rounded inline-block ${
                            feature.badge === 'MVP' ? 'bg-neutral-200 text-neutral-700 dark:bg-neutral-700 dark:text-neutral-300' :
                            feature.badge === 'STANDARD' ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300' :
                            feature.badge === 'POLISHED' ? 'bg-cyan-100 text-cyan-700 dark:bg-cyan-900/30 dark:text-cyan-300' :
                            'bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-300'
                        }`}>
                            {feature.badge}
                        </div>
                    </div>
                    <PillarStat label="Data" color={feature.pillars?.data} />
                    <PillarStat label="Governance" color={feature.pillars?.gov} />
                    <PillarStat label="Safety" color={feature.pillars?.safe} />
                </div>

                {/* Tags */}
                <div className="flex flex-wrap gap-2 mb-8">
                    {feature.personas?.map(p => (
                        <span key={p} className="px-3 py-1 rounded-full bg-indigo-50 text-indigo-700 dark:bg-indigo-900/30 dark:text-indigo-300 text-sm flex items-center gap-1">
                            <Users size={12} /> {p}
                        </span>
                    ))}
                    {feature.problemsSolved?.map(p => (
                        <span key={p} className="px-3 py-1 rounded-full bg-orange-50 text-orange-700 dark:bg-orange-900/30 dark:text-orange-300 text-sm flex items-center gap-1">
                            <Zap size={12} /> {p}
                        </span>
                    ))}
                </div>

                {/* Alert if present */}
                {feature.alert && (
                    <div className="mb-8">
                        <Alert type={feature.alert.type} text={feature.alert.text} />
                    </div>
                )}

                {/* Main Content Sections */}
                <div className="space-y-8">
                    {/* Overview */}
                    <ContentSection icon={Search} iconColor="text-indigo-500" title="Overview">
                        <div className="space-y-4">
                            <ContentBlock title="What It Does" text={feature.desc} />
                            <ContentBlock title="B2B Value" text={feature.value} />
                        </div>
                    </ContentSection>

                    {/* What It Solves */}
                    {feature.fullContent?.whatItSolves && (
                        <ContentSection
                            icon={Target}
                            title="The Problem This Solves"
                            bgColor="bg-indigo-50 dark:bg-indigo-900/20"
                            borderColor="border-indigo-100 dark:border-indigo-800"
                            textColor="text-indigo-800 dark:text-indigo-200"
                        >
                            <p className="text-indigo-700 dark:text-indigo-300">{feature.fullContent.whatItSolves}</p>
                        </ContentSection>
                    )}

                    {/* Why It's Hard */}
                    {feature.fullContent?.whyItsHard && (
                        <ContentSection
                            icon={AlertTriangle}
                            title="Why This Is Hard"
                            bgColor="bg-red-50 dark:bg-red-900/20"
                            borderColor="border-red-100 dark:border-red-800"
                            textColor="text-red-800 dark:text-red-200"
                        >
                            <p className="text-red-700 dark:text-red-300">{feature.fullContent.whyItsHard}</p>

                            {feature.fullContent.theBoundaryProblem && (
                                <div className="mt-4 p-4 bg-red-100 dark:bg-red-900/30 rounded-lg">
                                    <h3 className="font-bold text-red-800 dark:text-red-300 mb-2">The Boundary Problem</h3>
                                    <p className="text-sm text-red-700 dark:text-red-400">{feature.fullContent.theBoundaryProblem}</p>
                                </div>
                            )}

                            {feature.fullContent.theTradeoff && (
                                <div className="mt-4 p-4 bg-red-100 dark:bg-red-900/30 rounded-lg">
                                    <h3 className="font-bold text-red-800 dark:text-red-300 mb-2">The Tradeoff</h3>
                                    <p className="text-sm text-red-700 dark:text-red-400">{feature.fullContent.theTradeoff}</p>
                                </div>
                            )}
                        </ContentSection>
                    )}

                    {/* Use Cases */}
                    {feature.fullContent?.useCases && (
                        <ContentSection
                            icon={Lightbulb}
                            title="Use Cases"
                            bgColor="bg-purple-50 dark:bg-purple-900/20"
                            borderColor="border-purple-100 dark:border-purple-800"
                            textColor="text-purple-800 dark:text-purple-200"
                        >
                            <ul className="space-y-3">
                                {feature.fullContent.useCases.map((useCase, i) => (
                                    <li key={i} className="flex items-start gap-3">
                                        <span className="text-purple-500 font-bold shrink-0">{i + 1}.</span>
                                        <span className="text-purple-700 dark:text-purple-300">{useCase}</span>
                                    </li>
                                ))}
                            </ul>
                        </ContentSection>
                    )}

                    {/* Key Value Props */}
                    {feature.fullContent?.keyValueProps && (
                        <ContentSection
                            icon={CheckCircle}
                            title="Key Value Propositions"
                            bgColor="bg-green-50 dark:bg-green-900/20"
                            borderColor="border-green-100 dark:border-green-800"
                            textColor="text-green-800 dark:text-green-200"
                        >
                            <ul className="space-y-3">
                                {feature.fullContent.keyValueProps.map((prop, i) => (
                                    <li key={i} className="flex items-start gap-3">
                                        <CheckCircle size={16} className="text-green-500 mt-1 shrink-0" />
                                        <span className="text-green-700 dark:text-green-300">{prop}</span>
                                    </li>
                                ))}
                            </ul>
                        </ContentSection>
                    )}

                    {/* B2B Context */}
                    {feature.fullContent?.b2bContext && (
                        <ContentSection
                            icon={Users}
                            title="B2B Context"
                            bgColor="bg-orange-50 dark:bg-orange-900/20"
                            borderColor="border-orange-100 dark:border-orange-800"
                            textColor="text-orange-800 dark:text-orange-200"
                        >
                            <p className="text-orange-700 dark:text-orange-300">{feature.fullContent.b2bContext}</p>
                        </ContentSection>
                    )}

                    {/* Other Requirements */}
                    {feature.fullContent?.otherRequirements && (
                        <ContentSection icon={Shield} iconColor="text-neutral-500" title="Other Requirements" bgColor="bg-neutral-100 dark:bg-neutral-800">
                            <ul className="space-y-2">
                                {feature.fullContent.otherRequirements.map((req, i) => (
                                    <li key={i} className="flex items-start gap-2 text-neutral-600 dark:text-neutral-400">
                                        <span className="text-neutral-400">-</span>
                                        <span>{req}</span>
                                    </li>
                                ))}
                            </ul>
                        </ContentSection>
                    )}

                    {/* Data Requirements */}
                    <ContentSection icon={Brain} iconColor="text-purple-500" title="Data Requirements">
                        <p className="text-neutral-600 dark:text-neutral-400">{feature.dataRequired}</p>
                    </ContentSection>

                    {/* Implementation Notes */}
                    <ContentSection
                        icon={Lightbulb}
                        title="Implementation Notes"
                        bgColor="bg-cyan-50 dark:bg-cyan-900/20"
                        borderColor="border-cyan-100 dark:border-cyan-800"
                        textColor="text-cyan-800 dark:text-cyan-200"
                    >
                        <p className="text-cyan-700 dark:text-cyan-300 mb-4">{feature.implementation}</p>
                        {feature.fullContent?.implementationNotes && (
                            <p className="text-cyan-700 dark:text-cyan-300">{feature.fullContent.implementationNotes}</p>
                        )}
                    </ContentSection>
                </div>

                {/* Footer Actions */}
                <div className="mt-8 pt-6 border-t border-neutral-200 dark:border-neutral-700 flex justify-between items-center">
                    <button
                        onClick={(e) => onCopyLink(feature.id, e)}
                        className={`px-4 py-2 border rounded-lg font-medium flex items-center gap-2 transition-all ${
                            linkCopied
                                ? 'border-green-500 bg-green-50 dark:bg-green-900/30 text-green-700 dark:text-green-300'
                                : 'border-neutral-300 dark:border-neutral-600 hover:bg-neutral-50 dark:hover:bg-neutral-800'
                        }`}
                    >
                        {linkCopied ? (
                            <>
                                <CheckCircle size={16} className="text-green-500" /> Copied!
                            </>
                        ) : (
                            <>
                                <Link2 size={16} /> Copy Link to This Feature
                            </>
                        )}
                    </button>
                    <button
                        onClick={onClose}
                        className="px-6 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg font-bold transition-colors"
                    >
                        Close
                    </button>
                </div>
            </div>
        </div>
    )
}

// Helper components
function PillarStat({ label, color }) {
    return (
        <div className="p-4 bg-neutral-50 dark:bg-neutral-900 rounded-lg text-center">
            <div className="text-xs uppercase font-bold text-neutral-500 mb-1">{label}</div>
            <div className="w-4 h-4 rounded-full mx-auto" style={{ background: pillarColors[color] }} />
            <div className="text-xs mt-1 capitalize">{color}</div>
        </div>
    )
}

function ContentSection({ icon: Icon, iconColor, title, bgColor = 'bg-neutral-50 dark:bg-neutral-900', borderColor = '', textColor = '', children }) {
    return (
        <section className={`p-6 rounded-xl ${bgColor} ${borderColor ? `border ${borderColor}` : ''}`}>
            <h2 className={`text-lg font-bold mb-4 flex items-center gap-2 ${textColor || ''}`}>
                <Icon size={20} className={iconColor || ''} /> {title}
            </h2>
            {children}
        </section>
    )
}

function ContentBlock({ title, text }) {
    return (
        <div>
            <h3 className="font-bold text-neutral-700 dark:text-neutral-300 mb-1">{title}</h3>
            <p className="text-neutral-600 dark:text-neutral-400">{text}</p>
        </div>
    )
}
