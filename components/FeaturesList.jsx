'use client'

import { useState, useEffect, useRef } from 'react'
import { Search, Brain, Lightbulb, Target, Shield, BarChart, ChevronDown, ChevronUp, AlertTriangle, AlertCircle, CheckCircle, ExternalLink, Link2, Users, Zap, X, Info } from 'lucide-react'
import mermaid from 'mermaid'

// Import data from JSON files
import featuresData from '../data/features.json'
import bucketsData from '../data/buckets.json'

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

const pillarColors = {
    green: '#22c55e',
    yellow: '#eab308',
    red: '#ef4444'
};

const Alert = ({ type, text }) => {
    let icon = <AlertCircle size={16} />;
    let colorClass = 'bg-blue-50 text-blue-800 border-blue-200 dark:bg-blue-900/10 dark:text-blue-200 dark:border-blue-800';

    if (type === 'warning') {
        icon = <AlertTriangle size={16} />;
        colorClass = 'bg-yellow-50 text-yellow-800 border-yellow-200 dark:bg-yellow-900/10 dark:text-yellow-200 dark:border-yellow-800';
    } else if (type === 'danger') {
        icon = <AlertTriangle size={16} />;
        colorClass = 'bg-red-50 text-red-800 border-red-200 dark:bg-red-900/10 dark:text-red-200 dark:border-red-800';
    } else if (type === 'success') {
        icon = <CheckCircle size={16} />;
        colorClass = 'bg-green-50 text-green-800 border-green-200 dark:bg-green-900/10 dark:text-green-200 dark:border-green-800';
    }

    return (
        <div className={`mt-3 p-3 rounded-lg border text-sm flex gap-2 items-start ${colorClass}`}>
            <span className="mt-0.5">{icon}</span>
            <span>{text}</span>
        </div>
    );
};

// Mermaid Chart Component
const MermaidChart = ({ chart, id }) => {
    const containerRef = useRef(null);

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
            });

            const renderChart = async () => {
                try {
                    containerRef.current.innerHTML = '';
                    const { svg } = await mermaid.render(`mermaid-${id}`, chart);
                    containerRef.current.innerHTML = svg;
                } catch (error) {
                    console.error('Mermaid rendering error:', error);
                }
            };

            renderChart();
        }
    }, [chart, id]);

    return <div ref={containerRef} className="mermaid-container overflow-x-auto" />;
};

// Bucket Overview Component - Collapsible
const BucketOverview = ({ bucketKey, isExpanded, onToggle }) => {
    const details = bucketDetails[bucketKey];
    const info = bucketInfo[bucketKey];
    const Icon = info.icon;

    if (!details) return null;

    return (
        <div className="bucket-overview mb-6 rounded-xl border-2 overflow-hidden transition-all" style={{ borderColor: info.color }}>
            {/* Header - Always visible, clickable to toggle */}
            <button
                onClick={onToggle}
                className="w-full p-4 flex items-center justify-between cursor-pointer hover:opacity-90 transition-opacity"
                style={{ background: `linear-gradient(135deg, ${info.color}20, ${info.color}10)` }}
            >
                <div className="flex items-center gap-3">
                    <div className="p-2 rounded-lg" style={{ background: info.color }}>
                        <Icon size={20} className="text-white" />
                    </div>
                    <div className="text-left">
                        <h2 className="text-lg font-bold">{details.title}</h2>
                        <p className="text-neutral-500 dark:text-neutral-400 text-sm italic">{details.tagline}</p>
                    </div>
                </div>
                <div className="flex items-center gap-2 text-sm font-medium" style={{ color: info.color }}>
                    {isExpanded ? 'Hide Details' : 'Show Details'}
                    {isExpanded ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                </div>
            </button>

            {/* Expandable Content */}
            {isExpanded && (
                <div className="p-6 border-t" style={{ borderColor: `${info.color}30` }}>
                    <div className="grid md:grid-cols-2 gap-6">
                        {/* Left: Description & Value Props */}
                        <div className="space-y-4">
                            <div>
                                <h3 className="font-bold text-neutral-700 dark:text-neutral-300 mb-2 flex items-center gap-2">
                                    <Info size={16} style={{ color: info.color }} /> What This Bucket Does
                                </h3>
                                <p className="text-neutral-600 dark:text-neutral-400 text-sm leading-relaxed">
                                    {details.description}
                                </p>
                            </div>

                            {/* Changed from red/warning to bucket color - this is what we SOLVE */}
                            <div className="p-4 rounded-lg border" style={{
                                background: `${info.color}10`,
                                borderColor: `${info.color}30`
                            }}>
                                <h3 className="font-bold mb-2 flex items-center gap-2" style={{ color: info.color }}>
                                    <Target size={16} /> The Problem We Solve
                                </h3>
                                <p className="text-neutral-600 dark:text-neutral-400 text-sm">
                                    {details.whatItSolves}
                                </p>
                            </div>

                            <div>
                                <h3 className="font-bold text-neutral-700 dark:text-neutral-300 mb-2 flex items-center gap-2">
                                    <CheckCircle size={16} className="text-green-500" /> Key Value Props
                                </h3>
                                <ul className="space-y-1">
                                    {details.keyValueProps.map((prop, i) => (
                                        <li key={i} className="flex items-start gap-2 text-sm text-neutral-600 dark:text-neutral-400">
                                            <CheckCircle size={14} className="text-green-500 mt-0.5 shrink-0" />
                                            <span>{prop}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>

                        {/* Right: Mermaid Chart */}
                        <div className="flex items-center justify-center p-4 bg-neutral-50 dark:bg-neutral-900 rounded-lg min-h-[200px]">
                            <MermaidChart chart={details.chart} id={bucketKey} />
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default function FeaturesList() {
    const [filter, setFilter] = useState('all');
    const [search, setSearch] = useState('');
    const [expanded, setExpanded] = useState({});
    const [modalFeature, setModalFeature] = useState(null);
    const [linkCopied, setLinkCopied] = useState(false);
    const [bucketOverviewExpanded, setBucketOverviewExpanded] = useState(false);
    const featureRefs = useRef({});

    // Parse URL params for initial filter and feature deep linking
    useEffect(() => {
        if (typeof window !== 'undefined') {
            const params = new URLSearchParams(window.location.search);
            const bucketParam = params.get('bucket');
            const featureParam = params.get('feature');

            if (bucketParam && bucketInfo[bucketParam]) {
                setFilter(bucketParam);
            }

            // Deep link to specific feature - open modal
            if (featureParam) {
                const feature = features.find(f => f.id === featureParam);
                if (feature) {
                    setFilter(feature.bucket);
                    setExpanded({ [featureParam]: true });
                    setModalFeature(feature);
                    // Scroll to feature after render
                    setTimeout(() => {
                        featureRefs.current[featureParam]?.scrollIntoView({ behavior: 'smooth', block: 'center' });
                    }, 100);
                }
            }
        }
    }, []);

    // Reset bucket overview when filter changes
    useEffect(() => {
        setBucketOverviewExpanded(false);
    }, [filter]);

    const toggleExpand = (id) => {
        setExpanded(prev => ({ ...prev, [id]: !prev[id] }));
    };

    const openFeatureModal = (feature, e) => {
        e.stopPropagation();
        setModalFeature(feature);
    };

    const closeModal = () => {
        setModalFeature(null);
    };

    const copyFeatureLink = async (id, e) => {
        e.stopPropagation();
        const url = `${window.location.origin}/features?feature=${id}`;
        try {
            await navigator.clipboard.writeText(url);
            setLinkCopied(true);
            setTimeout(() => setLinkCopied(false), 2000);
        } catch (err) {
            // Fallback for browsers that don't support clipboard API
            const textArea = document.createElement('textarea');
            textArea.value = url;
            document.body.appendChild(textArea);
            textArea.select();
            document.execCommand('copy');
            document.body.removeChild(textArea);
            setLinkCopied(true);
            setTimeout(() => setLinkCopied(false), 2000);
        }
    };

    const filteredFeatures = features.filter(f => {
        const matchesBucket = filter === 'all' || f.bucket === filter;
        const matchesSearch = f.title.toLowerCase().includes(search.toLowerCase()) ||
            f.desc.toLowerCase().includes(search.toLowerCase());
        return matchesBucket && matchesSearch;
    });

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
                    isExpanded={bucketOverviewExpanded}
                    onToggle={() => setBucketOverviewExpanded(!bucketOverviewExpanded)}
                />
            )}

            {/* Grid */}
            <div className="features-grid">
                {filteredFeatures.map(feature => {
                    const isExpanded = expanded[feature.id];

                    return (
                        <div
                            key={feature.id}
                            ref={el => featureRefs.current[feature.id] = el}
                            className={`feature-card ${isExpanded ? 'ring-2 ring-indigo-500' : ''}`}
                            onClick={() => toggleExpand(feature.id)}
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
                                        <Alert type={feature.alert.type} text={feature.alert.text} />
                                    )}

                                    {/* Full Content Button */}
                                    {feature.fullContent && (
                                        <div className="mt-4">
                                            <button
                                                onClick={(e) => openFeatureModal(feature, e)}
                                                className="w-full py-2 px-4 bg-indigo-50 dark:bg-indigo-900/30 hover:bg-indigo-100 dark:hover:bg-indigo-900/50 text-indigo-700 dark:text-indigo-300 rounded-lg font-bold text-sm flex items-center justify-center gap-2 transition-colors"
                                            >
                                                <ExternalLink size={14} /> Read Full Details
                                            </button>
                                        </div>
                                    )}

                                    <div className="mt-3 pt-3 border-t border-dashed border-neutral-200 dark:border-neutral-700 flex justify-between items-center">
                                        <div className="flex items-center gap-2">
                                            <div className="text-xs uppercase font-bold text-neutral-400">Investment:</div>
                                            <div className={`text-xs font-bold px-2 py-1 rounded ${feature.badge === 'MVP' ? 'bg-neutral-100 text-neutral-600 dark:bg-neutral-800 dark:text-neutral-400' :
                                                feature.badge === 'STANDARD' ? 'bg-green-100 text-green-700 dark:bg-green-900/20 dark:text-green-300' :
                                                    feature.badge === 'POLISHED' ? 'bg-cyan-100 text-cyan-700 dark:bg-cyan-900/20 dark:text-cyan-300' :
                                                        'bg-purple-100 text-purple-700 dark:bg-purple-900/20 dark:text-purple-300'
                                                }`}>
                                                {feature.badge}
                                            </div>
                                        </div>
                                        <button
                                            onClick={(e) => copyFeatureLink(feature.id, e)}
                                            className="text-xs text-neutral-400 hover:text-indigo-500 flex items-center gap-1 transition-colors"
                                            title="Copy link to this feature"
                                        >
                                            <Link2 size={12} /> Share
                                        </button>
                                    </div>
                                </div>
                            )}
                        </div>
                    );
                })}
            </div>

            {/* Full Page Modal */}
            {modalFeature && (
                <div className="fixed inset-0 z-50 bg-white dark:bg-neutral-950 overflow-auto">
                    {/* Modal Header */}
                    <div className="sticky top-0 z-10 bg-white dark:bg-neutral-950 border-b border-neutral-200 dark:border-neutral-800 px-6 py-4">
                        <div className="max-w-4xl mx-auto flex items-center justify-between">
                            <div className="flex items-center gap-3">
                                <div className="feature-bucket-badge" style={{ background: bucketInfo[modalFeature.bucket].color, color: 'white' }}>
                                    {bucketInfo[modalFeature.bucket].label}
                                </div>
                                <h1 className="text-2xl font-bold">{modalFeature.title}</h1>
                            </div>
                            <button
                                onClick={closeModal}
                                className="p-2 hover:bg-neutral-100 dark:hover:bg-neutral-800 rounded-lg transition-colors"
                            >
                                <X size={24} />
                            </button>
                        </div>
                    </div>

                    {/* Modal Content */}
                    <div className="max-w-4xl mx-auto px-6 py-8">
                        {/* Quick Stats */}
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                            <div className="p-4 bg-neutral-50 dark:bg-neutral-900 rounded-lg text-center">
                                <div className="text-xs uppercase font-bold text-neutral-500 mb-1">Investment</div>
                                <div className={`text-sm font-bold px-2 py-1 rounded inline-block ${modalFeature.badge === 'MVP' ? 'bg-neutral-200 text-neutral-700 dark:bg-neutral-700 dark:text-neutral-300' :
                                    modalFeature.badge === 'STANDARD' ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300' :
                                        modalFeature.badge === 'POLISHED' ? 'bg-cyan-100 text-cyan-700 dark:bg-cyan-900/30 dark:text-cyan-300' :
                                            'bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-300'
                                    }`}>
                                    {modalFeature.badge}
                                </div>
                            </div>
                            <div className="p-4 bg-neutral-50 dark:bg-neutral-900 rounded-lg text-center">
                                <div className="text-xs uppercase font-bold text-neutral-500 mb-1">Data</div>
                                <div className="w-4 h-4 rounded-full mx-auto" style={{ background: pillarColors[modalFeature.pillars.data] }} />
                                <div className="text-xs mt-1 capitalize">{modalFeature.pillars.data}</div>
                            </div>
                            <div className="p-4 bg-neutral-50 dark:bg-neutral-900 rounded-lg text-center">
                                <div className="text-xs uppercase font-bold text-neutral-500 mb-1">Governance</div>
                                <div className="w-4 h-4 rounded-full mx-auto" style={{ background: pillarColors[modalFeature.pillars.gov] }} />
                                <div className="text-xs mt-1 capitalize">{modalFeature.pillars.gov}</div>
                            </div>
                            <div className="p-4 bg-neutral-50 dark:bg-neutral-900 rounded-lg text-center">
                                <div className="text-xs uppercase font-bold text-neutral-500 mb-1">Safety</div>
                                <div className="w-4 h-4 rounded-full mx-auto" style={{ background: pillarColors[modalFeature.pillars.safe] }} />
                                <div className="text-xs mt-1 capitalize">{modalFeature.pillars.safe}</div>
                            </div>
                        </div>

                        {/* Tags */}
                        <div className="flex flex-wrap gap-2 mb-8">
                            {modalFeature.personas?.map(p => (
                                <span key={p} className="px-3 py-1 rounded-full bg-indigo-50 text-indigo-700 dark:bg-indigo-900/30 dark:text-indigo-300 text-sm flex items-center gap-1">
                                    <Users size={12} /> {p}
                                </span>
                            ))}
                            {modalFeature.problemsSolved?.map(p => (
                                <span key={p} className="px-3 py-1 rounded-full bg-orange-50 text-orange-700 dark:bg-orange-900/30 dark:text-orange-300 text-sm flex items-center gap-1">
                                    <Zap size={12} /> {p}
                                </span>
                            ))}
                        </div>

                        {/* Alert if present */}
                        {modalFeature.alert && (
                            <div className="mb-8">
                                <Alert type={modalFeature.alert.type} text={modalFeature.alert.text} />
                            </div>
                        )}

                        {/* Main Content Sections */}
                        <div className="space-y-8">
                            {/* Overview */}
                            <section className="p-6 bg-neutral-50 dark:bg-neutral-900 rounded-xl">
                                <h2 className="text-lg font-bold mb-4 flex items-center gap-2">
                                    <Search size={20} className="text-indigo-500" /> Overview
                                </h2>
                                <div className="space-y-4">
                                    <div>
                                        <h3 className="font-bold text-neutral-700 dark:text-neutral-300 mb-1">What It Does</h3>
                                        <p className="text-neutral-600 dark:text-neutral-400">{modalFeature.desc}</p>
                                    </div>
                                    <div>
                                        <h3 className="font-bold text-neutral-700 dark:text-neutral-300 mb-1">B2B Value</h3>
                                        <p className="text-neutral-600 dark:text-neutral-400">{modalFeature.value}</p>
                                    </div>
                                </div>
                            </section>

                            {/* What It Solves */}
                            {modalFeature.fullContent && (
                                <section className="p-6 bg-indigo-50 dark:bg-indigo-900/20 rounded-xl border border-indigo-100 dark:border-indigo-800">
                                    <h2 className="text-lg font-bold mb-4 flex items-center gap-2 text-indigo-800 dark:text-indigo-200">
                                        <Target size={20} /> The Problem This Solves
                                    </h2>
                                    <p className="text-indigo-700 dark:text-indigo-300">{modalFeature.fullContent.whatItSolves}</p>
                                </section>
                            )}

                            {/* Why It's Hard */}
                            {modalFeature.fullContent?.whyItsHard && (
                                <section className="p-6 bg-red-50 dark:bg-red-900/20 rounded-xl border border-red-100 dark:border-red-800">
                                    <h2 className="text-lg font-bold mb-4 flex items-center gap-2 text-red-800 dark:text-red-200">
                                        <AlertTriangle size={20} /> Why This Is Hard
                                    </h2>
                                    <p className="text-red-700 dark:text-red-300">{modalFeature.fullContent.whyItsHard}</p>

                                    {/* Technical Challenges */}
                                    {modalFeature.fullContent.theBoundaryProblem && (
                                        <div className="mt-4 p-4 bg-red-100 dark:bg-red-900/30 rounded-lg">
                                            <h3 className="font-bold text-red-800 dark:text-red-300 mb-2">The Boundary Problem</h3>
                                            <p className="text-sm text-red-700 dark:text-red-400">{modalFeature.fullContent.theBoundaryProblem}</p>
                                        </div>
                                    )}

                                    {modalFeature.fullContent.theTradeoff && (
                                        <div className="mt-4 p-4 bg-red-100 dark:bg-red-900/30 rounded-lg">
                                            <h3 className="font-bold text-red-800 dark:text-red-300 mb-2">The Tradeoff</h3>
                                            <p className="text-sm text-red-700 dark:text-red-400">{modalFeature.fullContent.theTradeoff}</p>
                                        </div>
                                    )}
                                </section>
                            )}

                            {/* Use Cases */}
                            {modalFeature.fullContent?.useCases && (
                                <section className="p-6 bg-purple-50 dark:bg-purple-900/20 rounded-xl border border-purple-100 dark:border-purple-800">
                                    <h2 className="text-lg font-bold mb-4 flex items-center gap-2 text-purple-800 dark:text-purple-200">
                                        <Lightbulb size={20} /> Use Cases
                                    </h2>
                                    <ul className="space-y-3">
                                        {modalFeature.fullContent.useCases.map((useCase, i) => (
                                            <li key={i} className="flex items-start gap-3">
                                                <span className="text-purple-500 font-bold shrink-0">{i + 1}.</span>
                                                <span className="text-purple-700 dark:text-purple-300">{useCase}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </section>
                            )}

                            {/* Key Value Props */}
                            {modalFeature.fullContent?.keyValueProps && (
                                <section className="p-6 bg-green-50 dark:bg-green-900/20 rounded-xl border border-green-100 dark:border-green-800">
                                    <h2 className="text-lg font-bold mb-4 flex items-center gap-2 text-green-800 dark:text-green-200">
                                        <CheckCircle size={20} /> Key Value Propositions
                                    </h2>
                                    <ul className="space-y-3">
                                        {modalFeature.fullContent.keyValueProps.map((prop, i) => (
                                            <li key={i} className="flex items-start gap-3">
                                                <CheckCircle size={16} className="text-green-500 mt-1 shrink-0" />
                                                <span className="text-green-700 dark:text-green-300">{prop}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </section>
                            )}

                            {/* B2B Context */}
                            {modalFeature.fullContent?.b2bContext && (
                                <section className="p-6 bg-orange-50 dark:bg-orange-900/20 rounded-xl border border-orange-100 dark:border-orange-800">
                                    <h2 className="text-lg font-bold mb-4 flex items-center gap-2 text-orange-800 dark:text-orange-200">
                                        <Users size={20} /> B2B Context
                                    </h2>
                                    <p className="text-orange-700 dark:text-orange-300">{modalFeature.fullContent.b2bContext}</p>
                                </section>
                            )}

                            {/* Other Requirements */}
                            {modalFeature.fullContent?.otherRequirements && (
                                <section className="p-6 bg-neutral-100 dark:bg-neutral-800 rounded-xl">
                                    <h2 className="text-lg font-bold mb-4 flex items-center gap-2">
                                        <Shield size={20} className="text-neutral-500" /> Other Requirements
                                    </h2>
                                    <ul className="space-y-2">
                                        {modalFeature.fullContent.otherRequirements.map((req, i) => (
                                            <li key={i} className="flex items-start gap-2 text-neutral-600 dark:text-neutral-400">
                                                <span className="text-neutral-400">•</span>
                                                <span>{req}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </section>
                            )}

                            {/* Data Requirements */}
                            <section className="p-6 bg-neutral-50 dark:bg-neutral-900 rounded-xl">
                                <h2 className="text-lg font-bold mb-4 flex items-center gap-2">
                                    <Brain size={20} className="text-purple-500" /> Data Requirements
                                </h2>
                                <p className="text-neutral-600 dark:text-neutral-400">{modalFeature.dataRequired}</p>
                            </section>

                            {/* Implementation Notes */}
                            <section className="p-6 bg-cyan-50 dark:bg-cyan-900/20 rounded-xl border border-cyan-100 dark:border-cyan-800">
                                <h2 className="text-lg font-bold mb-4 flex items-center gap-2 text-cyan-800 dark:text-cyan-200">
                                    <Lightbulb size={20} /> Implementation Notes
                                </h2>
                                <p className="text-cyan-700 dark:text-cyan-300 mb-4">{modalFeature.implementation}</p>
                                {modalFeature.fullContent?.implementationNotes && (
                                    <p className="text-cyan-700 dark:text-cyan-300">{modalFeature.fullContent.implementationNotes}</p>
                                )}
                            </section>
                        </div>

                        {/* Footer Actions */}
                        <div className="mt-8 pt-6 border-t border-neutral-200 dark:border-neutral-700 flex justify-between items-center">
                            <button
                                onClick={(e) => copyFeatureLink(modalFeature.id, e)}
                                className={`px-4 py-2 border rounded-lg font-medium flex items-center gap-2 transition-all ${
                                    linkCopied
                                        ? 'border-green-500 bg-green-50 dark:bg-green-900/30 text-green-700 dark:text-green-300'
                                        : 'border-neutral-300 dark:border-neutral-600 hover:bg-neutral-50 dark:hover:bg-neutral-800'
                                }`}
                            >
                                {linkCopied ? (
                                    <>
                                        <CheckCircle size={16} className="text-green-500" /> Copied!
                                    </>
                                ) : (
                                    <>
                                        <Link2 size={16} /> Copy Link to This Feature
                                    </>
                                )}
                            </button>
                            <button
                                onClick={closeModal}
                                className="px-6 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg font-bold transition-colors"
                            >
                                Close
                            </button>
                        </div>
                    </div>
                </div>
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
    );
}
