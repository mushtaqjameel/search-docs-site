import { dataScoreWeights } from '../../constants/scoringWeights'

/**
 * Calculate data quality score based on client's data readiness
 * @param {Object} data - Form data from the scope generator
 * @returns {Object} - { rawScore, aiBoost, effectiveScore, canUseAI }
 */
export function calculateDataScore(data) {
    const weights = dataScoreWeights
    let score = 0

    // Catalog basic
    if (data.catalogBasic === 'yes') {
        score += weights.catalogBasic.yes
    }

    // Descriptions quality
    if (weights.descriptionsQuality[data.descriptionsQuality]) {
        score += weights.descriptionsQuality[data.descriptionsQuality]
    }

    // Attributes - existence AND quality
    if (data.attributesExist === 'yes') {
        const qualityScore = weights.attributesExist.yes[data.attributesQuality]
        if (qualityScore !== undefined) {
            score += qualityScore
        }
    }

    // Facets
    if (weights.facetsReady[data.facetsReady]) {
        score += weights.facetsReady[data.facetsReady]
    }

    // Relationships
    if (weights.relationshipsExist[data.relationshipsExist]) {
        score += weights.relationshipsExist[data.relationshipsExist]
    }

    // Behavioral data
    if (weights.behavioralData[data.behavioralData]) {
        score += weights.behavioralData[data.behavioralData]
    }

    // Transactional & User data
    if (data.transactionalData === 'yes') {
        score += weights.transactionalData.yes
    }
    if (data.userData === 'yes') {
        score += weights.userData.yes
    }

    // AI Enrichment boost
    const canUseAI = data.remediationApproach === 'ai' &&
        (data.aiApprovalCapacity === 'internal' || data.aiApprovalCapacity === 'assisted')
    const aiBoost = canUseAI ? weights.aiBoost : 0

    const effectiveScore = Math.min(weights.maxScore, score + aiBoost)

    return {
        rawScore: score,
        aiBoost,
        effectiveScore,
        canUseAI
    }
}

/**
 * Get data availability map for feature matching
 * @param {Object} data - Form data
 * @param {number} effectiveDataScore - Calculated data score
 * @param {boolean} canUseAI - Whether AI enrichment is available
 * @returns {Object} - Map of data type to availability boolean
 */
export function getDataAvailability(data, effectiveDataScore, canUseAI) {
    return {
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
}

/**
 * Get human-readable data quality label
 * @param {number} score - Effective data score
 * @returns {string} - 'Rich', 'Adequate', or 'Gaps'
 */
export function getDataQualityLabel(score) {
    if (score >= 7) return 'Rich'
    if (score >= 4) return 'Adequate'
    return 'Gaps'
}
