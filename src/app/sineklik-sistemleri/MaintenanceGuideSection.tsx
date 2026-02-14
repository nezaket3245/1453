/**
 * Maintenance Guide Section Component
 * Informational content for SEO: "Sineklik temizliği nasıl yapılır?"
 * Targets featured snippets with structured step-by-step content
 */

'use client';

import { motion } from '@/lib/motion-lite';

interface MaintenanceStep {
    title: string;
    description: string;
    tip: string;
}

interface MaintenanceGuideProps {
    guide: {
        title: string;
        intro: string;
        steps: MaintenanceStep[];
        warnings: string[];
    };
}

// JSON-LD Schema for HowTo
const howToSchema = {
    '@context': 'https://schema.org',
    '@type': 'HowTo',
    name: 'Sineklik Temizliği Nasıl Yapılır?',
    description:
        'Sineklik temizliği için adım adım rehber. Sinekliklerinizin uzun ömürlü olması için doğru temizlik yöntemlerini öğrenin.',
    image: 'https://egepenakcayapi.com/images/sineklik/yatay-plise-sineklik.png',
    totalTime: 'PT15M',
    estimatedCost: {
        '@type': 'MonetaryAmount',
        currency: 'TRY',
        value: '0',
    },
    supply: [
        { '@type': 'HowToSupply', name: 'Yumuşak bez veya mikrofiber' },
        { '@type': 'HowToSupply', name: 'Ilık su' },
        { '@type': 'HowToSupply', name: 'Az miktarda bulaşık deterjanı' },
        { '@type': 'HowToSupply', name: 'Silikon sprey (mekanizma için)' },
    ],
    tool: [
        { '@type': 'HowToTool', name: 'Yumuşak fırça' },
        { '@type': 'HowToTool', name: 'Elektrikli süpürge (opsiyonel)' },
    ],
    step: [
        {
            '@type': 'HowToStep',
            name: 'Kuru Temizlik',
            text: 'Yumuşak bir fırça veya mikrofiber bez ile toz ve kiri alın.',
            position: 1,
        },
        {
            '@type': 'HowToStep',
            name: 'Islak Temizlik',
            text: 'Ilık su ve az miktarda bulaşık deterjanı karışımıyla tülü nazikçe silin.',
            position: 2,
        },
        {
            '@type': 'HowToStep',
            name: 'Profil Temizliği',
            text: 'Alüminyum profilleri nemli bezle silin. Ray ve mekanizma kısımlarını kuru tutun.',
            position: 3,
        },
        {
            '@type': 'HowToStep',
            name: 'Mekanizma Bakımı',
            text: 'Plise sistemlerde ip gerginliğini kontrol edin. Sürme sistemlerde tekerlekleri silikon sprey ile yağlayın.',
            position: 4,
        },
    ],
};

export default function MaintenanceGuideSection({ guide }: MaintenanceGuideProps) {
    return (
        <div>
            {/* JSON-LD Schema */}
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                    __html: JSON.stringify(howToSchema),
                }}
            />

            <div className="max-w-4xl mx-auto">
                <div className="text-center mb-10">
                    <span className="inline-block px-3 py-1 bg-teal-100 text-teal-700 rounded-full text-sm font-medium mb-4">
                        Bakım Rehberi
                    </span>
                    <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4 flex items-center justify-center gap-3">
                        <svg className="w-8 h-8 text-teal-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" /></svg>
                        {guide.title}
                    </h2>
                    <p className="text-gray-600">{guide.intro}</p>
                </div>

                {/* Steps Timeline */}
                <div className="relative">
                    {/* Vertical Line */}
                    <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-teal-200 hidden md:block" />

                    <div className="space-y-8">
                        {guide.steps.map((step, idx) => (
                            <motion.div
                                key={idx}
                                initial={{ opacity: 0, x: -20 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: idx * 0.1 }}
                                className="flex gap-6"
                            >
                                {/* Step Number */}
                                <div className="flex-shrink-0">
                                    <div className="w-12 h-12 bg-teal-500 text-white rounded-full flex items-center justify-center font-bold text-lg shadow-lg relative z-10">
                                        {idx + 1}
                                    </div>
                                </div>

                                {/* Step Content */}
                                <div className="flex-1 bg-white rounded-xl p-6 shadow-sm border border-gray-100">
                                    <h3 className="text-lg font-bold text-gray-900 mb-2">
                                        {step.title}
                                    </h3>
                                    <p className="text-gray-600 mb-3">{step.description}</p>
                                    <div className="flex items-start bg-teal-50 rounded-lg p-3">
                                        <svg className="w-5 h-5 text-teal-600 mr-2 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" /></svg>
                                        <p className="text-sm text-teal-700">{step.tip}</p>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>

                {/* Warnings Section */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="mt-10 bg-red-50 border border-red-200 rounded-xl p-6"
                >
                    <h3 className="text-lg font-bold text-red-700 mb-4 flex items-center">
                        <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4.5c-.77-.833-2.694-.833-3.464 0L3.34 16.5c-.77.833.192 2.5 1.732 2.5z" /></svg>
                        Dikkat Edilmesi Gerekenler
                    </h3>
                    <ul className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        {guide.warnings.map((warning, idx) => (
                            <li key={idx} className="flex items-center text-red-600">
                                <span className="w-2 h-2 bg-red-400 rounded-full mr-3" />
                                {warning}
                            </li>
                        ))}
                    </ul>
                </motion.div>

                {/* Pro Tips */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="mt-8 bg-gradient-to-r from-teal-600 to-emerald-600 rounded-xl p-6 text-white"
                >
                    <h3 className="text-lg font-bold mb-4 flex items-center">
                        <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" /></svg>
                        Profesyonel İpuçları
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="bg-white/10 rounded-lg p-4">
                            <h4 className="font-semibold mb-2">Mevsimlik Temizlik</h4>
                            <p className="text-sm text-emerald-50">
                                Bahar ve sonbaharda (polen sezonu) sineklikleri 2 haftada bir
                                kontrol edin ve gerekirse temizleyin.
                            </p>
                        </div>
                        <div className="bg-white/10 rounded-lg p-4">
                            <h4 className="font-semibold mb-2">Tül Kontrolü</h4>
                            <p className="text-sm text-emerald-50">
                                Yılda bir kez tülü dikkatli inceleyin. Küçük delik veya yırtıklar
                                erken tespit edilirse tamir yapılabilir.
                            </p>
                        </div>
                        <div className="bg-white/10 rounded-lg p-4">
                            <h4 className="font-semibold mb-2">Profesyonel Bakım</h4>
                            <p className="text-sm text-emerald-50">
                                3-5 yılda bir profesyonel bakım yaptırın. Mekanizma ayarları ve
                                yağlama işlemleri uzman tarafından yapılmalı.
                            </p>
                        </div>
                        <div className="bg-white/10 rounded-lg p-4">
                            <h4 className="font-semibold mb-2">Kışa Hazırlık</h4>
                            <p className="text-sm text-emerald-50">
                                Sökülmesi mümkün olan sineklikleri kış aylarında çıkarıp temiz
                                bir ortamda saklayabilirsiniz.
                            </p>
                        </div>
                    </div>
                </motion.div>
            </div>
        </div>
    );
}
