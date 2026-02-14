/**
 * Sineklik Seçim Asistanı (Decision Matrix)
 * Interactive wizard to help users choose the right fly screen system
 * Based on: Pet Ownership, Floor Level, Usage Frequency, Allergy Status
 */

'use client';

import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from '@/lib/motion-lite';
import Link from 'next/link';
import { decisionMatrixCriteria, meshTypes, sineklikSystems } from '@/lib/sineklikData';

interface Selection {
    petOwnership: string;
    floorLevel: string;
    usageFrequency: string;
    allergyStatus: string;
}

export default function SineklikDecisionAssistant() {
    const [step, setStep] = useState(0);
    const [selection, setSelection] = useState<Selection>({
        petOwnership: '',
        floorLevel: '',
        usageFrequency: '',
        allergyStatus: '',
    });
    const [showResult, setShowResult] = useState(false);

    const steps = [
        { key: 'petOwnership', ...decisionMatrixCriteria.petOwnership },
        { key: 'floorLevel', ...decisionMatrixCriteria.floorLevel },
        { key: 'usageFrequency', ...decisionMatrixCriteria.usageFrequency },
        { key: 'allergyStatus', ...decisionMatrixCriteria.allergyStatus },
    ];

    const currentStep = steps[step];

    const handleSelection = (value: string) => {
        const newSelection = { ...selection, [currentStep.key]: value };
        setSelection(newSelection);

        if (step < steps.length - 1) {
            setTimeout(() => setStep(step + 1), 300);
        } else {
            setTimeout(() => setShowResult(true), 300);
        }
    };

    const resetAssistant = () => {
        setStep(0);
        setSelection({
            petOwnership: '',
            floorLevel: '',
            usageFrequency: '',
            allergyStatus: '',
        });
        setShowResult(false);
    };

    // Calculate recommendation based on selections
    const recommendation = useMemo(() => {
        if (!showResult) return null;

        // Get recommended mesh types
        const petOption = decisionMatrixCriteria.petOwnership.options.find(
            (o) => o.value === selection.petOwnership
        );
        const allergyOption = decisionMatrixCriteria.allergyStatus.options.find(
            (o) => o.value === selection.allergyStatus
        );
        const floorOption = decisionMatrixCriteria.floorLevel.options.find(
            (o) => o.value === selection.floorLevel
        );
        const usageOption = decisionMatrixCriteria.usageFrequency.options.find(
            (o) => o.value === selection.usageFrequency
        );

        // Priority: Allergy > Pet > Standard
        let recommendedMeshIds: string[] = [];
        if (selection.allergyStatus === 'severe') {
            recommendedMeshIds = allergyOption?.recommendedMesh || [];
        } else if (selection.petOwnership !== 'none') {
            recommendedMeshIds = petOption?.recommendedMesh || [];
        } else {
            recommendedMeshIds = ['standard-fiberglass', 'nano-clear-antidust'];
        }

        // Get recommended system types
        const recommendedSystemTypes = floorOption?.recommendedSystem || ['plise'];
        
        // Find matching mesh types
        const recommendedMesh = meshTypes.filter((m) =>
            recommendedMeshIds.includes(m.id)
        );

        // Find matching systems
        const recommendedSystems = sineklikSystems.filter((s) =>
            recommendedSystemTypes.includes(s.category)
        );

        return {
            mesh: recommendedMesh,
            systems: recommendedSystems.slice(0, 2),
            windFactor: floorOption?.windFactor || 1,
            reasons: {
                pet: selection.petOwnership !== 'none',
                allergy: selection.allergyStatus !== 'none',
                highFloor: (floorOption?.windFactor || 0) >= 3,
                heavyUsage: selection.usageFrequency === 'high' || selection.usageFrequency === 'constant',
            },
        };
    }, [showResult, selection]);

    return (
        <div className="bg-gradient-to-br from-emerald-900 to-teal-800 rounded-3xl p-8 text-white">
            <div className="text-center mb-8">
                <span className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 rounded-full text-sm font-medium mb-4">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" /></svg>
                    Akıllı Seçim Asistanı
                </span>
                <h2 className="text-2xl md:text-3xl font-bold mb-2">
                    Size En Uygun Sineklik Hangisi?
                </h2>
                <p className="text-emerald-200">
                    4 basit soruyla ihtiyacınıza özel öneri alın
                </p>
            </div>

            <AnimatePresence mode="wait">
                {!showResult ? (
                    <motion.div
                        key={step}
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        className="max-w-2xl mx-auto"
                    >
                        {/* Progress Bar */}
                        <div className="flex items-center justify-between mb-8">
                            {steps.map((s, idx) => (
                                <div key={s.key} className="flex items-center">
                                    <div
                                        className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm transition-colors ${
                                            idx < step
                                                ? 'bg-emerald-400 text-emerald-900'
                                                : idx === step
                                                ? 'bg-white text-emerald-700'
                                                : 'bg-white/20 text-white/50'
                                        }`}
                                    >
                                        {idx < step ? '✓' : idx + 1}
                                    </div>
                                    {idx < steps.length - 1 && (
                                        <div
                                            className={`w-12 md:w-20 h-1 mx-2 rounded ${
                                                idx < step ? 'bg-emerald-400' : 'bg-white/20'
                                            }`}
                                        />
                                    )}
                                </div>
                            ))}
                        </div>

                        {/* Question */}
                        <div className="text-center mb-6">
                            <h3 className="text-xl font-semibold mb-2">
                                {currentStep.label}
                            </h3>
                            <p className="text-emerald-200 text-sm">
                                Adım {step + 1} / {steps.length}
                            </p>
                        </div>

                        {/* Options */}
                        <div className="grid grid-cols-2 gap-4">
                            {currentStep.options.map((option: any) => (
                                <button
                                    key={option.value}
                                    onClick={() => handleSelection(option.value)}
                                    className={`p-4 rounded-xl text-left transition-colors ${
                                        selection[currentStep.key as keyof Selection] === option.value
                                            ? 'bg-white text-emerald-700 shadow-lg'
                                            : 'bg-white/10 hover:bg-white/20'
                                    }`}
                                >
                                    <span className="font-semibold">{option.label}</span>
                                </button>
                            ))}
                        </div>

                        {/* Back Button */}
                        {step > 0 && (
                            <button
                                onClick={() => setStep(step - 1)}
                                className="mt-6 text-emerald-200 hover:text-white flex items-center mx-auto"
                            >
                                <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                                </svg>
                                Önceki Soru
                            </button>
                        )}
                    </motion.div>
                ) : (
                    <motion.div
                        key="result"
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="max-w-3xl mx-auto"
                    >
                        {/* Result Header */}
                        <div className="text-center mb-8">
                            <div className="w-16 h-16 mx-auto mb-4 bg-emerald-400 rounded-full flex items-center justify-center">
                                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                            </div>
                            <h3 className="text-2xl font-bold mb-2">
                                İşte Size Özel Önerimiz!
                            </h3>
                        </div>

                        {/* Recommendation Cards */}
                        <div className="space-y-6">
                            {/* Recommended Mesh */}
                            {recommendation && recommendation.mesh.length > 0 && (
                                <div className="bg-white/10 rounded-2xl p-6">
                                    <h4 className="font-bold text-lg mb-4 flex items-center">
                                        <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7" /></svg>
                                        Önerilen Tül Tipi
                                    </h4>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        {recommendation.mesh.map((mesh) => (
                                            <div
                                                key={mesh.id}
                                                className="bg-white/10 rounded-xl p-4"
                                            >
                                                <h5 className="font-semibold text-emerald-300 mb-1">
                                                    {mesh.name}
                                                </h5>
                                                <p className="text-sm text-emerald-100 mb-2">
                                                    {mesh.material}
                                                </p>
                                                <div className="flex flex-wrap gap-2">
                                                    {mesh.petResistant && (
                                                        <span className="px-2 py-1 bg-amber-500/20 text-amber-300 text-xs rounded flex items-center gap-1">
                                                            <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" /></svg>
                                                            Pet-Proof
                                                        </span>
                                                    )}
                                                    {mesh.pollenFilter && (
                                                        <span className="px-2 py-1 bg-green-500/20 text-green-300 text-xs rounded flex items-center gap-1">
                                                            <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z" /></svg>
                                                            Anti-Alerji
                                                        </span>
                                                    )}
                                                    {mesh.strengthMultiplier && (
                                                        <span className="px-2 py-1 bg-red-500/20 text-red-300 text-xs rounded flex items-center gap-1">
                                                            <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
                                                            {mesh.strengthMultiplier}x Güçlü
                                                        </span>
                                                    )}
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {/* Recommended Systems */}
                            {recommendation && recommendation.systems.length > 0 && (
                                <div className="bg-white/10 rounded-2xl p-6">
                                    <h4 className="font-bold text-lg mb-4 flex items-center">
                                        <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.066 2.573c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.573 1.066c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.066-2.573c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
                                        Önerilen Sistem
                                    </h4>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        {recommendation.systems.map((system) => (
                                            <Link
                                                key={system.id}
                                                href={`/sineklik-sistemleri/${system.slug}`}
                                                className="bg-white/10 rounded-xl p-4 hover:bg-white/20 transition-colors"
                                            >
                                                <h5 className="font-semibold text-white mb-1">
                                                    {system.name}
                                                </h5>
                                                <p className="text-sm text-emerald-200 mb-2">
                                                    {system.tagline}
                                                </p>
                                                <span className="text-emerald-400 text-sm font-medium">
                                                    Detayları İncele →
                                                </span>
                                            </Link>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {/* Reasons */}
                            {recommendation && (
                                <div className="bg-amber-500/20 rounded-xl p-4">
                                    <h4 className="font-semibold text-amber-300 mb-2 flex items-center gap-2">
                                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" /></svg>
                                        Neden Bu Öneri?
                                    </h4>
                                    <ul className="text-sm text-amber-100 space-y-1">
                                        {recommendation.reasons.pet && (
                                            <li>• Evcil hayvanınız için dayanıklı tül gerekli</li>
                                        )}
                                        {recommendation.reasons.allergy && (
                                            <li>• Alerji koruması için özel filtre tül öneriliyor</li>
                                        )}
                                        {recommendation.reasons.highFloor && (
                                            <li>• Yüksek kat için rüzgara dayanıklı sistem öneriliyor</li>
                                        )}
                                        {recommendation.reasons.heavyUsage && (
                                            <li>• Yoğun kullanım için dayanıklı mekanizma gerekli</li>
                                        )}
                                    </ul>
                                </div>
                            )}
                        </div>

                        {/* Action Buttons */}
                        <div className="flex flex-wrap justify-center gap-4 mt-8">
                            <Link
                                href="/iletisim"
                                className="px-6 py-3 bg-white text-emerald-700 font-semibold rounded-xl hover:bg-emerald-50 transition-colors inline-flex items-center gap-2"
                            >
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
                                Bize Ulaşın
                            </Link>
                            <button
                                onClick={resetAssistant}
                                className="px-6 py-3 bg-white/10 text-white font-semibold rounded-xl hover:bg-white/20 transition-colors inline-flex items-center gap-2"
                            >
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" /></svg>
                                Yeniden Başla
                            </button>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
