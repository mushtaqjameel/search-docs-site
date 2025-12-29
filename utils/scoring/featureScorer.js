import { priorityBucketMapping, reorderingFeatureIds } from '../../constants/scoringWeights'

/**
 * Calculate risk level based on pillar colors
 * @param {Object} pillars - { data, gov, safe } with color values
 * @returns {string} - 'high', 'medium', or 'low'
 */
export function calculateRiskLevel(pillars) {
    const redPillars = Object.values(pillars).filter(p => p === 'red').length
    const yellowPillars = Object.values(pillars).filter(p => p === 'yellow').length

    if (redPillars >= 2) return 'high'
    if (redPillars === 1 || yellowPillars >= 2) return 'medium'
    return 'low'
}

/**
 * Check if feature matches any of the client's selected priorities
 * @param {Object} feature - Feature object
 * @param {Array} priorities - Selected priority strings
 * @returns {boolean}
 */
export function checkPriorityMatch(feature, priorities) {
    return priorities.some(priority => {
        // Check if priority maps to feature's bucket
        const mappedBuckets = priorityBucketMapping[priority] || []
        if (mappedBuckets.includes(feature.bucket)) return true

        // Special case for reordering - check feature IDs
        if (priority === 'reordering' && reorderingFeatureIds.includes(feature.id)) return true

        return false
    })
}

/**
 * Adjust investment level based on scores and feature characteristics
 * @param {Object} feature - Feature object
 * @param {number} effectiveDataScore - Data readiness score
 * @param {number} capacityScore - Client capacity score
 * @param {boolean} priorityMatch - Whether feature matches priorities
 * @returns {string} - Adjusted investment level
 */
export function adjustInvestmentLevel(feature, effectiveDataScore, capacityScore, priorityMatch) {
    let investment = feature.typicalInvestment

    // Downgrade if data insufficient for premium features
    if (effectiveDataScore < 4 && investment === 'PREMIUM') {
        investment = 'POLISHED'
    }
    if (effectiveDataScore < 5 && investment === 'POLISHED' && feature.pillars.data === 'red') {
        investment = 'STANDARD'
    }

    // Upgrade if capacity is low (needs more support)
    if (capacityScore < 4 && investment === 'STANDARD') {
        investment = 'POLISHED'
    }
    if (capacityScore < 3 && investment === 'MVP') {
        investment = 'STANDARD'
    }

    // Critical features get minimum STANDARD
    if (feature.importance === 'critical' && investment === 'MVP') {
        investment = 'STANDARD'
    }

    // Nice-to-have non-priority features can be downgraded
    if (feature.importance === 'nice' && !priorityMatch && investment === 'POLISHED') {
        investment = 'STANDARD'
    }

    return investment
}

/**
 * Determine feature recommendation and notes
 * @param {Object} params - Scoring context
 * @returns {Object} - { recommendation, reason, consultationNote }
 */
export function getFeatureRecommendation({
    feature,
    dataAvailable,
    canUseAI,
    riskLevel,
    capacityScore,
    timeline,
    pastExperience,
    teamRole,
    opsAnalytics,
    remediationApproach
}) {
    let recommendation = 'include'
    let reason = ''
    let consultationNote = ''

    const dataAvailableForFeature = dataAvailable[feature.dataRequired] ||
        (canUseAI && feature.aiEnrichable && !dataAvailable[feature.dataRequired])

    // Data gap handling
    if (!dataAvailableForFeature) {
        if (feature.phase === 'day1') {
            recommendation = 'limited'
            reason = 'Data gap - will be limited at launch'
            if (remediationApproach === 'pay_later') {
                consultationNote = 'Document risk in SOW'
            }
        } else {
            recommendation = 'phase'
            reason = 'Waiting for data to accumulate'
        }
    }

    // High risk + low capacity
    if (riskLevel === 'high' && capacityScore < 5) {
        if (recommendation === 'include') {
            recommendation = 'caution'
            reason = 'High risk + limited capacity'
            consultationNote = 'Needs managed support or training'
        }
    }

    // Timeline pressure
    if (timeline === 'tight' && feature.phase !== 'day1') {
        if (feature.importance !== 'critical') {
            recommendation = 'phase'
            reason = 'Timeline pressure - defer to post-launch'
        }
    }

    // Feature-specific consultation notes
    if (feature.id === 'synonyms' && pastExperience !== 'yes') {
        consultationNote = 'Will need synonym management training'
    }
    if (feature.id === 'curations' && teamRole === 'developer') {
        consultationNote = 'Merchandiser training recommended'
    }
    if (feature.id === 'analytics' && opsAnalytics === 'rarely') {
        consultationNote = 'Analytics onboarding needed'
    }

    return { recommendation, reason, consultationNote, dataAvailableForFeature }
}

/**
 * Score a single feature with all context
 * @param {Object} feature - Feature from features.json
 * @param {Object} context - All scoring context
 * @returns {Object} - Scored feature with recommendations
 */
export function scoreFeature(feature, context) {
    const {
        data,
        dataAvailable,
        canUseAI,
        effectiveDataScore,
        capacityScore
    } = context

    const riskLevel = calculateRiskLevel(feature.pillars)
    const priorityMatch = checkPriorityMatch(feature, data.priorities)
    const investment = adjustInvestmentLevel(feature, effectiveDataScore, capacityScore, priorityMatch)

    const { recommendation, reason, consultationNote, dataAvailableForFeature } = getFeatureRecommendation({
        feature,
        dataAvailable,
        canUseAI,
        riskLevel,
        capacityScore,
        timeline: data.timeline,
        pastExperience: data.pastExperience,
        teamRole: data.teamRole,
        opsAnalytics: data.opsAnalytics,
        remediationApproach: data.remediationApproach
    })

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
}

/**
 * Group scored features by phase
 * @param {Array} scoredFeatures - Array of scored features
 * @returns {Object} - { day1, day30, day60, day90 }
 */
export function groupByPhase(scoredFeatures) {
    return {
        day1: scoredFeatures.filter(f => f.phase === 'day1'),
        day30: scoredFeatures.filter(f => f.phase === 'day30'),
        day60: scoredFeatures.filter(f => f.phase === 'day60'),
        day90: scoredFeatures.filter(f => f.phase === 'day90'),
    }
}

/**
 * Calculate work breakdown analysis
 * @param {Array} scoredFeatures - Array of scored features
 * @returns {Object} - Breakdown by scope, layer, priority
 */
export function calculateWorkBreakdown(scoredFeatures) {
    const includedFeatures = scoredFeatures.filter(f => f.recommendation !== 'exclude')
    const totalIncluded = includedFeatures.length || 1

    const byScope = {
        universal: includedFeatures.filter(f => f.scope === 'universal').length,
        industry: includedFeatures.filter(f => f.scope === 'industry').length,
        client: includedFeatures.filter(f => f.scope === 'client').length,
    }

    const byLayer = {
        platform: includedFeatures.filter(f => f.layer === 'platform').length,
        integration: includedFeatures.filter(f => f.layer === 'integration').length,
    }

    const byPriority = {
        essential: includedFeatures.filter(f => f.priority === 'essential').length,
        enhanced: includedFeatures.filter(f => f.priority === 'enhanced').length,
        specialized: includedFeatures.filter(f => f.priority === 'specialized').length,
    }

    const toPercent = (obj) => Object.fromEntries(
        Object.entries(obj).map(([key, val]) => [key, Math.round((val / totalIncluded) * 100)])
    )

    return {
        byScope,
        scopePercent: toPercent(byScope),
        byLayer,
        layerPercent: toPercent(byLayer),
        byPriority,
        priorityPercent: toPercent(byPriority),
        totalIncluded,
    }
}
