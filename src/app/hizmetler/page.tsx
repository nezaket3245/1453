import { Metadata } from "next";
import { HeaderOptimized } from "@/components/layout/HeaderOptimized";
import { Footer } from "@/components/layout/Footer";
import { PageHero } from "@/components/ui/PageHero";
import OptimizedImage from "@/components/ui/OptimizedImage";
import Link from "next/link";

export const metadata: Metadata = {
    title: "Hizmetlerimiz - Egepen Akçayapı Beylikdüzü",
    description:
        "Ücretsiz keşif, profesyonel montaj, bakım & onarım ve ısı yalıtım danışmanlığı. Beylikdüzü PVC pencere hizmetleri.",
    alternates: { canonical: "https://akcapen-pvc.pages.dev/hizmetler" },
};

/* ── SVG icon components ───────────────────────────────────── */
function RulerIcon({ className = "w-8 h-8" }: { className?: string }) {
    return (
        <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5} aria-hidden="true">
            <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 3.75v4.5m0-4.5h4.5m-4.5 0L9 9M3.75 20.25v-4.5m0 4.5h4.5m-4.5 0L9 15M20.25 3.75h-4.5m4.5 0v4.5m0-4.5L15 9m5.25 11.25h-4.5m4.5 0v-4.5m0 4.5L15 15" />
        </svg>
    );
}
function WrenchIcon({ className = "w-8 h-8" }: { className?: string }) {
    return (
        <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5} aria-hidden="true">
            <path strokeLinecap="round" strokeLinejoin="round" d="M11.42 15.17l-5.297-5.296A3.375 3.375 0 010 3.75V2.25h1.5a3.375 3.375 0 016.124 6.124l5.296 5.296m4.205-4.205a3.375 3.375 0 00-4.205-4.205L9.42 8.46l5.296 5.297a3.375 3.375 0 004.205 4.205l2.454-2.454" />
        </svg>
    );
}
function CogIcon({ className = "w-8 h-8" }: { className?: string }) {
    return (
        <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5} aria-hidden="true">
            <path strokeLinecap="round" strokeLinejoin="round" d="M9.594 3.94c.09-.542.56-.94 1.11-.94h2.593c.55 0 1.02.398 1.11.94l.213 1.281c.063.374.313.686.645.87.074.04.147.083.22.127.325.196.72.257 1.075.124l1.217-.456a1.125 1.125 0 011.37.49l1.296 2.247a1.125 1.125 0 01-.26 1.431l-1.003.827c-.293.241-.438.613-.43.992a7.723 7.723 0 010 .255c-.008.378.137.75.43.991l1.004.827c.424.35.534.955.26 1.43l-1.298 2.247a1.125 1.125 0 01-1.369.491l-1.217-.456c-.355-.133-.75-.072-1.076.124a6.47 6.47 0 01-.22.128c-.331.183-.581.495-.644.869l-.213 1.281c-.09.543-.56.941-1.11.941h-2.594c-.55 0-1.019-.398-1.11-.94l-.213-1.281c-.062-.374-.312-.686-.644-.87a6.52 6.52 0 01-.22-.127c-.325-.196-.72-.257-1.076-.124l-1.217.456a1.125 1.125 0 01-1.369-.49l-1.297-2.247a1.125 1.125 0 01.26-1.431l1.004-.827c.292-.24.437-.613.43-.991a6.932 6.932 0 010-.255c.007-.38-.138-.751-.43-.992l-1.004-.827a1.125 1.125 0 01-.26-1.43l1.297-2.247a1.125 1.125 0 011.37-.491l1.216.456c.356.133.751.072 1.076-.124.072-.044.146-.086.22-.128.332-.183.582-.495.644-.869l.214-1.28z" />
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
        </svg>
    );
}
function ThermometerIcon({ className = "w-8 h-8" }: { className?: string }) {
    return (
        <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5} aria-hidden="true">
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v6m3-3H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
    );
}

/* ── Service data ──────────────────────────────────────────── */
const services = [
    {
        Icon: RulerIcon,
        title: "Ücretsiz Keşif",
        desc: "Uzman ekibimiz evinize gelerek detaylı ölçü alır, mevcut durumu inceler ve ihtiyacınıza en uygun çözümü belirler. Hiçbir ücret veya taahhüt gerektirmez.",
        details: [
            "Yerinde ölçü ve durum analizi",
            "Ürün ve renk danışmanlığı",
            "Detaylı fiyat teklifi hazırlama",
        ],
        image: "/images/services/kesif.jpg",
        imageAlt: "Ücretsiz keşif — uzman ekip yerinde ölçü alıyor",
    },
    {
        Icon: WrenchIcon,
        title: "Profesyonel Montaj",
        desc: "Deneyimli montaj ekibimiz, ürünlerinizi Egepen Deceuninck standartlarına uygun şekilde monte eder. Titiz işçilik ve temiz çalışma alanı garantisi.",
        details: [
            "Fabrika eğitimli montaj ekibi",
            "Standartlara uygun uygulama",
            "Montaj sonrası temizlik",
        ],
        image: "/images/services/montaj.jpg",
        imageAlt: "Profesyonel PVC pencere montajı — Egepen standartlarında uygulama",
    },
    {
        Icon: CogIcon,
        title: "Bakım & Onarım",
        desc: "Mevcut PVC pencere, cam balkon ve panjur sistemleriniz için periyodik bakım ve onarım hizmeti sunuyoruz. Sistemlerinizin ömrünü uzatın.",
        details: [
            "Conta ve aksesuar değişimi",
            "Cam değişimi ve ayar",
            "Mekanizma bakımı ve yağlama",
        ],
        image: "/images/services/bakim.jpg",
        imageAlt: "PVC pencere bakım ve onarım hizmeti",
    },
    {
        Icon: ThermometerIcon,
        title: "Isı Yalıtım Danışmanlığı",
        desc: "Enerji tasarrufu için mevcut yalıtım durumunuzu analiz eder, en uygun cam ve profil kombinasyonunu öneriyoruz.",
        details: [
            "Mevcut yalıtım performans analizi",
            "Enerji tasarrufu hesaplaması",
            "Cam ve profil seçim danışmanlığı",
        ],
        image: "/images/services/yalitim.jpg",
        imageAlt: "Isı yalıtım danışmanlığı — enerji verimli çözümler",
    },
] as const;

/* ── Process steps ─────────────────────────────────────────── */
const steps = [
    { num: "01", label: "İletişim", text: "Telefon, WhatsApp veya form ile bize ulaşın." },
    { num: "02", label: "Keşif", text: "Ekibimiz evinize gelerek ücretsiz ölçü alır." },
    { num: "03", label: "Teklif", text: "Detaylı fiyat teklifi ve ürün önerisi sunarız." },
    { num: "04", label: "Montaj", text: "Onayınızla profesyonel montaj gerçekleştirilir." },
];

export default function ServicesPage() {
    return (
        <>
            <HeaderOptimized />
            <main id="main-content" className="min-h-screen bg-neutral-50">
                <PageHero
                    title="Hizmetlerimiz"
                    subtitle="Satış öncesinden montaj sonrasına kadar profesyonel hizmet."
                    breadcrumbs={[{ label: "Hizmetler" }]}
                    compact
                />

                {/* ====================================================
                    ZIG-ZAG SERVICE SECTIONS
                    Even index → text left / image right
                    Odd  index → image left / text right
                    ==================================================== */}
                {services.map((service, i) => {
                    const isEven = i % 2 === 0;
                    return (
                        <section
                            key={service.title}
                            className={`py-14 md:py-20 ${isEven ? "bg-white" : "bg-neutral-50"}`}
                            aria-labelledby={`svc-${i}`}
                        >
                            <div className="container-custom">
                                <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-center">
                                    {/* Text block */}
                                    <div className={isEven ? "lg:order-1" : "lg:order-2"}>
                                        <div className="flex items-center gap-3 mb-4">
                                            <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-primary-50 text-primary-600 flex items-center justify-center">
                                                <service.Icon className="w-6 h-6" />
                                            </div>
                                            <h2 id={`svc-${i}`} className="text-2xl md:text-3xl font-bold text-neutral-900">
                                                {service.title}
                                            </h2>
                                        </div>
                                        <p className="text-neutral-600 leading-relaxed mb-5">
                                            {service.desc}
                                        </p>
                                        <ul className="space-y-2 mb-6" aria-label={`${service.title} detayları`}>
                                            {service.details.map((d) => (
                                                <li key={d} className="flex items-start gap-2 text-sm text-neutral-600">
                                                    <svg className="w-4 h-4 text-primary-500 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
                                                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                                    </svg>
                                                    {d}
                                                </li>
                                            ))}
                                        </ul>
                                    </div>

                                    {/* Image block */}
                                    <div className={`relative rounded-2xl overflow-hidden shadow-xl aspect-[4/3] ${isEven ? "lg:order-2" : "lg:order-1"}`}>
                                        <OptimizedImage
                                            src={service.image}
                                            alt={service.imageAlt}
                                            fill
                                            className="object-cover"
                                            sizes="(max-width: 1024px) 100vw, 50vw"
                                        />
                                        <div className="absolute inset-0 bg-gradient-to-t from-neutral-900/15 to-transparent" aria-hidden="true" />
                                    </div>
                                </div>
                            </div>
                        </section>
                    );
                })}

                {/* ====================================================
                    HOW IT WORKS — Process steps (visual break)
                    ==================================================== */}
                <section className="py-14 md:py-20 bg-primary-600 text-white" aria-labelledby="process-heading">
                    <div className="container-custom max-w-4xl">
                        <h2
                            id="process-heading"
                            className="text-2xl md:text-3xl font-bold text-center mb-10"
                        >
                            Nasıl Çalışıyoruz?
                        </h2>
                        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
                            {steps.map((s) => (
                                <div key={s.num} className="text-center">
                                    <span className="block text-3xl font-extrabold text-white/30 mb-2">
                                        {s.num}
                                    </span>
                                    <h3 className="text-lg font-bold mb-1">{s.label}</h3>
                                    <p className="text-sm text-white/70 leading-relaxed">{s.text}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* ====================================================
                    SUBTLE TEXT CTA — directs to İletişim
                    ==================================================== */}
                <section className="py-14 md:py-16 bg-white text-center">
                    <div className="container-custom max-w-xl">
                        <p className="text-neutral-600 leading-relaxed mb-4">
                            Hizmetlerimiz hakkında detaylı bilgi almak veya ücretsiz keşif
                            randevusu oluşturmak için iletişim sayfamızı ziyaret edebilirsiniz.
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
