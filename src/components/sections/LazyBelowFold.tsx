"use client";

import dynamic from "next/dynamic";

/**
 * LazyBelowFold - Client component wrapper for below-fold sections.
 *
 * Uses ssr: false to avoid loading ~200KB of JS chunks on initial page load.
 * This dramatically reduces "unused JavaScript" reported by Lighthouse
 * and frees bandwidth for the LCP hero image.
 *
 * HTML for these sections is NOT pre-rendered (client-only).
 * Google's crawler executes JavaScript, so content is still indexed.
 */

function SectionSkeleton() {
  return (
    <div className="py-16 animate-pulse">
      <div className="container-custom">
        <div className="h-8 bg-neutral-200 rounded w-1/3 mx-auto mb-8" />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[1, 2, 3].map((i) => (
            <div key={i} className="h-48 bg-neutral-100 rounded-xl" />
          ))}
        </div>
      </div>
    </div>
  );
}

const WhyChooseUsSection = dynamic(
  () =>
    import("@/components/sections/WhyChooseUsSection").then((mod) => ({
      default: mod.WhyChooseUsSection,
    })),
  { ssr: false, loading: () => <SectionSkeleton /> }
);

const TestimonialsSection = dynamic(
  () =>
    import("@/components/sections/TestimonialsSection").then((mod) => ({
      default: mod.TestimonialsSection,
    })),
  { ssr: false, loading: () => <SectionSkeleton /> }
);

const LocalShowroomSection = dynamic(
  () =>
    import("@/components/sections/LocalShowroomSection").then((mod) => ({
      default: mod.LocalShowroomSection,
    })),
  { ssr: false, loading: () => <SectionSkeleton /> }
);

const ProjectsGallerySection = dynamic(
  () =>
    import("@/components/sections/ProjectsGallerySection").then((mod) => ({
      default: mod.ProjectsGallerySection,
    })),
  { ssr: false, loading: () => <SectionSkeleton /> }
);

const HomepageFAQSection = dynamic(
  () =>
    import("@/components/sections/FAQAccordion").then((mod) => ({
      default: mod.HomepageFAQSection,
    })),
  { ssr: false, loading: () => <SectionSkeleton /> }
);



export function LazyBelowFold() {
  return (
    <>
      {/* Why Choose Us - Competitive Edge */}
      <WhyChooseUsSection />

      {/* Projects Gallery - Visual Trust */}
      <ProjectsGallerySection />

      {/* Testimonials Section */}
      <TestimonialsSection />

      {/* Local Showroom & Map */}
      <LocalShowroomSection />

      {/* FAQ Section - SEO Rich Snippets */}
      <HomepageFAQSection />
    </>
  );
}
