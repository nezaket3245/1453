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
                <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4 flex items-center justify-center gap-3">
                    <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7" /></svg>
                    Sineklik Tülü Karşılaştırması
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
                        className={`bg-white rounded-2xl p-6 shadow-sm cursor-pointer transition-[box-shadow,width] duration-300 ${
                            selectedMesh === mesh.id
                                ? 'ring-2 ring-emerald-500 shadow-lg'
                                : 'hover:shadow-md border border-gray-100'
                        }`}
                    >
                        {/* Pet Resistant Badge */}
                        {mesh.petResistant && (
                            <span className="inline-flex items-center gap-1 px-2 py-1 bg-amber-100 text-amber-700 text-xs font-medium rounded-full mb-3">
                                <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" /></svg>
                                Evcil Hayvan Dayanıklı
                            </span>
                        )}
                        {mesh.dustResistant && !mesh.petResistant && (
                            <span className="inline-flex items-center gap-1 px-2 py-1 bg-blue-100 text-blue-700 text-xs font-medium rounded-full mb-3">
                                <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" /></svg>
                                Toz Tutmaz
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
                                        className="h-full bg-emerald-500 rounded-full transition-[box-shadow,width] duration-500"
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
                                        className="h-full bg-blue-500 rounded-full transition-[box-shadow,width] duration-500"
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
                                    TuffScreen: 5+ yıl dayanıklılık (kedi olsa bile)
                                </span>
                            </div>
                        </div>
                    </div>
                    <div className="text-center">
                        <span className="text-5xl font-black text-gray-500 opacity-50">VS</span>
                    </div>
                </div>
            </div>

            {/* Additional Info Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
                <div className="bg-blue-50 rounded-xl p-6">
                    <div className="mb-3"><svg className="w-7 h-7 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" /></svg></div>
                    <h4 className="font-bold text-gray-900 mb-2">Görüşü Engellemeyen Tül</h4>
                    <p className="text-sm text-gray-600">
                        İthal polyester tül, ince dokusuyla dışarı net görüş sağlar. Standart
                        fiberglass&apos;tan %30 daha net görüntü.
                    </p>
                </div>
                <div className="bg-purple-50 rounded-xl p-6">
                    <div className="mb-3"><svg className="w-7 h-7 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z" /></svg></div>
                    <h4 className="font-bold text-gray-900 mb-2">Toz Tutmayan Nano Kaplama</h4>
                    <p className="text-sm text-gray-600">
                        Anti-dust nano kaplama ile toz ve polen tutmaz. Alerjik bireyler ve ana
                        yol kenarı evler için ideal.
                    </p>
                </div>
                <div className="bg-amber-50 rounded-xl p-6">
                    <div className="mb-3"><svg className="w-7 h-7 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" /></svg></div>
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
