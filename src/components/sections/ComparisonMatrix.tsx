'use client';

import { comparisonMatrix, comparisonCriteria } from '@/lib/camBalkonData';

/**
 * Interactive Comparison Matrix for Cam Balkon systems
 * SEO: High-value comparison data to gain featured snippets
 */
export function ComparisonMatrix() {
    return (
        <div className="w-full overflow-x-auto rounded-2xl border border-neutral-200 bg-white shadow-lg">
            <table className="w-full text-left border-collapse min-w-[800px]">
                <thead>
                    <tr className="bg-neutral-900 text-white">
                        <th className="p-6 font-bold sticky left-0 bg-neutral-900 z-10 w-48">Sistemler</th>
                        {comparisonCriteria.map((criteria) => (
                            <th key={criteria.id} className="p-6 font-bold text-center">
                                <div className="flex flex-col items-center">
                                    <span>{criteria.label}</span>
                                    <span className="text-[10px] font-normal opacity-60 mt-1 max-w-[120px] text-center line-clamp-1">
                                        {criteria.description}
                                    </span>
                                </div>
                            </th>
                        ))}
                    </tr>
                </thead>
                <tbody className="divide-y divide-neutral-100">
                    {comparisonMatrix.systems.map((system) => (
                        <tr key={system.id} className="hover:bg-neutral-50 transition-colors">
                            <td className="p-6 font-bold text-neutral-900 sticky left-0 bg-white z-10 border-r border-neutral-100 shadow-[2px_0_5px_rgba(0,0,0,0.02)]">
                                {system.name}
                            </td>
                            {comparisonCriteria.map((criteria) => {
                                const value = (system as any)[criteria.id] as number;
                                return (
                                    <td key={criteria.id} className="p-6">
                                        <div className="flex flex-col items-center gap-2">
                                            {/* Star/Bar Rating representation */}
                                            <div className="flex gap-1">
                                                {[1, 2, 3, 4, 5].map((star) => (
                                                    <div
                                                        key={star}
                                                        className={`h-1.5 w-4 rounded-full transition-all ${star <= value
                                                                ? 'bg-primary-500 scale-x-110 shadow-[0_0_8px_rgba(0,102,230,0.3)]'
                                                                : 'bg-neutral-200'
                                                            }`}
                                                    />
                                                ))}
                                            </div>
                                            <span className="text-xs font-semibold text-neutral-500 uppercase tracking-wider">
                                                {comparisonMatrix.legend[value as keyof typeof comparisonMatrix.legend]}
                                            </span>
                                        </div>
                                    </td>
                                );
                            })}
                        </tr>
                    ))}
                </tbody>
            </table>

            {/* Legend for Mobile / Help */}
            <div className="p-6 bg-neutral-50 border-t border-neutral-100">
                <div className="flex flex-wrap gap-6 items-center justify-center text-sm text-neutral-500">
                    <span className="font-bold text-neutral-700">Puanlama:</span>
                    <div className="flex items-center gap-2">
                        <div className="h-1.5 w-4 rounded-full bg-primary-500"></div>
                        <span>1: En Düşük</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <div className="h-1.5 w-4 rounded-full bg-primary-500"></div>
                        <div className="h-1.5 w-4 rounded-full bg-primary-500"></div>
                        <div className="h-1.5 w-4 rounded-full bg-primary-500"></div>
                        <div className="h-1.5 w-4 rounded-full bg-primary-500"></div>
                        <div className="h-1.5 w-4 rounded-full bg-primary-500"></div>
                        <span>5: En Yüksek</span>
                    </div>
                </div>
            </div>
        </div>
    );
}
