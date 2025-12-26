'use client'

import React from 'react'
import { Card, Cards } from 'nextra/components'
import { AlertTriangle, Check, X, ClipboardList } from 'lucide-react'

export default function DecisionQuadrants() {
    return (
        <div className="space-y-8">
            <div className="grid grid-cols-1 gap-6">

                {/* Quadrant 1: Data Quality x Capacity */}
                <div className="p-6 border rounded-xl bg-white dark:bg-neutral-900 border-neutral-200 dark:border-neutral-800">
                    <h3 className="font-bold text-lg mb-1">1. Data Quality × Capacity</h3>
                    <p className="text-sm opacity-75 mb-4">Question: "How should we deliver this feature?"</p>

                    <div className="grid grid-cols-2 gap-0 border-2 border-neutral-900 dark:border-neutral-100 text-center">
                        <div className="p-4 border border-neutral-900/10 dark:border-neutral-100/10 bg-cyan-100 dark:bg-cyan-900/30">
                            <h4 className="font-black text-sm mb-1 uppercase">Automate</h4>
                            <p className="text-xs">Rich Data + Low Capacity<br />→ Premium inv., full self-service</p>
                        </div>
                        <div className="p-4 border border-neutral-900/10 dark:border-neutral-100/10 bg-green-100 dark:bg-green-900/30">
                            <h4 className="font-black text-sm mb-1 uppercase">Empower</h4>
                            <p className="text-xs">Rich Data + High Capacity<br />→ Standard inv., give them tools</p>
                        </div>
                        <div className="p-4 border border-neutral-900/10 dark:border-neutral-100/10 bg-red-100 dark:bg-red-900/30">
                            <h4 className="font-black text-sm mb-1 uppercase flex items-center justify-center gap-1"><AlertTriangle size={14} /> Danger Zone</h4>
                            <p className="text-xs">Poor Data + Low Capacity<br />→ Fix data first or we manage</p>
                        </div>
                        <div className="p-4 border border-neutral-900/10 dark:border-neutral-100/10 bg-neutral-100 dark:bg-neutral-800">
                            <h4 className="font-black text-sm mb-1 uppercase">Iterate</h4>
                            <p className="text-xs">Poor Data + High Capacity<br />→ MVP now, they fill gaps later</p>
                        </div>
                    </div>
                    <div className="flex justify-between text-xs text-neutral-500 mt-2 font-mono">
                        <span>← Low Capacity</span>
                        <span>High Capacity →</span>
                    </div>
                </div>

                {/* Quadrant 2: Importance x Data */}
                <div className="p-6 border rounded-xl bg-white dark:bg-neutral-900 border-neutral-200 dark:border-neutral-800">
                    <h3 className="font-bold text-lg mb-1">2. Importance × Data</h3>
                    <p className="text-sm opacity-75 mb-4">Question: "Should we even build this feature?"</p>

                    <div className="grid grid-cols-2 gap-0 border-2 border-neutral-900 dark:border-neutral-100 text-center">
                        <div className="p-4 border border-neutral-900/10 dark:border-neutral-100/10 bg-yellow-100 dark:bg-yellow-900/30">
                            <h4 className="font-black text-sm mb-1 uppercase">Fix Data First</h4>
                            <p className="text-xs">Important + Poor Data<br />→ Invest in AI Enrichment</p>
                        </div>
                        <div className="p-4 border border-neutral-900/10 dark:border-neutral-100/10 bg-purple-100 dark:bg-purple-900/30">
                            <h4 className="font-black text-sm mb-1 uppercase">Invest Heavily</h4>
                            <p className="text-xs">Important + Rich Data<br />→ Premium/Polished</p>
                        </div>
                        <div className="p-4 border border-neutral-900/10 dark:border-neutral-100/10 bg-neutral-50 dark:bg-neutral-900">
                            <h4 className="font-black text-sm mb-1 uppercase text-neutral-400">Skip</h4>
                            <p className="text-xs">Nice-to-have + Poor Data<br />→ Remove from scope</p>
                        </div>
                        <div className="p-4 border border-neutral-900/10 dark:border-neutral-100/10 bg-blue-50 dark:bg-blue-900/30">
                            <h4 className="font-black text-sm mb-1 uppercase">Opportunistic</h4>
                            <p className="text-xs">Nice-to-have + Rich Data<br />→ MVP if time permits</p>
                        </div>
                    </div>
                    <div className="flex justify-between text-xs text-neutral-500 mt-2 font-mono">
                        <span>← Poor Data</span>
                        <span>Rich Data →</span>
                    </div>
                </div>

                {/* Quadrant 3: Effort x Value */}
                <div className="p-6 border rounded-xl bg-white dark:bg-neutral-900 border-neutral-200 dark:border-neutral-800">
                    <h3 className="font-bold text-lg mb-1">3. Effort × Value</h3>
                    <p className="text-sm opacity-75 mb-4">Question: "What should we build first?"</p>

                    <div className="grid grid-cols-2 gap-0 border-2 border-neutral-900 dark:border-neutral-100 text-center">
                        <div className="p-4 border border-neutral-900/10 dark:border-neutral-100/10 bg-green-100 dark:bg-green-900/30">
                            <h4 className="font-black text-sm mb-1 uppercase flex items-center justify-center gap-1"><Check size={14} /> Quick Wins</h4>
                            <p className="text-xs">High Value + Low Effort<br />→ Do first, high ROI</p>
                        </div>
                        <div className="p-4 border border-neutral-900/10 dark:border-neutral-100/10 bg-blue-100 dark:bg-blue-900/30">
                            <h4 className="font-black text-sm mb-1 uppercase">Strategic</h4>
                            <p className="text-xs">High Value + High Effort<br />→ Worth it, plan carefully</p>
                        </div>
                        <div className="p-4 border border-neutral-900/10 dark:border-neutral-100/10 bg-neutral-100 dark:bg-neutral-800">
                            <h4 className="font-black text-sm mb-1 uppercase">Fill-Ins</h4>
                            <p className="text-xs">Low Value + Low Effort<br />→ Only if time permits</p>
                        </div>
                        <div className="p-4 border border-neutral-900/10 dark:border-neutral-100/10 bg-red-50 dark:bg-red-900/20">
                            <h4 className="font-black text-sm mb-1 uppercase flex items-center justify-center gap-1"><X size={14} /> Avoid</h4>
                            <p className="text-xs">Low Value + High Effort<br />→ Don't build</p>
                        </div>
                    </div>
                    <div className="flex justify-between text-xs text-neutral-500 mt-2 font-mono">
                        <span>← Low Effort</span>
                        <span>High Effort →</span>
                    </div>
                </div>

                {/* Quadrant 4: Risk x Capacity */}
                <div className="p-6 border rounded-xl bg-white dark:bg-neutral-900 border-neutral-200 dark:border-neutral-800">
                    <h3 className="font-bold text-lg mb-1">4. Risk × Capacity</h3>
                    <p className="text-sm opacity-75 mb-4">Question: "How should we support this?"</p>

                    <div className="grid grid-cols-2 gap-0 border-2 border-neutral-900 dark:border-neutral-100 text-center">
                        <div className="p-4 border border-neutral-900/10 dark:border-neutral-100/10 bg-purple-600 text-white">
                            <h4 className="font-black text-sm mb-1 uppercase">Managed</h4>
                            <p className="text-xs opacity-90">High Risk + Low Capacity<br />→ Tier 4: We operate for them</p>
                        </div>
                        <div className="p-4 border border-neutral-900/10 dark:border-neutral-100/10 bg-blue-100 dark:bg-blue-900/30">
                            <h4 className="font-black text-sm mb-1 uppercase">Guided</h4>
                            <p className="text-xs">High Risk + High Capacity<br />→ Tier 3: Monthly check-ins</p>
                        </div>
                        <div className="p-4 border border-neutral-900/10 dark:border-neutral-100/10 bg-green-100 dark:bg-green-900/30">
                            <h4 className="font-black text-sm mb-1 uppercase">Self-Serve</h4>
                            <p className="text-xs">Low Risk + Low Capacity<br />→ Tier 2: Docs + guardrails</p>
                        </div>
                        <div className="p-4 border border-neutral-900/10 dark:border-neutral-100/10 bg-white dark:bg-neutral-900">
                            <h4 className="font-black text-sm mb-1 uppercase">Hands-Off</h4>
                            <p className="text-xs">Low Risk + High Capacity<br />→ Tier 1: Standard support</p>
                        </div>
                    </div>
                    <div className="flex justify-between text-xs text-neutral-500 mt-2 font-mono">
                        <span>← Low Capacity</span>
                        <span>High Capacity →</span>
                    </div>
                </div>

            </div>

            <div className="p-6 rounded-xl bg-cyan-50 dark:bg-cyan-900/20 border border-cyan-100 dark:border-cyan-800">
                <h3 className="font-bold text-lg mb-3 flex items-center gap-2 text-cyan-800 dark:text-cyan-200"><ClipboardList /> How to Use These Quadrants</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <h4 className="font-bold mb-2 text-sm uppercase opacity-75">Recommended Sequence</h4>
                        <ol className="list-decimal pl-5 space-y-1 text-sm">
                            <li><strong>Quadrant 2</strong> — Should we build it?</li>
                            <li><strong>Quadrant 3</strong> — When should we build it?</li>
                            <li><strong>Quadrant 1</strong> — How should we deliver it?</li>
                            <li><strong>Quadrant 4</strong> — How should we support it?</li>
                        </ol>
                    </div>
                    <div>
                        <h4 className="font-bold mb-2 text-sm uppercase opacity-75">Example Walkthrough</h4>
                        <p className="text-sm italic opacity-80">
                            "This client wants ML Ranking (High Importance). Their data is just Titles (Poor Data).
                            <strong>Quadrant 2</strong> says 'Fix Data First'. We shouldn't build the feature yet.
                            Instead, we propose AI Enrichment to improve the data."
                        </p>
                    </div>
                </div>
            </div>
        </div>
    )
}
