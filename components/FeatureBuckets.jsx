'use client'

import Link from 'next/link'

// Import data from JSON file (single source of truth)
import bucketsData from '../data/buckets.json'

// Import shared constants
import { bucketIcons, bucketBgClasses } from '../constants/bucketIcons'

// Build buckets array from JSON data with icons
const buckets = Object.entries(bucketsData.buckets).map(([key, bucket]) => ({
    id: key,
    icon: bucketIcons[key],
    label: bucket.label,
    count: bucket.desc.match(/\d+ features/)?.[0] || '',
    bgColor: bucketBgClasses[key],
    iconColor: bucket.color,
    desc: bucket.tagline || bucket.description?.substring(0, 80) + '...'
}))

export default function FeatureBuckets() {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 my-8">
            {buckets.map((bucket) => (
                <Link key={bucket.id} href={`/features?bucket=${bucket.id}`} className="block group no-underline">
                    <div className="h-full p-6 border rounded-xl hover:shadow-lg transition-all hover:-translate-y-1 bg-white dark:bg-neutral-900 border-neutral-200 dark:border-neutral-800">
                        <div className={`w-12 h-12 rounded-lg ${bucket.bgColor} dark:bg-opacity-20 flex items-center justify-center mb-4`}>
                            <bucket.icon style={{ color: bucket.iconColor }} size={24} />
                        </div>
                        <h3 className="text-xl font-bold mb-1 text-neutral-900 dark:text-neutral-100">{bucket.label}</h3>
                        <div className="text-sm font-semibold text-neutral-500 dark:text-neutral-400 mb-2 uppercase tracking-wide">{bucket.count}</div>
                        <p className="text-neutral-600 dark:text-neutral-400 text-sm leading-relaxed">
                            {bucket.desc}
                        </p>
                    </div>
                </Link>
            ))}
        </div>
    )
}
