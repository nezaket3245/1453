import { Metadata } from "next";
import Link from "next/link";
import { HeaderOptimized } from '@/components/layout/HeaderOptimized';
import { Footer } from "@/components/layout/Footer";
import { businessConfig } from "@/config/business.config";

export const metadata: Metadata = {
    title: 'Gizlilik Politikası ve KVKK Aydınlatma',
    description: "Egepen Akçayapı kişisel verilerin korunması kanunu (KVKK) kapsamında gizlilik politikası ve çerez politikası hakkında bilgilendirme.",
    robots: {
        index: true,
        follow: true,
    },
    alternates: {
        canonical: `${businessConfig.siteUrl}/gizlilik-politikasi`,
    },
};

export default function GizlilikPolitikasiPage() {
    return (
        <>
            <HeaderOptimized />
            <main id="main-content" className="min-h-screen bg-neutral-50">
                {/* Hero Section */}
                <section className="bg-gradient-to-br from-primary-600 to-primary-800 text-white py-20">
                    <div className="container-custom">
                        <nav aria-label="Breadcrumb" className="mb-8">
                            <ol className="flex items-center gap-2 text-sm text-primary-200">
                                <li>
                                    <Link href="/" title="Ana Sayfa" className="hover:text-white transition-colors">
                                        Ana Sayfa
                                    </Link>
                                </li>
                                <li aria-hidden="true">/</li>
                                <li className="text-white font-medium">Gizlilik Politikası</li>
                            </ol>
                        </nav>
                        <h1 className="text-4xl md:text-5xl font-black mb-4">
                            Gizlilik Politikası ve KVKK
                        </h1>
                        <p className="text-xl text-primary-100 max-w-2xl">
                            Kişisel verilerinizin korunması bizim için önemlidir.
                        </p>
                    </div>
                </section>

                {/* Content */}
                <section className="py-16">
                    <div className="container-custom max-w-4xl">
                        <div className="bg-white rounded-2xl shadow-sm p-8 md:p-12 space-y-8">
                            
                            {/* Intro */}
                            <div>
                                <h2 className="text-2xl font-bold text-neutral-900 mb-4">
                                    1. Giriş
                                </h2>
                                <p className="text-neutral-600 leading-relaxed">
                                    {businessConfig.name} olarak, 6698 sayılı Kişisel Verilerin Korunması Kanunu (&quot;KVKK&quot;) 
                                    kapsamında kişisel verilerinizin güvenliğine önem veriyoruz. Bu gizlilik politikası, 
                                    web sitemizi ziyaret ettiğinizde ve hizmetlerimizi kullandığınızda kişisel verilerinizin 
                                    nasıl toplandığını, kullanıldığını ve korunduğunu açıklamaktadır.
                                </p>
                            </div>

                            {/* Data Collection */}
                            <div>
                                <h2 className="text-2xl font-bold text-neutral-900 mb-4">
                                    2. Toplanan Kişisel Veriler
                                </h2>
                                <p className="text-neutral-600 leading-relaxed mb-4">
                                    Web sitemiz üzerinden aşağıdaki kişisel verilerinizi toplayabiliriz:
                                </p>
                                <ul className="list-disc list-inside text-neutral-600 space-y-2">
                                    <li>Ad ve Soyad</li>
                                    <li>Telefon numarası</li>
                                    <li>E-posta adresi</li>
                                    <li>Adres bilgileri (keşif talepleri için)</li>
                                    <li>İletişim formu mesaj içerikleri</li>
                                </ul>
                            </div>

                            {/* Purpose */}
                            <div>
                                <h2 className="text-2xl font-bold text-neutral-900 mb-4">
                                    3. Verilerin Kullanım Amacı
                                </h2>
                                <p className="text-neutral-600 leading-relaxed mb-4">
                                    Toplanan kişisel veriler aşağıdaki amaçlarla kullanılmaktadır:
                                </p>
                                <ul className="list-disc list-inside text-neutral-600 space-y-2">
                                    <li>Teklif ve fiyat bilgisi sağlamak</li>
                                    <li>Ücretsiz keşif hizmeti planlamak</li>
                                    <li>Müşteri hizmetleri desteği sunmak</li>
                                    <li>Ürün ve hizmetlerimiz hakkında bilgilendirme yapmak</li>
                                    <li>Yasal yükümlülüklerimizi yerine getirmek</li>
                                </ul>
                            </div>

                            {/* Data Protection */}
                            <div>
                                <h2 className="text-2xl font-bold text-neutral-900 mb-4">
                                    4. Verilerin Korunması
                                </h2>
                                <p className="text-neutral-600 leading-relaxed">
                                    Kişisel verileriniz, KVKK&apos;nın 12. maddesi gereğince gerekli her türlü teknik ve 
                                    idari tedbirler alınarak korunmaktadır. Verileriniz üçüncü taraflarla yasal 
                                    zorunluluklar dışında paylaşılmamaktadır.
                                </p>
                            </div>

                            {/* Cookies */}
                            <div>
                                <h2 className="text-2xl font-bold text-neutral-900 mb-4">
                                    5. Çerez Politikası
                                </h2>
                                <p className="text-neutral-600 leading-relaxed mb-4">
                                    Web sitemiz, kullanıcı deneyimini iyileştirmek amacıyla çerezler kullanmaktadır:
                                </p>
                                <ul className="list-disc list-inside text-neutral-600 space-y-2">
                                    <li><strong>Zorunlu Çerezler:</strong> Web sitesinin çalışması için gerekli çerezler</li>
                                    <li><strong>Analitik Çerezler:</strong> Ziyaretçi istatistiklerini anlamak için kullanılan çerezler</li>
                                    <li><strong>İşlevsel Çerezler:</strong> Tercihlerinizi hatırlamak için kullanılan çerezler</li>
                                </ul>
                            </div>

                            {/* Rights */}
                            <div>
                                <h2 className="text-2xl font-bold text-neutral-900 mb-4">
                                    6. Haklarınız
                                </h2>
                                <p className="text-neutral-600 leading-relaxed mb-4">
                                    KVKK&apos;nın 11. maddesi kapsamında aşağıdaki haklara sahipsiniz:
                                </p>
                                <ul className="list-disc list-inside text-neutral-600 space-y-2">
                                    <li>Kişisel verilerinizin işlenip işlenmediğini öğrenme</li>
                                    <li>İşlenmişse buna ilişkin bilgi talep etme</li>
                                    <li>İşlenme amacını ve bunların amacına uygun kullanılıp kullanılmadığını öğrenme</li>
                                    <li>Yurt içinde veya yurt dışında aktarıldığı üçüncü kişileri bilme</li>
                                    <li>Eksik veya yanlış işlenmişse düzeltilmesini isteme</li>
                                    <li>KVKK&apos;nın 7. maddesinde öngörülen şartlar çerçevesinde silinmesini isteme</li>
                                </ul>
                            </div>

                            {/* Contact */}
                            <div>
                                <h2 className="text-2xl font-bold text-neutral-900 mb-4">
                                    7. İletişim
                                </h2>
                                <p className="text-neutral-600 leading-relaxed mb-4">
                                    KVKK kapsamındaki haklarınızı kullanmak veya sorularınız için bizimle iletişime geçebilirsiniz:
                                </p>
                                <address className="not-italic text-neutral-600 space-y-2">
                                    <p><strong>Firma:</strong> {businessConfig.legalName}</p>
                                    <p><strong>Adres:</strong> {businessConfig.address.full}</p>
                                    <p><strong>Telefon:</strong> {businessConfig.contact.mobile}</p>
                                </address>
                            </div>

                            {/* Update */}
                            <div className="pt-8 border-t border-neutral-200">
                                <p className="text-sm text-neutral-500">
                                    Son güncelleme: Şubat 2026
                                </p>
                            </div>
                        </div>
                    </div>
                </section>
            </main>
            <Footer />
        </>
    );
}
