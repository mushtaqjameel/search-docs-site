import { Search, Brain, Lightbulb, Target, Shield, BarChart } from 'lucide-react'
import Link from 'next/link'

const buckets = [
    { id: 'core', icon: Search, label: 'Core Search', count: '8 features', bgColor: 'bg-cyan-100', iconColor: '#0891b2', desc: 'Get to products fast. Navigation, filtering, and discovery fundamentals.' },
    { id: 'smart', icon: Brain, label: 'AI Search', count: '6 features', bgColor: 'bg-purple-100', iconColor: '#9333ea', desc: 'AI that understands intent and ranks results intelligently.' },
    { id: 'discovery', icon: Lightbulb, label: 'Discovery', count: '7 features', bgColor: 'bg-amber-100', iconColor: '#d97706', desc: 'Cross-sell, recommend, and speed up repeat purchases.' },
    { id: 'merchandising', icon: Target, label: 'Merchandising', count: '6 features', bgColor: 'bg-red-100', iconColor: '#dc2626', desc: 'Business users shape search results and monitor performance.' },
    { id: 'recovery', icon: Shield, label: 'Recovery', count: '2 features', bgColor: 'bg-green-100', iconColor: '#16a34a', desc: 'Never dead-end a search. Always provide relevant results.' },
    { id: 'analytics', icon: BarChart, label: 'Analytics', count: '2 features', bgColor: 'bg-blue-100', iconColor: '#2563eb', desc: 'Measure, learn, and continuously improve search performance.' }
];

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

