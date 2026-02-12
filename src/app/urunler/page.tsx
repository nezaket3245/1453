import { Metadata } from "next";
import Link from "next/link";
import OptimizedImage from "@/components/ui/OptimizedImage";
import { HeaderOptimized } from '@/components/layout/HeaderOptimized';
import { Footer } from "@/components/layout/Footer";
import { businessConfig } from "@/config/business.config";

/**
 * Products Page Metadata
 */
export const metadata: Metadata = {
    title: 'Tüm Ürünler - PVC Pencere ve Cam Balkon',
    description:
        'PVC pencere, cam balkon, alüminyum doğrama, sineklik, panjur ve duşakabin sistemleri. Egepen Deceuninck yetkili bayi ürünleri Beylikdüzü.',
    keywords: [
        ...businessConfig.seo.mainKeywords,
        "PVC pencere",
        "cam balkon",
        "alüminyum doğrama",
        "sineklik",
        "panjur",
        "duşakabin",
    ],
    openGraph: {
        title: `Ürünlerimiz | ${businessConfig.name}`,
        description:
            `PVC pencere, cam balkon, alüminyum doğrama ve daha fazlası. ${businessConfig.brand} kalitesiyle profesyonel çözümler.`,
        url: "https://egepenakcayapi.com/urunler",
    },
    alternates: {
        canonical: "https://egepenakcayapi.com/urunler",
    },
};

/**
 * Products Data
 */
const products = [
    {
        id: "pvc-pencere",
        title: "PVC Pencere & Kapı",
        description:
            `${businessConfig.brand} kalitesiyle üretilen ısı ve ses yalıtımlı PVC pencere ve kapı sistemleri. Legend ve Legend Art serileriyle maksimum konfor.`,
        image: "/images/pvc/pvc-surme-manzara.jpg",
        features: [
            "Isı Yalıtımı",
            "Ses İzolasyonu",
            "UV Koruma",
            "Kolay Temizlik",
        ],
        href: "/pvc-sistemleri",
        color: "from-blue-500 to-blue-600",
    },
    {
        id: "cam-balkon",
        title: "Cam Balkon Sistemleri",
        description:
            "Panoramik, katlanır ve sürme cam balkon sistemleri. Balkonlarınızı dört mevsim kullanılabilir hale getirin.",
        image: "/images/cam-balkon/cam-balkon-site-manzara.jpg",
        features: ["Katlanır Sistem", "Sürme Sistem", "Isı Camlı", "Geniş Açılım"],
        href: "/cam-balkon-sistemleri",
        color: "from-cyan-500 to-cyan-600",
    },
    {
        id: "aluminyum",
        title: "Alüminyum Doğrama",
        description:
            "Dayanıklı ve şık alüminyum pencere, kapı ve cephe sistemleri. Modern mimari projeler için ideal çözümler.",
        image: "/images/aluminyum/curtain-wall-giydirme.png",
        features: [
            "Yüksek Dayanım",
            "Modern Tasarım",
            "Geniş Renk Seçeneği",
            "Uzun Ömür",
        ],
        href: "/aluminyum-sistemleri",
        color: "from-slate-500 to-slate-600",
    },
    {
        id: "sineklik",
        title: "Sineklik Sistemleri",
        description:
            "Menteşeli, sürme ve pileli sineklik sistemleri. Evinizi böceklerden korurken temiz hava alın.",
        image: "/images/sineklik/duble-plise-sineklik.jpg",
        features: ["Pileli Sistem", "Sürme Sistem", "Menteşeli", "Kolay Montaj"],
        href: "/sineklik-sistemleri",
        color: "from-green-500 to-green-600",
    },
    {
        id: "panjur",
        title: "Panjur Sistemleri",
        description:
            "Alüminyum ve plastik panjur sistemleri. Güneş kontrolü, mahremiyet ve enerji tasarrufu tek üründe.",
        image: "/images/panjur/panjur-modern-villa.jpg",
        features: ["Motorlu", "Manuel", "Güneş Kontrolü", "Enerji Tasarrufu"],
        href: "/panjur-kepenk-sistemleri",
        color: "from-amber-500 to-amber-600",
    },
    {
        id: "dusakabin",
        title: "Duşakabin",
        description:
            "Kare, dikdörtgen ve köşe duşakabin modelleri. Banyolarınıza modern ve şık bir dokunuş.",
        image: "/images/dusakabin/dusakabin-kose-banyo.jpg",
        features: [
            "Temperli Cam",
            "Kolay Temizlik",
            "Modern Tasarım",
            "Özel Ölçü",
        ],
        href: "/dusakabin-sistemleri",
        color: "from-indigo-500 to-indigo-600",
    },
];

export default function ProductsPage() {
    return (
        <>
            <HeaderOptimized />
            <main id="main-content" className="min-h-screen bg-white">
                {/* Hero Section */}
                <section className="relative py-20 lg:py-28 bg-gradient-to-br from-primary-600 to-primary-800 overflow-hidden">
                    <div className="absolute inset-0 opacity-10">
                        <div
                            className="absolute inset-0"
                            style={{
                                backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
                            }}
                        />
                    </div>
                    <div className="container-custom relative z-10">
                        <nav aria-label="Breadcrumb" className="mb-8">
                            <ol className="flex items-center gap-2 text-sm text-white/60">
                                <li>
                                    <Link href="/" title="Ana Sayfa" className="hover:text-white transition-colors">
                                        Ana Sayfa
                                    </Link>
                                </li>
                                <li>/</li>
                                <li className="text-white">Ürünler</li>
                            </ol>
                        </nav>
                        <div className="max-w-3xl">
                            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
                                Ürün <span className="text-secondary-400">Kataloğumuz</span>
                            </h1>
                            <p className="text-lg md:text-xl text-white/80 mb-8">
                                {businessConfig.brand} yetkili bayisi olarak, en kaliteli PVC pencere, cam
                                balkon ve alüminyum doğrama sistemlerini sunuyoruz. Tüm
                                ürünlerimiz {businessConfig.brand} güvencesi altındadır.
                            </p>
                        </div>
                    </div>
                </section>

                {/* Products Grid */}
                <section className="section">
                    <div className="container-custom">
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {products.map((product) => (
                                <Link
                                    key={product.id}
                                    href={product.href}
                                    className="group block"
                                >
                                    <article className="h-full bg-white rounded-2xl overflow-hidden shadow-lg border border-neutral-100 transition-[box-shadow,transform] duration-300 hover:shadow-2xl hover:-translate-y-2">
                                        {/* Image */}
                                        <div className="relative h-56 overflow-hidden">
                                            <OptimizedImage
                                                src={product.image}
                                                alt={product.title}
                                                fill
                                                className="object-cover transition-transform duration-500 group-hover:scale-110"
                                                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                                            />
                                            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                                            <h2 className="absolute bottom-4 left-4 text-2xl font-bold text-white">
                                                {product.title}
                                            </h2>
                                        </div>

                                        {/* Content */}
                                        <div className="p-6">
                                            <p className="text-neutral-600 mb-4 line-clamp-2">
                                                {product.description}
                                            </p>

                                            {/* Features */}
                                            <div className="flex flex-wrap gap-2 mb-6">
                                                {product.features.map((feature) => (
                                                    <span
                                                        key={feature}
                                                        className="px-3 py-1 text-xs font-medium bg-neutral-100 text-neutral-600 rounded-full"
                                                    >
                                                        {feature}
                                                    </span>
                                                ))}
                                            </div>

                                            {/* CTA */}
                                            <div className="flex items-center text-primary-600 font-semibold group-hover:text-primary-700 transition-colors">
                                                <span>Detaylı İncele</span>
                                                <svg
                                                    className="w-5 h-5 ml-2 transform transition-transform group-hover:translate-x-1"
                                                    fill="none"
                                                    viewBox="0 0 24 24"
                                                    stroke="currentColor"
                                                >
                                                    <path
                                                        strokeLinecap="round"
                                                        strokeLinejoin="round"
                                                        strokeWidth={2}
                                                        d="M13 7l5 5m0 0l-5 5m5-5H6"
                                                    />
                                                </svg>
                                            </div>
                                        </div>
                                    </article>
                                </Link>
                            ))}
                        </div>
                    </div>
                </section>

            </main>
            <Footer />
        </>
    );
}
