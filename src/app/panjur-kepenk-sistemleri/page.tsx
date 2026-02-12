/**
 * Panjur & Kepenk Systems Main Page
 * SEO: Motorlu panjur, Somfy akıllı panjur, ticari kepenk
 * Features: Energy simulator, smart home ecosystem, motor comparison
 */

import { Metadata } from 'next';
import Link from 'next/link';
import OptimizedImage from '@/components/ui/OptimizedImage';
import {
    panjurSystems,
    lamelLibrary,
    motorLibrary,
    somfyEcosystem,
    energyEfficiencyData,
    panjurSeoKeywords,
} from '@/lib/panjurData';
import { businessConfig } from '@/config/business.config';
import { HeaderOptimized } from '@/components/layout/HeaderOptimized';
import { Footer } from '@/components/layout/Footer';

// SEO Metadata — enriched with target keywords for organic visibility
export const metadata: Metadata = {
    title: 'Otomatik Panjur ve Kepenk Fiyatları 2026',
    description:
        'Poliüretan dolgulu alüminyum panjur ve akıllı ev uyumlu panjur motoru. Motorlu panjur tamiri, ticari kepenk çözümleri. Güvenlik, ısı tasarrufu, otomasyon.',
    keywords: [
        ...panjurSeoKeywords.primary,
        ...panjurSeoKeywords.technical,
        'Otomatik panjur metrekare fiyatları',
        'Motorlu panjur tamiri',
        'Poliüretan dolgulu alüminyum panjur',
        'Dükkan kepenk sistemleri',
        'Akıllı ev uyumlu panjur motoru',
    ].join(', '),
    openGraph: {
        title: 'Panjur & Kepenk Sistemleri | Egepen Akçayapı',
        description: 'Somfy motorlu panjur ve ticari kepenk çözümleri. Akıllı ev uyumlu.',
        type: 'website',
        locale: 'tr_TR',
    },
    alternates: {
        canonical: `${businessConfig.siteUrl}/panjur-kepenk-sistemleri`,
    },
};

// JSON-LD Schema — Service with enriched description
const serviceSchema = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: 'Panjur ve Kepenk Montajı',
    description:
        'Otomatik panjur metrekare fiyatları, poliüretan dolgulu alüminyum panjur, dükkan kepenk sistemleri, motorlu panjur tamiri ve akıllı ev uyumlu panjur motoru montajı.',
    provider: {
        '@type': 'LocalBusiness',
        name: 'Egepen Akçayapı',
        address: {
            '@type': 'PostalAddress',
            streetAddress: 'Gürpınar Mah. Gürpınar Cad. No: 26A',
            addressLocality: 'Beylikdüzü',
            addressRegion: 'İstanbul',
            postalCode: '34528',
            addressCountry: 'TR',
        },
        telephone: '+902128801507',
        geo: {
            '@type': 'GeoCoordinates',
            latitude: '40.9942125',
            longitude: '28.6079794',
        },
    },
    areaServed: { '@type': 'City', name: 'İstanbul' },
};

// BreadcrumbList schema for SERP breadcrumbs
const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Ana Sayfa', item: `${businessConfig.siteUrl}/` },
        { '@type': 'ListItem', position: 2, name: 'Panjur & Kepenk Sistemleri', item: `${businessConfig.siteUrl}/panjur-kepenk-sistemleri` },
    ],
};

// FAQPage schema for rich snippets
const faqPageSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
        {
            '@type': 'Question',
            name: 'Otomatik panjur elektrik kesilince nasıl açılır?',
            acceptedAnswer: {
                '@type': 'Answer',
                text: 'Somfy motorlu panjurlarda manuel kumanda ile açılır. Ayrıca şarjlı akü kiti (UPS) opsiyoneliyle elektrik kesildiğinde bile otomatik kontrol sağlanır.',
            },
        },
        {
            '@type': 'Question',
            name: 'Panjur ısı yalıtımı sağlar mı?',
            acceptedAnswer: {
                '@type': 'Answer',
                text: 'Evet. Poliüretan köpük dolgulu alüminyum lameller ile %35-45 oranında enerji tasarrufu sağlanır. EN ISO 10077-1 standardına göre U değeri 1.8 W/m²K\'e kadar düşer.',
            },
        },
    ],
};

// HowTo schema for maintenance guide
const howToSchema = {
    '@context': 'https://schema.org',
    '@type': 'HowTo',
    name: 'Panjur Temizliği ve Bakımı',
    description: 'Panjur sistemlerinin ömrünü uzatmak için düzenli temizlik ve bakım adımları.',
    step: [
        {
            '@type': 'HowToStep',
            name: 'Lamel yüzeyini temizleyin',
            text: 'Panjur kapalı konumdayken yumuşak bir bez ile toz ve kiri silin. Agresif temizleyicilerden kaçının.',
        },
        {
            '@type': 'HowToStep',
            name: 'Kılavuz rayları kontrol edin',
            text: 'Yılda iki kez kılavuz raylarını silikon bazlı sprey ile yağlayın. Kir birikimini temizleyin.',
        },
        {
            '@type': 'HowToStep',
            name: 'Motor ve kumandaları kontrol edin',
            text: 'Motorlu sistemlerde pil durumunu kontrol edin. Sınır ayarlarını test edin, arıza durumunda yetkili servise başvurun.',
        },
    ],
};

// Category cards
const categories = [
    {
        id: 'panjur-pvc',
        title: 'Egepen Storbox',
        description: 'Monoblok (Pencere Üstü) sistemler',
        icon: '🍱',
        color: 'from-indigo-500 to-blue-600',
        highlight: 'Egepen Kalitesi',
    },
    {
        id: 'panjur-aluminyum',
        title: 'Alüminyum Panjur',
        description: 'Somfy motorlu, akıllı ev uyumlu',
        icon: '🏠',
        color: 'from-blue-500 to-indigo-600',
        highlight: 'Premium',
    },
    {
        id: 'kepenk-ticari',
        title: 'Ticari Kepenk',
        description: 'Mağaza, dükkan, showroom',
        icon: '🏪',
        color: 'from-gray-600 to-slate-800',
        highlight: 'Ekonomik',
    },
    {
        id: 'kepenk-endustriyel',
        title: 'Endüstriyel Kapı',
        description: 'Fabrika, depo, lojistik',
        icon: '🏭',
        color: 'from-orange-500 to-red-600',
        highlight: 'Heavy Duty',
    },
];

export default function PanjurKepenkPage() {
    const pvcPanjur = panjurSystems.filter((s) => s.category === 'panjur-pvc');
    const aluminiumPanjur = panjurSystems.filter((s) => s.category === 'panjur-aluminyum');
    const ticariKepenk = panjurSystems.filter((s) => s.category === 'kepenk-ticari');
    const endustriyelKepenk = panjurSystems.filter((s) => s.category === 'kepenk-endustriyel');

    return (
        <>
            {/* JSON-LD: Service + Breadcrumb + FAQ + HowTo schemas */}
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify([serviceSchema, breadcrumbSchema, faqPageSchema, howToSchema]) }}
            />

            <HeaderOptimized />

            <main id="main-content" className="min-h-screen bg-white">
                {/* Hero Section */}
                <section className="relative bg-gradient-to-br from-slate-900 via-indigo-900 to-slate-800 py-20 lg:py-28 overflow-hidden min-h-[50vh] lg:min-h-[60vh] flex items-center">
                    <div className="absolute inset-0">
                        <OptimizedImage
                            src="/images/panjur/panjur-motorlu-villa.jpg"
                            alt=""
                            fill
                            className="object-cover"
                            role="presentation"
                            priority
                        />
                    </div>
                    <div className="absolute inset-0 bg-grid-white/5" />

                    <div className="container mx-auto px-4 relative z-10">
                        {/* Breadcrumb navigation */}
                        <nav aria-label="Breadcrumb" className="mb-8 flex justify-center">
                            <ol className="flex items-center gap-2 text-sm text-white/50">
                                <li><Link href="/" className="hover:text-white transition-colors">Ana Sayfa</Link></li>
                                <li className="text-white/30">/</li>
                                <li className="text-white font-medium">Panjur & Kepenk Sistemleri</li>
                            </ol>
                        </nav>

                        <div className="max-w-4xl mx-auto text-center">
                            <span className="sr-only">
                                Akıllı Ev Uyumlu Sistemler
                            </span>
                            <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-white leading-tight mb-4">
                                Otomatik Panjur ve Güvenlik Kepenk Sistemleri
                            </h1>
                            <p className="text-lg md:text-xl text-white/80 max-w-2xl mx-auto">
                                Akıllı ev uyumlu panjur motoru ile güvenlik ve otomasyon.
                                Poliüretan dolgulu alüminyum panjur ile %35 ısı tasarrufu.
                                Dükkan kepenk sistemleri ve motorlu panjur tamiri hizmeti.
                            </p>

                            {/* Trust badges — hidden */}
                            <div className="sr-only">
                                <span>Somfy Yetkili Bayi</span>
                                <span>Alexa/Google Uyumlu</span>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Sineklik Kampanya Reklamı */}
                <div className="bg-rose-600 text-white py-2.5">
                    <div className="container mx-auto px-4 flex items-center justify-center gap-3 text-sm">
                        <span className="font-bold bg-white/20 px-2 py-0.5 rounded text-xs">KAMPANYA</span>
                        <span>Sineklikte tüm renkli profiller <strong className="text-yellow-300">beyaz fiyatına!</strong></span>
                        <Link href="/sineklik-sistemleri" className="underline font-semibold hover:text-yellow-200 transition-colors">Detaylar →</Link>
                    </div>
                </div>

                {/* Category Navigation */}
                <section className="py-16 bg-gray-50">
                    <div className="container mx-auto px-4">
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                            {categories.map((cat) => (
                                <a
                                    key={cat.id}
                                    href={`#${cat.id}`}
                                    className="group relative bg-white rounded-2xl p-6 shadow-sm hover:shadow-xl transition-shadow overflow-hidden"
                                >
                                    <div
                                        className={`absolute inset-0 bg-gradient-to-br ${cat.color} opacity-0 group-hover:opacity-5 transition-opacity`}
                                    />
                                    <div className="relative">
                                        <div className="flex justify-between items-start mb-4">
                                            <div className="text-4xl">{cat.icon}</div>
                                            <span className="px-2 py-1 bg-indigo-100 text-indigo-700 text-xs font-medium rounded-full">
                                                {cat.highlight}
                                            </span>
                                        </div>
                                        <h3 className="text-lg font-bold text-gray-900 mb-2">{cat.title}</h3>
                                        <p className="text-sm text-gray-500">{cat.description}</p>
                                    </div>
                                </a>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Energy Efficiency Section */}
                <section className="py-20 bg-gradient-to-br from-green-50 to-emerald-50">
                    <div className="container mx-auto px-4">
                        <div className="text-center mb-12">
                            <span className="inline-block px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm font-medium mb-4">
                                💡 Enerji Tasarrufu
                            </span>
                            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                                Poliüretan Dolgulu Alüminyum Panjur ile Enerji Tasarrufu
                            </h2>
                            <p className="text-gray-600 max-w-2xl mx-auto">
                                Poliüretan köpük dolgulu lameller ile yaz ve kış aylarında ciddi enerji tasarrufu.
                                <strong> Otomatik panjur metrekare fiyatları</strong> için bize ulaşın.
                            </p>
                        </div>

                        <div className="max-w-4xl mx-auto">
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                {/* Without Shutter */}
                                <div className="bg-white rounded-2xl p-6 text-center shadow-sm">
                                    <div className="text-4xl mb-4">🏠</div>
                                    <h4 className="font-bold text-gray-900 mb-2">Panjursuz</h4>
                                    <div className="space-y-2">
                                        <div className="text-sm text-gray-500">Yaz Soğutma: Baz değer</div>
                                        <div className="text-sm text-gray-500">Kış Isıtma: Baz değer</div>
                                    </div>
                                </div>

                                {/* Standard Shutter */}
                                <div className="bg-white rounded-2xl p-6 text-center shadow-sm border-2 border-green-200">
                                    <div className="text-4xl mb-4">🟢</div>
                                    <h4 className="font-bold text-gray-900 mb-2">Standart Alüminyum</h4>
                                    <div className="space-y-2">
                                        <div className="text-sm">
                                            <span className="text-green-600 font-bold">%30</span>{' '}
                                            <span className="text-gray-500">Yaz Soğutma Tasarrufu</span>
                                        </div>
                                        <div className="text-sm">
                                            <span className="text-green-600 font-bold">%20</span>{' '}
                                            <span className="text-gray-500">Kış Isıtma Tasarrufu</span>
                                        </div>
                                    </div>
                                </div>

                                {/* Foam Filled */}
                                <div className="bg-gradient-to-br from-green-500 to-emerald-600 rounded-2xl p-6 text-center text-white shadow-lg">
                                    <div className="text-4xl mb-4">⭐</div>
                                    <h4 className="font-bold mb-2">Köpük Dolgulu</h4>
                                    <div className="space-y-2">
                                        <div className="text-sm">
                                            <span className="font-bold text-2xl">%45</span>{' '}
                                            <span className="text-green-100">Yaz Soğutma</span>
                                        </div>
                                        <div className="text-sm">
                                            <span className="font-bold text-2xl">%35</span>{' '}
                                            <span className="text-green-100">Kış Isıtma</span>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <p className="text-center text-gray-500 text-sm mt-8">
                                * Hesaplamalar EN ISO 10077-1 standardına göre yapılmıştır
                            </p>
                        </div>
                    </div>
                </section>

                {/* Egepen Storbox PVC Panjur Section */}
                <section id="panjur-pvc" className="py-20 bg-white">
                    <div className="container mx-auto px-4">
                        <div className="text-center mb-12">
                            <span className="inline-block px-3 py-1 bg-indigo-100 text-indigo-700 rounded-full text-sm font-medium mb-4">
                                🍱 Egepen Deceuninck
                            </span>
                            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                                Storbox Monoblok Panjur — Otomatik Panjur Metrekare Fiyatları
                            </h2>
                            <p className="text-gray-600 max-w-2xl mx-auto">
                                Pencere ile bütünleşik, yüksek yalıtımlı ve estetik PVC panjur çözümleri.
                                Poliüretan dolgulu alüminyum panjur ile üstün ısı yalıtımı.
                            </p>
                        </div>

                        <div className="grid grid-cols-1 gap-8 max-w-4xl mx-auto">
                            {pvcPanjur.map((system) => (
                                <div
                                    key={system.id}
                                    className="bg-white rounded-2xl overflow-hidden shadow-xl border border-gray-100 group"
                                >
                                    <div className="grid md:grid-cols-2">
                                        <div className="relative h-64 md:h-auto bg-gray-100">
                                            <OptimizedImage
                                                src={system.image}
                                                alt={`${system.name} - Monoblok Panjur Sistemi - Beylikdüzü`}
                                                fill
                                                className="object-contain p-8 group-hover:scale-105 transition-transform duration-500"
                                            />
                                        </div>
                                        <div className="p-8">
                                            <div className="flex justify-between items-start mb-4">
                                                <h3 className="text-2xl font-bold text-gray-900">{system.name}</h3>
                                                <span className="px-3 py-1 bg-green-100 text-green-700 text-xs font-bold rounded-full">
                                                    Egepen Resmi Ürün
                                                </span>
                                            </div>
                                            <p className="text-indigo-600 font-medium mb-4">{system.tagline}</p>
                                            <p className="text-gray-600 mb-6">{system.description}</p>

                                            <div className="grid grid-cols-2 gap-4 mb-6">
                                                {system.technicalSpecs.slice(0, 4).map((spec, sidx) => (
                                                    <div key={sidx} className="bg-gray-50 p-3 rounded-lg text-center">
                                                        <div className="text-xs text-gray-500 uppercase tracking-wider">{spec.label}</div>
                                                        <div className="font-bold text-gray-900">{spec.value}</div>
                                                    </div>
                                                ))}
                                            </div>

                                            <Link
                                                href={`/panjur-kepenk-sistemleri/${system.slug}`}
                                                className="inline-flex items-center justify-center w-full px-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-xl transition-shadow shadow-lg focus:ring-2 focus:ring-indigo-400 focus:outline-none"
                                                aria-label={`${system.name} panjur detaylarını incele`}
                                            >
                                                Detayları İncele
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Aluminium Panjur Section */}
                <section id="panjur-aluminyum" className="py-20 bg-gray-50">
                    <div className="container mx-auto px-4">
                        <div className="text-center mb-12">
                            <span className="inline-block px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm font-medium mb-4">
                                🏠 Konut Panjurları
                            </span>
                            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                                Alüminyum Panjur Sistemleri — Motorlu Panjur Tamiri ve Bakım
                            </h2>
                        </div>

                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                            {aluminiumPanjur.map((system) => (
                                <div
                                    key={system.id}
                                    className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow"
                                >
                                    <div className="relative h-48 bg-gradient-to-br from-blue-600 to-indigo-700">
                                        <OptimizedImage
                                            src={system.image}
                                            alt={`${system.name} - Alüminyum Panjur - Motorlu Sistem`}
                                            fill
                                            className="object-contain p-6"
                                        />
                                        {/* <div className="absolute top-4 right-4">
                                            <span className="px-3 py-1 bg-white/90 text-indigo-700 text-xs font-medium rounded-full">
                                                {system.warranty}
                                            </span>
                                        </div> */}
                                    </div>
                                    <div className="p-6">
                                        <h3 className="text-xl font-bold text-gray-900 mb-2">{system.name}</h3>
                                        <p className="text-indigo-600 text-sm font-medium mb-3">{system.tagline}</p>
                                        <p className="text-gray-600 text-sm mb-4">{system.description}</p>

                                        {/* Energy Efficiency */}
                                        {system.energyEfficiency && (
                                            <div className="flex gap-4 mb-4">
                                                <div className="flex-1 bg-green-50 rounded-lg p-3 text-center">
                                                    <div className="text-green-600 font-bold">
                                                        %{system.energyEfficiency.summerCooling}
                                                    </div>
                                                    <div className="text-xs text-gray-500">Yaz Tasarruf</div>
                                                </div>
                                                <div className="flex-1 bg-orange-50 rounded-lg p-3 text-center">
                                                    <div className="text-orange-600 font-bold">
                                                        %{system.energyEfficiency.winterHeating}
                                                    </div>
                                                    <div className="text-xs text-gray-500">Kış Tasarruf</div>
                                                </div>
                                            </div>
                                        )}

                                        {/* Key specs */}
                                        <div className="flex flex-wrap gap-2 mb-4">
                                            {system.technicalSpecs
                                                .filter((s) => s.highlight)
                                                .slice(0, 3)
                                                .map((spec, idx) => (
                                                    <span
                                                        key={idx}
                                                        className="px-2 py-1 bg-indigo-100 text-indigo-700 text-xs rounded-lg"
                                                    >
                                                        {spec.value}
                                                    </span>
                                                ))}
                                        </div>

                                        <Link
                                            href={`/panjur-kepenk-sistemleri/${system.slug}`}
                                            className="inline-flex items-center text-indigo-600 font-semibold hover:text-indigo-700 focus:ring-2 focus:ring-indigo-400 focus:outline-none rounded"
                                            aria-label={`${system.name} detaylarını incele`}
                                        >
                                            Detayları İncele
                                            <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                            </svg>
                                        </Link>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Commercial Shutters */}
                <section id="kepenk-ticari" className="py-20 bg-gray-100">
                    <div className="container mx-auto px-4">
                        <div className="text-center mb-12">
                            <span className="inline-block px-3 py-1 bg-gray-200 text-gray-700 rounded-full text-sm font-medium mb-4">
                                🏪 Ticari Çözümler
                            </span>
                            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                                Dükkan Kepenk Sistemleri ve Ticari Çözümler
                            </h2>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            {ticariKepenk.map((system) => (
                                <div
                                    key={system.id}
                                    className="bg-white rounded-2xl overflow-hidden shadow-lg"
                                >
                                    <div className="relative h-40 bg-gradient-to-br from-gray-700 to-slate-900">
                                        <OptimizedImage
                                            src={system.image}
                                            alt={`${system.name} - Dükkan Kepenk Sistemi`}
                                            fill
                                            className="object-contain p-6 opacity-80"
                                        />
                                    </div>
                                    <div className="p-6">
                                        <h3 className="text-xl font-bold text-gray-900 mb-2">{system.name}</h3>
                                        <p className="text-gray-500 text-sm font-medium mb-3">{system.tagline}</p>
                                        <p className="text-gray-600 text-sm mb-4">{system.description}</p>

                                        <div className="flex flex-wrap gap-2 mb-4">
                                            {system.technicalSpecs
                                                .filter((s) => s.highlight)
                                                .map((spec, idx) => (
                                                    <span
                                                        key={idx}
                                                        className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded-lg"
                                                    >
                                                        {spec.label}: {spec.value}
                                                    </span>
                                                ))}
                                        </div>

                                        <Link
                                            href={`/panjur-kepenk-sistemleri/${system.slug}`}
                                            className="inline-flex items-center text-gray-700 font-semibold hover:text-gray-900 focus:ring-2 focus:ring-gray-400 focus:outline-none rounded"
                                            aria-label={`${system.name} kepenk detaylarına git`}
                                        >
                                            Detaylar →
                                        </Link>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Industrial Section */}
                <section id="kepenk-endustriyel" className="py-20 bg-gradient-to-br from-orange-50 to-red-50">
                    <div className="container mx-auto px-4">
                        <div className="text-center mb-12">
                            <span className="inline-block px-3 py-1 bg-orange-100 text-orange-700 rounded-full text-sm font-medium mb-4">
                                🏭 Endüstriyel Çözümler
                            </span>
                            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                                Endüstriyel Kapı Sistemleri
                            </h2>
                        </div>

                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                            {endustriyelKepenk.map((system) => (
                                <div
                                    key={system.id}
                                    className="bg-white rounded-2xl overflow-hidden shadow-lg"
                                >
                                    <div className="relative h-48 bg-gradient-to-br from-orange-600 to-red-700">
                                        <OptimizedImage
                                            src={system.image}
                                            alt={`${system.name} - Endüstriyel Kapı Sistemi`}
                                            fill
                                            className="object-contain p-6"
                                        />
                                    </div>
                                    <div className="p-6">
                                        <h3 className="text-xl font-bold text-gray-900 mb-2">{system.name}</h3>
                                        <p className="text-orange-600 text-sm font-medium mb-3">{system.tagline}</p>
                                        <p className="text-gray-600 text-sm mb-4">{system.description}</p>

                                        <div className="grid grid-cols-2 gap-2 mb-4">
                                            {system.technicalSpecs.slice(0, 4).map((spec, idx) => (
                                                <div key={idx} className="bg-gray-50 rounded-lg p-2">
                                                    <div className="text-xs text-gray-500">{spec.label}</div>
                                                    <div className="font-semibold text-sm text-gray-900">{spec.value}</div>
                                                </div>
                                            ))}
                                        </div>

                                        <Link
                                            href={`/panjur-kepenk-sistemleri/${system.slug}`}
                                            className="inline-flex items-center px-4 py-2 bg-orange-500 hover:bg-orange-600 text-white font-semibold rounded-lg transition-shadow focus:ring-2 focus:ring-orange-400 focus:outline-none"
                                            aria-label={`${system.name} için proje teklifi al`}
                                        >
                                            Proje Teklifi Al
                                        </Link>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Local SEO */}
                <section className="py-12 bg-gray-100">
                    <div className="container mx-auto px-4">
                        <div className="text-center text-sm text-gray-600">
                            <p className="mb-4">
                                <strong>Panjur & Kepenk Hizmet Bölgelerimiz:</strong>
                            </p>
                            <p>
                                Beylikdüzü Motorlu Panjur | Esenyurt Kepenk Montaj | Büyükçekmece Somfy Panjur |
                                Avcılar Otomatik Kepenk | Bahçeşehir Akıllı Panjur | Küçükçekmece Endüstriyel Kapı
                            </p>
                        </div>
                    </div>
                </section>
            </main>

            <Footer />
        </>
    );
}
