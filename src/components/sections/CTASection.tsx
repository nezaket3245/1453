import { Button } from "@/components/ui/Button";
import { businessConfig } from "@/config/business.config";

export function CTASection() {
    return (
        <section className="section bg-white overflow-hidden" aria-labelledby="cta-heading">
            <div className="container-custom">
                <div className="relative bg-primary-600 rounded-[3rem] p-12 lg:p-24 overflow-hidden shadow-2xl">
                    {/* Decorative Elements */}
                    <div className="absolute top-0 right-0 w-96 h-96 bg-primary-500 rounded-full opacity-30 -mr-20 -mt-20" aria-hidden="true" />
                    <div className="absolute bottom-0 left-0 w-64 h-64 bg-primary-700 rounded-full opacity-30 -ml-20 -mb-20" aria-hidden="true" />

                    <div className="relative z-10 grid lg:grid-cols-2 gap-16 items-center">
                        <div>
                            <span className="inline-block px-4 py-1 rounded-full bg-white/10 text-white text-sm font-bold uppercase tracking-widest mb-6">
                                Ücretsiz Keşif & Ölçüm
                            </span>
                            <h2 id="cta-heading" className="text-4xl md:text-5xl lg:text-6xl font-black text-white leading-tight mb-8">
                                Evinizi {businessConfig.brand} <br />
                                Ayrıcalığıyla Yenileyin
                            </h2>
                            <p className="text-xl text-white/80 mb-10 leading-relaxed max-w-xl">
                                Profesyonel ekibimiz 24 saat içinde yerinde ücretsiz ölçüm yapsın.
                            </p>
                            <div className="flex flex-col sm:flex-row gap-4">
                                <Button variant="secondary" size="xl" href="/teklif-al" className="px-10">
                                    Hemen Teklif Al
                                </Button>
                                <Button
                                    variant="outline"
                                    size="xl"
                                    href={`tel:${businessConfig.contact.mobileRaw}`}
                                    className="px-10 border-white/20 text-white hover:bg-white hover:text-primary-600"
                                    aria-label="Telefon ile hemen arayın"
                                    title="Egepen Akçayapı'yı Hemen Arayın"
                                >
                                    Arama Yap
                                </Button>
                            </div>
                        </div>

                        <address className="grid grid-cols-1 sm:grid-cols-2 gap-6 not-italic">
                            {[
                                { title: "Telefon", val: businessConfig.contact.landline, icon: (<svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" /></svg>) },
                                { title: "WhatsApp", val: businessConfig.contact.mobile, icon: (<svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M8.625 12a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H8.25m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H12m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0h-.375M21 12c0 4.556-4.03 8.25-9 8.25a9.764 9.764 0 01-2.555-.337A5.972 5.972 0 015.41 20.97a5.969 5.969 0 01-.474-.065 4.48 4.48 0 00.978-2.025c.09-.457-.133-.901-.467-1.226C3.93 16.178 3 14.189 3 12c0-4.556 4.03-8.25 9-8.25s9 3.694 9 8.25z" /></svg>) },
                                { title: "Adres", val: `${businessConfig.address.district} / ${businessConfig.address.city}`, icon: (<svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" /><path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" /></svg>) }
                            ].map((item, i) => (
                                <div key={i} className="bg-white/10 border border-white/10 p-6 rounded-2xl">
                                    <div className="text-white mb-4" aria-hidden="true">{item.icon}</div>
                                    <p className="text-xs uppercase tracking-widest text-white/60 font-bold mb-1">{item.title}</p>
                                    <p className="text-white font-bold">{item.val}</p>
                                </div>
                            ))}
                        </address>
                    </div>
                </div>
            </div>
        </section>
    );
}
