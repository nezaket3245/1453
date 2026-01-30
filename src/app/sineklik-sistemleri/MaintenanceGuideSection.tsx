/**
 * Maintenance Guide Section Component
 * Informational content for SEO: "Sineklik temizliği nasıl yapılır?"
 * Targets featured snippets with structured step-by-step content
 */

'use client';

import { motion } from 'framer-motion';

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
    image: 'https://www.egepenakcayapi.com.tr/images/sineklik/yatay-plise-sineklik.png',
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
                    <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                        🧹 {guide.title}
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
                                        <span className="text-teal-600 mr-2">💡</span>
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
                        <span className="mr-2">⚠️</span>
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
                        <span className="mr-2">🏆</span>
                        Profesyonel İpuçları
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="bg-white/10 rounded-lg p-4">
                            <h4 className="font-semibold mb-2">Mevsimlik Temizlik</h4>
                            <p className="text-sm text-teal-100">
                                Bahar ve sonbaharda (polen sezonu) sineklikleri 2 haftada bir
                                kontrol edin ve gerekirse temizleyin.
                            </p>
                        </div>
                        <div className="bg-white/10 rounded-lg p-4">
                            <h4 className="font-semibold mb-2">Tül Kontrolü</h4>
                            <p className="text-sm text-teal-100">
                                Yılda bir kez tülü dikkatli inceleyin. Küçük delik veya yırtıklar
                                erken tespit edilirse tamir yapılabilir.
                            </p>
                        </div>
                        <div className="bg-white/10 rounded-lg p-4">
                            <h4 className="font-semibold mb-2">Profesyonel Bakım</h4>
                            <p className="text-sm text-teal-100">
                                3-5 yılda bir profesyonel bakım yaptırın. Mekanizma ayarları ve
                                yağlama işlemleri uzman tarafından yapılmalı.
                            </p>
                        </div>
                        <div className="bg-white/10 rounded-lg p-4">
                            <h4 className="font-semibold mb-2">Kışa Hazırlık</h4>
                            <p className="text-sm text-teal-100">
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
