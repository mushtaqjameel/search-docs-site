'use client'

import { HelpCircle, Wrench, Cpu, DollarSign, Clock, CheckCircle, AlertTriangle } from 'lucide-react'
import { OptionBtn, NavButtons, SectionHeader, ExampleBox } from '../shared'

/**
 * Step 3: Discovery & Remediation - Data problem awareness and approach
 */
export function StepRemediation({ data, updateData, onBack, onNext }) {
    return (
        <div className="animate-in fade-in slide-in-from-right-4 duration-300">
            <div className="mb-8">
                <h2 className="text-3xl font-bold mb-2">Discovery & Remediation</h2>
                <p className="text-neutral-500">How well do they understand their data problems? What's the approach to fixing gaps?</p>
            </div>

            <div className="space-y-8">
                {/* Data Problem Awareness */}
                <div className="p-6 border rounded-xl bg-neutral-50 dark:bg-neutral-900">
                    <SectionHeader icon={HelpCircle} title="Data Problem Awareness" subtitle="How much do they understand about their data gaps?" />
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
                        <OptionBtn
                            label="Clear Understanding"
                            icon={<CheckCircle size={18} className="text-green-500" />}
                            sub="They know exactly what's missing and where"
                            active={data.dataProblemAwareness === 'clear'}
                            onClick={() => updateData('dataProblemAwareness', 'clear')}
                        />
                        <OptionBtn
                            label="Some Idea"
                            icon={<HelpCircle size={18} className="text-yellow-500" />}
                            sub="They have a sense but need help auditing"
                            active={data.dataProblemAwareness === 'some_idea'}
                            onClick={() => updateData('dataProblemAwareness', 'some_idea')}
                        />
                        <OptionBtn
                            label="Unknown"
                            icon={<AlertTriangle size={18} className="text-red-500" />}
                            sub="Need full discovery exercise"
                            active={data.dataProblemAwareness === 'unknown'}
                            onClick={() => updateData('dataProblemAwareness', 'unknown')}
                        />
                    </div>
                    <ExampleBox>
                        <strong>Clear:</strong> "We know 30% of products lack descriptions and our certification data is in PDFs."<br />
                        <strong>Unknown:</strong> "We're not sure why search doesn't work well."
                    </ExampleBox>
                </div>

                {/* Remediation Approach */}
                <div className="p-6 border rounded-xl bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-800">
                    <SectionHeader icon={Wrench} title="Remediation Approach" subtitle="How should data gaps be addressed?" />
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
                        <OptionBtn
                            label="Pay Now"
                            icon={<DollarSign size={18} className="text-green-500" />}
                            sub="Fix data before launch. Higher upfront, better outcomes, no technical debt."
                            active={data.remediationApproach === 'pay_now'}
                            onClick={() => updateData('remediationApproach', 'pay_now')}
                        />
                        <OptionBtn
                            label="Pay Later"
                            icon={<Clock size={18} className="text-yellow-500" />}
                            sub="Launch with gaps, iterate post-launch. Faster start, documented risk."
                            active={data.remediationApproach === 'pay_later'}
                            onClick={() => updateData('remediationApproach', 'pay_later')}
                        />
                        <OptionBtn
                            label="AI Enrichment"
                            icon={<Cpu size={18} className="text-blue-500" />}
                            sub="Generate missing content with AI. Faster than manual, needs approval process."
                            active={data.remediationApproach === 'ai'}
                            onClick={() => updateData('remediationApproach', 'ai')}
                        />
                    </div>
                </div>

                {/* AI Approval (if AI selected) */}
                {data.remediationApproach === 'ai' && (
                    <div className="p-6 border rounded-xl bg-neutral-50 dark:bg-neutral-900">
                        <SectionHeader icon={Cpu} title="AI Content Approval" subtitle="Who reviews AI-generated content before publishing?" />
                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
                            <OptionBtn
                                label="Internal Team"
                                sub="Client has capacity to review"
                                active={data.aiApprovalCapacity === 'internal'}
                                onClick={() => updateData('aiApprovalCapacity', 'internal')}
                            />
                            <OptionBtn
                                label="Need Assistance"
                                sub="We help with review process"
                                active={data.aiApprovalCapacity === 'assisted'}
                                onClick={() => updateData('aiApprovalCapacity', 'assisted')}
                            />
                            <OptionBtn
                                label="No Capacity"
                                sub="Can't review AI content"
                                active={data.aiApprovalCapacity === 'none'}
                                onClick={() => updateData('aiApprovalCapacity', 'none')}
                            />
                        </div>
                    </div>
                )}
            </div>

            <NavButtons onBack={onBack} onNext={onNext} />
        </div>
    )
}
