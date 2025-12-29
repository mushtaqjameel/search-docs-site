'use client'

/**
 * Section header with icon and subtitle
 */
export function SectionHeader({ icon: Icon, title, subtitle }) {
    return (
        <div className="mb-6">
            <h3 className="text-lg font-bold flex items-center gap-2 mb-1">
                <Icon size={20} className="text-indigo-500" /> {title}
            </h3>
            {subtitle && <p className="text-sm text-neutral-500">{subtitle}</p>}
        </div>
    )
}
