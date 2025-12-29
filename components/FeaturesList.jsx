'use client'

import { useState, useEffect, useRef } from 'react'

// Import data from JSON files
import featuresData from '../data/features.json'
import bucketsData from '../data/buckets.json'

// Import shared components and constants
import { BucketOverview, FeatureModal } from './features'
import { FeaturesListCard } from './features/FeaturesListCard'
import { bucketIcons, buildBucketInfo } from '../constants/bucketIcons'

// Extract features array from imported data
const features = featuresData.features

// Build bucketInfo using centralized function
const bucketInfo = buildBucketInfo(bucketsData)

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
                {filteredFeatures.map(feature => (
                    <FeaturesListCard
                        key={feature.id}
                        feature={feature}
                        isExpanded={expanded[feature.id]}
                        bucketInfo={bucketInfo}
                        onToggle={() => toggleExpand(feature.id)}
                        onOpenModal={(e) => openFeatureModal(feature, e)}
                        onCopyLink={copyFeatureLink}
                        ref={el => featureRefs.current[feature.id] = el}
                    />
                ))}
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
