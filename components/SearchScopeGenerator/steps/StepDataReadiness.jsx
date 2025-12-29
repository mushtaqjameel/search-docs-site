'use client'

import {
    Database, FileSearch, Layers, Settings,
    CheckCircle, AlertTriangle, Wrench, BarChart, DollarSign, Users
} from 'lucide-react'
import { OptionBtn, NavButtons, SectionHeader, ExampleBox } from '../shared'

/**
 * Step 2: Data Readiness - Consolidated data quality assessment
 */
export function StepDataReadiness({ data, updateData, onBack, onNext }) {
    return (
        <div className="animate-in fade-in slide-in-from-right-4 duration-300">
            <div className="mb-8">
                <h2 className="text-3xl font-bold mb-2">Data Readiness</h2>
                <p className="text-neutral-500">Data quality determines what's achievable. Existence alone isn't enough - quality matters.</p>
            </div>

            <div className="space-y-8">
                {/* Catalog Basics */}
                <div className="p-6 border rounded-xl bg-neutral-50 dark:bg-neutral-900">
                    <SectionHeader icon={Database} title="Catalog Basics" subtitle="Titles, SKUs, and prices" />
                    <div className="grid grid-cols-2 gap-3">
                        <OptionBtn label="Yes" icon={<CheckCircle size={16} className="text-green-500" />} sub="Structured product data exists" active={data.catalogBasic === 'yes'} onClick={() => updateData('catalogBasic', 'yes')} small />
                        <OptionBtn label="Incomplete" icon={<AlertTriangle size={16} className="text-yellow-500" />} sub="Major gaps or quality issues" active={data.catalogBasic === 'incomplete'} onClick={() => updateData('catalogBasic', 'incomplete')} small />
                    </div>
                </div>

                {/* Descriptions */}
                <div className="p-6 border rounded-xl bg-neutral-50 dark:bg-neutral-900">
                    <SectionHeader icon={FileSearch} title="Product Descriptions" subtitle="Quality of text content for search matching" />
                    <div className="grid grid-cols-3 gap-3">
                        <OptionBtn
                            label="Rich"
                            icon={<span className="w-3 h-3 rounded-full bg-green-500"></span>}
                            sub="Detailed, application-focused"
                            active={data.descriptionsQuality === 'rich'}
                            onClick={() => updateData('descriptionsQuality', 'rich')}
                            small
                        />
                        <OptionBtn
                            label="Basic"
                            icon={<span className="w-3 h-3 rounded-full bg-yellow-500"></span>}
                            sub="1-2 sentences, boilerplate"
                            active={data.descriptionsQuality === 'basic'}
                            onClick={() => updateData('descriptionsQuality', 'basic')}
                            small
                        />
                        <OptionBtn
                            label="Sparse / None"
                            icon={<span className="w-3 h-3 rounded-full bg-red-500"></span>}
                            sub="Titles only or missing"
                            active={data.descriptionsQuality === 'sparse'}
                            onClick={() => updateData('descriptionsQuality', 'sparse')}
                            small
                        />
                    </div>
                    <ExampleBox>
                        <strong>Rich:</strong> "Heavy-duty 18V brushless cordless drill for concrete and masonry. 2-speed gearbox, 1/2" chuck..."<br />
                        <strong>Basic:</strong> "18V Cordless Drill. Variable speed."<br />
                        <strong>Sparse:</strong> "DRL-18V-001"
                    </ExampleBox>
                </div>

                {/* Attributes */}
                <div className="p-6 border rounded-xl bg-neutral-50 dark:bg-neutral-900">
                    <SectionHeader icon={Layers} title="Product Attributes" subtitle="Structured specs and properties" />

                    <div className="mb-4">
                        <label className="block text-sm font-bold mb-2 opacity-70">Do structured attributes exist?</label>
                        <div className="grid grid-cols-2 gap-3">
                            <OptionBtn label="Yes" sub="Have structured attribute data" active={data.attributesExist === 'yes'} onClick={() => updateData('attributesExist', 'yes')} small />
                            <OptionBtn label="No / Minimal" sub="Few or no structured attributes" active={data.attributesExist === 'no'} onClick={() => updateData('attributesExist', 'no')} small />
                        </div>
                    </div>

                    {data.attributesExist === 'yes' && (
                        <div className="mt-4">
                            <label className="block text-sm font-bold mb-2 opacity-70">Are they search-relevant and consistent?</label>
                            <div className="grid grid-cols-3 gap-3">
                                <OptionBtn
                                    label="Search-Ready"
                                    icon={<span className="w-3 h-3 rounded-full bg-green-500"></span>}
                                    sub="Key facets consistent"
                                    active={data.attributesQuality === 'search_ready'}
                                    onClick={() => updateData('attributesQuality', 'search_ready')}
                                    small
                                />
                                <OptionBtn
                                    label="Mixed Quality"
                                    icon={<span className="w-3 h-3 rounded-full bg-yellow-500"></span>}
                                    sub="Some good, some gaps"
                                    active={data.attributesQuality === 'mixed'}
                                    onClick={() => updateData('attributesQuality', 'mixed')}
                                    small
                                />
                                <OptionBtn
                                    label="Data Dump"
                                    icon={<span className="w-3 h-3 rounded-full bg-red-500"></span>}
                                    sub="Exists but not curated"
                                    active={data.attributesQuality === 'dump'}
                                    onClick={() => updateData('attributesQuality', 'dump')}
                                    small
                                />
                            </div>
                            <ExampleBox>
                                <strong>Search-Ready:</strong> Brand, Size, Material, Voltage consistently populated across products.<br />
                                <strong>Data Dump:</strong> A screw has 50 attributes (every configurable option), but Brand/Material missing on 40% of products.
                            </ExampleBox>
                        </div>
                    )}
                </div>

                {/* Facets */}
                <div className="p-6 border rounded-xl bg-neutral-50 dark:bg-neutral-900">
                    <SectionHeader icon={Settings} title="Facet-Ready Fields" subtitle="Static filterable attributes like Brand, Category, Certifications, Availability" />
                    <div className="grid grid-cols-3 gap-3">
                        <OptionBtn label="Yes" icon={<span className="w-3 h-3 rounded-full bg-green-500"></span>} sub="Key facets populated" active={data.facetsReady === 'yes'} onClick={() => updateData('facetsReady', 'yes')} small />
                        <OptionBtn label="Partial" icon={<span className="w-3 h-3 rounded-full bg-yellow-500"></span>} sub="Some exist, gaps" active={data.facetsReady === 'partial'} onClick={() => updateData('facetsReady', 'partial')} small />
                        <OptionBtn label="No" icon={<span className="w-3 h-3 rounded-full bg-red-500"></span>} sub="Not available" active={data.facetsReady === 'no'} onClick={() => updateData('facetsReady', 'no')} small />
                    </div>
                </div>

                {/* Other Data Types */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    <div className="p-6 border rounded-xl bg-neutral-50 dark:bg-neutral-900">
                        <SectionHeader icon={Wrench} title="Relationship Data" subtitle="Cross-refs, equivalents, kits" />
                        <div className="grid grid-cols-1 gap-3">
                            <OptionBtn label="Yes" sub="Have cross-references and equivalents" active={data.relationshipsExist === 'yes'} onClick={() => updateData('relationshipsExist', 'yes')} small />
                            <OptionBtn label="Partial" sub="Some relationships mapped" active={data.relationshipsExist === 'partial'} onClick={() => updateData('relationshipsExist', 'partial')} small />
                            <OptionBtn label="No" sub="Not available" active={data.relationshipsExist === 'no'} onClick={() => updateData('relationshipsExist', 'no')} small />
                        </div>
                    </div>

                    <div className="p-6 border rounded-xl bg-neutral-50 dark:bg-neutral-900">
                        <SectionHeader icon={BarChart} title="Behavioral Data" subtitle="Search logs, click data (90+ days ideal)" />
                        <div className="grid grid-cols-1 gap-3">
                            <OptionBtn label="Comprehensive" sub="Full analytics, 90+ days" active={data.behavioralData === 'comprehensive'} onClick={() => updateData('behavioralData', 'comprehensive')} small />
                            <OptionBtn label="Some" sub="Basic analytics or limited history" active={data.behavioralData === 'some'} onClick={() => updateData('behavioralData', 'some')} small />
                            <OptionBtn label="None / New Platform" sub="Starting fresh" active={data.behavioralData === 'none'} onClick={() => updateData('behavioralData', 'none')} small />
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    <div className="p-6 border rounded-xl bg-neutral-50 dark:bg-neutral-900">
                        <SectionHeader icon={DollarSign} title="Order History" subtitle="Can connect orders to search?" />
                        <div className="grid grid-cols-2 gap-3">
                            <OptionBtn label="Yes" sub="Accessible and linkable" active={data.transactionalData === 'yes'} onClick={() => updateData('transactionalData', 'yes')} small />
                            <OptionBtn label="No" sub="Not accessible" active={data.transactionalData === 'no'} onClick={() => updateData('transactionalData', 'no')} small />
                        </div>
                    </div>

                    <div className="p-6 border rounded-xl bg-neutral-50 dark:bg-neutral-900">
                        <SectionHeader icon={Users} title="User Accounts" subtitle="Can link searches to users?" />
                        <div className="grid grid-cols-2 gap-3">
                            <OptionBtn label="Yes" sub="Account linking possible" active={data.userData === 'yes'} onClick={() => updateData('userData', 'yes')} small />
                            <OptionBtn label="No / Anonymous" sub="No user linking" active={data.userData === 'no'} onClick={() => updateData('userData', 'no')} small />
                        </div>
                    </div>
                </div>
            </div>

            <NavButtons onBack={onBack} onNext={onNext} />
        </div>
    )
}
