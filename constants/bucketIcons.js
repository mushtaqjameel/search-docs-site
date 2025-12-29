import { Search, Brain, Lightbulb, Target, Shield, BarChart } from 'lucide-react'

/**
 * Centralized bucket icon mapping
 * Used across: FeaturesList, FeatureBuckets, SearchScopeGenerator, PlatformCapabilities
 */
export const bucketIcons = {
    core: Search,
    smart: Brain,
    discovery: Lightbulb,
    merchandising: Target,
    recovery: Shield,
    analytics: BarChart
}

/**
 * Tailwind background classes for bucket cards
 */
export const bucketBgClasses = {
    core: 'bg-cyan-100',
    smart: 'bg-purple-100',
    discovery: 'bg-amber-100',
    merchandising: 'bg-red-100',
    recovery: 'bg-green-100',
    analytics: 'bg-blue-100'
}

/**
 * Build bucket info from JSON data with icons attached
 */
export function buildBucketInfo(bucketsData) {
    return Object.fromEntries(
        Object.entries(bucketsData.buckets).map(([key, bucket]) => [
            key,
            { ...bucket, icon: bucketIcons[key] }
        ])
    )
}
