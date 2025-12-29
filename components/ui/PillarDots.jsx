'use client'

import { pillarColors } from '../../constants/colors'

/**
 * Three pillar indicator dots (Data, Governance, Safety)
 */
export function PillarDots({ pillars, size = 'md', showLabels = false, className = '' }) {
    const sizes = {
        sm: 'w-2 h-2',
        md: 'w-2.5 h-2.5',
        lg: 'w-3 h-3'
    }

    const labels = {
        data: 'Data',
        gov: 'Governance',
        safe: 'Safety'
    }

    const shortLabels = {
        data: 'D',
        gov: 'G',
        safe: 'S'
    }

    if (showLabels) {
        return (
            <div className={`flex items-center gap-2 ${className}`}>
                {Object.entries(pillars).map(([key, color]) => (
                    <div key={key} className="flex items-center gap-1">
                        <span
                            className={`${sizes[size]} rounded-full`}
                            style={{ backgroundColor: pillarColors[color] }}
                            title={labels[key]}
                        />
                        <span className="text-xs text-neutral-500">{shortLabels[key]}</span>
                    </div>
                ))}
            </div>
        )
    }

    return (
        <div className={`flex items-center gap-1 ${className}`}>
            {Object.entries(pillars).map(([key, color]) => (
                <span
                    key={key}
                    className={`${sizes[size]} rounded-full`}
                    style={{ backgroundColor: pillarColors[color] }}
                    title={`${labels[key]}: ${color}`}
                />
            ))}
        </div>
    )
}

/**
 * Pillar legend explaining the three pillars
 */
export function PillarLegend({ size = 'sm', orientation = 'horizontal', className = '' }) {
    const pillars = [
        { key: 'data', label: 'Data Dependence', desc: 'How much data quality matters' },
        { key: 'gov', label: 'Governance Required', desc: 'Need for oversight and approval' },
        { key: 'safe', label: 'Operational Safety', desc: 'Risk of breaking things' }
    ]

    const colors = [
        { color: 'green', label: 'Green', desc: 'Low risk / Simple' },
        { color: 'yellow', label: 'Yellow', desc: 'Medium risk / Moderate' },
        { color: 'red', label: 'Red', desc: 'High risk / Complex' }
    ]

    const containerClass = orientation === 'horizontal'
        ? 'flex flex-wrap gap-4'
        : 'flex flex-col gap-2'

    return (
        <div className={`${className}`}>
            <div className={containerClass}>
                {colors.map(({ color, label, desc }) => (
                    <div key={color} className="flex items-center gap-2">
                        <span
                            className="w-3 h-3 rounded-full"
                            style={{ backgroundColor: pillarColors[color] }}
                        />
                        <span className="text-sm">
                            <span className="font-medium">{label}</span>
                            {size !== 'sm' && <span className="text-neutral-500"> - {desc}</span>}
                        </span>
                    </div>
                ))}
            </div>
        </div>
    )
}

/**
 * Full pillar explanation with all three pillars
 */
export function PillarExplanation({ className = '' }) {
    const pillars = [
        {
            key: 'data',
            label: 'Data Dependence',
            desc: 'How much does this feature depend on data quality?',
            green: 'Works with basic catalog',
            yellow: 'Needs rich attributes or descriptions',
            red: 'Requires behavioral or transactional data'
        },
        {
            key: 'gov',
            label: 'Governance Required',
            desc: 'How much oversight and approval is needed?',
            green: 'Set and forget',
            yellow: 'Periodic review recommended',
            red: 'Continuous monitoring required'
        },
        {
            key: 'safe',
            label: 'Operational Safety',
            desc: 'What\'s the risk of misconfiguration?',
            green: 'Safe to experiment',
            yellow: 'Test before deploying',
            red: 'Can significantly impact results'
        }
    ]

    return (
        <div className={`space-y-4 ${className}`}>
            {pillars.map(pillar => (
                <div key={pillar.key} className="border rounded-lg p-4 dark:border-neutral-700">
                    <h4 className="font-semibold mb-2">{pillar.label}</h4>
                    <p className="text-sm text-neutral-600 dark:text-neutral-400 mb-3">{pillar.desc}</p>
                    <div className="space-y-1 text-sm">
                        <div className="flex items-center gap-2">
                            <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: pillarColors.green }} />
                            <span>{pillar.green}</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: pillarColors.yellow }} />
                            <span>{pillar.yellow}</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: pillarColors.red }} />
                            <span>{pillar.red}</span>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    )
}
