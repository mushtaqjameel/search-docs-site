'use client'

import { useState, useEffect, useRef } from 'react'
import { Search, Brain, Lightbulb, Target, Shield, BarChart, ChevronDown, ChevronUp, AlertTriangle, AlertCircle, CheckCircle, ExternalLink, Link2, Users, Zap, X } from 'lucide-react'

// Enriched Features Data with full content
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
        badge: 'STANDARD',
        personas: ['Rushed Buyer', 'Exploring Buyer'],
        problemsSolved: ["Can't find products", 'Too slow'],
        fullContent: {
            whatItSolves: 'The fundamental friction of typing in a search box. Every keystroke is a chance for typos, especially with technical part numbers and SKUs.',
            keyValueProps: [
                'Reduce keystrokes by 60-80% for known-item searches',
                'Handle part number variations as users type',
                'Show popular and trending suggestions',
                'Guide users toward valid products before they hit Enter'
            ],
            b2bContext: 'In B2B, buyers often search for exact part numbers like "ABC-123-XYZ". Auto-complete that understands format variations (dashes, spaces, leading zeros) is critical. Unlike B2C where suggestions are about discovery, B2B auto-complete is about speed and accuracy.',
            implementationNotes: 'Works immediately with basic catalog data. Can be enhanced with behavioral data over time to show personalized and trending suggestions. Low risk, high value Day 1 feature.'
        }
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
        badge: 'STANDARD',
        personas: ['Exploring Buyer', 'Technical Buyer'],
        problemsSolved: ["Can't find products", 'Too many results'],
        fullContent: {
            whatItSolves: 'Large catalogs (100K+ SKUs) where scrolling through results is impossible. Technical buyers who need to narrow by exact specifications.',
            keyValueProps: [
                'Handle catalogs with 100K+ SKUs efficiently',
                'Let technical buyers filter by exact specifications',
                'Dynamic facets that change based on category context',
                'Show category depth and available options'
            ],
            b2bContext: 'Unlike B2C filtering (color, size), B2B facets are technical: voltage, thread pitch, material grade, certification compliance. The quality of faceted search is directly tied to attribute data quality.',
            implementationNotes: 'Quality depends entirely on attribute consistency. May need data cleanup first. Consider which attributes matter most per category.'
        }
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
        badge: 'POLISHED',
        personas: ['Exploring Buyer'],
        problemsSolved: ["Can't find products", 'Hard to narrow down'],
        fullContent: {
            whatItSolves: 'Products that are easier to identify visually than by spec. "I know it when I see it" scenarios.',
            keyValueProps: [
                'Image-based selection for shape, color, style',
                'Visual size comparison tools',
                'Color swatches for finishes and materials',
                'Reduce returns from misidentification'
            ],
            b2bContext: 'Particularly valuable for fittings, connectors, hardware where buyers might not know the technical name but can recognize the shape. Also useful for finish/color selection where text descriptions fail.',
            implementationNotes: 'Requires quality product images and attribute mapping. Consider for high-visual categories first. Can use AI for image classification.'
        }
    },
    {
        id: 'partnumber',
        bucket: 'core',
        title: 'Part Number Normalization',
        pillars: { data: 'green', gov: 'green', safe: 'green' },
        desc: 'Acts as a sanitizer, stripping special characters and normalizing whitespace before the search executes. Ensures users never receive zero results simply because they missed a hyphen.',
        value: 'Critical for industrial buyers who search by part numbers. Handles format variations across 50+ brands with no standard conventions. "ABC-123" = "ABC123" = "ABC 123".',
        dataRequired: 'Catalog (SKUs, part numbers, manufacturer codes)',
        implementation: 'Day 1 feature. Requires character normalization rules, unit equivalency mappings, fraction-to-decimal tables, and confidence scoring for fuzzy match ranking.',
        badge: 'STANDARD',
        personas: ['Rushed Buyer', 'Technical Buyer'],
        problemsSolved: ["Doesn't understand us", 'Exact match fails', 'Format chaos'],
        fullContent: {
            whatItSolves: 'Industrial buyers are notorious for inconsistent formatting. One might type "X-100", another "X100", and a third "X 100". This feature acts as a sanitizer, stripping special characters and normalizing whitespace before the search executes. It ensures that a user never receives zero results simply because they missed a hyphen.',
            whyItsHard: 'There is no standard format. A single manufacturer might use "DW-110", "DW110", "DW 110", "DW.110", and "110-DW" interchangeably. Across 50+ brands, you have 50+ conventions—none documented, none consistent.',
            theBoundaryProblem: 'We don\'t know where a part number starts and ends. When a user types "254": Beginning? → "254-100", "254XL". Middle? → "ABC-254-D". End? → "DW-254". Exact? → just "254". With natural language we have spaces and grammar. With part numbers, we have nothing—"ABC123DEF" could be one part or three. There\'s no way to know without checking every possibility.',
            theTradeoff: 'Too strict and "DW110" returns nothing when the catalog has "DW-110". Too fuzzy and "DW-110" returns "DW-1100", "DW-11", "DWS-110"—wrong parts, returns, blame.',
            keyValueProps: [
                'Handle dashes, spaces, prefixes, leading zeros across all format variations',
                'Character normalization and substitution rules (O↔0, I↔1)',
                'Unit equivalency mappings (in↔inch↔", lb↔lbs↔#↔pound)',
                'Fraction-to-decimal conversion tables',
                'Manufacturer-specific formatting patterns',
                'Confidence scoring for fuzzy match ranking'
            ],
            useCases: [
                'SKU Search: User types a messy SKU copied from an old invoice; system matches it to the clean SKU in the database',
                'OCR Errors: OCR misreads "BLM-205" as "BLM-2O5" (zero vs letter O)—fuzzy match catches it',
                'Legacy Numbers: Customer searches old manufacturer part number; system matches to renumbered SKU',
                'Format Chaos: "DW-110", "DW110", "DW 110", "DW.110", and "110-DW" all return the same product'
            ],
            b2bContext: 'This is B2B table stakes. Industrial buyers search by part number 60%+ of the time. If "ABC-123" doesn\'t match because your catalog has "ABC123", you lose the sale. The challenge isn\'t just normalization—it\'s handling 50+ manufacturer conventions with no standard format, no documented rules, and no consistency. All three pillars green — no excuse not to have this Day 1.',
            otherRequirements: [
                'Character normalization and substitution rules (O↔0, I↔1)',
                'Unit equivalency mappings (in↔inch↔", lb↔lbs↔#↔pound)',
                'Fraction-to-decimal conversion tables',
                'Manufacturer-specific formatting patterns',
                'Confidence scoring for fuzzy match ranking'
            ],
            implementationNotes: 'Day 1 feature. Configure normalization rules based on your industry patterns. Test with your actual search logs to identify format variations buyers actually use. The boundary problem requires careful tuning—too strict loses sales, too fuzzy causes wrong-part returns and customer blame.'
        }
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
        badge: 'MVP',
        personas: ['Rushed Buyer'],
        problemsSolved: ['Hands busy', 'Mobile use'],
        fullContent: {
            whatItSolves: 'Hands-occupied scenarios: warehouse workers with gloves, field technicians on ladders, mobile users.',
            keyValueProps: [
                'Hands-free search input',
                'Mobile-friendly experience',
                'Accessibility compliance',
                'Field worker productivity'
            ],
            b2bContext: 'More valuable in B2B than B2C because of field/warehouse scenarios. The challenge is industry jargon — "three-quarter inch EMT" needs to work, not just standard English.',
            implementationNotes: 'Browser-based speech recognition works out of the box. Consider accent/terminology training for industry-specific terms. MVP approach: add voice as input method, improve accuracy over time.'
        }
    },
    {
        id: 'imagesearch',
        bucket: 'core',
        title: 'Image Search',
        pillars: { data: 'yellow', gov: 'yellow', safe: 'green' },
        desc: 'Upload a photo to find visually similar products using computer vision.',
        value: 'Field workers photograph unknown parts, maintenance techs replace worn components without labels, buyers match competitor products.',
        dataRequired: 'Product Images (multiple angles preferred), Catalog',
        implementation: 'Requires computer vision model and vector index. Can combine with keyword refinement.',
        badge: 'POLISHED',
        personas: ['Technical Buyer', 'Rushed Buyer'],
        problemsSolved: ['Unknown parts', 'No part number', 'Visual matching'],
        fullContent: {
            whatItSolves: 'Buyers who encounter unknown parts, worn components without readable labels, or competitor products they want to match. Bypasses the need to know technical terminology or part numbers.',
            keyValueProps: [
                'Upload photo to find matching products',
                'Computer vision matches shapes, colors, features',
                'Combine image + keywords for refinement',
                'Surface related parts and accessories',
                'Mobile-optimized capture interface'
            ],
            useCases: [
                'Technician photographs a broken valve and finds replacement without knowing manufacturer',
                'Procurement uploads competitor catalog image to find equivalent products',
                'Field workers identify unlabeled electrical components by photographing panel markings',
                'Upload image of motor, see compatible belts, pulleys, and mounts as related parts',
                'Combine image of mystery fitting with keyword "brass" to filter results'
            ],
            b2bContext: 'For industrial buyers, the part is often right in front of them but unidentifiable. Image search turns "I need one of these" into a successful product match. Particularly valuable for maintenance, repair, and replacement scenarios.',
            otherRequirements: [
                'Computer vision model for feature extraction',
                'Vector index for image similarity matching',
                'Mobile-optimized image capture interface',
                'Hybrid query engine supporting image + text fusion'
            ],
            implementationNotes: 'Requires product image library with consistent quality. Multiple angles improve matching accuracy. Can bootstrap with existing catalog images, improve with user-submitted matches over time.'
        }
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
        badge: 'POLISHED',
        personas: ['All Buyers'],
        problemsSolved: ['Fragmented experience'],
        fullContent: {
            whatItSolves: 'Fragmented search experiences where buyers need different search boxes for products, documentation, and support.',
            keyValueProps: [
                'Single search box for all content',
                'Find spec sheets alongside products',
                'Surface installation guides and manuals',
                'Unified experience across content types'
            ],
            b2bContext: 'B2B buyers often need both the product AND the documentation. Universal search shows "10HP Motor" alongside its spec sheet, wiring diagram, and installation guide. The alternative is frustrated bouncing between different site sections.',
            implementationNotes: 'Requires content indexing strategy across multiple sources. Consider how to blend and rank results from different content types. Federated search vs unified index decision.'
        }
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
        badge: 'STANDARD',
        personas: ['Technical Buyer', 'Compliance Buyer'],
        problemsSolved: ['Compliance requirements', 'Regulatory filtering'],
        fullContent: {
            whatItSolves: 'Compliance requirements where buyers MUST filter by certification. "Show me only UL-listed products" or "HazLoc rated for Class 1 Div 2".',
            keyValueProps: [
                'Filter by UL, CSA, RoHS, CE, HazLoc ratings',
                'Compliance confidence for regulated industries',
                'Reduce risk of non-compliant purchases',
                'Support bid/quote requirements'
            ],
            b2bContext: 'In industries like electrical, HVAC, and industrial, certification compliance isn\'t optional — it\'s legally required. Buyers need to filter by certification to meet code. This data is often buried in PDFs and needs extraction.',
            implementationNotes: 'The data challenge: certifications are often in PDF spec sheets, not structured attributes. May need AI extraction or manual enrichment. Critical for compliance-driven industries.'
        }
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
        alert: { type: 'warning', text: 'Sparse descriptions = gimmick feature. Rich descriptions = game-changer.' },
        personas: ['Exploring Buyer', 'Technical Buyer'],
        problemsSolved: ["Doesn't understand us", 'Wrong terms'],
        fullContent: {
            whatItSolves: 'The vocabulary gap between how buyers search and how your catalog is written. "Cordless drill" should match "battery-powered drill".',
            keyValueProps: [
                'Understand meaning, not just keyword matching',
                'Bridge vocabulary gaps automatically',
                'Handle industry jargon and natural language',
                'Improve results without manual synonym lists'
            ],
            b2bContext: 'B2B catalogs are written by product managers using manufacturer terminology. Buyers use field terminology, abbreviations, or "how I describe it" language. Semantic search bridges this gap without endless synonym lists.',
            implementationNotes: 'Uses ELSER/BERT models. Quality is DIRECTLY tied to description richness. With sparse descriptions ("18V Drill"), semantic search adds nothing. With rich descriptions ("Heavy-duty cordless drill for concrete and masonry..."), it transforms search.'
        }
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
        badge: 'POLISHED',
        personas: ['All Buyers'],
        problemsSolved: ["Doesn't understand us", 'Industry jargon'],
        fullContent: {
            whatItSolves: 'Industry-specific terminology that semantic search alone can\'t handle. Every industry has its own jargon, abbreviations, and alternate names.',
            keyValueProps: [
                'Auto-discover synonyms from search behavior',
                'Industry-specific terminology mappings',
                'Learn from what buyers actually click',
                'Continuously improve over time'
            ],
            b2bContext: 'Electrical: "wire nut" = "twist-on connector" = "marrette". Industrial: "angle grinder" = "disc grinder" = "side grinder". These industry-specific mappings can\'t be guessed — they must be learned from your buyers\' behavior.',
            implementationNotes: 'Governance required: bad synonyms can hurt results badly (mapping "drill" to "driver" when they\'re different products). Needs monitoring and approval workflow. Consider human-in-the-loop for high-volume synonyms.'
        }
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
        badge: 'POLISHED',
        personas: ['Rushed Buyer', 'Exploring Buyer'],
        problemsSolved: ['Slow discovery', 'Typing effort'],
        fullContent: {
            whatItSolves: 'Generic auto-complete shows the same suggestions to everyone. An electrician typing "wire" should see different suggestions than a plumber.',
            keyValueProps: [
                'Personalized suggestions based on user history',
                'Industry/trade-aware recommendations',
                'Learn from what converts, not just what\'s searched',
                'Context-aware (time of year, project type)'
            ],
            b2bContext: 'B2B buyers have specialties. An HVAC contractor searching "motor" wants blower motors, not drill motors. Intelligent auto-complete learns user context and shows relevant suggestions first.',
            implementationNotes: 'Cold start with catalog data, improves with behavioral data over time. Needs governance because bad personalization is worse than none. Consider showing "why" alongside suggestions.'
        }
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
        alert: { type: 'danger', text: 'High Complexity: All three pillars are red. Consider managed support or phase for later.' },
        personas: ['All Buyers'],
        problemsSolved: ['Wrong relevance', 'Buried results'],
        fullContent: {
            whatItSolves: 'Text matching alone doesn\'t know which products convert. The best result isn\'t always the closest keyword match — it\'s the one buyers actually buy.',
            keyValueProps: [
                'Blend keyword, semantic, and behavioral signals',
                'Learn from actual conversions, not just clicks',
                'Automatically optimize ranking over time',
                'Balance relevance with business objectives'
            ],
            b2bContext: 'For "safety glasses", keyword search might rank a discontinued model first. ML ranking learns that the current best-seller with 4.8 stars should rank higher. It optimizes for what actually converts.',
            implementationNotes: 'Expert feature — all three pillars red. Requires 90+ days of behavioral data, ongoing monitoring, and tuning. Consider managed support or phase for post-launch. The ROI is real but so is the complexity.'
        }
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
        badge: 'PREMIUM',
        personas: ['Merchandiser'],
        problemsSolved: ['Complex ranking needs'],
        fullContent: {
            whatItSolves: 'When simple relevance isn\'t enough. You need to balance text match, business rules (promote high-margin), inventory (hide out-of-stock), and personalization.',
            keyValueProps: [
                'Layer multiple ranking strategies',
                'Balance relevance with business objectives',
                'Personalization at the ranking layer',
                'Dynamic adjustment based on context'
            ],
            b2bContext: 'A distributor might want: (1) In-stock products first, (2) Private label boosted, (3) High-margin in top 3, (4) Relevance within those constraints. Multi-layered relevance makes this possible.',
            implementationNotes: 'Most complex feature. Requires expert configuration, ongoing tuning, and deep understanding of business objectives. Usually a Day 60-90 feature after simpler ranking is stable.'
        }
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
        badge: 'POLISHED',
        personas: ['All Buyers'],
        problemsSolved: ['Misunderstood intent'],
        fullContent: {
            whatItSolves: 'Not all searches want product results. "Milwaukee" might want the brand page. "Warranty" wants support. "How to wire a 3-way switch" wants content.',
            keyValueProps: [
                'Detect navigational vs transactional intent',
                'Route to brand pages, categories, or support',
                'Handle informational queries appropriately',
                'Reduce frustration from wrong result types'
            ],
            b2bContext: '"Return policy" shouldn\'t show products with "return" in the name. "DeWalt 20V" might want the product family page, not a random product. Intent routing sends queries to the right destination.',
            implementationNotes: 'Configure intent rules based on common patterns. Start with obvious cases (brand names → brand pages, support terms → help), learn and expand over time.'
        }
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
        badge: 'POLISHED',
        personas: ['Exploring Buyer', 'Business Leader'],
        problemsSolved: ['Missing cross-sell'],
        fullContent: {
            whatItSolves: 'Missed cross-sell opportunities. When a buyer searches for a drill, they probably also need bits, batteries, and cases.',
            keyValueProps: [
                'Increase average order value by 15-30%',
                'Surface accessories and consumables automatically',
                'Learn from purchase patterns over time',
                'Reduce time to find related products'
            ],
            b2bContext: 'B2B recommendations are about job completion, not impulse buys. "Bought this motor? You\'ll need mounting hardware, capacitors, and a VFD." Recommendations that understand project context outperform generic "similar products".',
            implementationNotes: 'Cold start challenge: needs transaction history to work well. Can bootstrap with curated rules ("if drill, show bits"), then improve with behavioral data. Consider showing "why" to build trust.'
        }
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
        badge: 'STANDARD',
        personas: ['Exploring Buyer'],
        problemsSolved: ['Stuck', 'Need alternatives'],
        fullContent: {
            whatItSolves: 'Buyers who searched too narrowly, too broadly, or with the wrong terms. "Did you mean?" and "People also searched for" experiences.',
            keyValueProps: [
                'Surface alternative query paths',
                'Help buyers who are stuck or exploring',
                'Learn from successful search sequences',
                'Low risk, high value feature'
            ],
            b2bContext: 'When a buyer searches "3/4 inch copper fitting" and gets too many results, related searches might suggest "3/4 copper elbow", "3/4 copper tee", or "3/4 compression fitting" to narrow down.',
            implementationNotes: 'Learns from search patterns automatically. Low governance risk — it suggests, doesn\'t change results. Safe Day 30 feature.'
        }
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
        badge: 'POLISHED',
        personas: ['Technical Buyer', 'Exploring Buyer'],
        problemsSolved: ['Need alternatives', 'Brand switching'],
        fullContent: {
            whatItSolves: 'Brand loyalty meets stock reality. When the preferred brand is out of stock, show equivalent alternatives to capture the sale.',
            keyValueProps: [
                'Show equivalent products across brands',
                'Capture sales when preferred brand is OOS',
                'Help price-conscious buyers find alternatives',
                'Support brand-switching conversations'
            ],
            b2bContext: 'Industrial buyers often have brand preferences but need the part today. "Milwaukee M18 out of stock? Here\'s the DeWalt 20V equivalent." Cross-brand equivalents keep the sale instead of losing to a competitor.',
            implementationNotes: 'Requires relationship data (cross-reference tables). Can use AI to suggest equivalents, but needs human verification — wrong equivalents damage trust. Consider confidence scoring.'
        }
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
        badge: 'STANDARD',
        personas: ['Exploring Buyer', 'Merchandiser'],
        problemsSolved: ["What's popular", 'Market signals'],
        fullContent: {
            whatItSolves: 'Discovery for buyers who don\'t know what to search. "What are others buying?" Social proof and market signals.',
            keyValueProps: [
                'Show trending searches and products',
                'Social proof for uncertain buyers',
                'Market signal visibility for merchandisers',
                'Seasonal and event awareness'
            ],
            b2bContext: 'Trending in B2B is about market signals, not viral products. "Searches for generator parts up 400% this week" (hurricane season). Helps buyers see what peers are buying and helps merchandisers spot trends.',
            implementationNotes: 'Low governance, updates automatically. Consider filtering sensitive searches from trending. Useful Day 30 feature after behavioral data accumulates.'
        }
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
        badge: 'POLISHED',
        personas: ['Technical Buyer', 'Exploring Buyer'],
        problemsSolved: ['Complex requirements'],
        fullContent: {
            whatItSolves: 'Complex purchasing where buyers need multiple related items. "I\'m wiring a 200A service panel — give me everything I need."',
            keyValueProps: [
                'Pre-built job kits for common tasks',
                'Dynamic bundle configuration',
                'Reduce buyer effort on complex orders',
                'Increase average order value significantly'
            ],
            b2bContext: 'Electricians don\'t want to add 47 items for a service panel job. Kitting lets them search "200A residential service kit" and get everything — panel, breakers, wire, connectors, grounding. Massive time saver.',
            implementationNotes: 'Requires relationship mapping (what goes with what). Can be merchandiser-curated or rule-based. Start with high-value job kits, expand based on demand.'
        }
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
        badge: 'STANDARD',
        personas: ['Rushed Buyer'],
        problemsSolved: ['Repeat tasks', 'Speed'],
        fullContent: {
            whatItSolves: 'The "I looked at this yesterday" problem. B2B buyers research and quote before ordering — they need to find what they looked at.',
            keyValueProps: [
                'Instant access to recent searches',
                'Support research-then-buy workflow',
                'Reduce friction for returning buyers',
                'All three pillars green — no risk'
            ],
            b2bContext: 'B2B buying is rarely one session. Buyers research, get quotes, check with job site, then order. Recent searches bridge sessions. All three pillars green — Day 1 feature with high value.',
            implementationNotes: 'Day 1 feature. Simple session/account tracking. No governance risk. Consider showing across devices for logged-in users.'
        }
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
        alert: { type: 'success', text: 'B2B Gold: This feature alone can transform repeat purchase efficiency.' },
        personas: ['Rushed Buyer'],
        problemsSolved: ['Reordering speed'],
        fullContent: {
            whatItSolves: 'The #1 B2B use case: reordering what you bought before. 80% of B2B orders are repeats — this feature addresses the majority of orders.',
            keyValueProps: [
                'One-click reorder from history',
                'Order the exact same item again instantly',
                'Address 80% of B2B orders (repeats)',
                'Massive time savings for regular buyers'
            ],
            b2bContext: 'This is THE B2B feature. Contractors order the same wire, fittings, and supplies repeatedly. Every second spent re-finding products is wasted. Recently Ordered + one-click reorder = loyalty driver.',
            implementationNotes: 'Requires order history integration. Consider showing frequency ("You order this every 3 weeks"), quantity suggestions, and easy re-order with quantity adjustment.'
        }
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
        badge: 'POLISHED',
        personas: ['Merchandiser'],
        problemsSolved: ['Business control', 'Promotions'],
        fullContent: {
            whatItSolves: 'Business users locked out of search results. Marketing wants to promote a campaign, but has to file an IT ticket and wait.',
            keyValueProps: [
                'Pin products to specific positions',
                'Boost or bury products in results',
                'Redirect queries to landing pages',
                'Schedule promotions and campaigns'
            ],
            b2bContext: 'Distributors run manufacturer promotions, seasonal campaigns, and clearance sales. Curations let merchandisers control what appears without touching code. But power = responsibility — governance is critical.',
            implementationNotes: 'Needs training — curations can break relevance if misused. Governance workflow recommended. Start with redirects and pins, expand to boosts carefully.'
        }
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
        badge: 'STANDARD',
        personas: ['Merchandiser', 'IT/Ops'],
        problemsSolved: ['Change control', 'Governance'],
        fullContent: {
            whatItSolves: 'The "who changed what?" problem. When search breaks, you need to know what changed and rollback quickly.',
            keyValueProps: [
                'Version control for all search settings',
                'Complete audit trail of changes',
                'One-click rollback to previous state',
                'Compare configurations side-by-side'
            ],
            b2bContext: 'Enterprise requirement: know who changed what, when. When search relevance tanks, you need to identify the culprit change and rollback in minutes, not hours.',
            implementationNotes: 'Platform capability, not a feature to build. Essential foundation for governance. Enables safe experimentation because rollback is easy.'
        }
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
        badge: 'STANDARD',
        personas: ['Merchandiser', 'Analyst'],
        problemsSolved: ['Understanding patterns'],
        fullContent: {
            whatItSolves: 'Understanding what buyers actually want when they search. "Milwaukee" — are they looking for the brand page, a product, or information?',
            keyValueProps: [
                'Classify queries by intent type',
                'Understand search patterns at scale',
                'Inform merchandising decisions',
                'Identify content gaps'
            ],
            b2bContext: 'Helps answer strategic questions: "What % of searches are for exact part numbers vs. product categories?" "What are buyers searching for that we don\'t carry?" Informs both search tuning and inventory decisions.',
            implementationNotes: 'Analytical tool that informs other features. Low risk, high insight. Requires behavioral data to accumulate first.'
        }
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
        badge: 'STANDARD',
        personas: ['Merchandiser', 'IT/Ops'],
        problemsSolved: ['Testing', 'Validation'],
        fullContent: {
            whatItSolves: 'Fear of breaking production. Teams avoid improving search because they can\'t test safely.',
            keyValueProps: [
                'Test changes before going live',
                'Preview results for any query',
                'Compare sandbox vs production side-by-side',
                'Safe experimentation environment'
            ],
            b2bContext: 'All three pillars green — no excuse not to have this. Enables confidence in making changes. Without sandbox, teams either never improve search or break production regularly.',
            implementationNotes: 'Essential Day 1 infrastructure. Platform capability that enables all other improvement work. Critical for governance and confidence.'
        }
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
        badge: 'STANDARD',
        personas: ['Merchandiser', 'Business Leader'],
        problemsSolved: ['Real-time visibility', 'Performance monitoring'],
        fullContent: {
            whatItSolves: 'Flying blind. Teams don\'t know what buyers are searching for, what\'s failing, or how search impacts revenue.',
            keyValueProps: [
                'Real-time search performance metrics',
                'Top searches and zero-result queries',
                'Conversion and revenue attribution',
                'Trend identification and alerts'
            ],
            b2bContext: 'You can\'t improve what you can\'t measure. Dashboard answers: "What are our top searches?" "What has high search volume but low conversion?" "What are buyers searching for that returns zero results?"',
            implementationNotes: 'Builds value over time as behavioral data accumulates. Essential for data-driven optimization. Consider alerting for anomalies (zero-result spike, conversion drop).'
        }
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
        badge: 'POLISHED',
        personas: ['Merchandiser', 'IT/Ops'],
        problemsSolved: ['Content approval', 'Quality control'],
        fullContent: {
            whatItSolves: 'AI-generated content needs human oversight. You want AI speed with human quality control.',
            keyValueProps: [
                'Review AI-generated descriptions and attributes',
                'Confidence scoring for prioritization',
                'Bulk approve/reject workflows',
                'Audit trail for approved content'
            ],
            b2bContext: 'AI can generate product descriptions at scale, but someone needs to verify accuracy. Technical products especially need review — wrong specs can cause real problems. Dashboard enables human-in-the-loop at scale.',
            implementationNotes: 'Part of AI Enrichment pipeline. Focus on high-confidence auto-approve, low-confidence human review. Consider category-specific review workflows.'
        }
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
        badge: 'STANDARD',
        personas: ['All Buyers'],
        problemsSolved: ['Dead ends', 'Lost sales'],
        fullContent: {
            whatItSolves: 'The worst search outcome: "No results found." Every zero-result page is a potential lost sale and frustrated customer.',
            keyValueProps: [
                'Never show empty results page',
                'Suggest related products or categories',
                'Did you mean? spelling corrections',
                'Popular alternatives when exact match fails'
            ],
            b2bContext: 'Zero results in B2B often means the buyer goes to a competitor. Recovery strategies: spelling correction, category suggestions, popular products, "call us" CTA. Something is always better than nothing.',
            implementationNotes: 'Configure fallback strategies in priority order. Test with actual zero-result queries from logs. Consider capturing zero-result queries for catalog gap analysis.'
        }
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
        badge: 'STANDARD',
        personas: ['All Buyers'],
        problemsSolved: ['No results', 'Frustration'],
        fullContent: {
            whatItSolves: 'Complex search strategies can fail. What happens when semantic search returns poor results? Fallback provides resilience.',
            keyValueProps: [
                'Automatic fallback when primary search underperforms',
                'Graceful degradation chain',
                'Always return reasonable results',
                'Resilience without manual intervention'
            ],
            b2bContext: 'If semantic search fails to understand a query, fall back to keyword. If keyword fails, fall back to category. The buyer should never experience a broken search.',
            implementationNotes: 'Configure fallback chain: semantic → keyword → fuzzy → category → popular. Automatic, low governance. Logs fallback events for analysis.'
        }
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
        badge: 'POLISHED',
        personas: ['Merchandiser', 'Business Leader', 'Analyst'],
        problemsSolved: ['No visibility', "Can't optimize"],
        fullContent: {
            whatItSolves: 'You can\'t improve what you can\'t measure. Without analytics, search optimization is guesswork.',
            keyValueProps: [
                'Search-to-conversion funnel analysis',
                'Query performance breakdown',
                'Revenue attribution to search',
                'Trend analysis and forecasting'
            ],
            b2bContext: 'Analytics answers strategic questions: "What\'s the revenue impact of search?" "Which queries have high volume but low conversion?" "What would happen if we improved X?" ROI justification for search investment.',
            implementationNotes: 'Value increases over time as data accumulates. Start with basic metrics Day 1, add sophisticated analysis as behavioral data grows. Essential for proving ROI.'
        }
    }
];

const bucketInfo = {
    core: { icon: Search, label: 'Core Search', color: '#00cccc', desc: 'Get to products fast — 8 features' },
    smart: { icon: Brain, label: 'Smart Search', color: '#9933ff', desc: 'AI that understands & ranks — 6 features' },
    discovery: { icon: Lightbulb, label: 'Discovery', color: '#ff9900', desc: 'Suggest & cross-sell — 7 features' },
    merchandising: { icon: Target, label: 'Merchandising', color: '#ff3333', desc: 'Business user control — 6 features' },
    recovery: { icon: Shield, label: 'Recovery', color: '#00cc66', desc: 'Never lose a sale — 2 features' },
    analytics: { icon: BarChart, label: 'Analytics', color: '#0066ff', desc: 'Measure & optimize — 1 feature' }
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
    const [modalFeature, setModalFeature] = useState(null);
    const [linkCopied, setLinkCopied] = useState(false);
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

            {/* Grid */}
            <div className="features-grid">
                {filteredFeatures.map(feature => {
                    const BucketIcon = bucketInfo[feature.bucket].icon;
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
