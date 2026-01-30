"use client";



import { Button } from "@/components/ui/Button";
import { businessConfig } from "@/config/business.config";

export function CTASection() {
    return (
        <section className="section bg-white overflow-hidden">
            <div className="container-custom">
                <div className="relative bg-primary-600 rounded-[3rem] p-12 lg:p-24 overflow-hidden shadow-2xl">
                    {/* Decorative Elements */}
                    <div className="absolute top-0 right-0 w-96 h-96 bg-primary-500 rounded-full blur-3xl opacity-50 -mr-20 -mt-20" />
                    <div className="absolute bottom-0 left-0 w-64 h-64 bg-primary-700 rounded-full blur-3xl opacity-50 -ml-20 -mb-20" />

                    <div className="relative z-10 grid lg:grid-cols-2 gap-16 items-center">
                        <div>
                            <span className="inline-block px-4 py-1 rounded-full bg-white/10 text-white text-sm font-bold uppercase tracking-widest mb-6">
                                Ücretsiz Keşif & Ölçüm
                            </span>
                            <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-white leading-tight mb-8">
                                Evinizi {businessConfig.brand} <br />
                                Ayrıcalığıyla Yenileyin
                            </h2>
                            <p className="text-xl text-white/80 mb-10 leading-relaxed max-w-xl">
                                {businessConfig.address.district} bölgesindeki binlerce mutlu müşterimize katılın. Profesyonel ekibimiz 24 saat içinde yerinde ölçüm yapsın.
                            </p>
                            <div className="flex flex-col sm:flex-row gap-4">
                                <Button variant="secondary" size="xl" href="/teklif-al" className="px-10">
                                    Hemen Teklif Al
                                </Button>
                                <Button variant="outline" size="xl" href={`tel:${businessConfig.contact.mobileRaw}`} className="text-white border-white/20 hover:bg-white hover:text-primary-600 px-10">
                                    Arama Yap
                                </Button>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                            {[
                                { title: "Telefon", val: businessConfig.contact.landline, icon: "📞" },
                                { title: "WhatsApp", val: businessConfig.contact.mobile, icon: "💬" },
                                { title: "E-Posta", val: businessConfig.contact.email, icon: "✉️" },
                                { title: "Adres", val: "Beylikdüzü / İst", icon: "📍" }
                            ].map((item, i) => (
                                <div key={i} className="bg-white/10 backdrop-blur-md border border-white/10 p-6 rounded-2xl">
                                    <div className="text-3xl mb-4">{item.icon}</div>
                                    <p className="text-xs uppercase tracking-widest text-white/60 font-bold mb-1">{item.title}</p>
                                    <p className="text-white font-bold">{item.val}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
