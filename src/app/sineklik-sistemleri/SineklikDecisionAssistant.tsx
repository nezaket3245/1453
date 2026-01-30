/**
 * Sineklik Seçim Asistanı (Decision Matrix)
 * Interactive wizard to help users choose the right fly screen system
 * Based on: Pet Ownership, Floor Level, Usage Frequency, Allergy Status
 */

'use client';

import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
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
                <span className="inline-block px-4 py-2 bg-white/10 rounded-full text-sm font-medium mb-4">
                    🎯 Akıllı Seçim Asistanı
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
                                        className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm transition-all ${
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
                                    className={`p-4 rounded-xl text-left transition-all ${
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
                                <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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
                            <div className="text-5xl mb-4">🎉</div>
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
                                        <span className="mr-2">🔬</span>
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
                                                        <span className="px-2 py-1 bg-amber-500/20 text-amber-300 text-xs rounded">
                                                            🐱 Pet-Proof
                                                        </span>
                                                    )}
                                                    {mesh.pollenFilter && (
                                                        <span className="px-2 py-1 bg-green-500/20 text-green-300 text-xs rounded">
                                                            🌿 Anti-Alerji
                                                        </span>
                                                    )}
                                                    {mesh.strengthMultiplier && (
                                                        <span className="px-2 py-1 bg-red-500/20 text-red-300 text-xs rounded">
                                                            💪 {mesh.strengthMultiplier}x Güçlü
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
                                        <span className="mr-2">⚙️</span>
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
                                    <h4 className="font-semibold text-amber-300 mb-2">
                                        💡 Neden Bu Öneri?
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
                                href="/teklif-al"
                                className="px-6 py-3 bg-white text-emerald-700 font-semibold rounded-xl hover:bg-emerald-50 transition-colors"
                            >
                                💰 Fiyat Teklifi Al
                            </Link>
                            <button
                                onClick={resetAssistant}
                                className="px-6 py-3 bg-white/10 text-white font-semibold rounded-xl hover:bg-white/20 transition-colors"
                            >
                                🔄 Yeniden Başla
                            </button>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
