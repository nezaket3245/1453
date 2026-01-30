import { Metadata } from "next";
import Link from "next/link";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { businessConfig } from "@/config/business.config";
import OptimizedImage from "@/components/ui/OptimizedImage";

export const metadata: Metadata = {
    title: `Hizmetlerimiz | ${businessConfig.name}`,
    description: `Ücretsiz keşif, profesyonel montaj, bakım ve onarım hizmetlerimizle ${businessConfig.address.city} geneline hizmet veriyoruz. ${businessConfig.brand} kalitesini evinize taşıyoruz.`,
};

const services = [
    {
        title: "Ücretsiz Keşif",
        description: "Uzman ekibimiz evinize gelerek cam ve kapılarınız için en uygun çözümleri belirler, hassas ölçüler alır. Bu hizmetimiz tamamen ücretsizdir.",
        icon: "🔍",
        href: "/teklif-al"
    },
    {
        title: "Profesyonel Montaj",
        description: `Kendi bünyemizdeki eğitimli montaj ekiplerimizle, ${businessConfig.brand} standartlarına uygun, temiz ve titiz kurulum yapıyoruz.`,
        icon: "🛠️",
        href: "/hakkimizda"
    },
    {
        title: "Bakım & Onarım",
        description: "Mevcut PVC pencere ve kapılarınızdaki fitil değişimi, kol tamiri, kilitleme mekanizması ayarlarını profesyonelce yapıyoruz.",
        icon: "⚙️",
        href: "/iletisim"
    },
    {
        title: "Isı Yalıtım Danışmanlığı",
        description: "Binanızın ısı kaybını önlemek için en uygun cam ve profil kombinasyonlarını belirliyor, enerji tasarrufu yapmanızı sağlıyoruz.",
        icon: "🔥",
        href: "/urunler/legend-pvc-pencere"
    }
];

export default function ServicesPage() {
    return (
        <>
            <Header />
            <main className="min-h-screen bg-white">
                {/* Header */}
                <section className="relative bg-neutral-900 text-white py-24 lg:py-32 text-center overflow-hidden">
                    <div className="absolute inset-0 opacity-30">
                        <OptimizedImage
                            src="/images/cam-balkon/cam-balkon-sehir-manzara.jpg"
                            alt="Hizmetlerimiz"
                            fill
                            className="object-cover"
                        />
                    </div>
                    <div className="container-custom relative z-10">
                        <h1 className="text-4xl md:text-5xl lg:text-7xl font-black mb-6">Profesyonel <span className="text-primary-400">Çözümler</span></h1>
                        <p className="text-xl text-white/80 max-w-2xl mx-auto font-medium">
                            Sadece ürün satmıyoruz, yaşam alanlarınızın konforunu ve güvenliğini artıracak uçtan uca hizmetler sunuyoruz.
                        </p>
                    </div>
                </section>

                {/* Services List */}
                <section className="section">
                    <div className="container-custom">
                        <div className="space-y-24">
                            {services.map((service, i) => (
                                <div key={i} className={`flex flex-col lg:flex-row items-center gap-12 ${i % 2 === 1 ? 'lg:flex-row-reverse' : ''}`}>
                                    <div className="flex-1 w-full relative aspect-video rounded-3xl overflow-hidden shadow-2xl">
                                        <OptimizedImage
                                            src={
                                                i === 0 ? "/images/pvc/pvc-montaj-insaat.jpg" :
                                                    i === 1 ? "/images/pvc/pvc-servis-egepen.jpg" :
                                                        i === 2 ? "/images/pvc/pvc-pencere-yemek-odasi.jpg" :
                                                            "/images/cam-balkon/cam-balkon-site-manzara.jpg"
                                            }
                                            alt={service.title}
                                            fill
                                            className="object-cover"
                                        />
                                    </div>
                                    <div className="flex-1">
                                        <span className="text-6xl mb-6 block text-neutral-300">{service.icon}</span>
                                        <h2 className="text-3xl md:text-4xl font-black text-neutral-900 mb-6">{service.title}</h2>
                                        <p className="text-lg text-neutral-600 mb-8 leading-relaxed">
                                            {service.description}
                                        </p>
                                        <Link href={service.href} className="inline-flex items-center gap-2 px-6 py-3 bg-primary-600 text-white font-bold rounded-xl hover:bg-primary-700 transition-all shadow-lg hover:shadow-primary-500/25">
                                            Detaylı Bilgi Al
                                            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                                            </svg>
                                        </Link>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Global Support */}
                <section className="py-20 bg-neutral-50">
                    <div className="container-custom text-center">
                        <h2 className="text-3xl font-bold mb-8">Sorunuz mu Var?</h2>
                        <p className="text-neutral-600 mb-12 max-w-xl mx-auto">
                            Hizmetlerimizle ilgili her türlü soru için destek ekibimiz yardıma hazır.
                        </p>
                        <div className="flex justify-center gap-6">
                            <Link href={`tel:${businessConfig.contact.mobileRaw}`} className="btn btn-primary">Bizi Arayın</Link>
                            <Link href={`https://wa.me/${businessConfig.contact.whatsapp}`} className="btn btn-outline border-neutral-300">WhatsApp Destek</Link>
                        </div>
                    </div>
                </section>
            </main>
            <Footer />
        </>
    );
}
