// ===========================================================================
// RepairRequestForm — Client component with custom TypeScript validation
// ===========================================================================
// Multi-field form for PVC repair/renovation service requests.
// On submit → shows success toast with CTA buttons (phone / WhatsApp).
// No backend needed: static-site architecture — the form collects info
// then redirects to phone or WhatsApp with the message pre-filled.
// ===========================================================================

"use client";

import { useState, useCallback, type FormEvent } from "react";
import {
  type RepairCategory,
  type UrgencyLevel,
  type FormFieldState,
  categoryMeta,
  pvcBrandOptions,
  validationRules,
} from "@/lib/tamiratData";

// ---------------------------------------------------------------------------
// State helpers
// ---------------------------------------------------------------------------

function field(value = ""): FormFieldState {
  return { value, error: null, touched: false };
}

interface FormState {
  name: FormFieldState;
  phone: FormFieldState;
  district: FormFieldState;
  brand: FormFieldState;
  category: FormFieldState;
  description: FormFieldState;
  urgency: FormFieldState;
  preferredDate: FormFieldState;
}

function initialState(): FormState {
  return {
    name: field(),
    phone: field(),
    district: field(),
    brand: field(),
    category: field(),
    description: field(),
    urgency: field("medium"),
    preferredDate: field(),
  };
}

// Field-level validation map
const fieldRules: Record<keyof FormState, ReturnType<typeof validationRules.required>[]> = {
  name: [validationRules.required("Ad Soyad"), validationRules.minLength("Ad Soyad", 3), validationRules.maxLength("Ad Soyad", 80)],
  phone: [validationRules.required("Telefon"), validationRules.turkishPhone()],
  district: [validationRules.required("İlçe / Semt")],
  brand: [],
  category: [validationRules.required("Hizmet Kategorisi")],
  description: [validationRules.required("Sorun Açıklaması"), validationRules.minLength("Sorun Açıklaması", 15), validationRules.maxLength("Sorun Açıklaması", 800)],
  urgency: [validationRules.required("Aciliyet")],
  preferredDate: [],
};

function validateField(key: keyof FormState, value: string): string | null {
  for (const rule of fieldRules[key]) {
    if (!rule.validate(value)) return rule.message;
  }
  return null;
}

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------

export default function RepairRequestForm() {
  const [form, setForm] = useState<FormState>(initialState);
  const [submitted, setSubmitted] = useState(false);

  // Update a single field value & re-validate if already touched
  const updateField = useCallback((key: keyof FormState, value: string) => {
    setForm((prev) => ({
      ...prev,
      [key]: {
        value,
        touched: true,
        error: prev[key].touched ? validateField(key, value) : null,
      },
    }));
  }, []);

  // Blur handler — validate on first blur
  const handleBlur = useCallback((key: keyof FormState) => {
    setForm((prev) => ({
      ...prev,
      [key]: {
        ...prev[key],
        touched: true,
        error: validateField(key, prev[key].value),
      },
    }));
  }, []);

  // Submit handler
  const handleSubmit = useCallback(
    (e: FormEvent) => {
      e.preventDefault();

      // Validate all fields
      let hasError = false;
      const next = { ...form };
      for (const key of Object.keys(next) as (keyof FormState)[]) {
        const error = validateField(key, next[key].value);
        next[key] = { ...next[key], touched: true, error };
        if (error) hasError = true;
      }
      setForm(next);
      if (hasError) return;

      setSubmitted(true);
    },
    [form],
  );

  // Build WhatsApp message from form data
  const whatsappMessage = [
    `PVC Tamirat Talebi`,
    `Ad: ${form.name.value}`,
    `Tel: ${form.phone.value}`,
    `İlçe: ${form.district.value}`,
    form.brand.value ? `Marka: ${form.brand.value}` : "",
    `Kategori: ${categoryMeta[form.category.value as RepairCategory]?.label ?? form.category.value}`,
    `Aciliyet: ${form.urgency.value === "high" ? "Yüksek" : form.urgency.value === "medium" ? "Orta" : "Düşük"}`,
    form.preferredDate.value ? `Tercih: ${form.preferredDate.value}` : "",
    `Açıklama: ${form.description.value}`,
  ]
    .filter(Boolean)
    .join("\n");

  // ── Success state ──────────────────────────────────────────────────────
  if (submitted) {
    return (
      <div className="text-center py-12 px-6 bg-emerald-50 rounded-2xl border border-emerald-100">
        <svg className="w-16 h-16 mx-auto mb-4 text-emerald-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
        <h3 className="text-xl font-bold text-emerald-800 mb-2">Talebiniz Alındı!</h3>
        <p className="text-emerald-700 mb-6 max-w-md mx-auto">
          En kısa sürede sizinle iletişime geçeceğiz. Acil durumlar için bizi
          hemen arayabilir veya WhatsApp üzerinden ulaşabilirsiniz.
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <a
            href="tel:+902128801507"
            className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-xl font-medium hover:bg-blue-700 transition-colors"
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" />
            </svg>
            0212 880 15 07
          </a>
          <a
            href={`https://wa.me/902128801507?text=${encodeURIComponent(whatsappMessage)}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-emerald-600 text-white rounded-xl font-medium hover:bg-emerald-700 transition-colors"
          >
            <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" />
              <path d="M12 0C5.373 0 0 5.373 0 12c0 2.625.846 5.059 2.284 7.034L.789 23.492a.75.75 0 00.917.918l4.462-1.494A11.945 11.945 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 22c-2.37 0-4.567-.7-6.414-1.9l-.45-.3-2.663.892.892-2.664-.3-.45A9.957 9.957 0 012 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10z" />
            </svg>
            WhatsApp ile Gönder
          </a>
        </div>
        <button
          onClick={() => {
            setForm(initialState());
            setSubmitted(false);
          }}
          className="mt-4 text-sm text-emerald-600 hover:text-emerald-800 underline transition-colors"
        >
          Yeni talep oluştur
        </button>
      </div>
    );
  }

  // ── Form ───────────────────────────────────────────────────────────────
  return (
    <form onSubmit={handleSubmit} noValidate className="space-y-6">
      {/* Row: Name + Phone */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {/* Name */}
        <div>
          <label htmlFor="rrf-name" className="block text-sm font-medium text-neutral-700 mb-1">
            Ad Soyad <span className="text-red-500">*</span>
          </label>
          <input
            id="rrf-name"
            type="text"
            value={form.name.value}
            onChange={(e) => updateField("name", e.target.value)}
            onBlur={() => handleBlur("name")}
            className={`w-full px-4 py-2.5 rounded-xl border ${
              form.name.touched && form.name.error ? "border-red-400 focus:ring-red-400" : "border-neutral-200 focus:ring-blue-500"
            } bg-white text-neutral-900 focus:outline-none focus:ring-2 transition-shadow`}
            placeholder="Ahmet Yılmaz"
            autoComplete="name"
          />
          {form.name.touched && form.name.error && (
            <p className="mt-1 text-xs text-red-600">{form.name.error}</p>
          )}
        </div>

        {/* Phone */}
        <div>
          <label htmlFor="rrf-phone" className="block text-sm font-medium text-neutral-700 mb-1">
            Telefon <span className="text-red-500">*</span>
          </label>
          <input
            id="rrf-phone"
            type="tel"
            value={form.phone.value}
            onChange={(e) => updateField("phone", e.target.value)}
            onBlur={() => handleBlur("phone")}
            className={`w-full px-4 py-2.5 rounded-xl border ${
              form.phone.touched && form.phone.error ? "border-red-400 focus:ring-red-400" : "border-neutral-200 focus:ring-blue-500"
            } bg-white text-neutral-900 focus:outline-none focus:ring-2 transition-shadow`}
            placeholder="0536 640 53 11"
            autoComplete="tel"
          />
          {form.phone.touched && form.phone.error && (
            <p className="mt-1 text-xs text-red-600">{form.phone.error}</p>
          )}
        </div>
      </div>

      {/* Row: District + Brand */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {/* District */}
        <div>
          <label htmlFor="rrf-district" className="block text-sm font-medium text-neutral-700 mb-1">
            İlçe / Semt <span className="text-red-500">*</span>
          </label>
          <input
            id="rrf-district"
            type="text"
            value={form.district.value}
            onChange={(e) => updateField("district", e.target.value)}
            onBlur={() => handleBlur("district")}
            className={`w-full px-4 py-2.5 rounded-xl border ${
              form.district.touched && form.district.error ? "border-red-400 focus:ring-red-400" : "border-neutral-200 focus:ring-blue-500"
            } bg-white text-neutral-900 focus:outline-none focus:ring-2 transition-shadow`}
            placeholder="Kadıköy, İstanbul"
            autoComplete="address-level2"
          />
          {form.district.touched && form.district.error && (
            <p className="mt-1 text-xs text-red-600">{form.district.error}</p>
          )}
        </div>

        {/* Brand */}
        <div>
          <label htmlFor="rrf-brand" className="block text-sm font-medium text-neutral-700 mb-1">
            PVC Marka <span className="text-neutral-400 font-normal">(Opsiyonel)</span>
          </label>
          <select
            id="rrf-brand"
            value={form.brand.value}
            onChange={(e) => updateField("brand", e.target.value)}
            className="w-full px-4 py-2.5 rounded-xl border border-neutral-200 bg-white text-neutral-900 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-shadow"
          >
            <option value="">Seçiniz</option>
            {pvcBrandOptions.map((b) => (
              <option key={b} value={b}>
                {b}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Row: Category + Urgency */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {/* Category */}
        <div>
          <label htmlFor="rrf-category" className="block text-sm font-medium text-neutral-700 mb-1">
            Hizmet Kategorisi <span className="text-red-500">*</span>
          </label>
          <select
            id="rrf-category"
            value={form.category.value}
            onChange={(e) => updateField("category", e.target.value)}
            onBlur={() => handleBlur("category")}
            className={`w-full px-4 py-2.5 rounded-xl border ${
              form.category.touched && form.category.error ? "border-red-400 focus:ring-red-400" : "border-neutral-200 focus:ring-blue-500"
            } bg-white text-neutral-900 focus:outline-none focus:ring-2 transition-shadow`}
          >
            <option value="">Kategori seçiniz</option>
            {(Object.entries(categoryMeta) as [RepairCategory, { label: string }][]).map(([key, meta]) => (
              <option key={key} value={key}>
                {meta.label}
              </option>
            ))}
          </select>
          {form.category.touched && form.category.error && (
            <p className="mt-1 text-xs text-red-600">{form.category.error}</p>
          )}
        </div>

        {/* Urgency */}
        <div>
          <label htmlFor="rrf-urgency" className="block text-sm font-medium text-neutral-700 mb-1">
            Aciliyet <span className="text-red-500">*</span>
          </label>
          <select
            id="rrf-urgency"
            value={form.urgency.value}
            onChange={(e) => updateField("urgency", e.target.value)}
            className="w-full px-4 py-2.5 rounded-xl border border-neutral-200 bg-white text-neutral-900 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-shadow"
          >
            <option value="low">Düşük — planlı bakım</option>
            <option value="medium">Orta — birkaç gün içinde</option>
            <option value="high">Yüksek — acil müdahale</option>
          </select>
        </div>
      </div>

      {/* Preferred date */}
      <div>
        <label htmlFor="rrf-date" className="block text-sm font-medium text-neutral-700 mb-1">
          Tercih Edilen Tarih <span className="text-neutral-400 font-normal">(Opsiyonel)</span>
        </label>
        <input
          id="rrf-date"
          type="date"
          value={form.preferredDate.value}
          onChange={(e) => updateField("preferredDate", e.target.value)}
          min={new Date().toISOString().split("T")[0]}
          className="w-full px-4 py-2.5 rounded-xl border border-neutral-200 bg-white text-neutral-900 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-shadow"
        />
      </div>

      {/* Description */}
      <div>
        <label htmlFor="rrf-desc" className="block text-sm font-medium text-neutral-700 mb-1">
          Sorun Açıklaması <span className="text-red-500">*</span>
        </label>
        <textarea
          id="rrf-desc"
          rows={4}
          value={form.description.value}
          onChange={(e) => updateField("description", e.target.value)}
          onBlur={() => handleBlur("description")}
          className={`w-full px-4 py-2.5 rounded-xl border ${
            form.description.touched && form.description.error ? "border-red-400 focus:ring-red-400" : "border-neutral-200 focus:ring-blue-500"
          } bg-white text-neutral-900 focus:outline-none focus:ring-2 transition-shadow resize-y`}
          placeholder="Pencerede ne tür bir sorun yaşıyorsunuz? Mümkünse hangi odada ve kaç adet pencerede sorun olduğunu belirtiniz."
        />
        <div className="flex justify-between mt-1">
          {form.description.touched && form.description.error ? (
            <p className="text-xs text-red-600">{form.description.error}</p>
          ) : (
            <span />
          )}
          <span className="text-xs text-neutral-400">{form.description.value.length}/800</span>
        </div>
      </div>

      {/* Submit */}
      <button
        type="submit"
        className="w-full py-3.5 bg-blue-600 text-white rounded-xl font-semibold text-lg hover:bg-blue-700 active:scale-[0.98] transition-all focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
      >
        Tamir Talebi Gönder
      </button>
      <p className="text-xs text-neutral-500 text-center">
        Formu gönderdikten sonra sizi hemen arayacağız. Acil durumlar için{" "}
        <a href="tel:+902128801507" className="text-blue-600 hover:underline font-medium">
          0212 880 15 07
        </a>{" "}
        numarasını arayabilirsiniz.
      </p>
    </form>
  );
}
