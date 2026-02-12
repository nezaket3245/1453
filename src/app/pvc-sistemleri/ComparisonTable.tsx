"use client";

import { motion } from "@/lib/motion-lite";
import { pvcProductSeries, comparisonMetrics, PVCProductSeries } from "@/lib/pvcData";

/**
 * Product Series Comparison Table
 * Dynamic technical specifications comparison matrix with WCAG AA accessibility.
 */
export function ComparisonTable() {
    // Filter only window series for main comparison
    const windowSeries = pvcProductSeries.filter(p => p.category === "pencere");

    return (
        <div className="overflow-x-auto" role="region" aria-label="Pencere serileri karşılaştırma tablosu" tabIndex={0}>
            <motion.table
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="w-full min-w-[800px] border-collapse"
            >
                <caption className="sr-only">Egepen Deceuninck PVC pencere serileri teknik özellik karşılaştırması</caption>
                <thead>
                    <tr className="bg-primary-600 text-white">
                        <th scope="col" className="p-4 text-left font-bold rounded-tl-xl">Teknik Özellik</th>
                        {windowSeries.map((series) => (
                            <th scope="col" key={series.id} className="p-4 text-center font-bold">
                                {series.name.replace(" Serisi", "")}
                            </th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {comparisonMetrics.map((metric, idx) => (
                        <tr
                            key={metric.key}
                            className={idx % 2 === 0 ? "bg-white" : "bg-neutral-50"}
                        >
                            <th scope="row" className="p-4 border-b border-neutral-200 text-left font-normal">
                                <div className="flex items-center gap-2">
                                    <span className="text-xl" aria-hidden="true">{metric.icon}</span>
                                    <span className="font-medium text-neutral-800">{metric.label}</span>
                                    {metric.unit && <span className="text-neutral-500 text-sm">({metric.unit})</span>}
                                </div>
                            </th>
                            {windowSeries.map((series) => {
                                const value = series.technicalSpecs[metric.key as keyof PVCProductSeries["technicalSpecs"]];
                                const displayValue = value !== undefined ? String(value) : "-";
                                return (
                                    <td key={series.id} className="p-4 text-center border-b border-neutral-200">
                                        <span className={getValueClass(metric.key, value ?? "-")}>
                                            {displayValue}
                                        </span>
                                    </td>
                                );
                            })}
                        </tr>
                    ))}
                </tbody>
            </motion.table>
        </div>
    );
}

/**
 * Sliding Systems Comparison Table
 * Accessible comparison for PVC sliding door/window series.
 */
export function SlidingComparisonTable() {
    const slidingSeries = pvcProductSeries.filter(p => p.category === "surme");

    return (
        <div className="overflow-x-auto" role="region" aria-label="Sürme sistemleri karşılaştırma tablosu" tabIndex={0}>
            <motion.table
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="w-full min-w-[600px] border-collapse"
            >
                <caption className="sr-only">Egepen Deceuninck PVC sürme sistemleri teknik özellik karşılaştırması</caption>
                <thead>
                    <tr className="bg-secondary-600 text-white">
                        <th scope="col" className="p-4 text-left font-bold rounded-tl-xl">Teknik Özellik</th>
                        {slidingSeries.map((series) => (
                            <th scope="col" key={series.id} className="p-4 text-center font-bold">
                                {series.name.replace(" Sürme", "")}
                            </th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {comparisonMetrics.map((metric, idx) => (
                        <tr
                            key={metric.key}
                            className={idx % 2 === 0 ? "bg-white" : "bg-neutral-50"}
                        >
                            <th scope="row" className="p-4 border-b border-neutral-200 text-left font-normal">
                                <div className="flex items-center gap-2">
                                    <span className="text-xl" aria-hidden="true">{metric.icon}</span>
                                    <span className="font-medium text-neutral-800">{metric.label}</span>
                                </div>
                            </th>
                            {slidingSeries.map((series) => {
                                const value = series.technicalSpecs[metric.key as keyof PVCProductSeries["technicalSpecs"]];
                                const displayValue = value !== undefined ? String(value) : "-";
                                return (
                                    <td key={series.id} className="p-4 text-center border-b border-neutral-200">
                                        {displayValue}
                                    </td>
                                );
                            })}
                        </tr>
                    ))}
                </tbody>
            </motion.table>
        </div>
    );
}

/**
 * Helper function to apply color coding based on value quality
 */
function getValueClass(key: string, value: string | number): string {
    const baseClass = "font-semibold";

    // Highlight best thermal values
    if (key === "thermalInsulation") {
        const strValue = String(value);
        if (strValue.includes("0.8") || strValue.includes("0.9")) {
            return `${baseClass} text-green-600`;
        }
        if (strValue.includes("1.0") || strValue.includes("1.1")) {
            return `${baseClass} text-blue-600`;
        }
    }

    // Highlight chamber count
    if (key === "chambers") {
        if (Number(value) >= 6) return `${baseClass} text-green-600`;
        if (Number(value) >= 5) return `${baseClass} text-blue-600`;
    }

    // Highlight profile width
    if (key === "profileWidth") {
        if (Number(value) >= 80) return `${baseClass} text-green-600`;
        if (Number(value) >= 76) return `${baseClass} text-blue-600`;
    }

    return baseClass;
}
