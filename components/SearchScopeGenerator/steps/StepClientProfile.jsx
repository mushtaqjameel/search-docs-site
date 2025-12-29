'use client'

import { Briefcase, Calendar, Target, Zap } from 'lucide-react'
import { OptionBtn, PriorityChip, PRIORITY_OPTIONS, NavButtons, SectionHeader } from '../shared'

/**
 * Step 1: Client Profile - Industry, timeline, pain points
 */
export function StepClientProfile({ data, updateData, togglePriority, onNext }) {
    return (
        <div className="animate-in fade-in slide-in-from-right-4 duration-300">
            <div className="mb-8">
                <h2 className="text-3xl font-bold mb-2">Client Profile</h2>
                <p className="text-neutral-500">Basic context about the client and engagement.</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div>
                    <SectionHeader icon={Briefcase} title="Industry" />
                    <div className="grid grid-cols-2 gap-3">
                        <OptionBtn label="Industrial / MRO" sub="Parts, tools, equipment" active={data.industry === 'industrial'} onClick={() => updateData('industry', 'industrial')} />
                        <OptionBtn label="Electrical" sub="Components & supplies" active={data.industry === 'electrical'} onClick={() => updateData('industry', 'electrical')} />
                        <OptionBtn label="HVAC / Plumbing" sub="Mechanical systems" active={data.industry === 'hvac'} onClick={() => updateData('industry', 'hvac')} />
                        <OptionBtn label="Other B2B" sub="General distribution" active={data.industry === 'other'} onClick={() => updateData('industry', 'other')} />
                    </div>
                </div>

                <div>
                    <SectionHeader icon={Calendar} title="Timeline" />
                    <div className="grid grid-cols-1 gap-3">
                        <OptionBtn label="Flexible" icon={<Calendar size={16} />} sub="Phased approach OK, no hard date" active={data.timeline === 'flexible'} onClick={() => updateData('timeline', 'flexible')} />
                        <OptionBtn label="Moderate" icon={<Calendar size={16} />} sub="Target date with some flexibility" active={data.timeline === 'moderate'} onClick={() => updateData('timeline', 'moderate')} />
                        <OptionBtn label="Tight" icon={<Zap size={16} />} sub="Hard launch date, minimal scope flexibility" active={data.timeline === 'tight'} onClick={() => updateData('timeline', 'tight')} />
                    </div>
                </div>
            </div>

            <div className="mt-8">
                <SectionHeader icon={Target} title="Pain Points" subtitle="What problems are they trying to solve? Select all that apply." />
                <div className="flex flex-wrap gap-2">
                    {PRIORITY_OPTIONS.map(option => (
                        <PriorityChip
                            key={option.id}
                            label={option.label}
                            id={option.id}
                            active={data.priorities.includes(option.id)}
                            onToggle={togglePriority}
                        />
                    ))}
                </div>
            </div>

            <NavButtons onNext={onNext} />
        </div>
    )
}
