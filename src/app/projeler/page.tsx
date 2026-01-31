import { Metadata } from "next";
import Link from "next/link";
import OptimizedImage from "@/components/ui/OptimizedImage";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/Button";
import { businessConfig } from "@/config/business.config";
import { projects, projectCategories } from "@/lib/projectsData";
import { ProjectListing } from "@/components/sections/ProjectListing";

export const metadata: Metadata = {
    title: `Projelerimiz | Referans Çalışmalar | ${businessConfig.name}`,
    description: `Beylikdüzü ve İstanbul genelinde tamamladığımız PVC pencere, cam balkon ve duşakabin projeleri. 10.000+ başarılı proje referansı.`,
    keywords: [
        "PVC pencere projeleri",
        "cam balkon referans",
        "Beylikdüzü pencere montaj",
        "İstanbul doğrama projeleri",
        businessConfig.name,
    ],
    openGraph: {
        title: `Projelerimiz | ${businessConfig.name}`,
        description: `Tamamladığımız başarılı projeler ve müşteri referansları`,
        url: "https://egepenakcayapi.com.tr/projeler",
    },
    alternates: {
        canonical: "https://egepenakcayapi.com.tr/projeler",
    },
};

export default function ProjectsPage() {
    return (
        <>
            <Header />
            <main className="min-h-screen bg-white">
                {/* Hero Section */}
                <section className="relative bg-gradient-to-br from-neutral-900 to-neutral-800 text-white py-20 lg:py-28 overflow-hidden">
                    <div className="absolute inset-0 opacity-20">
                        <OptimizedImage
                            src="/images/pvc/pvc-surme-manzara.jpg"
                            alt="Background"
                            fill
                            className="object-cover"
                            priority
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
                                <li className="text-white">Projeler</li>
                            </ol>
                        </nav>
                        <div className="max-w-3xl">
                            <span className="inline-block px-4 py-1.5 rounded-full bg-white/10 text-secondary-400 text-sm font-bold uppercase tracking-widest mb-6 border border-white/20">
                                Referanslarımız
                            </span>
                            <h1 className="text-4xl md:text-5xl lg:text-6xl font-black mb-6">
                                Tamamlanan <span className="text-secondary-400">Projeler</span>
                            </h1>
                            <p className="text-xl text-white/70 leading-relaxed">
                                40 yılı aşkın süredir Beylikdüzü ve İstanbul genelinde binlerce başarılı proje.
                                Villalardan toplu konutlara, şık cam balkonlardan modern duşakabinlere kadar
                                geniş referans portföyümüzü inceleyin.
                            </p>
                        </div>

                        {/* Stats */}
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-12">
                            {[
                                { value: "10.000+", label: "Tamamlanan Proje" },
                                { value: "40+", label: "Yıllık Deneyim" },
                                { value: "98%", label: "Müşteri Memnuniyeti" },
                                { value: "Beylikdüzü", label: "Merkez Bölge" },
                            ].map((stat, i) => (
                                <div key={i} className="text-center">
                                    <div className="text-3xl md:text-4xl font-black text-secondary-400 mb-2">
                                        {stat.value}
                                    </div>
                                    <div className="text-sm text-white/60 font-bold uppercase tracking-wider">{stat.label}</div>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Interactive Project Listing */}
                <ProjectListing projects={projects} categories={projectCategories} />

                {/* Testimonials Section */}
                <section className="section bg-neutral-900 text-white overflow-hidden relative">
                    <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/2 w-[600px] h-[600px] bg-primary-600/10 rounded-full blur-[120px]" />

                    <div className="container-custom relative z-10">
                        <div className="text-center max-w-2xl mx-auto mb-16">
                            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                                Müşteri Yorumları
                            </h2>
                            <p className="text-neutral-400">
                                Projelerimizi tamamladığımız müşterilerimizden gelen gerçek geri bildirimler
                            </p>
                        </div>

                        <div className="grid md:grid-cols-3 gap-8">
                            {projects
                                .filter((p) => p.testimonial)
                                .slice(0, 3)
                                .map((project, idx) => (
                                    <div
                                        key={project.id}
                                        className="bg-white/5 backdrop-blur-sm p-8 rounded-3xl border border-white/10 hover:border-primary-500/30 transition-all group"
                                    >
                                        <div className="flex gap-1 mb-6">
                                            {[...Array(5)].map((_, i) => (
                                                <span key={i} className="text-primary-400">★</span>
                                            ))}
                                        </div>
                                        <p className="text-neutral-300 mb-6 italic leading-relaxed">
                                            &ldquo;{project.testimonial?.text}&rdquo;
                                        </p>
                                        <div className="flex items-center gap-4">
                                            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary-500 to-primary-600 flex items-center justify-center text-white font-bold text-lg shadow-lg group-hover:scale-110 transition-transform">
                                                {project.testimonial?.author.charAt(0)}
                                            </div>
                                            <div>
                                                <p className="font-bold text-white">
                                                    {project.testimonial?.author}
                                                </p>
                                                <p className="text-xs text-neutral-500 font-medium uppercase tracking-widest">
                                                    {project.location.split(",")[0]}
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                        </div>
                    </div>
                </section>

                {/* Service Areas */}
                <section className="section bg-white">
                    <div className="container-custom">
                        <div className="text-center max-w-2xl mx-auto mb-12">
                            <h2 className="text-3xl font-bold text-neutral-900 mb-4">
                                Hizmet Bölgelerimiz
                            </h2>
                            <p className="text-neutral-600">
                                Beylikdüzü ve İstanbul&apos;un tüm Avrupa yakasında profesyonel montaj ve servis desteği sağlıyoruz.
                            </p>
                        </div>

                        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
                            {[
                                "Beylikdüzü",
                                "Gürpınar",
                                "Yakuplu",
                                "Kavaklı",
                                "Büyükçekmece",
                                "Esenyurt",
                                "Avcılar",
                                "Küçükçekmece",
                                "Başakşehir",
                                "Bahçeşehir",
                                "Hadımköy",
                                "Silivri",
                            ].map((area) => (
                                <div
                                    key={area}
                                    className="text-center p-6 bg-neutral-50 rounded-2xl hover:bg-primary-600 hover:text-white transition-all duration-300 group shadow-sm hover:shadow-xl hover:-translate-y-1"
                                >
                                    <span className="text-3xl mb-3 block group-hover:scale-125 transition-transform">📍</span>
                                    <span className="font-bold text-sm tracking-tight">{area}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* CTA Section */}
                <section className="py-24 bg-primary-600 text-white text-center relative overflow-hidden">
                    <div className="absolute inset-0 bg-[url('/images/pattern-dots.svg')] opacity-20" />
                    <div className="container-custom relative z-10">
                        <h2 className="text-3xl md:text-4xl lg:text-5xl font-black mb-8 leading-tight">
                            Sizin Projeniz de <span className="text-secondary-400">Gurur Tablomuz</span> Olsun
                        </h2>
                        <p className="text-xl text-white/80 mb-10 max-w-2xl mx-auto leading-relaxed">
                            Ev veya iş yeriniz için ücretsiz keşif ve fiyat teklifi alın.
                            Uzman ekibimizle en kaliteli çözümleri bütçenize uygun sunalım.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-5 justify-center">
                            <Button variant="secondary" size="xl" href="/teklif-al" className="px-10 h-16 shadow-2xl">
                                Ücretsiz Keşif Talep Et
                            </Button>
                            <Button
                                variant="outline"
                                size="xl"
                                href={`https://wa.me/${businessConfig.contact.whatsapp}`}
                                className="px-10 h-16 text-white border-white/40 hover:bg-white hover:text-primary-600 transition-all backdrop-blur-sm"
                            >
                                WhatsApp İletişimi
                            </Button>
                        </div>
                    </div>
                </section>
            </main>
            <Footer />
        </>
    );
}
