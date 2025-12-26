import { Zap, Brain, Lightbulb, Target, Shield, BarChart } from 'lucide-react'

export default function Stats() {
    return (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 my-12">
            <div className="p-6 bg-white dark:bg-neutral-900 border border-gray-100 dark:border-neutral-800 rounded-xl shadow-sm text-center">
                <div className="text-4xl font-black text-blue-600 mb-1">30</div>
                <div className="text-sm font-bold text-gray-500 uppercase tracking-wide">Features</div>
            </div>
            <div className="p-6 bg-white dark:bg-neutral-900 border border-gray-100 dark:border-neutral-800 rounded-xl shadow-sm text-center">
                <div className="text-4xl font-black text-violet-600 mb-1">6</div>
                <div className="text-sm font-bold text-gray-500 uppercase tracking-wide">Buckets</div>
            </div>
            <div className="p-6 bg-white dark:bg-neutral-900 border border-gray-100 dark:border-neutral-800 rounded-xl shadow-sm text-center">
                <div className="text-4xl font-black text-orange-500 mb-1">3</div>
                <div className="text-sm font-bold text-gray-500 uppercase tracking-wide">Support Tiers</div>
            </div>
            <div className="p-6 bg-white dark:bg-neutral-900 border border-gray-100 dark:border-neutral-800 rounded-xl shadow-sm text-center">
                <div className="text-4xl font-black text-emerald-500 mb-1">∞</div>
                <div className="text-sm font-bold text-gray-500 uppercase tracking-wide">Possibilities</div>
            </div>
        </div>
    )
}
