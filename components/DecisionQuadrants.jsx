'use client'

import React, { useState } from 'react'
import { ClipboardList, ChevronDown, ChevronUp } from 'lucide-react'
import Mermaid from './Mermaid'

export default function DecisionQuadrants() {
    const [showExample, setShowExample] = useState(false)

    return (
        <div className="space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

                {/* Quadrant 1: Data Quality x Capacity */}
                <div className="p-6 border rounded-xl bg-white dark:bg-neutral-900 border-neutral-200 dark:border-neutral-800">
                    <h3 className="font-bold text-lg mb-1">1. Data Quality × Capacity</h3>
                    <p className="text-sm opacity-75 mb-4">Question: "How should we deliver this feature?"</p>

                    <Mermaid chart={`
quadrantChart
    title Delivery Approach
    x-axis Poor Data --> Rich Data
    y-axis Low Capacity --> High Capacity
    quadrant-1 EMPOWER
    quadrant-2 ITERATE
    quadrant-3 DANGER ZONE
    quadrant-4 AUTOMATE
`} />
                </div>

                {/* Quadrant 2: Importance x Data */}
                <div className="p-6 border rounded-xl bg-white dark:bg-neutral-900 border-neutral-200 dark:border-neutral-800">
                    <h3 className="font-bold text-lg mb-1">2. Importance × Data</h3>
                    <p className="text-sm opacity-75 mb-4">Question: "Should we even build this feature?"</p>

                    <Mermaid chart={`
quadrantChart
    title Build Decision
    x-axis Poor Data --> Rich Data
    y-axis Low Importance --> High Importance
    quadrant-1 INVEST HEAVILY
    quadrant-2 FIX DATA FIRST
    quadrant-3 SKIP
    quadrant-4 OPPORTUNISTIC
`} />
                </div>

                {/* Quadrant 3: Effort x Value */}
                <div className="p-6 border rounded-xl bg-white dark:bg-neutral-900 border-neutral-200 dark:border-neutral-800">
                    <h3 className="font-bold text-lg mb-1">3. Effort × Value</h3>
                    <p className="text-sm opacity-75 mb-4">Question: "What should we build first?"</p>

                    <Mermaid chart={`
quadrantChart
    title Prioritization
    x-axis Low Effort --> High Effort
    y-axis Low Value --> High Value
    quadrant-1 STRATEGIC
    quadrant-2 QUICK WINS
    quadrant-3 FILL-INS
    quadrant-4 AVOID
`} />
                </div>

                {/* Quadrant 4: Risk x Capacity */}
                <div className="p-6 border rounded-xl bg-white dark:bg-neutral-900 border-neutral-200 dark:border-neutral-800">
                    <h3 className="font-bold text-lg mb-1">4. Risk × Capacity</h3>
                    <p className="text-sm opacity-75 mb-4">Question: "How should we support this?"</p>

                    <Mermaid chart={`
quadrantChart
    title Support Model
    x-axis Low Capacity --> High Capacity
    y-axis Low Risk --> High Risk
    quadrant-1 GUIDED
    quadrant-2 MANAGED
    quadrant-3 SELF-SERVE
    quadrant-4 HANDS-OFF
`} />
                </div>

            </div>

            {/* Support Tier Reference */}
            <div className="p-6 border rounded-xl bg-white dark:bg-neutral-900 border-neutral-200 dark:border-neutral-800">
                <h3 className="font-bold text-lg mb-4">Support Tier Reference (Quadrant 4)</h3>
                <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                        <thead>
                            <tr className="border-b border-neutral-200 dark:border-neutral-700">
                                <th className="text-left py-2 px-3 font-bold">Position</th>
                                <th className="text-left py-2 px-3 font-bold">What It Means</th>
                                <th className="text-left py-2 px-3 font-bold">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr className="border-b border-neutral-100 dark:border-neutral-800">
                                <td className="py-2 px-3"><span className="font-bold text-purple-600">MANAGED</span><br /><span className="text-xs opacity-70">High Risk + Low Capacity</span></td>
                                <td className="py-2 px-3">They can't operate safely</td>
                                <td className="py-2 px-3">Tier 4 — We manage for them, retainer model</td>
                            </tr>
                            <tr className="border-b border-neutral-100 dark:border-neutral-800">
                                <td className="py-2 px-3"><span className="font-bold text-blue-600">GUIDED</span><br /><span className="text-xs opacity-70">High Risk + High Capacity</span></td>
                                <td className="py-2 px-3">Risky but they're capable</td>
                                <td className="py-2 px-3">Tier 3 — Monthly check-ins, consultation hours</td>
                            </tr>
                            <tr className="border-b border-neutral-100 dark:border-neutral-800">
                                <td className="py-2 px-3"><span className="font-bold text-green-600">SELF-SERVE</span><br /><span className="text-xs opacity-70">Low Risk + Low Capacity</span></td>
                                <td className="py-2 px-3">Safe but they need help</td>
                                <td className="py-2 px-3">Tier 2 — Strong docs, guardrails, quarterly reviews</td>
                            </tr>
                            <tr>
                                <td className="py-2 px-3"><span className="font-bold text-neutral-600">HANDS-OFF</span><br /><span className="text-xs opacity-70">Low Risk + High Capacity</span></td>
                                <td className="py-2 px-3">Safe and capable</td>
                                <td className="py-2 px-3">Tier 1 — Standard support, they own it</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Using Quadrants Together */}
            <div className="p-6 rounded-xl bg-indigo-50 dark:bg-indigo-900/20 border border-indigo-100 dark:border-indigo-800">
                <h3 className="font-bold text-lg mb-4 flex items-center gap-2 text-indigo-800 dark:text-indigo-200">
                    <ClipboardList size={20} /> Using the Quadrants Together
                </h3>

                <h4 className="font-bold mb-3 text-sm uppercase opacity-75">Recommended Sequence</h4>
                <Mermaid chart={`
flowchart LR
    Q2[/"1. Importance × Data<br>Should we build it?"/] --> Q3[/"2. Effort × Value<br>Build it when?"/]
    Q3 --> Q1[/"3. Data × Capacity<br>How to build it?"/]
    Q1 --> Q4[/"4. Risk × Capacity<br>How to support it?"/]

    style Q2 fill:#FFD700
    style Q3 fill:#87CEEB
    style Q1 fill:#90EE90
    style Q4 fill:#DDA0DD
`} />

                <div className="mt-6">
                    <button
                        onClick={() => setShowExample(!showExample)}
                        className="flex items-center gap-2 font-bold text-indigo-700 dark:text-indigo-300 hover:underline"
                    >
                        {showExample ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                        {showExample ? 'Hide Example Walkthrough' : 'Show Example Walkthrough'}
                    </button>

                    {showExample && (
                        <div className="mt-4 p-4 bg-white dark:bg-neutral-900 rounded-lg border border-indigo-200 dark:border-indigo-800">
                            <h4 className="font-bold mb-3">Example: Semantic Search</h4>
                            <p className="text-sm mb-4 opacity-80">Client with sparse product data and no dedicated search team wants Semantic Search.</p>

                            <div className="overflow-x-auto">
                                <table className="w-full text-sm">
                                    <thead>
                                        <tr className="border-b border-neutral-200 dark:border-neutral-700">
                                            <th className="text-left py-2 px-3 font-bold">Quadrant</th>
                                            <th className="text-left py-2 px-3 font-bold">Position</th>
                                            <th className="text-left py-2 px-3 font-bold">Result</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr className="border-b border-neutral-100 dark:border-neutral-800">
                                            <td className="py-2 px-3 font-bold text-yellow-600">Importance × Data</td>
                                            <td className="py-2 px-3">Important + Poor Data</td>
                                            <td className="py-2 px-3">FIX DATA FIRST — need AI Enrichment</td>
                                        </tr>
                                        <tr className="border-b border-neutral-100 dark:border-neutral-800">
                                            <td className="py-2 px-3 font-bold text-blue-600">Effort × Value</td>
                                            <td className="py-2 px-3">High Value + High Effort</td>
                                            <td className="py-2 px-3">STRATEGIC — plan carefully</td>
                                        </tr>
                                        <tr className="border-b border-neutral-100 dark:border-neutral-800">
                                            <td className="py-2 px-3 font-bold text-green-600">Data × Capacity</td>
                                            <td className="py-2 px-3">(After enrichment) Rich + Low</td>
                                            <td className="py-2 px-3">AUTOMATE — invest in self-service</td>
                                        </tr>
                                        <tr>
                                            <td className="py-2 px-3 font-bold text-purple-600">Risk × Capacity</td>
                                            <td className="py-2 px-3">Low Risk + Low</td>
                                            <td className="py-2 px-3">SELF-SERVE — Tier 2 support</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>

                            <div className="mt-4 p-3 bg-green-50 dark:bg-green-900/20 rounded-lg border border-green-200 dark:border-green-800">
                                <p className="text-sm font-bold text-green-800 dark:text-green-300">Conclusion</p>
                                <p className="text-sm text-green-700 dark:text-green-400">
                                    Invest in AI Enrichment first. Then build Polished Semantic Search with strong self-service UX. Include Tier 2 support (quarterly reviews).
                                </p>
                            </div>
                        </div>
                    )}
                </div>
            </div>

            {/* Quick Reference */}
            <div className="p-6 border rounded-xl bg-neutral-50 dark:bg-neutral-800 border-neutral-200 dark:border-neutral-700">
                <h3 className="font-bold text-lg mb-4">Quick Reference</h3>
                <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                        <thead>
                            <tr className="border-b border-neutral-300 dark:border-neutral-600">
                                <th className="text-left py-2 px-3 font-bold">Quadrant</th>
                                <th className="text-left py-2 px-3 font-bold">Axes</th>
                                <th className="text-left py-2 px-3 font-bold">Key Insight</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr className="border-b border-neutral-200 dark:border-neutral-700">
                                <td className="py-2 px-3 font-bold">Data × Capacity</td>
                                <td className="py-2 px-3">Data Quality vs. Client Capacity</td>
                                <td className="py-2 px-3">Determines build approach</td>
                            </tr>
                            <tr className="border-b border-neutral-200 dark:border-neutral-700">
                                <td className="py-2 px-3 font-bold">Importance × Data</td>
                                <td className="py-2 px-3">Feature Importance vs. Data Quality</td>
                                <td className="py-2 px-3">Determines if we should build</td>
                            </tr>
                            <tr className="border-b border-neutral-200 dark:border-neutral-700">
                                <td className="py-2 px-3 font-bold">Effort × Value</td>
                                <td className="py-2 px-3">Effort vs. Value</td>
                                <td className="py-2 px-3">Determines when to build</td>
                            </tr>
                            <tr>
                                <td className="py-2 px-3 font-bold">Risk × Capacity</td>
                                <td className="py-2 px-3">Risk vs. Client Capacity</td>
                                <td className="py-2 px-3">Determines support model</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <p className="text-xs mt-4 opacity-70 italic">Use these quadrants during discovery and scoping to make strategic investment decisions.</p>
            </div>
        </div>
    )
}
