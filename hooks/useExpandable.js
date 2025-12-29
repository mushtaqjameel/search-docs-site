'use client'

import { useState, useCallback } from 'react'

/**
 * Hook for managing expand/collapse state for multiple items
 * @param {Object} initialState - Initial expanded state { id: boolean }
 * @returns {Object} - { expanded, toggle, expand, collapse, isExpanded, expandAll, collapseAll }
 */
export function useExpandable(initialState = {}) {
    const [expanded, setExpanded] = useState(initialState)

    const toggle = useCallback((id) => {
        setExpanded(prev => ({ ...prev, [id]: !prev[id] }))
    }, [])

    const expand = useCallback((id) => {
        setExpanded(prev => ({ ...prev, [id]: true }))
    }, [])

    const collapse = useCallback((id) => {
        setExpanded(prev => ({ ...prev, [id]: false }))
    }, [])

    const isExpanded = useCallback((id) => {
        return !!expanded[id]
    }, [expanded])

    const expandAll = useCallback((ids) => {
        const newState = {}
        ids.forEach(id => { newState[id] = true })
        setExpanded(prev => ({ ...prev, ...newState }))
    }, [])

    const collapseAll = useCallback(() => {
        setExpanded({})
    }, [])

    const setAllExpanded = useCallback((ids, value) => {
        const newState = {}
        ids.forEach(id => { newState[id] = value })
        setExpanded(newState)
    }, [])

    return {
        expanded,
        toggle,
        expand,
        collapse,
        isExpanded,
        expandAll,
        collapseAll,
        setAllExpanded,
        setExpanded
    }
}

/**
 * Hook for accordion behavior (only one expanded at a time)
 * @param {string} initialId - Initially expanded item ID
 * @returns {Object} - { expandedId, toggle, expand, collapse, isExpanded }
 */
export function useAccordion(initialId = null) {
    const [expandedId, setExpandedId] = useState(initialId)

    const toggle = useCallback((id) => {
        setExpandedId(prev => prev === id ? null : id)
    }, [])

    const expand = useCallback((id) => {
        setExpandedId(id)
    }, [])

    const collapse = useCallback(() => {
        setExpandedId(null)
    }, [])

    const isExpanded = useCallback((id) => {
        return expandedId === id
    }, [expandedId])

    return {
        expandedId,
        toggle,
        expand,
        collapse,
        isExpanded,
        setExpandedId
    }
}

/**
 * Hook for single boolean toggle
 * @param {boolean} initialValue - Initial value
 * @returns {Array} - [value, toggle, setValue]
 */
export function useToggle(initialValue = false) {
    const [value, setValue] = useState(initialValue)

    const toggle = useCallback(() => {
        setValue(prev => !prev)
    }, [])

    return [value, toggle, setValue]
}
