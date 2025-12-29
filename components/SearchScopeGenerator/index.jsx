'use client'

import React, { useState, useMemo } from 'react'
import { X } from 'lucide-react'

// Data imports
import featuresData from '../../data/features.json'
import bucketsData from '../../data/buckets.json'
import dataRequiredMapData from '../../data/dataRequiredMap.json'

// Constants
import { bucketIcons } from '../../constants/bucketIcons'

// Scoring utilities
import { calculateScoringResults } from '../../utils/scoring'

// Step components
import {
    StepIntro,
    StepClientProfile,
    StepDataReadiness,
    StepRemediation,
    StepClientCapacity,
    StepResults
} from './steps'

// Extract the mappings from the JSON file
const dataRequiredMap = dataRequiredMapData.mappings

// Transform features from JSON to the format needed for scoring
const FEATURES = featuresData.features.map(f => ({
    id: f.id,
    title: f.title,
    bucket: f.bucket,
    pillars: f.pillars,
    phase: f.phase,
    typicalInvestment: f.typicalInvestment || f.badge,
    dataRequired: dataRequiredMap[f.dataRequired] || 'catalog',
    importance: f.importance,
    desc: f.desc,
    layer: f.layer,
    scope: f.scope,
    priority: f.priority,
    aiEnrichable: f.aiEnrichable
}))

// Build bucket info with icons
const BUCKET_INFO = Object.fromEntries(
    Object.entries(bucketsData.buckets).map(([key, bucket]) => [
        key,
        { icon: bucketIcons[key], label: bucket.label, color: bucket.color }
    ])
)

const TOTAL_STEPS = 5

const INITIAL_DATA = {
    // Step 1: Client Profile
    industry: null,
    timeline: null,
    priorities: [],

    // Step 2: Data Readiness (consolidated)
    catalogBasic: null,
    descriptionsQuality: null,
    attributesExist: null,
    attributesQuality: null,
    facetsReady: null,
    relationshipsExist: null,
    behavioralData: null,
    transactionalData: null,
    userData: null,

    // Step 3: Discovery & Remediation
    dataProblemAwareness: null,
    remediationApproach: null,
    aiApprovalCapacity: null,

    // Step 4: Client Capacity (granular)
    teamOwnership: null,
    teamRole: null,
    opsAnalytics: null,
    opsFeedback: null,
    opsQueryTuning: null,
    opsABTesting: null,
    opsContentUpdates: null,
    pastExperience: null,
    searchConceptComfort: null,
    wantsOngoingConsultation: null,
}

/**
 * Search Scope Generator - Main Component
 *
 * A guided wizard for generating implementation scope based on:
 * - Client profile (industry, timeline, pain points)
 * - Data readiness assessment
 * - Remediation approach (Pay Now / Pay Later / AI)
 * - Client operational capacity
 */
export default function SearchScopeGenerator() {
    const [launched, setLaunched] = useState(false)
    const [step, setStep] = useState(1)
    const [data, setData] = useState(INITIAL_DATA)

    // Data update helpers
    const updateData = (key, value) => {
        setData(prev => ({ ...prev, [key]: value }))
    }

    const togglePriority = (priority) => {
        setData(prev => ({
            ...prev,
            priorities: prev.priorities.includes(priority)
                ? prev.priorities.filter(p => p !== priority)
                : [...prev.priorities, priority]
        }))
    }

    // Calculate scores and results using scoring utilities
    const results = useMemo(() => {
        return calculateScoringResults(data, FEATURES)
    }, [data])

    // Reset wizard
    const reset = () => {
        setStep(1)
        setData(INITIAL_DATA)
    }

    // Generate markdown summary for sharing
    const generateMarkdownSummary = () => {
        const featuresByRec = (features, rec) => features.filter(f => f.recommendation === rec)

        let md = `# Search Implementation Scope\n\n`
        md += `Generated: ${new Date().toLocaleDateString()}\n\n`

        // Summary
        md += `## Summary\n\n`
        md += `| Metric | Value |\n|--------|-------|\n`
        md += `| Data Readiness | ${results.dataQuality} (${results.effectiveDataScore.toFixed(1)}/10)${results.canUseAI ? ' +AI' : ''} |\n`
        md += `| Capacity | ${results.capacityLevel} (${results.capacityScore.toFixed(1)}/10) |\n`
        md += `| Support Tier | ${results.supportTier.name} |\n`
        md += `| Consultation Load | ${results.consultationTier.level} |\n\n`

        // Client Profile
        md += `## Client Profile\n\n`
        md += `- **Industry:** ${data.industry || 'Not specified'}\n`
        md += `- **Timeline:** ${data.timeline || 'Not specified'}\n`
        md += `- **Pain Points:** ${data.priorities.length > 0 ? data.priorities.join(', ') : 'None selected'}\n\n`

        // Remediation Approach
        if (data.remediationApproach) {
            md += `## Remediation Approach\n\n`
            if (data.remediationApproach === 'pay_now') md += `**Pay Now:** Fix data before launch\n\n`
            else if (data.remediationApproach === 'pay_later') md += `**Pay Later:** Launch with gaps, iterate post-launch\n\n`
            else if (data.remediationApproach === 'ai') md += `**AI Enrichment:** Generate missing content with AI (${data.aiApprovalCapacity || 'approval TBD'})\n\n`
        }

        // Alerts/Notes
        const alerts = []
        if (results.canUseAI) alerts.push('AI Enrichment Path - Include AI Enrichment Dashboard and approval workflow')
        if (data.remediationApproach === 'pay_later') alerts.push('Pay Later - Document data gaps and feature limitations in SOW')
        if (data.dataProblemAwareness === 'unknown') alerts.push('Discovery Phase Needed - Budget time for data audit and gap analysis')
        if (results.consultationTier.level === 'High') alerts.push('Training Investment Required - Include training sessions and consultation hours')

        if (alerts.length > 0) {
            md += `## Notes & Alerts\n\n`
            alerts.forEach(a => { md += `- ${a}\n` })
            md += `\n`
        }

        // Features by Phase
        const formatFeature = (f) => {
            let line = `- **${f.title}** [${f.investment}]`
            if (f.reason) line += ` - ${f.reason}`
            if (f.needsAI) line += ` (AI Enrichment)`
            if (f.payNowPayLater === 'pay_later') line += ` (Pay Later)`
            if (f.consultationNote) line += ` *${f.consultationNote}*`
            return line
        }

        md += `## Implementation Phases\n\n`

        // Day 1
        md += `### Day 1 - Launch Ready\n\n`
        const day1Include = featuresByRec(results.byPhase.day1, 'include')
        const day1Limited = featuresByRec(results.byPhase.day1, 'limited')
        const day1Caution = featuresByRec(results.byPhase.day1, 'caution')

        if (day1Include.length > 0) {
            md += `**Include:**\n`
            day1Include.forEach(f => { md += formatFeature(f) + '\n' })
        }
        if (day1Limited.length > 0) {
            md += `\n**Limited (data gaps):**\n`
            day1Limited.forEach(f => { md += formatFeature(f) + '\n' })
        }
        if (day1Caution.length > 0) {
            md += `\n**Caution (needs safeguards):**\n`
            day1Caution.forEach(f => { md += formatFeature(f) + '\n' })
        }
        md += `\n`

        // Day 30
        md += `### Day 30 - Behavioral Starts\n\n`
        const day30All = results.byPhase.day30
        if (day30All.length > 0) {
            day30All.forEach(f => { md += formatFeature(f) + '\n' })
        }
        md += `\n`

        // Day 60-90
        md += `### Day 60-90 - Advanced Features\n\n`
        const day60All = [...results.byPhase.day60, ...results.byPhase.day90]
        if (day60All.length > 0) {
            day60All.forEach(f => { md += formatFeature(f) + '\n' })
        }
        md += `\n`

        md += `---\n*Generated with Search Scope Generator*\n`

        return md
    }

    // Intro screen before launching
    if (!launched) {
        return <StepIntro onLaunch={() => setLaunched(true)} />
    }

    return (
        <div className="fixed inset-0 z-50 bg-white dark:bg-neutral-950 overflow-auto">
            {/* Header */}
            <div className="sticky top-0 z-10 bg-white dark:bg-neutral-950 border-b border-neutral-200 dark:border-neutral-800 px-6 py-4">
                <div className="max-w-6xl mx-auto flex items-center justify-between">
                    <div>
                        <h1 className="text-2xl font-bold">Search Scope Generator</h1>
                        <p className="text-sm text-neutral-500">Step {step} of {TOTAL_STEPS}</p>
                    </div>
                    <div className="flex items-center gap-4">
                        <div className="flex gap-1">
                            {[1, 2, 3, 4, 5].map(s => (
                                <div
                                    key={s}
                                    className={`h-2 w-12 rounded-full transition-all ${s < step ? 'bg-green-500' : s === step ? 'bg-indigo-500' : 'bg-neutral-200 dark:bg-neutral-700'}`}
                                />
                            ))}
                        </div>
                        <button onClick={() => setLaunched(false)} className="p-2 hover:bg-neutral-100 dark:hover:bg-neutral-800 rounded-lg transition-colors">
                            <X size={20} />
                        </button>
                    </div>
                </div>
            </div>

            {/* Content */}
            <div className="max-w-6xl mx-auto px-6 py-8">
                {step === 1 && (
                    <StepClientProfile
                        data={data}
                        updateData={updateData}
                        togglePriority={togglePriority}
                        onNext={() => setStep(2)}
                    />
                )}

                {step === 2 && (
                    <StepDataReadiness
                        data={data}
                        updateData={updateData}
                        onBack={() => setStep(1)}
                        onNext={() => setStep(3)}
                    />
                )}

                {step === 3 && (
                    <StepRemediation
                        data={data}
                        updateData={updateData}
                        onBack={() => setStep(2)}
                        onNext={() => setStep(4)}
                    />
                )}

                {step === 4 && (
                    <StepClientCapacity
                        data={data}
                        updateData={updateData}
                        onBack={() => setStep(3)}
                        onNext={() => setStep(5)}
                    />
                )}

                {step === 5 && (
                    <StepResults
                        data={data}
                        results={results}
                        bucketInfo={BUCKET_INFO}
                        onReset={reset}
                        onClose={() => { reset(); setLaunched(false); }}
                        generateMarkdownSummary={generateMarkdownSummary}
                    />
                )}
            </div>
        </div>
    )
}
