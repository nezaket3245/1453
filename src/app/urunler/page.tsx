import { Metadata } from "next";
import { HeaderOptimized } from "@/components/layout/HeaderOptimized";
import { Footer } from "@/components/layout/Footer";
import { PageHero } from "@/components/ui/PageHero";
import OptimizedImage from "@/components/ui/OptimizedImage";
import Link from "next/link";

export const metadata: Metadata = {
    title: "Ürünler - Egepen Akçayapı Beylikdüzü",
    description:
        "PVC pencere, cam balkon, alüminyum, sineklik, panjur ve duşakabin ürünlerimiz. Egepen Deceuninck yetkili bayi.",
    alternates: { canonical: "https://egepenakcayapi.com/urunler" },
};

const categories = [
    {
        name: "PVC Pencere Sistemleri",
        href: "/pvc-sistemleri",
        image: "/images/pvc/pvc-pencere-yemek-odasi.jpg",
        desc: "Egepen Legend, Legend Art, Zendow serileri. Üstün ısı ve ses yalıtımı.",
    },
    {
        name: "Cam Balkon Sistemleri",
        href: "/cam-balkon-sistemleri",
        image: "/images/cam-balkon/cam-balkon-sehir-manzara.jpg",
        desc: "Isıcamlı, sürme ve katlanır cam balkon modelleri.",
    },
    {
        name: "Alüminyum Sistemleri",
        href: "/aluminyum-sistemleri",
        image: "/images/aluminyum/thermal-break-pencere.png",
        desc: "Isı yalıtımlı alüminyum doğrama ve cephe profilleri.",
    },
    {
        name: "Sineklik Sistemleri",
        href: "/sineklik-sistemleri",
        image: "/images/sineklik/duble-plise-sineklik.jpg",
        desc: "Plise, sürgülü ve menteşeli sineklik çözümleri.",
    },
    {
        name: "Panjur & Kepenk",
        href: "/panjur-kepenk-sistemleri",
        image: "/images/panjur/panjur-modern-villa.jpg",
        desc: "Motorlu ve manuel panjur & kepenk sistemleri.",
    },
    {
        name: "Duşakabin Sistemleri",
        href: "/dusakabin-sistemleri",
        image: "/images/dusakabin/hero-black-frameless.jpg",
        desc: "Premium cam duşakabin modelleri ve aksesuarları.",
    },
];

export default function ProductsPage() {
    return (
        <>
            <HeaderOptimized />
            <main id="main-content" className="min-h-screen bg-neutral-50">
                <PageHero
                    title="Ürünlerimiz"
                    subtitle="Egepen Deceuninck kalitesiyle tüm ürün kategorilerimizi keşfedin."
                    breadcrumbs={[{ label: "Ürünler" }]}
                    compact
                />

                <section className="py-14 md:py-20 bg-white" aria-label="Ürün kategorileri">
                    <div className="container-custom">
                        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                            {categories.map((cat) => (
                                <Link
                                    key={cat.href}
                                    href={cat.href}
                                    className="group block rounded-2xl overflow-hidden border border-neutral-200 hover:border-primary-300 hover:shadow-lg transition-all"
                                >
                                    {/* Image */}
                                    <div className="relative aspect-[16/10] overflow-hidden bg-neutral-100">
                                        <OptimizedImage
                                            src={cat.image}
                                            alt={cat.name}
                                            fill
                                            className="object-cover group-hover:scale-105 transition-transform duration-500"
                                            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                                        />
                                        <div className="absolute inset-0 bg-gradient-to-t from-neutral-900/30 to-transparent" aria-hidden="true" />
                                    </div>
                                    {/* Text */}
                                    <div className="p-5">
                                        <h2 className="font-bold text-neutral-900 group-hover:text-primary-600 transition-colors mb-1">
                                            {cat.name}
                                        </h2>
                                        <p className="text-sm text-neutral-500 leading-relaxed">
                                            {cat.desc}
                                        </p>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Subtle text CTA */}
                <section className="py-12 md:py-14 bg-neutral-50 text-center">
                    <div className="container-custom max-w-xl">
                        <p className="text-neutral-600 leading-relaxed mb-4">
                            Ürünlerimiz hakkında detaylı bilgi almak veya fiyat teklifi
                            istemek için iletişim sayfamızı ziyaret edebilirsiniz.
                        </p>
                        <Link
                            href="/iletisim"
                            className="inline-flex items-center gap-2 text-primary-600 font-bold hover:text-primary-700 transition-colors"
                        >
                            İletişim Sayfasına Git
                            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden="true">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                            </svg>
                        </Link>
                    </div>
                </section>
            </main>
            <Footer />
        </>
    );
}
