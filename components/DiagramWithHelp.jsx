'use client'

import React, { useState } from 'react'
import { HelpCircle, X, Lightbulb, BookOpen } from 'lucide-react'

/**
 * DiagramWithHelp - Wrapper component that adds on-demand help to any diagram
 *
 * Props:
 * - title: The diagram title
 * - introduction: What this diagram is and when to use it
 * - example: A concrete walkthrough example with title and steps
 * - children: The Mermaid diagram component
 */
export default function DiagramWithHelp({
    title,
    introduction,
    example,
    children
}) {
    const [showHelp, setShowHelp] = useState(false)

    return (
        <div className="my-6">
            {/* Header with title and help icon */}
            <div className="flex items-center justify-between mb-3">
                <h3 className="text-lg font-bold m-0">{title}</h3>
                <button
                    onClick={() => setShowHelp(!showHelp)}
                    className={`p-2 rounded-full transition-all duration-200 ${
                        showHelp
                            ? 'bg-indigo-100 dark:bg-indigo-900/50 text-indigo-600 dark:text-indigo-400'
                            : 'bg-neutral-100 dark:bg-neutral-800 text-neutral-500 hover:text-indigo-600 hover:bg-indigo-50 dark:hover:bg-indigo-900/30'
                    }`}
                    title={showHelp ? "Hide help" : "Show help & example"}
                >
                    {showHelp ? <X size={18} /> : <HelpCircle size={18} />}
                </button>
            </div>

            {/* Collapsible help panel */}
            {showHelp && (
                <div className="mb-4 p-4 rounded-xl bg-gradient-to-br from-indigo-50 to-purple-50 dark:from-indigo-900/20 dark:to-purple-900/20 border border-indigo-200 dark:border-indigo-800 animate-in slide-in-from-top-2 duration-200">
                    {/* Introduction */}
                    {introduction && (
                        <div className="mb-4">
                            <div className="flex items-center gap-2 mb-2 text-indigo-700 dark:text-indigo-300">
                                <BookOpen size={16} />
                                <span className="font-semibold text-sm uppercase tracking-wide">About This Diagram</span>
                            </div>
                            <p className="text-sm text-neutral-700 dark:text-neutral-300 leading-relaxed">
                                {introduction}
                            </p>
                        </div>
                    )}

                    {/* Example walkthrough */}
                    {example && (
                        <div className="pt-3 border-t border-indigo-200 dark:border-indigo-700">
                            <div className="flex items-center gap-2 mb-2 text-purple-700 dark:text-purple-300">
                                <Lightbulb size={16} />
                                <span className="font-semibold text-sm uppercase tracking-wide">Example: {example.title}</span>
                            </div>
                            {example.context && (
                                <p className="text-sm text-neutral-600 dark:text-neutral-400 mb-3 italic">
                                    {example.context}
                                </p>
                            )}
                            {example.steps && (
                                <div className="space-y-2">
                                    {example.steps.map((step, index) => (
                                        <div
                                            key={index}
                                            className="flex items-start gap-3 text-sm"
                                        >
                                            <span className={`flex-shrink-0 w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${
                                                step.result === 'green' ? 'bg-green-100 text-green-700 dark:bg-green-900/50 dark:text-green-400' :
                                                step.result === 'yellow' ? 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/50 dark:text-yellow-400' :
                                                step.result === 'red' ? 'bg-red-100 text-red-700 dark:bg-red-900/50 dark:text-red-400' :
                                                'bg-indigo-100 text-indigo-700 dark:bg-indigo-900/50 dark:text-indigo-400'
                                            }`}>
                                                {index + 1}
                                            </span>
                                            <div>
                                                <span className="font-medium text-neutral-800 dark:text-neutral-200">{step.action}</span>
                                                {step.outcome && (
                                                    <span className="text-neutral-600 dark:text-neutral-400"> → {step.outcome}</span>
                                                )}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}
                            {example.conclusion && (
                                <div className="mt-3 p-3 rounded-lg bg-white/50 dark:bg-black/20 border border-indigo-100 dark:border-indigo-800">
                                    <span className="font-semibold text-sm text-indigo-700 dark:text-indigo-300">Result: </span>
                                    <span className="text-sm text-neutral-700 dark:text-neutral-300">{example.conclusion}</span>
                                </div>
                            )}
                        </div>
                    )}
                </div>
            )}

            {/* The diagram itself */}
            <div className="diagram-container">
                {children}
            </div>
        </div>
    )
}
