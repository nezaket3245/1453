/**
 * Price Estimator Component
 * Interactive calculator for fly screen pricing
 * Provides instant estimate based on dimensions and type
 */

'use client';

import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';

interface PriceRange {
    min: number;
    max: number;
}

interface SystemPricing {
    name: string;
    basePrice: PriceRange; // per m²
    installationFee: number;
    meshUpgrades: {
        name: string;
        addPerM2: number;
    }[];
}

const systemPricing: Record<string, SystemPricing> = {
    plise: {
        name: 'Plise Sineklik',
        basePrice: { min: 850, max: 1200 },
        installationFee: 150,
        meshUpgrades: [
            { name: 'Standart Fiberglass', addPerM2: 0 },
            { name: 'Premium Polyester', addPerM2: 100 },
            { name: 'PetScreen (Kedi)', addPerM2: 250 },
            { name: 'Poll-tex Alerji', addPerM2: 350 },
        ],
    },
    surme: {
        name: 'Sürme Sineklik',
        basePrice: { min: 550, max: 800 },
        installationFee: 100,
        meshUpgrades: [
            { name: 'Standart Fiberglass', addPerM2: 0 },
            { name: 'Premium Polyester', addPerM2: 80 },
            { name: 'PetScreen (Kedi)', addPerM2: 200 },
        ],
    },
    menteseli: {
        name: 'Menteşeli Sineklik',
        basePrice: { min: 600, max: 900 },
        installationFee: 120,
        meshUpgrades: [
            { name: 'Standart Fiberglass', addPerM2: 0 },
            { name: 'PetScreen (Kedi)', addPerM2: 200 },
            { name: 'Çelik Güvenlik', addPerM2: 500 },
        ],
    },
    stor: {
        name: 'Stor Sineklik',
        basePrice: { min: 950, max: 1400 },
        installationFee: 180,
        meshUpgrades: [
            { name: 'Standart Fiberglass', addPerM2: 0 },
            { name: 'Premium Polyester', addPerM2: 120 },
        ],
    },
    kedi: {
        name: 'Kedi Sinekliği',
        basePrice: { min: 1100, max: 1600 },
        installationFee: 200,
        meshUpgrades: [
            { name: 'TuffScreen 7x', addPerM2: 0 },
            { name: 'Çelik Takviyeli', addPerM2: 300 },
        ],
    },
};

export default function PriceEstimator() {
    const [systemType, setSystemType] = useState('plise');
    const [width, setWidth] = useState(100); // cm
    const [height, setHeight] = useState(200); // cm
    const [quantity, setQuantity] = useState(1);
    const [meshUpgrade, setMeshUpgrade] = useState(0);
    const [includeInstallation, setIncludeInstallation] = useState(true);

    const currentSystem = systemPricing[systemType];

    const estimate = useMemo(() => {
        const areaM2 = (width / 100) * (height / 100);
        const meshCost = currentSystem.meshUpgrades[meshUpgrade]?.addPerM2 || 0;

        const minUnitPrice = (currentSystem.basePrice.min + meshCost) * areaM2;
        const maxUnitPrice = (currentSystem.basePrice.max + meshCost) * areaM2;

        const installCost = includeInstallation ? currentSystem.installationFee * quantity : 0;

        return {
            areaM2: areaM2.toFixed(2),
            minTotal: Math.round((minUnitPrice * quantity) + installCost),
            maxTotal: Math.round((maxUnitPrice * quantity) + installCost),
            installCost,
        };
    }, [systemType, width, height, quantity, meshUpgrade, includeInstallation, currentSystem]);

    return (
        <div className="bg-gradient-to-br from-emerald-600 to-teal-700 rounded-3xl p-8 text-white">
            <div className="text-center mb-8">
                <span className="inline-flex items-center gap-2 px-3 py-1 bg-white/20 rounded-full text-sm font-medium mb-4">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                    Anında Fiyat Tahmini
                </span>
                <h3 className="text-2xl md:text-3xl font-bold mb-2">Sineklik Fiyat Hesaplayıcı</h3>
                <p className="text-emerald-50">
                    Ölçülerinizi girin, tahmini fiyatı anında görün
                </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
                {/* Input Section */}
                <div className="space-y-6">
                    {/* System Type */}
                    <div>
                        <label className="block text-sm font-medium text-emerald-100 mb-2">
                            Sineklik Tipi
                        </label>
                        <select
                            value={systemType}
                            onChange={(e) => {
                                setSystemType(e.target.value);
                                setMeshUpgrade(0);
                            }}
                            className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white focus:ring-2 focus:ring-white/50 focus:outline-none"
                        >
                            {Object.entries(systemPricing).map(([key, system]) => (
                                <option key={key} value={key} className="text-gray-900">
                                    {system.name}
                                </option>
                            ))}
                        </select>
                    </div>

                    {/* Dimensions */}
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-emerald-100 mb-2">
                                Genişlik (cm)
                            </label>
                            <input
                                type="number"
                                value={width}
                                onChange={(e) => setWidth(Number(e.target.value) || 0)}
                                min={30}
                                max={300}
                                className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white focus:ring-2 focus:ring-white/50 focus:outline-none"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-emerald-100 mb-2">
                                Yükseklik (cm)
                            </label>
                            <input
                                type="number"
                                value={height}
                                onChange={(e) => setHeight(Number(e.target.value) || 0)}
                                min={30}
                                max={300}
                                className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white focus:ring-2 focus:ring-white/50 focus:outline-none"
                            />
                        </div>
                    </div>

                    {/* Quantity */}
                    <div>
                        <label className="block text-sm font-medium text-emerald-100 mb-2">
                            Adet
                        </label>
                        <div className="flex items-center gap-4">
                            <button
                                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                                className="w-10 h-10 bg-white/20 rounded-lg hover:bg-white/30 transition-colors font-bold"
                            >
                                -
                            </button>
                            <span className="text-2xl font-bold w-12 text-center">{quantity}</span>
                            <button
                                onClick={() => setQuantity(Math.min(20, quantity + 1))}
                                className="w-10 h-10 bg-white/20 rounded-lg hover:bg-white/30 transition-colors font-bold"
                            >
                                +
                            </button>
                        </div>
                    </div>

                    {/* Mesh Upgrade */}
                    <div>
                        <label className="block text-sm font-medium text-emerald-100 mb-2">
                            Tül Seçimi
                        </label>
                        <div className="space-y-2">
                            {currentSystem.meshUpgrades.map((mesh, idx) => (
                                <label
                                    key={idx}
                                    className={`flex items-center justify-between px-4 py-3 rounded-xl cursor-pointer transition-colors ${
                                        meshUpgrade === idx
                                            ? 'bg-white/30 border-2 border-white'
                                            : 'bg-white/10 border-2 border-transparent hover:bg-white/20'
                                    }`}
                                >
                                    <div className="flex items-center gap-3">
                                        <input
                                            type="radio"
                                            name="mesh"
                                            checked={meshUpgrade === idx}
                                            onChange={() => setMeshUpgrade(idx)}
                                            className="w-4 h-4"
                                        />
                                        <span>{mesh.name}</span>
                                    </div>
                                    {mesh.addPerM2 > 0 && (
                                        <span className="text-emerald-200 text-sm">
                                            +{mesh.addPerM2}₺/m²
                                        </span>
                                    )}
                                </label>
                            ))}
                        </div>
                    </div>

                    {/* Installation */}
                    <label className="flex items-center gap-3 cursor-pointer">
                        <input
                            type="checkbox"
                            checked={includeInstallation}
                            onChange={(e) => setIncludeInstallation(e.target.checked)}
                            className="w-5 h-5 rounded"
                        />
                        <span>Montaj dahil ({currentSystem.installationFee}₺/adet)</span>
                    </label>
                </div>

                {/* Result Section */}
                <div className="flex flex-col justify-center">
                    <motion.div
                        key={`${systemType}-${width}-${height}-${quantity}-${meshUpgrade}`}
                        initial={{ scale: 0.95, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        className="bg-white rounded-2xl p-6 text-gray-900"
                    >
                        <div className="text-center mb-6">
                            <p className="text-sm text-gray-500 mb-1">Tahmini Fiyat Aralığı</p>
                            <p className="text-4xl font-black text-emerald-600">
                                {estimate.minTotal.toLocaleString('tr-TR')}₺ - {estimate.maxTotal.toLocaleString('tr-TR')}₺
                            </p>
                        </div>

                        <div className="space-y-3 text-sm border-t border-gray-100 pt-4">
                            <div className="flex justify-between">
                                <span className="text-gray-500">Alan</span>
                                <span className="font-medium">{estimate.areaM2} m² × {quantity} adet</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-gray-500">Sistem</span>
                                <span className="font-medium">{currentSystem.name}</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-gray-500">Tül</span>
                                <span className="font-medium">{currentSystem.meshUpgrades[meshUpgrade].name}</span>
                            </div>
                            {includeInstallation && (
                                <div className="flex justify-between">
                                    <span className="text-gray-500">Montaj</span>
                                    <span className="font-medium">{estimate.installCost}₺</span>
                                </div>
                            )}
                        </div>

                        <div className="mt-6 space-y-3">
                            <Link
                                href="/iletisim"
                                className="block w-full py-3 bg-emerald-600 hover:bg-emerald-700 text-white text-center font-semibold rounded-xl transition-colors"
                            >
                                Detaylı Bilgi İçin İletişime Geçin
                            </Link>
                        </div>

                        <p className="text-xs text-gray-600 text-center mt-4">
                            * Bu fiyatlar tahminidir. Kesin fiyat için ücretsiz keşif gereklidir.
                        </p>
                    </motion.div>
                </div>
            </div>
        </div>
    );
}
