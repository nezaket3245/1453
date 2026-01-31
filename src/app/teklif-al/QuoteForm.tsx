"use client";

import { useState } from "react";
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
    const digits = value.replace(/\D/g, "");
    if (digits.length <= 4) return digits;
    if (digits.length <= 7) return `${digits.slice(0, 4)} ${digits.slice(4)}`;
    if (digits.length <= 9) return `${digits.slice(0, 4)} ${digits.slice(4, 7)} ${digits.slice(7)}`;
    return `${digits.slice(0, 4)} ${digits.slice(4, 7)} ${digits.slice(7, 9)} ${digits.slice(9, 11)}`;
};

const validatePhoneNumber = (phone: string): boolean => {
    const digits = phone.replace(/\D/g, "");
    return digits.length === 11 && digits.startsWith("05");
};

interface FormErrors {
    phone?: string;
    products?: string;
}

/**
 * Quote Form Component
 * Updated for Static Export: Uses WhatsApp redirect for form submission
 */
export function QuoteForm() {
    const [isPending, setIsPending] = useState(false);
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
        preferredContact: "whatsapp",
        consent: false,
    });

    const handleProductToggle = (productId: string) => {
        setSelectedProducts((prev) =>
            prev.includes(productId)
                ? prev.filter((id) => id !== productId)
                : [...prev, productId]
        );
        if (errors.products) {
            setErrors((prev) => ({ ...prev, products: undefined }));
        }
    };

    const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const formatted = formatPhoneNumber(e.target.value);
        setFormData((prev) => ({ ...prev, phone: formatted }));
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

        setIsPending(true);

        const selectedProductLabels = productCategories
            .filter((p) => selectedProducts.includes(p.id))
            .map((p) => p.label)
            .join(", ");

        const whatsappMessage = `*Yeni Teklif Talebi*%0A%0A` +
            `*Ad Soyad:* ${formData.name}%0A` +
            `*Ürünler:* ${selectedProductLabels}%0A` +
            `*Telefon:* ${formData.phone}%0A` +
            `*Mülk Tipi:* ${formData.propertyType || "Belirtilmedi"}%0A` +
            `*Adres:* ${formData.address || "Belirtilmedi"}%0A` +
            `*Mesaj:* ${formData.message || "Yok"}`;

        const whatsappUrl = `https://wa.me/${businessConfig.contact.whatsapp.replace(/\+/g, "")}?text=${whatsappMessage}`;

        setTimeout(() => {
            window.open(whatsappUrl, "_blank");
            setIsPending(false);
            setFormState("success");
        }, 1000);
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
                    Talebiniz WhatsApp ile İletildi! 🎉
                </h2>
                <p className="text-neutral-600 mb-6 max-w-md mx-auto">
                    <strong>{formData.name}</strong>, {selectedProductLabels} için teklif talebiniz WhatsApp üzerinden ekibimize yönlendirildi.
                </p>

                <div className="bg-primary-50 rounded-xl p-4 mb-6 max-w-md mx-auto">
                    <div className="flex items-center justify-center gap-2 text-primary-700">
                        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        <span className="font-medium">Tahmini Dönüş Süresi: 2-4 saat</span>
                    </div>
                </div>

                <div className="flex flex-col sm:flex-row gap-4 justify-center mb-6">
                    <a
                        href={`tel:${businessConfig.contact.mobile.replace(/\s/g, "")}`}
                        title="Egepen Akçayapı'yı Hemen Arayın"
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
                            preferredContact: "whatsapp",
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
            <div className="mb-8">
                <h2 className="text-2xl font-bold text-neutral-900 mb-2">
                    Ücretsiz Teklif Alın
                </h2>
                <p className="text-neutral-600">
                    Saniyeler içinde formumuzu doldurun, uzman ekibimiz WhatsApp üzerinden size özel fiyat çalışması yapsın.
                </p>
            </div>

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
                {errors.products && <p className="mt-1 text-sm text-red-500">{errors.products}</p>}
            </div>

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
                        value={formData.name}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 rounded-xl border border-neutral-300 focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20 outline-none transition-all"
                        placeholder="Adınız Soyadınız"
                    />
                </div>
                <div>
                    <label htmlFor="phone" className="block text-sm font-medium text-neutral-700 mb-2">
                        Telefon (WhatsApp Hattınız) <span className="text-red-500">*</span>
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
                    />
                    {errors.phone && <p className="mt-1 text-sm text-red-500">{errors.phone}</p>}
                </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
                <div>
                    <label htmlFor="email" className="block text-sm font-medium text-neutral-700 mb-2">
                        E-posta (Opsiyonel)
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
                    <label htmlFor="propertyType" className="block text-sm font-medium text-neutral-700 mb-2">
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
                        <option value="Daire">Daire</option>
                        <option value="Müstakil Ev">Müstakil Ev</option>
                        <option value="Villa">Villa</option>
                        <option value="Ofis">Ofis</option>
                        <option value="Ticari">Ticari</option>
                    </select>
                </div>
            </div>

            <div className="mb-6">
                <label htmlFor="address" className="block text-sm font-medium text-neutral-700 mb-2">
                    İlçe / Mahalle
                </label>
                <input
                    type="text"
                    id="address"
                    name="address"
                    value={formData.address}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 rounded-xl border border-neutral-300 focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20 outline-none transition-all"
                    placeholder="Örn: Beylikdüzü, Gürpınar..."
                />
            </div>

            <div className="mb-6">
                <label htmlFor="message" className="block text-sm font-medium text-neutral-700 mb-2">
                    Tahmini Ölçüler veya Notlar
                </label>
                <textarea
                    id="message"
                    name="message"
                    rows={3}
                    value={formData.message}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 rounded-xl border border-neutral-300 focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20 outline-none transition-all resize-none"
                    placeholder="Varsa ölçüleri belirtebilirsiniz..."
                />
            </div>

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
                        <a href="/gizlilik-politikasi" title="KVKK ve Gizlilik Politikası" className="text-primary-600 hover:underline">
                            KVKK mütununu
                        </a>
                        &apos;nı okudum ve teklif amacıyla iletişim kurulmasını onaylıyorum.{" "}
                        <span className="text-red-500">*</span>
                    </span>
                </label>
            </div>

            <button
                type="submit"
                disabled={isPending || selectedProducts.length === 0}
                className={cn(
                    "w-full btn btn-primary btn-lg",
                    (isPending || selectedProducts.length === 0) && "opacity-50 cursor-not-allowed"
                )}
            >
                {isPending ? (
                    <span className="flex items-center justify-center gap-2">
                        <svg className="animate-spin w-5 h-5" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                        </svg>
                        Hazırlanıyor...
                    </span>
                ) : (
                    "WhatsApp ile Ücretsiz Teklif Al"
                )}
            </button>
        </form>
    );
}
