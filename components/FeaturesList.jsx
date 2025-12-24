'use client'

import { useState, useEffect } from 'react'
import { Search, Brain, Lightbulb, Target, Shield, BarChart, ChevronDown, ChevronUp, AlertTriangle, AlertCircle, CheckCircle } from 'lucide-react'

// Enriched Features Data
const features = [
    // Core Search
    {
        id: 'autocomplete',
        bucket: 'core',
        title: 'Auto Complete',
        pillars: { data: 'green', gov: 'green', safe: 'green' },
        desc: 'Predictive suggestions as buyers type, reducing keystrokes and guiding to products faster.',
        value: 'Critical for part numbers, SKUs, and technical terms. Reduces typos and speeds up known-item search.',
        dataRequired: 'Basic Catalog (titles, SKUs)',
        implementation: 'Day 1 feature, works immediately with catalog data.',
        badge: 'STANDARD'
    },
    {
        id: 'faceted',
        bucket: 'core',
        title: 'Faceted Search',
        pillars: { data: 'yellow', gov: 'yellow', safe: 'yellow' },
        desc: 'Dynamic filters based on product attributes (brand, size, material, voltage, etc.).',
        value: 'Essential for large catalogs. Lets technical buyers narrow by specs. Shows category depth.',
        dataRequired: 'Rich Catalog (structured attributes, consistent categorization)',
        implementation: 'Quality depends on attribute consistency. May need data cleanup first.',
        badge: 'STANDARD'
    },
    {
        id: 'visual',
        bucket: 'core',
        title: 'Visual Filters',
        pillars: { data: 'yellow', gov: 'yellow', safe: 'yellow' },
        desc: 'Image-based filter selection (color swatches, shape selectors, visual size comparison).',
        value: 'Helpful for products where visual identification matters — fittings, connectors, finishes.',
        dataRequired: 'Product Images + Mapped Attributes',
        implementation: 'Requires image assets and attribute mapping. Consider for high-visual categories.',
        badge: 'POLISHED'
    },
    {
        id: 'partnumber',
        bucket: 'core',
        title: 'Part Number Normalization',
        pillars: { data: 'green', gov: 'green', safe: 'green' },
        desc: 'Handles part number format variations — dashes, spaces, prefixes, leading zeros.',
        value: 'Critical for industrial buyers who search by part numbers. "ABC-123" = "ABC123" = "ABC 123".',
        dataRequired: 'Basic Catalog (part numbers/SKUs)',
        implementation: 'Day 1 feature. Configure normalization rules based on industry patterns.',
        badge: 'STANDARD'
    },
    {
        id: 'voice',
        bucket: 'core',
        title: 'Voice Search',
        pillars: { data: 'green', gov: 'green', safe: 'green' },
        desc: 'Speak to search — voice input for hands-free or mobile scenarios.',
        value: 'Useful for field workers, warehouse staff, or anyone with hands occupied.',
        dataRequired: 'Basic Catalog',
        implementation: 'Browser-based speech recognition. Consider accent/terminology training.',
        badge: 'MVP'
    },
    {
        id: 'universal',
        bucket: 'core',
        title: 'Universal Search',
        pillars: { data: 'yellow', gov: 'yellow', safe: 'yellow' },
        desc: 'Search across multiple content types — products, documents, support articles, categories.',
        value: 'Single search box for everything. Buyers find spec sheets, installation guides, and products together.',
        dataRequired: 'Multiple Content Types (products, content, documents)',
        implementation: 'Requires content indexing strategy. Consider result blending/ranking.',
        badge: 'POLISHED'
    },
    {
        id: 'certifications',
        bucket: 'core',
        title: 'Searchable Certifications',
        pillars: { data: 'yellow', gov: 'yellow', safe: 'green' },
        desc: 'Filter by technical certifications (UL, CSA, RoHS, HazLoc).',
        value: 'Critical for compliance-driven industries. Buyers need to know it meets code.',
        dataRequired: 'Rich Catalog (certification attributes)',
        implementation: 'Requires structured data. Often buried in PDFs, needs extraction.',
        badge: 'STANDARD'
    },

    // Smart Search
    {
        id: 'semantic',
        bucket: 'smart',
        title: 'Semantic Search',
        pillars: { data: 'yellow', gov: 'yellow', safe: 'yellow' },
        desc: 'Understand meaning, not just keywords. "cordless drill" matches "battery-powered drill".',
        value: 'Bridges vocabulary gaps. Buyers use different terms than your catalog.',
        dataRequired: 'Rich Catalog (detailed descriptions). Performance improves with better content.',
        implementation: 'ELSER/BERT models. Quality tied directly to description richness.',
        badge: 'POLISHED',
        alert: { type: 'warning', text: 'Sparse descriptions = gimmick feature. Rich descriptions = game-changer.' }
    },
    {
        id: 'synonyms',
        bucket: 'smart',
        title: 'Intelligent Synonyms',
        pillars: { data: 'yellow', gov: 'red', safe: 'yellow' },
        desc: 'Learn and apply industry-specific terminology mappings. Auto-discovers synonyms from behavior.',
        value: 'Every industry has jargon. "saw blade" vs "circular blade" vs "cutting disc".',
        dataRequired: 'Behavioral Data (search logs, click patterns)',
        implementation: 'Needs monitoring. Bad synonyms can hurt results. Governance required.',
        badge: 'POLISHED'
    },
    {
        id: 'intelligentauto',
        bucket: 'smart',
        title: 'Intelligent Auto Complete',
        pillars: { data: 'yellow', gov: 'red', safe: 'yellow' },
        desc: 'Context-aware, personalized suggestions based on user history and behavior patterns.',
        value: 'Shows relevant suggestions first. Electrician sees electrical, plumber sees plumbing.',
        dataRequired: 'Behavioral + User Data',
        implementation: 'Builds over time. Cold start with catalog, improves with behavior.',
        badge: 'POLISHED'
    },
    {
        id: 'mlranking',
        bucket: 'smart',
        title: 'Hybrid Search / ML Ranking',
        pillars: { data: 'red', gov: 'red', safe: 'red' },
        desc: 'Blend keyword + semantic + behavioral signals. Machine learning optimizes ranking.',
        value: 'Best products rise to top based on what actually converts, not just text match.',
        dataRequired: 'Behavioral + Transactional (90+ days ideal)',
        implementation: 'Expert feature. Requires monitoring, testing, ongoing tuning.',
        badge: 'PREMIUM',
        alert: { type: 'danger', text: 'High Complexity: All three pillars are red. Consider managed support or phase for later.' }
    },
    {
        id: 'relevancefunnel',
        bucket: 'smart',
        title: 'Multi-Layered Relevance Funnel',
        pillars: { data: 'red', gov: 'red', safe: 'red' },
        desc: 'Complex ranking strategies combining business rules, personalization, and ML.',
        value: 'Ultimate control over what appears first — margin, inventory, strategic products.',
        dataRequired: 'All data types',
        implementation: 'Most complex feature. Requires expert configuration and ongoing management.',
        badge: 'PREMIUM'
    },
    {
        id: 'intentrouter',
        bucket: 'smart',
        title: 'Semantic Intent Router',
        pillars: { data: 'yellow', gov: 'yellow', safe: 'yellow' },
        desc: 'Detect what the buyer actually wants — product, category, support, or navigation.',
        value: '"Milwaukee" → brand page. "M18 drill" → product. "warranty" → support.',
        dataRequired: 'Rich Catalog + Behavioral patterns',
        implementation: 'Configure intent rules and destinations. Train on common patterns.',
        badge: 'POLISHED'
    },

    // Discovery
    {
        id: 'recommendations',
        bucket: 'discovery',
        title: 'Recommendation Engine',
        pillars: { data: 'red', gov: 'red', safe: 'yellow' },
        desc: 'Personalized product suggestions — "frequently bought together", "you may also need".',
        value: 'Increase basket size. Surface accessories, consumables, related parts.',
        dataRequired: 'Behavioral + Transactional + User',
        implementation: 'Cold start challenge. Can bootstrap with rules, improves with behavior.',
        badge: 'POLISHED'
    },
    {
        id: 'related',
        bucket: 'discovery',
        title: 'Related Searches',
        pillars: { data: 'yellow', gov: 'yellow', safe: 'green' },
        desc: 'Suggest alternative query paths when buyers might be stuck or exploring.',
        value: 'Help buyers discover they searched too narrowly or broadly.',
        dataRequired: 'Behavioral Data (search sequences)',
        implementation: 'Learns from search patterns. Safe, low-governance feature.',
        badge: 'STANDARD'
    },
    {
        id: 'equivalents',
        bucket: 'discovery',
        title: 'Cross-Brand Equivalents',
        pillars: { data: 'yellow', gov: 'yellow', safe: 'yellow' },
        desc: 'Show alternative brands and substitutes. "If you\'re looking for X, consider Y."',
        value: 'Capture sales when primary brand is out of stock. Help price-conscious buyers.',
        dataRequired: 'Relationship Data (cross-references, equivalents mapping)',
        implementation: 'Requires relationship data. Can use AI to suggest, human to verify.',
        badge: 'POLISHED'
    },
    {
        id: 'trending',
        bucket: 'discovery',
        title: 'Trending Search',
        pillars: { data: 'yellow', gov: 'green', safe: 'green' },
        desc: 'Show what\'s popular now — trending searches, hot products.',
        value: 'Social proof. Helps buyers see what others are buying. Market signals.',
        dataRequired: 'Behavioral Data (recent search/purchase patterns)',
        implementation: 'Low governance. Updates automatically based on behavior.',
        badge: 'STANDARD'
    },
    {
        id: 'kitting',
        bucket: 'discovery',
        title: 'Custom Products (Kitting)',
        pillars: { data: 'yellow', gov: 'yellow', safe: 'yellow' },
        desc: 'Build bundles and assemblies. Job kits, project packages, custom configurations.',
        value: '"Everything you need for X job" — increases order value, reduces buyer effort.',
        dataRequired: 'Relationship Data (kit compositions, compatible products)',
        implementation: 'Requires relationship mapping. Can be curated or rule-based.',
        badge: 'POLISHED'
    },
    {
        id: 'recent',
        bucket: 'discovery',
        title: 'Recent Search',
        pillars: { data: 'green', gov: 'green', safe: 'green' },
        desc: 'Show user\'s recent searches for quick repeat access.',
        value: 'Critical for B2B. Buyers research today, order tomorrow. Fast return path.',
        dataRequired: 'User Data (session/account tracking)',
        implementation: 'Day 1 feature. Simple, high value, no governance needed.',
        badge: 'STANDARD'
    },
    {
        id: 'recentlyordered',
        bucket: 'discovery',
        title: 'Recently Ordered Section',
        pillars: { data: 'yellow', gov: 'green', safe: 'green' },
        desc: 'One-click reorder from purchase history. "Buy again" functionality.',
        value: '80% of B2B orders are repeats. This is THE feature for efficiency.',
        dataRequired: 'User + Transactional Data',
        implementation: 'Requires order history integration. High value, relatively simple.',
        badge: 'POLISHED',
        alert: { type: 'success', text: 'B2B Gold: This feature alone can transform repeat purchase efficiency.' }
    },

    // Merchandising
    {
        id: 'curations',
        bucket: 'merchandising',
        title: 'Curations',
        pillars: { data: 'green', gov: 'yellow', safe: 'yellow' },
        desc: 'Pin, boost, bury, redirect — merchandiser control over search results.',
        value: 'Promote high-margin items, feature seasonal products, manage campaigns.',
        dataRequired: 'Basic Catalog',
        implementation: 'Needs training. Can break things if misused. Requires governance.',
        badge: 'POLISHED'
    },
    {
        id: 'config',
        bucket: 'merchandising',
        title: 'Configuration Management',
        pillars: { data: 'green', gov: 'yellow', safe: 'green' },
        desc: 'Version control for search settings. Track changes, rollback, audit trail.',
        value: 'Safety net for changes. Know who changed what, when. Easy recovery.',
        dataRequired: 'None (platform tool)',
        implementation: 'Platform capability. Essential for governance.',
        badge: 'STANDARD'
    },
    {
        id: 'querylabeller',
        bucket: 'merchandising',
        title: 'Query Behaviour Labeller',
        pillars: { data: 'yellow', gov: 'yellow', safe: 'green' },
        desc: 'Classify and understand search patterns — navigational, transactional, informational.',
        value: 'Know how buyers search to inform merchandising and content strategy.',
        dataRequired: 'Behavioral Data',
        implementation: 'Analytical tool. Informs other features and decisions.',
        badge: 'STANDARD'
    },
    {
        id: 'sandbox',
        bucket: 'merchandising',
        title: 'Search Sandbox',
        pillars: { data: 'green', gov: 'green', safe: 'green' },
        desc: 'Test search changes safely before deploying to production.',
        value: 'Experiment without risk. Try configurations, preview results.',
        dataRequired: 'None (platform tool)',
        implementation: 'Essential for safe operations. All three pillars green.',
        badge: 'STANDARD'
    },
    {
        id: 'dashboard',
        bucket: 'merchandising',
        title: 'Search Dashboard',
        pillars: { data: 'yellow', gov: 'green', safe: 'green' },
        desc: 'Real-time performance visibility — top searches, zero results, conversion metrics.',
        value: 'Know what\'s working. Identify problems quickly. Data-driven decisions.',
        dataRequired: 'Behavioral Data',
        implementation: 'Builds over time as data accumulates. Essential for optimization.',
        badge: 'STANDARD'
    },
    {
        id: 'aienrichment',
        bucket: 'merchandising',
        title: 'AI Enrichment Dashboard',
        pillars: { data: 'green', gov: 'yellow', safe: 'green' },
        desc: 'Review and approve AI-generated content before publishing.',
        value: 'Human-in-the-loop for quality control. Trust but verify AI outputs.',
        dataRequired: 'AI-generated content queue',
        implementation: 'Part of AI Enrichment pipeline. Confidence scoring + approval workflow.',
        badge: 'POLISHED'
    },

    // Recovery
    {
        id: 'zeroresults',
        bucket: 'recovery',
        title: 'Zero Results Recovery',
        pillars: { data: 'yellow', gov: 'yellow', safe: 'green' },
        desc: 'Always show something relevant — suggestions, related products, categories.',
        value: 'Zero results = lost sale. Never dead-end the buyer.',
        dataRequired: 'Rich Catalog (for intelligent suggestions)',
        implementation: 'Configure fallback strategies. Test thoroughly.',
        badge: 'STANDARD'
    },
    {
        id: 'fallback',
        bucket: 'recovery',
        title: 'Fallback Search',
        pillars: { data: 'yellow', gov: 'green', safe: 'green' },
        desc: 'Graceful degradation when primary search fails or returns poor results.',
        value: 'Resilience. If semantic fails, fall back to keyword. Always return results.',
        dataRequired: 'Rich Catalog',
        implementation: 'Configure fallback chain. Automatic, low governance.',
        badge: 'STANDARD'
    },

    // Analytics
    {
        id: 'analytics',
        bucket: 'analytics',
        title: 'Analytics',
        pillars: { data: 'yellow', gov: 'yellow', safe: 'green' },
        desc: 'Deep-dive search performance metrics, reports, and insights.',
        value: 'Understand search health. Find opportunities. Prove ROI.',
        dataRequired: 'Behavioral Data (accumulates over time)',
        implementation: 'Value increases over time. Essential for optimization.',
        badge: 'POLISHED'
    },
    {
        id: 'abtesting',
        bucket: 'analytics',
        title: 'A/B Testing',
        pillars: { data: 'yellow', gov: 'yellow', safe: 'yellow' },
        desc: 'Run controlled experiments to measure impact of search changes.',
        value: 'Data-driven decisions. Know what actually improves conversion.',
        dataRequired: 'Behavioral Data (sufficient traffic for significance)',
        implementation: 'Requires traffic volume. Training needed for proper use.',
        badge: 'POLISHED'
    }
];

const bucketInfo = {
    core: { icon: Search, label: 'Core Search', color: '#00cccc', desc: 'Get to products fast — 7 features' },
    smart: { icon: Brain, label: 'Smart Search', color: '#9933ff', desc: 'AI that understands & ranks — 6 features' },
    discovery: { icon: Lightbulb, label: 'Discovery', color: '#ff9900', desc: 'Suggest & cross-sell — 7 features' },
    merchandising: { icon: Target, label: 'Merchandising', color: '#ff3333', desc: 'Business user control — 6 features' },
    recovery: { icon: Shield, label: 'Recovery', color: '#00cc66', desc: 'Never lose a sale — 2 features' },
    analytics: { icon: BarChart, label: 'Analytics', color: '#0066ff', desc: 'Measure & optimize — 2 features' }
};

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

export default function FeaturesList() {
    const [filter, setFilter] = useState('all');
    const [search, setSearch] = useState('');
    const [expanded, setExpanded] = useState({});

    // Parse URL params for initial filter
    useEffect(() => {
        if (typeof window !== 'undefined') {
            const params = new URLSearchParams(window.location.search);
            const bucketParam = params.get('bucket');
            if (bucketParam && bucketInfo[bucketParam]) {
                setFilter(bucketParam);
            }
        }
    }, []);

    const toggleExpand = (id) => {
        setExpanded(prev => ({ ...prev, [id]: !prev[id] }));
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

            {/* Grid */}
            <div className="features-grid">
                {filteredFeatures.map(feature => {
                    const BucketIcon = bucketInfo[feature.bucket].icon;
                    const isExpanded = expanded[feature.id];

                    return (
                        <div key={feature.id} className={`feature-card ${isExpanded ? 'ring-2 ring-primary-500' : ''}`} onClick={() => toggleExpand(feature.id)}>
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

                                    {feature.alert && (
                                        <Alert type={feature.alert.type} text={feature.alert.text} />
                                    )}

                                    <div className="mt-3 pt-3 border-t border-dashed border-neutral-200 dark:border-neutral-700 flex justify-between items-center">
                                        <div className="text-xs uppercase font-bold text-neutral-400">Typical Investment</div>
                                        <div className={`text-xs font-bold px-2 py-1 rounded ${feature.badge === 'MVP' ? 'bg-neutral-100 text-neutral-600 dark:bg-neutral-800 dark:text-neutral-400' :
                                            feature.badge === 'STANDARD' ? 'bg-green-100 text-green-700 dark:bg-green-900/20 dark:text-green-300' :
                                                feature.badge === 'POLISHED' ? 'bg-cyan-100 text-cyan-700 dark:bg-cyan-900/20 dark:text-cyan-300' :
                                                    'bg-purple-100 text-purple-700 dark:bg-purple-900/20 dark:text-purple-300'
                                            }`}>
                                            {feature.badge}
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>
                    );
                })}
            </div>

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
