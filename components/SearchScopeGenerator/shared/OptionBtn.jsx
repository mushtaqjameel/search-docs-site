'use client'

/**
 * Option button for single/multi-select questions
 */
export function OptionBtn({ label, sub, active, onClick, icon, small = false, className = '' }) {
    return (
        <button
            onClick={onClick}
            className={`${small ? 'p-3' : 'p-4'} text-left border-2 rounded-lg transition-all w-full ${active ? 'border-indigo-500 bg-indigo-50 dark:bg-indigo-900/20' : 'border-neutral-200 dark:border-neutral-700 hover:border-indigo-300'} ${className}`}
        >
            <div className={`font-bold ${small ? 'text-sm' : ''} mb-1 flex items-center gap-2 ${active ? 'text-indigo-600 dark:text-indigo-400' : ''}`}>
                {icon && <span className="shrink-0">{icon}</span>}
                {label}
            </div>
            {sub && <div className={`${small ? 'text-xs' : 'text-sm'} opacity-70`}>{sub}</div>}
        </button>
    )
}

/**
 * Grid of option buttons
 */
export function OptionGrid({ options, value, onChange, columns = 2, small = false, className = '' }) {
    const colClasses = {
        1: 'grid-cols-1',
        2: 'grid-cols-1 md:grid-cols-2',
        3: 'grid-cols-1 md:grid-cols-3',
        4: 'grid-cols-2 md:grid-cols-4'
    }

    return (
        <div className={`grid ${colClasses[columns]} gap-3 ${className}`}>
            {options.map(option => (
                <OptionBtn
                    key={option.value}
                    label={option.label}
                    sub={option.sub}
                    icon={option.icon}
                    active={value === option.value}
                    onClick={() => onChange(option.value)}
                    small={small}
                />
            ))}
        </div>
    )
}
