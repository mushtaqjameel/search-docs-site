'use client'

import { ArrowRight, Briefcase, Database, Users, Cpu, CheckCircle } from 'lucide-react'

/**
 * Intro screen before launching the wizard
 */
export function StepIntro({ onLaunch }) {
    return (
        <div className="py-8">
            <div className="max-w-3xl mx-auto text-center mb-8">
                <h2 className="text-3xl font-bold mb-4">Search Scope Generator</h2>
                <p className="text-lg text-neutral-600 dark:text-neutral-400 mb-6">
                    Walk through a guided assessment to generate a complete implementation scope in under 10 minutes.
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <div className="p-6 border rounded-xl bg-neutral-50 dark:bg-neutral-900">
                    <div className="w-12 h-12 rounded-lg bg-indigo-100 dark:bg-indigo-900/30 flex items-center justify-center mb-4">
                        <Briefcase className="text-indigo-600" size={24} />
                    </div>
                    <h3 className="font-bold mb-2">Client Context</h3>
                    <p className="text-sm text-neutral-600 dark:text-neutral-400">Industry, timeline, pain points</p>
                </div>
                <div className="p-6 border rounded-xl bg-neutral-50 dark:bg-neutral-900">
                    <div className="w-12 h-12 rounded-lg bg-indigo-100 dark:bg-indigo-900/30 flex items-center justify-center mb-4">
                        <Database className="text-indigo-600" size={24} />
                    </div>
                    <h3 className="font-bold mb-2">Data Readiness</h3>
                    <p className="text-sm text-neutral-600 dark:text-neutral-400">Catalog, behavioral, relationships, AI enrichment potential</p>
                </div>
                <div className="p-6 border rounded-xl bg-neutral-50 dark:bg-neutral-900">
                    <div className="w-12 h-12 rounded-lg bg-indigo-100 dark:bg-indigo-900/30 flex items-center justify-center mb-4">
                        <Users className="text-indigo-600" size={24} />
                    </div>
                    <h3 className="font-bold mb-2">Client Capacity</h3>
                    <p className="text-sm text-neutral-600 dark:text-neutral-400">Team ownership, technical level, review frequency</p>
                </div>
            </div>

            <div className="max-w-2xl mx-auto mb-8 p-6 border rounded-xl bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-800">
                <h4 className="font-bold flex items-center gap-2 text-blue-800 dark:text-blue-300 mb-2">
                    <Cpu size={20} /> AI Enrichment Aware
                </h4>
                <p className="text-sm text-blue-700 dark:text-blue-400">
                    Unlike traditional assessments, this tool recognizes that <strong>AI enrichment can fill data gaps</strong> -
                    missing descriptions and attributes are no longer blockers if the client is open to AI-generated content with human review.
                </p>
            </div>

            <div className="max-w-2xl mx-auto mb-8 p-6 border rounded-xl bg-neutral-100 dark:bg-neutral-800">
                <h4 className="font-bold mb-3">The generator outputs:</h4>
                <ul className="space-y-2 text-sm">
                    <li className="flex items-start gap-2">
                        <CheckCircle size={16} className="text-green-500 mt-0.5 shrink-0" />
                        <span>Recommended features by implementation phase (Day 1 - Day 90)</span>
                    </li>
                    <li className="flex items-start gap-2">
                        <CheckCircle size={16} className="text-green-500 mt-0.5 shrink-0" />
                        <span>Investment levels per feature (MVP, Standard, Polished, Premium)</span>
                    </li>
                    <li className="flex items-start gap-2">
                        <CheckCircle size={16} className="text-green-500 mt-0.5 shrink-0" />
                        <span>Support tier recommendation based on client capacity</span>
                    </li>
                    <li className="flex items-start gap-2">
                        <CheckCircle size={16} className="text-green-500 mt-0.5 shrink-0" />
                        <span>Consultation load and training requirements</span>
                    </li>
                    <li className="flex items-start gap-2">
                        <CheckCircle size={16} className="text-green-500 mt-0.5 shrink-0" />
                        <span>Risk flags, Pay Now/Pay Later recommendations, and AI enrichment opportunities</span>
                    </li>
                </ul>
            </div>

            <div className="text-center">
                <button
                    onClick={onLaunch}
                    className="px-8 py-4 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-lg transition-colors text-lg flex items-center gap-2 mx-auto"
                >
                    Launch Scope Generator <ArrowRight size={20} />
                </button>
            </div>
        </div>
    )
}
