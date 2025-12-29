'use client'

import { ArrowLeft, ArrowRight } from 'lucide-react'

/**
 * Navigation buttons for step wizard
 */
export function NavButtons({ onBack, onNext, nextLabel = 'Continue', nextDisabled = false }) {
    return (
        <div className="mt-8 flex justify-between">
            {onBack ? (
                <button
                    onClick={onBack}
                    className="px-6 py-2 border border-neutral-300 dark:border-neutral-600 hover:bg-neutral-50 dark:hover:bg-neutral-800 rounded-lg font-bold flex items-center gap-2 transition-colors"
                >
                    <ArrowLeft size={18} /> Back
                </button>
            ) : <div />}
            <button
                onClick={onNext}
                disabled={nextDisabled}
                className="px-6 py-2 bg-indigo-600 hover:bg-indigo-700 disabled:bg-neutral-300 disabled:cursor-not-allowed text-white rounded-lg font-bold flex items-center gap-2 transition-colors"
            >
                {nextLabel} <ArrowRight size={18} />
            </button>
        </div>
    )
}
