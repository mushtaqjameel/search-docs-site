import { Database, Users, Shield } from 'lucide-react'

export default function ThreePillars() {
    return (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 my-12">
            {/* Data Dependence */}
            <div className="p-6 border rounded-xl bg-white dark:bg-neutral-900 border-neutral-200 dark:border-neutral-800">
                <div className="mb-4 text-cyan-500">
                    <Database size={48} />
                </div>
                <h3 className="text-xl font-bold mb-2">Data Dependence</h3>
                <p className="text-sm text-neutral-600 dark:text-neutral-400 mb-4">
                    What data does this feature need to perform well?
                </p>
                <div className="space-y-2 text-sm">
                    <div className="flex items-center gap-2">
                        <span className="w-2.5 h-2.5 rounded-full bg-green-500"></span>
                        <span className="text-neutral-700 dark:text-neutral-300"><strong>Green:</strong> Works with basic catalog</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <span className="w-2.5 h-2.5 rounded-full bg-yellow-400"></span>
                        <span className="text-neutral-700 dark:text-neutral-300"><strong>Yellow:</strong> Needs rich data or behavioral</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <span className="w-2.5 h-2.5 rounded-full bg-red-500"></span>
                        <span className="text-neutral-700 dark:text-neutral-300"><strong>Red:</strong> Requires multiple data sources</span>
                    </div>
                </div>
            </div>

            {/* Governance Required */}
            <div className="p-6 border rounded-xl bg-neutral-50 dark:bg-neutral-800 border-neutral-200 dark:border-neutral-700 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-24 h-24 bg-neutral-200 dark:bg-neutral-700 rounded-bl-full -mr-4 -mt-4 opacity-20"></div>
                <div className="mb-4 text-cyan-500">
                    <Users size={48} />
                </div>
                <h3 className="text-xl font-bold mb-2">Governance Required</h3>
                <p className="text-sm text-neutral-600 dark:text-neutral-400 mb-4">
                    How much ongoing attention does this feature need?
                </p>
                <div className="space-y-2 text-sm">
                    <div className="flex items-center gap-2">
                        <span className="w-2.5 h-2.5 rounded-full bg-green-500"></span>
                        <span className="text-neutral-700 dark:text-neutral-300"><strong>Green:</strong> Set and forget</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <span className="w-2.5 h-2.5 rounded-full bg-yellow-400"></span>
                        <span className="text-neutral-700 dark:text-neutral-300"><strong>Yellow:</strong> Periodic review needed</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <span className="w-2.5 h-2.5 rounded-full bg-red-500"></span>
                        <span className="text-neutral-700 dark:text-neutral-300"><strong>Red:</strong> Ongoing attention required</span>
                    </div>
                </div>
            </div>

            {/* Operational Safety */}
            <div className="p-6 border rounded-xl bg-white dark:bg-neutral-900 border-neutral-200 dark:border-neutral-800">
                <div className="mb-4 text-cyan-500">
                    <Shield size={48} />
                </div>
                <h3 className="text-xl font-bold mb-2">Operational Safety</h3>
                <p className="text-sm text-neutral-600 dark:text-neutral-400 mb-4">
                    How risky is this feature to operate?
                </p>
                <div className="space-y-2 text-sm">
                    <div className="flex items-center gap-2">
                        <span className="w-2.5 h-2.5 rounded-full bg-green-500"></span>
                        <span className="text-neutral-700 dark:text-neutral-300"><strong>Green:</strong> Idiot-proof, safe to hand off</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <span className="w-2.5 h-2.5 rounded-full bg-yellow-400"></span>
                        <span className="text-neutral-700 dark:text-neutral-300"><strong>Yellow:</strong> Training needed</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <span className="w-2.5 h-2.5 rounded-full bg-red-500"></span>
                        <span className="text-neutral-700 dark:text-neutral-300"><strong>Red:</strong> Expert supervision required</span>
                    </div>
                </div>
            </div>
        </div>
    )
}
