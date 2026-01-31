"use client";

import { useState } from "react";
import OptimizedImage from "@/components/ui/OptimizedImage";
import { Project } from "@/lib/projectsData";
import { motion, AnimatePresence } from "framer-motion";

interface ProjectListingProps {
    projects: Project[];
    categories: { id: string; name: string; icon: string }[];
}

export function ProjectListing({ projects: initialProjects, categories }: ProjectListingProps) {
    const [activeCategory, setActiveCategory] = useState("all");

    const filteredProjects = activeCategory === "all"
        ? initialProjects
        : initialProjects.filter(p => p.category === activeCategory);

    return (
        <>
            {/* Categories Filter */}
            <section className="py-8 bg-neutral-50 border-b border-neutral-100 sticky top-[72px] z-30">
                <div className="container-custom">
                    <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-hide">
                        {categories.map((category) => (
                            <button
                                key={category.id}
                                onClick={() => setActiveCategory(category.id)}
                                className={`flex-shrink-0 px-5 py-2.5 rounded-full font-medium text-sm transition-all flex items-center gap-2 border ${activeCategory === category.id
                                    ? "bg-primary-600 text-white border-primary-600 shadow-lg shadow-primary-600/20"
                                    : "bg-white text-neutral-600 border-neutral-200 hover:border-primary-300 hover:bg-primary-50"
                                    }`}
                            >
                                <span>{category.icon}</span>
                                {category.name}
                            </button>
                        ))}
                    </div>
                </div>
            </section>

            {/* Projects Grid */}
            <section className="section min-h-[400px]">
                <div className="container-custom">
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                        <AnimatePresence mode="popLayout">
                            {filteredProjects.map((project) => (
                                <motion.article
                                    layout
                                    initial={{ opacity: 0, scale: 0.9 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    exit={{ opacity: 0, scale: 0.9 }}
                                    transition={{ duration: 0.3 }}
                                    key={project.id}
                                    className="group bg-white rounded-2xl overflow-hidden border border-neutral-100 shadow-sm hover:shadow-xl transition-all duration-300"
                                >
                                    {/* Image */}
                                    <div className="relative aspect-[4/3] overflow-hidden">
                                        <OptimizedImage
                                            src={project.images[0]}
                                            alt={project.title}
                                            fill
                                            className="object-cover group-hover:scale-110 transition-transform duration-500"
                                        />
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-80 group-hover:opacity-100 transition-opacity" />
                                        <div className="absolute top-4 left-4">
                                            <span className="px-3 py-1 bg-white/90 backdrop-blur-sm text-neutral-700 rounded-full text-xs font-bold uppercase tracking-wider">
                                                {categories.find((c) => c.id === project.category)?.name}
                                            </span>
                                        </div>
                                        <div className="absolute bottom-4 left-4 right-4 translate-y-2 group-hover:translate-y-0 transition-transform">
                                            <h3 className="text-xl font-bold text-white line-clamp-2">
                                                {project.title}
                                            </h3>
                                        </div>
                                    </div>

                                    {/* Content */}
                                    <div className="p-6">
                                        <div className="flex items-center gap-4 text-sm text-neutral-500 mb-4">
                                            <span className="flex items-center gap-1">
                                                📍 {project.location}
                                            </span>
                                            <span className="flex items-center gap-1">
                                                📅 {project.year}
                                            </span>
                                        </div>
                                        <p className="text-neutral-600 mb-4 line-clamp-2 text-sm leading-relaxed">
                                            {project.description}
                                        </p>

                                        {/* Features */}
                                        <div className="flex flex-wrap gap-2 mb-4">
                                            {project.features.slice(0, 3).map((feature) => (
                                                <span
                                                    key={feature}
                                                    className="px-2 py-1 bg-neutral-100 text-neutral-600 rounded text-[10px] font-bold uppercase"
                                                >
                                                    {feature}
                                                </span>
                                            ))}
                                            {project.features.length > 3 && (
                                                <span className="px-2 py-1 bg-primary-50 text-primary-600 rounded text-[10px] font-bold">
                                                    +{project.features.length - 3}
                                                </span>
                                            )}
                                        </div>

                                        {/* Testimonial Preview */}
                                        {project.testimonial && (
                                            <div className="pt-4 border-t border-neutral-100">
                                                <p className="text-xs text-neutral-500 italic line-clamp-2">
                                                    &ldquo;{project.testimonial.text}&rdquo;
                                                </p>
                                                <p className="text-[10px] font-bold text-neutral-400 mt-1 uppercase tracking-wider">
                                                    — {project.testimonial.author}
                                                </p>
                                            </div>
                                        )}
                                    </div>
                                </motion.article>
                            ))}
                        </AnimatePresence>
                    </div>

                    {filteredProjects.length === 0 && (
                        <div className="text-center py-20">
                            <span className="text-6xl mb-4 block">🔍</span>
                            <h3 className="text-xl font-bold text-neutral-900 mb-2">Proje Bulunamadı</h3>
                            <p className="text-neutral-500">Bu kategoride henüz bir proje eklenmemiş.</p>
                            <button
                                onClick={() => setActiveCategory("all")}
                                className="mt-4 text-primary-600 font-bold hover:underline"
                            >
                                Tüm Projeleri Göster
                            </button>
                        </div>
                    )}
                </div>
            </section>
        </>
    );
}
