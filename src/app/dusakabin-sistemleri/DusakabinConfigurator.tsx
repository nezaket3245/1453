/**
 * Duşakabin Interactive Configurator Component
 * Allows users to select: Shape -> Glass Type -> Profile Color
 * Generates WhatsApp deep link with configuration details
 */

'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { showerShapes, glassTypes, profileColors, hygieneCoatings } from '@/lib/dusakabinData';
import { businessConfig } from '@/config/business.config';

interface ConfigState {
    shape: string | null;
    glassType: string | null;
    glassThickness: number | null;
    profileColor: string | null;
    coating: string | null;
    width: number;
    height: number;
}

export default function DusakabinConfigurator() {
    const [step, setStep] = useState(1);
    const [config, setConfig] = useState<ConfigState>({
        shape: null,
        glassType: null,
        glassThickness: null,
        profileColor: null,
        coating: null,
        width: 90,
        height: 200,
    });

    const totalSteps = 4;

    // Get selected items for display
    const selectedShape = showerShapes.find((s) => s.id === config.shape);
    const selectedGlass = glassTypes.find((g) => g.id === config.glassType);
    const selectedProfile = profileColors.find((p) => p.id === config.profileColor);
    const selectedCoating = hygieneCoatings.find((c) => c.id === config.coating);

    // Generate WhatsApp message
    const generateWhatsAppMessage = () => {
        const parts = [
            '🚿 *Duşakabin Teklif Talebi*',
            '',
            `📐 *Form:* ${selectedShape?.nameTR || 'Belirtilmedi'}`,
            `🪟 *Cam:* ${selectedGlass?.nameTR || 'Belirtilmedi'} ${config.glassThickness ? `(${config.glassThickness}mm)` : ''}`,
            `🎨 *Profil:* ${selectedProfile?.nameTR || 'Belirtilmedi'}`,
            selectedCoating ? `✨ *Kaplama:* ${selectedCoating.name}` : '',
            `📏 *Ölçü:* ${config.width}cm x ${config.height}cm`,
            '',
            '📸 _Banyonun fotoğrafını göndererek daha detaylı fiyat alabilirsiniz._',
        ].filter(Boolean);

        return encodeURIComponent(parts.join('\n'));
    };

    const whatsappLink = `https://wa.me/${businessConfig.contact.whatsapp}?text=${generateWhatsAppMessage()}`;

    // Progress bar calculation
    const progress = (step / totalSteps) * 100;

    return (
        <div className="bg-white rounded-3xl shadow-2xl overflow-hidden">
            {/* Header */}
            <div className="bg-gradient-to-r from-purple-600 to-indigo-600 px-6 py-5">
                <h3 className="text-xl font-bold text-white">🛁 Duşakabin Konfiguratör</h3>
                <p className="text-white/80 text-sm mt-1">
                    4 adımda size özel duşakabin tasarlayın
                </p>
                {/* Progress Bar */}
                <div className="mt-4 h-2 bg-white/20 rounded-full overflow-hidden">
                    <motion.div
                        className="h-full bg-white rounded-full"
                        initial={{ width: 0 }}
                        animate={{ width: `${progress}%` }}
                        transition={{ duration: 0.3 }}
                    />
                </div>
                <div className="flex justify-between mt-2 text-xs text-white/60">
                    <span>Adım {step}/{totalSteps}</span>
                    <span>{Math.round(progress)}% tamamlandı</span>
                </div>
            </div>

            {/* Content */}
            <div className="p-6">
                <AnimatePresence mode="wait">
                    {/* STEP 1: Shape Selection */}
                    {step === 1 && (
                        <motion.div
                            key="step1"
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -20 }}
                            className="space-y-4"
                        >
                            <h4 className="font-bold text-gray-900 text-lg">1. Duşakabin Formu Seçin</h4>
                            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                                {showerShapes.map((shape) => (
                                    <button
                                        key={shape.id}
                                        onClick={() => setConfig({ ...config, shape: shape.id })}
                                        className={`p-4 rounded-xl border-2 transition-all text-center ${
                                            config.shape === shape.id
                                                ? 'border-purple-500 bg-purple-50 shadow-lg'
                                                : 'border-gray-200 hover:border-purple-300 hover:bg-gray-50'
                                        }`}
                                    >
                                        <span className="text-3xl block mb-2">{shape.icon}</span>
                                        <span className="font-medium text-gray-900 text-sm">{shape.nameTR}</span>
                                        <span className="text-xs text-gray-500 block mt-1">
                                            {shape.minWidth}-{shape.maxWidth}cm
                                        </span>
                                    </button>
                                ))}
                            </div>

                            {/* Dimension Inputs */}
                            {config.shape && (
                                <motion.div
                                    initial={{ opacity: 0, height: 0 }}
                                    animate={{ opacity: 1, height: 'auto' }}
                                    className="mt-4 p-4 bg-gray-50 rounded-xl"
                                >
                                    <p className="text-sm font-medium text-gray-700 mb-3">Yaklaşık Ölçüler (cm)</p>
                                    <div className="grid grid-cols-2 gap-4">
                                        <div>
                                            <label className="text-xs text-gray-500">Genişlik</label>
                                            <input
                                                type="number"
                                                value={config.width}
                                                onChange={(e) => setConfig({ ...config, width: Number(e.target.value) })}
                                                className="w-full mt-1 px-3 py-2 border rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                                                min={60}
                                                max={200}
                                            />
                                        </div>
                                        <div>
                                            <label className="text-xs text-gray-500">Yükseklik</label>
                                            <input
                                                type="number"
                                                value={config.height}
                                                onChange={(e) => setConfig({ ...config, height: Number(e.target.value) })}
                                                className="w-full mt-1 px-3 py-2 border rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                                                min={180}
                                                max={230}
                                            />
                                        </div>
                                    </div>
                                </motion.div>
                            )}
                        </motion.div>
                    )}

                    {/* STEP 2: Glass Type Selection */}
                    {step === 2 && (
                        <motion.div
                            key="step2"
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -20 }}
                            className="space-y-4"
                        >
                            <h4 className="font-bold text-gray-900 text-lg">2. Cam Tipi Seçin</h4>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                                {glassTypes.map((glass) => (
                                    <button
                                        key={glass.id}
                                        onClick={() => setConfig({ ...config, glassType: glass.id, glassThickness: glass.thickness[0] })}
                                        className={`p-4 rounded-xl border-2 transition-all text-left ${
                                            config.glassType === glass.id
                                                ? 'border-purple-500 bg-purple-50 shadow-lg'
                                                : 'border-gray-200 hover:border-purple-300 hover:bg-gray-50'
                                        }`}
                                    >
                                        <div className="flex justify-between items-start">
                                            <span className="font-medium text-gray-900">{glass.nameTR}</span>
                                            {glass.priceMultiplier > 1.2 && (
                                                <span className="px-2 py-0.5 bg-amber-100 text-amber-700 text-xs rounded-full">Premium</span>
                                            )}
                                        </div>
                                        <p className="text-xs text-gray-500 mt-1">{glass.description}</p>
                                        <div className="flex gap-1 mt-2">
                                            {glass.thickness.map((t) => (
                                                <span
                                                    key={t}
                                                    className="px-2 py-0.5 bg-gray-100 text-gray-600 text-xs rounded"
                                                >
                                                    {t}mm
                                                </span>
                                            ))}
                                        </div>
                                    </button>
                                ))}
                            </div>

                            {/* Thickness Selection */}
                            {config.glassType && (
                                <motion.div
                                    initial={{ opacity: 0, height: 0 }}
                                    animate={{ opacity: 1, height: 'auto' }}
                                    className="mt-4 p-4 bg-gray-50 rounded-xl"
                                >
                                    <p className="text-sm font-medium text-gray-700 mb-3">Cam Kalınlığı Seçin</p>
                                    <div className="flex gap-2">
                                        {selectedGlass?.thickness.map((t) => (
                                            <button
                                                key={t}
                                                onClick={() => setConfig({ ...config, glassThickness: t })}
                                                className={`px-4 py-2 rounded-lg font-medium transition-all ${
                                                    config.glassThickness === t
                                                        ? 'bg-purple-600 text-white'
                                                        : 'bg-white border border-gray-200 text-gray-700 hover:border-purple-300'
                                                }`}
                                            >
                                                {t}mm
                                            </button>
                                        ))}
                                    </div>
                                    <p className="text-xs text-gray-500 mt-2">
                                        💡 8mm standart, 10mm çerçevesiz sistemler için önerilir
                                    </p>
                                </motion.div>
                            )}
                        </motion.div>
                    )}

                    {/* STEP 3: Profile Color Selection */}
                    {step === 3 && (
                        <motion.div
                            key="step3"
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -20 }}
                            className="space-y-4"
                        >
                            <h4 className="font-bold text-gray-900 text-lg">3. Profil Rengi Seçin</h4>
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                                {profileColors.map((color) => (
                                    <button
                                        key={color.id}
                                        onClick={() => setConfig({ ...config, profileColor: color.id })}
                                        className={`p-4 rounded-xl border-2 transition-all text-center ${
                                            config.profileColor === color.id
                                                ? 'border-purple-500 bg-purple-50 shadow-lg'
                                                : 'border-gray-200 hover:border-purple-300 hover:bg-gray-50'
                                        }`}
                                    >
                                        <div
                                            className="w-10 h-10 rounded-full mx-auto mb-2 shadow-inner border-2 border-gray-300"
                                            style={{ backgroundColor: color.hex }}
                                        />
                                        <span className="font-medium text-gray-900 text-sm block">{color.nameTR}</span>
                                        {color.popular && (
                                            <span className="text-xs text-purple-600 font-medium">⭐ Popüler</span>
                                        )}
                                    </button>
                                ))}
                            </div>
                        </motion.div>
                    )}

                    {/* STEP 4: Coating & Summary */}
                    {step === 4 && (
                        <motion.div
                            key="step4"
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -20 }}
                            className="space-y-4"
                        >
                            <h4 className="font-bold text-gray-900 text-lg">4. Hijyen Kaplama (Opsiyonel)</h4>
                            <div className="grid grid-cols-1 gap-3">
                                <button
                                    onClick={() => setConfig({ ...config, coating: null })}
                                    className={`p-4 rounded-xl border-2 transition-all text-left ${
                                        config.coating === null
                                            ? 'border-purple-500 bg-purple-50'
                                            : 'border-gray-200 hover:border-purple-300'
                                    }`}
                                >
                                    <span className="font-medium text-gray-900">Kaplama İstemiyorum</span>
                                    <p className="text-xs text-gray-500">Standart temperli cam</p>
                                </button>
                                {hygieneCoatings.map((coating) => (
                                    <button
                                        key={coating.id}
                                        onClick={() => setConfig({ ...config, coating: coating.id })}
                                        className={`p-4 rounded-xl border-2 transition-all text-left ${
                                            config.coating === coating.id
                                                ? 'border-purple-500 bg-purple-50 shadow-lg'
                                                : 'border-gray-200 hover:border-purple-300 hover:bg-gray-50'
                                        }`}
                                    >
                                        <div className="flex justify-between items-start">
                                            <span className="font-medium text-gray-900">{coating.name}</span>
                                            <span className="px-2 py-0.5 bg-cyan-100 text-cyan-700 text-xs rounded-full">
                                                {coating.technology}
                                            </span>
                                        </div>
                                        <p className="text-xs text-gray-500 mt-1">{coating.description}</p>
                                        <div className="flex flex-wrap gap-1 mt-2">
                                            {coating.benefits.slice(0, 2).map((benefit, idx) => (
                                                <span key={idx} className="px-2 py-0.5 bg-green-50 text-green-700 text-xs rounded">
                                                    ✓ {benefit}
                                                </span>
                                            ))}
                                        </div>
                                    </button>
                                ))}
                            </div>

                            {/* Summary */}
                            <div className="mt-6 p-5 bg-gradient-to-br from-purple-50 to-indigo-50 rounded-2xl border border-purple-100">
                                <h5 className="font-bold text-gray-900 mb-3">📋 Seçimleriniz</h5>
                                <div className="space-y-2 text-sm">
                                    <div className="flex justify-between">
                                        <span className="text-gray-600">Form:</span>
                                        <span className="font-medium text-gray-900">{selectedShape?.nameTR || '-'}</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="text-gray-600">Cam:</span>
                                        <span className="font-medium text-gray-900">
                                            {selectedGlass?.nameTR || '-'} {config.glassThickness && `(${config.glassThickness}mm)`}
                                        </span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="text-gray-600">Profil:</span>
                                        <span className="font-medium text-gray-900 flex items-center gap-2">
                                            {selectedProfile && (
                                                <span
                                                    className="w-4 h-4 rounded-full border"
                                                    style={{ backgroundColor: selectedProfile.hex }}
                                                />
                                            )}
                                            {selectedProfile?.nameTR || '-'}
                                        </span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="text-gray-600">Kaplama:</span>
                                        <span className="font-medium text-gray-900">{selectedCoating?.name || 'Yok'}</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="text-gray-600">Ölçü:</span>
                                        <span className="font-medium text-gray-900">{config.width}cm x {config.height}cm</span>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>

                {/* Navigation Buttons */}
                <div className="flex justify-between mt-6 pt-4 border-t">
                    <button
                        onClick={() => setStep(Math.max(1, step - 1))}
                        disabled={step === 1}
                        className={`px-5 py-2.5 rounded-xl font-medium transition-all ${
                            step === 1
                                ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                        }`}
                    >
                        ← Geri
                    </button>

                    {step < totalSteps ? (
                        <button
                            onClick={() => setStep(step + 1)}
                            disabled={
                                (step === 1 && !config.shape) ||
                                (step === 2 && !config.glassType) ||
                                (step === 3 && !config.profileColor)
                            }
                            className={`px-5 py-2.5 rounded-xl font-medium transition-all ${
                                (step === 1 && !config.shape) ||
                                (step === 2 && !config.glassType) ||
                                (step === 3 && !config.profileColor)
                                    ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                                    : 'bg-purple-600 text-white hover:bg-purple-700 shadow-lg'
                            }`}
                        >
                            İleri →
                        </button>
                    ) : (
                        <a
                            href={whatsappLink}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="px-6 py-2.5 rounded-xl font-medium bg-green-500 text-white hover:bg-green-600 shadow-lg flex items-center gap-2"
                        >
                            <WhatsAppIcon className="w-5 h-5" />
                            WhatsApp ile Gönder
                        </a>
                    )}
                </div>
            </div>
        </div>
    );
}

// WhatsApp Icon Component
function WhatsAppIcon({ className }: { className?: string }) {
    return (
        <svg className={className} fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
        </svg>
    );
}
