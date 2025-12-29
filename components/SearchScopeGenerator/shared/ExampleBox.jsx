'use client'

/**
 * Example box for showing context/examples in questions
 */
export function ExampleBox({ children }) {
    return (
        <div className="mt-2 p-3 bg-neutral-100 dark:bg-neutral-800 rounded-lg text-sm italic text-neutral-600 dark:text-neutral-400">
            {children}
        </div>
    )
}
