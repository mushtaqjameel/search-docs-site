'use client'

import { useState } from 'react'
import { Layers, Activity, Database, Sparkles, FlaskConical, GitCompare, ChevronDown, ChevronUp } from 'lucide-react'

// Import data from JSON file (single source of truth)
import capabilitiesData from '../data/capabilities.json'

// Map capability IDs to icons (icons can't be stored in JSON)
const capabilityIcons = {
    'search-experience-framework': Layers,
    'behavioral-analytics-engine': Activity,
    'multi-modal-ingestion': Database,
    'generative-enrichment': Sparkles,
    'ab-testing': FlaskConical,
    'interleaving-testing': GitCompare
}

// Build capabilities array with icons added
const capabilities = capabilitiesData.capabilities.map(cap => ({
    ...cap,
    icon: capabilityIcons[cap.id]
}))

export default function PlatformCapabilities() {
    const [expanded, setExpanded] = useState({})

    const toggleExpand = (id) => {
        setExpanded(prev => ({ ...prev, [id]: !prev[id] }))
    }

    return (
        <div className="platform-capabilities">
            <div className="capabilities-intro">
                <p className="text-lg text-neutral-600 dark:text-neutral-400 mb-6">
                    Platform capabilities are the foundational infrastructure components that power all search features.
                    Unlike features that buyers interact with directly, these are the engines, pipelines, and frameworks
                    that enable scalable, intelligent search experiences.
                </p>
            </div>

            <div className="capabilities-grid">
                {capabilities.map(cap => {
                    const Icon = cap.icon
                    const isExpanded = expanded[cap.id]

                    return (
                        <div
                            key={cap.id}
                            className={`capability-card ${isExpanded ? 'expanded' : ''}`}
                            onClick={() => toggleExpand(cap.id)}
                        >
                            <div className="capability-header">
                                <div className="capability-icon" style={{ background: cap.color }}>
                                    <Icon size={24} color="white" />
                                </div>
                                <div className="capability-title-section">
                                    <h3 className="capability-title">{cap.title}</h3>
                                    <p className="capability-tagline">{cap.tagline}</p>
                                </div>
                                <div className="capability-expand">
                                    {isExpanded ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                                </div>
                            </div>

                            {isExpanded && (
                                <div className="capability-content">
                                    <p className="capability-desc">{cap.desc}</p>

                                    <div className="capability-section">
                                        <h4>Key Features</h4>
                                        <ul>
                                            {cap.keyFeatures.map((feature, i) => (
                                                <li key={i}>{feature}</li>
                                            ))}
                                        </ul>
                                    </div>

                                    <div className="capability-section">
                                        <h4>Technical Details</h4>
                                        <ul>
                                            {cap.technicalDetails.map((detail, i) => (
                                                <li key={i}>{detail}</li>
                                            ))}
                                        </ul>
                                    </div>

                                    <div className="capability-section">
                                        <h4>Use Cases</h4>
                                        <ul>
                                            {cap.useCases.map((useCase, i) => (
                                                <li key={i}>{useCase}</li>
                                            ))}
                                        </ul>
                                    </div>
                                </div>
                            )}
                        </div>
                    )
                })}
            </div>

            <style jsx>{`
                .platform-capabilities {
                    margin-top: 2rem;
                }

                .capabilities-grid {
                    display: grid;
                    grid-template-columns: repeat(auto-fill, minmax(400px, 1fr));
                    gap: 1.5rem;
                }

                @media (max-width: 500px) {
                    .capabilities-grid {
                        grid-template-columns: 1fr;
                    }
                }

                .capability-card {
                    border: 2px solid #e5e5e5;
                    border-radius: 12px;
                    padding: 1.5rem;
                    cursor: pointer;
                    transition: all 0.2s;
                    background: white;
                }

                :global(.dark) .capability-card {
                    background: #111;
                    border-color: #333;
                }

                .capability-card:hover {
                    border-color: #ccc;
                    box-shadow: 0 4px 12px rgba(0,0,0,0.1);
                }

                :global(.dark) .capability-card:hover {
                    border-color: #555;
                }

                .capability-card.expanded {
                    border-color: #6366f1;
                }

                :global(.dark) .capability-card.expanded {
                    border-color: #818cf8;
                }

                .capability-header {
                    display: flex;
                    align-items: flex-start;
                    gap: 1rem;
                }

                .capability-icon {
                    width: 48px;
                    height: 48px;
                    border-radius: 10px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    flex-shrink: 0;
                }

                .capability-title-section {
                    flex: 1;
                }

                .capability-title {
                    font-size: 1.1rem;
                    font-weight: 700;
                    margin: 0 0 4px 0;
                }

                .capability-tagline {
                    font-size: 0.9rem;
                    color: #666;
                    margin: 0;
                }

                :global(.dark) .capability-tagline {
                    color: #999;
                }

                .capability-expand {
                    color: #999;
                }

                .capability-content {
                    margin-top: 1.5rem;
                    padding-top: 1.5rem;
                    border-top: 1px dashed #e5e5e5;
                }

                :global(.dark) .capability-content {
                    border-color: #333;
                }

                .capability-desc {
                    color: #444;
                    line-height: 1.6;
                    margin-bottom: 1.5rem;
                }

                :global(.dark) .capability-desc {
                    color: #bbb;
                }

                .capability-section {
                    margin-bottom: 1.25rem;
                }

                .capability-section h4 {
                    font-size: 0.85rem;
                    font-weight: 700;
                    text-transform: uppercase;
                    color: #666;
                    margin: 0 0 0.5rem 0;
                }

                :global(.dark) .capability-section h4 {
                    color: #888;
                }

                .capability-section ul {
                    margin: 0;
                    padding-left: 1.25rem;
                }

                .capability-section li {
                    font-size: 0.9rem;
                    color: #555;
                    margin-bottom: 0.35rem;
                    line-height: 1.5;
                }

                :global(.dark) .capability-section li {
                    color: #aaa;
                }
            `}</style>
        </div>
    )
}
