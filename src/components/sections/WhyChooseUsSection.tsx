"use client";

import { motion } from "framer-motion";
import { businessConfig } from "@/config/business.config";

/**
 * WhyChooseUsSection Component
 * 
 * Competitive differentiation section highlighting:
 * 1. Official Egepen Warranty
 * 2. Professional Assembly
 * 3. Fast Post-Sale Service
 * 
 * SEO: Targets "Egepen yetkili bayi", "Beylikdüzü PVC", "garanti"
 */

const advantages = [
    {
        icon: "🏆",
        title: "Resmi Egepen Garantisi",
        description: "10 yıla kadar profil ve aksesuar garantisi. Türkiye'nin en prestijli markasının resmi yetkili bayisi olarak orijinal ürün ve hizmet güvencesi sunuyoruz.",
        highlight: "10 YIL GARANTİ",
        color: "from-amber-500 to-orange-500"
    },
    {
        icon: "⚡",
        title: "Profesyonel Montaj Ekibi",
        description: "40 yıllık deneyimli ustalarımız, aynı gün montaj ve mükemmel işçilik garantisi veriyor. Tüm montajlar TSE standartlarına uygun yapılır.",
        highlight: "AYNI GÜN MONTAJ",
        color: "from-blue-500 to-cyan-500"
    },
    {
        icon: "🛠️",
        title: "Hızlı Satış Sonrası Servis",
        description: "Beylikdüzü ve çevresinde 2 saat içinde yerinde servis. İspanyolet, fitil değişimi ve cam onarımı gibi tüm bakım hizmetleri için hızlı müdahale.",
        highlight: "2 SAAT SERVİS",
        color: "from-green-500 to-emerald-500"
    },
    {
        icon: "📍",
        title: "Yerel Showroom Desteği",
        description: "Gürpınar'daki showroom'umuzda tüm ürünleri yerinde görebilir, uzman ekibimizden birebir danışmanlık alabilirsiniz.",
        highlight: "GÜRPINARʼDA",
        color: "from-purple-500 to-pink-500"
    }
];

const comparisonData = [
    { feature: "Resmi Yetkili Bayi", us: true, others: false },
    { feature: "10 Yıl Garanti", us: true, others: false },
    { feature: "Aynı Gün Montaj", us: true, others: false },
    { feature: "Yerinde Showroom", us: true, others: false },
    { feature: "Orijinal Yedek Parça", us: true, others: false },
    { feature: "Ücretsiz Keşif", us: true, others: true },
    { feature: "Satış Sonrası Servis", us: true, others: false },
];

export function WhyChooseUsSection() {
    return (
        <section
            id="neden-biz"
            className="section bg-gradient-to-b from-neutral-50 to-white overflow-hidden"
            aria-labelledby="why-choose-us-heading"
        >
            <div className="container-custom">
                {/* Section Header */}
                <div className="text-center max-w-3xl mx-auto mb-16">
                    <motion.span
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="inline-block px-4 py-1.5 rounded-full bg-primary-50 text-primary-600 text-sm font-bold uppercase tracking-widest mb-4"
                    >
                        Neden {businessConfig.name}?
                    </motion.span>
                    <motion.h2
                        id="why-choose-us-heading"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.1 }}
                        className="text-3xl md:text-4xl lg:text-5xl font-black text-neutral-900 mb-6"
                    >
                        Beylikdüzü'nün <span className="text-primary-600">Yetkili Egepen Bayisi</span>
                    </motion.h2>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.2 }}
                        className="text-lg text-neutral-600 leading-relaxed"
                    >
                        40 yıldır Beylikdüzü, Gürpınar ve çevresinde binlerce aileye hizmet verdik.
                        Rakiplerimizden farkımız, sadece ürün satmak değil, kalıcı çözümler sunmaktır.
                    </motion.p>
                </div>

                {/* Advantages Grid */}
                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-20">
                    {advantages.map((advantage, index) => (
                        <motion.article
                            key={advantage.title}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1 }}
                            className="group relative bg-white rounded-2xl p-6 border border-neutral-100 shadow-sm hover:shadow-xl transition-all duration-300"
                        >
                            {/* Highlight Badge */}
                            <div className={`absolute -top-3 left-6 px-3 py-1 rounded-full bg-gradient-to-r ${advantage.color} text-white text-xs font-bold shadow-lg`}>
                                {advantage.highlight}
                            </div>

                            {/* Icon */}
                            <div className="text-4xl mb-4 mt-2" aria-hidden="true">{advantage.icon}</div>

                            {/* Title */}
                            <h3 className="text-lg font-bold text-neutral-900 mb-3 group-hover:text-primary-600 transition-colors">
                                {advantage.title}
                            </h3>

                            {/* Description */}
                            <p className="text-neutral-600 text-sm leading-relaxed">
                                {advantage.description}
                            </p>
                        </motion.article>
                    ))}
                </div>

                {/* Comparison Table */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="bg-neutral-900 rounded-3xl p-8 md:p-12 overflow-hidden"
                >
                    <div className="text-center mb-10">
                        <h3 className="text-2xl md:text-3xl font-bold text-white mb-4">
                            Rakiplerle Karşılaştırma
                        </h3>
                        <p className="text-neutral-400">
                            Neden yetkili bayiden almalısınız? İşte somut farklarımız:
                        </p>
                    </div>

                    <div className="overflow-x-auto">
                        <table className="w-full min-w-[400px]">
                            <thead>
                                <tr className="border-b border-white/10">
                                    <th className="text-left py-4 px-4 text-neutral-400 font-medium text-sm uppercase tracking-wider">
                                        Özellik
                                    </th>
                                    <th className="text-center py-4 px-4">
                                        <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary-500 rounded-full text-white font-bold text-sm">
                                            {businessConfig.name}
                                        </div>
                                    </th>
                                    <th className="text-center py-4 px-4 text-neutral-500 font-medium text-sm">
                                        Diğer Bayiler
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {comparisonData.map((row, index) => (
                                    <tr
                                        key={row.feature}
                                        className={`border-b border-white/5 ${index % 2 === 0 ? 'bg-white/5' : ''}`}
                                    >
                                        <td className="py-4 px-4 text-white font-medium">
                                            {row.feature}
                                        </td>
                                        <td className="text-center py-4 px-4">
                                            {row.us ? (
                                                <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-green-500/20 text-green-400">
                                                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3} aria-hidden="true">
                                                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                                                    </svg>
                                                </span>
                                            ) : (
                                                <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-red-500/20 text-red-400">
                                                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3} aria-hidden="true">
                                                        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                                                    </svg>
                                                </span>
                                            )}
                                        </td>
                                        <td className="text-center py-4 px-4">
                                            {row.others ? (
                                                <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-green-500/20 text-green-400">
                                                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3} aria-hidden="true">
                                                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                                                    </svg>
                                                </span>
                                            ) : (
                                                <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-red-500/20 text-red-400">
                                                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3} aria-hidden="true">
                                                        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                                                    </svg>
                                                </span>
                                            )}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    {/* CTA */}
                    <div className="mt-10 text-center">
                        <a
                            href="/teklif-al"
                            title="Ücretsiz Keşif ve Fiyat Teklifi Formu"
                            className="inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-primary-500 to-primary-600 text-white font-bold rounded-full hover:from-primary-600 hover:to-primary-700 transition-all shadow-xl shadow-primary-500/30"
                        >
                            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden="true">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                            Ücretsiz Keşif İste
                        </a>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
