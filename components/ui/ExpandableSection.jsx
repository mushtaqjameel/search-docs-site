'use client'

import { ChevronDown, ChevronUp } from 'lucide-react'

/**
 * Generic expandable/collapsible section
 */
export function ExpandableSection({
    title,
    subtitle,
    icon: Icon,
    isExpanded,
    onToggle,
    headerColor,
    children,
    className = ''
}) {
    return (
        <div className={`rounded-xl border overflow-hidden ${className}`} style={{ borderColor: headerColor || '#e5e5e5' }}>
            <button
                onClick={onToggle}
                className="w-full p-4 flex items-center justify-between cursor-pointer hover:opacity-90 transition-opacity text-left"
                style={{ background: headerColor ? `linear-gradient(135deg, ${headerColor}20, ${headerColor}10)` : undefined }}
            >
                <div className="flex items-center gap-3">
                    {Icon && (
                        <div className="p-2 rounded-lg" style={{ background: headerColor || '#6366f1' }}>
                            <Icon size={20} className="text-white" />
                        </div>
                    )}
                    <div>
                        <h3 className="font-bold text-lg">{title}</h3>
                        {subtitle && (
                            <p className="text-sm text-neutral-500 dark:text-neutral-400">{subtitle}</p>
                        )}
                    </div>
                </div>
                <div className="flex items-center gap-2 text-sm font-medium" style={{ color: headerColor || '#6366f1' }}>
                    {isExpanded ? 'Hide' : 'Show'}
                    {isExpanded ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                </div>
            </button>
            {isExpanded && (
                <div className="p-6 border-t" style={{ borderColor: headerColor ? `${headerColor}30` : '#e5e5e5' }}>
                    {children}
                </div>
            )}
        </div>
    )
}

/**
 * Simple expandable card (click anywhere to toggle)
 */
export function ExpandableCard({
    header,
    isExpanded,
    onToggle,
    children,
    className = ''
}) {
    return (
        <div
            className={`border rounded-lg cursor-pointer transition-all hover:shadow-md dark:border-neutral-700 ${isExpanded ? 'ring-2 ring-indigo-500' : ''} ${className}`}
            onClick={onToggle}
        >
            <div className="p-4 flex items-center justify-between">
                {header}
                {isExpanded ? <ChevronUp size={16} className="text-neutral-400" /> : <ChevronDown size={16} className="text-neutral-400" />}
            </div>
            {isExpanded && (
                <div className="px-4 pb-4 border-t dark:border-neutral-700" onClick={e => e.stopPropagation()}>
                    {children}
                </div>
            )}
        </div>
    )
}

/**
 * Accordion group (only one expanded at a time)
 */
export function Accordion({ items, className = '' }) {
    return (
        <div className={`space-y-2 ${className}`}>
            {items.map((item, index) => (
                <ExpandableCard
                    key={item.id || index}
                    header={item.header}
                    isExpanded={item.isExpanded}
                    onToggle={item.onToggle}
                >
                    {item.content}
                </ExpandableCard>
            ))}
        </div>
    )
}

/**
 * Phase section (for Day 1, Day 30, etc.)
 */
export function PhaseSection({
    phase,
    label,
    count,
    isExpanded,
    onToggle,
    children,
    className = ''
}) {
    const phaseColors = {
        day1: { bg: 'bg-green-50 dark:bg-green-900/20', text: 'text-green-700 dark:text-green-300', border: 'border-green-200 dark:border-green-800' },
        day30: { bg: 'bg-blue-50 dark:bg-blue-900/20', text: 'text-blue-700 dark:text-blue-300', border: 'border-blue-200 dark:border-blue-800' },
        day60: { bg: 'bg-purple-50 dark:bg-purple-900/20', text: 'text-purple-700 dark:text-purple-300', border: 'border-purple-200 dark:border-purple-800' },
        day90: { bg: 'bg-orange-50 dark:bg-orange-900/20', text: 'text-orange-700 dark:text-orange-300', border: 'border-orange-200 dark:border-orange-800' },
    }

    const colors = phaseColors[phase] || phaseColors.day1

    return (
        <div className={`rounded-lg border ${colors.border} overflow-hidden ${className}`}>
            <button
                onClick={onToggle}
                className={`w-full p-3 flex items-center justify-between ${colors.bg}`}
            >
                <div className="flex items-center gap-2">
                    <span className={`font-semibold ${colors.text}`}>{label}</span>
                    <span className="text-sm text-neutral-500">({count} features)</span>
                </div>
                {isExpanded ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
            </button>
            {isExpanded && (
                <div className="p-4">
                    {children}
                </div>
            )}
        </div>
    )
}
