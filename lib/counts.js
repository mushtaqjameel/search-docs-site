// Counts derived from data files - single source of truth
import features from '../data/features.json';
import capabilities from '../data/capabilities.json';
import buckets from '../data/buckets.json';

export const FEATURE_COUNT = features.features.length;
export const CAPABILITY_COUNT = capabilities.capabilities.length;
export const BUCKET_COUNT = Object.keys(buckets.buckets).length;
