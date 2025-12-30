// Centralized color definitions for the entire app

export const pillarColors = {
    green: '#22c55e',
    yellow: '#eab308',
    red: '#ef4444'
}

export const bucketColors = {
    core: '#00cccc',
    smart: '#9933ff',
    discovery: '#ff9900',
    merchandising: '#ff3333',
    recovery: '#00cc66',
    analytics: '#0066ff'
}

export const investmentColors = {
    MVP: {
        bg: 'bg-neutral-100 dark:bg-neutral-800',
        text: 'text-neutral-600 dark:text-neutral-400',
        tailwind: 'bg-neutral-200 text-neutral-700 dark:bg-neutral-700 dark:text-neutral-300'
    },
    STANDARD: {
        bg: 'bg-green-100 dark:bg-green-900/30',
        text: 'text-green-700 dark:text-green-300',
        tailwind: 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300'
    },
    POLISHED: {
        bg: 'bg-cyan-100 dark:bg-cyan-900/30',
        text: 'text-cyan-700 dark:text-cyan-300',
        tailwind: 'bg-cyan-100 text-cyan-700 dark:bg-cyan-900/30 dark:text-cyan-300'
    },
    PREMIUM: {
        bg: 'bg-purple-100 dark:bg-purple-900/30',
        text: 'text-purple-700 dark:text-purple-300',
        tailwind: 'bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-300'
    }
}

export const supportTierColors = {
    'Self-Service': 'green',
    'Guided': 'cyan',
    'Partnership': 'blue',
    'Managed Service': 'purple'
}

export const consultationColors = {
    Low: 'green',
    Medium: 'yellow',
    High: 'red'
}

export const riskColors = {
    low: 'green',
    medium: 'yellow',
    high: 'red'
}

export const recommendationColors = {
    include: 'green',
    limited: 'yellow',
    caution: 'orange',
    phase: 'blue',
    exclude: 'red'
}

// Semantic color classes for UI components (used across calculators/tools)
export const semanticColors = {
    green: {
        bg: 'bg-green-50 dark:bg-green-900/20',
        border: 'border-green-300 dark:border-green-700',
        borderActive: 'border-green-500',
        text: 'text-green-800 dark:text-green-300',
        textMuted: 'text-green-600 dark:text-green-400',
        badge: 'bg-green-200 text-green-800 dark:bg-green-800 dark:text-green-200',
        combined: 'bg-green-50 dark:bg-green-900/20 border-green-300 dark:border-green-700 text-green-800 dark:text-green-300'
    },
    yellow: {
        bg: 'bg-yellow-50 dark:bg-yellow-900/20',
        border: 'border-yellow-300 dark:border-yellow-700',
        borderActive: 'border-yellow-500',
        text: 'text-yellow-800 dark:text-yellow-300',
        textMuted: 'text-yellow-600 dark:text-yellow-400',
        badge: 'bg-yellow-200 text-yellow-800 dark:bg-yellow-800 dark:text-yellow-200',
        combined: 'bg-yellow-50 dark:bg-yellow-900/20 border-yellow-300 dark:border-yellow-700 text-yellow-800 dark:text-yellow-300'
    },
    red: {
        bg: 'bg-red-50 dark:bg-red-900/20',
        border: 'border-red-300 dark:border-red-700',
        borderActive: 'border-red-500',
        text: 'text-red-800 dark:text-red-300',
        textMuted: 'text-red-600 dark:text-red-400',
        badge: 'bg-red-200 text-red-800 dark:bg-red-800 dark:text-red-200',
        combined: 'bg-red-50 dark:bg-red-900/20 border-red-300 dark:border-red-700 text-red-800 dark:text-red-300'
    },
    blue: {
        bg: 'bg-blue-50 dark:bg-blue-900/20',
        border: 'border-blue-300 dark:border-blue-700',
        borderActive: 'border-blue-500',
        text: 'text-blue-800 dark:text-blue-300',
        textMuted: 'text-blue-600 dark:text-blue-400',
        badge: 'bg-blue-200 text-blue-800 dark:bg-blue-800 dark:text-blue-200',
        combined: 'bg-blue-50 dark:bg-blue-900/20 border-blue-300 dark:border-blue-700 text-blue-800 dark:text-blue-300'
    },
    purple: {
        bg: 'bg-purple-50 dark:bg-purple-900/20',
        border: 'border-purple-300 dark:border-purple-700',
        borderActive: 'border-purple-500',
        text: 'text-purple-800 dark:text-purple-300',
        textMuted: 'text-purple-600 dark:text-purple-400',
        badge: 'bg-purple-200 text-purple-800 dark:bg-purple-800 dark:text-purple-200',
        combined: 'bg-purple-50 dark:bg-purple-900/20 border-purple-300 dark:border-purple-700 text-purple-800 dark:text-purple-300'
    },
    cyan: {
        bg: 'bg-cyan-50 dark:bg-cyan-900/20',
        border: 'border-cyan-300 dark:border-cyan-700',
        borderActive: 'border-cyan-500',
        text: 'text-cyan-800 dark:text-cyan-300',
        textMuted: 'text-cyan-600 dark:text-cyan-400',
        badge: 'bg-cyan-200 text-cyan-800 dark:bg-cyan-800 dark:text-cyan-200',
        combined: 'bg-cyan-50 dark:bg-cyan-900/20 border-cyan-300 dark:border-cyan-700 text-cyan-800 dark:text-cyan-300'
    },
    indigo: {
        bg: 'bg-indigo-50 dark:bg-indigo-900/20',
        border: 'border-indigo-200 dark:border-indigo-800',
        borderActive: 'border-indigo-500',
        text: 'text-indigo-800 dark:text-indigo-300',
        textMuted: 'text-indigo-600 dark:text-indigo-400',
        badge: 'bg-indigo-200 text-indigo-800 dark:bg-indigo-800 dark:text-indigo-200',
        combined: 'bg-indigo-50 dark:bg-indigo-900/20 border-indigo-200 dark:border-indigo-800 text-indigo-800 dark:text-indigo-300'
    },
    neutral: {
        bg: 'bg-neutral-50 dark:bg-neutral-800',
        border: 'border-neutral-200 dark:border-neutral-700',
        borderActive: 'border-neutral-500',
        text: 'text-neutral-800 dark:text-neutral-300',
        textMuted: 'text-neutral-500 dark:text-neutral-400',
        badge: 'bg-neutral-200 text-neutral-800 dark:bg-neutral-700 dark:text-neutral-200',
        combined: 'bg-neutral-50 dark:bg-neutral-800 border-neutral-200 dark:border-neutral-700 text-neutral-800 dark:text-neutral-300'
    }
}

// Helper to get color classes for a given semantic color
export function getColorClasses(color) {
    return semanticColors[color] || semanticColors.neutral
}
