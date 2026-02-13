import { Metadata } from "next";
import { HeaderOptimized } from "@/components/layout/HeaderOptimized";
import { Footer } from "@/components/layout/Footer";
import { PageHero } from "@/components/ui/PageHero";
import OptimizedImage from "@/components/ui/OptimizedImage";
import { ExpandableSection, ExpandableGroup } from "@/components/ui/ExpandableSection";
import { businessConfig } from "@/config/business.config";
import Link from "next/link";

export const metadata: Metadata = {
    title: "Hakkımızda - Egepen Akçayapı Beylikdüzü",
    description:
        "Beylikdüzü Egepen Deceuninck yetkili bayisi Akçayapı hakkında. PVC pencere, cam balkon, sineklik ve panjur sistemleri.",
    alternates: { canonical: "https://akcapen-pvc.pages.dev/hakkimizda" },
};

/* ── Service regions for the map section ─────────────────────── */
const regions = [
    "Beylikdüzü", "Büyükçekmece", "Esenyurt", "Avcılar",
    "Küçükçekmece", "Başakşehir", "Silivri", "Çatalca",
    "Bakırköy", "Bahçelievler",
];

export default function AboutPage() {
    return (
        <>
            <HeaderOptimized />
            <main id="main-content" className="min-h-screen bg-neutral-50">
                <PageHero
                    title="Hakkımızda"
                    subtitle="Beylikdüzü'nde Egepen Deceuninck yetkili bayisi olarak hizmetinizdeyiz."
                    breadcrumbs={[{ label: "Hakkımızda" }]}
                    compact
                />

                {/* ====================================================
                    ROW 1 — Intro text (left) + Showroom image (right)
                    ==================================================== */}
                <section className="py-16 md:py-20 bg-white" aria-labelledby="about-heading">
                    <div className="container-custom">
                        <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-center">
                            <div>
                                <h2
                                    id="about-heading"
                                    className="text-2xl md:text-3xl font-bold text-neutral-900 mb-6"
                                >
                                    Egepen Deceuninck{" "}
                                    <span className="text-primary-600">Yetkili Bayisi</span>
                                </h2>
                                <p className="text-neutral-600 leading-relaxed mb-4">
                                    Egepen Akçayapı, Beylikdüzü ve İstanbul Avrupa yakasında Egepen
                                    Deceuninck resmi yetkili bayisi olarak PVC pencere, cam balkon,
                                    sineklik, panjur ve duşakabin sistemleri alanında faaliyet
                                    göstermektedir.
                                </p>
                                <p className="text-neutral-500 leading-relaxed mb-6">
                                    Profesyonel montaj ekibimiz ve geniş ürün yelpazemizle
                                    müşterilerimize en kaliteli hizmeti sunuyoruz. Gürpınar showroom'umuzda
                                    tüm ürünleri canlı olarak inceleyebilir, uzman ekibimizle yüz yüze
                                    görüşebilirsiniz.
                                </p>
                                <Link
                                    href="/iletisim"
                                    className="inline-flex items-center gap-2 text-primary-600 font-bold hover:text-primary-700 transition-colors"
                                >
                                    Showroom'umuzu Ziyaret Edin
                                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden="true">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                                    </svg>
                                </Link>
                            </div>

                            {/* Right — Image */}
                            <div className="relative rounded-2xl overflow-hidden shadow-xl aspect-[4/3]">
                                <OptimizedImage
                                    src="/images/projeler/showroom.jpg"
                                    alt="Egepen Akçayapı Gürpınar showroom — PVC pencere ve cam balkon numuneleri"
                                    fill
                                    className="object-cover"
                                    sizes="(max-width: 1024px) 100vw, 50vw"
                                    priority
                                />
                                {/* Subtle gradient overlay for depth */}
                                <div className="absolute inset-0 bg-gradient-to-t from-neutral-900/20 to-transparent" aria-hidden="true" />
                            </div>
                        </div>
                    </div>
                </section>

                {/* ====================================================
                    ROW 2 — Image (left) + Mission & Vision (right)
                    Zig-zag: reverses the previous row's text/image order.
                    ==================================================== */}
                <section className="py-16 md:py-20 bg-neutral-50" aria-labelledby="mission-heading">
                    <div className="container-custom">
                        <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-center">
                            {/* Left — Image */}
                            <div className="relative rounded-2xl overflow-hidden shadow-xl aspect-[4/3] order-2 lg:order-1">
                                <OptimizedImage
                                    src="/images/projeler/montaj.jpg"
                                    alt="Profesyonel PVC pencere montaj ekibi — Egepen Akçayapı"
                                    fill
                                    className="object-cover"
                                    sizes="(max-width: 1024px) 100vw, 50vw"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-neutral-900/20 to-transparent" aria-hidden="true" />
                            </div>

                            {/* Right — Text */}
                            <div className="order-1 lg:order-2">
                                <h2 id="mission-heading" className="text-2xl md:text-3xl font-bold text-neutral-900 mb-8">
                                    Misyon & Vizyon
                                </h2>
                                <ExpandableGroup>
                                    <ExpandableSection title="Misyonumuz" variant="card" defaultOpen>
                                        <p className="text-sm text-neutral-600 leading-relaxed">
                                            Yaşam alanlarınızı enerji verimli, konforlu ve güvenli hale
                                            getirmek. Egepen Deceuninck&apos;in Avrupa kalite
                                            standartlarını, Beylikdüzü ve çevresindeki müşterilerimize
                                            profesyonel montaj ve satış sonrası hizmet ile sunmak.
                                        </p>
                                    </ExpandableSection>
                                    <ExpandableSection title="Vizyonumuz" variant="card">
                                        <p className="text-sm text-neutral-600 leading-relaxed">
                                            İstanbul Avrupa yakasının lider PVC pencere ve cam balkon çözüm
                                            ortağı olmak. Müşteri memnuniyetini her zaman ön planda tutarak,
                                            sürdürülebilir ve yenilikçi çözümler sunmak.
                                        </p>
                                    </ExpandableSection>
                                </ExpandableGroup>
                            </div>
                        </div>
                    </div>
                </section>

                {/* ====================================================
                    ROW 3 — Service Regions + Subtle CTA
                    Visual anchors via colored tags + directional CTA.
                    ==================================================== */}
                <section className="py-16 md:py-20 bg-white" aria-labelledby="regions-heading">
                    <div className="container-custom max-w-4xl text-center">
                        <h2
                            id="regions-heading"
                            className="text-2xl md:text-3xl font-bold text-neutral-900 mb-4"
                        >
                            Hizmet Bölgelerimiz
                        </h2>
                        <p className="text-neutral-500 mb-8 max-w-xl mx-auto">
                            Beylikdüzü merkez ve çevre ilçelerde ücretsiz keşif hizmeti
                            sunuyoruz.
                        </p>
                        <div className="flex flex-wrap justify-center gap-3 mb-10">
                            {regions.map((r) => (
                                <span
                                    key={r}
                                    className="inline-block text-sm bg-primary-50 text-primary-700 font-medium px-4 py-2 rounded-full border border-primary-100"
                                >
                                    {r}
                                </span>
                            ))}
                        </div>
                        <p className="text-neutral-500 text-sm">
                            Bölgeniz listede yok mu?{" "}
                            <Link
                                href="/iletisim"
                                className="text-primary-600 font-semibold hover:underline"
                            >
                                Bize ulaşın
                            </Link>
                            , hizmet alanımızı kontrol edelim.
                        </p>
                    </div>
                </section>
            </main>
            <Footer />
        </>
    );
}
