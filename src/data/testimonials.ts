/**
 * Centralized Testimonials Data
 * 
 * Single source of truth for customer reviews used across
 * landing page, testimonials section, and product pages.
 */

import { Testimonial } from "@/types";

export const testimonials: Testimonial[] = [
    {
        id: "t1",
        name: "Ahmet Yılmaz",
        location: "Beylikdüzü, Gürpınar",
        rating: 5,
        comment:
            "Egepen Legend serisi pencereleri taktırdık. Kış aylarında ısınma faturamız neredeyse yarıya düştü. Montaj ekibi çok profesyoneldi, temiz çalıştılar.",
        date: "2025-12-15",
        product: "PVC Pencere",
    },
    {
        id: "t2",
        name: "Fatma Demir",
        location: "Beylikdüzü, Yakuplu",
        rating: 5,
        comment:
            "Cam balkon yaptırdık, balkonumuz artık 4 mevsim kullanılabilir hale geldi. Temperli cam kalitesi mükemmel. Kesinlikle tavsiye ederim.",
        date: "2025-11-20",
        product: "Cam Balkon",
    },
    {
        id: "t3",
        name: "Mehmet Kaya",
        location: "Büyükçekmece, Beykent",
        rating: 5,
        comment:
            "Tüm daireye sineklik taktırdık. Plise sineklik modeli hem şık hem pratik. Kedimiz için Pet Screen tül tercih ettik, çok dayanıklı.",
        date: "2025-10-05",
        product: "Sineklik",
    },
    {
        id: "t4",
        name: "Ayşe Özkan",
        location: "Esenyurt",
        rating: 5,
        comment:
            "Motorlu panjur sistemi hayatımızı değiştirdi. Sabah güneşi artık rahatsız etmiyor, kumanda ile rahatça kontrol ediyoruz. Somfy motor mükemmel çalışıyor.",
        date: "2025-09-18",
        product: "Panjur",
    },
    {
        id: "t5",
        name: "Ali Çelik",
        location: "Beylikdüzü, Kavaklı",
        rating: 5,
        comment:
            "Duşakabin montajı için Akçayapı'yı tercih ettik. Siyah profil çerçevesiz model banyomuza modern bir hava kattı. Ölçü alımından montaja kadar mükemmel süreç.",
        date: "2025-08-22",
        product: "Duşakabin",
    },
    {
        id: "t6",
        name: "Zeynep Arslan",
        location: "Büyükçekmece, Kumburgaz",
        rating: 4,
        comment:
            "Villamızın tüm pencerelerini Egepen Legend Art serisi ile değiştirdik. Ses yalıtımı inanılmaz, deniz kenarında olmamıza rağmen rüzgar sesi gelmiyor.",
        date: "2025-07-10",
        product: "PVC Pencere",
    },
];

/**
 * Returns testimonials filtered by product category
 */
export function getTestimonialsByProduct(product: string): Testimonial[] {
    return testimonials.filter(
        (t) => t.product?.toLowerCase() === product.toLowerCase()
    );
}

/**
 * Returns the average rating from all testimonials
 */
export function getAverageRating(): number {
    if (testimonials.length === 0) return 0;
    const sum = testimonials.reduce((acc, t) => acc + t.rating, 0);
    return Math.round((sum / testimonials.length) * 10) / 10;
}
