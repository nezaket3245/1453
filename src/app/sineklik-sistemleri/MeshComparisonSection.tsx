/**
 * Mesh Comparison Section Component
 * Compares Standard Mesh vs TuffScreen (Pet Screen)
 * SEO target: yırtılmaz tül, kedi sinekliği tül, toz tutmayan sineklik
 */

'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import type { MeshType } from '@/lib/sineklikData';

interface MeshComparisonSectionProps {
    meshTypes: MeshType[];
}

export default function MeshComparisonSection({ meshTypes }: MeshComparisonSectionProps) {
    const [selectedMesh, setSelectedMesh] = useState<string | null>(null);

    const getBarWidth = (value: number): string => {
        return `${value * 20}%`;
    };

    return (
        <div>
            <div className="text-center mb-10">
                <span className="inline-block px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm font-medium mb-4">
                    Tül Çeşitleri
                </span>
                <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                    🔬 Sineklik Tülü Karşılaştırması
                </h2>
                <p className="text-gray-600 max-w-2xl mx-auto">
                    Standart fiberglass, ithal polyester, TuffScreen (kedi sinekliği) ve çelik tül
                    arasındaki farkları öğrenin. Doğru tül seçimi, sinekliğinizin ömrünü ve
                    performansını belirler.
                </p>
            </div>

            {/* Desktop Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
                {meshTypes.map((mesh, idx) => (
                    <motion.div
                        key={mesh.id}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: idx * 0.1 }}
                        onClick={() =>
                            setSelectedMesh(selectedMesh === mesh.id ? null : mesh.id)
                        }
                        className={`bg-white rounded-2xl p-6 shadow-sm cursor-pointer transition-all duration-300 ${
                            selectedMesh === mesh.id
                                ? 'ring-2 ring-emerald-500 shadow-lg'
                                : 'hover:shadow-md border border-gray-100'
                        }`}
                    >
                        {/* Pet Resistant Badge */}
                        {mesh.petResistant && (
                            <span className="inline-block px-2 py-1 bg-amber-100 text-amber-700 text-xs font-medium rounded-full mb-3">
                                🐱 Evcil Hayvan Dayanıklı
                            </span>
                        )}
                        {mesh.dustResistant && !mesh.petResistant && (
                            <span className="inline-block px-2 py-1 bg-blue-100 text-blue-700 text-xs font-medium rounded-full mb-3">
                                ✨ Toz Tutmaz
                            </span>
                        )}

                        <h3 className="text-lg font-bold text-gray-900 mb-2">{mesh.name}</h3>
                        <p className="text-sm text-gray-500 mb-4">{mesh.material}</p>
                        <p className="text-sm text-gray-600 mb-4">{mesh.description}</p>

                        {/* Rating Bars */}
                        <div className="space-y-3">
                            <div>
                                <div className="flex justify-between text-xs mb-1">
                                    <span className="text-gray-500">Dayanıklılık</span>
                                    <span className="font-medium">{mesh.durability}/5</span>
                                </div>
                                <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                                    <div
                                        className="h-full bg-emerald-500 rounded-full transition-all duration-500"
                                        style={{ width: getBarWidth(mesh.durability) }}
                                    />
                                </div>
                            </div>
                            <div>
                                <div className="flex justify-between text-xs mb-1">
                                    <span className="text-gray-500">Görünürlük</span>
                                    <span className="font-medium">{mesh.visibility}/5</span>
                                </div>
                                <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                                    <div
                                        className="h-full bg-blue-500 rounded-full transition-all duration-500"
                                        style={{ width: getBarWidth(mesh.visibility) }}
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Expanded Details */}
                        {selectedMesh === mesh.id && (
                            <motion.div
                                initial={{ opacity: 0, height: 0 }}
                                animate={{ opacity: 1, height: 'auto' }}
                                className="mt-4 pt-4 border-t border-gray-100"
                            >
                                <p className="text-xs font-medium text-gray-700 mb-2">
                                    İdeal Kullanım:
                                </p>
                                <ul className="space-y-1">
                                    {mesh.idealFor.map((use, i) => (
                                        <li
                                            key={i}
                                            className="text-xs text-gray-500 flex items-center"
                                        >
                                            <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full mr-2" />
                                            {use}
                                        </li>
                                    ))}
                                </ul>
                            </motion.div>
                        )}
                    </motion.div>
                ))}
            </div>

            {/* Comparison Highlight */}
            <div className="mt-12 bg-gradient-to-r from-gray-900 to-gray-800 rounded-2xl p-8 text-white">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                    <div>
                        <h3 className="text-2xl font-bold mb-4">
                            Standart Tül vs TuffScreen Karşılaştırması
                        </h3>
                        <p className="text-gray-300 mb-4">
                            Evcil hayvan sahibiyseniz, standart fiberglass tül kesinlikle yeterli
                            değildir. Kedilerin tırnakları standart tülü kolayca yırtar. TuffScreen
                            teknolojisi ile bu sorun tamamen ortadan kalkar.
                        </p>
                        <div className="space-y-2">
                            <div className="flex items-center">
                                <span className="w-4 h-4 bg-red-500 rounded-full mr-3" />
                                <span className="text-sm">
                                    Standart Fiberglass: 6 ay - 1 yıl ömür (kedi varsa)
                                </span>
                            </div>
                            <div className="flex items-center">
                                <span className="w-4 h-4 bg-emerald-500 rounded-full mr-3" />
                                <span className="text-sm">
                                    TuffScreen: 5+ yıl garanti (kedi olsa bile)
                                </span>
                            </div>
                        </div>
                    </div>
                    <div className="text-center">
                        <div className="text-6xl opacity-50">🆚</div>
                    </div>
                </div>
            </div>

            {/* Additional Info Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
                <div className="bg-blue-50 rounded-xl p-6">
                    <div className="text-2xl mb-3">👁️</div>
                    <h4 className="font-bold text-gray-900 mb-2">Görüşü Engellemeyen Tül</h4>
                    <p className="text-sm text-gray-600">
                        İthal polyester tül, ince dokusuyla dışarı net görüş sağlar. Standart
                        fiberglass&apos;tan %30 daha net görüntü.
                    </p>
                </div>
                <div className="bg-purple-50 rounded-xl p-6">
                    <div className="text-2xl mb-3">🌬️</div>
                    <h4 className="font-bold text-gray-900 mb-2">Toz Tutmayan Nano Kaplama</h4>
                    <p className="text-sm text-gray-600">
                        Anti-dust nano kaplama ile toz ve polen tutmaz. Alerjik bireyler ve ana
                        yol kenarı evler için ideal.
                    </p>
                </div>
                <div className="bg-amber-50 rounded-xl p-6">
                    <div className="text-2xl mb-3">🔐</div>
                    <h4 className="font-bold text-gray-900 mb-2">Paslanmaz Çelik Güvenlik</h4>
                    <p className="text-sm text-gray-600">
                        304 paslanmaz çelik tül, kesime ve delmeye karşı tam koruma. Zemin katlar
                        ve güvenlik gereken alanlar için.
                    </p>
                </div>
            </div>
        </div>
    );
}
