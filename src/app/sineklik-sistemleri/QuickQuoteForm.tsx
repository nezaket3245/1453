/**
 * Quick Quote Form Component
 * CTA Optimization: "Pencere sayınızı girin, fiyat teklifi alın"
 * Fast lead generation form with window count input
 */

'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';

interface FormData {
    name: string;
    phone: string;
    windowCount: number;
    doorCount: number;
    systemType: string;
    hasPets: boolean;
    district: string;
    notes: string;
}

export default function QuickQuoteForm() {
    const [formData, setFormData] = useState<FormData>({
        name: '',
        phone: '',
        windowCount: 0,
        doorCount: 0,
        systemType: '',
        hasPets: false,
        district: '',
        notes: '',
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSubmitted, setIsSubmitted] = useState(false);

    const systemOptions = [
        { value: 'plise', label: 'Plise Sineklik' },
        { value: 'stor', label: 'Stor Sineklik' },
        { value: 'surme', label: 'Sürme Sineklik' },
        { value: 'menteseli', label: 'Menteşeli Sineklik' },
        { value: 'kedi', label: 'Kedi Sinekliği' },
        { value: 'panjur-motorlu', label: 'Motorlu Panjur' },
        { value: 'panjur-manuel', label: 'Manuel Panjur' },
        { value: 'bilmiyorum', label: 'Henüz karar vermedim' },
    ];

    const districts = [
        'Beylikdüzü',
        'Büyükçekmece',
        'Avcılar',
        'Esenyurt',
        'Küçükçekmece',
        'Bahçeşehir',
        'Başakşehir',
        'Diğer İstanbul Avrupa',
        'Diğer',
    ];

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);

        // Simulate form submission
        await new Promise((resolve) => setTimeout(resolve, 1500));

        console.log('Form submitted:', formData);
        setIsSubmitting(false);
        setIsSubmitted(true);
    };

    if (isSubmitted) {
        return (
            <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="max-w-2xl mx-auto text-center py-12"
            >
                <div className="text-6xl mb-6">✅</div>
                <h3 className="text-2xl font-bold text-white mb-4">
                    Talebiniz Alındı!
                </h3>
                <p className="text-emerald-100 mb-6">
                    En kısa sürede sizinle iletişime geçeceğiz. Ücretsiz keşif randevunuz için
                    sizi arayacağız.
                </p>
                <div className="flex justify-center gap-4">
                    <a
                        href="tel:+905320000000"
                        className="inline-flex items-center px-6 py-3 bg-white text-emerald-700 font-semibold rounded-xl"
                    >
                        <span className="mr-2">📞</span>
                        Hemen Arayın
                    </a>
                    <a
                        href="https://wa.me/905320000000"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center px-6 py-3 bg-green-500 text-white font-semibold rounded-xl"
                    >
                        <span className="mr-2">📱</span>
                        WhatsApp
                    </a>
                </div>
            </motion.div>
        );
    }

    return (
        <div className="max-w-4xl mx-auto">
            <div className="text-center mb-10">
                <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                    💰 Hızlı Fiyat Teklifi Alın
                </h2>
                <p className="text-emerald-100 text-lg">
                    Pencere ve kapı sayınızı girin, size özel fiyat teklifi hazırlayalım.
                    <br />
                    <strong>Ücretsiz keşif</strong> ile hassas ölçüm ve yerinde danışmanlık.
                </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Name */}
                    <div>
                        <label className="block text-sm font-medium text-emerald-100 mb-2">
                            Adınız Soyadınız *
                        </label>
                        <input
                            type="text"
                            required
                            value={formData.name}
                            onChange={(e) =>
                                setFormData({ ...formData, name: e.target.value })
                            }
                            className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-white/50 focus:ring-2 focus:ring-white/50 focus:border-transparent"
                            placeholder="Ahmet Yılmaz"
                        />
                    </div>

                    {/* Phone */}
                    <div>
                        <label className="block text-sm font-medium text-emerald-100 mb-2">
                            Telefon Numaranız *
                        </label>
                        <input
                            type="tel"
                            required
                            value={formData.phone}
                            onChange={(e) =>
                                setFormData({ ...formData, phone: e.target.value })
                            }
                            className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-white/50 focus:ring-2 focus:ring-white/50 focus:border-transparent"
                            placeholder="0532 000 00 00"
                        />
                    </div>

                    {/* Window Count */}
                    <div>
                        <label className="block text-sm font-medium text-emerald-100 mb-2">
                            Pencere Sayısı
                        </label>
                        <div className="flex items-center">
                            <button
                                type="button"
                                onClick={() =>
                                    setFormData({
                                        ...formData,
                                        windowCount: Math.max(0, formData.windowCount - 1),
                                    })
                                }
                                className="w-12 h-12 bg-white/10 hover:bg-white/20 text-white rounded-l-xl text-xl font-bold"
                            >
                                -
                            </button>
                            <div className="flex-1 h-12 bg-white/10 flex items-center justify-center text-white font-bold text-xl">
                                {formData.windowCount}
                            </div>
                            <button
                                type="button"
                                onClick={() =>
                                    setFormData({
                                        ...formData,
                                        windowCount: formData.windowCount + 1,
                                    })
                                }
                                className="w-12 h-12 bg-white/10 hover:bg-white/20 text-white rounded-r-xl text-xl font-bold"
                            >
                                +
                            </button>
                        </div>
                    </div>

                    {/* Door Count */}
                    <div>
                        <label className="block text-sm font-medium text-emerald-100 mb-2">
                            Kapı Sayısı
                        </label>
                        <div className="flex items-center">
                            <button
                                type="button"
                                onClick={() =>
                                    setFormData({
                                        ...formData,
                                        doorCount: Math.max(0, formData.doorCount - 1),
                                    })
                                }
                                className="w-12 h-12 bg-white/10 hover:bg-white/20 text-white rounded-l-xl text-xl font-bold"
                            >
                                -
                            </button>
                            <div className="flex-1 h-12 bg-white/10 flex items-center justify-center text-white font-bold text-xl">
                                {formData.doorCount}
                            </div>
                            <button
                                type="button"
                                onClick={() =>
                                    setFormData({
                                        ...formData,
                                        doorCount: formData.doorCount + 1,
                                    })
                                }
                                className="w-12 h-12 bg-white/10 hover:bg-white/20 text-white rounded-r-xl text-xl font-bold"
                            >
                                +
                            </button>
                        </div>
                    </div>

                    {/* System Type */}
                    <div>
                        <label className="block text-sm font-medium text-emerald-100 mb-2">
                            Sistem Tercihi
                        </label>
                        <select
                            value={formData.systemType}
                            onChange={(e) =>
                                setFormData({ ...formData, systemType: e.target.value })
                            }
                            className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white focus:ring-2 focus:ring-white/50 focus:border-transparent"
                        >
                            <option value="" className="bg-gray-800">
                                Seçiniz
                            </option>
                            {systemOptions.map((option) => (
                                <option
                                    key={option.value}
                                    value={option.value}
                                    className="bg-gray-800"
                                >
                                    {option.label}
                                </option>
                            ))}
                        </select>
                    </div>

                    {/* District */}
                    <div>
                        <label className="block text-sm font-medium text-emerald-100 mb-2">
                            İlçe *
                        </label>
                        <select
                            required
                            value={formData.district}
                            onChange={(e) =>
                                setFormData({ ...formData, district: e.target.value })
                            }
                            className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white focus:ring-2 focus:ring-white/50 focus:border-transparent"
                        >
                            <option value="" className="bg-gray-800">
                                Seçiniz
                            </option>
                            {districts.map((district) => (
                                <option
                                    key={district}
                                    value={district}
                                    className="bg-gray-800"
                                >
                                    {district}
                                </option>
                            ))}
                        </select>
                    </div>
                </div>

                {/* Has Pets Checkbox */}
                <div className="flex items-center">
                    <input
                        type="checkbox"
                        id="hasPets"
                        checked={formData.hasPets}
                        onChange={(e) =>
                            setFormData({ ...formData, hasPets: e.target.checked })
                        }
                        className="w-5 h-5 text-amber-500 bg-white/10 border-white/20 rounded focus:ring-amber-500"
                    />
                    <label htmlFor="hasPets" className="ml-3 text-white">
                        <span className="mr-2">🐱</span>
                        Evcil hayvanım var (Kedi/Köpek)
                    </label>
                </div>

                {/* Pet Warning */}
                {formData.hasPets && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        className="bg-amber-500/20 border border-amber-400/30 rounded-xl p-4 text-amber-100"
                    >
                        <div className="flex items-start">
                            <span className="text-2xl mr-3">🐈</span>
                            <div>
                                <p className="font-medium mb-1">
                                    Evcil hayvan sahipleri için önerimiz:
                                </p>
                                <p className="text-sm">
                                    Kedi/köpek tırnaklarına dayanıklı <strong>TuffScreen</strong>{' '}
                                    tül öneriyoruz. Standart tülden 7x daha dayanıklı.
                                </p>
                            </div>
                        </div>
                    </motion.div>
                )}

                {/* Notes */}
                <div>
                    <label className="block text-sm font-medium text-emerald-100 mb-2">
                        Ek Notlar (Opsiyonel)
                    </label>
                    <textarea
                        value={formData.notes}
                        onChange={(e) =>
                            setFormData({ ...formData, notes: e.target.value })
                        }
                        rows={3}
                        className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-white/50 focus:ring-2 focus:ring-white/50 focus:border-transparent"
                        placeholder="Özel isteklerinizi veya sorularınızı yazabilirsiniz..."
                    />
                </div>

                {/* Submit Button */}
                <div className="flex flex-col sm:flex-row gap-4">
                    <button
                        type="submit"
                        disabled={isSubmitting}
                        className="flex-1 inline-flex items-center justify-center px-8 py-4 bg-white hover:bg-gray-100 text-emerald-700 font-bold rounded-xl transition-all shadow-lg disabled:opacity-50"
                    >
                        {isSubmitting ? (
                            <>
                                <svg
                                    className="animate-spin w-5 h-5 mr-2"
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
                            </>
                        ) : (
                            <>
                                <span className="mr-2">📐</span>
                                Ücretsiz Keşif Talep Et
                            </>
                        )}
                    </button>
                    <a
                        href="tel:+905320000000"
                        className="inline-flex items-center justify-center px-8 py-4 bg-white/10 hover:bg-white/20 text-white font-semibold rounded-xl transition-all border border-white/20"
                    >
                        <span className="mr-2">📞</span>
                        Şimdi Arayın
                    </a>
                </div>

                {/* Trust Badges */}
                <div className="flex flex-wrap justify-center gap-6 pt-6 text-emerald-100 text-sm">
                    <div className="flex items-center">
                        <span className="mr-2">✓</span>
                        Ücretsiz Keşif
                    </div>
                    <div className="flex items-center">
                        <span className="mr-2">✓</span>
                        Aynı Gün Dönüş
                    </div>
                    {/* <div className="flex items-center">
                        <span className="mr-2">✓</span>
                        Garanti Belgeli
                    </div> */}
                    <div className="flex items-center">
                        <span className="mr-2">✓</span>
                        40 Yıl Tecrübe
                    </div>
                </div>
            </form>
        </div>
    );
}
