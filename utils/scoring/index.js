/**
 * Main scoring orchestrator for the Search Scope Generator
 *
 * This module combines all scoring utilities to calculate the complete
 * results for a client assessment.
 */

import { calculateDataScore, getDataAvailability, getDataQualityLabel } from './dataScore'
import { calculateCapacityScore, getCapacityLevel, getSupportTier } from './capacityScore'
import { calculateConsultationLoad } from './consultationLoad'
import { scoreFeature, groupByPhase, calculateWorkBreakdown } from './featureScorer'

/**
 * Calculate all scores and recommendations for a client assessment
 * @param {Object} data - Form data from the scope generator
 * @param {Array} features - Features from features.json
 * @returns {Object} - Complete scoring results
 */
export function calculateScoringResults(data, features) {
    // Calculate core scores
    const dataScoreResult = calculateDataScore(data)
    const { effectiveScore: effectiveDataScore, canUseAI } = dataScoreResult

    const capacityResult = calculateCapacityScore(data)
    const { score: capacityScore } = capacityResult

    const consultationResult = calculateConsultationLoad(data)
    const { score: consultationLoad, tier: consultationTier } = consultationResult

    const supportTier = getSupportTier(capacityScore)

    // Get data availability map
    const dataAvailable = getDataAvailability(data, effectiveDataScore, canUseAI)

    // Score all features
    const scoringContext = {
        data,
        dataAvailable,
        canUseAI,
        effectiveDataScore,
        capacityScore
    }

    const scoredFeatures = features.map(feature => scoreFeature(feature, scoringContext))

    // Group and analyze
    const byPhase = groupByPhase(scoredFeatures)
    const workBreakdown = calculateWorkBreakdown(scoredFeatures)

    return {
        // Raw scores
        dataScore: dataScoreResult.rawScore,
        effectiveDataScore,
        capacityScore,
        consultationLoad,

        // Tiers and labels
        supportTier,
        consultationTier,
        dataQuality: getDataQualityLabel(effectiveDataScore),
        capacityLevel: getCapacityLevel(capacityScore),

        // Flags
        canUseAI,

        // Feature results
        byPhase,
        workBreakdown,
        scoredFeatures,
    }
}

// Re-export individual utilities for direct use
export { calculateDataScore, getDataAvailability, getDataQualityLabel } from './dataScore'
export { calculateCapacityScore, getCapacityLevel, getSupportTier } from './capacityScore'
export { calculateConsultationLoad, getConsultationTier } from './consultationLoad'
export {
    calculateRiskLevel,
    checkPriorityMatch,
    adjustInvestmentLevel,
    getFeatureRecommendation,
    scoreFeature,
    groupByPhase,
    calculateWorkBreakdown
} from './featureScorer'
