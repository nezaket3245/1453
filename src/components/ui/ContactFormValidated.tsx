"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { businessConfig } from "@/config/business.config";

/**
 * ContactFormValidated Component
 * 
 * Contact form with:
 * - Turkish phone number validation
 * - Success/error messages
 * - WhatsApp fallback
 * - Form state management
 */

interface FormData {
    name: string;
    phone: string;
    service: string;
    message: string;
    neighborhood: string;
}

interface FormErrors {
    name?: string;
    phone?: string;
    service?: string;
}

// Turkish phone number regex
const turkishPhoneRegex = /^(\+90|0)?[5][0-9]{9}$/;

export function ContactFormValidated() {
    const [formData, setFormData] = useState<FormData>({
        name: "",
        phone: "",
        service: "",
        message: "",
        neighborhood: "",
    });
    const [errors, setErrors] = useState<FormErrors>({});
    const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

    const validatePhone = (phone: string): boolean => {
        const cleaned = phone.replace(/[\s\-\(\)]/g, "");
        return turkishPhoneRegex.test(cleaned);
    };

    const validateForm = (): boolean => {
        const newErrors: FormErrors = {};

        if (!formData.name.trim()) {
            newErrors.name = "Ad Soyad gereklidir";
        }

        if (!formData.phone.trim()) {
            newErrors.phone = "Telefon numarası gereklidir";
        } else if (!validatePhone(formData.phone)) {
            newErrors.phone = "Geçerli bir Türk telefon numarası girin (05XX XXX XX XX)";
        }

        if (!formData.service) {
            newErrors.service = "Lütfen bir hizmet seçin";
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!validateForm()) return;

        setStatus("loading");

        try {
            // Simulate API call
            await new Promise(resolve => setTimeout(resolve, 1500));
            setStatus("success");
            setFormData({ name: "", phone: "", service: "", message: "", neighborhood: "" });
        } catch {
            setStatus("error");
        }
    };

    const handleWhatsAppFallback = () => {
        const msg = `Merhaba, ben ${formData.name}. ${formData.service} hizmeti için bilgi almak istiyorum. Tel: ${formData.phone}`;
        window.open(`https://wa.me/${businessConfig.contact.whatsapp}?text=${encodeURIComponent(msg)}`, "_blank");
    };

    const services = [
        "PVC Pencere & Kapı",
        "Cam Balkon Sistemleri",
        "Sineklik Montajı",
        "Panjur & Kepenk",
        "Duşakabin",
        "Tamirat & Bakım",
    ];

    const neighborhoods = [
        "Adnan Kahveci", "Barış", "Büyükşehir", "Cumhuriyet", "Dereağzı",
        "Gürpınar", "Kavaklı", "Marmara", "Sahil", "Yakuplu", "Diğer",
    ];

    return (
        <div className="bg-white rounded-2xl shadow-xl p-6 md:p-8">
            <h3 className="text-2xl font-bold text-neutral-900 mb-2">Ücretsiz Keşif Talebi</h3>
            <p className="text-neutral-600 mb-6">Formu doldurun, 24 saat içinde dönüş yapalım.</p>

            {status === "success" ? (
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="text-center py-8"
                >
                    <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                        <svg className="w-8 h-8 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden="true">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                        </svg>
                    </div>
                    <h4 className="text-xl font-bold text-neutral-900 mb-2">Talebiniz Alındı!</h4>
                    <p className="text-neutral-600 mb-4">En kısa sürede sizinle iletişime geçeceğiz.</p>
                    <button onClick={() => setStatus("idle")} className="text-primary-600 font-medium hover:underline min-h-[48px] min-w-[48px] px-4">
                        Yeni form gönder
                    </button>
                </motion.div>
            ) : (
                <form onSubmit={handleSubmit} className="space-y-5" noValidate>
                    {/* Name Field with autocomplete and aria-describedby */}
                    <div>
                        <label htmlFor="contact-name" className="block text-sm font-medium text-neutral-700 mb-1">Ad Soyad *</label>
                        <input
                            type="text"
                            id="contact-name"
                            name="name"
                            autoComplete="name"
                            aria-required="true"
                            aria-invalid={!!errors.name}
                            aria-describedby={errors.name ? "contact-name-error" : undefined}
                            value={formData.name}
                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                            className={`w-full px-4 py-3 rounded-lg border ${errors.name ? "border-red-500" : "border-neutral-300"} focus:ring-2 focus:ring-primary-500 focus:border-transparent min-h-[48px]`}
                            placeholder="Adınız Soyadınız"
                        />
                        {errors.name && <p id="contact-name-error" className="mt-1 text-sm text-red-500" role="alert">{errors.name}</p>}
                    </div>

                    {/* Phone Field with autocomplete and aria-describedby */}
                    <div>
                        <label htmlFor="contact-phone" className="block text-sm font-medium text-neutral-700 mb-1">Telefon *</label>
                        <input
                            type="tel"
                            id="contact-phone"
                            name="phone"
                            autoComplete="tel"
                            inputMode="tel"
                            aria-required="true"
                            aria-invalid={!!errors.phone}
                            aria-describedby={errors.phone ? "contact-phone-error" : undefined}
                            value={formData.phone}
                            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                            className={`w-full px-4 py-3 rounded-lg border ${errors.phone ? "border-red-500" : "border-neutral-300"} focus:ring-2 focus:ring-primary-500 focus:border-transparent min-h-[48px]`}
                            placeholder="05XX XXX XX XX"
                        />
                        {errors.phone && <p id="contact-phone-error" className="mt-1 text-sm text-red-500" role="alert">{errors.phone}</p>}
                    </div>

                    {/* Service Field with aria-describedby */}
                    <div>
                        <label htmlFor="contact-service" className="block text-sm font-medium text-neutral-700 mb-1">Hizmet *</label>
                        <select
                            id="contact-service"
                            name="service"
                            aria-required="true"
                            aria-invalid={!!errors.service}
                            aria-describedby={errors.service ? "contact-service-error" : undefined}
                            value={formData.service}
                            onChange={(e) => setFormData({ ...formData, service: e.target.value })}
                            className={`w-full px-4 py-3 rounded-lg border ${errors.service ? "border-red-500" : "border-neutral-300"} focus:ring-2 focus:ring-primary-500 focus:border-transparent min-h-[48px]`}
                        >
                            <option value="">Hizmet Seçin</option>
                            {services.map((s) => <option key={s} value={s}>{s}</option>)}
                        </select>
                        {errors.service && <p id="contact-service-error" className="mt-1 text-sm text-red-500" role="alert">{errors.service}</p>}
                    </div>

                    {/* Neighborhood Field */}
                    <div>
                        <label htmlFor="contact-neighborhood" className="block text-sm font-medium text-neutral-700 mb-1">Mahalle</label>
                        <select
                            id="contact-neighborhood"
                            name="neighborhood"
                            autoComplete="address-level2"
                            value={formData.neighborhood}
                            onChange={(e) => setFormData({ ...formData, neighborhood: e.target.value })}
                            className="w-full px-4 py-3 rounded-lg border border-neutral-300 focus:ring-2 focus:ring-primary-500 focus:border-transparent min-h-[48px]"
                        >
                            <option value="">Mahalle Seçin (Opsiyonel)</option>
                            {neighborhoods.map((n) => <option key={n} value={n}>{n}</option>)}
                        </select>
                    </div>

                    {/* Message Field */}
                    <div>
                        <label htmlFor="contact-message" className="block text-sm font-medium text-neutral-700 mb-1">Mesaj (Opsiyonel)</label>
                        <textarea
                            id="contact-message"
                            name="message"
                            rows={3}
                            value={formData.message}
                            onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                            className="w-full px-4 py-3 rounded-lg border border-neutral-300 focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                            placeholder="Detaylı bilgi vermek isterseniz..."
                        />
                    </div>

                    {/* Submit Button - Min 48x48px touch target */}
                    <button
                        type="submit"
                        disabled={status === "loading"}
                        className="w-full py-4 min-h-[48px] bg-primary-600 text-white font-bold rounded-xl hover:bg-primary-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        {status === "loading" ? "Gönderiliyor..." : "Ücretsiz Keşif Talep Et"}
                    </button>

                    {status === "error" && (
                        <div className="text-center">
                            <p className="text-red-500 mb-2">Bir hata oluştu. Lütfen WhatsApp ile ulaşın.</p>
                            <button type="button" onClick={handleWhatsAppFallback} className="text-green-600 font-medium hover:underline">
                                WhatsApp ile Gönder →
                            </button>
                        </div>
                    )}
                </form>
            )}
        </div>
    );
}
