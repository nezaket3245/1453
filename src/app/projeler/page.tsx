import { Metadata } from "next";
import Link from "next/link";
import OptimizedImage from "@/components/ui/OptimizedImage";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/Button";
import { businessConfig } from "@/config/business.config";
import { projects, projectCategories } from "@/lib/projectsData";

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
                                    <Link href="/" className="hover:text-white transition-colors">
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
                                25 yılda 10.000&apos;den fazla başarılı proje. İstanbul genelinde
                                villalardan toplu konutlara, ofislerden ticari alanlara kadar
                                geniş bir proje portföyü.
                            </p>
                        </div>

                        {/* Stats */}
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-12">
                            {[
                                { value: "10.000+", label: "Tamamlanan Proje" },
                                { value: "25+", label: "Yıllık Deneyim" },
                                { value: "98%", label: "Müşteri Memnuniyeti" },
                                { value: "50+", label: "Aktif Site" },
                            ].map((stat, i) => (
                                <div key={i} className="text-center">
                                    <div className="text-3xl md:text-4xl font-black text-secondary-400 mb-2">
                                        {stat.value}
                                    </div>
                                    <div className="text-sm text-white/60">{stat.label}</div>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Categories Filter */}
                <section className="py-8 bg-neutral-50 border-b border-neutral-100 sticky top-[72px] z-30">
                    <div className="container-custom">
                        <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-hide">
                            {projectCategories.map((category) => (
                                <button
                                    key={category.id}
                                    className="flex-shrink-0 px-5 py-2.5 rounded-full bg-white hover:bg-primary-100 hover:text-primary-700 font-medium text-sm transition-colors flex items-center gap-2 border border-neutral-200"
                                >
                                    <span>{category.icon}</span>
                                    {category.name}
                                </button>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Projects Grid */}
                <section className="section">
                    <div className="container-custom">
                        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {projects.map((project) => (
                                <article
                                    key={project.id}
                                    className="group bg-white rounded-2xl overflow-hidden border border-neutral-100 shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-2"
                                >
                                    {/* Image */}
                                    <div className="relative aspect-[4/3] overflow-hidden">
                                        <OptimizedImage
                                            src={project.images[0]}
                                            alt={project.title}
                                            fill
                                            className="object-cover group-hover:scale-110 transition-transform duration-500"
                                        />
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                                        <div className="absolute top-4 left-4">
                                            <span className="px-3 py-1 bg-white/90 backdrop-blur-sm text-neutral-700 rounded-full text-xs font-medium">
                                                {projectCategories.find((c) => c.id === project.category)?.name}
                                            </span>
                                        </div>
                                        <div className="absolute bottom-4 left-4 right-4">
                                            <h3 className="text-xl font-bold text-white line-clamp-2">
                                                {project.title}
                                            </h3>
                                        </div>
                                    </div>

                                    {/* Content */}
                                    <div className="p-6">
                                        <div className="flex items-center gap-4 text-sm text-neutral-500 mb-4">
                                            <span className="flex items-center gap-1">
                                                📍 {project.location}
                                            </span>
                                            <span className="flex items-center gap-1">
                                                📅 {project.year}
                                            </span>
                                        </div>
                                        <p className="text-neutral-600 mb-4 line-clamp-2">
                                            {project.description}
                                        </p>

                                        {/* Features */}
                                        <div className="flex flex-wrap gap-2 mb-4">
                                            {project.features.slice(0, 3).map((feature) => (
                                                <span
                                                    key={feature}
                                                    className="px-2 py-1 bg-neutral-100 text-neutral-600 rounded text-xs"
                                                >
                                                    {feature}
                                                </span>
                                            ))}
                                            {project.features.length > 3 && (
                                                <span className="px-2 py-1 bg-primary-50 text-primary-600 rounded text-xs">
                                                    +{project.features.length - 3} özellik
                                                </span>
                                            )}
                                        </div>

                                        {/* Testimonial Preview */}
                                        {project.testimonial && (
                                            <div className="pt-4 border-t border-neutral-100">
                                                <p className="text-sm text-neutral-500 italic line-clamp-2">
                                                    &ldquo;{project.testimonial.text}&rdquo;
                                                </p>
                                                <p className="text-xs text-neutral-400 mt-1">
                                                    — {project.testimonial.author}
                                                </p>
                                            </div>
                                        )}
                                    </div>
                                </article>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Testimonials Section */}
                <section className="section bg-neutral-50">
                    <div className="container-custom">
                        <div className="text-center max-w-2xl mx-auto mb-16">
                            <h2 className="text-3xl md:text-4xl font-bold text-neutral-900 mb-4">
                                Müşteri Yorumları
                            </h2>
                            <p className="text-neutral-600">
                                Projelerimizi tamamladığımız müşterilerimizden gelen geri bildirimler
                            </p>
                        </div>

                        <div className="grid md:grid-cols-3 gap-8">
                            {projects
                                .filter((p) => p.testimonial)
                                .slice(0, 3)
                                .map((project) => (
                                    <div
                                        key={project.id}
                                        className="bg-white p-8 rounded-2xl shadow-sm border border-neutral-100"
                                    >
                                        <div className="flex gap-1 mb-4">
                                            {[...Array(5)].map((_, i) => (
                                                <span key={i} className="text-yellow-400">★</span>
                                            ))}
                                        </div>
                                        <p className="text-neutral-600 mb-6 italic">
                                            &ldquo;{project.testimonial?.text}&rdquo;
                                        </p>
                                        <div className="flex items-center gap-3">
                                            <div className="w-10 h-10 rounded-full bg-primary-100 flex items-center justify-center text-primary-600 font-bold">
                                                {project.testimonial?.author.charAt(0)}
                                            </div>
                                            <div>
                                                <p className="font-medium text-neutral-900">
                                                    {project.testimonial?.author}
                                                </p>
                                                <p className="text-xs text-neutral-400">
                                                    {project.location}
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
                                İstanbul&apos;un Avrupa yakasında aktif olarak hizmet verdiğimiz bölgeler
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
                                    className="text-center p-4 bg-neutral-50 rounded-xl hover:bg-primary-50 hover:text-primary-700 transition-colors cursor-default"
                                >
                                    <span className="text-2xl mb-2 block">📍</span>
                                    <span className="font-medium text-sm">{area}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* CTA Section */}
                <section className="py-20 bg-primary-600 text-white text-center">
                    <div className="container-custom">
                        <h2 className="text-3xl md:text-4xl font-bold mb-6">
                            Sizin Projeniz de Burada Olabilir
                        </h2>
                        <p className="text-xl text-white/80 mb-8 max-w-2xl mx-auto">
                            Ev veya iş yeriniz için ücretsiz keşif ve fiyat teklifi alın.
                            Uzman ekibimiz ihtiyaçlarınıza en uygun çözümü sunacaktır.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <Button variant="secondary" size="xl" href="/teklif-al">
                                Ücretsiz Keşif Talep Et
                            </Button>
                            <Button
                                variant="outline"
                                size="xl"
                                href={`https://wa.me/${businessConfig.contact.whatsapp}?text=Merhaba, proje için görüşmek istiyorum.`}
                                external
                                className="text-white border-white/30 hover:bg-white hover:text-primary-600"
                            >
                                WhatsApp ile Ulaşın
                            </Button>
                        </div>
                    </div>
                </section>
            </main>
            <Footer />
        </>
    );
}
