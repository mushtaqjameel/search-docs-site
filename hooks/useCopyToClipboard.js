'use client'

import { useState, useCallback } from 'react'

/**
 * Hook for copy-to-clipboard functionality with visual feedback
 * @param {number} resetDelay - Delay in ms before resetting copied state (default: 2000)
 * @returns {Object} - { copied, copy }
 */
export function useCopyToClipboard(resetDelay = 2000) {
    const [copied, setCopied] = useState(false)

    const copy = useCallback(async (text) => {
        if (!text) return false

        try {
            await navigator.clipboard.writeText(text)
            setCopied(true)
            setTimeout(() => setCopied(false), resetDelay)
            return true
        } catch (err) {
            console.error('Failed to copy to clipboard:', err)
            return false
        }
    }, [resetDelay])

    const reset = useCallback(() => {
        setCopied(false)
    }, [])

    return {
        copied,
        copy,
        reset
    }
}

/**
 * Generate markdown text for task classification results
 */
export function generateTaskClassifierMarkdown({ taskName, layer, scope, priority, results }) {
    return `## Task Classification: ${taskName}

**Layer:** ${layer}
**Scope:** ${scope}
**Priority:** ${priority}

### Investment Level
${results.investment}

### Billing Model
${results.billing}

### Reusability
${results.reusability}

### Recommendation
${results.recommendation}
`
}

/**
 * Generate markdown text for story level assessment results
 */
export function generateStoryLevelMarkdown({ taskName, levelInfo, result }) {
    return `## Story Level Assessment: ${taskName}

**Level:** ${levelInfo.label}
**Confidence:** ${Math.round(result.confidence * 100)}%

### Scores
- Essential: ${result.scores.essential}
- Enhanced: ${result.scores.enhanced}
- Specialized: ${result.scores.specialized}

### Description
${levelInfo.description}

### Focus
${levelInfo.focus}

### Guidance
${levelInfo.guidance.map(g => `- ${g}`).join('\n')}
`
}

/**
 * Generate markdown text for feature decision navigator results
 */
export function generateFeatureDecisionMarkdown({ featureName, inputs, results, quadrants }) {
    const getResult = (quadrantId, x, y) => {
        const key = `${y}-${x}`
        return quadrants[quadrantId]?.results?.[key]
    }

    const buildResult = getResult('buildDecision', inputs.data, inputs.importance)
    const prioResult = getResult('prioritization', inputs.effort, inputs.value)
    const deliveryResult = getResult('deliveryApproach', inputs.data, inputs.capacity)
    const supportResult = getResult('supportModel', inputs.capacity, inputs.risk)

    return `## Feature Decision: ${featureName}

### Quadrant Analysis

| Quadrant | Position | Action |
|----------|----------|--------|
| Build Decision | ${buildResult?.position || 'N/A'} | ${buildResult?.action || 'N/A'} |
| Prioritization | ${prioResult?.position || 'N/A'} | ${prioResult?.action || 'N/A'} |
| Delivery Approach | ${deliveryResult?.position || 'N/A'} | ${deliveryResult?.action || 'N/A'} |
| Support Model | ${supportResult?.position || 'N/A'} | ${supportResult?.action || 'N/A'} |

### Inputs
- Importance: ${inputs.importance}
- Data Quality: ${inputs.data}
- Effort: ${inputs.effort}
- Value: ${inputs.value}
- Capacity: ${inputs.capacity}
- Risk: ${inputs.risk}

${results.warnings?.length > 0 ? `### Warnings\n${results.warnings.map(w => `- ${w}`).join('\n')}\n` : ''}
${results.recommendations?.length > 0 ? `### Recommendations\n${results.recommendations.map(r => `- ${r}`).join('\n')}` : ''}
`
}
