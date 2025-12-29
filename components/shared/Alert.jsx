'use client'

import { AlertCircle, AlertTriangle, CheckCircle, Info } from 'lucide-react'

/**
 * Alert component for displaying messages
 */
export function Alert({ type = 'info', text, className = '' }) {
    const config = {
        info: {
            icon: <Info size={16} />,
            colorClass: 'bg-blue-50 text-blue-800 border-blue-200 dark:bg-blue-900/10 dark:text-blue-200 dark:border-blue-800'
        },
        warning: {
            icon: <AlertTriangle size={16} />,
            colorClass: 'bg-yellow-50 text-yellow-800 border-yellow-200 dark:bg-yellow-900/10 dark:text-yellow-200 dark:border-yellow-800'
        },
        danger: {
            icon: <AlertTriangle size={16} />,
            colorClass: 'bg-red-50 text-red-800 border-red-200 dark:bg-red-900/10 dark:text-red-200 dark:border-red-800'
        },
        success: {
            icon: <CheckCircle size={16} />,
            colorClass: 'bg-green-50 text-green-800 border-green-200 dark:bg-green-900/10 dark:text-green-200 dark:border-green-800'
        }
    }

    const { icon, colorClass } = config[type] || config.info

    return (
        <div className={`p-3 rounded-lg border text-sm flex gap-2 items-start ${colorClass} ${className}`}>
            <span className="mt-0.5 shrink-0">{icon}</span>
            <span>{text}</span>
        </div>
    )
}
