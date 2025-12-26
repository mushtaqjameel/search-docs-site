'use client'

import { useState } from 'react'
import { Layers, Activity, Database, Sparkles, FlaskConical, GitCompare, ChevronDown, ChevronUp, Server, Cpu, Workflow } from 'lucide-react'

const capabilities = [
    {
        id: 'search-experience-framework',
        title: 'Search Experience Framework',
        icon: Layers,
        color: '#4ECDC4',
        tagline: 'Unified SDK for consistent search experiences',
        desc: 'A comprehensive SDK and component library that powers search interfaces across web, mobile, and embedded applications. Provides pre-built UI components, event tracking, and consistent behavior patterns.',
        keyFeatures: [
            'Pre-built search UI components (search bar, results grid, facets, filters)',
            'Event tracking and analytics integration out-of-the-box',
            'Responsive design for web, tablet, and mobile',
            'Accessibility compliance (WCAG 2.1 AA)',
            'Theming and customization APIs',
            'Session management and search history'
        ],
        technicalDetails: [
            'React/Vue/Angular component libraries',
            'REST and GraphQL API support',
            'WebSocket support for real-time updates',
            'CDN-delivered assets for performance'
        ],
        useCases: [
            'Rapid deployment of search interfaces across multiple properties',
            'Consistent user experience across B2B portals and customer-facing sites',
            'White-label search for partner integrations'
        ]
    },
    {
        id: 'behavioral-analytics-engine',
        title: 'Behavioral Analytics Engine',
        icon: Activity,
        color: '#9B59B6',
        tagline: 'Understand how buyers actually search',
        desc: 'Captures and analyzes every search interaction—queries, clicks, add-to-carts, and purchases—to build a complete picture of buyer behavior. Powers personalization, trending, and optimization insights.',
        keyFeatures: [
            'Real-time event streaming and aggregation',
            'Query-to-conversion funnel analysis',
            'Session replay and journey mapping',
            'Anomaly detection and alerting',
            'Cohort analysis and segmentation',
            'Search quality scoring'
        ],
        technicalDetails: [
            'Event schema with 50+ tracked interactions',
            'Sub-second latency for real-time dashboards',
            'Data retention configurable (30 days to unlimited)',
            'GDPR/CCPA compliant data handling'
        ],
        useCases: [
            'Identify high-volume queries with low conversion for optimization',
            'Track seasonal patterns and emerging product trends',
            'Measure ROI of search improvements'
        ]
    },
    {
        id: 'multi-modal-ingestion',
        title: 'Multi-Modal Ingestion Pipeline',
        icon: Database,
        color: '#E74C3C',
        tagline: 'Connect any data source to search',
        desc: 'A flexible data pipeline that ingests product catalogs, documents, images, and behavioral data from any source. Handles incremental updates, full refreshes, and real-time streaming.',
        keyFeatures: [
            'Connectors for ERP, PIM, DAM, and e-commerce platforms',
            'Support for CSV, JSON, XML, and proprietary formats',
            'Image and document processing (OCR, PDF extraction)',
            'Incremental and delta sync capabilities',
            'Data validation and quality scoring',
            'Transformation and enrichment pipelines'
        ],
        technicalDetails: [
            'REST API, SFTP, S3, and database connectors',
            'Webhook support for real-time updates',
            'Scalable to millions of SKUs',
            'Built-in retry and error handling'
        ],
        useCases: [
            'Sync catalog from SAP/Oracle/NetSuite nightly',
            'Process spec sheets and extract searchable attributes',
            'Real-time inventory updates from warehouse systems'
        ]
    },
    {
        id: 'generative-enrichment',
        title: 'Generative Data Enrichment Pipeline',
        icon: Sparkles,
        color: '#F39C12',
        tagline: 'AI-powered content generation at scale',
        desc: 'Uses large language models and computer vision to automatically generate missing product descriptions, extract attributes from images, and create searchable content from sparse data.',
        keyFeatures: [
            'Auto-generate product descriptions from specs',
            'Extract attributes from product images',
            'Categorization and taxonomy mapping',
            'Keyword and synonym generation',
            'Quality scoring and confidence levels',
            'Human-in-the-loop approval workflows'
        ],
        technicalDetails: [
            'GPT-4 and Claude integration for text generation',
            'CLIP and custom vision models for image analysis',
            'Batch processing for catalog-scale enrichment',
            'Configurable approval thresholds'
        ],
        useCases: [
            'Enrich 100K sparse catalog entries with rich descriptions',
            'Extract thread pitch and dimensions from fastener images',
            'Generate SEO-friendly content for product pages'
        ]
    },
    {
        id: 'ab-testing',
        title: 'A/B Testing Framework',
        icon: FlaskConical,
        color: '#3498DB',
        tagline: 'Data-driven search optimization',
        desc: 'Run controlled experiments to measure the impact of search changes—ranking algorithms, UI variations, synonym additions—with statistical rigor. Know what actually improves conversion.',
        keyFeatures: [
            'Traffic splitting with configurable percentages',
            'Statistical significance calculation',
            'Multi-variant testing (A/B/C/D)',
            'Automatic winner detection',
            'Segment-based targeting',
            'Revenue and conversion impact measurement'
        ],
        technicalDetails: [
            'Bayesian and frequentist statistical models',
            'Minimum detectable effect calculations',
            'Integration with analytics engine',
            'Experiment scheduling and auto-rollout'
        ],
        useCases: [
            'Test new ranking algorithm against baseline',
            'Compare two synonym configurations',
            'Measure conversion lift from UI changes'
        ]
    },
    {
        id: 'interleaving-testing',
        title: 'Interleaving Testing',
        icon: GitCompare,
        color: '#27AE60',
        tagline: 'Sensitive ranking comparison',
        desc: 'A more sensitive alternative to A/B testing for ranking changes. Interleaves results from two ranking algorithms in a single result set and measures which results users prefer through clicks.',
        keyFeatures: [
            'Team Draft and Balanced interleaving methods',
            'Per-query comparison (not per-user)',
            'Faster statistical convergence than A/B',
            'Click preference measurement',
            'Bias correction algorithms',
            'Works with low traffic volumes'
        ],
        technicalDetails: [
            'Team Draft interleaving implementation',
            'Balanced interleaving for fairness',
            'Credit assignment algorithms',
            'Integration with ranking pipeline'
        ],
        useCases: [
            'Compare ML ranking model versions',
            'Test semantic vs keyword ranking blend',
            'Evaluate personalization impact on relevance'
        ]
    }
]

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
