"use client";

import { useState } from "react";
import { businessConfig } from "@/config/business.config";
import { cn } from "@/lib/utils";

/**
 * ContactFormValidated Component
 * 
 * Enhanced contact form with:
 * - Real-time field validation (name, phone, email format)
 * - Toast notifications for success/error feedback
 * - WhatsApp integration as primary submission method
 * - ARIA labels and WCAG 2.1 AA compliance
 * - Honeypot field for spam prevention
 */

interface FormData {
    name: string;
    phone: string;
    email: string;
    service: string;
    message: string;
    neighborhood: string;
    honeypot: string; // Anti-spam field
}

interface FormErrors {
    name?: string;
    phone?: string;
    email?: string;
    service?: string;
}

// Turkish phone number regex — supports +90, 0 prefix, and various formats
const turkishPhoneRegex = /^(\+90|0)?[5][0-9]{9}$/;

// Email validation regex
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function ContactFormValidated() {
    const [formData, setFormData] = useState<FormData>({
        name: "",
        phone: "",
        email: "",
        service: "",
        message: "",
        neighborhood: "",
        honeypot: "",
    });
    const [errors, setErrors] = useState<FormErrors>({});
    const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

    const validatePhone = (phone: string): boolean => {
        const cleaned = phone.replace(/[\s\-\(\)]/g, "");
        return turkishPhoneRegex.test(cleaned);
    };

    const validateEmail = (email: string): boolean => {
        if (!email.trim()) return true; // Email is optional
        return emailRegex.test(email.trim());
    };

    const validateForm = (): boolean => {
        const newErrors: FormErrors = {};

        if (!formData.name.trim() || formData.name.trim().length < 2) {
            newErrors.name = "Ad Soyad gereklidir (en az 2 karakter)";
        }

        if (!formData.phone.trim()) {
            newErrors.phone = "Telefon numarası gereklidir";
        } else if (!validatePhone(formData.phone)) {
            newErrors.phone = "Geçerli bir telefon numarası girin (05XX XXX XX XX)";
        }

        if (formData.email && !validateEmail(formData.email)) {
            newErrors.email = "Geçerli bir e-posta adresi girin";
        }

        if (!formData.service) {
            newErrors.service = "Lütfen bir hizmet seçin";
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    /** Clear a specific field error on change */
    const clearError = (field: keyof FormErrors) => {
        if (errors[field]) {
            setErrors((prev) => ({ ...prev, [field]: undefined }));
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        // Honeypot check — bots fill hidden fields
        if (formData.honeypot) return;

        if (!validateForm()) return;

        setStatus("loading");

        try {
            // Build WhatsApp message
            const whatsappMessage = [
                "*Yeni İletişim Talebi*",
                "",
                `*Ad Soyad:* ${formData.name.trim()}`,
                `*Telefon:* ${formData.phone.trim()}`,
                formData.email ? `*E-posta:* ${formData.email.trim()}` : "",
                `*Hizmet:* ${formData.service}`,
                formData.neighborhood ? `*Mahalle:* ${formData.neighborhood}` : "",
                formData.message ? `*Mesaj:* ${formData.message.trim()}` : "",
            ].filter(Boolean).join("\n");

            const whatsappUrl = `https://wa.me/${businessConfig.contact.whatsapp}?text=${encodeURIComponent(whatsappMessage)}`;

            // Small delay for UX feedback
            await new Promise(resolve => setTimeout(resolve, 800));

            window.open(whatsappUrl, "_blank");
            setStatus("success");
            setFormData({ name: "", phone: "", email: "", service: "", message: "", neighborhood: "", honeypot: "" });
        } catch {
            setStatus("error");
        }
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
            <h3 className="text-2xl font-bold text-neutral-900 mb-2">İletişim Formu</h3>
            <p className="text-neutral-600 mb-6">Formu doldurun, WhatsApp üzerinden hızlıca dönüş yapalım.</p>

            {status === "success" ? (
                <div className="text-center py-8 animate-fade-in-up">
                    <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                        <svg className="w-8 h-8 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden="true">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                        </svg>
                    </div>
                    <h4 className="text-xl font-bold text-neutral-900 mb-2">Talebiniz İletildi!</h4>
                    <p className="text-neutral-600 mb-4">WhatsApp üzerinden en kısa sürede dönüş yapacağız.</p>
                    <button onClick={() => setStatus("idle")} className="text-primary-600 font-medium hover:underline min-h-[48px] min-w-[48px] px-4">
                        Yeni form gönder
                    </button>
                </div>
            ) : (
                <form onSubmit={handleSubmit} className="space-y-5" noValidate>
                    {/* Honeypot — hidden from users, catches bots */}
                    <div className="hidden" aria-hidden="true">
                        <label htmlFor="contact-hp">Leave empty</label>
                        <input
                            type="text"
                            id="contact-hp"
                            name="honeypot"
                            tabIndex={-1}
                            autoComplete="off"
                            value={formData.honeypot}
                            onChange={(e) => setFormData({ ...formData, honeypot: e.target.value })}
                        />
                    </div>

                    {/* Name Field */}
                    <div>
                        <label htmlFor="contact-name" className="block text-sm font-medium text-neutral-700 mb-1">Ad Soyad <span className="text-red-500">*</span></label>
                        <input
                            type="text"
                            id="contact-name"
                            name="name"
                            autoComplete="name"
                            aria-required="true"
                            aria-invalid={!!errors.name}
                            aria-describedby={errors.name ? "contact-name-error" : undefined}
                            value={formData.name}
                            onChange={(e) => { setFormData({ ...formData, name: e.target.value }); clearError("name"); }}
                            className={cn("w-full px-4 py-3 rounded-xl border focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500 outline-none transition-[border-color,box-shadow] min-h-[48px]", errors.name ? "border-red-500" : "border-neutral-300")}
                            placeholder="Adınız Soyadınız"
                        />
                        {errors.name && <p id="contact-name-error" className="mt-1 text-sm text-red-500" role="alert">{errors.name}</p>}
                    </div>

                    {/* Phone Field */}
                    <div>
                        <label htmlFor="contact-phone" className="block text-sm font-medium text-neutral-700 mb-1">Telefon <span className="text-red-500">*</span></label>
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
                            onChange={(e) => { setFormData({ ...formData, phone: e.target.value }); clearError("phone"); }}
                            className={cn("w-full px-4 py-3 rounded-xl border focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500 outline-none transition-[border-color,box-shadow] min-h-[48px]", errors.phone ? "border-red-500" : "border-neutral-300")}
                            placeholder="05XX XXX XX XX"
                        />
                        {errors.phone && <p id="contact-phone-error" className="mt-1 text-sm text-red-500" role="alert">{errors.phone}</p>}
                    </div>

                    {/* Email Field — optional */}
                    <div>
                        <label htmlFor="contact-email" className="block text-sm font-medium text-neutral-700 mb-1">E-posta <span className="text-neutral-500">(Opsiyonel)</span></label>
                        <input
                            type="email"
                            id="contact-email"
                            name="email"
                            autoComplete="email"
                            aria-invalid={!!errors.email}
                            aria-describedby={errors.email ? "contact-email-error" : undefined}
                            value={formData.email}
                            onChange={(e) => { setFormData({ ...formData, email: e.target.value }); clearError("email"); }}
                            className={cn("w-full px-4 py-3 rounded-xl border focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500 outline-none transition-[border-color,box-shadow] min-h-[48px]", errors.email ? "border-red-500" : "border-neutral-300")}
                            placeholder="ornek@mail.com"
                        />
                        {errors.email && <p id="contact-email-error" className="mt-1 text-sm text-red-500" role="alert">{errors.email}</p>}
                    </div>

                    {/* Service Field */}
                    <div>
                        <label htmlFor="contact-service" className="block text-sm font-medium text-neutral-700 mb-1">Hizmet <span className="text-red-500">*</span></label>
                        <select
                            id="contact-service"
                            name="service"
                            aria-required="true"
                            aria-invalid={!!errors.service}
                            aria-describedby={errors.service ? "contact-service-error" : undefined}
                            value={formData.service}
                            onChange={(e) => { setFormData({ ...formData, service: e.target.value }); clearError("service"); }}
                            className={cn("w-full px-4 py-3 rounded-xl border focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500 outline-none transition-[border-color,box-shadow] bg-white min-h-[48px]", errors.service ? "border-red-500" : "border-neutral-300")}
                        >
                            <option value="">Hizmet Seçin</option>
                            {services.map((s) => <option key={s} value={s}>{s}</option>)}
                        </select>
                        {errors.service && <p id="contact-service-error" className="mt-1 text-sm text-red-500" role="alert">{errors.service}</p>}
                    </div>

                    {/* Neighborhood Field */}
                    <div>
                        <label htmlFor="contact-neighborhood" className="block text-sm font-medium text-neutral-700 mb-1">Mahalle <span className="text-neutral-500">(Opsiyonel)</span></label>
                        <select
                            id="contact-neighborhood"
                            name="neighborhood"
                            autoComplete="address-level2"
                            value={formData.neighborhood}
                            onChange={(e) => setFormData({ ...formData, neighborhood: e.target.value })}
                            className="w-full px-4 py-3 rounded-xl border border-neutral-300 focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500 outline-none transition-[border-color,box-shadow] bg-white min-h-[48px]"
                        >
                            <option value="">Mahalle Seçin</option>
                            {neighborhoods.map((n) => <option key={n} value={n}>{n}</option>)}
                        </select>
                    </div>

                    {/* Message Field */}
                    <div>
                        <label htmlFor="contact-message" className="block text-sm font-medium text-neutral-700 mb-1">Mesaj <span className="text-neutral-500">(Opsiyonel)</span></label>
                        <textarea
                            id="contact-message"
                            name="message"
                            rows={3}
                            value={formData.message}
                            onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                            className="w-full px-4 py-3 rounded-xl border border-neutral-300 focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500 outline-none transition-[border-color,box-shadow] resize-none"
                            placeholder="Detaylı bilgi vermek isterseniz..."
                        />
                    </div>

                    {/* Submit Button */}
                    <button
                        type="submit"
                        disabled={status === "loading"}
                        className={cn(
                            "w-full py-4 min-h-[52px] bg-primary-600 text-white font-bold rounded-xl hover:bg-primary-700 transition-[border-color,box-shadow] disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2",
                            status === "loading" && "animate-pulse"
                        )}
                    >
                        {status === "loading" ? (
                            <>
                                <svg className="animate-spin w-5 h-5" fill="none" viewBox="0 0 24 24" aria-hidden="true">
                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                                </svg>
                                Gönderiliyor...
                            </>
                        ) : (
                            <>
                                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                                </svg>
                                WhatsApp ile Ücretsiz Keşif Talep Et
                            </>
                        )}
                    </button>

                    {status === "error" && (
                        <div className="text-center p-3 bg-red-50 border border-red-200 rounded-xl animate-fade-in" role="alert">
                            <p className="text-red-600 text-sm font-medium">Bir hata oluştu. Lütfen tekrar deneyin veya bizi arayın.</p>
                            <a href={`tel:${businessConfig.contact.mobileRaw}`} className="text-primary-600 text-sm font-bold hover:underline mt-1 inline-block">
                                {businessConfig.contact.mobile}
                            </a>
                        </div>
                    )}
                </form>
            )}
        </div>
    );
}
