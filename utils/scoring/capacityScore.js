import { capacityWeights, supportTierThresholds } from '../../constants/scoringWeights'

/**
 * Calculate client capacity score based on team and operational readiness
 * @param {Object} data - Form data from the scope generator
 * @returns {Object} - { score, level }
 */
export function calculateCapacityScore(data) {
    const weights = capacityWeights
    let score = 0

    // Team ownership
    if (weights.teamOwnership[data.teamOwnership]) {
        score += weights.teamOwnership[data.teamOwnership]
    }

    // Team role capability
    if (weights.teamRole[data.teamRole]) {
        score += weights.teamRole[data.teamRole]
    }

    // Operational activities
    if (weights.opsAnalytics[data.opsAnalytics]) {
        score += weights.opsAnalytics[data.opsAnalytics]
    }

    if (weights.opsFeedback[data.opsFeedback]) {
        score += weights.opsFeedback[data.opsFeedback]
    }

    if (weights.opsQueryTuning[data.opsQueryTuning]) {
        score += weights.opsQueryTuning[data.opsQueryTuning]
    }

    if (weights.opsABTesting[data.opsABTesting]) {
        score += weights.opsABTesting[data.opsABTesting]
    }

    if (weights.opsContentUpdates[data.opsContentUpdates]) {
        score += weights.opsContentUpdates[data.opsContentUpdates]
    }

    return {
        score: Math.min(weights.maxScore, score),
        level: getCapacityLevel(score)
    }
}

/**
 * Get human-readable capacity level
 * @param {number} score - Capacity score
 * @returns {string} - 'High', 'Medium', or 'Low'
 */
export function getCapacityLevel(score) {
    if (score >= 7) return 'High'
    if (score >= 4) return 'Medium'
    return 'Low'
}

/**
 * Determine support tier based on capacity score
 * @param {number} capacityScore - Calculated capacity score
 * @returns {Object} - { tier, name, desc, color }
 */
export function getSupportTier(capacityScore) {
    for (const threshold of supportTierThresholds) {
        if (capacityScore >= threshold.min && capacityScore < threshold.max) {
            return {
                tier: threshold.tier,
                name: threshold.name,
                desc: threshold.desc,
                color: threshold.color
            }
        }
    }
    // Default to highest tier if score >= max threshold
    const lastThreshold = supportTierThresholds[supportTierThresholds.length - 1]
    return {
        tier: lastThreshold.tier,
        name: lastThreshold.name,
        desc: lastThreshold.desc,
        color: lastThreshold.color
    }
}
