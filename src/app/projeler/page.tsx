import { Metadata } from "next";
import { HeaderOptimized } from '@/components/layout/HeaderOptimized';
import { Footer } from "@/components/layout/Footer";
import { PageHero } from "@/components/ui/PageHero";
import OptimizedImage from "@/components/ui/OptimizedImage";
import { projects } from "@/lib/projectsData";
import Link from "next/link";

export const metadata: Metadata = {
    title: "Projelerimiz - Egepen Akçayapı",
    description: "Beylikdüzü ve İstanbul'da gerçekleştirdiğimiz PVC pencere, cam balkon ve sineklik projeleri.",
};

export default function ProjectsPage() {
    return (
        <>
            <HeaderOptimized />
            <main id="main-content" className="min-h-screen bg-neutral-50">
                <PageHero
                    title="Projelerimiz"
                    subtitle="Beylikdüzü ve çevresinde tamamladığımız projelerden örnekler."
                    breadcrumbs={[{ label: "Projeler" }]}
                    compact
                />



                {/* Projects Grid */}
                <section className="py-12 md:py-16 bg-white">
                    <div className="container-custom">
                        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                            {projects.map((project) => (
                                <div key={project.id} className="group bg-white rounded-2xl border border-neutral-200 overflow-hidden hover:shadow-lg transition-all">
                                    <div className="relative aspect-video bg-neutral-100">
                                        <OptimizedImage src={project.images[0]} alt={project.title} fill sizes="(max-width: 768px) 100vw, 33vw" className="object-cover" />
                                    </div>
                                    <div className="p-4">
                                        <h3 className="font-semibold text-neutral-800">{project.title}</h3>
                                        {project.location && <p className="text-sm text-neutral-500 mt-1">{project.location}</p>}
                                        {project.description && <p className="text-sm text-neutral-500 mt-1 line-clamp-2">{project.description}</p>}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* CTA */}
                <section className="py-12 md:py-16 bg-primary-600 text-white text-center">
                    <div className="container-custom">
                        <h2 className="text-2xl md:text-3xl font-bold mb-3">Projenizi Planlayalım</h2>
                        <p className="text-white/80 mb-6 max-w-lg mx-auto">Ücretsiz keşif için bize ulaşın.</p>
                        <Link href="/teklif-al" className="inline-flex items-center justify-center px-6 py-3 bg-white text-primary-600 font-bold rounded-xl hover:bg-neutral-100 transition-colors min-h-[48px]">
                            Teklif Al
                        </Link>
                    </div>
                </section>
            </main>
            <Footer />
        </>
    );
}
