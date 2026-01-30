import { Metadata } from "next";
import Image from "next/image";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/Button";
import { businessConfig } from "@/config/business.config";

export const metadata: Metadata = {
    title: `Hakkımızda | ${businessConfig.name}`,
    description: `25 yıllık tecrübemizle ${businessConfig.address.district}&apos;de ${businessConfig.brand} yetkili bayisi olarak PVC pencere ve cam balkon sistemlerinde öncü çözümler sunuyoruz.`,
};

export default function AboutPage() {
    return (
        <>
            <Header />
            <main className="min-h-screen">
                {/* Hero Section */}
                <section className="relative py-20 lg:py-32 bg-primary-900 text-white overflow-hidden">
                    <div className="absolute inset-0 opacity-20">
                        <Image src="/images/pvc/pvc-surme-manzara.jpg" alt="Background" fill className="object-cover" />
                    </div>
                    <div className="container-custom relative z-10">
                        <div className="max-w-3xl">
                            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
                                25 Yıllık <span className="text-secondary-400">Tecrübe</span> ve Güven
                            </h1>
                            <p className="text-xl text-white/80 leading-relaxed">
                                {businessConfig.address.district}&apos;de evlerinize sıcaklık, sessizlik ve estetik katmak için yola çıktık.
                                {businessConfig.name} olarak her pencerenin bir hikayesi olduğuna inanıyoruz.
                            </p>
                        </div>
                    </div>
                </section>

                {/* Story Section */}
                <section className="section bg-white">
                    <div className="container-custom">
                        <div className="grid lg:grid-cols-2 gap-16 items-center">
                            <div className="relative aspect-square rounded-2xl overflow-hidden shadow-2xl">
                                <Image src="/images/pvc/pvc-montaj-insaat.jpg" alt="Fabrikamız" fill className="object-cover" />
                            </div>
                            <div>
                                <h2 className="text-3xl font-bold text-neutral-900 mb-6">Biz Kimiz?</h2>
                                <div className="space-y-6 text-neutral-600 leading-relaxed">
                                    <p>
                                        25 yılı aşkın süredir sektörde hizmet veren {businessConfig.name}, bugün {businessConfig.address.district} bölgesinin en büyük {businessConfig.brand} yetkili bayilerinden biri olarak hizmet vermektedir. Kurulduğumuz günden bu yana tek bir amacımız var: Kaliteden ödün vermeden, en modern teknolojileri kullanarak müşteri memnuniyetini en üst seviyede tutmak.
                                    </p>
                                    <p>
                                        Uzman kadromuz, geniş üretim kapasitemiz ve profesyonel montaj ekibimizle sadece PVC pencere değil, yaşam alanlarınıza değer katan komple çözümler sunuyoruz.
                                    </p>
                                    <div className="grid grid-cols-2 gap-6 pt-6">
                                        <div>
                                            <h4 className="text-3xl font-bold text-primary-600 mb-1">10.000+</h4>
                                            <p className="text-sm font-medium uppercase tracking-wider text-neutral-500">Tamamlanan Proje</p>
                                        </div>
                                        <div>
                                            <h4 className="text-3xl font-bold text-primary-600 mb-1">25+</h4>
                                            <p className="text-sm font-medium uppercase tracking-wider text-neutral-500">Yıllık Deneyim</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Values Section */}
                <section className="section bg-neutral-50">
                    <div className="container-custom">
                        <div className="text-center max-w-2xl mx-auto mb-16">
                            <h2 className="text-3xl font-bold text-neutral-900 mb-4">Değerlerimiz</h2>
                            <p className="text-neutral-600">İşimizi yaparken öncelik verdiğimiz temel prensiplerimiz.</p>
                        </div>
                        <div className="grid md:grid-cols-3 gap-8">
                            {[
                                { title: "Kalite", desc: `Sadece dünya standartlarında onaylanmış ${businessConfig.brand} profilleri ve yüksek kaliteli aksesuarlar kullanıyoruz.`, icon: "💎" },
                                { title: "Dürüstlük", desc: "Şeffaf fiyatlandırma ve verdiğimiz sözleri zamanında tutma prensibiyle çalışıyoruz.", icon: "🤝" },
                                { title: "Yenilikçilik", desc: "Sektördeki en son trendleri ve ısı yalıtım teknolojilerini projelerimize entegre ediyoruz.", icon: "🚀" }
                            ].map((val, i) => (
                                <div key={i} className="bg-white p-8 rounded-2xl shadow-sm border border-neutral-100 hover:shadow-md transition-shadow">
                                    <div className="text-4xl mb-6">{val.icon}</div>
                                    <h3 className="text-xl font-bold text-neutral-900 mb-4">{val.title}</h3>
                                    <p className="text-neutral-600 leading-relaxed">{val.desc}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* CTA */}
                <section className="py-20 bg-primary-600 text-white text-center">
                    <div className="container-custom">
                        <h2 className="text-3xl md:text-4xl font-bold mb-8">Projeleriniz İçin Yanınızdayız</h2>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <Button variant="secondary" size="lg" href="/teklif-al">Ücretsiz Keşif İste</Button>
                            <Button variant="outline" size="lg" className="border-white text-white hover:bg-white hover:text-primary-600" href="/urunler">Ürünlerimizi İncele</Button>
                        </div>
                    </div>
                </section>
            </main>
            <Footer />
        </>
    );
}
