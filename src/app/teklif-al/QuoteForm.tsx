"use client";

import { useState, useTransition } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import { businessConfig } from "@/config/business.config";

/**
 * Product Categories for the Quote Form
 */
const productCategories = [
    { id: "pvc-pencere", label: "PVC Pencere & Kapı", icon: "🪟" },
    { id: "cam-balkon", label: "Cam Balkon", icon: "🏠" },
    { id: "aluminyum", label: "Alüminyum Doğrama", icon: "🔧" },
    { id: "sineklik", label: "Sineklik", icon: "🦟" },
    { id: "panjur", label: "Panjur", icon: "🌤️" },
    { id: "dusakabin", label: "Duşakabin", icon: "🚿" },
];

/**
 * Phone number validation and formatting for Turkish numbers
 */
const formatPhoneNumber = (value: string): string => {
    // Remove all non-digits
    const digits = value.replace(/\D/g, "");

    // Format as 05XX XXX XX XX
    if (digits.length <= 4) return digits;
    if (digits.length <= 7) return `${digits.slice(0, 4)} ${digits.slice(4)}`;
    if (digits.length <= 9) return `${digits.slice(0, 4)} ${digits.slice(4, 7)} ${digits.slice(7)}`;
    return `${digits.slice(0, 4)} ${digits.slice(4, 7)} ${digits.slice(7, 9)} ${digits.slice(9, 11)}`;
};

const validatePhoneNumber = (phone: string): boolean => {
    const digits = phone.replace(/\D/g, "");
    // Turkish mobile numbers: 05XX XXX XX XX (11 digits)
    return digits.length === 11 && digits.startsWith("05");
};

interface FormErrors {
    phone?: string;
    products?: string;
}

/**
 * Quote Form Component
 * Client Component with Server Actions for form submission
 */
export function QuoteForm() {
    const [isPending, startTransition] = useTransition();
    const [formState, setFormState] = useState<"idle" | "success" | "error">("idle");
    const [selectedProducts, setSelectedProducts] = useState<string[]>([]);
    const [errors, setErrors] = useState<FormErrors>({});
    const [formData, setFormData] = useState({
        name: "",
        phone: "",
        email: "",
        address: "",
        message: "",
        propertyType: "",
        preferredContact: "phone",
        consent: false,
    });

    const handleProductToggle = (productId: string) => {
        setSelectedProducts((prev) =>
            prev.includes(productId)
                ? prev.filter((id) => id !== productId)
                : [...prev, productId]
        );
        // Clear product error when selection changes
        if (errors.products) {
            setErrors((prev) => ({ ...prev, products: undefined }));
        }
    };

    const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const formatted = formatPhoneNumber(e.target.value);
        setFormData((prev) => ({ ...prev, phone: formatted }));

        // Clear phone error when typing
        if (errors.phone) {
            setErrors((prev) => ({ ...prev, phone: undefined }));
        }
    };

    const handleInputChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
    ) => {
        const { name, value, type } = e.target;
        const checked = (e.target as HTMLInputElement).checked;
        setFormData((prev) => ({
            ...prev,
            [name]: type === "checkbox" ? checked : value,
        }));
    };

    const validateForm = (): boolean => {
        const newErrors: FormErrors = {};

        if (!validatePhoneNumber(formData.phone)) {
            newErrors.phone = "Geçerli bir telefon numarası girin (05XX XXX XX XX)";
        }

        if (selectedProducts.length === 0) {
            newErrors.products = "En az bir ürün seçmelisiniz";
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!validateForm()) return;

        startTransition(async () => {
            try {
                // Simulate API call
                await new Promise((resolve) => setTimeout(resolve, 2000));

                // Here you would typically send data to your backend
                console.log("Form submitted:", { ...formData, selectedProducts });

                setFormState("success");
            } catch {
                setFormState("error");
            }
        });
    };

    if (formState === "success") {
        const selectedProductLabels = productCategories
            .filter((p) => selectedProducts.includes(p.id))
            .map((p) => p.label)
            .join(", ");

        return (
            <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="bg-white rounded-2xl shadow-lg border border-neutral-100 p-8 lg:p-12 text-center"
            >
                {/* Success Animation */}
                <div className="relative w-24 h-24 mx-auto mb-6">
                    <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ type: "spring", stiffness: 200, delay: 0.2 }}
                        className="absolute inset-0 rounded-full bg-green-100"
                    />
                    <motion.svg
                        initial={{ pathLength: 0 }}
                        animate={{ pathLength: 1 }}
                        transition={{ duration: 0.5, delay: 0.4 }}
                        className="absolute inset-0 w-full h-full text-green-500"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                    >
                        <motion.path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M5 13l4 4L19 7"
                        />
                    </motion.svg>
                </div>

                <h2 className="text-2xl font-bold text-neutral-900 mb-2">
                    Talebiniz Başarıyla Alındı! 🎉
                </h2>
                <p className="text-neutral-600 mb-6 max-w-md mx-auto">
                    <strong>{formData.name}</strong>, {selectedProductLabels} için teklif talebiniz iletildi.
                    En kısa sürede <strong>{formData.phone}</strong> numarasından sizinle iletişime geçeceğiz.
                </p>

                {/* Expected Response Time */}
                <div className="bg-primary-50 rounded-xl p-4 mb-6 max-w-md mx-auto">
                    <div className="flex items-center justify-center gap-2 text-primary-700">
                        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        <span className="font-medium">Tahmini Dönüş Süresi: 2-4 saat</span>
                    </div>
                </div>

                {/* Quick Actions */}
                <div className="flex flex-col sm:flex-row gap-4 justify-center mb-6">
                    <a
                        href={`https://wa.me/${businessConfig.contact.whatsapp}?text=${encodeURIComponent(`Merhaba, az önce ${selectedProductLabels} için teklif formu doldurdum. Bilgi almak istiyorum.`)}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-green-500 text-white font-bold rounded-xl hover:bg-green-600 transition-colors"
                    >
                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                        </svg>
                        WhatsApp&apos;tan Takip Et
                    </a>
                    <a
                        href={`tel:${businessConfig.contact.mobileRaw}`}
                        className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-primary-600 text-white font-bold rounded-xl hover:bg-primary-700 transition-colors"
                    >
                        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                        </svg>
                        Hemen Ara
                    </a>
                </div>

                <button
                    onClick={() => {
                        setFormState("idle");
                        setFormData({
                            name: "",
                            phone: "",
                            email: "",
                            address: "",
                            message: "",
                            propertyType: "",
                            preferredContact: "phone",
                            consent: false,
                        });
                        setSelectedProducts([]);
                    }}
                    className="text-sm text-neutral-500 hover:text-primary-600 transition-colors"
                >
                    Yeni Teklif Talebi Oluştur →
                </button>
            </motion.div>
        );
    }

    return (
        <form
            onSubmit={handleSubmit}
            className="bg-white rounded-2xl shadow-lg border border-neutral-100 p-6 lg:p-8"
        >
            {/* Form Header */}
            <div className="mb-8">
                <h2 className="text-2xl font-bold text-neutral-900 mb-2">
                    Teklif Formu
                </h2>
                <p className="text-neutral-600">
                    Aşağıdaki formu doldurun, size özel teklif hazırlayalım.
                </p>
            </div>

            {/* Product Selection */}
            <div className="mb-8">
                <label className="block text-sm font-medium text-neutral-700 mb-3">
                    İlgilendiğiniz Ürünler <span className="text-red-500">*</span>
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                    {productCategories.map((product) => (
                        <button
                            key={product.id}
                            type="button"
                            onClick={() => handleProductToggle(product.id)}
                            className={cn(
                                "flex items-center gap-2 p-3 rounded-xl border-2 transition-all duration-200",
                                selectedProducts.includes(product.id)
                                    ? "border-primary-500 bg-primary-50 text-primary-700"
                                    : "border-neutral-200 hover:border-neutral-300 text-neutral-600"
                            )}
                        >
                            <span className="text-xl">{product.icon}</span>
                            <span className="text-sm font-medium">{product.label}</span>
                        </button>
                    ))}
                </div>
            </div>

            {/* Personal Info */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
                <div>
                    <label
                        htmlFor="name"
                        className="block text-sm font-medium text-neutral-700 mb-2"
                    >
                        Ad Soyad <span className="text-red-500">*</span>
                    </label>
                    <input
                        type="text"
                        id="name"
                        name="name"
                        required
                        value={formData.name}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 rounded-xl border border-neutral-300 focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20 outline-none transition-all"
                        placeholder="Adınız Soyadınız"
                    />
                </div>
                <div>
                    <label
                        htmlFor="phone"
                        className="block text-sm font-medium text-neutral-700 mb-2"
                    >
                        Telefon <span className="text-red-500">*</span>
                    </label>
                    <input
                        type="tel"
                        id="phone"
                        name="phone"
                        required
                        value={formData.phone}
                        onChange={handlePhoneChange}
                        className={cn(
                            "w-full px-4 py-3 rounded-xl border outline-none transition-all",
                            errors.phone
                                ? "border-red-500 focus:border-red-500 focus:ring-2 focus:ring-red-500/20"
                                : "border-neutral-300 focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20"
                        )}
                        placeholder="05XX XXX XX XX"
                        maxLength={14}
                    />
                    {errors.phone && (
                        <p className="mt-1 text-sm text-red-500">{errors.phone}</p>
                    )}
                </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
                <div>
                    <label
                        htmlFor="email"
                        className="block text-sm font-medium text-neutral-700 mb-2"
                    >
                        E-posta
                    </label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 rounded-xl border border-neutral-300 focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20 outline-none transition-all"
                        placeholder="ornek@mail.com"
                    />
                </div>
                <div>
                    <label
                        htmlFor="propertyType"
                        className="block text-sm font-medium text-neutral-700 mb-2"
                    >
                        Mülk Tipi
                    </label>
                    <select
                        id="propertyType"
                        name="propertyType"
                        value={formData.propertyType}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 rounded-xl border border-neutral-300 focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20 outline-none transition-all bg-white"
                    >
                        <option value="">Seçiniz</option>
                        <option value="apartment">Daire</option>
                        <option value="house">Müstakil Ev</option>
                        <option value="villa">Villa</option>
                        <option value="office">Ofis</option>
                        <option value="commercial">Ticari</option>
                    </select>
                </div>
            </div>

            <div className="mb-6">
                <label
                    htmlFor="address"
                    className="block text-sm font-medium text-neutral-700 mb-2"
                >
                    Adres
                </label>
                <input
                    type="text"
                    id="address"
                    name="address"
                    value={formData.address}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 rounded-xl border border-neutral-300 focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20 outline-none transition-all"
                    placeholder="İlçe, Mahalle, Sokak..."
                />
            </div>

            <div className="mb-6">
                <label
                    htmlFor="message"
                    className="block text-sm font-medium text-neutral-700 mb-2"
                >
                    Mesajınız / Notlar
                </label>
                <textarea
                    id="message"
                    name="message"
                    rows={4}
                    value={formData.message}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 rounded-xl border border-neutral-300 focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20 outline-none transition-all resize-none"
                    placeholder="Ek bilgi veya özel isteklerinizi belirtebilirsiniz..."
                />
            </div>

            {/* Preferred Contact Method */}
            <div className="mb-6">
                <label className="block text-sm font-medium text-neutral-700 mb-3">
                    Tercih Ettiğiniz İletişim Yöntemi
                </label>
                <div className="flex flex-wrap gap-4">
                    {[
                        { id: "phone", label: "Telefon" },
                        { id: "whatsapp", label: "WhatsApp" },
                        { id: "email", label: "E-posta" },
                    ].map((method) => (
                        <label
                            key={method.id}
                            className={cn(
                                "flex items-center gap-2 px-4 py-2 rounded-lg border-2 cursor-pointer transition-all",
                                formData.preferredContact === method.id
                                    ? "border-primary-500 bg-primary-50"
                                    : "border-neutral-200 hover:border-neutral-300"
                            )}
                        >
                            <input
                                type="radio"
                                name="preferredContact"
                                value={method.id}
                                checked={formData.preferredContact === method.id}
                                onChange={handleInputChange}
                                className="sr-only"
                            />
                            <span className="text-sm font-medium">{method.label}</span>
                        </label>
                    ))}
                </div>
            </div>

            {/* Consent Checkbox */}
            <div className="mb-8">
                <label className="flex items-start gap-3 cursor-pointer">
                    <input
                        type="checkbox"
                        name="consent"
                        required
                        checked={formData.consent}
                        onChange={handleInputChange}
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

            {/* Error Message */}
            <AnimatePresence>
                {formState === "error" && (
                    <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        className="mb-6 p-4 rounded-xl bg-red-50 border border-red-200 text-red-700"
                    >
                        Bir hata oluştu. Lütfen tekrar deneyin veya bizi telefonla arayın.
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Submit Button */}
            <button
                type="submit"
                disabled={isPending || selectedProducts.length === 0}
                className={cn(
                    "w-full btn btn-primary btn-lg",
                    (isPending || selectedProducts.length === 0) && "opacity-50 cursor-not-allowed"
                )}
            >
                {isPending ? (
                    <span className="flex items-center gap-2">
                        <svg
                            className="animate-spin w-5 h-5"
                            fill="none"
                            viewBox="0 0 24 24"
                        >
                            <circle
                                className="opacity-25"
                                cx="12"
                                cy="12"
                                r="10"
                                stroke="currentColor"
                                strokeWidth="4"
                            />
                            <path
                                className="opacity-75"
                                fill="currentColor"
                                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                            />
                        </svg>
                        Gönderiliyor...
                    </span>
                ) : (
                    "Ücretsiz Teklif Al"
                )}
            </button>

            <p className="mt-4 text-center text-sm text-neutral-500">
                Formu göndererek hiçbir yükümlülük altına girmezsiniz.
            </p>
        </form>
    );
}
