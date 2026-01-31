import { Metadata } from 'next';
import Link from 'next/link';
import OptimizedImage from '@/components/ui/OptimizedImage';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { businessConfig } from '@/config/business.config';
import { glassSystems, glassTypes, colorOptions, seoKeywordClusters } from '@/lib/camBalkonData';
import { ComparisonMatrix } from '@/components/sections/ComparisonMatrix';
import { GlassSafetyComparison } from '@/components/sections/GlassSafetyComparison';
import { TechnicalFAQSection, camBalkonFAQs } from '@/components/sections/TechnicalFAQSection';
import { WhatsAppCTA } from '@/components/ui/WhatsAppCTA';

/**
 * Cam Balkon Sistemleri Hub Page
 * SEO: target "Beylikdüzü cam balkon", "ısıcamlı cam balkon", etc.
 */
export const metadata: Metadata = {
    title: `Cam Balkon & Sürme Sistemleri | Beylikdüzü İstanbul | ${businessConfig.name}`,
    description: `Isıcamlı Tiara Max, eşiksiz sürme ve motorlu giyotin sistemleri. Beylikdüzü ve İstanbul geneli profesyonel montaj. 8mm-10mm temperli ve lamine cam seçenekleri. Ücretsiz keşif: ${businessConfig.contact.mobile}`,
    keywords: [
        ...seoKeywordClusters.local,
        ...seoKeywordClusters.transactional,
        ...seoKeywordClusters.problemSolving.slice(0, 5),
    ],
    openGraph: {
        title: `Cam Balkon & Sürme Sistemleri | ${businessConfig.name}`,
        description: `Balkonunuzu kış bahçesine dönüştürün. Isı yalıtımlı cam balkon ve sürme sistemlerinde 25 yıllık uzman çözüm ortağınız.`,
        url: 'https://egepenakcayapi.com.tr/cam-balkon-sistemleri',
        images: [{ url: '/images/cam-balkon/hero-bg.png', width: 1200, height: 630 }],
    },
    alternates: {
        canonical: 'https://egepenakcayapi.com.tr/cam-balkon-sistemleri',
    },
};

export default function GlassSystemsPage() {
    return (
        <>
            <Header />
            <main className="min-h-screen bg-white">
                {/* Hero Section */}
                <section className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 bg-neutral-900 text-white overflow-hidden">
                    <div className="absolute inset-0 opacity-50">
                        <OptimizedImage
                            src="/images/showroom-main.png"
                            alt="Modern Cam Balkon Tasarımı"
                            fill
                            priority
                            className="object-cover"
                        />
                    </div>
                    <div className="container-custom relative z-10">
                        <div className="max-w-3xl">
                            <span className="inline-block px-4 py-1.5 rounded-full bg-primary-500 text-white text-xs font-bold uppercase tracking-widest mb-6 animate-fade-in">
                                Mimari Cam Çözümleri
                            </span>
                            <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
                                Balkonunuzu <span className="text-primary-400">Dört Mevsim</span> Yaşam Alanına Dönüştürün
                            </h1>
                            <p className="text-xl text-neutral-400 mb-10 leading-relaxed">
                                Beylikdüzü&apos;nde ısı yalıtımlı, konforlu ve estetik cam balkon sistemleri.
                                Tiara Max ve Twin teknolojileriyle %60&apos;a varan enerji tasarrufu sağlayın.
                            </p>
                            <div className="flex flex-wrap gap-4">
                                <Link href="/teklif-al" className="btn btn-primary btn-lg">
                                    Ücretsiz Keşif İste
                                </Link>
                                <a href={`tel:${businessConfig.contact.mobileRaw}`} className="btn btn-outline btn-lg border-white text-white hover:bg-white hover:text-black">
                                    Hemen Ara: {businessConfig.contact.mobile}
                                </a>
                            </div>
                        </div>
                    </div>
                </section>

                {/* ==================== CAM BALKON GALLERY SHOWCASE ==================== */}
                <section className="section bg-neutral-100">
                    <div className="container-custom">
                        <div className="text-center max-w-3xl mx-auto mb-12">
                            <span className="inline-block px-4 py-1 rounded-full bg-primary-50 text-primary-600 text-sm font-bold uppercase tracking-widest mb-4">
                                Projelerimizden
                            </span>
                            <h2 className="text-3xl md:text-4xl font-black text-neutral-900 mb-4">
                                Cam Balkon <span className="text-primary-600">Uygulamalarımız</span>
                            </h2>
                            <p className="text-lg text-neutral-600">
                                Beylikdüzü ve çevre ilçelerde gerçekleştirdiğimiz cam balkon montajlarından örnekler.
                            </p>
                        </div>

                        {/* Gallery Grid */}
                        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {/* Large Featured Image */}
                            <div className="md:col-span-2 lg:col-span-2 relative aspect-video rounded-2xl overflow-hidden group">
                                <OptimizedImage
                                    src="/images/cam-balkon/cam-balkon-site-manzara.jpg"
                                    alt="Cam Balkon Montajı - Site Manzaralı"
                                    fill
                                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                                <div className="absolute bottom-6 left-6 right-6 text-white">
                                    <span className="inline-block px-3 py-1 bg-primary-600 text-xs font-bold rounded-full mb-2">Isıcamlı Sistem</span>
                                    <h3 className="text-xl font-bold">Modern Site Manzarası</h3>
                                    <p className="text-white/80 text-sm">Rezidans dairesi için ısıcamlı cam balkon uygulaması</p>
                                </div>
                            </div>

                            {/* Gallery Item */}
                            <div className="relative aspect-square rounded-2xl overflow-hidden group">
                                <OptimizedImage
                                    src="/images/cam-balkon/cam-balkon-kose.jpg"
                                    alt="Köşe Cam Balkon Montajı"
                                    fill
                                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                                <div className="absolute bottom-4 left-4 right-4 text-white">
                                    <span className="inline-block px-3 py-1 bg-secondary-500 text-xs font-bold rounded-full mb-2">Köşe Sistem</span>
                                    <h3 className="font-bold">L Tipi Köşe Balkon</h3>
                                </div>
                            </div>

                            {/* Gallery Item */}
                            <div className="relative aspect-square rounded-2xl overflow-hidden group">
                                <OptimizedImage
                                    src="/images/cam-balkon/cam-balkon-sehir-manzara.jpg"
                                    alt="Şehir Manzaralı Cam Balkon"
                                    fill
                                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                                <div className="absolute bottom-4 left-4 right-4 text-white">
                                    <span className="inline-block px-3 py-1 bg-primary-600 text-xs font-bold rounded-full mb-2">Sürme</span>
                                    <h3 className="font-bold">Şehir Manzaralı Balkon</h3>
                                </div>
                            </div>

                            {/* Gallery Item */}
                            <div className="relative aspect-square rounded-2xl overflow-hidden group">
                                <OptimizedImage
                                    src="/images/cam-balkon/cam-balkon-gunbatimi.jpg"
                                    alt="Gün Batımı Manzaralı Cam Balkon"
                                    fill
                                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                                <div className="absolute bottom-4 left-4 right-4 text-white">
                                    <span className="inline-block px-3 py-1 bg-orange-500 text-xs font-bold rounded-full mb-2">Teras</span>
                                    <h3 className="font-bold">Gün Batımı Keyfi</h3>
                                </div>
                            </div>

                            {/* Gallery Item with CTA */}
                            <div className="relative aspect-square rounded-2xl overflow-hidden group">
                                <OptimizedImage
                                    src="/images/cam-balkon/cam-balkon-bahce-manzara.jpg"
                                    alt="Bahçe Manzaralı Cam Balkon"
                                    fill
                                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-primary-900/90 to-primary-900/40" />
                                <div className="absolute inset-0 flex flex-col items-center justify-center text-white p-6 text-center">
                                    <span className="text-4xl mb-3">🏠</span>
                                    <h3 className="text-xl font-bold mb-2">Sizin Balkonunuz da Bu Kadar Güzel Olabilir!</h3>
                                    <p className="text-white/80 text-sm mb-4">Ücretsiz keşif ile başlayın</p>
                                    <Link href="/teklif-al" className="px-4 py-2 bg-secondary-500 text-white font-bold rounded-lg hover:bg-secondary-600 transition-colors">
                                        Teklif Al →
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Technical Overview Categories */}
                <section className="section bg-white" id="sistemler">
                    <div className="container-custom">
                        <div className="text-center max-w-3xl mx-auto mb-16">
                            <h2 className="text-3xl md:text-4xl font-bold text-neutral-900 mb-6">İhtiyacınıza Uygun Sistemler</h2>
                            <p className="text-lg text-neutral-600">
                                Kullanım amacınıza ve bütçenize en uygun cam balkon çözümünü seçin.
                                Tüm sistemlerimizde 8-10mm Şişecam temperli camlar kullanılır.
                            </p>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                            {[
                                { id: 'isicamli', title: 'Isıcamlı Sistemler', tags: 'Tiara Max / Twin', icon: '❄️', desc: 'Maksimum ısı ve ses yalıtımı için 24-28mm çift camlı sistemler. Argon gazlı ve Low-E kaplamalı.' },
                                { id: 'surme', title: 'Sürme Sistemler', tags: 'Eşikli / Eşiksiz', icon: '↔️', desc: 'Eşikli: maksimum su yalıtımı. Eşiksiz: kafe ve teraslar için kesintisiz geçiş.' },
                                { id: 'giyotin', title: 'Giyotin Sistemler', tags: 'Motorlu / Manuel', icon: '↕️', desc: 'Dikey sürme sistemler. Somfy/Becker motorlu veya gaz pistonlu ekonomik seçenekler.' },
                                { id: 'katlanir', title: 'Katlanır Sistemler', tags: 'Tam Açılım', icon: '📁', desc: 'Panoramik görüntü için %100 açılım. Köşe dahil her yere katlanabilen camlar.' },
                            ].map((cat) => (
                                <div key={cat.id} className="group p-8 rounded-3xl bg-neutral-50 border border-neutral-100 hover:bg-white hover:shadow-2xl transition-all duration-500">
                                    <div className="text-4xl mb-6">{cat.icon}</div>
                                    <h3 className="text-xl font-bold mb-2">{cat.title}</h3>
                                    <span className="text-xs font-bold text-primary-600 bg-primary-50 px-2 py-1 rounded inline-block mb-4">{cat.tags}</span>
                                    <p className="text-neutral-600 text-sm mb-6 leading-relaxed">{cat.desc}</p>
                                    <Link href={`#${cat.id}`} className="inline-flex items-center text-sm font-bold text-black border-b-2 border-neutral-200 hover:border-primary-500 transition-colors">
                                        Modelleri İncele
                                    </Link>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Comparison Matrix Section */}
                <section className="section bg-neutral-50">
                    <div className="container-custom">
                        <div className="text-center max-w-3xl mx-auto mb-16">
                            <h2 className="text-3xl md:text-4xl font-bold text-neutral-900 mb-6 font-primary">Sistem Karşılaştırma Matrisi</h2>
                            <p className="text-lg text-neutral-600">
                                Karar vermenize yardımcı olmak için sistemlerimizi ısı yalıtımı, fiyat ve kullanım kolaylığına göre karşılaştırdık.
                            </p>
                        </div>
                        <ComparisonMatrix />
                    </div>
                </section>

                {/* Product Deep Dive (SSR-ready loops) */}
                {glassSystems.map((system, index) => (
                    <section
                        key={system.id}
                        id={system.category}
                        className={`section ${index % 2 === 1 ? 'bg-neutral-50' : 'bg-white'}`}
                    >
                        <div className="container-custom">
                            <div className={`flex flex-col lg:flex-row gap-16 items-center ${index % 2 === 1 ? 'lg:flex-row-reverse' : ''}`}>
                                {/* Image side */}
                                <div className="flex-1 w-full relative">
                                    <div className="aspect-[4/3] rounded-[2.5rem] overflow-hidden shadow-2xl bg-neutral-200 relative">
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent z-10" />
                                        <OptimizedImage
                                            src={system.image}
                                            alt={`${system.name} - ${system.tagline}`}
                                            fill
                                            className="object-cover"
                                        />
                                    </div>
                                    {/* Features badge */}
                                    <div className="absolute -bottom-6 -right-6 lg:-right-10 bg-white p-6 rounded-3xl shadow-xl border border-neutral-100 max-w-[240px] hidden md:block">
                                        <div className="flex items-center gap-3 mb-2">
                                            <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                                            <span className="text-xs font-bold text-neutral-500 uppercase">Özet Teknik</span>
                                        </div>
                                        <p className="text-sm font-bold text-neutral-900 leading-tight">
                                            {system.technicalSpecs[0].label}: {system.technicalSpecs[0].value}
                                        </p>
                                    </div>
                                </div>

                                {/* Content side */}
                                <div className="flex-1">
                                    <div className="flex items-center gap-3 mb-6">
                                        <span className="px-3 py-1 bg-primary-100 text-primary-700 text-xs font-bold rounded-full uppercase tracking-wider">
                                            {system.category === 'isicamli' ? 'Isı Yalıtımlı' : system.category.charAt(0).toUpperCase() + system.category.slice(1)}
                                        </span>
                                        <div className="flex gap-1">
                                            {[...Array(system.priceRange === 'premium' ? 3 : system.priceRange === 'orta' ? 2 : 1)].map((_, i) => (
                                                <span key={i} className="text-amber-500 font-bold">₺</span>
                                            ))}
                                        </div>
                                    </div>
                                    <h2 className="text-3xl md:text-4xl font-bold text-neutral-900 mb-6">{system.name}</h2>
                                    <p className="text-xl text-primary-600 font-medium mb-6">{system.tagline}</p>
                                    <p className="text-lg text-neutral-600 mb-10 leading-relaxed">{system.description}</p>

                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-10">
                                        {system.features.slice(0, 6).map((feature, fIdx) => (
                                            <div key={fIdx} className="flex items-center gap-3">
                                                <div className="flex-shrink-0 w-5 h-5 rounded-full bg-green-100 text-green-600 flex items-center justify-center">
                                                    <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={4}>
                                                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                                                    </svg>
                                                </div>
                                                <span className="text-neutral-700 font-medium">{feature}</span>
                                            </div>
                                        ))}
                                    </div>

                                    <div className="flex flex-wrap gap-4">
                                        <Link href={`/cam-balkon-sistemleri/${system.slug}`} className="btn btn-primary">
                                            Uygulama Detayları
                                        </Link>
                                        <a
                                            href={`https://wa.me/${businessConfig.contact.whatsapp}?text=${encodeURIComponent(`Merhaba, ${system.name} hakkında detaylı bilgi almak istiyorum.`)}`}
                                            className="btn btn-outline"
                                            target="_blank"
                                            rel="noopener noreferrer"
                                        >
                                            Fiyat Bilgisi Al
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>
                ))}

                {/* Color and Glass Customization */}
                <section className="section bg-neutral-900 text-white">
                    <div className="container-custom">
                        <div className="grid lg:grid-cols-2 gap-20 items-center">
                            <div>
                                <h2 className="text-3xl md:text-5xl font-bold mb-8">Sınırsız <span className="text-primary-400">Özelleştirme</span> Seçenekleri</h2>
                                <p className="text-lg text-neutral-400 mb-12 leading-relaxed">
                                    Mimari tarzınıza uygun yüzlerce RAL renk seçeneği ve projenizin güvenliği için farklı cam kalınlıkları sunuyoruz.
                                    Antrasit Gri&apos;den Wood Grain (Ahşap Görünüm) dokulara kadar geniş bir yelpaze ile evinizin estetiğini tamamlayın.
                                </p>

                                <h3 className="text-xl font-bold mb-6 flex items-center gap-3">
                                    <span className="w-8 h-px bg-primary-500"></span>
                                    Popüler Profil Renkleri
                                </h3>
                                <div className="grid grid-cols-4 sm:grid-cols-8 gap-4 mb-16">
                                    {colorOptions.map((color) => (
                                        <div key={color.name} className="flex flex-col items-center gap-2 group cursor-help">
                                            <div
                                                className="w-full aspect-square rounded-full border border-white/20 shadow-lg group-hover:scale-110 transition-transform"
                                                style={{ backgroundColor: color.hex }}
                                                title={`${color.name} (${color.ral})`}
                                            />
                                            <span className="text-[10px] uppercase font-bold text-neutral-500">{color.ral?.split(' ')[1] || 'Color'}</span>
                                        </div>
                                    ))}
                                </div>

                                <div className="space-y-6">
                                    {glassTypes.slice(2, 5).map((gt) => (
                                        <div key={gt.id} className="p-6 bg-white/5 rounded-2xl border border-white/10 flex gap-6 items-center">
                                            <div className="w-16 h-16 rounded-xl bg-primary-500/20 flex items-center justify-center flex-shrink-0">
                                                <svg className="w-8 h-8 text-primary-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a2 2 0 00-1.96 1.414l-.7.7a2 2 0 01-2.828 0l-.7-.7a2 2 0 00-1.96-1.414l-2.387.477a2 2 0 00-1.022.547l-3.856 3.856a2 2 0 000 2.828l3.856 3.856a2 2 0 002.828 0l3.856-3.856a2 2 0 00.547-1.022l.477-2.387a2 2 0 00-1.414-1.96l-.7-.7a2 2 0 010-2.828l.7-.7a2 2 0 001.414-1.96l-.477-2.387a2 2 0 00-.547-1.022L11 4" />
                                                </svg>
                                            </div>
                                            <div>
                                                <h4 className="font-bold text-lg mb-1">{gt.name}</h4>
                                                <p className="text-sm text-neutral-400">{gt.description}</p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            <div className="relative">
                                <div className="relative aspect-[3/4] rounded-[3rem] overflow-hidden border-8 border-white/10 shadow-2xl">
                                    <OptimizedImage
                                        src="/images/cam-balkon/cam-balkon-gunbatimi.jpg"
                                        alt="Renkli Cam Balkon Profilleri"
                                        fill
                                        className="object-cover"
                                    />
                                </div>
                                {/* Technical stats overlay */}
                                <div className="absolute top-10 -left-10 bg-primary-600 p-8 rounded-3xl shadow-xl max-w-[200px]">
                                    <p className="text-5xl font-bold text-white mb-2">250+</p>
                                    <p className="text-sm font-bold text-primary-100 uppercase tracking-widest leading-tight">Mevcut RAL Renk Seçeneği</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Glass Safety Comparison Section */}
                <section className="section bg-white" id="cam-karsilastirma">
                    <div className="container-custom">
                        <GlassSafetyComparison />
                    </div>
                </section>

                {/* Technical FAQ (Semantic & Detailed for Snippets) */}
                <TechnicalFAQSection
                    faqs={camBalkonFAQs}
                    title="Cam Balkon Hakkında Merak Edilenler"
                    subtitle="Teknik ekibimiz, en çok aldığımız soruları cevapladı. Bilinçli seçim yaparak yaşam alanınızın konforunu artırın."
                    showSchema={true}
                />

                {/* CTA / Final Conversion */}
                <section className="section bg-primary-600 relative overflow-hidden">
                    <div className="absolute inset-0 opacity-10">
                        <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
                            <path d="M0 0 L100 0 L100 100 L0 100 Z" fill="white" />
                        </svg>
                    </div>
                    <div className="container-custom relative z-10 text-center text-white">
                        <h2 className="text-3xl md:text-5xl font-bold mb-8">Balkonunuza Özel Ölçü ve <span className="text-secondary-400">Net Fiyat</span> Alın</h2>
                        <p className="text-xl text-primary-100 mb-12 max-w-2xl mx-auto">
                            Akçayapı uzmanları yerinde keşif yaparak en uygun sistemi belirler.
                            Ücretsiz keşif ve projelendirme için bir telefon uzağınızdayız.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-6 justify-center">
                            <Link href="/teklif-al" className="btn btn-secondary btn-lg px-12">
                                Ücretsiz Teklif Al
                            </Link>
                            <a href={`tel:${businessConfig.contact.mobileRaw}`} className="btn btn-outline btn-lg border-white text-white hover:bg-white hover:text-primary-600 px-12">
                                {businessConfig.contact.mobile}
                            </a>
                        </div>
                    </div>
                </section>
            </main>

            <WhatsAppCTA />
            <Footer />
        </>
    );
}
