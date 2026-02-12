"use server";

/**
 * Server Actions for PVC Repair Request Form
 * Handles form submission with validation and notification
 */

export interface RepairFormState {
    success: boolean;
    message: string;
    errors?: {
        name?: string;
        phone?: string;
        address?: string;
        serviceType?: string;
        description?: string;
    };
}

export interface RepairFormData {
    name: string;
    phone: string;
    email?: string;
    address: string;
    serviceType: string;
    urgency: "normal" | "urgent" | "emergency";
    description: string;
    preferredDate?: string;
    consent: boolean;
}

/**
 * Submit Repair Request Action
 * Validates form data and processes the repair request
 */
export async function submitRepairRequest(
    prevState: RepairFormState | null,
    formData: FormData
): Promise<RepairFormState> {
    // Simulate network delay for realistic UX
    await new Promise((resolve) => setTimeout(resolve, 1500));

    // Extract form data
    const data: RepairFormData = {
        name: formData.get("name") as string,
        phone: formData.get("phone") as string,
        email: formData.get("email") as string || undefined,
        address: formData.get("address") as string,
        serviceType: formData.get("serviceType") as string,
        urgency: formData.get("urgency") as RepairFormData["urgency"],
        description: formData.get("description") as string,
        preferredDate: formData.get("preferredDate") as string || undefined,
        consent: formData.get("consent") === "on",
    };

    // Validation
    const errors: RepairFormState["errors"] = {};

    if (!data.name || data.name.trim().length < 3) {
        errors.name = "Ad soyad en az 3 karakter olmalıdır";
    }

    if (!data.phone || !/^0[0-9]{10}$/.test(data.phone.replace(/\s/g, ""))) {
        errors.phone = "Geçerli bir telefon numarası giriniz (05XX XXX XX XX)";
    }

    if (!data.address || data.address.trim().length < 10) {
        errors.address = "Lütfen tam adresinizi giriniz";
    }

    if (!data.serviceType) {
        errors.serviceType = "Lütfen bir hizmet türü seçiniz";
    }

    if (!data.description || data.description.trim().length < 20) {
        errors.description = "Lütfen sorununuzu en az 20 karakter ile açıklayınız";
    }

    if (!data.consent) {
        return {
            success: false,
            message: "Gizlilik politikasını onaylamanız gerekmektedir",
        };
    }

    // Return errors if validation failed
    if (Object.keys(errors).length > 0) {
        return {
            success: false,
            message: "Lütfen formdaki hataları düzeltiniz",
            errors,
        };
    }

    // In production, this would:
    // 1. Send email notification to the business
    // 2. Store in database
    // 3. Trigger SMS/WhatsApp notification
    // 4. Create CRM entry

    // Success response
    return {
        success: true,
        message: `Sayın ${data.name}, tamir talebiniz başarıyla alındı. Ekibimiz en kısa sürede sizinle iletişime geçecektir.`,
    };
}

/**
 * Submit Quick Quote Request Action
 * For product series interest
 */
export async function submitQuickQuote(
    prevState: RepairFormState | null,
    formData: FormData
): Promise<RepairFormState> {
    await new Promise((resolve) => setTimeout(resolve, 1000));

    const name = formData.get("name") as string;
    const phone = formData.get("phone") as string;
    const productInterest = formData.get("productInterest") as string;
    const message = formData.get("message") as string;

    if (!name || !phone || !productInterest) {
        return {
            success: false,
            message: "Lütfen tüm zorunlu alanları doldurunuz",
        };
    }

    return {
        success: true,
        message: `Teşekkürler ${name}! ${productInterest} serisi için teklif talebiniz alındı. 24 saat içinde dönüş yapılacaktır.`,
    };
}
