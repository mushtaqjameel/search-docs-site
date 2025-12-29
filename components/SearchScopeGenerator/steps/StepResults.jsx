'use client'

import { useState } from 'react'
import {
    RefreshCw, CheckCircle, Clock, Brain, Cpu, FileSearch,
    GraduationCap, AlertTriangle, DollarSign, ChevronDown, ChevronUp,
    Copy, Download, CheckCheck, Layers, Users, Target
} from 'lucide-react'
import { investmentColors } from '../../../constants/colors'
import { getRecommendationClasses, getInvestmentClasses } from '../../../constants/recommendations'

/**
 * Step 5: Results - Implementation scope output
 */
export function StepResults({ data, results, bucketInfo, onReset, onClose, generateMarkdownSummary }) {
    const [expandedPhases, setExpandedPhases] = useState({ day1: true, day30: true, day60: true, day90: true })
    const [copied, setCopied] = useState(false)

    const copyToClipboard = async () => {
        const markdown = generateMarkdownSummary()
        try {
            await navigator.clipboard.writeText(markdown)
            setCopied(true)
            setTimeout(() => setCopied(false), 2000)
        } catch (err) {
            console.error('Failed to copy:', err)
        }
    }

    const downloadMarkdown = () => {
        const markdown = generateMarkdownSummary()
        const blob = new Blob([markdown], { type: 'text/markdown' })
        const url = URL.createObjectURL(blob)
        const a = document.createElement('a')
        a.href = url
        a.download = `search-scope-${new Date().toISOString().split('T')[0]}.md`
        document.body.appendChild(a)
        a.click()
        document.body.removeChild(a)
        URL.revokeObjectURL(url)
    }

    return (
        <div className="animate-in fade-in zoom-in-95 duration-300">
            <div className="mb-8 text-center">
                <h2 className="text-3xl font-bold mb-2">Implementation Scope</h2>
                <p className="text-neutral-500">Based on your inputs, here's the recommended scope and approach.</p>
            </div>

            {/* Summary Cards */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
                <div className="p-4 border rounded-xl text-center bg-neutral-50 dark:bg-neutral-800">
                    <div className="text-xs uppercase font-bold text-neutral-500 mb-1">Data Readiness</div>
                    <div className={`text-xl font-black ${results.dataQuality === 'Rich' ? 'text-green-600' : results.dataQuality === 'Adequate' ? 'text-yellow-600' : 'text-red-600'}`}>
                        {results.dataQuality}
                    </div>
                    <div className="text-xs text-neutral-400">{results.effectiveDataScore.toFixed(1)}/10 {results.canUseAI && '(+AI)'}</div>
                </div>
                <div className="p-4 border rounded-xl text-center bg-neutral-50 dark:bg-neutral-800">
                    <div className="text-xs uppercase font-bold text-neutral-500 mb-1">Capacity</div>
                    <div className={`text-xl font-black ${results.capacityLevel === 'High' ? 'text-green-600' : results.capacityLevel === 'Medium' ? 'text-yellow-600' : 'text-red-600'}`}>
                        {results.capacityLevel}
                    </div>
                    <div className="text-xs text-neutral-400">{results.capacityScore.toFixed(1)}/10</div>
                </div>
                <div className={`p-4 border rounded-xl text-center ${results.supportTier.color === 'green' ? 'bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800' : results.supportTier.color === 'cyan' ? 'bg-cyan-50 dark:bg-cyan-900/20 border-cyan-200 dark:border-cyan-800' : results.supportTier.color === 'blue' ? 'bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-800' : 'bg-purple-50 dark:bg-purple-900/20 border-purple-200 dark:border-purple-800'}`}>
                    <div className="text-xs uppercase font-bold text-neutral-500 mb-1">Support Tier</div>
                    <div className="text-xl font-black">{results.supportTier.name}</div>
                    <div className="text-xs opacity-70">{results.supportTier.desc}</div>
                </div>
                <div className={`p-4 border rounded-xl text-center ${results.consultationTier.color === 'green' ? 'bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800' : results.consultationTier.color === 'yellow' ? 'bg-yellow-50 dark:bg-yellow-900/20 border-yellow-200 dark:border-yellow-800' : 'bg-red-50 dark:bg-red-900/20 border-red-200 dark:border-red-800'}`}>
                    <div className="text-xs uppercase font-bold text-neutral-500 mb-1">Consultation Load</div>
                    <div className="text-xl font-black">{results.consultationTier.level}</div>
                    <div className="text-xs opacity-70">{results.consultationTier.desc}</div>
                </div>
            </div>

            {/* Alerts */}
            <div className="space-y-3 mb-8">
                {results.canUseAI && (
                    <div className="p-4 rounded-lg bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800">
                        <h4 className="font-bold flex items-center gap-2 text-blue-800 dark:text-blue-300 mb-1"><Cpu size={18} /> AI Enrichment Path</h4>
                        <p className="text-sm text-blue-700 dark:text-blue-400">AI will generate missing descriptions and attributes. Include AI Enrichment Dashboard and approval workflow.</p>
                    </div>
                )}
                {data.remediationApproach === 'pay_later' && (
                    <div className="p-4 rounded-lg bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800">
                        <h4 className="font-bold flex items-center gap-2 text-yellow-800 dark:text-yellow-300 mb-1"><Clock size={18} /> Pay Later Approach</h4>
                        <p className="text-sm text-yellow-700 dark:text-yellow-400">Document data gaps and feature limitations in SOW. Set expectations for post-launch iteration.</p>
                    </div>
                )}
                {data.dataProblemAwareness === 'unknown' && (
                    <div className="p-4 rounded-lg bg-purple-50 dark:bg-purple-900/20 border border-purple-200 dark:border-purple-800">
                        <h4 className="font-bold flex items-center gap-2 text-purple-800 dark:text-purple-300 mb-1"><FileSearch size={18} /> Discovery Phase Needed</h4>
                        <p className="text-sm text-purple-700 dark:text-purple-400">Client needs data discovery exercise. Budget time for audit and gap analysis before finalizing scope.</p>
                    </div>
                )}
                {results.consultationTier.level === 'High' && (
                    <div className="p-4 rounded-lg bg-orange-50 dark:bg-orange-900/20 border border-orange-200 dark:border-orange-800">
                        <h4 className="font-bold flex items-center gap-2 text-orange-800 dark:text-orange-300 mb-1"><GraduationCap size={18} /> Training Investment Required</h4>
                        <p className="text-sm text-orange-700 dark:text-orange-400">Significant onboarding and education needed. Include training sessions and ongoing consultation hours in SOW.</p>
                    </div>
                )}
            </div>

            {/* Work Breakdown */}
            <WorkBreakdown workBreakdown={results.workBreakdown} />

            {/* Feature Phases */}
            <h3 className="font-bold text-xl mb-4">Implementation Phases</h3>

            <PhaseSection
                phase="day1"
                label="Day 1 - Launch Ready"
                features={results.byPhase.day1}
                icon={CheckCircle}
                color="#22c55e"
                isExpanded={expandedPhases.day1}
                onToggle={() => setExpandedPhases(p => ({ ...p, day1: !p.day1 }))}
                bucketInfo={bucketInfo}
            />
            <PhaseSection
                phase="day30"
                label="Day 30 - Behavioral Starts"
                features={results.byPhase.day30}
                icon={Clock}
                color="#eab308"
                isExpanded={expandedPhases.day30}
                onToggle={() => setExpandedPhases(p => ({ ...p, day30: !p.day30 }))}
                bucketInfo={bucketInfo}
            />
            <PhaseSection
                phase="day60"
                label="Day 60-90 - Advanced Features"
                features={[...results.byPhase.day60, ...results.byPhase.day90]}
                icon={Brain}
                color="#9333ff"
                isExpanded={expandedPhases.day60}
                onToggle={() => setExpandedPhases(p => ({ ...p, day60: !p.day60 }))}
                bucketInfo={bucketInfo}
            />

            {/* Share Buttons */}
            <div className="mt-8 p-4 border rounded-xl bg-neutral-50 dark:bg-neutral-900">
                <h4 className="font-bold mb-3 text-center">Share Implementation Scope</h4>
                <div className="flex justify-center gap-3">
                    <button
                        onClick={copyToClipboard}
                        className="px-4 py-2 border border-neutral-300 dark:border-neutral-600 hover:bg-neutral-100 dark:hover:bg-neutral-800 rounded-lg font-medium flex items-center gap-2 transition-colors"
                    >
                        {copied ? <CheckCheck size={18} className="text-green-500" /> : <Copy size={18} />}
                        {copied ? 'Copied!' : 'Copy as Markdown'}
                    </button>
                    <button
                        onClick={downloadMarkdown}
                        className="px-4 py-2 border border-neutral-300 dark:border-neutral-600 hover:bg-neutral-100 dark:hover:bg-neutral-800 rounded-lg font-medium flex items-center gap-2 transition-colors"
                    >
                        <Download size={18} /> Download .md
                    </button>
                </div>
            </div>

            <div className="mt-6 flex justify-center gap-4">
                <button onClick={onReset} className="px-6 py-3 border border-neutral-300 dark:border-neutral-600 hover:bg-neutral-50 dark:hover:bg-neutral-800 rounded-lg font-bold flex items-center gap-2 transition-colors">
                    <RefreshCw size={18} /> Start Over
                </button>
                <button onClick={onClose} className="px-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg font-bold flex items-center gap-2 transition-colors">
                    Done
                </button>
            </div>
        </div>
    )
}

/**
 * Work Breakdown section
 */
function WorkBreakdown({ workBreakdown }) {
    return (
        <div className="mb-8 p-6 border rounded-xl bg-neutral-50 dark:bg-neutral-900">
            <h3 className="font-bold text-xl mb-2 flex items-center gap-2">
                <Layers size={20} className="text-indigo-500" /> Work Breakdown
            </h3>
            <p className="text-sm text-neutral-500 mb-6">How the implementation work is distributed across estimation dimensions.</p>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* By Scope */}
                <div>
                    <h4 className="font-bold text-sm mb-3 flex items-center gap-2">
                        <Users size={16} /> Scope (Reusability)
                    </h4>
                    <div className="space-y-2">
                        <ProgressBar label="Universal (any client)" value={workBreakdown.scopePercent.universal} color="bg-green-500" />
                        <ProgressBar label="Industry-specific" value={workBreakdown.scopePercent.industry} color="bg-yellow-500" />
                        <ProgressBar label="Client-specific" value={workBreakdown.scopePercent.client} color="bg-pink-500" />
                    </div>
                    <p className="text-xs text-neutral-500 mt-2 italic">
                        {workBreakdown.scopePercent.universal >= 60 ? 'Mostly reusable platform work.' :
                         workBreakdown.scopePercent.client >= 30 ? 'Significant client customization.' :
                         'Mix of platform and industry work.'}
                    </p>
                </div>

                {/* By Layer */}
                <div>
                    <h4 className="font-bold text-sm mb-3 flex items-center gap-2">
                        <Layers size={16} /> Layer (Type of Work)
                    </h4>
                    <div className="space-y-2">
                        <ProgressBar label="Platform (backend, APIs)" value={workBreakdown.layerPercent.platform} color="bg-purple-500" />
                        <ProgressBar label="Integration (UI, touchpoints)" value={workBreakdown.layerPercent.integration} color="bg-cyan-500" />
                    </div>
                    <p className="text-xs text-neutral-500 mt-2 italic">
                        {workBreakdown.layerPercent.platform >= 70 ? 'Backend-heavy implementation.' :
                         workBreakdown.layerPercent.integration >= 40 ? 'Significant UI/integration work.' :
                         'Balanced platform and integration.'}
                    </p>
                </div>

                {/* By Priority */}
                <div>
                    <h4 className="font-bold text-sm mb-3 flex items-center gap-2">
                        <Target size={16} /> Priority (When)
                    </h4>
                    <div className="space-y-2">
                        <ProgressBar label="Essential (MVP)" value={workBreakdown.priorityPercent.essential} color="bg-green-500" />
                        <ProgressBar label="Enhanced (Phase 2)" value={workBreakdown.priorityPercent.enhanced} color="bg-yellow-500" />
                        <ProgressBar label="Specialized (Research)" value={workBreakdown.priorityPercent.specialized} color="bg-red-500" />
                    </div>
                    <p className="text-xs text-neutral-500 mt-2 italic">
                        {workBreakdown.priorityPercent.essential >= 60 ? 'Core MVP focus.' :
                         workBreakdown.priorityPercent.specialized >= 15 ? 'Includes research/POC work.' :
                         'Mix of MVP and enhancements.'}
                    </p>
                </div>
            </div>

            <div className="mt-4 pt-4 border-t border-neutral-200 dark:border-neutral-700 text-xs text-neutral-500">
                <strong>What this means:</strong> Universal work is build-once infrastructure. Industry-specific is reusable for similar clients. Client-specific is billable customization.
                <a href="/estimation" className="ml-2 text-indigo-600 dark:text-indigo-400 hover:underline">Learn more</a>
            </div>
        </div>
    )
}

/**
 * Progress bar component
 */
function ProgressBar({ label, value, color }) {
    return (
        <div>
            <div className="flex justify-between text-xs mb-1">
                <span>{label}</span>
                <span className="font-bold">{value}%</span>
            </div>
            <div className="h-3 bg-neutral-200 dark:bg-neutral-700 rounded-full overflow-hidden">
                <div className={`h-full ${color} rounded-full transition-all`} style={{ width: `${value}%` }} />
            </div>
        </div>
    )
}

/**
 * Phase section with expandable feature list
 */
function PhaseSection({ phase, label, features, icon: Icon, color, isExpanded, onToggle, bucketInfo }) {
    const includedCount = features.filter(f => f.recommendation !== 'exclude').length

    return (
        <div className="mb-4">
            <button
                onClick={onToggle}
                className="w-full flex items-center justify-between p-3 rounded-lg bg-neutral-100 dark:bg-neutral-800 hover:bg-neutral-200 dark:hover:bg-neutral-700 transition-colors"
            >
                <div className="flex items-center gap-3">
                    <Icon size={20} style={{ color }} />
                    <span className="font-bold">{label}</span>
                    <span className="text-sm text-neutral-500">{includedCount} features</span>
                </div>
                {isExpanded ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
            </button>
            {isExpanded && (
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-3 mt-3">
                    {features.map(f => <ResultFeatureCard key={f.id} feature={f} bucketInfo={bucketInfo} />)}
                </div>
            )}
        </div>
    )
}

/**
 * Feature card for results
 */
function ResultFeatureCard({ feature, bucketInfo }) {
    const BucketIcon = bucketInfo[feature.bucket]?.icon

    return (
        <div className={`p-4 rounded-lg border ${getRecommendationClasses(feature.recommendation)}`}>
            <div className="flex justify-between items-start mb-2">
                <div className="flex items-center gap-2">
                    {BucketIcon && <BucketIcon size={16} style={{ color: bucketInfo[feature.bucket]?.color }} />}
                    <span className="font-bold text-sm">{feature.title}</span>
                    {feature.priorityMatch && <span className="text-xs bg-indigo-100 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400 px-1.5 py-0.5 rounded">Priority</span>}
                </div>
                <span className={`text-xs font-bold px-2 py-0.5 rounded ${getInvestmentClasses(feature.investment)}`}>
                    {feature.investment}
                </span>
            </div>
            <p className="text-xs text-neutral-600 dark:text-neutral-400 mb-2">{feature.desc}</p>
            {feature.reason && (
                <p className="text-xs text-orange-600 dark:text-orange-400 flex items-center gap-1">
                    <AlertTriangle size={12} /> {feature.reason}
                </p>
            )}
            {feature.needsAI && (
                <p className="text-xs text-blue-600 dark:text-blue-400 flex items-center gap-1 mt-1">
                    <Cpu size={12} /> AI Enrichment recommended
                </p>
            )}
            {feature.payNowPayLater && (
                <p className={`text-xs flex items-center gap-1 mt-1 ${feature.payNowPayLater === 'pay_now' ? 'text-green-600 dark:text-green-400' : 'text-yellow-600 dark:text-yellow-400'}`}>
                    <DollarSign size={12} /> {feature.payNowPayLater === 'pay_now' ? 'Fix data before launch' : 'Document risk, iterate later'}
                </p>
            )}
            {feature.consultationNote && (
                <p className="text-xs text-purple-600 dark:text-purple-400 flex items-center gap-1 mt-1">
                    <GraduationCap size={12} /> {feature.consultationNote}
                </p>
            )}
        </div>
    )
}
