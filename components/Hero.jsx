import Link from 'next/link'

export default function Hero() {
    return (
        <div className="py-20 text-center bg-gradient-to-b from-transparent to-blue-50/50 dark:to-neutral-900/50">
            <h1 className="text-5xl font-extrabold tracking-tight mb-6 bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-violet-600 dark:from-blue-400 dark:to-violet-400">
                Search Platform Hub
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto mb-10 leading-relaxed">
                Everything you need to sell, scope, and implement B2B search solutions.<br />
                <span className="font-semibold text-gray-900 dark:text-gray-200">31 features. 6 buckets. Endless possibilities.</span>
            </p>
            <div className="flex gap-4 justify-center">
                <Link href="/features" className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-lg transition-all shadow-lg shadow-blue-500/20">
                    Explore Features
                </Link>
                <Link href="/sales" className="px-6 py-3 bg-white hover:bg-gray-50 text-gray-900 font-bold border border-gray-200 rounded-lg transition-all">
                    Sales Playbook
                </Link>
            </div>
        </div>
    )
}
