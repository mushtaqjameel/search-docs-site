'use client'

import { Check } from 'lucide-react'

/**
 * Priority chip for multi-select pain points
 */
export function PriorityChip({ label, id, active, onToggle }) {
    return (
        <button
            onClick={() => onToggle(id)}
            className={`px-4 py-2 rounded-full border-2 text-sm font-medium transition-all ${active ? 'border-indigo-500 bg-indigo-500 text-white' : 'border-neutral-300 dark:border-neutral-600 hover:border-indigo-400'}`}
        >
            {active && <Check size={14} className="inline mr-1" />}
            {label}
        </button>
    )
}

/**
 * Predefined priority options for client pain points
 */
export const PRIORITY_OPTIONS = [
    { id: 'findability', label: "Can't find products" },
    { id: 'understanding', label: "Search doesn't understand" },
    { id: 'crosssell', label: 'Missing cross-sell' },
    { id: 'reordering', label: 'Slow reordering' },
    { id: 'deadends', label: 'Zero results / dead ends' },
    { id: 'control', label: 'No merchandiser control' },
    { id: 'visibility', label: 'No visibility / analytics' },
]
