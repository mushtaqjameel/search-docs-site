// Dynamic count components for MDX files
import { FEATURE_COUNT, BUCKET_COUNT, CAPABILITY_COUNT } from '../lib/counts'

export function FeatureCount() {
    return <>{FEATURE_COUNT}</>
}

export function BucketCount() {
    return <>{BUCKET_COUNT}</>
}

export function CapabilityCount() {
    return <>{CAPABILITY_COUNT}</>
}

// For inline text like "31 features across 6 buckets"
export function FeatureSummary() {
    return <><strong>{FEATURE_COUNT} features</strong> across <strong>{BUCKET_COUNT} buckets</strong></>
}

// Link version for platform capabilities page
export function FeatureCountLink({ children }) {
    return <a href="/features">{FEATURE_COUNT} Search Features</a>
}
