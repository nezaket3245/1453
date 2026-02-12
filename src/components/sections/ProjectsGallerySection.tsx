"use client";

import { useState, useCallback } from "react";
import { motion, AnimatePresence } from "@/lib/motion-lite";
import OptimizedImage from "@/components/ui/OptimizedImage";
import { Lightbox, type LightboxImage } from "@/components/ui/Lightbox";
import { businessConfig } from "@/config/business.config";

/**
 * ProjectsGallerySection Component
 * 
 * Visual trust builder showcasing completed projects in Beylikdüzü region.
 * Features a full-screen Lightbox with image gallery navigation,
 * keyboard support, and swipe gestures on mobile.
 * 
 * SEO: Targets "Beylikdüzü PVC montaj", "cam balkon kurulum örnekleri"
 */

import { projects, projectCategories, type Project } from "@/lib/projectsData";

export function ProjectsGallerySection() {
    const [activeCategory, setActiveCategory] = useState("all");
    const [lightboxOpen, setLightboxOpen] = useState(false);
    const [lightboxImages, setLightboxImages] = useState<LightboxImage[]>([]);
    const [lightboxTitle, setLightboxTitle] = useState("");
    const [lightboxIndex, setLightboxIndex] = useState(0);
    const [selectedProject, setSelectedProject] = useState<Project | null>(null);

    const filteredProjects = activeCategory === "all"
        ? projects
        : projects.filter(p => p.category === activeCategory);

    const categories = projectCategories;

    /** Open lightbox for a specific project */
    const openLightbox = useCallback((project: Project, imageIndex = 0) => {
        const images: LightboxImage[] = project.images.map((src, i) => ({
            src,
            alt: `${project.title} - ${project.location} - Fotoğraf ${i + 1}`,
        }));
        setLightboxImages(images);
        setLightboxTitle(project.title);
        setLightboxIndex(imageIndex);
        setSelectedProject(project);
        setLightboxOpen(true);
    }, []);

    const closeLightbox = useCallback(() => {
        setLightboxOpen(false);
        setSelectedProject(null);
    }, []);

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
                            className={`px-5 py-2.5 rounded-full font-bold text-sm transition-shadow ${activeCategory === category.id
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
                                className="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-shadow duration-300 cursor-pointer border border-neutral-100"
                                onClick={() => openLightbox(project)}
                            >
                                {/* Image */}
                                <div className="relative aspect-[4/3] overflow-hidden">
                                    <OptimizedImage
                                        src={project.images[0]}
                                        alt={`${project.title} - ${project.location}`}
                                        fill
                                        sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
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
                                            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" aria-hidden="true" stroke="currentColor" strokeWidth={2}>
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
                                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" aria-hidden="true" stroke="currentColor" strokeWidth={2}>
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                        </svg>
                                        {project.location}
                                        <span className="text-neutral-500">•</span>
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
                        title="Tamamlanan Tüm Projeleri Görüntüle"
                        className="inline-flex items-center gap-2 px-8 py-4 bg-neutral-900 text-white font-bold rounded-xl hover:bg-neutral-800 transition-colors"
                    >
                        Tüm Projelerimizi Görün
                        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" aria-hidden="true" stroke="currentColor" strokeWidth={2}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                        </svg>
                    </a>
                </motion.div>
            </div>

            {/* Lightbox — full-screen image gallery */}
            <Lightbox
                images={lightboxImages}
                initialIndex={lightboxIndex}
                isOpen={lightboxOpen}
                onClose={closeLightbox}
                title={lightboxTitle}
            />

            {/* Project Detail Drawer */}
            <AnimatePresence>
                {selectedProject && !lightboxOpen && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-50 flex items-end md:items-center justify-center bg-black/60 backdrop-blur-sm"
                        onClick={closeLightbox}
                    >
                        <motion.div
                            initial={{ y: 100, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            exit={{ y: 100, opacity: 0 }}
                            className="bg-white rounded-t-3xl md:rounded-3xl max-w-2xl w-full max-h-[80vh] overflow-y-auto shadow-2xl"
                            onClick={(e: React.MouseEvent) => e.stopPropagation()}
                        >
                            <div className="p-6 md:p-8">
                                <div className="flex items-center justify-between mb-4">
                                    <div className="flex items-center gap-3">
                                        <span className="px-3 py-1 bg-primary-50 text-primary-600 text-xs font-bold rounded-full">
                                            {selectedProject.category}
                                        </span>
                                        <span className="text-sm text-neutral-500">{selectedProject.year}</span>
                                    </div>
                                    <button
                                        onClick={closeLightbox}
                                        className="w-8 h-8 rounded-full bg-neutral-100 flex items-center justify-center hover:bg-neutral-200 transition-colors"
                                        aria-label="Kapat"
                                    >
                                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden="true">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                                        </svg>
                                    </button>
                                </div>
                                <h3 className="text-xl font-bold text-neutral-900 mb-2">{selectedProject.title}</h3>
                                <p className="text-neutral-600 text-sm mb-6">{selectedProject.description}</p>

                                {/* Image Thumbnails — click to open lightbox at that image */}
                                <div className="flex gap-2 overflow-x-auto mb-6">
                                    {selectedProject.images.map((img: string, i: number) => (
                                        <button
                                            key={i}
                                            onClick={() => openLightbox(selectedProject, i)}
                                            className="relative w-24 h-18 rounded-lg overflow-hidden flex-shrink-0 hover:ring-2 hover:ring-primary-500 transition-shadow"
                                            aria-label={`Fotoğraf ${i + 1} büyüt`}
                                        >
                                            <OptimizedImage src={img} alt="" fill sizes="96px" className="object-cover" />
                                        </button>
                                    ))}
                                </div>

                                {/* Features */}
                                {selectedProject.features && selectedProject.features.length > 0 && (
                                    <ul className="grid grid-cols-2 gap-2 mb-6">
                                        {selectedProject.features.map((f: string, i: number) => (
                                            <li key={i} className="flex items-center gap-2 text-sm text-neutral-700">
                                                <svg className="w-4 h-4 text-primary-500 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5} aria-hidden="true">
                                                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                                                </svg>
                                                {f}
                                            </li>
                                        ))}
                                    </ul>
                                )}

                                {/* Testimonial */}
                                {selectedProject.testimonial && (
                                    <blockquote className="bg-neutral-50 rounded-xl p-4 mb-6 border-l-4 border-primary-500">
                                        <p className="text-sm text-neutral-700 italic mb-2">&ldquo;{selectedProject.testimonial.text}&rdquo;</p>
                                        <cite className="text-sm font-bold text-neutral-900 not-italic">— {selectedProject.testimonial.author}</cite>
                                    </blockquote>
                                )}

                                <a
                                    href="/teklif-al"
                                    title="Benzer proje için teklif al"
                                    className="inline-flex items-center justify-center w-full gap-2 px-6 py-3.5 bg-primary-600 text-white font-bold rounded-xl hover:bg-primary-700 transition-colors min-h-[48px]"
                                >
                                    Benzer Projem İçin Teklif Al
                                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden="true">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                                    </svg>
                                </a>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </section>
    );
}
