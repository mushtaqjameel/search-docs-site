import { consultationWeights, consultationTierThresholds } from '../../constants/scoringWeights'

/**
 * Calculate consultation load based on client's knowledge and needs
 * @param {Object} data - Form data from the scope generator
 * @returns {Object} - { score, tier }
 */
export function calculateConsultationLoad(data) {
    const weights = consultationWeights
    let score = 0

    // Data problem awareness
    if (weights.dataProblemAwareness[data.dataProblemAwareness]) {
        score += weights.dataProblemAwareness[data.dataProblemAwareness]
    }

    // Past experience
    if (weights.pastExperience[data.pastExperience]) {
        score += weights.pastExperience[data.pastExperience]
    }

    // Search concept comfort
    if (weights.searchConceptComfort[data.searchConceptComfort]) {
        score += weights.searchConceptComfort[data.searchConceptComfort]
    }

    // Wants ongoing consultation
    if (weights.wantsOngoingConsultation[data.wantsOngoingConsultation]) {
        score += weights.wantsOngoingConsultation[data.wantsOngoingConsultation]
    }

    // Pay Later adds consultation needs
    if (data.remediationApproach === 'pay_later') {
        score += weights.payLaterPenalty
    }

    return {
        score: Math.min(weights.maxScore, score),
        tier: getConsultationTier(score)
    }
}

/**
 * Get consultation tier based on load score
 * @param {number} score - Consultation load score
 * @returns {Object} - { level, desc, color }
 */
export function getConsultationTier(score) {
    for (const threshold of consultationTierThresholds) {
        if (score >= threshold.min) {
            return {
                level: threshold.level,
                desc: threshold.desc,
                color: threshold.color
            }
        }
    }
    // Default to lowest tier
    const lastThreshold = consultationTierThresholds[consultationTierThresholds.length - 1]
    return {
        level: lastThreshold.level,
        desc: lastThreshold.desc,
        color: lastThreshold.color
    }
}
