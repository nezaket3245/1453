/**
 * Centralized Store/Branch Data Model
 * 
 * Single source of truth for all store locations, working hours,
 * and contact information. Used by Footer, Contact page, and
 * LocalShowroomSection to maintain DRY principle.
 * 
 * @see businessConfig for brand-level configuration
 */

import { businessConfig } from "@/config/business.config";

export interface Store {
    id: string;
    name: string;
    type: "showroom" | "office" | "warehouse";
    address: {
        street: string;
        district: string;
        city: string;
        zip: string;
        full: string;
    };
    coordinates: {
        latitude: string;
        longitude: string;
    };
    contact: {
        phone: string;
        phoneRaw: string;
        mobile: string;
        mobileRaw: string;
        whatsapp: string;
        email: string;
    };
    workingHours: WorkingHours[];
    googleMapsUrl: string;
    googleMapsEmbedUrl: string;
    isPrimary: boolean;
    features: string[];
}

export interface WorkingHours {
    days: string;
    daysEn: string[];
    open: string;
    close: string;
    isClosed?: boolean;
}

/**
 * Standard working hours — reused across all store definitions
 */
export const standardWorkingHours: WorkingHours[] = [
    {
        days: "Pazartesi - Cuma",
        daysEn: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
        open: "08:30",
        close: "19:00",
    },
    {
        days: "Cumartesi",
        daysEn: ["Saturday"],
        open: "09:00",
        close: "18:00",
    },
    {
        days: "Pazar",
        daysEn: ["Sunday"],
        open: "",
        close: "",
        isClosed: true,
    },
];

/**
 * All store/branch locations
 */
export const stores: Store[] = [
    {
        id: "beylikduzu-showroom",
        name: "Egepen Akçayapı - Beylikdüzü Showroom",
        type: "showroom",
        address: {
            street: businessConfig.address.street,
            district: businessConfig.address.district,
            city: businessConfig.address.city,
            zip: businessConfig.address.zip,
            full: businessConfig.address.full,
        },
        coordinates: {
            latitude: businessConfig.address.coordinates.latitude,
            longitude: businessConfig.address.coordinates.longitude,
        },
        contact: {
            phone: businessConfig.contact.landline,
            phoneRaw: businessConfig.contact.landlineRaw,
            mobile: businessConfig.contact.mobile,
            mobileRaw: businessConfig.contact.mobileRaw,
            whatsapp: businessConfig.contact.whatsapp,
            email: businessConfig.contact.email,
        },
        workingHours: standardWorkingHours,
        googleMapsUrl: businessConfig.social.googleMaps,
        googleMapsEmbedUrl: `https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3011.5!2d${businessConfig.address.coordinates.longitude}!3d${businessConfig.address.coordinates.latitude}!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s${businessConfig.address.coordinates.cid}!2z${encodeURIComponent(businessConfig.address.full)}!5e0!3m2!1str!2str!4v1700000000000!5m2!1str!2str`,
        isPrimary: true,
        features: [
            "Egepen Deceuninck ürün sergileme",
            "Canlı ürün numuneleri",
            "Ücretsiz keşif hizmeti",
            "Profesyonel danışmanlık",
            "Otopark imkanı",
        ],
    },
];

/**
 * Returns the primary store location
 */
export function getPrimaryStore(): Store {
    return stores.find((s) => s.isPrimary) ?? stores[0];
}

/**
 * Formats working hours for display in Turkish
 */
export function formatWorkingHoursDisplay(hours: WorkingHours[]): string {
    return hours
        .map((h) => {
            if (h.isClosed) return `${h.days}: Kapalı`;
            return `${h.days}: ${h.open} - ${h.close}`;
        })
        .join(" | ");
}

/**
 * Generates Schema.org OpeningHoursSpecification from working hours
 */
export function getSchemaOpeningHours(hours: WorkingHours[]) {
    return hours
        .filter((h) => !h.isClosed)
        .map((h) => ({
            "@type": "OpeningHoursSpecification" as const,
            dayOfWeek: h.daysEn,
            opens: h.open,
            closes: h.close,
        }));
}
