'use client'

import { useEffect, useRef } from 'react'
import mermaid from 'mermaid'

mermaid.initialize({
    startOnLoad: true,
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
    const ref = useRef(null)

    useEffect(() => {
        if (ref.current) {
            mermaid.contentLoaded()
            // Re-render specifically for this container
            mermaid.init(undefined, ref.current);
        }
    }, [chart])

    return (
        <div className="mermaid my-6 p-4 bg-white rounded-lg border border-gray-100 shadow-sm flex justify-center" ref={ref}>
            {chart}
        </div>
    )
}
