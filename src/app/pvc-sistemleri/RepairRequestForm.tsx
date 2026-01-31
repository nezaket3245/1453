"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import { repairServices } from "@/lib/pvcData";
import { businessConfig } from "@/config/business.config";

/**
 * Repair Request Form Component
 * Updated for Static Export: Uses WhatsApp redirect instead of Server Actions
 */
export function RepairRequestForm() {
    const [isPending, setIsPending] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setIsPending(true);

        const formData = new FormData(e.currentTarget);
        const data = {
            name: formData.get("name") as string,
            phone: formData.get("phone") as string,
            address: formData.get("address") as string,
            serviceType: formData.get("serviceType") as string,
            urgency: formData.get("urgency") as string,
            description: formData.get("description") as string,
        };

        // Format WhatsApp message
        const message = `*Yeni Tamir Talebi*%0A%0A` +
            `*Ad Soyad:* ${data.name}%0A` +
            `*Telefon:* ${data.phone}%0A` +
            `*Hizmet:* ${data.serviceType}%0A` +
            `*Aciliyet:* ${data.urgency}%0A` +
            `*Adres:* ${data.address}%0A` +
            `*Açıklama:* ${data.description}`;

        const whatsappUrl = `https://wa.me/${businessConfig.contact.whatsapp.replace(/\+/g, "")}?text=${message}`;

        // Simulate a small delay for better UX
        setTimeout(() => {
            window.open(whatsappUrl, "_blank");
            setIsPending(false);
            setIsSuccess(true);
        }, 800);
    };

    if (isSuccess) {
        return (
            <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="bg-white rounded-2xl shadow-lg border border-green-200 p-8 lg:p-12 text-center"
            >
                <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-green-100 flex items-center justify-center">
                    <svg
                        className="w-10 h-10 text-green-500"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M5 13l4 4L19 7"
                        />
                    </svg>
                </div>
                <h3 className="text-2xl font-bold text-neutral-900 mb-4">
                    Talebiniz Alındı!
                </h3>
                <p className="text-neutral-600 mb-6">
                    Müşteri danışmanımıza WhatsApp üzerinden yönlendirildiniz. En kısa sürede size dönüş yapılacaktır.
                </p>
                <p className="text-sm text-neutral-500">
                    Acil durumlar için:{" "}
                    <a href={`tel:${businessConfig.contact.mobile.replace(/\s/g, "")}`} title="Egepen Akçayapı Acil Servis Hattı" className="text-primary-600 font-bold">
                        {businessConfig.contact.mobile}
                    </a>
                </p>
            </motion.div>
        );
    }

    return (
        <form onSubmit={handleSubmit} className="bg-white rounded-2xl shadow-lg border border-neutral-100 p-6 lg:p-8">
            {/* Form Header */}
            <div className="mb-8">
                <h3 className="text-2xl font-bold text-neutral-900 mb-2">
                    🔧 Tamir / Tadilat Talebi
                </h3>
                <p className="text-neutral-600">
                    PVC pencere ve kapı sorunlarınız için hızlı çözüm. Formu doldurun, WhatsApp üzerinden anında iletelim.
                </p>
            </div>

            {/* Service Type Selection */}
            <div className="mb-6">
                <label className="block text-sm font-medium text-neutral-700 mb-3">
                    Hizmet Türü <span className="text-red-500">*</span>
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
                    {repairServices.map((service) => (
                        <label
                            key={service.id}
                            className="relative cursor-pointer"
                        >
                            <input
                                type="radio"
                                name="serviceType"
                                value={service.name}
                                className="peer sr-only"
                                required
                            />
                            <div className={cn(
                                "flex flex-col items-center p-3 rounded-xl border-2 transition-all",
                                "peer-checked:border-primary-500 peer-checked:bg-primary-50",
                                "border-neutral-200 hover:border-neutral-300"
                            )}>
                                <span className="text-2xl mb-1">{service.icon}</span>
                                <span className="text-xs font-medium text-center text-neutral-700">
                                    {service.name}
                                </span>
                            </div>
                        </label>
                    ))}
                </div>
            </div>

            {/* Personal Info */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
                <div>
                    <label htmlFor="name" className="block text-sm font-medium text-neutral-700 mb-2">
                        Ad Soyad <span className="text-red-500">*</span>
                    </label>
                    <input
                        type="text"
                        id="name"
                        name="name"
                        required
                        className="w-full px-4 py-3 rounded-xl border border-neutral-300 focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20 outline-none transition-all"
                        placeholder="Adınız Soyadınız"
                    />
                </div>
                <div>
                    <label htmlFor="phone" className="block text-sm font-medium text-neutral-700 mb-2">
                        Telefon <span className="text-red-500">*</span>
                    </label>
                    <input
                        type="tel"
                        id="phone"
                        name="phone"
                        required
                        className="w-full px-4 py-3 rounded-xl border border-neutral-300 focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20 outline-none transition-all"
                        placeholder="05XX XXX XX XX"
                    />
                </div>
            </div>

            {/* Address */}
            <div className="mb-6">
                <label htmlFor="address" className="block text-sm font-medium text-neutral-700 mb-2">
                    Adres <span className="text-red-500">*</span>
                </label>
                <input
                    type="text"
                    id="address"
                    name="address"
                    required
                    className="w-full px-4 py-3 rounded-xl border border-neutral-300 focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20 outline-none transition-all"
                    placeholder="Mahalle, Sokak, Bina No, Daire No - İlçe"
                />
            </div>

            {/* Urgency */}
            <div className="mb-6">
                <label className="block text-sm font-medium text-neutral-700 mb-3">
                    Aciliyet Durumu
                </label>
                <div className="flex flex-wrap gap-3">
                    {[
                        { id: "normal", label: "Normal", color: "bg-blue-50 border-blue-200" },
                        { id: "urgent", label: "Acil (24-48 Saat)", color: "bg-orange-50 border-orange-200" },
                        { id: "emergency", label: "Çok Acil (Bugün)", color: "bg-red-50 border-red-200" },
                    ].map((option) => (
                        <label key={option.id} className="cursor-pointer">
                            <input
                                type="radio"
                                name="urgency"
                                value={option.label}
                                defaultChecked={option.id === "normal"}
                                className="peer sr-only"
                            />
                            <span className={cn(
                                "inline-block px-4 py-2 rounded-lg border-2 text-sm font-medium transition-all",
                                "peer-checked:ring-2 peer-checked:ring-primary-500",
                                option.color
                            )}>
                                {option.label}
                            </span>
                        </label>
                    ))}
                </div>
            </div>

            {/* Description */}
            <div className="mb-6">
                <label htmlFor="description" className="block text-sm font-medium text-neutral-700 mb-2">
                    Sorun Açıklaması <span className="text-red-500">*</span>
                </label>
                <textarea
                    id="description"
                    name="description"
                    rows={4}
                    required
                    className="w-full px-4 py-3 rounded-xl border border-neutral-300 focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20 outline-none transition-all resize-none"
                    placeholder="Lütfen sorununuzu detaylı açıklayın. Örnek: Salon penceresinin ispanyoleti kırıldı, kapanmıyor..."
                />
            </div>

            {/* Consent */}
            <div className="mb-8">
                <label className="flex items-start gap-3 cursor-pointer">
                    <input
                        type="checkbox"
                        name="consent"
                        required
                        className="mt-1 w-5 h-5 rounded border-neutral-300 text-primary-600 focus:ring-primary-500"
                    />
                    <span className="text-sm text-neutral-600">
                        <a href="/gizlilik-politikasi" title="KVKK ve Gizlilik Politikası" className="text-primary-600 hover:underline">
                            Gizlilik Politikası
                        </a>
                        &apos;nı okudum ve kişisel verilerimin işlenmesine onay veriyorum.{" "}
                        <span className="text-red-500">*</span>
                    </span>
                </label>
            </div>

            {/* Submit Button */}
            <button
                type="submit"
                disabled={isPending}
                className={cn(
                    "w-full btn btn-primary btn-lg",
                    isPending && "opacity-50 cursor-wait"
                )}
            >
                {isPending ? (
                    <span className="flex items-center justify-center gap-2">
                        <svg className="animate-spin w-5 h-5" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                        </svg>
                        Gönderiliyor...
                    </span>
                ) : (
                    "WhatsApp ile Tamir Talebi Gönder"
                )}
            </button>

            <p className="mt-4 text-center text-sm text-neutral-500">
                Acil durumlar için doğrudan arayın: <a href={`tel:${businessConfig.contact.mobile.replace(/\s/g, "")}`} title="Egepen Akçayapı'yı Hemen Arayın" className="text-primary-600 font-bold">{businessConfig.contact.mobile}</a>
            </p>
        </form>
    );
}
