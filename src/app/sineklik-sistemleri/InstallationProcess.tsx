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

function StepIcon({ name, className = 'w-5 h-5' }: { name: string; className?: string }) {
    const icons: Record<string, React.ReactNode> = {
        ruler: <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8l-6-6zM9 8h1M9 12h1M9 16h1" /></svg>,
        factory: <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0H5m14 0h2m-2 0v-2M5 21H3m2 0v-2m4-14v4m4-4v4" /></svg>,
        calendar: <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>,
        wrench: <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.066 2.573c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.573 1.066c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.066-2.573c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /></svg>,
        book: <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" /></svg>,
    };
    return <>{icons[name] || null}</>;
}

const installationSteps: InstallationStep[] = [
    {
        id: 1,
        title: 'Ücretsiz Keşif',
        description: 'Uzman ekibimiz evinize gelir ve ölçü alır',
        duration: '30-45 dk',
        icon: 'ruler',
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
        icon: 'factory',
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
        icon: 'calendar',
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
        icon: 'wrench',
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
        icon: 'book',
        details: [
            'Açma-kapama gösterimi',
            'Temizlik tavsiyeleri',
            'Belge teslimi',
            'Servis hattı bilgisi',
        ],
    },
];

export default function InstallationProcess() {
    const [activeStep, setActiveStep] = useState(1);

    return (
        <div className="bg-white rounded-3xl shadow-xl overflow-hidden">
            <div className="p-6 md:p-8 bg-gradient-to-r from-slate-800 to-slate-900 text-white">
                <h3 className="text-2xl md:text-3xl font-bold mb-2 flex items-center gap-3">
                    <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.066 2.573c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.573 1.066c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.066-2.573c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
                    Profesyonel Montaj Süreci
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
                                    className={`w-12 h-12 rounded-full flex items-center justify-center text-xl z-10 transition-colors ${
                                        step.id <= activeStep
                                            ? 'bg-emerald-500 text-white shadow-lg shadow-emerald-500/30'
                                            : 'bg-gray-200 text-gray-600'
                                    }`}
                                    whileHover={{ scale: 1.1 }}
                                    whileTap={{ scale: 0.95 }}
                                >
                                    <StepIcon name={step.icon} />
                                </motion.div>
                                <span
                                    className={`mt-2 text-xs font-medium hidden md:block ${
                                        step.id === activeStep ? 'text-emerald-600' : 'text-gray-600'
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
                            <span className="text-emerald-600">
                                <StepIcon name={installationSteps[activeStep - 1].icon} className="w-10 h-10" />
                            </span>
                            <div>
                                <h4 className="text-xl font-bold text-gray-900">
                                    {activeStep}. {installationSteps[activeStep - 1].title}
                                </h4>
                                <p className="text-emerald-600 font-medium">
                                    <svg className="w-4 h-4 inline mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                                    {installationSteps[activeStep - 1].duration}
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
                    <div className="text-sm text-gray-600">
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
