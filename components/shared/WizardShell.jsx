'use client'

import { ArrowLeft, ArrowRight, RotateCcw, Copy, Check } from 'lucide-react'

/**
 * WizardHeader - Header section with icon, title, and reset button
 */
export function WizardHeader({ icon: Icon, iconColor = 'text-indigo-600', title, subtitle, onReset, showReset = false }) {
    return (
        <div className="bg-neutral-100 dark:bg-neutral-800 p-4 border-b border-neutral-200 dark:border-neutral-700">
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                    {Icon && <Icon className={iconColor} size={24} />}
                    <h3 className="font-bold text-lg">{title}</h3>
                </div>
                {showReset && (
                    <button
                        onClick={onReset}
                        className="text-sm text-neutral-500 hover:text-neutral-700 dark:hover:text-neutral-300 flex items-center gap-1"
                    >
                        <RotateCcw size={14} /> Start Over
                    </button>
                )}
            </div>
            {subtitle && <p className="text-sm text-neutral-500 mt-1">{subtitle}</p>}
        </div>
    )
}

/**
 * WizardProgress - Progress bar for multi-step wizards
 */
export function WizardProgress({ currentStep, totalSteps, color = 'bg-indigo-500' }) {
    return (
        <div className="flex border-b border-neutral-200 dark:border-neutral-700">
            {Array.from({ length: totalSteps }, (_, i) => (
                <div
                    key={i}
                    className={`flex-1 h-1 ${i <= currentStep ? color : 'bg-neutral-200 dark:bg-neutral-700'}`}
                />
            ))}
        </div>
    )
}

/**
 * WizardStepLabels - Step indicator labels below progress bar
 */
export function WizardStepLabels({ steps, currentStep, color = 'text-indigo-600 dark:text-indigo-400' }) {
    return (
        <div className="flex border-b border-neutral-200 dark:border-neutral-700 bg-neutral-50 dark:bg-neutral-800/50 overflow-x-auto">
            {steps.map((step, i) => (
                <div
                    key={step.id || i}
                    className={`flex-1 min-w-[80px] px-2 py-2 text-center text-xs font-medium ${
                        i === currentStep ? color : 'text-neutral-400'
                    }`}
                >
                    {step.title || step.label || step}
                </div>
            ))}
        </div>
    )
}

/**
 * WizardNav - Navigation buttons (Back/Continue/Finish)
 */
export function WizardNav({
    onBack,
    onNext,
    onFinish,
    canGoBack = true,
    canProceed = true,
    isLastStep = false,
    nextLabel = 'Continue',
    finishLabel = 'Finish',
    color = 'bg-indigo-600 hover:bg-indigo-700'
}) {
    return (
        <div className="mt-6 flex justify-between">
            {canGoBack && onBack ? (
                <button
                    onClick={onBack}
                    className="px-4 py-2 border border-neutral-300 dark:border-neutral-600 hover:bg-neutral-50 dark:hover:bg-neutral-800 rounded-lg font-medium flex items-center gap-2"
                >
                    <ArrowLeft size={16} /> Back
                </button>
            ) : <div />}

            {!isLastStep && onNext && (
                <button
                    onClick={onNext}
                    disabled={!canProceed}
                    className={`px-4 py-2 ${color} disabled:bg-neutral-300 disabled:cursor-not-allowed text-white rounded-lg font-medium flex items-center gap-2`}
                >
                    {nextLabel} <ArrowRight size={16} />
                </button>
            )}

            {isLastStep && onFinish && (
                <button
                    onClick={onFinish}
                    className={`px-4 py-2 ${color} text-white rounded-lg font-medium flex items-center gap-2`}
                >
                    {finishLabel} <ArrowRight size={16} />
                </button>
            )}
        </div>
    )
}

/**
 * WizardResultHeader - Header for results section with copy button
 */
export function WizardResultHeader({ label, value, onCopy, copied = false }) {
    return (
        <div className="p-4 bg-indigo-50 dark:bg-indigo-900/20 rounded-lg border border-indigo-200 dark:border-indigo-800">
            <div className="flex items-start justify-between">
                <div>
                    <div className="text-sm text-indigo-600 dark:text-indigo-400 font-medium mb-1">{label}</div>
                    <div className="font-bold text-lg">{value}</div>
                </div>
                {onCopy && (
                    <button
                        onClick={onCopy}
                        className="p-2 text-indigo-600 dark:text-indigo-400 hover:bg-indigo-100 dark:hover:bg-indigo-900/40 rounded-lg transition-colors"
                        title="Copy results"
                    >
                        {copied ? <Check size={18} /> : <Copy size={18} />}
                    </button>
                )}
            </div>
        </div>
    )
}

/**
 * WizardShell - Complete wrapper combining all wizard components
 */
export default function WizardShell({
    // Header props
    icon,
    iconColor,
    title,
    subtitle,
    onReset,

    // Progress props
    currentStep,
    totalSteps,
    steps,
    showStepLabels = false,
    progressColor = 'bg-indigo-500',

    // Navigation props
    onBack,
    onNext,
    onFinish,
    canGoBack,
    canProceed,
    isLastStep,
    nextLabel,
    finishLabel,
    navColor,

    // Content
    children
}) {
    return (
        <div className="border border-neutral-200 dark:border-neutral-700 rounded-xl overflow-hidden">
            <WizardHeader
                icon={icon}
                iconColor={iconColor}
                title={title}
                subtitle={subtitle}
                onReset={onReset}
                showReset={currentStep > 0}
            />

            {totalSteps > 0 && (
                <WizardProgress
                    currentStep={currentStep}
                    totalSteps={totalSteps}
                    color={progressColor}
                />
            )}

            {showStepLabels && steps && (
                <WizardStepLabels
                    steps={steps}
                    currentStep={currentStep}
                />
            )}

            <div className="p-6">
                {children}

                <WizardNav
                    onBack={onBack}
                    onNext={onNext}
                    onFinish={onFinish}
                    canGoBack={canGoBack !== false && currentStep > 0}
                    canProceed={canProceed}
                    isLastStep={isLastStep}
                    nextLabel={nextLabel}
                    finishLabel={finishLabel}
                    color={navColor}
                />
            </div>
        </div>
    )
}
