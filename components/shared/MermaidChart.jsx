'use client'

import { useEffect, useRef } from 'react'
import mermaid from 'mermaid'

/**
 * Mermaid Chart Component
 * Renders mermaid diagrams with proper initialization
 */
export function MermaidChart({ chart, id, className = '' }) {
    const containerRef = useRef(null)

    useEffect(() => {
        if (containerRef.current && chart) {
            mermaid.initialize({
                startOnLoad: false,
                theme: 'base',
                themeVariables: {
                    fontFamily: 'ui-sans-serif, system-ui, sans-serif',
                    fontSize: '14px'
                },
                flowchart: {
                    useMaxWidth: true,
                    htmlLabels: true,
                    curve: 'basis'
                }
            })

            const renderChart = async () => {
                try {
                    containerRef.current.innerHTML = ''
                    const { svg } = await mermaid.render(`mermaid-${id}`, chart)
                    containerRef.current.innerHTML = svg
                } catch (error) {
                    console.error('Mermaid rendering error:', error)
                }
            }

            renderChart()
        }
    }, [chart, id])

    return <div ref={containerRef} className={`mermaid-container overflow-x-auto ${className}`} />
}
