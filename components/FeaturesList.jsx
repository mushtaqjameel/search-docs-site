'use client'

import { useState, useEffect, useRef } from 'react'
import { Search, Brain, Lightbulb, Target, Shield, BarChart, ChevronDown, ChevronUp, ExternalLink, Link2, Users, Zap } from 'lucide-react'

// Import data from JSON files
import featuresData from '../data/features.json'
import bucketsData from '../data/buckets.json'

// Import shared components
import { Alert } from './shared'
import { BucketOverview, FeatureModal } from './features'
import { pillarColors } from '../constants/colors'

// Extract features array from imported data
const features = featuresData.features

// Build bucketInfo with icon references (icons can't be in JSON)
const bucketIcons = {
    core: Search,
    smart: Brain,
    discovery: Lightbulb,
    merchandising: Target,
    recovery: Shield,
    analytics: BarChart
}

const bucketInfo = Object.fromEntries(
    Object.entries(bucketsData.buckets).map(([key, bucket]) => [
        key,
        { ...bucket, icon: bucketIcons[key] }
    ])
)

// bucketDetails is the same as buckets but with icons added
const bucketDetails = bucketInfo

export default function FeaturesList() {
    const [filter, setFilter] = useState('all')
    const [search, setSearch] = useState('')
    const [expanded, setExpanded] = useState({})
    const [modalFeature, setModalFeature] = useState(null)
    const [linkCopied, setLinkCopied] = useState(false)
    const [bucketOverviewExpanded, setBucketOverviewExpanded] = useState(false)
    const featureRefs = useRef({})

    // Parse URL params for initial filter and feature deep linking
    useEffect(() => {
        if (typeof window !== 'undefined') {
            const params = new URLSearchParams(window.location.search)
            const bucketParam = params.get('bucket')
            const featureParam = params.get('feature')

            if (bucketParam && bucketInfo[bucketParam]) {
                setFilter(bucketParam)
            }

            // Deep link to specific feature - open modal
            if (featureParam) {
                const feature = features.find(f => f.id === featureParam)
                if (feature) {
                    setFilter(feature.bucket)
                    setExpanded({ [featureParam]: true })
                    setModalFeature(feature)
                    // Scroll to feature after render
                    setTimeout(() => {
                        featureRefs.current[featureParam]?.scrollIntoView({ behavior: 'smooth', block: 'center' })
                    }, 100)
                }
            }
        }
    }, [])

    // Reset bucket overview when filter changes
    useEffect(() => {
        setBucketOverviewExpanded(false)
    }, [filter])

    const toggleExpand = (id) => {
        setExpanded(prev => ({ ...prev, [id]: !prev[id] }))
    }

    const openFeatureModal = (feature, e) => {
        e.stopPropagation()
        setModalFeature(feature)
    }

    const closeModal = () => {
        setModalFeature(null)
    }

    const copyFeatureLink = async (id, e) => {
        e.stopPropagation()
        const url = `${window.location.origin}/features?feature=${id}`
        try {
            await navigator.clipboard.writeText(url)
            setLinkCopied(true)
            setTimeout(() => setLinkCopied(false), 2000)
        } catch (err) {
            // Fallback for browsers that don't support clipboard API
            const textArea = document.createElement('textarea')
            textArea.value = url
            document.body.appendChild(textArea)
            textArea.select()
            document.execCommand('copy')
            document.body.removeChild(textArea)
            setLinkCopied(true)
            setTimeout(() => setLinkCopied(false), 2000)
        }
    }

    const filteredFeatures = features.filter(f => {
        const matchesBucket = filter === 'all' || f.bucket === filter
        const matchesSearch = f.title.toLowerCase().includes(search.toLowerCase()) ||
            f.desc.toLowerCase().includes(search.toLowerCase())
        return matchesBucket && matchesSearch
    })

    return (
        <div className="features-container">
            {/* Filter Bar */}
            <div className="filter-bar">
                <div className="filter-buttons">
                    <button className={`filter-btn ${filter === 'all' ? 'active' : ''}`} onClick={() => setFilter('all')}>All</button>
                    {Object.entries(bucketInfo).map(([key, info]) => (
                        <button key={key} className={`filter-btn ${filter === key ? 'active' : ''}`} onClick={() => setFilter(key)}>
                            <info.icon size={16} /> {info.label}
                        </button>
                    ))}
                </div>
                <input
                    type="text"
                    placeholder="Search features..."
                    className="search-input"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                />
            </div>

            {/* Bucket Overview - show when a specific bucket is filtered */}
            {filter !== 'all' && !search && (
                <BucketOverview
                    bucketKey={filter}
                    bucketDetails={bucketDetails}
                    bucketInfo={bucketInfo}
                    isExpanded={bucketOverviewExpanded}
                    onToggle={() => setBucketOverviewExpanded(!bucketOverviewExpanded)}
                />
            )}

            {/* Grid */}
            <div className="features-grid">
                {filteredFeatures.map(feature => {
                    const isExpanded = expanded[feature.id]

                    return (
                        <FeatureCard
                            key={feature.id}
                            feature={feature}
                            isExpanded={isExpanded}
                            bucketInfo={bucketInfo}
                            onToggle={() => toggleExpand(feature.id)}
                            onOpenModal={(e) => openFeatureModal(feature, e)}
                            onCopyLink={copyFeatureLink}
                            ref={el => featureRefs.current[feature.id] = el}
                        />
                    )
                })}
            </div>

            {/* Full Page Modal */}
            {modalFeature && (
                <FeatureModal
                    feature={modalFeature}
                    bucketInfo={bucketInfo}
                    linkCopied={linkCopied}
                    onCopyLink={copyFeatureLink}
                    onClose={closeModal}
                />
            )}

            <style jsx>{`
                .features-container {
                    margin-top: 2rem;
                }
                .filter-bar {
                    display: flex;
                    flex-wrap: wrap;
                    gap: 1rem;
                    margin-bottom: 2rem;
                    padding-bottom: 1rem;
                    border-bottom: 1px solid #eee;
                    justify-content: space-between;
                    align-items: center;
                }
                .filter-buttons {
                    display: flex;
                    flex-wrap: wrap;
                    gap: 0.5rem;
                }
                .filter-btn {
                    display: flex;
                    align-items: center;
                    gap: 6px;
                    padding: 6px 12px;
                    border-radius: 6px;
                    border: 1px solid #ddd;
                    background: white;
                    cursor: pointer;
                    font-size: 0.9rem;
                    transition: all 0.2s;
                }
                .filter-btn:hover {
                    background: #f5f5f5;
                }
                .filter-btn.active {
                    background: #000;
                    color: white;
                    border-color: #000;
                }
                .search-input {
                    padding: 8px 12px;
                    border: 1px solid #ddd;
                    border-radius: 6px;
                    font-size: 0.9rem;
                }
                .features-grid {
                    display: grid;
                    grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
                    gap: 1.5rem;
                }
                :global(.dark) .filter-btn {
                    background: #111;
                    border-color: #333;
                    color: #ccc;
                }
                :global(.dark) .filter-btn:hover {
                    background: #222;
                }
                :global(.dark) .filter-btn.active {
                    background: #fff;
                    color: #000;
                    border-color: #fff;
                }
                :global(.dark) .search-input {
                    background: #111;
                    border-color: #333;
                    color: white;
                }
            `}</style>
        </div>
    )
}

/**
 * Feature Card Component
 */
import React from 'react'

const FeatureCard = React.forwardRef(function FeatureCard(
    { feature, isExpanded, bucketInfo, onToggle, onOpenModal, onCopyLink },
    ref
) {
    return (
        <div
            ref={ref}
            className={`feature-card ${isExpanded ? 'ring-2 ring-indigo-500' : ''}`}
            onClick={onToggle}
        >
            <div className="feature-header">
                <div className="feature-title-row">
                    <span className="feature-title">{feature.title}</span>
                    {isExpanded ? <ChevronUp size={16} className="text-neutral-400" /> : <ChevronDown size={16} className="text-neutral-400" />}
                </div>

                <div className="pillars flex gap-1">
                    <div className="w-2.5 h-2.5 rounded-full" style={{ background: pillarColors[feature.pillars.data] }} title={`Data: ${feature.pillars.data}`} />
                    <div className="w-2.5 h-2.5 rounded-full" style={{ background: pillarColors[feature.pillars.gov] }} title={`Governance: ${feature.pillars.gov}`} />
                    <div className="w-2.5 h-2.5 rounded-full" style={{ background: pillarColors[feature.pillars.safe] }} title={`Safety: ${feature.pillars.safe}`} />
                </div>
            </div>

            <div className="feature-bucket-badge" style={{ background: bucketInfo[feature.bucket].color, color: 'white' }}>
                {bucketInfo[feature.bucket].label.split(' — ')[0]}
            </div>

            {isExpanded && (
                <div className="feature-details">
                    <div className="space-y-2">
                        <p><strong className="text-neutral-700 dark:text-neutral-300">What It Does:</strong> {feature.desc}</p>
                        <p><strong className="text-neutral-700 dark:text-neutral-300">B2B Value:</strong> {feature.value}</p>
                        <p><strong className="text-neutral-700 dark:text-neutral-300">Data Required:</strong> {feature.dataRequired}</p>
                        <p><strong className="text-neutral-700 dark:text-neutral-300">Implementation:</strong> {feature.implementation}</p>
                    </div>

                    {/* Personas and Problems */}
                    {(feature.personas || feature.problemsSolved) && (
                        <div className="mt-3 flex flex-wrap gap-2">
                            {feature.personas?.map(p => (
                                <span key={p} className="text-xs px-2 py-1 rounded bg-indigo-50 text-indigo-700 dark:bg-indigo-900/20 dark:text-indigo-300 flex items-center gap-1">
                                    <Users size={10} /> {p}
                                </span>
                            ))}
                            {feature.problemsSolved?.map(p => (
                                <span key={p} className="text-xs px-2 py-1 rounded bg-orange-50 text-orange-700 dark:bg-orange-900/20 dark:text-orange-300 flex items-center gap-1">
                                    <Zap size={10} /> {p}
                                </span>
                            ))}
                        </div>
                    )}

                    {feature.alert && (
                        <div className="mt-3">
                            <Alert type={feature.alert.type} text={feature.alert.text} />
                        </div>
                    )}

                    {/* Full Content Button */}
                    {feature.fullContent && (
                        <div className="mt-4">
                            <button
                                onClick={onOpenModal}
                                className="w-full py-2 px-4 bg-indigo-50 dark:bg-indigo-900/30 hover:bg-indigo-100 dark:hover:bg-indigo-900/50 text-indigo-700 dark:text-indigo-300 rounded-lg font-bold text-sm flex items-center justify-center gap-2 transition-colors"
                            >
                                <ExternalLink size={14} /> Read Full Details
                            </button>
                        </div>
                    )}

                    <div className="mt-3 pt-3 border-t border-dashed border-neutral-200 dark:border-neutral-700 flex justify-between items-center">
                        <div className="flex items-center gap-2">
                            <div className="text-xs uppercase font-bold text-neutral-400">Investment:</div>
                            <div className={`text-xs font-bold px-2 py-1 rounded ${
                                feature.badge === 'MVP' ? 'bg-neutral-100 text-neutral-600 dark:bg-neutral-800 dark:text-neutral-400' :
                                feature.badge === 'STANDARD' ? 'bg-green-100 text-green-700 dark:bg-green-900/20 dark:text-green-300' :
                                feature.badge === 'POLISHED' ? 'bg-cyan-100 text-cyan-700 dark:bg-cyan-900/20 dark:text-cyan-300' :
                                'bg-purple-100 text-purple-700 dark:bg-purple-900/20 dark:text-purple-300'
                            }`}>
                                {feature.badge}
                            </div>
                        </div>
                        <button
                            onClick={(e) => onCopyLink(feature.id, e)}
                            className="text-xs text-neutral-400 hover:text-indigo-500 flex items-center gap-1 transition-colors"
                            title="Copy link to this feature"
                        >
                            <Link2 size={12} /> Share
                        </button>
                    </div>
                </div>
            )}

            <style jsx>{`
                .feature-card {
                    border: 1px solid #e5e5e5;
                    border-radius: 12px;
                    padding: 1.5rem;
                    cursor: pointer;
                    transition: all 0.2s;
                    background: white;
                }
                :global(.dark) .feature-card {
                    background: #111;
                    border-color: #333;
                }
                .feature-card:hover {
                    box-shadow: 0 10px 30px -10px rgba(0,0,0,0.1);
                    transform: translateY(-2px);
                    border-color: #ccc;
                }
                :global(.dark) .feature-card:hover {
                    border-color: #555;
                    box-shadow: 0 10px 30px -10px rgba(0,0,0,0.5);
                }
                .feature-header {
                    display: flex;
                    justify-content: space-between;
                    align-items: flex-start;
                    margin-bottom: 0.8rem;
                }
                .feature-title-row {
                    display: flex;
                    align-items: center;
                    gap: 8px;
                    flex: 1;
                }
                .feature-title {
                    font-weight: 700;
                    font-size: 1.1rem;
                }
                .feature-bucket-badge {
                    display: inline-block;
                    padding: 4px 8px;
                    border-radius: 4px;
                    font-size: 0.7rem;
                    font-weight: 700;
                    text-transform: uppercase;
                }
                .feature-details {
                    margin-top: 1.5rem;
                    padding-top: 1.5rem;
                    border-top: 1px dashed #eee;
                    font-size: 0.9rem;
                    line-height: 1.6;
                }
                :global(.dark) .feature-details {
                    border-color: #333;
                }
            `}</style>
        </div>
    )
})
