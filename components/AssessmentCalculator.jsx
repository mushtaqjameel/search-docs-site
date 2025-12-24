'use client'

import React, { useState } from 'react'
import { Check, ArrowRight, ArrowLeft, RefreshCw, Download, Star, Database, Users, Briefcase, ChevronRight, AlertTriangle } from 'lucide-react'

export default function AssessmentCalculator() {
    const [step, setStep] = useState(1)
    const [data, setData] = useState({
        industry: null,
        catalogSize: null,
        timeline: null,
        dataDescriptions: null,
        dataAttributes: null,
        dataBehavioral: null,
        dataUser: null,
        teamCapacity: null,
        technicalLevel: null,
        reviewFrequency: null,
        selectedFeatures: []
    })

    const [results, setResults] = useState(null)

    const updateData = (key, value) => {
        setData(prev => ({ ...prev, [key]: value }))
    }

    const toggleFeature = (featureId) => {
        setData(prev => {
            const selected = prev.selectedFeatures.includes(featureId)
                ? prev.selectedFeatures.filter(f => f !== featureId)
                : [...prev.selectedFeatures, featureId]
            return { ...prev, selectedFeatures: selected }
        })
    }

    const features = [
        { id: 'autocomplete', name: 'Auto Complete', bucket: 'core' },
        { id: 'faceted', name: 'Faceted Search', bucket: 'core' },
        { id: 'partnumber', name: 'Part Number', bucket: 'core' },
        { id: 'certifications', name: 'Searchable Certifications', bucket: 'core' },
        { id: 'semantic', name: 'Semantic Search', bucket: 'smart' },
        { id: 'synonyms', name: 'Intelligent Synonyms', bucket: 'smart' },
        { id: 'mlranking', name: 'ML Ranking', bucket: 'smart' },
        { id: 'recommendations', name: 'Recommendations', bucket: 'discovery' },
        { id: 'recentlyordered', name: 'Recently Ordered', bucket: 'discovery' },
        { id: 'equivalents', name: 'Cross-Brand Equiv.', bucket: 'discovery' },
        { id: 'curations', name: 'Curations', bucket: 'merch' },
        { id: 'dashboard', name: 'Search Dashboard', bucket: 'merch' },
        { id: 'sandbox', name: 'Search Sandbox', bucket: 'merch' },
        { id: 'analytics', name: 'Analytics', bucket: 'analytics' },
        { id: 'abtesting', name: 'A/B Testing', bucket: 'analytics' },
        { id: 'zeroresults', name: 'Zero Results Recovery', bucket: 'analytics' }
    ]

    const calculateResults = () => {
        // Logic ported from original script
        let dataScore = 0;
        if (data.dataDescriptions === 'rich') dataScore += 1;
        else if (data.dataDescriptions === 'basic') dataScore += 0.5;

        if (data.dataAttributes === 'rich') dataScore += 1;
        else if (data.dataAttributes === 'basic') dataScore += 0.5;

        if (data.dataBehavioral === 'rich') dataScore += 1;
        else if (data.dataBehavioral === 'basic') dataScore += 0.5;

        let capacityScore = 0;
        if (data.teamCapacity === 'dedicated') capacityScore += 1;
        else if (data.teamCapacity === 'parttime') capacityScore += 0.5;

        if (data.technicalLevel === 'technical') capacityScore += 1;
        else if (data.technicalLevel === 'merchandiser') capacityScore += 0.5;

        if (data.reviewFrequency === 'weekly') capacityScore += 1;
        else if (data.reviewFrequency === 'monthly') capacityScore += 0.5;

        // Calculate tiers
        let supportTier = { tier: 1, name: 'Standard' };
        if (capacityScore < 1.0) supportTier = { tier: 4, name: 'Managed Service' };
        else if (capacityScore < 2.0) supportTier = { tier: 3, name: 'Partnership' };
        else if (capacityScore < 2.5) supportTier = { tier: 2, name: 'Guided' };

        setResults({
            dataScore,
            capacityScore,
            supportTier,
            dataMaturity: dataScore >= 2.5 ? 'Rich' : dataScore >= 1.5 ? 'Adequate' : 'Gaps',
            clientCapacity: capacityScore >= 2.5 ? 'High' : capacityScore >= 1.5 ? 'Medium' : 'Low'
        })
        setStep(5)
    }

    const reset = () => {
        setStep(1)
        setData({
            industry: null,
            catalogSize: null,
            timeline: null,
            dataDescriptions: null,
            dataAttributes: null,
            dataBehavioral: null,
            dataUser: null,
            teamCapacity: null,
            technicalLevel: null,
            reviewFrequency: null,
            selectedFeatures: []
        })
        setResults(null)
    }

    const OptionBtn = ({ label, icon, sub, active, onClick }) => (
        <button
            onClick={onClick}
            className={`p-4 text-left border-2 rounded-lg transition-all ${active ? 'border-primary-500 bg-primary-50 dark:bg-primary-900/20' : 'border-neutral-200 dark:border-neutral-800 hover:border-primary-300'}`}
        >
            <div className={`font-bold mb-1 flex items-center gap-2 ${active ? 'text-primary-600 dark:text-primary-400' : ''}`}>
                {icon} {label}
            </div>
            <div className="text-sm opacity-70">{sub}</div>
        </button>
    )

    return (
        <div className="my-8">

            {/* Progress Bar */}
            <div className="flex gap-2 mb-8">
                {[1, 2, 3, 4, 5].map(s => (
                    <div key={s} className={`h-2 flex-1 rounded-full transition-all ${s <= step ? 'bg-primary-500' : 'bg-neutral-200 dark:bg-neutral-800'}`}></div>
                ))}
            </div>

            <div className="p-6 border rounded-xl bg-white dark:bg-neutral-900 border-neutral-200 dark:border-neutral-800 min-h-[400px]">

                {step === 1 && (
                    <div className="animate-in fade-in slide-in-from-right-4 duration-300">
                        <h2 className="text-2xl font-bold mb-2 flex items-center gap-2"><Briefcase /> Client Profile</h2>
                        <p className="text-neutral-500 mb-6">Tell us about the client's business context.</p>

                        <div className="space-y-6">
                            <div>
                                <label className="block text-sm font-bold mb-3 uppercase tracking-wide opacity-70">Industry</label>
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                    <OptionBtn label="Industrial / MRO" icon="🏭" sub="Parts, tools, equipment" active={data.industry === 'industrial'} onClick={() => updateData('industry', 'industrial')} />
                                    <OptionBtn label="Electrical" icon="⚡" sub="Components & supplies" active={data.industry === 'electrical'} onClick={() => updateData('industry', 'electrical')} />
                                    <OptionBtn label="HVAC / Plumbing" icon="❄️" sub="Mechanical systems" active={data.industry === 'hvac'} onClick={() => updateData('industry', 'hvac')} />
                                    <OptionBtn label="Other B2B" icon="📦" sub="Other distribution" active={data.industry === 'other'} onClick={() => updateData('industry', 'other')} />
                                </div>
                            </div>
                            <div>
                                <label className="block text-sm font-bold mb-3 uppercase tracking-wide opacity-70">Timeline Pressure</label>
                                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                                    <OptionBtn label="Flexible" icon="🌱" sub="Phased approach OK" active={data.timeline === 'flexible'} onClick={() => updateData('timeline', 'flexible')} />
                                    <OptionBtn label="Moderate" icon="📅" sub="Target date, some flex" active={data.timeline === 'moderate'} onClick={() => updateData('timeline', 'moderate')} />
                                    <OptionBtn label="Tight" icon="⚡" sub="Hard launch date" active={data.timeline === 'tight'} onClick={() => updateData('timeline', 'tight')} />
                                </div>
                            </div>
                        </div>
                        <div className="mt-8 flex justify-end">
                            <button onClick={() => setStep(2)} className="px-6 py-2 bg-primary-600 hover:bg-primary-700 text-white rounded-lg font-bold flex items-center gap-2 transition-colors">
                                Continue <ArrowRight size={18} />
                            </button>
                        </div>
                    </div>
                )}

                {step === 2 && (
                    <div className="animate-in fade-in slide-in-from-right-4 duration-300">
                        <h2 className="text-2xl font-bold mb-2 flex items-center gap-2"><Database /> Data Maturity</h2>
                        <p className="text-neutral-500 mb-6">Assess their data readiness.</p>

                        <div className="space-y-6">
                            <div>
                                <label className="block text-sm font-bold mb-3 uppercase tracking-wide opacity-70">Product Descriptions</label>
                                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                                    <OptionBtn label="Rich" icon="🟢" sub="Detailed, application-focused" active={data.dataDescriptions === 'rich'} onClick={() => updateData('dataDescriptions', 'rich')} />
                                    <OptionBtn label="Basic" icon="🟡" sub="1-2 sentences, boilerplate" active={data.dataDescriptions === 'basic'} onClick={() => updateData('dataDescriptions', 'basic')} />
                                    <OptionBtn label="Sparse" icon="🔴" sub="Titles only or missing" active={data.dataDescriptions === 'sparse'} onClick={() => updateData('dataDescriptions', 'sparse')} />
                                </div>
                            </div>
                            <div>
                                <label className="block text-sm font-bold mb-3 uppercase tracking-wide opacity-70">Product Attributes</label>
                                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                                    <OptionBtn label="Comprehensive" icon="🟢" sub="Detailed specs, consistent" active={data.dataAttributes === 'rich'} onClick={() => updateData('dataAttributes', 'rich')} />
                                    <OptionBtn label="Partial" icon="🟡" sub="Some attributes, gaps" active={data.dataAttributes === 'basic'} onClick={() => updateData('dataAttributes', 'basic')} />
                                    <OptionBtn label="Minimal" icon="🔴" sub="Few or none" active={data.dataAttributes === 'sparse'} onClick={() => updateData('dataAttributes', 'sparse')} />
                                </div>
                            </div>
                            <div>
                                <label className="block text-sm font-bold mb-3 uppercase tracking-wide opacity-70">Behavioral Data</label>
                                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                                    <OptionBtn label="Comprehensive" icon="🟢" sub="Full analytics, 90+ days" active={data.dataBehavioral === 'rich'} onClick={() => updateData('dataBehavioral', 'rich')} />
                                    <OptionBtn label="Some" icon="🟡" sub="Basic analytics, limited" active={data.dataBehavioral === 'basic'} onClick={() => updateData('dataBehavioral', 'basic')} />
                                    <OptionBtn label="None" icon="🔴" sub="No analytics or new platform" active={data.dataBehavioral === 'sparse'} onClick={() => updateData('dataBehavioral', 'sparse')} />
                                </div>
                            </div>
                        </div>
                        <div className="mt-8 flex justify-between">
                            <button onClick={() => setStep(1)} className="px-6 py-2 border border-neutral-300 hover:bg-neutral-50 dark:hover:bg-neutral-800 rounded-lg font-bold flex items-center gap-2 transition-colors">
                                <ArrowLeft size={18} /> Back
                            </button>
                            <button onClick={() => setStep(3)} className="px-6 py-2 bg-primary-600 hover:bg-primary-700 text-white rounded-lg font-bold flex items-center gap-2 transition-colors">
                                Continue <ArrowRight size={18} />
                            </button>
                        </div>
                    </div>
                )}

                {step === 3 && (
                    <div className="animate-in fade-in slide-in-from-right-4 duration-300">
                        <h2 className="text-2xl font-bold mb-2 flex items-center gap-2"><Users /> Client Capacity</h2>
                        <p className="text-neutral-500 mb-6">Their ability to manage search.</p>

                        <div className="space-y-6">
                            <div>
                                <label className="block text-sm font-bold mb-3 uppercase tracking-wide opacity-70">Who manages search?</label>
                                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                                    <OptionBtn label="Dedicated" icon="👔" sub="Full-time person or team" active={data.teamCapacity === 'dedicated'} onClick={() => updateData('teamCapacity', 'dedicated')} />
                                    <OptionBtn label="Part-Time" icon="👥" sub="Shared responsibility" active={data.teamCapacity === 'parttime'} onClick={() => updateData('teamCapacity', 'parttime')} />
                                    <OptionBtn label="No One" icon="❓" sub="Not identified" active={data.teamCapacity === 'none'} onClick={() => updateData('teamCapacity', 'none')} />
                                </div>
                            </div>
                            <div>
                                <label className="block text-sm font-bold mb-3 uppercase tracking-wide opacity-70">Technical Expertise</label>
                                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                                    <OptionBtn label="Technical" icon="🔧" sub="APIs, data, configs" active={data.technicalLevel === 'technical'} onClick={() => updateData('technicalLevel', 'technical')} />
                                    <OptionBtn label="Merchandisers" icon="🛍️" sub="Business users, dashboards" active={data.technicalLevel === 'merchandiser'} onClick={() => updateData('technicalLevel', 'merchandiser')} />
                                    <OptionBtn label="Non-Technical" icon="📱" sub="Needs simple interfaces" active={data.technicalLevel === 'basic'} onClick={() => updateData('technicalLevel', 'basic')} />
                                </div>
                            </div>
                            <div>
                                <label className="block text-sm font-bold mb-3 uppercase tracking-wide opacity-70">Review Frequency</label>
                                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                                    <OptionBtn label="Weekly+" icon="📅" sub="Regular attention" active={data.reviewFrequency === 'weekly'} onClick={() => updateData('reviewFrequency', 'weekly')} />
                                    <OptionBtn label="Monthly" icon="🗓️" sub="Periodic reviews" active={data.reviewFrequency === 'monthly'} onClick={() => updateData('reviewFrequency', 'monthly')} />
                                    <OptionBtn label="Rarely" icon="🚫" sub="Set and forget" active={data.reviewFrequency === 'never'} onClick={() => updateData('reviewFrequency', 'never')} />
                                </div>
                            </div>
                        </div>
                        <div className="mt-8 flex justify-between">
                            <button onClick={() => setStep(2)} className="px-6 py-2 border border-neutral-300 hover:bg-neutral-50 dark:hover:bg-neutral-800 rounded-lg font-bold flex items-center gap-2 transition-colors">
                                <ArrowLeft size={18} /> Back
                            </button>
                            <button onClick={() => setStep(4)} className="px-6 py-2 bg-primary-600 hover:bg-primary-700 text-white rounded-lg font-bold flex items-center gap-2 transition-colors">
                                Continue <ArrowRight size={18} />
                            </button>
                        </div>
                    </div>
                )}

                {step === 4 && (
                    <div className="animate-in fade-in slide-in-from-right-4 duration-300">
                        <h2 className="text-2xl font-bold mb-2 flex items-center gap-2"><Star /> Feature Selection</h2>
                        <p className="text-neutral-500 mb-6">Select features the client is interested in.</p>

                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 mb-8">
                            {features.map(f => (
                                <button
                                    key={f.id}
                                    onClick={() => toggleFeature(f.id)}
                                    className={`p-3 rounded-lg border-2 text-left flex items-center gap-3 transition-all ${data.selectedFeatures.includes(f.id) ? 'border-primary-500 bg-primary-50 dark:bg-primary-900/20' : 'border-neutral-200 dark:border-neutral-800 hover:bg-neutral-50 dark:hover:bg-neutral-800'}`}
                                >
                                    <div className={`w-6 h-6 rounded flex items-center justify-center border ${data.selectedFeatures.includes(f.id) ? 'bg-primary-500 border-primary-500 text-white' : 'border-neutral-300 dark:border-neutral-700'}`}>
                                        {data.selectedFeatures.includes(f.id) && <Check size={14} strokeWidth={4} />}
                                    </div>
                                    <span className="font-medium text-sm">{f.name}</span>
                                </button>
                            ))}
                        </div>

                        <div className="mt-8 flex justify-between">
                            <button onClick={() => setStep(3)} className="px-6 py-2 border border-neutral-300 hover:bg-neutral-50 dark:hover:bg-neutral-800 rounded-lg font-bold flex items-center gap-2 transition-colors">
                                <ArrowLeft size={18} /> Back
                            </button>
                            <button onClick={calculateResults} className="px-6 py-2 bg-primary-600 hover:bg-primary-700 text-white rounded-lg font-bold flex items-center gap-2 transition-colors shadow-lg shadow-primary-500/20">
                                Calculate Results <ArrowRight size={18} />
                            </button>
                        </div>
                    </div>
                )}

                {step === 5 && results && (
                    <div className="animate-in fade-in zoom-in-95 duration-300">
                        <h2 className="text-2xl font-bold mb-6 flex items-center gap-2 text-center justify-center">Assessment Results</h2>

                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                            <div className="p-4 border rounded-xl text-center bg-neutral-50 dark:bg-neutral-900">
                                <div className="text-xs uppercase font-bold text-neutral-500 mb-1">Data Score</div>
                                <div className="text-2xl font-black">{results.dataScore} <span className="text-sm font-normal text-neutral-400">/ 3</span></div>
                                <div className={`text-xs font-bold px-2 py-0.5 rounded-full inline-block mt-1 ${results.dataScore >= 2.5 ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'}`}>{results.dataMaturity}</div>
                            </div>
                            <div className="p-4 border rounded-xl text-center bg-neutral-50 dark:bg-neutral-900">
                                <div className="text-xs uppercase font-bold text-neutral-500 mb-1">Capacity Score</div>
                                <div className="text-2xl font-black">{results.capacityScore} <span className="text-sm font-normal text-neutral-400">/ 3</span></div>
                                <div className={`text-xs font-bold px-2 py-0.5 rounded-full inline-block mt-1 ${results.capacityScore >= 2.5 ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'}`}>{results.clientCapacity}</div>
                            </div>
                            <div className="p-4 border rounded-xl text-center bg-primary-50 dark:bg-primary-900/20 col-span-2 border-primary-200 dark:border-primary-800">
                                <div className="text-xs uppercase font-bold text-primary-600 mb-1">Recommended Support</div>
                                <div className="text-2xl font-black text-primary-700 dark:text-primary-300">{results.supportTier.name}</div>
                                <div className="text-xs font-bold opacity-75 mt-1">Tier {results.supportTier.tier}</div>
                            </div>
                        </div>

                        <div className="space-y-4 mb-8">
                            <div className="p-4 rounded-lg bg-green-50 dark:bg-green-900/20 border border-green-100 dark:border-green-800">
                                <h4 className="font-bold flex items-center gap-2 text-green-800 dark:text-green-300 mb-2"><Check size={18} /> Quick Wins</h4>
                                <p className="text-sm opacity-80">Start with <strong>Core Search</strong> features (Auto Complete, Part Numbers). These have high impact and low risk.</p>
                            </div>
                            {results.dataScore < 2 && (
                                <div className="p-4 rounded-lg bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-100 dark:border-yellow-800">
                                    <h4 className="font-bold flex items-center gap-2 text-yellow-800 dark:text-yellow-300 mb-2"><AlertTriangle size={18} /> Data Alert</h4>
                                    <p className="text-sm opacity-80">Data quality is a bottleneck. Recommend <strong>AI Enrichment</strong> before implementing advanced Smart Search features.</p>
                                </div>
                            )}
                            {results.capacityScore < 2 && (
                                <div className="p-4 rounded-lg bg-purple-50 dark:bg-purple-900/20 border border-purple-100 dark:border-purple-800">
                                    <h4 className="font-bold flex items-center gap-2 text-purple-800 dark:text-purple-300 mb-2"><Users size={18} /> Support Alert</h4>
                                    <p className="text-sm opacity-80">Low team capacity detected. Ensure SOW includes <strong>Managed Services</strong> or monthly check-in hours to prevent churn.</p>
                                </div>
                            )}
                        </div>

                        <div className="flex justify-center gap-4">
                            <button onClick={reset} className="px-6 py-2 border border-neutral-300 hover:bg-neutral-50 dark:hover:bg-neutral-800 rounded-lg font-bold flex items-center gap-2 transition-colors">
                                <RefreshCw size={18} /> Start Over
                            </button>
                        </div>
                    </div>
                )}

            </div>
        </div>
    )
}
