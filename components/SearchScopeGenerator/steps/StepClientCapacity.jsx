'use client'

import {
    Users, Briefcase, Settings, GraduationCap,
    BarChart, MessageSquare, Search, FlaskConical, Wrench
} from 'lucide-react'
import { OptionBtn, NavButtons, SectionHeader } from '../shared'

/**
 * Step 4: Client Capacity - Team, operations, and education
 */
export function StepClientCapacity({ data, updateData, onBack, onNext }) {
    return (
        <div className="animate-in fade-in slide-in-from-right-4 duration-300">
            <div className="mb-8">
                <h2 className="text-3xl font-bold mb-2">Client Capacity</h2>
                <p className="text-neutral-500">Who manages search, what will they actually do, and how much training do they need?</p>
            </div>

            <div className="space-y-8">
                {/* Team & Role */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    <div className="p-6 border rounded-xl bg-neutral-50 dark:bg-neutral-900">
                        <SectionHeader icon={Users} title="Team Ownership" subtitle="Who owns search day-to-day?" />
                        <div className="grid grid-cols-1 gap-3">
                            <OptionBtn label="Dedicated" icon="👔" sub="Full-time person or team" active={data.teamOwnership === 'dedicated'} onClick={() => updateData('teamOwnership', 'dedicated')} small />
                            <OptionBtn label="Shared" icon="👥" sub="Part of broader responsibilities" active={data.teamOwnership === 'shared'} onClick={() => updateData('teamOwnership', 'shared')} small />
                            <OptionBtn label="Unassigned" icon="❓" sub="No one identified yet" active={data.teamOwnership === 'unassigned'} onClick={() => updateData('teamOwnership', 'unassigned')} small />
                        </div>
                    </div>

                    <div className="p-6 border rounded-xl bg-neutral-50 dark:bg-neutral-900">
                        <SectionHeader icon={Briefcase} title="Primary Role" subtitle="What's their background?" />
                        <div className="grid grid-cols-1 gap-3">
                            <OptionBtn label="Developer / Technical" icon="🔧" sub="APIs, data, configs" active={data.teamRole === 'developer'} onClick={() => updateData('teamRole', 'developer')} small />
                            <OptionBtn label="Merchandiser / Business" icon="🛍️" sub="Products, content, promotions" active={data.teamRole === 'merchandiser'} onClick={() => updateData('teamRole', 'merchandiser')} small />
                            <OptionBtn label="Product Manager" icon="📋" sub="Strategy, coordination" active={data.teamRole === 'product_manager'} onClick={() => updateData('teamRole', 'product_manager')} small />
                            <OptionBtn label="Executive / Oversight" icon="👤" sub="High-level only" active={data.teamRole === 'executive'} onClick={() => updateData('teamRole', 'executive')} small />
                        </div>
                    </div>
                </div>

                {/* Operational Activities */}
                <div className="p-6 border rounded-xl bg-neutral-50 dark:bg-neutral-900">
                    <SectionHeader icon={Settings} title="Operational Activities" subtitle="What will they actually do on an ongoing basis?" />

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                        <div>
                            <label className="block text-sm font-bold mb-2 flex items-center gap-2"><BarChart size={16} /> Review Analytics</label>
                            <div className="grid grid-cols-3 gap-2">
                                <OptionBtn label="Weekly" active={data.opsAnalytics === 'weekly'} onClick={() => updateData('opsAnalytics', 'weekly')} small />
                                <OptionBtn label="Monthly" active={data.opsAnalytics === 'monthly'} onClick={() => updateData('opsAnalytics', 'monthly')} small />
                                <OptionBtn label="Rarely" active={data.opsAnalytics === 'rarely'} onClick={() => updateData('opsAnalytics', 'rarely')} small />
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-bold mb-2 flex items-center gap-2"><MessageSquare size={16} /> Collect User Feedback</label>
                            <div className="grid grid-cols-3 gap-2">
                                <OptionBtn label="Active" sub="Process exists" active={data.opsFeedback === 'active'} onClick={() => updateData('opsFeedback', 'active')} small />
                                <OptionBtn label="Ad-hoc" sub="Sometimes" active={data.opsFeedback === 'adhoc'} onClick={() => updateData('opsFeedback', 'adhoc')} small />
                                <OptionBtn label="No" sub="Not done" active={data.opsFeedback === 'no'} onClick={() => updateData('opsFeedback', 'no')} small />
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-bold mb-2 flex items-center gap-2"><Search size={16} /> Tune Queries (synonyms, curations)</label>
                            <div className="grid grid-cols-3 gap-2">
                                <OptionBtn label="Regular" active={data.opsQueryTuning === 'regular'} onClick={() => updateData('opsQueryTuning', 'regular')} small />
                                <OptionBtn label="Occasional" active={data.opsQueryTuning === 'occasional'} onClick={() => updateData('opsQueryTuning', 'occasional')} small />
                                <OptionBtn label="Never" active={data.opsQueryTuning === 'never'} onClick={() => updateData('opsQueryTuning', 'never')} small />
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-bold mb-2 flex items-center gap-2"><FlaskConical size={16} /> Run A/B Tests</label>
                            <div className="grid grid-cols-3 gap-2">
                                <OptionBtn label="Yes" sub="Have traffic" active={data.opsABTesting === 'yes'} onClick={() => updateData('opsABTesting', 'yes')} small />
                                <OptionBtn label="Interested" sub="Want to learn" active={data.opsABTesting === 'interested'} onClick={() => updateData('opsABTesting', 'interested')} small />
                                <OptionBtn label="No" sub="Not planned" active={data.opsABTesting === 'no'} onClick={() => updateData('opsABTesting', 'no')} small />
                            </div>
                        </div>

                        <div className="lg:col-span-2">
                            <label className="block text-sm font-bold mb-2 flex items-center gap-2"><Wrench size={16} /> Update Content When Issues Found</label>
                            <div className="grid grid-cols-3 gap-2">
                                <OptionBtn label="Quickly" sub="Days/week" active={data.opsContentUpdates === 'quickly'} onClick={() => updateData('opsContentUpdates', 'quickly')} small />
                                <OptionBtn label="Eventually" sub="Weeks/months" active={data.opsContentUpdates === 'eventually'} onClick={() => updateData('opsContentUpdates', 'eventually')} small />
                                <OptionBtn label="Not Their Job" sub="Other team" active={data.opsContentUpdates === 'not_their_job'} onClick={() => updateData('opsContentUpdates', 'not_their_job')} small />
                            </div>
                        </div>
                    </div>
                </div>

                {/* Education & Consultation */}
                <div className="p-6 border rounded-xl bg-purple-50 dark:bg-purple-900/20 border-purple-200 dark:border-purple-800">
                    <SectionHeader icon={GraduationCap} title="Education & Consultation" subtitle="How much training and ongoing help do they need?" />

                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                        <div>
                            <label className="block text-sm font-bold mb-2">Past Search Experience</label>
                            <div className="grid grid-cols-1 gap-2">
                                <OptionBtn label="Yes" sub="Managed search before" active={data.pastExperience === 'yes'} onClick={() => updateData('pastExperience', 'yes')} small />
                                <OptionBtn label="Some" sub="Limited exposure" active={data.pastExperience === 'some'} onClick={() => updateData('pastExperience', 'some')} small />
                                <OptionBtn label="None" sub="First time" active={data.pastExperience === 'none'} onClick={() => updateData('pastExperience', 'none')} small />
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-bold mb-2">Search Concept Comfort</label>
                            <div className="grid grid-cols-1 gap-2">
                                <OptionBtn label="Expert" sub="Knows relevance, synonyms, etc." active={data.searchConceptComfort === 'expert'} onClick={() => updateData('searchConceptComfort', 'expert')} small />
                                <OptionBtn label="Need Basics" sub="Understands generally" active={data.searchConceptComfort === 'need_basics'} onClick={() => updateData('searchConceptComfort', 'need_basics')} small />
                                <OptionBtn label="Need Training" sub="New to concepts" active={data.searchConceptComfort === 'need_training'} onClick={() => updateData('searchConceptComfort', 'need_training')} small />
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-bold mb-2">Ongoing Consultation</label>
                            <div className="grid grid-cols-1 gap-2">
                                <OptionBtn label="Yes" sub="Want office hours" active={data.wantsOngoingConsultation === 'yes'} onClick={() => updateData('wantsOngoingConsultation', 'yes')} small />
                                <OptionBtn label="Maybe" sub="Might need help" active={data.wantsOngoingConsultation === 'maybe'} onClick={() => updateData('wantsOngoingConsultation', 'maybe')} small />
                                <OptionBtn label="Self-Sufficient" sub="Will handle it" active={data.wantsOngoingConsultation === 'no'} onClick={() => updateData('wantsOngoingConsultation', 'no')} small />
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <NavButtons onBack={onBack} onNext={onNext} nextLabel="Generate Scope" />
        </div>
    )
}
