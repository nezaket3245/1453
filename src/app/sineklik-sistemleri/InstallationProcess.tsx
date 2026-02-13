/**
 * Installation Process Component
 * Visual timeline showing professional installation steps
 * Builds trust and sets expectations
 */

'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';

interface InstallationStep {
    id: number;
    title: string;
    description: string;
    duration: string;
    icon: string;
    details: string[];
}

const installationSteps: InstallationStep[] = [
    {
        id: 1,
        title: 'Ücretsiz Keşif',
        description: 'Uzman ekibimiz evinize gelir ve ölçü alır',
        duration: '30-45 dk',
        icon: '📐',
        details: [
            'Pencere ve kapı ölçüleri alınır',
            'Kasa tipi ve montaj yöntemi belirlenir',
            'Tül ve renk seçenekleri sunulur',
            'Detaylı fiyat teklifi hazırlanır',
        ],
    },
    {
        id: 2,
        title: 'Üretim',
        description: 'Özel ölçülerinize göre üretim yapılır',
        duration: '3-5 iş günü',
        icon: '🏭',
        details: [
            'Profiller özel ölçüde kesilir',
            'Tül seçiminize göre monte edilir',
            'Köşe birleştirmeleri yapılır',
            'Kalite kontrol uygulanır',
        ],
    },
    {
        id: 3,
        title: 'Randevu',
        description: 'Size uygun montaj tarihi belirlenir',
        duration: 'Aynı hafta',
        icon: '📅',
        details: [
            'WhatsApp ile iletişim',
            'Sabah veya öğleden sonra seçeneği',
            'Hafta sonu montaj mümkün',
            'SMS ile hatırlatma',
        ],
    },
    {
        id: 4,
        title: 'Profesyonel Montaj',
        description: 'Deneyimli ekibimiz montajı tamamlar',
        duration: '15-30 dk/adet',
        icon: '🔧',
        details: [
            'Temiz ve düzenli çalışma',
            'Vidasız montaj seçeneği',
            'Su terazisi ile hizalama',
            'Mekanizma testi',
        ],
    },
    {
        id: 5,
        title: 'Kullanım Eğitimi',
        description: 'Doğru kullanım ve bakım bilgisi verilir',
        duration: '5-10 dk',
        icon: '📚',
        details: [
            'Açma-kapama gösterimi',
            'Temizlik tavsiyeleri',
            'Servis hattı bilgisi',
        ],
    },
];

export default function InstallationProcess() {
    const [activeStep, setActiveStep] = useState(1);

    return (
        <div className="bg-white rounded-3xl shadow-xl overflow-hidden">
            <div className="p-6 md:p-8 bg-gradient-to-r from-slate-800 to-slate-900 text-white">
                <h3 className="text-2xl md:text-3xl font-bold mb-2">
                    🔧 Profesyonel Montaj Süreci
                </h3>
                <p className="text-slate-300">
                    Keşiften montaja kadar her adımda yanınızdayız
                </p>
            </div>

            <div className="p-6 md:p-8">
                {/* Timeline Progress */}
                <div className="relative mb-8">
                    {/* Progress Bar Background */}
                    <div className="absolute top-6 left-0 right-0 h-1 bg-gray-200 rounded-full" />
                    
                    {/* Active Progress */}
                    <motion.div
                        className="absolute top-6 left-0 h-1 bg-emerald-500 rounded-full"
                        initial={{ width: '0%' }}
                        animate={{ width: `${((activeStep - 1) / (installationSteps.length - 1)) * 100}%` }}
                        transition={{ duration: 0.3 }}
                    />

                    {/* Step Indicators */}
                    <div className="relative flex justify-between">
                        {installationSteps.map((step) => (
                            <button
                                key={step.id}
                                onClick={() => setActiveStep(step.id)}
                                className="flex flex-col items-center group"
                            >
                                <motion.div
                                    className={`w-12 h-12 rounded-full flex items-center justify-center text-xl z-10 transition-all ${
                                        step.id <= activeStep
                                            ? 'bg-emerald-500 text-white shadow-lg shadow-emerald-500/30'
                                            : 'bg-gray-200 text-gray-400'
                                    }`}
                                    whileHover={{ scale: 1.1 }}
                                    whileTap={{ scale: 0.95 }}
                                >
                                    {step.icon}
                                </motion.div>
                                <span
                                    className={`mt-2 text-xs font-medium hidden md:block ${
                                        step.id === activeStep ? 'text-emerald-600' : 'text-gray-400'
                                    }`}
                                >
                                    {step.title}
                                </span>
                            </button>
                        ))}
                    </div>
                </div>

                {/* Step Details */}
                <motion.div
                    key={activeStep}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="grid md:grid-cols-2 gap-6"
                >
                    {/* Left: Info */}
                    <div className="bg-emerald-50 rounded-2xl p-6">
                        <div className="flex items-center gap-3 mb-4">
                            <span className="text-4xl">
                                {installationSteps[activeStep - 1].icon}
                            </span>
                            <div>
                                <h4 className="text-xl font-bold text-gray-900">
                                    {activeStep}. {installationSteps[activeStep - 1].title}
                                </h4>
                                <p className="text-emerald-600 font-medium">
                                    ⏱️ {installationSteps[activeStep - 1].duration}
                                </p>
                            </div>
                        </div>
                        <p className="text-gray-600 mb-4">
                            {installationSteps[activeStep - 1].description}
                        </p>
                    </div>

                    {/* Right: Details */}
                    <div className="space-y-3">
                        <h5 className="font-semibold text-gray-900">Bu adımda yapılanlar:</h5>
                        {installationSteps[activeStep - 1].details.map((detail, idx) => (
                            <motion.div
                                key={idx}
                                initial={{ opacity: 0, x: -10 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: idx * 0.1 }}
                                className="flex items-center gap-3"
                            >
                                <span className="w-6 h-6 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center text-sm flex-shrink-0">
                                    ✓
                                </span>
                                <span className="text-gray-700">{detail}</span>
                            </motion.div>
                        ))}
                    </div>
                </motion.div>

                {/* Navigation */}
                <div className="flex justify-between mt-8 pt-6 border-t border-gray-100">
                    <button
                        onClick={() => setActiveStep(Math.max(1, activeStep - 1))}
                        disabled={activeStep === 1}
                        className="px-4 py-2 text-gray-500 hover:text-gray-700 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
                    >
                        ← Önceki
                    </button>
                    <div className="text-sm text-gray-400">
                        Adım {activeStep} / {installationSteps.length}
                    </div>
                    <button
                        onClick={() => setActiveStep(Math.min(installationSteps.length, activeStep + 1))}
                        disabled={activeStep === installationSteps.length}
                        className="px-4 py-2 text-emerald-600 hover:text-emerald-700 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
                    >
                        Sonraki →
                    </button>
                </div>
            </div>
        </div>
    );
}
