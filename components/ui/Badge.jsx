'use client'

import { investmentColors } from '../../constants/colors'

/**
 * Investment level badge (MVP, STANDARD, POLISHED, PREMIUM)
 */
export function InvestmentBadge({ level, size = 'sm', className = '' }) {
    const colors = investmentColors[level] || investmentColors.STANDARD
    const sizeClasses = {
        xs: 'text-xs px-1.5 py-0.5',
        sm: 'text-xs px-2 py-0.5',
        md: 'text-sm px-2.5 py-1',
        lg: 'text-sm px-3 py-1.5'
    }

    return (
        <span className={`inline-flex items-center rounded font-medium ${colors.tailwind} ${sizeClasses[size]} ${className}`}>
            {level}
        </span>
    )
}

/**
 * Generic colored badge
 */
export function Badge({ children, color = 'gray', size = 'sm', className = '' }) {
    const colorClasses = {
        gray: 'bg-neutral-100 text-neutral-700 dark:bg-neutral-800 dark:text-neutral-300',
        green: 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300',
        yellow: 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-300',
        red: 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-300',
        blue: 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300',
        cyan: 'bg-cyan-100 text-cyan-700 dark:bg-cyan-900/30 dark:text-cyan-300',
        purple: 'bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-300',
        orange: 'bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-300',
        indigo: 'bg-indigo-100 text-indigo-700 dark:bg-indigo-900/30 dark:text-indigo-300',
    }

    const sizeClasses = {
        xs: 'text-xs px-1.5 py-0.5',
        sm: 'text-xs px-2 py-0.5',
        md: 'text-sm px-2.5 py-1',
        lg: 'text-sm px-3 py-1.5'
    }

    return (
        <span className={`inline-flex items-center rounded font-medium ${colorClasses[color]} ${sizeClasses[size]} ${className}`}>
            {children}
        </span>
    )
}

/**
 * Bucket badge with icon
 */
export function BucketBadge({ bucket, bucketInfo, size = 'sm', showIcon = true, className = '' }) {
    const info = bucketInfo[bucket]
    if (!info) return null

    const Icon = info.icon
    const sizeClasses = {
        xs: 'text-xs px-1.5 py-0.5 gap-1',
        sm: 'text-xs px-2 py-0.5 gap-1',
        md: 'text-sm px-2.5 py-1 gap-1.5',
        lg: 'text-sm px-3 py-1.5 gap-2'
    }
    const iconSizes = { xs: 10, sm: 12, md: 14, lg: 16 }

    return (
        <span
            className={`inline-flex items-center rounded font-medium ${sizeClasses[size]} ${className}`}
            style={{ background: `${info.color}20`, color: info.color }}
        >
            {showIcon && Icon && <Icon size={iconSizes[size]} />}
            {info.label}
        </span>
    )
}

/**
 * Risk level badge
 */
export function RiskBadge({ level, size = 'sm', className = '' }) {
    const colorMap = {
        low: 'green',
        medium: 'yellow',
        high: 'red'
    }
    const labelMap = {
        low: 'Low Risk',
        medium: 'Medium Risk',
        high: 'High Risk'
    }

    return (
        <Badge color={colorMap[level]} size={size} className={className}>
            {labelMap[level]}
        </Badge>
    )
}

/**
 * Recommendation badge
 */
export function RecommendationBadge({ recommendation, size = 'sm', className = '' }) {
    const colorMap = {
        include: 'green',
        limited: 'yellow',
        caution: 'orange',
        phase: 'blue',
        exclude: 'red'
    }
    const labelMap = {
        include: 'Include',
        limited: 'Limited',
        caution: 'Caution',
        phase: 'Phase Later',
        exclude: 'Exclude'
    }

    return (
        <Badge color={colorMap[recommendation]} size={size} className={className}>
            {labelMap[recommendation]}
        </Badge>
    )
}
