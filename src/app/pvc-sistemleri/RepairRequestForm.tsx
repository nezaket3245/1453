"use client";

import { useActionState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import { repairServices } from "@/lib/pvcData";
import { submitRepairRequest, RepairFormState } from "./actions";

/**
 * Repair Request Form Component
 * Full-featured form with Server Actions for PVC repair requests
 */
export function RepairRequestForm() {
    const [state, formAction, isPending] = useActionState<RepairFormState | null, FormData>(
        submitRepairRequest,
        null
    );

    // Success state
    if (state?.success) {
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
                <p className="text-neutral-600 mb-6">{state.message}</p>
                <p className="text-sm text-neutral-500">
                    Acil durumlar için:{" "}
                    <a href="tel:+905419130637" className="text-primary-600 font-bold">
                        0541 913 0637
                    </a>
                </p>
            </motion.div>
        );
    }

    return (
        <form action={formAction} className="bg-white rounded-2xl shadow-lg border border-neutral-100 p-6 lg:p-8">
            {/* Form Header */}
            <div className="mb-8">
                <h3 className="text-2xl font-bold text-neutral-900 mb-2">
                    🔧 Tamir / Tadilat Talebi
                </h3>
                <p className="text-neutral-600">
                    PVC pencere ve kapı sorunlarınız için hızlı çözüm. Formu doldurun, 24 saat içinde dönüş yapalım.
                </p>
            </div>

            {/* Error Message */}
            <AnimatePresence>
                {state && !state.success && (
                    <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        className="mb-6 p-4 rounded-xl bg-red-50 border border-red-200 text-red-700"
                    >
                        {state.message}
                    </motion.div>
                )}
            </AnimatePresence>

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
                                value={service.id}
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
                {state?.errors?.serviceType && (
                    <p className="text-red-500 text-sm mt-1">{state.errors.serviceType}</p>
                )}
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
                        className={cn(
                            "w-full px-4 py-3 rounded-xl border focus:ring-2 focus:ring-primary-500/20 outline-none transition-all",
                            state?.errors?.name ? "border-red-500" : "border-neutral-300 focus:border-primary-500"
                        )}
                        placeholder="Adınız Soyadınız"
                    />
                    {state?.errors?.name && (
                        <p className="text-red-500 text-sm mt-1">{state.errors.name}</p>
                    )}
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
                        className={cn(
                            "w-full px-4 py-3 rounded-xl border focus:ring-2 focus:ring-primary-500/20 outline-none transition-all",
                            state?.errors?.phone ? "border-red-500" : "border-neutral-300 focus:border-primary-500"
                        )}
                        placeholder="05XX XXX XX XX"
                    />
                    {state?.errors?.phone && (
                        <p className="text-red-500 text-sm mt-1">{state.errors.phone}</p>
                    )}
                </div>
            </div>

            {/* Email (Optional) */}
            <div className="mb-6">
                <label htmlFor="email" className="block text-sm font-medium text-neutral-700 mb-2">
                    E-posta <span className="text-neutral-400">(opsiyonel)</span>
                </label>
                <input
                    type="email"
                    id="email"
                    name="email"
                    className="w-full px-4 py-3 rounded-xl border border-neutral-300 focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20 outline-none transition-all"
                    placeholder="ornek@mail.com"
                />
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
                    className={cn(
                        "w-full px-4 py-3 rounded-xl border focus:ring-2 focus:ring-primary-500/20 outline-none transition-all",
                        state?.errors?.address ? "border-red-500" : "border-neutral-300 focus:border-primary-500"
                    )}
                    placeholder="Mahalle, Sokak, Bina No, Daire No - İlçe"
                />
                {state?.errors?.address && (
                    <p className="text-red-500 text-sm mt-1">{state.errors.address}</p>
                )}
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
                                value={option.id}
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

            {/* Preferred Date */}
            <div className="mb-6">
                <label htmlFor="preferredDate" className="block text-sm font-medium text-neutral-700 mb-2">
                    Tercih Edilen Tarih <span className="text-neutral-400">(opsiyonel)</span>
                </label>
                <input
                    type="date"
                    id="preferredDate"
                    name="preferredDate"
                    className="w-full px-4 py-3 rounded-xl border border-neutral-300 focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20 outline-none transition-all"
                />
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
                    className={cn(
                        "w-full px-4 py-3 rounded-xl border focus:ring-2 focus:ring-primary-500/20 outline-none transition-all resize-none",
                        state?.errors?.description ? "border-red-500" : "border-neutral-300 focus:border-primary-500"
                    )}
                    placeholder="Lütfen sorununuzu detaylı açıklayın. Örnek: Salon penceresinin ispanyoleti kırıldı, kapanmıyor..."
                />
                {state?.errors?.description && (
                    <p className="text-red-500 text-sm mt-1">{state.errors.description}</p>
                )}
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
                        <a href="/gizlilik-politikasi" className="text-primary-600 hover:underline">
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
                    "Tamir Talebi Gönder"
                )}
            </button>

            <p className="mt-4 text-center text-sm text-neutral-500">
                Acil durumlar için doğrudan arayın: <a href="tel:+905419130637" className="text-primary-600 font-bold">0541 913 0637</a>
            </p>
        </form>
    );
}
