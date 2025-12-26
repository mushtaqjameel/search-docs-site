'use client'

import { useEffect, useRef, useState } from 'react'
import mermaid from 'mermaid'

// Initialize mermaid with configuration
mermaid.initialize({
    startOnLoad: false,
    theme: 'base',
    themeVariables: {
        primaryColor: '#e0e7ff',
        primaryTextColor: '#1e1b4b',
        primaryBorderColor: '#4338ca',
        lineColor: '#6366f1',
        secondaryColor: '#ffedd5',
        tertiaryColor: '#fff',
    },
    securityLevel: 'loose',
})

export default function Mermaid({ chart }) {
    const containerRef = useRef(null)
    const [svg, setSvg] = useState('')
    const [error, setError] = useState(null)
    const [mounted, setMounted] = useState(false)

    useEffect(() => {
        setMounted(true)
    }, [])

    useEffect(() => {
        if (!mounted || !chart) return

        const renderDiagram = async () => {
            try {
                // Generate a unique ID for this diagram
                const id = `mermaid-${Math.random().toString(36).substr(2, 9)}`

                // Use mermaid.render() to get SVG
                const { svg: renderedSvg } = await mermaid.render(id, chart.trim())
                setSvg(renderedSvg)
                setError(null)
            } catch (err) {
                console.error('Mermaid rendering error:', err)
                setError(err.message || 'Failed to render diagram')
            }
        }

        renderDiagram()
    }, [chart, mounted])

    // SSR placeholder
    if (!mounted) {
        return (
            <div className="mermaid my-6 p-4 bg-white rounded-lg border border-gray-100 shadow-sm flex justify-center min-h-[200px] items-center">
                <span className="text-gray-400">Loading diagram...</span>
            </div>
        )
    }

    if (error) {
        return (
            <div className="mermaid my-6 p-4 bg-red-50 rounded-lg border border-red-200 shadow-sm">
                <p className="text-red-600 text-sm">Diagram error: {error}</p>
            </div>
        )
    }

    return (
        <div
            ref={containerRef}
            className="mermaid my-6 p-4 bg-white rounded-lg border border-gray-100 shadow-sm flex justify-center overflow-x-auto"
            dangerouslySetInnerHTML={{ __html: svg }}
        />
    )
}

