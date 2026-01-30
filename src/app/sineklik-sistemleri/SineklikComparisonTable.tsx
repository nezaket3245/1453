/**
 * Sineklik Comparison Table Component
 * Interactive comparison matrix for fly screen systems
 * SEO: Helps users choose the right system
 */

'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import type { ComparisonCriteria } from '@/lib/sineklikData';

interface SystemRating {
    id: string;
    name: string;
    durability: number;
    easeOfUse: number;
    cleaning: number;
    aesthetics: number;
    pricePoint: number;
    spaceEfficiency: number;
}

interface SineklikComparisonTableProps {
    systems: SystemRating[];
    criteria: ComparisonCriteria[];
}

export default function SineklikComparisonTable({
    systems,
    criteria,
}: SineklikComparisonTableProps) {
    const [hoveredSystem, setHoveredSystem] = useState<string | null>(null);
    const [sortBy, setSortBy] = useState<string>('durability');

    const getCriteriaValue = (system: SystemRating, criteriaId: string): number => {
        return system[criteriaId as keyof SystemRating] as number;
    };

    const getRatingLabel = (value: number): string => {
        switch (value) {
            case 5:
                return 'Mükemmel';
            case 4:
                return 'İyi';
            case 3:
                return 'Orta';
            case 2:
                return 'Orta-Düşük';
            case 1:
                return 'Düşük';
            default:
                return '-';
        }
    };

    const getRatingColor = (value: number): string => {
        switch (value) {
            case 5:
                return 'bg-emerald-500';
            case 4:
                return 'bg-emerald-400';
            case 3:
                return 'bg-yellow-400';
            case 2:
                return 'bg-orange-400';
            case 1:
                return 'bg-red-400';
            default:
                return 'bg-gray-300';
        }
    };

    // Sort systems by selected criteria
    const sortedSystems = [...systems].sort((a, b) => {
        const aValue = getCriteriaValue(a, sortBy);
        const bValue = getCriteriaValue(b, sortBy);
        return bValue - aValue;
    });

    return (
        <div>
            <div className="text-center mb-10">
                <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                    📊 Sineklik Sistemleri Karşılaştırması
                </h2>
                <p className="text-gray-600 max-w-2xl mx-auto mb-6">
                    Plise, stor, menteşeli, sürme ve kedi sinekliği sistemlerini karşılaştırın.
                    İhtiyacınıza en uygun modeli seçmenize yardımcı oluyoruz.
                </p>

                {/* Sort Selector */}
                <div className="flex items-center justify-center gap-2">
                    <span className="text-sm text-gray-500">Sırala:</span>
                    <select
                        value={sortBy}
                        onChange={(e) => setSortBy(e.target.value)}
                        className="px-4 py-2 bg-white border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                    >
                        {criteria.map((c) => (
                            <option key={c.id} value={c.id}>
                                {c.label}
                            </option>
                        ))}
                    </select>
                </div>
            </div>

            {/* Desktop Table */}
            <div className="hidden lg:block overflow-x-auto">
                <table className="w-full border-collapse">
                    <thead>
                        <tr className="bg-gray-50">
                            <th className="text-left p-4 font-semibold text-gray-900 border-b">
                                Sistem
                            </th>
                            {criteria.map((c) => (
                                <th
                                    key={c.id}
                                    className="text-center p-4 font-semibold text-gray-900 border-b cursor-pointer hover:bg-gray-100"
                                    onClick={() => setSortBy(c.id)}
                                    title={c.description}
                                >
                                    <span
                                        className={
                                            sortBy === c.id
                                                ? 'text-emerald-600 underline'
                                                : ''
                                        }
                                    >
                                        {c.label}
                                    </span>
                                </th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {sortedSystems.map((system, idx) => (
                            <motion.tr
                                key={system.id}
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: idx * 0.05 }}
                                onMouseEnter={() => setHoveredSystem(system.id)}
                                onMouseLeave={() => setHoveredSystem(null)}
                                className={`border-b transition-colors ${
                                    hoveredSystem === system.id
                                        ? 'bg-emerald-50'
                                        : 'bg-white hover:bg-gray-50'
                                }`}
                            >
                                <td className="p-4 font-semibold text-gray-900">
                                    {idx === 0 && (
                                        <span className="inline-block px-2 py-1 bg-emerald-100 text-emerald-700 text-xs rounded mr-2">
                                            En İyi
                                        </span>
                                    )}
                                    {system.name}
                                </td>
                                {criteria.map((c) => {
                                    const value = getCriteriaValue(system, c.id);
                                    return (
                                        <td key={c.id} className="p-4 text-center">
                                            <div className="flex flex-col items-center">
                                                {/* Rating Bar */}
                                                <div className="flex gap-1 mb-1">
                                                    {[1, 2, 3, 4, 5].map((i) => (
                                                        <div
                                                            key={i}
                                                            className={`w-4 h-4 rounded-sm ${
                                                                i <= value
                                                                    ? getRatingColor(value)
                                                                    : 'bg-gray-200'
                                                            }`}
                                                        />
                                                    ))}
                                                </div>
                                                <span className="text-xs text-gray-500">
                                                    {getRatingLabel(value)}
                                                </span>
                                            </div>
                                        </td>
                                    );
                                })}
                            </motion.tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Mobile Cards */}
            <div className="lg:hidden space-y-4">
                {sortedSystems.map((system, idx) => (
                    <motion.div
                        key={system.id}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: idx * 0.05 }}
                        className="bg-white rounded-xl p-4 shadow-sm border border-gray-100"
                    >
                        <div className="flex items-center justify-between mb-4">
                            <h3 className="font-semibold text-gray-900">{system.name}</h3>
                            {idx === 0 && (
                                <span className="px-2 py-1 bg-emerald-100 text-emerald-700 text-xs rounded">
                                    En İyi
                                </span>
                            )}
                        </div>
                        <div className="grid grid-cols-2 gap-3">
                            {criteria.map((c) => {
                                const value = getCriteriaValue(system, c.id);
                                return (
                                    <div key={c.id}>
                                        <p className="text-xs text-gray-500 mb-1">{c.label}</p>
                                        <div className="flex gap-1">
                                            {[1, 2, 3, 4, 5].map((i) => (
                                                <div
                                                    key={i}
                                                    className={`w-4 h-4 rounded-sm ${
                                                        i <= value
                                                            ? getRatingColor(value)
                                                            : 'bg-gray-200'
                                                    }`}
                                                />
                                            ))}
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </motion.div>
                ))}
            </div>

            {/* Legend */}
            <div className="flex flex-wrap justify-center gap-4 mt-8 text-sm">
                {[
                    { value: 5, label: 'Mükemmel' },
                    { value: 4, label: 'İyi' },
                    { value: 3, label: 'Orta' },
                    { value: 2, label: 'Orta-Düşük' },
                    { value: 1, label: 'Düşük' },
                ].map((item) => (
                    <div key={item.value} className="flex items-center gap-2">
                        <div className={`w-4 h-4 rounded-sm ${getRatingColor(item.value)}`} />
                        <span className="text-gray-600">{item.label}</span>
                    </div>
                ))}
            </div>
        </div>
    );
}
