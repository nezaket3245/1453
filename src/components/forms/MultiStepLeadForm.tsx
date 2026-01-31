"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { analytics } from "@/lib/analytics";
import { businessConfig } from "@/config/business.config";
import { egepenProducts } from "@/components/sections/EgepenShowroom";
import OptimizedImage from "@/components/ui/OptimizedImage";

/**
 * ═══════════════════════════════════════════════════════════════════════════
 * MULTI-STEP LEAD GENERATION FORM
 * ═══════════════════════════════════════════════════════════════════════════
 * 
 * High-converting multi-step form for lead generation.
 * Step 1: Product Selection (Image-based or Dropdown)
 * Step 2: Contact Details (Name, Phone, City)
 * Step 3: Success Message
 */

// Turkish cities for dropdown
const turkishCities = [
  "İstanbul", "Ankara", "İzmir", "Bursa", "Antalya", "Adana", "Konya", 
  "Gaziantep", "Şanlıurfa", "Kocaeli", "Mersin", "Diyarbakır", "Hatay",
  "Manisa", "Kayseri", "Samsun", "Balıkesir", "Kahramanmaraş", "Van",
  "Aydın", "Denizli", "Sakarya", "Tekirdağ", "Muğla", "Eskişehir",
  "Mardin", "Trabzon", "Malatya", "Erzurum", "Ordu", "Diğer"
];

// Form data interface
interface FormData {
  selectedProduct: string;
  name: string;
  phone: string;
  city: string;
  message?: string;
}

interface MultiStepLeadFormProps {
  isOpen: boolean;
  onClose: () => void;
  initialProduct?: string;
}

export function MultiStepLeadForm({ 
  isOpen, 
  onClose, 
  initialProduct 
}: MultiStepLeadFormProps) {
  const [step, setStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState<FormData>({
    selectedProduct: initialProduct || "",
    name: "",
    phone: "",
    city: "İstanbul",
    message: "",
  });
  const [errors, setErrors] = useState<Partial<FormData>>({});

  // Track form start
  const handleFormStart = () => {
    analytics.trackEvent("form_start", {
      form_name: "multi_step_lead",
      step: 1,
    });
  };

  // Handle product selection (Step 1)
  const handleProductSelect = (productId: string) => {
    setFormData((prev) => ({ ...prev, selectedProduct: productId }));
    setErrors((prev) => ({ ...prev, selectedProduct: undefined }));
    
    analytics.trackEvent("form_step_complete", {
      form_name: "multi_step_lead",
      step: 1,
      product_selected: productId,
    });
  };

  // Validate step
  const validateStep = (): boolean => {
    const newErrors: Partial<FormData> = {};
    
    if (step === 1) {
      if (!formData.selectedProduct) {
        newErrors.selectedProduct = "Lütfen bir ürün seçin";
      }
    }
    
    if (step === 2) {
      if (!formData.name.trim()) {
        newErrors.name = "Ad Soyad gerekli";
      }
      if (!formData.phone.trim()) {
        newErrors.phone = "Telefon numarası gerekli";
      } else if (!/^[0-9]{10,11}$/.test(formData.phone.replace(/\s/g, ""))) {
        newErrors.phone = "Geçerli bir telefon numarası girin";
      }
      if (!formData.city) {
        newErrors.city = "Şehir seçimi gerekli";
      }
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Go to next step
  const nextStep = () => {
    if (validateStep()) {
      setStep((prev) => prev + 1);
      
      analytics.trackEvent("form_step_complete", {
        form_name: "multi_step_lead",
        step: step,
      });
    }
  };

  // Go to previous step
  const prevStep = () => {
    setStep((prev) => prev - 1);
  };

  // Handle form submission
  const handleSubmit = async () => {
    if (!validateStep()) return;
    
    setIsSubmitting(true);
    
    try {
      // Simulate API call (replace with actual endpoint)
      await new Promise((resolve) => setTimeout(resolve, 1500));
      
      // Track lead
      analytics.trackLead({
        source: "multi_step_form",
        product: formData.selectedProduct,
        city: formData.city,
        name: formData.name,
      });
      
      // Track conversion
      analytics.trackEvent("form_submit", {
        form_name: "multi_step_lead",
        product: formData.selectedProduct,
        city: formData.city,
      });
      
      // Move to success step
      setStep(3);
    } catch (error) {
      console.error("Form submission error:", error);
      setErrors({ message: "Bir hata oluştu. Lütfen tekrar deneyin." });
    } finally {
      setIsSubmitting(false);
    }
  };

  // Close and reset form
  const handleClose = () => {
    setStep(1);
    setFormData({
      selectedProduct: initialProduct || "",
      name: "",
      phone: "",
      city: "İstanbul",
      message: "",
    });
    setErrors({});
    onClose();
  };

  // Send WhatsApp with form data
  const sendWhatsApp = () => {
    const product = egepenProducts.find((p) => p.id === formData.selectedProduct);
    const message = `Merhaba, ${product?.name || "Egepen"} serisi hakkında bilgi almak istiyorum.\n\nAd: ${formData.name}\nŞehir: ${formData.city}`;
    
    window.open(
      `https://wa.me/${businessConfig.contact.whatsapp}?text=${encodeURIComponent(message)}`,
      "_blank"
    );
    
    analytics.trackWhatsAppClick("lead_form_success");
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
          onClick={handleClose}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            onClick={(e) => e.stopPropagation()}
            className="relative w-full max-w-2xl bg-white rounded-3xl shadow-2xl overflow-hidden"
          >
            {/* Close Button */}
            <button
              onClick={handleClose}
              className="absolute top-4 right-4 z-10 p-2 rounded-full bg-neutral-100 hover:bg-neutral-200 transition-colors"
              aria-label="Formu kapat"
            >
              <svg className="w-5 h-5 text-neutral-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            {/* Progress Bar */}
            <div className="bg-neutral-100 h-1">
              <motion.div
                className="h-full bg-primary-600"
                initial={{ width: "33%" }}
                animate={{ width: `${(step / 3) * 100}%` }}
                transition={{ duration: 0.3 }}
              />
            </div>

            {/* Form Content */}
            <div className="p-6 md:p-8">
              <AnimatePresence mode="wait">
                {/* STEP 1: Product Selection */}
                {step === 1 && (
                  <motion.div
                    key="step1"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    onAnimationStart={handleFormStart}
                  >
                    <div className="text-center mb-8">
                      <span className="inline-block px-3 py-1 bg-primary-100 text-primary-700 text-xs font-bold rounded-full mb-3">
                        Adım 1/2
                      </span>
                      <h3 className="text-2xl font-black text-neutral-900 mb-2">
                        Hangi Egepen Serisiyle İlgileniyorsunuz?
                      </h3>
                      <p className="text-neutral-600">
                        Size en uygun çözümü sunabilmemiz için lütfen bir seri seçin.
                      </p>
                    </div>

                    {/* Product Image Grid */}
                    <div className="grid grid-cols-2 gap-4 mb-6">
                      {egepenProducts.map((product) => (
                        <button
                          key={product.id}
                          type="button"
                          onClick={() => handleProductSelect(product.id)}
                          className={`
                            group p-4 rounded-2xl border-2 transition-all text-left
                            ${formData.selectedProduct === product.id
                              ? "border-primary-500 bg-primary-50 ring-2 ring-primary-500/20"
                              : "border-neutral-200 bg-white hover:border-primary-300"
                            }
                          `}
                        >
                          <div className="relative aspect-square rounded-xl overflow-hidden bg-neutral-100 mb-3">
                            <OptimizedImage
                              src={product.image}
                              alt={product.name}
                              fill
                              className="object-contain p-2"
                            />
                            {formData.selectedProduct === product.id && (
                              <div className="absolute top-2 right-2 w-6 h-6 bg-primary-600 text-white rounded-full flex items-center justify-center">
                                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                </svg>
                              </div>
                            )}
                          </div>
                          <h4 className="font-bold text-neutral-900">{product.name}</h4>
                          <p className="text-xs text-neutral-500">{product.tagline}</p>
                        </button>
                      ))}
                    </div>

                    {errors.selectedProduct && (
                      <p className="text-red-500 text-sm text-center mb-4">{errors.selectedProduct}</p>
                    )}

                    <button
                      type="button"
                      onClick={nextStep}
                      className="w-full py-4 bg-primary-600 text-white font-bold rounded-xl hover:bg-primary-700 transition-colors"
                    >
                      Devam Et →
                    </button>
                  </motion.div>
                )}

                {/* STEP 2: Contact Details */}
                {step === 2 && (
                  <motion.div
                    key="step2"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                  >
                    <div className="text-center mb-8">
                      <span className="inline-block px-3 py-1 bg-primary-100 text-primary-700 text-xs font-bold rounded-full mb-3">
                        Adım 2/2
                      </span>
                      <h3 className="text-2xl font-black text-neutral-900 mb-2">
                        İletişim Bilgileriniz
                      </h3>
                      <p className="text-neutral-600">
                        Size ücretsiz fiyat teklifi göndermemiz için bilgilerinizi girin.
                      </p>
                    </div>

                    {/* Selected Product Badge */}
                    <div className="flex items-center gap-3 p-4 bg-primary-50 rounded-xl mb-6">
                      <div className="w-12 h-12 rounded-lg bg-white flex items-center justify-center">
                        <OptimizedImage
                          src={egepenProducts.find((p) => p.id === formData.selectedProduct)?.image || ""}
                          alt="Selected Product"
                          width={40}
                          height={40}
                          className="object-contain"
                        />
                      </div>
                      <div>
                        <p className="text-xs text-primary-600 font-medium">Seçilen Seri</p>
                        <p className="font-bold text-neutral-900">
                          {egepenProducts.find((p) => p.id === formData.selectedProduct)?.name || "Egepen"}
                        </p>
                      </div>
                      <button
                        type="button"
                        onClick={prevStep}
                        className="ml-auto text-primary-600 text-sm font-medium hover:underline"
                      >
                        Değiştir
                      </button>
                    </div>

                    {/* Contact Form */}
                    <div className="space-y-4 mb-6">
                      {/* Name */}
                      <div>
                        <label className="block text-sm font-medium text-neutral-700 mb-1">
                          Ad Soyad *
                        </label>
                        <input
                          type="text"
                          value={formData.name}
                          onChange={(e) => setFormData((prev) => ({ ...prev, name: e.target.value }))}
                          placeholder="Adınız Soyadınız"
                          className={`w-full px-4 py-3 rounded-xl border ${errors.name ? "border-red-500" : "border-neutral-300"} focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20 outline-none transition-all`}
                        />
                        {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
                      </div>

                      {/* Phone */}
                      <div>
                        <label className="block text-sm font-medium text-neutral-700 mb-1">
                          Telefon Numarası *
                        </label>
                        <input
                          type="tel"
                          value={formData.phone}
                          onChange={(e) => setFormData((prev) => ({ ...prev, phone: e.target.value }))}
                          placeholder="05XX XXX XX XX"
                          className={`w-full px-4 py-3 rounded-xl border ${errors.phone ? "border-red-500" : "border-neutral-300"} focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20 outline-none transition-all`}
                        />
                        {errors.phone && <p className="text-red-500 text-xs mt-1">{errors.phone}</p>}
                      </div>

                      {/* City */}
                      <div>
                        <label className="block text-sm font-medium text-neutral-700 mb-1">
                          Şehir *
                        </label>
                        <select
                          value={formData.city}
                          onChange={(e) => setFormData((prev) => ({ ...prev, city: e.target.value }))}
                          className={`w-full px-4 py-3 rounded-xl border ${errors.city ? "border-red-500" : "border-neutral-300"} focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20 outline-none transition-all bg-white`}
                        >
                          {turkishCities.map((city) => (
                            <option key={city} value={city}>{city}</option>
                          ))}
                        </select>
                        {errors.city && <p className="text-red-500 text-xs mt-1">{errors.city}</p>}
                      </div>

                      {/* Optional Message */}
                      <div>
                        <label className="block text-sm font-medium text-neutral-700 mb-1">
                          Mesajınız (Opsiyonel)
                        </label>
                        <textarea
                          value={formData.message}
                          onChange={(e) => setFormData((prev) => ({ ...prev, message: e.target.value }))}
                          placeholder="Projeniz hakkında kısa bilgi..."
                          rows={3}
                          className="w-full px-4 py-3 rounded-xl border border-neutral-300 focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20 outline-none transition-all resize-none"
                        />
                      </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex gap-3">
                      <button
                        type="button"
                        onClick={prevStep}
                        className="px-6 py-4 border border-neutral-300 text-neutral-700 font-bold rounded-xl hover:bg-neutral-50 transition-colors"
                      >
                        ← Geri
                      </button>
                      <button
                        type="button"
                        onClick={handleSubmit}
                        disabled={isSubmitting}
                        className="flex-1 py-4 bg-primary-600 text-white font-bold rounded-xl hover:bg-primary-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                      >
                        {isSubmitting ? (
                          <>
                            <svg className="animate-spin w-5 h-5" fill="none" viewBox="0 0 24 24">
                              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                            </svg>
                            Gönderiliyor...
                          </>
                        ) : (
                          "Teklif İste"
                        )}
                      </button>
                    </div>

                    {/* Privacy Note */}
                    <p className="text-xs text-neutral-500 text-center mt-4">
                      Formu göndererek <a href="/gizlilik-politikasi" className="underline">Gizlilik Politikası</a>nı kabul etmiş olursunuz.
                    </p>
                  </motion.div>
                )}

                {/* STEP 3: Success */}
                {step === 3 && (
                  <motion.div
                    key="step3"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="text-center py-8"
                  >
                    <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                      <svg className="w-10 h-10 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    
                    <h3 className="text-2xl font-black text-neutral-900 mb-2">
                      Talebiniz Alındı! 🎉
                    </h3>
                    <p className="text-neutral-600 mb-8">
                      En kısa sürede sizinle iletişime geçeceğiz.<br />
                      Hızlı dönüş için WhatsApp'tan da ulaşabilirsiniz.
                    </p>

                    <div className="flex flex-col sm:flex-row gap-3">
                      <button
                        type="button"
                        onClick={sendWhatsApp}
                        className="flex-1 py-4 bg-green-500 text-white font-bold rounded-xl hover:bg-green-600 transition-colors flex items-center justify-center gap-2"
                      >
                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                        </svg>
                        WhatsApp ile Devam Et
                      </button>
                      <button
                        type="button"
                        onClick={handleClose}
                        className="px-6 py-4 border border-neutral-300 text-neutral-700 font-bold rounded-xl hover:bg-neutral-50 transition-colors"
                      >
                        Kapat
                      </button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default MultiStepLeadForm;
