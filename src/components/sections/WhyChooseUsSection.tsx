"use client";

import { motion } from "@/lib/motion-lite";
import { businessConfig } from "@/config/business.config";

/**
 * WhyChooseUsSection Component
 * 
 * Competitive differentiation section highlighting:
 * 1. Official Egepen Warranty
 * 2. Professional Assembly
 * 3. Fast Post-Sale Service
 * 
 * SEO: Targets "Egepen yetkili bayi", "Beylikdüzü PVC"
 */

const advantages = [
    {
        icon: (
            <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
            </svg>
        ),
        title: "Resmi Egepen Yetkili Bayi",
        description: "Türkiye'nin en prestijli markasının resmi yetkili bayisi olarak orijinal ürün ve hizmet güvencesi sunuyoruz.",
        highlight: "YETKİLİ BAYİ",
        color: "from-amber-500 to-orange-500"
    },
    {
        icon: (
            <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z" />
            </svg>
        ),
        title: "Profesyonel Montaj Ekibi",
        description: "40 yıllık deneyimli ustalarımız, aynı gün montaj ve mükemmel işçilik sunuyor. Tüm montajlar TSE standartlarına uygun yapılır.",
        highlight: "AYNI GÜN MONTAJ",
        color: "from-blue-500 to-cyan-500"
    },
    {
        icon: (
            <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M11.42 15.17l-5.58-3.18a.5.5 0 01-.22-.66l.88-1.68a.5.5 0 01.66-.22l5.58 3.18m0 0l5.58-3.18a.5.5 0 01.66.22l.88 1.68a.5.5 0 01-.22.66l-5.58 3.18M12 20.5v-5.33M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
            </svg>
        ),
        title: "Hızlı Satış Sonrası Servis",
        description: "Beylikdüzü ve çevresinde 2 saat içinde yerinde servis. İspanyolet, fitil değişimi ve cam onarımı gibi tüm bakım hizmetleri için hızlı müdahale.",
        highlight: "2 SAAT SERVİS",
        color: "from-green-500 to-emerald-500"
    },
    {
        icon: (
            <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
            </svg>
        ),
        title: "Yerel Showroom Desteği",
        description: "Gürpınar'daki showroom'umuzda tüm ürünleri yerinde görebilir, uzman ekibimizden birebir danışmanlık alabilirsiniz.",
        highlight: "GÜRPINARʼDA",
        color: "from-purple-500 to-pink-500"
    }
];

const comparisonData = [
    { feature: "Resmi Yetkili Bayi", us: true, others: false },
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
                            className="group relative bg-white rounded-2xl p-6 border border-neutral-100 shadow-sm hover:shadow-xl transition-shadow duration-300"
                        >
                            {/* Highlight Badge */}
                            <div className={`absolute -top-3 left-6 px-3 py-1 rounded-full bg-gradient-to-r ${advantage.color} text-white text-xs font-bold shadow-lg`}>
                                {advantage.highlight}
                            </div>

                            {/* Icon */}
                            <div className={`inline-flex items-center justify-center w-12 h-12 rounded-xl bg-gradient-to-br ${advantage.color} text-white mt-2 mb-4 shadow-lg`} aria-hidden="true">
                                {advantage.icon}
                            </div>

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
                        <p className="text-neutral-300">
                            Neden yetkili bayiden almalısınız? İşte somut farklarımız:
                        </p>
                    </div>

                    <div className="overflow-x-auto">
                        <table className="w-full min-w-[400px]">
                            <caption className="sr-only">Egepen Akçayapı ile diğer bayiler karşılaştırması</caption>
                            <thead>
                                <tr className="border-b border-white/10">
                                    <th scope="col" className="text-left py-4 px-4 text-neutral-300 font-medium text-sm uppercase tracking-wider">
                                        Özellik
                                    </th>
                                    <th scope="col" className="text-center py-4 px-4">
                                        <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary-500 rounded-full text-white font-bold text-sm">
                                            {businessConfig.name}
                                        </div>
                                    </th>
                                    <th scope="col" className="text-center py-4 px-4 text-neutral-300 font-medium text-sm">
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
                                        <th scope="row" className="py-4 px-4 text-white font-medium">
                                            {row.feature}
                                        </th>
                                        <td className="text-center py-4 px-4">
                                            {row.us ? (
                                                <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-green-500/20 text-green-400">
                                                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3} aria-hidden="true">
                                                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                                                    </svg>
                                                    <span className="sr-only">Evet</span>
                                                </span>
                                            ) : (
                                                <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-red-500/20 text-red-400">
                                                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3} aria-hidden="true">
                                                        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                                                    </svg>
                                                    <span className="sr-only">Hayır</span>
                                                </span>
                                            )}
                                        </td>
                                        <td className="text-center py-4 px-4">
                                            {row.others ? (
                                                <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-green-500/20 text-green-400">
                                                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3} aria-hidden="true">
                                                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                                                    </svg>
                                                    <span className="sr-only">Evet</span>
                                                </span>
                                            ) : (
                                                <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-red-500/20 text-red-400">
                                                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3} aria-hidden="true">
                                                        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                                                    </svg>
                                                    <span className="sr-only">Hayır</span>
                                                </span>
                                            )}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    {/* İletişim */}
                    <div className="mt-10 text-center">
                        <a
                            href="/iletisim"
                            title="İletişim Sayfasına Git"
                            className="inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-primary-500 to-primary-600 text-white font-bold rounded-full hover:from-primary-600 hover:to-primary-700 transition-shadow shadow-xl shadow-primary-500/30"
                        >
                            İletişim
                        </a>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
