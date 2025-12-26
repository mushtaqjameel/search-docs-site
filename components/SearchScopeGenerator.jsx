'use client'

import React, { useState, useMemo } from 'react'
import {
    ArrowRight, ArrowLeft, RefreshCw, Check,
    Briefcase, Database, Users, Target, Zap,
    AlertTriangle, CheckCircle, Clock, Cpu,
    Calendar, ChevronDown, ChevronUp,
    Brain, Lightbulb, Shield, BarChart, Search,
    HelpCircle, BookOpen, Wrench, GraduationCap,
    DollarSign, MessageSquare, FlaskConical, Settings,
    FileSearch, Layers, X
} from 'lucide-react'

// Complete feature data from the site content
const FEATURES = [
    // Core Search (7)
    { id: 'autocomplete', title: 'Auto Complete', bucket: 'core', pillars: { data: 'green', gov: 'green', safe: 'green' }, phase: 'day1', typicalInvestment: 'STANDARD', dataRequired: 'catalog', importance: 'critical', desc: 'Predictive suggestions as buyers type' },
    { id: 'faceted', title: 'Faceted Search', bucket: 'core', pillars: { data: 'yellow', gov: 'yellow', safe: 'yellow' }, phase: 'day1', typicalInvestment: 'STANDARD', dataRequired: 'facets', importance: 'critical', desc: 'Dynamic filters based on product attributes' },
    { id: 'visual', title: 'Visual Filters', bucket: 'core', pillars: { data: 'yellow', gov: 'yellow', safe: 'yellow' }, phase: 'day30', typicalInvestment: 'POLISHED', dataRequired: 'catalog_rich', importance: 'nice', desc: 'Image-based filter selection' },
    { id: 'partnumber', title: 'Part Number Normalization', bucket: 'core', pillars: { data: 'green', gov: 'green', safe: 'green' }, phase: 'day1', typicalInvestment: 'STANDARD', dataRequired: 'catalog', importance: 'critical', desc: 'Handles part number format variations' },
    { id: 'voice', title: 'Voice Search', bucket: 'core', pillars: { data: 'green', gov: 'green', safe: 'green' }, phase: 'day1', typicalInvestment: 'MVP', dataRequired: 'catalog', importance: 'nice', desc: 'Voice input for hands-free scenarios' },
    { id: 'universal', title: 'Universal Search', bucket: 'core', pillars: { data: 'yellow', gov: 'yellow', safe: 'yellow' }, phase: 'day30', typicalInvestment: 'POLISHED', dataRequired: 'content', importance: 'important', desc: 'Search across products, docs, articles' },
    { id: 'certifications', title: 'Searchable Certifications', bucket: 'core', pillars: { data: 'yellow', gov: 'yellow', safe: 'green' }, phase: 'day1', typicalInvestment: 'STANDARD', dataRequired: 'facets', importance: 'important', desc: 'Filter by technical certifications' },

    // Smart Search (6)
    { id: 'semantic', title: 'Semantic Search', bucket: 'smart', pillars: { data: 'yellow', gov: 'yellow', safe: 'yellow' }, phase: 'day60', typicalInvestment: 'POLISHED', dataRequired: 'descriptions', importance: 'important', desc: 'Understand meaning, not just keywords', aiEnrichable: true },
    { id: 'synonyms', title: 'Intelligent Synonyms', bucket: 'smart', pillars: { data: 'yellow', gov: 'red', safe: 'yellow' }, phase: 'day60', typicalInvestment: 'POLISHED', dataRequired: 'behavioral', importance: 'important', desc: 'Learn industry-specific terminology' },
    { id: 'intelligentauto', title: 'Intelligent Auto Complete', bucket: 'smart', pillars: { data: 'yellow', gov: 'red', safe: 'yellow' }, phase: 'day60', typicalInvestment: 'POLISHED', dataRequired: 'behavioral_user', importance: 'nice', desc: 'Context-aware personalized suggestions' },
    { id: 'mlranking', title: 'ML Ranking', bucket: 'smart', pillars: { data: 'red', gov: 'red', safe: 'red' }, phase: 'day90', typicalInvestment: 'PREMIUM', dataRequired: 'behavioral_trans', importance: 'important', desc: 'Machine learning optimizes ranking' },
    { id: 'relevancefunnel', title: 'Multi-Layered Relevance', bucket: 'smart', pillars: { data: 'red', gov: 'red', safe: 'red' }, phase: 'day90', typicalInvestment: 'PREMIUM', dataRequired: 'all', importance: 'nice', desc: 'Complex ranking with business rules' },
    { id: 'intentrouter', title: 'Semantic Intent Router', bucket: 'smart', pillars: { data: 'yellow', gov: 'yellow', safe: 'yellow' }, phase: 'day30', typicalInvestment: 'POLISHED', dataRequired: 'behavioral', importance: 'nice', desc: 'Detect what buyer actually wants' },

    // Discovery (7)
    { id: 'recommendations', title: 'Recommendation Engine', bucket: 'discovery', pillars: { data: 'red', gov: 'red', safe: 'yellow' }, phase: 'day60', typicalInvestment: 'POLISHED', dataRequired: 'behavioral_trans_user', importance: 'critical', desc: 'Personalized product suggestions' },
    { id: 'related', title: 'Related Searches', bucket: 'discovery', pillars: { data: 'yellow', gov: 'yellow', safe: 'green' }, phase: 'day30', typicalInvestment: 'STANDARD', dataRequired: 'behavioral', importance: 'important', desc: 'Suggest alternative query paths' },
    { id: 'equivalents', title: 'Cross-Brand Equivalents', bucket: 'discovery', pillars: { data: 'yellow', gov: 'yellow', safe: 'yellow' }, phase: 'day1', typicalInvestment: 'POLISHED', dataRequired: 'relationships', importance: 'important', desc: 'Show alternative brands/substitutes' },
    { id: 'trending', title: 'Trending Search', bucket: 'discovery', pillars: { data: 'yellow', gov: 'green', safe: 'green' }, phase: 'day30', typicalInvestment: 'STANDARD', dataRequired: 'behavioral', importance: 'nice', desc: 'Show what\'s popular now' },
    { id: 'kitting', title: 'Custom Products (Kitting)', bucket: 'discovery', pillars: { data: 'yellow', gov: 'yellow', safe: 'yellow' }, phase: 'day30', typicalInvestment: 'POLISHED', dataRequired: 'relationships', importance: 'nice', desc: 'Build bundles and assemblies' },
    { id: 'recent', title: 'Recent Search', bucket: 'discovery', pillars: { data: 'green', gov: 'green', safe: 'green' }, phase: 'day1', typicalInvestment: 'STANDARD', dataRequired: 'user', importance: 'critical', desc: 'Show user\'s recent searches' },
    { id: 'recentlyordered', title: 'Recently Ordered', bucket: 'discovery', pillars: { data: 'yellow', gov: 'green', safe: 'green' }, phase: 'day1', typicalInvestment: 'POLISHED', dataRequired: 'user_trans', importance: 'critical', desc: 'One-click reorder from history' },

    // Merchandising (6)
    { id: 'curations', title: 'Curations', bucket: 'merchandising', pillars: { data: 'green', gov: 'yellow', safe: 'yellow' }, phase: 'day1', typicalInvestment: 'POLISHED', dataRequired: 'catalog', importance: 'critical', desc: 'Pin, boost, bury, redirect results' },
    { id: 'config', title: 'Configuration Management', bucket: 'merchandising', pillars: { data: 'green', gov: 'yellow', safe: 'green' }, phase: 'day1', typicalInvestment: 'STANDARD', dataRequired: 'none', importance: 'critical', desc: 'Version control for search settings' },
    { id: 'querylabeller', title: 'Query Behaviour Labeller', bucket: 'merchandising', pillars: { data: 'yellow', gov: 'yellow', safe: 'green' }, phase: 'day30', typicalInvestment: 'STANDARD', dataRequired: 'behavioral', importance: 'nice', desc: 'Classify search patterns' },
    { id: 'sandbox', title: 'Search Sandbox', bucket: 'merchandising', pillars: { data: 'green', gov: 'green', safe: 'green' }, phase: 'day1', typicalInvestment: 'STANDARD', dataRequired: 'none', importance: 'critical', desc: 'Test changes safely before deploy' },
    { id: 'dashboard', title: 'Search Dashboard', bucket: 'merchandising', pillars: { data: 'yellow', gov: 'green', safe: 'green' }, phase: 'day1', typicalInvestment: 'STANDARD', dataRequired: 'behavioral', importance: 'critical', desc: 'Real-time performance visibility' },
    { id: 'aienrichment', title: 'AI Enrichment Dashboard', bucket: 'merchandising', pillars: { data: 'green', gov: 'yellow', safe: 'green' }, phase: 'day1', typicalInvestment: 'POLISHED', dataRequired: 'ai_content', importance: 'important', desc: 'Review and approve AI content' },

    // Recovery (2)
    { id: 'zeroresults', title: 'Zero Results Recovery', bucket: 'recovery', pillars: { data: 'yellow', gov: 'yellow', safe: 'green' }, phase: 'day1', typicalInvestment: 'STANDARD', dataRequired: 'catalog', importance: 'critical', desc: 'Never dead-end the buyer' },
    { id: 'fallback', title: 'Fallback Search', bucket: 'recovery', pillars: { data: 'yellow', gov: 'green', safe: 'green' }, phase: 'day1', typicalInvestment: 'STANDARD', dataRequired: 'catalog', importance: 'important', desc: 'Graceful degradation when search fails' },

    // Analytics (2)
    { id: 'analytics', title: 'Analytics', bucket: 'analytics', pillars: { data: 'yellow', gov: 'yellow', safe: 'green' }, phase: 'day1', typicalInvestment: 'POLISHED', dataRequired: 'behavioral', importance: 'critical', desc: 'Deep search performance metrics' },
    { id: 'abtesting', title: 'A/B Testing', bucket: 'analytics', pillars: { data: 'yellow', gov: 'yellow', safe: 'yellow' }, phase: 'day60', typicalInvestment: 'POLISHED', dataRequired: 'behavioral', importance: 'nice', desc: 'Controlled experiments for changes' },
]

const BUCKET_INFO = {
    core: { icon: Search, label: 'Core Search', color: '#00cccc' },
    smart: { icon: Brain, label: 'Smart Search', color: '#9933ff' },
    discovery: { icon: Lightbulb, label: 'Discovery', color: '#ff9900' },
    merchandising: { icon: Target, label: 'Merchandising', color: '#ff3333' },
    recovery: { icon: Shield, label: 'Recovery', color: '#00cc66' },
    analytics: { icon: BarChart, label: 'Analytics', color: '#0066ff' },
}

const INVESTMENT_COLORS = {
    MVP: 'bg-neutral-200 text-neutral-700 dark:bg-neutral-700 dark:text-neutral-300',
    STANDARD: 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300',
    POLISHED: 'bg-cyan-100 text-cyan-700 dark:bg-cyan-900/30 dark:text-cyan-300',
    PREMIUM: 'bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-300',
}

export default function SearchScopeGenerator() {
    const [step, setStep] = useState(1)
    const [data, setData] = useState({
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
    })

    const [expandedPhases, setExpandedPhases] = useState({ day1: true, day30: true, day60: true, day90: true })

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

    // Calculate scores and results
    const results = useMemo(() => {
        // Data Quality Score (0-10) - now considers QUALITY not just existence
        let dataScore = 0

        if (data.catalogBasic === 'yes') dataScore += 1

        // Descriptions - quality matters
        if (data.descriptionsQuality === 'rich') dataScore += 2
        else if (data.descriptionsQuality === 'basic') dataScore += 1
        else if (data.descriptionsQuality === 'sparse') dataScore += 0

        // Attributes - existence AND quality both matter
        if (data.attributesExist === 'yes') {
            if (data.attributesQuality === 'search_ready') dataScore += 2
            else if (data.attributesQuality === 'mixed') dataScore += 1
            else dataScore += 0.5 // exists but garbage
        }

        // Facets ready for filtering
        if (data.facetsReady === 'yes') dataScore += 1.5
        else if (data.facetsReady === 'partial') dataScore += 0.75

        // Relationships
        if (data.relationshipsExist === 'yes') dataScore += 1
        else if (data.relationshipsExist === 'partial') dataScore += 0.5

        // Behavioral
        if (data.behavioralData === 'comprehensive') dataScore += 1
        else if (data.behavioralData === 'some') dataScore += 0.5

        // Transactional & User
        if (data.transactionalData === 'yes') dataScore += 0.5
        if (data.userData === 'yes') dataScore += 0.5

        // AI Enrichment potential boost
        const canUseAI = data.remediationApproach === 'ai' &&
            (data.aiApprovalCapacity === 'internal' || data.aiApprovalCapacity === 'assisted')
        const aiBoost = canUseAI ? 2 : 0

        const effectiveDataScore = Math.min(10, dataScore + aiBoost)

        // Consultation Load Score (0-10) - higher = more consultation needed
        let consultationLoad = 0

        // Data problem awareness
        if (data.dataProblemAwareness === 'unknown') consultationLoad += 3
        else if (data.dataProblemAwareness === 'some_idea') consultationLoad += 1.5

        // Past experience
        if (data.pastExperience === 'none') consultationLoad += 2
        else if (data.pastExperience === 'some') consultationLoad += 1

        // Search concept comfort
        if (data.searchConceptComfort === 'need_training') consultationLoad += 2
        else if (data.searchConceptComfort === 'need_basics') consultationLoad += 1

        // Wants ongoing consultation
        if (data.wantsOngoingConsultation === 'yes') consultationLoad += 1.5
        else if (data.wantsOngoingConsultation === 'maybe') consultationLoad += 0.5

        // Pay Later adds consultation (documenting risks, managing expectations)
        if (data.remediationApproach === 'pay_later') consultationLoad += 1

        // Capacity Score (0-10) - operational readiness
        let capacityScore = 0

        // Team ownership
        if (data.teamOwnership === 'dedicated') capacityScore += 2
        else if (data.teamOwnership === 'shared') capacityScore += 1

        // Role capability
        if (data.teamRole === 'developer') capacityScore += 1.5
        else if (data.teamRole === 'merchandiser') capacityScore += 1
        else if (data.teamRole === 'product_manager') capacityScore += 0.75

        // Operational activities
        if (data.opsAnalytics === 'weekly') capacityScore += 1
        else if (data.opsAnalytics === 'monthly') capacityScore += 0.5

        if (data.opsFeedback === 'active') capacityScore += 1
        else if (data.opsFeedback === 'adhoc') capacityScore += 0.5

        if (data.opsQueryTuning === 'regular') capacityScore += 1
        else if (data.opsQueryTuning === 'occasional') capacityScore += 0.5

        if (data.opsABTesting === 'yes') capacityScore += 1
        else if (data.opsABTesting === 'interested') capacityScore += 0.25

        if (data.opsContentUpdates === 'quickly') capacityScore += 1
        else if (data.opsContentUpdates === 'eventually') capacityScore += 0.5

        // Support Tier based on capacity
        let supportTier
        if (capacityScore < 3) supportTier = { tier: 4, name: 'Managed Service', desc: 'We operate search for them', color: 'purple' }
        else if (capacityScore < 5) supportTier = { tier: 3, name: 'Partnership', desc: 'Monthly check-ins, we assist', color: 'blue' }
        else if (capacityScore < 7) supportTier = { tier: 2, name: 'Guided', desc: 'Training + documentation', color: 'cyan' }
        else supportTier = { tier: 1, name: 'Self-Service', desc: 'Standard support', color: 'green' }

        // Consultation tier
        let consultationTier
        if (consultationLoad >= 6) consultationTier = { level: 'High', desc: 'Significant discovery & training needed', color: 'red' }
        else if (consultationLoad >= 3) consultationTier = { level: 'Medium', desc: 'Some training and guidance needed', color: 'yellow' }
        else consultationTier = { level: 'Low', desc: 'Client is self-sufficient', color: 'green' }

        // Data availability mapping
        const dataAvailable = {
            catalog: data.catalogBasic === 'yes',
            descriptions: data.descriptionsQuality === 'rich' || data.descriptionsQuality === 'basic',
            catalog_rich: data.descriptionsQuality === 'rich' && data.attributesQuality === 'search_ready',
            facets: data.facetsReady === 'yes' || data.facetsReady === 'partial',
            behavioral: data.behavioralData !== 'none',
            behavioral_user: data.behavioralData !== 'none' && data.userData === 'yes',
            behavioral_trans: data.behavioralData !== 'none' && data.transactionalData === 'yes',
            behavioral_trans_user: data.behavioralData !== 'none' && data.transactionalData === 'yes' && data.userData === 'yes',
            user: data.userData === 'yes',
            user_trans: data.userData === 'yes' && data.transactionalData === 'yes',
            relationships: data.relationshipsExist === 'yes' || data.relationshipsExist === 'partial',
            content: data.catalogBasic === 'yes',
            none: true,
            all: effectiveDataScore >= 8,
            ai_content: canUseAI,
        }

        // Feature scoring
        const scoredFeatures = FEATURES.map(feature => {
            const dataAvailableForFeature = dataAvailable[feature.dataRequired] ||
                (canUseAI && feature.aiEnrichable && !dataAvailable[feature.dataRequired])

            const redPillars = Object.values(feature.pillars).filter(p => p === 'red').length
            const yellowPillars = Object.values(feature.pillars).filter(p => p === 'yellow').length
            const riskLevel = redPillars >= 2 ? 'high' : redPillars === 1 || yellowPillars >= 2 ? 'medium' : 'low'

            const priorityMatch = data.priorities.some(p => {
                if (p === 'findability' && feature.bucket === 'core') return true
                if (p === 'understanding' && feature.bucket === 'smart') return true
                if (p === 'crosssell' && feature.bucket === 'discovery') return true
                if (p === 'reordering' && ['recent', 'recentlyordered'].includes(feature.id)) return true
                if (p === 'control' && feature.bucket === 'merchandising') return true
                if (p === 'visibility' && feature.bucket === 'analytics') return true
                if (p === 'deadends' && feature.bucket === 'recovery') return true
                return false
            })

            let investment = feature.typicalInvestment

            if (effectiveDataScore < 4 && investment === 'PREMIUM') investment = 'POLISHED'
            if (effectiveDataScore < 5 && investment === 'POLISHED' && feature.pillars.data === 'red') investment = 'STANDARD'
            if (capacityScore < 4 && investment === 'STANDARD') investment = 'POLISHED'
            if (capacityScore < 3 && investment === 'MVP') investment = 'STANDARD'
            if (feature.importance === 'critical' && investment === 'MVP') investment = 'STANDARD'
            if (feature.importance === 'nice' && !priorityMatch && investment === 'POLISHED') investment = 'STANDARD'

            let recommendation = 'include'
            let reason = ''
            let consultationNote = ''

            if (!dataAvailableForFeature) {
                if (feature.phase === 'day1') {
                    recommendation = 'limited'
                    reason = 'Data gap - will be limited at launch'
                    if (data.remediationApproach === 'pay_later') {
                        consultationNote = 'Document risk in SOW'
                    }
                } else {
                    recommendation = 'phase'
                    reason = 'Waiting for data to accumulate'
                }
            }

            if (riskLevel === 'high' && capacityScore < 5) {
                if (recommendation === 'include') {
                    recommendation = 'caution'
                    reason = 'High risk + limited capacity'
                    consultationNote = 'Needs managed support or training'
                }
            }

            if (data.timeline === 'tight' && feature.phase !== 'day1') {
                if (feature.importance !== 'critical') {
                    recommendation = 'phase'
                    reason = 'Timeline pressure - defer to post-launch'
                }
            }

            // Add consultation notes for specific features
            if (feature.id === 'synonyms' && data.pastExperience !== 'yes') {
                consultationNote = 'Will need synonym management training'
            }
            if (feature.id === 'curations' && data.teamRole === 'developer') {
                consultationNote = 'Merchandiser training recommended'
            }
            if (feature.id === 'analytics' && data.opsAnalytics === 'rarely') {
                consultationNote = 'Analytics onboarding needed'
            }

            return {
                ...feature,
                dataAvailable: dataAvailableForFeature,
                riskLevel,
                priorityMatch,
                investment,
                recommendation,
                reason,
                consultationNote,
                needsAI: canUseAI && feature.aiEnrichable && !dataAvailable[feature.dataRequired],
                payNowPayLater: !dataAvailableForFeature && data.remediationApproach === 'pay_later' ? 'pay_later' :
                    !dataAvailableForFeature && data.remediationApproach === 'pay_now' ? 'pay_now' : null,
            }
        })

        const byPhase = {
            day1: scoredFeatures.filter(f => f.phase === 'day1'),
            day30: scoredFeatures.filter(f => f.phase === 'day30'),
            day60: scoredFeatures.filter(f => f.phase === 'day60'),
            day90: scoredFeatures.filter(f => f.phase === 'day90'),
        }

        return {
            dataScore,
            effectiveDataScore,
            capacityScore,
            consultationLoad,
            supportTier,
            consultationTier,
            canUseAI,
            byPhase,
            dataQuality: effectiveDataScore >= 7 ? 'Rich' : effectiveDataScore >= 4 ? 'Adequate' : 'Gaps',
            capacityLevel: capacityScore >= 7 ? 'High' : capacityScore >= 4 ? 'Medium' : 'Low',
        }
    }, [data])

    const reset = () => {
        setStep(1)
        setData({
            industry: null, timeline: null, priorities: [],
            catalogBasic: null, descriptionsQuality: null, attributesExist: null, attributesQuality: null,
            facetsReady: null, relationshipsExist: null, behavioralData: null, transactionalData: null, userData: null,
            dataProblemAwareness: null, remediationApproach: null, aiApprovalCapacity: null,
            teamOwnership: null, teamRole: null, opsAnalytics: null, opsFeedback: null, opsQueryTuning: null,
            opsABTesting: null, opsContentUpdates: null, pastExperience: null, searchConceptComfort: null, wantsOngoingConsultation: null,
        })
    }

    const OptionBtn = ({ label, sub, active, onClick, icon, small = false }) => (
        <button
            onClick={onClick}
            className={`${small ? 'p-3' : 'p-4'} text-left border-2 rounded-lg transition-all w-full ${active ? 'border-indigo-500 bg-indigo-50 dark:bg-indigo-900/20' : 'border-neutral-200 dark:border-neutral-700 hover:border-indigo-300'}`}
        >
            <div className={`font-bold ${small ? 'text-sm' : ''} mb-1 flex items-center gap-2 ${active ? 'text-indigo-600 dark:text-indigo-400' : ''}`}>
                {icon && <span className="shrink-0">{icon}</span>}
                {label}
            </div>
            {sub && <div className={`${small ? 'text-xs' : 'text-sm'} opacity-70`}>{sub}</div>}
        </button>
    )

    const PriorityChip = ({ label, id, active }) => (
        <button
            onClick={() => togglePriority(id)}
            className={`px-4 py-2 rounded-full border-2 text-sm font-medium transition-all ${active ? 'border-indigo-500 bg-indigo-500 text-white' : 'border-neutral-300 dark:border-neutral-600 hover:border-indigo-400'}`}
        >
            {active && <Check size={14} className="inline mr-1" />}
            {label}
        </button>
    )

    const NavButtons = ({ onBack, onNext, nextLabel = 'Continue', nextDisabled = false }) => (
        <div className="mt-8 flex justify-between">
            {onBack ? (
                <button onClick={onBack} className="px-6 py-2 border border-neutral-300 dark:border-neutral-600 hover:bg-neutral-50 dark:hover:bg-neutral-800 rounded-lg font-bold flex items-center gap-2 transition-colors">
                    <ArrowLeft size={18} /> Back
                </button>
            ) : <div />}
            <button
                onClick={onNext}
                disabled={nextDisabled}
                className="px-6 py-2 bg-indigo-600 hover:bg-indigo-700 disabled:bg-neutral-300 disabled:cursor-not-allowed text-white rounded-lg font-bold flex items-center gap-2 transition-colors"
            >
                {nextLabel} <ArrowRight size={18} />
            </button>
        </div>
    )

    const ExampleBox = ({ children }) => (
        <div className="mt-2 p-3 bg-neutral-100 dark:bg-neutral-800 rounded-lg text-sm italic text-neutral-600 dark:text-neutral-400">
            {children}
        </div>
    )

    const SectionHeader = ({ icon: Icon, title, subtitle }) => (
        <div className="mb-6">
            <h3 className="text-lg font-bold flex items-center gap-2 mb-1">
                <Icon size={20} className="text-indigo-500" /> {title}
            </h3>
            {subtitle && <p className="text-sm text-neutral-500">{subtitle}</p>}
        </div>
    )

    const FeatureCard = ({ feature }) => {
        const BucketIcon = BUCKET_INFO[feature.bucket].icon
        const recColors = {
            include: 'border-green-200 dark:border-green-800 bg-green-50/50 dark:bg-green-900/10',
            limited: 'border-yellow-200 dark:border-yellow-800 bg-yellow-50/50 dark:bg-yellow-900/10',
            caution: 'border-orange-200 dark:border-orange-800 bg-orange-50/50 dark:bg-orange-900/10',
            phase: 'border-neutral-200 dark:border-neutral-700 bg-neutral-50/50 dark:bg-neutral-800/50',
            exclude: 'border-red-200 dark:border-red-800 bg-red-50/50 dark:bg-red-900/10 opacity-60',
        }

        return (
            <div className={`p-4 rounded-lg border ${recColors[feature.recommendation]}`}>
                <div className="flex justify-between items-start mb-2">
                    <div className="flex items-center gap-2">
                        <BucketIcon size={16} style={{ color: BUCKET_INFO[feature.bucket].color }} />
                        <span className="font-bold text-sm">{feature.title}</span>
                        {feature.priorityMatch && <span className="text-xs bg-indigo-100 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400 px-1.5 py-0.5 rounded">Priority</span>}
                    </div>
                    <span className={`text-xs font-bold px-2 py-0.5 rounded ${INVESTMENT_COLORS[feature.investment]}`}>
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

    const PhaseSection = ({ phase, label, features, icon: Icon, color }) => {
        const isExpanded = expandedPhases[phase]
        const includedCount = features.filter(f => f.recommendation !== 'exclude').length

        return (
            <div className="mb-4">
                <button
                    onClick={() => setExpandedPhases(p => ({ ...p, [phase]: !p[phase] }))}
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
                        {features.map(f => <FeatureCard key={f.id} feature={f} />)}
                    </div>
                )}
            </div>
        )
    }

    const TOTAL_STEPS = 5

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
                        <a href="/tools" className="p-2 hover:bg-neutral-100 dark:hover:bg-neutral-800 rounded-lg transition-colors">
                            <X size={20} />
                        </a>
                    </div>
                </div>
            </div>

            {/* Content */}
            <div className="max-w-6xl mx-auto px-6 py-8">

                {/* Step 1: Client Profile */}
                {step === 1 && (
                    <div className="animate-in fade-in slide-in-from-right-4 duration-300">
                        <div className="mb-8">
                            <h2 className="text-3xl font-bold mb-2">Client Profile</h2>
                            <p className="text-neutral-500">Basic context about the client and engagement.</p>
                        </div>

                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                            <div>
                                <SectionHeader icon={Briefcase} title="Industry" />
                                <div className="grid grid-cols-2 gap-3">
                                    <OptionBtn label="Industrial / MRO" sub="Parts, tools, equipment" active={data.industry === 'industrial'} onClick={() => updateData('industry', 'industrial')} />
                                    <OptionBtn label="Electrical" sub="Components & supplies" active={data.industry === 'electrical'} onClick={() => updateData('industry', 'electrical')} />
                                    <OptionBtn label="HVAC / Plumbing" sub="Mechanical systems" active={data.industry === 'hvac'} onClick={() => updateData('industry', 'hvac')} />
                                    <OptionBtn label="Other B2B" sub="General distribution" active={data.industry === 'other'} onClick={() => updateData('industry', 'other')} />
                                </div>
                            </div>

                            <div>
                                <SectionHeader icon={Calendar} title="Timeline" />
                                <div className="grid grid-cols-1 gap-3">
                                    <OptionBtn label="Flexible" icon={<Calendar size={16} />} sub="Phased approach OK, no hard date" active={data.timeline === 'flexible'} onClick={() => updateData('timeline', 'flexible')} />
                                    <OptionBtn label="Moderate" icon={<Calendar size={16} />} sub="Target date with some flexibility" active={data.timeline === 'moderate'} onClick={() => updateData('timeline', 'moderate')} />
                                    <OptionBtn label="Tight" icon={<Zap size={16} />} sub="Hard launch date, minimal scope flexibility" active={data.timeline === 'tight'} onClick={() => updateData('timeline', 'tight')} />
                                </div>
                            </div>
                        </div>

                        <div className="mt-8">
                            <SectionHeader icon={Target} title="Pain Points" subtitle="What problems are they trying to solve? Select all that apply." />
                            <div className="flex flex-wrap gap-2">
                                <PriorityChip label="Can't find products" id="findability" active={data.priorities.includes('findability')} />
                                <PriorityChip label="Search doesn't understand" id="understanding" active={data.priorities.includes('understanding')} />
                                <PriorityChip label="Missing cross-sell" id="crosssell" active={data.priorities.includes('crosssell')} />
                                <PriorityChip label="Slow reordering" id="reordering" active={data.priorities.includes('reordering')} />
                                <PriorityChip label="Zero results / dead ends" id="deadends" active={data.priorities.includes('deadends')} />
                                <PriorityChip label="No merchandiser control" id="control" active={data.priorities.includes('control')} />
                                <PriorityChip label="No visibility / analytics" id="visibility" active={data.priorities.includes('visibility')} />
                            </div>
                        </div>

                        <NavButtons onNext={() => setStep(2)} />
                    </div>
                )}

                {/* Step 2: Data Readiness (Consolidated) */}
                {step === 2 && (
                    <div className="animate-in fade-in slide-in-from-right-4 duration-300">
                        <div className="mb-8">
                            <h2 className="text-3xl font-bold mb-2">Data Readiness</h2>
                            <p className="text-neutral-500">Data quality determines what's achievable. Existence alone isn't enough — quality matters.</p>
                        </div>

                        <div className="space-y-8">
                            {/* Catalog Basics */}
                            <div className="p-6 border rounded-xl bg-neutral-50 dark:bg-neutral-900">
                                <SectionHeader icon={Database} title="Catalog Basics" subtitle="Titles, SKUs, and prices" />
                                <div className="grid grid-cols-2 gap-3">
                                    <OptionBtn label="Yes" icon={<CheckCircle size={16} className="text-green-500" />} sub="Structured product data exists" active={data.catalogBasic === 'yes'} onClick={() => updateData('catalogBasic', 'yes')} small />
                                    <OptionBtn label="Incomplete" icon={<AlertTriangle size={16} className="text-yellow-500" />} sub="Major gaps or quality issues" active={data.catalogBasic === 'incomplete'} onClick={() => updateData('catalogBasic', 'incomplete')} small />
                                </div>
                            </div>

                            {/* Descriptions */}
                            <div className="p-6 border rounded-xl bg-neutral-50 dark:bg-neutral-900">
                                <SectionHeader icon={FileSearch} title="Product Descriptions" subtitle="Quality of text content for search matching" />
                                <div className="grid grid-cols-3 gap-3">
                                    <OptionBtn
                                        label="Rich"
                                        icon={<span className="w-3 h-3 rounded-full bg-green-500"></span>}
                                        sub="Detailed, application-focused"
                                        active={data.descriptionsQuality === 'rich'}
                                        onClick={() => updateData('descriptionsQuality', 'rich')}
                                        small
                                    />
                                    <OptionBtn
                                        label="Basic"
                                        icon={<span className="w-3 h-3 rounded-full bg-yellow-500"></span>}
                                        sub="1-2 sentences, boilerplate"
                                        active={data.descriptionsQuality === 'basic'}
                                        onClick={() => updateData('descriptionsQuality', 'basic')}
                                        small
                                    />
                                    <OptionBtn
                                        label="Sparse / None"
                                        icon={<span className="w-3 h-3 rounded-full bg-red-500"></span>}
                                        sub="Titles only or missing"
                                        active={data.descriptionsQuality === 'sparse'}
                                        onClick={() => updateData('descriptionsQuality', 'sparse')}
                                        small
                                    />
                                </div>
                                <ExampleBox>
                                    <strong>Rich:</strong> "Heavy-duty 18V brushless cordless drill for concrete and masonry. 2-speed gearbox, 1/2" chuck..."<br />
                                    <strong>Basic:</strong> "18V Cordless Drill. Variable speed."<br />
                                    <strong>Sparse:</strong> "DRL-18V-001"
                                </ExampleBox>
                            </div>

                            {/* Attributes */}
                            <div className="p-6 border rounded-xl bg-neutral-50 dark:bg-neutral-900">
                                <SectionHeader icon={Layers} title="Product Attributes" subtitle="Structured specs and properties" />

                                <div className="mb-4">
                                    <label className="block text-sm font-bold mb-2 opacity-70">Do structured attributes exist?</label>
                                    <div className="grid grid-cols-2 gap-3">
                                        <OptionBtn label="Yes" sub="Have structured attribute data" active={data.attributesExist === 'yes'} onClick={() => updateData('attributesExist', 'yes')} small />
                                        <OptionBtn label="No / Minimal" sub="Few or no structured attributes" active={data.attributesExist === 'no'} onClick={() => updateData('attributesExist', 'no')} small />
                                    </div>
                                </div>

                                {data.attributesExist === 'yes' && (
                                    <div className="mt-4">
                                        <label className="block text-sm font-bold mb-2 opacity-70">Are they search-relevant and consistent?</label>
                                        <div className="grid grid-cols-3 gap-3">
                                            <OptionBtn
                                                label="Search-Ready"
                                                icon={<span className="w-3 h-3 rounded-full bg-green-500"></span>}
                                                sub="Key facets consistent"
                                                active={data.attributesQuality === 'search_ready'}
                                                onClick={() => updateData('attributesQuality', 'search_ready')}
                                                small
                                            />
                                            <OptionBtn
                                                label="Mixed Quality"
                                                icon={<span className="w-3 h-3 rounded-full bg-yellow-500"></span>}
                                                sub="Some good, some gaps"
                                                active={data.attributesQuality === 'mixed'}
                                                onClick={() => updateData('attributesQuality', 'mixed')}
                                                small
                                            />
                                            <OptionBtn
                                                label="Data Dump"
                                                icon={<span className="w-3 h-3 rounded-full bg-red-500"></span>}
                                                sub="Exists but not curated"
                                                active={data.attributesQuality === 'dump'}
                                                onClick={() => updateData('attributesQuality', 'dump')}
                                                small
                                            />
                                        </div>
                                        <ExampleBox>
                                            <strong>Search-Ready:</strong> Brand, Size, Material, Voltage consistently populated across products.<br />
                                            <strong>Data Dump:</strong> A screw has 50 attributes (every configurable option), but Brand/Material missing on 40% of products.
                                        </ExampleBox>
                                    </div>
                                )}
                            </div>

                            {/* Facets */}
                            <div className="p-6 border rounded-xl bg-neutral-50 dark:bg-neutral-900">
                                <SectionHeader icon={Settings} title="Facet-Ready Fields" subtitle="Static filterable attributes like Brand, Category, Certifications, Availability" />
                                <div className="grid grid-cols-3 gap-3">
                                    <OptionBtn label="Yes" icon={<span className="w-3 h-3 rounded-full bg-green-500"></span>} sub="Key facets populated" active={data.facetsReady === 'yes'} onClick={() => updateData('facetsReady', 'yes')} small />
                                    <OptionBtn label="Partial" icon={<span className="w-3 h-3 rounded-full bg-yellow-500"></span>} sub="Some exist, gaps" active={data.facetsReady === 'partial'} onClick={() => updateData('facetsReady', 'partial')} small />
                                    <OptionBtn label="No" icon={<span className="w-3 h-3 rounded-full bg-red-500"></span>} sub="Not available" active={data.facetsReady === 'no'} onClick={() => updateData('facetsReady', 'no')} small />
                                </div>
                            </div>

                            {/* Other Data Types */}
                            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                                <div className="p-6 border rounded-xl bg-neutral-50 dark:bg-neutral-900">
                                    <SectionHeader icon={Wrench} title="Relationship Data" subtitle="Cross-refs, equivalents, kits" />
                                    <div className="grid grid-cols-1 gap-3">
                                        <OptionBtn label="Yes" sub="Have cross-references and equivalents" active={data.relationshipsExist === 'yes'} onClick={() => updateData('relationshipsExist', 'yes')} small />
                                        <OptionBtn label="Partial" sub="Some relationships mapped" active={data.relationshipsExist === 'partial'} onClick={() => updateData('relationshipsExist', 'partial')} small />
                                        <OptionBtn label="No" sub="Not available" active={data.relationshipsExist === 'no'} onClick={() => updateData('relationshipsExist', 'no')} small />
                                    </div>
                                </div>

                                <div className="p-6 border rounded-xl bg-neutral-50 dark:bg-neutral-900">
                                    <SectionHeader icon={BarChart} title="Behavioral Data" subtitle="Search logs, click data (90+ days ideal)" />
                                    <div className="grid grid-cols-1 gap-3">
                                        <OptionBtn label="Comprehensive" sub="Full analytics, 90+ days" active={data.behavioralData === 'comprehensive'} onClick={() => updateData('behavioralData', 'comprehensive')} small />
                                        <OptionBtn label="Some" sub="Basic analytics or limited history" active={data.behavioralData === 'some'} onClick={() => updateData('behavioralData', 'some')} small />
                                        <OptionBtn label="None / New Platform" sub="Starting fresh" active={data.behavioralData === 'none'} onClick={() => updateData('behavioralData', 'none')} small />
                                    </div>
                                </div>
                            </div>

                            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                                <div className="p-6 border rounded-xl bg-neutral-50 dark:bg-neutral-900">
                                    <SectionHeader icon={DollarSign} title="Order History" subtitle="Can connect orders to search?" />
                                    <div className="grid grid-cols-2 gap-3">
                                        <OptionBtn label="Yes" sub="Accessible and linkable" active={data.transactionalData === 'yes'} onClick={() => updateData('transactionalData', 'yes')} small />
                                        <OptionBtn label="No" sub="Not accessible" active={data.transactionalData === 'no'} onClick={() => updateData('transactionalData', 'no')} small />
                                    </div>
                                </div>

                                <div className="p-6 border rounded-xl bg-neutral-50 dark:bg-neutral-900">
                                    <SectionHeader icon={Users} title="User Accounts" subtitle="Can link searches to users?" />
                                    <div className="grid grid-cols-2 gap-3">
                                        <OptionBtn label="Yes" sub="Account linking possible" active={data.userData === 'yes'} onClick={() => updateData('userData', 'yes')} small />
                                        <OptionBtn label="No / Anonymous" sub="No user linking" active={data.userData === 'no'} onClick={() => updateData('userData', 'no')} small />
                                    </div>
                                </div>
                            </div>
                        </div>

                        <NavButtons onBack={() => setStep(1)} onNext={() => setStep(3)} />
                    </div>
                )}

                {/* Step 3: Discovery & Remediation */}
                {step === 3 && (
                    <div className="animate-in fade-in slide-in-from-right-4 duration-300">
                        <div className="mb-8">
                            <h2 className="text-3xl font-bold mb-2">Discovery & Remediation</h2>
                            <p className="text-neutral-500">How well do they understand their data problems? What's the approach to fixing gaps?</p>
                        </div>

                        <div className="space-y-8">
                            {/* Data Problem Awareness */}
                            <div className="p-6 border rounded-xl bg-neutral-50 dark:bg-neutral-900">
                                <SectionHeader icon={HelpCircle} title="Data Problem Awareness" subtitle="How much do they understand about their data gaps?" />
                                <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
                                    <OptionBtn
                                        label="Clear Understanding"
                                        icon={<CheckCircle size={18} className="text-green-500" />}
                                        sub="They know exactly what's missing and where"
                                        active={data.dataProblemAwareness === 'clear'}
                                        onClick={() => updateData('dataProblemAwareness', 'clear')}
                                    />
                                    <OptionBtn
                                        label="Some Idea"
                                        icon={<HelpCircle size={18} className="text-yellow-500" />}
                                        sub="They have a sense but need help auditing"
                                        active={data.dataProblemAwareness === 'some_idea'}
                                        onClick={() => updateData('dataProblemAwareness', 'some_idea')}
                                    />
                                    <OptionBtn
                                        label="Unknown"
                                        icon={<AlertTriangle size={18} className="text-red-500" />}
                                        sub="Need full discovery exercise"
                                        active={data.dataProblemAwareness === 'unknown'}
                                        onClick={() => updateData('dataProblemAwareness', 'unknown')}
                                    />
                                </div>
                                <ExampleBox>
                                    <strong>Clear:</strong> "We know 30% of products lack descriptions and our certification data is in PDFs."<br />
                                    <strong>Unknown:</strong> "We're not sure why search doesn't work well."
                                </ExampleBox>
                            </div>

                            {/* Remediation Approach */}
                            <div className="p-6 border rounded-xl bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-800">
                                <SectionHeader icon={Wrench} title="Remediation Approach" subtitle="How should data gaps be addressed?" />
                                <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
                                    <OptionBtn
                                        label="Pay Now"
                                        icon={<DollarSign size={18} className="text-green-500" />}
                                        sub="Fix data before launch. Higher upfront, better outcomes, no technical debt."
                                        active={data.remediationApproach === 'pay_now'}
                                        onClick={() => updateData('remediationApproach', 'pay_now')}
                                    />
                                    <OptionBtn
                                        label="Pay Later"
                                        icon={<Clock size={18} className="text-yellow-500" />}
                                        sub="Launch with gaps, iterate post-launch. Faster start, documented risk."
                                        active={data.remediationApproach === 'pay_later'}
                                        onClick={() => updateData('remediationApproach', 'pay_later')}
                                    />
                                    <OptionBtn
                                        label="AI Enrichment"
                                        icon={<Cpu size={18} className="text-blue-500" />}
                                        sub="Generate missing content with AI. Faster than manual, needs approval process."
                                        active={data.remediationApproach === 'ai'}
                                        onClick={() => updateData('remediationApproach', 'ai')}
                                    />
                                </div>
                            </div>

                            {/* AI Approval (if AI selected) */}
                            {data.remediationApproach === 'ai' && (
                                <div className="p-6 border rounded-xl bg-neutral-50 dark:bg-neutral-900">
                                    <SectionHeader icon={Cpu} title="AI Content Approval" subtitle="Who reviews AI-generated content before publishing?" />
                                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
                                        <OptionBtn
                                            label="Internal Team"
                                            sub="Client has capacity to review"
                                            active={data.aiApprovalCapacity === 'internal'}
                                            onClick={() => updateData('aiApprovalCapacity', 'internal')}
                                        />
                                        <OptionBtn
                                            label="Need Assistance"
                                            sub="We help with review process"
                                            active={data.aiApprovalCapacity === 'assisted'}
                                            onClick={() => updateData('aiApprovalCapacity', 'assisted')}
                                        />
                                        <OptionBtn
                                            label="No Capacity"
                                            sub="Can't review AI content"
                                            active={data.aiApprovalCapacity === 'none'}
                                            onClick={() => updateData('aiApprovalCapacity', 'none')}
                                        />
                                    </div>
                                </div>
                            )}
                        </div>

                        <NavButtons onBack={() => setStep(2)} onNext={() => setStep(4)} />
                    </div>
                )}

                {/* Step 4: Client Capacity (Granular) */}
                {step === 4 && (
                    <div className="animate-in fade-in slide-in-from-right-4 duration-300">
                        <div className="mb-8">
                            <h2 className="text-3xl font-bold mb-2">Client Capacity</h2>
                            <p className="text-neutral-500">Who manages search, what will they actually do, and how much training do they need?</p>
                        </div>

                        <div className="space-y-8">
                            {/* Team & Role */}
                            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                                <div className="p-6 border rounded-xl bg-neutral-50 dark:bg-neutral-900">
                                    <SectionHeader icon={Users} title="Team Ownership" subtitle="Who owns search day-to-day?" />
                                    <div className="grid grid-cols-1 gap-3">
                                        <OptionBtn label="Dedicated" icon="👔" sub="Full-time person or team" active={data.teamOwnership === 'dedicated'} onClick={() => updateData('teamOwnership', 'dedicated')} small />
                                        <OptionBtn label="Shared" icon="👥" sub="Part of broader responsibilities" active={data.teamOwnership === 'shared'} onClick={() => updateData('teamOwnership', 'shared')} small />
                                        <OptionBtn label="Unassigned" icon="❓" sub="No one identified yet" active={data.teamOwnership === 'unassigned'} onClick={() => updateData('teamOwnership', 'unassigned')} small />
                                    </div>
                                </div>

                                <div className="p-6 border rounded-xl bg-neutral-50 dark:bg-neutral-900">
                                    <SectionHeader icon={Briefcase} title="Primary Role" subtitle="What's their background?" />
                                    <div className="grid grid-cols-1 gap-3">
                                        <OptionBtn label="Developer / Technical" icon="🔧" sub="APIs, data, configs" active={data.teamRole === 'developer'} onClick={() => updateData('teamRole', 'developer')} small />
                                        <OptionBtn label="Merchandiser / Business" icon="🛍️" sub="Products, content, promotions" active={data.teamRole === 'merchandiser'} onClick={() => updateData('teamRole', 'merchandiser')} small />
                                        <OptionBtn label="Product Manager" icon="📋" sub="Strategy, coordination" active={data.teamRole === 'product_manager'} onClick={() => updateData('teamRole', 'product_manager')} small />
                                        <OptionBtn label="Executive / Oversight" icon="👤" sub="High-level only" active={data.teamRole === 'executive'} onClick={() => updateData('teamRole', 'executive')} small />
                                    </div>
                                </div>
                            </div>

                            {/* Operational Activities */}
                            <div className="p-6 border rounded-xl bg-neutral-50 dark:bg-neutral-900">
                                <SectionHeader icon={Settings} title="Operational Activities" subtitle="What will they actually do on an ongoing basis?" />

                                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                                    <div>
                                        <label className="block text-sm font-bold mb-2 flex items-center gap-2"><BarChart size={16} /> Review Analytics</label>
                                        <div className="grid grid-cols-3 gap-2">
                                            <OptionBtn label="Weekly" active={data.opsAnalytics === 'weekly'} onClick={() => updateData('opsAnalytics', 'weekly')} small />
                                            <OptionBtn label="Monthly" active={data.opsAnalytics === 'monthly'} onClick={() => updateData('opsAnalytics', 'monthly')} small />
                                            <OptionBtn label="Rarely" active={data.opsAnalytics === 'rarely'} onClick={() => updateData('opsAnalytics', 'rarely')} small />
                                        </div>
                                    </div>

                                    <div>
                                        <label className="block text-sm font-bold mb-2 flex items-center gap-2"><MessageSquare size={16} /> Collect User Feedback</label>
                                        <div className="grid grid-cols-3 gap-2">
                                            <OptionBtn label="Active" sub="Process exists" active={data.opsFeedback === 'active'} onClick={() => updateData('opsFeedback', 'active')} small />
                                            <OptionBtn label="Ad-hoc" sub="Sometimes" active={data.opsFeedback === 'adhoc'} onClick={() => updateData('opsFeedback', 'adhoc')} small />
                                            <OptionBtn label="No" sub="Not done" active={data.opsFeedback === 'no'} onClick={() => updateData('opsFeedback', 'no')} small />
                                        </div>
                                    </div>

                                    <div>
                                        <label className="block text-sm font-bold mb-2 flex items-center gap-2"><Search size={16} /> Tune Queries (synonyms, curations)</label>
                                        <div className="grid grid-cols-3 gap-2">
                                            <OptionBtn label="Regular" active={data.opsQueryTuning === 'regular'} onClick={() => updateData('opsQueryTuning', 'regular')} small />
                                            <OptionBtn label="Occasional" active={data.opsQueryTuning === 'occasional'} onClick={() => updateData('opsQueryTuning', 'occasional')} small />
                                            <OptionBtn label="Never" active={data.opsQueryTuning === 'never'} onClick={() => updateData('opsQueryTuning', 'never')} small />
                                        </div>
                                    </div>

                                    <div>
                                        <label className="block text-sm font-bold mb-2 flex items-center gap-2"><FlaskConical size={16} /> Run A/B Tests</label>
                                        <div className="grid grid-cols-3 gap-2">
                                            <OptionBtn label="Yes" sub="Have traffic" active={data.opsABTesting === 'yes'} onClick={() => updateData('opsABTesting', 'yes')} small />
                                            <OptionBtn label="Interested" sub="Want to learn" active={data.opsABTesting === 'interested'} onClick={() => updateData('opsABTesting', 'interested')} small />
                                            <OptionBtn label="No" sub="Not planned" active={data.opsABTesting === 'no'} onClick={() => updateData('opsABTesting', 'no')} small />
                                        </div>
                                    </div>

                                    <div className="lg:col-span-2">
                                        <label className="block text-sm font-bold mb-2 flex items-center gap-2"><Wrench size={16} /> Update Content When Issues Found</label>
                                        <div className="grid grid-cols-3 gap-2">
                                            <OptionBtn label="Quickly" sub="Days/week" active={data.opsContentUpdates === 'quickly'} onClick={() => updateData('opsContentUpdates', 'quickly')} small />
                                            <OptionBtn label="Eventually" sub="Weeks/months" active={data.opsContentUpdates === 'eventually'} onClick={() => updateData('opsContentUpdates', 'eventually')} small />
                                            <OptionBtn label="Not Their Job" sub="Other team" active={data.opsContentUpdates === 'not_their_job'} onClick={() => updateData('opsContentUpdates', 'not_their_job')} small />
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Education & Consultation */}
                            <div className="p-6 border rounded-xl bg-purple-50 dark:bg-purple-900/20 border-purple-200 dark:border-purple-800">
                                <SectionHeader icon={GraduationCap} title="Education & Consultation" subtitle="How much training and ongoing help do they need?" />

                                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                                    <div>
                                        <label className="block text-sm font-bold mb-2">Past Search Experience</label>
                                        <div className="grid grid-cols-1 gap-2">
                                            <OptionBtn label="Yes" sub="Managed search before" active={data.pastExperience === 'yes'} onClick={() => updateData('pastExperience', 'yes')} small />
                                            <OptionBtn label="Some" sub="Limited exposure" active={data.pastExperience === 'some'} onClick={() => updateData('pastExperience', 'some')} small />
                                            <OptionBtn label="None" sub="First time" active={data.pastExperience === 'none'} onClick={() => updateData('pastExperience', 'none')} small />
                                        </div>
                                    </div>

                                    <div>
                                        <label className="block text-sm font-bold mb-2">Search Concept Comfort</label>
                                        <div className="grid grid-cols-1 gap-2">
                                            <OptionBtn label="Expert" sub="Knows relevance, synonyms, etc." active={data.searchConceptComfort === 'expert'} onClick={() => updateData('searchConceptComfort', 'expert')} small />
                                            <OptionBtn label="Need Basics" sub="Understands generally" active={data.searchConceptComfort === 'need_basics'} onClick={() => updateData('searchConceptComfort', 'need_basics')} small />
                                            <OptionBtn label="Need Training" sub="New to concepts" active={data.searchConceptComfort === 'need_training'} onClick={() => updateData('searchConceptComfort', 'need_training')} small />
                                        </div>
                                    </div>

                                    <div>
                                        <label className="block text-sm font-bold mb-2">Ongoing Consultation</label>
                                        <div className="grid grid-cols-1 gap-2">
                                            <OptionBtn label="Yes" sub="Want office hours" active={data.wantsOngoingConsultation === 'yes'} onClick={() => updateData('wantsOngoingConsultation', 'yes')} small />
                                            <OptionBtn label="Maybe" sub="Might need help" active={data.wantsOngoingConsultation === 'maybe'} onClick={() => updateData('wantsOngoingConsultation', 'maybe')} small />
                                            <OptionBtn label="Self-Sufficient" sub="Will handle it" active={data.wantsOngoingConsultation === 'no'} onClick={() => updateData('wantsOngoingConsultation', 'no')} small />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <NavButtons onBack={() => setStep(3)} onNext={() => setStep(5)} nextLabel="Generate Scope" />
                    </div>
                )}

                {/* Step 5: Results */}
                {step === 5 && (
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

                        {/* Feature Phases */}
                        <h3 className="font-bold text-xl mb-4">Implementation Phases</h3>

                        <PhaseSection phase="day1" label="Day 1 - Launch Ready" features={results.byPhase.day1} icon={CheckCircle} color="#22c55e" />
                        <PhaseSection phase="day30" label="Day 30 - Behavioral Starts" features={results.byPhase.day30} icon={Clock} color="#eab308" />
                        <PhaseSection phase="day60" label="Day 60-90 - Advanced Features" features={[...results.byPhase.day60, ...results.byPhase.day90]} icon={Brain} color="#9333ff" />

                        <div className="mt-8 flex justify-center gap-4">
                            <button onClick={reset} className="px-6 py-3 border border-neutral-300 dark:border-neutral-600 hover:bg-neutral-50 dark:hover:bg-neutral-800 rounded-lg font-bold flex items-center gap-2 transition-colors">
                                <RefreshCw size={18} /> Start Over
                            </button>
                            <a href="/tools" className="px-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg font-bold flex items-center gap-2 transition-colors">
                                Done
                            </a>
                        </div>
                    </div>
                )}
            </div>
        </div>
    )
}
