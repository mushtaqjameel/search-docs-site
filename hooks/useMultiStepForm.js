'use client'

import { useState, useCallback, useMemo } from 'react'

/**
 * Hook for managing multi-step form state
 * @param {Object} config - { steps, initialData, onComplete }
 * @returns {Object} - Form state and navigation helpers
 */
export function useMultiStepForm({ steps = [], initialData = {}, onComplete }) {
    const [currentStep, setCurrentStep] = useState(1)
    const [data, setData] = useState(initialData)
    const [launched, setLaunched] = useState(false)

    const totalSteps = steps.length

    const updateData = useCallback((key, value) => {
        setData(prev => ({ ...prev, [key]: value }))
    }, [])

    const updateMultiple = useCallback((updates) => {
        setData(prev => ({ ...prev, ...updates }))
    }, [])

    const toggleArrayItem = useCallback((key, item) => {
        setData(prev => ({
            ...prev,
            [key]: prev[key]?.includes(item)
                ? prev[key].filter(i => i !== item)
                : [...(prev[key] || []), item]
        }))
    }, [])

    const nextStep = useCallback(() => {
        if (currentStep < totalSteps) {
            setCurrentStep(prev => prev + 1)
        } else if (onComplete) {
            onComplete(data)
        }
    }, [currentStep, totalSteps, data, onComplete])

    const prevStep = useCallback(() => {
        if (currentStep > 1) {
            setCurrentStep(prev => prev - 1)
        }
    }, [currentStep])

    const goToStep = useCallback((step) => {
        if (step >= 1 && step <= totalSteps) {
            setCurrentStep(step)
        }
    }, [totalSteps])

    const reset = useCallback(() => {
        setCurrentStep(1)
        setData(initialData)
        setLaunched(false)
    }, [initialData])

    const launch = useCallback(() => {
        setLaunched(true)
    }, [])

    const currentStepConfig = useMemo(() => {
        return steps[currentStep - 1] || null
    }, [steps, currentStep])

    const isFirstStep = currentStep === 1
    const isLastStep = currentStep === totalSteps
    const progress = (currentStep / totalSteps) * 100

    return {
        // State
        currentStep,
        data,
        launched,
        totalSteps,
        currentStepConfig,

        // Computed
        isFirstStep,
        isLastStep,
        progress,

        // Actions
        updateData,
        updateMultiple,
        toggleArrayItem,
        nextStep,
        prevStep,
        goToStep,
        reset,
        launch,
        setData,
        setCurrentStep,
        setLaunched
    }
}

/**
 * Hook for step validation
 * @param {Object} data - Current form data
 * @param {Object} rules - Validation rules per step { stepId: { field: validator } }
 * @returns {Object} - { isValid, errors, validate }
 */
export function useStepValidation(data, rules = {}) {
    const [errors, setErrors] = useState({})

    const validate = useCallback((stepId) => {
        const stepRules = rules[stepId] || {}
        const newErrors = {}
        let isValid = true

        Object.entries(stepRules).forEach(([field, validator]) => {
            const error = validator(data[field], data)
            if (error) {
                newErrors[field] = error
                isValid = false
            }
        })

        setErrors(newErrors)
        return isValid
    }, [data, rules])

    const clearErrors = useCallback(() => {
        setErrors({})
    }, [])

    const isValid = Object.keys(errors).length === 0

    return {
        errors,
        isValid,
        validate,
        clearErrors
    }
}
