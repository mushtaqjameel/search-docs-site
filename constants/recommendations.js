/**
 * Recommendation level styling constants
 * Used in: FeatureCard, StepResults, SearchScopeGenerator
 */

export const recommendationColors = {
    include: {
        border: 'border-green-200 dark:border-green-800',
        bg: 'bg-green-50/50 dark:bg-green-900/10',
        text: 'text-green-700 dark:text-green-300'
    },
    limited: {
        border: 'border-yellow-200 dark:border-yellow-800',
        bg: 'bg-yellow-50/50 dark:bg-yellow-900/10',
        text: 'text-yellow-700 dark:text-yellow-300'
    },
    caution: {
        border: 'border-orange-200 dark:border-orange-800',
        bg: 'bg-orange-50/50 dark:bg-orange-900/10',
        text: 'text-orange-700 dark:text-orange-300'
    },
    phase: {
        border: 'border-blue-200 dark:border-blue-800',
        bg: 'bg-blue-50/50 dark:bg-blue-900/10',
        text: 'text-blue-700 dark:text-blue-300'
    },
    exclude: {
        border: 'border-red-200 dark:border-red-800',
        bg: 'bg-red-50/50 dark:bg-red-900/10 opacity-60',
        text: 'text-red-700 dark:text-red-300'
    }
}

/**
 * Get combined Tailwind classes for a recommendation level
 */
export function getRecommendationClasses(recommendation) {
    const rec = recommendationColors[recommendation] || recommendationColors.phase
    return `${rec.border} ${rec.bg}`
}

/**
 * Investment level color classes
 */
export const investmentLevelClasses = {
    MVP: 'bg-neutral-200 text-neutral-700 dark:bg-neutral-700 dark:text-neutral-300',
    STANDARD: 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300',
    POLISHED: 'bg-cyan-100 text-cyan-700 dark:bg-cyan-900/30 dark:text-cyan-300',
    PREMIUM: 'bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-300'
}

/**
 * Get Tailwind classes for an investment level
 */
export function getInvestmentClasses(level) {
    return investmentLevelClasses[level] || investmentLevelClasses.MVP
}
