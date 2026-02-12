/**
 * Mesh Visibility Slider Component
 * Interactive comparison showing high-quality black mesh vs cheap grey mesh
 * Demonstrates the "invisible view" effect
 */

'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';

export default function MeshVisibilitySlider() {
    const [sliderValue, setSliderValue] = useState(50);

    return (
        <div className="bg-white rounded-2xl p-6 shadow-lg">
            <div className="text-center mb-6">
                <h3 className="text-xl font-bold text-gray-900 mb-2 flex items-center justify-center gap-2">
                    <svg className="w-6 h-6 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" /></svg>
                    Tül Görünürlük Karşılaştırması
                </h3>
                <p className="text-gray-600 text-sm">
                    Kaydırıcıyı hareket ettirerek kaliteli siyah tül ile ucuz gri tül arasındaki
                    farkı görün
                </p>
            </div>

            {/* Comparison Container */}
            <div className="relative w-full aspect-video rounded-xl overflow-hidden bg-gray-100" id="mesh-slider-container">
                {/* Background Image (View) */}
                <div
                    className="absolute inset-0 bg-cover bg-center"
                    style={{
                        backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 800 400'%3E%3Cdefs%3E%3ClinearGradient id='sky' x1='0%25' y1='0%25' x2='0%25' y2='100%25'%3E%3Cstop offset='0%25' style='stop-color:%2387CEEB'/%3E%3Cstop offset='100%25' style='stop-color:%23E0F4FF'/%3E%3C/linearGradient%3E%3C/defs%3E%3Crect fill='url(%23sky)' width='800' height='400'/%3E%3Ccircle cx='650' cy='80' r='40' fill='%23FFD700'/%3E%3Cpath d='M0 280 Q200 200 400 280 T800 280 L800 400 L0 400 Z' fill='%2390EE90'/%3E%3Crect x='300' y='180' width='200' height='120' fill='%23D2691E'/%3E%3Crect x='350' y='220' width='40' height='50' fill='%2387CEEB'/%3E%3Crect x='410' y='220' width='40' height='50' fill='%2387CEEB'/%3E%3Cpath d='M280 180 L400 100 L520 180 Z' fill='%238B4513'/%3E%3C/svg%3E")`,
                    }}
                />

                {/* Low Quality Grey Mesh Overlay (Left Side) */}
                <div
                    className="absolute inset-0 transition-[clip-path] duration-100"
                    style={{
                        clipPath: `inset(0 ${100 - sliderValue}% 0 0)`,
                        background: `
                            repeating-linear-gradient(
                                0deg,
                                transparent,
                                transparent 2px,
                                rgba(128, 128, 128, 0.4) 2px,
                                rgba(128, 128, 128, 0.4) 3px
                            ),
                            repeating-linear-gradient(
                                90deg,
                                transparent,
                                transparent 2px,
                                rgba(128, 128, 128, 0.4) 2px,
                                rgba(128, 128, 128, 0.4) 3px
                            )
                        `,
                    }}
                >
                    {/* Label */}
                    <div className="absolute top-4 left-4 px-3 py-1 bg-gray-600/80 text-white text-sm rounded-lg">
                        Ucuz Gri Tül
                    </div>
                </div>

                {/* High Quality Black Mesh Overlay (Right Side) */}
                <div
                    className="absolute inset-0 transition-[clip-path] duration-100"
                    style={{
                        clipPath: `inset(0 0 0 ${sliderValue}%)`,
                        background: `
                            repeating-linear-gradient(
                                0deg,
                                transparent,
                                transparent 3px,
                                rgba(0, 0, 0, 0.15) 3px,
                                rgba(0, 0, 0, 0.15) 3.5px
                            ),
                            repeating-linear-gradient(
                                90deg,
                                transparent,
                                transparent 3px,
                                rgba(0, 0, 0, 0.15) 3px,
                                rgba(0, 0, 0, 0.15) 3.5px
                            )
                        `,
                    }}
                >
                    {/* Label */}
                    <div className="absolute top-4 right-4 px-3 py-1 bg-emerald-600/80 text-white text-sm rounded-lg">
                        Premium Siyah Tül
                    </div>
                </div>

                {/* Slider Handle */}
                <motion.div
                    className="absolute top-0 bottom-0 w-1 bg-white shadow-lg cursor-ew-resize"
                    style={{ left: `${sliderValue}%` }}
                    drag="x"
                    dragConstraints={{ left: 0, right: 0 }}
                    dragElastic={0}
                    onDrag={(_, info) => {
                        const container = document.getElementById('mesh-slider-container');
                        if (container) {
                            const rect = container.getBoundingClientRect();
                            const newValue = Math.max(
                                0,
                                Math.min(100, ((info.point.x - rect.left) / rect.width) * 100)
                            );
                            setSliderValue(newValue);
                        }
                    }}
                >
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-10 h-10 bg-white rounded-full shadow-lg flex items-center justify-center">
                        <svg
                            className="w-6 h-6 text-gray-500"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M8 9l4-4 4 4m0 6l-4 4-4-4"
                            />
                        </svg>
                    </div>
                </motion.div>
            </div>

            {/* Range Input for better mobile support */}
            <div className="mt-4">
                <input
                    type="range"
                    min="0"
                    max="100"
                    value={sliderValue}
                    onChange={(e) => setSliderValue(Number(e.target.value))}
                    className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-emerald-600"
                />
            </div>

            {/* Info Cards */}
            <div className="grid grid-cols-2 gap-4 mt-6">
                <div className="bg-gray-100 rounded-xl p-4">
                    <h4 className="font-semibold text-gray-700 mb-2 flex items-center gap-1">
                        <svg className="w-4 h-4 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
                        Ucuz Gri Tül
                    </h4>
                    <ul className="text-sm text-gray-500 space-y-1">
                        <li>• Görüşü %40 engeller</li>
                        <li>• Kalın ve belirgin dokuma</li>
                        <li>• Işığı emerek karartır</li>
                        <li>• Kısa ömürlü</li>
                    </ul>
                </div>
                <div className="bg-emerald-50 rounded-xl p-4">
                    <h4 className="font-semibold text-emerald-700 mb-2 flex items-center gap-1">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                        Premium Siyah Tül
                    </h4>
                    <ul className="text-sm text-emerald-600 space-y-1">
                        <li>• Neredeyse görünmez</li>
                        <li>• İnce ve şeffaf dokuma</li>
                        <li>• Net dış görüş</li>
                        <li>• 10+ yıl dayanıklılık</li>
                    </ul>
                </div>
            </div>

            {/* Scientific Note */}
            <div className="mt-4 p-4 bg-blue-50 rounded-xl">
                <p className="text-sm text-blue-700">
                    <strong className="inline-flex items-center gap-1"><svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" /></svg> Bilimsel Not:</strong> Siyah renkli tüller, gözün doğal odaklanma
                    özelliği sayesinde beyin tarafından &quot;görmezden gelinir&quot;. Bu nedenle
                    kaliteli siyah tüller sanki orada yokmuş gibi görünür (Invisible Mesh Effect).
                </p>
            </div>
        </div>
    );
}
