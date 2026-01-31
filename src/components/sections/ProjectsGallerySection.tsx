"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import OptimizedImage from "@/components/ui/OptimizedImage";
import { businessConfig } from "@/config/business.config";

/**
 * ProjectsGallerySection Component
 * 
 * Visual trust builder showcasing completed projects in Beylikdüzü region.
 * Replaces generic stock photos with real project examples.
 * 
 * SEO: Targets "Beylikdüzü PVC montaj", "cam balkon kurulum örnekleri"
 */

import { projects, projectCategories } from "@/lib/projectsData";

export function ProjectsGallerySection() {
    const [activeCategory, setActiveCategory] = useState("all");
    const [selectedProject, setSelectedProject] = useState<any>(null);

    const filteredProjects = activeCategory === "all"
        ? projects
        : projects.filter(p => p.category === activeCategory);

    const categories = projectCategories;

    return (
        <section
            id="projeler"
            className="section bg-neutral-50 overflow-hidden"
            aria-labelledby="projects-heading"
        >
            <div className="container-custom">
                {/* Section Header */}
                <div className="text-center max-w-3xl mx-auto mb-12">
                    <motion.span
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="inline-block px-4 py-1.5 rounded-full bg-primary-50 text-primary-600 text-sm font-bold uppercase tracking-widest mb-4"
                    >
                        Tamamlanan Projeler
                    </motion.span>
                    <motion.h2
                        id="projects-heading"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.1 }}
                        className="text-3xl md:text-4xl lg:text-5xl font-black text-neutral-900 mb-6"
                    >
                        Beylikdüzü&apos;nde <span className="text-primary-600">Gerçekleştirdiğimiz</span> Projeler
                    </motion.h2>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.2 }}
                        className="text-lg text-neutral-600 leading-relaxed"
                    >
                        Her biri {businessConfig.brand} kalitesiyle, profesyonel ekibimiz tarafından tamamlanan projelerimiz.
                        Sizin projeniz de burada olabilir!
                    </motion.p>
                </div>

                {/* Category Filter */}
                <div className="flex flex-wrap justify-center gap-3 mb-12">
                    {categories.map((category) => (
                        <button
                            key={category.id}
                            onClick={() => setActiveCategory(category.id)}
                            className={`px-5 py-2.5 rounded-full font-bold text-sm transition-all ${activeCategory === category.id
                                ? "bg-primary-600 text-white shadow-lg shadow-primary-500/30"
                                : "bg-white text-neutral-600 hover:bg-neutral-100 border border-neutral-200"
                                }`}
                        >
                            {category.name}
                        </button>
                    ))}
                </div>

                {/* Projects Grid */}
                <motion.div
                    layout
                    className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
                >
                    <AnimatePresence mode="popLayout">
                        {filteredProjects.map((project, index) => (
                            <motion.article
                                key={project.id}
                                layout
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.9 }}
                                transition={{ delay: index * 0.05 }}
                                className="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 cursor-pointer border border-neutral-100"
                                onClick={() => setSelectedProject(project)}
                            >
                                {/* Image */}
                                <div className="relative aspect-[4/3] overflow-hidden">
                                    <OptimizedImage
                                        src={project.images[0]}
                                        alt={`${project.title} - ${project.location}`}
                                        fill
                                        className="object-cover group-hover:scale-110 transition-transform duration-500"
                                    />
                                    {/* Overlay on hover */}
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />

                                    {/* Category Badge */}
                                    <div className="absolute top-4 left-4">
                                        <span className="px-3 py-1 bg-white/90 backdrop-blur-sm text-neutral-800 text-xs font-bold rounded-full">
                                            {project.category}
                                        </span>
                                    </div>

                                    {/* View Button */}
                                    <div className="absolute bottom-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity">
                                        <span className="flex items-center gap-2 px-4 py-2 bg-white text-neutral-900 text-sm font-bold rounded-full shadow-lg">
                                            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                                            </svg>
                                            Detay
                                        </span>
                                    </div>
                                </div>

                                {/* Content */}
                                <div className="p-5">
                                    <h3 className="font-bold text-neutral-900 mb-2 group-hover:text-primary-600 transition-colors line-clamp-1">
                                        {project.title}
                                    </h3>
                                    <div className="flex items-center gap-2 text-sm text-neutral-500 mb-3">
                                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                        </svg>
                                        {project.location}
                                        <span className="text-neutral-300">•</span>
                                        {project.year}
                                    </div>
                                    <p className="text-sm text-neutral-600 line-clamp-2">
                                        {project.description}
                                    </p>
                                </div>
                            </motion.article>
                        ))}
                    </AnimatePresence>
                </motion.div>

                {/* CTA */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mt-12"
                >
                    <a
                        href="/projeler"
                        className="inline-flex items-center gap-2 px-8 py-4 bg-neutral-900 text-white font-bold rounded-xl hover:bg-neutral-800 transition-colors"
                    >
                        Tüm Projelerimizi Görün
                        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                        </svg>
                    </a>
                </motion.div>
            </div>

            {/* Project Detail Modal */}
            <AnimatePresence>
                {selectedProject && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
                        onClick={() => setSelectedProject(null)}
                    >
                        <motion.div
                            initial={{ scale: 0.9, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.9, opacity: 0 }}
                            className="bg-white rounded-3xl max-w-3xl w-full max-h-[90vh] overflow-hidden shadow-2xl"
                            onClick={(e) => e.stopPropagation()}
                        >
                            {/* Modal Image */}
                            <div className="relative aspect-video">
                                <OptimizedImage
                                    src={selectedProject.images[0]}
                                    alt={selectedProject.title}
                                    fill
                                    className="object-cover"
                                />
                                <button
                                    onClick={() => setSelectedProject(null)}
                                    className="absolute top-4 right-4 w-10 h-10 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white transition-colors"
                                    aria-label="Kapat"
                                >
                                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                                    </svg>
                                </button>
                            </div>

                            {/* Modal Content */}
                            <div className="p-8">
                                <div className="flex items-center gap-3 mb-4">
                                    <span className="px-3 py-1 bg-primary-50 text-primary-600 text-xs font-bold rounded-full">
                                        {selectedProject.category}
                                    </span>
                                    <span className="text-sm text-neutral-500">{selectedProject.year}</span>
                                </div>
                                <h3 className="text-2xl font-bold text-neutral-900 mb-2">
                                    {selectedProject.title}
                                </h3>
                                <p className="flex items-center gap-2 text-neutral-600 mb-6">
                                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                    </svg>
                                    {selectedProject.location}
                                </p>
                                <p className="text-neutral-600 leading-relaxed mb-8">
                                    {selectedProject.description}
                                </p>
                                <div className="flex flex-col sm:flex-row gap-4">
                                    <a
                                        href="/teklif-al"
                                        className="flex-1 text-center px-6 py-3 bg-primary-600 text-white font-bold rounded-xl hover:bg-primary-700 transition-colors"
                                    >
                                        Benzer Proje İçin Teklif Al
                                    </a>
                                    <a
                                        href={`https://wa.me/${businessConfig.contact.whatsapp}?text=${encodeURIComponent(`Merhaba, "${selectedProject.title}" projeniz hakkında bilgi almak istiyorum.`)}`}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="flex-1 text-center px-6 py-3 bg-green-500 text-white font-bold rounded-xl hover:bg-green-600 transition-colors"
                                    >
                                        WhatsApp ile Sor
                                    </a>
                                </div>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </section>
    );
}
